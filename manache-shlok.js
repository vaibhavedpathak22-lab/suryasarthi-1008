/**
 * MANACHE SHLOK (श्री मनाचे श्लोक) - समर्थ रामदास स्वामी
 * Sacred Devotional Recitation Engine for Surya Namaskara Breaks
 * Featuring Real Singing Voice Recordings:
 *   - पद्मश्री सुरेश वाडकर (Suresh Wadkar)
 *   - भारतरत्न गानकोकिळा लता मंगेशकर (Lata Mangeshkar)
 * Features:
 *   - Real audio extracted from master recordings with line-by-line vocal synchronization
 *   - Multi-path candidate audio loader (supports flat ./audio/ and nested ./audio/manache/)
 *   - Mobile/PWA autoplay permission unlocker (never falls back to robotic system TTS!)
 *   - Authentic 4-line Devanagari metric verses matching sung words verbatim
 *   - Complete Marathi Bhavarth (मराठी भावार्थ) and English translations
 *   - Visual synchronized line-glow (.active-line) following the singer's vocal cadence
 *   - Interactive singer toggle pills on break overlay (Lata Mangeshkar <-> Suresh Wadkar)
 *   - Smooth auto-continuation: automatically resumes/starts next Surya Namaskara sets upon completion
 *   - Offline PWA Service Worker caching
 */

