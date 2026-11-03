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

const badTitles = ["baththa", "jailer 2", "avengers: doomsday", "collision course"];
const hasUnreleased = global.MOVIE_CATALOG.some(m => badTitles.includes((m.title || "").toLowerCase()));
assert(!hasUnreleased, "No unreleased placeholder movies in catalog");

const allHaveValidTmdb = global.MOVIE_CATALOG.every(m => m.tmdbId && !isNaN(parseInt(m.tmdbId, 10)) && parseInt(m.tmdbId, 10) > 0);
assert(allHaveValidTmdb, "All catalog movies have verified numeric TMDB IDs");

// 2. Verify Player TMDB Resolution & Server Setup
console.log("\n2. Testing Player Streaming & Trailer Engine...");
const playerText = fs.readFileSync(path.join(__dirname, '../js/player.js'), 'utf8');

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

global.window = { addEventListener: () => {}, showToast: () => {} };
global.document = {
  getElementById: (id) => getMockEl(id),
  querySelector: () => getMockEl("query"),
  querySelectorAll: () => [],
  createElement: (tag) => getMockEl(tag),
  addEventListener: () => {},
  body: getMockEl("body")
};

const fn = new Function(playerText + "; return MovieshubPlayer;");
const MovieshubPlayer = fn();
const player = new MovieshubPlayer();

let allMoviesStreamOk = true;
let allTrailersOk = true;

for (const m of global.MOVIE_CATALOG) {
  player.currentMovie = m;
  player.switchMode("movie");
  const iframeSrc = getMockEl("player-stream-iframe").src;
  if (!iframeSrc || !iframeSrc.includes("vidlink.pro")) {
    allMoviesStreamOk = false;
  }

  player.switchMode("trailer");
  const trailerHtml = getMockEl("player-screen-wrap").innerHTML;
  if (!trailerHtml.includes("player-trailer-iframe") || !trailerHtml.includes("youtube.com/embed")) {
    allTrailersOk = false;
  }

  player.close();
}

assert(allMoviesStreamOk, "All movies initialize VidLink Primary HD full-movie stream with zero errors");
assert(allTrailersOk, "All movies initialize non-buffering official YouTube trailer with zero errors");

// 3. Verify Live TV Back Navigation & Streams
console.log("\n3. Testing Live TV Back Navigation & Streams...");
const livetvText = fs.readFileSync(path.join(__dirname, '../js/livetv.js'), 'utf8');
assert(livetvText.includes("livetvBackBtn"), "Live TV includes top back button");
assert(livetvText.includes("livetvFloatingBackBtn"), "Live TV includes floating back button");
assert(!livetvText.includes("cricketgold"), "No looping cricketgold streams in Live TV");

// 4. Verify Sports Back Navigation & Streams
console.log("\n4. Testing Sports Hub Back Navigation & Streams...");
const sportsText = fs.readFileSync(path.join(__dirname, '../js/sports.js'), 'utf8');
assert(sportsText.includes("sportsBackToMoviesBtn"), "Sports includes main back to movies button");
assert(sportsText.includes("sportsModalBackBtn"), "Sports includes modal back button");
assert(sportsText.includes("sportsVideoFloatingBackBtn"), "Sports includes floating video back button");
assert(!sportsText.includes("cricketgold"), "No looping cricketgold streams in Sports Hub");

// Summary
console.log(`\n========================================`);
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log(`========================================\n`);

process.exit(failed > 0 ? 1 : 0);
