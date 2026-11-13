/* ═══════════════════════════════════════════════════════════════
   AUTOMATIC 20-SECOND WORKOUT REEL & MARKETING VIDEO GENERATOR
   Creates a 20-second 9:16 Vertical Video for WhatsApp Status & Social Reels.
   Directly saves .mp4 file to device Downloads folder without preview modal popups!
   Features:
     Scene 1: Bhagavad Gita Sacred Wisdom & Morning Motivation
     Scene 2: Surya Namaskara 12 Sacred Asanas & Calorie Performance
     Scene 3: Sacred Pranayama & Vedic Breathwork Energy Mastery
     Scene 4: Sadhana Victory, Daily Metrics & Suryasarthi 108 CTA
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

function drawPoseSilhouette(ctx, cx, cy, stepIndex, scale = 1.0) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#FFD700";
  ctx.fillStyle = "#FFD700";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const idx = stepIndex % 12;

  if (idx === 0 || idx === 11) {
    ctx.beginPath(); ctx.arc(0, -90, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -74); ctx.lineTo(0, 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(-15, 90); ctx.moveTo(0, 10); ctx.lineTo(15, 90); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-18, -40); ctx.lineTo(0, -55); ctx.lineTo(18, -40); ctx.stroke();
  } else if (idx === 1 || idx === 10) {
    ctx.beginPath(); ctx.arc(15, -95, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -74); ctx.quadraticCurveTo(10, -30, 0, 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(-15, 90); ctx.moveTo(0, 10); ctx.lineTo(15, 90); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(-30, -115); ctx.moveTo(0, -60); ctx.lineTo(-15, -115); ctx.stroke();
  } else if (idx === 2 || idx === 9) {
    ctx.beginPath(); ctx.arc(35, 30, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(25, -20); ctx.lineTo(35, 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(-5, 90); ctx.moveTo(0, 10); ctx.lineTo(5, 90); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(25, -20); ctx.lineTo(35, 75); ctx.stroke();
  } else if (idx === 3 || idx === 8) {
    ctx.beginPath(); ctx.arc(-20, -40, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-20, -24); ctx.lineTo(-40, 20); ctx.lineTo(-110, 60); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-40, 20); ctx.lineTo(20, 20); ctx.lineTo(20, 60); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-30, -10); ctx.lineTo(-10, 60); ctx.stroke();
  } else if (idx === 4) {
    ctx.beginPath(); ctx.arc(-90, 0, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-74, 0); ctx.lineTo(80, 25); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-60, 5); ctx.lineTo(-60, 50); ctx.stroke();
  } else if (idx === 5) {
    ctx.beginPath(); ctx.arc(-80, 10, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-64, 15); ctx.lineTo(-30, 30); ctx.lineTo(20, 10); ctx.lineTo(60, 50); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-50, 20); ctx.lineTo(-50, 50); ctx.stroke();
  } else if (idx === 6) {
    ctx.beginPath(); ctx.arc(-60, -50, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-60, -34); ctx.quadraticCurveTo(-40, 10, 80, 45); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-50, -10); ctx.lineTo(-40, 45); ctx.stroke();
  } else if (idx === 7) {
    ctx.beginPath(); ctx.arc(-40, 40, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-30, 25); ctx.lineTo(0, -60); ctx.lineTo(70, 45); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-30, 25); ctx.lineTo(-50, 60); ctx.stroke();
  }

  ctx.restore();
}

function drawPranayamaLotusBreath(ctx, cx, cy, radius, breathProg) {
  ctx.save();
  ctx.translate(cx, cy);

  // 1. Concentric pulsing prana aura rings
  for (let r = 1; r <= 3; r++) {
    const ringRadius = radius + r * 26 + Math.sin(breathProg * Math.PI * 2 + r) * 5;
    ctx.strokeStyle = `rgba(168, 85, 247, ${0.4 - r * 0.1})`;
    ctx.lineWidth = 2.5 - r * 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 2. Radiant Prana Energy Glow (Radial Gradient)
  const pGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, radius);
  pGrad.addColorStop(0, "rgba(251, 191, 36, 0.95)");  // Golden Core
  pGrad.addColorStop(0.35, "rgba(52, 211, 153, 0.7)"); // Emerald Prana
  pGrad.addColorStop(0.75, "rgba(139, 92, 246, 0.5)"); // Violet Aura
  pGrad.addColorStop(1, "rgba(59, 130, 246, 0.0)");
  ctx.fillStyle = pGrad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // 3. Eight Sacred Lotus Petals
  const petalCount = 8;
  const petalLength = radius * 0.76;
  const petalWidth = radius * 0.30;
  const rotAngle = breathProg * Math.PI * 0.25;

  ctx.save();
  ctx.rotate(rotAngle);
  for (let i = 0; i < petalCount; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / petalCount);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(petalWidth, petalLength * 0.5, 0, petalLength);
    ctx.quadraticCurveTo(-petalWidth, petalLength * 0.5, 0, 0);
    ctx.fillStyle = i % 2 === 0 ? "rgba(251, 191, 36, 0.45)" : "rgba(56, 189, 248, 0.4)";
    ctx.strokeStyle = "#FBBF24";
    ctx.lineWidth = 1.8;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  // 4. Center Glowing Golden "ॐ" (Om)
  ctx.fillStyle = "#FFD700";
  ctx.shadowColor = "rgba(251, 191, 36, 0.85)";
  ctx.shadowBlur = 14;
  ctx.font = "900 36px 'Noto Sans Devanagari', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ॐ", 0, 0);
  ctx.shadowBlur = 0;

  ctx.restore();
}

async function autoGenerateWorkoutReel(info) {
  if (isGeneratingReel) {
    console.log("[Reel Generator] Already generating reel, skipping concurrent run.");
    return;
  }
  isGeneratingReel = true;

  // Keep speech active so celebration appreciation can finish naturally
  const btn = document.getElementById("btn-open-reel");
  if (btn) {
    btn.innerHTML = `🎬 Generating Workout Reel <span style="font-size:11px;background:#25D366;color:#111B21;padding:2px 7px;border-radius:10px;font-weight:900">0%</span>`;
  }

  let animInterval = null;
  let hardTimeout = null;
  let audioCtx = null;
  let osc = null;

  const resetGeneratorState = () => {
    isGeneratingReel = false;
    if (animInterval) { clearInterval(animInterval); animInterval = null; }
    if (hardTimeout) { clearTimeout(hardTimeout); hardTimeout = null; }
    if (osc) { try { osc.stop(); } catch(e){} osc = null; }
    if (audioCtx) { try { audioCtx.close(); } catch(e){} audioCtx = null; }
    const b = document.getElementById("btn-open-reel");
    if (b) {
      b.innerHTML = `🎬 Download / Share Workout Reel <span style="font-size:11px;background:#25D366;color:#111B21;padding:2px 7px;border-radius:10px;font-weight:900">HD Reel</span>`;
    }
  };

  hardTimeout = setTimeout(() => {
    console.warn("[Reel Generator] Hard safety timeout reached. Resetting...");
    resetGeneratorState();
  }, 65000);

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1280; // 9:16 Vertical HD Format
    const ctx = canvas.getContext("2d");

    const name = info?.name || (typeof cfg !== "undefined" ? cfg.userName : "Vaibhav") || "Vaibhav";
    const todaySets = info?.todaySets || (typeof todayDone === "function" ? todayDone() : 1);
    const totalSets = info?.totalSets || (typeof data !== "undefined" && data ? data.totalAllTime : 100);
    const streak = typeof computeStreak === "function" ? computeStreak() : 1;

    // Retrieve today's Pranayama practice metrics
    let todayPranaMs = 0;
    try {
      const tKey = typeof todayKey === "function" ? todayKey() : new Date().toISOString().slice(0, 10);
      if (typeof data !== "undefined" && data && data.history && data.history[tKey]) {
        todayPranaMs = data.history[tKey].pranaMs || 0;
      }
      if (typeof pranaState !== "undefined" && pranaState && pranaState.active && typeof pranaElapsedTotalMs === "function") {
        todayPranaMs += pranaElapsedTotalMs();
      }
    } catch(e){}

    const pranaMin = Math.round(todayPranaMs / 60000);
    const pranaSec = Math.round((todayPranaMs % 60000) / 1000);
    let pranaDisplay = "8 Classical Practices";
    if (pranaMin > 0) {
      pranaDisplay = `${pranaMin}m ${pranaSec > 0 ? pranaSec + 's' : ''} Done`;
    } else if (todayPranaMs > 0) {
      pranaDisplay = `${pranaSec}s Done`;
    } else {
      pranaDisplay = typeof cfg !== "undefined" && cfg.pranayamaMinutes ? `${cfg.pranayamaMinutes}m Daily Guide` : "35m Daily Guide";
    }

    let stream = null;
    try {
      stream = canvas.captureStream ? canvas.captureStream(30) : null;
    } catch(e){ stream = null; }

    // Synthesize Om Solfeggio Audio track directly into video stream
    try {
      if (stream && (window.AudioContext || window.webkitAudioContext)) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const dest = audioCtx.createMediaStreamDestination();
        osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(432, audioCtx.currentTime); // 432Hz Om Chant Frequency
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(dest);
        osc.start();

        const audioTrack = dest.stream.getAudioTracks()[0];
        if (audioTrack) {
          stream.addTrack(audioTrack);
        }
      }
    } catch(e){}

    const mimeTypes = ['video/mp4;codecs=avc1,mp4a.40.2', 'video/mp4;codecs=h264', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm'];
    let selectedMime = mimeTypes.find(m => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) || '';

    let recorder = null;
    if (stream && typeof MediaRecorder !== "undefined") {
      try {
        recorder = new MediaRecorder(stream, selectedMime ? { mimeType: selectedMime } : {});
      } catch(e){ recorder = null; }
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
          setStatus("✅ 20s Workout Marketing Reel Saved to Downloads!");
        }
      };

      try { recorder.start(1000); } catch(e){}
    }

    // Render 20-second 9:16 Vertical HD Reel (600 frames @ 30 FPS)
    // Scene 1: Frames 1 - 135 (4.5s)  — Bhagavad Gita Sacred Opening
    // Scene 2: Frames 136 - 290 (5.17s) — Surya Namaskara 12 Asanas & Calorie Performance
    // Scene 3: Frames 291 - 445 (5.17s) — Sacred Pranayama & Breathwork Energy Mastery
    // Scene 4: Frames 446 - 600 (5.17s) — Sadhana Victory, Milestones & Suryasarthi 108 CTA
    let frame = 0;
    const maxFrames = 600; // 20 seconds total @ 30 FPS
    const d = new Date();
    const dateStr = d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });

    const gQuote = typeof getDailyGitaQuote === "function" ? getDailyGitaQuote() : { ref: "श्रीमद्भगवद्गीता २.४७", sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥", hi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं।" };
    const gMeaning = typeof getQuoteMeaning === "function" ? getQuoteMeaning(gQuote) : (gQuote.hi || gQuote.en || "");
    const rawSanskrit = gQuote.sanskrit || gQuote.shloka || "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥";

    animInterval = setInterval(() => {
      frame++;

      if (frame % 5 === 0 || frame === maxFrames) {
        const pct = Math.min(100, Math.floor((frame / maxFrames) * 100));
        const b = document.getElementById("btn-open-reel");
        if (b) {
          b.innerHTML = `🎬 Generating Reel <span style="font-size:11px;background:#25D366;color:#111B21;padding:2px 7px;border-radius:10px;font-weight:900">${pct}%</span>`;
        }
      }

      // ═════════════════════════════════════════════════════════════
      // SCENE 1 (Frames 1 to 135 = 0.0s to 4.5s): BHAGAVAD GITA OPENING
      // ═════════════════════════════════════════════════════════════
      if (frame <= 135) {
        let opacity = 1;
        if (frame > 115) opacity = (135 - frame) / 20;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

        const gGrad = ctx.createRadialGradient(360, 400, 40, 360, 640, 750);
        gGrad.addColorStop(0, '#132A1C');
        gGrad.addColorStop(0.6, '#0B1710');
        gGrad.addColorStop(1, '#050B08');
        ctx.fillStyle = gGrad;
        ctx.fillRect(0, 0, 720, 1280);

        ctx.save();
        ctx.translate(360, 450);
        ctx.rotate((frame * 0.012) % (Math.PI * 2));
        ctx.strokeStyle = "rgba(245, 158, 11, 0.15)";
        ctx.lineWidth = 2.5;
        for (let i = 0; i < 12; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(i * Math.PI / 6) * 380, Math.sin(i * Math.PI / 6) * 380);
          ctx.stroke();
        }
        ctx.restore();

        ctx.fillStyle = "#F59E0B";
        ctx.font = "800 22px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("☀️ MORNING MOTIVATION · BHAGAVAD GITA 📜", 360, 100);

        ctx.fillStyle = "#FBBF24";
        ctx.font = "900 28px Outfit, sans-serif";
        ctx.shadowColor = "rgba(251, 191, 36, 0.5)";
        ctx.shadowBlur = 12;
        ctx.fillText(gQuote.ref || "श्रीमद्भगवद्गीता", 360, 150);
        ctx.shadowBlur = 0;

        const sBoxY = 195;
        ctx.fillStyle = "rgba(29, 184, 127, 0.16)";
        ctx.strokeStyle = "rgba(93, 224, 168, 0.45)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(50, sBoxY, 620, 370, 24);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#FFD700";
        ctx.font = "900 28px 'Noto Sans Devanagari', 'Mukta', sans-serif";
        const shlokaLines = rawSanskrit.split("\n");
        let lineY = sBoxY + (shlokaLines.length > 2 ? 65 : 90);
        shlokaLines.forEach(line => {
          ctx.fillText(line.trim(), 360, lineY);
          lineY += 50;
        });

        const mBoxY = 605;
        ctx.fillStyle = "rgba(30, 41, 59, 0.88)";
        ctx.strokeStyle = "rgba(96, 165, 250, 0.35)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(50, mBoxY, 620, 360, 20);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#93C5FD";
        ctx.font = "800 20px Outfit, sans-serif";
        ctx.fillText("MEANING / अर्थ / भावार्थ", 360, mBoxY + 45);

        ctx.fillStyle = "#F9FAFB";
        ctx.font = "600 23px 'Noto Sans Devanagari', Outfit, sans-serif";
        wrapCanvasText(ctx, gMeaning, 360, mBoxY + 105, 550, 38);

        ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
        ctx.font = "700 20px Outfit, sans-serif";
        ctx.fillText("☀️ Suryasarthi 108 · Daily Yoga & Wisdom 🧘", 360, 1050);

        ctx.restore();
        return;
      }

      // ═════════════════════════════════════════════════════════════
      // SCENE 2 (Frames 136 to 290 = 4.5s to 9.67s): 12 KEY ASANAS SHOWCASE
      // ═════════════════════════════════════════════════════════════
      if (frame <= 290) {
        const scene2Frame = frame - 135;
        let opacity = 1;
        if (scene2Frame <= 15) opacity = scene2Frame / 15;
        else if (frame > 275) opacity = (290 - frame) / 15;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

        const grad = ctx.createRadialGradient(360, 400, 50, 360, 640, 800);
        grad.addColorStop(0, '#1E293B');
        grad.addColorStop(0.5, '#0F172A');
        grad.addColorStop(1, '#070B14');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 720, 1280);

        ctx.fillStyle = "#FBBF24";
        ctx.font = "900 28px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🧘 SURYA NAMASKARA · 12 SACRED ASANAS ☀️", 360, 80);

        ctx.fillStyle = "#93C5FD";
        ctx.font = "700 19px Outfit, sans-serif";
        ctx.fillText("Automated Surya Namaskara Postures & Mantras", 360, 115);

        const stepIdx = Math.min(11, Math.floor((scene2Frame / 155) * 12));
        const stepObj = REEL_STEPS[stepIdx] || REEL_STEPS[0];

        ctx.fillStyle = "rgba(245, 158, 11, 0.2)";
        ctx.strokeStyle = "#F59E0B";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(240, 140, 240, 40, 20);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#FBBF24";
        ctx.font = "900 20px Outfit, sans-serif";
        ctx.fillText(`POSTURE ${stepIdx + 1} OF 12`, 360, 167);

        const pBoxY = 200;
        ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
        ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(50, pBoxY, 620, 660, 24);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#FFD700";
        ctx.font = "900 34px Outfit, sans-serif";
        ctx.fillText(stepObj.pose, 360, pBoxY + 55);

        ctx.fillStyle = "#93C5FD";
        ctx.font = "700 22px Outfit, sans-serif";
        ctx.fillText(`${stepObj.sub} · 💨 ${stepObj.breath}`, 360, pBoxY + 95);

        ctx.fillStyle = "#F59E0B";
        ctx.font = "900 28px 'Noto Sans Devanagari', serif";
        ctx.fillText(stepObj.mantraD || "", 360, pBoxY + 140);

        drawPoseSilhouette(ctx, 360, pBoxY + 390, stepIdx, 1.4);

        const trackY = pBoxY + 610;
        const segW = 42;
        const startX = 360 - (12 * segW + 11 * 6) / 2;
        for (let i = 0; i < 12; i++) {
          const sx = startX + i * (segW + 6);
          ctx.fillStyle = i <= stepIdx ? "#F59E0B" : "rgba(255, 255, 255, 0.15)";
          ctx.beginPath();
          ctx.roundRect(sx, trackY, segW, 14, 7);
          ctx.fill();
        }

        ctx.fillStyle = "rgba(30, 41, 59, 0.85)";
        ctx.strokeStyle = "#38BDF8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(70, 895, 580, 95, 18);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#38BDF8";
        ctx.font = "800 20px Outfit, sans-serif";
        ctx.fillText("📲 BODY VITALITY & ASANA PRACTICE", 360, 930);

        ctx.fillStyle = "#F9FAFB";
        ctx.font = "700 18px Outfit, sans-serif";
        ctx.fillText("✓ 12 Sacred Asanas  ✓ Vedic Mantras  ✓ Active Calorie Burn", 360, 964);

        ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
        ctx.font = "700 19px Outfit, sans-serif";
        ctx.fillText("☀️ Suryasarthi 108 · Daily Health & Fitness 🧘", 360, 1050);

        ctx.restore();
        return;
      }

      // ═════════════════════════════════════════════════════════════
      // SCENE 3 (Frames 291 to 445 = 9.67s to 14.83s): SACRED PRANAYAMA & BREATHWORK
      // ═════════════════════════════════════════════════════════════
      if (frame <= 445) {
        const scene3Frame = frame - 290;
        let opacity = 1;
        if (scene3Frame <= 15) opacity = scene3Frame / 15;
        else if (frame > 430) opacity = (445 - frame) / 15;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

        // Deep royal prana-indigo / violet radial gradient
        const pranaGrad = ctx.createRadialGradient(360, 360, 40, 360, 640, 820);
        pranaGrad.addColorStop(0, '#1E1038');
        pranaGrad.addColorStop(0.5, '#0F172A');
        pranaGrad.addColorStop(1, '#070B14');
        ctx.fillStyle = pranaGrad;
        ctx.fillRect(0, 0, 720, 1280);

        // Header Title
        ctx.fillStyle = "#38BDF8";
        ctx.font = "900 26px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(56, 189, 248, 0.6)";
        ctx.shadowBlur = 12;
        ctx.fillText("🌬️ SACRED PRANAYAMA & BREATH MASTERY 🧘", 360, 75);
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#93C5FD";
        ctx.font = "700 18px Outfit, sans-serif";
        ctx.fillText("Vedic Breathwork · Vitality, Ojas & Mind Balance", 360, 110);

        // Practice status pill
        ctx.fillStyle = "rgba(168, 85, 247, 0.22)";
        ctx.strokeStyle = "#A855F7";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(160, 130, 400, 38, 19);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#E9D5FF";
        ctx.font = "800 18px Outfit, sans-serif";
        ctx.fillText(`✨ ${pranaDisplay} · 8 Classical Practices`, 360, 155);

        // Animated Breathing Lotus & Prana Sphere (4-second cycle = 120 frames)
        const breathCycleProg = (scene3Frame % 120) / 120;
        let breathRadius = 55;
        let breathStageText = "पूरक · INHALE (4s)";
        let breathStageColor = "#34D399";
        let breathStageBg = "rgba(16, 185, 129, 0.22)";
        let breathStageBorder = "#10B981";

        if (breathCycleProg <= 0.4) {
          // Inhale (0 to 0.4): Expanding radius
          const p = breathCycleProg / 0.4;
          breathRadius = 55 + p * 24;
          breathStageText = "💨 पूरक · DEEP INHALE (4s)";
          breathStageColor = "#6EE7B7";
          breathStageBg = "rgba(16, 185, 129, 0.25)";
          breathStageBorder = "#10B981";
        } else if (breathCycleProg <= 0.6) {
          // Hold / Kumbhaka (0.4 to 0.6): Peak radius & golden hold
          breathRadius = 79;
          breathStageText = "⏸️ कुम्भक · HOLD & ENERGIZE (4s)";
          breathStageColor = "#FBBF24";
          breathStageBg = "rgba(245, 158, 11, 0.25)";
          breathStageBorder = "#F59E0B";
        } else {
          // Exhale (0.6 to 1.0): Gentle contraction
          const p = (breathCycleProg - 0.6) / 0.4;
          breathRadius = 79 - p * 24;
          breathStageText = "🍃 रेचक · SLOW EXHALE (8s)";
          breathStageColor = "#C084FC";
          breathStageBg = "rgba(168, 85, 247, 0.25)";
          breathStageBorder = "#A855F7";
        }

        drawPranayamaLotusBreath(ctx, 360, 275, breathRadius, breathCycleProg);

        // Breath stage indicator pill below sphere
        ctx.fillStyle = breathStageBg;
        ctx.strokeStyle = breathStageBorder;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(170, 370, 380, 36, 18);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = breathStageColor;
        ctx.font = "800 17px Outfit, sans-serif";
        ctx.fillText(breathStageText, 360, 394);

        // 4 Featured Classical Pranayama practices carousel (changes every ~38 frames)
        const pranaIdx = Math.min(REEL_PRANAYAMA_PRACTICES.length - 1, Math.floor((scene3Frame / 155) * REEL_PRANAYAMA_PRACTICES.length));
        const curPrana = REEL_PRANAYAMA_PRACTICES[pranaIdx];

        // Pranayama Technique Card
        const prCardY = 425;
        ctx.fillStyle = "rgba(18, 15, 36, 0.94)";
        ctx.strokeStyle = "rgba(168, 85, 247, 0.5)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(50, prCardY, 620, 395, 24);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#FBBF24";
        ctx.font = "800 18px Outfit, sans-serif";
        ctx.fillText(`CLASSICAL PRACTICE ${pranaIdx + 1} OF 8 · VEDIC PRANAYAMA`, 360, prCardY + 40);

        ctx.fillStyle = "#FFD700";
        ctx.font = "900 32px 'Noto Sans Devanagari', sans-serif";
        ctx.fillText(curPrana.nameHi, 360, prCardY + 85);

        ctx.fillStyle = "#93C5FD";
        ctx.font = "700 20px Outfit, sans-serif";
        ctx.fillText(`${curPrana.name} · ${curPrana.sub}`, 360, prCardY + 120);

        // Technique box
        ctx.fillStyle = "rgba(16, 185, 129, 0.16)";
        ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(75, prCardY + 145, 570, 48, 14);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#6EE7B7";
        ctx.font = "800 18px Outfit, sans-serif";
        ctx.fillText(`💨 ${curPrana.kriya}`, 360, prCardY + 175);

        // Benefit box
        ctx.fillStyle = "rgba(245, 158, 11, 0.14)";
        ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(75, prCardY + 205, 570, 92, 14);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#FDE68A";
        ctx.font = "800 19px Outfit, sans-serif";
        ctx.fillText(`✨ ${curPrana.benefit}`, 360, prCardY + 242);

        ctx.fillStyle = "#DDD6FE";
        ctx.font = "700 17px Outfit, sans-serif";
        ctx.fillText(`🌿 ${curPrana.dosha}`, 360, prCardY + 276);

        // 8-practice progress tracker dots
        const pDotsY = prCardY + 345;
        const pSegW = 60;
        const pStartX = 360 - (8 * pSegW + 7 * 6) / 2;
        for (let i = 0; i < 8; i++) {
          const sx = pStartX + i * (pSegW + 6);
          const isActive = (i === pranaIdx);
          ctx.fillStyle = isActive ? "#FBBF24" : "rgba(168, 85, 247, 0.3)";
          ctx.beginPath();
          ctx.roundRect(sx, pDotsY, pSegW, 14, 7);
          ctx.fill();
        }

        ctx.fillStyle = "#94A3B8";
        ctx.font = "600 14px Outfit, sans-serif";
        ctx.fillText("Dirgha · Kapalabhati · Bhastrika · Anulom Vilom · Nadi Shodhana · Ujjayi · Bhramari · Dhyana", 360, prCardY + 380);

        // Prana Vitality Badges Grid (3 columns)
        const bGridY = 845;
        const bColW = 190;
        const bGap = 15;

        // Box 1: Lung Power
        ctx.fillStyle = "rgba(6, 182, 212, 0.18)"; ctx.strokeStyle = "#06B6D4"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(65, bGridY, bColW, 95, 16); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#38BDF8"; ctx.font = "800 15px Outfit, sans-serif"; ctx.fillText("🫁 LUNG CAPACITY", 65 + bColW/2, bGridY + 30);
        ctx.fillStyle = "#F0FDF4"; ctx.font = "900 20px Outfit, sans-serif"; ctx.fillText("+30% O₂ Uptake", 65 + bColW/2, bGridY + 62);
        ctx.fillStyle = "#7DD3FC"; ctx.font = "600 13px Outfit, sans-serif"; ctx.fillText("Vitality & Stamina", 65 + bColW/2, bGridY + 84);

        // Box 2: Alpha Brain Calm
        ctx.fillStyle = "rgba(16, 185, 129, 0.18)"; ctx.strokeStyle = "#10B981";
        ctx.beginPath(); ctx.roundRect(65 + bColW + bGap, bGridY, bColW, 95, 16); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#34D399"; ctx.font = "800 15px Outfit, sans-serif"; ctx.fillText("🧠 MIND CLARITY", 65 + bColW + bGap + bColW/2, bGridY + 30);
        ctx.fillStyle = "#F0FDF4"; ctx.font = "900 20px Outfit, sans-serif"; ctx.fillText("Alpha Waves", 65 + bColW + bGap + bColW/2, bGridY + 62);
        ctx.fillStyle = "#A7F3D0"; ctx.font = "600 13px Outfit, sans-serif"; ctx.fillText("Stress & Cortisol Relief", 65 + bColW + bGap + bColW/2, bGridY + 84);

        // Box 3: Prana Ojas
        ctx.fillStyle = "rgba(168, 85, 247, 0.18)"; ctx.strokeStyle = "#A855F7";
        ctx.beginPath(); ctx.roundRect(65 + (bColW + bGap)*2, bGridY, bColW, 95, 16); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#C084FC"; ctx.font = "800 15px Outfit, sans-serif"; ctx.fillText("⚡ PRANA & OJAS", 65 + (bColW + bGap)*2 + bColW/2, bGridY + 30);
        ctx.fillStyle = "#F0FDF4"; ctx.font = "900 20px Outfit, sans-serif"; ctx.fillText("72,000 Nadis", 65 + (bColW + bGap)*2 + bColW/2, bGridY + 62);
        ctx.fillStyle = "#DDD6FE"; ctx.font = "600 13px Outfit, sans-serif"; ctx.fillText("Immunity Boosted", 65 + (bColW + bGap)*2 + bColW/2, bGridY + 84);

        ctx.fillStyle = "rgba(245, 158, 11, 0.88)";
        ctx.font = "700 19px Outfit, sans-serif";
        ctx.fillText("☀️ Suryasarthi 108 · Complete Surya & Pranayama Sadhana 🧘", 360, 1050);

        ctx.restore();
        return;
      }

      // ═════════════════════════════════════════════════════════════
      // SCENE 4 (Frames 446 to 600 = 14.83s to 20.0s): SADHANA VICTORY & BRAND CTA
      // ═════════════════════════════════════════════════════════════
      const scene4Frame = frame - 445;
      let opacity = 1;
      if (scene4Frame <= 15) opacity = scene4Frame / 15;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

      const grad = ctx.createRadialGradient(360, 400, 50, 360, 640, 800);
      grad.addColorStop(0, '#1E293B');
      grad.addColorStop(0.5, '#0F172A');
      grad.addColorStop(1, '#070B14');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 720, 1280);

      ctx.save();
      ctx.translate(360, 450);
      ctx.rotate((scene4Frame * 0.015) % (Math.PI * 2));
      ctx.strokeStyle = "rgba(245, 158, 11, 0.12)";
      ctx.lineWidth = 3;
      for (let i = 0; i < 16; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(i * Math.PI / 8) * 350, Math.sin(i * Math.PI / 8) * 350);
        ctx.stroke();
      }
      ctx.restore();

      ctx.fillStyle = "#FBBF24";
      ctx.font = "900 34px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(245, 158, 11, 0.6)";
      ctx.shadowBlur = 15;
      ctx.fillText("☀️ SURYASARTHI 108 🧘", 360, 75);
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#93C5FD";
      ctx.font = "700 20px Outfit, sans-serif";
      ctx.fillText(`Daily Sadhana Reel · ${dateStr}`, 360, 112);

      ctx.fillStyle = "rgba(30, 41, 59, 0.8)";
      ctx.strokeStyle = "#38BDF8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(160, 135, 400, 46, 23);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = "#F9FAFB";
      ctx.font = "800 23px Outfit, sans-serif";
      ctx.fillText(`Namaste, ${name}! 🙏`, 360, 167);

      // Goal Complete Achievement Banner
      const cardY = 195;
      ctx.fillStyle = "rgba(16, 185, 129, 0.22)";
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(60, cardY, 600, 130, 20);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = "#34D399";
      ctx.font = "900 26px Outfit, sans-serif";
      ctx.fillText(`🎯 SURYA & PRANAYAMA SADHANA ACHIEVED!`, 360, cardY + 45);

      ctx.fillStyle = "#6EE7B7";
      ctx.font = "900 32px Outfit, sans-serif";
      ctx.fillText(`${todaySets} Sets Surya · ${pranaDisplay} ☀️🌬️`, 360, cardY + 95);

      // 4 Metrics Grid (2x2)
      const gridY = 345;
      const colW2 = 285;
      const rowH2 = 90;
      const gap2 = 18;

      // Box 1: Surya Namaskara
      ctx.fillStyle = "rgba(6, 182, 212, 0.18)"; ctx.strokeStyle = "#06B6D4"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(60, gridY, colW2, rowH2, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#7DD3FC"; ctx.font = "800 14px Outfit, sans-serif"; ctx.fillText("TODAY'S SURYA", 60 + colW2/2, gridY + 28);
      ctx.fillStyle = "#22D3EE"; ctx.font = "900 28px Outfit, sans-serif"; ctx.fillText(`${todaySets} Sets (${todaySets * 12} Poses)`, 60 + colW2/2, gridY + 68);

      // Box 2: Pranayama Breathwork
      ctx.fillStyle = "rgba(168, 85, 247, 0.18)"; ctx.strokeStyle = "#A855F7";
      ctx.beginPath(); ctx.roundRect(60 + colW2 + gap2, gridY, colW2, rowH2, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#DDD6FE"; ctx.font = "800 14px Outfit, sans-serif"; ctx.fillText("PRANAYAMA BREATHWORK", 60 + colW2 + gap2 + colW2/2, gridY + 28);
      ctx.fillStyle = "#C084FC"; ctx.font = "900 28px Outfit, sans-serif"; ctx.fillText(`${pranaDisplay}`, 60 + colW2 + gap2 + colW2/2, gridY + 68);

      // Box 3: Practice Streak
      ctx.fillStyle = "rgba(16, 185, 129, 0.18)"; ctx.strokeStyle = "#10B981";
      ctx.beginPath(); ctx.roundRect(60, gridY + rowH2 + 14, colW2, rowH2, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#6EE7B7"; ctx.font = "800 14px Outfit, sans-serif"; ctx.fillText("PRACTICE STREAK", 60 + colW2/2, gridY + rowH2 + 14 + 28);
      ctx.fillStyle = "#34D399"; ctx.font = "900 30px Outfit, sans-serif"; ctx.fillText(`${streak} Days 🔥`, 60 + colW2/2, gridY + rowH2 + 14 + 68);

      // Box 4: Lifetime All-Time
      ctx.fillStyle = "rgba(245, 158, 11, 0.18)"; ctx.strokeStyle = "#F59E0B";
      ctx.beginPath(); ctx.roundRect(60 + colW2 + gap2, gridY + rowH2 + 14, colW2, rowH2, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#FDE68A"; ctx.font = "800 14px Outfit, sans-serif"; ctx.fillText("LIFETIME TOTAL", 60 + colW2 + gap2 + colW2/2, gridY + rowH2 + 14 + 28);
      ctx.fillStyle = "#FBBF24"; ctx.font = "900 30px Outfit, sans-serif"; ctx.fillText(`${totalSets} Rounds 🏆`, 60 + colW2 + gap2 + colW2/2, gridY + rowH2 + 14 + 68);

      // Marketing Feature Card
      const ctaY = 560;
      ctx.fillStyle = "rgba(245, 158, 11, 0.22)";
      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(60, ctaY, 600, 340, 24);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = "#FBBF24";
      ctx.font = "900 26px Outfit, sans-serif";
      ctx.fillText("📲 COMPLETE YOGIC LIFESTYLE APP", 360, ctaY + 48);

      ctx.fillStyle = "#F9FAFB";
      ctx.font = "700 21px Outfit, sans-serif";
      ctx.fillText("✓ 12 Sacred Surya Namaskara Postures & Mantras", 360, ctaY + 102);
      ctx.fillText("✓ 8 Classical Vedic Pranayama Breathwork Guides", 360, ctaY + 150);
      ctx.fillText("✓ Bhagavad Gita Shlokas & Voice Audio Guidance", 360, ctaY + 198);
      ctx.fillText("✓ Ayurvedic Nutrition, Water & Dosha Balance", 360, ctaY + 246);

      ctx.fillStyle = "#25D366";
      ctx.font = "900 23px Outfit, sans-serif";
      ctx.fillText("100% Free Offline PWA App · No Install Needed", 360, ctaY + 305);

      ctx.fillStyle = "#93C5FD";
      ctx.font = "800 21px Outfit, sans-serif";
      ctx.fillText("Perfect 20s Video for WhatsApp Status & Reels! 💬", 360, 935);

      ctx.fillStyle = "rgba(245, 158, 11, 0.9)";
      ctx.font = "700 20px Outfit, sans-serif";
      ctx.fillText("☀️ Suryasarthi 108 · Daily Health, Yoga & Vitality 🧘", 360, 1050);

      ctx.restore();

      if (frame >= maxFrames) {
        clearInterval(animInterval);
        animInterval = null;
        if (recorder && recorder.state !== "inactive") {
          try { recorder.stop(); } catch(e){}
        }
      }
    }, 1000 / 30);

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
  const fileName = `Suryasarthi_108_20s_Workout_Reel_${dateStr}.mp4`;

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
    if (typeof setStatus === "function") setStatus("Generating 20s Workout Reel...");
    autoGenerateWorkoutReel({
      type: "goal_complete",
      todaySets: typeof todayDone === "function" ? todayDone() : 1,
      totalSets: (typeof data !== "undefined" && data) ? data.totalAllTime : 100,
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
  const fileName = `SuryaNamaskara_Workout_Reel_${Date.now()}.${ext}`;
  const file = new File([generatedReelBlob], fileName, { type: generatedReelBlob.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "My Surya Namaskara & Pranayama Workout Reel",
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
      sub.textContent = `🔥 Milestone: ${info.streakDays || 7} Days Continuous Streak Mastered!`;
    } else if (info.type === "lifetime_milestone") {
      sub.textContent = `🏆 Milestone: ${info.totalSets || 1000} Lifetime Rounds Mastered!`;
    } else {
      sub.textContent = `🎯 Today's Goal Completed: ${info.todaySets || 1} Rounds & Pranayama Mastered!`;
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
    todaySets: typeof todayDone === "function" ? todayDone() : 1,
    totalSets: (typeof data !== "undefined" && data) ? data.totalAllTime : 100,
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
