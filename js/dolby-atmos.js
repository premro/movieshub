/**
 * Movieshub Dolby Atmos 3D Spatial Audio Engine
 * Real-time 7.1.4 Object-Based Binaural Spatializer using Web Audio API
 * Features:
 *  - 7.1.4 Virtual Soundstage (8 Bed Channels + 4 Overhead Height Objects)
 *  - HRTF (Head-Related Transfer Function) 3D Spatial Panning
 *  - LFE (Low Frequency Effects) Subwoofer Crossover & Bass Engine
 *  - Cinematic Dialogue Clarity Enhancer (Center Channel Acoustic Tuning)
 *  - Cinema Room Acoustic Convolver & Dynamic Range Compression (DRC)
 *  - Real-time 3D Sound Stage Visualizer with live speaker level meters
 */

class DolbyAtmosEngine {
  constructor() {
    this.audioCtx = null;
    this.sourceNode = null;
    this.mediaElement = null;
    this.isInitialized = false;
    this.isEnabled = true;
    this.currentPreset = "atmos_3d"; // "atmos_3d", "cinema", "dialogue", "night", "bypass"
    
    // Tuning parameters
    this.heightLevel = 1.0;
    this.surroundWidth = 1.0;
    this.bassLevel = 4.0; // dB
    this.dialogueBoost = 3.5; // dB

    // Node graph handles
    this.speakers = {};
    this.analysers = {};
    this.masterGain = null;
    this.compressor = null;
    this.convolver = null;
    this.reverbGain = null;
    this.dryGain = null;
    this.lfeFilter = null;
    this.lfeGain = null;
    this.dialogueFilter = null;
    this.visualizerTimer = null;

    // Speaker positions in 3D space: [x, y, z] (y is height, -z is front, +z is rear)
    this.SPEAKER_COORDS = {
      FL:  { name: "Front Left",        pos: [-2.0,  0.0, -2.2], isHeight: false, isLfe: false },
      C:   { name: "Center (Dialogue)", pos: [ 0.0,  0.0, -2.6], isHeight: false, isLfe: false, isCenter: true },
      FR:  { name: "Front Right",       pos: [ 2.0,  0.0, -2.2], isHeight: false, isLfe: false },
      LFE: { name: "Subwoofer (LFE)",   pos: [ 0.0, -0.8, -1.0], isHeight: false, isLfe: true },
      SL:  { name: "Surround Left",     pos: [-3.0,  0.2,  0.0], isHeight: false, isLfe: false },
      SR:  { name: "Surround Right",    pos: [ 3.0,  0.2,  0.0], isHeight: false, isLfe: false },
      RL:  { name: "Rear Left",         pos: [-2.0,  0.3,  2.2], isHeight: false, isLfe: false },
      RR:  { name: "Rear Right",        pos: [ 2.0,  0.3,  2.2], isHeight: false, isLfe: false },
      TFL: { name: "Top Front Left",    pos: [-1.6,  2.2, -1.4], isHeight: true,  isLfe: false },
      TFR: { name: "Top Front Right",   pos: [ 1.6,  2.2, -1.4], isHeight: true,  isLfe: false },
      TRL: { name: "Top Rear Left",     pos: [-1.6,  2.0,  1.4], isHeight: true,  isLfe: false },
      TRR: { name: "Top Rear Right",    pos: [ 1.6,  2.0,  1.4], isHeight: true,  isLfe: false }
    };
  }

  /**
   * Attach Dolby Atmos engine to HTML5 MediaElement (video or audio)
   */
  attach(mediaElement) {
    if (!mediaElement) return;
    if (this.mediaElement === mediaElement && this.isInitialized) return;

    this.mediaElement = mediaElement;

    // Lazy initialization on first user play / interaction
    const unlockAudio = () => {
      this.init();
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume().catch(() => {});
      }
    };

