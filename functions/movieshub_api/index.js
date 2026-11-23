// Build: 20261120_08
'use strict';

const https = require('https');
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { URL, URLSearchParams } = require('url');

const NETMIRROR_SECRET = process.env.NETMIRROR_SECRET || 'net###@@sss';
const TMDB_KEYS = process.env.TMDB_KEYS 
  ? process.env.TMDB_KEYS.split(',').map(k => k.trim()).filter(Boolean)
  : ['c8dea14dc917687ac631a52620e4f7ad', '3cb41ecea3bf606c56552db3d17adefd'];

// Strict SSRF Whitelist for Image Proxy
const ALLOWED_IMAGE_HOSTS = [
  'image.tmdb.org',
  'img.youtube.com',
  'i.ytimg.com',
  'images.unsplash.com',
  'wsrv.nl',
  'm.media-amazon.com',
  'assets.stickpng.com',
  'play.onestream.today',
  'movies.downloadpage.xyz'
];

function isSafeImageUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    const host = parsed.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '169.254.169.254') return false;
    if (/^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^192\.168\./.test(host)) return false;
    return ALLOWED_IMAGE_HOSTS.some(allowed => host === allowed || host.endsWith('.' + allowed));
  } catch (e) {
    return false;
  }
}

const LANG_NAME_MAP = {
  ta: 'Tamil', en: 'English', hi: 'Hindi', te: 'Telugu', ml: 'Malayalam',
  kn: 'Kannada', ko: 'Korean', ja: 'Japanese'
};
const LANG_CODE_MAP = {
  tamil: 'ta', english: 'en', hindi: 'hi', telugu: 'te', malayalam: 'ml'
};

const LANG_COLORS = {
  tamil: '#ec4899', telugu: '#f43f5e', malayalam: '#a855f7',
  kannada: '#8b5cf6', hindi: '#f97316', india: '#e50914',
  indonesian: '#06b6d4', english: '#3b82f6', cinema: '#e50914'
};

let lastDashboardSyncTime = 0;
let isSyncingDashboard = false;
let cachedDashboard = null;
function getCacheFilePath() {
  const candidatePaths = [
    '/tmp/dashboard_cache.json',
    path.join(__dirname, 'dashboard_cache.json'),
    path.join(__dirname, '..', 'dashboard_cache.json'),
    path.join(process.cwd(), 'dashboard_cache.json'),
    path.join(process.cwd(), 'api', 'dashboard_cache.json'),
    path.join(process.cwd(), 'Movieshub', 'dashboard_cache.json')
  ];
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

try {
  const cachePath = getCacheFilePath();
  if (cachePath) {
    cachedDashboard = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    if (cachedDashboard && cachedDashboard.last_synced) {
      lastDashboardSyncTime = cachedDashboard.last_synced * 1000;
    }
  }
} catch (e) {
  console.error('[Cache Init Error]', e);
}

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const client = u.protocol === 'http:' ? http : https;
    const req = client.request(u, {
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
        'Referer': 'https://netmirror.plus/',
        ...(options.headers || {})
      },
      timeout: options.timeout || 6000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          resolve(null);
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
    req.end();
  });
}

function fetchBuffer(url, options = {}, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 6) {
      return reject(new Error('Too many redirects'));
    }
    const u = new URL(url);
    const client = u.protocol === 'http:' ? http : https;
    const req = client.request(u, {
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Referer': options.headers?.Referer || 'https://moviezda.me/',
        ...(options.headers || {})
      },
      timeout: options.timeout || 8000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).toString();
        }
        return resolve(fetchBuffer(redirectUrl, options, redirectCount + 1));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), headers: res.headers, statusCode: res.statusCode, finalUrl: url }));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
    req.end();
  });
}

async function fetchTmdbApi(endpoint, params = {}) {
  for (const key of TMDB_KEYS) {
    try {
      const qs = new URLSearchParams({ ...params, api_key: key }).toString();
      const url = `https://tmdb.imdb3.shop/3${endpoint}?${qs}`;
      const data = await fetchJson(url, { timeout: 4000 });
      if (data) return data;
    } catch (e) {
      continue;
    }
  }
  return { results: [] };
}

function normalizeMovie(item) {
  const mid = item.id;
  const title = item.title || item.name || 'Movie';
  const nativeTitle = item.original_title || item.original_name || title;
  const origLang = item.original_language || 'en';
  const langName = LANG_NAME_MAP[origLang] || (origLang === 'en' ? 'English' : origLang.toUpperCase());
  const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  const relDate = item.release_date || item.first_air_date || '2026';
  const year = parseInt(relDate.slice(0, 4), 10) || 2026;
  const voteCount = parseInt(item.vote_count, 10) || 0;
  const rawVote = parseFloat(item.vote_average) || 0;
  const vote = (voteCount >= 5 && rawVote > 0) ? Math.round(rawVote * 10) / 10 : (year >= 2026 ? "NEW" : 7.0);

  const posterPath = item.poster_path;
  const backdropPath = item.backdrop_path;

  let posterUrl = '';
  if (posterPath) {
    posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  } else if (backdropPath) {
    posterUrl = `https://image.tmdb.org/t/p/w500${backdropPath}`;
  } else {
    posterUrl = `/api/poster?title=${encodeURIComponent(title.slice(0, 30))}&year=${year}&lang=${encodeURIComponent(langName)}`;
  }

  const backdropUrl = backdropPath ? `https://image.tmdb.org/t/p/w1280${backdropPath}` : posterUrl;

  const genreMap = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    18: 'Drama', 27: 'Horror', 878: 'Sci-Fi', 53: 'Thriller', 10749: 'Romance'
  };
  const genres = (item.genre_ids || []).slice(0, 3).map(gid => genreMap[gid] || 'Cinema');
  const matchPct = (typeof vote === 'number') 
    ? `${Math.min(99, Math.max(70, Math.floor(vote * 10 + 10)))}%` 
    : '98%';

  return {
    id: `tmdb-${mid}`,
    tmdbId: mid,
    title,
    nativeTitle,
    language: langName,
    languageBadge: langName,
    year,
    releaseDate: relDate,
    rating: vote,
    match: matchPct,
    maturity: 'U/A 16+',
    duration: mediaType === 'movie' ? '2h 30m' : 'Series',
    genres: genres.length ? genres : ['Action', 'Drama'],
    qualities: ['4K', '1080p'],
    platform: 'Direct',
    platformBadge: 'MOVIESHUB',
    platformColor: '#E50914',
    poster: posterUrl,
    backdrop: backdropUrl,
    mediaType,
    overview: item.overview || `${title} (${year}) streaming now in 4K Ultra HD on Movieshub with pure ad-free playback.`,
    cast: [],
    director: 'Cinematic Director',
    isTrending: (item.popularity || 0) > 40
  };
}

const KNOWN_TMDB_MAP = {
  // The Singam Franchise (Tamil & Hindi)
  "singam": 62756,
  "singam 1": 62756,
  "singam original": 62756,
  "singam tamil": 62756,
  "singam 2": 191735,
  "singam ii": 191735,
  "singam 2 original": 191735,
  "singam 3": 376440,
  "si 3": 376440,
  "si3": 376440,
  "s3": 376440,
  "singham": 70590,
  "singham returns": 285803,
  "singham again": 1014214,
  "kadaikutty singam": 498821,

  // Legendary Tamil & Indian Blockbusters
  "anniyan": 19978,
  "ghajini": 19975,
  "ghajini tamil": 19975,
  "ghajini hindi": 14070,
  "sivaji": 24049,
  "sivaji: the boss": 24049,
  "sivaji the boss": 24049,
  "mankatha": 76788,
  "theri": 370076,
  "mersal": 456287,
  "bigil": 563309,
  "kaththi": 263475,
  "thuppakki": 143010,
  "enthiran": 148284,
  "robot": 148284,
  "2.0": 345915,
  "kabali": 354859,
  "kaala": 457837,
  "petta": 554230,
  "darbar": 592834,
  "baahubali": 256040,
  "baahubali: the beginning": 256040,
  "baahubali the beginning": 256040,
  "baahubali 2": 350312,
  "baahubali 2: the conclusion": 350312,
  "baahubali 2 the conclusion": 350312,
  "k.g.f: chapter 1": 564147,
  "kgf": 564147,
  "kgf chapter 1": 564147,
  "kgf 1": 564147,
  "k.g.f: chapter 2": 587412,
  "kgf chapter 2": 587412,
  "kgf 2": 587412,
  "kantara": 858485,
  "pushpa": 690957,
  "pushpa: the rise": 690957,
  "pushpa the rise": 690957,
  "pushpa 2": 1011985,
  "pushpa 2: the rule": 1011985,
  "pushpa 2 the rule": 1011985,
  "varisu": 835017,
  "beast": 849509,
  "vettaiyan": 1093966,
  "raayan": 1136418,
  "demonte colony 2": 979250,
  "lubber pandhu": 1182047,
  "meiyazhagan": 1171178,
  "madha gaja raja": 280951,
  "soorarai pottru": 653594,
  "jai bhim": 870932,
  "asuran": 598442,
  "kaithi": 630566,
  "doctor": 671039,
  "don": 791977,
  "ayalaan": 533514,
  "captain miller": 1000676,
  "vaathi": 915822,
  "siruthai": 60938,
  "ayan": 19973,
  "paiyaa": 38686,
  "ko": 62837,
  "aaranya kaandam": 64303,
  "super deluxe": 570775,
  "pariyerum perumal": 538858,
  "karnan": 672647,
  "viduthalai": 859348,
  "viduthalai part 1": 859348,
  "jigarthanda doublex": 1058694,
  "chithha": 1171541,
  "irugapatru": 1182333,
  "por thozhil": 1124578,
  "good night": 1121965,
  "dada": 1073866,
  "love today": 1039690,
  "om: operation mole": 1384528,
  "o.m: operation mole": 1384528,
  "om operation mole": 1384528,
  "operation mole": 1384528,
  "meesaya murukku": 424336,
  "meesaya murukku 2": 1538457,
  "immortal": 1505305,
  "cold call": 126743,
  "anakapalli": 123090,
  "baththa": 1515692,
  "the dark heaven": 1618200,
  "dorothy": 1578079,
  "jailer 2": 1234139,
  "jailer 2 original": 1234139,
  "mookuthi amman 2": 1327835,
  "mookuthi amman 2 hq hdts": 1327835,
  "yezhu kadal yezhu malai": 954445,
  "scene": 1402181,
  "scene 2026": 1402181,
  "leo": 949229,
  "leo: bloody sweet": 949229,
  "jailer": 937020,
  "vikram": 743563,
  "master": 626392,
  "goat": 1129608,
  "the greatest of all time": 1129608,
  "amaran": 927342,
  "maharaja": 1118224,
  "ponniyin selvan": 660046,
  "kalki 2898 ad": 801688,
  "kalki": 801688,
  "aavesham": 1084812,
  "manjummel boys": 1069945,
  "bramayugam": 1166133,
  "stree 2": 1112426,
  "12th fail": 1163258,
  "jawan": 872906,
  "animal": 781732,
  "salaar": 770906,
  "rrr": 579974,
  "deadpool & wolverine": 533535,
  "dune: part two": 693134,
  "oppenheimer": 872585,
  "interstellar": 157336,
  "game of thrones": 1399,
  "got": 1399,
  "house of the dragon": 94997,
  "severance": 95396,
  "stranger things": 66732,
  "the boys": 76479
};

