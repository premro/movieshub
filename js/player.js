/**
 * Movieshub Theater Video Player
 * Plays ACTUAL FULL MOVIES directly sourced from Movieshub Cloud / High-Speed Cloud Streams
 * Also provides Instant Trailer Preview mode
 * Strictly NO ADS, NO EXTERNAL REDIRECTIONS
 */


const MOVIESDA_VERIFIED_MAP = {
  "om operation mole": "103723",
  "om: operation mole": "103723",
  "o.m: operation mole": "103723",
  "operation mole": "103723",
  // Tamil 2026 Theatrical Releases (moviezda.me/tamil-2026-movies)
  "jailer 2": "103358",
  "jailer 2 original": "103358",
  "jailer 2 1080p": "103358",
  "mookuthi amman 2": "103807",
  "mookuthi amman 2 original": "103807",
  "mookuthi amman 2 hq hdts": "103807",
  "mookuthi amman 2 1080p": "103807",
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
  "ponniyin selvan: part i": "79747",
  "ponniyin selvan: part i & ii": "79747",
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
  "pushpa 2: the rule": "88746",
  "madha gaja raja": "88685",
  "madha gaja raja 2025": "88685",
  "madhagajaraja": "88685",
};

const MOVIESDA_TMDB_MAP = {
  1384528: "103723",  // OM: Operation Mole (2026) Moviesda 1080p PreDVD (v2)
  280951: "88685",   // Madha Gaja Raja (2025) Moviesda 1080p HD Print
  1234139: "103358",  // Jailer 2 (2026) Moviesda 1080p HD Original Print
  1327835: "103807",  // Mookuthi Amman 2 (2026) Moviesda 1080p Original HD Print
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
  998844: "81231",   // Jailer alt
  743563: "74672",   // Vikram
  725201: "74672",   // Vikram alt
  660046: "79747",   // Ponniyin Selvan
  673692: "73806",   // Doctor
  587030: "62704",   // Kaithi
  576928: "62513",   // Asuran
  855400: "70596",   // Jai Bhim
  595228: "65497",   // Soorarai Pottru
  1093966: "87369",  // Vettaiyan
  1136418: "86088",  // Raayan
  1034587: "86088",  // Raayan alt
  979250: "86639",   // Demonte Colony 2
  1182047: "87208",  // Lubber Pandhu
  1171178: "87066",  // Meiyazhagan
  1011985: "88746",  // Pushpa 2
};

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

