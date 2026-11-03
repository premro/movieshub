# OOT🎬

A modern, high-performance streaming web portal inspired by **netmirror.plus**. NetMirror aggregates and organizes premium movies and television series from major OTT platforms (Netflix, Amazon Prime Video, HBO Max, Disney+, Apple TV+, Paramount+) in a sleek, cinematic interface with advanced search and full theater playback controls.

---

## 🌟 Key Features

### 1. Advanced Search Engine
- **Instant debounced search** across titles, actors, directors, genres, platforms, and release years.
- **Search suggestions & history** with 1-click recent queries and trending tags.
- **Result filters** to narrow searches by *All*, *Movies*, *TV Shows*, *4K UHD*, and *IMDb 8.5+*.
- **Keyword highlighting** and keyboard navigation (`/` or `Cmd+K` to search, `Esc` to close).

### 2. Modern Cinematic UI (Netflix / OTT Style)
- **Glassmorphic navigation bar** with dynamic scroll effects and channel badges.
- **Dynamic Hero Billboard** with auto-rotating featured blockbusters, video backdrops, and direct action triggers.
- **OTT Hub Switcher** to quickly browse content by network: *Netflix*, *Prime Video*, *HBO Max*, *Disney+*, *Apple TV+*, *Paramount+*.
- **Horizontal Carousels** with smooth scrolling and **Top 10 Today** authentic numbered badges (1 to 10).
- **Interactive Hover Preview Cards** with micro-actions (Play Now, Add to My List, Like/Dislike, More Info).

### 3. Full Theater Mode Video Player
- Custom responsive HTML5 video player with ambient backdrop.
- **Resolution switcher**: 4K Ultra HD (2160p), 1080p, 720p, and Auto.
- **Audio & Subtitle selector** with multi-language channels (English, Spanish, Hindi, French, German) and live closed captioning overlay.
- **Scrubber timeline** with hover timestamps, buffered indicator, and resume progress tracking via `localStorage`.
- Fullscreen and trailer preview toggles.

### 4. Interactive Detail Modal & Episodes Guide
- Comprehensive overview drawer with synopsis, cast member chips (clickable to trigger actor search), and direct recommendations (*More Like This*).
- **TV Series Guide** with season dropdown and clickable episode lists.

---

## 🚀 Running on Localhost

Start the local Python server:

```bash
cd NetMirror
python3 server.py
```

Then open your browser at:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 📁 Project Structure

```
NetMirror/
├── index.html          # Main HTML5 layout and glassmorphism interface
├── css/
│   └── styles.css      # Netflix-inspired dark theme and theater styles
├── js/
│   ├── catalog.js      # Curated database of 60+ movies & TV series
│   ├── search.js       # Debounced multi-attribute search engine
│   ├── player.js       # Custom video player & quality controller
│   └── app.js          # App lifecycle, carousels, modals & state
├── server.py           # Lightweight Python HTTP & REST API server
└── README.md           # Documentation
```