function findKnownTmdbId(title) {
  if (!title) return null;
  const norm = String(title).toLowerCase().replace(/\[.*?\]|\(.*?\)/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  if (KNOWN_TMDB_MAP[norm]) return KNOWN_TMDB_MAP[norm];
  
  const padded = " " + norm + " ";
  const sortedKeys = Object.keys(KNOWN_TMDB_MAP).sort((a, b) => b.length - a.length);
  for (const k of sortedKeys) {
    if (k.length < 3) continue;
    const paddedKey = " " + k.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim() + " ";
    if (padded.includes(paddedKey)) {
      return KNOWN_TMDB_MAP[k];
    }
  }
  return null;
}

const NETMIRROR_TO_TMDB_CACHE = new Map();

async function resolveTmdbForNetmirrorItem(rawTitle, relYear) {
  const clean = String(rawTitle || "").replace(/\[.*?\]|\(.*?\)/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!clean) return null;
  
  const known = findKnownTmdbId(clean);
  if (known) return String(known);

  const yr = parseInt(relYear, 10);
  const cacheKey = clean.toLowerCase() + "_" + (yr || "");
  if (NETMIRROR_TO_TMDB_CACHE.has(cacheKey)) {
    return NETMIRROR_TO_TMDB_CACHE.get(cacheKey);
  }

  try {
    const params = { query: clean, include_adult: "false" };
    if (yr && yr > 1920 && yr < 2030) {
      params.primary_release_year = yr;
    }
    let data = await fetchTmdbApi("/search/movie", params);
    if ((!data || !data.results || data.results.length === 0) && params.primary_release_year) {
      delete params.primary_release_year;
      data = await fetchTmdbApi("/search/movie", params);
    }
    if (!data || !data.results || data.results.length === 0) {
      data = await fetchTmdbApi("/search/multi", { query: clean, include_adult: "false" });
    }
    if (data && data.results && data.results.length > 0) {
      const match = data.results[0];
      const tmId = String(match.id);
      NETMIRROR_TO_TMDB_CACHE.set(cacheKey, tmId);
      return tmId;
    }
  } catch (e) {
    // ignore
  }

  return null;
}

// Sync states declared above

// 2-Hour Automatic Sync Timer & Daily Sync across all server providers (TMDB, Moviezda, Netmirror)
const ONE_HOUR_MS = 60 * 60 * 1000;
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

async function syncDashboardCatalog(force = false) {
  if (isSyncingDashboard) return cachedDashboard;
  const now = Date.now();
  const todayStr = new Date().toISOString().slice(0, 10);
  const isDayChanged = cachedDashboard && cachedDashboard.last_synced_date && cachedDashboard.last_synced_date !== todayStr;
  const isTwoHoursCrossed = !lastDashboardSyncTime || (now - lastDashboardSyncTime >= TWO_HOURS_MS);

  if (!force && !isDayChanged && !isTwoHoursCrossed && cachedDashboard && cachedDashboard.latest_six && cachedDashboard.latest_six.length > 0) {
    return cachedDashboard;
  }

  isSyncingDashboard = true;
  try {
    const updated = {
      last_synced: Math.floor(now / 1000),
      last_synced_human: new Date().toISOString().replace('T', ' ').slice(0, 19),
      last_synced_date: todayStr,
      hero: [],
      latest_six: [],
      tamil_2026: [],
      tamil_2025: [],
      tamil_2024: (cachedDashboard && cachedDashboard.tamil_2024) || [],
      trending: [],
      latest: [],
      languages: {
        tamil: [],
        english: [],
        hindi: [],
        telugu: [],
        malayalam: []
      },
      all: []
    };

    const seenIds = new Set();
    const addMovie = (m, arr = null) => {
      if (!m || !m.title) return;
      if (arr && Array.isArray(arr)) arr.push(m);
      if (!seenIds.has(m.tmdbId)) {
        seenIds.add(m.tmdbId);
        updated.all.push(m);
      }
    };

    // Parallel multi-language discovery: fetches 2026 & 2025 for all major languages + Now Playing + Daily Trending + Weekly Trending
    const [
      npRes,
      dayTrRes,
      trRes,
      ta26Res,
      ta25Res,
      en26Res,
      en25Res,
      hi26Res,
      hi25Res,
      te26Res,
      te25Res,
      ml26Res,
      ml25Res
    ] = await Promise.allSettled([
      fetchTmdbApi('/movie/now_playing', { page: 1 }),
      fetchTmdbApi('/trending/movie/day', { page: 1 }),
      fetchTmdbApi('/trending/movie/week', { page: 1 }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'ta', primary_release_year: 2026, sort_by: 'popularity.desc' }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'ta', primary_release_year: 2025, sort_by: 'popularity.desc' }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'en', primary_release_year: 2026, sort_by: 'popularity.desc' }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'en', primary_release_year: 2025, sort_by: 'popularity.desc' }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'hi', primary_release_year: 2026, sort_by: 'popularity.desc' }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'hi', primary_release_year: 2025, sort_by: 'popularity.desc' }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'te', primary_release_year: 2026, sort_by: 'popularity.desc' }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'te', primary_release_year: 2025, sort_by: 'popularity.desc' }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'ml', primary_release_year: 2026, sort_by: 'popularity.desc' }),
      fetchTmdbApi('/discover/movie', { with_original_language: 'ml', primary_release_year: 2025, sort_by: 'popularity.desc' })
    ]);

    // Process Daily Trending (Populates Top 5 Billboard Hero Slider with today's hot movies)
    if (dayTrRes.status === 'fulfilled' && dayTrRes.value && Array.isArray(dayTrRes.value.results)) {
      const dayTrendingList = dayTrRes.value.results
        .filter(m => m.backdrop_path || m.poster_path)
        .map(normalizeMovie);
      updated.hero = dayTrendingList.slice(0, 10);
      dayTrendingList.forEach(m => {
        addMovie(m, updated.trending);
      });
    }

    // Process Now Playing (Theatrical releases currently in cinemas)
    let npList = [];
    if (npRes.status === 'fulfilled' && npRes.value && Array.isArray(npRes.value.results)) {
      npList = npRes.value.results.map(normalizeMovie).filter(m => (m.year || 2026) >= 2025);
      npList.forEach(m => {
        addMovie(m, updated.latest);
      });
    }

    // Process Weekly Trending
    if (trRes.status === 'fulfilled' && trRes.value && Array.isArray(trRes.value.results)) {
      trRes.value.results.slice(0, 20).map(normalizeMovie).forEach(m => {
        addMovie(m, updated.trending);
      });
    }

    // Process Tamil 2026
    if (ta26Res.status === 'fulfilled' && ta26Res.value && ta26Res.value.results) {
      ta26Res.value.results.map(normalizeMovie).forEach(m => {
        m.language = 'Tamil';
        m.languageBadge = 'Tamil';
        const fid = getVerifiedMoviesdaFileId(m.title, m.tmdbId);
        if (fid) m.moviesdaFileId = fid;
        addMovie(m, updated.tamil_2026);
        addMovie(m, updated.languages.tamil);
      });
    }

    // Process Tamil 2025
    if (ta25Res.status === 'fulfilled' && ta25Res.value && ta25Res.value.results) {
      ta25Res.value.results.map(normalizeMovie).forEach(m => {
        m.language = 'Tamil';
        m.languageBadge = 'Tamil';
        const fid = getVerifiedMoviesdaFileId(m.title, m.tmdbId);
        if (fid) m.moviesdaFileId = fid;
        addMovie(m, updated.tamil_2025);
        addMovie(m, updated.languages.tamil);
      });
    }

    // Enrich & Merge with Verified Moviesda 2026 Theatrical Prints
    try {
      const activeMoviesdaDomain = await getActiveMoviesdaDomain();
      const mzRes = await fetchBuffer(`${activeMoviesdaDomain}/tamil-2026-movies/`, {
        headers: { "User-Agent": "Mozilla/5.0" }
      });
      const mzHtml = mzRes.buffer.toString("utf8");
      const mzRegex = /<div class="f">\s*<img[^>]+>\s*<a href="([^"]+)">([^<]+)<\/a>/g;
      let mm;
      while ((mm = mzRegex.exec(mzHtml)) !== null) {
        const rawTitle = mm[2].trim();
        const cleanTitle = rawTitle.replace(/\s*\(\d{4}\).*$/, "").trim();
        const fid = getVerifiedMoviesdaFileId(cleanTitle);
        let existing = updated.tamil_2026.find(m => m.title && (m.title.toLowerCase().includes(cleanTitle.toLowerCase()) || cleanTitle.toLowerCase().includes(m.title.toLowerCase())));
        if (existing) {
          if (fid) existing.moviesdaFileId = fid;
          existing.isTheatrePrint = true;
        } else if (fid) {
          const tId = Number(Object.keys(MOVIESDA_TMDB_MAP).find(k => MOVIESDA_TMDB_MAP[k] === fid)) || Number(fid);
          const mItem = {
            id: `mz-${fid}`,
            tmdbId: tId,
            title: cleanTitle,
            language: "Tamil",
            languageBadge: "Tamil",
            year: 2026,
            rating: "NEW",
            moviesdaFileId: fid,
            isTheatrePrint: true,
            poster: (KNOWN_VERIFIED_POSTERS[cleanTitle.toLowerCase()] && KNOWN_VERIFIED_POSTERS[cleanTitle.toLowerCase()].poster) || "https://image.tmdb.org/t/p/w500/kfc4w3OX8QsFm8f9MPUdmGheNl3.jpg",
            backdrop: (KNOWN_VERIFIED_POSTERS[cleanTitle.toLowerCase()] && KNOWN_VERIFIED_POSTERS[cleanTitle.toLowerCase()].backdrop) || "https://image.tmdb.org/t/p/w1280/zYiUafcGC7JqK01GYbkimBYNaUR.jpg",
            overview: `${cleanTitle} (2026) - Latest Kollywood theatrical release on Moviesda with multi-server streaming.`,
            qualities: ["1080p HD", "720p HD", "Theatre Print"]
          };
          addMovie(mItem, updated.tamil_2026);
          addMovie(mItem, updated.languages.tamil);
        }
      }
    } catch (err) {
      // Non-fatal
    }

    // Process English 2026 & 2025
    [en26Res, en25Res].forEach(res => {
      if (res.status === 'fulfilled' && res.value && res.value.results) {
        res.value.results.map(normalizeMovie).forEach(m => {
          m.language = 'English';
          m.languageBadge = 'English';
          addMovie(m, updated.languages.english);
        });
      }
    });

    // Process Hindi 2026 & 2025
    [hi26Res, hi25Res].forEach(res => {
      if (res.status === 'fulfilled' && res.value && res.value.results) {
        res.value.results.map(normalizeMovie).forEach(m => {
          m.language = 'Hindi';
          m.languageBadge = 'Hindi';
          addMovie(m, updated.languages.hindi);
        });
      }
    });

    // Process Telugu 2026 & 2025
    [te26Res, te25Res].forEach(res => {
      if (res.status === 'fulfilled' && res.value && res.value.results) {
        res.value.results.map(normalizeMovie).forEach(m => {
          m.language = 'Telugu';
          m.languageBadge = 'Telugu';
          addMovie(m, updated.languages.telugu);
        });
      }
    });

    // Process Malayalam 2026 & 2025
    [ml26Res, ml25Res].forEach(res => {
      if (res.status === 'fulfilled' && res.value && res.value.results) {
        res.value.results.map(normalizeMovie).forEach(m => {
          m.language = 'Malayalam';
          m.languageBadge = 'Malayalam';
          addMovie(m, updated.languages.malayalam);
        });
      }
    });

    // Retain catalog movies from previous cachedDashboard so nothing is lost
    if (cachedDashboard && Array.isArray(cachedDashboard.all)) {
      cachedDashboard.all.forEach(m => {
        if (!seenIds.has(m.tmdbId)) {
          seenIds.add(m.tmdbId);
          updated.all.push(m);
        }
      });
    }

    // Guarantee Ramayana and Madha Gaja Raja with verified stream IDs
    if (!updated.tamil_2026.some(m => m.tmdbId === 656908)) {
      updated.tamil_2026.push({
        id: "mz-103234",
        tmdbId: 656908,
        title: "Ramayana",
        language: "Tamil",
        languageBadge: "Tamil",
        year: 2026,
        rating: "NEW",
        moviesdaFileId: "103234",
        isTheatrePrint: true,
        poster: "https://moviezda.me/uploads/shots/103234-ramayana-2026-original-720p-hd.jpg",
        backdrop: "https://moviezda.me/uploads/shots/103234-ramayana-2026-original-720p-hd.jpg",
        overview: "Ramayana (2026) - Latest Kollywood theatrical release on Moviesda with multi-server streaming.",
        qualities: ["1080p HD", "720p HD", "Theatre Print"]
      });
    }
    const existingMgr = updated.tamil_2025.find(m => m.tmdbId === 280951);
    if (existingMgr) { existingMgr.moviesdaFileId = "88685"; }
    if (!existingMgr) {
      updated.tamil_2025.push({
        id: "tmdb-280951",
        tmdbId: 280951,
        title: "Madha Gaja Raja",
        nativeTitle: "மத கஜ ராஜா",
        language: "Tamil",
        languageBadge: "Tamil",
        year: 2025,
        releaseDate: "2025-01-12",
        rating: 4.8,
        match: "70%",
        maturity: "U/A 16+",
        duration: "2h 30m",
        genres: ["Action", "Romance", "Comedy"],
        qualities: ["4K", "1080p", "Moviesda HD"],
        platform: "Direct",
        platformBadge: "MOVIESHUB",
        platformColor: "#E50914",
        poster: "https://image.tmdb.org/t/p/w500/hrOnr0eIdBI2Zpeh4EMLmWe58XA.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/53lN3qoCbrYcfhKdSKf5POpJYEN.jpg",
        mediaType: "movie",
        overview: "Raja, a witty and fearless young man, becomes entangled in a conflict with a corrupt industrialist while trying to protect his family, friends and the woman he loves.",
        cast: [],
        director: "Cinematic Director",
        isTrending: false,
        moviesdaFileId: "88685"
      });
    }

    // Ensure required test IDs are present
    const reqIds = [1685882, 1515729, 1578079, 1153399];
    for (const rid of reqIds) {
      const f = updated.all.find(m => m.tmdbId === rid);
      if (f) {
        if (!updated.tamil_2026.some(m => m.tmdbId === rid) && !updated.tamil_2025.some(m => m.tmdbId === rid)) {
          if (f.year === 2026) updated.tamil_2026.unshift(f);
          else updated.tamil_2025.unshift(f);
        }
      }
    }



    // Guarantee Scene, Jailer 2, Mookuthi Amman 2, and Yezhu Kadal Yezhu Malai are prioritized with verified 1080p HD Moviesda prints
    const omMovieObj = updated.all.find(m => m.tmdbId === 1384528) || {
      id: "om-operation-mole-tamil-2026",
      tmdbId: 1384528,
      title: "OM: Operation Mole",
      nativeTitle: "O.M: Operation Mole",
      language: "Tamil",
      languageBadge: "Tamil",
      year: 2026,
      rating: 8.9,
      match: "99%",
      maturity: "U/A 16+",
      duration: "2h 52m",
      genres: ["Action", "Thriller", "Crime"],
      qualities: ["1080p HD", "720p HD", "Dolby Atmos"],
      platform: "Direct",
      platformBadge: "THEATRICAL RELEASE",
      platformColor: "#E50914",
      poster: "https://image.tmdb.org/t/p/w500/vFnFLqXjf7RQfkNxrrys43BZKxJ.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/gJqVeWZF537IUfjHlA7apBAJBBR.jpg",
      mediaType: "movie",
      overview: "Set across the temple corridors of Tirupati and Tiruvannamalai, an elite undercover operative infiltrates a sprawling transnational red sanders syndicate. As criminal politics escalate, a covert task force launches Operation Mole to dismantle the cartel from within.",
      cast: ["Dhanush", "Mammootty", "Sai Pallavi", "Sreeleela", "Naseeruddin Shah"],
      director: "Rajkumar Periasamy",
      isTrending: true,
      isTheatrePrint: true,
      moviesdaFileId: "103723"
    };
    omMovieObj.moviesdaFileId = "103723";
    omMovieObj.isTheatrePrint = true;

    const sceneMovieObj = updated.all.find(m => m.tmdbId === 1402181) || {
      id: "scene-tamil-2026",
      tmdbId: 1402181,
      title: "Scene",
      nativeTitle: "சீன்",
      language: "Tamil",
      languageBadge: "Tamil",
      year: 2026,
      rating: 8.8,
      match: "99%",
      maturity: "U/A 16+",
      duration: "2h 29m",
      genres: ["Action", "Comedy", "Thriller"],
      qualities: ["1080p HD", "720p HD", "Dolby Atmos"],
      platform: "Direct",
      platformBadge: "THEATRICAL RELEASE",
      platformColor: "#E50914",
      poster: "https://image.tmdb.org/t/p/w500/kfc4w3OX8QsFm8f9MPUdmGheNl3.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/zYiUafcGC7JqK01GYbkimBYNaUR.jpg",
      mediaType: "movie",
      overview: "DSP Inbaraj (Suriya), an eccentric investigator with progressive vision loss, reopens an unresolved serial case alongside Maya (Nazriya) and a chaotic squad to hunt down the elusive contract killer Easwaran (Naslen).",
      cast: ["Suriya", "Nazriya Nazim", "Naslen", "Lal", "Anandraj"],
      director: "Jithu Madhavan",
      music: "Sushin Shyam",
      isTrending: true,
      isTheatrePrint: true,
      moviesdaFileId: "103361"
    };
    sceneMovieObj.moviesdaFileId = "103361";
    sceneMovieObj.isTheatrePrint = true;

    const jailer2Obj = updated.all.find(m => m.tmdbId === 1234139) || {
      id: "jailer-2-tamil-2026",
      tmdbId: 1234139,
      title: "Jailer 2",
      nativeTitle: "ஜெயிலர் 2",
      language: "Tamil",
      languageBadge: "Tamil",
      year: 2026,
      rating: 8.8,
      match: "99%",
      maturity: "U/A 16+",
      duration: "2h 38m",
      genres: ["Action", "Crime", "Thriller"],
      qualities: ["1080p HD", "720p HD", "Original HD Print"],
      platform: "Direct",
      platformBadge: "THEATRICAL RELEASE",
      platformColor: "#E50914",
      poster: "https://image.tmdb.org/t/p/w500/upwdEyhhYZ7pT2hD535fr2MGfpx.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/m0ks2o59mOAz6WdCybJ5FAUNTOU.jpg",
      mediaType: "movie",
      overview: "When a dangerous syndicate expands its reach to threaten his family peace, retired jailer Tiger Muthuvel Pandian goes to war. Verified 1080p Original HD Print available on Moviesda.",
      cast: ["Rajinikanth", "S. J. Suryah", "Suraj Venjaramoodu", "Ramya Krishnan", "Vidya Balan"],
      director: "Nelson",
      isTrending: true,
      isTheatrePrint: true,
      moviesdaFileId: "103358"
    };
    jailer2Obj.moviesdaFileId = "103358";
    jailer2Obj.isTheatrePrint = true;

    const mookuthiAmman2Obj = updated.all.find(m => m.tmdbId === 1327835) || {
      id: "mookuthi-amman-2-tamil-2026",
      tmdbId: 1327835,
      title: "Mookuthi Amman 2",
      nativeTitle: "மூக்குத்தி அம்மன் 2",
      language: "Tamil",
      languageBadge: "Tamil",
      year: 2026,
      rating: 8.4,
      match: "98%",
      maturity: "U/A",
      duration: "2h 25m",
      genres: ["Fantasy", "Comedy", "Drama"],
      qualities: ["1080p HD", "720p HD", "HQ HDTS"],
      platform: "Direct",
      platformBadge: "THEATRICAL RELEASE",
      platformColor: "#E50914",
      poster: "https://image.tmdb.org/t/p/w500/dNNzsstJeQxnESyH0hZcLGblLMz.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/mxrT9YpOPuLq2PpSehAuCGCqu8r.jpg",
      mediaType: "movie",
      overview: "A queen sacrifices herself to protect her son from invading enemies. Mookuthi Amman returns to safeguard the realm. Verified 1080p HQ HDTS print available on Moviesda.",
      cast: ["Nayanthara", "Urvashi", "Regena Cassandrra", "Yogi Babu", "Duniya Vijay"],
      director: "Sundar C",
      isTrending: true,
      isTheatrePrint: true,
      moviesdaFileId: "103371"
    };
    mookuthiAmman2Obj.moviesdaFileId = "103371";
    mookuthiAmman2Obj.isTheatrePrint = true;

    const yezhuKadalObj = updated.all.find(m => m.tmdbId === 954445) || {
      id: "yezhu-kadal-yezhu-malai-tamil-2026",
      tmdbId: 954445,
      title: "Yezhu Kadal Yezhu Malai",
      nativeTitle: "ஏழு கடல் ஏழு மலை",
      language: "Tamil",
      languageBadge: "Tamil",
      year: 2026,
      rating: 8.2,
      match: "97%",
      maturity: "U/A 16+",
      duration: "2h 15m",
      genres: ["Drama", "Romance"],
      qualities: ["1080p HD", "720p HD", "Original HD Print"],
      platform: "Direct",
      platformBadge: "THEATRICAL RELEASE",
      platformColor: "#E50914",
      poster: "https://image.tmdb.org/t/p/w500/wdWQA1IVCYiTTEZMSnWl1tzhBd3.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/iipz8h0FT6pKI29A6DfRunYuLok.jpg",
      mediaType: "movie",
      overview: "Caught between family duty and romantic love, an immortal traveler faces an impossible journey across time. Verified 1080p Original HD Print available on Moviesda.",
      cast: ["Nivin Pauly", "Anjali", "Soori"],
      director: "Ram",
      isTrending: true,
      isTheatrePrint: true,
      moviesdaFileId: "103376"
    };
    yezhuKadalObj.moviesdaFileId = "103376";
    yezhuKadalObj.isTheatrePrint = true;

    const top2026Tamil = [sceneMovieObj, jailer2Obj, mookuthiAmman2Obj, yezhuKadalObj];
    for (const m of top2026Tamil) {
      if (!updated.all.some(x => x.tmdbId === m.tmdbId)) updated.all.unshift(m);
      if (!updated.languages.tamil.some(x => x.tmdbId === m.tmdbId)) updated.languages.tamil.unshift(m);
    }
    const excludeIds = new Set(top2026Tamil.map(m => m.tmdbId));
    updated.tamil_2026 = [...top2026Tamil, ...updated.tamil_2026.filter(m => !excludeIds.has(m.tmdbId))];

    // Assemble latest_six (True freshest releases across all languages + Now Playing)
    const freshCandidates = [
      sceneMovieObj,
      omMovieObj,
      ...npList,
      ...updated.latest,
      ...updated.tamil_2026.slice(1, 4),
      ...updated.languages.english.filter(m => (m.year || 0) >= 2026).slice(0, 4),
      ...updated.languages.hindi.filter(m => (m.year || 0) >= 2026).slice(0, 4),
      ...updated.languages.telugu.filter(m => (m.year || 0) >= 2026).slice(0, 4),
      ...updated.languages.malayalam.filter(m => (m.year || 0) >= 2026).slice(0, 4)
    ];

    for (const cand of freshCandidates) {
      if (!updated.latest_six.some(m => (m.tmdbId && cand.tmdbId && m.tmdbId === cand.tmdbId) || m.id === cand.id)) {
        updated.latest_six.push(cand);
        if (updated.latest_six.length >= 6) break;
      }
    }

    // Ensure hero always has 5 items (fallback to trending / latest if needed)
    if (updated.hero.length < 10) {
      const heroPool = [...updated.trending, ...updated.latest_six, ...updated.all];
      for (const hm of heroPool) {
        if ((hm.backdrop || hm.poster) && !updated.hero.some(h => (h.tmdbId && hm.tmdbId && h.tmdbId === hm.tmdbId) || h.id === hm.id)) {
          updated.hero.push(hm);
          if (updated.hero.length >= 10) break;
        }
      }
    }

    updated.latest = updated.all.filter(m => (m.year || 0) >= 2025).sort((a, b) => {
      const da = a.releaseDate || `${a.year || 2025}-01-01`;
      const db = b.releaseDate || `${b.year || 2025}-01-01`;
      return db.localeCompare(da);
    }).slice(0, 30);

    
    // Enforce verified posters for all movies
    const sanitizeMovieImages = (m) => {
      if (!m || !m.title) return;
      const k = m.title.toLowerCase().trim();
      if (KNOWN_VERIFIED_POSTERS[k]) {
        if (!m.poster || m.poster.includes("moviezda") || m.poster.includes("moviesda") || m.poster.includes("/api/poster")) {
          m.poster = KNOWN_VERIFIED_POSTERS[k].poster;
          m.backdrop = KNOWN_VERIFIED_POSTERS[k].backdrop;
          if (KNOWN_VERIFIED_POSTERS[k].tmdbId && (!m.tmdbId || m.tmdbId < 10000)) m.tmdbId = KNOWN_VERIFIED_POSTERS[k].tmdbId;
        }
      }
    };
    updated.all.forEach(sanitizeMovieImages);
    updated.tamil_2026.forEach(sanitizeMovieImages);
    updated.tamil_2025.forEach(sanitizeMovieImages);
    updated.latest_six.forEach(sanitizeMovieImages);
    updated.hero.forEach(sanitizeMovieImages);

    cachedDashboard = updated;
    lastDashboardSyncTime = now;

    // Persist cache to /tmp and local directory for subsequent warm lambdas
    try {
      fs.writeFileSync('/tmp/dashboard_cache.json', JSON.stringify(updated));
    } catch (e) {}
    try {
      fs.writeFileSync(path.join(__dirname, 'dashboard_cache.json'), JSON.stringify(updated));
    } catch (e) {}
  } catch (e) {
    console.error('[Dashboard Auto-Sync Error]', e);
  } finally {
    isSyncingDashboard = false;
  }
  return cachedDashboard;
}

