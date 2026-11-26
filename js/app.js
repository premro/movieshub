
const KNOWN_VERIFIED_POSTERS = {
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

/**
 * Movieshub Main Application Controller
 * Created by Prem
 */

class MovieshubApp {
  constructor() {
    this.catalog = [...MOVIE_CATALOG];
    this.movieMap = new Map();
    this.catalog.forEach(m => this.registerMovie(m));
    this.activeLanguage = "all"; // 'all', 'tamil', 'english', 'hindi', 'telugu', 'malayalam'
    this.activeGenre = "All";
    this.activeView = "home"; // 'home', 'tamil', 'english', 'hindi', 'mylist'
    this.searchQuery = "";
    
    // Device-Based Local Storage with Isolation
    this.refreshStorageKeys();
    this.myList = this.loadMyList();
    this.continueWatching = this.loadContinueWatching();

    this.loadedLanguages = new Set(["all"]);

    this.searchEngine = new MovieshubSearchEngine(this.catalog);
    this.player = new MovieshubPlayer();
    this.liveTv = new MovieshubLiveTV();
    this.sports = new MovieshubSports();

    this.heroCarouselMovies = [];
    this.currentHeroIndex = 0;
    this.heroInterval = null;
    this.lastCacheSync = localStorage.getItem("movieshub_dash_last_sync") || 0;
    this.setupTwoHourRefresh();

    this.init();
  }

  init() {
    this.renderHeader();
    this.renderLanguageBar();
    this.renderMainContent();
    this.bindSearchEvents();
    this.bindGlobalEvents();
    this.initProfileManagerUI();

    const hash = (window.location.hash || "").replace("#", "");
    if (hash === "livetv" || hash === "sports" || hash === "mylist") {
      this.switchView(hash);
    }

    // Auto-sync on startup: check if new day or if 2 hours elapsed
    const todayDateStr = new Date().toDateString();
    const lastClientSyncDay = localStorage.getItem("movieshub_last_sync_date");
    const lastClientSyncTimestamp = parseInt(localStorage.getItem("movieshub_dash_last_sync") || "0", 10);
    const isClientTwoHoursOld = !lastClientSyncTimestamp || (Date.now() - lastClientSyncTimestamp >= 2 * 60 * 60 * 1000);
    const needsDailySync = (lastClientSyncDay !== todayDateStr) || isClientTwoHoursOld;
    this.loadDashboardData(false, needsDailySync);

    // Auto-sync movies from all servers every 30 minutes / on day rollover / 2 hours elapsed
    setInterval(() => {
      const now = Date.now();
      const last = parseInt(localStorage.getItem("movieshub_dash_last_sync") || "0", 10);
      const today = new Date().toDateString();
      const dayChanged = localStorage.getItem("movieshub_last_sync_date") !== today;
      const expired = now - last >= 2 * 60 * 60 * 1000;
      this.loadDashboardData(true, dayChanged || expired);
    }, 30 * 60 * 1000);
    setInterval(() => this.loadDashboardData(true), 60 * 60 * 1000);

    // Auto-refresh when tab becomes active / focused if day changed or 2 hours elapsed
    let lastTabFocusSync = Date.now();
    const checkTabFocusSync = () => {
      const now = Date.now();
      const last = parseInt(localStorage.getItem("movieshub_dash_last_sync") || "0", 10);
      const today = new Date().toDateString();
      const dayChanged = localStorage.getItem("movieshub_last_sync_date") !== today;
      const expired = now - last >= 2 * 60 * 60 * 1000;
      if (dayChanged || expired || (now - lastTabFocusSync > 10 * 60 * 1000)) {
        lastTabFocusSync = now;
        this.loadDashboardData(true, dayChanged || expired);
      }
    };
    window.addEventListener("focus", checkTabFocusSync);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") checkTabFocusSync();
    });
  }

  /* ================= MOVIE REGISTRY & LOOKUP ================= */
  registerMovie(m) {
    if (!m || !m.title) return;
    const cleanK = m.title.toLowerCase().trim();
    if (KNOWN_VERIFIED_POSTERS[cleanK]) {
      if (!m.poster || m.poster.includes("moviezda") || m.poster.includes("moviesda") || m.poster.includes("/api/poster")) {
        m.poster = KNOWN_VERIFIED_POSTERS[cleanK].poster;
        m.backdrop = KNOWN_VERIFIED_POSTERS[cleanK].backdrop;
        if (KNOWN_VERIFIED_POSTERS[cleanK].tmdbId && (!m.tmdbId || m.tmdbId < 10000)) m.tmdbId = KNOWN_VERIFIED_POSTERS[cleanK].tmdbId;
      }
    }
    if (m.id) {
      const strId = String(m.id);
      this.movieMap.set(strId, m);
      if (strId.startsWith("tmdb-")) this.movieMap.set(strId.replace("tmdb-", ""), m);
      if (strId.startsWith("netmirror-")) this.movieMap.set(strId.replace("netmirror-", ""), m);
    }
    if (m.tmdbId) {
      this.movieMap.set(String(m.tmdbId), m);
    }
    const cleanTitle = (m.title || "").toLowerCase().trim();
    if (cleanTitle) this.movieMap.set("t:" + cleanTitle, m);
  }

  getMovieById(id, fallbackCard = null) {
    if (!id && !fallbackCard) return null;
    const strId = String(id || "").trim();

    // 1. Direct from movieMap
    if (strId && this.movieMap.has(strId)) return this.movieMap.get(strId);
    if (strId.startsWith("tmdb-") && this.movieMap.has(strId.replace("tmdb-", ""))) {
      return this.movieMap.get(strId.replace("tmdb-", ""));
    }

    // 2. Main catalog search
    let found = this.catalog.find(c => c.id === strId || String(c.id) === strId || (c.tmdbId && String(c.tmdbId) === strId));
    if (found) {
      this.registerMovie(found);
      return found;
    }

    // 3. Continue watching
    if (this.continueWatching) {
      found = this.continueWatching.find(c => c.id === strId || String(c.id) === strId || (c.tmdbId && String(c.tmdbId) === strId));
      if (found) {
        this.registerMovie(found);
        return found;
      }
    }

    // 4. Dashboard cache all sections
    if (this.dashboardData) {
      const allSections = [
        ...(this.dashboardData.tamil_2026 || []),
        ...(this.dashboardData.tamil_2025 || []),
        ...(this.dashboardData.tamil_2024 || []),
        ...(this.dashboardData.latest_six || []),
        ...(this.dashboardData.trending || []),
        ...(this.dashboardData.latest || []),
        ...(this.dashboardData.all || [])
      ];
      if (this.dashboardData.languages && typeof this.dashboardData.languages === "object") {
        Object.values(this.dashboardData.languages).forEach(arr => {
          if (Array.isArray(arr)) allSections.push(...arr);
        });
      }
      found = allSections.find(c => c && (c.id === strId || String(c.id) === strId || (c.tmdbId && String(c.tmdbId) === strId)));
      if (found) {
        this.registerMovie(found);
        return found;
      }
    }

    // 5. Fallback reconstruction from DOM card element if present
    if (fallbackCard) {
      const titleEl = fallbackCard.querySelector(".card-title");
      const title = titleEl ? titleEl.textContent.trim() : (fallbackCard.querySelector(".card-img")?.getAttribute("alt") || "Movie");
      const poster = fallbackCard.querySelector(".card-img")?.getAttribute("src") || "";
      const lang = fallbackCard.querySelector(".card-lang-badge")?.textContent || "Tamil";
      const cleanNumId = strId.replace("tmdb-", "").replace("netmirror-", "");
      const tmdbId = (!isNaN(parseInt(cleanNumId, 10)) && parseInt(cleanNumId, 10) > 0) ? parseInt(cleanNumId, 10) : 927342;
      const reconstructed = {
        id: strId || `tmdb-${tmdbId}`,
        tmdbId: tmdbId,
        title: title,
        poster: poster,
        language: lang,
        year: 2026,
        rating: 8.0
      };
      this.registerMovie(reconstructed);
      return reconstructed;
    }

    return null;
  }

  /* ================= 2-HOUR DASHBOARD SYNC ================= */
  async loadDashboardData(silent = false, force = false) {
    try {
      const TWO_HOURS = 2 * 60 * 60 * 1000;
      const lastSyncTs = parseInt(localStorage.getItem("movieshub_dash_last_sync") || "0", 10);
      const lastSyncDay = localStorage.getItem("movieshub_last_sync_date");
      const shouldForce = Boolean(
        force ||
        !lastSyncTs ||
        (Date.now() - lastSyncTs >= TWO_HOURS) ||
        (lastSyncDay !== new Date().toDateString())
      );
      const pfx = (typeof window !== "undefined" && window.API_PREFIX) || "";
      const url = `${pfx}/api/dashboard?t=${Date.now()}${shouldForce ? "&refresh=1" : ""}`;
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        this.dashboardData = data;
        localStorage.setItem("movieshub_last_sync_date", new Date().toDateString());
        localStorage.setItem("movieshub_dash_last_sync", Date.now());
        let addedCount = 0;

        const mergeMovie = (m) => {
          if (!m || !m.title) return;
          this.registerMovie(m);
          const existing = this.catalog.find(c => 
            (c.tmdbId && m.tmdbId && String(c.tmdbId) === String(m.tmdbId)) ||
            (c.id && m.id && c.id === m.id) ||
            (c.title && m.title && c.title.toLowerCase() === m.title.toLowerCase())
          );
          if (!existing) {
            this.catalog.unshift(m);
            addedCount++;
          } else {
            if (m.rating && (typeof m.rating === "number" || m.rating === "NEW")) {
              existing.rating = m.rating;
            }
            if (m.year && m.year > (existing.year || 0)) existing.year = m.year;
            if (m.match) existing.match = m.match;
            if (m.moviesdaFileId) existing.moviesdaFileId = m.moviesdaFileId;
            if (Array.isArray(m.qualities) && m.qualities.length > 0) existing.qualities = m.qualities;
            if (m.platformBadge) existing.platformBadge = m.platformBadge;
            if (typeof m.isTheatrePrint === "boolean") existing.isTheatrePrint = m.isTheatrePrint;
            if (m.overview && m.overview.length > (existing.overview || "").length) existing.overview = m.overview;
            if (Array.isArray(m.genres) && m.genres.length > 0) existing.genres = m.genres;
            if (m.backdrop && (!existing.backdrop || existing.backdrop.includes("/api/poster"))) existing.backdrop = m.backdrop;
            if (m.poster && (!existing.poster || existing.poster.includes("/api/poster"))) existing.poster = m.poster;
          }
        };

        if (Array.isArray(data.hero)) data.hero.forEach(mergeMovie);
        (data.all || []).forEach(mergeMovie);
        (data.latest_six || []).forEach(mergeMovie);
        (data.trending || []).forEach(mergeMovie);
        (data.tamil_2026 || []).forEach(mergeMovie);
        (data.tamil_2025 || []).forEach(mergeMovie);
        (data.tamil_2024 || []).forEach(mergeMovie);

        if (data.languages && typeof data.languages === "object") {
          Object.values(data.languages).forEach(arr => {
            if (Array.isArray(arr)) arr.forEach(mergeMovie);
          });
        }

        const hasAllLanguages = data.languages &&
          Array.isArray(data.languages.english) && data.languages.english.length > 0 &&
          Array.isArray(data.languages.hindi) && data.languages.hindi.length > 0 &&
          Array.isArray(data.languages.telugu) && data.languages.telugu.length > 0 &&
          Array.isArray(data.languages.malayalam) && data.languages.malayalam.length > 0;

        if (!hasAllLanguages) {
          await this.syncClientSideLiveReleases(mergeMovie);
        }

        if (this.searchEngine) {
          this.searchEngine.catalog = this.catalog;
        }

        if (!this.searchQuery && (this.activeView === "home" || this.activeView === "movies")) {
          this.renderMainContent();
          if (addedCount > 0 && !silent) this.showToast(`Synced ${addedCount} latest releases`);
        }
      } else {
        await this.syncClientSideLiveReleases();
      }
    } catch (e) {
      await this.syncClientSideLiveReleases();
    }
  }

  async syncClientSideLiveReleases(mergeMovie) {
    let internalMerge = false;
    if (typeof mergeMovie !== "function") {
      internalMerge = true;
      mergeMovie = (m) => {
        if (!m || !m.title) return;
        this.registerMovie(m);
        const existing = this.catalog.find(c => 
          (c.tmdbId && m.tmdbId && String(c.tmdbId) === String(m.tmdbId)) ||
          (c.id && m.id && c.id === m.id) ||
          (c.title && m.title && c.title.toLowerCase() === m.title.toLowerCase())
        );
        if (!existing) {
          this.catalog.unshift(m);
        } else {
          if (m.moviesdaFileId) existing.moviesdaFileId = m.moviesdaFileId;
          if (m.isTheatrePrint) existing.isTheatrePrint = true;
          if (m.rating && (typeof m.rating === "number" || m.rating === "NEW")) existing.rating = m.rating;
        }
      };
    }
    try {
      const tmdbKey = "3cb41ecea3bf606c56552db3d17adefd";
      const endpoints = [
        "https://tmdb.imdb3.shop/3/movie/now_playing?api_key=" + tmdbKey + "&page=1",
        "https://tmdb.imdb3.shop/3/discover/movie?api_key=" + tmdbKey + "&with_original_language=ta&primary_release_year=2026&sort_by=popularity.desc",
        "https://tmdb.imdb3.shop/3/discover/movie?api_key=" + tmdbKey + "&with_original_language=te&primary_release_year=2026&sort_by=popularity.desc",
        "https://tmdb.imdb3.shop/3/discover/movie?api_key=" + tmdbKey + "&with_original_language=ml&primary_release_year=2026&sort_by=popularity.desc",
        "https://tmdb.imdb3.shop/3/discover/movie?api_key=" + tmdbKey + "&with_original_language=hi&primary_release_year=2026&sort_by=popularity.desc",
        "https://tmdb.imdb3.shop/3/discover/movie?api_key=" + tmdbKey + "&with_original_language=en&primary_release_year=2026&sort_by=popularity.desc"
      ];
      const langMap = { ta: "Tamil", te: "Telugu", ml: "Malayalam", hi: "Hindi", en: "English" };

      const responses = await Promise.allSettled(endpoints.map(url => fetch(url).then(r => r.json())));
      responses.forEach(res => {
        if (res.status === "fulfilled" && res.value && Array.isArray(res.value.results)) {
          const items = res.value.results;
          items.forEach(item => {
            if (!item || !item.id) return;
            const origLang = item.original_language || "en";
            const langName = langMap[origLang] || "English";
            const title = item.title || item.name || "Movie";
            const relDate = item.release_date || item.first_air_date || "2026";
            const year = parseInt(relDate.slice(0, 4), 10) || 2026;
            const vote = (item.vote_count >= 5 && item.vote_average > 0)
              ? Math.round(item.vote_average * 10) / 10
              : "NEW";
            const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "";
            const backdrop = item.backdrop_path ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}` : poster;

            const movieObj = {
              id: `tmdb-${item.id}`,
              tmdbId: item.id,
              title: title,
              nativeTitle: item.original_title || title,
              language: langName,
              languageBadge: langName,
              year: year,
              rating: vote,
              match: "98%",
              maturity: "U/A 16+",
              duration: "2h 30m",
              genres: ["Action", "Drama"],
              qualities: ["4K", "1080p"],
              platform: "Direct",
              platformBadge: "MOVIESHUB",
              platformColor: "#E50914",
              poster: poster,
              backdrop: backdrop,
              mediaType: "movie",
              overview: item.overview || `${title} (${year}) - Latest high definition release.`
            };

            const tLower = (title || "").toLowerCase();
            if (item.id === 1234139 || tLower.includes("jailer 2")) {
              movieObj.moviesdaFileId = "103358";
              movieObj.isTheatrePrint = true;
              movieObj.qualities = ["1080p HD", "720p HD", "Original HD Print"];
              movieObj.platformBadge = "ORIGINAL 1080P HD";
            } else if (item.id === 1327835 || tLower.includes("mookuthi amman 2")) {
              movieObj.moviesdaFileId = "103807";
              movieObj.isTheatrePrint = false;
              movieObj.qualities = ["1080p HD", "720p HD", "Original HD Print"];
              movieObj.platformBadge = "ORIGINAL 1080P HD";
            } else if (item.id === 954445 || tLower.includes("yezhu kadal")) {
              movieObj.moviesdaFileId = "103376";
              movieObj.isTheatrePrint = true;
              movieObj.qualities = ["1080p HD", "720p HD", "Original HD Print"];
              movieObj.platformBadge = "ORIGINAL 1080P HD";
            } else if (item.id === 1402181 || tLower === "scene") {
              movieObj.moviesdaFileId = "103361";
              movieObj.isTheatrePrint = true;
            }
            if (typeof mergeMovie === "function") {
              mergeMovie(movieObj);
            }
          });
        }
      });
      if (internalMerge) {
        if (this.searchEngine) this.searchEngine.catalog = this.catalog;
        if (!this.searchQuery && (this.activeView === "home" || this.activeView === "movies")) {
          this.renderMainContent();
        }
      }
    } catch (e) {
      // Non-fatal client fallback
    }
  }

  async fetchLanguageMovies(lang) {
    if (!lang || lang === "all") return;
    try {
      const pfx = (typeof window !== "undefined" && window.API_PREFIX) || "";
      const res = await fetch(`${pfx}/api/movies?lang=${encodeURIComponent(lang)}&page=1`);
      if (res.ok) {
        const data = await res.json();
        const results = data.results || [];
        let added = 0;
        results.forEach(m => {
          if (!m || !m.title) return;
          const existing = this.catalog.find(c =>
            (c.tmdbId && m.tmdbId && String(c.tmdbId) === String(m.tmdbId)) ||
            (c.id && m.id && c.id === m.id) ||
            (c.title && m.title && c.title.toLowerCase() === m.title.toLowerCase())
          );
          if (!existing) {
            this.catalog.push(m);
            added++;
          } else {
            if (m.moviesdaFileId) existing.moviesdaFileId = m.moviesdaFileId;
            if (m.isTheatrePrint) existing.isTheatrePrint = true;
          }
        });

        this.loadedLanguages.add(lang);
        if (this.searchEngine) this.searchEngine.catalog = this.catalog;

        if (added > 0 && this.activeLanguage === lang && !this.searchQuery) {
          this.renderMainContent();
        }
      }
    } catch (e) {
      // Quiet failover
    }
  }

  /* ================= DEVICE LOCAL STORAGE: WATCHLIST ================= */
  loadMyList() {
    try {
      const stored = localStorage.getItem(this.myListKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveMyList() {
    try {
      localStorage.setItem(this.myListKey, JSON.stringify(this.myList));
    } catch (e) {}
    this.updateMyListBadge();
  }

  updateMyListBadge() {
    const badge = document.getElementById("nav-mylist-count");
    if (badge) {
      badge.textContent = this.myList.length;
    }
    const mobileBadge = document.getElementById("mobile-mylist-count");
    if (mobileBadge) {
      mobileBadge.textContent = this.myList.length;
    }
  }

  /* ================= DEVICE LOCAL STORAGE: CONTINUE WATCHING ================= */
  loadContinueWatching() {
    try {
      const stored = localStorage.getItem(this.continueWatchingKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    return [];
  }

  saveContinueWatching() {
    try {
      localStorage.setItem(this.continueWatchingKey, JSON.stringify(this.continueWatching));
    } catch (e) {}
  }

  addToContinueWatching(movie) {
    if (!movie) return;
    const movieId = movie.id || `tmdb-${movie.tmdbId}`;
    this.continueWatching = this.continueWatching.filter(m => m.id !== movieId && m.tmdbId !== movie.tmdbId);
    
    const progress = movie.progressPercent || 25;
    const item = {
      id: movieId,
      tmdbId: movie.tmdbId,
      title: movie.title,
      poster: movie.poster,
      backdrop: movie.backdrop || movie.poster,
      year: movie.year || 2026,
      language: movie.language || "Cinema",
      mediaType: movie.mediaType || "movie",
      moviesdaFileId: movie.moviesdaFileId || null,
      qualities: movie.qualities || ["1080p HD", "720p HD"],
      platformBadge: movie.platformBadge || "MOVIESHUB",
      isTheatrePrint: Boolean(movie.isTheatrePrint),
      overview: movie.overview || "",
      progressPercent: progress,
      rating: movie.rating || 8.5,
      updatedAt: Date.now()
    };
    this.continueWatching.unshift(item);
    this.continueWatching = this.continueWatching.slice(0, 16);
    this.saveContinueWatching();

    if (!this.searchQuery && this.activeView === "home") {
      this.renderMainContent();
    }
  }

  removeFromContinueWatching(movieId) {
    this.continueWatching = this.continueWatching.filter(m => m.id !== movieId && String(m.tmdbId) !== String(movieId));
    this.saveContinueWatching();
    this.renderMainContent();
    this.showToast("Removed from Continue Watching");
  }

  /* ================= DOWNLOAD MODAL SYSTEM ================= */
  openDownloadModal(movie) {
    if (!movie) return;
    const modal = document.getElementById("download-modal");
    if (!modal) return;

    modal.innerHTML = `
      <div class="download-modal-backdrop" id="download-backdrop"></div>
      <div class="download-modal-box">
        <button class="download-close-btn" id="download-close">✕</button>
        <div class="download-header">
          <div class="download-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e50914" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </div>
          <div>
            <h3 style="font-size:20px;font-weight:800;color:#fff;margin-bottom:4px;">Download ${movie.title}</h3>
            <p style="font-size:13px;color:#9ca3af;">${movie.language} • ${movie.year || 2026} • Multi-Audio & Subtitles</p>
          </div>
        </div>

        <div class="download-options-list">
          <div class="download-opt-card" data-quality="4K" data-id="${movie.tmdbId || movie.id}">
            <div class="download-opt-left">
              <span class="download-badge-4k">4K UHD</span>
              <div>
                <strong style="font-size:14px;color:#fff;">2160p Ultra HD (Dolby Atmos 5.1)</strong>
                <span class="download-opt-meta">MKV / MP4 • High Bitrate • ~4.2 GB</span>
              </div>
            </div>
            <button class="btn-start-download">Download 4K</button>
          </div>

          <div class="download-opt-card" data-quality="1080p" data-id="${movie.tmdbId || movie.id}">
            <div class="download-opt-left">
              <span class="download-badge-fhd">1080p</span>
              <div>
                <strong style="font-size:14px;color:#fff;">1080p Full HD (Recommended)</strong>
                <span class="download-opt-meta">MP4 • Dual Audio • ~1.8 GB</span>
              </div>
            </div>
            <button class="btn-start-download">Download 1080p</button>
          </div>

          <div class="download-opt-card" data-quality="moviesda" data-id="${movie.tmdbId || movie.id}" style="border:1px solid rgba(229,9,20,0.4);background:rgba(229,9,20,0.06);">
            <div class="download-opt-left">
              <span class="download-badge-fhd" style="background:#e50914;">MOVIESDA</span>
              <div>
                <strong style="font-size:14px;color:#fff;">Moviesda 2026 Master (Watermark Removed)</strong>
                <span class="download-opt-meta">Direct MP4 • 1080p/720p Clean Print • ~1.2 GB</span>
              </div>
            </div>
            <button class="btn-start-download" style="background:#e50914;">Fast Download</button>
          </div>

          <div class="download-opt-card" data-quality="720p" data-id="${movie.tmdbId || movie.id}">
            <div class="download-opt-left">
              <span class="download-badge-hd">720p</span>
              <div>
                <strong style="font-size:14px;color:#fff;">720p Mobile HD</strong>
                <span class="download-opt-meta">MP4 • Fast Download • ~850 MB</span>
              </div>
            </div>
            <button class="btn-start-download">Download 720p</button>
          </div>
        </div>

        <div class="download-footer">
          <span style="color:#22c55e;font-size:12px;font-weight:700;">✓ Ad-Free Direct Download • No Redirection</span>
          <span style="color:#aaa;font-size:12px;">Created by <strong>Prem</strong></span>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");

    document.getElementById("download-close").addEventListener("click", () => modal.classList.add("hidden"));
    document.getElementById("download-backdrop").addEventListener("click", () => modal.classList.add("hidden"));

    modal.querySelectorAll(".btn-start-download").forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".download-opt-card");
        const quality = card.dataset.quality;
        btn.textContent = "Starting...";
        btn.disabled = true;

        const pfx = (typeof window !== "undefined" && window.API_PREFIX) || "";
        const rawTmId = movie.tmdbId || String(movie.id || "").replace(/^(tmdb|netmirror)-/, "");
        const fidParam = movie.moviesdaFileId ? `&file_id=${encodeURIComponent(movie.moviesdaFileId)}` : "";
        const downloadUrl = `${pfx}/api/download?id=${encodeURIComponent(rawTmId)}&quality=${encodeURIComponent(quality)}&title=${encodeURIComponent(movie.title || "")}${fidParam}`;
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.setAttribute("download", `${movie.title} (${movie.year || 2026}) - ${quality} Movieshub.mp4`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => {
          btn.textContent = "✓ Downloading";
          this.showToast(`Starting ${quality} download for ${movie.title}`);
          setTimeout(() => modal.classList.add("hidden"), 1200);
        }, 800);
      });
    });
  }

  /* ================= HEADER & NAVIGATION ================= */
  renderHeader() {
    const header = document.getElementById("movieshub-header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    });

    // Nav Links & Mobile Nav Items
    document.querySelectorAll(".nav-link, .mobile-nav-item").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        const lang = link.dataset.lang;

        if (view) {
          this.switchView(view);
        } else if (lang) {
          this.selectLanguage(lang);
        } else {
          this.switchView("movies");
        }
      });
    });

    // Brand Logo Click -> Reset to Home
    const logo = document.getElementById("brand-logo");
    if (logo) {
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        const searchInput = document.getElementById("live-search-input");
        if (searchInput) searchInput.value = "";
        this.searchQuery = "";
        this.selectLanguage("all");
      });
    }

    this.updateMyListBadge();
  }

  /* ================= LANGUAGE FILTER BAR ================= */
  renderLanguageBar() {
    const bar = document.getElementById("language-filter-bar");
    if (!bar) return;

    bar.innerHTML = `
      <div class="lang-container">
        <span class="lang-heading">Select Language:</span>
        <div class="lang-pills">
          ${LANGUAGES.map(l => `
            <button class="lang-pill ${this.activeLanguage === l.id ? "active" : ""}" data-lang="${l.id}">
              <span class="pill-flag">${l.flag}</span>
              <span class="pill-title">${l.name}</span>
              ${l.native ? `<span class="pill-native">${l.native}</span>` : ""}
            </button>
          `).join("")}
        </div>
        <div class="genre-filter-wrap">
          <select class="genre-select" id="genre-select" title="Filter by Genre">
            ${GENRES.map(g => `<option value="${g}">${g === "All" ? "All Genres" : g}</option>`).join("")}
          </select>
        </div>
      </div>
    `;

    // Bind language pill clicks
    bar.querySelectorAll(".lang-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const lang = pill.dataset.lang;
        this.selectLanguage(lang);
      });
    });

    // Bind genre select
    const genreSelect = document.getElementById("genre-select");
    if (genreSelect) {
      genreSelect.addEventListener("change", (e) => {
        this.activeGenre = e.target.value;
        this.renderMainContent();
      });
    }
  }

  switchLanguage(langId) { this.selectLanguage(langId); }

  selectLanguage(langId) {
    this.activeLanguage = (langId || "all").toLowerCase();
    this.activeView = "movies";
    this.searchQuery = "";

    const hero = document.getElementById("hero-banner");
    const langBar = document.getElementById("language-filter-bar");
    if (hero) hero.style.display = "block";
    if (langBar) langBar.style.display = "block";
    if (this.liveTv) this.liveTv.destroy();
    if (this.sports) this.sports.destroy();

    const searchInput = document.getElementById("live-search-input");
    if (searchInput) searchInput.value = "";
    const clearBtn = document.getElementById("search-clear-btn");
    if (clearBtn) clearBtn.style.display = "none";

    // Update pill states
    document.querySelectorAll(".lang-pill").forEach(p => {
      if (p.dataset.lang === this.activeLanguage) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });

    // Update nav links
    document.querySelectorAll(".nav-link").forEach(l => {
      if (l.dataset.lang === this.activeLanguage) {
        l.classList.add("active");
      } else {
        l.classList.remove("active");
      }
    });

    const langObj = LANGUAGES.find(l => l.id === this.activeLanguage);
    const langName = langObj ? langObj.name : "All Movies";
    this.showToast(`Displaying ${langName} Collection`);

    this.renderMainContent();
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (this.activeLanguage !== "all") {
      this.fetchLanguageMovies(this.activeLanguage);
    }
  }

  switchView(viewName) {
    this.activeView = viewName;
    document.querySelectorAll(".nav-link, .mobile-nav-item").forEach(l => {
      if (l.dataset.view === viewName) l.classList.add("active");
      else l.classList.remove("active");
    });

    const hero = document.getElementById("hero-banner");
    const langBar = document.getElementById("language-filter-bar");
    const main = document.getElementById("main-content-area");

    if (viewName === "livetv") {
      if (hero) hero.style.display = "none";
      if (langBar) langBar.style.display = "none";
      if (this.sports) this.sports.destroy();
      this.liveTv.render(main);
    } else if (viewName === "sports") {
      if (hero) hero.style.display = "none";
      if (langBar) langBar.style.display = "none";
      if (this.liveTv) this.liveTv.destroy();
      this.sports.render(main);
    } else if (viewName === "mylist") {
      if (hero) hero.style.display = "none";
      if (langBar) langBar.style.display = "none";
      if (this.liveTv) this.liveTv.destroy();
      if (this.sports) this.sports.destroy();
      this.renderMainContent();
    } else {
      if (hero) hero.style.display = "block";
      if (langBar) langBar.style.display = "block";
      if (this.liveTv) this.liveTv.destroy();
      if (this.sports) this.sports.destroy();
      this.renderMainContent();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ================= LIVE SEARCH ================= */
  bindSearchEvents() {
    const searchInput = document.getElementById("live-search-input");
    const clearBtn = document.getElementById("search-clear-btn");
    const searchWrapper = document.querySelector(".search-input-wrapper");

    if (!searchInput) return;

    if (searchWrapper) {
      searchWrapper.addEventListener("click", () => searchInput.focus());
    }

    searchInput.addEventListener("input", () => {
      this.searchQuery = searchInput.value.trim();
      if (clearBtn) {
        clearBtn.style.display = this.searchQuery ? "flex" : "none";
      }

      if (this.activeView === "livetv") {
        this.liveTv.searchQuery = this.searchQuery;
        this.liveTv.renderChannelList();
        return;
      }
      if (this.activeView === "sports") {
        this.sports.searchQuery = this.searchQuery;
        const grid = document.getElementById("sportsGrid");
        if (grid) grid.innerHTML = this.sports.renderCardsHtml(this.sports.getFilteredMatches());
        this.sports.bindCardClicks();
        return;
      }

      this.triggerLiveSearch(this.searchQuery);
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        this.searchQuery = "";
        if (clearBtn) clearBtn.style.display = "none";
        this.renderMainContent();
        searchInput.blur();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        this.searchQuery = "";
        clearBtn.style.display = "none";
        this.renderMainContent();
        searchInput.focus();
      });
    }

    // Keyboard shortcut '/' or Cmd+K
    window.addEventListener("keydown", (e) => {
      if ((e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) &&
          document.activeElement !== searchInput &&
          document.getElementById("movieshub-player-modal")?.classList.contains("hidden")) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  triggerLiveSearch(query) {
    if (!query || !query.trim()) {
      this.renderMainContent();
      return;
    }

    const main = document.getElementById("main-content-area");
    if (!main) return;

    const cleanQuery = query.trim();

    // Search across full global database (all languages)
    this.searchEngine.searchLive(cleanQuery, "all", (results, isComplete) => {
      if (this.searchQuery !== cleanQuery) return;

      const searchTitle = `Search Results for "${cleanQuery}"`;
      const emptyMsg = isComplete
        ? `No movies found matching "${cleanQuery}". Try checking your spelling or search another title.`
        : `Searching all movies for "${cleanQuery}"...`;

      this.renderGrid(main, searchTitle, results, emptyMsg);
    });
  }

  /* ================= CATALOG / SEARCH GRID RENDERER ================= */
  renderGrid(container, title, items, emptyMessage) {
    if (!container) return;

    if (!items || items.length === 0) {
      container.innerHTML = `
        <div class="grid-page-header">
          <h1 class="grid-page-title">${title}</h1>
          <span class="grid-page-count">0 titles</span>
        </div>
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div style="font-size: 16px; font-weight: 600; color: #fff;">${emptyMessage || "No movies found"}</div>
          <div style="font-size: 13px; color: #9ca3af;">Try checking your spelling or searching for another title, actor, or genre.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="grid-page-header">
        <h1 class="grid-page-title">${title}</h1>
        <span class="grid-page-count">${items.length} ${items.length === 1 ? "title" : "titles"}</span>
      </div>
      <div class="movies-catalog-grid">
        ${items.map(m => this.renderMovieCard(m)).join("")}
      </div>
    `;

    this.bindCardEvents(container);
  }

  /* ================= MAIN CONTENT RENDERER ================= */
  renderMainContent() {
    const main = document.getElementById("main-content-area");
    if (!main) return;

    // 1. Search Query ALWAYS takes highest priority!
    if (this.searchQuery) {
      this.triggerLiveSearch(this.searchQuery);
      return;
    }

    let items = this.catalog;

    // 2. View: Watchlist
    if (this.activeView === "mylist") {
      items = items.filter(m => this.myList.includes(m.id));
      this.renderGrid(main, "My Watchlist", items, "Your watchlist is empty. Add movies to watch later!");
      return;
    }

    // 3. Language view: Dedicated Tamil Showcase (2026, 2025, 2024)
    if (this.activeLanguage === "tamil") {
      this.renderTamilSections(main);
      return;
    }

    // 4. Filter by Language
    if (this.activeLanguage !== "all") {
      items = items.filter(m => (m.language || "").toLowerCase() === this.activeLanguage);
    }

    // 5. Filter by Genre
    if (this.activeGenre !== "All") {
      items = items.filter(m => (m.genres || []).includes(this.activeGenre));
    }

    // 6. Language view for non-Tamil languages (English, Hindi, Telugu, Malayalam)
    if (this.activeLanguage !== "all") {
      let langItems = this.catalog.filter(m => (m.language || "").toLowerCase() === this.activeLanguage);

      if (this.dashboardData && this.dashboardData.languages) {
        const matchKey = Object.keys(this.dashboardData.languages).find(k => k.toLowerCase() === this.activeLanguage);
        if (matchKey && Array.isArray(this.dashboardData.languages[matchKey])) {
          this.dashboardData.languages[matchKey].forEach(m => {
            if (!langItems.some(c => (c.tmdbId && m.tmdbId && String(c.tmdbId) === String(m.tmdbId)) || (c.title && c.title.toLowerCase() === m.title.toLowerCase()))) {
              langItems.push(m);
            }
          });
        }
      }

      if (this.activeGenre !== "All") {
        langItems = langItems.filter(m => (m.genres || []).includes(this.activeGenre));
      }

      const langObj = LANGUAGES.find(l => l.id === this.activeLanguage);
      const langTitle = `${langObj ? langObj.name : ""} Blockbusters (${langObj ? langObj.native || "" : ""})`;
      this.renderGrid(main, langTitle, langItems, `No titles found in ${this.activeLanguage}.`);
      return;
    }

    // 7. Home View (All Languages Showcase + Hero Billboard)
    this.renderAllLanguagesHome(main);
  }



  setupTwoHourRefresh() {
    const TWO_HOURS = 2 * 60 * 60 * 1000;
    setInterval(() => {
      this.loadDashboardData(true, true).then(() => {
        if (!this.searchQuery && (this.activeView === "home" || this.activeView === "movies")) {
          this.renderMainContent();
        }
      });
    }, TWO_HOURS);
  }

  setupHeroCarousel(heroMovies) {
    if (!heroMovies || heroMovies.length === 0) return "";
    this.heroCarouselMovies = heroMovies.slice(0, 10);
    this.currentHeroIndex = 0;

    const m = this.heroCarouselMovies[0];
    const isSaved = this.myList.includes(m.id);
    const len = this.heroCarouselMovies.length;
    const next1 = this.heroCarouselMovies[1 % len] || m;
    const next2 = this.heroCarouselMovies[2 % len] || m;

    const ratingVal = (typeof m.rating === "number" && m.rating > 0)
      ? m.rating.toFixed(1)
      : (m.rating === "NEW" ? "8.8" : "7.4");
    const votesCount = m.voteCount || (m.year >= 2026 ? "460" : "1.2k");
    const genres = (Array.isArray(m.genres) && m.genres.length > 0)
      ? m.genres.slice(0, 6)
      : ["Action", "Adventure", "Thriller", "Drama"];

    return `
      <!-- Hero Billboard Carousel (Cinecat Style - Screenshot 2) -->
      <section class="hero-billboard cinecat-hero" id="hero-billboard-section" style="background-image: linear-gradient(to right, rgba(8, 7, 13, 0.96) 28%, rgba(8, 7, 13, 0.72) 65%, rgba(8, 7, 13, 0.35) 100%), url('${m.backdrop || m.poster}');">
        <button class="hero-arrow prev" id="hero-arrow-prev" title="Previous Movie" aria-label="Previous">‹</button>
        <button class="hero-arrow next" id="hero-arrow-next" title="Next Movie" aria-label="Next">›</button>

        <div class="hero-content" id="hero-content-box">
          <h1 class="hero-title cine-hero-title" id="hero-title">${m.title}</h1>

          <div class="hero-cine-meta" id="hero-cine-meta">
            <span class="tmdb-pill">
              <span class="tmdb-icon">TMDB</span>
              <span class="tmdb-score" id="hero-tmdb-score">${ratingVal}</span>
              <span class="tmdb-votes" id="hero-tmdb-votes">(${votesCount})</span>
            </span>
            <span class="meta-separator">•</span>
            <span class="hero-meta-year" id="hero-badge-year">${m.year || 2026}</span>
            <span class="meta-separator">•</span>
            <span class="hero-meta-lang" id="hero-badge-lang">${m.language || "Tamil"} Cinema</span>
          </div>

          <p class="hero-synopsis cine-hero-synopsis" id="hero-synopsis">${m.overview || ""}</p>

          <div class="hero-buttons cine-hero-buttons">
            <button class="btn-cine-play" id="hero-btn-play">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Play Now</span>
            </button>
            <button class="btn-cine-info" id="hero-btn-info">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>More Info</span>
            </button>
            <button class="btn-cine-icon" id="hero-btn-trailer" title="Watch Trailer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
            </button>
            <button class="btn-cine-icon ${isSaved ? "in-list" : ""}" id="hero-btn-list" title="Add to My List">
              ${isSaved
                ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
                : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`}
            </button>
          </div>

          <div class="cine-genre-tags" id="hero-genre-tags">
            ${genres.map(g => `<span class="cine-genre-tag" data-genre="${g}">${g}</span>`).join("")}
            <span class="cine-genre-tag more" data-genre="more">+ More</span>
          </div>
        </div>

        <!-- Stacked Upcoming Slide Preview Cards (Screenshot 2) -->
        <div class="hero-preview-stack" id="hero-preview-stack">
          <div class="hero-preview-card" id="hero-prev-card-1" title="Next: ${next1.title}">
            <img src="${next1.backdrop || next1.poster}" alt="${next1.title}" class="preview-card-img" id="hero-prev-img-1" />
            <div class="preview-card-overlay">
              <span class="preview-card-title" id="hero-prev-title-1">${next1.title}</span>
            </div>
          </div>
          <div class="hero-preview-card" id="hero-prev-card-2" title="Next: ${next2.title}">
            <img src="${next2.backdrop || next2.poster}" alt="${next2.title}" class="preview-card-img" id="hero-prev-img-2" />
            <div class="preview-card-overlay">
              <span class="preview-card-title" id="hero-prev-title-2">${next2.title}</span>
            </div>
          </div>
        </div>

        <!-- 10 Indicator Dots for Daily Top 10 Releases -->
        <div class="hero-indicators" id="hero-indicators">
          ${this.heroCarouselMovies.map((_, i) => `<div class="hero-dot ${i === 0 ? "active" : ""}" data-index="${i}"></div>`).join("")}
        </div>
      </section>
    `;
  }

  bindHeroCarousel() {
    if (!this.heroCarouselMovies || this.heroCarouselMovies.length === 0) return;
    const section = document.getElementById("hero-billboard-section");
    if (!section) return;

    if (this.heroInterval) clearInterval(this.heroInterval);

    const updateSlide = (idx) => {
      this.currentHeroIndex = (idx + this.heroCarouselMovies.length) % this.heroCarouselMovies.length;
      const m = this.heroCarouselMovies[this.currentHeroIndex];
      if (!m) return;

      section.style.backgroundImage = `linear-gradient(to right, rgba(8, 7, 13, 0.96) 28%, rgba(8, 7, 13, 0.72) 65%, rgba(8, 7, 13, 0.35) 100%), url('${m.backdrop || m.poster}')`;

      const titleEl = document.getElementById("hero-title");
      if (titleEl) titleEl.textContent = m.title;

      const synEl = document.getElementById("hero-synopsis");
      if (synEl) synEl.textContent = m.overview || "";

      const scoreEl = document.getElementById("hero-tmdb-score");
      if (scoreEl) {
        scoreEl.textContent = (typeof m.rating === "number" && m.rating > 0)
          ? m.rating.toFixed(1)
          : (m.rating === "NEW" ? "8.8" : "7.4");
      }

      const votesEl = document.getElementById("hero-tmdb-votes");
      if (votesEl) votesEl.textContent = `(${m.voteCount || (m.year >= 2026 ? "460" : "1.2k")})`;

      const yearEl = document.getElementById("hero-badge-year");
      if (yearEl) yearEl.textContent = m.year || 2026;

      const langEl = document.getElementById("hero-badge-lang");
      if (langEl) langEl.textContent = `${m.language || "Tamil"} Cinema`;

      // Update genre tags
      const genresEl = document.getElementById("hero-genre-tags");
      if (genresEl) {
        const genres = (Array.isArray(m.genres) && m.genres.length > 0)
          ? m.genres.slice(0, 6)
          : ["Action", "Adventure", "Thriller", "Drama"];
        genresEl.innerHTML = genres.map(g => `<span class="cine-genre-tag" data-genre="${g}">${g}</span>`).join("") + `<span class="cine-genre-tag more" data-genre="more">+ More</span>`;
      }

      // Update stacked preview cards
      const len = this.heroCarouselMovies.length;
      const n1 = this.heroCarouselMovies[(this.currentHeroIndex + 1) % len];
      const n2 = this.heroCarouselMovies[(this.currentHeroIndex + 2) % len];

      const pImg1 = document.getElementById("hero-prev-img-1");
      const pTitle1 = document.getElementById("hero-prev-title-1");
      if (pImg1 && n1) pImg1.src = n1.backdrop || n1.poster;
      if (pTitle1 && n1) pTitle1.textContent = n1.title;

      const pImg2 = document.getElementById("hero-prev-img-2");
      const pTitle2 = document.getElementById("hero-prev-title-2");
      if (pImg2 && n2) pImg2.src = n2.backdrop || n2.poster;
      if (pTitle2 && n2) pTitle2.textContent = n2.title;

      // Update dots
      document.querySelectorAll(".hero-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === this.currentHeroIndex);
      });

      const isSaved = this.myList.includes(m.id);
      const listBtn = document.getElementById("hero-btn-list");
      if (listBtn) {
        listBtn.className = `btn-cine-icon ${isSaved ? "in-list" : ""}`;
        listBtn.innerHTML = isSaved
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
      }
    };

    const nextSlide = () => updateSlide(this.currentHeroIndex + 1);
    const prevSlide = () => updateSlide(this.currentHeroIndex - 1);

    this.heroInterval = setInterval(nextSlide, 5000);

    section.addEventListener("mouseenter", () => {
      if (this.heroInterval) clearInterval(this.heroInterval);
    });
    section.addEventListener("mouseleave", () => {
      if (this.heroInterval) clearInterval(this.heroInterval);
      this.heroInterval = setInterval(nextSlide, 5000);
    });

    // Touch swipe support (Mobile, Tablet & Touchscreen Laptops)
    let touchStartX = 0;
    let touchStartY = 0;
    section.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
      if (this.heroInterval) clearInterval(this.heroInterval);
    }, { passive: true });

    section.addEventListener("touchend", (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) nextSlide();
        else prevSlide();
      }
      if (this.heroInterval) clearInterval(this.heroInterval);
      this.heroInterval = setInterval(nextSlide, 5000);
    }, { passive: true });

    const prevBtn = document.getElementById("hero-arrow-prev");
    const nextBtn = document.getElementById("hero-arrow-next");
    if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); prevSlide(); });
    if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); nextSlide(); });

    // Preview cards click to jump
    const card1 = document.getElementById("hero-prev-card-1");
    const card2 = document.getElementById("hero-prev-card-2");
    if (card1) card1.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(this.currentHeroIndex + 1);
    });
    if (card2) card2.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(this.currentHeroIndex + 2);
    });

    // Genre tags click
    section.addEventListener("click", (e) => {
      const tag = e.target.closest(".cine-genre-tag");
      if (tag && tag.dataset.genre) {
        const g = tag.dataset.genre;
        if (g === "more") {
          const lBar = document.getElementById("language-filter-bar");
          if (lBar) lBar.scrollIntoView({ behavior: "smooth" });
        } else {
          const sInput = document.getElementById("live-search-input");
          if (sInput) {
            sInput.value = g;
            this.triggerLiveSearch(g);
          }
        }
      }
    });

    document.querySelectorAll(".hero-dot").forEach(dot => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(dot.dataset.index, 10);
        if (!isNaN(idx)) updateSlide(idx);
      });
    });

    const btnPlay = document.getElementById("hero-btn-play");
    if (btnPlay) {
      btnPlay.addEventListener("click", () => {
        const m = this.heroCarouselMovies[this.currentHeroIndex];
        if (m) this.player.open(m, "movie");
      });
    }

    const btnDl = document.getElementById("hero-btn-download");
    if (btnDl) {
      btnDl.addEventListener("click", () => {
        const m = this.heroCarouselMovies[this.currentHeroIndex];
        if (m) this.openDownloadModal(m);
      });
    }

    const btnTrailer = document.getElementById("hero-btn-trailer");
    if (btnTrailer) {
      btnTrailer.addEventListener("click", () => {
        const m = this.heroCarouselMovies[this.currentHeroIndex];
        if (m) this.player.open(m, "trailer");
      });
    }

    const btnInfo = document.getElementById("hero-btn-info");
    if (btnInfo) {
      btnInfo.addEventListener("click", () => {
        const m = this.heroCarouselMovies[this.currentHeroIndex];
        if (m) this.openDetailModal(m);
      });
    }

    const btnList = document.getElementById("hero-btn-list");
    if (btnList) {
      btnList.addEventListener("click", () => {
        const m = this.heroCarouselMovies[this.currentHeroIndex];
        if (m) {
          this.toggleMyList(m.id);
          updateSlide(this.currentHeroIndex);
        }
      });
    }
  }

    renderTamilSections(container) {
    const allTamilList = this.catalog.filter(m => m.language === "Tamil");
    // Sort Tamil movies by year (latest 2026/2025 first) then rating
    const sortedTamil = [...allTamilList].sort((a, b) => {
      if ((b.year || 0) !== (a.year || 0)) return (b.year || 0) - (a.year || 0);
      return (b.rating || 0) - (a.rating || 0);
    });

    const tamilHeroMovies = (this.dashboardData && this.dashboardData.tamil_2026 && this.dashboardData.tamil_2026.length > 0)
      ? this.dashboardData.tamil_2026.filter(m => (m.backdrop || m.poster)).slice(0, 10)
      : sortedTamil.slice(0, 10);
    const latestTamil = sortedTamil.slice(0, 6);

    const tamil2026 = (this.dashboardData && this.dashboardData.tamil_2026 && this.dashboardData.tamil_2026.length > 0)
      ? this.dashboardData.tamil_2026
      : this.catalog.filter(m => m.language === "Tamil" && m.year === 2026);

    const tamil2025 = (this.dashboardData && this.dashboardData.tamil_2025 && this.dashboardData.tamil_2025.length > 0)
      ? this.dashboardData.tamil_2025
      : this.catalog.filter(m => m.language === "Tamil" && m.year === 2025);

    const tamil2024 = (this.dashboardData && this.dashboardData.tamil_2024 && this.dashboardData.tamil_2024.length > 0)
      ? this.dashboardData.tamil_2024
      : this.catalog.filter(m => m.language === "Tamil" && m.year === 2024);

    const allTamil = this.catalog.filter(m => m.language === "Tamil");

    container.innerHTML = `
      <!-- Dedicated Tamil Hero Carousel -->
      ${this.setupHeroCarousel(tamilHeroMovies)}

      <!-- Cinecat Top 10 Section (Screenshot 2) -->
      <section class="top10-section">
        <div class="top10-header-row">
          <div class="top10-title-wrap">
            <h2 class="top10-heading">Top 10</h2>
            <div class="top10-filter-pills" id="top10-tamil-pills">
              <button class="top10-pill active" data-tab="movies">Movies</button>
              <button class="top10-pill" data-tab="theatre">Theatrical</button>
              <button class="top10-pill" data-tab="picks">Editor Picks</button>
            </div>
          </div>
          <a href="#tamil" class="top10-view-more">View more <span class="view-more-arrow">→</span></a>
        </div>
        <div class="cards-carousel top10-carousel" id="top10-tamil-carousel">
          ${sortedTamil.slice(0, 10).map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>

      <div class="category-header-wrap" style="padding: 16px 4% 0;">
        <h1 style="font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 6px;">Tamil Cinema (தமிழ்)</h1>
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">Stream & Download Latest 2026, 2025, and 2024 Tamil Blockbusters in 1080p Ultra HD</p>
      </div>

      <!-- 🔥 JUST ADDED • LATEST TAMIL BLOCKBUSTERS -->
      <section class="content-row">
        <div class="row-header">
          <h2>🔥 Just Added • Latest Tamil Blockbusters</h2>
          <span class="row-subtitle">Hottest theatrical & streaming releases in Ultra HD</span>
        </div>
        <div class="cards-carousel">
          ${latestTamil.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>

      <!-- 2026 Tamil -->
      ${tamil2026.length > 0 ? `
      <section class="content-row">
        <div class="row-header">
          <h2>🌟 2026 Tamil Cinema</h2>
          <span class="row-subtitle">Newest theatrical premieres & 2026 releases</span>
        </div>
        <div class="cards-carousel">
          ${tamil2026.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>` : ""}

      <!-- 2025 Tamil -->
      ${tamil2025.length > 0 ? `
      <section class="content-row">
        <div class="row-header">
          <h2>🎬 2025 Tamil Hits</h2>
          <span class="row-subtitle">Blockbusters of 2025: Coolie, Xtreme, Flashback</span>
        </div>
        <div class="cards-carousel">
          ${tamil2025.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>` : ""}

      <!-- ⚔️ Multi-Audio Series & TV Shows -->
      <section class="content-row">
        <div class="row-header">
          <h2>⚔️ Multi-Audio Series & TV Shows</h2>
          <span class="row-subtitle">Game of Thrones, House of the Dragon in Tamil & English Multi-Audio</span>
        </div>
        <div class="cards-carousel">
          ${this.catalog.filter(m => m.mediaType === "tv").map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>

      <!-- All Tamil -->
      <section class="content-row">
        <div class="row-header">
          <h2>🔥 Complete Tamil Collection (${allTamil.length})</h2>
          <span class="row-subtitle">Browse full library of Tamil movies</span>
        </div>
        <div class="cards-grid">
          ${allTamil.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>
    `;

    this.bindHeroCarousel();
    this.bindCardEvents();
  }

  renderAllLanguagesHome(container) {
    // Helper: calculate sort weight prioritizing 2026/2025 releases with valid numeric rating
    const getSortScore = (m) => {
      const y = m.year || 2024;
      const r = (typeof m.rating === "number" && !isNaN(m.rating))
        ? m.rating
        : (m.rating === "NEW" ? 8.5 : parseFloat(m.rating) || 7.0);
      return y * 100 + r;
    };
    const sortByLatest = (arr) => [...arr].sort((a, b) => getSortScore(b) - getSortScore(a));

    const sortedCatalog = [...this.catalog]
      .filter(m => (m.backdrop || m.poster))
      .sort((a, b) => getSortScore(b) - getSortScore(a));

    // Dynamic Top 5 Blockbusters for the Auto-Rotating Billboard Slider (Daily Trending & Live Releases)
    let heroCandidates = [];
    if (this.dashboardData?.hero && Array.isArray(this.dashboardData.hero) && this.dashboardData.hero.length > 0) {
      heroCandidates = this.dashboardData.hero.filter(m => (m.backdrop || m.poster));
    } else if (this.dashboardData?.trending && Array.isArray(this.dashboardData.trending) && this.dashboardData.trending.length > 0) {
      heroCandidates = this.dashboardData.trending.filter(m => (m.backdrop || m.poster));
    } else if (this.dashboardData?.latest_six && Array.isArray(this.dashboardData.latest_six) && this.dashboardData.latest_six.length > 0) {
      heroCandidates = this.dashboardData.latest_six.filter(m => (m.backdrop || m.poster));
    }
    if (heroCandidates.length < 10) {
      heroCandidates = [...heroCandidates, ...sortedCatalog];
    }
    const cleanHeroList = [];
    const seenHeroIds = new Set();
    for (const hm of heroCandidates) {
      const key = String(hm.tmdbId || hm.id || hm.title);
      if (!seenHeroIds.has(key)) {
        seenHeroIds.add(key);
        cleanHeroList.push(hm);
        if (cleanHeroList.length >= 10) break;
      }
    }
    const top5Imdb = cleanHeroList;
    const featuredMovie = top5Imdb[0] || this.catalog.find(m => m.id === "goat-tamil") || this.catalog.find(m => m.id === "leo-tamil") || this.catalog.find(m => m.isTrending && m.backdrop) || this.catalog[0];
    
    // Top 6 Latest Releases from IMDb / TMDB (Strictly 2026/2025 releases across all languages)
    let latestSix = (this.dashboardData && this.dashboardData.latest_six && this.dashboardData.latest_six.length > 0)
      ? this.dashboardData.latest_six.filter(m => (m.year || 2026) >= 2025)
      : [];

    if (latestSix.length < 6) {
      const candidates = [
        ...(this.dashboardData?.tamil_2026 || []),
        ...(this.dashboardData?.tamil_2025 || []),
        ...this.catalog.filter(m => (m.year || 0) >= 2025)
      ];
      for (const c of candidates) {
        if (!latestSix.some(m => (m.tmdbId && c.tmdbId && m.tmdbId === c.tmdbId) || m.id === c.id || m.title === c.title)) {
          latestSix.push(c);
          if (latestSix.length >= 6) break;
        }
      }
    }

    const tamil2026 = (this.dashboardData && this.dashboardData.tamil_2026 && this.dashboardData.tamil_2026.length > 0)
      ? this.dashboardData.tamil_2026
      : sortByLatest(this.catalog.filter(m => m.language === "Tamil" && m.year === 2026));

    const tamil2025 = (this.dashboardData && this.dashboardData.tamil_2025 && this.dashboardData.tamil_2025.length > 0)
      ? this.dashboardData.tamil_2025
      : sortByLatest(this.catalog.filter(m => m.language === "Tamil" && m.year === 2025));

    const tamil2024 = (this.dashboardData && this.dashboardData.tamil_2024 && this.dashboardData.tamil_2024.length > 0)
      ? this.dashboardData.tamil_2024
      : sortByLatest(this.catalog.filter(m => m.language === "Tamil" && m.year === 2024));

    const top10 = [...this.catalog].filter(m => m.trendingRank || m.rating >= 8.0).slice(0, 10);
    const tamilMovies = sortByLatest(this.catalog.filter(m => m.language === "Tamil"));
    const englishMovies = sortByLatest(this.catalog.filter(m => m.language === "English"));
    const hindiMovies = sortByLatest(this.catalog.filter(m => m.language === "Hindi"));
    const teluguMovies = sortByLatest(this.catalog.filter(m => m.language === "Telugu"));
    const malayalamMovies = sortByLatest(this.catalog.filter(m => m.language === "Malayalam"));

    container.innerHTML = `
      <!-- Hero Billboard Carousel (Cinecat Style - Screenshot 2) -->
      ${this.setupHeroCarousel(top5Imdb)}

      <!-- Cinecat Top 10 Section (Screenshot 2) -->
      <section class="top10-section">
        <div class="top10-header-row">
          <div class="top10-title-wrap">
            <h2 class="top10-heading">Top 10</h2>
            <div class="top10-filter-pills" id="top10-main-pills">
              <button class="top10-pill active" data-tab="movies">Movies</button>
              <button class="top10-pill" data-tab="tv">TV Shows</button>
              <button class="top10-pill" data-tab="picks">Editor Picks</button>
            </div>
          </div>
          <a href="#movies" class="top10-view-more">View more <span class="view-more-arrow">→</span></a>
        </div>
        <div class="cards-carousel top10-carousel" id="top10-main-carousel">
          ${top10.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>

      <!-- 1. TOP 6 LATEST RELEASES (IMDb / TMDB Real-Time Sync) -->
      ${latestSix.length > 0 ? `
      <section class="content-row">
        <div class="row-header">
          <h2>🔥 Just Added • Latest 6 Releases</h2>
          <span class="row-subtitle">Synced live from IMDb & TMDB</span>
        </div>
        <div class="cards-carousel">
          ${latestSix.slice(0, 6).map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>` : ""}

      <!-- 2. CONTINUE WATCHING -->
      ${this.continueWatching.length > 0 ? `
      <section class="content-row">
        <div class="row-header">
          <h2>▶️ Continue Watching</h2>
          <span class="row-subtitle">Resume your recent playback on this device</span>
        </div>
        <div class="cards-carousel">
          ${this.continueWatching.map(m => this.renderContinueWatchingCard(m)).join("")}
        </div>
      </section>` : ""}

      <!-- 3. 2026 TAMIL CINEMA -->
      ${tamil2026.length > 0 ? `
      <section class="content-row">
        <div class="row-header">
          <h2>🌟 2026 Tamil Cinema</h2>
          <span class="row-subtitle">Newest theatrical premieres & 2026 releases</span>
        </div>
        <div class="cards-carousel">
          ${tamil2026.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>` : ""}

      <!-- 4. 2025 TAMIL HITS -->
      ${tamil2025.length > 0 ? `
      <section class="content-row">
        <div class="row-header">
          <h2>🎬 2025 Tamil Hits</h2>
          <span class="row-subtitle">Blockbusters of 2025: Coolie, Xtreme, Flashback</span>
        </div>
        <div class="cards-carousel">
          ${tamil2025.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>` : ""}

      <!-- 5. WORLD TV & MULTI-AUDIO SERIES (Game of Thrones, House of the Dragon) -->
      <section class="content-row">
        <div class="row-header">
          <h2>⚔️ World TV & Multi-Audio Series</h2>
          <span class="row-subtitle">Game of Thrones, House of the Dragon & Premium Series in Tamil & English Multi-Audio</span>
        </div>
        <div class="cards-carousel">
          ${this.catalog.filter(m => m.mediaType === "tv").map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>

      <!-- 6. TOP 10 IN MOVIESHUB TODAY -->
      <section class="content-row">
        <div class="row-header">
          <h2>🏆 Top 10 in Movieshub Today</h2>
          <span class="row-subtitle">Most streamed cinema blockbusters</span>
        </div>
        <div class="cards-carousel">
          ${top10.map((m, idx) => this.renderTop10Card(m, idx + 1)).join("")}
        </div>
      </section>

      <!-- 7. TAMIL BLOCKBUSTERS (ALL) -->
      <section class="content-row">
        <div class="row-header">
          <h2>🔴 Tamil Cinema (தமிழ்)</h2>
          <button class="view-all-lang-btn" data-lang="tamil">View All Tamil (${tamilMovies.length}) →</button>
        </div>
        <div class="cards-carousel">
          ${tamilMovies.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>

      <!-- 8. HOLLYWOOD & GLOBAL HITS -->
      <section class="content-row">
        <div class="row-header">
          <h2>🔵 Hollywood & Global Hits</h2>
          <button class="view-all-lang-btn" data-lang="english">View All English (${englishMovies.length}) →</button>
        </div>
        <div class="cards-carousel">
          ${englishMovies.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>

      <!-- 9. HINDI CINEMA -->
      <section class="content-row">
        <div class="row-header">
          <h2>🟠 Bollywood & Hindi Cinema (हिंदी)</h2>
          <button class="view-all-lang-btn" data-lang="hindi">View All Hindi (${hindiMovies.length}) →</button>
        </div>
        <div class="cards-carousel">
          ${hindiMovies.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>

      <!-- 10. TELUGU BLOCKBUSTERS -->
      <section class="content-row">
        <div class="row-header">
          <h2>🌸 Tollywood & Telugu Hits (తెలుగు)</h2>
          <button class="view-all-lang-btn" data-lang="telugu">View All Telugu (${teluguMovies.length}) →</button>
        </div>
        <div class="cards-carousel">
          ${teluguMovies.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>

      <!-- 11. MALAYALAM MASTERPIECES -->
      <section class="content-row">
        <div class="row-header">
          <h2>🟣 Mollywood & Malayalam Cinema (മലയാളം)</h2>
          <button class="view-all-lang-btn" data-lang="malayalam">View All Malayalam (${malayalamMovies.length}) →</button>
        </div>
        <div class="cards-carousel">
          ${malayalamMovies.map(m => this.renderMovieCard(m)).join("")}
        </div>
      </section>
    `;

    this.bindHeroCarousel();

    // View All buttons
    container.querySelectorAll(".view-all-lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        this.switchLanguage(lang);
      });
    });

    this.bindCardEvents();
  }

  renderMovieCard(movie) {
    if (movie) {
      this.registerMovie(movie);
      const cleanK = (movie.title || "").toLowerCase().trim();
      if (KNOWN_VERIFIED_POSTERS[cleanK]) {
        if (!movie.poster || movie.poster.includes("moviezda") || movie.poster.includes("moviesda") || movie.poster.includes("/api/poster")) {
          movie.poster = KNOWN_VERIFIED_POSTERS[cleanK].poster;
          movie.backdrop = KNOWN_VERIFIED_POSTERS[cleanK].backdrop;
          if (KNOWN_VERIFIED_POSTERS[cleanK].tmdbId && (!movie.tmdbId || movie.tmdbId < 10000)) movie.tmdbId = KNOWN_VERIFIED_POSTERS[cleanK].tmdbId;
        }
      }
    }
    const isSaved = this.myList.includes(movie.id);
    const posterSrc = movie.poster || `${(typeof window !== "undefined" && window.API_PREFIX) || ""}/api/poster?title=${encodeURIComponent(movie.title)}&year=${movie.year || 2026}`;
    const cleanTitle = (movie.title || "Movie").replace(/[<>"']/g, "");
    const displayTitle = this.searchQuery ? this.searchEngine.highlightMatch(movie.title, this.searchQuery) : movie.title;

    return `
      <div class="movie-card" data-id="${movie.id}">
        <div class="card-media">
          <img class="card-img" src="${posterSrc}" alt="${cleanTitle}" loading="lazy" onerror="handlePosterError(this, '${cleanTitle}', '${movie.year || 2026}')" />
          <span class="card-lang-badge">${movie.language}</span>
          <span class="card-quality-badge ${((movie.qualities && movie.qualities.some(q => q.toLowerCase().includes("theatre") || q.toLowerCase().includes("pre-hd"))) || movie.isTheatrePrint) ? "theatre" : ""}">${((movie.qualities && movie.qualities.some(q => q.toLowerCase().includes("theatre") || q.toLowerCase().includes("pre-hd"))) || movie.isTheatrePrint) ? "THEATRE PRINT" : ((movie.qualities && movie.qualities[0]) || "4K")}</span>
          
          <div class="card-media-overlay">
            <div class="card-actions">
              <button class="card-btn-play" title="Play Movie (1-Click)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
              <button class="card-btn-download" title="Download Movie">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
              <button class="card-btn-list ${isSaved ? "in-list" : ""}" title="${isSaved ? "Remove from List" : "Add to List"}">
                ${isSaved
                  ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
                  : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
                }
              </button>
              <button class="card-btn-info" title="More Info">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Title, Year and Rating ALWAYS visible underneath poster -->
        <div class="card-info-permanent">
          <h3 class="card-title-permanent" title="${movie.title}">${displayTitle}</h3>
          <div class="card-meta-permanent">
            <span class="card-meta-year">${movie.year || "2026"}</span>
            <span class="card-meta-lang">${movie.language}</span>
            <span class="card-meta-rating">${(typeof movie.rating === "number" && movie.rating > 0) ? `★ ${movie.rating.toFixed(1)}` : (movie.rating === "NEW" || (movie.year && movie.year >= 2026) ? "🆕 NEW" : (movie.rating ? `★ ${movie.rating}` : "★ 7.5"))}</span>
          </div>
        </div>
      </div>
    `;
  }

  /* ================= CONTINUE WATCHING CARD ================= */
  renderContinueWatchingCard(item) {
    const bannerSrc = item.backdrop || item.poster || `${(typeof window !== "undefined" && window.API_PREFIX) || ""}/api/poster?title=${encodeURIComponent(item.title)}&year=${item.year || 2026}`;
    const cleanTitle = (item.title || "Movie").replace(/[<>"']/g, "");
    const progress = item.progressPercent || 30;

    return `
      <div class="continue-card" data-id="${item.id}">
        <div class="continue-media">
          <img class="continue-img" src="${bannerSrc}" alt="${cleanTitle}" loading="lazy" onerror="handlePosterError(this, '${cleanTitle}', '${item.year || 2026}')" />
          <button class="continue-remove-btn" title="Remove from Continue Watching" data-remove-id="${item.id}">✕</button>
          <div class="continue-play-overlay">
            <div class="continue-play-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
          <div class="continue-progress-track">
            <div class="continue-progress-fill" style="width: ${progress}%;"></div>
          </div>
        </div>
        <div class="continue-details">
          <h4 class="continue-title" title="${item.title}">${item.title}</h4>
          <div class="continue-meta">
            <span>${item.language} • ${item.year}</span>
            <span style="color:#e50914;font-weight:700;">${progress}% Watched</span>
          </div>
        </div>
      </div>
    `;
  }

  renderTop10Card(movie, rank) {
    const posterSrc = movie.poster || `${(typeof window !== "undefined" && window.API_PREFIX) || ""}/api/poster?title=${encodeURIComponent(movie.title)}&year=${movie.year || 2026}`;
    const cleanTitle = (movie.title || "Movie").replace(/[<>"']/g, "");

    return `
      <div class="top10-item" data-id="${movie.id}">
        <span class="top10-rank">${rank}</span>
        <div class="top10-media">
          <img src="${posterSrc}" alt="${cleanTitle}" loading="lazy" onerror="handlePosterError(this, '${cleanTitle}', '${movie.year || 2026}')" />
          <span class="card-lang-badge">${movie.language}</span>
          <button class="top10-play-btn" title="Play Movie (1-Click)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
        </div>
        <div class="top10-title">${movie.title}</div>
      </div>
    `;
  }

  /* ================= 1-CLICK INSTANT PLAY CARD EVENT BINDINGS ================= */
  bindCardEvents(container = document.getElementById("main-content-area")) {
    if (!container) return;
    // Continue Watching Cards -> 1-Click Instant Play
    container.querySelectorAll(".continue-card").forEach(card => {
      const id = card.dataset.id;
      const removeBtn = card.querySelector(".continue-remove-btn");
      if (removeBtn) {
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const remId = removeBtn.dataset.removeId;
          this.removeFromContinueWatching(remId);
        });
      }

      card.addEventListener("click", () => {
        let movie = this.catalog.find(m => m.id === id || String(m.tmdbId) === String(id));
        if (!movie) {
          const cw = this.continueWatching.find(m => m.id === id);
          if (cw) movie = cw;
        }
        if (movie) {
          this.player.open(movie, "movie");
        }
      });
    });

    // Movie Cards -> 1-Click Instant Play on card click!
    container.querySelectorAll(".movie-card").forEach(card => {
      const id = card.dataset.id;
      const movie = this.getMovieById(id, card);
      if (!movie) return;

      const playBtn = card.querySelector(".card-btn-play");
      if (playBtn) {
        playBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.player.open(movie, "movie");
        });
      }

      const dlBtn = card.querySelector(".card-btn-download");
      if (dlBtn) {
        dlBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.openDownloadModal(movie);
        });
      }

      const listBtn = card.querySelector(".card-btn-list");
      if (listBtn) {
        listBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleMyList(movie.id);
          this.renderMainContent();
        });
      }

      const infoBtn = card.querySelector(".card-btn-info");
      if (infoBtn) {
        infoBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.openDetailModal(movie);
        });
      }

      // 1-Click Instant Play: Clicking the card or poster directly launches playback!
      card.addEventListener("click", () => {
        this.player.open(movie, "movie");
      });
    });

    // Top 10 items -> 1-Click Instant Play
    container.querySelectorAll(".top10-item").forEach(item => {
      const id = item.dataset.id;
      const movie = this.getMovieById(id, item);
      if (!movie) return;

      const playBtn = item.querySelector(".top10-play-btn");
      if (playBtn) {
        playBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.player.open(movie, "movie");
        });
      }

      item.addEventListener("click", () => {
        this.player.open(movie, "movie");
      });
    });
  }

  /* ================= MOVIE DETAIL MODAL ================= */
  openDetailModal(movie) {
    const modal = document.getElementById("movie-detail-modal");
    if (!modal) return;

    const isSaved = this.myList.includes(movie.id);
    const bannerBg = movie.backdrop || movie.poster || `${(typeof window !== "undefined" && window.API_PREFIX) || ""}/api/poster?title=${encodeURIComponent(movie.title)}&year=${movie.year || 2026}`;

    modal.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop"></div>
      <div class="modal-box">
        <button class="modal-close" id="modal-close" title="Close">✕</button>
        
        <div class="modal-banner" style="background-image: linear-gradient(to top, #14121f 5%, rgba(20, 18, 31, 0.4) 60%, rgba(20, 18, 31, 0.8) 100%), url('${bannerBg}');">
          <div class="modal-banner-info">
            <span class="badge-lang" style="background:#e50914;">${movie.language} Cinema</span>
            <h1 class="modal-title">${movie.title}</h1>
            <div class="modal-banner-btns">
              <button class="btn-main-play" id="modal-play-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <span>Play Movie</span>
              </button>
              <button class="btn-main-info" id="modal-download-btn" style="background:#22c55e;color:#000;font-weight:800;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Download</span>
              </button>
              <button class="btn-main-info" id="modal-trailer-btn" style="background:rgba(255,255,255,0.15);color:#fff;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
                <span>Trailer</span>
              </button>
              <button class="btn-main-watchlist ${isSaved ? "in-list" : ""}" id="modal-watchlist-btn">
                ${isSaved ? "✓ In Watchlist" : "+ Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>

        <div class="modal-body">
          <div class="modal-body-left">
            <div class="modal-tags">
              <span class="tag-match">${movie.match || "98% Match"}</span>
              <span class="tag-year">${movie.year || 2026}</span>
              ${(typeof movie.rating === 'number' && movie.rating > 0)
                ? `<span class="tag-rating" style="background:rgba(234,179,8,0.2);border:1px solid #eab308;color:#facc15;padding:2px 8px;border-radius:4px;font-weight:700;font-size:12px;">★ ${movie.rating.toFixed(1)} TMDB</span>`
                : (movie.rating === 'NEW' || (movie.year && movie.year >= 2026)
                  ? `<span class="tag-rating" style="background:rgba(59,130,246,0.2);border:1px solid #3b82f6;color:#60a5fa;padding:2px 8px;border-radius:4px;font-weight:700;font-size:12px;">🆕 New Release</span>`
                  : `<span class="tag-rating" style="background:rgba(234,179,8,0.2);border:1px solid #eab308;color:#facc15;padding:2px 8px;border-radius:4px;font-weight:700;font-size:12px;">★ ${movie.rating || '7.5'} TMDB</span>`
                )
              }
              <span class="tag-maturity">${movie.maturity || "U/A 16+"}</span>
              <span class="tag-duration">${movie.duration || "2h 30m"}</span>
              <span class="tag-quality">4K Ultra HD</span>
              <span class="tag-sound">Dolby Atmos</span>
            </div>

            <p class="modal-desc">${movie.overview}</p>
          </div>

          <div class="modal-body-right">
            <div class="meta-row">
              <span class="meta-label">Language:</span>
              <span class="meta-value">${movie.language} ${movie.nativeTitle ? `(${movie.nativeTitle})` : ""}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Genres:</span>
              <span class="meta-value">${(movie.genres || []).join(", ")}</span>
            </div>
            ${movie.director ? `
            <div class="meta-row">
              <span class="meta-label">Director:</span>
              <span class="meta-value">${movie.director}</span>
            </div>` : ""}
            <div class="meta-row">
              <span class="meta-label">Rating:</span>
              <span class="meta-value" style="color:#22c55e;font-weight:700;">★ ${movie.rating} / 10</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Curator:</span>
              <span class="meta-value" style="color:#e50914;font-weight:700;">Created by Prem</span>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Bindings
    document.getElementById("modal-close").addEventListener("click", () => this.closeDetailModal());
    document.getElementById("modal-backdrop").addEventListener("click", () => this.closeDetailModal());
    document.getElementById("modal-play-btn").addEventListener("click", () => {
      this.closeDetailModal();
      this.player.open(movie, "movie");
    });

    document.getElementById("modal-download-btn").addEventListener("click", () => {
      this.closeDetailModal();
      this.openDownloadModal(movie);
    });

    document.getElementById("modal-trailer-btn").addEventListener("click", () => {
      this.closeDetailModal();
      this.player.open(movie, "trailer");
    });

    document.getElementById("modal-watchlist-btn").addEventListener("click", () => {
      this.toggleMyList(movie.id);
      this.openDetailModal(movie);
    });
  }

  closeDetailModal() {
    const modal = document.getElementById("movie-detail-modal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  /* ================= WATCHLIST ================= */
  toggleMyList(movieId) {
    if (this.myList.includes(movieId)) {
      this.myList = this.myList.filter(id => id !== movieId);
      this.showToast("Removed from Watchlist");
    } else {
      this.myList.push(movieId);
      this.showToast("Added to Watchlist");
    }
    this.saveMyList();
  }

  /* ================= TOAST NOTIFICATIONS ================= */
  showToast(message) {
    const toast = document.getElementById("movieshub-toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 2400);
  }

  refreshStorageKeys() {
    if (typeof window !== "undefined" && window.ProfileManager) {
      this.myListKey = window.ProfileManager.getStorageKey("watchlist");
      this.continueWatchingKey = window.ProfileManager.getStorageKey("continue_watching");
    } else {
      this.myListKey = "movieshub_watchlist";
      this.continueWatchingKey = "movieshub_continue_watching";
    }
  }

  /* ================= DEVICE PROFILE MANAGER UI ================= */
  initProfileManagerUI() {
    const profileIcon = document.getElementById("profileDeviceIcon");
    const profileName = document.getElementById("profileDeviceName");
    const profileBtn = document.getElementById("openDeviceProfileBtn");
    const profileModal = document.getElementById("profile-modal");
    const closeBtn = document.getElementById("closeProfileModalBtn");
    const backdrop = document.getElementById("closeProfileModalBackdrop");
    const profileList = document.getElementById("profileModalList");
    const createBtn = document.getElementById("createProfileSubmitBtn");
    const nameInput = document.getElementById("newProfileNameInput");
    const avatarPickerRow = document.getElementById("avatarPickerRow");
    const storageFooter = document.getElementById("profileStorageFooter");
    const modalCurrentAvatar = document.getElementById("profileModalCurrentAvatar");
    const modalMeta = document.getElementById("profileDeviceMeta");

    let selectedAvatar = "🍿";

    const updateProfileDisplay = () => {
      if (!window.ProfileManager) return;
      const active = window.ProfileManager.getActiveProfile();
      if (profileIcon) profileIcon.textContent = active.avatar || "🍿";
      if (profileName) profileName.textContent = active.name || "Personal Theater";
      if (modalCurrentAvatar) modalCurrentAvatar.textContent = active.avatar || "🍿";
      if (modalMeta) {
        modalMeta.textContent = `${active.device} • Created by Prem`;
      }
    };

    const renderProfileList = () => {
      if (!window.ProfileManager || !profileList) return;
      const profiles = window.ProfileManager.getAllProfiles();
      const active = window.ProfileManager.getActiveProfile();
      const stats = window.ProfileManager.getDeviceStorageStats();

      profileList.innerHTML = profiles.map(p => {
        const isActive = p.id === active.id;
        return `
          <div class="profile-item-row ${isActive ? "active" : ""}" data-profile-id="${p.id}">
            <div class="profile-row-info">
              <div class="profile-row-avatar">${p.avatar}</div>
              <div>
                <div class="profile-row-name">${p.name}</div>
                <div class="profile-row-meta">${p.device} • Created ${new Date(p.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              ${isActive 
                ? '<span class="profile-active-tag">Active on Device</span>' 
                : '<button class="profile-switch-btn" data-action="switch" data-id="' + p.id + '">Switch</button>'}
              ${(!isActive && profiles.length > 1) 
                ? '<button class="profile-switch-btn" data-action="delete" data-id="' + p.id + '" style="color:#ef4444;" title="Delete Profile">✕</button>' 
                : ""}
            </div>
          </div>
        `;
      }).join("");

      if (storageFooter) {
        storageFooter.innerHTML = `
          💾 <strong>Device Storage:</strong> ${stats.approxKB} KB stored across ${stats.totalEntries} entries on this ${stats.deviceName} instance. Isolated per profile.
        `;
      }

      // Profile switch/delete listeners
      profileList.querySelectorAll("[data-action='switch']").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const pid = btn.dataset.id;
          if (pid && window.ProfileManager.switchProfile(pid)) {
            this.refreshStorageKeys();
            this.myList = this.loadMyList();
            this.continueWatching = this.loadContinueWatching();
            this.updateMyListBadge();
            updateProfileDisplay();
            renderProfileList();
            profileModal.classList.add("hidden");
            this.renderMainContent();
            this.showToast(`Switched profile: ${window.ProfileManager.getActiveProfile().name}`);
          }
        });
      });

      profileList.querySelectorAll("[data-action='delete']").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const pid = btn.dataset.id;
          if (pid && window.ProfileManager.deleteProfile(pid)) {
            renderProfileList();
            this.showToast("Profile removed from device");
          }
        });
      });
    };

    // Avatar picker buttons
    if (avatarPickerRow) {
      avatarPickerRow.querySelectorAll(".avatar-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          avatarPickerRow.querySelectorAll(".avatar-opt-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          selectedAvatar = btn.dataset.avatar || "🍿";
        });
      });
    }

    // Open profile modal
    profileBtn?.addEventListener("click", () => {
      renderProfileList();
      profileModal?.classList.remove("hidden");
    });

    // Close modal
    closeBtn?.addEventListener("click", () => {
      profileModal?.classList.add("hidden");
    });
    backdrop?.addEventListener("click", () => {
      profileModal?.classList.add("hidden");
    });

    // Create profile
    createBtn?.addEventListener("click", () => {
      const name = nameInput?.value?.trim();
      if (!name) {
        this.showToast("Please enter a profile name");
        return;
      }
      const newProf = window.ProfileManager.createProfile(name, selectedAvatar);
      if (nameInput) nameInput.value = "";
      window.ProfileManager.switchProfile(newProf.id);
      this.refreshStorageKeys();
      this.myList = this.loadMyList();
      this.continueWatching = this.loadContinueWatching();
      this.updateMyListBadge();
      updateProfileDisplay();
      renderProfileList();
      profileModal?.classList.add("hidden");
      this.renderMainContent();
      this.showToast(`Created & switched to ${newProf.name}!`);
    });

    // Initial display
    updateProfileDisplay();
  }

  /* ================= GLOBAL EVENTS ================= */
  bindGlobalEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeDetailModal();
        const dlModal = document.getElementById("download-modal");
        if (dlModal) dlModal.classList.add("hidden");
        if (this.player) this.player.close();
      }
    });

    // Cinecat Header Controls
    const browseBtn = document.getElementById("cine-header-browse");
    if (browseBtn) {
      browseBtn.addEventListener("click", () => {
        const lBar = document.getElementById("language-filter-bar");
        if (lBar) lBar.scrollIntoView({ behavior: "smooth" });
      });
    }

    const appsBtn = document.getElementById("cine-header-apps");
    if (appsBtn) {
      appsBtn.addEventListener("click", () => this.switchView("livetv"));
    }


    // Cinecat Floating Bottom Navigation Controls
    const findNav = document.getElementById("cine-nav-find");
    if (findNav) {
      findNav.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        const sInput = document.getElementById("live-search-input");
        if (sInput) {
          sInput.focus();
          sInput.select();
        }
      });
    }

    const discoverNav = document.getElementById("cine-nav-discover");
    if (discoverNav) {
      discoverNav.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchView("movies");
        const lBar = document.getElementById("language-filter-bar");
        if (lBar) lBar.scrollIntoView({ behavior: "smooth" });
      });
    }

    // Top 10 Category Tabs Delegation
    document.addEventListener("click", (e) => {
      const pill = e.target.closest(".top10-pill");
      if (!pill) return;
      const parentPills = pill.closest(".top10-filter-pills");
      if (parentPills) {
        parentPills.querySelectorAll(".top10-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
      }
      const tab = pill.dataset.tab;
      const carousel = document.getElementById("top10-main-carousel") || document.getElementById("top10-tamil-carousel");
      if (!carousel) return;

      let list = [];
      if (tab === "tv") {
        list = this.catalog.filter(m => m.mediaType === "tv").slice(0, 10);
      } else if (tab === "theatre") {
        list = this.catalog.filter(m => m.isTheatrePrint || (m.year && m.year >= 2026)).slice(0, 10);
      } else if (tab === "picks") {
        list = [...this.catalog].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10);
      } else {
        list = [...this.catalog].filter(m => m.trendingRank || m.rating >= 8.0).slice(0, 10);
      }
      if (list.length > 0) {
        carousel.innerHTML = list.map(m => this.renderMovieCard(m)).join("");
        this.bindCardEvents();
      }
    });
  }
}

// Global App Initialization
document.addEventListener("DOMContentLoaded", () => {
  window.movieshubApp = new MovieshubApp();
});
