'use strict';

const https = require('https');
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { URL, URLSearchParams } = require('url');

const NETMIRROR_SECRET = 'net###@@sss';
const TMDB_KEYS = ['c8dea14dc917687ac631a52620e4f7ad', '3cb41ecea3bf606c56552db3d17adefd'];

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

let cachedDashboard = null;
try {
  const cachePath = path.join(__dirname, 'dashboard_cache.json');
  if (fs.existsSync(cachePath)) {
    cachedDashboard = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
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

function fetchBuffer(url, options = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const client = u.protocol === 'http:' ? http : https;
    const req = client.request(u, {
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Referer': 'https://netmirror.plus/',
        ...(options.headers || {})
      },
      timeout: options.timeout || 8000
    }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), headers: res.headers, statusCode: res.statusCode }));
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
  const vote = Math.round((parseFloat(item.vote_average) || 8.5) * 10) / 10;

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

  return {
    id: `tmdb-${mid}`,
    tmdbId: mid,
    title,
    nativeTitle,
    language: langName,
    languageBadge: langName,
    year,
    rating: vote,
    match: `${Math.min(99, Math.max(75, Math.floor(vote * 10 + 12)))}%`,
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
  'leo': 949229,
  'leo: bloody sweet': 949229,
  'jailer': 937020,
  'vikram': 743563,
  'master': 626392,
  'goat': 1129608,
  'the greatest of all time': 1129608,
  'amaran': 927342,
  'maharaja': 1118224,
  'ponniyin selvan': 660046,
  'kalki 2898 ad': 801688,
  'kalki': 801688,
  'aavesham': 1084812,
  'manjummel boys': 1069945,
  'bramayugam': 1166133,
  'stree 2': 1112426,
  '12th fail': 1163258,
  'jawan': 872906,
  'animal': 781732,
  'salaar': 770906,
  'rrr': 579974,
  'deadpool & wolverine': 533535,
  'dune: part two': 693134,
  'oppenheimer': 872585,
  'interstellar': 157336,
  'game of thrones': 1399,
  'got': 1399,
  'house of the dragon': 94997,
  'severance': 95396,
  'stranger things': 66732,
  'the boys': 76479
};