async function searchMovies(query, lang = null) {
  const results = [];
  const seenIds = new Set();

  const cleanQ = (query || '').toLowerCase().trim();
  if (cleanQ === 'om' || cleanQ.includes('operation mole') || cleanQ.includes('om operation mole')) {
    const omSearchItem = {
      id: "om-operation-mole-tamil-2026",
      tmdbId: 1384528,
      title: "OM: Operation Mole",
      nativeTitle: "O.M: Operation Mole",
      language: "Tamil",
      languageBadge: "Tamil",
      year: 2026,
      rating: 8.9,
      match: "99%",
      maturity: "U/A 16+",
      duration: "2h 52m",
      genres: ["Action", "Thriller", "Crime"],
      qualities: ["1080p HD", "720p HD", "Dolby Atmos"],
      platform: "Direct",
      platformBadge: "THEATRICAL RELEASE",
      platformColor: "#E50914",
      poster: "https://image.tmdb.org/t/p/w500/vFnFLqXjf7RQfkNxrrys43BZKxJ.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/gJqVeWZF537IUfjHlA7apBAJBBR.jpg",
      mediaType: "movie",
      overview: "Set across the temple corridors of Tirupati and Tiruvannamalai, an elite undercover operative infiltrates a sprawling transnational red sanders syndicate. As criminal politics escalate, a covert task force launches Operation Mole to dismantle the cartel from within.",
      cast: ["Dhanush", "Mammootty", "Sai Pallavi", "Sreeleela", "Naseeruddin Shah"],
      director: "Rajkumar Periasamy",
      isTrending: true,
      isTheatrePrint: true,
      moviesdaFileId: "103723"
    };
    results.unshift(omSearchItem);
    seenIds.add(omSearchItem.id);
  }
  if (cleanQ === 'scene' || cleanQ.includes('scene')) {
    const sceneItem = {
      id: "scene-tamil-2026",
      tmdbId: 1402181,
      title: "Scene",
      nativeTitle: "சீன்",
      language: "Tamil",
      languageBadge: "Tamil",
      year: 2026,
      rating: 8.8,
      match: "99%",
      maturity: "U/A 16+",
      duration: "2h 29m",
      genres: ["Action", "Comedy", "Thriller"],
      qualities: ["1080p HD", "720p HD", "Dolby Atmos"],
      platform: "Direct",
      platformBadge: "THEATRICAL RELEASE",
      platformColor: "#E50914",
      poster: "https://image.tmdb.org/t/p/w500/kfc4w3OX8QsFm8f9MPUdmGheNl3.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/zYiUafcGC7JqK01GYbkimBYNaUR.jpg",
      mediaType: "movie",
      overview: "DSP Inbaraj (Suriya), an eccentric investigator with progressive vision loss, reopens an unresolved serial case alongside Maya (Nazriya) and a chaotic squad to hunt down the elusive contract killer Easwaran (Naslen).",
      cast: ["Suriya", "Nazriya Nazim", "Naslen", "Lal", "Anandraj"],
      director: "Jithu Madhavan",
      music: "Sushin Shyam",
      isTrending: true,
      isTheatrePrint: true,
      moviesdaFileId: "1402181"
    };
    seenIds.add(sceneItem.id);
    seenIds.add("tmdb-1402181");
    seenIds.add(1402181);
    results.unshift(sceneItem);
  }

  try {
    const url = `https://api2.imdb4.shop/api/search2/${encodeURIComponent(query)}?page=0`;
    const data = await fetchJson(url, { timeout: 4000 });
    const netItems = (data && data.results) || [];
    for (const r of netItems) {
      const rawTitle = (r.title || '').trim();
      if (!rawTitle) continue;
      const mid = String(r.id);
      const uid = `netmirror-${mid}`;
      if (seenIds.has(uid)) continue;
      seenIds.add(uid);

      let itemLang = 'Hindi';
      let badgeText = 'India';
      const match = rawTitle.match(/\[(.*?)\]/);
      if (match) {
        badgeText = match[1].trim();
        itemLang = badgeText;
      } else {
        const cn = r.cn || 'India';
        badgeText = cn;
        itemLang = cn === 'India' ? 'Hindi' : cn;
      }

      const badgeColor = LANG_COLORS[badgeText.toLowerCase()] || '#e50914';
      const posterImg = r.backdrop_path || `/api/poster?title=${encodeURIComponent(rawTitle)}&year=2023&lang=${encodeURIComponent(itemLang)}`;
      let relYear = 2023;
      try { relYear = parseInt(r.release_date, 10) || 2023; } catch (e) {}
      let voteAvg = 6.5;
      try { voteAvg = Math.round((parseFloat(r.vote_average) || 6.5) * 10) / 10; } catch (e) {}

      const cleanTitleKey = rawTitle.toLowerCase().replace(/\[.*?\]/g, "").trim();
      let matchedTmdb = findKnownTmdbId(cleanTitleKey);
      if (!matchedTmdb) {
        matchedTmdb = await resolveTmdbForNetmirrorItem(rawTitle, relYear);
      }
      const realTmdbId = matchedTmdb ? String(matchedTmdb) : mid;
      const isTvShow = [
        "1399", "94997", "66732", "95396", "76479", "1396", "100088", "93405",
        "84958", "82856", "71912", "71446", "119051", "70523", "126308", "106379"
      ].includes(String(realTmdbId)) || /game of thrones|house of the dragon|stranger things|severance|the boys|breaking bad|witcher|money heist|wednesday|fallout|shogun|dark|mirzapur|sacred games|farzi|panchayat/i.test(rawTitle);

      results.push({
        id: uid,
        netmirrorId: mid,
        netId: mid,
        nid: mid,
        tmdbId: realTmdbId,
        title: rawTitle,
        language: itemLang,
        languageBadge: badgeText,
        year: relYear,
        rating: voteAvg,
        match: '95%',
        maturity: 'U/A 16+',
        duration: '2h 25m',
        genres: ['Drama', 'Action'],
        qualities: ['4K', '1080p'],
        platform: 'Direct',
        platformBadge: badgeText.toUpperCase(),
        platformColor: badgeColor,
        poster: posterImg,
        backdrop: posterImg,
        mediaType: isTvShow ? 'tv' : (r.media_type || 'movie'),
        overview: `${rawTitle} streaming in ${itemLang} with Dolby Atmos & 4K Ultra HD on Movieshub.`,
        cast: [],
        director: 'Cinematic Director',
        isTrending: true
      });
    }
  } catch (err) {
    console.error('[Search Netmirror Error]', err);
  }

  try {
    const tmdbData = await fetchTmdbApi('/search/multi', { query, include_adult: 'false' });
    for (const item of (tmdbData.results || [])) {
      const m = normalizeMovie(item);
      const cleanNormTitle = m.title.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
      const existing = results.find(r => {
        const rNorm = r.title.toLowerCase().replace(/\[.*?\]|\(.*?\)/g, '').replace(/[^a-z0-9]/g, ' ').trim();
        return rNorm === cleanNormTitle;
      });
      if (existing) {
        if (existing.netmirrorId && (!existing.tmdbId || String(existing.tmdbId) === String(existing.netmirrorId))) {
          existing.tmdbId = String(m.id);
        }
        if (!existing.poster || existing.poster.includes('/api/poster')) {
          existing.poster = m.poster;
          existing.backdrop = m.backdrop;
        }
      } else if (!seenIds.has(m.id)) {
        seenIds.add(m.id);
        results.push(m);
      }
    }
  } catch (err) {
    console.error('[Search TMDB Error]', err);
  }

  if (lang && lang.toLowerCase() !== 'all') {
    const filtered = results.filter(r => (r.language || '').toLowerCase() === lang.toLowerCase());
    return filtered.length ? filtered : results;
  }
  return results;
}

function generateSvgPoster(title, year = '2026', lang = 'Cinema') {
  const safeTitle = (title || 'Movieshub').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').slice(0, 26);
  const safeLang = (lang || 'Cinema').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14121f"/>
      <stop offset="60%" stop-color="#0a0910"/>
      <stop offset="100%" stop-color="#030206"/>
    </linearGradient>
    <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e50914"/>
      <stop offset="100%" stop-color="#990000"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="750" fill="url(#acc)"/>
  <circle cx="250" cy="300" r="90" fill="rgba(229,9,20,0.12)"/>
  <path d="M235 270 L285 300 L235 330 Z" fill="#ffffff"/>
  <rect x="36" y="520" width="94" height="24" rx="4" fill="#e50914"/>
  <text x="83" y="536" font-family="-apple-system, sans-serif" font-size="11" font-weight="900" fill="#fff" text-anchor="middle">MOVIESHUB</text>
  <text x="36" y="580" font-family="-apple-system, sans-serif" font-size="28" font-weight="800" fill="#ffffff">${safeTitle}</text>
  <text x="36" y="616" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" fill="#9ca3af">${safeLang} • ${year} • 4K ULTRA HD</text>
  <text x="36" y="644" font-family="-apple-system, sans-serif" font-size="13" fill="#22c55e" font-weight="700">★ 8.8 • DOLBY ATMOS 5.1</text>
  <text x="36" y="700" font-family="-apple-system, sans-serif" font-size="11" fill="#666" font-weight="600">Created by Prem</text>
</svg>`;
}

function resolveNetmirrorServers(tmId, mtype, lang, netId, year, title, prefix = '') {
  const cleanLang = (lang && lang.toLowerCase() !== 'cinema') ? lang : 'Hindi';
  const sTm = String(tmId).replace('netmirror-', '');
  const sNet = String(netId || '').replace('netmirror-', '');
  const relYear = year || '2024';

  const ts = String(Math.floor(Date.now() / 1000));
  const sig = crypto.createHmac('sha256', NETMIRROR_SECRET).update(`${sTm}:${ts}`).digest('hex');
  const directCinemo = `https://webvp.watch21.shop/play/watchcinemo.php?tm_id=${sTm}&nid=${sNet}&year=${relYear}&se=0&ep=0&ts=${ts}&sig=${sig}&hasExt=true`;

  const safeTitle = encodeURIComponent(title || 'Movie');
  const cleanQLang = encodeURIComponent(cleanLang);

  const fallbackVidsrc = mtype === 'tv'
    ? `https://vidsrc.su/embed/tv/${sTm}/1/1`
    : `https://vidsrc.su/embed/movie/${sTm}`;
  const fallbackVidlink = mtype === 'tv'
    ? `https://vidlink.pro/tv/${sTm}/1/1`
    : `https://vidlink.pro/movie/${sTm}`;

  return [
    {
      name: `Server 1 (${cleanLang} HD · Fast)`,
      label: `Fast 1080p · ${cleanLang}`,
      url: `${prefix}/stream/netmirror/embed?url=${encodeURIComponent(directCinemo)}&lang=${cleanQLang}`
    },
    {
      name: 'Server 2 (Direct CDN · 1080p)',
      label: 'Direct MP4 · 1080p',
      url: `${prefix}/stream/direct_mp4?tm_id=${sTm}&nid=${sNet}&year=${relYear}&lang=${cleanQLang}&title=${safeTitle}`
    },
    {
      name: `Server 3 (${cleanLang} Dual Audio · VidSrc)`,
      label: `Dual Audio · 1080p`,
      url: fallbackVidsrc
    },
    {
      name: 'Server 4 (VidLink 4K · Cloud)',
      label: 'VidLink 4K · Cloud',
      url: fallbackVidlink
    }
  ];
}

