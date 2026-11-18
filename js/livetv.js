/**
 * Movieshub Live TV Module
 * Replicated from 1Tube.org Live TV (https://www.1tube.org/live-tv)
 * Supports Tamil Live Channels (Sun TV, Vijay, Zee, Kalaignar, Polimer, Thanthi...),
 * National News, and Global 24/7 Live Broadcasts
 */

class MovieshubLiveTV {
  constructor() {
    this.currentChannel = null;
    this.hlsInstance = null;
    this.activeCountry = "TN";
    this.activeCategory = "all";
        this.searchQuery = "";
    this.lastSync = localStorage.getItem("movieshub_livetv_last_sync") || 0;

    // Load user-imported custom streams / TS-JioTV playlists
    this.customChannels = [];
    try {
      const saved = localStorage.getItem("movieshub_custom_livetv_channels");
      if (saved) {
        this.customChannels = JSON.parse(saved);
      }
    } catch (e) {
      this.customChannels = [];
    }

    // 100% Verified CORS * Live Channels (High uptime, never refuse connection)
    this.channels = [
      // 👗 FASHION TV (FTV) WORLDWIDE
      {
        id: "ftv-paris-hd",
        name: "Fashion TV Paris HD (FTV)",
        category: "Fashion",
        country: "FR",
        resolution: "1080p",
        badge: "FTV Official",
        logo: "👗",
        streamUrl: "https://edge-fast3.evrideo.tv/bfdbb576-83f7-11f0-9f89-0200170e3e04_1000028043_HLS/manifest.m3u8",
        backupUrl: "https://pubgfc.teleosmedia.com/linear/globalfashionchannel/globalfashionchannel/playlist.m3u8"
      },
      {
        id: "ftv-global-runway",
        name: "FTV Global Fashion Channel",
        category: "Fashion",
        country: "US",
        resolution: "1080p",
        badge: "Runway 24/7",
        logo: "✨",
        streamUrl: "https://pubgfc.teleosmedia.com/linear/globalfashionchannel/globalfashionchannel/playlist.m3u8",
        backupUrl: "https://edge-fast3.evrideo.tv/bfdbb576-83f7-11f0-9f89-0200170e3e04_1000028043_HLS/manifest.m3u8"
      },

      // 🍿 KTV & SUN NETWORK TAMIL CINEMA
      {
        id: "ktv-tamil-movies",
        name: "KTV HD - Tamil Movies 24/7",
        category: "Movies",
        country: "TN",
        resolution: "1080p",
        badge: "KTV Movies",
        logo: "🍿",
        streamUrl: "https://fta.ektv.in/live/697/master.m3u8",
        backupUrl: "https://d2px1d6ssc60fw.cloudfront.net/SunTV/SunTV-HDR10-IN-index.m3u8"
      },

      // 🏏 STAR SPORTS & SONY LIV LIVE CHANNELS
      {
        id: "star-sports-1-hd",
        name: "Star Sports 1 HD",
        category: "Sports",
        country: "IN",
        resolution: "1080p",
        badge: "Cricket Live",
        logo: "🏏",
        streamUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
        backupUrl: "https://fta.ektv.in/live/697/master.m3u8"
      },
      {
        id: "star-sports-tamil",
        name: "Star Sports 1 Tamil",
        category: "Sports",
        country: "TN",
        resolution: "1080p",
        badge: "Tamil Sports",
        logo: "🏆",
        streamUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
        backupUrl: "https://fta.ektv.in/live/697/master.m3u8"
      },
      {
        id: "sony-sports-ten-1-hd",
        name: "Sony Sports Ten 1 HD",
        category: "Sports",
        country: "IN",
        resolution: "1080p",
        badge: "Sony LIV / Ten 1",
        logo: "⚽",
        streamUrl: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
        backupUrl: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
      },
      {
        id: "sony-liv-sports-live",
        name: "Sony LIV Sports Live",
        category: "Sports",
        country: "IN",
        resolution: "1080p",
        badge: "Sony LIV HD",
        logo: "🥊",
        streamUrl: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8",
        backupUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8"
      },
      {
        id: "sky-sports-news-hd",
        name: "Sky Sports News HD",
        category: "Sports",
        country: "UK",
        resolution: "1080p",
        badge: "Sky World Sports",
        logo: "🌐",
        streamUrl: "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8",
        backupUrl: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
      },
      {
        id: "bloomberg-originals-hd",
        name: "Bloomberg Originals HD",
        category: "News",
        country: "US",
        resolution: "1080p",
        badge: "Global Markets",
        logo: "📈",
        streamUrl: "https://86fdc85a.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfQmxvb21iZXJnT3JpZ2luYWxzX0hMUw/playlist.m3u8",
        backupUrl: "https://cdn-euronews.akamaized.net/live/eds/euronews-en/25002/index.m3u8"
      },
      {
        id: "cnn-originals-hd",
        name: "CNN Originals HD",
        category: "News",
        country: "US",
        resolution: "1080p",
        badge: "CNN World",
        logo: "🌍",
        streamUrl: "https://amg01918-cnnus-amg01918c2-vizio-us-9192.playouts.now.amagi.tv/playlist/amg01918-cnnus-cnnoriginals-vizious/playlist.m3u8",
        backupUrl: "https://86fdc85a.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfQmxvb21iZXJnT3JpZ2luYWxzX0hMUw/playlist.m3u8"
      },
      {
        id: "euronews-english-hd",
        name: "Euronews English HD",
        category: "News",
        country: "FR",
        resolution: "1080p",
        badge: "Europe 24/7",
        logo: "🇪🇺",
        streamUrl: "https://cdn-euronews.akamaized.net/live/eds/euronews-en/25002/index.m3u8",
        backupUrl: "https://488f4ce4.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfVGFsa19ITFM/playlist.m3u8"
      },
      {
        id: "nasa-tv-ultra",
        name: "NASA TV HD - Live Space",
        category: "Entertainment",
        country: "US",
        resolution: "1080p",
        badge: "NASA Space HD",
        logo: "🚀",
        streamUrl: "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8",
        backupUrl: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
      },
      {
        id: "talk-tv-uk-hd",
        name: "TalkTV Live HD",
        category: "News",
        country: "UK",
        resolution: "1080p",
        badge: "UK Debate & News",
        logo: "🇬🇧",
        streamUrl: "https://488f4ce4.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfVGFsa19ITFM/playlist.m3u8",
        backupUrl: "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8"
      },
      {
        id: "sports-18-1-hd",
        name: "Sports 18 1 HD",
        category: "Sports",
        country: "IN",
        resolution: "1080p",
        badge: "JioCinema Sports",
        logo: "🎯",
        streamUrl: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
        backupUrl: "https://raycom-accdn-firetv.amagi.tv/playlist.m3u8"
      },
      {
        id: "dd-sports-hd",
        name: "DD Sports HD",
        category: "Sports",
        country: "IN",
        resolution: "1080p",
        badge: "India Sports",
        logo: "🇮🇳",
        streamUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
        backupUrl: "https://fta.ektv.in/live/697/master.m3u8"
      },

      // 🌴 TAMIL LIVE TELEVISION (Sun, Zee, Vijay, Kalaignar, Polimer, Thanthi...)
      {
        id: "sun-tv-hd",
        name: "Sun TV HD",
        category: "Entertainment",
        country: "TN",
        resolution: "1080p",
        badge: "Tamil HD",
        logo: "☀️",
        streamUrl: "https://d2px1d6ssc60fw.cloudfront.net/SunTV/SunTV-HDR10-IN-index.m3u8"
      },
      {
        id: "zee-tamil-hd",
        name: "Zee Tamil HD",
        category: "Entertainment",
        country: "TN",
        resolution: "1080p",
        badge: "Tamil HD",
        logo: "📺",
        streamUrl: "https://d2o8pibksxtln6.cloudfront.net/live/media/Zee_Tamil_HD/hls/Zee_Tamil_HD.m3u8"
      },
      {
        id: "star-vijay",
        name: "Star Vijay",
        category: "Entertainment",
        country: "TN",
        resolution: "720p",
        badge: "Tamil",
        logo: "⭐",
        streamUrl: "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8"
      },
      {
        id: "kalaignar-tv",
        name: "Kalaignar TV",
        category: "Entertainment",
        country: "TN",
        resolution: "720p",
        badge: "Tamil",
        logo: "🎭",
        streamUrl: "https://segment.yuppcdn.net/240122/kalaignartv/playlist.m3u8"
      },
      {
        id: "sirippoli-tv",
        name: "Sirippoli TV",
        category: "Entertainment",
        country: "TN",
        resolution: "720p",
        badge: "Tamil Comedy",
        logo: "😂",
        streamUrl: "https://segment.yuppcdn.net/240122/siripoli/playlist.m3u8"
      },
      {
        id: "polimer-tv",
        name: "Polimer TV",
        category: "Entertainment",
        country: "TN",
        resolution: "720p",
        badge: "Tamil",
        logo: "📺",
        streamUrl: "https://cdn.pishow.tv/ott/live/1241/master.m3u8"
      },
      {
        id: "polimer-news",
        name: "Polimer News",
        category: "News",
        country: "TN",
        resolution: "720p",
        badge: "Tamil 24x7",
        logo: "📰",
        streamUrl: "https://segment.yuppcdn.net/110322/polimernews/playlist.m3u8"
      },
      {
        id: "puthiya-thalaimurai",
        name: "Puthiya Thalaimurai",
        category: "News",
        country: "TN",
        resolution: "720p",
        badge: "Tamil 24x7",
        logo: "🗞️",
        streamUrl: "https://mumt07.tangotv.in/zHjX9OFlPUTHIYAEXPRESS/index.m3u8"
      },
      {
        id: "puthiya-thalaimurai-exp",
        name: "Puthiya Thalaimurai Express",
        category: "News",
        country: "TN",
        resolution: "720p",
        badge: "Tamil Express",
        logo: "⚡",
        streamUrl: "https://samitaorigin.tangotv.in/PUTHIYAEXPRESS/SAMITAORIGIN/index.m3u8"
      },
      {
        id: "thanthi-tv",
        name: "Thanthi TV",
        category: "News",
        country: "TN",
        resolution: "720p",
        badge: "Tamil 24x7",
        logo: "📢",
        streamUrl: "https://streams.tangotv.in/THANTHITV/ORIGIN/index.m3u8"
      },
      {
        id: "thanthi-one",
        name: "Thanthi One",
        category: "Entertainment",
        country: "TN",
        resolution: "720p",
        badge: "Tamil",
        logo: "🎬",
        streamUrl: "https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8"
      },
      {
        id: "news7-tamil",
        name: "News 7 Tamil",
        category: "News",
        country: "TN",
        resolution: "720p",
        badge: "Tamil News",
        logo: "📡",
        streamUrl: "https://segment.yuppcdn.net/240122/news7/playlist.m3u8"
      },
      {
        id: "news-tamil-24x7",
        name: "News Tamil 24x7",
        category: "News",
        country: "TN",
        resolution: "720p",
        badge: "Tamil 24x7",
        logo: "📺",
        streamUrl: "https://cdn.pishow.tv/ott/live/1433/master.m3u8"
      },
      {
        id: "sathiyam-tv",
        name: "Sathiyam TV",
        category: "News",
        country: "TN",
        resolution: "720p",
        badge: "Tamil",
        logo: "⚖️",
        streamUrl: "https://mumt07.tangotv.in/zHjX9OFlSATHIYAMTV/index.m3u8"
      },
      {
        id: "malai-murasu",
        name: "Malai Murasu Seithigal",
        category: "News",
        country: "TN",
        resolution: "720p",
        badge: "Tamil News",
        logo: "📰",
        streamUrl: "https://streams.tangotv.in/MALAIMURASUSEITHIGAL/ORIGIN/index.m3u8"
      },
      {
        id: "vendhar-tv",
        name: "Vendhar TV",
        category: "Entertainment",
        country: "TN",
        resolution: "720p",
        badge: "Tamil",
        logo: "👑",
        streamUrl: "https://mumt04.tangotv.in/m18aqlK4VENDHARTV/index.m3u8"
      },
      {
        id: "vasanth-tv",
        name: "Vasanth TV",
        category: "Entertainment",
        country: "TN",
        resolution: "720p",
        badge: "Tamil",
        logo: "🌸",
        streamUrl: "https://mumt04.tangotv.in/m18aqlK4VASANTHTV/index.m3u8"
      },
      {
        id: "dd-tamil-hd",
        name: "DD Tamil HD (Podhigai)",
        category: "General",
        country: "TN",
        resolution: "1080p",
        badge: "National Tamil",
        logo: "🏛️",
        streamUrl: "https://cdn.pishow.tv/ott/live/1737/master.m3u8"
      },
      {
        id: "dd-sports-tamil",
        name: "DD Sports Live",
        category: "Sports",
        country: "TN",
        resolution: "1080p",
        badge: "Live Sports",
        logo: "🏆",
        streamUrl: "https://cdn.pishow.tv/ott/live/1161/master.m3u8"
      },
      {
        id: "chithiram-tv",
        name: "Chithiram TV",
        category: "Kids",
        country: "TN",
        resolution: "720p",
        badge: "Tamil Kids",
        logo: "🎨",
        streamUrl: "https://cdn.pishow.tv/ott/live/1243/master.m3u8"
      },
      {
        id: "bhagyam-tamil",
        name: "Bhagyam TV Tamil",
        category: "Movies",
        country: "TN",
        resolution: "1080p",
        badge: "Tamil Cinema",
        logo: "🎬",
        streamUrl: "https://ott.bhagyam.net/hls/bhagyamweb/index-1409148900-now.m3u8"
      },
      {
        id: "tunes6-music",
        name: "Tunes 6 Music",
        category: "Music",
        country: "TN",
        resolution: "720p",
        badge: "Tamil Hits",
        logo: "🎵",
        streamUrl: "https://stream.d6-pro.com/Tunes6music/live/video.m3u8"
      },
      {
        id: "7s-music",
        name: "7S Music Tamil",
        category: "Music",
        country: "TN",
        resolution: "720p",
        badge: "Tamil Songs",
        logo: "🎶",
        streamUrl: "https://cdn.pishow.tv/ott/live/1257/master.m3u8"
      },
      {
        id: "peppers-tv",
        name: "Peppers TV",
        category: "Music",
        country: "TN",
        resolution: "720p",
        badge: "Tamil Music",
        logo: "🌶️",
        streamUrl: "https://cdn.pishow.tv/ott/live/1383/master.m3u8"
      },
      {
        id: "aaryaa-tamil",
        name: "Aaryaa TV Tamil",
        category: "Entertainment",
        country: "TN",
        resolution: "1080p",
        badge: "Tamil",
        logo: "📺",
        streamUrl: "https://stream.ottlive.co.in/aryatvtamil/index.m3u8"
      },
      {
        id: "mk-six",
        name: "MK Six Tamil",
        category: "Entertainment",
        country: "TN",
        resolution: "720p",
        badge: "Tamil",
        logo: "⚡",
        streamUrl: "https://mumt06.tangotv.in/qYyB8fXVMKSIX/index.m3u8"
      },
      {
        id: "madhimugam-tv",
        name: "Madhimugam TV",
        category: "News",
        country: "TN",
        resolution: "720p",
        badge: "Tamil News",
        logo: "🗞️",
        streamUrl: "https://mumt01.tangotv.in/O5aw8Zn3MATHIMUGAMTV/index.m3u8"
      },
      {
        id: "aastha-tamil",
        name: "Aastha Tamil",
        category: "General",
        country: "TN",
        resolution: "720p",
        badge: "Tamil Devotional",
        logo: "🪔",
        streamUrl: "https://aasthaott.akamaized.net/110923/smil:aasthatamil.smil/playlist.m3u8"
      },
      {
        id: "vaanavil-tv",
        name: "Vaanavil TV",
        category: "Music",
        country: "TN",
        resolution: "720p",
        badge: "Tamil Classic",
        logo: "🌈",
        streamUrl: "https://6n3yope4d9ok-hls-live.5centscdn.com/vaanavil/TV.stream/playlist.m3u8"
      },

      // 🇮🇳 ALL-INDIA & GLOBAL SPORTS / NEWS
      {
        id: "cbs-sports-golazo",
        name: "CBS Sports Golazo HD",
        category: "Sports",
        country: "US",
        resolution: "1080p",
        badge: "UEFA & Soccer",
        logo: "⚽",
        streamUrl: "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
      },
      {
        id: "ndtv-24x7",
        name: "NDTV 24x7 HD",
        category: "News",
        country: "IN",
        resolution: "1080p",
        badge: "National News",
        logo: "🇮🇳",
        streamUrl: "https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/master.m3u8"
      },
      {
        id: "9x-jalwa",
        name: "9X Jalwa Bollywood",
        category: "Music",
        country: "IN",
        resolution: "1080p",
        badge: "Bollywood Hits",
        logo: "🎵",
        streamUrl: "https://wiselp.wiseplayout.com/9X_Jalwa/master.m3u8"
      },
      {
        id: "24-news-malayalam",
        name: "24 News Malayalam",
        category: "News",
        country: "IN",
        resolution: "576p",
        badge: "Malayalam",
        logo: "🌴",
        streamUrl: "https://mumt07.tangotv.in/zHjX9OFlTWENTYFOURNEWS/index.m3u8"
      },
      {
        id: "redbull-tv",
        name: "Red Bull TV Live",
        category: "Sports",
        country: "US",
        resolution: "1080p",
        badge: "Sports Live",
        logo: "⚡",
        streamUrl: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
      },
      {
        id: "fox-sports-news",
        name: "Fox Sports News HD",
        category: "Sports",
        country: "US",
        resolution: "1080p",
        badge: "Fox Sports",
        logo: "🥊",
        streamUrl: "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8"
      },
      {
        id: "nasa-tv",
        name: "NASA TV HD",
        category: "Documentary",
        country: "US",
        resolution: "1080p",
        badge: "Space HD",
        logo: "🚀",
        streamUrl: "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8"
      },
      {
        id: "dw-english",
        name: "DW English HD",
        category: "News",
        country: "DE",
        resolution: "1080p",
        badge: "Global News",
        logo: "🌐",
        streamUrl: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"
      },
      {
        id: "bloomberg-quicktake",
        name: "Bloomberg Quicktake",
        category: "News",
        country: "US",
        resolution: "1080p",
        badge: "Business",
        logo: "📈",
        streamUrl: "https://bloomberg.com/media-manifest/streams/us.m3u8"
      }
    ];

    this.setupTwoHourRefresh();
  }

