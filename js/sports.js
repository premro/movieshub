/**
 * Movieshub Sports Live Module
 * Integrated with TimStreams Live Aggregator (https://tim-streams.com/streams)
 * Real-time match aggregations, 24/7 sports networks, and anti-redirect live streaming
 */

class MovieshubSports {
  constructor() {
    this.activeTab = "live";
    this.activeSport = "all";
    this.searchQuery = "";
    this.activeModal = null;
    this.hlsInstance = null;
    this.currentMatch = null;
    this.currentStreamIdx = 0;
    this.refreshTimer = null;
    this.lastSync = localStorage.getItem("movieshub_sports_last_sync") || 0;

    // Real-time live sports feeds dynamically synced from TimStreams
    this.defaultMatches = [];
    this.matches = [];
    this.init();
  }

  init() {
    this.fetchLiveMatches();
    // Auto-update live sports schedule regularly every 3 minutes
    if (!this.refreshTimer) {
      this.refreshTimer = setInterval(() => {
        if (window.movieshubApp && window.movieshubApp.activeView === "sports" && !this.activeModal) {
          this.fetchLiveMatches();
        }
      }, 180000);
    }
  }

  async fetchLiveMatches(force = false) {
    try {
      const pfx = window.API_PREFIX || "";
      const res = await fetch(`${pfx}/api/sports${force ? "?refresh=1" : ""}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data && Array.isArray(data.matches) && data.matches.length > 0) {
        const defaultIds = new Set(this.defaultMatches.map(m => m.id));
        const liveEvents = data.matches.filter(m => m.isEvent);
        const liveChannels = data.matches.filter(m => m.isChannel);

        // Purely synchronized real-time feeds from TimStreams (no stale/misrouted entries)
        this.matches = data.matches;
        this.lastSync = Date.now();
        localStorage.setItem("movieshub_sports_last_sync", this.lastSync);
        console.log(`[Movieshub Sports] Synced ${this.matches.length} live matches & sports channels from TimStreams`);

        // Update UI if currently on Sports view
        const grid = document.getElementById("sportsGrid");
        if (grid) {
          grid.innerHTML = this.renderCardsHtml(this.getFilteredMatches());
          this.bindCardClicks();
        }
        const countBadge = document.getElementById("sportsLiveCountBadge");
        if (countBadge) {
          countBadge.textContent = `${this.matches.length} Live Feeds`;
        }
      }
    } catch (e) {
      console.warn("[Sports Live Sync Error]", e);
    }
  }

  render(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="sports-page-wrapper">
        <!-- Top Controls / Filter Bar -->
        <div class="sports-header-row">
          <button class="sports-back-btn" id="sportsBackToMoviesBtn" title="Back to Movieshub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back to Movies</span>
          </button>
          
          <div class="sports-tabs">
            <button class="sports-tab-btn ${this.activeTab === 'live' ? 'active' : ''}" data-tab="live">🔴 Live Now</button>
            <button class="sports-tab-btn ${this.activeTab === 'upcoming' ? 'active' : ''}" data-tab="upcoming">📅 Upcoming</button>
            <button class="sports-tab-btn ${this.activeTab === 'channels' ? 'active' : ''}" data-tab="channels">📺 24/7 Channels</button>
          </div>

          <button class="sports-refresh-btn" id="sportsRefreshBtn" title="Update Live Streams from TimStreams">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            <span id="sportsLiveCountBadge">${this.matches.length} Live Feeds</span>
          </button>

          <div class="sports-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="sportsSearchInput" placeholder="Search matches & sports..." autocomplete="off" value="${this.searchQuery}">
          </div>
        </div>

        <div class="sports-categories">
          <button class="sports-cat-btn ${this.activeSport === 'all' ? 'active' : ''}" data-sport="all">All Sports</button>
          <button class="sports-cat-btn ${this.activeSport === 'Cricket' ? 'active' : ''}" data-sport="Cricket">🏏 Cricket</button>
          <button class="sports-cat-btn ${this.activeSport === 'Football' ? 'active' : ''}" data-sport="Football">⚽ Football</button>
          <button class="sports-cat-btn ${this.activeSport === 'Motorsport' ? 'active' : ''}" data-sport="Motorsport">🏎️ Motorsport</button>
          <button class="sports-cat-btn ${this.activeSport === 'Basketball' ? 'active' : ''}" data-sport="Basketball">🏀 Basketball</button>
          <button class="sports-cat-btn ${this.activeSport === 'Combat' ? 'active' : ''}" data-sport="Combat">🥊 Combat / UFC</button>
          <button class="sports-cat-btn ${this.activeSport === 'American Football' ? 'active' : ''}" data-sport="American Football">🏈 NFL</button>
          <button class="sports-cat-btn ${this.activeSport === 'Golf' ? 'active' : ''}" data-sport="Golf">⛳ Golf</button>
          <button class="sports-cat-btn ${this.activeSport === 'Tennis' ? 'active' : ''}" data-sport="Tennis">🎾 Tennis</button>
        </div>

        <!-- Live Matches Grid -->
        <div class="sports-grid" id="sportsGrid">
          ${this.renderCardsHtml(this.getFilteredMatches())}
        </div>

        <!-- Sports Video Modal (HLS or Clean Non-Redirecting Embed) -->
        <div class="sports-modal" id="sportsModal" style="display:none;"></div>
      </div>
    `;

    this.bindEvents();
    this.bindCardClicks();
    this.fetchLiveMatches();
  }

  bindEvents() {
    const backToMovies = document.getElementById("sportsBackToMoviesBtn");
    if (backToMovies) {
      backToMovies.addEventListener("click", () => {
        if (window.movieshubApp) {
          window.movieshubApp.switchView("movies");
        } else {
          window.location.hash = "movies";
        }
      });
    }

    const refreshBtn = document.getElementById("sportsRefreshBtn");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", async () => {
        refreshBtn.classList.add("spinning");
        if (window.showToast) window.showToast("🔄 Syncing live sports feeds from TimStreams...");
        await this.fetchLiveMatches(true);
        refreshBtn.classList.remove("spinning");
        if (window.showToast) window.showToast("⚡ Sports feeds updated with latest live events!");
      });
    }