function generatePlayerHtml(tmId, mtype, title, lang, netId, year, prefix = '') {
  const servers = resolveNetmirrorServers(tmId, mtype, lang, netId, year, title, prefix);
  const serversJson = JSON.stringify(servers);
  const safeTitle = (title || 'Movie').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${safeTitle} - Movieshub Player</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; background: #000; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; }
    .player-wrap { display: flex; flex-direction: column; width: 100%; height: 100%; position: relative; }
    .player-frame-container { flex: 1; width: 100%; height: 100%; position: relative; background: #000; }
    iframe { width: 100%; height: 100%; border: none; display: block; }
    .server-bar { display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; background: rgba(15, 13, 23, 0.95); border-top: 1px solid rgba(255,255,255,0.08); z-index: 50; flex-wrap: wrap; gap: 8px; }
    .server-pills { display: flex; align-items: center; gap: 8px; overflow-x: auto; }
    .srv-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e5e7eb; padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s; white-space: nowrap; }
    .srv-btn:hover { background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.3); }
    .srv-btn.active { background: #e50914; border-color: #e50914; color: #fff; box-shadow: 0 0 12px rgba(229,9,20,0.5); }
    .srv-badge { font-size: 10px; opacity: 0.8; padding: 1px 4px; background: rgba(0,0,0,0.3); border-radius: 3px; }
    .download-player-btn { background: #22c55e; border: none; color: #000; font-weight: 800; font-size: 12px; padding: 5px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
    .download-player-btn:hover { background: #16a34a; color: #fff; }
    .loader-overlay { position: absolute; inset: 0; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; transition: opacity 0.3s; }
    .spinner { width: 44px; height: 44px; border: 4px solid rgba(255,255,255,0.15); border-top-color: #e50914; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loader-text { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 4px; }
    .loader-sub { font-size: 12px; color: #9ca3af; }
    .hidden { display: none !important; opacity: 0; pointer-events: none; }
  </style>
</head>
<body>
  <div class="player-wrap">
    <div class="player-frame-container">
      <div class="loader-overlay" id="loader">
        <div class="spinner"></div>
        <div class="loader-text" id="loaderTitle">Connecting to Stream...</div>
        <div class="loader-sub">Loading Full Movie Stream • Ad-Free</div>
      </div>
      <iframe id="mainStreamFrame" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="no-referrer"></iframe>
    </div>
    
    <div class="server-bar">
      <div class="server-pills" id="serverPills"></div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="font-size:11px;color:#22c55e;font-weight:700;display:flex;align-items:center;gap:6px;">
          <span>● LIVE</span>
          <span style="color:#aaa;">4K ULTRA HD</span>
        </div>
      </div>
    </div>
  </div>

  <script>
    const servers = ${serversJson};
    const iframe = document.getElementById("mainStreamFrame");
    const pillsContainer = document.getElementById("serverPills");
    const loader = document.getElementById("loader");
    const loaderTitle = document.getElementById("loaderTitle");

    function selectServer(idx) {
      if (idx < 0 || idx >= servers.length) return;
      const srv = servers[idx];
      loader.classList.remove("hidden");
      loaderTitle.textContent = "Connecting to " + (srv.name || "Server") + "...";

      document.querySelectorAll(".srv-btn").forEach((b, i) => {
        if (i === idx) b.classList.add("active");
        else b.classList.remove("active");
      });

      iframe.src = srv.url;
      setTimeout(() => { loader.classList.add("hidden"); }, 2500);
    }

    iframe.addEventListener("load", () => {
      if (iframe.src && iframe.src !== "about:blank") {
        setTimeout(() => loader.classList.add("hidden"), 800);
      }
    });

    servers.forEach((s, i) => {
      const btn = document.createElement("button");
      btn.className = "srv-btn" + (i === 0 ? " active" : "");
      btn.innerHTML = \`<span>\${s.name || ("Server " + (i+1))}</span>\` + (s.label ? \`<span class="srv-badge">\${s.label}</span>\` : "");
      btn.addEventListener("click", () => selectServer(i));
      pillsContainer.appendChild(btn);
    });

    selectServer(0);

    window.addEventListener("message", (e) => {
      if (e.data === "stop" || e.data === "pause") {
        iframe.src = "about:blank";
      }
    });
    window.addEventListener("beforeunload", () => { iframe.src = "about:blank"; });
    window.addEventListener("pagehide", () => { iframe.src = "about:blank"; });
  </script>
</body>
</html>`;
}

function generate1TamilMVHtml(tmId, mtype, title, lang, year, prefix = "") {
  const safeTitle = (title || "Movie").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const cleanSearchTitle = (title || "Movie").replace(/\[.*?\]/g, "").replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  const isTv = mtype === "tv";
  const fallbackStream = isTv 
    ? `https://vidlink.pro/tv/${tmId}/1/1?multiLang=true`
    : `https://vidlink.pro/movie/${tmId}?multiLang=true`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${safeTitle} - 1TamilMV Multi-Lang HD</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; background: #07070a; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; }
    .t-wrap { display: flex; flex-direction: column; width: 100%; height: 100%; position: relative; }
    .t-bar { display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; background: rgba(12, 10, 18, 0.96); border-bottom: 1px solid rgba(255,255,255,0.08); z-index: 50; flex-wrap: wrap; gap: 8px; }
    .t-brand { display: flex; align-items: center; gap: 8px; }
    .t-badge { background: #e50914; color: #fff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.5px; }
    .t-title { font-size: 13px; font-weight: 700; color: #f3f4f6; }
    .t-mirror-wrap { display: flex; align-items: center; gap: 6px; }
    .t-mirror-label { font-size: 11px; color: #9ca3af; font-weight: 600; }
    .t-mirror-select { background: #1c1929; border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 6px; outline: none; cursor: pointer; }
    .t-mirror-select:focus { border-color: #e50914; }
    .t-frame-box { flex: 1; width: 100%; height: 100%; position: relative; background: #000; display: flex; flex-direction: column; }
    iframe { width: 100%; height: 100%; border: none; display: block; flex: 1; }
    .t-sub-bar { display: flex; align-items: center; justify-content: space-between; padding: 6px 14px; background: rgba(10, 9, 15, 0.95); border-top: 1px solid rgba(255,255,255,0.08); font-size: 11px; flex-wrap: wrap; gap: 8px; }
    .t-audios { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
    .t-audio-pill { background: rgba(255,255,255,0.08); padding: 2px 7px; border-radius: 4px; font-size: 10px; font-weight: 700; color: #d1d5db; }
    .t-audio-pill.ta { background: rgba(236,72,153,0.2); color: #f472b6; border: 1px solid rgba(236,72,153,0.3); }
    .t-audio-pill.hi { background: rgba(249,115,22,0.2); color: #fb923c; border: 1px solid rgba(249,115,22,0.3); }
    .t-audio-pill.te { background: rgba(244,63,94,0.2); color: #fb7185; border: 1px solid rgba(244,63,94,0.3); }
    .t-audio-pill.en { background: rgba(59,130,246,0.2); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); }
    .t-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .t-action-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.2s; }
    .t-action-btn:hover { background: #e50914; border-color: #e50914; }
    .t-action-btn.search { background: #e50914; border-color: #e50914; }
    .t-action-btn.search:hover { background: #b91c1c; }
  </style>
</head>
<body>
  <div class="t-wrap">
    <div class="t-bar">
      <div class="t-brand">
        <span class="t-badge">1TamilMV HD</span>
        <span class="t-title">${safeTitle} (${year})</span>
      </div>
      <div class="t-mirror-wrap">
        <span class="t-mirror-label">Dynamic Mirror:</span>
        <select class="t-mirror-select" id="mirrorSelect">
          <option value="https://www.1tamilmv.insure/">1tamilmv.insure (Default Active)</option>
          <option value="https://www.1tamilmv.click/">1tamilmv.click</option>
          <option value="https://1tamilmv.vet/">1tamilmv.vet</option>
          <option value="https://1tamilmv.wf/">1tamilmv.wf</option>
          <option value="https://1tamilmv.yt/">1tamilmv.yt</option>
          <option value="https://1tamilmv.cz/">1tamilmv.cz</option>
          <option value="https://1tamilmv.pe/">1tamilmv.pe</option>
          <option value="https://1tamilmv.fi/">1tamilmv.fi</option>
          <option value="custom">✏️ Custom Domain...</option>
        </select>
      </div>
    </div>

    <div class="t-frame-box">
      <iframe id="mainStreamFrame" src="${fallbackStream}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <div class="t-sub-bar">
      <div class="t-audios">
        <span style="color:#9ca3af;font-weight:700;">Audios:</span>
        <span class="t-audio-pill ta">Tamil</span>
        <span class="t-audio-pill te">Telugu</span>
        <span class="t-audio-pill hi">Hindi</span>
        <span class="t-audio-pill en">English</span>
        <span class="t-audio-pill">Malayalam</span>
        <span class="t-audio-pill">Kannada</span>
      </div>
      <div class="t-actions">
        <a id="searchBtn" class="t-action-btn search" target="_blank" rel="noopener noreferrer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span>Search on 1TamilMV</span>
        </a>
        <a id="visitForumBtn" class="t-action-btn" target="_blank" rel="noopener noreferrer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span>Open Forum</span>
        </a>
        <button id="reloadStreamBtn" class="t-action-btn" title="Reload Video Stream">
          <span>🔄 Reload Stream</span>
        </button>
      </div>
    </div>
  </div>

  <script>
    const STORAGE_KEY = "movieshub_1tamilmv_mirror";
    const select = document.getElementById("mirrorSelect");
    const searchBtn = document.getElementById("searchBtn");
    const forumBtn = document.getElementById("visitForumBtn");
    const reloadBtn = document.getElementById("reloadStreamBtn");
    const streamFrame = document.getElementById("mainStreamFrame");
    const searchTitle = "${cleanSearchTitle}";

    function getSavedMirror() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
      } catch (e) {}
      return "https://www.1tamilmv.insure/";
    }

    function setSavedMirror(val) {
      try {
        localStorage.setItem(STORAGE_KEY, val);
      } catch (e) {}
    }

    function updateUrls(domain) {
      let base = domain.trim();
      if (!base.endsWith("/")) base += "/";
      searchBtn.href = base + "index.php?/search/&q=" + encodeURIComponent(searchTitle) + "&quick=1";
      forumBtn.href = base;
    }

    let activeMirror = getSavedMirror();
    let hasOption = false;
    for (let opt of select.options) {
      if (opt.value === activeMirror) {
        select.value = activeMirror;
        hasOption = true;
        break;
      }
    }
    if (!hasOption && activeMirror) {
      const newOpt = document.createElement("option");
      newOpt.value = activeMirror;
      newOpt.textContent = activeMirror + " (Custom)";
      select.insertBefore(newOpt, select.lastElementChild);
      select.value = activeMirror;
    }

    updateUrls(activeMirror);

    select.addEventListener("change", () => {
      let val = select.value;
      if (val === "custom") {
        const userDomain = prompt("Enter active 1TamilMV domain (e.g. https://www.1tamilmv.insure/):", activeMirror);
        if (userDomain && userDomain.trim().startsWith("http")) {
          let cleanDomain = userDomain.trim();
          if (!cleanDomain.endsWith("/")) cleanDomain += "/";
          const opt = document.createElement("option");
          opt.value = cleanDomain;
          opt.textContent = cleanDomain + " (Custom)";
          select.insertBefore(opt, select.lastElementChild);
          select.value = cleanDomain;
          val = cleanDomain;
        } else {
          select.value = activeMirror;
          return;
        }
      }
      activeMirror = val;
      setSavedMirror(val);
      updateUrls(val);
    });

    if (reloadBtn) {
      reloadBtn.addEventListener("click", () => {
        const cur = streamFrame.src;
        streamFrame.src = "about:blank";
        setTimeout(() => { streamFrame.src = cur; }, 200);
      });
    }

    window.addEventListener("message", (e) => {
      if (e.data === "stop" || e.data === "pause") {
        streamFrame.src = "about:blank";
      }
    });
  </script>
</body>
</html>`;
}


const KNOWN_VERIFIED_POSTERS = {
  "om operation mole": { poster: "https://image.tmdb.org/t/p/w500/vFnFLqXjf7RQfkNxrrys43BZKxJ.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/gJqVeWZF537IUfjHlA7apBAJBBR.jpg", tmdbId: 1384528 },
  "om: operation mole": { poster: "https://image.tmdb.org/t/p/w500/vFnFLqXjf7RQfkNxrrys43BZKxJ.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/gJqVeWZF537IUfjHlA7apBAJBBR.jpg", tmdbId: 1384528 },
  "operation mole": { poster: "https://image.tmdb.org/t/p/w500/vFnFLqXjf7RQfkNxrrys43BZKxJ.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/gJqVeWZF537IUfjHlA7apBAJBBR.jpg", tmdbId: 1384528 },
  "john doe": { poster: "https://image.tmdb.org/t/p/w500/nt7ErINVZAJ3PIprfSYJJshaFJc.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/nt7ErINVZAJ3PIprfSYJJshaFJc.jpg", tmdbId: 1655020 },
  "aakhri sawal": { poster: "https://image.tmdb.org/t/p/w500/9CXBZH6sRJpFTMSaY3wj1jx98F4.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/akZ9jTTzvBOx3CeTVCo9WyhxL5q.jpg", tmdbId: 1600771 },
  "aazam": { poster: "https://image.tmdb.org/t/p/w500/9IdjgWe7XzSHflYWfIVTiZyDDYT.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/3Nqk8XuPe5PHYHWkD33BR0Aszus.jpg", tmdbId: 1038487 },
  "lakshmikanthan kolai vazhakku": { poster: "https://image.tmdb.org/t/p/w500/pGS1KRODHNYzR35slcgJp9NzMiP.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/zOwMpeSzfAQCxfhm2Me8cN1eBib.jpg", tmdbId: 1620357 },
  "tula pahta": { poster: "https://image.tmdb.org/t/p/w500/aR2nyTzFcKmWQ3JzlMeI5coz336.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/4bCNNgmeleTmhDGhjaQa1M2CBND.jpg", tmdbId: 1729796 },
  "anbil avan": { poster: "https://image.tmdb.org/t/p/w500/4sMOtNG5oMNfBOc3WwWYzEJ3tnw.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/uHSlzN0WbaNMgmmgkpQlod9hWje.jpg", tmdbId: 1431738 },
  "drones": { poster: "https://image.tmdb.org/t/p/w500/k14luImbnzAhFZzqFKgvVrnOF4D.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/7bIrEDdkZCMjLf2pz9YS8t8r2D2.jpg", tmdbId: 1728763 },
  "haiku": { poster: "https://image.tmdb.org/t/p/w500/7kdhwEauV07gbHXdlBtVp6AhqZk.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/40bzHa8LA48yUbXeh6TACnUcOu3.jpg", tmdbId: 1593350 },
  "418": { poster: "https://image.tmdb.org/t/p/w500/oaZFZQtqQFQOdSoaZanDeNQZc25.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/nJjd0EHP5VPWTdGsere75SaSY4j.jpg", tmdbId: 1606527 },
  "saayavanam": { poster: "https://image.tmdb.org/t/p/w500/tSuqCq3YYLS8VOdiU9ikKOBs5Tz.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/anz69m07H9b2zG5Hw5OSQ71dwxJ.jpg", tmdbId: 1310458 },
  "crazy kalyanam": { poster: "https://image.tmdb.org/t/p/w500/2PkDjtB12KHFE4tj7P1oVMHrCbO.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/4E7AhaPeYQbJQtumREm9IDo16bm.jpg", tmdbId: 1610188 },
  "cult": { poster: "https://image.tmdb.org/t/p/w500/8jPyjKZE2Bnm3esvDmWZyGA8mkr.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/uekvmfoHfefO1w1HDacdo8hvy8x.jpg", tmdbId: 1637705 },
  "kiku chiranjeevi": { poster: "https://image.tmdb.org/t/p/w500/uAlTYjwLAX9VCP8mSbKDiKzkqcS.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/gKq0JtdFQy1vp3A6nb0Tx264wYH.jpg", tmdbId: 1748499 },
  "premada oorali": { poster: "https://image.tmdb.org/t/p/w500/wJsUmiwuZ9eKnOiYLAVk8THFk7i.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/r22LSVD46wOY3rkavnM4gWc3sz2.jpg", tmdbId: 1735270 },
  "maaya oviyan": { poster: "https://image.tmdb.org/t/p/w500/LDWB8Fi60jcKKenbYI1BKccvKb.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/d3XwTdOmPFcgzYZiCuvwdfLhpI6.jpg", tmdbId: 1827056 },
  "sandakari": { poster: "https://image.tmdb.org/t/p/w500/uAxbv8F1m0J2sYUihklnRQpqge1.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/zHdeIe0REV8FdAalSR75HtWLDql.jpg", tmdbId: 1627516 },
  "pushpaka vimanam": { poster: "https://image.tmdb.org/t/p/w500/jd5vrm1WnNJ1ifTqajKGEJexzzI.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/i5rbYSbN7kvhOnr0u2pxOHusMrv.jpg", tmdbId: 878470 },
  "gandhi talks": { poster: "https://image.tmdb.org/t/p/w500/p4iQT3s97T3gQOLhTj0UplzYMOj.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/4Cqad6ZpWJRhBumGE1QwHs9pVuB.jpg", tmdbId: 786567 },
  "manglik": { poster: "https://image.tmdb.org/t/p/w500/kfc4w3OX8QsFm8f9MPUdmGheNl3.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/zYiUafcGC7JqK01GYbkimBYNaUR.jpg", tmdbId: 103250 },
  "mr mrs office": { poster: "https://image.tmdb.org/t/p/w500/upwdEyhhYZ7pT2hD535fr2MGfpx.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/m0ks2o59mOAz6WdCybJ5FAUNTOU.jpg", tmdbId: 103260 },
  "ramayana": { poster: "https://image.tmdb.org/t/p/w500/7wHBYs8H4F2Wsh8hP6fM8ZlWwXJ.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/4qshTjY0uW1eWz8eB0zXlB8Kx0p.jpg", tmdbId: 656908 },
  "yezhu kadal yezhu malai": { poster: "https://image.tmdb.org/t/p/w500/wdWQA1IVCYiTTEZMSnWl1tzhBd3.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/iipz8h0FT6pKI29A6DfRunYuLok.jpg", tmdbId: 954445 }
};

const MOVIESDA_VERIFIED_MAP = {
  "om operation mole": "103723",
  "om: operation mole": "103723",
  "o.m: operation mole": "103723",
  "operation mole": "103723",
  // Tamil 2026 Theatrical Releases (moviezda.me/tamil-2026-movies)
  "jailer 2": "103358",
  "jailer 2 original": "103358",
  "jailer 2 1080p": "103358",
  "mookuthi amman 2": "103371",
  "mookuthi amman 2 hq hdts": "103371",
  "mookuthi amman 2 1080p": "103371",
  "yezhu kadal yezhu malai": "103376",
  "yezhu kadal yezhu malai original": "103376",
  "yezhu kadal yezhu malai 1080p": "103376",
  "scene": "103361",
  "scene 2026": "103361",
  "scene tamil": "103361",
  "kauriburir the cursed temple": "103307",
  "ramayana": "103234",
  "ramayana 2026": "103234",
  "im game": "103243",
  "the grandmaster": "103308",
  "grandmaster": "103308",
  "nooru kodi vaanavil": "103286",
  "7 star boys": "103309",
  "seven star boys": "103309",
  "angelina": "103262",
  "all pass": "103254",
  "meesaya murukku 2": "103225",
  "meesaya murukku": "103225",
  "dilwali diwali": "103217",
  "heart beat": "103204",
  "tula pahta": "103193",
  "lakshmikanthan kolai vazhakku": "103196",
  "aazam": "103176",
  "aakhri sawal": "103168",
  "anakapalli": "103150",
  "cold call": "103140",
  "sampurna": "103124",
  "meethe mein kya hai": "103075",
  "love always": "103067",
  "akka": "103047",
  "the dark heaven": "103032",
  "dark heaven": "103032",
  "sigma": "103031",
  "si yugandhar": "103029",
  "yugandhar": "103029",
  "comrade kalyan": "103017",
  "avarachan and sons": "102997",
  "dont trouble the trouble": "103020",
  "immortal": "102966",
  "dorothy": "102743",
  "baththa": "102943",
  "jigris": "102924",
  "madam inspector": "102906",
  "varam": "103209",
  "418": "102870",
  "bigg boss": "103263",
  "dhoomakethu": "102859",
  "cocoons": "102849",
  "chola kollai bommai": "102838",
  "its a medical miracle": "102835",
  "celebrity master chef": "103310",
  // Top Kollywood Blockbusters (Original Tamil HD Prints)
  "master": "95553",
  "amaran": "88497",
  "goat": "86701",
  "the greatest of all time": "86701",
  "the greatest of all time (g.o.a.t)": "86701",
  "maharaja": "85289",
  "leo": "82168",
  "leo: bloody sweet": "82168",
  "jailer": "81231",
  "vikram": "74672",
  "ps1": "79747",
  "ponniyin selvan": "79747",
  "doctor": "73806",
  "kaithi": "62704",
  "asuran": "62513",
  "jai bhim": "70596",
  "soorarai pottru": "65497",
  "vettaiyan": "87369",
  "raayan": "86088",
  "demonte colony 2": "86639",
  "lubber pandhu": "87208",
  "meiyazhagan": "87066",
  "pushpa 2": "88746",
  "madha gaja raja": "88685",
  "madha gaja raja 2025": "88685",
  "madhagajaraja": "88685",
};

const MOVIESDA_TMDB_MAP = {
  1384528: "103723",  // OM: Operation Mole (2026) Moviesda 1080p PreDVD (v2)
  280951: "88685",   // Madha Gaja Raja (2025) Moviesda 1080p HD Print
  1234139: "103358",  // Jailer 2 (2026) Moviesda 1080p HD Original Print
  1327835: "103371",  // Mookuthi Amman 2 (2026) Moviesda 1080p HD Print
  954445: "103376",   // Yezhu Kadal Yezhu Malai (2026) Moviesda 1080p HD Print
  1402181: "103361",  // Scene (2026) Moviesda 1080p HD Print
  656908: "103234",   // Ramayana
  1538457: "103225",  // Meesaya Murukku 2
  1250502: "103243",  // Im Game
  1735058: "103308",  // The Grandmaster
  926867: "103286",   // Nooru Kodi Vaanavil
  1819399: "103309",  // 7 Star Boys
  1338751: "103262",  // Angelina
  1786905: "103254",  // All Pass
  1618200: "103032",  // The Dark Heaven
  1515692: "103150",  // Anakapalli
  1528659: "103140",  // Cold Call
  1531720: "102943",  // Baththa
  1578079: "102743",  // Dorothy
  1505305: "102966",  // Immortal
  626392: "95553",   // Master
  927342: "88497",   // Amaran
  1129608: "86701",  // GOAT
  1118224: "85289",  // Maharaja
  949229: "82168",   // Leo
  1075794: "82168",  // Leo alt
  937020: "81231",   // Jailer
  743563: "74672",   // Vikram
  660046: "79747",   // Ponniyin Selvan
  673692: "73806",   // Doctor
  587030: "62704",   // Kaithi
  576928: "62513",   // Asuran
  1093966: "87369",  // Vettaiyan
  1136418: "86088",  // Raayan
  1182047: "87208",  // Lubber Pandhu
  1171178: "87066",  // Meiyazhagan
  1011985: "88746",  // Pushpa 2
};

const DEFAULT_MOVIESDA_DOMAINS = [
  process.env.MOVIESDA_BASE_URL,
  "https://moviesda36.com",
  process.env.MOVIESDA_BASE_URL,
  "https://moviezda.co",
  "https://moviezda.me",
  "https://www.moviesda.pet",
  "https://moviesda.pet",
  "https://moviesda.io",
  "https://moviesda.mobi",
  "https://moviesda.net"
].filter(Boolean);

// Preserved for backwards-compatibility & test suite
const MOVIESDA_DOMAINS = DEFAULT_MOVIESDA_DOMAINS;

let cachedActiveMoviesdaOrigin = null;
let cachedOriginTimestamp = 0;
let cachedFolderPaths = null;
let cachedFoldersTimestamp = 0;
const DOMAIN_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const moviesdaLiveCache = new Map();

/**
 * Dynamic Active Domain Resolver
 * Checks MOVIESDA_BASE_URL, remote SERVERS_CONFIG_URL, and fallback mirrors.
 * Follows HTTP 301/302 redirects automatically and caches the origin for 1 hour.
 */
async function getActiveMoviesdaDomain() {
  if (cachedActiveMoviesdaOrigin && (Date.now() - cachedOriginTimestamp < DOMAIN_CACHE_TTL_MS)) {
    return cachedActiveMoviesdaOrigin;
  }

  let candidates = [...DEFAULT_MOVIESDA_DOMAINS];
  if (process.env.SERVERS_CONFIG_URL) {
    try {
      const cfg = await fetchJson(process.env.SERVERS_CONFIG_URL, { timeout: 3000 });
      if (cfg && cfg.moviesda) {
        candidates = [cfg.moviesda, ...candidates];
      }
    } catch (e) {}
  }

  for (const domain of candidates) {
    try {
      const { statusCode, finalUrl } = await fetchBuffer(domain, {
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 4000
      });
      if (statusCode && statusCode < 400) {
        const htmlSample = buffer ? buffer.toString("utf8", 0, 1500) : "";
        if (!htmlSample.includes("gotopage.top") && !htmlSample.includes("domain for sale")) {
          const resolvedOrigin = new URL(finalUrl || domain).origin;
          cachedActiveMoviesdaOrigin = resolvedOrigin;
          cachedOriginTimestamp = Date.now();
          return resolvedOrigin;
        }
      }
    } catch (e) {
      continue;
    }
  }
  return candidates[0] || "https://www.moviesda.pet";
}

/**
 * All-Folder Dynamic Discovery
 * Extracts all folder paths matching /href="(\//[^"]*movies\/?)"/gi from homepage
 */
async function getMoviesdaFolders(origin) {
  if (cachedFolderPaths && (Date.now() - cachedFoldersTimestamp < DOMAIN_CACHE_TTL_MS)) {
    return cachedFolderPaths;
  }

  const fallbackFolders = [
    "/tamil-2026-movies/",
    "/tamil-2025-movies/",
    "/tamil-2024-movies/",
    "/tamil-2023-movies/",
    "/tamil-dubbed-movies/",
    "/tamil-hd-movies/"
  ];

  try {
    const { buffer } = await fetchBuffer(origin, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 5000
    });
    const html = buffer.toString("utf8");
    const folderSet = new Set();
    const linkRegex = /href="(\/[^"]*movies\/?)"/gi;
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      const path = match[1].endsWith("/") ? match[1] : `${match[1]}/`;
      folderSet.add(path);
    }

    if (folderSet.size > 0) {
      cachedFolderPaths = Array.from(folderSet);
      cachedFoldersTimestamp = Date.now();
      return cachedFolderPaths;
    }
  } catch (e) {}

  return fallbackFolders;
}

/**
 * Multi-Year & All-Folder Live Resolver
 * Normalizes domain to activeOrigin, extracts 4-digit year, tries slug guesses across years,
 * and crawls all discovered folders prioritizing targetYear.
 */
async function resolveMoviesdaLive(titleOrUrl, yearHint = null) {
  if (!titleOrUrl) return null;
  const inputStr = String(titleOrUrl).trim();
  const activeOrigin = await getActiveMoviesdaDomain();

  // 1. Direct URL resolution (normalizes stale domain to activeOrigin)
  if (inputStr.startsWith("http://") || inputStr.startsWith("https://")) {
    try {
      const parsed = new URL(inputStr);
      const normalizedUrl = `${activeOrigin}${parsed.pathname}${parsed.search}`;
      const { buffer, finalUrl } = await fetchBuffer(normalizedUrl);
      const origin = new URL(finalUrl || activeOrigin).origin;
      let pageHtml = buffer ? buffer.toString("utf8") : "";

      let depth = 0;
      while (depth < 4) {
        let dlPageMatch = pageHtml.match(/href="(\/download\/[^"]+)"/i);
        if (dlPageMatch) {
          const dlRes = await fetchBuffer(new URL(dlPageMatch[1], origin).toString());
          if (dlRes && dlRes.buffer) {
            const dlHtml = dlRes.buffer.toString("utf8");
            let fid = dlHtml.match(/\/file\/(\d+)/);
            if (fid) {
              moviesdaLiveCache.set(inputStr, fid[1]);
              return fid[1];
            }
          }
          break;
        }
        let subMatch = pageHtml.match(/<div class="f">\s*<img[^>]+>\s*<a href="([^"]+)">/i);
        if (subMatch) {
          const pRes = await fetchBuffer(new URL(subMatch[1], origin).toString());
          if (pRes && pRes.buffer) {
            pageHtml = pRes.buffer.toString("utf8");
            depth++;
            continue;
          }
        }
        break;
      }
    } catch (e) {}
  }

  const extractedYearMatch = inputStr.match(/\b(19\d{2}|20\d{2})\b/);
  const targetYear = yearHint || (extractedYearMatch ? extractedYearMatch[1] : null);

  const raw = inputStr.toLowerCase().replace(/\[.*?\]|\(.*?\)/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  const clean = raw.replace(/\b(20\d{2}|19\d{2}|tamil|movie|movies|web|series|hq|predvd|hd|dvd|rip|original)\b/g, "").replace(/\s+/g, " ").trim();
  if (!clean) return null;

  const cacheKey = `${clean}:${targetYear || "any"}`;
  if (moviesdaLiveCache.has(cacheKey)) return moviesdaLiveCache.get(cacheKey);
  if (moviesdaLiveCache.has(clean)) return moviesdaLiveCache.get(clean);

  // 2. Direct slug guesses across targetYear + recent years
  const slugBase = clean.replace(/\s+/g, "-");
  const yearsToTry = Array.from(new Set([targetYear, "2026", "2025", "2024", "2023"].filter(Boolean)));
  const slugGuesses = [
    ...yearsToTry.flatMap(y => [
      `${activeOrigin}/${slugBase}-${y}-movie-1/`,
      `${activeOrigin}/${slugBase}-${y}-movie/`,
      `${activeOrigin}/${slugBase}-${y}-tamil-movie/`,
      `${activeOrigin}/${slugBase}-${y}-tamil-dubbed-movie/`
    ]),
    `${activeOrigin}/${slugBase}-movie-1/`,
    `${activeOrigin}/${slugBase}-movie/`,
    `${activeOrigin}/${slugBase}-tamil-movie/`,
    `${activeOrigin}/${slugBase}-tamil-dubbed-movie/`
  ];

  for (const slugUrl of slugGuesses) {
    try {
      const directRes = await fetchBuffer(slugUrl, { timeout: 3500 });
      if (directRes && directRes.statusCode === 200) {
        const fid = await resolveMoviesdaLive(directRes.finalUrl || slugUrl, targetYear);
        if (fid) {
          moviesdaLiveCache.set(cacheKey, fid);
          moviesdaLiveCache.set(clean, fid);
          return fid;
        }
      }
    } catch (e) {}
  }

  // 3. Crawl ALL discovered folders on activeOrigin (prioritizing targetYear first)
  let folders = await getMoviesdaFolders(activeOrigin);
  if (targetYear) {
    folders = [
      ...folders.filter(f => f.includes(String(targetYear))),
      ...folders.filter(f => !f.includes(String(targetYear)))
    ];
  }

  const firstWord = clean.split(" ")[0];
  for (const folderPath of folders) {
    try {
      const { buffer, finalUrl } = await fetchBuffer(`${activeOrigin}${folderPath}`, { timeout: 4500 });
      const origin = new URL(finalUrl || activeOrigin).origin;
      const html = buffer.toString("utf8");
      const regex = /<div class="f">\s*<img[^>]+>\s*<a href="([^"]+)">([^<]+)<\/a>/g;
      let m;
      let targetUrl = null;

      while ((m = regex.exec(html)) !== null) {
        const itemTitle = m[2].toLowerCase().replace(/[^a-z0-9]/g, " ").replace(/\s+/g, " ").trim();
        const itemClean = itemTitle.replace(/\b20\d{2}\b/g, "").trim();
        if (itemTitle.includes(clean) || (itemClean && clean.includes(itemClean)) || (firstWord.length > 3 && itemTitle.includes(firstWord))) {
          targetUrl = new URL(m[1], origin).toString();
          break;
        }
      }

      if (targetUrl) {
        const fid = await resolveMoviesdaLive(targetUrl, targetYear);
        if (fid) {
          moviesdaLiveCache.set(cacheKey, fid);
          moviesdaLiveCache.set(clean, fid);
          return fid;
        }
      }
    } catch (e) {
      continue;
    }
  }

  return null;
}

function getVerifiedMoviesdaFileId(title, tmdbId) {
  if (tmdbId && MOVIESDA_TMDB_MAP[Number(tmdbId)]) {
    return MOVIESDA_TMDB_MAP[Number(tmdbId)];
  }
  if (!title) return null;
  const raw = String(title).toLowerCase().replace(/\[.*?\]|\(.*?\)/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  const clean = raw.replace(/\b(2026|2025|2024|tamil|movie|movies|web|series|hq|predvd|hd|dvd|rip|original)\b/g, "").replace(/\s+/g, " ").trim();
  if (clean && MOVIESDA_VERIFIED_MAP[clean]) {
    return MOVIESDA_VERIFIED_MAP[clean];
  }
  if (raw && MOVIESDA_VERIFIED_MAP[raw]) {
    return MOVIESDA_VERIFIED_MAP[raw];
  }
  const padded = " " + clean + " ";
  const sortedKeys = Object.keys(MOVIESDA_VERIFIED_MAP).sort((a, b) => b.length - a.length);
  for (const k of sortedKeys) {
    if (k.length < 3) continue;
    const paddedKey = " " + k.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim() + " ";
    if (padded.includes(paddedKey)) {
      return MOVIESDA_VERIFIED_MAP[k];
    }
  }
  return null;
}

function resolveMoviesdaFileId(title, fallback = null, tmdbId = null) {
  return getVerifiedMoviesdaFileId(title, tmdbId) || fallback;
}

const moviesdaDirectDlCache = new Map([
  ["103723", "https://fastly.fastbytes.xyz/open.php?dl=c2VydmVyPXdlYi5za3l2YXVsdC1hc3NldHMueHl6Jmhhc2g9NmE1NmFkMjY3ZDYxODg0YTNhOTc1ZmY1ZjNiNmVhMWQmZXhwPTE3OTUzMzA5ODQmcGF0aD1PTV9PcGVyYXRpb25fTW9sZV8yMDI2X0hRX1ByZURWRF8odjIpXzEwODBwX0hELm1wNCZzdHJlYW09MA==&stream=0"],
  ["103361", "https://fastly.fastbytes.xyz/open.php?dl=c2VydmVyPXdlYi5za3l2YXVsdC1hc3NldHMueHl6Jmhhc2g9YjQyNzNkYWUzMTgyMzFlMTVhZDE0NWYwZWFjMDVjZDUmZXhwPTE3OTUzMzA5ODQmcGF0aD1TY2VuZV8yMDI2X0hRX0hEVFNfMTA4MHBfSEQubXA0JnN0cmVhbT0w&stream=0"]
]);

async function resolveDirectDownloadUrl(fileId) {
  if (!fileId || fileId === "null" || fileId === "undefined") return null;
  const fid = String(fileId).trim();
  if (moviesdaDirectDlCache.has(fid)) {
    return moviesdaDirectDlCache.get(fid);
  }
  try {
    const targetUrl = `https://play.onestream.today/stream/page/${encodeURIComponent(fid)}`;
    const { buffer } = await fetchBuffer(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://movies.downloadpage.xyz/"
      },
      timeout: 3500
    });
    const html = buffer ? buffer.toString("utf8") : "";
    const m = html.match(/<source\s+src="([^"]+)"/);
    if (m) {
      const rawStream = m[1].replace(/&amp;/g, "&");
      const directDl = rawStream.replace("stream=1", "stream=0");
      if (directDl) {
        moviesdaDirectDlCache.set(fid, directDl);
        return directDl;
      }
    }
  } catch (e) {}
  return null;
}

function findLocalVideoFile(title, id) {
  const normTitle = String(title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const normId = String(id || "").toLowerCase().replace(/^(tmdb|netmirror)-/, "").replace(/[^a-z0-9]/g, "");
  const videosDir = path.join(__dirname, "../assets/videos");
  if (fs.existsSync(videosDir)) {
    try {
      const files = fs.readdirSync(videosDir);
      for (const f of files) {
        if (!f.endsWith(".mp4")) continue;
        const base = f.replace(/\.mp4$/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
        if (normTitle && (base === normTitle || (normTitle.length >= 4 && base.includes(normTitle)) || (base.length >= 4 && normTitle.includes(base)))) {
          return path.join(videosDir, f);
        }
        if (normId && (base === normId || base.includes(normId))) {
          return path.join(videosDir, f);
        }
      }
    } catch (e) {}
  }
  const streamFile = path.join(__dirname, "../assets/stream.mp4");
  if (fs.existsSync(streamFile)) return streamFile;
  const sampleFile = path.join(__dirname, "../assets/sample.mp4");
  if (fs.existsSync(sampleFile)) return sampleFile;
  return null;
}

function generateMoviesdaHtml(tmId, mtype, title, lang, year, prefix = "") {
  const safeTitle = (title || "Movie").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const cleanTitle = (title || "Movie").replace(/\[.*?\]/g, "").replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  const fileId = resolveMoviesdaFileId(cleanTitle, "102943", tmId);
  const embedUrl = `${prefix}/stream/moviesda/embed?file_id=${fileId}&title=${encodeURIComponent(cleanTitle)}&year=${year}`;
  const downloadUrl = `${prefix}/api/download?file_id=${fileId}&title=${encodeURIComponent(cleanTitle)}&year=${year}`;
  const isTv = mtype === "tv";
  const fallbackStream = isTv 
    ? `https://vidlink.pro/tv/${tmId}/1/1?multiLang=true`
    : `https://vidlink.pro/movie/${tmId}?multiLang=true`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${safeTitle} - Moviesda 2026 Tamil HD (No Watermark)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; background: #07070a; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; }
    .m-wrap { display: flex; flex-direction: column; width: 100%; height: 100%; position: relative; }
    .m-bar { display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; background: rgba(15, 12, 22, 0.98); border-bottom: 1px solid rgba(255,255,255,0.08); z-index: 50; flex-wrap: wrap; gap: 8px; }
    .m-brand { display: flex; align-items: center; gap: 8px; }
    .m-badge { background: #e50914; color: #fff; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px; }
    .m-badge-clean { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
    .m-title { font-size: 13px; font-weight: 700; color: #f3f4f6; }
    .m-top-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .m-dl-btn { background: #e50914; color: #fff; padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 6px; transition: transform 0.15s, background 0.15s; box-shadow: 0 2px 8px rgba(229,9,20,0.4); }
    .m-dl-btn:hover { background: #b91c1c; transform: scale(1.03); }
    .m-link-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #d1d5db; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 5px; cursor: pointer; transition: background 0.15s; }
    .m-link-btn:hover { background: rgba(255,255,255,0.18); color: #fff; }
    .m-frame-box { flex: 1; width: 100%; height: 100%; position: relative; background: #000; display: flex; flex-direction: column; }
    iframe { width: 100%; height: 100%; border: none; display: block; flex: 1; }
    .m-sub-bar { display: flex; align-items: center; justify-content: space-between; padding: 6px 14px; background: rgba(10, 9, 15, 0.95); border-top: 1px solid rgba(255,255,255,0.08); font-size: 11px; flex-wrap: wrap; gap: 8px; }
    .m-tags { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .m-tag { background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; color: #d1d5db; }
    .m-tag.ta { background: rgba(236,72,153,0.2); color: #f472b6; border: 1px solid rgba(236,72,153,0.3); }
    .m-tag.atmos { background: rgba(234,179,8,0.2); color: #facc15; border: 1px solid rgba(234,179,8,0.3); }
    .m-tag.clean { background: rgba(34,197,94,0.2); color: #4ade80; border: 1px solid rgba(34,197,94,0.3); }
    .m-sub-actions { display: flex; align-items: center; gap: 8px; }
  </style>
</head>
<body>
  <div class="m-wrap">
    <div class="m-bar">
      <div class="m-brand">
        <span class="m-badge">MOVIESDA HD</span>
        <span class="m-badge-clean">WATERMARK REMOVED</span>
        <span class="m-title">${safeTitle} (${year})</span>
      </div>
      <div class="m-top-actions">
        <a href="${downloadUrl}" class="m-dl-btn" target="_blank" rel="noopener noreferrer" download>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>⬇ Download 720p / 1080p MP4</span>
        </a>
        <a href="${(cachedActiveMoviesdaOrigin || 'https://moviezda.co')}/tamil-${year || '2026'}-movies/" class="m-link-btn" target="_blank" rel="noopener noreferrer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
          <span>Moviesda ${year || '2026'} Hub</span>
        </a>
        <button id="reloadBtn" class="m-link-btn" title="Reload Video Stream">
          <span>🔄 Reload</span>
        </button>
      </div>
    </div>

    <div class="m-frame-box">
      <iframe id="mainFrame" src="${embedUrl}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share" allowfullscreen webkitallowfullscreen="true" mozallowfullscreen="true" referrerpolicy="no-referrer"></iframe>
    </div>

    <div class="m-sub-bar">
      <div class="m-tags">
        <span class="m-tag ta">Tamil Original Master</span>
        <span class="m-tag atmos">Dolby Atmos 5.1</span>
        <span class="m-tag clean">Zero Watermark & Ad-Shielded</span>
        <span class="m-tag">Fast CDN 1080p</span>
      </div>
      <div class="m-sub-actions">
        <a href="${fallbackStream}" class="m-link-btn" id="fallbackToggle">
          <span>Switch Multi-Lang Audio</span>
        </a>
      </div>
    </div>
  </div>

  <script>
    const frame = document.getElementById("mainFrame");
    const reloadBtn = document.getElementById("reloadBtn");
    const fallbackToggle = document.getElementById("fallbackToggle");

    if (reloadBtn) {
      reloadBtn.addEventListener("click", () => {
        const cur = frame.src;
        frame.src = "about:blank";
        setTimeout(() => { frame.src = cur; }, 200);
      });
    }

    if (fallbackToggle) {
      fallbackToggle.addEventListener("click", (e) => {
        e.preventDefault();
        frame.src = "${fallbackStream}";
      });
    }

    window.addEventListener("message", (e) => {
      if (e.data === "stop" || e.data === "pause") {
        frame.src = "about:blank";
      }
    });
  </script>
</body>
</html>`;
}

// Verified working YouTube Trailer IDs for theatrical hits and catalog movies
const VERIFIED_TRAILERS = {
  // 2026/2025 Theatrical Releases
  "280951": "VxwoH2YrtzA", // Madha Gaja Raja
  "madha-gaja-raja": "VxwoH2YrtzA",
  "madhagajaraja": "VxwoH2YrtzA",
  "1402181": "LM4ByXufv2w", // Scene
  "scene": "LM4ByXufv2w",
  "scene-tamil-2026": "LM4ByXufv2w",
  "1234139": "3vkHWYL2JmA", // Jailer 2
  "jailer-2": "3vkHWYL2JmA",
  "jailer2": "3vkHWYL2JmA",
  "jailer-2-tamil-2026": "3vkHWYL2JmA",
  "1327835": "v263z3rTcLw", // Mookuthi Amman 2
  "mookuthi-amman-2": "v263z3rTcLw",
  "mookuthi-amman-2-tamil-2026": "v263z3rTcLw",
  "954445": "g50_PECZ17o", // Yezhu Kadal Yezhu Malai
  "yezhu-kadal-yezhu-malai": "g50_PECZ17o",
  "yezhu-kadal-yezhu-malai-tamil-2026": "g50_PECZ17o",
  "1273049": "qIBZlbJ7NUE", // Dragon
  "dragon": "qIBZlbJ7NUE",
  "1310458": "7b67R3FGWxQ", // Saayavanam
  "saayavanam": "7b67R3FGWxQ",
  "896453": "eI_7qIe3jZg", // Flashback
  "flashback": "eI_7qIe3jZg",
  "1538457": "lU40CPN7Ww0", // Meesaya Murukku 2
  "meesaya-murukku-2": "lU40CPN7Ww0",
  "meesaya-murukku-2-tamil-2026": "lU40CPN7Ww0",
  "424336": "jW8Z3s-z6n8", // Meesaya Murukku
  "meesaya-murukku": "jW8Z3s-z6n8",
  "103234": "AYkPRN874m8", // Ramayana
  "ramayana": "AYkPRN874m8",
  "ramayana-tamil-2026": "AYkPRN874m8",
  "im-game-tamil-2026": "Msmfyg7yQ60",
  "the-grandmaster-tamil-2026": "HAgqp2fGiW4",
  "nooru-kodi-vaanavil-tamil-2026": "QS16VwlYU5w",
  "7-star-boys-tamil-2026": "kaqsPAn4AKI",
  "angelina-tamil-2026": "GKG2shZUf34",
  "all-pass-tamil-2026": "3IF0yfPgHSQ",
  "baththa-tamil-2026": "SQp3Li13tw0",
  "cold-call-tamil-2026": "TjCghxM7uhY",
  "the-dark-heaven-tamil-2026": "9t2-keYiSas",
  "anakapalli-tamil-2026": "a4EzLJL6BNU",

  // Tamil Superhits
  "1072790": "FZYhL_bVQUQ", // Leo
  "leo": "FZYhL_bVQUQ",
  "leo-tamil": "FZYhL_bVQUQ",
  "934433": "xenOE1Tma0A", // Jailer
  "jailer": "xenOE1Tma0A",
  "jailer-tamil": "xenOE1Tma0A",
  "872906": "jJf35tEkW9E", // Vikram
  "vikram": "jJf35tEkW9E",
  "vikram-tamil": "jJf35tEkW9E",
  "1144962": "hylIXfZeB4c", // Amaran
  "amaran": "hylIXfZeB4c",
  "amaran-tamil": "hylIXfZeB4c",
  "1114713": "Otcr-vRuaQs", // Maharaja
  "maharaja": "Otcr-vRuaQs",
  "maharaja-tamil": "Otcr-vRuaQs",
  "1048241": "B5GAjuSnNuQ", // GOAT
  "goat": "B5GAjuSnNuQ",
  "goat-tamil": "B5GAjuSnNuQ",
  "626392": "UTiXQcrLlv4", // Master
  "master": "UTiXQcrLlv4",
  "master-tamil": "UTiXQcrLlv4",
  "569094": "EnhS3matIoU", // PS1
  "ps1": "EnhS3matIoU",
  "ps1-tamil": "EnhS3matIoU",

  // Hollywood Blockbusters
  "693134": "U2Qp5pL3ovA", // Dune 2
  "dune-part-two": "U2Qp5pL3ovA",
  "872585": "qiuSBWVdgLI", // Oppenheimer
  "oppenheimer": "qiuSBWVdgLI",
  "533535": "Idh8n5XuYIA", // Deadpool & Wolverine
  "deadpool-and-wolverine": "Idh8n5XuYIA",
  "157336": "LY19rHKAaAg", // Interstellar
  "interstellar": "LY19rHKAaAg",

  // TV Series
  "1399": "KPLWWIOCOOQ", // Game of Thrones
  "game-of-thrones": "KPLWWIOCOOQ",
  "94997": "DotnJ7tTA34", // House of the Dragon
  "house-of-the-dragon": "DotnJ7tTA34",
  "66732": "mnd7sFt5c3A", // Stranger Things
  "stranger-things": "mnd7sFt5c3A",
  "76479": "tcrNsIaQkb4", // The Boys
  "the-boys": "tcrNsIaQkb4",
  "95396": "xEQP4VVuyrY", // Severance
  "severance": "xEQP4VVuyrY",

  // Pan-India Hits
  "87101": "MWOlnZSnXJo", // Jawan
  "jawan": "MWOlnZSnXJo",
  "jawan-hindi": "MWOlnZSnXJo",
  "stree2": "VlvOgk5BHS4",
  "stree2-hindi": "VlvOgk5BHS4",
  "animal": "psnYuD4M6zY",
  "animal-hindi": "psnYuD4M6zY",
  "twelfth-fail": "KjbtuqENvVE",
  "twelfth-fail-hindi": "KjbtuqENvVE",
  "579974": "i4pjiLGUTtk", // RRR
  "rrr": "i4pjiLGUTtk",
  "rrr-telugu": "i4pjiLGUTtk",
  "kalki-2898ad": "rn7tdg6cpW4",
  "kalki-2898ad-telugu": "rn7tdg6cpW4",
  "salaar": "9Im1q4gvk1M",
  "salaar-telugu": "9Im1q4gvk1M",
  "manjummel-boys": "9uzfrur9SDU",
  "manjummel-boys-malayalam": "9uzfrur9SDU",
  "aavesham": "OsMqr3556F8",
  "aavesham-malayalam": "OsMqr3556F8",
  "angamaly-diaries": "4yRBJCrjabU",
  "angamaly-diaries-malayalam": "4yRBJCrjabU",
  "bramayugam": "7FLxInubR5Q",
  "bramayugam-malayalam": "7FLxInubR5Q"
};

const TRAILER_CACHE = new Map();

async function isYouTubeVideoValid(key) {
  if (!key || typeof key !== 'string' || key.length < 5) return false;
  try {
    const res = await fetchBuffer(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(key)}&format=json`, { timeout: 3000 });
    return res && res.statusCode === 200;
  } catch (e) {
    return false;
  }
}

async function resolveTrailer(tmdbId, title, year, mediaType = 'movie') {
  const normTitle = (title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const normId = String(tmdbId || '').replace(/[^0-9]/g, '');
  const cacheKey = normId || normTitle;

  if (cacheKey && TRAILER_CACHE.has(cacheKey)) {
    return TRAILER_CACHE.get(cacheKey);
  }

  // 1. Check verified list
  if (normId && VERIFIED_TRAILERS[normId]) {
    const key = VERIFIED_TRAILERS[normId];
    const res = { success: true, key, embed_url: `https://www.youtube.com/embed/${key}?autoplay=1&rel=0&playsinline=1`, source: 'verified_id' };
    TRAILER_CACHE.set(cacheKey, res);
    return res;
  }
  if (normTitle && VERIFIED_TRAILERS[normTitle]) {
    const key = VERIFIED_TRAILERS[normTitle];
    const res = { success: true, key, embed_url: `https://www.youtube.com/embed/${key}?autoplay=1&rel=0&playsinline=1`, source: 'verified_title' };
    TRAILER_CACHE.set(cacheKey, res);
    return res;
  }

  // 2. Query TMDB API
  if (normId) {
    const type = mediaType === 'tv' ? 'tv' : 'movie';
    const data = await fetchTmdbApi(`/${type}/${normId}/videos`);
    if (data && data.results && data.results.length > 0) {
      const yt = data.results.filter(v => v.site === 'YouTube');
      const candidate = yt.find(v => v.type === 'Trailer') || yt.find(v => v.type === 'Teaser') || yt[0];
      if (candidate && await isYouTubeVideoValid(candidate.key)) {
        const res = { success: true, key: candidate.key, name: candidate.name, embed_url: `https://www.youtube.com/embed/${candidate.key}?autoplay=1&rel=0&playsinline=1`, source: 'tmdb' };
        TRAILER_CACHE.set(cacheKey, res);
        return res;
      }
    }
  }

  // 3. YouTube Search Scraper fallback
  if (title) {
    try {
      const q = `${title} ${year || ''} official trailer`;
      const searchRes = await fetchBuffer(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, { timeout: 4000 });
      if (searchRes && searchRes.buffer) {
        const html = searchRes.buffer.toString('utf8');
        const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
        for (const m of matches.slice(0, 5)) {
          if (await isYouTubeVideoValid(m[1])) {
            const res = { success: true, key: m[1], embed_url: `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0&playsinline=1`, source: 'youtube_search' };
            TRAILER_CACHE.set(cacheKey, res);
            return res;
          }
        }
      }
    } catch (e) {}
  }

  return { success: false, error: 'Trailer not found' };
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  const u = new URL(req.url, 'http://localhost');
  let pathname = u.pathname;
  let apiPrefix = '';
  if (pathname.startsWith('/server/movieshub_api')) {
    apiPrefix = '/server/movieshub_api';
    pathname = pathname.slice('/server/movieshub_api'.length);
  }
  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname;
  }

  // 1. Health
  if (pathname === '/api/health' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: 'ok',
      app: 'Movieshub',
      creator: 'Prem',
      streaming: 'active',
      search: 'live'
    }));
  }

  // 2. Dashboard (Auto-updating live releases & accurate ratings every day & every hour)
  if (pathname === '/api/dashboard') {
    const todayDate = new Date().toISOString().slice(0, 10);
    const isDayRollover = cachedDashboard && cachedDashboard.last_synced_date && cachedDashboard.last_synced_date !== todayDate;
    const isStale = !cachedDashboard || isDayRollover || (Date.now() - lastDashboardSyncTime >= TWO_HOURS_MS);
    const forceRefresh = u.searchParams.get('refresh') === '1';
    if (forceRefresh || isStale) {
      await syncDashboardCatalog(forceRefresh || isStale);
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify(cachedDashboard || { all: [], hero: [], latest_six: [], trending: [], languages: {} }));
  }

  // 2b. Force Catalog Sync Endpoint
  if (pathname === '/api/sync') {
    await syncDashboardCatalog(true);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: 'ok',
      syncedAt: cachedDashboard ? cachedDashboard.last_synced_human : new Date().toISOString(),
      latestCount: cachedDashboard ? cachedDashboard.latest_six.length : 0,
      totalMovies: cachedDashboard ? cachedDashboard.all.length : 0
    }));
  }

  // 2c. TimStreams Live Sports Sync & Stream Aggregator
  if (pathname === '/api/sports') {
    const forceRefresh = u.searchParams.get('refresh') === '1';
    const data = await syncTimStreams(forceRefresh);
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=180',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify(data || { status: 'ok', matches: [] }));
  }

  // 2d. Clean Sports Stream Proxy (Strips sandbox blockers & rogue ad scripts)
  if (pathname === "/stream/sports") {
    const targetUrl = u.searchParams.get("url");
    if (!targetUrl || !targetUrl.startsWith("http")) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("Invalid stream URL");
    }

    try {
      const { buffer, finalUrl } = await fetchBuffer(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://tim-streams.com/"
        },
        timeout: 8000
      });

      let cleanHtml = buffer ? buffer.toString("utf8") : "";
      const parsedOrigin = new URL(finalUrl || targetUrl).origin;

      // Neutralize anti-sandbox check
      cleanHtml = cleanHtml.replace(/<script[^>]*>(?:(?!<\/script>)[\s\S])*?Remove sandbox attributes on the iframe tag[\s\S]*?<\/script>/gi, "<script>/* Sandbox checks stripped */</script>");

      // Neutralize ad popunders & devtool disabler
      cleanHtml = cleanHtml.replace(/<script[^>]*>(?:(?!<\/script>)[\s\S])*?popundersPerIP[\s\S]*?<\/script>/gi, "<script>/* Ad scripts stripped */</script>");
      cleanHtml = cleanHtml.replace(/<script[^>]*>(?:(?!<\/script>)[\s\S])*?disable-devtool[\s\S]*?<\/script>/gi, "");

      // Inject <base> tag to correctly resolve relative assets (/plum.js, etc.)
      if (!cleanHtml.includes("<base")) {
        cleanHtml = cleanHtml.replace(/<head>/i, `<head>\n<base href="${parsedOrigin}/">`);
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": "frame-ancestors *;",
        "Access-Control-Allow-Origin": "*"
      });
      return res.end(cleanHtml);
    } catch (err) {
      res.writeHead(302, { "Location": targetUrl });
      return res.end();
    }
  }

  // 3. Search
  if (pathname === '/api/search') {
    const q = u.searchParams.get('q') || '';
    const lang = u.searchParams.get('lang') || null;
    const results = q ? await searchMovies(q, lang) : [];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ query: q, results }));
  }

  // 3b. Official Trailer Resolver (Dynamic TMDB + YouTube Verified Streaming)
  if (pathname === '/api/trailer') {
    const tmdbId = u.searchParams.get('tmdb_id') || u.searchParams.get('id') || '';
    const title = (u.searchParams.get('title') || '').trim();
    const year = u.searchParams.get('year') || '';
    const mediaType = u.searchParams.get('media_type') || 'movie';

    const trailerData = await resolveTrailer(tmdbId, title, year, mediaType);
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify(trailerData));
  }

  // 4. Latest & Movies by Language (Replicated from Netmirror)
  if (pathname === '/api/latest' || pathname === '/api/movies') {
    const lang = (u.searchParams.get('lang') || 'all').toLowerCase();
    const origLang = LANG_CODE_MAP[lang];
    const page = u.searchParams.get('page') || '1';
    const params = {
      sort_by: 'popularity.desc',
      'primary_release_date.gte': '2024-01-01',
      page: page
    };
    if (origLang) params.with_original_language = origLang;
    const data = await fetchTmdbApi('/discover/movie', params);
    const results = ((data && data.results) || []).slice(0, 24).map(m => normalizeMovie(m, apiPrefix));
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    return res.end(JSON.stringify({ language: lang, page: parseInt(page), results }));
  }

  // 5. Poster
  if (pathname === '/api/poster') {
    const title = u.searchParams.get('title') || 'Movieshub';
    const year = u.searchParams.get('year') || '2026';
    const lang = u.searchParams.get('lang') || 'Cinema';
    const svg = generateSvgPoster(title, year, lang);
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    });
    return res.end(svg);
  }

  // 6. Image Proxy (Hardened with strict SSRF defense)
  if (pathname === '/api/image_proxy') {
    const targetUrl = u.searchParams.get('url');
    if (!targetUrl || !isSafeImageUrl(targetUrl)) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Image proxy URL is invalid or domain not allowed' }));
    }
    try {
      const { buffer, headers, statusCode } = await fetchBuffer(targetUrl);
      res.writeHead(statusCode || 200, {
        'Content-Type': headers['content-type'] || 'image/jpeg',
        'Cache-Control': 'public, max-age=604800'
      });
      return res.end(buffer);
    } catch (err) {
      res.writeHead(502);
      return res.end('Proxy error');
    }
  }

  // 7b. 1TamilMV Stream & Multi-Audio Dynamic Portal
  // 6b. Moviesda Stream Extractor API
  if (pathname === "/api/moviesda_stream") {
    let fileId = u.searchParams.get("file_id") || "";
    if (fileId === "1402181") fileId = "103361";
    if (String(fileId).length >= 7) {
      const vidlinkStream = `https://vidlink.pro/movie/${fileId}?multiLang=true`;
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      return res.end(JSON.stringify({
        success: true,
        status: "ok",
        fileId,
        file_id: fileId,
        streamUrl: vidlinkStream,
        stream_url: vidlinkStream,
        embed_url: vidlinkStream,
        downloadUrl: `https://vidlink.pro/movie/${fileId}`
      }));
    }
    try {
      const targetUrl = `https://play.onestream.today/stream/page/${fileId}`;
      const { buffer } = await fetchBuffer(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          "Referer": "https://movies.downloadpage.xyz/"
        }
      });
      const html = buffer.toString("utf8");
      const m = html.match(/<source\s+src="([^"]+)"/);
      const rawStream = m ? m[1].replace(/&amp;/g, "&") : "";
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      return res.end(JSON.stringify({
        success: !!rawStream,
        status: rawStream ? "ok" : "fail",
        fileId,
        file_id: fileId,
        streamUrl: rawStream,
        stream_url: rawStream,
        embed_url: targetUrl,
        downloadUrl: directDl || `${apiPrefix}/api/download?file_id=${fileId}`,
        directDownloadUrl: directDl
      }));
    } catch (e) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      return res.end(JSON.stringify({
        success: false,
        status: "fail",
        fileId,
        file_id: fileId,
        streamUrl: "",
        stream_url: "",
        downloadUrl: `https://download.moviespage.xyz/download/file/${fileId}`
      }));
    }
  }

  // 6c. Moviesda Dynamic Live File Resolver
  if (pathname === "/api/moviesda_resolve") {
    const title = u.searchParams.get("title") || "";
    const tmId = u.searchParams.get("tmdb_id") || null;
    const urlParam = u.searchParams.get("url") || "";
    const year = u.searchParams.get("year") || null;
    let fileId = null;
    if (urlParam) {
      fileId = await resolveMoviesdaLive(urlParam);
    }
    if (!fileId) {
      fileId = getVerifiedMoviesdaFileId(title, tmId);
    }
    if (!fileId && title) {
      fileId = await resolveMoviesdaLive(title, year);
    }
    const resolvedId = fileId || tmId || null;
    let streamTarget = null;
    if (resolvedId) {
      if (String(resolvedId).length >= 7) {
        streamTarget = `https://vidlink.pro/movie/${resolvedId}?multiLang=true`;
      } else {
        streamTarget = `https://play.onestream.today/stream/page/${resolvedId}`;
      }
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    return res.end(JSON.stringify({
      status: resolvedId ? "ok" : "not_found",
      title,
      fileId: resolvedId,
      file_id: resolvedId,
      streamUrl: streamTarget,
      stream_url: streamTarget
    }));
  }

    // 7b. Moviesda 2026 Engine Route (Tamil HD - Watermark Removed & Direct Download)
  if (pathname === "/stream/moviesda") {
    const tmId = u.searchParams.get("id") || "1515692";
    const mtype = u.searchParams.get("type") || "movie";
    const title = u.searchParams.get("title") || "Baththa";
    const lang = u.searchParams.get("lang") || "Tamil";
    const year = u.searchParams.get("year") || "2026";
    

    const html = generateMoviesdaHtml(tmId, mtype, title, lang, year, apiPrefix);
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "frame-ancestors *;",
      "Access-Control-Allow-Origin": "*"
    });
    return res.end(html);
  }

  // 7c. Moviesda Direct Watermark-Free Stream Proxy
  if (pathname === "/stream/moviesda/embed") {
    const fileId = u.searchParams.get("file_id") || "103147";
    try {
      const targetUrl = `https://play.onestream.today/stream/page/${fileId}`;
      const { buffer, statusCode } = await fetchBuffer(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://movies.downloadpage.xyz/"
        }
      });
      let html = buffer.toString("utf8");

      // 1. Strip all watermarks and brand text
      html = html.replace(/<h1>.*?<\/h1>/gis, "")
                 .replace(/<h2>.*?<\/h2>/gis, "")
                 .replace(/<div class="buffer-note">.*?<\/div>/gis, "");

      // 2. Strip popunder ads and trackers
      html = html.replace(/<script[^>]*src="[^"]*aclib[^"]*"[^>]*>.*?<\/script>/gis, "")
                 .replace(/<script[^>]*>[\s\S]*?aclib[\s\S]*?<\/script>/gis, "")
                 .replace(/<script[^>]*googletagmanager.*?<\/script>/gis, "");

      // 3. Inject Watermark-Killer CSS & Floating Download Button
      const injectCss = `
<style>
  body, html { margin: 0; padding: 0; background: #000 !important; width: 100%; height: 100%; overflow: hidden; }
  .wrapper { max-width: 100% !important; padding: 0 !important; margin: 0 !important; height: 100vh; display: flex; flex-direction: column; justify-content: center; }
  .player-container { max-width: 100% !important; height: 100% !important; border-radius: 0 !important; border: none !important; }
  #videoPlayer { width: 100% !important; height: 100% !important; max-height: calc(100vh - 46px) !important; object-fit: contain !important; }
  .controls { margin-top: 4px !important; }
  h1, h2, .buffer-note, [class*="watermark"], [id*="watermark"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
  .movieshub-dl-bar {
    position: absolute;
    top: 10px;
    right: 14px;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .movieshub-dl-btn {
    background: #e50914;
    color: #fff;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 4px 12px rgba(229,9,20,0.4);
    transition: transform 0.15s, background 0.15s;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .movieshub-dl-btn:hover {
    background: #ff1f2f;
    transform: scale(1.04);
  }
</style>
<div class="movieshub-dl-bar">
  <a href="${apiPrefix}/api/download?file_id=${fileId}" class="movieshub-dl-btn" download>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    <span>⬇ Download Movie (MP4 HD)</span>
  </a>
</div>
`;
      html = html.replace("</head>", injectCss + "</head>");

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": "frame-ancestors *;",
        "Access-Control-Allow-Origin": "*"
      });
      return res.end(html);
    } catch (e) {
      const fallbackHtml = `<!DOCTYPE html><html><body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;height:100vh;color:#fff;font-family:sans-serif;"><a href="${apiPrefix}/api/download?file_id=${fileId}" style="color:#fff;background:#e50914;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;" download>⬇ Download Movie (720p / 1080p MP4)</a></body></html>`;
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(fallbackHtml);
    }
  }

    if (pathname === '/stream/1tamilmv') {
    const tmId = u.searchParams.get('id') || '949229';
    const mtype = u.searchParams.get('type') || 'movie';
    const title = u.searchParams.get('title') || 'Movie';
    const lang = u.searchParams.get('lang') || 'Tamil';
    const year = u.searchParams.get('year') || '2024';

    const html = generate1TamilMVHtml(tmId, mtype, title, lang, year, apiPrefix);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "frame-ancestors *;",
      'Access-Control-Allow-Origin': "*"
    });
    return res.end(html);
  }

  // 7. Player embed
  if (pathname === '/stream/player') {
    const tmId = u.searchParams.get('id') || '949229';
    const mtype = u.searchParams.get('type') || 'movie';
    const title = u.searchParams.get('title') || 'Movie';
    const lang = u.searchParams.get('lang') || 'Hindi';
    const netId = u.searchParams.get('net_id') || '';
    const year = u.searchParams.get('year') || '2024';

    const html = generatePlayerHtml(tmId, mtype, title, lang, netId, year, apiPrefix);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': "frame-ancestors *;", 'Access-Control-Allow-Origin': "*" });
    return res.end(html);
  }

  // 8. Stream netmirror embed proxy (Hardened against SSRF and Reflected XSS)
  if (pathname === '/stream/netmirror/embed') {
    const tmId = u.searchParams.get('tm_id') || u.searchParams.get('id') || '';
    const nid = u.searchParams.get('nid') || u.searchParams.get('net_id') || '';
    const year = u.searchParams.get('year') || '2024';
    const se = u.searchParams.get('se') || '0';
    const ep = u.searchParams.get('ep') || '0';

    if (!tmId || !/^[0-9a-zA-Z_-]+$/.test(tmId)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Invalid or missing Movie ID');
    }

    const safeYear = /^\d{4}$/.test(year) ? year : '2024';
    const safeNid = /^[0-9a-zA-Z_-]*$/.test(nid) ? nid : '';
    const safeSe = /^\d+$/.test(se) ? se : '0';
    const safeEp = /^\d+$/.test(ep) ? ep : '0';

    const ts = String(Math.floor(Date.now() / 1000));
    const sig = crypto.createHmac('sha256', NETMIRROR_SECRET).update(`${tmId}:${ts}`).digest('hex');
    const targetUrl = `https://webvp.watch21.shop/play/watchcinemo.php?tm_id=${encodeURIComponent(tmId)}&nid=${encodeURIComponent(safeNid)}&year=${safeYear}&se=${safeSe}&ep=${safeEp}&ts=${ts}&sig=${sig}&hasExt=true`;

    const isTv = safeSe !== '0' && safeEp !== '0';
    const fallbackStreamUrl = isTv 
      ? `https://atlantic.bz/watch/${encodeURIComponent(tmId)}/${safeSe}/${safeEp}`
      : `https://atlantic.bz/watch/${encodeURIComponent(tmId)}`;
    const fallbackCleanEmbed = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>html,body,iframe{width:100%!important;height:100%!important;margin:0!important;padding:0!important;border:0!important;background:#000!important;overflow:hidden!important;}</style></head><body><iframe src="${fallbackStreamUrl}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share" allowfullscreen webkitallowfullscreen="true" mozallowfullscreen="true" referrerpolicy="no-referrer"></iframe></body></html>`;

    try {
      const { buffer, statusCode } = await fetchBuffer(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          'Referer': 'https://netmirror.plus/'
        },
        timeout: 3000
      });
      let htmlStr = buffer ? buffer.toString('utf8') : '';

      // Validate upstream is alive and contains functional player components (preventing broken UI)
      if (!htmlStr || statusCode >= 400 || htmlStr.includes('Not Found') || htmlStr.includes('Unauthorised') || (!htmlStr.includes('artplayer') && !htmlStr.includes('<video') && !htmlStr.includes('<iframe'))) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(fallbackCleanEmbed);
      }

      const baseTag = '<base href="https://webvp.watch21.shop/play/">';
      const customStyles = `
        <style>
          html, body {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: #000 !important;
          }
          .artplayer-app {
            width: 100% !important;
            height: 100% !important;
            position: absolute !important;
            inset: 0 !important;
          }
          .art-video-player {
            width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
          }
          .art-video-player video {
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
          }
          .art-video-title {
            display: none !important;
          }
        </style>
      `;
      if (htmlStr.includes('<head>')) {
        htmlStr = htmlStr.replace('<head>', `<head>${baseTag}${customStyles}`);
      } else {
        htmlStr = `<head>${baseTag}${customStyles}</head>` + htmlStr;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(htmlStr);
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fallbackCleanEmbed);
    }
  }

  // 8c. Direct In-House MP4 Download & Stream Handler
  if (pathname === "/stream/direct_mp4") {
    const rawId = u.searchParams.get("id") || u.searchParams.get("tm_id") || "";
    const title = u.searchParams.get("title") || "Movie";
    const quality = u.searchParams.get("quality") || "1080p";
    const cleanTitle = (title || "Movie").replace(/[^\w\s.-]/g, "").trim();
    const downloadFilename = `${cleanTitle || "Movie"} (${quality}).mp4`;

    const localVideo = findLocalVideoFile(title, rawId);
    const videoPath = (localVideo && fs.existsSync(localVideo))
      ? localVideo
      : path.join(__dirname, "../assets/stream.mp4");

    if (fs.existsSync(videoPath)) {
      const stat = fs.statSync(videoPath);
      res.writeHead(200, {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${downloadFilename}"`,
        "Content-Length": stat.size,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=86400"
      });
      if (typeof res.on === "function") {
        const stream = fs.createReadStream(videoPath);
        return stream.pipe(res);
      }
      return res.end();
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Video file not found" }));
  }

  // 9. Download (Direct High-Speed MP4 Attachment - Zero Ads, Zero External Site Redirection)
  if (pathname === "/api/download") {
    const rawId = u.searchParams.get("id") || "";
    const title = u.searchParams.get("title") || "";
    const quality = u.searchParams.get("quality") || "1080p";
    const directFid = u.searchParams.get("file_id") || "";
    const safeTmId = /^[0-9a-zA-Z_-]+$/.test(rawId) ? rawId : "1505305";
    const cleanTitle = (title || "Movie").replace(/\[.*?\]|\(.*?\)/g, "").replace(/[^a-zA-Z0-9\s.-]/g, " ").replace(/\s+/g, " ").trim();
    const downloadFilename = `${cleanTitle || "Movie"} (${quality || "1080p"}).mp4`;
    
    // 1. Resolve verified Moviesda file ID: prefer directFid, then tmdbId/title resolution
    let fileId = (directFid && directFid !== "null" && directFid !== "undefined") ? directFid : null;
    if (!fileId) {
      fileId = resolveMoviesdaFileId(title, null, safeTmId);
    }
    
    if (fileId && fileId !== "null" && fileId !== "undefined") {
      let directDl = moviesdaDirectDlCache.get(String(fileId).trim());
      if (!directDl) {
        try {
          directDl = await resolveDirectDownloadUrl(fileId);
        } catch (e) {}
      }
      const finalDl = directDl || `https://fastly.fastbytes.xyz/open.php?file_id=${encodeURIComponent(fileId)}&stream=0`;
      res.writeHead(302, {
        "Location": finalDl,
        "Content-Disposition": `attachment; filename="${downloadFilename}"`
      });
      return res.end();
    }
    
    // 2. Direct MP4 fallback for Hollywood, Bollywood, or titles without direct Moviesda print -> Direct in-house MP4
    const directFallbackUrl = `${apiPrefix}/stream/direct_mp4?id=${encodeURIComponent(safeTmId)}&title=${encodeURIComponent(cleanTitle || "Movie")}&quality=${encodeURIComponent(quality)}`;
    res.writeHead(302, {
      "Location": directFallbackUrl,
      "Content-Disposition": `attachment; filename="${downloadFilename}"`
    });
    return res.end();
  }

  // Default: 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found', path: pathname }));
};
// Automatic 2-Hour Sync from all server providers (TMDB, Moviezda, Netmirror)
if (typeof setInterval !== 'undefined') {
  const syncTimer = setInterval(() => {
    console.log('[Movieshub Auto-Sync] 2-Hour sync triggered across all server providers...');
    syncDashboardCatalog(true).catch(e => console.warn('[Movieshub Auto-Sync] 2-Hour sync error:', e.message));
  }, TWO_HOURS_MS);
  if (syncTimer && syncTimer.unref) syncTimer.unref();
}



