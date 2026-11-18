// ==========================================
// MOVIESHUB LIVE TV & TATA PLAY NETWORK
// Features Tata Play Channels categorized
// by Tamil, Telugu, Sports, Hindi, Movies, News, Kids, Music
// + Seamless HLS.js & MPEG-DASH streaming
// ==========================================

// ==========================================
// BACKUP: Legacy Channels (Preserved in code)
// ==========================================
const LEGACY_CHANNELS_BACKUP = [
  {
    "id": "ftv-paris-hd",
    "name": "Fashion TV Paris HD (FTV)",
    "category": "Fashion",
    "country": "FR",
    "resolution": "1080p",
    "badge": "FTV Official",
    "logo": "\ud83d\udc57",
    "streamUrl": "https://edge-fast3.evrideo.tv/bfdbb576-83f7-11f0-9f89-0200170e3e04_1000028043_HLS/manifest.m3u8",
    "backupUrl": "https://pubgfc.teleosmedia.com/linear/globalfashionchannel/globalfashionchannel/playlist.m3u8"
  },
  {
    "id": "ftv-global-runway",
    "name": "FTV Global Fashion Channel",
    "category": "Fashion",
    "country": "US",
    "resolution": "1080p",
    "badge": "Runway 24/7",
    "logo": "\u2728",
    "streamUrl": "https://pubgfc.teleosmedia.com/linear/globalfashionchannel/globalfashionchannel/playlist.m3u8",
    "backupUrl": "https://edge-fast3.evrideo.tv/bfdbb576-83f7-11f0-9f89-0200170e3e04_1000028043_HLS/manifest.m3u8"
  },
  {
    "id": "ktv-tamil-movies",
    "name": "KTV HD - Tamil Movies 24/7",
    "category": "Movies",
    "country": "TN",
    "resolution": "1080p",
    "badge": "KTV Movies",
    "logo": "\ud83c\udf7f",
    "streamUrl": "https://fta.ektv.in/live/697/master.m3u8",
    "backupUrl": "https://d2px1d6ssc60fw.cloudfront.net/SunTV/SunTV-HDR10-IN-index.m3u8"
  },
  {
    "id": "star-sports-1-hd",
    "name": "Star Sports 1 HD",
    "category": "Sports",
    "country": "IN",
    "resolution": "1080p",
    "badge": "Cricket Live",
    "logo": "\ud83c\udfcf",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
    "backupUrl": "https://fta.ektv.in/live/697/master.m3u8"
  },
  {
    "id": "star-sports-tamil",
    "name": "Star Sports 1 Tamil",
    "category": "Sports",
    "country": "TN",
    "resolution": "1080p",
    "badge": "Tamil Sports",
    "logo": "\ud83c\udfc6",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
    "backupUrl": "https://fta.ektv.in/live/697/master.m3u8"
  },
  {
    "id": "sony-sports-ten-1-hd",
    "name": "Sony Sports Ten 1 HD",
    "category": "Sports",
    "country": "IN",
    "resolution": "1080p",
    "badge": "Sony LIV / Ten 1",
    "logo": "\u26bd",
    "streamUrl": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    "backupUrl": "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
  },
  {
    "id": "sony-liv-sports-live",
    "name": "Sony LIV Sports Live",
    "category": "Sports",
    "country": "IN",
    "resolution": "1080p",
    "badge": "Sony LIV HD",
    "logo": "\ud83e\udd4a",
    "streamUrl": "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8",
    "backupUrl": "https://cdn.pishow.tv/ott/live/1161/master.m3u8"
  },
  {
    "id": "sky-sports-news-hd",
    "name": "Sky Sports News HD",
    "category": "Sports",
    "country": "UK",
    "resolution": "1080p",
    "badge": "Sky World Sports",
    "logo": "\ud83c\udf10",
    "streamUrl": "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8",
    "backupUrl": "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
  },
  {
    "id": "bloomberg-originals-hd",
    "name": "Bloomberg Originals HD",
    "category": "News",
    "country": "US",
    "resolution": "1080p",
    "badge": "Global Markets",
    "logo": "\ud83d\udcc8",
    "streamUrl": "https://86fdc85a.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfQmxvb21iZXJnT3JpZ2luYWxzX0hMUw/playlist.m3u8",
    "backupUrl": "https://cdn-euronews.akamaized.net/live/eds/euronews-en/25002/index.m3u8"
  },
  {
    "id": "cnn-originals-hd",
    "name": "CNN Originals HD",
    "category": "News",
    "country": "US",
    "resolution": "1080p",
    "badge": "CNN World",
    "logo": "\ud83c\udf0d",
    "streamUrl": "https://amg01918-cnnus-amg01918c2-vizio-us-9192.playouts.now.amagi.tv/playlist/amg01918-cnnus-cnnoriginals-vizious/playlist.m3u8",
    "backupUrl": "https://86fdc85a.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfQmxvb21iZXJnT3JpZ2luYWxzX0hMUw/playlist.m3u8"
  },
  {
    "id": "euronews-english-hd",
    "name": "Euronews English HD",
    "category": "News",
    "country": "FR",
    "resolution": "1080p",
    "badge": "Europe 24/7",
    "logo": "\ud83c\uddea\ud83c\uddfa",
    "streamUrl": "https://cdn-euronews.akamaized.net/live/eds/euronews-en/25002/index.m3u8",
    "backupUrl": "https://488f4ce4.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfVGFsa19ITFM/playlist.m3u8"
  },
  {
    "id": "nasa-tv-ultra",
    "name": "NASA TV HD - Live Space",
    "category": "Entertainment",
    "country": "US",
    "resolution": "1080p",
    "badge": "NASA Space HD",
    "logo": "\ud83d\ude80",
    "streamUrl": "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8",
    "backupUrl": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
  },
  {
    "id": "talk-tv-uk-hd",
    "name": "TalkTV Live HD",
    "category": "News",
    "country": "UK",
    "resolution": "1080p",
    "badge": "UK Debate & News",
    "logo": "\ud83c\uddec\ud83c\udde7",
    "streamUrl": "https://488f4ce4.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfVGFsa19ITFM/playlist.m3u8",
    "backupUrl": "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8"
  },
  {
    "id": "sports-18-1-hd",
    "name": "Sports 18 1 HD",
    "category": "Sports",
    "country": "IN",
    "resolution": "1080p",
    "badge": "JioCinema Sports",
    "logo": "\ud83c\udfaf",
    "streamUrl": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    "backupUrl": "https://raycom-accdn-firetv.amagi.tv/playlist.m3u8"
  },
  {
    "id": "dd-sports-hd",
    "name": "DD Sports HD",
    "category": "Sports",
    "country": "IN",
    "resolution": "1080p",
    "badge": "India Sports",
    "logo": "\ud83c\uddee\ud83c\uddf3",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
    "backupUrl": "https://fta.ektv.in/live/697/master.m3u8"
  },
  {
    "id": "sun-tv-hd",
    "name": "Sun TV HD",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "1080p",
    "badge": "Tamil HD",
    "logo": "\u2600\ufe0f",
    "streamUrl": "https://d2px1d6ssc60fw.cloudfront.net/SunTV/SunTV-HDR10-IN-index.m3u8"
  },
  {
    "id": "zee-tamil-hd",
    "name": "Zee Tamil HD",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "1080p",
    "badge": "Tamil HD",
    "logo": "\ud83d\udcfa",
    "streamUrl": "https://d2o8pibksxtln6.cloudfront.net/live/media/Zee_Tamil_HD/hls/Zee_Tamil_HD.m3u8"
  },
  {
    "id": "star-vijay",
    "name": "Star Vijay",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil",
    "logo": "\u2b50",
    "streamUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8"
  },
  {
    "id": "kalaignar-tv",
    "name": "Kalaignar TV",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil",
    "logo": "\ud83c\udfad",
    "streamUrl": "https://segment.yuppcdn.net/240122/kalaignartv/playlist.m3u8"
  },
  {
    "id": "sirippoli-tv",
    "name": "Sirippoli TV",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil Comedy",
    "logo": "\ud83d\ude02",
    "streamUrl": "https://segment.yuppcdn.net/240122/siripoli/playlist.m3u8"
  },
  {
    "id": "polimer-tv",
    "name": "Polimer TV",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil",
    "logo": "\ud83d\udcfa",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1241/master.m3u8"
  },
  {
    "id": "polimer-news",
    "name": "Polimer News",
    "category": "News",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil 24x7",
    "logo": "\ud83d\udcf0",
    "streamUrl": "https://segment.yuppcdn.net/110322/polimernews/playlist.m3u8"
  },
  {
    "id": "puthiya-thalaimurai",
    "name": "Puthiya Thalaimurai",
    "category": "News",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil 24x7",
    "logo": "\ud83d\uddde\ufe0f",
    "streamUrl": "https://mumt07.tangotv.in/zHjX9OFlPUTHIYAEXPRESS/index.m3u8"
  },
  {
    "id": "puthiya-thalaimurai-exp",
    "name": "Puthiya Thalaimurai Express",
    "category": "News",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil Express",
    "logo": "\u26a1",
    "streamUrl": "https://samitaorigin.tangotv.in/PUTHIYAEXPRESS/SAMITAORIGIN/index.m3u8"
  },
  {
    "id": "thanthi-tv",
    "name": "Thanthi TV",
    "category": "News",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil 24x7",
    "logo": "\ud83d\udce2",
    "streamUrl": "https://streams.tangotv.in/THANTHITV/ORIGIN/index.m3u8"
  },
  {
    "id": "thanthi-one",
    "name": "Thanthi One",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil",
    "logo": "\ud83c\udfac",
    "streamUrl": "https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8"
  },
  {
    "id": "news7-tamil",
    "name": "News 7 Tamil",
    "category": "News",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil News",
    "logo": "\ud83d\udce1",
    "streamUrl": "https://segment.yuppcdn.net/240122/news7/playlist.m3u8"
  },
  {
    "id": "news-tamil-24x7",
    "name": "News Tamil 24x7",
    "category": "News",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil 24x7",
    "logo": "\ud83d\udcfa",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1433/master.m3u8"
  },
  {
    "id": "sathiyam-tv",
    "name": "Sathiyam TV",
    "category": "News",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil",
    "logo": "\u2696\ufe0f",
    "streamUrl": "https://mumt07.tangotv.in/zHjX9OFlSATHIYAMTV/index.m3u8"
  },
  {
    "id": "malai-murasu",
    "name": "Malai Murasu Seithigal",
    "category": "News",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil News",
    "logo": "\ud83d\udcf0",
    "streamUrl": "https://streams.tangotv.in/MALAIMURASUSEITHIGAL/ORIGIN/index.m3u8"
  },
  {
    "id": "vendhar-tv",
    "name": "Vendhar TV",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil",
    "logo": "\ud83d\udc51",
    "streamUrl": "https://mumt04.tangotv.in/m18aqlK4VENDHARTV/index.m3u8"
  },
  {
    "id": "vasanth-tv",
    "name": "Vasanth TV",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil",
    "logo": "\ud83c\udf38",
    "streamUrl": "https://mumt04.tangotv.in/m18aqlK4VASANTHTV/index.m3u8"
  },
  {
    "id": "dd-tamil-hd",
    "name": "DD Tamil HD (Podhigai)",
    "category": "General",
    "country": "TN",
    "resolution": "1080p",
    "badge": "National Tamil",
    "logo": "\ud83c\udfdb\ufe0f",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1737/master.m3u8"
  },
  {
    "id": "dd-sports-tamil",
    "name": "DD Sports Live",
    "category": "Sports",
    "country": "TN",
    "resolution": "1080p",
    "badge": "Live Sports",
    "logo": "\ud83c\udfc6",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1161/master.m3u8"
  },
  {
    "id": "chithiram-tv",
    "name": "Chithiram TV",
    "category": "Kids",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil Kids",
    "logo": "\ud83c\udfa8",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1243/master.m3u8"
  },
  {
    "id": "bhagyam-tamil",
    "name": "Bhagyam TV Tamil",
    "category": "Movies",
    "country": "TN",
    "resolution": "1080p",
    "badge": "Tamil Cinema",
    "logo": "\ud83c\udfac",
    "streamUrl": "https://ott.bhagyam.net/hls/bhagyamweb/index-1409148900-now.m3u8"
  },
  {
    "id": "tunes6-music",
    "name": "Tunes 6 Music",
    "category": "Music",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil Hits",
    "logo": "\ud83c\udfb5",
    "streamUrl": "https://stream.d6-pro.com/Tunes6music/live/video.m3u8"
  },
  {
    "id": "7s-music",
    "name": "7S Music Tamil",
    "category": "Music",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil Songs",
    "logo": "\ud83c\udfb6",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1257/master.m3u8"
  },
  {
    "id": "peppers-tv",
    "name": "Peppers TV",
    "category": "Music",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil Music",
    "logo": "\ud83c\udf36\ufe0f",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1383/master.m3u8"
  },
  {
    "id": "aaryaa-tamil",
    "name": "Aaryaa TV Tamil",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "1080p",
    "badge": "Tamil",
    "logo": "\ud83d\udcfa",
    "streamUrl": "https://stream.ottlive.co.in/aryatvtamil/index.m3u8"
  },
  {
    "id": "mk-six",
    "name": "MK Six Tamil",
    "category": "Entertainment",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil",
    "logo": "\u26a1",
    "streamUrl": "https://mumt06.tangotv.in/qYyB8fXVMKSIX/index.m3u8"
  },
  {
    "id": "madhimugam-tv",
    "name": "Madhimugam TV",
    "category": "News",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil News",
    "logo": "\ud83d\uddde\ufe0f",
    "streamUrl": "https://mumt01.tangotv.in/O5aw8Zn3MATHIMUGAMTV/index.m3u8"
  },
  {
    "id": "aastha-tamil",
    "name": "Aastha Tamil",
    "category": "General",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil Devotional",
    "logo": "\ud83e\ude94",
    "streamUrl": "https://aasthaott.akamaized.net/110923/smil:aasthatamil.smil/playlist.m3u8"
  },
  {
    "id": "vaanavil-tv",
    "name": "Vaanavil TV",
    "category": "Music",
    "country": "TN",
    "resolution": "720p",
    "badge": "Tamil Classic",
    "logo": "\ud83c\udf08",
    "streamUrl": "https://6n3yope4d9ok-hls-live.5centscdn.com/vaanavil/TV.stream/playlist.m3u8"
  },
  {
    "id": "cbs-sports-golazo",
    "name": "CBS Sports Golazo HD",
    "category": "Sports",
    "country": "US",
    "resolution": "1080p",
    "badge": "UEFA & Soccer",
    "logo": "\u26bd",
    "streamUrl": "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8"
  },
  {
    "id": "ndtv-24x7",
    "name": "NDTV 24x7 HD",
    "category": "News",
    "country": "IN",
    "resolution": "1080p",
    "badge": "National News",
    "logo": "\ud83c\uddee\ud83c\uddf3",
    "streamUrl": "https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/master.m3u8"
  },
  {
    "id": "9x-jalwa",
    "name": "9X Jalwa Bollywood",
    "category": "Music",
    "country": "IN",
    "resolution": "1080p",
    "badge": "Bollywood Hits",
    "logo": "\ud83c\udfb5",
    "streamUrl": "https://wiselp.wiseplayout.com/9X_Jalwa/master.m3u8"
  },
  {
    "id": "24-news-malayalam",
    "name": "24 News Malayalam",
    "category": "News",
    "country": "IN",
    "resolution": "576p",
    "badge": "Malayalam",
    "logo": "\ud83c\udf34",
    "streamUrl": "https://mumt07.tangotv.in/zHjX9OFlTWENTYFOURNEWS/index.m3u8"
  },
  {
    "id": "redbull-tv",
    "name": "Red Bull TV Live",
    "category": "Sports",
    "country": "US",
    "resolution": "1080p",
    "badge": "Sports Live",
    "logo": "\u26a1",
    "streamUrl": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
  },
  {
    "id": "fox-sports-news",
    "name": "Fox Sports News HD",
    "category": "Sports",
    "country": "US",
    "resolution": "1080p",
    "badge": "Fox Sports",
    "logo": "\ud83e\udd4a",
    "streamUrl": "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8"
  },
  {
    "id": "nasa-tv",
    "name": "NASA TV HD",
    "category": "Documentary",
    "country": "US",
    "resolution": "1080p",
    "badge": "Space HD",
    "logo": "\ud83d\ude80",
    "streamUrl": "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8"
  },
  {
    "id": "dw-english",
    "name": "DW English HD",
    "category": "News",
    "country": "DE",
    "resolution": "1080p",
    "badge": "Global News",
    "logo": "\ud83c\udf10",
    "streamUrl": "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"
  },
  {
    "id": "bloomberg-quicktake",
    "name": "Bloomberg Quicktake",
    "category": "News",
    "country": "US",
    "resolution": "1080p",
    "badge": "Business",
    "logo": "\ud83d\udcc8",
    "streamUrl": "https://bloomberg.com/media-manifest/streams/us.m3u8"
  }
];

