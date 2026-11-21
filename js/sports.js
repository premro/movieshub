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

    // Baseline verified sports feeds (Star Sports, Sony LIV, DD Sports, Sky Sports)
    this.defaultMatches = [
      {
        id: "star-sports-india",
        title: "Star Sports 1 HD - Live Cricket & ICC Tournament",
        sport: "Cricket",
        subtitle: "ICC Tournament & International Cricket • Star Sports HD",
        badge: "Star Sports 1 HD",
        quality: "1080p Ultra",
        viewers: 4210,
        status: "LIVE",
        logo: "🏏",
        bgGradient: "linear-gradient(135deg, #091e3a 0%, #1e3a8a 100%)",
        streamUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
        streamUrl2: "https://fta.ektv.in/live/697/master.m3u8"
      },
      {
        id: "star-sports-tamil-match",
        title: "Star Sports 1 Tamil - Live Indian Cricket & Games",
        sport: "Cricket",
        subtitle: "Tamil Commentary • Live Matches • Star Sports Tamil",
        badge: "Star Sports Tamil",
        quality: "1080p",
        viewers: 3180,
        status: "LIVE",
        logo: "🏆",
        bgGradient: "linear-gradient(135deg, #2b1100 0%, #7c2d12 100%)",
        streamUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
        streamUrl2: "https://fta.ektv.in/live/697/master.m3u8"
      },
      {
        id: "sony-ten-1-match",
        title: "Sony Sports Ten 1 HD - UEFA & European Football",
        sport: "Football",
        subtitle: "Champions League & International Football • Sony LIV",
        badge: "Sony LIV / Ten 1",
        quality: "1080p",
        viewers: 2890,
        status: "LIVE",
        logo: "⚽",
        bgGradient: "linear-gradient(135deg, #170d2b 0%, #3b0764 100%)",
        streamUrl: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
        streamUrl2: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
      },
      {
        id: "sony-liv-wwe",
        title: "Sony LIV Sports Live - Global Combat & Tennis",
        sport: "Combat",
        subtitle: "Live Combat Championship & Grand Slam Tennis • Sony LIV HD",
        badge: "Sony LIV Ultra",
        quality: "1080p",
        viewers: 1940,
        status: "LIVE",
        logo: "🥊",
        bgGradient: "linear-gradient(135deg, #3f0909 0%, #831843 100%)",
        streamUrl: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8",
        streamUrl2: "https://cdn.pishow.tv/ott/live/1161/master.m3u8"
      },
      {
        id: "sky-sports-world-news",
        title: "Sky Sports World News HD",
        sport: "Football",
        subtitle: "Global Sports News & Breaking Headlines • Sky Sports HD",
        badge: "Sky Sports HD",
        quality: "1080p Ultra",
        viewers: 3500,
        status: "LIVE",
        logo: "🌐",
        bgGradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        streamUrl: "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8",
        streamUrl2: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
      },
      {
        id: "ind-vs-aus",
        title: "India Cricket Special - DD Sports HD",
        sport: "Cricket",
        subtitle: "Indian National Cricket & International Matches • DD Sports",
        badge: "DD Sports Live",
        quality: "1080p",
        viewers: 1420,
        status: "LIVE",
        logo: "🏏",
        bgGradient: "linear-gradient(135deg, #0b1f3a 0%, #1a365d 100%)",
        streamUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
        streamUrl2: "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8"
      },
      {
        id: "arsenal-chelsea",
        title: "Premier League Live - European Football",
        sport: "Football",
        subtitle: "European Soccer & League Matches • beIN Sports",
        badge: "beIN Sports",
        quality: "1080p",
        viewers: 954,
        status: "LIVE",
        logo: "⚽",
        bgGradient: "linear-gradient(135deg, #1b0000 0%, #3e0404 100%)",
        streamUrl: "https://dc1644a9jazgj.cloudfront.net/beIN_Sports_Xtra_Espanol.m3u8",
        streamUrl2: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
      },
      {
        id: "f1-grand-prix",
        title: "Formula 1 Grand Prix & Extreme Motorsports",
        sport: "Motorsport",
        subtitle: "Red Bull Racing & Live Track Coverage • Red Bull TV",
        badge: "Red Bull TV",
        quality: "1080p",
        viewers: 640,
        status: "LIVE",
        logo: "🏎️",
        bgGradient: "linear-gradient(135deg, #2b0b00 0%, #4a1500 100%)",
        streamUrl: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
        streamUrl2: "https://raycom-accdn-firetv.amagi.tv/playlist.m3u8"
      },
      {
        id: "nfl-network",
        title: "ACC Sports Live - American College Action",
        sport: "American Football",
        subtitle: "Live Network Coverage & NCAA Basketball • ACC Sports",
        badge: "ACC Sports HD",
        quality: "1080p",
        viewers: 512,
        status: "LIVE",
        logo: "🏈",
        bgGradient: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)",
        streamUrl: "https://raycom-accdn-firetv.amagi.tv/playlist.m3u8",
        streamUrl2: "https://30a-tv.com/feeds/vidaa/golf.m3u8"
      },
      {
        id: "lakers-warriors",
        title: "NBA Basketball & Live Sports Hub",
        sport: "Basketball",
        subtitle: "Game Highlights & Analysis • ACC Sports Network",
        badge: "ACC Sports HD",
        quality: "1080p",
        viewers: 720,
        status: "LIVE",
        logo: "🏀",
        bgGradient: "linear-gradient(135deg, #2d1800 0%, #4f2d00 100%)",
        streamUrl: "https://raycom-accdn-firetv.amagi.tv/playlist.m3u8",
        streamUrl2: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
      },
      {
        id: "fox-footy",
        title: "Fox Sports News & Global Headlines",
        sport: "Australian Football",
        subtitle: "Global Sports News & Breaking Headlines • Fox Sports AU",
        badge: "Fox Sports",
        quality: "1080p",
        viewers: 380,
        status: "LIVE",
        logo: "🏉",
        bgGradient: "linear-gradient(135deg, #3d0000 0%, #1f0000 100%)",
        streamUrl: "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8",
        streamUrl2: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
      },
      {
        id: "pga-golf",
        title: "PGA Tour Live & Championship Golf",
        sport: "Golf",
        subtitle: "Championship Tournaments & Golf Highlights • 30A Golf",
        badge: "PGA Golf HD",
        quality: "720p",
        viewers: 210,
        status: "LIVE",
        logo: "⛳",
        bgGradient: "linear-gradient(135deg, #062b14 0%, #0f4a26 100%)",
        streamUrl: "https://30a-tv.com/feeds/vidaa/golf.m3u8",
        streamUrl2: "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8"
      },
      {
        id: "real-madrid-tv",
        title: "CBS Sports Golazo - UEFA & Soccer 24/7",
        sport: "Football",
        subtitle: "Champions League Analysis & Live Soccer",
        badge: "CBS Sports",
        quality: "720p",
        viewers: 630,
        status: "LIVE",
        logo: "⚽",
        bgGradient: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)",
        streamUrl: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8",
        streamUrl2: "https://dc1644a9jazgj.cloudfront.net/beIN_Sports_Xtra_Espanol.m3u8"
      },
      {
        id: "dd-sports-national",
        title: "DD Sports Live - Indian National Games",
        sport: "Cricket",
        subtitle: "Domestic Cricket, Athletics & Olympic Events",
        badge: "DD Sports HD",
        quality: "1080p",
        viewers: 890,
        status: "LIVE",
        logo: "🏆",
        bgGradient: "linear-gradient(135deg, #001f3f 0%, #003366 100%)",
        streamUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
        streamUrl2: "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8"
      },
      {
        id: "ninja-warrior",
        title: "American Ninja Warrior Sports",
        sport: "Extreme Sports",
        subtitle: "High-octane obstacle course championships",
        badge: "Ninja HD",
        quality: "720p",
        viewers: 450,
        status: "LIVE",
        logo: "⚡",
        bgGradient: "linear-gradient(135deg, #2b002b 0%, #4a004a 100%)",
        streamUrl: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8",
        streamUrl2: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
      }
    ];

    this.matches = [...this.defaultMatches];
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

        // Merge: verified local channels + live upcoming events + 24/7 networks
        this.matches = [
          ...this.defaultMatches,
          ...liveEvents,
          ...liveChannels
        ];
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
      // Clean non-sandboxed embed allowing full playback while protected by index.html anti-redirect shield
      mount.innerHTML = `
        <iframe 
          id="sportsIframeEl" 
          class="sports-video-el" 
          src="${url}" 
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" 
          allowfullscreen 
          referrerpolicy="no-referrer"
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
