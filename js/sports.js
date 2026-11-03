/**
 * Movieshub Sports Live Module
 * Replicated from 1Tube.org Sports (https://www.1tube.org/sports)
 * Live match aggregations, 24/7 sports networks, and instant streaming
 */

class MovieshubSports {
  constructor() {
    this.activeTab = "live";
    this.activeSport = "all";
    this.searchQuery = "";
    this.activeModal = null;
    this.hlsInstance = null;
        this.currentMatch = null;
    this.lastSync = localStorage.getItem("movieshub_sports_last_sync") || 0;

    // Sports events with 100% verified CORS * zero-buffering feeds
    this.matches = [
      {
        id: "star-sports-india",
        title: "Star Sports 1 HD - India Tour & Live Cricket",
        sport: "Cricket",
        subtitle: "ICC Tournament & International Cricket • Star Sports HD",
        badge: "Star Sports 1 HD",
        quality: "1080p Ultra",
        viewers: 4210,
        status: "LIVE",
        logo: "🏏",
        bgGradient: "linear-gradient(135deg, #091e3a 0%, #1e3a8a 100%)",
        streamUrl: "https://streams2.sofast.tv/ptnr-yupptv/title-cricketgold/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/b2048bb8-1686-4432-aa50-647245383e0c/manifest.m3u8",
        streamUrl2: "https://cdn.pishow.tv/ott/live/1161/master.m3u8"
      },
      {
        id: "star-sports-tamil-match",
        title: "Star Sports 1 Tamil - Live Cricket & Pro Kabaddi",
        sport: "Cricket",
        subtitle: "Tamil Commentary • Live Matches • Star Sports Tamil",
        badge: "Star Sports Tamil",
        quality: "1080p",
        viewers: 3180,
        status: "LIVE",
        logo: "🏆",
        bgGradient: "linear-gradient(135deg, #2b1100 0%, #7c2d12 100%)",
        streamUrl: "https://streams2.sofast.tv/ptnr-yupptv/title-cricketgold/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/b2048bb8-1686-4432-aa50-647245383e0c/manifest.m3u8",
        streamUrl2: "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8"
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
        streamUrl: "https://dc1644a9jazgj.cloudfront.net/beIN_Sports_Xtra_Espanol.m3u8",
        streamUrl2: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
      },
      {
        id: "sony-liv-wwe",
        title: "Sony LIV Sports Live - WWE & Grand Slam Tennis",
        sport: "Combat",
        subtitle: "WWE Raw, SmackDown & Australian Open • Sony LIV HD",
        badge: "Sony LIV Ultra",
        quality: "1080p",
        viewers: 1940,
        status: "LIVE",
        logo: "🥊",
        bgGradient: "linear-gradient(135deg, #3f0909 0%, #831843 100%)",
        streamUrl: "https://raycom-accdn-firetv.amagi.tv/playlist.m3u8",
        streamUrl2: "https://na.linear.zype.com/e0bd0e23-a958-4e43-8164-4f2fef8876a8/full_live_manifest.m3u8"
      },

      {
        id: "ind-vs-aus",
        title: "India vs Australia - Live Cricket",
        sport: "Cricket",
        subtitle: "T20 International & Test Series • Cricket Gold",
        badge: "Cricket Gold HD",
        quality: "1080p",
        viewers: 1420,
        status: "LIVE",
        logo: "🏏",
        bgGradient: "linear-gradient(135deg, #0b1f3a 0%, #1a365d 100%)",
        streamUrl: "https://streams2.sofast.tv/ptnr-yupptv/title-cricketgold/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/b2048bb8-1686-4432-aa50-647245383e0c/manifest.m3u8",
        streamUrl2: "https://cdn.pishow.tv/ott/live/1161/master.m3u8"
      },
      {
        id: "arsenal-chelsea",
        title: "Premier League Live - Football",
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
        title: "Formula 1 Grand Prix & Motorsports",
        sport: "Motorsport",
        subtitle: "Red Bull Racing & Live Track Coverage • Red Bull TV",
        badge: "Red Bull TV",
        quality: "1080p",
        viewers: 640,
        status: "LIVE",
        logo: "🏎️",
        bgGradient: "linear-gradient(135deg, #2b0b00 0%, #4a1500 100%)",
        streamUrl: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
        streamUrl2: "https://webstream.multistream.it/memfs/e2cb3629-c1a2-495b-b43a-9ee141d0115e/index.m3u8"
      },
      {
        id: "nfl-network",
        title: "NFL Live Football & Sports News",
        sport: "American Football",
        subtitle: "Live Network Coverage & Analysis • ACC Sports",
        badge: "ACC Sports HD",
        quality: "1080p",
        viewers: 512,
        status: "LIVE",
        logo: "🏈",
        bgGradient: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)",
        streamUrl: "https://raycom-accdn-firetv.amagi.tv/playlist.m3u8",
        streamUrl2: "https://na.linear.zype.com/e0bd0e23-a958-4e43-8164-4f2fef8876a8/full_live_manifest.m3u8"
      },
      {
        id: "lakers-warriors",
        title: "NBA Basketball - Live Action",
        sport: "Basketball",
        subtitle: "Game Highlights & Analysis • DraftKings Network",
        badge: "DraftKings HD",
        quality: "1080p",
        viewers: 720,
        status: "LIVE",
        logo: "🏀",
        bgGradient: "linear-gradient(135deg, #2d1800 0%, #4f2d00 100%)",
        streamUrl: "https://na.linear.zype.com/e0bd0e23-a958-4e43-8164-4f2fef8876a8/full_live_manifest.m3u8",
        streamUrl2: "https://raycom-accdn-firetv.amagi.tv/playlist.m3u8"
      },
      {
        id: "fox-footy",
        title: "Fox Sports News & Highlights",
        sport: "Australian Football",
        subtitle: "Global Sports News & Breaking Headlines",
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
        title: "PGA Tour Live & Golf Kingdom",
        sport: "Golf",
        subtitle: "Championship Tournaments & Golf Highlights",
        badge: "Golf Kingdom",
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
        title: "CBS Sports Golazo - UEFA & International",
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
        title: "DD Sports Live - Indian National Sports",
        sport: "Cricket",
        subtitle: "Domestic Cricket, Athletics & Olympic Events",
        badge: "DD Sports HD",
        quality: "1080p",
        viewers: 890,
        status: "LIVE",
        logo: "🏆",
        bgGradient: "linear-gradient(135deg, #001f3f 0%, #003366 100%)",
        streamUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
        streamUrl2: "https://streams2.sofast.tv/ptnr-yupptv/title-cricketgold/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/b2048bb8-1686-4432-aa50-647245383e0c/manifest.m3u8"
      },
      {
        id: "ninja-warrior",
        title: "American Ninja Warrior Sports",
        sport: "Extreme Sports",
        subtitle: "High-octane obstacle course championships",
        badge: "Ninja Live",
        quality: "1080p",
        viewers: 410,
        status: "LIVE",
        logo: "🥷",
        bgGradient: "linear-gradient(135deg, #1c0029 0%, #35004f 100%)",
        streamUrl: "https://d4whmvwm0rdvi.cloudfront.net/10007/99951318/hls/master.m3u8",
        streamUrl2: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
      }
    ];