async function searchMovies(query, lang = null) {
  const results = [];
  const seenIds = new Set();

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

      const cleanTitleKey = rawTitle.toLowerCase().replace(/\[.*?\]/g, '').trim();
      let matchedTmdb = KNOWN_TMDB_MAP[cleanTitleKey];
      if (!matchedTmdb) {
        for (const [k, v] of Object.entries(KNOWN_TMDB_MAP)) {
          if (cleanTitleKey.includes(k) || k.includes(cleanTitleKey)) {
            matchedTmdb = v;
            break;
          }
        }
      }
      const realTmdbId = matchedTmdb ? String(matchedTmdb) : mid;
      const isTvShow = [
        "1399", "94997", "66732", "95396", "76479", "1396", "100088", "93405",
        "84958", "82856", "71912", "71446", "119051", "70523", "126308", "106379"
      ].includes(String(realTmdbId)) || /game of thrones|house of the dragon|stranger things|severance|the boys|breaking bad|witcher|money heist|wednesday|fallout|shogun|dark|mirzapur|sacred games|farzi|panchayat/i.test(rawTitle);

      results.push({
        id: uid,
        netmirrorId: mid,
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
      if (!seenIds.has(m.id) && !results.some(r => r.title.toLowerCase() === m.title.toLowerCase())) {
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

const MOVIESDA_FILE_MAP = {
  "anakapalli": "103147",
  "cold call": "103140",
  "baththa": "102943",
  "the dark heaven": "103000",
  "dorothy": "102980",
  "akka": "103050",
  "sigma": "103080",
  "si yugandhar": "103060",
  "comrade kalyan": "103040",
  "avarachan and sons": "103020",
  "immortal": "102990",
  "amaran": "102850",
  "maharaja": "101920",
  "the greatest of all time": "102450",
  "goat": "102450",
  "leo": "98540",
  "jailer": "96210",
  "jailer 2": "102943",
  "modha rathri": "103140",
  "vishwanath & sons": "103147"
};

function resolveMoviesdaFileId(title) {
  const clean = (title || "").toLowerCase().trim();
  for (const [k, v] of Object.entries(MOVIESDA_FILE_MAP)) {
    if (clean.includes(k) || k.includes(clean)) return v;
  }
  return "103147";
}

function generateMoviesdaHtml(tmId, mtype, title, lang, year, prefix = "") {
  const safeTitle = (title || "Movie").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const cleanTitle = (title || "Movie").replace(/\[.*?\]/g, "").replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  const fileId = resolveMoviesdaFileId(cleanTitle);
  const embedUrl = `${prefix}/stream/moviesda/embed?file_id=${fileId}&title=${encodeURIComponent(cleanTitle)}&year=${year}`;
  const downloadUrl = `https://download.moviespage.xyz/download/file/${fileId}`;
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
        <a href="https://moviezda.me/moviesda-tamil-movies-2026/" class="m-link-btn" target="_blank" rel="noopener noreferrer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
          <span>Moviesda 2026 Hub</span>
        </a>
        <button id="reloadBtn" class="m-link-btn" title="Reload Video Stream">
          <span>🔄 Reload</span>
        </button>
      </div>
    </div>

    <div class="m-frame-box">
      <iframe id="mainFrame" src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen referrerpolicy="no-referrer"></iframe>
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

  // 2. Dashboard
  if (pathname === '/api/dashboard') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=600'
    });
    return res.end(JSON.stringify(cachedDashboard || { all: [], latest_six: [], trending: [] }));
  }

  // 3. Search
  if (pathname === '/api/search') {
    const q = u.searchParams.get('q') || '';
    const lang = u.searchParams.get('lang') || null;
    const results = q ? await searchMovies(q, lang) : [];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ query: q, results }));
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

  // 6. Image Proxy
  if (pathname === '/api/image_proxy') {
    const targetUrl = u.searchParams.get('url');
    if (!targetUrl) {
      res.writeHead(400);
      return res.end('Missing url');
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
    const fileId = u.searchParams.get("file_id") || "103147";
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
        fileId,
        streamUrl: rawStream,
        downloadUrl: `https://download.moviespage.xyz/download/file/${fileId}`
      }));
    } catch (e) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      return res.end(JSON.stringify({
        success: false,
        fileId,
        streamUrl: "",
        downloadUrl: `https://download.moviespage.xyz/download/file/${fileId}`
      }));
    }
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
  <a href="https://download.moviespage.xyz/download/file/${fileId}" target="_blank" class="movieshub-dl-btn" rel="noopener noreferrer">
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
      const fallbackHtml = `<!DOCTYPE html><html><body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;height:100vh;color:#fff;font-family:sans-serif;"><a href="https://download.moviespage.xyz/download/file/${fileId}" target="_blank" style="color:#fff;background:#e50914;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">⬇ Download Movie (720p / 1080p MP4)</a></body></html>`;
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

  // 8. Stream netmirror embed proxy
  if (pathname === '/stream/netmirror/embed') {
    let targetUrl = u.searchParams.get('url') || '';
    if (!targetUrl) {
      const tmId = u.searchParams.get('tm_id') || u.searchParams.get('id') || '';
      const nid = u.searchParams.get('nid') || u.searchParams.get('net_id') || '';
      const year = u.searchParams.get('year') || '2024';
      if (tmId) {
        const ts = String(Math.floor(Date.now() / 1000));
        const sig = crypto.createHmac('sha256', NETMIRROR_SECRET).update(`${tmId}:${ts}`).digest('hex');
        targetUrl = `https://webvp.watch21.shop/play/watchcinemo.php?tm_id=${tmId}&nid=${nid}&year=${year}&se=0&ep=0&ts=${ts}&sig=${sig}&hasExt=true`;
      }
    }
    if (!targetUrl) {
      res.writeHead(400);
      return res.end('Missing url or id');
    }
    if (targetUrl.includes('hasExt=') && !targetUrl.includes('hasExt=true')) {
      targetUrl = targetUrl.replace('hasExt=', 'hasExt=true');
    } else if (!targetUrl.includes('hasExt=true')) {
      targetUrl += '&hasExt=true';
    }

    try {
      const { buffer } = await fetchBuffer(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          'Referer': 'https://netmirror.plus/'
        }
      });
      let htmlStr = buffer.toString('utf8');
      const baseTag = '<base href="https://webvp.watch21.shop/play/">';
      if (htmlStr.includes('<head>')) {
        htmlStr = htmlStr.replace('<head>', `<head>${baseTag}`);
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(htmlStr);
    } catch (err) {
      res.writeHead(502);
      return res.end('Stream Proxy error');
    }
  }

  // 9. Download
  if (pathname === "/api/download") {
    const tmId = u.searchParams.get("id") || "";
    const title = u.searchParams.get("title") || "";
    const quality = u.searchParams.get("quality") || "";
    
    if (quality === "moviesda" || (title && resolveMoviesdaFileId(title) !== "103147")) {
      const fileId = resolveMoviesdaFileId(title);
      const moviesdaDl = `https://download.moviespage.xyz/download/file/${fileId}`;
      res.writeHead(302, { "Location": moviesdaDl });
      return res.end();
    }
    const fallbackUrl = `https://vidlink.pro/movie/${tmId}`;
    res.writeHead(302, { "Location": fallbackUrl });
    return res.end();
  }

  // Default: 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found', path: pathname }));
};
