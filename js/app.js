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

    // Dynamically load 2-hour synced dashboard data from Netmirror
    this.loadDashboardData();

    // Auto-check for fresh dashboard updates every 15 minutes
    setInterval(() => this.loadDashboardData(true), 15 * 60 * 1000);
  }

  /* ================= MOVIE REGISTRY & LOOKUP ================= */
  registerMovie(m) {
    if (!m || !m.title) return;
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
  async loadDashboardData(silent = false) {
    try {
      const pfx = (typeof window !== "undefined" && window.API_PREFIX) || "";
      const res = await fetch(`${pfx}/api/dashboard`);
      if (res.ok) {
        const data = await res.json();
        this.dashboardData = data;
        let addedCount = 0;

        const mergeMovie = (m) => {
          if (!m || !m.title) return;
          this.registerMovie(m);
          const exists = this.catalog.some(c => 
            (c.tmdbId && m.tmdbId && String(c.tmdbId) === String(m.tmdbId)) ||
            (c.id && m.id && c.id === m.id) ||
            (c.title && m.title && c.title.toLowerCase() === m.title.toLowerCase())
          );
          if (!exists) {
            this.catalog.push(m);
            addedCount++;
          }
        };

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

        if (this.searchEngine) {
          this.searchEngine.catalog = this.catalog;
        }

        if (!this.searchQuery && (this.activeView === "home" || this.activeView === "movies")) {
          this.renderMainContent();
          if (addedCount > 0 && !silent) this.showToast(`Synced ${addedCount} latest releases`);
        }
      }
    } catch (e) {
      // Quiet failover
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
          const exists = this.catalog.some(c =>
            (c.tmdbId && m.tmdbId && String(c.tmdbId) === String(m.tmdbId)) ||
            (c.id && m.id && c.id === m.id) ||
            (c.title && m.title && c.title.toLowerCase() === m.title.toLowerCase())
          );
          if (!exists) {
            this.catalog.push(m);
            added++;
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
        const downloadUrl = `${pfx}/api/download?id=${movie.tmdbId || movie.id}&quality=${quality}&title=${encodeURIComponent(movie.title)}`;
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

    // Nav Links
    document.querySelectorAll(".nav-link").forEach(link => {
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
    document.querySelectorAll(".nav-link").forEach(l => {
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
    const now = Date.now();
    if (!this.lastCacheSync || (now - Number(this.lastCacheSync)) > TWO_HOURS) {
      localStorage.setItem("movieshub_dash_last_sync", now);
      console.log("[Movieshub] 2-Hour dynamic cache update verified at:", new Date(now).toLocaleTimeString());
    }
    setInterval(() => {
      localStorage.setItem("movieshub_dash_last_sync", Date.now());
      this.loadDashboardData().then(() => {
        if (this.activeView === "home" || this.activeView === "movies") {
          this.renderMainContent();
        }
      });
    }, TWO_HOURS);
  }

  setupHeroCarousel(heroMovies) {
    if (!heroMovies || heroMovies.length === 0) return "";
    this.heroCarouselMovies = heroMovies.slice(0, 5);
    this.currentHeroIndex = 0;

    const m = this.heroCarouselMovies[0];
    const isSaved = this.myList.includes(m.id);

    return `
      <!-- Hero Billboard Carousel (Netflix & Hotstar Auto-Rotating) -->
      <section class="hero-billboard" id="hero-billboard-section" style="background-image: linear-gradient(to right, rgba(8, 7, 13, 0.95) 25%, rgba(8, 7, 13, 0.6) 60%, rgba(8, 7, 13, 0.3) 100%), url('${m.backdrop || m.poster}');">
        <button class="hero-arrow prev" id="hero-arrow-prev" title="Previous Movie" aria-label="Previous">‹</button>
        <button class="hero-arrow next" id="hero-arrow-next" title="Next Movie" aria-label="Next">›</button>

        <div class="hero-content" id="hero-content-box">
          <div class="hero-badges">
            <span class="badge-lang" id="hero-badge-lang">${m.language || "Tamil"} Cinema</span>
            <span class="badge-match" id="hero-badge-year">${m.year || 2024} RELEASE</span>
            <span class="badge-quality">4K Ultra HD</span>
            <span class="badge-sound">Dolby Atmos</span>
            <span class="badge-creator" style="background:rgba(229,9,20,0.25);border:1px solid #e50914;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:700;">Created by Prem</span>
            <span class="badge-creator" id="hero-badge-rating" style="background:rgba(234,179,8,0.2);border:1px solid #eab308;color:#facc15;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:800;">★ ${m.rating || "8.5"} IMDb</span>
          </div>
          <h1 class="hero-title" id="hero-title">${m.title}</h1>
          <p class="hero-synopsis" id="hero-synopsis">${m.overview || ""}</p>
          <div class="hero-buttons">
            <button class="btn-main-play" id="hero-btn-play">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Play Movie (1-Click)</span>
            </button>
            <button class="btn-main-info" id="hero-btn-download" style="background:#22c55e;color:#000;font-weight:800;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Download</span>
            </button>
            <button class="btn-main-info" id="hero-btn-trailer" style="background:rgba(255,255,255,0.12);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
              <span>Trailer</span>
            </button>
            <button class="btn-main-info" id="hero-btn-info">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>More Info</span>
            </button>
            <button class="btn-main-watchlist ${isSaved ? "in-list" : ""}" id="hero-btn-list" title="Add to My List">
              ${isSaved
                ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
                : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
              }
            </button>
          </div>
        </div>

        <!-- 5 Indicators for IMDb Top 5 -->
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

      section.style.backgroundImage = `linear-gradient(to right, rgba(8, 7, 13, 0.95) 25%, rgba(8, 7, 13, 0.6) 60%, rgba(8, 7, 13, 0.3) 100%), url('${m.backdrop || m.poster}')`;

      const titleEl = document.getElementById("hero-title");
      if (titleEl) titleEl.textContent = m.title;

      const synEl = document.getElementById("hero-synopsis");
      if (synEl) synEl.textContent = m.overview || "";

      const langEl = document.getElementById("hero-badge-lang");
      if (langEl) langEl.textContent = `${m.language || "Tamil"} Cinema`;

      const yearEl = document.getElementById("hero-badge-year");
      if (yearEl) yearEl.textContent = `${m.year || 2024} RELEASE`;

      const ratEl = document.getElementById("hero-badge-rating");
      if (ratEl) ratEl.textContent = `★ ${m.rating || "8.5"} IMDb`;

      document.querySelectorAll(".hero-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === this.currentHeroIndex);
      });

      const isSaved = this.myList.includes(m.id);
      const listBtn = document.getElementById("hero-btn-list");
      if (listBtn) {
        listBtn.className = `btn-main-watchlist ${isSaved ? "in-list" : ""}`;
        listBtn.innerHTML = isSaved
          ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
          : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
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

    const prevBtn = document.getElementById("hero-arrow-prev");
    const nextBtn = document.getElementById("hero-arrow-next");
    if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); prevSlide(); });
    if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); nextSlide(); });

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

    const tamilHeroMovies = sortedTamil.slice(0, 5);
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

      <div class="category-header-wrap" style="padding: 24px 4% 0;">
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
    // Top 5 Verified Released Blockbusters for the Auto-Rotating Billboard (Prioritizing 2026/2025 releases)
    const sortedCatalog = [...this.catalog]
      .filter(m => (m.backdrop || m.poster))
      .sort((a, b) => {
        const yearA = a.year || 2024;
        const yearB = b.year || 2024;
        if (yearB !== yearA) return yearB - yearA;
        return (b.rating || 0) - (a.rating || 0);
      });
    const top5Imdb = sortedCatalog.slice(0, 5);
    const featuredMovie = top5Imdb[0] || this.catalog.find(m => m.id === "goat-tamil") || this.catalog.find(m => m.id === "leo-tamil") || this.catalog.find(m => m.isTrending && m.backdrop) || this.catalog[0];
    
    // Top 6 Latest Releases from IMDb / TMDB
    const latestSix = (this.dashboardData && this.dashboardData.latest_six && this.dashboardData.latest_six.length > 0)
      ? this.dashboardData.latest_six
      : this.catalog.slice(0, 6);

    const tamil2026 = (this.dashboardData && this.dashboardData.tamil_2026 && this.dashboardData.tamil_2026.length > 0)
      ? this.dashboardData.tamil_2026
      : this.catalog.filter(m => m.language === "Tamil" && m.year === 2026);

    const tamil2025 = (this.dashboardData && this.dashboardData.tamil_2025 && this.dashboardData.tamil_2025.length > 0)
      ? this.dashboardData.tamil_2025
      : this.catalog.filter(m => m.language === "Tamil" && m.year === 2025);

    const tamil2024 = (this.dashboardData && this.dashboardData.tamil_2024 && this.dashboardData.tamil_2024.length > 0)
      ? this.dashboardData.tamil_2024
      : this.catalog.filter(m => m.language === "Tamil" && m.year === 2024);

    const top10 = [...this.catalog].filter(m => m.trendingRank || m.rating >= 8.0).slice(0, 10);
    const tamilMovies = this.catalog.filter(m => m.language === "Tamil");
    const englishMovies = this.catalog.filter(m => m.language === "English");
    const hindiMovies = this.catalog.filter(m => m.language === "Hindi");
    const teluguMovies = this.catalog.filter(m => m.language === "Telugu");
    const malayalamMovies = this.catalog.filter(m => m.language === "Malayalam");

    container.innerHTML = `
      <!-- Hero Billboard Carousel (Netflix & Hotstar Auto-Rotating) -->
      ${this.setupHeroCarousel(top5Imdb)}

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
    if (movie) this.registerMovie(movie);
    const isSaved = this.myList.includes(movie.id);
    const posterSrc = movie.poster || `${(typeof window !== "undefined" && window.API_PREFIX) || ""}/api/poster?title=${encodeURIComponent(movie.title)}&year=${movie.year || 2026}`;
    const cleanTitle = (movie.title || "Movie").replace(/[<>"']/g, "");
    const displayTitle = this.searchQuery ? this.searchEngine.highlightMatch(movie.title, this.searchQuery) : movie.title;

    return `
      <div class="movie-card" data-id="${movie.id}">
        <div class="card-media">
          <img class="card-img" src="${posterSrc}" alt="${cleanTitle}" loading="lazy" onerror="handlePosterError(this, '${cleanTitle}', '${movie.year || 2026}')" />
          <span class="card-lang-badge">${movie.language}</span>
          <span class="card-quality-badge">${(movie.qualities && movie.qualities[0]) || "4K"}</span>
          
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
            <span class="card-meta-rating">★ ${movie.rating || "8.5"}</span>
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
  }
}

// Global App Initialization
document.addEventListener("DOMContentLoaded", () => {
  window.movieshubApp = new MovieshubApp();
});