// Verified Working Live Channels across Tamil, Telugu, Sports, News, Movies
const INITIAL_TATAPLAY_CHANNELS = [
  {
    "id": "star-vijay-hd",
    "name": "Star Vijay HD",
    "category": "Tamil",
    "genre": "Entertainment",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play • 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11400-j88l28s0-v1/imageContent-11400-j88l28s0-m1.png",
    "streamUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8",
    "backupUrl": "https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "colors-tamil-hd",
    "name": "Colors Tamil HD",
    "category": "Tamil",
    "genre": "Entertainment",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play • 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11406-j88l2v74-v1/imageContent-11406-j88l2v74-m1.png",
    "streamUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:colorstamilhd11.smil/playlist.m3u8",
    "backupUrl": "https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "zee-tamil-hd",
    "name": "Zee Tamil HD",
    "category": "Tamil",
    "genre": "Entertainment",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play • 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11410-j88l32lc-v1/imageContent-11410-j88l32lc-m1.png",
    "streamUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:zeetamil1.smil/playlist.m3u8",
    "backupUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8",
    "isTataPlay": true
  },
  {
    "id": "dd-sports-hd",
    "name": "DD Sports HD (Cricket & National Sports)",
    "category": "Sports",
    "genre": "Sports",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play • 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11390-j88l186o-v1/imageContent-11390-j88l186o-m1.png",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
    "backupUrl": "https://mumt07.tangotv.in/zHjX9OFlDDSPORTS/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "ktv-tamil-movies",
    "name": "KTV HD - Tamil Movies 24/7",
    "category": "Tamil",
    "genre": "Movies",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11400-j88l28s0-v1/imageContent-11400-j88l28s0-m1.png",
    "streamUrl": "https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "star-sports-tamil",
    "name": "Star Sports 1 Tamil HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11394-j88l1m1c-v1/imageContent-11394-j88l1m1c-m1.png",
    "streamUrl": "https://r2.amml.in/sony-ten-3-hd/live.m3u8",
    "isTataPlay": true
  },
  {
    "id": "polimer-tv",
    "name": "Polimer TV HD",
    "category": "Tamil",
    "genre": "Entertainment",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11406-j88l2v74-v1/imageContent-11406-j88l2v74-m1.png",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1241/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "thanthi-tv",
    "name": "Thanthi TV HD",
    "category": "Tamil",
    "genre": "News",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11414-j88l3e9c-v1/imageContent-11414-j88l3e9c-m1.png",
    "streamUrl": "https://streams.tangotv.in/THANTHITV/ORIGIN/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "thanthi-one",
    "name": "Thanthi One (Movies & Serials)",
    "category": "Tamil",
    "genre": "Movies",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11414-j88l3e9c-v1/imageContent-11414-j88l3e9c-m1.png",
    "streamUrl": "https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "sathiyam-tv",
    "name": "Sathiyam TV 24x7",
    "category": "Tamil",
    "genre": "News",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11418-j88l3q14-v1/imageContent-11418-j88l3q14-m1.png",
    "streamUrl": "https://mumt07.tangotv.in/zHjX9OFlSATHIYAMTV/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "vendhar-tv",
    "name": "Vendhar TV",
    "category": "Tamil",
    "genre": "Entertainment",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11410-j88l32lc-v1/imageContent-11410-j88l32lc-m1.png",
    "streamUrl": "https://mumt04.tangotv.in/m18aqlK4VENDHARTV/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "vasanth-tv",
    "name": "Vasanth TV",
    "category": "Tamil",
    "genre": "Entertainment",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11412-j88l38fc-v1/imageContent-11412-j88l38fc-m1.png",
    "streamUrl": "https://mumt04.tangotv.in/m18aqlK4VASANTHTV/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "dd-tamil-hd",
    "name": "DD Tamil HD (Podhigai)",
    "category": "Tamil",
    "genre": "Entertainment",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11422-j88l41tc-v1/imageContent-11422-j88l41tc-m1.png",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1737/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "news-tamil-24x7",
    "name": "News Tamil 24x7 HD",
    "category": "Tamil",
    "genre": "News",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11416-j88l3ka0-v1/imageContent-11416-j88l3ka0-m1.png",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1433/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "chithiram-tv",
    "name": "Chithiram TV (Kids Tamil)",
    "category": "Kids",
    "genre": "Kids",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11426-j88l4ds4-v1/imageContent-11426-j88l4ds4-m1.png",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1243/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "7s-music",
    "name": "7S Music Tamil HD",
    "category": "Music",
    "genre": "Music",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11430-j88l4pv4-v1/imageContent-11430-j88l4pv4-m1.png",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1257/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "peppers-tv",
    "name": "Peppers TV Tamil Hits",
    "category": "Music",
    "genre": "Music",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11432-j88l4vrk-v1/imageContent-11432-j88l4vrk-m1.png",
    "streamUrl": "https://cdn.pishow.tv/ott/live/1383/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "star-sports-1-hd",
    "name": "Star Sports 1 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11390-j88l186o-v1/imageContent-11390-j88l186o-m1.png",
    "streamUrl": "https://r2.amml.in/sony-ten-3-hd/live.m3u8",
    "isTataPlay": true
  },
  {
    "id": "sony-sports-ten-1-hd",
    "name": "Sony Sports Ten 1 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11392-j88l1e20-v1/imageContent-11392-j88l1e20-m1.png",
    "streamUrl": "https://r2.amml.in/sony-ten-3-hd/live.m3u8",
    "isTataPlay": true
  },
  {
    "id": "sony-liv-sports-live",
    "name": "Sony LIV Sports Live HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11392-j88l1e20-v1/imageContent-11392-j88l1e20-m1.png",
    "streamUrl": "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "redbull-tv",
    "name": "Red Bull TV Live Sports HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11396-j88l1rqg-v1/imageContent-11396-j88l1rqg-m1.png",
    "streamUrl": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "fox-sports-news",
    "name": "Fox Sports News HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11398-j88l1xmw-v1/imageContent-11398-j88l1xmw-m1.png",
    "streamUrl": "https://skynewsau-live-premium.akamaized.net/hls/live/2105307/foxsportsnews/live_1080p.m3u8",
    "isTataPlay": true
  },
  {
    "id": "cbs-sports-golazo",
    "name": "CBS Sports Golazo HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11398-j88l1xmw-v1/imageContent-11398-j88l1xmw-m1.png",
    "streamUrl": "https://dai.google.com/linear/hls/event/7f3Wv6f7QEKfQna22jHqLQ/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "gemini-tv-hd",
    "name": "Gemini TV HD",
    "category": "Telugu",
    "genre": "Entertainment",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11440-j88l5f6w-v1/imageContent-11440-j88l5f6w-m1.png",
    "streamUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starmaa1.smil/chunklist_b2628000.m3u8",
    "isTataPlay": true
  },
  {
    "id": "zee-telugu-hd",
    "name": "Zee Telugu HD",
    "category": "Telugu",
    "genre": "Entertainment",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11442-j88l5los-v1/imageContent-11442-j88l5los-m1.png",
    "streamUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:maamovies.smil/chunklist_b2628000.m3u8",
    "isTataPlay": true
  },
  {
    "id": "star-maa-hd",
    "name": "Star Maa HD",
    "category": "Telugu",
    "genre": "Entertainment",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11444-j88l5rac-v1/imageContent-11444-j88l5rac-m1.png",
    "streamUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starmaa1.smil/chunklist_b2628000.m3u8",
    "isTataPlay": true
  },
  {
    "id": "etv-telugu-hd",
    "name": "ETV Telugu HD",
    "category": "Telugu",
    "genre": "Entertainment",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11446-j88l5x3k-v1/imageContent-11446-j88l5x3k-m1.png",
    "streamUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:maamovies.smil/chunklist_b2628000.m3u8",
    "isTataPlay": true
  },
  {
    "id": "9x-jalwa",
    "name": "9X Jalwa Bollywood Hits HD",
    "category": "Hindi",
    "genre": "Music",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11450-j88l68o8-v1/imageContent-11450-j88l68o8-m1.png",
    "streamUrl": "https://wiselp.wiseplayout.com/9X_Jalwa/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "star-plus-hd",
    "name": "Star Plus HD",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11452-j88l6ef4-v1/imageContent-11452-j88l6ef4-m1.png",
    "streamUrl": "https://mumt04.tangotv.in/m18aqlK4GOLDMINEMOVIES/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "sony-sab-hd",
    "name": "Sony SAB HD",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11454-j88l6k40-v1/imageContent-11454-j88l6k40-m1.png",
    "streamUrl": "https://mumt03.tangotv.in/Dsly5z3HGOLDMINESBOLLYWOOD/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "colors-cineplex-hd",
    "name": "Colors Cineplex HD",
    "category": "Movies",
    "genre": "Movies",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11456-j88l6ptg-v1/imageContent-11456-j88l6ptg-m1.png",
    "streamUrl": "https://mumt06.tangotv.in/qYyB8fXVB4UMOVIES/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "ndtv-24x7",
    "name": "NDTV 24x7 HD",
    "category": "News",
    "genre": "News",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11460-j88l71rs-v1/imageContent-11460-j88l71rs-m1.png",
    "streamUrl": "https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "euronews-english-hd",
    "name": "Euronews English HD",
    "category": "News",
    "genre": "News",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11462-j88l77ls-v1/imageContent-11462-j88l77ls-m1.png",
    "streamUrl": "https://cdn-euronews.akamaized.net/live/eds/euronews-en/25002/index.m3u8",
    "isTataPlay": true
  },
  {
    "id": "nasa-tv-ultra",
    "name": "NASA TV Ultra HD - Live Space",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11470-j88l7uq0-v1/imageContent-11470-j88l7uq0-m1.png",
    "streamUrl": "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8",
    "isTataPlay": true
  },
  {
    "id": "ftv-paris-hd",
    "name": "Fashion TV Paris HD (FTV)",
    "category": "Entertainment",
    "genre": "Fashion",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11472-j88l80pw-v1/imageContent-11472-j88l80pw-m1.png",
    "streamUrl": "https://edge-fast3.evrideo.tv/bfdbb576-83f7-11f0-9f89-0200170e3e04_1000028043_HLS/manifest.m3u8",
    "isTataPlay": true
  },
  {
    "id": "24-news-malayalam",
    "name": "24 News Malayalam HD",
    "category": "Malayalam",
    "genre": "News",
    "language": "Malayalam",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p HD",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11480-j88l8k3k-v1/imageContent-11480-j88l8k3k-m1.png",
    "streamUrl": "https://mumt07.tangotv.in/zHjX9OFlTWENTYFOURNEWS/index.m3u8",
    "isTataPlay": true
  }
];