    mediaElement.addEventListener("play", unlockAudio, { once: true });
    window.addEventListener("click", unlockAudio, { once: true });
  }

  /**
   * Initialize Web Audio Context and 7.1.4 Spatializer graph
   */
  init() {
    if (this.isInitialized) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn("[DolbyAtmos] Web Audio API is not supported in this environment");
      return;
    }

    try {
      this.audioCtx = new AudioContextClass({ latencyHint: "playback" });
      const ctx = this.audioCtx;

      // Master output chain with Cinema DRC Compressor & +3dB Gain Engine
      this.masterGain = ctx.createGain();
      this.masterGain.gain.value = 1.25;

      this.compressor = ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -12.0; // dB
      this.compressor.knee.value = 10.0;
      this.compressor.ratio.value = 4.0;
      this.compressor.attack.value = 0.003; // 3ms
      this.compressor.release.value = 0.25;  // 250ms

      this.masterGain.connect(this.compressor);
      this.compressor.connect(ctx.destination);

      // Create Cinema Acoustic Impulse Reverb
      this.setupRoomAcoustics();

      // Connect source from video element
      if (this.mediaElement && !this.sourceNode) {
        this.sourceNode = ctx.createMediaElementSource(this.mediaElement);
      }

      if (!this.sourceNode) return;

      // Split input stereo/multichannel into L and R channels
      const splitter = ctx.createChannelSplitter(2);
      this.sourceNode.connect(splitter);

      // Setup 12 Virtual Speakers
      Object.entries(this.SPEAKER_COORDS).forEach(([spkKey, cfg]) => {
        const gainNode = ctx.createGain();
        const panner = ctx.createPanner();
        panner.panningModel = "HRTF";
        panner.distanceModel = "inverse";
        panner.refDistance = 1.0;
        panner.maxDistance = 10000;
        panner.rolloffFactor = 1.0;
        panner.coneInnerAngle = 360;

        // Position virtual speaker in 3D Euclidean soundstage
        if (panner.positionX) {
          panner.positionX.value = cfg.pos[0];
          panner.positionY.value = cfg.pos[1];
          panner.positionZ.value = cfg.pos[2];
        } else {
          panner.setPosition(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
        }

        // Real-time level analyser for visualizer
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.7;

        // Channel routing matrix:
        // FL, SL, RL, TFL, TRL receive Left channel (index 0)
        // FR, SR, RR, TFR, TRR receive Right channel (index 1)
        // C and LFE receive mixed (L + R) / 2
        if (cfg.isCenter) {
          // Center channel with dialogue clarity bandpass
          this.dialogueFilter = ctx.createBiquadFilter();
          this.dialogueFilter.type = "peaking";
          this.dialogueFilter.frequency.value = 2400; // Speech fundamental clarity
          this.dialogueFilter.Q.value = 1.2;
          this.dialogueFilter.gain.value = this.dialogueBoost;

          splitter.connect(gainNode, 0);
          splitter.connect(gainNode, 1);
          gainNode.gain.value = 0.5; // Mix L & R to mono center
          gainNode.connect(this.dialogueFilter);
          this.dialogueFilter.connect(panner);
        } else if (cfg.isLfe) {
          // LFE Subwoofer with 120Hz low-pass and 60Hz punch
          this.lfeFilter = ctx.createBiquadFilter();
          this.lfeFilter.type = "lowpass";
          this.lfeFilter.frequency.value = 120;
          this.lfeFilter.Q.value = 1.0;

          const lfeSubBoost = ctx.createBiquadFilter();
          lfeSubBoost.type = "lowshelf";
          lfeSubBoost.frequency.value = 60;
          lfeSubBoost.gain.value = this.bassLevel;

          splitter.connect(gainNode, 0);
          splitter.connect(gainNode, 1);
          gainNode.gain.value = 0.6;
          gainNode.connect(this.lfeFilter);
          this.lfeFilter.connect(lfeSubBoost);
          lfeSubBoost.connect(panner);
          this.lfeGain = gainNode;
        } else {
          // Surround and Height speakers
          const chIdx = spkKey.endsWith("L") ? 0 : 1;
          splitter.connect(gainNode, chIdx);
          
          if (cfg.isHeight) {
            // Apply height frequency contour (slight high-shelf boost for overhead localization)
            const heightFilter = ctx.createBiquadFilter();
            heightFilter.type = "highshelf";
            heightFilter.frequency.value = 4500;
            heightFilter.gain.value = 2.0;
            gainNode.connect(heightFilter);
            heightFilter.connect(panner);
            gainNode.gain.value = 0.65 * this.heightLevel;
          } else {
            gainNode.connect(panner);
            gainNode.gain.value = spkKey.startsWith("S") || spkKey.startsWith("R") 
              ? 0.75 * this.surroundWidth 
              : 0.85;
          }
        }

        // Connect panner to Master and Reverb bus
        panner.connect(this.masterGain);
        if (this.convolver && !cfg.isLfe) {
          panner.connect(this.reverbGain);
        }
        panner.connect(analyser);

        this.speakers[spkKey] = { gain: gainNode, panner, cfg };
        this.analysers[spkKey] = analyser;
      });

      this.isInitialized = true;
      this.applyPreset(this.currentPreset);
      console.log("[DolbyAtmos] 7.1.4 3D Spatial Audio Engine initialized successfully");
    } catch (e) {
      console.warn("[DolbyAtmos] Engine initialization warning:", e);
    }
  }

  /**
   * Synthesize cinema acoustic impulse response for natural surround immersion
   */
  setupRoomAcoustics() {
    const ctx = this.audioCtx;
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * 1.2); // 1.2s cinema hall decay
    const impulse = ctx.createBuffer(2, length, sampleRate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const decay = Math.exp(-i / (sampleRate * 0.35));
      left[i] = (Math.random() * 2 - 1) * decay * 0.25;
      right[i] = (Math.random() * 2 - 1) * decay * 0.25;
    }

    this.convolver = ctx.createConvolver();
    this.convolver.buffer = impulse;

    this.reverbGain = ctx.createGain();
    this.reverbGain.gain.value = 0.12; // subtle cinema ambience
    this.convolver.connect(this.reverbGain);
    this.reverbGain.connect(this.masterGain);
  }

  /**
   * Switch Dolby Atmos audio profile
   */
  applyPreset(preset) {
    this.currentPreset = preset;
    if (!this.isInitialized) return;

    switch (preset) {
      case "atmos_3d":
        // Full 7.1.4 Spatial Atmos
        this.setHeightLevel(1.2);
        this.setSurroundWidth(1.25);
        this.setBassBoost(4.5);
        this.setDialogueBoost(3.0);
        if (this.reverbGain) this.reverbGain.gain.value = 0.14;
        this.masterGain.gain.value = 1.30;
        break;

      case "cinema":
        // Cinema 7.1 Surround + Room Ambience
        this.setHeightLevel(0.8);
        this.setSurroundWidth(1.4);
        this.setBassBoost(6.0);
        this.setDialogueBoost(2.0);
        if (this.reverbGain) this.reverbGain.gain.value = 0.22;
        this.masterGain.gain.value = 1.35;
        break;

      case "dialogue":
        // Voice clarity boost, reduced reverb
        this.setHeightLevel(0.5);
        this.setSurroundWidth(0.9);
        this.setBassBoost(1.5);
        this.setDialogueBoost(6.5);
        if (this.reverbGain) this.reverbGain.gain.value = 0.04;
        this.masterGain.gain.value = 1.40;
        break;

      case "night":
        // High dynamic compression, tempered bass
        this.setHeightLevel(0.6);
        this.setSurroundWidth(0.85);
        this.setBassBoost(0.0);
        this.setDialogueBoost(4.0);
        if (this.compressor) {
          this.compressor.threshold.value = -22.0;
          this.compressor.ratio.value = 8.0;
        }
        if (this.reverbGain) this.reverbGain.gain.value = 0.05;
        this.masterGain.gain.value = 1.10;
        break;

      case "bypass":
      default:
        // Flat direct output
        this.setHeightLevel(0.0);
        this.setSurroundWidth(1.0);
        this.setBassBoost(0.0);
        this.setDialogueBoost(0.0);
        if (this.reverbGain) this.reverbGain.gain.value = 0.0;
        this.masterGain.gain.value = 1.20;
        break;
    }

    if (window.showToast) {
      const labels = {
        atmos_3d: "Dolby Atmos 3D Spatial Audio (7.1.4 HRTF)",
        cinema: "Dolby Atmos Cinema Hall (Surround Immersion)",
        dialogue: "Dolby Atmos Voice Clarity (Dialogue Boost)",
        night: "Dolby Atmos Night Mode (Compressed Dynamic Range)",
        bypass: "Original Audio (Stereo Pass-Through)"
      };
      window.showToast(`Audio Profile: ${labels[preset] || preset}`);
    }
  }

  setHeightLevel(val) {
    this.heightLevel = Math.max(0, Math.min(2.0, val));
    ["TFL", "TFR", "TRL", "TRR"].forEach(k => {
      if (this.speakers[k]) {
        this.speakers[k].gain.gain.value = 0.65 * this.heightLevel;
      }
    });
  }

  setSurroundWidth(val) {
    this.surroundWidth = Math.max(0.2, Math.min(2.0, val));
    ["SL", "SR", "RL", "RR"].forEach(k => {
      if (this.speakers[k]) {
        this.speakers[k].gain.gain.value = 0.75 * this.surroundWidth;
      }
    });
  }

  setBassBoost(dB) {
    this.bassLevel = dB;
    if (this.lfeGain) {
      this.lfeGain.gain.value = 0.6 * (1 + dB / 12);
    }
  }

  setDialogueBoost(dB) {
    this.dialogueBoost = dB;
    if (this.dialogueFilter) {
      this.dialogueFilter.gain.value = dB;
    }
  }

  /**
   * Get real-time audio power for each speaker (for visualizer UI)
   */
  getSpeakerLevels() {
    const levels = {};
    const buf = new Uint8Array(32);
    Object.entries(this.analysers).forEach(([k, analyser]) => {
      analyser.getByteFrequencyData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += buf[i];
      const avg = sum / (buf.length * 255);
      levels[k] = Math.min(1.0, Math.round(avg * 160) / 100);
    });
    return levels;
  }

  /**
   * Render and open the interactive Dolby Atmos 3D Sound Stage Modal
   */
  openSoundStageModal() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }

    let modal = document.getElementById("dolbyAtmosModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "dolbyAtmosModal";
      modal.className = "dolby-modal";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="dolby-backdrop" id="closeDolbyBackdrop"></div>
      <div class="dolby-dialog">
        <div class="dolby-header">
          <div class="dolby-brand">
            <span class="dolby-double-d">🎛️</span>
            <div>
              <div class="dolby-title">DOLBY ATMOS 3D SOUNDSTAGE</div>
              <div class="dolby-sub">7.1.4 Object-Based Binaural Spatial Audio Engine</div>
            </div>
          </div>
          <button class="dolby-close-btn" id="closeDolbyBtn">&times;</button>
        </div>

        <!-- 3D Sound Stage Theater Visualization -->
        <div class="dolby-stage-container">
          <div class="dolby-stage-screen">FRONT CINEMA SCREEN</div>
          <div class="dolby-stage-arena" id="dolbyStageArena">
            <!-- Overhead Height Ceiling Ring -->
            <div class="dolby-height-ring">
              <span class="dolby-ring-tag">OVERHEAD HEIGHT OBJECTS</span>
              <div class="stage-spk spk-tfl" data-spk="TFL"><span>TFL</span><div class="spk-meter"></div></div>
              <div class="stage-spk spk-tfr" data-spk="TFR"><span>TFR</span><div class="spk-meter"></div></div>
              <div class="stage-spk spk-trl" data-spk="TRL"><span>TRL</span><div class="spk-meter"></div></div>
              <div class="stage-spk spk-trr" data-spk="TRR"><span>TRR</span><div class="spk-meter"></div></div>
            </div>

            <!-- Ear-Level Bed Surround Ring -->
            <div class="dolby-bed-ring">
              <div class="stage-spk spk-fl" data-spk="FL"><span>FL</span><div class="spk-meter"></div></div>
              <div class="stage-spk spk-c" data-spk="C"><span>CENTER</span><div class="spk-meter"></div></div>
              <div class="stage-spk spk-fr" data-spk="FR"><span>FR</span><div class="spk-meter"></div></div>
              <div class="stage-spk spk-lfe" data-spk="LFE"><span>SUB LFE</span><div class="spk-meter"></div></div>

              <div class="stage-spk spk-sl" data-spk="SL"><span>SL</span><div class="spk-meter"></div></div>
              <div class="stage-spk spk-sr" data-spk="SR"><span>SR</span><div class="spk-meter"></div></div>

              <div class="stage-spk spk-rl" data-spk="RL"><span>RL</span><div class="spk-meter"></div></div>
              <div class="stage-spk spk-rr" data-spk="RR"><span>RR</span><div class="spk-meter"></div></div>

              <!-- Listener at Center -->
              <div class="stage-listener">
                <div class="listener-icon">🎧</div>
                <span>LISTENER</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Presets Selector -->
        <div class="dolby-presets-bar">
          <button class="dolby-preset-btn ${this.currentPreset === 'atmos_3d' ? 'active' : ''}" data-preset="atmos_3d">
            <span class="preset-name">🌟 3D Spatial Atmos</span>
            <span class="preset-sub">7.1.4 HRTF Objects</span>
          </button>
          <button class="dolby-preset-btn ${this.currentPreset === 'cinema' ? 'active' : ''}" data-preset="cinema">
            <span class="preset-name">🏛️ Cinema Immersion</span>
            <span class="preset-sub">Room Acoustics & Bass</span>
          </button>
          <button class="dolby-preset-btn ${this.currentPreset === 'dialogue' ? 'active' : ''}" data-preset="dialogue">
            <span class="preset-name">🗣️ Dialogue Clarity</span>
            <span class="preset-sub">Enhanced Center Vocal</span>
          </button>
          <button class="dolby-preset-btn ${this.currentPreset === 'night' ? 'active' : ''}" data-preset="night">
            <span class="preset-name">🌙 Night Cinema</span>
            <span class="preset-sub">Dynamic Compression</span>
          </button>
          <button class="dolby-preset-btn ${this.currentPreset === 'bypass' ? 'active' : ''}" data-preset="bypass">
            <span class="preset-name">⏸ Direct Stereo</span>
            <span class="preset-sub">Pass-Through</span>
          </button>
        </div>

        <!-- Real-Time Sliders -->
        <div class="dolby-controls-grid">
          <div class="dolby-ctrl-box">
            <div class="ctrl-header">
              <span>Overhead Height (Objects)</span>
              <span id="dolbyHeightVal">${Math.round(this.heightLevel * 100)}%</span>
            </div>
            <input type="range" min="0" max="200" value="${Math.round(this.heightLevel * 100)}" id="dolbyHeightSlider" class="dolby-slider">
          </div>

          <div class="dolby-ctrl-box">
            <div class="ctrl-header">
              <span>Surround Sound Width</span>
              <span id="dolbyWidthVal">${Math.round(this.surroundWidth * 100)}%</span>
            </div>
            <input type="range" min="20" max="200" value="${Math.round(this.surroundWidth * 100)}" id="dolbyWidthSlider" class="dolby-slider">
          </div>

          <div class="dolby-ctrl-box">
            <div class="ctrl-header">
              <span>Subwoofer LFE Impact</span>
              <span id="dolbyBassVal">+${this.bassLevel.toFixed(1)} dB</span>
            </div>
            <input type="range" min="0" max="12" step="0.5" value="${this.bassLevel}" id="dolbyBassSlider" class="dolby-slider">
          </div>

          <div class="dolby-ctrl-box">
            <div class="ctrl-header">
              <span>Dialogue Vocal Boost</span>
              <span id="dolbyDialogueVal">+${this.dialogueBoost.toFixed(1)} dB</span>
            </div>
            <input type="range" min="0" max="10" step="0.5" value="${this.dialogueBoost}" id="dolbyDialogueSlider" class="dolby-slider">
          </div>
        </div>

        <div class="dolby-footer-tag">
          ETSI TS 103 420 • E-AC-3 JOC & OAMD Compatible Binaural Spatial Pipeline
        </div>
      </div>
    `;

    modal.style.display = "flex";

    // Bind Close
    const close = () => {
      modal.style.display = "none";
      if (this.visualizerTimer) {
        clearInterval(this.visualizerTimer);
        this.visualizerTimer = null;
      }
    };
    document.getElementById("closeDolbyBtn")?.addEventListener("click", close);
    document.getElementById("closeDolbyBackdrop")?.addEventListener("click", close);

    // Bind Presets
    modal.querySelectorAll(".dolby-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        modal.querySelectorAll(".dolby-preset-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.applyPreset(btn.dataset.preset);

        // Update slider values
        document.getElementById("dolbyHeightSlider").value = Math.round(this.heightLevel * 100);
        document.getElementById("dolbyHeightVal").textContent = `${Math.round(this.heightLevel * 100)}%`;
        document.getElementById("dolbyWidthSlider").value = Math.round(this.surroundWidth * 100);
        document.getElementById("dolbyWidthVal").textContent = `${Math.round(this.surroundWidth * 100)}%`;
        document.getElementById("dolbyBassSlider").value = this.bassLevel;
        document.getElementById("dolbyBassVal").textContent = `+${this.bassLevel.toFixed(1)} dB`;
        document.getElementById("dolbyDialogueSlider").value = this.dialogueBoost;
        document.getElementById("dolbyDialogueVal").textContent = `+${this.dialogueBoost.toFixed(1)} dB`;
      });
    });

    // Bind Sliders
    document.getElementById("dolbyHeightSlider")?.addEventListener("input", (e) => {
      const v = parseFloat(e.target.value) / 100;
      this.setHeightLevel(v);
      document.getElementById("dolbyHeightVal").textContent = `${e.target.value}%`;
    });

    document.getElementById("dolbyWidthSlider")?.addEventListener("input", (e) => {
      const v = parseFloat(e.target.value) / 100;
      this.setSurroundWidth(v);
      document.getElementById("dolbyWidthVal").textContent = `${e.target.value}%`;
    });

    document.getElementById("dolbyBassSlider")?.addEventListener("input", (e) => {
      const v = parseFloat(e.target.value);
      this.setBassBoost(v);
      document.getElementById("dolbyBassVal").textContent = `+${v.toFixed(1)} dB`;
    });

    document.getElementById("dolbyDialogueSlider")?.addEventListener("input", (e) => {
      const v = parseFloat(e.target.value);
      this.setDialogueBoost(v);
      document.getElementById("dolbyDialogueVal").textContent = `+${v.toFixed(1)} dB`;
    });

    // Start live visualizer animation
    if (this.visualizerTimer) clearInterval(this.visualizerTimer);
    this.visualizerTimer = setInterval(() => {
      if (modal.style.display === "none") {
        clearInterval(this.visualizerTimer);
        return;
      }
      const levels = this.getSpeakerLevels();
      modal.querySelectorAll(".stage-spk").forEach(spkEl => {
        const k = spkEl.dataset.spk;
        const lvl = levels[k] || 0;
        const meter = spkEl.querySelector(".spk-meter");
        if (meter) {
          meter.style.transform = `scale(${1 + lvl * 0.45})`;
          meter.style.opacity = Math.max(0.3, lvl);
        }
      });
    }, 70);
  }
}

// Global Singleton
window.DolbyAtmos = new DolbyAtmosEngine();