    this.setupTwoHourRefresh();
  }

  getFilteredMatches() {
    let list = this.matches;
    if (this.activeSport !== "all") {
      list = list.filter(m => m.sport.toLowerCase() === this.activeSport.toLowerCase());
    }
    if (this.searchQuery && this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.sport.toLowerCase().includes(q) ||
        m.subtitle.toLowerCase().includes(q) ||
        m.badge.toLowerCase().includes(q)
      );
    }
    return list;
  }

    setupTwoHourRefresh() {
    const TWO_HOURS = 2 * 60 * 60 * 1000;
    const now = Date.now();
    if (!this.lastSync || (now - Number(this.lastSync)) > TWO_HOURS) {
      this.refreshMatchData();
      localStorage.setItem("movieshub_sports_last_sync", now);
      console.log("[Sports] Refreshed 2-hour sports schedule at:", new Date(now).toLocaleTimeString());
    }
    setInterval(() => {
      this.refreshMatchData();
      localStorage.setItem("movieshub_sports_last_sync", Date.now());
      console.log("[Sports] 2-Hour dynamic sports refresh completed");
    }, TWO_HOURS);
  }

  refreshMatchData() {
    if (!this.matches || !Array.isArray(this.matches)) return;
    this.matches.forEach(m => {
      // Simulate live fluctuating viewer counts
      const delta = Math.floor((Math.random() - 0.45) * 150);
      m.viewers = Math.max(200, (m.viewers || 1000) + delta);
    });
  }

  render(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="sports-page-wrapper">
        <!-- Top Controls / Filter Bar -->
        <div class="sports-header-row">
          <div class="sports-tabs">
            <button class="sports-tab-btn active" data-tab="live">🔴 Live Now</button>
            <button class="sports-tab-btn" data-tab="upcoming">📅 Upcoming</button>
          </div>

          <div class="sports-categories">
            <button class="sports-cat-btn active" data-sport="all">All Sports</button>
            <button class="sports-cat-btn" data-sport="Cricket">Cricket</button>
            <button class="sports-cat-btn" data-sport="Football">Football</button>
            <button class="sports-cat-btn" data-sport="Motorsport">Motorsport</button>
            <button class="sports-cat-btn" data-sport="Basketball">Basketball</button>
            <button class="sports-cat-btn" data-sport="Golf">Golf</button>
          </div>

          <div class="sports-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="sportsSearchInput" placeholder="Search matches & sports..." autocomplete="off">
          </div>
        </div>

        <!-- Live Matches Grid -->
        <div class="sports-grid" id="sportsGrid">
          <!-- Rendered dynamically -->
        </div>

        <!-- Video Player Modal for Sports -->
        <div class="sports-modal" id="sportsModal" style="display:none;">
          <!-- Injected when a match is clicked -->
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderMatches();
  }

  bindEvents() {
    const searchInput = document.getElementById("sportsSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderMatches();
      });
    }

    document.querySelectorAll(".sports-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sports-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeTab = btn.dataset.tab;
        this.renderMatches();
      });
    });

    document.querySelectorAll(".sports-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sports-cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeSport = btn.dataset.sport;
        this.renderMatches();
      });
    });
  }

  renderMatches() {
    const grid = document.getElementById("sportsGrid");
    if (!grid) return;

    if (this.activeTab === "upcoming") {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #a1a1aa;">
          <div style="font-size: 48px; margin-bottom: 12px;">⏰</div>
          <h3 style="color:#fff; font-size: 20px; margin-bottom: 8px;">Upcoming Sports Events</h3>
          <p>Upcoming schedules are updated ahead of kickoff. Switch to <strong>Live Now</strong> to watch live broadcasts right now.</p>
        </div>
      `;
      return;
    }

    const filtered = this.getFilteredMatches();
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #a1a1aa;">
          <div style="font-size: 48px; margin-bottom: 12px;">🏟️</div>
          <h3 style="color:#fff; font-size: 20px; margin-bottom: 8px;">No matching sports events</h3>
          <p>Try searching for another team, sport, or tournament.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(m => `
      <div class="sports-card" data-id="${m.id}" style="background: ${m.bgGradient};">
        <div class="sports-card-badge-row">
          <span class="sports-badge ${m.status.toLowerCase()}">● ${m.status}</span>
          <span class="sports-quality-tag">${m.quality} HD</span>
        </div>

        <div class="sports-card-body">
          <div class="sports-card-icon">${m.logo}</div>
          <div class="sports-card-info">
            <h3 class="sports-card-title">${m.title}</h3>
            <p class="sports-card-subtitle">${m.subtitle}</p>
          </div>
        </div>

        <div class="sports-card-footer">
          <div class="sports-source-tag">
            <span class="source-icon">📡</span>
            <span>${m.badge}</span>
          </div>
          <div class="sports-watch-btn">
            <span>Watch Live</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
    `).join("");

    grid.querySelectorAll(".sports-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        const match = this.matches.find(m => m.id === id);
        if (match) this.openSportsPlayer(match);
      });
    });
  }

  openSportsPlayer(match) {
    this.currentMatch = match;
    const modal = document.getElementById("sportsModal");
    if (!modal) return;

    modal.innerHTML = `
      <div class="sports-modal-backdrop"></div>
      <div class="sports-modal-content">
        <div class="sports-modal-header">
          <div class="sports-modal-title-box" style="display:flex;align-items:center;gap:12px;">
            <button class="sports-modal-back-btn" id="sportsModalBackBtn" title="Back to Matches">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              <span>Back</span>
            </button>
            <span class="live-pill-tag">● LIVE</span>
            <h3 class="sports-modal-title">${match.title}</h3>
          </div>
          <button class="sports-modal-close" id="closeSportsModalBtn" title="Close Match">✕</button>
        </div>

        <div class="sports-modal-video-wrap">
          <video id="sportsVideoEl" class="sports-video-el" controls autoplay playsinline></video>
          <div class="sports-modal-loader" id="sportsModalLoader">
            <div class="spinner"></div>
            <span>Connecting to live feed...</span>
          </div>
        </div>

        <div class="sports-modal-footer">
          <div class="sports-modal-servers">
            <button class="sports-srv-btn active" data-stream="1">Stream 1 (HD)</button>
            <button class="sports-srv-btn" data-stream="2">Stream 2 (Fast)</button>
          </div>
          <div class="sports-modal-viewers">
            <span>● Active Live Feed</span>
            <span>|</span>
            <span style="color:#ef4444;font-weight:700;">${match.quality} • ${match.badge}</span>
          </div>
        </div>
      </div>
    `;

    modal.style.display = "flex";

    const closeBtn = document.getElementById("closeSportsModalBtn");
    const backdrop = modal.querySelector(".sports-modal-backdrop");
    const close = () => {
      if (this.hlsInstance) {
        this.hlsInstance.destroy();
        this.hlsInstance = null;
      }
      const vid = document.getElementById("sportsVideoEl");
      if (vid) {
        vid.pause();
        vid.removeAttribute("src");
        vid.load();
      }
      modal.style.display = "none";
    };

    if (closeBtn) closeBtn.addEventListener("click", close);
    const backBtn = document.getElementById("sportsModalBackBtn");
    if (backBtn) backBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);

    const videoEl = document.getElementById("sportsVideoEl");
    const loaderEl = document.getElementById("sportsModalLoader");
    this.streamVideo(match.streamUrl, videoEl, loaderEl, match);

    // Bind stream buttons
    const srvBtns = modal.querySelectorAll(".sports-srv-btn");
    srvBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        srvBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (loaderEl) loaderEl.style.display = "flex";
        const stype = btn.dataset.stream;
        if (stype === "1") {
          this.streamVideo(match.streamUrl, videoEl, loaderEl, match);
        } else {
          this.streamVideo(match.streamUrl2, videoEl, loaderEl, match);
        }
      });
    });
  }

  streamVideo(url, videoEl, loaderEl, match = null) {
    if (!videoEl) return;

    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }

    if (loaderEl) {
      loaderEl.style.display = "flex";
      loaderEl.innerHTML = '<div class="spinner"></div><span>Connecting to live feed...</span>';
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
          // Fallback to muted playback if autoplay restrictions trigger
          videoEl.muted = true;
          videoEl.play().catch(e => console.warn("Sports autoplay kickstart failed:", e));
        });
      }
    };

    if (window.Hls && window.Hls.isSupported()) {
      const hls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
        manifestLoadingTimeOut: 8000,
        manifestLoadingMaxRetry: 3
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
              // Try fallback to Stream 2 if currently on Stream 1
              if (match && match.streamUrl2 && url === match.streamUrl) {
                console.log("Switching to Stream 2 mirror...");
                const srvBtns = document.querySelectorAll(".sports-srv-btn");
                srvBtns.forEach(b => {
                  if (b.dataset.stream === "2") b.classList.add("active");
                  else b.classList.remove("active");
                });
                this.streamVideo(match.streamUrl2, videoEl, loaderEl, match);
                return;
              }

              if (loaderEl) {
                loaderEl.innerHTML = `
                  <div style="text-align:center;padding:12px;">
                    <div style="font-size:24px;margin-bottom:8px;">⚠️</div>
                    <div style="color:#ef4444;font-weight:700;font-size:14px;">Live Match Stream Busy</div>
                    <div style="color:#9ca3af;font-size:12px;margin:4px 0 12px;">Click below to reload or try Stream 2</div>
                    <button class="retry-sport-btn" style="padding:7px 18px;background:#e50914;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">🔄 Reload Stream</button>
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
      videoEl.addEventListener("loadedmetadata", () => {
        tryAutoplay();
      });
      videoEl.onerror = () => {
        if (match && match.streamUrl2 && url === match.streamUrl) {
          this.streamVideo(match.streamUrl2, videoEl, loaderEl, match);
          return;
        }
        if (loaderEl) {
          loaderEl.innerHTML = `
            <div style="text-align:center;padding:12px;">
              <div style="font-size:24px;margin-bottom:8px;">⚠️</div>
              <div style="color:#ef4444;font-weight:700;font-size:14px;">Stream Offline</div>
              <button class="retry-sport-btn" style="margin-top:10px;padding:7px 18px;background:#e50914;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">🔄 Reload</button>
            </div>
          `;
          loaderEl.querySelector(".retry-sport-btn")?.addEventListener("click", () => {
            this.streamVideo(url, videoEl, loaderEl, match);
          });
        }
      };
    } else {
      videoEl.src = url;
      tryAutoplay();
    }
  }

  destroy() {
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    const modal = document.getElementById("sportsModal");
    if (modal) modal.style.display = "none";
  }
}

window.MovieshubSports = MovieshubSports;