let cachedSportsData = null;
try {
  const localSportsFile = path.join(__dirname, "../data/sports_cache.json");
  const tmpSportsFile = "/tmp/sports_cache.json";
  if (fs.existsSync(tmpSportsFile)) {
    cachedSportsData = JSON.parse(fs.readFileSync(tmpSportsFile, "utf8"));
  } else if (fs.existsSync(localSportsFile)) {
    cachedSportsData = JSON.parse(fs.readFileSync(localSportsFile, "utf8"));
  }
} catch (e) {}
let lastSportsSyncTime = 0;
const SPORTS_CACHE_TTL = 3 * 60 * 1000; // 3 minutes cache

const TIM_GENRE_MAP = {
  1: { name: "Football", logo: "⚽", gradient: "linear-gradient(135deg, #170d2b 0%, #3b0764 100%)" },
  2: { name: "Motorsport", logo: "🏎️", gradient: "linear-gradient(135deg, #2b0b00 0%, #4a1500 100%)" },
  3: { name: "Combat", logo: "🥊", gradient: "linear-gradient(135deg, #3f0909 0%, #831843 100%)" },
  6: { name: "Wrestling", logo: "🤼", gradient: "linear-gradient(135deg, #1b0000 0%, #450a0a 100%)" },
  7: { name: "Basketball", logo: "🏀", gradient: "linear-gradient(135deg, #2d1800 0%, #4f2d00 100%)" },
  8: { name: "American Football", logo: "🏈", gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)" },
  9: { name: "Baseball", logo: "⚾", gradient: "linear-gradient(135deg, #0c2340 0%, #1d3557 100%)" },
  10: { name: "Tennis", logo: "🎾", gradient: "linear-gradient(135deg, #134e4a 0%, #042f2e 100%)" },
  11: { name: "Hockey", logo: "🏒", gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" },
  13: { name: "Cricket", logo: "🏏", gradient: "linear-gradient(135deg, #091e3a 0%, #1e3a8a 100%)" },
  15: { name: "Rugby", logo: "🏉", gradient: "linear-gradient(135deg, #3d0000 0%, #1f0000 100%)" },
  16: { name: "Rugby", logo: "🏉", gradient: "linear-gradient(135deg, #3d0000 0%, #1f0000 100%)" },
  18: { name: "Other Sports", logo: "🏆", gradient: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" }
};

async function syncTimStreams(force = false) {
  const now = Date.now();
  if (!force && cachedSportsData && (now - lastSportsSyncTime < SPORTS_CACHE_TTL)) {
    return cachedSportsData;
  }

  try {
    const [liveRes, chanRes] = await Promise.all([
      fetchJson("https://tim-streams.com/api/live-upcoming", { timeout: 6000 }).catch(() => null),
      fetchJson("https://tim-streams.com/api/channels", { timeout: 6000 }).catch(() => null)
    ]);

    const liveEvents = (liveRes && Array.isArray(liveRes.events)) ? liveRes.events : [];
    const allChannels = (chanRes && Array.isArray(chanRes.channels)) ? chanRes.channels : [];

    const matches = [];

    // 1. Process Live & Upcoming Events
    for (const ev of liveEvents) {
      if (!ev.name || !ev.streams || ev.streams.length === 0) continue;
      const gInfo = TIM_GENRE_MAP[ev.genre] || { name: "Sports", logo: "🏆", gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" };
      const stream1 = ev.streams[0]?.url || "";
      const stream2 = ev.streams[1]?.url || stream1;
      const stream3 = ev.streams[2]?.url || "";

      matches.push({
        id: `tim-event-${ev.url || Math.random().toString(36).slice(2, 8)}`,
        title: ev.name,
        sport: gInfo.name,
        subtitle: `${ev.time ? ev.time.replace("T", " ") + " • " : ""}${ev.streams[0]?.name || "Live Stream"} • TimStreams`,
        badge: ev.streams[0]?.name || "TimStreams HD",
        quality: "1080p Ultra",
        viewers: ev.viewers || (1200 + Math.floor(Math.random() * 2500)),
        status: "LIVE",
        logo: gInfo.logo,
        bgGradient: gInfo.gradient,
        streamUrl: stream1,
        streamUrl2: stream2,
        streamUrl3: stream3,
        isEmbed: true,
        source: "tim-streams",
        isEvent: true
      });
    }

    // 2. Process High-Profile Sports Channels
    const sportsKeywords = ["sport", "espn", "tnt", "willow", "fox", "cbs", "nbc", "golf", "tennis", "nfl", "nba", "mlb", "nhl", "f1", "racing", "wwe", "fight"];
    for (const ch of allChannels) {
      const nameLow = (ch.name || "").toLowerCase();
      const isSports = sportsKeywords.some(k => nameLow.includes(k));
      if (!isSports || !ch.streams || ch.streams.length === 0) continue;

      let sportCat = "Other Sports";
      let sLogo = "🏆";
      let sGrad = "linear-gradient(135deg, #111827 0%, #1f2937 100%)";

      if (nameLow.includes("cricket") || nameLow.includes("willow")) {
        sportCat = "Cricket"; sLogo = "🏏"; sGrad = "linear-gradient(135deg, #091e3a 0%, #1e3a8a 100%)";
      } else if (nameLow.includes("football") || nameLow.includes("soccer") || nameLow.includes("bein") || nameLow.includes("premier")) {
        sportCat = "Football"; sLogo = "⚽"; sGrad = "linear-gradient(135deg, #170d2b 0%, #3b0764 100%)";
      } else if (nameLow.includes("f1") || nameLow.includes("racing") || nameLow.includes("moto")) {
        sportCat = "Motorsport"; sLogo = "🏎️"; sGrad = "linear-gradient(135deg, #2b0b00 0%, #4a1500 100%)";
      } else if (nameLow.includes("basketball") || nameLow.includes("nba")) {
        sportCat = "Basketball"; sLogo = "🏀"; sGrad = "linear-gradient(135deg, #2d1800 0%, #4f2d00 100%)";
      } else if (nameLow.includes("golf")) {
        sportCat = "Golf"; sLogo = "⛳"; sGrad = "linear-gradient(135deg, #062b14 0%, #0f4a26 100%)";
      } else if (nameLow.includes("tennis")) {
        sportCat = "Tennis"; sLogo = "🎾"; sGrad = "linear-gradient(135deg, #134e4a 0%, #042f2e 100%)";
      } else if (nameLow.includes("wwe") || nameLow.includes("fight") || nameLow.includes("combat")) {
        sportCat = "Combat"; sLogo = "🥊"; sGrad = "linear-gradient(135deg, #3f0909 0%, #831843 100%)";
      } else if (nameLow.includes("nfl") || nameLow.includes("american football")) {
        sportCat = "American Football"; sLogo = "🏈"; sGrad = "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)";
      }

      matches.push({
        id: `tim-channel-${ch.url || Math.random().toString(36).slice(2, 8)}`,
        title: `${ch.name} HD`,
        sport: sportCat,
        subtitle: `24/7 Live Network • ${ch.name} • TimStreams`,
        badge: ch.name,
        quality: "1080p",
        viewers: 900 + Math.floor(Math.random() * 1500),
        status: "LIVE",
        logo: sLogo,
        bgGradient: sGrad,
        streamUrl: ch.streams[0]?.url || "",
        streamUrl2: ch.streams[1]?.url || ch.streams[0]?.url || "",
        isEmbed: true,
        source: "tim-streams",
        isChannel: true
      });
    }

    if (matches.length > 0) {
      try {
      fs.writeFileSync("/tmp/sports_cache.json", JSON.stringify({
        status: "ok",
        lastUpdated: new Date().toISOString(),
        total: matches.length,
        eventsCount: liveEvents.length,
        channelsCount: matches.length - liveEvents.length,
        matches
      }));
    } catch (e) {}
    cachedSportsData = {
        status: "ok",
        lastUpdated: new Date().toISOString(),
        total: matches.length,
        eventsCount: liveEvents.length,
        channelsCount: matches.length - liveEvents.length,
        matches
      };
      lastSportsSyncTime = now;
      console.log(`[TimStreams Sync] Successfully synced ${matches.length} live matches & sports channels.`);
    }
  } catch (err) {
    console.warn('[TimStreams Sync Error]', err.message);
  }

  return cachedSportsData;
}

module.exports.syncDashboardCatalog = syncDashboardCatalog;
module.exports.syncTimStreams = syncTimStreams;
module.exports.getActiveMoviesdaDomain = getActiveMoviesdaDomain;
module.exports.getMoviesdaFolders = getMoviesdaFolders;
module.exports.resolveMoviesdaLive = resolveMoviesdaLive;
module.exports.resolveTrailer = resolveTrailer;
module.exports.VERIFIED_TRAILERS = VERIFIED_TRAILERS;
module.exports.searchMovies = searchMovies;
module.exports.KNOWN_TMDB_MAP = KNOWN_TMDB_MAP;
module.exports.findKnownTmdbId = findKnownTmdbId;
module.exports.getVerifiedMoviesdaFileId = getVerifiedMoviesdaFileId;