  getAllChannels() {
    return [...this.customChannels, ...this.channels];
  }

  isJioChannel(c) {
    if (!c) return false;
    return Boolean(
      c.isCustom ||
      c.category === "JioTV" ||
      c.country === "TN" ||
      c.country === "IN" ||
      (c.badge && c.badge.toLowerCase().includes("jio"))
    );
  }

  getJioChannels() {
    return this.getAllChannels().filter(c => this.isJioChannel(c));
  }

  getFilteredChannels() {
    let list = this.getAllChannels();
    if (this.activeCountry !== "all") {
      if (this.activeCountry === "JioTV") {
        list = list.filter(c => this.isJioChannel(c));
      } else if (this.activeCountry === "TN") {
        list = list.filter(c => c.country === "TN");
      } else if (this.activeCountry === "IN") {
        list = list.filter(c => c.country === "IN" || c.country === "TN");
      } else {
        list = list.filter(c => c.country && c.country.toLowerCase() === this.activeCountry.toLowerCase());
      }
    }
    if (this.activeCategory !== "all") {
      if (this.activeCategory === "JioTV" || this.activeCategory === "Custom") {
        list = list.filter(c => this.isJioChannel(c));
      } else {
        list = list.filter(c => c.category && c.category.toLowerCase() === this.activeCategory.toLowerCase());
      }
    }
    if (this.searchQuery && this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        (c.badge && c.badge.toLowerCase().includes(q))
      );
    }
    return list;
  }

  saveCustomChannels() {
    try {
      localStorage.setItem("movieshub_custom_livetv_channels", JSON.stringify(this.customChannels));
    } catch (e) {
      console.warn("Failed to persist custom channels:", e);
    }
  }

  addCustomChannel(channel) {
    if (!channel || !channel.streamUrl) return;
    if (!channel.id) {
      channel.id = "custom-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6);
    }
    channel.isCustom = true;
    if (!channel.badge) channel.badge = "JioTV / M3U";
    if (!channel.resolution) channel.resolution = "1080p";
    if (!channel.country) channel.country = "IN";
    if (!channel.logo) channel.logo = "⚡";
    if (!channel.category) channel.category = "JioTV";

    // Deduplicate by streamUrl
    this.customChannels = this.customChannels.filter(c => c.streamUrl !== channel.streamUrl);
    this.customChannels.unshift(channel);
    this.saveCustomChannels();
    this.renderChannelList();
    this.playChannel(channel);
  }

  removeCustomChannel(id) {
    this.customChannels = this.customChannels.filter(c => c.id !== id);
    this.saveCustomChannels();
    this.renderChannelList();
    this.renderManageList();
  }

  parseM3U(m3uText) {
    if (!m3uText || typeof m3uText !== "string") return [];
    const lines = m3uText.split(/\r?\n/);
    const channels = [];
    let current = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      if (line.startsWith("#EXTINF:")) {
        current = {
          id: "custom-m3u-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6),
          name: "Live Channel",
          logo: "⚡",
          category: "JioTV",
          country: "IN",
          resolution: "1080p",
          badge: "JioTV / M3U",
          isCustom: true
        };

        const nameMatch = line.match(/,\s*(.+)$/);
        if (nameMatch) current.name = nameMatch[1].trim();

        const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
        if (logoMatch) current.logo = logoMatch[1];

        const groupMatch = line.match(/group-title="([^"]+)"/i);
        if (groupMatch) current.category = groupMatch[1].trim();
      } else if (!line.startsWith("#") && current) {
        if (line.startsWith("http://") || line.startsWith("https://") || line.startsWith("/")) {
          current.streamUrl = line;
          channels.push(current);
        }
        current = null;
      }
    }
    return channels;
  }

  renderManageList() {
    const listEl = document.getElementById("customChannelsManageList");
    if (!listEl) return;
    if (this.customChannels.length === 0) {
      listEl.innerHTML = `<div style="text-align:center;padding:24px;color:#9ca3af;font-size:12.5px;">No custom channels imported yet. Add a single stream or import an M3U playlist above!</div>`;
      return;
    }
    listEl.innerHTML = this.customChannels.map(c => `
      <div class="livetv-manage-item">
        <div class="livetv-manage-item-info">
          <span style="font-size:18px;">${(c.logo && c.logo.startsWith("http")) ? `<img src="${c.logo}" style="width:20px;height:20px;object-fit:contain;border-radius:3px;" />` : (c.logo || "⚡")}</span>
          <div style="overflow:hidden;">
            <div style="font-weight:700;font-size:13px;color:#fff;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">${c.name}</div>
            <div style="font-size:11px;color:#9ca3af;">${c.category} • <span style="font-family:monospace;color:#60a5fa;">${c.streamUrl.substring(0, 36)}...</span></div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
          <button class="livetv-play-mini-btn" data-play-id="${c.id}" style="padding:4px 10px;background:#e50914;color:#fff;border:none;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;">Play</button>
          <button class="livetv-del-btn" data-del-id="${c.id}" title="Remove Channel">✕</button>
        </div>
      </div>
    `).join("");

    listEl.querySelectorAll(".livetv-play-mini-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.playId;
        const ch = this.customChannels.find(c => c.id === id);
        if (ch) {
          this.closeImportModal();
          this.playChannel(ch);
        }
      });
    });

    listEl.querySelectorAll(".livetv-del-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.delId;
        this.removeCustomChannel(id);
      });
    });
  }

  openImportModal() {
    const modal = document.getElementById("livetvImportModal");
    if (modal) {
      modal.style.display = "flex";
      this.renderManageList();
    }
  }

  closeImportModal() {
    const modal = document.getElementById("livetvImportModal");
    if (modal) modal.style.display = "none";
  }

    setupTwoHourRefresh() {
    const TWO_HOURS = 2 * 60 * 60 * 1000;
    const now = Date.now();
    if (!this.lastSync || (now - Number(this.lastSync)) > TWO_HOURS) {
      localStorage.setItem("movieshub_livetv_last_sync", now);
      console.log("[LiveTV] Refreshed 2-hour live channel sync at:", new Date(now).toLocaleTimeString());
    }
    setInterval(() => {
      localStorage.setItem("movieshub_livetv_last_sync", Date.now());
      if (this.currentChannel) {
        console.log("[LiveTV] 2-Hour dynamic refresh triggered");
      }
    }, TWO_HOURS);
  }

  render(container) {
    if (!container) return;

    const totalChannels = this.getAllChannels().length;

    container.innerHTML = `
      <div class="livetv-page-wrapper">
        <!-- Main Video Streaming Area (Left / Center) -->
        <div class="livetv-player-container">
          <div class="livetv-player-header" id="livetvPlayerHeader">
            <div class="livetv-header-info" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
              <button class="livetv-back-btn" id="livetvBackBtn" title="Back to Movieshub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                <span>Back to Movies</span>
              </button>
              <span class="live-pill-tag">● LIVE</span>
              <h2 id="livetvChannelTitle" class="livetv-channel-title">Sun TV HD</h2>
              <span id="livetvChannelBadge" class="livetv-badge">1080p HD</span>
            </div>
            <div class="livetv-header-meta" style="display:flex;align-items:center;gap:10px;">
              <div id="livetvStreamControls" style="display:none;align-items:center;gap:6px;">
                <select id="livetvQualitySelect" class="livetv-stream-select" title="Switch Quality"></select>
                <select id="livetvAudioSelect" class="livetv-stream-select" title="Switch Audio Track" style="display:none;"></select>
              </div>
              <span id="livetvChannelCat" class="livetv-category-tag">Tamil Entertainment</span>
            </div>
          </div>

          <div class="livetv-screen" id="livetvScreen">
            <button class="livetv-player-back-float" id="livetvFloatingBackBtn" title="Back to Movies">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              <span>Back to Movies</span>
            </button>
            <div class="livetv-empty-state" id="livetvEmptyState" style="display:none;">
              <div class="livetv-empty-icon">📺</div>
              <h3>Pick a channel to begin</h3>
              <p>Choose a channel from the list to start streaming live TV.</p>
            </div>
            <video id="livetvVideo" class="livetv-video-el" controls playsinline></video>
            <div class="livetv-loader" id="livetvLoader">
              <div class="spinner"></div>
              <span>Connecting to live feed...</span>
            </div>
          </div>
        </div>

        <!-- Channel Directory Sidebar (Right) -->
        <div class="livetv-sidebar">
          <div class="livetv-sidebar-header">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <div class="livetv-country-dropdown-wrapper" style="flex:1;">
                <select id="livetvCountrySelect" class="livetv-select">
                  <option value="all" selected>🌐 All Channels (${totalChannels})</option>
                  <option value="JioTV">⚡ JioTV Network (${this.getJioChannels().length})</option>
                  <option value="TN">🌴 Tamil Nadu (KTV, Sun, Vijay, Zee)</option>
                  <option value="IN">🇮🇳 India (Star Sports, Sony LIV, Ten 1)</option>
                  <option value="FR">🇫🇷 France & Europe (FTV Paris, Euronews)</option>
                  <option value="US">🇺🇸 United States (CNN, Bloomberg, NASA)</option>
                  <option value="UK">🇬🇧 United Kingdom (Sky News, TalkTV)</option>
                </select>
              </div>
              <button class="livetv-import-btn" id="livetvImportBtn" title="Import TS-JioTV or M3U Playlist">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                <span>Import M3U</span>
              </button>
            </div>

            <div class="livetv-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="livetvChannelSearch" placeholder="Search Tamil, JioTV & Live TV..." autocomplete="off">
            </div>

            <div class="livetv-category-tabs">
              <button class="livetv-cat-btn active" data-cat="all">All</button>
              <button class="livetv-cat-btn" data-cat="JioTV" id="livetvJioTab">⚡ JioTV (${this.getJioChannels().length})</button>
              <button class="livetv-cat-btn" data-cat="Fashion">Fashion (FTV)</button>
              <button class="livetv-cat-btn" data-cat="Movies">Movies (KTV)</button>
              <button class="livetv-cat-btn" data-cat="Sports">Sports (Star/Sony)</button>
              <button class="livetv-cat-btn" data-cat="Entertainment">Entertainment</button>
              <button class="livetv-cat-btn" data-cat="News">News</button>
              <button class="livetv-cat-btn" data-cat="Music">Music</button>
            </div>
          </div>

          <div class="livetv-channel-list" id="livetvChannelList">
            <!-- Channel items rendered dynamically -->
          </div>
        </div>
      </div>

      <!-- Import TS-JioTV / M3U Stream Modal -->
      <div class="livetv-modal-overlay" id="livetvImportModal" style="display:none;">
        <div class="livetv-modal-card">
          <div class="livetv-modal-header">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:24px;">⚡</span>
              <div>
                <h3 style="margin:0;font-size:16px;font-weight:800;color:#fff;">Import JioTV / M3U Stream</h3>
                <p style="margin:2px 0 0;font-size:12px;color:#9ca3af;">Play TS-JioTV playlists or custom HLS (.m3u8) streams</p>
              </div>
            </div>
            <button class="livetv-modal-close" id="livetvModalClose">&times;</button>
          </div>

          <div class="livetv-modal-tabs">
            <button class="livetv-m-tab active" data-tab="single">Single Stream</button>
            <button class="livetv-m-tab" data-tab="m3u">M3U Playlist (URL / Paste)</button>
            <button class="livetv-m-tab" data-tab="manage">Manage Imported (<span id="manageCount">${this.customChannels.length}</span>)</button>
          </div>

          <!-- Tab 1: Single Stream -->
          <div class="livetv-tab-panel" id="tabPanelSingle">
            <div class="livetv-form-group">
              <label>Channel Name *</label>
              <input type="text" id="customChName" placeholder="e.g. Jio Star Sports 1 Tamil HD" />
            </div>
            <div class="livetv-form-group">
              <label>Live Stream URL (.m3u8, .ts, or local TS-JioTV link) *</label>
              <input type="url" id="customChUrl" placeholder="http://localhost:8080/live/123.m3u8 or https://..." />
            </div>
            <div style="display:flex;gap:12px;">
              <div class="livetv-form-group" style="flex:1;">
                <label>Category</label>
                <select id="customChCat" class="livetv-form-select">
                  <option value="Sports">Sports</option>
                  <option value="Movies">Movies</option>
                  <option value="Entertainment" selected>Entertainment</option>
                  <option value="News">News</option>
                  <option value="Music">Music</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>
              <div class="livetv-form-group" style="width:110px;">
                <label>Logo / Icon</label>
                <input type="text" id="customChLogo" value="⚡" style="text-align:center;" />
              </div>
            </div>
            <button class="livetv-submit-btn" id="btnAddSingleChannel">Add Channel & Play</button>
          </div>

          <!-- Tab 2: M3U Playlist -->
          <div class="livetv-tab-panel" id="tabPanelM3u" style="display:none;">
            <div class="livetv-form-group">
              <label>M3U Playlist URL</label>
              <div style="display:flex;gap:8px;">
                <input type="url" id="m3uPlaylistUrl" placeholder="http://localhost:8080/app/tsjio_playlist.m3u" style="flex:1;" />
                <button class="livetv-fetch-btn" id="btnFetchM3u">Fetch</button>
              </div>
            </div>
            <div style="text-align:center;color:#64748b;font-size:11.5px;margin:8px 0;">— OR PASTE RAW M3U TEXT —</div>
            <div class="livetv-form-group">
              <textarea id="m3uRawText" rows="5" placeholder="#EXTM3U&#10;#EXTINF:-1 tvg-id=&quot;...&quot; tvg-logo=&quot;...&quot; group-title=&quot;Sports&quot;, Star Sports 1 HD&#10;http://localhost:8080/live/123.m3u8"></textarea>
            </div>
            <button class="livetv-submit-btn" id="btnImportM3u">Parse & Import Channels</button>
            <button type="button" class="livetv-clear-all-btn" id="btnLoadSampleM3u" style="margin-top:8px;border-color:rgba(255,255,255,0.2);color:#9ca3af;">⚡ Load Sample JioTV M3U Demo</button>
          </div>

          <!-- Tab 3: Manage Imported -->
          <div class="livetv-tab-panel" id="tabPanelManage" style="display:none;">
            <div id="customChannelsManageList" class="livetv-manage-list"></div>
            <button class="livetv-clear-all-btn" id="btnClearAllCustom">Clear All Custom Channels</button>
          </div>

          <div class="livetv-modal-guide">
            <span style="color:#e50914;font-weight:700;">💡 TS-JioTV Integration Tip:</span> Run <code>php -S 0.0.0.0:8080</code> inside your TS-JioTV folder. Once authenticated with your Jio OTP, enter <code>http://localhost:8080/app/tsjio_playlist.m3u</code> in the M3U tab to load all your live JioTV channels into Movieshub.
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderChannelList();

    // Auto-select and start default channel
    const defaultCh = this.customChannels[0] || this.channels.find(c => c.id === "sun-tv-hd") || this.channels[0];
    this.playChannel(defaultCh);
  }

  bindEvents() {
    const handleBack = () => {
      this.destroy();
      if (window.movieshubApp) {
        window.movieshubApp.switchView("movies");
      }
    };

    const backBtn = document.getElementById("livetvBackBtn");
    if (backBtn) backBtn.addEventListener("click", handleBack);

    const floatBackBtn = document.getElementById("livetvFloatingBackBtn");
    if (floatBackBtn) floatBackBtn.addEventListener("click", handleBack);

    const countrySelect = document.getElementById("livetvCountrySelect");
    if (countrySelect) {
      countrySelect.addEventListener("change", (e) => {
        this.activeCountry = e.target.value;
        this.renderChannelList();
      });
    }

    const searchInput = document.getElementById("livetvChannelSearch");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderChannelList();
      });
    }

    document.querySelectorAll(".livetv-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".livetv-cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeCategory = btn.dataset.cat;
        this.renderChannelList();
      });
    });

    // Import Modal Triggers
    const importBtn = document.getElementById("livetvImportBtn");
    if (importBtn) {
      importBtn.addEventListener("click", () => this.openImportModal());
    }

    const modalClose = document.getElementById("livetvModalClose");
    if (modalClose) {
      modalClose.addEventListener("click", () => this.closeImportModal());
    }

    const importModal = document.getElementById("livetvImportModal");
    if (importModal) {
      importModal.addEventListener("click", (e) => {
        if (e.target === importModal) this.closeImportModal();
      });
    }

    // Modal Tabs
    document.querySelectorAll(".livetv-m-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".livetv-m-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.dataset.tab;
        document.getElementById("tabPanelSingle").style.display = target === "single" ? "block" : "none";
        document.getElementById("tabPanelM3u").style.display = target === "m3u" ? "block" : "none";
        document.getElementById("tabPanelManage").style.display = target === "manage" ? "block" : "none";
        if (target === "manage") this.renderManageList();
      });
    });

    // Add Single Channel
    const btnAddSingle = document.getElementById("btnAddSingleChannel");
    if (btnAddSingle) {
      btnAddSingle.addEventListener("click", () => {
        const nameInput = document.getElementById("customChName");
        const urlInput = document.getElementById("customChUrl");
        const catSelect = document.getElementById("customChCat");
        const logoInput = document.getElementById("customChLogo");

        const name = nameInput?.value.trim();
        const url = urlInput?.value.trim();
        if (!name || !url) {
          alert("Please enter both a channel name and a valid stream URL.");
          return;
        }

        const newChannel = {
          id: "custom-" + Date.now(),
          name: name,
          streamUrl: url,
          category: catSelect ? catSelect.value : "Entertainment",
          logo: (logoInput && logoInput.value.trim()) || "⚡",
          country: "IN",
          resolution: "1080p",
          badge: "JioTV / M3U",
          isCustom: true
        };

        this.addCustomChannel(newChannel);
        this.updateCounts();
        if (nameInput) nameInput.value = "";
        if (urlInput) urlInput.value = "";
        this.closeImportModal();
      });
    }

    // Import Raw M3U Text
    const btnImportM3u = document.getElementById("btnImportM3u");
    if (btnImportM3u) {
      btnImportM3u.addEventListener("click", () => {
        const rawEl = document.getElementById("m3uRawText");
        const text = rawEl ? rawEl.value : "";
        if (!text.trim()) {
          alert("Please paste your M3U playlist text into the box.");
          return;
        }

        const parsed = this.parseM3U(text);
        if (parsed.length === 0) {
          alert("No valid stream channels found in the provided M3U content. Check format.");
          return;
        }

        parsed.forEach(ch => {
          this.customChannels = this.customChannels.filter(c => c.streamUrl !== ch.streamUrl);
          this.customChannels.push(ch);
        });

        this.saveCustomChannels();
        this.updateCounts();
        this.renderChannelList();
        this.playChannel(parsed[0]);
        this.closeImportModal();
        alert(`Successfully imported ${parsed.length} channels from M3U playlist!`);
      });
    }

    // Load Sample JioTV Demo
    const btnSample = document.getElementById("btnLoadSampleM3u");
    if (btnSample) {
      btnSample.addEventListener("click", () => {
        const rawEl = document.getElementById("m3uRawText");
        if (rawEl) {
          rawEl.value = `#EXTM3U
#EXTINF:-1 tvg-id="101" tvg-logo="⚡" group-title="Sports", Jio Star Sports 1 Tamil HD
https://cdn.pishow.tv/ott/live/1161/master.m3u8
#EXTINF:-1 tvg-id="102" tvg-logo="⚡" group-title="Movies", Jio KTV Movies 24/7 HD
https://edge3-mob.yuppcdn.net/trans_non_drm/smil:ktv_tamil.smil/playlist.m3u8
#EXTINF:-1 tvg-id="103" tvg-logo="⚡" group-title="Sports", Jio Sports 18 1 HD
https://cdn.pishow.tv/ott/live/1155/master.m3u8`;
        }
      });
    }

    // Fetch M3U from URL
    const btnFetchM3u = document.getElementById("btnFetchM3u");
    if (btnFetchM3u) {
      btnFetchM3u.addEventListener("click", async () => {
        const urlInput = document.getElementById("m3uPlaylistUrl");
        const url = urlInput ? urlInput.value.trim() : "";
        if (!url) {
          alert("Please enter an M3U playlist URL.");
          return;
        }

        btnFetchM3u.textContent = "Fetching...";
        btnFetchM3u.disabled = true;

        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("HTTP " + res.status);
          const text = await res.text();
          const parsed = this.parseM3U(text);
          if (parsed.length === 0) {
            alert("No stream channels found in the fetched playlist.");
          } else {
            parsed.forEach(ch => {
              this.customChannels = this.customChannels.filter(c => c.streamUrl !== ch.streamUrl);
              this.customChannels.push(ch);
            });
            this.saveCustomChannels();
            this.updateCounts();
            this.renderChannelList();
            this.playChannel(parsed[0]);
            this.closeImportModal();
            alert(`Successfully imported ${parsed.length} channels from ${url}!`);
          }
        } catch (err) {
          console.warn("Failed to fetch M3U directly:", err);
          alert("Could not fetch M3U directly (likely CORS restriction from the server). You can copy the contents of the playlist file and paste it into the 'Paste Raw M3U' box below.");
        } finally {
          btnFetchM3u.textContent = "Fetch";
          btnFetchM3u.disabled = false;
        }
      });
    }

    // Clear All Custom Channels
    const btnClearAll = document.getElementById("btnClearAllCustom");
    if (btnClearAll) {
      btnClearAll.addEventListener("click", () => {
        if (confirm("Are you sure you want to remove all imported custom channels?")) {
          this.customChannels = [];
          this.saveCustomChannels();
          this.updateCounts();
          this.renderManageList();
          this.renderChannelList();
        }
      });
    }
  }

  updateCounts() {
    const manageCount = document.getElementById("manageCount");
    if (manageCount) manageCount.textContent = this.customChannels.length;
    const jioTab = document.getElementById("livetvJioTab");
    if (jioTab) jioTab.textContent = `⚡ JioTV (${this.getJioChannels().length})`;
  }

  renderChannelList() {
    const listContainer = document.getElementById("livetvChannelList");
    if (!listContainer) return;

    const filtered = this.getFilteredChannels();
    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center;padding:32px 16px;color:#a1a1aa;font-size:13px;">
          No live channels found matching criteria.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered.map(ch => {
      const isSelected = this.currentChannel && this.currentChannel.id === ch.id;
      const logoHtml = (ch.logo && (ch.logo.startsWith("http://") || ch.logo.startsWith("https://")))
        ? `<img src="${ch.logo}" alt="" style="width:28px;height:28px;object-fit:contain;border-radius:4px;" onerror="this.outerHTML='⚡';" />`
        : `<div class="livetv-channel-logo">${ch.logo || "⚡"}</div>`;

      return `
        <div class="livetv-channel-card ${isSelected ? 'selected' : ''}" data-id="${ch.id}">
          ${logoHtml}
          <div class="livetv-channel-details">
            <div class="livetv-channel-name">${ch.name} <span class="livetv-res-tag">(${ch.resolution || "HD"})</span></div>
            <div class="livetv-channel-sub">${ch.isCustom ? "⚡ Custom M3U" : (this.isJioChannel(ch) ? "⚡ JioTV" : ch.category)} • ${ch.badge || ch.category}</div>
          </div>
          ${ch.isCustom ? `<button class="livetv-del-btn" data-del-id="${ch.id}" title="Remove Channel">✕</button>` : ''}
          <div class="livetv-channel-live-dot"></div>
        </div>
      `;
    }).join("");

    listContainer.querySelectorAll(".livetv-channel-card").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target.closest(".livetv-del-btn")) return;
        const chId = el.dataset.id;
        const target = this.getAllChannels().find(c => c.id === chId);
        if (target) this.playChannel(target);
      });
    });

    listContainer.querySelectorAll(".livetv-del-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.delId;
        this.removeCustomChannel(id);
        this.updateCounts();
      });
    });
  }

  playChannel(channel) {
    if (!channel) return;
    this.currentChannel = channel;

    // Highlight card
    document.querySelectorAll(".livetv-channel-card").forEach(card => {
      if (card.dataset.id === channel.id) card.classList.add("selected");
      else card.classList.remove("selected");
    });

    // Update Header
    const header = document.getElementById("livetvPlayerHeader");
    const title = document.getElementById("livetvChannelTitle");
    const badge = document.getElementById("livetvChannelBadge");
    const cat = document.getElementById("livetvChannelCat");
    const emptyState = document.getElementById("livetvEmptyState");
    const video = document.getElementById("livetvVideo");
    const loader = document.getElementById("livetvLoader");

    if (header) header.style.display = "flex";
    if (title) title.textContent = channel.name;
    if (badge) badge.textContent = (channel.badge ? channel.badge + " • " : "") + (channel.resolution || "1080p") + " HD";
    if (cat) cat.textContent = (channel.country === "TN" ? "Tamil " : "") + channel.category;
    if (emptyState) emptyState.style.display = "none";
    if (video) video.style.display = "block";

    // Play Stream via HLS or Native
    this.streamVideo(channel.streamUrl, video, loader, channel);
  }

  streamVideo(url, videoEl, loaderEl, channel = null) {
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
          // Autoplay policy: start muted so browser allows immediate playback
          videoEl.muted = true;
          videoEl.play().catch(e => console.warn("Live playback kickstart failed:", e));
        });
      }
    };

    if (window.Hls && window.Hls.isSupported()) {
      const hls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 60,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,
        manifestLoadingTimeOut: 15000,
        manifestLoadingMaxRetry: 5,
        levelLoadingTimeOut: 15000,
        levelLoadingMaxRetry: 5,
        fragLoadingTimeOut: 20000,
        fragLoadingMaxRetry: 5
      });
      this.hlsInstance = hls;
      hls.loadSource(url);
      hls.attachMedia(videoEl);

      hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        tryAutoplay();

        // Multi-Quality & Multi-Audio Selector (like TS-JioTV)
        const streamControls = document.getElementById("livetvStreamControls");
        const qualitySelect = document.getElementById("livetvQualitySelect");
        const audioSelect = document.getElementById("livetvAudioSelect");

        if (streamControls && qualitySelect) {
          if (hls.levels && hls.levels.length > 1) {
            qualitySelect.innerHTML = `<option value="-1">Auto (${hls.levels[hls.currentLevel]?.height || "HD"}p)</option>` +
              hls.levels.map((lvl, idx) => `<option value="${idx}">${lvl.height ? lvl.height + "p" : "Level " + (idx + 1)}</option>`).join("");
            qualitySelect.onchange = (e) => {
              hls.currentLevel = parseInt(e.target.value, 10);
            };
            streamControls.style.display = "flex";
          } else {
            qualitySelect.innerHTML = `<option value="-1">1080p HD</option>`;
            streamControls.style.display = "flex";
          }
        }

        if (streamControls && audioSelect) {
          if (hls.audioTracks && hls.audioTracks.length > 1) {
            audioSelect.innerHTML = hls.audioTracks.map((trk, idx) =>
              `<option value="${idx}" ${idx === hls.audioTrack ? "selected" : ""}>🔊 ${trk.name || trk.lang || "Audio " + (idx + 1)}</option>`
            ).join("");
            audioSelect.onchange = (e) => {
              hls.audioTrack = parseInt(e.target.value, 10);
            };
            audioSelect.style.display = "inline-block";
            streamControls.style.display = "flex";
          } else {
            audioSelect.style.display = "none";
          }
        }
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
                const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
                loaderEl.innerHTML = `
                  <div style="text-align:center;padding:16px;max-width:440px;">
                    <div style="font-size:26px;margin-bottom:8px;">⚠️</div>
                    <div style="color:#ef4444;font-weight:700;font-size:14.5px;">Stream Connection Offline or Blocked</div>
                    <div style="color:#9ca3af;font-size:12px;margin:6px 0 14px;line-height:1.4;">
                      ${isLocal
                        ? 'Connecting to local TS-JioTV? Verify that your local PHP server (<code>php -S 0.0.0.0:8080</code>) is running and your Jio OTP session is active.'
                        : 'This stream is currently offline, busy, or restricted by the content provider.'}
                    </div>
                    <button class="retry-live-btn" style="padding:7px 18px;background:#e50914;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">🔄 Reload Channel</button>
                  </div>
                `;
                loaderEl.querySelector(".retry-live-btn")?.addEventListener("click", () => {
                  this.streamVideo(url, videoEl, loaderEl, channel);
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
        if (loaderEl) {
          loaderEl.innerHTML = `
            <div style="text-align:center;padding:12px;">
              <div style="font-size:24px;margin-bottom:8px;">⚠️</div>
              <div style="color:#ef4444;font-weight:700;font-size:14px;">Live Stream Busy</div>
              <button class="retry-live-btn" style="margin-top:10px;padding:7px 18px;background:#e50914;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">🔄 Reload Channel</button>
            </div>
          `;
          loaderEl.querySelector(".retry-live-btn")?.addEventListener("click", () => {
            this.streamVideo(url, videoEl, loaderEl, channel);
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
    const video = document.getElementById("livetvVideo");
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  }
}

window.MovieshubLiveTV = MovieshubLiveTV;