(function (window) {
  'use strict';

  // ── 1. Authentic Sacred Verses of Shri Manache Shlok (1 to 12) ──
  const MANACHE_SHLOKAS = [
    {
      num: 1,
      theme: "गणेश व शारदा वंदन (Invocation of Ganesha & Saraswati)",
      lines: [
        "गणाधीश जो ईश सर्वां गुणांचा ।",
        "मुळारंभ आरंभ तो निर्गुणाचा ।",
        "नमूं शारदा मूळ चत्वार वाचा ।",
        "गमूं पंथ आनंत या राघवाचा ॥ १ ॥"
      ],
      meaningMr: "सर्व सद्गुणांचे अधिपती श्री गणेश, जे निर्गुण परब्रह्माचे मूळ स्वरूप आहेत, व चारही वाणींची जननी श्री शारदा मातेला नमन करून, अनंत अशा प्रभू श्रीरामांच्या भक्तिमार्गावर चालूया.",
      meaningEn: "Saluting Lord Ganesha, the lord of all virtues and source of the universe, and Goddess Sharada, source of speech, let us walk the infinite devotion path of Shri Rama."
    },
    {
      num: 2,
      theme: "सत्कर्म व भक्तिमार्ग (Path of Noble Conduct & Devotion)",
      lines: [
        "मना सज्जना भक्तिपंथेचि जावे ।",
        "तरी श्रीहरी पाविजेतो स्वभावे ।",
        "जनीं निंद्य ते सर्व सोडूनि द्यावे ।",
        "जनीं वंद्य ते सर्वभावे करावे ॥ २ ॥"
      ],
      meaningMr: "हे सज्जन मना! तू भक्तीच्या पवित्र मार्गानेच जावे, त्यामुळे ईश्वर तुला सहज प्राप्त होईल. लोकात जे निंद्य व अनिष्ट आहे त्याचा त्याग कर, आणि जे वंदनीय व कल्याणकारी आहे ते मनापासून कर.",
      meaningEn: "O noble mind! Walk the devoted path of righteousness; thus the Supreme Lord is naturally attained. Forsake all harmful deeds and embrace noble virtuous actions."
    },
    {
      num: 3,
      theme: "प्रभात स्मरण व श्रेष्ठ सदाचार (Morning Mindfulness & Pure Conduct)",
      lines: [
        "प्रभाते मनीं राम चिंतीत जावा ।",
        "पुढे वैखरी राम आधी वदावा ।",
        "सदाचार हा थोर सांडूं नये तो ।",
        "जनीं तोचि तो मानवी धन्य होतो ॥ ३ ॥"
      ],
      meaningMr: "पहाटे उठून मनात प्रभू रामाचे नामस्मरण करावे, त्यानंतर मुखातून श्रीराम नाम आधी उच्चारावे. श्रेष्ठ सदाचार कधीही सोडू नये; असा आचरण करणारा मनुष्य या जगात धन्य होतो.",
      meaningEn: "At dawn, meditate upon Shri Rama in your heart, utter His divine name, and never abandon righteous conduct; one who lives thus is truly blessed."
    },
    {
      num: 4,
      theme: "सद्विचार व पापबुद्धी त्याग (Pure Thoughts & Renouncing Sin)",
      lines: [
        "मना वासना दुष्ट कामा नये रे ।",
        "मना सर्वथा पापबुद्धी नको रे ।",
        "मना सर्वथा नीति सोडूं नको रे ।",
        "मना अंतरीं सार विचार राहो ॥ ४ ॥"
      ],
      meaningMr: "हे मना! दुष्ट व अनिष्ट वासना उपयोगी पडत नाहीत. कधीही पापबुद्धी बाळगू नको. नीति आणि धर्माचा मार्ग सोडू नको, आणि मनात सदैव सत्याचा सार विचार असू दे.",
      meaningEn: "O mind! Harmful cravings are of no avail. Never harbor sinful thoughts, never abandon virtue, and let pure truth reside in your heart."
    },
    {
      num: 5,
      theme: "सत्यसंकल्प व विषयांचा त्याग (Noble Resolve & Restraint)",
      lines: [
        "मना पापसंकल्प सोडूनि द्यावा ।",
        "मना सत्यसंकल्प जीवीं धरावा ।",
        "मना कल्पना ते नको विषयाची ।",
        "विकारे घडे हो जनीं सर्व चीची ॥ ५ ॥"
      ],
      meaningMr: "मनातील पापाचा संकल्प सोडून दे आणि कल्याणाचा व सत्याचा संकल्प हृदयात धारण कर. विषयासक्तीची कल्पना करू नको, कारण विकारांमुळे जगात बदनामी व अधोगती होते.",
      meaningEn: "Give up sinful thoughts and anchor your soul in truth. Shun indulgence in worldly temptations, for vices lead only to disgrace and downfall."
    },
    {
      num: 6,
      theme: "षड्रिपू मुक्ती - काम क्रोध त्याग (Mastery over Anger, Lust & Greed)",
      lines: [
        "नको रे मना क्रोध हा खेदकारी ।",
        "नको रे मना काम नाना विकारी ।",
        "नको रे मना लोभ हा दंभ भारू ।",
        "मना सर्वथा मत्सरू दंभ भारू ॥ ६ ॥"
      ],
      meaningMr: "हे मना, दुःख व पश्चात्ताप देणारा क्रोध करू नको. चित्ताला भुलवणारा कामविकार टाळ. लोभ व खोटा अहंकार सोडून दे, आणि मनातील मत्सर व दंभाचा संपूर्ण त्याग कर.",
      meaningEn: "O mind, harbor no destructive anger nor misleading lust. Cast aside greed and ostentation, and liberate your heart from jealousy and ego."
    },
    {
      num: 7,
      theme: "धैर्य, क्षमाशीलता व नम्रता (Fortitude, Patience & Gentle Humility)",
      lines: [
        "मना श्रेष्ठ धारिष्ट जीवीं धरावे ।",
        "मना बोलणे नीच सोशीत जावे ।",
        "स्वयें सर्वदा नम्र वाचे वदावे ।",
        "मना सर्व लोकांसि रे नीववावे ॥ ७ ॥"
      ],
      meaningMr: "मनात उत्तुंग धैर्य धारण कर. इतरांचे कटू बोलणे सहन करण्याची क्षमता ठेव. स्वतः नेहमी नम्रतेने बोल, आणि आपल्या प्रेमळ वागण्याने सर्वांच्या मनाला शांतता व समाधान दे.",
      meaningEn: "Hold firm inner courage in your spirit. Patiently bear harsh words from others, always speak with modesty, and bring soothing comfort to all."
    },
    {
      num: 8,
      theme: "सत्कीर्ती व चंदनासारखे समर्पण (Enduring Goodness & Selfless Service)",
      lines: [
        "देहे त्यागितां कीर्ति मागे उरावी ।",
        "मना सज्जना हेचि क्रीया करावी ।",
        "मना चंदनाचे परी त्वां झिजावे ।",
        "परी अंतरीं सज्जना नीववावे ॥ ८ ॥"
      ],
      meaningMr: "हे सज्जन मना! देह त्यागून गेल्यावरही उत्तम कीर्ती व सत्कर्म मागे राहावे असे आचरण कर. चंदनासारखे स्वतः झिजून इतरांच्या जीवनाला सुगंध व शीतलता दे.",
      meaningEn: "Live so that when the body departs, noble virtues endure. Like fragrant sandalwood that wears itself away to spread calm aroma, bring peace to noble souls."
    },
    {
      num: 9,
      theme: "परधन त्याग व निष्पाप वृत्ती (Freedom from Greed & False Desires)",
      lines: [
        "नको रे मना द्रव्य ते पुढिलांचे ।",
        "अती स्वार्थबुद्धी नरे पाप सांचे ।",
        "घडे भोगणे पाप ते कर्म खोटे ।",
        "न होतां मनासारिखे दुःख मोठे ॥ ९ ॥"
      ],
      meaningMr: "इतरांच्या धनाची अभिलाषा धरू नको. अति स्वार्थी वृत्तीने केवळ पापेच साठतात. वाईट कर्मांचे फळ भोगावेच लागते, आणि आपल्या मनाविरुद्ध झाले की मोठे दुःख होते.",
      meaningEn: "O mind, covet not the wealth of others. Selfish greed accumulates sin, which ultimately yields bitter suffering when life does not go one's way."
    },
    {
      num: 10,
      theme: "सत्य चिंतन व कर्मफळ (Self-Inquiry & Fruits of Karma)",
      lines: [
        "जगीं सर्वसुखी असा कोण आहे ।",
        "विचारी मना तूंचि शोधूनि पाहे ।",
        "मना त्वांचि रे पूर्वसंचीत केले ।",
        "तयासारिखे भोगणे प्राप्त झाले ॥ १० ॥"
      ],
      meaningMr: "या जगात संपूर्णपणे सुखी असा कोण आहे? जरा शोधून पाहा. आपले सुख-दुःख हे आपल्याच कर्माचे फळ आहे, म्हणून तक्रार न करता विवेकाने जीवन जगावे.",
      meaningEn: "Inquire deeply: who in this world is free from all trials? We experience the fruits of our own deeds; therefore face life with equanimity and wisdom."
    },
    {
      num: 11,
      theme: "विवेक व देहबुद्धी मुक्ती (Freedom from Bodily Attachment)",
      lines: [
        "मना मानसीं दुःख आणू नको रे ।",
        "मना सर्वथा शोक चिंता नको रे ।",
        "विवेके देहेबुद्धी सोडूनि द्यावी ।",
        "विदेहीपणीं मुक्ती सांडीत जावी ॥ ११ ॥"
      ],
      meaningMr: "मनात विनाकारण दुःख, शोक व चिंता आणू नकोस. विवेकाने क्षणभंगुर देहाची आसक्ती सोडून दे, आणि आत्मस्वरूपात स्थिर होऊन जीवनमुक्त हो.",
      meaningEn: "O mind, burden not your heart with grief and worry. Discard attachment to the physical form through wisdom, and abide in the liberation of the eternal self."
    },
    {
      num: 12,
      theme: "काळाचे भय व कुवासना त्याग (The Transience of Life & Renouncing Ego)",
      lines: [
        "मना सांग पा रावणा काय झाले ।",
        "अकस्मात ते राज्य सर्वै बुडाले ।",
        "म्हणोनी कुडी वासना सांडी वेगीं ।",
        "बळे लागला काळ हा पाठिलागी ॥ १२ ॥"
      ],
      meaningMr: "हे मना सांग पाहू, महाबलवान रावणाचे शेवटी काय झाले? त्याचे वैभवशाली राज्य क्षणात नष्ट झाले! म्हणून वाईट वासनांचा त्वरित त्याग कर, कारण काळ कोणालाही सोडत नाही.",
      meaningEn: "O mind, consider what befell mighty Ravana: his vast kingdom vanished in an instant! Renounce harmful cravings at once, for the wheel of time spares no one."
    }
  ];

  // ── 2. Alternating Singer Profiles ──
  const SINGERS = {
    lata: {
      id: "lata",
      name: "भारतरत्न गानकोकिळा लता मंगेशकर",
      shortName: "लता मंगेशकर",
      englishName: "Lata Mangeshkar",
      icon: "🪷",
      badgeColor: "#F59E0B",
      gradient: "linear-gradient(135deg, #FF8F00, #E65100)",
      vocalSubtitle: "अमृतमय मधुर स्वर · Divine Melody"
    },
    suresh: {
      id: "suresh",
      name: "पद्मश्री सुरेश वाडकर",
      shortName: "सुरेश वाडकर",
      englishName: "Suresh Wadkar",
      icon: "🕉️",
      badgeColor: "#06B6D4",
      gradient: "linear-gradient(135deg, #0284C7, #0D9488)",
      vocalSubtitle: "गंभीर ध्यानस्थ नाद · Soulful Baritone"
    }
  };

  // ── 3. Audio & State Engine ──
  let _audioCtx = null;
  let _currentAudio = null;
  let _isPlaying = false;
  let _autoContinueTimer = null;
  let _masterSafetyTimer = null;
  let _currentShloka = null;
  let _currentSinger = "lata";
  let _onCompleteCallback = null;
  let _isSample = false;
  let _audioUnlocked = false;

  function getAudioContext() {
    if (!_audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) _audioCtx = new AudioCtx();
    }
    if (_audioCtx && _audioCtx.state === 'suspended') {
      _audioCtx.resume();
    }
    return _audioCtx;
  }

  // Pre-unlock audio on user clicks (Start button, sample button, etc.)
  function unlockAudio() {
    if (_audioUnlocked) return;
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') ctx.resume();

      // Silent micro-sound to unlock media playback
      const silentAudio = new Audio();
      silentAudio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
      const p = silentAudio.play();
      if (p !== undefined) {
        p.then(() => {
          silentAudio.pause();
          _audioUnlocked = true;
        }).catch(() => {});
      }
    } catch (e) { }
  }

  function stopCurrentAudio() {
    if (_currentAudio) {
      try {
        _currentAudio.pause();
        _currentAudio.currentTime = 0;
        _currentAudio.onended = null;
        _currentAudio.ontimeupdate = null;
        _currentAudio.onerror = null;
      } catch (e) { }
      _currentAudio = null;
    }
  }

  function highlightLine(idx) {
    for (let i = 0; i < 4; i++) {
      const lineEl = document.getElementById("manache-line-" + i);
      if (lineEl) {
        if (i === idx) {
          lineEl.classList.add("active-line");
        } else {
          lineEl.classList.remove("active-line");
        }
      }
    }
  }

  function playTempleChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(528, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.9);
    } catch (e) { }
  }

  /**
   * Resolves audio path candidate URLs for both flat audio/ and nested audio/manache/ structures
   */
  function resolveAudioCandidates(singerKey, shlokNum) {
    return [
      `audio/${singerKey}_shlok_${shlokNum}.mp3`,
      `audio/manache/${singerKey}/shlok_${shlokNum}.mp3`,
      `./audio/${singerKey}_shlok_${shlokNum}.mp3`,
      `./audio/manache/${singerKey}/shlok_${shlokNum}.mp3`
    ];
  }

  /**
   * Plays the real vocal recording for the chosen singer and shloka,
   * synchronizing on-screen line highlighting with the vocal rhythm.
   */
  function playShlokaAudio(shloka, singerKey, onDone) {
    stopCurrentAudio();

    const candidates = resolveAudioCandidates(singerKey, shloka.num);
    let candidateIdx = 0;
    let hasEnded = false;

    const finishAudio = () => {
      if (hasEnded) return;
      hasEnded = true;
      highlightLine(-1);
      playTempleChime();
      if (typeof onDone === 'function') {
        setTimeout(onDone, 600);
      }
    };

    function tryPlayCandidate(idx) {
      if (!_isPlaying) return;
      if (idx >= candidates.length) {
        console.warn("[Surya] All audio candidates failed to load:", candidates);
        const statusEl = document.getElementById("manache-auto-msg");
        if (statusEl) {
          statusEl.innerHTML = `
            <span style="color:#EF4444;font-weight:700;">⚠️ ऑडिओ सापडला नाही</span>
            &nbsp;<button type="button" onclick="window.ManacheShlokEngine.replayCurrentShloka()" style="background:#F59E0B;border:none;border-radius:6px;padding:3px 8px;font-size:12px;font-weight:800;cursor:pointer;color:#000;">पुन्हा प्रयत्न करा (Retry)</button>
          `;
        }
        return;
      }

      const audioPath = candidates[idx];
      const audio = new Audio(audioPath);
      _currentAudio = audio;
      audio.preload = "auto";

      audio.ontimeupdate = function () {
        if (!_isPlaying || hasEnded) return;
        const t = audio.currentTime;
        const d = audio.duration || 30.0;
        let activeIdx = -1;

        if (singerKey === "suresh") {
          if (shloka.num === 1) {
            // Suresh Wadkar Shlok 1 (dur 37s): 0-12.5s is intro chant "जय जय रघुवीर समर्थ"
            if (t < 12.5) {
              activeIdx = -1;
            } else if (t < 18.5) {
              activeIdx = 0;
            } else if (t < 24.5) {
              activeIdx = 1;
            } else if (t < 30.5) {
              activeIdx = 2;
            } else {
              activeIdx = 3;
            }
          } else {
            // Suresh Wadkar Shlok 2 to 12 (dur 27.9s each)
            if (t < 7.0) {
              activeIdx = 0;
            } else if (t < 14.0) {
              activeIdx = 1;
            } else if (t < 21.0) {
              activeIdx = 2;
            } else {
              activeIdx = 3;
            }
          }
        } else {
          // Lata Mangeshkar
          if (shloka.num === 1) {
            // Lata Shlok 1 (dur 37.4s)
            if (t < 8.5) {
              activeIdx = 0;
            } else if (t < 17.0) {
              activeIdx = 1;
            } else if (t < 25.5) {
              activeIdx = 2;
            } else {
              activeIdx = 3;
            }
          } else {
            // Lata Shlok 2 to 12 (dur ~30.8s)
            const seg = (d > 0) ? (d / 4) : 7.7;
            if (t < seg) {
              activeIdx = 0;
            } else if (t < seg * 2) {
              activeIdx = 1;
            } else if (t < seg * 3) {
              activeIdx = 2;
            } else {
              activeIdx = 3;
            }
          }
        }

        highlightLine(activeIdx);
      };

      audio.onended = finishAudio;

      audio.onerror = function (err) {
        console.warn(`[Surya] Candidate ${idx} failed (${audioPath}), trying next candidate...`);
        tryPlayCandidate(idx + 1);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Playback started successfully!
          const statusEl = document.getElementById("manache-auto-msg");
          if (statusEl && !_isSample) {
            statusEl.innerHTML = `
              <span class="ms-pulse-dot"></span>
              <span>श्लोक पठण चालू आहे... पूर्ण होताच पुढील फेरी आपोआप सुरू होईल</span>
            `;
          }
        }).catch(function (error) {
          console.warn("[Surya] Audio play prevented by browser autoplay policy:", error);
          // Show interactive golden tap-to-play button so user can start with 1 tap!
          const statusEl = document.getElementById("manache-auto-msg");
          if (statusEl) {
            statusEl.innerHTML = `
              <button type="button" id="manache-unmute-btn" onclick="if(window.ManacheShlokEngine) window.ManacheShlokEngine.resumeAudio()" style="background:linear-gradient(135deg,#F59E0B,#D97706);color:#000;border:none;border-radius:20px;padding:6px 16px;font-size:13px;font-weight:900;cursor:pointer;box-shadow:0 0 16px rgba(245,158,11,0.6);">
                ▶️ श्लोक ऐका · Play Vocal (${singerKey === 'suresh' ? 'सुरेश वाडकर' : 'लता मंगेशकर'})
              </button>
            `;
          }

          // Allow tap anywhere on overlay to start
          const breakOv = document.getElementById("break-ov");
          if (breakOv) {
            const oneClickPlay = () => {
              breakOv.removeEventListener("click", oneClickPlay);
              if (_currentAudio && _isPlaying) {
                _currentAudio.play().then(() => {
                  const s = document.getElementById("manache-auto-msg");
                  if (s && !_isSample) {
                    s.innerHTML = '<span class="ms-pulse-dot"></span><span>श्लोक पठण चालू आहे...</span>';
                  }
                }).catch(() => {});
              }
            };
            breakOv.addEventListener("click", oneClickPlay, { once: true });
          }
        });
      }
    }

    tryPlayCandidate(0);
  }

  // ── 4. Public Engine Controller ──
  const ManacheShlokEngine = {
    getAllShlokas: function () {
      return MANACHE_SHLOKAS;
    },

    getShloka: function (idx) {
      const i = ((idx - 1) % MANACHE_SHLOKAS.length + MANACHE_SHLOKAS.length) % MANACHE_SHLOKAS.length;
      return MANACHE_SHLOKAS[i];
    },

    getSinger: function (key) {
      return SINGERS[key] || SINGERS.lata;
    },

    getSingerForBreak: function (breakCount) {
      const count = parseInt(breakCount, 10) || 1;
      return (count % 2 === 1) ? "lata" : "suresh";
    },

    unlockAudio: unlockAudio,

    resumeAudio: function () {
      if (_currentAudio) {
        _currentAudio.play().then(() => {
          const s = document.getElementById("manache-auto-msg");
          if (s && !_isSample) {
            s.innerHTML = '<span class="ms-pulse-dot"></span><span>श्लोक पठण चालू आहे...</span>';
          }
        }).catch((e) => {
          console.warn("[Surya] resumeAudio failed:", e);
        });
      }
    },

    playBreakShloka: function (options) {
      options = options || {};
      _isPlaying = true;
      _isSample = !!options.isSample;

      if (_autoContinueTimer) {
        clearInterval(_autoContinueTimer);
        _autoContinueTimer = null;
      }

      const breakOv = document.getElementById("break-ov");
      if (breakOv) breakOv.classList.add("show");

      const breakNum = options.breakNumber || 1;
      _currentSinger = options.singer || this.getSingerForBreak(breakNum);
      const singer = SINGERS[_currentSinger];

      let shlokIdx = options.shlokaNum;
      if (!shlokIdx) {
        let savedIdx = 1;
        try {
          savedIdx = parseInt(localStorage.getItem("surya_manache_shlok_idx") || "1", 10);
        } catch (e) { }
        shlokIdx = savedIdx;
      }
      _currentShloka = this.getShloka(shlokIdx);

      try {
        const nextIdx = (shlokIdx % MANACHE_SHLOKAS.length) + 1;
        localStorage.setItem("surya_manache_shlok_idx", nextIdx.toString());
      } catch (e) { }

      _onCompleteCallback = options.onComplete || null;

      this.updateBreakUI(_currentShloka, singer, options.setsDone || 12);

      // Master Safety Watchdog (dur + 8s)
      if (_masterSafetyTimer) {
        clearTimeout(_masterSafetyTimer);
        _masterSafetyTimer = null;
      }
      const safetyTimeout = (_currentShloka.num === 1) ? 46000 : 38000;
      _masterSafetyTimer = setTimeout(() => {
        if (_isPlaying) {
          console.warn("[Surya] Master recitation safety watchdog reached; proceeding.");
          ManacheShlokEngine.handleRecitationFinished();
        }
      }, safetyTimeout);

      // Play authentic recorded singing voice!
      playShlokaAudio(_currentShloka, _currentSinger, () => {
        if (_masterSafetyTimer) {
          clearTimeout(_masterSafetyTimer);
          _masterSafetyTimer = null;
        }
        this.handleRecitationFinished();
      });
    },

    updateBreakUI: function (shloka, singer, setsDone) {
      const breakNEl = document.getElementById("break-n");
      if (breakNEl) breakNEl.textContent = setsDone;

      const numEl = document.getElementById("manache-shlok-num");
      if (numEl) numEl.textContent = shloka.num;

      const themeEl = document.getElementById("manache-shlok-theme");
      if (themeEl) themeEl.textContent = shloka.theme;

      for (let i = 0; i < 4; i++) {
        const lineEl = document.getElementById("manache-line-" + i);
        if (lineEl) {
          lineEl.textContent = shloka.lines[i] || "";
          lineEl.classList.remove("active-line");
        }
      }

      const mrEl = document.getElementById("manache-meaning-mr");
      if (mrEl) mrEl.textContent = shloka.meaningMr;

      const enEl = document.getElementById("manache-meaning-en");
      if (enEl) enEl.textContent = shloka.meaningEn;

      const sBadge = document.getElementById("manache-singer-badge");
      if (sBadge) {
        sBadge.innerHTML = `
          <div class="ms-singer-avatar" style="background:${singer.gradient};">
            ${singer.icon}
          </div>
          <div class="ms-singer-info">
            <div class="ms-singer-title">
              <span class="ms-singer-tag">स्वर · Voice</span>
              <strong>${singer.shortName}</strong>
            </div>
            <div class="ms-singer-sub">${singer.vocalSubtitle}</div>
          </div>
        `;
      }

      const lataPill = document.getElementById("manache-pill-lata");
      const sureshPill = document.getElementById("manache-pill-suresh");
      if (lataPill) lataPill.classList.toggle("active", singer.id === "lata");
      if (sureshPill) sureshPill.classList.toggle("active", singer.id === "suresh");

      const statusEl = document.getElementById("manache-auto-msg");
      if (statusEl) {
        statusEl.innerHTML = `
          <span class="ms-pulse-dot"></span>
          <span>श्लोक पठण चालू आहे... पूर्ण होताच पुढील फेरी आपोआप सुरू होईल</span>
        `;
      }
    },

    handleRecitationFinished: function () {
      if (!_isPlaying) return;

      if (_masterSafetyTimer) {
        clearTimeout(_masterSafetyTimer);
        _masterSafetyTimer = null;
      }

      const statusEl = document.getElementById("manache-auto-msg");
      const progEl = document.getElementById("manache-prog-bar");

      if (_isSample) {
        if (statusEl) {
          statusEl.innerHTML = `
            <span style="color:#10B981;font-weight:700;">✅ नमुना श्लोक संपन्न (Sample Complete)!</span>
            &nbsp;<button type="button" onclick="if(window.ManacheShlokEngine) window.ManacheShlokEngine.stop(); const b=document.getElementById('break-ov'); if(b) b.classList.remove('show');" style="background:#F59E0B;border:none;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:800;cursor:pointer;color:#000;">✕ बंद करा (Close)</button>
          `;
        }
        if (progEl) progEl.style.width = "100%";
        return;
      }

      let countdown = 3;

      if (statusEl) {
        statusEl.innerHTML = `
          <span style="color:#10B981;font-weight:700;">✅ श्लोक संपन्न!</span>
          &nbsp;पुढील फेरी आपोआप सुरू होत आहे... <strong style="color:#F59E0B;" id="manache-cd">${countdown}</strong>
        `;
      }

      _autoContinueTimer = setInterval(() => {
        countdown--;
        const cdEl = document.getElementById("manache-cd");
        if (cdEl) cdEl.textContent = countdown;
        if (progEl) progEl.style.width = ((3 - countdown) / 3 * 100) + "%";

        if (countdown <= 0) {
          clearInterval(_autoContinueTimer);
          _autoContinueTimer = null;
          ManacheShlokEngine.autoContinueNextSets();
        }
      }, 900);
    },

    autoContinueNextSets: function () {
      this.stop();
      if (typeof _onCompleteCallback === "function") {
        const cb = _onCompleteCallback;
        _onCompleteCallback = null;
        cb();
      } else if (typeof window.continueAfterBreak === "function") {
        window.continueAfterBreak();
      }
    },

    switchSinger: function (singerKey) {
      if (!_isPlaying || _currentSinger === singerKey) return;
      _currentSinger = singerKey;
      if (_autoContinueTimer) {
        clearInterval(_autoContinueTimer);
        _autoContinueTimer = null;
      }
      this.playBreakShloka({
        breakNumber: _currentSinger === "lata" ? 1 : 2,
        shlokaNum: _currentShloka ? _currentShloka.num : 1,
        singer: _currentSinger,
        onComplete: _onCompleteCallback,
        isSample: _isSample
      });
    },

    replayCurrentShloka: function () {
      if (!_currentShloka) return;
      if (_autoContinueTimer) {
        clearInterval(_autoContinueTimer);
        _autoContinueTimer = null;
      }
      this.playBreakShloka({
        shlokaNum: _currentShloka.num,
        singer: _currentSinger,
        onComplete: _onCompleteCallback,
        isSample: _isSample
      });
    },

    playSample: function (singerKey) {
      unlockAudio();
      const singer = singerKey || _currentSinger || "lata";
      this.stop();
      const breakOv = document.getElementById("break-ov");
      if (breakOv) breakOv.classList.add("show");

      this.playBreakShloka({
        breakNumber: singer === "lata" ? 1 : 2,
        setsDone: "Demo",
        shlokaNum: 1,
        singer: singer,
        isSample: true
      });
    },

    stop: function () {
      _isPlaying = false;
      if (_autoContinueTimer) {
        clearInterval(_autoContinueTimer);
        _autoContinueTimer = null;
      }
      if (_masterSafetyTimer) {
        clearTimeout(_masterSafetyTimer);
        _masterSafetyTimer = null;
      }
      stopCurrentAudio();
      highlightLine(-1);
    }
  };

  // Expose to window
  window.ManacheShlokEngine = ManacheShlokEngine;
  window.playManacheShlokSample = function (singer) {
    if (window.ManacheShlokEngine) {
      window.ManacheShlokEngine.playSample(singer);
    }
  };

})(window);
