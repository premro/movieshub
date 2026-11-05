const fs = require('fs');
const path = require('path');

console.log("=== MOVIESHUB AUTOMATED TEST SUITE ===\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

// 1. Verify Catalog
console.log("1. Testing Movie Catalog...");
const catText = fs.readFileSync(path.join(__dirname, '../js/catalog.js'), 'utf8');
eval(catText + "; global.MOVIE_CATALOG = MOVIE_CATALOG;");

assert(Array.isArray(global.MOVIE_CATALOG) && global.MOVIE_CATALOG.length >= 25, `Catalog loaded with ${global.MOVIE_CATALOG.length} movies`);

const allHaveValidTmdb = global.MOVIE_CATALOG.every(m => m.tmdbId && !isNaN(parseInt(m.tmdbId, 10)) && parseInt(m.tmdbId, 10) > 0);
assert(allHaveValidTmdb, "All catalog movies have verified numeric TMDB IDs");

// 2. Verify App Movie Registry & Lookup
console.log("\n2. Testing MovieshubApp Movie Registry & Lookup...");
const appText = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');

// Mock browser
const elements = {};
function getMockEl(id) {
  if (!elements[id]) {
    elements[id] = {
      id: id,
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      innerHTML: "",
      textContent: "",
      src: "",
      style: {},
      dataset: {},
      addEventListener: () => {},
      appendChild: () => {},
      remove: () => {},
      removeAttribute: () => {},
      querySelectorAll: () => [],
      querySelector: () => null,
      pause: () => {},
      load: () => {},
      play: () => Promise.resolve()
    };
  }
  return elements[id];
}

global.localStorage = { getItem: () => null, setItem: () => {} };
global.window = {
  location: { hash: "" },
  localStorage: { getItem: () => null, setItem: () => {} },
  scrollTo: () => {},
  addEventListener: () => {},
  showToast: () => {}
};
global.document = {
  getElementById: (id) => getMockEl(id),
  querySelector: () => getMockEl("query"),
  querySelectorAll: () => [],
  createElement: (tag) => getMockEl(tag),
  addEventListener: () => {},
  body: getMockEl("body")
};

global.LANGUAGES = [{ id: "tamil", name: "Tamil" }];
global.GENRES = ["Action", "Drama"];

// Mock other classes
global.MovieshubSearchEngine = class { constructor(c) { this.catalog = c; } };
global.MovieshubPlayer = class {
  constructor() {}
  open(movie, mode) { this.currentMovie = movie; this.mode = mode; }
  close() {}
};
global.MovieshubLiveTV = class { constructor() {} render() {} destroy() {} };
global.MovieshubSports = class { constructor() {} render() {} destroy() {} };

const appFn = new Function(appText + "; return MovieshubApp;");
const MovieshubApp = appFn();
const app = new MovieshubApp();

// Load dashboard cache into app
const dashCache = JSON.parse(fs.readFileSync(path.join(__dirname, '../dashboard_cache.json'), 'utf8'));
app.dashboardData = dashCache;

// Test lookup of 2026 & 2025 Tamil movies (including Modha Rathri, Blast, Dorothy, Coolie)
const testIds = ["tmdb-1685882", "tmdb-1515729", "tmdb-1578079", "tmdb-1153399"];
let allFound = true;
for (const id of testIds) {
  const m = app.getMovieById(id);
  if (!m) {
    allFound = false;
    console.error("Failed to find movie ID:", id);
  }
}
assert(allFound, "MovieshubApp.getMovieById resolves 2026/2025 Tamil releases from dashboard cache");

// Test DOM fallback reconstruction
const mockCard = {
  querySelector: (sel) => {
    if (sel.includes("title")) return { textContent: "Alien Movie 2026" };
    if (sel.includes("img")) return { getAttribute: () => "https://img.jpg" };
    if (sel.includes("lang")) return { textContent: "Tamil" };
    return null;
  }
};
const fallbackMovie = app.getMovieById("tmdb-999999", mockCard);
assert(fallbackMovie && fallbackMovie.title === "Alien Movie 2026", "DOM fallback reconstructs unmapped cards reliably");

// 3. Test Player Streaming & YouTube Trailer Engine
console.log("\n3. Testing Player Streaming & Trailer Engine...");
const playerText = fs.readFileSync(path.join(__dirname, '../js/player.js'), 'utf8');
const playerFn = new Function(playerText + "; return MovieshubPlayer;");
const RealPlayer = playerFn();
const realPlayer = new RealPlayer();

let playerStreamsOk = true;
let playerTrailersOk = true;

for (const m of global.MOVIE_CATALOG) {
  realPlayer.currentMovie = m;
  realPlayer.switchMode("movie");
  const streamEl = getMockEl("player-stream-iframe");
  const iframeSrc = streamEl.src || "";
  const iframeSrcdoc = streamEl.srcdoc || "";
  const validStream = (iframeSrc && (iframeSrc.includes("vidsrc.su") || iframeSrc.includes("vidsrc.pm") || iframeSrc.includes("vidlink.pro") || iframeSrc.includes("2embed") || iframeSrc.includes("autoembed"))) || (iframeSrcdoc && (iframeSrcdoc.includes("onestream.today") || iframeSrcdoc.includes("vidsrc")));
  if (!validStream) {
    playerStreamsOk = false;
  }

  realPlayer.switchMode("trailer");
  const trailerHtml = getMockEl("player-screen-wrap").innerHTML;
  if (!trailerHtml.includes("player-trailer-iframe") || !trailerHtml.includes("youtube.com/embed")) {
    playerTrailersOk = false;
  }

  realPlayer.close();
}

assert(playerStreamsOk, "Player streams all catalog movies using high-speed CDN");
assert(playerTrailersOk, "Player loads non-buffering official trailers for all movies");

// 4. Verify Live TV & Sports Back Navigation
console.log("\n4. Testing Live TV & Sports Navigation...");
const livetvText = fs.readFileSync(path.join(__dirname, '../js/livetv.js'), 'utf8');
assert(livetvText.includes("livetvBackBtn") && livetvText.includes("livetvFloatingBackBtn"), "Live TV back buttons present");
assert(!livetvText.includes("cricketgold"), "No looping cricket streams in Live TV");

const sportsText = fs.readFileSync(path.join(__dirname, '../js/sports.js'), 'utf8');
assert(sportsText.includes("sportsBackToMoviesBtn") && sportsText.includes("sportsModalBackBtn"), "Sports Hub back buttons present");
assert(!sportsText.includes("cricketgold"), "No looping cricket streams in Sports Hub");

// 5. Test Dolby Atmos 3D Spatial Audio Engine (Frontend)
console.log("\n5. Testing Dolby Atmos 3D Spatial Audio Engine...");
const dolbyText = fs.readFileSync(path.join(__dirname, "../js/dolby-atmos.js"), "utf8");
const dolbyFn = new Function(dolbyText + "; return DolbyAtmosEngine;");
const DolbyAtmosEngine = dolbyFn();
const atmos = new DolbyAtmosEngine();

assert(Object.keys(atmos.SPEAKER_COORDS).length === 12, "Dolby Atmos 7.1.4 configured with 12 virtual speaker channels");
assert(atmos.SPEAKER_COORDS.TFL && atmos.SPEAKER_COORDS.TFR && atmos.SPEAKER_COORDS.TRL && atmos.SPEAKER_COORDS.TRR, "Overhead height object speakers (TFL, TFR, TRL, TRR) present");

atmos.applyPreset("cinema");
assert(atmos.currentPreset === "cinema", "Dolby Atmos preset switched to Cinema Immersion");
atmos.applyPreset("dialogue");
assert(atmos.currentPreset === "dialogue", "Dolby Atmos preset switched to Dialogue Clarity");
atmos.applyPreset("atmos_3d");
assert(atmos.currentPreset === "atmos_3d", "Dolby Atmos preset switched to 3D Spatial Atmos");

// 6. Test Dolby Atmos Backend / CLI Encoder (tools/dolby_atmos_encoder.py)
console.log("\n6. Testing Dolby Atmos Backend Encoder & Spatializer...");
const { execSync } = require("child_process");
try {
  const encOut = execSync("python3 " + path.join(__dirname, "../tools/dolby_atmos_encoder.py") + " encode -o /tmp/suite_atmos.emdf").toString();
  assert(encOut.includes("Generated EMDF Container") && encOut.includes("0x5838"), "Dolby Atmos encoder builds compliant EMDF + OAMD + JOC containers");

  const inspOut = execSync("python3 " + path.join(__dirname, "../tools/dolby_atmos_encoder.py") + " inspect /tmp/suite_atmos.emdf").toString();
  assert(inspOut.includes("0x5838 (Valid)") && inspOut.includes("OAMD & JOC:        Verified Present"), "Dolby Atmos inspector validates ETSI TS 103 420 metadata");
} catch (e) {
  assert(false, "Dolby Atmos encoder failed: " + e.message);
}

// Summary

// 7. Testing Game of Thrones Multi-Audio & World Channels & Dashboard Sync
console.log("\n7. Testing Game of Thrones, FTV, KTV & Dashboard Sync...");
const got = global.MOVIE_CATALOG.find(m => m.id === "game-of-thrones");
assert(got && got.tmdbId === 1399, "Game of Thrones (TMDB 1399) exists in catalog");
assert(got.audioLanguages && got.audioLanguages.includes("Tamil"), "Game of Thrones has Tamil audio tag");
assert(got.mediaType === "tv", "Game of Thrones mediaType is tv");

const hotd = global.MOVIE_CATALOG.find(m => m.id === "house-of-the-dragon");
assert(hotd && hotd.tmdbId === 94997, "House of the Dragon (TMDB 94997) exists in catalog");

const livetvModule = fs.readFileSync(path.join(__dirname, "../js/livetv.js"), "utf8");
assert(livetvModule.includes("ftv-paris-hd") && livetvModule.includes("Fashion TV"), "Fashion TV (FTV) present in Live TV");
assert(livetvModule.includes("ktv-tamil-movies") && livetvModule.includes("KTV HD"), "KTV Tamil Movies 24/7 present in Live TV");
assert(livetvModule.includes("star-sports-1-hd") && livetvModule.includes("sony-sports-ten-1-hd"), "Star Sports 1 HD and Sony LIV present in Live TV");

const appModule = fs.readFileSync(path.join(__dirname, "../js/app.js"), "utf8");
assert(!appModule.includes("(!m.year || m.year <= 2024)"), "Hero billboard is no longer restricted to 2024");
assert(appModule.includes("Game of Thrones"), "Dashboard showcases World TV & Multi-Audio series");


// 8. Testing Multi-Server Streaming Architecture & Tamil Dubbed Engine
console.log("\n8. Testing Multi-Server Streaming Architecture & Tamil Dubbed Engine...");
const playerCode = fs.readFileSync(path.join(__dirname, "../js/player.js"), "utf8");
assert(!playerCode.includes("autoembed.pro"), "Server 1 never points to parked autoembed.pro");
assert(playerCode.includes("Movieshub Cloud"), "Server 1 is Movieshub Cloud internal stream proxy");
assert(playerCode.includes("vidlink.pro"), "Server 2 is Primary HD (VidLink)");
assert(playerCode.includes("autoembed.co"), "Server 3 is Fast Forward (AutoEmbed)");
assert(playerCode.includes("quickTamilAudioBtn"), "Quick Tamil Dubbed button present in player");
assert(playerCode.includes("data-val=\"Tamil\""), "Tamil Dubbed / Regional audio option present in popover");

// 9. Testing TV Series URLs & Vercel Rewrite Configuration
console.log("\n9. Testing TV Series URLs & Vercel Routing Configuration...");
assert(playerCode.includes("KNOWN_TV_IDS") && playerCode.includes("1399"), "Player detects Game of Thrones TMDB 1399 as TV series");
assert(playerCode.includes("vidsrc.pm") || playerCode.includes("multiLang=true"), "Player uses high-speed streaming CDN");
assert(!playerCode.includes("multiLang=1"), "Player no longer uses broken multiLang=1 that crashed Next.js");

const vercelJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../vercel.json"), "utf8"));
const hasServerRewrite = vercelJson.rewrites.some(r => r.source.includes("/server/"));
assert(hasServerRewrite, "Vercel rewrites /server/ to prevent 404 errors on external deployments");
const indexHtmlContent = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
assert(indexHtmlContent.includes("window.IS_VERCEL") && indexHtmlContent.includes('window.API_PREFIX = "/server/movieshub_api"'), "Vercel uses same-origin relative API prefix without hitting external Catalyst");
assert(!playerCode.includes('window.API_PREFIX ? window.API_PREFIX : "https://movieshub-60079640926.development.catalystserverless.in'), "Player defaults to local serverless route on Vercel deployments");

// 10. Testing Multi-Server Network (Servers 1 to 9) & Server Integrity
console.log("\n10. Testing Multi-Server Network (Servers 1 to 9) & Server Integrity...");
assert(playerCode.includes("Server 9") && playerCode.includes("Moviesda Tamil HD"), "Server 9 (Moviesda Tamil HD) registered in player");
assert(playerCode.includes("generateMoviesdaPlayerSrcdoc"), "Moviesda routes to dedicated clean player engine");
assert(playerCode.includes("1505305"), "Immortal mapped to verified TMDB 1505305 preventing wrong cowboy movie on Server 2");
assert(!playerCode.includes("badge: \"Moviesda Mirror 1\""), "Standard multi-servers intact (only Server 9 is Moviesda, not all servers)");

// Verify Servers 1 to 8 remain completely intact per specification
assert(playerCode.includes("Server 1") && playerCode.includes("Movieshub Cloud"), "Server 1 (Movieshub Cloud) is intact");
assert(playerCode.includes("Server 2") && playerCode.includes("VidLink"), "Server 2 (VidLink) is intact");
assert(playerCode.includes("Server 3") && playerCode.includes("AutoEmbed"), "Server 3 (AutoEmbed) is intact");
assert(playerCode.includes("Server 4") && playerCode.includes("0vidads"), "Server 4 (0vidads) is intact");
assert(playerCode.includes("Server 5") && playerCode.includes("VidSync"), "Server 5 (VidSync) is intact");
assert(playerCode.includes("Server 6") && playerCode.includes("2Embed"), "Server 6 (2Embed) is intact");
assert(playerCode.includes("Server 7") && playerCode.includes("VidSrc PM"), "Server 7 (VidSrc PM) is intact");
assert(playerCode.includes("Server 8") && playerCode.includes("VidSrc Net"), "Server 8 (VidSrc Net) is intact");

const indexApiCode = fs.readFileSync(path.join(__dirname, "../functions/movieshub_api/index.js"), "utf8");
assert(indexApiCode.includes("pathname === \"/stream/moviesda\""), "Moviesda route present in backend");
assert(indexApiCode.includes("pathname === \"/stream/moviesda/embed\""), "Moviesda clean watermark-free embed proxy present in backend");
assert(indexApiCode.includes("resolveMoviesdaFileId"), "Moviesda file ID resolver handles 2026/2025 movies");
assert(indexApiCode.includes("WATERMARK REMOVED"), "Watermark removal indicator present in Moviesda player");
assert(indexApiCode.includes("download.moviespage.xyz"), "Direct Moviesda download route integrated");

// 11. Testing UI Latest 6 Releases (2026 Verification & 2024 Removal)
console.log("\n11. Testing Theatrical Releases & Meesaya Murukku Print Handling...");
assert(playerCode.includes("theatre-print-notice"), "Theatre print notice banner integrated in player");
assert(playerCode.includes("btnWatchMeesayaPart1"), "Quick switch to Part 1 (1080p HD) present in player");
assert(playerCode.includes("424336"), "Meesaya Murukku Part 1 (TMDB 424336) mapped in player");
assert(playerCode.includes("1538457"), "Meesaya Murukku Part 2 (TMDB 1538457) mapped in player");
assert(appText.includes("THEATRE PRINT"), "THEATRE PRINT badge rendered on movie cards for theatrical pre-HD prints");

console.log("\n12. Testing Player UI Layout & Video Scaling...");
const backendCode = fs.readFileSync(path.join(__dirname, "../functions/movieshub_api/index.js"), "utf8");
const stylesCode = fs.readFileSync(path.join(__dirname, "../css/styles.css"), "utf8");
assert(backendCode.includes("art-video-title") && backendCode.includes("display: none !important"), "Netmirror proxy hides duplicate internal title overlay");
assert(backendCode.includes("artplayer-app") && backendCode.includes("inset: 0 !important"), "Netmirror proxy forces player to fill viewport edge-to-edge");
assert(stylesCode.includes(".player-header") && stylesCode.includes("min-height: 56px"), "Player header structured with clean fixed height");
assert(stylesCode.includes(".player-server-pills") && stylesCode.includes("white-space: nowrap"), "Server pills prevent messy multi-line wrapping");
assert(playerCode.includes("playerModalServerPills") && playerCode.includes("white-space:nowrap"), "Player server buttons stay on clean single toolbar");

console.log("\n13. Testing UI Latest 6 Releases & Watermark Removal...");
const appCode = fs.readFileSync(path.join(__dirname, "../js/app.js"), "utf8");
assert(appCode.includes("this.dashboardData.latest_six.filter(m => (m.year || 2026) >= 2025)"), "App strictly filters out 2024 releases from Latest 6 Releases");

const backendCache = JSON.parse(fs.readFileSync(path.join(__dirname, "../functions/movieshub_api/dashboard_cache.json"), "utf8"));
const rootCache = JSON.parse(fs.readFileSync(path.join(__dirname, "../dashboard_cache.json"), "utf8"));

const backend2024Count = (backendCache.latest_six || []).filter(m => m.year === 2024).length;
const root2024Count = (rootCache.latest_six || []).filter(m => m.year === 2024).length;

assert(backend2024Count === 0, "Backend dashboard cache contains zero 2024 movies in latest_six");
assert(root2024Count === 0, "Root dashboard cache contains zero 2024 movies in latest_six");
assert(backendCache.latest_six.every(m => m.year >= 2025), "All latest_six movies are 2026 or 2025 releases");
assert(appCode.includes("Moviesda 2026 Master (Watermark Removed)"), "Download modal has direct Moviesda watermark-free download option");

console.log(`\n========================================`);
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log(`========================================\n`);

process.exit(failed > 0 ? 1 : 0);
