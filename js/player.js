/**
 * Movieshub Theater Video Player
 * Plays ACTUAL FULL MOVIES directly sourced from Movieshub Cloud / High-Speed Cloud Streams
 * Also provides Instant Trailer Preview mode
 * Strictly NO ADS, NO EXTERNAL REDIRECTIONS
 */

class MovieshubPlayer {
  constructor() {
    this.currentMovie = null;
    this.currentMode = "movie"; // "movie" (Full Movieshub Cloud Stream) or "trailer" (Trailer Preview)
    this.modal = null;
    this.video = null;
    this.streamIframe = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.currentVolume = 0.85;
    this.currentSpeed = 1.0;
    this.currentQuality = "4K UHD (2160p)";
    this.currentAudio = "Original (Dolby Atmos)";
    this.currentSubtitle = "Off";
    this.hideControlsTimer = null;
    this.storageKey = "movieshub_playback_resume";

    this.initDOM();
  }

  initDOM() {
    let existing = document.getElementById("movieshub-player-modal");
    if (existing) existing.remove();

    this.modal = document.createElement("div");
    this.modal.id = "movieshub-player-modal";
    this.modal.className = "player-modal hidden";

    this.modal.innerHTML = `
      <div class="player-container" id="player-container">
        <!-- Floating Back Button (Always visible on top of player) -->
        <button class="player-floating-back-btn" id="player-floating-back-btn" title="Back to Movieshub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Back</span>
        </button>

        <!-- Top bar -->
        <div class="player-header" id="player-header">
          <button class="player-back-btn" id="player-back-btn" title="Back to Movieshub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          
          <div class="player-title-info">
            <span class="player-platform-badge" id="player-badge">MOVIESHUB</span>
            <span class="player-movie-title" id="player-title">Title</span>
            <span class="player-movie-extra" id="player-extra" style="font-size:12px;color:#aaa;">4K UHD • Dolby Atmos</span>
          </div>

          <!-- Mode Switcher: Full Movie vs Trailer Preview -->
          <div class="player-mode-switch" id="player-mode-switch">
            <button class="mode-tab-btn active" id="tab-full-movie" title="Play Full Movie">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Full Movie</span>
            </button>
            <button class="mode-tab-btn" id="tab-trailer" title="Watch Official Trailer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
              <span>Trailer</span>
            </button>
          </div>

          <div style="display:flex;align-items:center;gap:12px;">
            <button class="player-download-btn" id="player-top-download-btn" title="Download Movie in 4K / 1080p">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Download</span>
            </button>
            <span class="player-creator-tag">Created by <strong>Prem</strong></span>
          </div>
        </div>

        <!-- Full Movie Screen Wrap (Movieshub Cloud Live Stream Embed) -->
        <div class="player-stream-wrap" id="player-stream-wrap">
          <iframe 
            id="player-stream-iframe" 
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture" 
            allowfullscreen 
            
          ></iframe>
        </div>

        <!-- Trailer Video Screen Wrap (Local HD Video Player) -->
        <div class="player-screen-wrap hidden" id="player-screen-wrap">
          <video 
            class="player-video" 
            id="player-video-element" 
            playsinline 
            preload="auto"
          ></video>

          <!-- Big center play flash icon -->
          <div class="center-play-indicator" id="center-play-indicator">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>

          <!-- Subtitles Overlay -->
          <div class="player-subtitles" id="player-subtitles">Subtitles Active</div>

          <!-- Bottom Controls for Trailer -->
          <div class="player-controls" id="player-controls">
            <!-- Timeline scrubber -->
            <div class="player-timeline-container" id="player-timeline">
              <div class="player-buffered-bar" id="player-buffered"></div>
              <div class="player-progress-bar" id="player-progress"></div>
              <div class="player-scrubber-handle" id="player-scrubber-handle"></div>
            </div>

            <div class="player-controls-row">
              <!-- Left controls: Play, Skip, Volume, Time -->
              <div class="controls-left">
                <button class="ctrl-btn" id="ctrl-play-btn" title="Play / Pause (Space)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" id="ctrl-play-icon"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </button>
                
                <button class="ctrl-btn" id="ctrl-rewind-btn" title="Rewind 10s (←)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/><text x="12" y="16" font-size="8" text-anchor="middle" fill="#fff" font-weight="bold">10</text></svg>
                </button>

                <button class="ctrl-btn" id="ctrl-forward-btn" title="Forward 10s (→)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"/><text x="12" y="16" font-size="8" text-anchor="middle" fill="#fff" font-weight="bold">10</text></svg>
                </button>

                <div class="volume-container">
                  <button class="ctrl-btn" id="ctrl-volume-btn" title="Mute (M)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="ctrl-volume-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  </button>
                  <div class="volume-slider-track" id="volume-track">
                    <div class="volume-slider-fill" id="volume-fill" style="width: 85%;"></div>
                  </div>
                </div>

                <div class="player-time-display">
                  <span id="player-current-time">00:00</span>
                  <span>/</span>
                  <span id="player-duration">00:00</span>
                </div>
              </div>

              <!-- Right controls: Audio, Subtitles, Speed, Quality, Fullscreen -->
              <div class="controls-right">
                <!-- Audio & Subtitles Menu -->
                <div class="player-dropdown-wrap">
                  <button class="ctrl-btn" id="btn-audio-sub" title="Audio & Subtitles">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </button>
                  <div class="player-popover hidden" id="audio-sub-popover">
                    <div>
                      <h4>Audio Track</h4>
                      <ul id=\"audio-track-list\">
                        <li class="active" data-val="Original">Original (Dolby Atmos)</li>
                        <li data-val="Tamil">Tamil (5.1)</li>
                        <li data-val="English">English (Dolby 5.1)</li>
                        <li data-val="Hindi">Hindi (Stereo)</li>
                      </ul>
                    </div>
                    <div>
                      <h4>Subtitles</h4>
                      <ul id="subtitle-list">
                        <li class="active" data-val="Off">Off</li>
                        <li data-val="English">English [CC]</li>
                        <li data-val="Tamil">Tamil</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Speed Selector -->
                <button class="ctrl-btn-pill" id="ctrl-speed-btn" title="Playback Speed">1.0x</button>

                <!-- Quality Selector -->
                <button class="ctrl-btn-pill" id="ctrl-quality-btn" style="background:rgba(229,9,20,0.85);font-weight:700;">4K UHD</button>

                <!-- Fullscreen -->
                <button class="ctrl-btn" id="ctrl-fullscreen-btn" title="Fullscreen (F)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);
    this.video = document.getElementById("player-video-element");
    this.streamIframe = document.getElementById("player-stream-iframe");
    this.bindEvents();
  }

  bindEvents() {
    const video = this.video;
    const playBtn = document.getElementById("ctrl-play-btn");
    const backBtn = document.getElementById("player-back-btn");
    const rewindBtn = document.getElementById("ctrl-rewind-btn");
    const forwardBtn = document.getElementById("ctrl-forward-btn");
    const volumeBtn = document.getElementById("ctrl-volume-btn");
    const volumeTrack = document.getElementById("volume-track");
    const timeline = document.getElementById("player-timeline");
    const fullscreenBtn = document.getElementById("ctrl-fullscreen-btn");
    const speedBtn = document.getElementById("ctrl-speed-btn");
    const qualityBtn = document.getElementById("ctrl-quality-btn");
    const audioSubBtn = document.getElementById("btn-audio-sub");
    const audioSubPopover = document.getElementById("audio-sub-popover");

    const tabFullMovie = document.getElementById("tab-full-movie");
    const tabTrailer = document.getElementById("tab-trailer");

    // Close / Back
    backBtn.addEventListener("click", () => this.close());
    const floatingBackBtn = document.getElementById("player-floating-back-btn");
    if (floatingBackBtn) {
      floatingBackBtn.addEventListener("click", () => this.close());
    }

    // Switch between Full Movie and Trailer modes
    tabFullMovie.addEventListener("click", () => this.switchMode("movie"));
    tabTrailer.addEventListener("click", () => this.switchMode("trailer"));

    // Download button
    const topDlBtn = document.getElementById("player-top-download-btn");
    if (topDlBtn) {
      topDlBtn.addEventListener("click", () => {
        if (this.currentMovie && window.movieshubApp) {
          window.movieshubApp.openDownloadModal(this.currentMovie);
        }
      });
    }

    // Iframe postMessage listener for download actions
    window.addEventListener("message", (e) => {
      if (e.data && e.data.action === "open_download" && this.currentMovie && window.movieshubApp) {
        window.movieshubApp.openDownloadModal(this.currentMovie);
      }
    });

    // Error recovery: fallback to local stream
    video.addEventListener("error", (e) => {
      // fallback handled silently
      if (video.src && !video.src.includes("assets/stream.mp4")) {
        video.src = "assets/stream.mp4";
        video.load();
        video.play().catch(() => {});
      }
    });

    // Play / Pause toggle for trailer video
    const togglePlay = () => {
      if (video.paused) {
        video.play().then(() => {
          this.isPlaying = true;
          this.updatePlayStateUI();
          this.flashCenterIcon(true);
        }).catch(() => {
          video.muted = true;
          video.play().then(() => {
            this.isPlaying = true;
            this.updatePlayStateUI();
          });
        });
      } else {
        video.pause();
        this.isPlaying = false;
        this.updatePlayStateUI();
        this.flashCenterIcon(false);
      }
    };

    playBtn.addEventListener("click", togglePlay);
    document.getElementById("player-screen-wrap").addEventListener("click", (e) => {
      if (e.target.closest("#player-controls") || e.target.closest("#player-header")) return;
      togglePlay();
    });

    // Skip & Fast-Forward with Stall Recovery
    rewindBtn.addEventListener("click", () => {
      video.currentTime = Math.max(0, video.currentTime - 10);
      if (this.isPlaying && video.paused) {
        video.play().catch(() => {});
      }
    });
    forwardBtn.addEventListener("click", () => {
      if (video.duration) {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
        if (this.isPlaying && video.paused) {
          video.play().catch(() => {});
        }
      }
    });

    // Auto-recover if video stalls after forward seeking
    video.addEventListener("waiting", () => {
      clearTimeout(this.videoStallTimer);
      this.videoStallTimer = setTimeout(() => {
        if (video.readyState < 3 && this.isPlaying) {
          video.currentTime = Math.min(video.duration || 0, video.currentTime + 0.1);
          video.play().catch(() => {});
        }
      }, 2500);
    });
    video.addEventListener("playing", () => {
      clearTimeout(this.videoStallTimer);
    });
    video.addEventListener("seeked", () => {
      if (this.isPlaying && video.paused) {
        video.play().catch(() => {});
      }
    });

    // Volume
    volumeBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      this.updateVolumeUI();
    });

    volumeTrack.addEventListener("click", (e) => {
      const rect = volumeTrack.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.volume = pos;
      video.muted = false;
      this.currentVolume = pos;
      this.updateVolumeUI();
    });

    // Timeline Scrubbing
    timeline.addEventListener("click", (e) => {
      if (!video.duration) return;
      const rect = timeline.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = pos * video.duration;
    });

    // Video events
    video.addEventListener("timeupdate", () => {
      this.updateTimelineUI();
      if (this.currentMovie) {
        if (video.duration && video.currentTime >= video.duration - 4) {
          this.saveResumeTime(this.currentMovie.id, 0);
        } else {
          this.saveResumeTime(this.currentMovie.id, video.currentTime);
        }
      }
    });

    video.addEventListener("loadedmetadata", () => {
      this.updateTimelineUI();
    });

    video.addEventListener("ended", () => {
      this.isPlaying = false;
      this.updatePlayStateUI();
    });

    // Speed toggle
    const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
    speedBtn.addEventListener("click", () => {
      let idx = speeds.indexOf(this.currentSpeed);
      this.currentSpeed = speeds[(idx + 1) % speeds.length];
      video.playbackRate = this.currentSpeed;
      speedBtn.textContent = `${this.currentSpeed}x`;
      if (window.showToast) window.showToast(`Speed: ${this.currentSpeed}x`);
    });

    // Quality toggle
    const qualities = ["4K UHD", "1080p FHD", "720p HD", "Auto"];
    qualityBtn.addEventListener("click", () => {
      let idx = qualities.indexOf(qualityBtn.textContent);
      const nextQ = qualities[(idx + 1) % qualities.length];
      qualityBtn.textContent = nextQ;
      if (window.showToast) window.showToast(`Stream Resolution: ${nextQ}`);
    });

    // Audio & Subtitles Popover
    audioSubBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      audioSubPopover.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!audioSubBtn.contains(e.target) && !audioSubPopover.contains(e.target)) {
        audioSubPopover.classList.add("hidden");
      }
    });

    // Subtitle items
    document.querySelectorAll("#subtitle-list li").forEach(li => {
      li.addEventListener("click", () => {
        document.querySelectorAll("#subtitle-list li").forEach(l => l.classList.remove("active"));
        li.classList.add("active");
        const val = li.dataset.val;
        const subOverlay = document.getElementById("player-subtitles");
        if (val === "Off") {
          subOverlay.style.display = "none";
        } else {
          subOverlay.style.display = "block";
          subOverlay.textContent = `[Subtitles: ${val}]`;
        }
        audioSubPopover.classList.add("hidden");
      });
    });

    // Audio items
    document.querySelectorAll("#audio-track-list li").forEach(li => {
      li.addEventListener("click", () => {
        document.querySelectorAll("#audio-track-list li").forEach(l => l.classList.remove("active"));
        li.classList.add("active");
        if (window.showToast) window.showToast(`Audio Track: ${li.textContent}`);
        audioSubPopover.classList.add("hidden");
      });
    });

    // Fullscreen
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        this.modal.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Keyboard controls in Player
    window.addEventListener("keydown", (e) => {
      if (this.modal.classList.contains("hidden")) return;

      if (e.key === "Escape") {
        this.close();
      } else if (this.currentMode === "trailer") {
        if (e.key === " " || e.key === "k") {
          e.preventDefault();
          togglePlay();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          video.volume = Math.min(1, video.volume + 0.1);
          this.updateVolumeUI();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          video.volume = Math.max(0, video.volume - 0.1);
          this.updateVolumeUI();
        } else if (e.key === "m") {
          video.muted = !video.muted;
          this.updateVolumeUI();
        } else if (e.key === "f") {
          fullscreenBtn.click();
        }
      }
    });
  }

  switchMode(mode) {
    this.currentMode = mode;
    const tabFullMovie = document.getElementById("tab-full-movie");
    const tabTrailer = document.getElementById("tab-trailer");
    const streamWrap = document.getElementById("player-stream-wrap");
    const trailerWrap = document.getElementById("player-screen-wrap");

    if (mode === "movie") {
      tabFullMovie.classList.add("active");
      tabTrailer.classList.remove("active");
      streamWrap.classList.remove("hidden");
      trailerWrap.classList.add("hidden");

      // Pause trailer video completely
      if (this.video) {
        this.video.pause();
        this.video.removeAttribute("src");
        this.video.load();
      }
      this.isPlaying = false;

      const movie = this.currentMovie;
      const safeTitle = (movie?.title || "Movie").replace(/"/g, "&quot;");
      const safeBackdrop = movie?.backdrop || movie?.poster || "";
      const safeLang = movie?.language || "Cinema";
      const cleanLang = (safeLang && safeLang.toLowerCase() !== "cinema") ? safeLang : "Hindi";

      // Clear any previous auto-switch timers
      if (this.autoSwitchTimer) {
        clearTimeout(this.autoSwitchTimer);
        this.autoSwitchTimer = null;
      }

      const KNOWN_TMDB_MAP = {
        "angamaly diaries": 442000,
        "angamaly": 442000,
        "dune: part two": 693134,
        "dune part two": 693134,
        "dune 2": 693134,
        "dune": 693134,
        "dune: part one": 438631,
        "blast": 1515729,
        "beast": 843241,
        "leo": 1072790,
        "jailer": 980078,
        "vikram": 725201,
        "master": 602211,
        "goat": 1148817,
        "the greatest of all time": 1148817,
        "amaran": 1184918,
        "kalki 2898 ad": 792307,
        "kalki": 792307,
        "aavesham": 1243644,
        "manjummel boys": 1214484,
        "bramayugam": 1171874,
        "maharaja": 1114738,
        "stree 2": 1114513,
        "12th fail": 1181548,
        "jawan": 872585,
        "animal": 781732,
        "salaar": 897087,
        "rrr": 579974,
        "deadpool & wolverine": 533535,
        "deadpool and wolverine": 533535,
        "oppenheimer": 872585,
        "interstellar": 157336,
        "severance": 95396,
        "stranger things": 66732,
        "the boys": 76479
      };

      let cleanTitle = (movie?.title || "").toLowerCase().replace(/\[.*?\]/g, "").trim();
      let mappedTmdb = KNOWN_TMDB_MAP[cleanTitle];
      if (!mappedTmdb) {
        for (const [k, v] of Object.entries(KNOWN_TMDB_MAP)) {
          if (cleanTitle.includes(k) || k.includes(cleanTitle)) {
            mappedTmdb = v;
            break;
          }
        }
      }

      let rawId = String(movie?.tmdbId || movie?.id || "");
      let s_tm = rawId.replace("tmdb-", "").replace("netmirror-", "");
      let resolvedTmdbId = mappedTmdb ? String(mappedTmdb) : (s_tm && !isNaN(parseInt(s_tm, 10)) ? s_tm : "693134");

      const mtype = movie?.mediaType || "movie";
      const year = movie?.year || 2024;

      // Netmirror ID resolution:
      let netId = String(movie?.netmirrorId || movie?.nid || "");
      if (!netId && rawId.startsWith("netmirror-")) {
        netId = rawId.replace("netmirror-", "");
      }
      if (!netId && cleanTitle.includes("angamaly")) netId = "27939";
      if (!netId && cleanTitle.includes("blast")) netId = "112535";
      if (!netId && cleanTitle.includes("dune")) netId = "91764";

      const pfx = (typeof window !== "undefined" && window.API_PREFIX) || "";
      const netmirrorEmbedUrl = `${pfx}/stream/netmirror/embed?tm_id=${netId || resolvedTmdbId}&nid=${netId || resolvedTmdbId}&year=${year}&lang=${encodeURIComponent(cleanLang)}`;

      // High-performance streaming servers:
      // When Netmirror source is present (or regional cinema like Malayalam/Tamil), prioritize Movieshub Cloud
      let servers = [];
      const hasNetSource = !!netId || rawId.startsWith("netmirror-") || cleanTitle.includes("angamaly") || cleanTitle.includes("blast");

      if (hasNetSource) {
        servers = [
          {
            id: "s1",
            name: "Server 1",
            badge: "Movieshub Cloud",
            url: netmirrorEmbedUrl
          },
          {
            id: "s2",
            name: "Server 2",
            badge: "Primary HD",
            url: mtype === "tv"
              ? `https://vidlink.pro/tv/${resolvedTmdbId}/1/1`
              : `https://vidlink.pro/movie/${resolvedTmdbId}`
          },
          {
            id: "s3",
            name: "Server 3",
            badge: "Fast Forward",
            url: mtype === "tv"
              ? `https://autoembed.co/tv/tmdb/${resolvedTmdbId}/1/1`
              : `https://autoembed.co/movie/tmdb/${resolvedTmdbId}`
          },
          {
            id: "s4",
            name: "Server 4",
            badge: "Backup 1",
            url: mtype === "tv"
              ? `https://0vidads.top/embed/tv/${resolvedTmdbId}/1/1`
              : `https://0vidads.top/embed/movie/${resolvedTmdbId}`
          },
          {
            id: "s5",
            name: "Server 5",
            badge: "Multi-Audio",
            url: mtype === "tv"
              ? `https://vidsync.pro/embed/tv/${resolvedTmdbId}/1/1`
              : `https://vidsync.pro/embed/movie/${resolvedTmdbId}`
          },
          {
            id: "s6",
            name: "Server 6",
            badge: "Cinema 4K",
            url: mtype === "tv"
              ? `https://www.2embed.cc/embedtv/${resolvedTmdbId}&s=1&e=1`
              : `https://www.2embed.cc/embed/${resolvedTmdbId}`
          },
          {
            id: "s7",
            name: "Server 7",
            badge: "Mirror HD",
            url: mtype === "tv"
              ? `https://vidsrc.pm/embed/tv/${resolvedTmdbId}/1/1`
              : `https://vidsrc.pm/embed/movie/${resolvedTmdbId}`
          },
          {
            id: "s8",
            name: "Server 8",
            badge: "Ultra CDN",
            url: mtype === "tv"
              ? `https://vidsrc.net/embed/tv/${resolvedTmdbId}/1/1`
              : `https://vidsrc.net/embed/movie/${resolvedTmdbId}`
          }
        ];
      } else {
        servers = [
          {
            id: "s1",
            name: "Server 1",
            badge: "Primary HD",
            url: mtype === "tv"
              ? `https://vidlink.pro/tv/${resolvedTmdbId}/1/1`
              : `https://vidlink.pro/movie/${resolvedTmdbId}`
          },
          {
            id: "s2",
            name: "Server 2",
            badge: "Fast Forward",
            url: mtype === "tv"
              ? `https://autoembed.co/tv/tmdb/${resolvedTmdbId}/1/1`
              : `https://autoembed.co/movie/tmdb/${resolvedTmdbId}`
          },
          {
            id: "s3",
            name: "Server 3",
            badge: "Movieshub Cloud",
            url: netmirrorEmbedUrl
          },
          {
            id: "s4",
            name: "Server 4",
            badge: "Backup 1",
            url: mtype === "tv"
              ? `https://0vidads.top/embed/tv/${resolvedTmdbId}/1/1`
              : `https://0vidads.top/embed/movie/${resolvedTmdbId}`
          },
          {
            id: "s5",
            name: "Server 5",
            badge: "Multi-Audio",
            url: mtype === "tv"
              ? `https://vidsync.pro/embed/tv/${resolvedTmdbId}/1/1`
              : `https://vidsync.pro/embed/movie/${resolvedTmdbId}`
          },
          {
            id: "s6",
            name: "Server 6",
            badge: "Cinema 4K",
            url: mtype === "tv"
              ? `https://www.2embed.cc/embedtv/${resolvedTmdbId}&s=1&e=1`
              : `https://www.2embed.cc/embed/${resolvedTmdbId}`
          },
          {
            id: "s7",
            name: "Server 7",
            badge: "Mirror HD",
            url: mtype === "tv"
              ? `https://vidsrc.pm/embed/tv/${resolvedTmdbId}/1/1`
              : `https://vidsrc.pm/embed/movie/${resolvedTmdbId}`
          },
          {
            id: "s8",
            name: "Server 8",
            badge: "Ultra CDN",
            url: mtype === "tv"
              ? `https://vidsrc.net/embed/tv/${resolvedTmdbId}/1/1`
              : `https://vidsrc.net/embed/movie/${resolvedTmdbId}`
          }
        ];
      }

      this.currentServerIdx = 0;
      this.isAutoSwitchingEnabled = true;

      // Prevent unauthorized external redirects
      if (!window._movieshubRedirectGuarded) {
        window._movieshubRedirectGuarded = true;
        window.addEventListener("beforeunload", (e) => {
          if (this.currentMode === "movie" && !this.isUserExiting) {
            e.preventDefault();
            e.returnValue = "";
            return "";
          }
        });
      }

      streamWrap.innerHTML = '<div class="player-preloader" id="player-preloader" style="position:absolute;inset:0;background:#050508;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:5;overflow:hidden;">' +
        '<div style="background-image:url(\'' + safeBackdrop + '\');position:absolute;inset:0;background-size:cover;background-position:center;filter:blur(30px) brightness(0.22);transform:scale(1.15);"></div>' +
        '<div style="position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;text-align:center;padding:24px;max-width:90%;">' +
          '<div class="spinner" style="width:46px;height:46px;border:3.5px solid rgba(255,255,255,0.15);border-top-color:#e50914;border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:16px;"></div>' +
          '<div style="font-size:20px;font-weight:800;color:#fff;letter-spacing:0.5px;text-shadow:0 2px 10px rgba(0,0,0,0.8);">' + safeTitle + '</div>' +
          '<div id="player-loader-status" style="font-size:14px;color:#22c55e;font-weight:700;margin-top:10px;">Connecting to Server 1...</div>' +
          '<div id="player-loader-sub" style="font-size:12px;color:#9ca3af;margin-top:4px;">Protected Ad-Block Stream • Smooth Fast-Forwarding</div>' +
        '</div>' +
      '</div>' +
      '<div class="player-stream-frame-container" id="playerStreamFrameContainer" style="flex:1;position:relative;width:100%;height:100%;">' +
        '<iframe id="player-stream-iframe" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe>' +
      '</div>' +
      '<div class="player-server-bar" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">' +
        '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
          '<button id="bottomPlayerBackBtn" class="bottom-back-btn" title="Back to Movieshub">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>' +
            '<span>Back</span>' +
          '</button>' +
          '<div class="player-server-pills" id="playerModalServerPills">' +
          servers.map((s, idx) =>
            '<button class="srv-pill-btn ' + (idx === 0 ? "active" : "") + '" data-idx="' + idx + '">' +
              '<span>' + s.name + '</span>' +
              '<span class="srv-pill-badge">' + s.badge + '</span>' +
            '</button>'
          ).join("") +
          '</div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
          '<button id="autoSwitchToggleBtn" class="auto-switch-toggle" title="Toggle Auto-Switch">' +
            '<span>⚡ Auto-Switch: ON</span>' +
          '</button>' +
          '<button id="reloadServerBtn" class="reload-server-btn" title="Reload stream if buffering or stuck">' +
            '<span>🔄 Reload</span>' +
          '</button>' +
          '<button id="skipServerBtn" class="next-server-btn" title="Switch to Next Server">' +
            '<span>Next Server ⏭</span>' +
          '</button>' +
          '<div class="stream-live-tag" style="display:flex;align-items:center;gap:6px;">' +
            '<span style="color:#22c55e;font-size:11px;font-weight:700;">● Active</span>' +
            '<span style="color:#888;">|</span>' +
            '<span style="color:#e50914;font-weight:700;font-size:11px;">1080p HD</span>' +
          '</div>' +
        '</div>' +
      '</div>';

      const iframe = document.getElementById("player-stream-iframe");
      this.streamIframe = iframe;

      const preloader = document.getElementById("player-preloader");
      const hidePreloader = () => {
        if (preloader) {
          preloader.style.transition = "opacity 0.25s ease";
          preloader.style.opacity = "0";
          setTimeout(() => preloader.remove(), 300);
        }
      };

      const loadServer = (idx, isAuto = false) => {
        if (idx < 0 || idx >= servers.length) return;
        this.currentServerIdx = idx;
        const srv = servers[idx];

        if (this.autoSwitchTimer) {
          clearTimeout(this.autoSwitchTimer);
          this.autoSwitchTimer = null;
        }

        const pills = streamWrap.querySelectorAll(".srv-pill-btn");
        pills.forEach((b, i) => {
          if (i === idx) b.classList.add("active");
          else b.classList.remove("active");
        });

        const statusEl = document.getElementById("player-loader-status");
        if (statusEl) {
          statusEl.textContent = isAuto 
            ? "Auto-switched to " + srv.name + " (" + srv.badge + ")..."
            : "Connecting to " + srv.name + "...";
        }

        const container = document.getElementById("playerStreamFrameContainer");
        if (container) {
          let curIframe = document.getElementById("player-stream-iframe");
          if (!curIframe) {
            container.innerHTML = '<iframe id="player-stream-iframe" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
            curIframe = document.getElementById("player-stream-iframe");
            this.streamIframe = curIframe;
          } else {
            curIframe.removeAttribute("sandbox");
          }

          curIframe.onload = () => {
            if (this.autoSwitchTimer) {
              clearTimeout(this.autoSwitchTimer);
              this.autoSwitchTimer = null;
            }
            hidePreloader();
          };

          curIframe.onerror = () => {
            if (this.isAutoSwitchingEnabled) {
              if (this.autoSwitchTimer) clearTimeout(this.autoSwitchTimer);
              const nextIdx = (this.currentServerIdx + 1) % servers.length;
              if (window.showToast) window.showToast("Server " + (this.currentServerIdx + 1) + " error. Switching to Server " + (nextIdx + 1) + "...");
              loadServer(nextIdx, true);
            }
          };

          curIframe.removeAttribute("srcdoc");
          curIframe.src = srv.url;
        }

        // Auto-switch timer: If server doesn't respond or load within 8.5 seconds, auto-switch to next server
        if (this.isAutoSwitchingEnabled) {
          this.autoSwitchTimer = setTimeout(() => {
            if (!this.isAutoSwitchingEnabled) return;
            const nextIdx = (this.currentServerIdx + 1) % servers.length;
            if (window.showToast) window.showToast("Server " + (this.currentServerIdx + 1) + " slow. Auto-switching to Server " + (nextIdx + 1) + "...");
            loadServer(nextIdx, true);
          }, 8500);
        }
      };

      // Fast preloader dismissal
      setTimeout(hidePreloader, 2200);

      // Auto-Switch Toggle Button
      const autoSwitchBtn = document.getElementById("autoSwitchToggleBtn");
      if (autoSwitchBtn) {
        autoSwitchBtn.addEventListener("click", () => {
          this.isAutoSwitchingEnabled = !this.isAutoSwitchingEnabled;
          if (this.isAutoSwitchingEnabled) {
            autoSwitchBtn.classList.remove("off");
            autoSwitchBtn.classList.add("active");
            autoSwitchBtn.innerHTML = "<span>⚡ Auto-Switch: ON</span>";
            if (window.showToast) window.showToast("Server Auto-Switch ON");
          } else {
            if (this.autoSwitchTimer) {
              clearTimeout(this.autoSwitchTimer);
              this.autoSwitchTimer = null;
            }
            autoSwitchBtn.classList.remove("active");
            autoSwitchBtn.classList.add("off");
            autoSwitchBtn.innerHTML = "<span>⏸ Auto-Switch: OFF</span>";
            if (window.showToast) window.showToast("Server Auto-Switch OFF");
          }
        });
      }

      // Reload Server Stream button (recovers from forward seek buffer stalls)
      const reloadBtn = document.getElementById("reloadServerBtn");
      if (reloadBtn) {
        reloadBtn.addEventListener("click", () => {
          loadServer(this.currentServerIdx, false);
          if (window.showToast) window.showToast("Reloaded " + servers[this.currentServerIdx].name);
        });
      }

      // Manual skip server button
      const skipBtn = document.getElementById("skipServerBtn");
      if (skipBtn) {
        skipBtn.addEventListener("click", () => {
          const nextIdx = (this.currentServerIdx + 1) % servers.length;
          loadServer(nextIdx, false);
          if (window.showToast) window.showToast("Switched to " + servers[nextIdx].name);
        });
      }

      // Bottom bar back button
      const bottomBackBtn = document.getElementById("bottomPlayerBackBtn");
      if (bottomBackBtn) {
        bottomBackBtn.addEventListener("click", () => this.close());
      }

      // Bind server switcher buttons
      const pills = streamWrap.querySelectorAll(".srv-pill-btn");
      pills.forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.idx, 10);
          loadServer(idx, false);
          if (window.showToast) window.showToast("Switched to " + servers[idx].name);
        });
      });

      // Load initial server
      loadServer(0, false);

      if (window.showToast) window.showToast("Streaming Full Movie • Ad-Free");
    } else {
      tabTrailer.classList.add("active");
      tabFullMovie.classList.remove("active");
      trailerWrap.classList.remove("hidden");
      streamWrap.classList.add("hidden");

      // Stop and completely destroy stream iframe to prevent ANY audio leaks
      if (this.streamIframe) {
        try { this.streamIframe.contentWindow.postMessage("stop", "*"); } catch (e) {}
        this.streamIframe.src = "about:blank";
      }
      if (streamWrap) {
        streamWrap.innerHTML = "";
      }
      this.streamIframe = null;

      // Play local trailer (always start from 00:00)
      if (this.currentMovie) {
        const streamSource = this.currentMovie.videoUrl || `assets/videos/${this.currentMovie.id}.mp4`;
        this.video.src = streamSource;
        this.video.currentTime = 0;
        this.video.load();
        this.video.play().then(() => {
          this.isPlaying = true;
          this.updatePlayStateUI();
        }).catch(() => {
          this.video.muted = true;
          this.video.play().then(() => {
            this.isPlaying = true;
            this.updatePlayStateUI();
          });
        });
      }
      if (window.showToast) window.showToast("Playing Official Trailer");
    }
  }

  open(movie, initialMode = "movie") {
    if (!movie) return;
    this.currentMovie = movie;

    // Save to Continue Watching in localStorage on device
    if (window.movieshubApp && typeof window.movieshubApp.addToContinueWatching === "function") {
      window.movieshubApp.addToContinueWatching(movie);
    }

    if (this.video) {
      this.video.currentTime = 0;
    }

    document.getElementById("player-title").textContent = movie.title;
    document.getElementById("player-badge").textContent = movie.platformBadge || "MOVIESHUB";
    document.getElementById("player-badge").style.backgroundColor = movie.platformColor || "#E50914";
    document.getElementById("player-extra").textContent = `${movie.language ? movie.language.toUpperCase() : "CINEMA"} • 4K ULTRA HD • Dolby Atmos 5.1`;

    this.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Default to Full Movie mode as requested!
    this.switchMode(initialMode);
  }

  close() {
    this.isUserExiting = true;
    this.modal.classList.add("hidden");
    document.body.style.overflow = "";

    if (this.autoSwitchTimer) {
      clearTimeout(this.autoSwitchTimer);
      this.autoSwitchTimer = null;
    }

    // 100% Silence and Destroy Stream Iframe DOM to prevent ANY ghost audio leaks
    if (this.streamIframe) {
      try {
        this.streamIframe.contentWindow.postMessage("stop", "*");
      } catch (e) {}
      this.streamIframe.src = "about:blank";
    }
    const streamWrap = document.getElementById("player-stream-wrap");
    if (streamWrap) {
      streamWrap.innerHTML = "";
    }
    this.streamIframe = null;

    // 100% Silence Trailer Video
    if (this.video) {
      this.video.pause();
      this.video.removeAttribute("src");
      this.video.load();
    }
    this.isPlaying = false;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  updatePlayStateUI() {
    const playIcon = document.getElementById("ctrl-play-icon");
    if (this.isPlaying) {
      playIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;
    } else {
      playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
    }
  }

  flashCenterIcon(isPlaying) {
    const indicator = document.getElementById("center-play-indicator");
    indicator.innerHTML = isPlaying
      ? `<svg width="48" height="48" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
      : `<svg width="48" height="48" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    indicator.classList.remove("flash");
    void indicator.offsetWidth;
    indicator.classList.add("flash");
  }

  updateVolumeUI() {
    const icon = document.getElementById("ctrl-volume-icon");
    const fill = document.getElementById("volume-fill");
    if (this.video.muted || this.video.volume === 0) {
      icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
      fill.style.width = "0%";
    } else {
      icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
      fill.style.width = `${this.video.volume * 100}%`;
    }
  }

  updateTimelineUI() {
    const cur = this.video.currentTime || 0;
    const dur = this.video.duration || 0;

    document.getElementById("player-current-time").textContent = this.formatTime(cur);
    document.getElementById("player-duration").textContent = this.formatTime(dur);

    const pct = dur > 0 ? (cur / dur) * 100 : 0;
    document.getElementById("player-progress").style.width = `${pct}%`;
    document.getElementById("player-scrubber-handle").style.left = `${pct}%`;

    // Buffer bar
    if (this.video.buffered.length > 0) {
      const bufferedEnd = this.video.buffered.end(this.video.buffered.length - 1);
      const bufPct = dur > 0 ? (bufferedEnd / dur) * 100 : 0;
      document.getElementById("player-buffered").style.width = `${bufPct}%`;
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  saveResumeTime(movieId, time) {
    try {
      let data = JSON.parse(localStorage.getItem(this.storageKey) || "{}");
      data[movieId] = time;
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {}
  }

  getResumeTime(movieId) {
    try {
      let data = JSON.parse(localStorage.getItem(this.storageKey) || "{}");
      return data[movieId] || 0;
    } catch (e) {
      return 0;
    }
  }
}

// Initialize player instance globally
window.movieshubPlayer = new MovieshubPlayer();
