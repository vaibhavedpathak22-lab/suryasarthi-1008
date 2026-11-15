/* ═══════════════════════════════════════════════════════════════
   AUTOMATIC 30-SECOND MASTER VIRAL WORKOUT REEL ENGINE (HD 9:16)
   Creates a 30-second 9:16 Vertical Video for Instagram Reels & WhatsApp Status.
   Directly saves .mp4 file to device Downloads folder without preview modal popups!
   Features:
     - Full Unblocked Lord Hanuman Cutout in center foreground
     - Animated Rising Sun (moves vertically from y=620 to y=495)
     - 24 Rotating Golden Sunburst Rays (16 deg/sec) & Multi-layer Glowing Corona
     - Synchronized Marathi Neural Voice + 432Hz Flute/Tanpura BGM
     - Scene 1 (0.0s – 7.0s): Bhagavad Gita Shloka 2.47 + Marathi Meaning
     - Scene 2 (7.0s – 18.0s): DIRECT Today's Workout Report Card Flanking Hanuman
     - Scene 3 (18.0s – 23.5s): ONLY अंतिम ३२ वा सेट पूर्ण, 'जय श्री कृष्ण' विजयघोष! + Sparkles
     - Scene 4 (23.5s – 30.0s): Daily Rotating Pranayama with Live Breathing Wave Animation
   ═══════════════════════════════════════════════════════════════ */
var generatedReelBlob = window.generatedReelBlob = null;
var isGeneratingReel = window.isGeneratingReel = false;

const REEL_STEPS = [
  { pose: "Pranamasana", sub: "Prayer pose", breath: "Exhale", mantraD: "ॐ मित्राय नमः" },
  { pose: "Hasta Uttanasana", sub: "Raised arms pose", breath: "Inhale", mantraD: "ॐ रवये नमः" },
  { pose: "Hasta Padasana", sub: "Hand to foot pose", breath: "Exhale", mantraD: "ॐ सूर्याय नमः" },
  { pose: "Ashwa Sanchalanasana", sub: "Equestrian — right leg back", breath: "Inhale", mantraD: "ॐ भानवे नमः" },
  { pose: "Dandasana", sub: "Stick pose / plank", breath: "Hold", mantraD: "ॐ खगाय नमः" },
  { pose: "Ashtanga Namaskara", sub: "Salute with eight limbs", breath: "Exhale", mantraD: "ॐ पूष्णे नमः" },
  { pose: "Bhujangasana", sub: "Cobra pose", breath: "Inhale", mantraD: "ॐ हिरण्यगर्भाय नमः" },
  { pose: "Adho Mukha Svanasana", sub: "Downward facing dog", breath: "Exhale", mantraD: "ॐ मरीचये नमः" },
  { pose: "Ashwa Sanchalanasana", sub: "Equestrian — left leg back", breath: "Inhale", mantraD: "ॐ आदित्याय नमः" },
  { pose: "Hasta Padasana", sub: "Hand to foot pose", breath: "Exhale", mantraD: "ॐ सवित्रे नमः" },
  { pose: "Hasta Uttanasana", sub: "Raised arms pose", breath: "Inhale", mantraD: "ॐ अर्काय नमः" },
  { pose: "Pranamasana", sub: "Prayer pose", breath: "Exhale", mantraD: "ॐ भास्कराय नमः" }
];

const REEL_PRANAYAMA_PRACTICES = [
  {
    name: "Anulom Vilom",
    nameHi: "अनुलोम विलोम प्राणायाम",
    sub: "Alternate Nostril Breathing",
    benefit: "Balances Left & Right Brain Hemispheres",
    kriya: "Left Inhale (4s) → Hold (4s) → Right Exhale (8s)",
    dosha: "Tridoshic Balance · Calms Vata & Pitta"
  },
  {
    name: "Kapalabhati",
    nameHi: "कपालभाति प्राणायाम",
    sub: "Skull Shining Vital Breath",
    benefit: "Frontal Brain Cleansing & Digestive Fire",
    kriya: "Rhythmic Forceful Exhalations · Passive Inhales",
    dosha: "Clears Kapha Toxins · Ignites Solar Agni"
  },
  {
    name: "Bhramari",
    nameHi: "भ्रामरी प्राणायाम",
    sub: "Humming Bee Resonance",
    benefit: "Vagus Nerve Tone & Deep Mental Tranquility",
    kriya: "Inhale Deeply → Humming Sound on Exhalation",
    dosha: "Instant Stress Relief · Enhances Nitric Oxide"
  },
  {
    name: "Nadi Shodhana",
    nameHi: "नाड़ी शोधन प्राणायाम",
    sub: "Sacred Energy Channel Purification",
    benefit: "Purifies 72,000 Energy Nadis & Pranic Flow",
    kriya: "Inhale (4s) → Kumbhaka Retain (8s) → Exhale (8s)",
    dosha: "Increases Ojas · Elevates Meditation & Kundalini"
  }
];

function loadReelAssetImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn("[Reel Generator] Image load skipped/failed:", src);
      resolve(null);
    };
    img.src = src;
  });
}

async function autoGenerateWorkoutReel(info) {
  if (isGeneratingReel) {
    console.log("[Reel Generator] Already generating reel, skipping concurrent run.");
    return;
  }
  isGeneratingReel = true;

  const btn = document.getElementById("btn-open-reel");
  if (btn) {
    btn.innerHTML = `🎬 Generating 30s Reel <span style="font-size:11px;background:#25D366;color:#111B21;padding:2px 7px;border-radius:10px;font-weight:900">0%</span>`;
  }

  let animInterval = null;
  let hardTimeout = null;
  let audioCtx = null;
  let audioSourceNode = null;
  let osc = null;

  const resetGeneratorState = () => {
    isGeneratingReel = false;
    if (animInterval) { clearInterval(animInterval); animInterval = null; }
    if (hardTimeout) { clearTimeout(hardTimeout); hardTimeout = null; }
    if (audioSourceNode) {
      try { audioSourceNode.stop(); } catch(e){}
      audioSourceNode = null;
    }
    if (osc) {
      try { osc.stop(); } catch(e){}
      osc = null;
    }
    if (audioCtx) {
      try { audioCtx.close(); } catch(e){}
      audioCtx = null;
    }
    const b = document.getElementById("btn-open-reel");
    if (b) {
      b.innerHTML = `🎬 Download / Share Workout Reel <span style="font-size:11px;background:#25D366;color:#111B21;padding:2px 7px;border-radius:10px;font-weight:900">30s HD Reel</span>`;
    }
  };

  hardTimeout = setTimeout(() => {
    console.warn("[Reel Generator] Hard safety timeout reached. Resetting...");
    resetGeneratorState();
  }, 95000);

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1280; // 9:16 Vertical HD Format
    const ctx = canvas.getContext("2d");

    // 1. Preload Hanuman Cutout & UI Overlays
    const [hanumanImg, oS1a, oS1b, oS2, oS3c, oS4] = await Promise.all([
      loadReelAssetImage("./hanuman_clean_cutout.png"),
      loadReelAssetImage("./img/reel_overlays/s1a_shloka.png"),
      loadReelAssetImage("./img/reel_overlays/s1b_meaning.png"),
      loadReelAssetImage("./img/reel_overlays/s2_report.png"),
      loadReelAssetImage("./img/reel_overlays/s3c_complete.png"),
      loadReelAssetImage("./img/reel_overlays/s4_pranayama.png")
    ]);

    // 2. Setup Canvas Stream & Audio Pipeline
    const FPS = 25;
    const TOTAL_DURATION = 30.00;
    const maxFrames = Math.round(TOTAL_DURATION * FPS); // 750 frames

    let stream = null;
    try {
      stream = canvas.captureStream ? canvas.captureStream(FPS) : null;
    } catch(e) { stream = null; }

    try {
      if (stream && (window.AudioContext || window.webkitAudioContext)) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const dest = audioCtx.createMediaStreamDestination();

        try {
          const resp = await fetch('./audio/suryasarthi_reel_30s_voice_bgm.mp3');
          if (resp.ok) {
            const arrayBuffer = await resp.arrayBuffer();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            audioSourceNode = audioCtx.createBufferSource();
            audioSourceNode.buffer = audioBuffer;
            audioSourceNode.connect(dest);
            console.log("[Reel Generator] Master 30s synchronized voice & BGM audio loaded!");
          } else {
            throw new Error("HTTP " + resp.status);
          }
        } catch (fetchErr) {
          console.warn("[Reel Generator] Offline fallback: Using 432Hz sine tone", fetchErr);
          osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(432, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          osc.connect(gain);
          gain.connect(dest);
          osc.start();
        }

        if (dest.stream && dest.stream.getAudioTracks().length > 0) {
          stream.addTrack(dest.stream.getAudioTracks()[0]);
        }
      }
    } catch(e) {
      console.warn("[Reel Generator] Audio track initialization notice:", e);
    }

    const mimeTypes = [
      'video/mp4;codecs=avc1,mp4a.40.2',
      'video/mp4;codecs=h264',
      'video/mp4',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm'
    ];
    let selectedMime = mimeTypes.find(m => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) || '';

    let recorder = null;
    if (stream && typeof MediaRecorder !== "undefined") {
      try {
        recorder = new MediaRecorder(stream, selectedMime ? {
          mimeType: selectedMime,
          videoBitsPerSecond: 4000000,
          audioBitsPerSecond: 192000
        } : {});
      } catch(e) { recorder = null; }
    }

    const chunks = [];
    if (recorder) {
      recorder.ondataavailable = e => { if (e.data && e.data.size > 0) chunks.push(e.data); };

      recorder.onstop = async () => {
        try {
          if (chunks.length > 0) {
            const finalMime = (selectedMime && selectedMime.includes("mp4")) ? "video/mp4" : (selectedMime || "video/mp4");
            generatedReelBlob = new Blob(chunks, { type: finalMime });
          }
        } catch(e){}

        if (typeof data !== "undefined") {
          if (!data.reels) data.reels = {};
          const tKey = typeof todayKey === "function" ? todayKey() : "today";
          if (!data.reels[tKey]) {
            data.reels[tKey] = { date: tKey, savedOrShared: true, timestamp: Date.now() };
            if (typeof saveAll === "function") saveAll();
          }
        }
        cleanupOldWorkoutReels();

        // DIRECT DOWNLOAD INTO DEVICE DOWNLOADS FOLDER (NO PREVIEW MODAL POPUPS!)
        confirmDownloadReelDirect();
        resetGeneratorState();

        if (typeof setStatus === "function") {
          setStatus("✅ 30s Workout Marketing Reel Saved to Downloads!");
        }
      };

      try {
        recorder.start(1000);
        if (audioSourceNode) {
          audioSourceNode.start(0);
        }
      } catch(e){}
    }

    // 3. Render 30.00-Second 9:16 Vertical HD Reel (750 frames @ 25 FPS)
    let frame = 0;

    animInterval = setInterval(() => {
      frame++;
      const t = frame / FPS;

      if (frame % 10 === 0 || frame === maxFrames) {
        const pct = Math.min(100, Math.floor((frame / maxFrames) * 100));
        const b = document.getElementById("btn-open-reel");
        if (b) {
          b.innerHTML = `🎬 Generating 30s Reel <span style="font-size:11px;background:#25D366;color:#111B21;padding:2px 7px;border-radius:10px;font-weight:900">${pct}%</span>`;
        }
      }

      // ── Step 1: Base Sky Gradient ──
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 1280);
      skyGrad.addColorStop(0.00, "rgb(12, 15, 35)");
      skyGrad.addColorStop(0.40, "rgb(32, 50, 95)");
      skyGrad.addColorStop(0.75, "rgb(200, 110, 30)");
      skyGrad.addColorStop(1.00, "rgb(140, 70, 15)");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, 720, 1280);

      // ── Step 2: Animated Rising Sun Position & Rotating Rays ──
      const riseProg = Math.min(1.0, t / 20.0);
      const sunCx = 360;
      const sunCy = Math.round(620 - riseProg * 125); // moves from 620 to 495

      // 24 Rotating Golden Sunburst Rays (16 deg/sec)
      const baseAngle = (t * 16.0) % 360.0;
      const numRays = 24;
      const rayRadius = 650;

      ctx.save();
      ctx.fillStyle = "rgba(255, 215, 0, 0.16)";
      for (let i = 0; i < numRays; i++) {
        if (i % 2 === 0) {
          const a1 = (baseAngle + i * (360.0 / numRays)) * (Math.PI / 180.0);
          const a2 = (baseAngle + (i + 0.82) * (360.0 / numRays)) * (Math.PI / 180.0);
          ctx.beginPath();
          ctx.moveTo(sunCx, sunCy);
          ctx.lineTo(sunCx + rayRadius * Math.cos(a1), sunCy + rayRadius * Math.sin(a1));
          ctx.lineTo(sunCx + rayRadius * Math.cos(a2), sunCy + rayRadius * Math.sin(a2));
          ctx.closePath();
          ctx.fill();
        }
      }
      ctx.restore();

      // ── Step 3: Multi-layer Glowing Solar Corona ──
      const pulse = 1.0 + 0.08 * Math.sin(t * 3.5);
      const coronaLayers = [
        { r: 280, alpha: 0.14, gAdd: 30 },
        { r: 190, alpha: 0.25, gAdd: 50 },
        { r: 120, alpha: 0.42, gAdd: 70 },
        { r: 75,  alpha: 0.68, gAdd: 90 },
        { r: 50,  alpha: 0.88, gAdd: 100 }
      ];

      for (let c = 0; c < coronaLayers.length; c++) {
        const item = coronaLayers[c];
        const curR = item.r * pulse;
        const cGrad = ctx.createRadialGradient(sunCx, sunCy, 0, sunCx, sunCy, curR);
        cGrad.addColorStop(0, `rgba(255, ${150 + item.gAdd}, 40, ${item.alpha})`);
        cGrad.addColorStop(1, "rgba(255, 120, 0, 0)");
        ctx.fillStyle = cGrad;
        ctx.beginPath();
        ctx.arc(sunCx, sunCy, curR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Brilliant White-Gold Core
      ctx.save();
      ctx.shadowColor = "rgba(255, 230, 100, 0.95)";
      ctx.shadowBlur = 35;
      ctx.fillStyle = "#FFFCEB";
      ctx.beginPath();
      ctx.arc(sunCx, sunCy, 40 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── Step 4: Full Lord Hanuman Standing in Center Foreground ──
      if (hanumanImg) {
        const hTargetH = Math.round(1280 * 0.76); // ~973px
        const hTargetW = Math.round(hanumanImg.width * (hTargetH / hanumanImg.height));
        const hX = Math.round((720 - hTargetW) / 2);
        const hY = 1280 - hTargetH - 55;
        ctx.drawImage(hanumanImg, hX, hY, hTargetW, hTargetH);
      }

      // ── Step 5: Active UI Overlay based on Exact Approved Timestamps ──
      // Scene 1: Gita Shloka & Meaning (0.0s - 7.0s)
      if (t < 3.8) {
        if (oS1a) ctx.drawImage(oS1a, 0, 0, 720, 1280);
      } else if (t < 7.0) {
        if (oS1b) ctx.drawImage(oS1b, 0, 0, 720, 1280);
      }
      // Scene 2: DIRECTLY Today's Workout Report Card! (7.0s - 18.0s)
      else if (t < 18.0) {
        if (oS2) ctx.drawImage(oS2, 0, 0, 720, 1280);
      }
      // Scene 3: ONLY अंतिम ३२ वा सेट पूर्ण व जय श्री कृष्ण विजयघोष! (18.0s - 23.5s)
      else if (t < 23.5) {
        if (oS3c) ctx.drawImage(oS3c, 0, 0, 720, 1280);
      }
      // Scene 4: Daily Rotating Pranayama with live breath movement (23.5s - 30.0s)
      else {
        if (oS4) ctx.drawImage(oS4, 0, 0, 720, 1280);
      }

      // ── Step 6: Extra Dynamic Animations for Scene 3 & Scene 4 ──
      if (t >= 18.0 && t < 23.5) {
        // Celebration sparkles around Set 32 badge
        const sparklePhase = (t - 18.0) * 7.0;
        const sparkleCoords = [[160, 520], [560, 520], [200, 680], [520, 680], [360, 480]];
        for (let idx = 0; idx < sparkleCoords.length; idx++) {
          const spX = sparkleCoords[idx][0];
          const spY = sparkleCoords[idx][1];
          const spR = Math.max(3, Math.round(8 + 6 * Math.sin(sparklePhase + idx)));
          ctx.save();
          ctx.beginPath();
          ctx.arc(spX, spY, spR, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 215, 0, 0.85)";
          ctx.shadowColor = "rgba(255, 215, 0, 0.9)";
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        }
      } else if (t >= 23.5) {
        // Breathing circle animation for Pranayama (Inhale, Hold, Exhale)
        const pT = t - 23.5;
        let brR = 35;
        let brCol = "rgba(56, 189, 248, 0.85)";

        if (pT < 2.5) {
          // Inhale expanding (35 -> 85)
          const prog = pT / 2.5;
          brR = Math.round(35 + prog * 50);
          brCol = "rgba(56, 189, 248, 0.85)";
        } else if (pT < 4.5) {
          // Hold steady (85)
          brR = 85;
          brCol = "rgba(251, 191, 36, 0.85)";
        } else {
          // Exhale contracting (85 -> 35)
          const prog = (pT - 4.5) / 2.0;
          brR = Math.round(85 - prog * 50);
          brCol = "rgba(52, 211, 153, 0.85)";
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(360, 705, brR, 0, Math.PI * 2);
        ctx.lineWidth = 4;
        ctx.strokeStyle = brCol;
        ctx.shadowColor = brCol;
        ctx.shadowBlur = 16;
        ctx.stroke();
        ctx.restore();
      }

      // Check Completion
      if (frame >= maxFrames) {
        clearInterval(animInterval);
        animInterval = null;
        if (recorder && recorder.state !== "inactive") {
          try { recorder.stop(); } catch(e){}
        }
      }
    }, 1000 / FPS);

  } catch (err) {
    console.error("[Reel Generator] Error in autoGenerateWorkoutReel:", err);
    resetGeneratorState();
  }
}

function cleanupOldWorkoutReels() {
  try {
    if (typeof data === "undefined" || !data.reels) return;
    const now = Date.now();
    const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
    const keys = Object.keys(data.reels);
    let changed = false;

    keys.forEach(k => {
      const item = data.reels[k];
      if (item && item.timestamp) {
        if ((now - item.timestamp > twoDaysMs) && !item.savedOrShared) {
          delete data.reels[k];
          changed = true;
        }
      }
    });

    if (changed && typeof saveAll === "function") saveAll();
  } catch(e){}
}

function confirmDownloadReelDirect() {
  if (!generatedReelBlob) {
    alert("Video is still rendering. Please wait a few seconds...");
    return;
  }
  markReelAsSavedOrShared();

  const d = new Date();
  const dateStr = d.toISOString().slice(0, 10);
  const isWebm = generatedReelBlob.type && generatedReelBlob.type.includes("webm");
  const ext = isWebm ? "webm" : "mp4";
  const fileName = `Suryasarthi_108_30s_Workout_Reel_${dateStr}.${ext}`;

  const url = URL.createObjectURL(generatedReelBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function handleOpenReelClick() {
  if (generatedReelBlob) {
    confirmDownloadReelDirect();
  } else {
    if (typeof setStatus === "function") setStatus("Generating 30s Workout Reel...");
    autoGenerateWorkoutReel({
      type: "goal_complete",
      todaySets: typeof todayDone === "function" ? todayDone() : 32,
      totalSets: (typeof data !== "undefined" && data) ? data.totalAllTime : 1024,
      name: (typeof cfg !== "undefined" && cfg.userName) ? cfg.userName : "Vaibhav"
    });
  }
}

function markReelAsSavedOrShared() {
  try {
    const tKey = typeof todayKey === "function" ? todayKey() : "today";
    if (typeof data !== "undefined") {
      if (!data.reels) data.reels = {};
      if (!data.reels[tKey]) data.reels[tKey] = { date: tKey, savedOrShared: true, timestamp: Date.now() };
      else data.reels[tKey].savedOrShared = true;
      if (typeof saveAll === "function") saveAll();
    }
  } catch(e){}
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  if (!text) return;
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

async function shareReelToSocialMedia() {
  if (!generatedReelBlob) return;
  markReelAsSavedOrShared();

  const shareBtn = document.getElementById("btn-share-reel");
  if (shareBtn) shareBtn.innerHTML = "📲 Preparing WhatsApp Share... 100% ✓";

  const isImg = generatedReelBlob.type.startsWith("image/");
  const ext = isImg ? "png" : (generatedReelBlob.type.includes("mp4") ? "mp4" : "webm");
  const d = new Date();
  const dateStr = d.toISOString().slice(0, 10);
  const fileName = `Suryasarthi_108_30s_Workout_Reel_${dateStr}.${ext}`;
  const file = new File([generatedReelBlob], fileName, { type: generatedReelBlob.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "My Surya Namaskara & Pranayama 30s Workout Reel",
        text: "Completed my Surya Namaskara & Pranayama session! ☀️🌬️🧘 #SuryaNamaskara #Pranayama #Yoga #Suryasarthi108"
      });
      if (typeof setStatus === "function") setStatus("✅ Shared to WhatsApp Status!");
    } catch (e) {
      if (e.name !== "AbortError") {
        confirmDownloadReelDirect();
      }
    }
  } else {
    // Fallback: download directly
    confirmDownloadReelDirect();
  }

  if (shareBtn) shareBtn.innerHTML = "📲 Share Reel to WhatsApp Status";
}

function showReelSocialModal(info) {
  if (!generatedReelBlob) return;

  const vid = document.getElementById("reel-video-preview");
  const img = document.getElementById("reel-image-preview");

  if (generatedReelBlob.type.startsWith("image/")) {
    if (vid) vid.style.display = "none";
    if (img) {
      img.src = URL.createObjectURL(generatedReelBlob);
      img.style.display = "block";
    }
  } else {
    if (img) img.style.display = "none";
    if (vid) {
      vid.src = URL.createObjectURL(generatedReelBlob);
      vid.style.display = "block";
      vid.play().catch(() => {});
    }
  }

  const sub = document.getElementById("reel-modal-subtitle");
  if (sub && info) {
    if (info.type === "streak_milestone") {
      sub.textContent = `🔥 Milestone: ${info.streakDays || 14} Days Continuous Streak Mastered!`;
    } else if (info.type === "lifetime_milestone") {
      sub.textContent = `🏆 Milestone: ${info.totalSets || 1024} Lifetime Rounds Mastered!`;
    } else {
      sub.textContent = `🎯 Today's Goal Completed: ${info.todaySets || 32} Rounds & Pranayama Mastered!`;
    }
  }

  const modal = document.getElementById("reel-social-modal");
  if (modal) {
    modal.style.display = "flex";
    modal.classList.add("show");
  }
}

function closeReelSocialModal() {
  const modal = document.getElementById("reel-social-modal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("show");
  }
  const vid = document.getElementById("reel-video-preview");
  if (vid) { try { vid.pause(); vid.src = ""; } catch(e){} }
  const img = document.getElementById("reel-image-preview");
  if (img) { img.style.display = "none"; img.src = ""; }
}

function showReelConfirmModal(info) {
  showReelSocialModal(info);
}

function closeReelConfirmModal() {
  const modal = document.getElementById("reel-confirm-modal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("show");
  }
}

function confirmOpenReelPreview() {
  closeReelConfirmModal();
  showReelSocialModal({
    type: "goal_complete",
    todaySets: typeof todayDone === "function" ? todayDone() : 32,
    totalSets: (typeof data !== "undefined" && data) ? data.totalAllTime : 1024,
    name: (typeof cfg !== "undefined" && cfg.userName) ? cfg.userName : "Vaibhav"
  });
}

window.autoGenerateWorkoutReel = autoGenerateWorkoutReel;
window.cleanupOldWorkoutReels = cleanupOldWorkoutReels;
window.confirmDownloadReelDirect = confirmDownloadReelDirect;
window.downloadReelVideo = confirmDownloadReelDirect;
window.handleOpenReelClick = handleOpenReelClick;
window.wrapCanvasText = wrapCanvasText;
window.shareReelToSocialMedia = shareReelToSocialMedia;
window.showReelSocialModal = showReelSocialModal;
window.closeReelSocialModal = closeReelSocialModal;
window.showReelConfirmModal = showReelConfirmModal;
window.closeReelConfirmModal = closeReelConfirmModal;
window.confirmOpenReelPreview = confirmOpenReelPreview;