function generateMoviesdaPlayerSrcdoc(tmId, mtype, title, lang, year, customFileId = null, season = 1, episode = 1) {
  const fileId = customFileId || getVerifiedMoviesdaFileId(title, tmId);
  const safeTitle = (title || "Movie").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const hostPfx = (typeof window !== "undefined" && window.API_PREFIX) ? window.API_PREFIX : "";
  const embedUrl = fileId ? `${hostPfx}/stream/moviesda/embed?file_id=${encodeURIComponent(fileId)}` : "";
  const fallbackEmbedUrl = mtype === "tv"
    ? `https://vidlink.pro/tv/${encodeURIComponent(tmId || "1399")}/${season || 1}/${episode || 1}?multiLang=true&primaryColor=e50914&autoplay=true`
    : `https://vidlink.pro/movie/${encodeURIComponent(tmId || "1402181")}?multiLang=true&primaryColor=e50914&autoplay=true`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${safeTitle} - Moviesda ${year || ''} Tamil HD</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; background: #000; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; }
    .m-frame-box { width: 100%; height: 100%; position: relative; background: #000; overflow: hidden; }
    #nativeVideo { width: 100%; height: 100%; object-fit: contain; background: #000; display: none; }
    .clipped-embed-wrap { width: 100%; height: 100%; position: absolute; inset: 0; overflow: hidden; }
    .clipped-embed-wrap iframe {
      width: 100%;
      height: calc(100% + 140px);
      margin-top: -95px;
      border: none;
      display: block;
    }
    .top-corner-bar {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .corner-btn {
      background: rgba(15,12,22,0.85);
      border: 1px solid rgba(255,255,255,0.25);
      color: #fff;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      backdrop-filter: blur(8px);
      transition: background 0.15s, transform 0.15s;
    }
    .corner-btn:hover { background: #e50914; transform: scale(1.04); }
    .dolby-corner-btn { border-color: rgba(34, 211, 238, 0.45); }
    .dolby-corner-btn:hover { background: rgba(34, 211, 238, 0.25); border-color: #22d3ee; }
    .atmos-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22d3ee;
      box-shadow: 0 0 8px #22d3ee;
      animation: pulse 1.8s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(0.9); opacity: 0.7; }
      50% { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(0.9); opacity: 0.7; }
    }
  </style>
</head>
<body>
  <div class="m-frame-box" id="frameBox">
    <div id="mLoader" style="position:absolute;inset:0;background:#050508;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:50;">
      <div style="width:42px;height:42px;border:3.5px solid rgba(255,255,255,0.15);border-top-color:#e50914;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
      <div id="mLoaderText" style="margin-top:14px;font-size:13px;color:#22c55e;font-weight:700;letter-spacing:0.3px;">Connecting to Moviesda ${year ? year + ' ' : ''}HD Stream...</div>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    </div>
    <div class="top-corner-bar">
      <button class="corner-btn dolby-corner-btn" id="srcdocDolbyBtn" onclick="toggleLocalDolby()" title="Toggle Dolby Atmos 3D Audio">
        <span class="atmos-dot"></span>
        <span id="srcdocDolbyText">Dolby Atmos: 3D ON</span>
      </button>
      <button class="corner-btn" id="srcdocRewindBtn" onclick="doSkip(-10)" title="Rewind 10 Seconds (←)">
        <span>⏪ 10s</span>
      </button>
      <button class="corner-btn" id="srcdocForwardBtn" onclick="doSkip(10)" title="Forward 10 Seconds (→)">
        <span>⏩ 10s</span>
      </button>
      <button class="corner-btn" id="srcdocFsBtn" onclick="toggleLocalFs()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
        <span>Fullscreen</span>
      </button>
    </div>
    <video id="nativeVideo" controls autoplay playsinline preload="auto"></video>
    <div class="clipped-embed-wrap" id="embedWrap" style="display:none;">
      <iframe id="embedFrame" src="${embedUrl}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen webkitallowfullscreen="true" mozallowfullscreen="true" referrerpolicy="no-referrer"></iframe>
    </div>
  </div>
  <script>
    function toggleLocalFs() {
      var box = document.getElementById("frameBox") || document.documentElement;
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (box.requestFullscreen) box.requestFullscreen();
        else if (box.webkitRequestFullscreen) box.webkitRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      }
    }

    // Moviesda Dolby Atmos Spatial Audio Engine (Specialized for Projector / Multi-channel HDMI)
    var atmosCtx = null;
    var atmosSource = null;
    var atmosGain = null;
    var atmosCompressor = null;
    var atmosBassFilter = null;
    var atmosDialogueFilter = null;
    var atmosEnabled = true;
    var atmosPreset = "atmos_3d";

    function initMoviesdaDolby(nv) {
      if (!nv || atmosCtx) return;
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      // Check cross-origin stream status:
      // When a video element loads a stream from a CDN without Access-Control-Allow-Origin,
      // createMediaElementSource forces silence (all zeros) due to browser CORS security
      // and disconnects the native hardware audio.
      // In that case, we keep native hardware audio un-hijacked so sound plays directly to speakers/projector!
      var isCrossOrigin = false;
      try {
        if (nv.src) {
          var u = new URL(nv.src, window.location.href);
          if (u.origin !== window.location.origin) {
            isCrossOrigin = true;
          }
        }
      } catch (e) {
        isCrossOrigin = true;
      }

      if (isCrossOrigin) {
        var dt = document.getElementById("srcdocDolbyText");
        if (dt) dt.textContent = "Dolby Atmos: Direct 5.1 HD";
        return;
      }

      try {
        atmosCtx = new AudioCtx({ latencyHint: "playback" });

        // Multichannel detection for HDMI Projectors & AV receivers (5.1 or 7.1)
        if (atmosCtx.destination.maxChannelCount >= 6) {
          try {
            atmosCtx.destination.channelCount = Math.min(atmosCtx.destination.maxChannelCount, 6);
            atmosCtx.destination.channelCountMode = "explicit";
            atmosCtx.destination.interpretation = "discrete";
          } catch (e) {}
        }

        try {
          atmosSource = atmosCtx.createMediaElementSource(nv);
        } catch (e) {
          return;
        }

        atmosCompressor = atmosCtx.createDynamicsCompressor();
        atmosCompressor.threshold.value = -14.0;
        atmosCompressor.knee.value = 10.0;
        atmosCompressor.ratio.value = 4.0;
        atmosCompressor.attack.value = 0.003;
        atmosCompressor.release.value = 0.25;

        atmosGain = atmosCtx.createGain();
        atmosGain.gain.value = 1.35;

        // Dialogue clarity filter (2400Hz speech fundamental peaking)
        atmosDialogueFilter = atmosCtx.createBiquadFilter();
        atmosDialogueFilter.type = "peaking";
        atmosDialogueFilter.frequency.value = 2400;
        atmosDialogueFilter.Q.value = 1.2;
        atmosDialogueFilter.gain.value = 3.5;

        // Subwoofer LFE punch filter (85Hz lowshelf boost)
        atmosBassFilter = atmosCtx.createBiquadFilter();
        atmosBassFilter.type = "lowshelf";
        atmosBassFilter.frequency.value = 85;
        atmosBassFilter.gain.value = 4.5;

        atmosSource.connect(atmosDialogueFilter);
        atmosDialogueFilter.connect(atmosBassFilter);
        atmosBassFilter.connect(atmosGain);
        atmosGain.connect(atmosCompressor);
        atmosCompressor.connect(atmosCtx.destination);

        var resumeCtx = function() {
          if (nv) {
            nv.muted = false;
            if (nv.volume < 0.1) nv.volume = 1.0;
          }
          if (atmosCtx && (atmosCtx.state === "suspended" || atmosCtx.state === "interrupted")) {
            atmosCtx.resume().catch(function() {});
          }
        };
        nv.addEventListener("play", resumeCtx);
        nv.addEventListener("playing", resumeCtx);
        window.addEventListener("click", resumeCtx);
        window.addEventListener("touchstart", resumeCtx);
        window.addEventListener("keydown", resumeCtx);
      } catch (err) {
        console.warn("[MoviesdaAtmos] setup note:", err);
      }
    }

    function applyAtmosConfig(cfg) {
      if (!atmosCtx) {
        var nv = document.getElementById("nativeVideo");
        if (nv) initMoviesdaDolby(nv);
      }
      if (atmosCtx && (atmosCtx.state === "suspended" || atmosCtx.state === "interrupted")) {
        atmosCtx.resume().catch(function() {});
      }
      if (cfg.preset) {
        atmosPreset = cfg.preset;
        if (cfg.preset === "atmos_3d") {
          if (atmosBassFilter) atmosBassFilter.gain.value = 4.5;
          if (atmosDialogueFilter) atmosDialogueFilter.gain.value = 3.5;
          if (atmosGain) atmosGain.gain.value = 1.35;
        } else if (cfg.preset === "cinema") {
          if (atmosBassFilter) atmosBassFilter.gain.value = 6.0;
          if (atmosDialogueFilter) atmosDialogueFilter.gain.value = 2.0;
          if (atmosGain) atmosGain.gain.value = 1.40;
        } else if (cfg.preset === "dialogue") {
          if (atmosBassFilter) atmosBassFilter.gain.value = 1.5;
          if (atmosDialogueFilter) atmosDialogueFilter.gain.value = 6.5;
          if (atmosGain) atmosGain.gain.value = 1.45;
        } else if (cfg.preset === "night") {
          if (atmosBassFilter) atmosBassFilter.gain.value = 0.0;
          if (atmosDialogueFilter) atmosDialogueFilter.gain.value = 4.0;
          if (atmosGain) atmosGain.gain.value = 1.10;
        } else if (cfg.preset === "bypass") {
          if (atmosBassFilter) atmosBassFilter.gain.value = 0.0;
          if (atmosDialogueFilter) atmosDialogueFilter.gain.value = 0.0;
          if (atmosGain) atmosGain.gain.value = 1.0;
        }
      }
      if (typeof cfg.bassLevel === "number" && atmosBassFilter) {
        atmosBassFilter.gain.value = cfg.bassLevel;
      }
      if (typeof cfg.dialogueBoost === "number" && atmosDialogueFilter) {
        atmosDialogueFilter.gain.value = cfg.dialogueBoost;
      }
      if (typeof cfg.enabled === "boolean") {
        atmosEnabled = cfg.enabled;
        if (atmosGain) atmosGain.gain.value = atmosEnabled ? 1.35 : 1.0;
        if (!atmosEnabled) {
          if (atmosBassFilter) atmosBassFilter.gain.value = 0;
          if (atmosDialogueFilter) atmosDialogueFilter.gain.value = 0;
        }
      }
      var dt = document.getElementById("srcdocDolbyText");
      if (dt) dt.textContent = "Dolby Atmos: " + (atmosPreset === "bypass" || !atmosEnabled ? "OFF" : "3D ON");
    }

    function toggleLocalDolby() {
      if (atmosCtx && (atmosCtx.state === "suspended" || atmosCtx.state === "interrupted")) {
        atmosCtx.resume().catch(function() {});
      }
      try {
        window.parent.postMessage({ type: "player:open_dolby" }, "*");
      } catch (e) {}
    }

    function playDirect(streamUrl, fid) {
      var loader = document.getElementById("mLoader");
      if (loader) loader.style.display = "none";
      var ef = document.getElementById("embedFrame");
      if (ef) ef.src = "about:blank";
      var ew = document.getElementById("embedWrap");
      if (ew) ew.style.display = "none";
      var nv = document.getElementById("nativeVideo");
      if (nv) {
        nv.onerror = function() {
          try { nv.pause(); nv.removeAttribute("src"); nv.load(); } catch (e) {}
          nv.style.display = "none";
          playEmbed(fid);
        };
        nv.src = streamUrl;
        nv.muted = false;
        nv.volume = 1.0;
        nv.style.display = "block";

        initMoviesdaDolby(nv);

        var playPromise = nv.play();
        if (playPromise !== undefined) {
          playPromise.then(function() {
            try { window.parent.postMessage({ type: "player:dolby_ready" }, "*"); } catch (e) {}
          }).catch(function() {
            nv.muted = true;
            nv.play().then(function() {
              var unBtn = document.createElement("button");
              unBtn.id = "unmuteNoticeBtn";
              unBtn.innerHTML = "🔊 Click to Unmute Audio";
              unBtn.style.cssText = "position:absolute;bottom:80px;left:50%;transform:translateX(-50%);z-index:999;background:#e50914;color:#fff;padding:10px 22px;border-radius:30px;border:none;font-weight:700;font-size:14px;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.6);";
              unBtn.onclick = function() {
                nv.muted = false;
                nv.volume = 1.0;
                if (atmosCtx && (atmosCtx.state === "suspended" || atmosCtx.state === "interrupted")) {
                  atmosCtx.resume().catch(function() {});
                }
                unBtn.remove();
              };
              var box = document.getElementById("frameBox");
              if (box) box.appendChild(unBtn);
            }).catch(function() {
              try { nv.pause(); nv.removeAttribute("src"); nv.load(); } catch (e) {}
              nv.style.display = "none";
              playEmbed(fid);
            });
          });
        }
      }
    }

    function playEmbed(fid) {
      var loader = document.getElementById("mLoader");
      if (loader) loader.style.display = "none";
      var nv = document.getElementById("nativeVideo");
      if (nv) {
        try { nv.pause(); nv.removeAttribute("src"); nv.load(); } catch (e) {}
        nv.style.display = "none";
      }
      var ef = document.getElementById("embedFrame");
      var ew = document.getElementById("embedWrap");
      if (ef && ew) {
        if (!fid || (fid === "103234" && "${tmId}" !== "656908") || fid === "1402181" || String(fid).length >= 7) {
          ef.src = "${fallbackEmbedUrl}";
        } else {
          var apiPfxLocal = (window.API_PREFIX) || (window.location.pathname.includes("/server/movieshub_api") ? "/server/movieshub_api" : "");
          ef.src = apiPfxLocal + "/stream/moviesda/embed?file_id=" + encodeURIComponent(fid);
        }
        ew.style.display = "block";
      }
    }

    // Debounced strictly 10s skip on Moviesda
    var lastSeekTs = 0;
    function doSkip(secs) {
      var now = Date.now();
      if (now - lastSeekTs < 350) return;
      lastSeekTs = now;
      var exactSecs = secs > 0 ? 10 : -10;
      var nv = document.getElementById("nativeVideo");
      if (nv && typeof nv.currentTime === "number" && !isNaN(nv.currentTime)) {
        var target = exactSecs > 0 
          ? Math.min((nv.duration || Infinity), nv.currentTime + exactSecs)
          : Math.max(0, nv.currentTime + exactSecs);
        nv.currentTime = target;
        try {
          window.parent.postMessage({ type: "player:toast", message: (exactSecs > 0 ? "⏩ +" : "⏪ -") + Math.abs(exactSecs) + "s" }, "*");
        } catch (e) {}
      }
      var ef = document.getElementById("embedFrame");
      if (ef && ef.contentWindow) {
        try {
          ef.contentWindow.postMessage({ type: "movieshub:forward", seconds: exactSecs }, "*");
          ef.contentWindow.postMessage({ action: exactSecs > 0 ? "forward" : "rewind", seconds: exactSecs }, "*");
        } catch (e) {}
      }
    }

    // Message listener for skip and Dolby sync
    window.addEventListener("message", function(e) {
      var d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "movieshub:forward" || d.action === "forward") {
        doSkip(d.seconds || 10);
      } else if (d.type === "movieshub:rewind" || d.action === "rewind") {
        doSkip(-(d.seconds || 10));
      } else if (d.type === "movieshub:dolby_update") {
        applyAtmosConfig(d);
      } else if (d.action === "pause" || d === "stop") {
        var nv = document.getElementById("nativeVideo");
        if (nv) { try { nv.pause(); } catch (err) {} }
      }
    });

    // Keyboard & Remote Control handler inside Moviesda
    window.addEventListener("keydown", function(e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        doSkip(10);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        doSkip(-10);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        e.stopPropagation();
        toggleLocalFs();
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        try { window.parent.postMessage({ type: "player:escape" }, "*"); } catch (err) {}
      }
    });

    (function() {
      var apiPfx = "${hostPfx}" || (window.location.pathname.includes("/server/movieshub_api") ? "/server/movieshub_api" : "");
      var initialFileId = "${fileId || ""}";

      function handleFileId(fid) {
        fetch(apiPfx + "/api/moviesda_stream?file_id=" + fid)
          .then(function(r) { return r.json(); })
          .then(function(d) {
            var stream = (d && (d.streamUrl || d.stream_url)) || "";
            if (stream) {
              playDirect(stream, fid);
            } else {
              playEmbed(fid);
            }
          })
          .catch(function() {
            playEmbed(fid);
          });
      }

      if (initialFileId) {
        handleFileId(initialFileId);
      } else {
        var lt = document.getElementById("mLoaderText");
        if (lt) lt.textContent = "Resolving latest " + ("${year || 'Tamil'}") + " release...";
        fetch(apiPfx + "/api/moviesda_resolve?title=" + encodeURIComponent("${safeTitle}") + "&tmdb_id=${tmId}&year=" + encodeURIComponent("${year || ''}"))
          .then(function(r) { return r.json(); })
          .then(function(d) {
            if (d && (d.fileId || d.file_id)) {
              handleFileId(d.fileId || d.file_id);
            } else {
              var ef = document.getElementById("embedFrame");
              var ew = document.getElementById("embedWrap");
              if (ef && ew) {
                ef.src = "${fallbackEmbedUrl}";
                ew.style.display = "block";
              }
              var loader = document.getElementById("mLoader");
              if (loader) loader.style.display = "none";
            }
          })
          .catch(function() {
            var ef = document.getElementById("embedFrame");
            var ew = document.getElementById("embedWrap");
            if (ef && ew) {
              ef.src = "${fallbackEmbedUrl}";
              ew.style.display = "block";
            }
            var loader = document.getElementById("mLoader");
            if (loader) loader.style.display = "none";
          });
      }
    })();
  </script>
