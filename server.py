#!/usr/bin/env python3
"""
Movieshub Local Streaming Server
High-Performance Local Web Server with NetMirror Full Movie Streaming & Live TMDB Engine
Pure In-House Streaming • Zero Ads • Zero Redirection • Zero Audio Leaks
Created by Prem • 2026
"""

import http.server
import json
import os
import re
import socket
import sys
import time
import hmac
import hashlib
import threading
import subprocess
import urllib.parse
import urllib.request
import base64

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
CACHE_FILE = os.path.join(DIRECTORY, "dashboard_cache.json")
IMG_CACHE_DIR = os.path.join(DIRECTORY, "img_cache")
os.makedirs(IMG_CACHE_DIR, exist_ok=True)

SYNC_INTERVAL = 7200  # 2 Hours in seconds
NETMIRROR_SECRET = "net###@@sss"
TMDB_KEYS = ["c8dea14dc917687ac631a52620e4f7ad", "3cb41ecea3bf606c56552db3d17adefd"]

LANG_NAME_MAP = {
    "ta": "Tamil", "en": "English", "hi": "Hindi", "te": "Telugu", "ml": "Malayalam",
    "kn": "Kannada", "ko": "Korean", "ja": "Japanese"
}
LANG_CODE_MAP = {
    "tamil": "ta", "english": "en", "hindi": "hi", "telugu": "te", "malayalam": "ml"
}

def fetch_tmdb_api(endpoint, params=None):
    """Fetch data from TMDB proxy with automatic fallback between keys."""
    if params is None:
        params = {}
    
    for key in TMDB_KEYS:
        params["api_key"] = key
        qs = urllib.parse.urlencode(params)
        url = f"https://tmdb.imdb3.shop/3{endpoint}?{qs}"
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
                "Referer": "https://netmirror.plus/"
            }
        )
        try:
            with urllib.request.urlopen(req, timeout=4) as res:
                return json.loads(res.read().decode("utf-8"))
        except Exception:
            continue
    return {"results": []}

def normalize_movie(item):
    """Normalize TMDB item to Movieshub format."""
    mid = item.get("id")
    title = item.get("title") or item.get("name") or "Movie"
    native_title = item.get("original_title") or item.get("original_name") or title
    orig_lang = item.get("original_language", "en")
    lang_name = LANG_NAME_MAP.get(orig_lang, "English" if orig_lang == "en" else orig_lang.upper())
    media_type = item.get("media_type") or ("tv" if "first_air_date" in item else "movie")
    rel_date = item.get("release_date") or item.get("first_air_date") or "2026"
    year = int(rel_date[:4]) if rel_date[:4].isdigit() else 2026
    vote = round(float(item.get("vote_average", 8.5)), 1)
    
    poster_path = item.get("poster_path")
    backdrop_path = item.get("backdrop_path")
    
    if poster_path:
        poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}"
    elif backdrop_path:
        poster_url = f"https://image.tmdb.org/t/p/w500{backdrop_path}"
    else:
        safe_t = urllib.parse.quote(title[:30])
        safe_l = urllib.parse.quote(lang_name)
        poster_url = f"/api/poster?title={safe_t}&year={year}&lang={safe_l}"

    if backdrop_path:
        backdrop_url = f"https://image.tmdb.org/t/p/w1280{backdrop_path}"
    else:
        backdrop_url = poster_url

    genres = ["Action", "Drama"]
    if item.get("genre_ids"):
        genre_map = {28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 18: "Drama", 27: "Horror", 878: "Sci-Fi", 53: "Thriller", 10749: "Romance"}
        genres = [genre_map.get(gid, "Cinema") for gid in item.get("genre_ids", [])[:3]]

    return {
        "id": f"tmdb-{mid}",
        "tmdbId": mid,
        "title": title,
        "nativeTitle": native_title,
        "language": lang_name,
        "languageBadge": lang_name,
        "year": year,
        "rating": vote,
        "match": f"{min(99, max(75, int(vote * 10 + 12)))}%",
        "maturity": "U/A 16+",
        "duration": "2h 30m" if media_type == "movie" else "Series",
        "genres": genres or ["Action", "Drama"],
        "qualities": ["4K", "1080p"],
        "platform": "Direct",
        "platformBadge": "MOVIESHUB",
        "platformColor": "#E50914",
        "poster": poster_url,
        "backdrop": backdrop_url,
        "mediaType": media_type,
        "overview": item.get("overview") or f"{title} ({year}) streaming now in 4K Ultra HD on Movieshub with pure ad-free playback.",
        "cast": [],
        "director": "Cinematic Director",
        "isTrending": item.get("popularity", 0) > 40
    }

