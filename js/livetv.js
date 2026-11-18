// ==========================================
// MOVIESHUB LIVE TV & TATA PLAY NETWORK
// Features 600+ Tata Play Channels categorized
// by Tamil, Telugu, Sports, Hindi, Movies, News, Kids, Music
// + MPEG-DASH ClearKey DRM & HLS.js streaming
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

// Curated Baseline Tata Play channels for instant synchronous display
const INITIAL_TATAPLAY_CHANNELS = [
  {
    "id": "tp-618",
    "channelId": "618",
    "name": "Tata Play Beauty",
    "category": "Lifestyle",
    "genre": "Lifestyle",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12282-ja02jlp4-v2/imageContent-12282-ja02jlp4-m2.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_853/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "a518a7a27df456f0b56b3311efd9bbed:a003b3a166cb88de65356100dd1ee4bf",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "oAOzoWbLiN5lNWEA3R7kvw",
          "kid": "pRinon30VvC1azMR79m77Q"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-840",
    "channelId": "840",
    "name": "Shirdi Sai Baba",
    "category": "Spiritual",
    "genre": "Spiritual",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-56386-kfc14w60-v4/imageContent-56386-kfc14w60-m4.png",
    "streamUrl": "https://delta45tatasky.akamaized.net/out/i/554.mpd",
    "backupUrl": null,
    "clearkey": "ae23c4ee57014d289e0821adbbdfebf9:79094e073e3191e25052b444ca09da4f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "eQlOBz4xkeJQUrREygnaTw",
          "kid": "riPE7lcBTSieCCGtu9/r+Q"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-8",
    "channelId": "8",
    "name": "STAR Plus HD",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-25307-jhrhflww-v1/imageContent-25307-jhrhflww-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_257/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-121",
    "channelId": "121",
    "name": "Tata Play Fitness",
    "category": "Lifestyle",
    "genre": "Lifestyle",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-405-j5jr3sz4-v2/imageContent-405-j5jr3sz4-m2.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_209/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "a3850c8a95e751f6a12f592279668e8f:5794db4e507701ba00c6e3b4bc339dab",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "V5TbTlB3AboAxuO0vDOdqw",
          "kid": "o4UMipXnUfahL1kieWaOjw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-959",
    "channelId": "959",
    "name": "Tata Play Romance",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-67692-kwmxxw08-v2/imageContent-67692-kwmxxw08-m3.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1785/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "d61f6881489f5ba5a8064a03e38d12c5:ee6a3b1b8609e4b6c9a7e3330dc7b381",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "7mo7G4YJ5LbJp+MzDcezgQ",
          "kid": "1h9ogUifW6WoBkoD440SxQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-22",
    "channelId": "22",
    "name": "News World India",
    "category": "News",
    "genre": "Lifestyle",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-52679-k7zx7qqg-v1/imageContent-52679-k7zx7qqg-m2.png",
    "streamUrl": "https://delta31tatasky.akamaized.net/out/i/57073.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-641",
    "channelId": "641",
    "name": "Tata Play Cooking",
    "category": "Lifestyle",
    "genre": "Lifestyle",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-23495-jf92iycg-v3/imageContent-23495-jf92iycg-m4.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_876/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "2725f7382a1552dc881a8b2fba215460:1d81800cfff32d549940533e7c5d7271",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "HYGADP/zLVSZQFM+fF1ycQ",
          "kid": "JyX3OCoVUtyIGosvuiFUYA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-842",
    "channelId": "842",
    "name": "Somnath Temple",
    "category": "Spiritual",
    "genre": "Spiritual",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-56389-kfdgngts-v3/imageContent-56389-kfdgngts-m3.png",
    "streamUrl": "https://delta45tatasky.akamaized.net/out/i/722.mpd",
    "backupUrl": null,
    "clearkey": "a2c22812093c4d16ad3e4180639a9579:6f0dd61d4ea71e912f813a495205242c",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "bw3WHU6nHpEvgTpJUgUkLA",
          "kid": "osIoEgk8TRatPkGAY5qVeQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-244",
    "channelId": "244",
    "name": "Star Bharat HD",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-6895-j6vqhqnc-v2/imageContent-6895-j6vqhqnc-m2.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_411/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-15",
    "channelId": "15",
    "name": "SET HD",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-43-j5fca4k0-v3/imageContent-43-j5fca4k0-m4.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_300/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "019109c38852565088802d20c74aef89:6d49d4256a3f9ed49309f820a1b9d339",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "bUnUJWo/ntSTCfggobnTOQ",
          "kid": "AZEJw4hSVlCIgC0gx0rviQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-559",
    "channelId": "559",
    "name": "SONY SAB",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12081-j9oc38xc-v8/imageContent-12081-j9oc38xc-m7.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_126/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "fcf90127045f5edabc5d94a932f5c6fe:7371b5068aa09b691b1f60045f7b9659",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "c3G1Boqgm2kbH2AEX3uWWQ",
          "kid": "/PkBJwRfXtq8XZSpMvXG/g"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-48",
    "channelId": "48",
    "name": "SONY SAB HD",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-141-j5fpeji0-v3/imageContent-141-j5fpeji0-m3.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_307/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "db6f1dbe0c005c2694914cca4791f6d5:8923ad5aed715a8bf4f78239e10496dc",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "iSOtWu1xWov094I54QSW3A",
          "kid": "228dvgwAXCaUkUzKR5H21Q"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-556",
    "channelId": "556",
    "name": "SET",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12074-j9oat6qw-v6/imageContent-12074-j9oat6qw-m6.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_125/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "08e8faf8154953029ddb1b38766c2693:aac7a11acf23bf8b2ba3c83bb64a36f2",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "qsehGs8jv4sro8g7tko28g",
          "kid": "COj6+BVJUwKd2xs4dmwmkw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-63",
    "channelId": "63",
    "name": "Zee TV HD",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11073-j95e7nyo-v1/imageContent-11073-j95e7nyo-m1.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_258/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-578",
    "channelId": "578",
    "name": "&TV",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12129-j9p7kluo-v2/imageContent-12129-j9p7kluo-m3.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_196/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-52",
    "channelId": "52",
    "name": "Colors HD",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-155-j5frd2uo-v1/imageContent-155-j5frd2uo-m1.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_299/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "27f0719986765b7eba6c470d3e94080e:b0b4e8285738927455337631ba392f6a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "sLToKFc4knRVM3Yxujkvag",
          "kid": "J/BxmYZ2W366bEcNPpQIDg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-40",
    "channelId": "40",
    "name": "&tv HD",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-117-j5fl7440-v1/imageContent-117-j5fl7440-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_303/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-557",
    "channelId": "557",
    "name": "Zee TV",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12077-j9ob4gm0-v2/imageContent-12077-j9ob4gm0-m2.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_182/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-95",
    "channelId": "95",
    "name": "Tata Play Javed Akhtar",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-304-j5ji9otc-v2/imageContent-304-j5ji9otc-m2.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_192/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "ff5ad0d73f6a52a3a308bc10b3f03cf7:62642b04750f811e69813a8984301c53",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "YmQrBHUPgR5pgTqJhDAcUw",
          "kid": "/1rQ1z9qUqOjCLwQs/A89w"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-543",
    "channelId": "543",
    "name": "Colors",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12053-j9o3yhko-v1/imageContent-12053-j9o3yhko-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_101/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "35556ab5abb65968bfac208e2e358a43:e6554bd6a7d1b6837fcda66eca412610",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "5lVL1qfRtoN/zaZuykEmEA",
          "kid": "NVVqtau2WWi/rCCOLjWKQw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-943",
    "channelId": "943",
    "name": "Tata Play Videshi Kahaniyan",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-65443-kty2tkwo-v2/imageContent-65443-kty2tkwo-m2.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1774/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "5b18a83db2005d2f91645df546a7eca4:5911b1e993bd12f59ecc85a7c7500677",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "WRGx6ZO9EvWezIWnx1AGdw",
          "kid": "WxioPbIAXS+RZF31RqfspA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-986",
    "channelId": "986",
    "name": "Tata Play Zindagi",
    "category": "Entertainment",
    "genre": "None",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-70821-l3edt8uw-v1/imageContent-70821-l3edt8uw-m3.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1813/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-142",
    "channelId": "142",
    "name": "UTV Bindass",
    "category": "Music",
    "genre": "Entertainment",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-475-j5jx44s8-v1/imageContent-475-j5jx44s8-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_103/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "e2a1dab14990530daa8d262795da2696:8f30638315744269b85c0b8f41ddc150",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "jzBjgxV0Qmm4XAuPQd3BUA",
          "kid": "4qHasUmQUw2qjSYnldomlg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-964",
    "channelId": "964",
    "name": "Tata Play Classic TV",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/TPCTV_Thumbnail-v4/TPCTV_Thumbnail.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1790/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "b7deb115a4385efaa066bf2b21bd4803:6400d199a06b759e55e40ad7f822b82b",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ZADRmaBrdZ5V5ArX+CK4Kw",
          "kid": "t96xFaQ4XvqgZr8rIb1IAw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-523",
    "channelId": "523",
    "name": "Zee Anmol",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11969-j9luigc0-v2/imageContent-11969-j9luigc0-m2.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_826/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-551",
    "channelId": "551",
    "name": "STAR Utsav",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12060-j9o91vfc-v2/imageContent-12060-j9o91vfc-m2.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_122/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-633",
    "channelId": "633",
    "name": "Investigation Discovery",
    "category": "Knowledge",
    "genre": "Entertainment",
    "language": "English",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-49002-k5cch1cg-v2/imageContent-49002-k5cch1cg-m5.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_867/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "f2b955e9c79259e3b0c802fa5ebee47b:ac859db441e48e20f04947fc383148e6",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "rIWdtEHkjiDwSUf8ODFI5g",
          "kid": "8rlV6ceSWeOwyAL6Xr7kew"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-554",
    "channelId": "554",
    "name": "Sony Pal",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12071-j9oa4gbc-v5/imageContent-12071-j9oa4gbc-m4.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_193/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "0b99991d837a5c5787a2b3984a7b92c9:5a0d6f8509cd77e9fc73caa834c37376",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "Wg1vhQnNd+n8c8qoNMNzdg",
          "kid": "C5mZHYN6XFeHorOYSnuSyQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-297",
    "channelId": "297",
    "name": "Big Magic",
    "category": "Hindi",
    "genre": "Entertainment",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11266-j9j2spmg-v1/imageContent-11266-j9j2spmg-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_476/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-1045",
    "channelId": "1045",
    "name": "Shemaroo UMANG",
    "category": "Entertainment",
    "genre": "None",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/SHEUM_Thumbnail-v2/SHEUM_Thumbnail.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1865/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "24f3688f2deb5b01b2595cdecaf2daab:642d94982f7dccdc2f5f31a3f01b0177",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ZC2UmC99zNwvXzGj8BsBdw",
          "kid": "JPNojy3rWwGyWVzeyvLaqw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-731",
    "channelId": "731",
    "name": "Manoranjan TV",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-43106-jxzlt6x4-v2/imageContent-43106-jxzlt6x4-m7.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_956/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "bd74163737fc58d887de85729d07522a:fa3b66ff6706a80642579a9458858d42",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "+jtm/2cGqAZCV5qUWIWNQg",
          "kid": "vXQWNzf8WNiH3oVynQdSKg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-965",
    "channelId": "965",
    "name": "Manoranjan Grand",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-67799-kx7m7rhc-v1/imageContent-67799-kx7m7rhc-m2.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1793/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "c8ba66a05fea5150a56971e065b61c14:2ef50e4780e583587b795023f5903fcb",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "LvUOR4Dlg1h7eVAj9ZA/yw",
          "kid": "yLpmoF/qUVClaXHgZbYcFA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-326",
    "channelId": "326",
    "name": "DD Kisan",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11350-j9jpk8pk-v1/imageContent-11350-j9jpk8pk-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_510/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-789",
    "channelId": "789",
    "name": "Tata Play Hollywood Local",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-48748-k4jbpl00-v2/imageContent-48748-k4jbpl00-m3.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_980/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "9980d5ea28785cfdac42cd8fbf107376:c8a7037a313f6d7748865a5f0f14334c",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "yKcDejE/bXdIhlpfDxQzTA",
          "kid": "mYDV6ih4XP2sQs2PvxBzdg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-245",
    "channelId": "245",
    "name": "STAR GOLD HD",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/SGHD_Thumbnail-v2/SGHD_Thumbnail.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_412/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-486",
    "channelId": "486",
    "name": "Tata Play Bollywood Premiere",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-43899-jyofyk1s-v4/imageContent-43899-jyofyk1s-m4.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_792/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "f16aa47bcd1a56ccaab70f7c5541fe53:564b6f8f3774919bf1d832d8a267d20f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "Vktvjzd0kZvx2DLYomfSDw",
          "kid": "8Wqke80aVsyqtw98VUH+Uw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-1101",
    "channelId": "1101",
    "name": "Woman",
    "category": "Entertainment",
    "genre": "None",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/WOMFRE_Thumbnail-v1/WOMFRE_Thumbnail.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1914/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "8fc0a784fb6453d897647f578e57dd41:48a51045d8b892921f3a1a70cbf34f17",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "SKUQRdi4kpIfOhpwy/NPFw",
          "kid": "j8CnhPtkU9iXZH9XjlfdQQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-132",
    "channelId": "132",
    "name": "SONY MAX",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-441-j5jt3mmg-v3/imageContent-441-j5jt3mmg-m3.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_198/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "a8638698a12e5764be2929a13b74bb32:f03dd9920c1b413a1d59610da4369c9d",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "8D3ZkgwbQTodWWENpDacnQ",
          "kid": "qGOGmKEuV2S+KSmhO3S7Mg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-1258",
    "channelId": "1258",
    "name": "Tata Play Classic Cinema 2",
    "category": "Movies",
    "genre": "None",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/TPCLC2_Thumbnail-v2/TPCLC2_Thumbnail.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_2045/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "f29f86fb2d46520ca414c8d196e20019:e2bbaeff3fb638f70447a2ca3f66f757",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "4ruu/z+2OPcER6LKP2b3Vw",
          "kid": "8p+G+y1GUgykFMjRluIAGQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-741",
    "channelId": "741",
    "name": "Tata Play Classic Cinema",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-44333-jz3hpme0-v4/imageContent-44333-jz3hpme0-m8.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1630/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "b28bb900985a5385acc0919a99e2881d:5c702206b1005d8a02509e459d62ed1a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "XHAiBrEAXYoCUJ5FnWLtGg",
          "kid": "sou5AJhaU4WswJGameKIHQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-80",
    "channelId": "80",
    "name": "SONY MAX HD",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-243-j5fyl2f4-v3/imageContent-243-j5fyl2f4-m4.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_305/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "83f2d4172d5f5cc0b82729526fc2e626:f02b12170101f60d99416a71fe669a12",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "8CsSFwEB9g2ZQWpx/maaEg",
          "kid": "g/LUFy1fXMC4JylSb8LmJg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-123",
    "channelId": "123",
    "name": "Zee Cinema",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11027-j8yjr8k0-v1/imageContent-11027-j8yjr8k0-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_185/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-503",
    "channelId": "503",
    "name": "Zee Cinema HD",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11915-j9l5clzs-v1/imageContent-11915-j9l5clzs-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_827/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-1130",
    "channelId": "1130",
    "name": "Tata Play Bollywood Masala",
    "category": "Entertainment",
    "genre": "None",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/BMSLA_Thumbnail-v2/BMSLA_Thumbnail.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1924/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "b39373d62f1c58d98df0f9868becd9e2:12b4d0f39dcdfa5d65102ce32dfedb7a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ErTQ853N+l1lECzjLf7beg",
          "kid": "s5Nz1i8cWNmN8PmGi+zZ4g"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-175",
    "channelId": "175",
    "name": "Zee Bollywood",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-31233-jli1wlvc-v1/imageContent-31233-jli1wlvc-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_204/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-267",
    "channelId": "267",
    "name": "&pictures HD",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11173-j9hth720-v1/imageContent-11173-j9hth720-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_454/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-677",
    "channelId": "677",
    "name": "Tata Play ShortsTV",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-34170-jok0hf00-v7/imageContent-34170-jok0hf00-m8.PNG",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_902/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "8fa6697d80545a78b7eeeb0381ba43ff:83d2b9da057e9b89dcd687fc3c5071e2",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "g9K52gV+m4nc1of8PFBx4g",
          "kid": "j6ZpfYBUWni37usDgbpD/w"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-148",
    "channelId": "148",
    "name": "&pictures",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-499-j5jydp7s-v1/imageContent-499-j5jydp7s-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_203/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "322779a4eb8a5203b65191857df90527:0c42f48dd2f3627a1887f82e1ca6f9db",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "DEL0jdLzYnoYh/guHKb52w",
          "kid": "Mid5pOuKUgO2UZGFffkFJw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-727",
    "channelId": "727",
    "name": "Zee Classic",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-42199-jxh2zlj4-v1/imageContent-42199-jxh2zlj4-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_955/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-666",
    "channelId": "666",
    "name": "Tata Play Theatre HD",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-31419-jmb48u74-v3/imageContent-31419-jmb48u74-m4.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_899/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "6ea46c8b057259099ef3dac07fd8e009:f00d61ddceef96a3e2f1f2c63361a900",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "8A1h3c7vlqPi8fLGM2GpAA",
          "kid": "bqRsiwVyWQme89rAf9jgCQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-61",
    "channelId": "61",
    "name": "Colors Cineplex HD",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-183-j5fsqz5c-v2/imageContent-183-j5fsqz5c-m2.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_385/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "1bc728f9dc845aabba707af7be0658eb:0cf3d19577e5c17a72f1bfda175d6e36",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "DPPRlXflwXpy8b/aF11uNg",
          "kid": "G8co+dyEWqu6cHr3vgZY6w"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-53",
    "channelId": "53",
    "name": "Colors Cineplex",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-149-j5frd0jc-v2/imageContent-149-j5frd0jc-m2.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_384/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "959afc32d74b5277bdee9a0eb606d6de:83450611994855a364a98b35f5cb50c7",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "g0UGEZlIVaNkqYs19ctQxw",
          "kid": "lZr8MtdLUne97poOtgbW3g"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-632",
    "channelId": "632",
    "name": "Star GOLD HD",
    "category": "Movies",
    "genre": "Movies",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-19212-jd2xwa4w-v1/imageContent-19212-jd2xwa4w-m1.png",
    "streamUrl": "https://delta10tatasky.akamaized.net/out/i/5771658.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-1000",
    "channelId": "1000",
    "name": "Colors Cineplex Bollywood",
    "category": "Entertainment",
    "genre": "None",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-71752-l5hqgxso-v2/imageContent-71752-l5hqgxso-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1827/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "57b73db0324f5c43ba6f6fa27b81bac6:525b731b308b37946fb075253f53e00f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "UltzGzCLN5RvsHUlP1PgDw",
          "kid": "V7c9sDJPXEO6b2+ie4G6xg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-223",
    "channelId": "223",
    "name": "DD Sports",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-941-j5mhk5fc-v1/imageContent-941-j5mhk5fc-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_146/output/manifest.mpd",
    "backupUrl": "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
    "clearkey": "f0ca27b4509b596f843e8c182517971f:214b7fa87c1463476b24fd7dcefd42d2",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "IUt/qHwUY0drJP19zv1C0g",
          "kid": "8MontFCbWW+EPowYJReXHw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-24",
    "channelId": "24",
    "name": "Star Sports 1 Hindi HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-60-j5fdr6a0-v1/imageContent-60-j5fdr6a0-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_252/output/manifest.mpd",
    "backupUrl": "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-235",
    "channelId": "235",
    "name": "Star Sports 2 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-1021-j5nj3c68-v1/imageContent-1021-j5nj3c68-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_251/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-246",
    "channelId": "246",
    "name": "Star Sports Select 1 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-7891-j75vq7k0-v1/imageContent-7891-j75vq7k0-m1.PNG",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_413/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-78",
    "channelId": "78",
    "name": "Star Sports 1 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-8301-j7hc0820-v1/imageContent-8301-j7hc0820-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_250/output/manifest.mpd",
    "backupUrl": "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-463",
    "channelId": "463",
    "name": "Star Sports Select 2 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11791-j9kyqpy8-v1/imageContent-11791-j9kyqpy8-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_729/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-81",
    "channelId": "81",
    "name": "SONY SPORTS TEN 1 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-261-j5fz9bvk-v4/imageContent-261-j5fz9bvk-m4.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_256/output/manifest.mpd",
    "backupUrl": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    "clearkey": "7d8cc6ee3c9a5a82a0071779f351a9a5:1d4d52698080d453b032ca44277fd274",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "HU1SaYCA1FOwMspEJ3/SdA",
          "kid": "fYzG7jyaWoKgBxd581GppQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-464",
    "channelId": "464",
    "name": "SONY SPORTS TEN 3 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11787-j9kynnm0-v3/imageContent-11787-j9kynnm0-m3.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_727/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "4428be7aacfb557492c7fa552c3ecbf1:fd86b49ad205dec6b52be48e174e5192",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "/Ya0mtIF3sa1K+SOF05Rkg",
          "kid": "RCi+eqz7VXSSx/pVLD7L8Q"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-170",
    "channelId": "170",
    "name": "SONY SPORTS TEN 2",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-742-j5l50le0-v5/imageContent-742-j5l50le0-m7.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_115/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "d39d37e73df95fab9f37f2520fa24982:6e5a14a91f1b108b482fd16481ce1feb",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "bloUqR8bEItIL9Fkgc4f6w",
          "kid": "05035z35X6ufN/JSD6JJgg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-171",
    "channelId": "171",
    "name": "SONY SPORTS TEN 3",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-739-j5l4y6yw-v5/imageContent-739-j5l4y6yw-m5.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_116/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "0d262391181150e9bb1c1fa3f86d7db8:ddb63e3e93d60ef3feea4cc1ecedfd05",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "3bY+PpPWDvP+6kzB7O39BQ",
          "kid": "DSYjkRgRUOm7HB+j+G19uA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-35",
    "channelId": "35",
    "name": "SONY SPORTS TEN 5 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-108-j5fl5wwg-v3/imageContent-108-j5fl5wwg-m3.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_254/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "c71dd63f411a5099844a73fbe850c9fd:6d99d08dd98ddbe01176e09eb77e0296",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "bZnQjdmN2+ARduCet34Clg",
          "kid": "xx3WP0EaUJmESnP76FDJ/Q"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-150",
    "channelId": "150",
    "name": "SONY SPORTS TEN 1",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-513-j5jzouqw-v5/imageContent-513-j5jzouqw-m7.png",
    "streamUrl": "https://bpprod1catchup.akamaized.net/bpk-tv/irdeto_com_Channel_114/output/manifest.mpd",
    "backupUrl": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-462",
    "channelId": "462",
    "name": "SONY SPORTS TEN 2 HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11784-j9kylfd4-v2/imageContent-11784-j9kylfd4-m3.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_726/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "1cc361e170845936aea7b95c6efb478e:dc78eab46264d457a5db0f0c429ce4a6",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "3HjqtGJk1Fel2w8MQpzkpg",
          "kid": "HMNh4XCEWTaup7lcbvtHjg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-980",
    "channelId": "980",
    "name": "Sports 18 - 1",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-70046-l21cybww-v2/imageContent-70046-l21cybww-m5.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1809/output/manifest.mpd",
    "backupUrl": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    "clearkey": "1b214085d8ec54868f6626f70cb9745c:82beab718460390d93e6f4f64423e729",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "gr6rcYRgOQ2T5vT2RCPnKQ",
          "kid": "GyFAhdjsVIaPZib3DLl0XA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-1033",
    "channelId": "1033",
    "name": "Sports 18 - 1 HD",
    "category": "Sports",
    "genre": "None",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-74232-la6z41u8-v3/imageContent-74232-la6z41u8-m5.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1852/output/manifest.mpd",
    "backupUrl": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    "clearkey": "192dd5f0779d5983a3aa18276a9fb719:b372ee0b282e2bcaad31702289cb338f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "s3LuCyguK8qtMXAiicszjw",
          "kid": "GS3V8HedWYOjqhgnap+3GQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-812",
    "channelId": "812",
    "name": "Eurosport HD",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-52842-k980h8vc-v1/imageContent-52842-k980h8vc-m2.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1109/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "ccaf3c1207e2565085abb5ecdb238bd9:d69e6d34b020902444743fe58d8262c9",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "1p5tNLAgkCREdD/ljYJiyQ",
          "kid": "zK88EgfiVlCFq7Xs2yOL2Q"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-177",
    "channelId": "177",
    "name": "ABP News",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-759-j5m13014-v2/imageContent-759-j5m13014-m3.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_165/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "03f0668a519956c2ac00fafe4bdcda79:71943068aab4521a8825537a91f26cc2",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "cZQwaKq0UhqIJVN6kfJswg",
          "kid": "A/BmilGZVsKsAPr+S9zaeQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-783",
    "channelId": "783",
    "name": "Tata Play Seniors",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-47647-k2lbp2q8-v2/imageContent-47647-k2lbp2q8-m2.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_974/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "43ce1e7d69025331b0c9ee786876e29f:894ca434fc6f1b96a00443b083835a4b",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "iUykNPxvG5agBEOwg4NaSw",
          "kid": "Q84efWkCUzGwye54aHbinw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-693",
    "channelId": "693",
    "name": "Eurosport",
    "category": "Sports",
    "genre": "Sports",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-35309-jqxwmcq0-v4/imageContent-35309-jqxwmcq0-m4.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_935/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-179",
    "channelId": "179",
    "name": "NDTV India",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-483-j5jx9x48-v1/imageContent-483-j5jx9x48-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_104/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "6eacc4216bdd57a8831a2cac38de669b:9c1a96162fdc5c97eece8900a0bdf3f2",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "nBqWFi/cXJfuzokAoL3z8g",
          "kid": "bqzEIWvdV6iDGiysON5mmw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-322",
    "channelId": "322",
    "name": "DD News",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/DDNW_Thumbnail-v3/DDNW_Thumbnail.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_517/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "bdae431de431518c81a3c7ed790ff923:4c3c03c8af7c1919d181ceca12192c48",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "TDwDyK98GRnRgc7KEhksSA",
          "kid": "va5DHeQxUYyBo8fteQ/5Iw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-691",
    "channelId": "691",
    "name": "DD News HD",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-34886-jqc7dybs-v2/imageContent-34886-jqc7dybs-m2.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_932/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "a8c9b4e93de054b0bf105302777056a8:384154f7047903f57a593b379665da65",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "OEFU9wR5A/V6WTs3lmXaZQ",
          "kid": "qMm06T3gVLC/EFMCd3BWqA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-259",
    "channelId": "259",
    "name": "Zee News",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11110-j95ioyag-v1/imageContent-11110-j95ioyag-m1.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_420/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-689",
    "channelId": "689",
    "name": "Aaj Tak HD",
    "category": "News",
    "genre": "News",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-34652-jpmey8gw-v1/imageContent-34652-jpmey8gw-m1.png",
    "streamUrl": "https://bpprod3live.akamaized.net/bpk-tv/irdeto_com_Channel_930/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "fc2ba4faff5d55fb9b8858bfdd6b2537:c47ea21219dc378d8620cd86e2fc99f2",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "xH6iEhncN42GIM2G4vyZ8g",
          "kid": "/Cuk+v9dVfubiFi/3WslNw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-209",
    "channelId": "209",
    "name": "News 24",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-849-j5m9tmf4-v1/imageContent-849-j5m9tmf4-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_308/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "6035fd2c72485c408a2376a614ea63a5:d4f4b0973b66eb54b73571d7641fd1bf",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "1PSwlztm61S3NXHXZB/Rvw",
          "kid": "YDX9LHJIXECKI3amFOpjpQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-872",
    "channelId": "872",
    "name": "Tata Play Astro Duniya",
    "category": "Spiritual",
    "genre": "Spiritual",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-58613-kj283ly8-v2/imageContent-58613-kj283ly8-m2.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1148/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "a8b3ed0b8e815c2a88facfcfd8f1e466:388bdebf64d42c591680481764622db6",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "OIvev2TULFkWgEgXZGIttg",
          "kid": "qLPtC46BXCqI+s/P2PHkZg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-929",
    "channelId": "929",
    "name": "Tata Play JEE Prep",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-64069-kra2o75k-v2/imageContent-64069-kra2o75k-m2.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1324/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "845ea5849c485ee792226a978d6603cd:0cc85d19f5831468fb21283691530f23",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "DMhdGfWDFGj7ISg2kVMPIw",
          "kid": "hF6lhJxIXueSImqXjWYDzQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-104",
    "channelId": "104",
    "name": "India TV",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-8568-j7lnde80-v1/imageContent-8568-j7lnde80-m1.png",
    "streamUrl": "https://bpprod3live.akamaized.net/bpk-tv/irdeto_com_Channel_148/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "8a24625bc5ba5da497a7e955704891d3:6efe915a085de171ad2434fe4c154dc8",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "bv6RWghd4XGtJDT+TBVNyA",
          "kid": "iiRiW8W6XaSXp+lVcEiR0w"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-106",
    "channelId": "106",
    "name": "News18 India",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-339-j5jm6kko-v1/imageContent-339-j5jm6kko-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_149/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "1c360d5fd18e5e0e87410349a81d75ec:440b42fec05deb888e69f36e74894688",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "RAtC/sBd64iOafNudIlGiA",
          "kid": "HDYNX9GOXg6HQQNJqB117A"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-928",
    "channelId": "928",
    "name": "Tata Play NEET Prep",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-64066-kra2j2qo-v2/imageContent-64066-kra2j2qo-m2.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1323/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "358a72c55b01573abe9abcf00b40574f:ab5affa031e91db305d255d50728db61",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "q1r/oDHpHbMF0lXVByjbYQ",
          "kid": "NYpyxVsBVzq+mrzwC0BXTw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-514",
    "channelId": "514",
    "name": "Zee Bharat",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/ZEEBH_Thumbnail-v2/ZEEBH_Thumbnail.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_840/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-36",
    "channelId": "36",
    "name": "News Nation",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-114-j5fl632o-v1/imageContent-114-j5fl632o-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_309/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "f0cebfd008d2599597cd1964f966d4cf:f8128f54959f131988ffa83e5fc8250f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "+BKPVJWfExmI/6g+X8glDw",
          "kid": "8M6/0AjSWZWXzRlk+WbUzw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-153",
    "channelId": "153",
    "name": "Aaj Tak",
    "category": "News",
    "genre": "News",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-537-j5kwkd88-v1/imageContent-537-j5kwkd88-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_191/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "0b402fe0ba655bf18eb3eaecf801b2e2:418953890ab6a59507d7aa31d81ff26a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "QYlTiQq2pZUH16ox2B/yag",
          "kid": "C0Av4LplW/GOs+rs+AGy4g"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-183",
    "channelId": "183",
    "name": "India News",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-774-j5m3h6nk-v1/imageContent-774-j5m3h6nk-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_150/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "ebf474cb9877571b9a4115119c6bb91a:b71ce8a51794a74fd906384b5431614d",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "txzopReUp0/ZBjhLVDFhTQ",
          "kid": "6/R0y5h3VxuaQRURnGu5Gg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-485",
    "channelId": "485",
    "name": "TOTAL TV",
    "category": "News",
    "genre": "News",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11859-j9l2n36w-v2/imageContent-11859-j9l2n36w-m2.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_785/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "ca89a8f031145e8bbb6c1df8fb99802f:13c4bae837fa83eeb4f51b87d106ba6a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "E8S66Df6g+609RuH0Qa6ag",
          "kid": "yomo8DEUXou7bB34+5mALw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-1031",
    "channelId": "1031",
    "name": "Surya Samachar",
    "category": "Malayalam",
    "genre": "None",
    "language": "Malayalam",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-72980-l8fn3f28-v2/imageContent-72980-l8fn3f28-m4.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1842/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "74de2d359dff58de93e747dd70d08ed0:85ddd2e31f0d134caba84e5f57a3e5e5",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "hd3S4x8NE0yrqE5fV6Pl5Q",
          "kid": "dN4tNZ3/WN6T50fdcNCO0A"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-72",
    "channelId": "72",
    "name": "REPUBLIC TV",
    "category": "Kannada",
    "genre": "News",
    "language": "Kannada",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-231-j5fxh0ag-v1/imageContent-231-j5fxh0ag-m1.png",
    "streamUrl": "https://vg-republictataplay.akamaized.net/v1/dash/611d79b11b77e2f571934fd80ca1413453772ac7/vglive-sk-380287/index.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-114",
    "channelId": "114",
    "name": "Disney",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-1356-j5tdnwmw-v1/imageContent-1356-j5tdnwmw-m1.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_166/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "2f27d053d83d5284859cdd8b26bb17e2:bc97ff69f0df081716889703b8210dfd",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "vJf/afDfCBcWiJcDuCEN/Q",
          "kid": "LyfQU9g9UoSFnN2LJrsX4g"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-587",
    "channelId": "587",
    "name": "Super Hungama",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-35365-jr3xz4uo-v5/imageContent-35365-jr3xz4uo-m6.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_781/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "50b6cc4817f9538c916ce2e119228160:203152151a139c700c7258e62a982ba7",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "IDFSFRoTnHAMcljmKpgrpw",
          "kid": "ULbMSBf5U4yRbOLhGSKBYA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-71",
    "channelId": "71",
    "name": "Tata Play English in Hindi",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-25721-jia4i70o-v2/imageContent-25721-jia4i70o-m3.PNG",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_396/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "45b52300820659a4a9516ab4a360b18e:78a21a211ec699d0d588a99e5798e16f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "eKIaIR7GmdDViKmeV5jhbw",
          "kid": "RbUjAIIGWaSpUWq0o2Cxjg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-138",
    "channelId": "138",
    "name": "Nick",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-465-j5jw9va0-v1/imageContent-465-j5jw9va0-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_117/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "e634a5ce531a58e99a39dbf578e2554b:542fcaab2d74aa14622d4a49a8e16c11",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "VC/Kqy10qhRiLUpJqOFsEQ",
          "kid": "5jSlzlMaWOmaOdv1eOJVSw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-433",
    "channelId": "433",
    "name": "Nick HD+",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11658-j9k5lvgo-v1/imageContent-11658-j9k5lvgo-m1.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_663/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "d45505e1ed36506ca72b39eda106d33f:3933cbbc42fdd9b1f783de394da1a52d",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "OTPLvEL92bH3g945TaGlLQ",
          "kid": "1FUF4e02UGynKzntoQbTPw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-681",
    "channelId": "681",
    "name": "Cartoon Network HD+",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-34164-jok06xoo-v1/imageContent-34164-jok06xoo-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_925/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "f581424c14e35eee924f0a0b9d22c81c:3553f635fdb1b3f006d9aeb8ed7341eb",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "NVP2Nf2xs/AG2a647XNB6w",
          "kid": "9YFCTBTjXu6STwoLnSLIHA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-626",
    "channelId": "626",
    "name": "Tata Play Fun Learn Preschool",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-13094-jbdzlsfs-v2/imageContent-13094-jbdzlsfs-m2.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_860/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "73b748f4c3c957aabcae4c9e0e722da1:53bd935ff820ce916bfea7fcb10ef87c",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "U72TX/ggzpFr/qf8sQ74fA",
          "kid": "c7dI9MPJV6q8rkyeDnItoQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-239",
    "channelId": "239",
    "name": "Pogo",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-2694-j638bugw-v1/imageContent-2694-j638bugw-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_406/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "01788c60ef0d5e7abb23d69527fad4cb:cf2c74d68a086f069201e47729c603b7",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "zyx01ooIbwaSAeR3KcYDtw",
          "kid": "AXiMYO8NXnq7I9aVJ/rUyw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-238",
    "channelId": "238",
    "name": "Cartoon Network",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11161-j99h67u8-v1/imageContent-11161-j99h67u8-m1.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_405/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "37da44b2890a5445bae74e315802850c:85aef421289081f788d821782023e911",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ha70ISiQgfeI2CF4ICPpEQ",
          "kid": "N9pEsokKVEW6504xWAKFDA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-627",
    "channelId": "627",
    "name": "Tata Play Fun Learn Junior",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-13097-jbdzn9og-v2/imageContent-13097-jbdzn9og-m2.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_861/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "9074ef894b455e25b289f43e59fbce4d:3bbf1d3972c464e8f6af3c726d6e71c2",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "O78dOXLEZOj2rzxybW5xwg",
          "kid": "kHTviUtFXiWyifQ+WfvOTQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-127",
    "channelId": "127",
    "name": "Sonic Nickelodeon",
    "category": "Kids",
    "genre": "Kids",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-8018-j7a7n1a8-v1/imageContent-8018-j7a7n1a8-m1.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_169/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "966ce4ee21745f4bb811fcf61e76aefd:dc81ea8e682e5bf2f20c6538a941df1c",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "3IHqjmguW/LyDGU4qUHfHA",
          "kid": "lmzk7iF0X0u4Efz2Hnau/Q"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-867",
    "channelId": "867",
    "name": "Gubbare",
    "category": "Kannada",
    "genre": "Kannada",
    "language": "Kannada",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-57985-khvdchrs-v2/imageContent-57985-khvdchrs-m2.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1143/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "413a414b01f5516888a210ca9f27ee63:cb668f72eedce99c2de68950c5572f63",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "y2aPcu7c6Zwt5olQxVcvYw",
          "kid": "QTpBSwH1UWiIohDKnyfuYw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-111",
    "channelId": "111",
    "name": "Tata Play Smart Manager",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-352-j5jmrkqw-v2/imageContent-352-j5jmrkqw-m2.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_391/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "d7127a7e8e12589383fd333bc32b6894:c03ddbb4bc1f08db646865f83ac3dc4f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "wD3btLwfCNtkaGX4OsPcTw",
          "kid": "1xJ6fo4SWJOD/TM7wytolA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-905",
    "channelId": "905",
    "name": "ETV Bal Bharat",
    "category": "Telugu",
    "genre": "Kids",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-62236-kny7yzaw-v1/imageContent-62236-kny7yzaw-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1311/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "930f57eb8475524593ee585314c6dad3:15d947bafec09f84758b4c0dd1042006",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "FdlHuv7An4R1i0wN0QQgBg",
          "kid": "kw9X64R1UkWT7lhTFMba0w"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-167",
    "channelId": "167",
    "name": "Tata Play Vedic Maths",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-703-j5l1wgco-v2/imageContent-703-j5l1wgco-m2.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_392/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "c5956843e3e6505d83cdeef280eb5479:01a5a6aebb294af04e5e78a4a51d8b49",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "AaWmrrspSvBOXnikpR2LSQ",
          "kid": "xZVoQ+PmUF2Dze7ygOtUeQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-605",
    "channelId": "605",
    "name": "National Geographic HD",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12234-j9qoqc54-v1/imageContent-12234-j9qoqc54-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_652/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-184",
    "channelId": "184",
    "name": "Nat Geo Wild",
    "category": "Knowledge",
    "genre": "Knowledge",
    "language": "English",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-438-j5jt26xc-v2/imageContent-438-j5jt26xc-m2.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_119/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-923",
    "channelId": "923",
    "name": "TravelXP 4K HDR",
    "category": "Lifestyle",
    "genre": "Lifestyle",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-63764-kr1kzw28-v2/imageContent-63764-kr1kzw28-m2.png",
    "streamUrl": "https://deltatesttatasky.akamaized.net/out/i/968284.m3u8",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-367",
    "channelId": "367",
    "name": "FOX Life HD",
    "category": "Lifestyle",
    "genre": "Lifestyle",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11429-j9jqu3y0-v1/imageContent-11429-j9jqu3y0-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_544/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-103",
    "channelId": "103",
    "name": "MTV",
    "category": "Music",
    "genre": "Music",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-330-j5jl5on4-v2/imageContent-330-j5jl5on4-m2.png",
    "streamUrl": "https://bpprod1catchup.akamaized.net/bpk-tv/irdeto_com_Channel_105/output/manifest.mpd",
    "backupUrl": "https://mumt07.tangotv.in/zHjX9OFlSATHIYAMTV/index.m3u8",
    "clearkey": "f54725ccd5ca5757a8a2e0e5ea599f16:ba4332fb435d92ddb39ca09119eb31b4",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ukMy+0Ndkt2znKCRGesxtA",
          "kid": "9UclzNXKV1eoouDl6lmfFg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-406",
    "channelId": "406",
    "name": "MTV HD",
    "category": "Music",
    "genre": "Music",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11610-j9jzore8-v2/imageContent-11610-j9jzore8-m2.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_638/output/manifest.mpd",
    "backupUrl": "https://mumt07.tangotv.in/zHjX9OFlSATHIYAMTV/index.m3u8",
    "clearkey": "964c9bfefeec55779ae3434bee89e737:ec5e5ede292b1ed7965fe789d8463571",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "7F5e3ikrHteWX+eJ2EY1cQ",
          "kid": "lkyb/v7sVXea40NL7onnNw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-735",
    "channelId": "735",
    "name": "Tata Play Ibaadat",
    "category": "Spiritual",
    "genre": "Spiritual",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-44321-jz2zb8pk-v3/imageContent-44321-jz2zb8pk-m3.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1632/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "f16f8ab0e5695e1988e8c5f160074478:75a965fa24d45dd7a38e182d30cd030a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "dall+iTUXdejjhgtMM0DCg",
          "kid": "8W+KsOVpXhmI6MXxYAdEeA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-96",
    "channelId": "96",
    "name": "Zoom",
    "category": "Music",
    "genre": "Music",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-24696-jgrq09a8-v1/imageContent-24696-jgrq09a8-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_164/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "3a7b1705d4ee5eb6a9a3f6546e5d3fb4:c8649f8481fc0aabd3de734572ce8e0b",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "yGSfhIH8CqvT3nNFcs6OCw",
          "kid": "OnsXBdTuXrapo/ZUbl0/tA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-224",
    "channelId": "224",
    "name": "E24",
    "category": "Music",
    "genre": "Music",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-946-j5mip6a0-v1/imageContent-946-j5mip6a0-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_278/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "00860c47faab5dd381c0fee33b634ca4:f1eb6da2f490d271cf47af7f060bca18",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "8ettovSQ0nHPR69/BgvKGA",
          "kid": "AIYMR/qrXdOBwP7jO2NMpA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-139",
    "channelId": "139",
    "name": "9XM",
    "category": "Music",
    "genre": "Music",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-468-j5jwdbi8-v1/imageContent-468-j5jwdbi8-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_201/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "00fbeecf80075f3884b8fc5a65f08710:ef04c2fd067aef77c2674b6e68e5c11b",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "7wTC/QZ673fCZ0tuaOXBGw",
          "kid": "APvuz4AHXziEuPxaZfCHEA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-17",
    "channelId": "17",
    "name": "Mastiii",
    "category": "Music",
    "genre": "Music",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-57-j5fdr2f4-v1/imageContent-57-j5fdr2f4-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_279/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "1c3e65313fc455409060417ba69d7118:7815b9456dcbfb07a0fad558d0105115",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "eBW5RW3L+weg+tVY0BBRFQ",
          "kid": "HD5lMT/EVUCQYEF7pp1xGA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-517",
    "channelId": "517",
    "name": "Zing",
    "category": "Music",
    "genre": "Music",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11993-j9luua9c-v1/imageContent-11993-j9luua9c-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_843/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-405",
    "channelId": "405",
    "name": "MTV Beats HD",
    "category": "Music",
    "genre": "Music",
    "language": "Multi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11607-j9jznhvc-v1/imageContent-11607-j9jznhvc-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_637/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "31f563ec4d055f04a7077e638b046de4:48b212aa70185c15446e5845a3c8d524",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "SLISqnAYXBVEblhFo8jVJA",
          "kid": "MfVj7E0FXwSnB35jiwRt5A"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-236",
    "channelId": "236",
    "name": "MTV Beats",
    "category": "Music",
    "genre": "Music",
    "language": "Multi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-1018-j5nhzme0-v1/imageContent-1018-j5nhzme0-m1.png",
    "streamUrl": "https://bpprod1catchup.akamaized.net/bpk-tv/irdeto_com_Channel_402/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "befeacb18d22597487a50b7fa97a8372:5541c05f300ce84957406ee7de5307b4",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "VUHAXzAM6ElXQG7n3lMHtA",
          "kid": "vv6ssY0iWXSHpQt/qXqDcg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-397",
    "channelId": "397",
    "name": "MH One Shraddha",
    "category": "Spiritual",
    "genre": "Spiritual",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11590-j9jyx4so-v1/imageContent-11590-j9jyx4so-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_627/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "cba3057e68ee52ac9795c3997eb867c2:02b051b0f0aa9390ff57113b31ed41d0",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ArBRsPCqk5D/VxE7Me1B0A",
          "kid": "y6MFfmjuUqyXlcOZfrhnwg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-501",
    "channelId": "501",
    "name": "Zee Marathi HD",
    "category": "Marathi",
    "genre": "Marathi",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11930-j9l5hv1c-v1/imageContent-11930-j9l5hv1c-m1.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_836/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-248",
    "channelId": "248",
    "name": "Zee YUVA",
    "category": "Marathi",
    "genre": "Marathi",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11136-j96p4r28-v1/imageContent-11136-j96p4r28-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_426/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-469",
    "channelId": "469",
    "name": "Star Pravah HD",
    "category": "Marathi",
    "genre": "Marathi",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11807-j9kyzle8-v1/imageContent-11807-j9kyzle8-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_744/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-251",
    "channelId": "251",
    "name": "Zee Marathi",
    "category": "Marathi",
    "genre": "Marathi",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-8846-j7pq3jmo-v2/imageContent-8846-j7pq3jmo-m3.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_424/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-658",
    "channelId": "658",
    "name": "Sony Marathi",
    "category": "Marathi",
    "genre": "Marathi",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-30959-jky1nic8-v2/imageContent-30959-jky1nic8-m3.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_892/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "f32bf5a269ec57f1bb1b6900755b0a5a:5de47e872920c110ec9c58d1e5bca50e",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "XeR+hykgwRDsnFjR5bylDg",
          "kid": "8yv1omnsV/G7G2kAdVsKWg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-522",
    "channelId": "522",
    "name": "Zee Bangla HD",
    "category": "Bengali",
    "genre": "Bengali",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11970-j9luk5ag-v1/imageContent-11970-j9luk5ag-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_834/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-468",
    "channelId": "468",
    "name": "Star Jalsha HD",
    "category": "Bengali",
    "genre": "Bengali",
    "language": "Hindi",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/STJHD_Thumbnail-v3/STJHD_Thumbnail.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_736/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-34",
    "channelId": "34",
    "name": "SONY AATH",
    "category": "Bengali",
    "genre": "Bengali",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-94-j5fjveio-v3/imageContent-94-j5fjveio-m2.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_285/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "4d76a20252105f72babdace28e0a8217:8d7eecc23b34da5bd53c00ec0b08e4d3",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "jX7swjs02lvVPADsCwjk0w",
          "kid": "TXaiAlIQX3K6vazijgqCFw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-788",
    "channelId": "788",
    "name": "Enterr10 Bangla",
    "category": "Bengali",
    "genre": "Bengali",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-48494-k3zd1a80-v1/imageContent-48494-k3zd1a80-m4.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_978/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "27c72f370afa5ad9aea3f0abeb498d29:cefca92908b0d384f175a574e0f36125",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "zvypKQiw04TxdaV04PNhJQ",
          "kid": "J8cvNwr6Wtmuo/Cr60mNKQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-129",
    "channelId": "129",
    "name": "Aakaash Aath",
    "category": "Bengali",
    "genre": "Bengali",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-267-j5j8x17s-v1/imageContent-267-j5j8x17s-m2.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_210/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "252bcb79d2ee505588c8ecaffddf03c1:62ec5d8a5885f3c666ce7185f54cb145",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "YuxdiliF88ZmznGF9UyxRQ",
          "kid": "JSvLedLuUFWIyOyv/d8DwQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-1103",
    "channelId": "1103",
    "name": "NKTV BANGLA",
    "category": "Tamil",
    "genre": "None",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/NKTVBAN_Thumbnail-v3/NKTVBAN_Thumbnail.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1916/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "45ddf6a18738584689eded8d3a14f76f:ae2f897246abd1f673bf4254b77c5908",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ri+Jckar0fZzv0JUt3xZCA",
          "kid": "Rd32oYc4WEaJ7e2NOhT3bw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-635",
    "channelId": "635",
    "name": "Zee Telugu HD",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-21304-je859a3c-v1/imageContent-21304-je859a3c-m1.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_873/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-250",
    "channelId": "250",
    "name": "Zee Telugu",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-8845-j7ppmm28-v3/imageContent-8845-j7ppmm28-m7.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_415/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-355",
    "channelId": "355",
    "name": "Gemini TV HD",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11444-j9jqx6a8-v1/imageContent-11444-j9jqx6a8-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_553/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "dd7978200ec4595ca2d9893476e5ba99:92c2552f83b28f1ce559d94cbd0657a4",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ksJVL4OyjxzlWdlMvQZXpA",
          "kid": "3Xl4IA7EWVyi2Yk0duW6mQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-516",
    "channelId": "516",
    "name": "STAR Maa HD",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-25361-jhsvr3nc-v1/imageContent-25361-jhsvr3nc-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_609/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-956",
    "channelId": "956",
    "name": "STAR Maa HD",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-66705-kuqnqhwg-v1/imageContent-66705-kuqnqhwg-m1.png",
    "streamUrl": "https://delta45tatasky.akamaized.net/out/i/1375.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-359",
    "channelId": "359",
    "name": "ETV HD",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11418-j9jqpvxs-v1/imageContent-11418-j9jqpvxs-m1.png",
    "streamUrl": "https://bpprod3live.akamaized.net/bpk-tv/irdeto_com_Channel_537/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "6b31eec7fdf05545a5246828957f9d49:ffbd63fb2b56c0983bb4ad565a615baa",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "/71j+ytWwJg7tK1WWmFbqg",
          "kid": "azHux/3wVUWlJGgolX+dSQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-352",
    "channelId": "352",
    "name": "ETV Plus",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11423-j9jqqegg-v1/imageContent-11423-j9jqqegg-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_539/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "0bdf5210d3ae5880b49f31d398234261:0d60063b334cc269ebbfad5388cd0c9a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "DWAGOzNMwmnrv61TiM0Mmg",
          "kid": "C99SENOuWIC0nzHTmCNCYQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-590",
    "channelId": "590",
    "name": "Telugu Naaptol",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12186-j9plqam8-v4/imageContent-12186-j9plqam8-m5.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_485/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "3ea534ed6f525febb7628345366f6841:dfa2024703fbfea67f54b26c622a3c68",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "36ICRwP7/qZ/VLJsYio8aA",
          "kid": "PqU07W9SX+u3YoNFNm9oQQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-145",
    "channelId": "145",
    "name": "ETV Telugu",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-492-j5jxvaeo-v1/imageContent-492-j5jxvaeo-m1.png",
    "streamUrl": "https://bpprod1live.akamaized.net/bpk-tv/irdeto_com_Channel_172/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "65e2857e8b595ef19a23579b3be58461:957636ab9bcbee73dbee73659be45632",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "lXY2q5vL7nPb7nNlm+RWMg",
          "kid": "ZeKFfotZXvGaI1ebO+WEYQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-361",
    "channelId": "361",
    "name": "Gemini Life",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11437-j9jqv7ao-v2/imageContent-11437-j9jqv7ao-m2.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_549/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "cdb3a924e0f85e50b6a994ae54690dfd:25c16e5b154933800ff7b4862e8d239f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "JcFuWxVJM4AP97SGLo0jnw",
          "kid": "zbOpJOD4XlC2qZSuVGkN/Q"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-585",
    "channelId": "585",
    "name": "Vissa TV",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12164-j9phk5iw-v1/imageContent-12164-j9phk5iw-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_820/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "ff198d0e6c715d898bd490a3e5b3c295:31d6959c3c542454330ce094dbb307e5",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "MdaVnDxUJFQzDOCU27MH5Q",
          "kid": "/xmNDmxxXYmL1JCj5bPClQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-645",
    "channelId": "645",
    "name": "Tata Play English in Telugu",
    "category": "Telugu",
    "genre": "Knowledge",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-23721-jg0fhacg-v2/imageContent-23721-jg0fhacg-m2.PNG",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_880/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "b4d8ebe61b9a53c282f47514e1a22bbb:8aec85114c0f873d423e0470ca8ed736",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "iuyFEUwPhz1CPgRwyo7XNg",
          "kid": "tNjr5huaU8KC9HUU4aIruw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-362",
    "channelId": "362",
    "name": "Gemini Movies HD",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11438-j9jqvyaw-v1/imageContent-11438-j9jqvyaw-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_550/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "21950c17505852419ec6a648b1cc25b1:0dde368525e22bef4150eb504a84dba2",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "Dd42hSXiK+9BUOtQSoTbog",
          "kid": "IZUMF1BYUkGexqZIscwlsQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-387",
    "channelId": "387",
    "name": "Star Maa Movies HD",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-18348-jcqpx9ns-v1/imageContent-18348-jcqpx9ns-m1.PNG",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_611/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-388",
    "channelId": "388",
    "name": "Star Maa Gold",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11553-j9julvag-v3/imageContent-11553-j9julvag-m6.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_608/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-1168",
    "channelId": "1168",
    "name": "Tata Play Hollywood Local Telugu",
    "category": "Telugu",
    "genre": "None",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/TPHLTE_Thumbnail-v5/TPHLTE_Thumbnail.png",
    "streamUrl": "https://delta13tatasky.akamaized.net/out/i/6282183.mpd",
    "backupUrl": null,
    "clearkey": "f62acfb238e746a58ed8ee9ad33e6874:e1ee9ad35a083774ae8c2b3d3a41242e",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "4e6a01oIN3SujCs9OkEkLg",
          "kid": "9irPsjjnRqWO2O6a0z5odA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-128",
    "channelId": "128",
    "name": "ETV Cinema",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-426-j5jsm1wo-v1/imageContent-426-j5jsm1wo-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_227/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "58f499c2e7135799964f990fe66d899b:826403879c5b2602b244316a028eccd9",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "gmQDh5xbJgKyRDFqAo7M2Q",
          "kid": "WPSZwucTV5mWT5kP5m2Jmw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-252",
    "channelId": "252",
    "name": "Zee Cinemalu",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-8849-j7pqmypc-v2/imageContent-8849-j7pqmypc-m3.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_416/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-636",
    "channelId": "636",
    "name": "Zee Cinemalu HD",
    "category": "Telugu",
    "genre": "Telugu",
    "language": "Telugu",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-21307-je859sm0-v1/imageContent-21307-je859sm0-m2.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_871/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-49",
    "channelId": "49",
    "name": "T News",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-145-j5fpfoe8-v1/imageContent-145-j5fpfoe8-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_298/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "9d7d9f28776a5e0595cb23baab8b6ecd:66d606cbec10df0dc3d4c43ac1bb29fb",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ZtYGy+wQ3w3D1MQ6wbsp+w",
          "kid": "nX2fKHdqXgWVyyO6q4tuzQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-496",
    "channelId": "496",
    "name": "Star Vijay HD",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11909-j9l52epk-v2/imageContent-11909-j9l52epk-m4.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_818/output/manifest.mpd",
    "backupUrl": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8",
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-474",
    "channelId": "474",
    "name": "Sun Life",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11837-j9kzms9s-v2/imageContent-11837-j9kzms9s-m3.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_756/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-521",
    "channelId": "521",
    "name": "Sun TV HD",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11960-j9lu9vow-v1/imageContent-11960-j9lu9vow-m1.png",
    "streamUrl": "https://bpprod3live.akamaized.net/bpk-tv/irdeto_com_Channel_760/output/manifest.mpd",
    "backupUrl": "https://d2px1d6ssc60fw.cloudfront.net/SunTV/SunTV-HDR10-IN-index.m3u8",
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-1167",
    "channelId": "1167",
    "name": "Tata Play Hollywood Local Tamil",
    "category": "Tamil",
    "genre": "None",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/TPHLT_Thumbnail-v4/TPHLT_Thumbnail.png",
    "streamUrl": "https://delta13tatasky.akamaized.net/out/i/6282177.mpd",
    "backupUrl": null,
    "clearkey": "07062db056b14a819ddf64152184bc03:9ea0ec35f48bcc846c5b68bc069a3450",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "nqDsNfSLzIRsW2i8Bpo0UA",
          "kid": "BwYtsFaxSoGd32QVIYS8Aw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-608",
    "channelId": "608",
    "name": "Zee Tamil HD",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11997-j9lux9ig-v1/imageContent-11997-j9lux9ig-m5.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_842/output/manifest.mpd",
    "backupUrl": "https://d2o8pibksxtln6.cloudfront.net/live/media/Zee_Tamil_HD/hls/Zee_Tamil_HD.m3u8",
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-708",
    "channelId": "708",
    "name": "Jaya TV HD",
    "category": "Tamil",
    "genre": "Telugu",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-38738-juc4a1ig-v5/imageContent-38738-juc4a1ig-m8.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_947/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "5a4f7b954bf7504aa740e70c30c92db0:8b3d373096f4ec3d5c40af0944a3fab0",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "iz03MJb07D1cQK8JRKP6sA",
          "kid": "Wk97lUv3UEqnQOcMMMktsA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-200",
    "channelId": "200",
    "name": "Kalaignar TV",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-819-j5m8fsfs-v1/imageContent-819-j5m8fsfs-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_344/output/manifest.mpd",
    "backupUrl": "https://segment.yuppcdn.net/240122/kalaignartv/playlist.m3u8",
    "clearkey": "05879bcbb1845ffeb50c4350c968b078:93b2243f40386d50a7e94b582580696c",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "k7IkP0A4bVCn6UtYJYBpbA",
          "kid": "BYeby7GEX/61DENQyWiweA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-674",
    "channelId": "674",
    "name": "Colors Tamil HD",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-33814-jo5jba9s-v3/imageContent-33814-jo5jba9s-m3.PNG",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_916/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "0cf856663c94516d873a6ff018b75bac:b97966e438e7be4a3682dbcc73f881bd",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "uXlm5Djnvko2gtvMc/iBvQ",
          "kid": "DPhWZjyUUW2HOm/wGLdbrA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-418",
    "channelId": "418",
    "name": "Colors Tamil",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-21152-je6orzfk-v1/imageContent-21152-je6orzfk-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_665/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "28b479a0b17d5c11abe6d630f47e398a:46f736951a425a24ad8cab3c89dc2909",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "Rvc2lRpCWiStjKs8idwpCQ",
          "kid": "KLR5oLF9XBGr5tYw9H45ig"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-257",
    "channelId": "257",
    "name": "Zee Tamil",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-9006-j7rlwsns-v2/imageContent-9006-j7rlwsns-m4.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_429/output/manifest.mpd",
    "backupUrl": "https://d2o8pibksxtln6.cloudfront.net/live/media/Zee_Tamil_HD/hls/Zee_Tamil_HD.m3u8",
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-439",
    "channelId": "439",
    "name": "Raj TV",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11700-j9ksbotk-v1/imageContent-11700-j9ksbotk-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_691/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "20cd3612b22e5789bcdaf9fbacf3124c:7bc9c43698f59e3321b706b80f8288ae",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "e8nENpj1njMhtwa4D4KIrg",
          "kid": "IM02ErIuV4m82vn7rPMSTA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-723",
    "channelId": "723",
    "name": "Tamil Naaptol",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-41267-jwjjvrt4-v5/imageContent-41267-jwjjvrt4-m7.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_954/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "a75ab74e52d1523b90e98efbebc27c84:03c3c37434a67a1d1061ac593dd7801f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "A8PDdDSmeh0QYaxZPdeAHw",
          "kid": "p1q3TlLRUjuQ6Y7768J8hA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-99",
    "channelId": "99",
    "name": "D Tamil",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-44904-jzu8ri4o-v1/imageContent-44904-jzu8ri4o-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_234/output/manifest.mpd",
    "backupUrl": "https://cdn.pishow.tv/ott/live/1737/master.m3u8",
    "clearkey": "285ec9e866b65903b481b1e91d11e166:ae69075fb934fe38e8f4c19f39e1b82a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "rmkHX7k0/jjo9MGfOeG4Kg",
          "kid": "KF7J6Ga2WQO0gbHpHRHhZg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-426",
    "channelId": "426",
    "name": "Raj Digital Plus",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11679-j9khnqag-v1/imageContent-11679-j9khnqag-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_683/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "406cd76ea17a51c8a1b9d3bddf012a78:37be1ff5011b2bf4b1d5a92de1b28b13",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "N74f9QEbK/Sx1akt4bKLEw",
          "kid": "QGzXbqF6UcihudO93wEqeA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-37",
    "channelId": "37",
    "name": "Mega TV",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-111-j5fl5xo8-v1/imageContent-111-j5fl5xo8-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_347/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "7831c1d944dd591889cc4f2e61b5b205:aa4e9b68ac6c7e503886ecb5dc1d0e47",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "qk6baKxsflA4huy13B0ORw",
          "kid": "eDHB2UTdWRiJzE8uYbWyBQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-611",
    "channelId": "611",
    "name": "Sirippoli",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12244-j9qq7k1c-v1/imageContent-12244-j9qq7k1c-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_717/output/manifest.mpd",
    "backupUrl": "https://segment.yuppcdn.net/240122/siripoli/playlist.m3u8",
    "clearkey": "83062897feaa5812b81101efd3ae5889:cb36a0a70b92af407a2cc0c54c55435c",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "yzagpwuSr0B6LMDFTFVDXA",
          "kid": "gwYol/6qWBK4EQHv065YiQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-499",
    "channelId": "499",
    "name": "Vasanth TV",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11900-j9l4vygg-v1/imageContent-11900-j9l4vygg-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_813/output/manifest.mpd",
    "backupUrl": "https://mumt04.tangotv.in/m18aqlK4VASANTHTV/index.m3u8",
    "clearkey": "807a84961185544bb99c6ab2f389a79b:3be28d6cdca77e306c36677effec100c",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "O+KNbNynfjBsNmd+/+wQDA",
          "kid": "gHqElhGFVEu5nGqy84mnmw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-272",
    "channelId": "272",
    "name": "Polimer TV",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11188-j9i480zc-v1/imageContent-11188-j9i480zc-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_674/output/manifest.mpd",
    "backupUrl": "https://cdn.pishow.tv/ott/live/1241/master.m3u8",
    "clearkey": "1a27361b6592508cace3b449805dbad4:b49b30c220c80dae732f871c9dd9ff73",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "tJswwiDIDa5zL4ccndn/cw",
          "kid": "Gic2G2WSUIys47RJgF261A"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-392",
    "channelId": "392",
    "name": "Makkal TV",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11565-j9jv0np4-v1/imageContent-11565-j9jv0np4-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_617/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "e9600fa3b23b5744afde514428a9b850:8a3f55d0c2ca6cacfc6fb4520c6c1e5a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "ij9V0MLKbKz8b7RSDGweWg",
          "kid": "6WAPo7I7V0Sv3lFEKKm4UA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-380",
    "channelId": "380",
    "name": "KTV HD",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11536-j9jty5w8-v1/imageContent-11536-j9jty5w8-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_600/output/manifest.mpd",
    "backupUrl": "https://fta.ektv.in/live/697/master.m3u8",
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-659",
    "channelId": "659",
    "name": "Vendhar TV",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-31187-jldgeg1k-v2/imageContent-31187-jldgeg1k-m2.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_815/output/manifest.mpd",
    "backupUrl": "https://mumt04.tangotv.in/m18aqlK4VENDHARTV/index.m3u8",
    "clearkey": "c008ae4ed8d35e31beb1cc117f1eeab4:bbc819b4b16a1e73fef0d22733e43511",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "u8gZtLFqHnP+8NInM+Q1EQ",
          "kid": "wAiuTtjTXjG+scwRfx7qtA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-797",
    "channelId": "797",
    "name": "Zee Thirai",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-49016-k5lx1za0-v2/imageContent-49016-k5lx1za0-m2.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_989/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-201",
    "channelId": "201",
    "name": "J Movies",
    "category": "Tamil",
    "genre": "Tamil",
    "language": "Tamil",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-816-j5m8dqd4-v1/imageContent-816-j5m8dqd4-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_345/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "6401400d14dc5f10b66bf0f2aa7c9938:7517b966c22cac84824771e678d6079b",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "dRe5ZsIsrISCR3HmeNYHmw",
          "kid": "ZAFADRTcXxC2a/DyqnyZOA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-492",
    "channelId": "492",
    "name": "Udaya TV HD",
    "category": "Kannada",
    "genre": "Kannada",
    "language": "Kannada",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11883-j9l3rjzc-v1/imageContent-11883-j9l3rjzc-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_806/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "30b8ae18a2f1561abd7594f9c7855e8a:16d66f292ec2e6f3486f44eeac5c5d89",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "FtZvKS7C5vNIb0TurFxdiQ",
          "kid": "MLiuGKLxVhq9dZT5x4Veig"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-612",
    "channelId": "612",
    "name": "Colors Kannada HD",
    "category": "Kannada",
    "genre": "Kannada",
    "language": "Kannada",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12249-j9qr87hc-v5/imageContent-12249-j9qr87hc-m5.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_490/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "8a6a50bd3363584580d152622948698e:fa06cbc00dc4a21187c7bc571a95809f",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "+gbLwA3EohGHx7xXGpWAnw",
          "kid": "impQvTNjWEWA0VJiKUhpjg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-108",
    "channelId": "108",
    "name": "Colors Kannada",
    "category": "Kannada",
    "genre": "Kannada",
    "language": "Kannada",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-345-j5jmkws0-v2/imageContent-345-j5jmkws0-m4.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_157/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "95aeb1cfadf75b6a86d275d5bd13faba:01285ce3ac870341b2e2b8d711036a87",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "AShc46yHA0Gy4rjXEQNqhw",
          "kid": "la6xz633W2qG0nXVvRP6ug"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-467",
    "channelId": "467",
    "name": "Star Suvarna HD",
    "category": "Kannada",
    "genre": "Kannada",
    "language": "Kannada",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11816-j9kz224o-v1/imageContent-11816-j9kz224o-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_746/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-533",
    "channelId": "533",
    "name": "Colors SUPER",
    "category": "Kannada",
    "genre": "Kannada",
    "language": "Kannada",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-18308-jcqnzl68-v1/imageContent-18308-jcqnzl68-m1.PNG",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_492/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "4b4c7d32f76855b487e786b9af75f928:9ba47dc016154aa96fb50df5bd2a7f1e",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "m6R9wBYVSqlvtQ31vSp/Hg",
          "kid": "S0x9MvdoVbSH54a5r3X5KA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-256",
    "channelId": "256",
    "name": "Zee Kannada",
    "category": "Kannada",
    "genre": "Kannada",
    "language": "Kannada",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11030-j8yk2g3s-v1/imageContent-11030-j8yk2g3s-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_423/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-675",
    "channelId": "675",
    "name": "Zee Kannada HD",
    "category": "Kannada",
    "genre": "Kannada",
    "language": "Kannada",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-33827-jo5kcr1c-v4/imageContent-33827-jo5kcr1c-m5.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_917/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-372",
    "channelId": "372",
    "name": "Jeevan TV",
    "category": "Malayalam",
    "genre": "Malayalam",
    "language": "Malayalam",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12323-jaa5pzxs-v1/imageContent-12323-jaa5pzxs-m1.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_588/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "ccae05f541f15e79927f0d922cd8d848:02ea15e3b67ac825bcbae1ad9430205a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "AuoV47Z6yCW8uuGtlDAgWg",
          "kid": "zK4F9UHxXnmSfw2SLNjYSA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-231",
    "channelId": "231",
    "name": "Udaya Movies",
    "category": "Kannada",
    "genre": "Kannada",
    "language": "Kannada",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-1002-j5nf74c0-v1/imageContent-1002-j5nf74c0-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_228/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "8cc83b45a0975c16969161ea198fcb8a:854437a03e9c7025dc2c77af4e1ee2bc",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "hUQ3oD6ccCXcLHevTh7ivA",
          "kid": "jMg7RaCXXBaWkWHqGY/Lig"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-555",
    "channelId": "555",
    "name": "Asianet Suvarna News",
    "category": "Malayalam",
    "genre": "Kannada",
    "language": "Malayalam",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11963-j9lui4rc-v3/imageContent-11963-j9lui4rc-m4.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_766/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "cfb4bea528655b01a3e5ec1753c4bc31:e7a13edd5198488ef9cbdbf34dd0d16b",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "56E+3VGYSI75y9vzTdDRaw",
          "kid": "z7S+pShlWwGj5ewXU8S8MQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-489",
    "channelId": "489",
    "name": "TV9 Gujarati",
    "category": "Gujarati",
    "genre": "Gujarati",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11874-j9l376yg-v2/imageContent-11874-j9l376yg-m2.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_803/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "f9aae973f673575ca973098cda99a3e9:3f640a71f5ff00ec53b3d46f7abd67a4",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "P2QKcfX/AOxTs9Rver1npA",
          "kid": "+arpc/ZzV1ypcwmM2pmj6Q"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-73",
    "channelId": "73",
    "name": "ABP Asmita",
    "category": "Gujarati",
    "genre": "Gujarati",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-228-j5fxgzio-v2/imageContent-228-j5fxgzio-m2.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_378/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "276be07867635f8b833bc173630c5c34:a902dcb264fa8cd6f8ecd9502809c378",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "qQLcsmT6jNb47NlQKAnDeA",
          "kid": "J2vgeGdjX4uDO8FzYwxcNA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-974",
    "channelId": "974",
    "name": "1st Gujarat",
    "category": "Gujarati",
    "genre": "Gujarati",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/1STGUJ_Thumbnail-v2/1STGUJ_Thumbnail.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1803/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "1f3f6f390b665306babb455173ba611d:bc441cb53484a68a131cbdb90897990a",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "vEQctTSEpooTHL25CJeZCg",
          "kid": "Hz9vOQtmUwa6u0VRc7phHQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-507",
    "channelId": "507",
    "name": "Zee 24 Kalak",
    "category": "Gujarati",
    "genre": "Gujarati",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11924-j9l5fs6w-v3/imageContent-11924-j9l5fs6w-m3.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_833/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-323",
    "channelId": "323",
    "name": "DD Girnar",
    "category": "Gujarati",
    "genre": "Gujarati",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11341-j9jpdu00-v1/imageContent-11341-j9jpdu00-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_507/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "21e5c1e63f6a5d6eb819c5b320f61933:768da17e39df7a799ba71209e35664ca",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "do2hfjnfenmbpxIJ41Zkyg",
          "kid": "IeXB5j9qXW64GcWzIPYZMw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-597",
    "channelId": "597",
    "name": "Zee Sarthak",
    "category": "Odia",
    "genre": "Odia",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12207-j9qlt5vk-v2/imageContent-12207-j9qlt5vk-m2.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_709/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-978",
    "channelId": "978",
    "name": "Sidharth TV",
    "category": "Odia",
    "genre": "Odia",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-69926-l1ooghuw-v3/imageContent-69926-l1ooghuw-m3.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_1808/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "3028900fca835f7ba7282ec45724706e:57d0629f3a2a695d6ec12f0f4d1d7982",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "V9BinzoqaV1uwS8PTR15gg",
          "kid": "MCiQD8qDX3unKC7EVyRwbg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-805",
    "channelId": "805",
    "name": "Nandighosha TV",
    "category": "Odia",
    "genre": "Odia",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-49597-k6k8ts8g-v2/imageContent-49597-k6k8ts8g-m2.png",
    "streamUrl": "https://bpprod1catchup.akamaized.net/bpk-tv/irdeto_com_Channel_993/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "a126958aaba45522b5161f7adfc26c4e:910536855011eef62dbae1e4e289a80b",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "kQU2hVAR7vYtuuHk4omoCw",
          "kid": "oSaViqukVSK1Fh9638JsTg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-333",
    "channelId": "333",
    "name": "DD Odia",
    "category": "Odia",
    "genre": "Odia",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11366-j9jpvkw0-v1/imageContent-11366-j9jpvkw0-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_518/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "62075c33d8cc51e291b1c2f0c5547a00:b04d23952acc5907bb1ddc02a2746b15",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "sE0jlSrMWQe7HdwConRrFQ",
          "kid": "YgdcM9jMUeKRscLwxVR6AA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-375",
    "channelId": "375",
    "name": "Kalinga TV",
    "category": "Odia",
    "genre": "Odia",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11513-j9jtooug-v1/imageContent-11513-j9jtooug-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_591/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "22e99761651b5555a8ee2dd84a94ae5e:2cc2993720a379652ecc60f5e0eb6fda",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "LMKZNyCjeWUuzGD14Otv2g",
          "kid": "IumXYWUbVVWo7i3YSpSuXg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-292",
    "channelId": "292",
    "name": "Asianet HD",
    "category": "Malayalam",
    "genre": "Malayalam",
    "language": "Malayalam",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11246-j9iw5g74-v3/imageContent-11246-j9iw5g74-m3.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_464/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-230",
    "channelId": "230",
    "name": "Surya TV",
    "category": "Malayalam",
    "genre": "Malayalam",
    "language": "Malayalam",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-1005-j5nfiy9c-v1/imageContent-1005-j5nfiy9c-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_212/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "df1ae0f973285a53934d8b5d7956c1c1:57dfe67ba778704f795316d55995ffb0",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "V9/me6d4cE95UxbVWZX/sA",
          "kid": "3xrg+XMoWlOTTYtdeVbBwQ"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-294",
    "channelId": "294",
    "name": "Asianet Plus",
    "category": "Malayalam",
    "genre": "Malayalam",
    "language": "Malayalam",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11254-j9ixwlcg-v1/imageContent-11254-j9ixwlcg-m1.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_467/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-10",
    "channelId": "10",
    "name": "Flowers",
    "category": "Malayalam",
    "genre": "Malayalam",
    "language": "Malayalam",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-27-j5fbpbbs-v1/imageContent-27-j5fbpbbs-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_318/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "e9526c857d535e5aa3baf6265ae15872:8755dd42093d00d2d4899b965eaab324",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "h1XdQgk9ANLUiZuWXqqzJA",
          "kid": "6VJshX1TXlqjuvYmWuFYcg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-694",
    "channelId": "694",
    "name": "Zee Keralam HD",
    "category": "Malayalam",
    "genre": "Malayalam",
    "language": "Malayalam",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-35312-jqy146c8-v3/imageContent-35312-jqy146c8-m8.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_933/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-684",
    "channelId": "684",
    "name": "Zee Keralam",
    "category": "Malayalam",
    "genre": "Malayalam",
    "language": "Malayalam",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-9003-j7rlh2aw-v2/imageContent-9003-j7rlh2aw-m2.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_926/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-395",
    "channelId": "395",
    "name": "Mazhavil Manorama HD",
    "category": "Malayalam",
    "genre": "Malayalam",
    "language": "Malayalam",
    "resolution": "1080p",
    "badge": "Tata Play \u2022 1080p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11577-j9jv8mqg-v1/imageContent-11577-j9jv8mqg-m1.png",
    "streamUrl": "https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_621/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "0a4b4edd53725952ba29445f0f441e9a:f7a7199ed905f8b3611a287c2201fd74",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "96cZntkF+LNhGih8IgH9dA",
          "kid": "CktO3VNyWVK6KURfD0Qemg"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-571",
    "channelId": "571",
    "name": "Tata Play Punjab De Rang",
    "category": "Punjabi",
    "genre": "Punjabi",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-68739-kywk7vq0-v1/imageContent-68739-kywk7vq0-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_799/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "6ae6f2e45a5d55be961943c77ca1546f:f7237beebff661e0a85cd2640f6a6007",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "9yN77r/2YeCoXNJkD2pgBw",
          "kid": "auby5FpdVb6WGUPHfKFUbw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-796",
    "channelId": "796",
    "name": "Zee Punjabi",
    "category": "Punjabi",
    "genre": "Punjabi",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-49009-k5g6nid4-v1/imageContent-49009-k5g6nid4-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_988/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-122",
    "channelId": "122",
    "name": "PTC Punjabi",
    "category": "Punjabi",
    "genre": "Punjabi",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-408-j5jr93k8-v1/imageContent-408-j5jr93k8-m1.png",
    "streamUrl": "https://bpprod5catchup.akamaized.net/bpk-tv/irdeto_com_Channel_216/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "e85f61306baf53aea8c5e5987b5968d8:14b374c7b46ba0f8fa8e05039e2b82e6",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "FLN0x7RroPj6jgUDniuC5g",
          "kid": "6F9hMGuvU66oxeWYe1lo2A"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-580",
    "channelId": "580",
    "name": "Zee Punjab Haryana Himachal Pradesh",
    "category": "Punjabi",
    "genre": "Punjabi",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12155-j9pd5ug8-v1/imageContent-12155-j9pd5ug8-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_838/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": null,
    "channel_key": {},
    "isTataPlay": true
  },
  {
    "id": "tp-624",
    "channelId": "624",
    "name": "Pitaara TV",
    "category": "Punjabi",
    "genre": "Punjabi",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12931-jb64agig-v1/imageContent-12931-jb64agig-m1.png",
    "streamUrl": "https://bpprod6catchup.akamaized.net/bpk-tv/irdeto_com_Channel_855/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "866f6717d88d5be6abe0193a682ec527:8b986bfedee12b013e758d0f4e982285",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "i5hr/t7hKwE+dY0PTpgihQ",
          "kid": "hm9nF9iNW+ar4Bk6aC7FJw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-567",
    "channelId": "567",
    "name": "Nepal 1",
    "category": "Others",
    "genre": "Others",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-12106-j9ooxpug-v2/imageContent-12106-j9ooxpug-m2.png",
    "streamUrl": "https://bpprod2catchup.akamaized.net/bpk-tv/irdeto_com_Channel_657/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "4e6a83debee35e3b94cbc325ffefc58b:cdd24462d22895988550f703434257ba",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "zdJEYtIolZiFUPcDQ0JXug",
          "kid": "TmqD3r7jXjuUy8Ml/+/Fiw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-214",
    "channelId": "214",
    "name": "Rengoni TV",
    "category": "Others",
    "genre": "Others",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-860-j5mao56o-v1/imageContent-860-j5mao56o-m1.png",
    "streamUrl": "https://bpprod7catchup.akamaized.net/bpk-tv/irdeto_com_Channel_332/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "f28b45e595c15424a2e4cf979670e570:13346a413071f7c69270f7e0c187cd90",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "EzRqQTBx98aScPfgwYfNkA",
          "kid": "8otF5ZXBVCSi5M+XlnDlcA"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-353",
    "channelId": "353",
    "name": "DY 365",
    "category": "Others",
    "genre": "Others",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11411-j9jqocds-v1/imageContent-11411-j9jqocds-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_534/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "79cdbf3526065a598b64531d4838c1fb:afd0fb438bbbb2014fe21ba1e36384ad",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "r9D7Q4u7sgFP4huh42OErQ",
          "kid": "ec2/NSYGWlmLZFMdSDjB+w"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-101",
    "channelId": "101",
    "name": "Rang",
    "category": "Others",
    "genre": "Others",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-333-j5jl5q6o-v1/imageContent-333-j5jl5q6o-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_214/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "25e888c5f0bd598d81bf713039d4b76b:fca7fca6dba9fc05ae6348a7594cfbcd",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "/Kf8ptup/AWuY0inWUz7zQ",
          "kid": "JeiIxfC9WY2Bv3EwOdS3aw"
        }
      ],
      "type": "temporary"
    },
    "isTataPlay": true
  },
  {
    "id": "tp-368",
    "channelId": "368",
    "name": "Indradhanu",
    "category": "Others",
    "genre": "Others",
    "language": "Hindi",
    "resolution": "720p",
    "badge": "Tata Play \u2022 720p",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/imageContent-11485-j9jsysqw-v1/imageContent-11485-j9jsysqw-m1.png",
    "streamUrl": "https://bpprod4catchup.akamaized.net/bpk-tv/irdeto_com_Channel_576/output/manifest.mpd",
    "backupUrl": null,
    "clearkey": "aec90e7757c0529ea08286885dd0060b:b94e0c5579f5938f1b047bcc671a867b",
    "channel_key": {
      "keys": [
        {
          "kty": "oct",
          "k": "uU4MVXn1k48bBHvMZxqGew",
          "kid": "rskOd1fAUp6ggoaIXdAGCw"
        }
      ],
      "type": "temporary"
    },
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
    this.isSyncing = false;

    // Load full Tata Play channels dataset asynchronously
    this.loadTataPlayChannels();
  }

  async loadTataPlayChannels() {
    if (typeof window === "undefined" || !window.fetch) return;
    try {
      const resp = await fetch("data/tataplay_channels.json?v=20261118_tp");
      if (resp.ok) {
        const fullDataset = await resp.json();
        if (Array.isArray(fullDataset) && fullDataset.length > 0) {
          this.channels = fullDataset;
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
    return all.filter(c => c.category && c.category.toLowerCase() === category.toLowerCase());
  }

  getFilteredChannels() {
    let list = this.getAllChannels();
    
    if (this.activeCategory !== "all") {
      if (this.activeCategory === "Custom") {
        list = list.filter(c => c.isCustom);
      } else {
        list = list.filter(c => c.category && c.category.toLowerCase() === this.activeCategory.toLowerCase());
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
    const kanCount = this.getChannelsByCategory("Kannada").length;

    container.innerHTML = `
      <!-- Floating Mobile/Desktop Back Button -->
      <button class="livetv-floating-back-btn" id="livetvFloatingBackBtn" title="Back to Movieshub">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span>Back to Movies</span>
      </button>

      <div class="livetv-container">
        <!-- Player Area -->
        <div class="livetv-player-pane">
          <div class="livetv-player-header" id="livetvPlayerHeader">
            <button class="livetv-back-btn" id="livetvBackBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Back to Movies</span>
            </button>
            <div class="livetv-live-badge"><span class="live-dot"></span> LIVE</div>
            <div class="livetv-current-title" id="livetvChannelTitle">Select a Channel</div>
            <div class="livetv-current-badge" id="livetvChannelBadge">1080p HD</div>

            <!-- Multi-Quality & Multi-Audio Selector -->
            <div class="livetv-stream-controls" id="livetvStreamControls" style="display:none;margin-left:auto;align-items:center;gap:8px;">
              <select id="livetvQualitySelect" class="livetv-stream-select" title="Stream Resolution">
                <option value="-1">Auto (HD)</option>
              </select>
              <select id="livetvAudioSelect" class="livetv-stream-select" title="Audio Track" style="display:none;">
                <option value="-1">Default Audio</option>
              </select>
            </div>

            <div class="livetv-current-cat" id="livetvChannelCat" style="margin-left:8px;">Tata Play Network</div>
          </div>

          <div class="livetv-video-wrap">
            <video id="livetvVideo" class="livetv-video" controls autoplay playsinline></video>
            <div class="livetv-empty-state" id="livetvEmptyState">
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

        <!-- Sidebar / Channel List -->
        <div class="livetv-sidebar">
          <div class="livetv-sidebar-header">
            <div class="livetv-filter-row">
              <select class="livetv-country-select" id="livetvCategorySelect" style="flex:1;">
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
                <option value="Kannada">🦚 Kannada (${kanCount})</option>
                <option value="Custom">⚡ Custom M3U (${this.customChannels.length})</option>
              </select>
              <button class="livetv-import-btn" id="livetvImportBtn" title="Import M3U Playlist or Stream">
                + Import M3U
              </button>
            </div>

            <div class="livetv-search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="livetvSearchInput" placeholder="Search Tata Play, Tamil, Telugu, Sports..." />
            </div>

            <!-- Advanced Category Tabs -->
            <div class="livetv-cat-bar" id="livetvCatBar">
              <button class="livetv-cat-btn active" data-cat="all">All</button>
              <button class="livetv-cat-btn" data-cat="Tamil" id="tabTamil">🎭 Tamil (${tamilCount})</button>
              <button class="livetv-cat-btn" data-cat="Telugu" id="tabTelugu">🎬 Telugu (${teluguCount})</button>
              <button class="livetv-cat-btn" data-cat="Sports" id="tabSports">🏏 Sports (${sportsCount})</button>
              <button class="livetv-cat-btn" data-cat="Hindi" id="tabHindi">📺 Hindi (${hindiCount})</button>
              <button class="livetv-cat-btn" data-cat="Movies" id="tabMovies">🍿 Movies (${moviesCount})</button>
              <button class="livetv-cat-btn" data-cat="News" id="tabNews">📰 News (${newsCount})</button>
              <button class="livetv-cat-btn" data-cat="Music" id="tabMusic">🎶 Music (${musicCount})</button>
              <button class="livetv-cat-btn" data-cat="Kids" id="tabKids">🧒 Kids (${kidsCount})</button>
              <button class="livetv-cat-btn" data-cat="Knowledge" id="tabKnowledge">🧠 Knowledge</button>
              <button class="livetv-cat-btn" data-cat="Malayalam" id="tabMalayalam">🌴 Malayalam</button>
              <button class="livetv-cat-btn" data-cat="Kannada" id="tabKannada">🦚 Kannada</button>
              <button class="livetv-cat-btn" data-cat="Custom" id="tabCustom">⚡ Custom (${this.customChannels.length})</button>
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

    // Auto-select first channel
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
    // Floating and header back buttons
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
https://edge3-mob.yuppcdn.net/trans_non_drm/smil:ktv_tamil.smil/playlist.m3u8
#EXTINF:-1 tvg-id="103" tvg-logo="⚡" group-title="Sports", Sports 18 1 HD
https://cdn.pishow.tv/ott/live/1155/master.m3u8`;
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
        ? `<img src="${ch.logo}" alt="" style="width:28px;height:28px;object-fit:contain;border-radius:4px;" onerror="this.outerHTML='⚡';" />`
        : `<div class="livetv-channel-logo">${ch.logo || "⚡"}</div>`;

      const subText = ch.isCustom ? "⚡ Custom M3U" : (ch.genre || ch.category);

      return `
        <div class="livetv-channel-card ${isSelected ? 'selected' : ''}" data-id="${ch.id}">
          ${logoHtml}
          <div class="livetv-channel-details">
            <div class="livetv-channel-name">${ch.name} <span class="livetv-res-tag">(${ch.resolution || "HD"})</span></div>
            <div class="livetv-channel-sub">${subText} • ${ch.category}</div>
          </div>
          ${ch.isCustom ? `<button class="livetv-del-btn" data-id="${ch.id}" title="Delete channel">&times;</button>` : ''}
          <div class="livetv-status-indicator"></div>
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
    const badge = document.getElementById("livetvChannelBadge");
    const cat = document.getElementById("livetvChannelCat");
    const emptyState = document.getElementById("livetvEmptyState");
    const video = document.getElementById("livetvVideo");
    const loader = document.getElementById("livetvLoader");

    if (header) header.style.display = "flex";
    if (title) title.textContent = channel.name;
    if (badge) badge.textContent = (channel.badge ? channel.badge + " • " : "") + (channel.resolution || "1080p") + " HD";
    if (cat) cat.textContent = "Tata Play • " + channel.category;
    if (emptyState) emptyState.style.display = "none";
    if (video) video.style.display = "block";

    // Play Stream via DASH/Shaka or HLS or Native
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
      loaderEl.innerHTML = '<div class="spinner"></div><span>Connecting to Tata Play live feed...</span>';
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
          videoEl.muted = true;
          videoEl.play().catch(e => console.warn("Live playback kickstart failed:", e));
        });
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
        if (channel && channel.backupUrl) {
          console.log("[LiveTV] Switching to verified backup stream:", channel.backupUrl);
          this.streamVideo(channel.backupUrl, videoEl, loaderEl, null);
        } else if (loaderEl) {
          loaderEl.innerHTML = `<span style="color:#ef4444;">Live feed temporarily offline. Please select another channel or import stream.</span>`;
        }
      });
      return;
    }

    // 2. HLS with Hls.js
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
        console.warn("[LiveTV] HLS stream error:", data.type, data.details);
        if (data.fatal) {
          switch (data.type) {
            case window.Hls.ErrorTypes.NETWORK_ERROR:
              if (channel && channel.backupUrl && url !== channel.backupUrl) {
                console.log("[LiveTV] Switching to backup URL:", channel.backupUrl);
                hls.destroy();
                this.hlsInstance = null;
                this.streamVideo(channel.backupUrl, videoEl, loaderEl, null);
                return;
              }
              hls.startLoad();
              break;
            case window.Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              this.hlsInstance = null;
              if (channel && channel.backupUrl && url !== channel.backupUrl) {
                this.streamVideo(channel.backupUrl, videoEl, loaderEl, null);
              } else if (loaderEl) {
                loaderEl.innerHTML = `<span style="color:#ef4444;">Feed offline. Try another channel.</span>`;
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
      videoEl.addEventListener("error", () => {
        if (channel && channel.backupUrl && url !== channel.backupUrl) {
          this.streamVideo(channel.backupUrl, videoEl, loaderEl, null);
        }
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