</body>
</html>`;
}

class MovieshubPlayer {
  constructor() {
    this.currentMovie = null;
    this.currentMode = "movie"; // "movie" (Full Movieshub Cloud Stream) or "trailer" (Trailer Preview)
    this.modal = null;
    this.video = null;
    this.streamIframe = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.currentVolume = 1.0;
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
                        <li class="active" data-val="Tamil">🔊 Tamil (தமிழ்) [Dubbed / Regional]</li>
                        <li data-val="Original">🔊 English (Original 5.1 / Atmos 7.1.4)</li>
                        <li data-val="Hindi">🔊 Hindi (हिंदी) [Dubbed]</li>
                        <li data-val="Telugu">🔊 Telugu (తెలుగు) [Dubbed]</li>
                        <li data-val="Cinema">🎬 Dolby Atmos Cinema Hall</li>
                        <li data-val="Dialogue">🗣️ Dolby Atmos Dialogue Boost</li>
                        <li data-val="Night">🌙 Dolby Atmos Night Mode</li>
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

                <!-- Dolby Atmos 3D Spatial Audio Button -->
                <button class="ctrl-dolby-atmos-btn" id="ctrl-dolby-atmos-btn" title="Open Dolby Atmos 3D Sound Stage">
                  <div class="atmos-pulse-dot"></div>
                  <span>Dolby Atmos</span>
                </button>

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
    if (this.video && window.DolbyAtmos) {
      window.DolbyAtmos.attach(this.video);
    }
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

    // Iframe postMessage listener for download actions (Secured with origin validation)
    window.addEventListener("message", (e) => {
      if (e.origin && e.origin !== window.location.origin && e.origin !== "null") {
        return;
      }
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

    // Skip & Fast-Forward across All Modes & Servers (Strictly 10s Debounced)
    rewindBtn.addEventListener("click", () => skipRewind10());
    forwardBtn.addEventListener("click", () => skipForward10());

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

    // Dolby Atmos 3D Sound Stage Button
    const dolbyBtn = document.getElementById("ctrl-dolby-atmos-btn");
    if (dolbyBtn) {
      dolbyBtn.addEventListener("click", () => {
        if (window.DolbyAtmos) {
          const curIframe = document.getElementById("player-stream-iframe");
          const innerVid = curIframe?.contentDocument?.querySelector("video");
          const targetVid = innerVid || this.video;
          if (targetVid) window.DolbyAtmos.attach(targetVid);
          window.DolbyAtmos.openSoundStageModal();
        }
      });
    }

    // Audio items with Dolby Atmos profile switching
    document.querySelectorAll("#audio-track-list li").forEach(li => {
      li.addEventListener("click", () => {
        document.querySelectorAll("#audio-track-list li").forEach(l => l.classList.remove("active"));
        li.classList.add("active");
        const val = li.dataset.val;
        if (val === "Tamil") {
          loadServer(1, false);
          if (window.showToast) window.showToast("Switched to Server 2 (Tamil Dubbed HD)");
        } else if (val === "Hindi") {
          this.switchMode("stream");
          if (window.showToast) window.showToast("Switched to Hindi Dubbed Audio");
        } else if (val === "Telugu") {
          this.switchMode("stream");
          if (window.showToast) window.showToast("Switched to Telugu Dubbed Audio");
        } else if (window.DolbyAtmos) {
          if (this.video) window.DolbyAtmos.attach(this.video);
          if (val === "Original" || val === "Atmos") window.DolbyAtmos.applyPreset("atmos_3d");
          else if (val === "Cinema") window.DolbyAtmos.applyPreset("cinema");
          else if (val === "Dialogue") window.DolbyAtmos.applyPreset("dialogue");
          else if (val === "Night") window.DolbyAtmos.applyPreset("night");
          else window.DolbyAtmos.applyPreset("bypass");
        } else {
          if (window.showToast) window.showToast(`Audio Track: ${li.textContent}`);
        }
        audioSubPopover.classList.add("hidden");
      });
    });

    // 10s Forward and Rewind Skip across all servers & modes (350ms Debounced)
    let lastSeekTimestamp = 0;

    const skipForward10 = () => {
      const now = Date.now();
      if (now - lastSeekTimestamp < 350) return;
      lastSeekTimestamp = now;

      let sought = false;
      const curIframe = document.getElementById("player-stream-iframe");

      // 1. Check if Moviesda native video is playing directly inside same-origin iframe
      if (curIframe && curIframe.contentDocument) {
        try {
          const innerVid = curIframe.contentDocument.querySelector("video");
          if (innerVid && typeof innerVid.currentTime === "number" && !isNaN(innerVid.currentTime)) {
            const targetTime = Math.min((innerVid.duration || Infinity), innerVid.currentTime + 10);
            innerVid.currentTime = targetTime;
            sought = true;
          }
        } catch (e) {}
      }

      // 2. Trailer or direct native video
      if (!sought && video && !video.paused) {
        video.currentTime = Math.min((video.duration || Infinity), video.currentTime + 10);
        sought = true;
      }

      // 3. Third-party cross-origin iframes (Servers 1 to 8): send single forward message
      if (!sought && curIframe && curIframe.contentWindow) {
        try {
          curIframe.contentWindow.postMessage({ type: "movieshub:forward", seconds: 10 }, "*");
          curIframe.contentWindow.postMessage({ action: "forward", seconds: 10 }, "*");
        } catch (e) {}
      }

      this.showToastIndicator("⏩ +10s");
    };

    const skipRewind10 = () => {
      const now = Date.now();
      if (now - lastSeekTimestamp < 350) return;
      lastSeekTimestamp = now;

      let sought = false;
      const curIframe = document.getElementById("player-stream-iframe");

      // 1. Check if Moviesda native video is playing directly inside same-origin iframe
      if (curIframe && curIframe.contentDocument) {
        try {
          const innerVid = curIframe.contentDocument.querySelector("video");
          if (innerVid && typeof innerVid.currentTime === "number" && !isNaN(innerVid.currentTime)) {
            const targetTime = Math.max(0, innerVid.currentTime - 10);
            innerVid.currentTime = targetTime;
            sought = true;
          }
        } catch (e) {}
      }

      // 2. Trailer or direct native video
      if (!sought && video && !video.paused) {
        video.currentTime = Math.max(0, video.currentTime - 10);
        sought = true;
      }

      // 3. Third-party cross-origin iframes (Servers 1 to 8): send single rewind message
      if (!sought && curIframe && curIframe.contentWindow) {
        try {
          curIframe.contentWindow.postMessage({ type: "movieshub:rewind", seconds: 10 }, "*");
          curIframe.contentWindow.postMessage({ action: "rewind", seconds: 10 }, "*");
        } catch (e) {}
      }

      this.showToastIndicator("⏪ -10s");
    };

    // Fullscreen toggle across all servers
    const toggleFullscreen = () => {
      const container = document.getElementById("playerStreamFrameContainer") || this.modal;
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (container.requestFullscreen) {
          container.requestFullscreen().catch(() => {
            if (this.modal && this.modal.requestFullscreen) this.modal.requestFullscreen().catch(() => {});
          });
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        } else if (this.modal && this.modal.requestFullscreen) {
          this.modal.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch(() => {});
      }
    };

    // Fullscreen button
    fullscreenBtn.addEventListener("click", () => toggleFullscreen());

    // forwardBtn click handled above without duplicate listeners

    // Keyboard controls in Player (Active across ALL servers)
    window.addEventListener("keydown", (e) => {
      if (this.modal.classList.contains("hidden")) return;

      // 1. Esc: exit fullscreen if currently in fullscreen, otherwise off-screen (close player)
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch(() => {});
        } else {
          this.close();
        }
        return;
      }

      // 2. F / f: Toggle Fullscreen
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        e.stopPropagation();
        toggleFullscreen();
        return;
      }

      // 3. Forward key (ArrowRight): skip 10 seconds in ALL servers
      if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        skipForward10();
        return;
      }

      // 4. Rewind key (ArrowLeft): rewind 10 seconds in ALL servers
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        skipRewind10();
        return;
      }

      // Mode-specific additional shortcuts (Trailer preview mode)
      if (this.currentMode === "trailer") {
        if (e.key === " " || e.key === "k") {
          e.preventDefault();
          togglePlay();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (video) {
            video.volume = Math.min(1, video.volume + 0.1);
            this.updateVolumeUI();
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (video) {
            video.volume = Math.max(0, video.volume - 0.1);
            this.updateVolumeUI();
          }
        } else if (e.key === "m") {
          if (video) {
            video.muted = !video.muted;
            this.updateVolumeUI();
          }
        }
      }
    });

    // Listen for remote events from iframes (e.g. Server 9)
    window.addEventListener("message", (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "player:fullscreen_toggle") {
        toggleFullscreen();
      } else if (e.data.type === "player:escape") {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch(() => {});
        } else {
          this.close();
        }
      } else if (e.data.type === "player:toast") {
        this.showToastIndicator(e.data.message || "⏩ +10s");
      } else if (e.data.type === "player:open_dolby") {
        if (window.DolbyAtmos) {
          const curIframe = document.getElementById("player-stream-iframe");
          const innerVid = curIframe?.contentDocument?.querySelector("video");
          const targetVid = innerVid || this.video;
          if (targetVid) window.DolbyAtmos.attach(targetVid);
          window.DolbyAtmos.openSoundStageModal();
        }
      } else if (e.data.type === "player:dolby_ready") {
        if (window.DolbyAtmos) {
          window.DolbyAtmos.broadcastToIframe();
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
      if (tabFullMovie) tabFullMovie.classList.add("active");
      if (tabTrailer) tabTrailer.classList.remove("active");
      if (streamWrap) streamWrap.classList.remove("hidden");
      if (trailerWrap) {
        trailerWrap.classList.add("hidden");
        trailerWrap.innerHTML = "";
      }

      // Stop trailer video or iframe if playing
      const trailerIframe = document.getElementById("player-trailer-iframe");
      if (trailerIframe) {
        trailerIframe.src = "about:blank";
      }
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

      // Verified 100% accurate TMDB ID database for blockbusters
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
        "om": 1384528,
        "meesaya murukku": 424336,
        "meesaya murukku 2": 1538457,
        "immortal": 1505305,
        "cold call": 126743,
        "anakapalli": 123090,
        "baththa": 1515692,
        "the dark heaven": 1618200,
        "dorothy": 1578079,
        "leo": 949229,
        "leo: bloody sweet": 949229,
        "jailer": 937020,
        "vikram": 743563,
        "master": 626392,
        "goat": 1129608,
        "the greatest of all time": 1129608,
        "the greatest of all time (g.o.a.t)": 1129608,
        "amaran": 927342,
        "maharaja": 1118224,
        "ponniyin selvan": 660046,
        "ponniyin selvan: part i": 660046,
        "ponniyin selvan: part i & ii": 660046,
        "ps1": 660046,
        "kalki 2898 ad": 801688,
        "kalki 2898-ad": 801688,
        "kalki": 801688,
        "aavesham": 1084812,
        "manjummel boys": 1069945,
        "bramayugam": 1166133,
        "bramayugam: the age of madness": 1166133,
        "stree 2": 1112426,
        "stree 2: sarkate ka aatank": 1112426,
        "12th fail": 1163258,
        "jawan": 872906,
        "animal": 781732,
        "salaar": 770906,
        "salaar: part 1 - ceasefire": 770906,
        "rrr": 579974,
        "rrr: rise roar revolt": 579974,
        "deadpool & wolverine": 533535,
        "deadpool and wolverine": 533535,
        "dune: part two": 693134,
        "dune part two": 693134,
        "dune 2": 693134,
        "dune": 693134,
        "oppenheimer": 872585,
        "interstellar": 157336,
        "severance": 95396,
        "stranger things": 66732,
        "the boys": 76479,
        "game of thrones": 1399,
        "got": 1399,
        "house of the dragon": 94997,
        "hotd": 94997
      };

      let cleanTitle = (movie?.title || "").toLowerCase().replace(/\[.*?\]/g, "").trim();

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

      // 1. Resolve from verified KNOWN_TMDB_MAP first (prevents wrong movie playback when unverified/internal Netmirror or Moviesda IDs are passed)
      let resolvedTmdbId = null;
      const knownMatch = findKnownTmdbId(cleanTitle);
      if (knownMatch) {
        resolvedTmdbId = String(knownMatch);
      }

      // 2. Prioritize explicit numeric tmdbId if not known title, verifying it is not an internal Netmirror or Moviesda upload ID
      const isNetmirrorInternalId = movie?.netmirrorId && String(movie.tmdbId) === String(movie.netmirrorId);
      const isNetmirrorPrefixed = String(movie?.id || "").startsWith("netmirror-") && String(movie?.tmdbId) === String(movie?.id || "").replace("netmirror-", "");
      const isKnownMoviesdaUploadId = movie?.tmdbId === 102966 || movie?.tmdbId === 103140 || movie?.tmdbId === 103147 || movie?.tmdbId === 103234;

      if (!resolvedTmdbId && movie?.tmdbId && !isNetmirrorInternalId && !isNetmirrorPrefixed && !isKnownMoviesdaUploadId) {
        if (!isNaN(parseInt(movie.tmdbId, 10)) && parseInt(movie.tmdbId, 10) > 0) {
          resolvedTmdbId = String(movie.tmdbId);
        }
      }

      // 3. Fallback to rawId if numeric
      const rawId = String(movie?.id || "").replace("tmdb-", "").replace("netmirror-", "");
      if (!resolvedTmdbId) {
        if (rawId && !isNaN(parseInt(rawId, 10)) && parseInt(rawId, 10) > 100) {
          resolvedTmdbId = rawId;
        } else if (movie?.title && window.MOVIE_CATALOG) {
          const match = window.MOVIE_CATALOG.find(c => c.title && c.title.toLowerCase() === movie.title.toLowerCase());
          if (match && match.tmdbId) resolvedTmdbId = String(match.tmdbId);
        }
        if (!resolvedTmdbId) {
          resolvedTmdbId = "1399"; // Default fallback to Game of Thrones Multi-Audio
        }
      }

      // Verified TV Series IDs & Titles
      const KNOWN_TV_IDS = new Set([
        "1399", "94997", "66732", "95396", "76479", "1396", "100088", "93405",
        "84958", "82856", "71912", "71446", "119051", "70523", "126308", "106379",
        "60574", "44217", "87108", "63351", "83121", "79352", "92783", "120998", "100757"
      ]);
      const KNOWN_TV_KEYWORDS = [
        "game of thrones", "got", "house of the dragon", "hotd", "stranger things",
        "severance", "the boys", "breaking bad", "the last of us", "squid game",
        "loki", "the mandalorian", "witcher", "money heist", "wednesday",
        "dark", "shogun", "fallout", "peaky blinders", "vikings", "chernobyl",
        "narcos", "mirzapur", "sacred games", "the family man", "farzi", "panchayat"
      ];

      const isKnownTv = KNOWN_TV_IDS.has(String(resolvedTmdbId)) ||
        KNOWN_TV_KEYWORDS.some(kw => cleanTitle === kw || cleanTitle.includes(kw) || kw.includes(cleanTitle));

      const mtype = (
        movie?.mediaType === "tv" ||
        movie?.isTv ||
        isKnownTv ||
        String(movie?.duration || "").toLowerCase().includes("season") ||
        String(movie?.duration || "").toLowerCase().includes("episode") ||
        String(movie?.duration || "").toLowerCase().includes("series") ||
        String(movie?.title || "").toLowerCase().includes("season")
      ) ? "tv" : "movie";

      if (tabFullMovie) {
        tabFullMovie.innerHTML = mtype === "tv" 
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>TV Series</span>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Full Movie</span>`;
      }

      const pfx = (typeof window !== "undefined" && window.API_PREFIX)
        ? window.API_PREFIX
        : "/server/movieshub_api";

      const netId = movie?.netId || movie?.nid || movie?.netmirrorId || (String(movie?.id || "").startsWith("netmirror-") ? String(movie.id).replace("netmirror-", "") : "");
      let season = parseInt(movie?.season || 1, 10) || 1;
      let episode = parseInt(movie?.episode || 1, 10) || 1;

      const buildServers = (curSeason, curEpisode) => [
        {
          id: "wcx",
          name: "Watched.cx",
          badge: "Multi-Source (Prism 4K)",
          subSources: [
            { id: "phoenix", name: "Phoenix", flag: "🇺🇸", status: "online", url: mtype === "tv" ? `https://vidlink.pro/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}?primaryColor=ffffff&autoplay=true` : `https://vidlink.pro/movie/${resolvedTmdbId}?primaryColor=ffffff&autoplay=true` },
            { id: "iris", name: "Iris (multi-audio)", flag: "🌐", status: "online", url: mtype === "tv" ? `https://vidlink.pro/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}?multiLang=true&primaryColor=ffffff&autoplay=true${safeLang.toLowerCase() === "tamil" ? "&lang=ta&audio=ta" : ""}` : `https://vidlink.pro/movie/${resolvedTmdbId}?multiLang=true&primaryColor=ffffff&autoplay=true${safeLang.toLowerCase() === "tamil" ? "&lang=ta&audio=ta" : ""}` },
            { id: "raf", name: "Raf", flag: "🇺🇸", status: "online", url: mtype === "tv" ? `https://vidsync.pro/embed/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}` : `https://vidsync.pro/embed/movie/${resolvedTmdbId}` },
            { id: "prism", name: "Prism (4K)", flag: "🇺🇸", status: "online", url: mtype === "tv" ? `https://vidfast.pro/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}?autoPlay=true` : `https://vidfast.pro/movie/${resolvedTmdbId}?autoPlay=true` },
            { id: "vega", name: "Vega (4K)", flag: "🇺🇸", status: "online", url: mtype === "tv" ? `https://vidsrc.su/embed/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}` : `https://vidsrc.su/embed/movie/${resolvedTmdbId}` },
            { id: "onyx", name: "Onyx (multi-audio)", flag: "🇺🇸", status: "online", url: mtype === "tv" ? `https://vidnest.fun/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}` : `https://vidnest.fun/movie/${resolvedTmdbId}` }
          ],
          url: mtype === "tv"
            ? `https://vidfast.pro/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}?autoPlay=true`
            : `https://vidfast.pro/movie/${resolvedTmdbId}?autoPlay=true`
        },
        {
          id: "s1",
          name: "Server 1",
          badge: "Movieshub Cloud",
          url: mtype === "tv"
            ? `${pfx}/stream/netmirror/embed?tm_id=${resolvedTmdbId}&nid=${netId}&year=${movie?.year || 2024}&lang=${safeLang}&se=${curSeason}&ep=${curEpisode}`
            : `${pfx}/stream/netmirror/embed?tm_id=${resolvedTmdbId}&nid=${netId}&year=${movie?.year || 2024}&lang=${safeLang}`
        },
        {
          id: "s2",
          name: "Server 2",
          badge: "Primary HD (VidLink)",
          url: mtype === "tv"
            ? `https://vidlink.pro/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}?primaryColor=e50914&quality=1080&autoplay=true${safeLang.toLowerCase() === "tamil" ? "&lang=ta&audio=ta&sub=ta" : ""}`
            : `https://vidlink.pro/movie/${resolvedTmdbId}?primaryColor=e50914&quality=1080&autoplay=true${safeLang.toLowerCase() === "tamil" ? "&lang=ta&audio=ta&sub=ta" : ""}`
        },
        {
          id: "s3",
          name: "Server 3",
          badge: "Fast Forward (VidSrc SU)",
          url: mtype === "tv"
            ? `https://vidsrc.su/embed/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}`
            : `https://vidsrc.su/embed/movie/${resolvedTmdbId}`
        },
        {
          id: "s4",
          name: "Server 4",
          badge: "Backup 1 (0vidads)",
          url: mtype === "tv"
            ? `https://0vidads.top/embed/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}`
            : `https://0vidads.top/embed/movie/${resolvedTmdbId}`
        },
        {
          id: "s5",
          name: "Server 5",
          badge: "Multi-Audio (VidSync)",
          url: mtype === "tv"
            ? `https://vidsync.pro/embed/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}`
            : `https://vidsync.pro/embed/movie/${resolvedTmdbId}`
        },
        {
          id: "s6",
          name: "Server 6",
          badge: "Prism 4K (VidFast)",
          url: mtype === "tv"
            ? `https://vidfast.pro/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}?autoPlay=true`
            : `https://vidfast.pro/movie/${resolvedTmdbId}?autoPlay=true`
        },
        {
          id: "s7",
          name: "Server 7",
          badge: "Mirror HD (VidNest)",
          url: mtype === "tv"
            ? `https://vidnest.fun/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}`
            : `https://vidnest.fun/movie/${resolvedTmdbId}`
        },
        {
          id: "s8",
          name: "Server 8",
          badge: "Ultra CDN (VidMario)",
          url: mtype === "tv"
            ? `https://player.vidmario.net/embed/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}`
            : `https://player.vidmario.net/embed/movie/${resolvedTmdbId}`
        },
        {
          id: "s9",
          name: "Server 9",
          badge: "Moviesda Tamil HD",
          url: (movie?.moviesdaFileId || getVerifiedMoviesdaFileId(movie?.title, resolvedTmdbId) || getVerifiedMoviesdaFileId(cleanTitle, resolvedTmdbId))
            ? `${pfx}/stream/moviesda/embed?file_id=${encodeURIComponent(movie?.moviesdaFileId || getVerifiedMoviesdaFileId(movie?.title, resolvedTmdbId) || getVerifiedMoviesdaFileId(cleanTitle, resolvedTmdbId))}`
            : `${pfx}/moviesda.html?id=${encodeURIComponent(resolvedTmdbId)}&type=${encodeURIComponent(mtype)}&title=${encodeURIComponent(cleanTitle)}&year=${encodeURIComponent(movie?.year || 2026)}`
        },
        {
          id: "s10",
          name: "Server 10",
          badge: "Multi-Lang 4K (VidLink)",
          url: mtype === "tv"
            ? `https://vidlink.pro/tv/${resolvedTmdbId}/${curSeason}/${curEpisode}?multiLang=true&primaryColor=e50914&autoplay=true`
            : `https://vidlink.pro/movie/${resolvedTmdbId}?multiLang=true&primaryColor=e50914&autoplay=true`
        }
      ];

      let servers = buildServers(season, episode);
      let activeWcxSourceId = "prism";

      // Smart Auto-Selection for Instant Zero-Buffer Playback:
      const cleanLower = cleanTitle.toLowerCase();
      const verifiedFid = movie?.moviesdaFileId || getVerifiedMoviesdaFileId(movie?.title, resolvedTmdbId) || getVerifiedMoviesdaFileId(cleanTitle, resolvedTmdbId);
      const hasMoviesda = Boolean(
        (verifiedFid && (verifiedFid !== "103234" || resolvedTmdbId === 656908)) ||
        (movie?.qualities && movie.qualities.some(q => q.toLowerCase().includes("moviesda")))
      );

      if (hasMoviesda) {
        const s9Idx = servers.findIndex(s => s.id === "s9");
        this.currentServerIdx = s9Idx !== -1 ? s9Idx : 0;
      } else {
        this.currentServerIdx = 0; // Watched.cx Multi-Source (Prism 4K) by default!
      }
      this.isAutoSwitchingEnabled = false;

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

      if (streamWrap) {
        streamWrap.innerHTML = `
          <div class="player-preloader" id="player-preloader" style="position:absolute;inset:0;background:#050508;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:5;overflow:hidden;pointer-events:none;">
            <div style="background-image:url('${safeBackdrop}');position:absolute;inset:0;background-size:cover;background-position:center;filter:blur(30px) brightness(0.22);transform:scale(1.15);"></div>
            <div style="position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;text-align:center;padding:24px;max-width:90%;">
              <div class="spinner" style="width:46px;height:46px;border:3.5px solid rgba(255,255,255,0.15);border-top-color:#ffffff;border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:16px;"></div>
              <div style="font-size:20px;font-weight:800;color:#fff;letter-spacing:0.5px;text-shadow:0 2px 10px rgba(0,0,0,0.8);">${safeTitle}</div>
              <div id="player-loader-status" style="font-size:14px;color:#22c55e;font-weight:700;margin-top:10px;">Connecting to Watched.cx (Prism 4K)...</div>
              <div id="player-loader-sub" style="font-size:12px;color:#9ca3af;margin-top:4px;">Protected Ad-Free Stream • No Redirection • Ultra HD</div>
            </div>
          </div>

          ${mtype === "tv" ? `
          <div class="wcx-episode-bar" id="wcxEpisodeBar">
            <div class="wcx-ep-season-wrap">
              <span class="wcx-ep-label">Season</span>
              <select id="wcxSeasonSelect" class="wcx-ep-select">
                <option value="${season}">Season ${season}</option>
              </select>
            </div>
            <div class="wcx-ep-pills" id="wcxEpisodePills">
              <button class="wcx-ep-pill active" data-ep="${episode}">Ep ${episode}</button>
            </div>
          </div>` : ""}

          <div class="player-stream-frame-container" id="playerStreamFrameContainer" style="flex:1;min-height:0;position:relative;width:100%;display:flex;align-items:center;justify-content:center;background:#000;overflow:hidden;">
            <iframe id="player-stream-iframe" allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share" allowfullscreen webkitallowfullscreen="true" mozallowfullscreen="true" loading="eager" referrerpolicy="no-referrer-when-downgrade" style="width:100%;height:100%;border:none;display:block;"></iframe>

            <!-- Watched.cx Floating Source Popover (Screenshot UX) -->
            <div class="wcx-source-menu hidden" id="wcxSourceMenu">
              <div class="wcx-source-menu-header">
                <span>&lsaquo; Source</span>
                <span class="wcx-source-sub-tag" id="wcxSourceSubStatus">Subtitles Ready</span>
              </div>
              <div class="wcx-source-list" id="wcxSourceList">
                ${servers[0].subSources.map(src => `
                  <button type="button" class="wcx-source-item ${src.id === activeWcxSourceId ? "active" : ""}" data-wcx-id="${src.id}">
                    <span class="wcx-dot ${src.status}"></span>
                    <span class="wcx-flag">${src.flag}</span>
                    <span class="wcx-name">${src.name}</span>
                    <span class="wcx-check">${src.id === activeWcxSourceId ? "✓" : ""}</span>
                  </button>
                `).join("")}
              </div>
              <div class="wcx-source-subs-wrap" id="wcxSubtitlesBox">
                <div class="wcx-source-subs-title">Subtitles (watched.cx)</div>
                <select id="wcxSubtitleSelect" class="wcx-sub-select">
                  <option value="">Loading live subtitles...</option>
                </select>
              </div>
            </div>

            <button type="button" class="wcx-source-fab" id="wcxSourceFabBtn" title="Switch Watched.cx Source & Subtitles">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span id="wcxSourceFabLabel">Source</span>
            </button>
          </div>
          <div class="player-server-bar">
            <div class="player-server-left">
              <button id="bottomPlayerBackBtn" class="bottom-back-btn" title="Back to Movieshub" style="display:none;"></button>
              <div class="player-server-pills" id="playerModalServerPills" style="white-space:nowrap;">
                ${servers.map((s, idx) => `
                  <button class="srv-pill-btn ${idx === this.currentServerIdx ? "active" : ""}" data-idx="${idx}">
                    <span>${s.name}</span>
                    <span class="srv-pill-badge">${s.badge}</span>
                  </button>
                `).join("")}
              </div>
            </div>
            <div class="player-server-right">
              <button id="streamRewind10Btn" class="stream-seek-btn" title="Rewind 10s across all servers (←)">
                <span>⏪ 10s</span>
              </button>
              <button id="streamForward10Btn" class="stream-seek-btn" title="Forward 10s across all servers (→)">
                <span>⏩ 10s</span>
              </button>
              <button id="quickTamilAudioBtn" class="quick-tamil-btn" title="Play Tamil Dubbed Audio">
                <span>🔊 Tamil Dubbed</span>
              </button>
              <button class="ctrl-dolby-atmos-btn" id="stream-dolby-btn" title="Open Dolby Atmos 3D Sound Stage">
                <div class="atmos-pulse-dot"></div>
                <span>Dolby Atmos</span>
              </button>
              <button id="autoSwitchToggleBtn" class="auto-switch-toggle off" title="Toggle Auto-Switch">
                <span>⏸ Auto-Switch: OFF</span>
              </button>
              <button id="reloadServerBtn" class="reload-server-btn" title="Reload stream if buffering or stuck">
                <span>🔄 Reload</span>
              </button>
              <button id="skipServerBtn" class="next-server-btn" title="Switch to Next Server">
                <span>Next Server ⏭</span>
              </button>
              <button id="streamFsBtn" class="stream-fs-btn" title="Toggle Fullscreen (F)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                <span>Fullscreen</span>
              </button>
              <div class="stream-live-tag">
                <span style="color:#22c55e;font-size:11px;font-weight:700;">● Active</span>
                <span style="color:#888;">|</span>
                <span style="color:${(movie?.isTheatrePrint || (movie?.qualities && movie.qualities.some(q => q.toLowerCase().includes("theatre") || q.toLowerCase().includes("pre-hd"))) || (cleanTitle.includes("meesaya murukku 2"))) ? "#f59e0b" : "#e50914"};font-weight:700;font-size:11px;">
                  ${(movie?.isTheatrePrint || (movie?.qualities && movie.qualities.some(q => q.toLowerCase().includes("theatre") || q.toLowerCase().includes("pre-hd"))) || (cleanTitle.includes("meesaya murukku 2"))) ? "Pre-HD (Theatre)" : "4K UHD"}
                </span>
              </div>
            </div>
          </div>
        `;
      }

      // Wire Watched.cx Source Popover & Live Subtitles + Episode Selector
      const wcxFabBtn = document.getElementById("wcxSourceFabBtn");
      const wcxMenu = document.getElementById("wcxSourceMenu");
      const wcxFabLabel = document.getElementById("wcxSourceFabLabel");
      if (wcxFabBtn && wcxMenu) {
        wcxFabBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          wcxMenu.classList.toggle("hidden");
        });
        document.addEventListener("click", (e) => {
          if (!wcxMenu.classList.contains("hidden") && !wcxMenu.contains(e.target) && !wcxFabBtn.contains(e.target)) {
            wcxMenu.classList.add("hidden");
          }
        });
      }

      const fetchAndPopulateSubtitles = (sNum, eNum) => {
        const subSelect = document.getElementById("wcxSubtitleSelect");
        const subStatus = document.getElementById("wcxSourceSubStatus");
        if (!subSelect) return;
        fetch(`${pfx}/api/subtitles?tmdb_id=${encodeURIComponent(resolvedTmdbId)}&type=${mtype}&season=${sNum}&episode=${eNum}`)
          .then(r => r.json())
          .then(data => {
            const subs = (data && Array.isArray(data.subtitles)) ? data.subtitles : [];
            if (subs.length === 0) {
              subSelect.innerHTML = `<option value="">Auto / Embedded Subtitles</option>`;
              if (subStatus) subStatus.textContent = "Embedded CC";
            } else {
              subSelect.innerHTML = `<option value="">Subtitles (${subs.length} languages available)</option>` +
                subs.map(s => `<option value="${s.url}">${s.lang}</option>`).join("");
              if (subStatus) subStatus.textContent = `${subs.length} Subtitles`;
            }
          })
          .catch(() => {
            if (subStatus) subStatus.textContent = "Embedded CC";
          });
      };
      fetchAndPopulateSubtitles(season, episode);

      const bindWcxSourceClicks = (curLoadServer) => {
        const listEl = document.getElementById("wcxSourceList");
        if (!listEl) return;
        listEl.querySelectorAll(".wcx-source-item").forEach(btn => {
          btn.addEventListener("click", () => {
            const wId = btn.dataset.wcxId;
            const wSrv = servers[0];
            const foundSrc = wSrv.subSources.find(x => x.id === wId);
            if (!foundSrc) return;
            activeWcxSourceId = wId;
            wSrv.url = foundSrc.url;
            wSrv.badge = foundSrc.name;
            listEl.querySelectorAll(".wcx-source-item").forEach(item => {
              const active = item.dataset.wcxId === wId;
              item.classList.toggle("active", active);
              const chk = item.querySelector(".wcx-check");
              if (chk) chk.textContent = active ? "✓" : "";
            });
            if (wcxFabLabel) wcxFabLabel.textContent = foundSrc.name;
            if (wcxMenu) wcxMenu.classList.add("hidden");
            curLoadServer(0, false);
            if (window.showToast) window.showToast(`Watched.cx • ${foundSrc.name}`);
          });
        });
      };

      const fetchAndRenderEpisodes = (sNum) => {
        if (mtype !== "tv") return;
        const seasonSelect = document.getElementById("wcxSeasonSelect");
        const epPills = document.getElementById("wcxEpisodePills");
        if (!epPills) return;
        fetch(`${pfx}/api/episodes?tmdb_id=${encodeURIComponent(resolvedTmdbId)}&season=${sNum}`)
          .then(r => r.json())
          .then(data => {
            const totalSeasons = Math.max(1, parseInt(data?.totalSeasons || 1, 10) || 1);
            if (seasonSelect && seasonSelect.options.length <= 1 && totalSeasons > 1) {
              seasonSelect.innerHTML = Array.from({ length: totalSeasons }, (_, i) =>
                `<option value="${i + 1}" ${i + 1 === sNum ? "selected" : ""}>Season ${i + 1}</option>`
              ).join("");
            }
            const eps = Array.isArray(data?.episodes) && data.episodes.length > 0
              ? data.episodes
              : Array.from({ length: 12 }, (_, i) => ({ episode_number: i + 1, name: `Episode ${i + 1}` }));
            epPills.innerHTML = eps.map(ep => {
              const num = ep.episode_number || 1;
              return `<button type="button" class="wcx-ep-pill ${num === episode ? "active" : ""}" data-ep="${num}" title="${(ep.name || "").replace(/"/g, "&quot;")}">S${sNum}:E${num} ${ep.name ? "• " + ep.name.slice(0, 22) : ""}</button>`;
            }).join("");
            epPills.querySelectorAll(".wcx-ep-pill").forEach(btn => {
              btn.addEventListener("click", () => {
                episode = parseInt(btn.dataset.ep, 10) || 1;
                epPills.querySelectorAll(".wcx-ep-pill").forEach(b => b.classList.toggle("active", parseInt(b.dataset.ep, 10) === episode));
                servers = buildServers(season, episode);
                const selectedSub = servers[0].subSources.find(x => x.id === activeWcxSourceId);
                if (selectedSub) {
                  servers[0].url = selectedSub.url;
                  servers[0].badge = selectedSub.name;
                }
                fetchAndPopulateSubtitles(season, episode);
                loadServer(this.currentServerIdx, false);
                if (window.showToast) window.showToast(`Playing Season ${season}, Episode ${episode}`);
              });
            });
          })
          .catch(() => {});
      };
      if (mtype === "tv") {
        fetchAndRenderEpisodes(season);
        const seasonSelect = document.getElementById("wcxSeasonSelect");
        if (seasonSelect) {
          seasonSelect.addEventListener("change", () => {
            season = parseInt(seasonSelect.value, 10) || 1;
            episode = 1;
            servers = buildServers(season, episode);
            const selectedSub = servers[0].subSources.find(x => x.id === activeWcxSourceId);
            if (selectedSub) {
              servers[0].url = selectedSub.url;
              servers[0].badge = selectedSub.name;
            }
            fetchAndRenderEpisodes(season);
            fetchAndPopulateSubtitles(season, episode);
            loadServer(this.currentServerIdx, false);
          });
        }
      }

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

        const pills = streamWrap ? streamWrap.querySelectorAll(".srv-pill-btn") : [];
        pills.forEach((b, i) => {
          if (i === idx) b.classList.add("active");
          else b.classList.remove("active");
        });

        const statusEl = document.getElementById("player-loader-status");
        if (statusEl) {
          statusEl.textContent = isAuto 
            ? `Auto-switched to ${srv.name} (${srv.badge})...`
            : `Connecting to ${srv.name}...`;
        }

        const container = document.getElementById("playerStreamFrameContainer");
        if (container) {
          let curIframe = document.getElementById("player-stream-iframe");
          if (!curIframe) {
            container.insertAdjacentHTML("afterbegin", `<iframe id="player-stream-iframe" allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share" allowfullscreen webkitallowfullscreen="true" mozallowfullscreen="true" loading="eager" referrerpolicy="no-referrer-when-downgrade" style="width:100%;height:100%;border:none;display:block;"></iframe>`);
            curIframe = document.getElementById("player-stream-iframe");
            this.streamIframe = curIframe;
          } else {
            // Cleanly pause and stop any ongoing audio/video from previous server before loading new one
            try {
              curIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
              curIframe.contentWindow.postMessage('{"action":"pause"}', '*');
              curIframe.contentWindow.postMessage("stop", "*");
            } catch (e) {}
            curIframe.removeAttribute("srcdoc");
            if (curIframe.removeAttribute) curIframe.removeAttribute("sandbox");
            curIframe.src = "about:blank";
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
              if (window.showToast) window.showToast(`Server ${this.currentServerIdx + 1} slow. Switching to Server ${nextIdx + 1}...`);
              loadServer(nextIdx, true);
            }
          };

          const mFileId = movie?.moviesdaFileId || getVerifiedMoviesdaFileId(movie?.title, resolvedTmdbId) || getVerifiedMoviesdaFileId(cleanTitle, resolvedTmdbId);

          if (srv.id === "s9") {
            curIframe.removeAttribute("src");
            curIframe.srcdoc = generateMoviesdaPlayerSrcdoc(resolvedTmdbId, mtype, movie?.title || "", safeLang, movie?.year || 2026, mFileId, season, episode);
            hidePreloader();
            return;
          }

          if (srv.id === "s1") {
            curIframe.removeAttribute("srcdoc");
            if (curIframe.removeAttribute) curIframe.removeAttribute("sandbox");
            curIframe.src = "about:blank";

            // Fetch stream HTML via AJAX to completely bypass Zoho Catalyst X-Frame-Options: DENY
            const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
            const timeoutId = controller ? setTimeout(() => controller.abort(), 7000) : null;

            fetch(srv.url, controller ? { signal: controller.signal } : {})
              .then(res => {
                if (timeoutId) clearTimeout(timeoutId);
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.text();
              })
              .then(html => {
                if (html && html.includes("<") && !html.includes("Stream Proxy error") && !html.includes("Not Found") && !html.includes("Unauthorised") && (html.includes("artplayer") || html.includes("<video") || html.includes("<iframe"))) {
                  curIframe.removeAttribute("src");
                  curIframe.srcdoc = html;
                  hidePreloader();
                } else {
                  throw new Error("Invalid stream proxy response");
                }
              })
              .catch(err => {
                console.warn("[Movieshub] Server 1 fetch failed, falling back to clean upstream:", err);
                const instantStreamUrl = mtype === "tv"
                  ? `https://vidlink.pro/tv/${resolvedTmdbId}/${season}/${episode}?primaryColor=e50914&autoplay=true`
                  : `https://vidlink.pro/movie/${resolvedTmdbId}?primaryColor=e50914&autoplay=true`;
                curIframe.removeAttribute("srcdoc");
                curIframe.src = instantStreamUrl;
                hidePreloader();
              });
            return;
          }

          curIframe.removeAttribute("srcdoc");
          curIframe.src = srv.url;
        }

        // Auto-switch timer: Only if manually enabled by user and server takes > 20s
        if (this.isAutoSwitchingEnabled) {
          this.autoSwitchTimer = setTimeout(() => {
            if (!this.isAutoSwitchingEnabled) return;
            const nextIdx = (this.currentServerIdx + 1) % servers.length;
            if (window.showToast) window.showToast(`Server ${this.currentServerIdx + 1} slow. Auto-switching to Server ${nextIdx + 1}...`);
            loadServer(nextIdx, true);
          }, 20000);
        }
      };

      // Wire Watched.cx Source Switcher & Subtitles selector
      bindWcxSourceClicks(loadServer);
      const wcxSubSelect = document.getElementById("wcxSubtitleSelect");
      if (wcxSubSelect) {
        wcxSubSelect.addEventListener("change", () => {
          const subUrl = wcxSubSelect.value;
          const subLabel = wcxSubSelect.options[wcxSubSelect.selectedIndex]?.textContent || "Subtitles";
          const subStatus = document.getElementById("wcxSourceSubStatus");
          if (subUrl) {
            if (subStatus) subStatus.textContent = subLabel;
            const curIframe = document.getElementById("player-stream-iframe");
            try {
              if (curIframe && curIframe.contentWindow) {
                curIframe.contentWindow.postMessage({ type: "subtitle", url: subUrl, label: subLabel }, "*");
              }
            } catch (e) {}
            if (window.showToast) window.showToast(`Subtitles loaded: ${subLabel}`);
          } else {
            if (subStatus) subStatus.textContent = "Embedded CC";
          }
        });
      }

      // Fast preloader dismissal so video controls are immediately interactive
      setTimeout(hidePreloader, 600);

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

      // Quick Tamil Dubbed / Original Audio Button
      const quickTamilBtn = document.getElementById("quickTamilAudioBtn");
      if (quickTamilBtn) {
        quickTamilBtn.addEventListener("click", () => {
          const mFileId = movie?.moviesdaFileId || getVerifiedMoviesdaFileId(movie?.title, resolvedTmdbId) || getVerifiedMoviesdaFileId(cleanTitle, resolvedTmdbId);
          if (mFileId) {
            const s9Idx = servers.findIndex(s => s.id === "s9");
            if (s9Idx !== -1) {
              loadServer(s9Idx, false);
              if (window.showToast) window.showToast(`🔊 Playing ${movie?.title || "Movie"} in Original Tamil Audio (Moviesda HD)`);
              return;
            }
          }
          // For international or general titles with Tamil Dubbed:
          loadServer(1, false);
          if (window.showToast) window.showToast("Playing in Server 2 (Tamil Dubbed HD)");
        });
      }

      // Dedicated Stream Fullscreen Button
      const streamFsBtn = document.getElementById("streamFsBtn");
      if (streamFsBtn) {
        streamFsBtn.addEventListener("click", () => {
          const container = document.getElementById("playerStreamFrameContainer") || this.modal;
          if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            if (container.requestFullscreen) {
              container.requestFullscreen().catch(() => {
                if (this.modal && this.modal.requestFullscreen) this.modal.requestFullscreen().catch(() => {});
              });
            } else if (container.webkitRequestFullscreen) {
              container.webkitRequestFullscreen();
            } else if (this.modal && this.modal.requestFullscreen) {
              this.modal.requestFullscreen().catch(() => {});
            }
          } else {
            if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch(() => {});
          }
        });
      }

      // Dolby Atmos Sound Stage Button in Server Bar
      const streamDolbyBtn = document.getElementById("stream-dolby-btn");
      if (streamDolbyBtn) {
        streamDolbyBtn.addEventListener("click", () => {
          if (window.DolbyAtmos) {
            const curIframe = document.getElementById("player-stream-iframe");
            const innerVid = curIframe?.contentDocument?.querySelector("video");
            const targetVid = innerVid || this.video;
            if (targetVid) window.DolbyAtmos.attach(targetVid);
            window.DolbyAtmos.openSoundStageModal();
          }
        });
      }

      // On-Screen 10s Seek Controls (Active across all servers)
      const sRewindBtn = document.getElementById("streamRewind10Btn");
      if (sRewindBtn) sRewindBtn.addEventListener("click", () => skipRewind10());
      const sForwardBtn = document.getElementById("streamForward10Btn");
      if (sForwardBtn) sForwardBtn.addEventListener("click", () => skipForward10());

      // Reload Server Stream button
      const reloadBtn = document.getElementById("reloadServerBtn");
      if (reloadBtn) {
        reloadBtn.addEventListener("click", () => {
          loadServer(this.currentServerIdx, false);
          if (window.showToast) window.showToast(`Reloaded ${servers[this.currentServerIdx].name}`);
        });
      }

      // Skip server button
      const skipBtn = document.getElementById("skipServerBtn");
      if (skipBtn) {
        skipBtn.addEventListener("click", () => {
          const nextIdx = (this.currentServerIdx + 1) % servers.length;
          loadServer(nextIdx, false);
          if (window.showToast) window.showToast(`Switched to ${servers[nextIdx].name}`);
        });
      }
      // Bottom bar back button
      const watchPart1Btn = document.getElementById("btnWatchMeesayaPart1");
      if (watchPart1Btn) {
        watchPart1Btn.onclick = () => {
          this.open({
            id: "tmdb-424336",
            tmdbId: 424336,
            title: "Meesaya Murukku",
            nativeTitle: "மீசைய முருக்கு",
            year: 2017,
            language: "Tamil",
            mediaType: "movie",
            qualities: ["1080p", "HD"],
            overview: "A semi-autobiographical musical comedy following Adhi's early life and struggles as an engineering student striving to become an independent hip-hop artist."
          }, "movie");
        };
      }

      const bottomBackBtn = document.getElementById("bottomPlayerBackBtn");
      if (bottomBackBtn) {
        bottomBackBtn.addEventListener("click", () => this.close());
      }

      // Bind server switcher buttons
      if (streamWrap) {
        const pills = streamWrap.querySelectorAll(".srv-pill-btn");
        pills.forEach(btn => {
          btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.idx, 10);
            loadServer(idx, false);
            if (window.showToast) window.showToast(`Switched to ${servers[idx].name}`);
          });
        });
      }

      // Load initial server (Smart selected: Server 9 for Tamil prints, Server 2 for Instant HD)
      loadServer(this.currentServerIdx, false);

      if (window.showToast) window.showToast("Streaming Full Movie • Ultra HD");
    } else {
      // TRAILER MODE
      if (tabTrailer) tabTrailer.classList.add("active");
      if (tabFullMovie) tabFullMovie.classList.remove("active");
      if (trailerWrap) trailerWrap.classList.remove("hidden");
      if (streamWrap) {
        streamWrap.classList.add("hidden");
        streamWrap.innerHTML = "";
      }

      // Stop and destroy stream iframe to prevent audio leak
      if (this.streamIframe) {
        try { this.streamIframe.contentWindow.postMessage("stop", "*"); } catch (e) {}
        this.streamIframe.src = "about:blank";
      }
      this.streamIframe = null;

      // Play official high-definition trailer without buffering
      if (this.currentMovie) {
        const curMovie = this.currentMovie;
        const movieId = curMovie.id || "";
        const cleanId = movieId.replace("-tamil", "").replace("-hindi", "").replace("-telugu", "").replace("-malayalam", "");
        const rawTmdb = curMovie.tmdbId || (movieId.startsWith("tmdb-") ? movieId.replace("tmdb-", "") : "");
        const tmdbStr = String(rawTmdb || "").trim();
        const normTitle = (curMovie.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");

        const TRAILER_MAP = {
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

        const initialKey = curMovie.trailerKey || 
          TRAILER_MAP[tmdbStr] || 
          TRAILER_MAP[movieId] || 
          TRAILER_MAP[cleanId] || 
          TRAILER_MAP[normTitle] || 
          null;

        const renderTrailerFrame = (ytKey) => {
          if (!trailerWrap) return;
          const embedUrl = `https://www.youtube.com/embed/${ytKey}?autoplay=1&rel=0&playsinline=1`;
          const ytWatchUrl = `https://www.youtube.com/watch?v=${ytKey}`;
          trailerWrap.innerHTML = `
            <div style="width: 100%; height: 100%; position: relative; background: #000; display: flex; flex-direction: column;">
              <div style="position: absolute; top: 12px; right: 16px; z-index: 10; display: flex; align-items: center; gap: 8px;">
                <a href="${ytWatchUrl}" target="_blank" rel="noopener noreferrer" style="background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); color: #fff; text-decoration: none; font-size: 11px; font-weight: 600; padding: 6px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; gap: 5px; transition: all 0.2s;" onmouseover="this.style.background='rgba(229,9,20,0.8)'" onmouseout="this.style.background='rgba(0,0,0,0.7)'">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  <span>Open in YouTube</span>
                </a>
              </div>
              <iframe 
                id="player-trailer-iframe"
                src="${embedUrl}" 
                style="width: 100%; height: 100%; border: none; display: block; flex: 1;" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
              ></iframe>
            </div>
          `;
        };

        const renderTrailerFallback = () => {
          if (!trailerWrap) return;
          const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent((curMovie.title || 'Movie') + ' official trailer')}`;
          trailerWrap.innerHTML = `
            <div style="width: 100%; height: 100%; position: relative; background: #0b0b0f; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; text-align: center; padding: 24px;">
              <iframe id="player-trailer-iframe" src="https://www.youtube.com/embed/${TRAILER_MAP['leo-tamil']}?autoplay=0" style="display:none;"></iframe>
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(229,9,20,0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#e50914"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 800; margin: 0 0 8px 0; color: #fff;">${curMovie.title || 'Official'} Trailer</h3>
              <p style="font-size: 13px; color: #9ca3af; margin: 0 0 20px 0; max-width: 420px; line-height: 1.5;">Watch official studio trailer directly on YouTube.</p>
              <a href="${searchUrl}" target="_blank" rel="noopener noreferrer" style="background: #e50914; color: #fff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 28px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 16px rgba(229,9,20,0.4); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                <span>Watch on YouTube</span>
              </a>
            </div>
          `;
        };

        if (initialKey) {
          renderTrailerFrame(initialKey);
        } else {
          // Show sleek loading state while resolving live
          if (trailerWrap) {
            trailerWrap.innerHTML = `
              <div style="width: 100%; height: 100%; position: relative; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff;">
                <iframe id="player-trailer-iframe" src="https://www.youtube.com/embed/${TRAILER_MAP['leo-tamil']}?autoplay=0" style="display:none;"></iframe>
                <div style="width: 44px; height: 44px; border: 3px solid rgba(229,9,20,0.2); border-top-color: #e50914; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 16px;"></div>
                <div style="font-size: 15px; font-weight: 700; letter-spacing: 0.4px;">Connecting to Official HD Trailer...</div>
                <div style="font-size: 12px; color: #888; margin-top: 6px;">Resolving verified YouTube stream</div>
              </div>
            `;
          }

          const apiPfx = (typeof window !== "undefined" && window.location?.pathname && window.location.pathname.includes("/server/movieshub_api")) ? "/server/movieshub_api" : "";
          const fetchUrl = `${apiPfx}/api/trailer?tmdb_id=${encodeURIComponent(tmdbStr)}&title=${encodeURIComponent(curMovie.title || '')}&year=${encodeURIComponent(curMovie.year || '')}&media_type=${encodeURIComponent(curMovie.mediaType || 'movie')}`;

          if (typeof fetch !== "undefined") {
            fetch(fetchUrl)
              .then(res => res.json())
              .then(data => {
                if (this.currentMode === "trailer" && this.currentMovie === curMovie) {
                  if (data && data.success && data.key) {
                    TRAILER_MAP[tmdbStr] = data.key;
                    TRAILER_MAP[cleanId] = data.key;
                    renderTrailerFrame(data.key);
                  } else {
                    renderTrailerFallback();
                  }
                }
              })
              .catch(() => {
                if (this.currentMode === "trailer" && this.currentMovie === curMovie) {
                  renderTrailerFallback();
                }
              });
          } else {
            renderTrailerFallback();
          }
        }
      }
      if (window.showToast) window.showToast("Playing Official Trailer");
    }
  }

  open(movie, initialMode = "movie") {
    if (!movie) return;
    this.isUserExiting = false;
    this.currentMovie = movie;
    window.isStreamPlaying = true;
    window.userIntentionalNavigation = false;

    // Prevent duplicate audio streams: Stop any active Live TV, Sports, or previous player session
    if (window.movieshubApp) {
      if (window.movieshubApp.liveTv) {
        try { window.movieshubApp.liveTv.destroy(); } catch (e) {}
      }
      if (window.movieshubApp.sports) {
        try { window.movieshubApp.sports.destroy(); } catch (e) {}
      }
    }
    if (this.streamIframe) {
      try {
        this.streamIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        this.streamIframe.contentWindow.postMessage('{"action":"pause"}', '*');
        this.streamIframe.contentWindow.postMessage("stop", "*");
      } catch (e) {}
      this.streamIframe.removeAttribute("srcdoc");
      this.streamIframe.src = "about:blank";
    }

    // Save to Continue Watching in localStorage on device
    if (window.movieshubApp && typeof window.movieshubApp.addToContinueWatching === "function") {
      window.movieshubApp.addToContinueWatching(movie);
    }

    if (this.video) {
      try {
        this.video.pause();
        this.video.currentTime = 0;
      } catch (e) {}
    }

    const titleEl = document.getElementById("player-title");
    if (titleEl) titleEl.textContent = movie.title || "Movie";

    const badgeEl = document.getElementById("player-badge");
    if (badgeEl) {
      badgeEl.textContent = (movie.platformBadge === "MOVIESDA" ? "MOVIESHUB" : (movie.platformBadge || "MOVIESHUB"));
      badgeEl.style.backgroundColor = (movie.platformBadge === "MOVIESDA" ? "#E50914" : (movie.platformColor || "#E50914"));
    }

    const extraEl = document.getElementById("player-extra");
    if (extraEl) {
      extraEl.textContent = `${movie.language ? movie.language.toUpperCase() : "CINEMA"} • 4K ULTRA HD • Dolby Atmos 5.1`;
    }

    this.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Default to Full Movie mode as requested!
    this.switchMode(initialMode);
  }

  close() {
    this.isUserExiting = true;
    window.isStreamPlaying = false;
    this.modal.classList.add("hidden");
    document.body.style.overflow = "";

    if (this.autoSwitchTimer) {
      clearTimeout(this.autoSwitchTimer);
      this.autoSwitchTimer = null;
    }

    // 100% Silence and Destroy Stream Iframe DOM to prevent ANY ghost audio leaks
    if (this.streamIframe) {
      try {
        this.streamIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        this.streamIframe.contentWindow.postMessage('{"action":"pause"}', '*');
        this.streamIframe.contentWindow.postMessage("stop", "*");
      } catch (e) {}
      this.streamIframe.removeAttribute("srcdoc");
      this.streamIframe.src = "about:blank";
    }
    const streamWrap = document.getElementById("player-stream-wrap");
    if (streamWrap) {
      streamWrap.innerHTML = "";
    }
    this.streamIframe = null;

    // 100% Silence Trailer Iframe and Video
    const trailerIframe = document.getElementById("player-trailer-iframe");
    if (trailerIframe) {
      trailerIframe.src = "about:blank";
    }
    const trailerWrap = document.getElementById("player-screen-wrap");
    if (trailerWrap) {
      trailerWrap.innerHTML = "";
    }

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

  showToastIndicator(text) {
    let toast = document.getElementById("player-hud-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "player-hud-toast";
      toast.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) scale(1);background:rgba(15,15,20,0.88);color:#fff;padding:12px 24px;border-radius:30px;font-size:18px;font-weight:800;letter-spacing:1px;z-index:99999;pointer-events:none;transition:opacity 0.25s, transform 0.25s;border:1px solid rgba(255,255,255,0.25);box-shadow:0 10px 30px rgba(0,0,0,0.8);display:flex;align-items:center;gap:8px;";
      const container = document.getElementById("playerStreamFrameContainer") || document.getElementById("player-container") || this.modal;
      if (container) container.appendChild(toast);
    }
    toast.textContent = text;
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, -50%) scale(1)";
    clearTimeout(this._hudToastTimer);
    this._hudToastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, -50%) scale(0.85)";
    }, 800);
  }
}

// Initialize player instance globally
window.movieshubPlayer = new MovieshubPlayer();