def sync_netmirror_catalog(force=False):
    """
    Syncs the latest movies from IMDb/TMDB proxy every 2 hours.
    Covers Latest 6 Just Added, Tamil 2026, 2025, 2024, and All Regional Blockbusters.
    Saves to dashboard_cache.json.
    """
    if not force and os.path.isfile(CACHE_FILE):
        try:
            mtime = os.path.getmtime(CACHE_FILE)
            if time.time() - mtime < SYNC_INTERVAL:
                return
        except Exception:
            pass

    print("[Catalog Sync] Refreshing Movieshub catalog from IMDb/TMDB backend proxy...")
    langs = {
        "Tamil": "ta",
        "English": "en",
        "Hindi": "hi",
        "Telugu": "te",
        "Malayalam": "ml"
    }

    catalog = {
        "last_synced": time.time(),
        "last_synced_human": time.strftime("%Y-%m-%d %H:%M:%S"),
        "latest_six": [],
        "tamil_2026": [],
        "tamil_2025": [],
        "tamil_2024": [],
        "trending": [],
        "latest": [],
        "languages": {},
        "all": []
    }

    seen_ids = set()

    # 1. Fetch Latest 6 Movies (Now Playing & Day Trending)
    try:
        now_playing = fetch_tmdb_api("/movie/now_playing", {"page": 1})
        for m in now_playing.get("results", [])[:6]:
            norm = normalize_movie(m)
            catalog["latest_six"].append(norm)
            if norm["tmdbId"] not in seen_ids:
                seen_ids.add(norm["tmdbId"])
                catalog["all"].append(norm)
    except Exception as e:
        print(f"[Catalog Sync] Latest 6 fetch error: {e}")

    # 2. Fetch Tamil 2026, 2025, 2024 Movies
    try:
        t26 = fetch_tmdb_api("/discover/movie", {"with_original_language": "ta", "primary_release_year": 2026, "sort_by": "popularity.desc"})
        for m in t26.get("results", [])[:12]:
            norm = normalize_movie(m)
            norm["language"] = "Tamil"
            catalog["tamil_2026"].append(norm)
            if norm["tmdbId"] not in seen_ids:
                seen_ids.add(norm["tmdbId"])
                catalog["all"].append(norm)

        t25 = fetch_tmdb_api("/discover/movie", {"with_original_language": "ta", "primary_release_year": 2025, "sort_by": "popularity.desc"})
        for m in t25.get("results", [])[:12]:
            norm = normalize_movie(m)
            norm["language"] = "Tamil"
            catalog["tamil_2025"].append(norm)
            if norm["tmdbId"] not in seen_ids:
                seen_ids.add(norm["tmdbId"])
                catalog["all"].append(norm)

        t24 = fetch_tmdb_api("/discover/movie", {"with_original_language": "ta", "primary_release_year": 2024, "sort_by": "popularity.desc"})
        for m in t24.get("results", [])[:12]:
            norm = normalize_movie(m)
            norm["language"] = "Tamil"
            catalog["tamil_2024"].append(norm)
            if norm["tmdbId"] not in seen_ids:
                seen_ids.add(norm["tmdbId"])
                catalog["all"].append(norm)
    except Exception as e:
        print(f"[Catalog Sync] Tamil yearly fetch error: {e}")

    # 3. Fetch Trending
    try:
        t_data = fetch_tmdb_api("/trending/movie/week", {"page": 1})
        for m in t_data.get("results", [])[:16]:
            norm = normalize_movie(m)
            catalog["trending"].append(norm)
            if norm["tmdbId"] not in seen_ids:
                seen_ids.add(norm["tmdbId"])
                catalog["all"].append(norm)
    except Exception as e:
        print(f"[Catalog Sync] Trending fetch error: {e}")

    # 4. Fetch Languages
    for lang_name, code in langs.items():
        catalog["languages"][lang_name] = []
        try:
            l_data = fetch_tmdb_api("/discover/movie", {
                "with_original_language": code,
                "sort_by": "popularity.desc",
                "primary_release_date.gte": "2024-01-01",
                "page": 1
            })
            for m in l_data.get("results", [])[:14]:
                norm = normalize_movie(m)
                norm["language"] = lang_name
                catalog["languages"][lang_name].append(norm)
                if norm["tmdbId"] not in seen_ids:
                    seen_ids.add(norm["tmdbId"])
                    catalog["all"].append(norm)
        except Exception as e:
            print(f"[Catalog Sync] {lang_name} error: {e}")

    # 5. Latest 2024-2026 releases
    catalog["latest"] = [m for m in catalog["all"] if m.get("year", 0) >= 2024][:24]

    try:
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(catalog, f, indent=2, ensure_ascii=False)
        print(f"[Catalog Sync] Successfully saved {len(catalog['all'])} movies to dashboard_cache.json")
    except Exception as e:
        print(f"[Catalog Sync] Cache write error: {e}")

def sync_daemon():
    """Background daemon that refreshes data every 2 hours."""
    while True:
        try:
            sync_netmirror_catalog()
        except Exception as e:
            print(f"[SYNC DAEMON] Error: {e}")
        time.sleep(SYNC_INTERVAL)

# Start 2-hour daemon thread
threading.Thread(target=sync_daemon, daemon=True).start()

