/**
 * Movieshub Live Search Engine
 * Instant debounced multi-field matching with Stream Engine live search integration
 * Works on Localhost & Zoho Catalyst • Zero Ads • Instant Playback
 */

class MovieshubSearchEngine {
  constructor(catalog) {
    this.catalog = catalog || [];
    this.historyKey = "movieshub_recent_searches";
    this.history = this.loadHistory();
    this._searchTimer = null;
    this.isSearchingRemote = false;
  }

  loadHistory() {
    try {
      const stored = localStorage.getItem(this.historyKey);
      return stored ? JSON.parse(stored) : ["Scene", "Amaran", "Leo", "GOAT", "Dune", "Tamil", "Action", "4K"];
    } catch (e) {
      return ["Scene", "Amaran", "Leo", "Dune"];
    }
  }

  saveHistory(query) {
    if (!query || query.trim().length < 2) return;
    const clean = query.trim();
    this.history = [clean, ...this.history.filter(h => h.toLowerCase() !== clean.toLowerCase())].slice(0, 10);
    try {
      localStorage.setItem(this.historyKey, JSON.stringify(this.history));
    } catch (e) {}
  }

  clearHistory() {
    this.history = [];
    try {
      localStorage.removeItem(this.historyKey);
    } catch (e) {}
  }

  /**
   * Search through catalog locally
   * @param {string} rawQuery
   * @param {string} selectedLanguage (e.g. "all", "tamil", "english", etc.)
   * @returns {Array} Matching movie objects
   */
  search(rawQuery, selectedLanguage = "all") {
    let items = this.catalog;

    // Filter by language if specified and not "all"
    if (selectedLanguage && selectedLanguage.toLowerCase() !== "all") {
      items = items.filter(m => (m.language || "").toLowerCase() === selectedLanguage.toLowerCase());
    }

    if (!rawQuery || !rawQuery.trim()) {
      return items;
    }

    const tokens = rawQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);

    const scored = [];
    for (const movie of items) {
      const title = (movie.title || "").toLowerCase();
      const normTitle = title.replace(/[.\-_]/g, "");
      const nativeTitle = (movie.nativeTitle || "").toLowerCase();
      const id = (movie.id || "").toLowerCase();
      const language = (movie.language || "").toLowerCase();
      const overview = (movie.overview || "").toLowerCase();
      const director = (movie.director || "").toLowerCase();
      const music = (movie.music || "").toLowerCase();
      const cast = (movie.cast || []).join(" ").toLowerCase();
      const genres = (movie.genres || []).join(" ").toLowerCase();
      const platform = (movie.platform || "").toLowerCase();
      const year = String(movie.year || "");

      let score = 0;
      let matchedAll = true;

      for (const token of tokens) {
        const cleanTok = token.replace(/[.\-_]/g, "");
        let tokenScore = 0;

        if (title.startsWith(token) || (cleanTok && normTitle.startsWith(cleanTok))) {
          tokenScore += 60;
        } else if (title.includes(token) || (cleanTok && normTitle.includes(cleanTok))) {
          tokenScore += 35;
        }

        if (nativeTitle.includes(token)) tokenScore += 40;
        if (id.includes(token) || (cleanTok && id.includes(cleanTok))) tokenScore += 30;

        if (cast.includes(token)) tokenScore += 25;
        if (director.includes(token)) tokenScore += 20;
        if (music.includes(token)) tokenScore += 18;
        if (language.includes(token)) tokenScore += 25;
        if (genres.includes(token)) tokenScore += 15;
        if (platform.includes(token)) tokenScore += 10;
        if (year.includes(token)) tokenScore += 10;
        if (overview.includes(token)) tokenScore += 5;

        if (tokenScore === 0) {
          matchedAll = false;
          break;
        }
        score += tokenScore;
      }

      if (matchedAll && score > 0) {
        scored.push({ movie, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => s.movie);
  }

  /**
   * Live Search combining instant local results with backend Stream Engine/TMDB database search
   */
  searchLive(rawQuery, selectedLanguage = "all", onUpdate = null) {
    // 1. Instant local search response
    const localMatches = this.search(rawQuery, selectedLanguage);
    if (onUpdate) {
      onUpdate(localMatches, false); // false = initial local results
    }

    if (!rawQuery || rawQuery.trim().length < 2) {
      this.isSearchingRemote = false;
      return Promise.resolve(localMatches);
    }

    // 2. Query server for full movie database (Netmirror + TMDB)
    clearTimeout(this._searchTimer);
    this.isSearchingRemote = true;

    return new Promise((resolve) => {
      this._searchTimer = setTimeout(async () => {
        try {
          const pfx = (typeof window !== "undefined" && window.API_PREFIX) || "";
          const searchUrl = `${pfx}/api/search?q=${encodeURIComponent(rawQuery.trim())}&lang=${encodeURIComponent(selectedLanguage || "all")}`;
          
          const res = await fetch(searchUrl);
          if (!res.ok) {
            this.isSearchingRemote = false;
            return resolve(localMatches);
          }
          const data = await res.json();
          const remoteResults = data.results || [];

          // Deduplicate and merge
          const seen = new Set();
          const merged = [];

          // Local matches first
          for (const m of localMatches) {
            const key = (m.id || m.title || "").toLowerCase();
            seen.add(key);
            merged.push(m);
          }

          // Add remote matches (Preserve all multi-language dubs: Tamil, Telugu, Hindi, Malayalam, etc.)
          for (const m of remoteResults) {
            const key = (m.id || m.title || "").toLowerCase();
            if (!seen.has(key)) {
              seen.add(key);
              if (m.poster && m.poster.startsWith("/api/") && pfx) {
                m.poster = pfx + m.poster;
              }
              if (m.backdrop && m.backdrop.startsWith("/api/") && pfx) {
                m.backdrop = pfx + m.backdrop;
              }
              // Register in catalog if not present
              if (!this.catalog.some(c => c.id === m.id || (c.title && c.title.toLowerCase() === m.title.toLowerCase()))) {
                this.catalog.push(m);
              }
              merged.push(m);
            }
          }

          this.isSearchingRemote = false;
          if (onUpdate) {
            onUpdate(merged, true); // true = complete live results
          }
          resolve(merged);
        } catch (e) {
          // search handled silently
          this.isSearchingRemote = false;
          resolve(localMatches);
        }
      }, 150);
    });
  }

  highlightMatch(text, query) {
    if (!query || !text) return text;
    const tokens = query.trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return text;

    const pattern = new RegExp(`(${tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    return text.replace(pattern, "<mark class=\"search-highlight\">$1</mark>");
  }
}
