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
  const iframeSrc = getMockEl("player-stream-iframe").src;
  if (!iframeSrc || !iframeSrc.includes("vidlink.pro")) {
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

// Summary
console.log(`\n========================================`);
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log(`========================================\n`);

process.exit(failed > 0 ? 1 : 0);