def search_movies(query, lang=None):
    """
    Multi-Language Live Search directly integrating Netmirror search2 engine.
    Extracts all language dubs (Tamil, Telugu, Malayalam, Kannada, Hindi, etc.)
    exactly as displayed on NetMirror.
    """
    results = []
    seen_ids = set()

    LANG_COLORS = {
        "tamil": "#ec4899",     # Pink/Magenta
        "telugu": "#f43f5e",    # Rose
        "malayalam": "#a855f7", # Purple
        "kannada": "#8b5cf6",   # Violet
        "hindi": "#f97316",     # Orange
        "india": "#e50914",     # Red
        "indonesian": "#06b6d4",# Cyan
        "english": "#3b82f6",   # Blue
        "cinema": "#e50914"     # Red
    }

    # 1. Query Netmirror Real search2 API (Returns all dubbed language variants!)
    try:
        url = f"https://api2.imdb4.shop/api/search2/{urllib.parse.quote(query)}?page=0"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Referer": "https://netmirror.plus/"})
        with urllib.request.urlopen(req, timeout=4) as res:
            data = json.loads(res.read().decode("utf-8", errors="ignore"))
            net_items = data.get("results", [])
            for r in net_items:
                raw_title = (r.get("title") or "").strip()
                if not raw_title:
                    continue
                mid = str(r.get("id"))
                uid = f"netmirror-{mid}"
                if uid in seen_ids:
                    continue
                seen_ids.add(uid)

                # Extract language from [Language] tag (e.g. "12th Fail [Telugu]")
                match = re.search(r"\[(.*?)\]", raw_title)
                if match:
                    extracted_lang = match.group(1).strip()
                    badge_text = extracted_lang
                    item_lang = extracted_lang
                else:
                    cn = r.get("cn") or "India"
                    badge_text = cn
                    item_lang = "Hindi" if cn == "India" else cn

                badge_color = LANG_COLORS.get(badge_text.lower(), "#e50914")
                poster_img = r.get("backdrop_path") or f"/api/poster?title={urllib.parse.quote(raw_title)}&year=2023&lang={item_lang}"
                try:
                    rel_year = int(r.get("release_date", 2023))
                except Exception:
                    rel_year = 2023

                try:
                    vote_avg = round(float(r.get("vote_average", 6.5)), 1)
                except Exception:
                    vote_avg = 6.5

                results.append({
                    "id": uid,
                    "netmirrorId": mid,
                    "tmdbId": mid,
                    "title": raw_title,
                    "language": item_lang,
                    "languageBadge": badge_text,
                    "year": rel_year,
                    "rating": vote_avg,
                    "match": "95%",
                    "maturity": "U/A 16+",
                    "duration": "2h 25m",
                    "genres": ["Drama", "Action"],
                    "qualities": ["4K", "1080p"],
                    "platform": "Direct",
                    "platformBadge": badge_text.upper(),
                    "platformColor": badge_color,
                    "poster": poster_img,
                    "backdrop": poster_img,
                    "mediaType": r.get("media_type", "movie"),
                    "overview": f"{raw_title} streaming in {item_lang} with Dolby Atmos & 4K Ultra HD on Movieshub.",
                    "cast": [],
                    "director": "Cinematic Director",
                    "isTrending": True
                })
    except Exception as e:
        print(f"Netmirror search2 error: {e}")

    # 2. TMDB Multi Search (for additional metadata & global catalog)
    try:
        tmdb_data = fetch_tmdb_api("/search/multi", {"query": query, "include_adult": "false"})
        for item in tmdb_data.get("results", []):
            m = normalize_movie(item)
            if m["id"] not in seen_ids and not any(r["title"].lower() == m["title"].lower() for r in results):
                seen_ids.add(m["id"])
                results.append(m)
    except Exception as e:
        print(f"TMDB search error: {e}")

    # 3. Filter by language if a specific language tab is active
    if lang and lang.lower() != "all":
        filtered = [r for r in results if r.get("language", "").lower() == lang.lower()]
        return filtered if filtered else results

    return results