    const searchInput = document.getElementById("sportsSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        const grid = document.getElementById("sportsGrid");
        if (grid) grid.innerHTML = this.renderCardsHtml(this.getFilteredMatches());
        this.bindCardClicks();
      });
    }

    document.querySelectorAll(".sports-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sports-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeTab = btn.dataset.tab;
        const grid = document.getElementById("sportsGrid");
        if (grid) grid.innerHTML = this.renderCardsHtml(this.getFilteredMatches());
        this.bindCardClicks();
      });
    });

    document.querySelectorAll(".sports-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sports-cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeSport = btn.dataset.sport;
        const grid = document.getElementById("sportsGrid");
        if (grid) grid.innerHTML = this.renderCardsHtml(this.getFilteredMatches());
        this.bindCardClicks();
      });
    });
  }

  getFilteredMatches() {
    let list = this.matches;

    if (this.activeTab === "live") {
      list = list.filter(m => m.status === "LIVE" && !m.isChannel);
    } else if (this.activeTab === "upcoming") {
      list = list.filter(m => m.status === "UPCOMING" || (m.subtitle && m.subtitle.includes("2026")));
    } else if (this.activeTab === "channels") {
      list = list.filter(m => m.isChannel || m.subtitle?.includes("24/7"));
    }

    if (this.activeSport !== "all") {
      list = list.filter(m => m.sport && m.sport.toLowerCase().includes(this.activeSport.toLowerCase()));
    }

    if (this.searchQuery) {
      list = list.filter(m => 
        (m.title && m.title.toLowerCase().includes(this.searchQuery)) ||
        (m.subtitle && m.subtitle.toLowerCase().includes(this.searchQuery)) ||
        (m.badge && m.badge.toLowerCase().includes(this.searchQuery)) ||
        (m.sport && m.sport.toLowerCase().includes(this.searchQuery))
      );
    }

    return list;
  }

  renderCardsHtml(matches) {
    if (!matches || matches.length === 0) {
      return `
        <div class="sports-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 12px;">🏟️</div>
          <h3 style="color:#fff; font-size: 20px; margin-bottom: 8px;">No matching sports events</h3>
          <p style="color:#9ca3af; font-size: 14px;">Try searching for another team or category, or click "🔄 Live Sync"</p>
        </div>
      `;
    }

    return matches.map(m => `
      <div class="sports-card" data-id="${m.id}" style="background: ${m.bgGradient || 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'};">
        <div class="sports-card-badge-row">
          <span class="sports-badge ${(m.status || 'LIVE').toLowerCase()}">● ${m.status || 'LIVE'}</span>
          <span class="sports-quality-tag">${m.quality || '1080p'} HD</span>
        </div>
        
        <div class="sports-card-body">
          <div class="sports-card-icon">${m.logo || '🏆'}</div>
          <div class="sports-card-info">
            <h3 class="sports-card-title">${m.title}</h3>
            <p class="sports-card-subtitle">${m.subtitle || (m.sport + ' Live Stream')}</p>
          </div>
        </div>

        <div class="sports-card-footer">
          <div class="sports-source-tag">
            <span class="dot"></span>
            <span>${m.badge || 'HD Stream'}</span>
          </div>
          <div class="sports-watch-btn">
            <span>Watch Live</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>
    `).join("");
  }

  bindCardClicks() {
    const grid = document.getElementById("sportsGrid");
    if (!grid) return;

    grid.querySelectorAll(".sports-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        const match = this.matches.find(m => m.id === id);
        if (match) this.openModal(match);
      });
    });
  }

  openModal(match) {
    this.currentMatch = match;
    this.currentStreamIdx = 0;
    this.activeModal = match;

    // Trigger Anti-Redirect Shield: Protect top window from rogue ad hijackings
    window.isStreamPlaying = true;
    window.userIntentionalNavigation = false;

    const modal = document.getElementById("sportsModal");
    if (!modal) return;

    const streams = [match.streamUrl, match.streamUrl2, match.streamUrl3].filter(Boolean);

    modal.innerHTML = `
      <div class="sports-modal-backdrop"></div>
      <div class="sports-modal-dialog">
        <div class="sports-modal-header">
          <div class="sports-modal-title-box" style="display:flex;align-items:center;gap:12px;">
            <button class="sports-modal-back-btn" id="sportsModalBackBtn" title="Back to Matches">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              <span>Back</span>
            </button>
            <h3 class="sports-modal-title">${match.title}</h3>
          </div>
          <button class="sports-modal-close" id="closeSportsModalBtn" title="Close Match">✕</button>
        </div>

        <div class="sports-modal-video-wrap" id="sportsModalVideoWrap">
          <button class="sports-video-back-float" id="sportsVideoFloatingBackBtn" title="Back to Matches">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          
          <div id="sportsPlayerMount" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#000;position:relative;">
            <!-- Injected Video or Clean Embed Iframe -->
          </div>

          <div class="sports-modal-loader" id="sportsModalLoader">
            <div class="spinner"></div>
            <span>Connecting to live feed...</span>
          </div>
        </div>

        <div class="sports-modal-footer">
          <div class="sports-modal-servers" id="sportsModalServers">
            ${streams.map((s, idx) => `
              <button class="sports-srv-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
                Stream ${idx + 1} ${idx === 0 ? '(HD)' : idx === 1 ? '(Fast)' : '(Mirror)'}
              </button>
            `).join('')}
            <a href="${(window.API_PREFIX || "")}/stream/sports?url=${encodeURIComponent(streams[0] || match.streamUrl)}" target="_blank" rel="noopener noreferrer" class="sports-srv-btn" style="text-decoration:none;display:inline-flex;align-items:center;gap:4px;" title="Open ad-free live stream">
              <span>↗ Direct</span>
            </a>
          </div>
          <div class="sports-modal-viewers">
            <span>● Active Live Feed</span>
            <span>|</span>
            <span style="color:#ef4444;font-weight:700;">${match.quality || '1080p'} • ${match.badge || 'Live'}</span>
          </div>
        </div>
      </div>
    `;

    modal.style.display = "flex";

    const close = () => {
      window.isStreamPlaying = false;
      this.activeModal = null;
      if (this.hlsInstance) {
        this.hlsInstance.destroy();
        this.hlsInstance = null;
      }
      const mount = document.getElementById("sportsPlayerMount");
      if (mount) {
        mount.innerHTML = "";
      }
      modal.style.display = "none";
    };

    const closeBtn = document.getElementById("closeSportsModalBtn");
    const backdrop = modal.querySelector(".sports-modal-backdrop");
    const backBtn = document.getElementById("sportsModalBackBtn");
    const floatBack = document.getElementById("sportsVideoFloatingBackBtn");

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
    if (backBtn) backBtn.addEventListener("click", close);
    if (floatBack) floatBack.addEventListener("click", close);

    // Initial stream load
    this.loadStreamAt(0, streams, match);

    // Bind stream buttons
    const srvBtns = modal.querySelectorAll(".sports-srv-btn");
    srvBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        srvBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const idx = parseInt(btn.dataset.idx, 10) || 0;
        this.loadStreamAt(idx, streams, match);
      });
    });
  }

  loadStreamAt(idx, streams, match) {
    const url = streams[idx] || match.streamUrl;
    const mount = document.getElementById("sportsPlayerMount");
    const loaderEl = document.getElementById("sportsModalLoader");
    if (!mount) return;

    if (loaderEl) {
      loaderEl.style.display = "flex";
      loaderEl.innerHTML = '<div class="spinner"></div><span>Connecting to live feed...</span>';
    }

    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }

    const isEmbed = match.isEmbed || url.includes("shoewiki.click") || url.includes("tim-streams") || !url.includes(".m3u8");

    if (isEmbed) {
      // Clean non-redirecting, anti-sandbox proxy stream
      const pfx = window.API_PREFIX || "";
      const streamSrc = `${pfx}/stream/sports?url=${encodeURIComponent(url)}`;
      mount.innerHTML = `
        <iframe 
          id="sportsIframeEl" 
          class="sports-video-el" 
          src="${streamSrc}" 
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" 
          allowfullscreen 
          style="width: 100%; height: 100%; border: none; display: block; background: #000;">
        </iframe>
      `;
      const iframe = document.getElementById("sportsIframeEl");
      if (iframe) {
        iframe.onload = () => {
          if (loaderEl) loaderEl.style.display = "none";
        };
      }
    } else {
      // Native HTML5 / HLS.js player
      mount.innerHTML = `
        <video id="sportsVideoEl" class="sports-video-el" controls autoplay playsinline></video>
      `;
      const videoEl = document.getElementById("sportsVideoEl");
      this.streamVideo(url, videoEl, loaderEl, match);
    }
  }

  streamVideo(url, videoEl, loaderEl, match = null) {
    if (!videoEl) return;

    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }

    const onPlaying = () => {
      if (loaderEl) loaderEl.style.display = "none";
    };

    videoEl.removeEventListener("playing", onPlaying);
    videoEl.addEventListener("playing", onPlaying);

    const tryAutoplay = () => {
      const p = videoEl.play();
      if (p !== undefined) {
        p.catch(() => {
          videoEl.muted = true;
          videoEl.play().catch(e => console.warn("Sports autoplay failed:", e));
        });
      }
    };

    if (window.Hls && window.Hls.isSupported()) {
      const hls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 60,
        maxBufferLength: 30
      });
      this.hlsInstance = hls;
      hls.loadSource(url);
      hls.attachMedia(videoEl);

      hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        tryAutoplay();
      });

      hls.on(window.Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case window.Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case window.Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              if (loaderEl) {
                loaderEl.innerHTML = `
                  <div style="text-align:center;padding:12px;">
                    <div style="font-size:24px;margin-bottom:8px;">⚠️</div>
                    <div style="color:#ef4444;font-weight:700;font-size:14px;">Live Match Stream Busy</div>
                    <button class="retry-sport-btn" style="margin-top:10px;padding:7px 18px;background:#e50914;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">🔄 Reload Stream</button>
                  </div>
                `;
                loaderEl.querySelector(".retry-sport-btn")?.addEventListener("click", () => {
                  this.streamVideo(url, videoEl, loaderEl, match);
                });
              }
              break;
          }
        }
      });
    } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = url;
      videoEl.addEventListener("loadedmetadata", () => tryAutoplay());
    } else {
      videoEl.src = url;
      tryAutoplay();
    }
  }

  destroy() {
    window.isStreamPlaying = false;
    this.activeModal = null;
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    const modal = document.getElementById("sportsModal");
    if (modal) modal.style.display = "none";
  }
}

window.MovieshubSports = MovieshubSports;