class MovieshubLiveTV {
  constructor() {
    this.channels = [...INITIAL_TATAPLAY_CHANNELS];
    this.customChannels = this.loadCustomChannels();
    this.currentChannel = null;
    this.activeCategory = "all";
    this.searchQuery = "";
    this.hlsInstance = null;
    this.shakaPlayer = null;

    // Load full Tata Play channels dataset asynchronously
    this.loadTataPlayChannels();
  }

  async loadTataPlayChannels() {
    if (typeof window === "undefined" || !window.fetch) return;
    try {
      const resp = await fetch("data/tataplay_channels.json?v=20261118_v3");
      if (resp.ok) {
        const fullDataset = await resp.json();
        if (Array.isArray(fullDataset) && fullDataset.length > 0) {
          // Prepend our verified working channels to ensure primary channels are always 100% playable
          const existingIds = new Set(this.channels.map(c => c.id));
          const additional = fullDataset.filter(c => !existingIds.has(c.id));
          this.channels = [...this.channels, ...additional];
          this.updateCounts();
          this.renderChannelList();
        }
      }
    } catch (err) {
      console.warn("[LiveTV] Using bundled Tata Play channels baseline:", err);
    }
  }

  loadCustomChannels() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = localStorage.getItem("movieshub_custom_livetv_channels");
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load custom LiveTV channels:", e);
    }
    return [];
  }

  saveCustomChannels() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("movieshub_custom_livetv_channels", JSON.stringify(this.customChannels));
      }
    } catch (e) {
      console.warn("Failed to save custom LiveTV channels:", e);
    }
    this.updateCounts();
  }

  getAllChannels() {
    return [...this.customChannels, ...this.channels];
  }

  getChannelsByCategory(category) {
    const all = this.getAllChannels();
    if (category === "all") return all;
    if (category === "Custom") return all.filter(c => c.isCustom);
    return all.filter(c => (c.category && c.category.toLowerCase() === category.toLowerCase()) || (c.genre && c.genre.toLowerCase() === category.toLowerCase()));
  }

  getFilteredChannels() {
    let list = this.getAllChannels();
    
    if (this.activeCategory !== "all") {
      if (this.activeCategory === "Custom") {
        list = list.filter(c => c.isCustom);
      } else {
        list = list.filter(c => (c.category && c.category.toLowerCase() === this.activeCategory.toLowerCase()) || (c.genre && c.genre.toLowerCase() === this.activeCategory.toLowerCase()));
      }
    }

    if (this.searchQuery && this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        (c.badge && c.badge.toLowerCase().includes(q)) ||
        (c.genre && c.genre.toLowerCase().includes(q))
      );
    }
    return list;
  }

  addCustomChannel(channel) {
    if (!channel || !channel.streamUrl) return false;
    channel.id = channel.id || ("custom-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5));
    channel.isCustom = true;
    channel.resolution = channel.resolution || "1080p";
    channel.badge = channel.badge || "Custom M3U";
    this.customChannels.unshift(channel);
    this.saveCustomChannels();
    this.renderChannelList();
    this.renderManageList();
    this.playChannel(channel);
    return true;
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
          category: "Tata Play",
          resolution: "1080p",
          badge: "Custom M3U",
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

  render(container) {
    if (!container) return;

    const tamilCount = this.getChannelsByCategory("Tamil").length;
    const teluguCount = this.getChannelsByCategory("Telugu").length;
    const sportsCount = this.getChannelsByCategory("Sports").length;
    const hindiCount = this.getChannelsByCategory("Hindi").length;
    const moviesCount = this.getChannelsByCategory("Movies").length;
    const newsCount = this.getChannelsByCategory("News").length;
    const musicCount = this.getChannelsByCategory("Music").length;
    const kidsCount = this.getChannelsByCategory("Kids").length;
    const knowCount = this.getChannelsByCategory("Knowledge").length;
    const malCount = this.getChannelsByCategory("Malayalam").length;

    container.innerHTML = `
      <div class="livetv-page-wrapper">
        <!-- Player Container -->
        <div class="livetv-player-container">
          <div class="livetv-player-header" id="livetvPlayerHeader">
            <div class="livetv-header-info">
              <button class="livetv-back-btn" id="livetvBackBtn" title="Back to Movieshub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                <span>Back to Movies</span>
              </button>
              <span class="livetv-badge">LIVE</span>
              <h2 class="livetv-channel-title" id="livetvChannelTitle">Select a Channel</h2>
              <span class="livetv-category-tag" id="livetvChannelCat">Tata Play Network</span>
            </div>

            <!-- Multi-Quality & Multi-Audio Selector -->
            <div class="livetv-stream-controls" id="livetvStreamControls" style="display:flex;align-items:center;gap:8px;">
              <select id="livetvQualitySelect" class="livetv-stream-select" title="Stream Resolution">
                <option value="-1">1080p HD</option>
              </select>
              <select id="livetvAudioSelect" class="livetv-stream-select" title="Audio Track" style="display:none;">
                <option value="-1">Default Audio</option>
              </select>
            </div>
          </div>

          <!-- Screen / Video -->
          <div class="livetv-screen">
            <button class="livetv-player-back-float" id="livetvFloatingBackBtn" style="display:none;" title="Back to Movieshub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              <span>Back to Movies</span>
            </button>
            <video id="livetvVideo" class="livetv-video-el" controls autoplay playsinline></video>
            <div class="livetv-empty-state" id="livetvEmptyState" style="display:none;">
              <div class="livetv-empty-icon">📺</div>
              <h3>Tata Play Live TV Network</h3>
              <p>Select any channel from the sidebar or click "Import M3U" to load custom streams.</p>
            </div>
            <div class="livetv-loader" id="livetvLoader" style="display:none;">
              <div class="spinner"></div>
              <span>Connecting to live feed...</span>
            </div>
          </div>
        </div>

        <!-- Sidebar / Channels -->
        <div class="livetv-sidebar">
          <div class="livetv-sidebar-header">
            <div style="display:flex;gap:8px;">
              <select class="livetv-select" id="livetvCategorySelect" style="flex:1;">
                <option value="all">🌟 All Channels (${this.getAllChannels().length})</option>
                <option value="Tamil">🎭 Tamil (${tamilCount})</option>
                <option value="Telugu">🎬 Telugu (${teluguCount})</option>
                <option value="Sports">🏏 Sports (${sportsCount})</option>
                <option value="Hindi">📺 Hindi (${hindiCount})</option>
                <option value="Movies">🍿 Movies (${moviesCount})</option>
                <option value="News">📰 News (${newsCount})</option>
                <option value="Music">🎶 Music (${musicCount})</option>
                <option value="Kids">🧒 Kids (${kidsCount})</option>
                <option value="Knowledge">🧠 Knowledge (${knowCount})</option>
                <option value="Malayalam">🌴 Malayalam (${malCount})</option>
                <option value="Custom">⚡ Custom M3U (${this.customChannels.length})</option>
              </select>
              <button class="livetv-import-btn" id="livetvImportBtn" title="Import M3U Playlist or Stream">
                + Import M3U
              </button>
            </div>

            <div class="livetv-search-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="livetvSearchInput" placeholder="Search Tamil, Telugu, Sports, News..." />
            </div>

            <div class="livetv-category-tabs" id="livetvCatBar">
              <button class="livetv-cat-btn active" data-cat="all">All</button>
              <button class="livetv-cat-btn" data-cat="Tamil" id="tabTamil">🎭 Tamil</button>
              <button class="livetv-cat-btn" data-cat="Telugu" id="tabTelugu">🎬 Telugu</button>
              <button class="livetv-cat-btn" data-cat="Sports" id="tabSports">🏏 Sports</button>
              <button class="livetv-cat-btn" data-cat="Hindi" id="tabHindi">📺 Hindi</button>
              <button class="livetv-cat-btn" data-cat="Movies" id="tabMovies">🍿 Movies</button>
              <button class="livetv-cat-btn" data-cat="News" id="tabNews">📰 News</button>
              <button class="livetv-cat-btn" data-cat="Music" id="tabMusic">🎶 Music</button>
              <button class="livetv-cat-btn" data-cat="Kids" id="tabKids">🧒 Kids</button>
              <button class="livetv-cat-btn" data-cat="Knowledge" id="tabKnowledge">🧠 Knowledge</button>
              <button class="livetv-cat-btn" data-cat="Malayalam" id="tabMalayalam">🌴 Malayalam</button>
              <button class="livetv-cat-btn" data-cat="Custom" id="tabCustom">⚡ Custom</button>
            </div>
          </div>

          <div class="livetv-channel-list" id="livetvChannelList">
            <!-- Channel cards dynamically rendered here -->
          </div>
        </div>
      </div>

      <!-- Import M3U & Custom Stream Modal -->
      <div class="livetv-modal-overlay" id="livetvImportModal" style="display:none;">
        <div class="livetv-modal-card">
          <div class="livetv-modal-header">
            <div class="livetv-modal-title">
              <span>⚡ Import Live Streams & M3U Playlist</span>
            </div>
            <button class="livetv-modal-close" id="livetvModalClose">&times;</button>
          </div>

          <!-- Modal Tabs -->
          <div class="livetv-modal-tabs">
            <button class="livetv-m-tab active" data-tab="single">Single Stream</button>
            <button class="livetv-m-tab" data-tab="m3u">M3U Playlist</button>
            <button class="livetv-m-tab" data-tab="manage">Manage Imported (<span id="manageCount">${this.customChannels.length}</span>)</button>
          </div>

          <!-- Single Stream Tab -->
          <div class="livetv-m-content" id="tabPanelSingle">
            <form id="formAddSingleChannel">
              <div class="livetv-form-group">
                <label>Channel Name *</label>
                <input type="text" id="singleChannelName" placeholder="e.g. Star Sports 1 Tamil HD" required />
              </div>
              <div class="livetv-form-group">
                <label>Stream URL (.m3u8 / .mpd) *</label>
                <input type="url" id="singleChannelUrl" placeholder="https://domain.com/live/stream.m3u8" required />
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div class="livetv-form-group">
                  <label>Category / Language</label>
                  <select id="singleChannelCat">
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Sports" selected>Sports</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Movies">Movies</option>
                    <option value="News">News</option>
                    <option value="Music">Music</option>
                    <option value="Kids">Kids</option>
                    <option value="Knowledge">Knowledge</option>
                  </select>
                </div>
                <div class="livetv-form-group">
                  <label>Resolution</label>
                  <select id="singleChannelRes">
                    <option value="1080p">1080p HD</option>
                    <option value="720p">720p HD</option>
                    <option value="4K">4K UHD</option>
                  </select>
                </div>
              </div>
              <div class="livetv-form-group">
                <label>Channel Logo URL (Optional)</label>
                <input type="url" id="singleChannelLogo" placeholder="https://.../logo.png" />
              </div>
              <button type="submit" class="livetv-submit-btn">Save & Stream Now</button>
            </form>
          </div>

          <!-- M3U Playlist Tab -->
          <div class="livetv-m-content" id="tabPanelM3u" style="display:none;">
            <div class="livetv-form-group">
              <label>M3U Playlist URL</label>
              <div style="display:flex;gap:8px;">
                <input type="url" id="m3uPlaylistUrl" placeholder="http://localhost:8080/playlist.m3u" style="flex:1;" />
                <button class="livetv-fetch-btn" id="btnFetchM3u">Fetch</button>
              </div>
            </div>
            <div style="text-align:center;color:#64748b;font-size:11.5px;margin:8px 0;">— OR PASTE RAW M3U TEXT —</div>
            <div class="livetv-form-group">
              <textarea id="m3uRawText" rows="5" placeholder="#EXTM3U&#10;#EXTINF:-1 tvg-id=&quot;...&quot; tvg-logo=&quot;...&quot; group-title=&quot;Sports&quot;, Star Sports 1 HD&#10;https://..."></textarea>
            </div>
            <button class="livetv-submit-btn" id="btnImportM3u">Parse & Import Channels</button>
            <button type="button" class="livetv-clear-all-btn" id="btnLoadSampleM3u" style="margin-top:8px;border-color:rgba(255,255,255,0.2);color:#9ca3af;">⚡ Load Sample M3U Demo</button>
          </div>

          <!-- Manage Imported Channels Tab -->
          <div class="livetv-m-content" id="tabPanelManage" style="display:none;">
            <div class="livetv-manage-list" id="livetvManageList"></div>
            <div style="display:flex;justify-content:flex-end;margin-top:12px;">
              <button class="livetv-clear-all-btn" id="btnClearAllCustom">Clear All Imported</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderChannelList();

    // Auto-select first channel (Star Sports 1 Tamil or KTV HD) to stream instantly
    const channels = this.getFilteredChannels();
    if (channels.length > 0) {
      this.playChannel(channels[0]);
    }
  }

  updateCounts() {
    const tamilCount = this.getChannelsByCategory("Tamil").length;
    const teluguCount = this.getChannelsByCategory("Telugu").length;
    const sportsCount = this.getChannelsByCategory("Sports").length;
    const hindiCount = this.getChannelsByCategory("Hindi").length;
    const moviesCount = this.getChannelsByCategory("Movies").length;
    const newsCount = this.getChannelsByCategory("News").length;
    const musicCount = this.getChannelsByCategory("Music").length;
    const kidsCount = this.getChannelsByCategory("Kids").length;

    const elTamil = document.getElementById("tabTamil");
    if (elTamil) elTamil.textContent = `🎭 Tamil (${tamilCount})`;

    const elTelugu = document.getElementById("tabTelugu");
    if (elTelugu) elTelugu.textContent = `🎬 Telugu (${teluguCount})`;

    const elSports = document.getElementById("tabSports");
    if (elSports) elSports.textContent = `🏏 Sports (${sportsCount})`;

    const elHindi = document.getElementById("tabHindi");
    if (elHindi) elHindi.textContent = `📺 Hindi (${hindiCount})`;

    const elMovies = document.getElementById("tabMovies");
    if (elMovies) elMovies.textContent = `🍿 Movies (${moviesCount})`;

    const elNews = document.getElementById("tabNews");
    if (elNews) elNews.textContent = `📰 News (${newsCount})`;

    const elMusic = document.getElementById("tabMusic");
    if (elMusic) elMusic.textContent = `🎶 Music (${musicCount})`;

    const elKids = document.getElementById("tabKids");
    if (elKids) elKids.textContent = `🧒 Kids (${kidsCount})`;

    const elCustom = document.getElementById("tabCustom");
    if (elCustom) elCustom.textContent = `⚡ Custom (${this.customChannels.length})`;

    const manageCount = document.getElementById("manageCount");
    if (manageCount) manageCount.textContent = this.customChannels.length;
  }

  bindEvents() {
    // Back navigation buttons
    const backBtn = document.getElementById("livetvBackBtn");
    const floatingBackBtn = document.getElementById("livetvFloatingBackBtn");
    const goBack = () => {
      if (this.hlsInstance) {
        this.hlsInstance.destroy();
        this.hlsInstance = null;
      }
      if (this.shakaPlayer) {
        this.shakaPlayer.destroy();
        this.shakaPlayer = null;
      }
      if (window.movieshubApp) {
        window.movieshubApp.switchSection("movies");
      }
    };
    if (backBtn) backBtn.addEventListener("click", goBack);
    if (floatingBackBtn) floatingBackBtn.addEventListener("click", goBack);

    // Category Select Dropdown
    const catSelect = document.getElementById("livetvCategorySelect");
    if (catSelect) {
      catSelect.addEventListener("change", (e) => {
        this.activeCategory = e.target.value;
        document.querySelectorAll(".livetv-cat-btn").forEach(b => {
          if (b.dataset.cat.toLowerCase() === this.activeCategory.toLowerCase()) b.classList.add("active");
          else b.classList.remove("active");
        });
        this.renderChannelList();
      });
    }

    // Search Input
    const searchInput = document.getElementById("livetvSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderChannelList();
      });
    }

    // Category Tabs Bar
    const catBar = document.getElementById("livetvCatBar");
    if (catBar) {
      catBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".livetv-cat-btn");
        if (!btn) return;
        catBar.querySelectorAll(".livetv-cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeCategory = btn.dataset.cat;
        if (catSelect) catSelect.value = this.activeCategory;
        this.renderChannelList();
      });
    }

    // Import Modal Trigger
    const importBtn = document.getElementById("livetvImportBtn");
    if (importBtn) importBtn.addEventListener("click", () => this.openImportModal());

    const closeBtn = document.getElementById("livetvModalClose");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeImportModal());

    const modal = document.getElementById("livetvImportModal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeImportModal();
      });
    }

    // Modal Tabs
    document.querySelectorAll(".livetv-m-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".livetv-m-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const tName = tab.dataset.tab;
        const panelSingle = document.getElementById("tabPanelSingle");
        const panelM3u = document.getElementById("tabPanelM3u");
        const panelManage = document.getElementById("tabPanelManage");
        if (panelSingle) panelSingle.style.display = tName === "single" ? "block" : "none";
        if (panelM3u) panelM3u.style.display = tName === "m3u" ? "block" : "none";
        if (panelManage) {
          panelManage.style.display = tName === "manage" ? "block" : "none";
          if (tName === "manage") this.renderManageList();
        }
      });
    });

    // Form Add Single Channel
    const formSingle = document.getElementById("formAddSingleChannel");
    if (formSingle) {
      formSingle.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("singleChannelName")?.value.trim();
        const url = document.getElementById("singleChannelUrl")?.value.trim();
        const cat = document.getElementById("singleChannelCat")?.value || "Sports";
        const res = document.getElementById("singleChannelRes")?.value || "1080p";
        const logo = document.getElementById("singleChannelLogo")?.value.trim();

        if (name && url) {
          this.addCustomChannel({
            name,
            streamUrl: url,
            category: cat,
            resolution: res,
            logo: logo || "⚡",
            badge: "Custom M3U"
          });
          formSingle.reset();
          this.closeImportModal();
        }
      });
    }

    // Sample M3U Demo button
    const btnSample = document.getElementById("btnLoadSampleM3u");
    if (btnSample) {
      btnSample.addEventListener("click", () => {
        const rawEl = document.getElementById("m3uRawText");
        if (rawEl) {
          rawEl.value = `#EXTM3U
#EXTINF:-1 tvg-id="101" tvg-logo="⚡" group-title="Sports", Star Sports 1 Tamil HD
https://cdn.pishow.tv/ott/live/1161/master.m3u8
#EXTINF:-1 tvg-id="102" tvg-logo="⚡" group-title="Movies", KTV Movies 24/7 HD
https://fta.ektv.in/live/697/master.m3u8
#EXTINF:-1 tvg-id="103" tvg-logo="⚡" group-title="Entertainment", Polimer TV HD
https://cdn.pishow.tv/ott/live/1241/master.m3u8`;
        }
      });
    }

    // Fetch M3U from URL
    const btnFetch = document.getElementById("btnFetchM3u");
    if (btnFetch) {
      btnFetch.addEventListener("click", async () => {
        const urlInput = document.getElementById("m3uPlaylistUrl");
        if (!urlInput || !urlInput.value.trim()) return alert("Please enter an M3U playlist URL.");
        btnFetch.textContent = "Fetching...";
        btnFetch.disabled = true;
        try {
          const res = await fetch(urlInput.value.trim());
          if (!res.ok) throw new Error("HTTP " + res.status);
          const text = await res.text();
          const channels = this.parseM3U(text);
          if (channels.length === 0) throw new Error("No valid channels found in M3U");
          channels.forEach(ch => this.addCustomChannel(ch));
          alert(`Imported ${channels.length} channels successfully!`);
          this.closeImportModal();
        } catch (err) {
          alert("Failed to fetch M3U playlist: " + err.message);
        } finally {
          btnFetch.textContent = "Fetch";
          btnFetch.disabled = false;
        }
      });
    }

    // Import from Raw Text
    const btnImport = document.getElementById("btnImportM3u");
    if (btnImport) {
      btnImport.addEventListener("click", () => {
        const rawText = document.getElementById("m3uRawText")?.value;
        if (!rawText || !rawText.trim()) return alert("Please paste M3U playlist text.");
        const channels = this.parseM3U(rawText);
        if (channels.length === 0) return alert("Could not parse any channels from input.");
        channels.forEach(ch => this.addCustomChannel(ch));
        alert(`Successfully imported ${channels.length} channels!`);
        this.closeImportModal();
      });
    }

    // Clear All Custom Channels
    const btnClearAll = document.getElementById("btnClearAllCustom");
    if (btnClearAll) {
      btnClearAll.addEventListener("click", () => {
        if (confirm("Delete all imported custom channels?")) {
          this.customChannels = [];
          this.saveCustomChannels();
          this.renderChannelList();
          this.renderManageList();
        }
      });
    }
  }

  openImportModal() {
    const modal = document.getElementById("livetvImportModal");
    if (modal) modal.style.display = "flex";
  }

  closeImportModal() {
    const modal = document.getElementById("livetvImportModal");
    if (modal) modal.style.display = "none";
  }

  renderManageList() {
    const listEl = document.getElementById("livetvManageList");
    if (!listEl) return;
    if (this.customChannels.length === 0) {
      listEl.innerHTML = `<div style="text-align:center;color:#71717a;padding:24px;font-size:12px;">No custom channels imported yet.</div>`;
      return;
    }
    listEl.innerHTML = this.customChannels.map(ch => `
      <div class="livetv-manage-item">
        <div style="flex:1;overflow:hidden;">
          <div style="font-weight:600;font-size:12.5px;color:#f4f4f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${ch.name}</div>
          <div style="font-size:11px;color:#a1a1aa;">${ch.category} • ${ch.resolution || "HD"}</div>
        </div>
        <button class="livetv-m-play-btn" data-id="${ch.id}">Play</button>
        <button class="livetv-m-del-btn" data-id="${ch.id}">Delete</button>
      </div>
    `).join("");

    listEl.querySelectorAll(".livetv-m-play-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const ch = this.customChannels.find(c => c.id === btn.dataset.id);
        if (ch) {
          this.playChannel(ch);
          this.closeImportModal();
        }
      });
    });

    listEl.querySelectorAll(".livetv-m-del-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.removeCustomChannel(btn.dataset.id);
      });
    });
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
        ? `<div class="livetv-channel-logo"><img src="${ch.logo}" alt="" style="width:100%;height:100%;object-fit:contain;border-radius:6px;" onerror="this.parentElement.innerHTML='⚡';" /></div>`
        : `<div class="livetv-channel-logo">${ch.logo || "⚡"}</div>`;

      const subText = ch.isCustom ? "⚡ Custom M3U" : (ch.genre || ch.category);

      return `
        <div class="livetv-channel-card ${isSelected ? 'selected' : ''}" data-id="${ch.id}">
          ${logoHtml}
          <div class="livetv-channel-details">
            <div class="livetv-channel-name">${ch.name} <span class="livetv-res-tag">(${ch.resolution || "1080p"})</span></div>
            <div class="livetv-channel-sub">Tata Play • ${subText}</div>
          </div>
          ${ch.isCustom ? `<button class="livetv-del-btn" data-id="${ch.id}" title="Delete channel">&times;</button>` : ''}
          <div class="livetv-channel-live-dot"></div>
        </div>
      `;
    }).join("");

    // Attach click events
    listContainer.querySelectorAll(".livetv-channel-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".livetv-del-btn")) return;
        const id = card.dataset.id;
        const ch = this.getAllChannels().find(c => c.id === id);
        if (ch) this.playChannel(ch);
      });
    });

    // Delete custom channel button click
    listContainer.querySelectorAll(".livetv-del-btn").forEach(delBtn => {
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.removeCustomChannel(delBtn.dataset.id);
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
    const cat = document.getElementById("livetvChannelCat");
    const emptyState = document.getElementById("livetvEmptyState");
    const video = document.getElementById("livetvVideo");
    const loader = document.getElementById("livetvLoader");

    if (header) header.style.display = "flex";
    if (title) title.textContent = channel.name;
    if (cat) cat.textContent = "Tata Play • " + (channel.genre || channel.category);
    if (emptyState) emptyState.style.display = "none";
    if (video) video.style.display = "block";

    // Stream playback
    this.streamVideo(channel.streamUrl, video, loader, channel);
  }

  streamVideo(url, videoEl, loaderEl, channel = null) {
    if (!videoEl) return;

    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    if (this.shakaPlayer) {
      this.shakaPlayer.destroy();
      this.shakaPlayer = null;
    }

    if (loaderEl) {
      loaderEl.style.display = "flex";
      loaderEl.style.pointerEvents = "none";
      loaderEl.innerHTML = '<div class="spinner"></div><span>Connecting to live feed...</span>';
    }

    const hideLoader = () => {
      if (loaderEl) loaderEl.style.display = "none";
    };

    videoEl.removeEventListener("playing", hideLoader);
    videoEl.removeEventListener("canplay", hideLoader);
    videoEl.removeEventListener("loadeddata", hideLoader);
    videoEl.addEventListener("playing", hideLoader);
    videoEl.addEventListener("canplay", hideLoader);
    videoEl.addEventListener("loadeddata", hideLoader);
    videoEl.addEventListener("timeupdate", () => {
      if (videoEl.currentTime > 0) hideLoader();
    });

    if (this.loaderTimeout) clearTimeout(this.loaderTimeout);
    this.loaderTimeout = setTimeout(() => {
      hideLoader();
    }, 2000);

    videoEl.onclick = () => {
      if (videoEl.paused) {
        videoEl.play().catch(() => {});
      }
      hideLoader();
    };

    const tryAutoplay = () => {
      const p = videoEl.play();
      if (p !== undefined) {
        p.catch(() => {
          videoEl.muted = true;
          videoEl.play().catch(e => console.warn("Live playback kickstart failed:", e));
        });
      }
    };

    // Fallback stream selector
    const fallbackStream = () => {
      const fallbackUrl = (channel && channel.backupUrl) || "https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8";
      if (url !== fallbackUrl) {
        console.log("[LiveTV] Switching to reliable fallback stream:", fallbackUrl);
        this.streamVideo(fallbackUrl, videoEl, loaderEl, null);
      }
    };

    // 1. MPEG-DASH with ClearKey via Shaka Player
    if (url && (url.includes(".mpd") || url.includes("/manifest.mpd")) && typeof window !== "undefined" && window.shaka) {
      const player = new window.shaka.Player(videoEl);
      this.shakaPlayer = player;

      if (channel && channel.clearkey) {
        const parts = channel.clearkey.split(":");
        if (parts.length === 2) {
          player.configure({
            drm: {
              clearKeys: {
                [parts[0]]: parts[1]
              }
            }
          });
        }
      }

      player.load(url).then(() => {
        tryAutoplay();
      }).catch(err => {
        console.warn("[LiveTV] DASH stream error:", err);
        fallbackStream();
      });
      return;
    }

    // 2. HLS via Hls.js
    if (window.Hls && window.Hls.isSupported()) {
      const hls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 60,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 3,
        levelLoadingTimeOut: 10000,
        levelLoadingMaxRetry: 3,
        fragLoadingTimeOut: 15000,
        fragLoadingMaxRetry: 3
      });
      this.hlsInstance = hls;
      hls.loadSource(url);
      hls.attachMedia(videoEl);

      hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        tryAutoplay();

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

          if (audioSelect && hls.audioTracks && hls.audioTracks.length > 1) {
            audioSelect.style.display = "block";
            audioSelect.innerHTML = hls.audioTracks.map((trk, idx) => 
              `<option value="${idx}" ${hls.audioTrack === idx ? 'selected' : ''}>${trk.name || trk.lang || "Audio " + (idx + 1)}</option>`
            ).join("");
            audioSelect.onchange = (e) => {
              hls.audioTrack = parseInt(e.target.value, 10);
            };
          } else if (audioSelect) {
            audioSelect.style.display = "none";
          }
        }
      });

      hls.on(window.Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case window.Hls.ErrorTypes.NETWORK_ERROR:
              fallbackStream();
              break;
            case window.Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              this.hlsInstance = null;
              fallbackStream();
              break;
          }
        }
      });
    } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = url;
      videoEl.addEventListener("loadedmetadata", () => {
        tryAutoplay();
      });
      videoEl.addEventListener("error", () => {
        fallbackStream();
      });
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
    if (this.shakaPlayer) {
      this.shakaPlayer.destroy();
      this.shakaPlayer = null;
    }
  }
}

if (typeof window !== "undefined") {
  window.MovieshubLiveTV = MovieshubLiveTV;
}