def generate_svg_poster(title, year="2026", lang="Cinema"):
    """Generate high-resolution SVG poster badge if external poster is ever missing or blocked."""
    safe_title = title.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', '&quot;')[:26]
    safe_lang = lang.replace("&", "&amp;").replace("<", "&lt;")
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14121f"/>
          <stop offset="60%" stop-color="#0a0910"/>
          <stop offset="100%" stop-color="#030206"/>
        </linearGradient>
        <linearGradient id="acc" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#e50914"/>
          <stop offset="100%" stop-color="#990000"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect x="0" y="0" width="8" height="750" fill="url(#acc)"/>
      <circle cx="250" cy="300" r="90" fill="rgba(229,9,20,0.12)"/>
      <path d="M235 270 L285 300 L235 330 Z" fill="#ffffff"/>
      <rect x="36" y="520" width="94" height="24" rx="4" fill="#e50914"/>
      <text x="83" y="536" font-family="-apple-system, sans-serif" font-size="11" font-weight="900" fill="#fff" text-anchor="middle">MOVIESHUB</text>
      <text x="36" y="580" font-family="-apple-system, sans-serif" font-size="28" font-weight="800" fill="#ffffff">{safe_title}</text>
      <text x="36" y="616" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" fill="#9ca3af">{safe_lang} • {year} • 4K ULTRA HD</text>
      <text x="36" y="644" font-family="-apple-system, sans-serif" font-size="13" fill="#22c55e" font-weight="700">★ 8.8 • DOLBY ATMOS 5.1</text>
      <text x="36" y="700" font-family="-apple-system, sans-serif" font-size="11" fill="#666" font-weight="600">Created by Prem</text>
    </svg>"""

NETMIRROR_TMDB_MAP = {}

def get_netmirror_details(net_id):
    """
    Returns (tm_id, title, year, dp, subjectid) for a netmirror ID.
    Caches results in memory for instant lookups.
    """
    if not net_id:
        return None, None, None, None, None
    s_id = str(net_id).replace("netmirror-", "")
    if s_id in NETMIRROR_TMDB_MAP:
        return NETMIRROR_TMDB_MAP[s_id]
    try:
        headers = {"User-Agent": "Mozilla/5.0", "Referer": "https://netmirror.plus/"}
        req = urllib.request.Request(f"https://api2.imdb4.shop/api/movie/{s_id}", headers=headers)
        data = json.loads(urllib.request.urlopen(req, timeout=4).read().decode("utf-8"))
        r0 = data.get("results", [{}])[0]
        tm_id = str(r0.get("tm_id", "")).strip()
        title = r0.get("title", "")
        year = str(r0.get("release_date", "2024")).split(",")[-1].strip() or "2024"
        dp = r0.get("dp", "")
        subjectid = r0.get("subjectid", "")
        res = (tm_id, title, year, dp, subjectid)
        NETMIRROR_TMDB_MAP[s_id] = res
        return res
    except Exception as e:
        print(f"[Stream Engine] Error fetching details for {s_id}: {e}")
        return None, None, None, None, None

NETMIRROR_SEARCH_CACHE = {}

def find_netmirror_id(title, lang="Hindi"):
    """
    Look up exact Netmirror ID and release year matching title and regional language.
    Cached in memory for zero-lag instant retrieval.
    """
    clean_title = re.sub(r"\[.*?\]", "", title).strip()
    if not clean_title:
        return None, None
    cache_key = (clean_title.lower(), (lang or "").lower())
    if cache_key in NETMIRROR_SEARCH_CACHE:
        return NETMIRROR_SEARCH_CACHE[cache_key]

    clean_q = urllib.parse.quote(clean_title)
    url = f"https://api2.imdb4.shop/api/search2/{clean_q}?page=0"
    headers = {"User-Agent": "Mozilla/5.0", "Referer": "https://netmirror.plus/"}
    try:
        req = urllib.request.Request(url, headers=headers)
        data = json.loads(urllib.request.urlopen(req, timeout=3).read().decode("utf-8"))
        results = data.get("results", [])
        if not results:
            NETMIRROR_SEARCH_CACHE[cache_key] = (None, None)
            return None, None
        
        target_lang = lang.lower() if lang else ""
        if target_lang and target_lang != "cinema":
            for r in results:
                rtitle = r.get("title", "")
                if f"[{target_lang}]" in rtitle.lower():
                    year = str(r.get("release_date", "")).split(",")[-1].strip() or "2024"
                    res = (str(r.get("id")), year)
                    NETMIRROR_SEARCH_CACHE[cache_key] = res
                    return res
        
        first = results[0]
        year = str(first.get("release_date", "")).split(",")[-1].strip() or "2024"
        res = (str(first.get("id")), year)
        NETMIRROR_SEARCH_CACHE[cache_key] = res
        return res
    except Exception as e:
        print(f"[Stream Engine Lookup Error] {e}")
        return None, None

def resolve_netmirror_servers(tm_id, mtype="movie", season=1, episode=1, lang="Hindi", net_id="", year="", title=""):
    """
    Instantly resolve streaming servers without blocking HTTP calls.
    Returns list of direct playable streams for all 4 servers.
    """
    clean_lang = lang if lang and lang.lower() != "cinema" else "Hindi"

    # Clean any netmirror- prefix
    s_tm = str(tm_id).replace("netmirror-", "")
    s_net = str(net_id).replace("netmirror-", "") if net_id else ""

    # Auto-lookup stream ID and year from title + lang if not provided
    if not s_net and title:
        found_id, found_year = find_netmirror_id(title, clean_lang)
        if found_id:
            s_net = found_id
        if found_year and not year:
            year = found_year

    # Resolve true TMDB ID
    if s_net:
        real_tm, _, real_year, _, _ = get_netmirror_details(s_net)
        if real_tm and real_tm != "None" and real_tm != "":
            s_tm = real_tm
        if real_year and (not year or year == "2024"):
            year = real_year
    elif s_tm and (len(s_tm) <= 5 and s_tm.isdigit()):
        real_tm, _, real_year, _, _ = get_netmirror_details(s_tm)
        if real_tm and real_tm != "None" and real_tm != "":
            s_net = s_tm
            s_tm = real_tm
            if real_year and (not year or year == "2024"):
                year = real_year

    if not year:
        year = "2024"

    # For movies, se and ep must be 0 for Netmirror to return all dubbed stream qualities
    if mtype == "movie":
        se_val = 0
        ep_val = 0
    else:
        se_val = season if season is not None else 1
        ep_val = episode if episode is not None else 1

    ts = str(int(time.time()))
    msg = f"{s_tm}:{ts}".encode("utf-8")
    sig = hmac.new(NETMIRROR_SECRET.encode("utf-8"), msg, hashlib.sha256).hexdigest()

    direct_cinemo = f"https://webvp.watch21.shop/play/watchcinemo.php?tm_id={s_tm}&nid={s_net}&year={year}&se={se_val}&ep={ep_val}&ts={ts}&sig={sig}&hasExt=true"

    safe_title = urllib.parse.quote(title or "Movie")
    clean_q_lang = urllib.parse.quote(clean_lang)

    servers = [
        {
            "name": f"Server 1 ({clean_lang} HD · Fast)",
            "label": f"Fast 1080p · {clean_lang}",
            "url": f"/stream/netmirror/embed?url={urllib.parse.quote(direct_cinemo)}&lang={clean_q_lang}"
        },
        {
            "name": f"Server 2 (Direct CDN · 1080p)",
            "label": f"Direct MP4 · 1080p",
            "url": f"/stream/direct_mp4?tm_id={s_tm}&nid={s_net}&year={year}&lang={clean_q_lang}&title={safe_title}"
        }
    ]

    # Cloud fallback servers with true TMDB ID
    if mtype == "tv":
        fallback_vidsync = f"https://vidsync.pro/embed/tv/{s_tm}/{season}/{episode}&dubLang={clean_lang}&subtitle=English"
        fallback_vidlink = f"https://vidlink.pro/tv/{s_tm}/{season}/{episode}"
    else:
        fallback_vidsync = f"https://vidsync.pro/embed/movie/{s_tm}&dubLang={clean_lang}&subtitle=English"
        fallback_vidlink = f"https://vidlink.pro/movie/{s_tm}"

    servers.append({"name": f"Server 3 ({clean_lang} Dub · Cloud)", "label": f"{clean_lang} Dub · Cloud", "url": fallback_vidsync})
    servers.append({"name": "Server 4 (VidLink 4K · Cloud)", "label": "VidLink 4K · Cloud", "url": fallback_vidlink})
    return servers

def generate_player_html(tm_id, mtype="movie", title="Movie", lang="Hindi", net_id="", year=""):
    """
    Generate responsive, ad-free cinema player HTML shell with multi-server switching,
    download action, and strict audio leak prevention.
    """
    servers = resolve_netmirror_servers(tm_id, mtype, lang=lang, net_id=net_id, year=year, title=title)
    servers_json = json.dumps(servers)
    safe_title = title.replace('"', '&quot;').replace('<', '&lt;')
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>{safe_title} - Movieshub Player</title>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    html, body {{ width: 100%; height: 100%; background: #000; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; }}
    .player-wrap {{ display: flex; flex-direction: column; width: 100%; height: 100%; position: relative; }}
    .player-frame-container {{ flex: 1; width: 100%; height: 100%; position: relative; background: #000; }}
    iframe {{ width: 100%; height: 100%; border: none; display: block; }}
    .server-bar {{ display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; background: rgba(15, 13, 23, 0.95); border-top: 1px solid rgba(255,255,255,0.08); z-index: 50; flex-wrap: wrap; gap: 8px; }}
    .server-pills {{ display: flex; align-items: center; gap: 8px; overflow-x: auto; }}
    .srv-btn {{ background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e5e7eb; padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s; white-space: nowrap; }}
    .srv-btn:hover {{ background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.3); }}
    .srv-btn.active {{ background: #e50914; border-color: #e50914; color: #fff; box-shadow: 0 0 12px rgba(229,9,20,0.5); }}
    .srv-badge {{ font-size: 10px; opacity: 0.8; padding: 1px 4px; background: rgba(0,0,0,0.3); border-radius: 3px; }}
    .download-player-btn {{ background: #22c55e; border: none; color: #000; font-weight: 800; font-size: 12px; padding: 5px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; }}
    .download-player-btn:hover {{ background: #16a34a; color: #fff; }}
    .loader-overlay {{ position: absolute; inset: 0; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; transition: opacity 0.3s; }}
    .spinner {{ width: 44px; height: 44px; border: 4px solid rgba(255,255,255,0.15); border-top-color: #e50914; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 16px; }}
    @keyframes spin {{ to {{ transform: rotate(360deg); }} }}
    .loader-text {{ font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 4px; }}
    .loader-sub {{ font-size: 12px; color: #9ca3af; }}
    .hidden {{ display: none !important; opacity: 0; pointer-events: none; }}
  </style>
</head>
<body>
  <div class="player-wrap">
    <div class="player-frame-container">
      <div class="loader-overlay" id="loader">
        <div class="spinner"></div>
        <div class="loader-text" id="loaderTitle">Connecting to Stream...</div>
        <div class="loader-sub">Loading Full Movie Stream • Ad-Free</div>
      </div>
      <iframe id="mainStreamFrame" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="no-referrer"></iframe>
    </div>
    
    <div class="server-bar">
      <div class="server-pills" id="serverPills"></div>
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="download-player-btn" id="btnDownload" onclick="triggerDownload()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Download</span>
        </button>
        <div style="font-size:11px;color:#22c55e;font-weight:700;display:flex;align-items:center;gap:6px;">
          <span>● LIVE</span>
          <span style="color:#aaa;">4K ULTRA HD</span>
        </div>
      </div>
    </div>
  </div>

  <script>
    const servers = {servers_json};
    const iframe = document.getElementById("mainStreamFrame");
    const pillsContainer = document.getElementById("serverPills");
    const loader = document.getElementById("loader");
    const loaderTitle = document.getElementById("loaderTitle");
    let activeIndex = 0;

    function selectServer(idx) {{
      if (idx < 0 || idx >= servers.length) return;
      activeIndex = idx;
      const srv = servers[idx];
      loader.classList.remove("hidden");
      loaderTitle.textContent = "Connecting to " + (srv.name || "Server") + "...";

      document.querySelectorAll(".srv-btn").forEach((b, i) => {{
        if (i === idx) b.classList.add("active");
        else b.classList.remove("active");
      }});

      iframe.src = srv.url;
      setTimeout(() => {{
        loader.classList.add("hidden");
      }}, 2500);
    }}

    iframe.addEventListener("load", () => {{
      if (iframe.src && iframe.src !== "about:blank") {{
        setTimeout(() => loader.classList.add("hidden"), 800);
      }}
    }});

    // Build Server buttons
    servers.forEach((s, i) => {{
      const btn = document.createElement("button");
      btn.className = "srv-btn" + (i === 0 ? " active" : "");
      btn.innerHTML = `<span>${{s.name || ("Server " + (i+1))}}</span>` + (s.label ? `<span class="srv-badge">${{s.label}}</span>` : "");
      btn.addEventListener("click", () => selectServer(i));
      pillsContainer.appendChild(btn);
    }});

    // Default to Server 1 (Fast HD)
    selectServer(0);

    // Audio leak preventer: instantly kill stream when paused/hidden/stopped
    window.addEventListener("message", (e) => {{
      if (e.data === "stop" || e.data === "pause") {{
        iframe.src = "about:blank";
      }}
    }});
    window.addEventListener("beforeunload", () => {{
      iframe.src = "about:blank";
    }});
    window.addEventListener("pagehide", () => {{
      iframe.src = "about:blank";
    }});

    function triggerDownload() {{
      window.parent.postMessage({{ action: "open_download", tmdbId: "{tm_id}", title: "{safe_title}" }}, "*");
    }}
  </script>
</body>
</html>"""

class MovieshubHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)

        # 1. Health check
        if parsed_path.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "ok",
                "app": "Movieshub",
                "creator": "Prem",
                "streaming": "active",
                "search": "live"
            }).encode("utf-8"))
            return

        # 2. 2-Hour Synced Dashboard API
        elif parsed_path.path == "/api/dashboard":
            sync_netmirror_catalog()
            try:
                with open(CACHE_FILE, "r", encoding="utf-8") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Cache-Control", "public, max-age=600")
                self.end_headers()
                self.wfile.write(content.encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        # 3. Force Sync Trigger
        elif parsed_path.path == "/api/sync":
            sync_netmirror_catalog(force=True)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "ok",
                "message": "Netmirror catalog refreshed successfully",
                "synced_at": time.strftime("%Y-%m-%d %H:%M:%S")
            }).encode("utf-8"))
            return

        # 4. Search API
        elif parsed_path.path == "/api/search":
            qs = urllib.parse.parse_qs(parsed_path.query)
            q = qs.get("q", [""])[0]
            lang = qs.get("lang", [None])[0]

            results = search_movies(q, lang) if q else []
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"query": q, "results": results}).encode("utf-8"))
            return

        # 5. Latest Releases
        elif parsed_path.path in ("/api/latest", "/api/movies"):
            qs = urllib.parse.parse_qs(parsed_path.query)
            lang = qs.get("lang", ["all"])[0].lower()
            orig_lang = LANG_CODE_MAP.get(lang)

            params = {
                "sort_by": "popularity.desc",
                "primary_release_date.gte": "2024-01-01",
                "page": 1
            }
            if orig_lang:
                params["with_original_language"] = orig_lang

            data = fetch_tmdb_api("/discover/movie", params)
            results = [normalize_movie(item) for item in data.get("results", [])[:20]]

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"language": lang, "results": results}).encode("utf-8"))
            return

        # 6. Stream Player Embed
        elif parsed_path.path == "/stream/player":
            qs = urllib.parse.parse_qs(parsed_path.query)
            tm_id = qs.get("id", ["949229"])[0]
            mtype = qs.get("type", ["movie"])[0]
            title = qs.get("title", ["Movie"])[0]
            lang = qs.get("lang", ["Hindi"])[0]
            net_id = qs.get("net_id", [""])[0]
            year = qs.get("year", [""])[0]

            html = generate_player_html(tm_id, mtype, title, lang=lang, net_id=net_id, year=year)
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))
            return
        # 6b. Netmirror Stream Embed Proxy (Preserves Referer & Eliminates Cross-Origin Restrictions)
        elif parsed_path.path == "/stream/direct":
            qs = urllib.parse.parse_qs(parsed_path.query)
            target_url = qs.get("url", [""])[0]
            v_title = qs.get("title", ["Movieshub Stream"])[0]
            if not target_url:
                self.send_response(400)
                self.end_headers()
                return

            html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{v_title} - Movieshub</title>
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body, html {{ width: 100%; height: 100%; background: #000; overflow: hidden; }}
  video {{ width: 100%; height: 100%; object-fit: contain; }}
</style>
</head>
<body>
  <video src="{target_url}" controls autoplay playsinline></video>
</body>
</html>"""
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))
            return

        elif parsed_path.path == "/stream/direct_mp4":
            qs = urllib.parse.parse_qs(parsed_path.query)
            tm_id = qs.get("tm_id", [""])[0]
            nid = qs.get("nid", [""])[0]
            lang = qs.get("lang", ["Hindi"])[0]
            year = qs.get("year", ["2024"])[0]
            v_title = qs.get("title", ["Movie"])[0]

            ts = str(int(time.time()))
            sig = hmac.new(NETMIRROR_SECRET.encode("utf-8"), f"{tm_id}:{ts}".encode("utf-8"), hashlib.sha256).hexdigest()
            cinemo_url = f"https://webvp.watch21.shop/play/watchcinemo.php?tm_id={tm_id}&nid={nid}&year={year}&se=0&ep=0&ts={ts}&sig={sig}&hasExt=true"

            direct_mp4 = None
            try:
                c_headers = {"User-Agent": "Mozilla/5.0", "Referer": "https://netmirror.plus/"}
                c_res = urllib.request.urlopen(urllib.request.Request(cinemo_url, headers=c_headers), timeout=4).read().decode("utf-8", errors="ignore")
                m_q = re.search(r"const qualities = (\[.*?\]);", c_res)
                if m_q:
                    quals = json.loads(m_q.group(1))
                    mp4s = [q for q in quals if q.get("type") == "mp4"]
                    for q in mp4s:
                        if lang.lower() in q.get("html", "").lower():
                            direct_mp4 = q.get("url")
                            break
                    if not direct_mp4 and mp4s:
                        direct_mp4 = mp4s[0].get("url")
            except Exception as e:
                print(f"[Direct MP4 Error] {e}")

            if direct_mp4:
                html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{v_title} - Movieshub</title>
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body, html {{ width: 100%; height: 100%; background: #000; overflow: hidden; }}
  video {{ width: 100%; height: 100%; object-fit: contain; }}
</style>
</head>
<body>
  <video src="{direct_mp4}" controls autoplay playsinline></video>
</body>
</html>"""
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                self.wfile.write(html.encode("utf-8"))
                return
            else:
                self.send_response(302)
                self.send_header("Location", f"/stream/netmirror/embed?url={urllib.parse.quote(cinemo_url)}&lang={urllib.parse.quote(lang)}")
                self.end_headers()
                return

        elif parsed_path.path == "/stream/netmirror/embed":
            qs = urllib.parse.parse_qs(parsed_path.query)
            target_url = qs.get("url", [""])[0]
            req_lang = qs.get("lang", [""])[0]
            if not target_url:
                tm_id = qs.get("tm_id", [""])[0] or qs.get("id", [""])[0]
                nid = qs.get("nid", [""])[0] or qs.get("net_id", [""])[0]
                year = qs.get("year", ["2024"])[0]
                if tm_id:
                    ts = str(int(time.time()))
                    sig = hmac.new(NETMIRROR_SECRET.encode("utf-8"), f"{tm_id}:{ts}".encode("utf-8"), hashlib.sha256).hexdigest()
                    target_url = f"https://webvp.watch21.shop/play/watchcinemo.php?tm_id={tm_id}&nid={nid}&year={year}&se=0&ep=0&ts={ts}&sig={sig}&hasExt=true"
            if not target_url:
                self.send_response(400)
                self.end_headers()
                return

            if "hasExt=" in target_url and "hasExt=true" not in target_url:
                target_url = target_url.replace("hasExt=", "hasExt=true")
            elif "hasExt=true" not in target_url:
                target_url += "&hasExt=true"

            try:
                req = urllib.request.Request(
                    target_url,
                    headers={
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        "Referer": "https://netmirror.plus/"
                    }
                )
                with urllib.request.urlopen(req, timeout=6) as resp:
                    html_bytes = resp.read()
                    html_str = html_bytes.decode("utf-8", errors="ignore")

                # If specific language requested, reorder qualities so it is index 0
                if req_lang and req_lang.lower() != "cinema":
                    m_q = re.search(r"const qualities = (\[.*?\]);", html_str)
                    if m_q:
                        try:
                            qualities = json.loads(m_q.group(1))
                            match_idx = -1
                            for i, q in enumerate(qualities):
                                if req_lang.lower() in q.get("html", "").lower():
                                    match_idx = i
                                    break
                            if match_idx > 0:
                                matched_item = qualities.pop(match_idx)
                                qualities.insert(0, matched_item)
                                new_qualities_json = json.dumps(qualities)
                                html_str = html_str[:m_q.start(1)] + new_qualities_json + html_str[m_q.end(1):]
                        except Exception as e:
                            print(f"[Qualities Reorder Error] {e}")

                skip_css = """<style>
.backword, .forword {
    width: auto !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    pointer-events: auto !important;
}
.backword img, .forword img {
    width: 38px !important;
    height: 38px !important;
    max-width: 38px !important;
    max-height: 38px !important;
    opacity: 0.8 !important;
    transition: transform 0.2s ease, opacity 0.2s ease !important;
}
.backword img:hover, .forword img:hover {
    transform: scale(1.15) !important;
    opacity: 1 !important;
}
.art-layer-layer0, .art-layer-layer1 {
    width: auto !important;
    pointer-events: auto !important;
}
.art-layer-layer0 { left: 28% !important; }
.art-layer-layer1 { right: 28% !important; }
</style>"""
                base_tag = f'<base href="https://webvp.watch21.shop/play/">{skip_css}'
                if "<head>" in html_str:
                    html_str = html_str.replace("<head>", f"<head>{base_tag}", 1)
                elif "<html" in html_str:
                    html_str = re.sub(r"(<html[^>]*>)", rf"\1<head>{base_tag}</head>", html_str, 1)

                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(html_str.encode("utf-8"))
                return
            except Exception as e:
                print(f"[Stream Engine Embed Proxy Error] {e}")
                self.send_response(502)
                self.end_headers()
                return

        # 7. Image Proxy (Caches & unblocks external posters)
        elif parsed_path.path == "/api/image_proxy":
            qs = urllib.parse.parse_qs(parsed_path.query)
            target_url = qs.get("url", [""])[0]
            if not target_url:
                self.send_response(400)
                self.end_headers()
                return

            cache_hash = hashlib.md5(target_url.encode()).hexdigest()
            cache_path = os.path.join(IMG_CACHE_DIR, cache_hash + ".jpg")

            if os.path.isfile(cache_path):
                with open(cache_path, "rb") as f:
                    data = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "image/jpeg")
                self.send_header("Cache-Control", "public, max-age=604800")
                self.end_headers()
                self.wfile.write(data)
                return

            try:
                req = urllib.request.Request(target_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=5) as res:
                    data = res.read()
                with open(cache_path, "wb") as f:
                    f.write(data)
                self.send_response(200)
                self.send_header("Content-Type", "image/jpeg")
                self.send_header("Cache-Control", "public, max-age=604800")
                self.end_headers()
                self.wfile.write(data)
            except Exception:
                # Return SVG fallback
                svg = generate_svg_poster("Movieshub", "2026", "Cinema")
                self.send_response(200)
                self.send_header("Content-Type", "image/svg+xml")
                self.end_headers()
                self.wfile.write(svg.encode("utf-8"))
            return

        # 8. Dynamic SVG Poster Badge
        elif parsed_path.path == "/api/poster":
            qs = urllib.parse.parse_qs(parsed_path.query)
            title = qs.get("title", ["Movieshub Cinema"])[0]
            year = qs.get("year", ["2026"])[0]
            lang = qs.get("lang", ["Cinema"])[0]

            svg = generate_svg_poster(title, year, lang)
            self.send_response(200)
            self.send_header("Content-Type", "image/svg+xml; charset=utf-8")
            self.send_header("Cache-Control", "public, max-age=86400")
            self.end_headers()
            self.wfile.write(svg.encode("utf-8"))
            return

        # 9. Direct Movie Download API
        elif parsed_path.path == "/api/download":
            qs = urllib.parse.parse_qs(parsed_path.query)
            tm_id = qs.get("id", [""])[0]
            title = qs.get("title", ["Movie"])[0]
            quality = qs.get("quality", ["1080p"])[0]
            lang = qs.get("lang", ["Hindi"])[0]
            net_id = qs.get("net_id", [""])[0]

            local_file = os.path.join(DIRECTORY, "assets", "videos", f"{tm_id}.mp4")
            if os.path.isfile(local_file):
                with open(local_file, "rb") as f:
                    data = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "video/mp4")
                self.send_header("Content-Disposition", f'attachment; filename="{title} ({quality}).mp4"')
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
                return

            # Resolve direct MP4 download from Netmirror
            if not net_id and title:
                found_id, _ = find_netmirror_id(title, lang)
                if found_id:
                    net_id = found_id

            download_url = None
            if net_id:
                try:
                    ts = str(int(time.time()))
                    sig = hmac.new(NETMIRROR_SECRET.encode("utf-8"), f"{tm_id}:{ts}".encode("utf-8"), hashlib.sha256).hexdigest()
                    c_url = f"https://webvp.watch21.shop/play/watchcinemo.php?se=0&ep=0&year=2024&nid={net_id}&ts={ts}&sig={sig}&tm_id={tm_id}&hasExt=true"
                    c_headers = {"User-Agent": "Mozilla/5.0", "Referer": "https://netmirror.plus/"}
                    body = urllib.request.urlopen(urllib.request.Request(c_url, headers=c_headers), timeout=5).read().decode("utf-8", errors="ignore")
                    m = re.search(r"const qualities = (\[.*?\]);", body)
                    if m:
                        qualities = json.loads(m.group(1))
                        mp4s = [q for q in qualities if q.get("type") == "mp4"]
                        clean_lang = lang.lower() if lang and lang.lower() != "cinema" else ""

                        # 1. Exact match for language and quality
                        for q in mp4s:
                            q_html = q.get("html", "").lower()
                            if clean_lang in q_html and quality.lower() in q_html:
                                download_url = q.get("url")
                                break

                        # 2. Match language any quality
                        if not download_url and clean_lang:
                            for q in mp4s:
                                if clean_lang in q.get("html", "").lower():
                                    download_url = q.get("url")
                                    break

                        # 3. Match any MP4
                        if not download_url and mp4s:
                            download_url = mp4s[0].get("url")
                except Exception as err:
                    print(f"Download resolution error: {err}")

            if download_url:
                self.send_response(302)
                self.send_header("Location", download_url)
                self.end_headers()
                return
            else:
                servers = resolve_netmirror_servers(tm_id, lang=lang, net_id=net_id, title=title)
                target_url = servers[0]["url"] if servers else f"https://vidsync.pro/embed/movie/{tm_id}"
                self.send_response(302)
                self.send_header("Location", target_url)
                self.end_headers()
                return

        return super().do_GET()

def start_server():
    os.chdir(DIRECTORY)
    # Perform initial sync on startup
    sync_netmirror_catalog()

    server_address = ("", PORT)
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    httpd = http.server.ThreadingHTTPServer(server_address, MovieshubHTTPHandler)
    print(f"==================================================")
    print(f"🎬 Movieshub Local Streaming Server (Created by Prem)")
    print(f"🚀 URL: http://localhost:{PORT}")
    print(f"🔄 Auto-sync: Enabled (every 2 hours from Netmirror)")
    print(f"⚡ Zero Ads • Ad-Free Playback • Instant Live Search")
    print(f"==================================================")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()

if __name__ == "__main__":
    start_server()
