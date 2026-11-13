// ── Surya Namaskara Professional Male & Female Vector Avatars ──
// High-fidelity anatomical yogic illustrations with dynamic breath synchronized states

const FEMALE_AVATARS = [
  // 0: Pranamasana (Prayer Pose) - Exhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fMatGrad0" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0F172A" stop-opacity="0.3"/>
        <stop offset="50%" stop-color="#38BDF8" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#0F172A" stop-opacity="0.3"/>
      </linearGradient>
      <linearGradient id="fSkinGrad0" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FCD34D"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>
      <linearGradient id="fWearGrad0" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
      <filter id="fGlowCyan0" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <!-- Yoga Mat -->
    <polygon points="20,120 140,120 130,125 30,125" fill="url(#fMatGrad0)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Exhale: Manipura / Navel grounding gold) -->
    <circle cx="80" cy="62" r="24" fill="rgba(245,158,11,0.12)" class="breath-aura-exhale"/>
    <circle cx="80" cy="52" r="16" fill="rgba(245,158,11,0.15)"/>
    
    <!-- Female Body: Pranamasana -->
    <!-- Legs in Yoga Leggings -->
    <path d="M74,75 Q73,95 72,118 Q76,119 79,118 Q79,95 78,75 Z" fill="url(#fWearGrad0)"/>
    <path d="M82,75 Q81,95 81,118 Q84,119 88,118 Q87,95 86,75 Z" fill="url(#fWearGrad0)"/>
    <!-- Feet -->
    <ellipse cx="74" cy="119" rx="4" ry="2" fill="#E0A97E"/>
    <ellipse cx="86" cy="119" rx="4" ry="2" fill="#E0A97E"/>
    <!-- Torso: Athletic Top -->
    <path d="M73,50 C71,58 72,66 73,75 L87,75 C88,66 89,58 87,50 Z" fill="url(#fWearGrad0)"/>
    <!-- Exposed Midriff Accent -->
    <rect x="74" y="68" width="12" height="4" fill="#D97706" rx="1"/>
    <!-- Chest & Neck -->
    <path d="M74,50 Q80,47 86,50 L84,41 Q80,42 76,41 Z" fill="#E0A97E"/>
    <!-- Arms in Anjali Mudra (Prayer at Heart) -->
    <path d="M73,50 C66,54 64,63 77,59 L80,55" fill="none" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
    <path d="M87,50 C94,54 96,63 83,59 L80,55" fill="none" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
    <!-- Hands in Prayer -->
    <path d="M78,57 L80,52 L82,57 Z" fill="#FCD34D"/>
    <!-- Head & Hairstyle (Sleek High Bun) -->
    <ellipse cx="80" cy="33" rx="5.5" ry="6.5" fill="#E0A97E"/>
    <path d="M74,33 C74,27 86,27 86,33 C86,30 84,26 80,26 C76,26 74,30 74,33 Z" fill="#1C1917"/>
    <!-- High Yogini Bun -->
    <circle cx="80" cy="24" r="4.2" fill="#1C1917"/>
    <circle cx="80" cy="27" r="1.5" fill="#F59E0B"/>
    <!-- Prana Glow Marker at Heart -->
    <circle cx="80" cy="55" r="2.5" fill="#34D399" filter="url(#fGlowCyan0)"/>
  </svg>`,

  // 1: Hasta Uttanasana (Raised Arms Arch) - Inhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
      <filter id="fGlowCyan1">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <!-- Mat -->
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Inhale: Anahata / Chest Expansion Cyan) -->
    <circle cx="88" cy="46" r="30" fill="rgba(56,189,248,0.18)" class="breath-aura-inhale"/>
    <circle cx="88" cy="42" r="18" fill="rgba(56,189,248,0.22)"/>

    <!-- Arching Body -->
    <!-- Legs & Pelvis pushed slightly forward -->
    <path d="M72,76 Q76,96 76,118 Q80,119 83,118 Q81,96 78,76 Z" fill="url(#fWearGrad1)"/>
    <path d="M78,76 Q83,96 84,118 Q88,119 91,118 Q88,96 84,76 Z" fill="url(#fWearGrad1)"/>
    <!-- Feet Grounded -->
    <ellipse cx="78" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <ellipse cx="89" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <!-- Back-Arching Torso -->
    <path d="M72,76 C76,64 82,56 88,48 L99,52 C94,60 86,67 82,76 Z" fill="url(#fWearGrad1)"/>
    <circle cx="83" cy="67" r="2" fill="#D97706"/>
    <!-- Head tilted back toward sun -->
    <ellipse cx="94" cy="41" rx="5.5" ry="6.5" fill="#E0A97E" transform="rotate(25 94 41)"/>
    <path d="M90,38 C91,33 98,33 100,38 C100,34 98,31 93,31 C90,31 89,34 90,38 Z" fill="#1C1917"/>
    <circle cx="98" cy="33" r="4" fill="#1C1917"/>
    <!-- Gracefully Extended Arms Arching Overhead -->
    <path d="M89,47 C98,34 106,20 114,10" fill="none" stroke="#D97706" stroke-width="4.2" stroke-linecap="round"/>
    <path d="M86,49 C94,36 102,22 110,12" fill="none" stroke="#E0A97E" stroke-width="3.8" stroke-linecap="round"/>
    <!-- Hands reaching back -->
    <path d="M112,11 L116,8 M108,13 L112,10" stroke="#FCD34D" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Chest expansion star -->
    <circle cx="91" cy="48" r="3" fill="#38BDF8" filter="url(#fGlowCyan1)"/>
  </svg>`,

  // 2: Hasta Padasana (Standing Forward Fold) - Exhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <!-- Mat -->
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Exhale Grounding) -->
    <circle cx="70" cy="88" r="28" fill="rgba(245,158,11,0.15)" class="breath-aura-exhale"/>

    <!-- Straight Vertical Legs -->
    <path d="M88,58 L90,118 Q93,119 96,118 L94,58 Z" fill="url(#fWearGrad2)"/>
    <path d="M96,58 L98,118 Q101,119 104,118 L102,58 Z" fill="url(#fWearGrad2)"/>
    <!-- Feet -->
    <ellipse cx="92" cy="119" rx="4" ry="2" fill="#E0A97E"/>
    <ellipse cx="101" cy="119" rx="4" ry="2" fill="#E0A97E"/>
    <!-- Pelvis & Folded Torso -->
    <path d="M86,58 C84,54 98,54 104,58 C100,68 86,72 82,88 L72,84 C76,68 82,60 86,58 Z" fill="url(#fWearGrad2)"/>
    <!-- Lower Spine & Upper Torso -->
    <path d="M82,88 C80,95 76,104 74,110 L66,107 C68,98 74,88 77,84 Z" fill="#D97706"/>
    <!-- Arms Reaching to Floor beside Feet -->
    <path d="M77,88 C76,96 74,106 72,118" fill="none" stroke="#E0A97E" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Palms flat on mat -->
    <ellipse cx="71" cy="119" rx="3.5" ry="1.5" fill="#FCD34D"/>
    <!-- Head Hanging Relaxed toward Shins -->
    <ellipse cx="71" cy="104" rx="5" ry="6" fill="#E0A97E"/>
    <circle cx="68" cy="100" r="3.5" fill="#1C1917"/>
    <!-- Prana Grounding Center -->
    <circle cx="78" cy="74" r="2.5" fill="#F59E0B"/>
  </svg>`,

  // 3: Ashwa Sanchalanasana (Equestrian - Right Leg Back) - Inhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <!-- Mat -->
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Inhale: Heart Rising) -->
    <circle cx="98" cy="58" r="26" fill="rgba(56,189,248,0.2)" class="breath-aura-inhale"/>

    <!-- Right Leg Extended Back with Knee on Mat -->
    <path d="M78,88 Q56,92 40,110 L44,114 Q62,96 82,90 Z" fill="url(#fWearGrad3)"/>
    <path d="M40,110 L24,118 L28,120 L44,114 Z" fill="url(#fWearGrad3)"/>
    <ellipse cx="23" cy="119" rx="3.5" ry="1.8" fill="#E0A97E"/>

    <!-- Left Front Leg: 90-degree Knee over Ankle -->
    <path d="M82,88 Q96,80 110,88 L108,118 Q104,119 102,118 L103,94 Q94,87 80,92 Z" fill="url(#fWearGrad3)"/>
    <ellipse cx="106" cy="119" rx="4" ry="2" fill="#E0A97E"/>

    <!-- Lifted Torso -->
    <path d="M80,88 C82,78 88,68 95,58 L105,62 C98,72 92,80 84,90 Z" fill="url(#fWearGrad3)"/>
    <rect x="88" y="74" width="10" height="4" fill="#D97706" rx="1"/>

    <!-- Hands Grounded beside Front Foot -->
    <path d="M96,62 L100,90 L99,118" fill="none" stroke="#D97706" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="99" cy="119" rx="3.5" ry="1.5" fill="#FCD34D"/>

    <!-- Chest Lifted & Head Gazing Upward -->
    <ellipse cx="102" cy="46" rx="5.5" ry="6.5" fill="#E0A97E" transform="rotate(-15 102 46)"/>
    <circle cx="98" cy="40" r="4" fill="#1C1917"/>
    <circle cx="97" cy="62" r="3" fill="#38BDF8"/>
  </svg>`,

  // 4: Dandasana (Plank Pose) - Kumbhaka (Hold Breath)
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad4" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <!-- Mat -->
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Hold: Core Stability Emerald) -->
    <circle cx="82" cy="80" r="28" fill="rgba(52,211,153,0.18)" class="breath-aura-hold"/>

    <!-- Strong Straight Line Body (Feet at 26, Crown at 134) -->
    <!-- Legs in Leggings -->
    <path d="M26,114 L78,82 L76,76 L24,108 Z" fill="url(#fWearGrad4)"/>
    <!-- Feet Curled Toes on Mat -->
    <circle cx="23" cy="116" r="3.5" fill="#E0A97E"/>

    <!-- Core & Torso -->
    <path d="M78,82 L112,65 L116,72 L80,88 Z" fill="url(#fWearGrad4)"/>
    <rect x="74" y="78" width="6" height="8" fill="#D97706" rx="1"/>

    <!-- Arms: Straight Strong Support beneath Shoulders -->
    <path d="M112,68 L114,118" fill="none" stroke="#D97706" stroke-width="4.2" stroke-linecap="round"/>
    <ellipse cx="114" cy="119" rx="4" ry="1.8" fill="#FCD34D"/>

    <!-- Head Neutral aligned with spine -->
    <ellipse cx="126" cy="58" rx="5.5" ry="6" fill="#E0A97E" transform="rotate(25 126 58)"/>
    <circle cx="128" cy="54" r="3.8" fill="#1C1917"/>

    <!-- Core Fire Center -->
    <circle cx="82" cy="82" r="3.5" fill="#34D399"/>
  </svg>`,

  // 5: Ashtanga Namaskara (Eight Limbs Salute) - Exhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad5" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <!-- Mat -->
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Exhale Surrender) -->
    <circle cx="96" cy="98" r="24" fill="rgba(245,158,11,0.14)" class="breath-aura-exhale"/>

    <!-- Eight Contact Points: 2 Feet, 2 Knees, 2 Hands, Chest, Chin -->
    <!-- Toes & Lower Legs -->
    <ellipse cx="24" cy="118" rx="3.5" ry="2" fill="#E0A97E"/>
    <path d="M26,116 L54,118 L52,112 L28,110 Z" fill="url(#fWearGrad5)"/>
    <!-- Knees on mat, Thighs angled up to elevated hips -->
    <circle cx="54" cy="118" r="3" fill="#D97706"/>
    <path d="M54,118 L76,92 L82,96 L58,120 Z" fill="url(#fWearGrad5)"/>

    <!-- Torso angling down from elevated hips to chest on mat -->
    <path d="M76,92 L106,114 L102,118 L74,96 Z" fill="url(#fWearGrad5)"/>

    <!-- Hands by chest, elbows pointed up -->
    <path d="M102,108 L96,96 L100,118" fill="none" stroke="#D97706" stroke-width="3.8" stroke-linecap="round"/>
    <ellipse cx="102" cy="119" rx="3.5" ry="1.5" fill="#FCD34D"/>

    <!-- Neck & Chin grounded forward -->
    <ellipse cx="120" cy="112" rx="5" ry="5.5" fill="#E0A97E"/>
    <circle cx="122" cy="107" r="3.5" fill="#1C1917"/>

    <!-- Devotional Surrender Star -->
    <circle cx="102" cy="112" r="2.5" fill="#F59E0B"/>
  </svg>`,

  // 6: Bhujangasana (Cobra Pose) - Inhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad6" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <!-- Mat -->
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Inhale: Expansive Solar Chest) -->
    <circle cx="112" cy="68" r="30" fill="rgba(56,189,248,0.22)" class="breath-aura-inhale"/>

    <!-- Lower Body Flat on Mat -->
    <path d="M22,118 L78,118 L76,112 L22,114 Z" fill="url(#fWearGrad6)"/>
    <ellipse cx="20" cy="118" rx="4" ry="2" fill="#E0A97E"/>

    <!-- Pelvis Grounded, Spine Arching Gracefully Up -->
    <path d="M76,116 C82,106 94,92 108,74 L118,78 C104,96 88,110 78,120 Z" fill="url(#fWearGrad6)"/>
    <circle cx="94" cy="102" r="2" fill="#D97706"/>

    <!-- Arms supporting with soft elbow curve -->
    <path d="M106,78 L104,98 L104,118" fill="none" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="104" cy="119" rx="4" ry="1.8" fill="#FCD34D"/>

    <!-- Head & Neck Arching Back gracefully -->
    <ellipse cx="120" cy="56" rx="5.5" ry="6.5" fill="#E0A97E" transform="rotate(-20 120 56)"/>
    <circle cx="117" cy="49" r="4.2" fill="#1C1917"/>

    <!-- Heart Expansion Jewel -->
    <circle cx="112" cy="74" r="3" fill="#38BDF8"/>
  </svg>`,

  // 7: Adho Mukha Svanasana (Downward Dog) - Exhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad7" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <!-- Mat -->
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Exhale: Grounding Inversion) -->
    <circle cx="76" cy="54" r="26" fill="rgba(245,158,11,0.18)" class="breath-aura-exhale"/>

    <!-- Inverted V Shape: Feet grounded at left, Hips at peak (75, 46), Hands at right (128, 118) -->
    <!-- Legs in Leggings -->
    <path d="M36,118 L74,48 L80,52 L42,120 Z" fill="url(#fWearGrad7)"/>
    <ellipse cx="36" cy="119" rx="4" ry="2" fill="#E0A97E"/>

    <!-- Hips peak -->
    <circle cx="76" cy="48" r="5" fill="#115E59"/>

    <!-- Torso extending down toward hands -->
    <path d="M76,48 L108,86 L102,90 L72,52 Z" fill="url(#fWearGrad7)"/>

    <!-- Arms firmly planted extending from shoulders -->
    <path d="M106,88 L128,118" fill="none" stroke="#D97706" stroke-width="4.2" stroke-linecap="round"/>
    <ellipse cx="129" cy="119" rx="4" ry="1.8" fill="#FCD34D"/>

    <!-- Head aligned with upper arms -->
    <ellipse cx="106" cy="96" rx="5" ry="6" fill="#E0A97E"/>
    <circle cx="103" cy="93" r="3.8" fill="#1C1917"/>

    <!-- Sacral Apex Marker -->
    <circle cx="76" cy="48" r="3" fill="#F59E0B"/>
  </svg>`,

  // 8: Ashwa Sanchalanasana (Left Leg Back) - Inhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad8" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <!-- Mat -->
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Inhale: Sun salutation) -->
    <circle cx="62" cy="58" r="26" fill="rgba(56,189,248,0.2)" class="breath-aura-inhale"/>

    <!-- Left Leg Extended Back to Right Side of Mat -->
    <path d="M82,88 Q104,92 120,110 L116,114 Q98,96 78,90 Z" fill="url(#fWearGrad8)"/>
    <ellipse cx="137" cy="119" rx="3.5" ry="1.8" fill="#E0A97E"/>

    <!-- Right Front Leg: 90-degree Knee forward at left -->
    <path d="M78,88 Q64,80 50,88 L52,118 Q56,119 58,118 L57,94 Q66,87 80,92 Z" fill="url(#fWearGrad8)"/>
    <ellipse cx="54" cy="119" rx="4" ry="2" fill="#E0A97E"/>

    <!-- Lifted Torso -->
    <path d="M80,88 C78,78 72,68 65,58 L55,62 C62,72 68,80 76,90 Z" fill="url(#fWearGrad8)"/>

    <!-- Hands Grounded beside Front Foot -->
    <path d="M64,62 L60,90 L61,118" fill="none" stroke="#D97706" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="61" cy="119" rx="3.5" ry="1.5" fill="#FCD34D"/>

    <!-- Head Gazing Upward toward morning sky -->
    <ellipse cx="58" cy="46" rx="5.5" ry="6.5" fill="#E0A97E" transform="rotate(15 58 46)"/>
    <circle cx="62" cy="40" r="4" fill="#1C1917"/>
    <circle cx="63" cy="62" r="3" fill="#38BDF8"/>
  </svg>`,

  // 9: Hasta Padasana (Standing Forward Fold Return) - Exhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad9" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="70" cy="88" r="28" fill="rgba(245,158,11,0.15)" class="breath-aura-exhale"/>
    <path d="M88,58 L90,118 Q93,119 96,118 L94,58 Z" fill="url(#fWearGrad9)"/>
    <path d="M96,58 L98,118 Q101,119 104,118 L102,58 Z" fill="url(#fWearGrad9)"/>
    <ellipse cx="92" cy="119" rx="4" ry="2" fill="#E0A97E"/>
    <ellipse cx="101" cy="119" rx="4" ry="2" fill="#E0A97E"/>
    <path d="M86,58 C84,54 98,54 104,58 C100,68 86,72 82,88 L72,84 C76,68 82,60 86,58 Z" fill="url(#fWearGrad9)"/>
    <path d="M82,88 C80,95 76,104 74,110 L66,107 C68,98 74,88 77,84 Z" fill="#D97706"/>
    <path d="M77,88 C76,96 74,106 72,118" fill="none" stroke="#E0A97E" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="71" cy="119" rx="3.5" ry="1.5" fill="#FCD34D"/>
    <ellipse cx="71" cy="104" rx="5" ry="6" fill="#E0A97E"/>
    <circle cx="68" cy="100" r="3.5" fill="#1C1917"/>
    <circle cx="78" cy="74" r="2.5" fill="#F59E0B"/>
  </svg>`,

  // 10: Hasta Uttanasana (Raised Arms Sweep) - Inhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad10" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="88" cy="46" r="30" fill="rgba(56,189,248,0.18)" class="breath-aura-inhale"/>
    <path d="M72,76 Q76,96 76,118 Q80,119 83,118 Q81,96 78,76 Z" fill="url(#fWearGrad10)"/>
    <path d="M78,76 Q83,96 84,118 Q88,119 91,118 Q88,96 84,76 Z" fill="url(#fWearGrad10)"/>
    <ellipse cx="78" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <ellipse cx="89" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <path d="M72,76 C76,64 82,56 88,48 L99,52 C94,60 86,67 82,76 Z" fill="url(#fWearGrad10)"/>
    <ellipse cx="94" cy="41" rx="5.5" ry="6.5" fill="#E0A97E" transform="rotate(25 94 41)"/>
    <circle cx="98" cy="33" r="4" fill="#1C1917"/>
    <path d="M89,47 C98,34 106,20 114,10" fill="none" stroke="#D97706" stroke-width="4.2" stroke-linecap="round"/>
    <path d="M86,49 C94,36 102,22 110,12" fill="none" stroke="#E0A97E" stroke-width="3.8" stroke-linecap="round"/>
    <circle cx="91" cy="48" r="3" fill="#38BDF8"/>
  </svg>`,

  // 11: Pranamasana (Prayer Return) - Exhale
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="fWearGrad11" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="100%" stop-color="#115E59"/>
      </linearGradient>
    </defs>
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="80" cy="55" r="24" fill="rgba(245,158,11,0.15)" class="breath-aura-exhale"/>
    <path d="M74,75 Q73,95 72,118 Q76,119 79,118 Q79,95 78,75 Z" fill="url(#fWearGrad11)"/>
    <path d="M82,75 Q81,95 81,118 Q84,119 88,118 Q87,95 86,75 Z" fill="url(#fWearGrad11)"/>
    <ellipse cx="74" cy="119" rx="4" ry="2" fill="#E0A97E"/>
    <ellipse cx="86" cy="119" rx="4" ry="2" fill="#E0A97E"/>
    <path d="M73,50 C71,58 72,66 73,75 L87,75 C88,66 89,58 87,50 Z" fill="url(#fWearGrad11)"/>
    <rect x="74" y="68" width="12" height="4" fill="#D97706" rx="1"/>
    <path d="M74,50 Q80,47 86,50 L84,41 Q80,42 76,41 Z" fill="#E0A97E"/>
    <path d="M73,50 C66,54 64,63 77,59 L80,55" fill="none" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
    <path d="M87,50 C94,54 96,63 83,59 L80,55" fill="none" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
    <path d="M78,57 L80,52 L82,57 Z" fill="#FCD34D"/>
    <ellipse cx="80" cy="33" rx="5.5" ry="6.5" fill="#E0A97E"/>
    <circle cx="80" cy="24" r="4.2" fill="#1C1917"/>
    <circle cx="80" cy="55" r="2.5" fill="#34D399"/>
  </svg>`
];

const MALE_AVATARS = [
  // 0: Pranamasana (Prayer Pose) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad0" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <!-- Mat -->
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Exhale Grounding) -->
    <circle cx="80" cy="62" r="26" fill="rgba(245,158,11,0.14)" class="breath-aura-exhale"/>

    <!-- Athletic Male Yoga Shorts & Legs -->
    <!-- Shorts -->
    <path d="M70,68 L90,68 L91,88 L83,89 L80,75 L77,89 L69,88 Z" fill="url(#mWearGrad0)"/>
    <!-- Muscular Calves & Feet -->
    <path d="M71,88 L72,118 Q75,119 78,118 L76,88 Z" fill="#D97706"/>
    <path d="M84,88 L82,118 Q85,119 89,118 L89,88 Z" fill="#D97706"/>
    <ellipse cx="74" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <ellipse cx="86" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>

    <!-- Broad Shouldered Athletic Torso (Shirtless Yogic / Pectorals definition) -->
    <path d="M68,48 C68,58 72,64 71,68 L89,68 C88,64 92,58 92,48 Z" fill="#E0A97E"/>
    <!-- Chest / Abdominal Definition -->
    <path d="M72,52 Q80,56 88,52" fill="none" stroke="#D97706" stroke-width="1.2"/>
    <line x1="80" y1="52" x2="80" y2="65" stroke="#D97706" stroke-width="1.2"/>

    <!-- Strong Arms in Anjali Mudra (Prayer at Heart) -->
    <path d="M68,48 C60,54 62,64 77,59 L80,55" fill="none" stroke="#D97706" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M92,48 C100,54 98,64 83,59 L80,55" fill="none" stroke="#D97706" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M78,57 L80,52 L82,57 Z" fill="#FCD34D"/>

    <!-- Athletic Neck & Head with Short Fade / Yogic Bun -->
    <rect x="76" y="38" width="8" height="6" fill="#E0A97E"/>
    <ellipse cx="80" cy="32" rx="6" ry="7" fill="#E0A97E"/>
    <!-- Athletic Short Crop Hair -->
    <path d="M73,32 C73,25 87,25 87,32 C87,28 85,24 80,24 C75,24 73,28 73,32 Z" fill="#0F172A"/>
    <!-- Heart Center Glow -->
    <circle cx="80" cy="55" r="2.8" fill="#34D399"/>
  </svg>`,

  // 1: Hasta Uttanasana (Raised Arms Arch) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <!-- Mat -->
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    
    <!-- Breath Energy Aura (Inhale: Solar Expansion) -->
    <circle cx="88" cy="46" r="32" fill="rgba(56,189,248,0.2)" class="breath-aura-inhale"/>

    <!-- Male Shorts & Arching Legs -->
    <path d="M70,72 L86,72 L87,90 L80,90 L77,78 L74,90 L68,89 Z" fill="url(#mWearGrad1)"/>
    <path d="M71,90 Q75,104 76,118 Q80,119 83,118 Q81,104 77,90 Z" fill="#D97706"/>
    <path d="M83,90 Q87,104 88,118 Q92,119 95,118 Q91,104 88,90 Z" fill="#D97706"/>
    <ellipse cx="78" cy="119" rx="5" ry="2" fill="#E0A97E"/>
    <ellipse cx="90" cy="119" rx="5" ry="2" fill="#E0A97E"/>

    <!-- Muscular Arching Torso -->
    <path d="M70,72 C74,60 82,54 88,46 L100,50 C94,58 86,66 82,72 Z" fill="#E0A97E"/>
    
    <!-- Extended Arms Arching Skyward -->
    <path d="M88,46 C98,32 108,18 116,8" fill="none" stroke="#D97706" stroke-width="4.8" stroke-linecap="round"/>
    <path d="M84,48 C94,34 104,20 112,10" fill="none" stroke="#E0A97E" stroke-width="4.2" stroke-linecap="round"/>

    <!-- Head tilted back toward sun -->
    <ellipse cx="94" cy="40" rx="6" ry="7" fill="#E0A97E" transform="rotate(25 94 40)"/>
    <path d="M89,37 C90,31 99,31 100,37 C100,32 98,28 93,28 C89,28 88,32 89,37 Z" fill="#0F172A"/>

    <circle cx="92" cy="48" r="3.5" fill="#38BDF8"/>
  </svg>`,

  // 2: Hasta Padasana (Forward Fold) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="70" cy="88" r="28" fill="rgba(245,158,11,0.15)" class="breath-aura-exhale"/>

    <!-- Straight Legs & Shorts -->
    <path d="M84,54 L104,54 L103,74 L95,76 L92,62 L88,76 L82,74 Z" fill="url(#mWearGrad2)"/>
    <path d="M85,74 L88,118 Q92,119 96,118 L93,74 Z" fill="#D97706"/>
    <path d="M96,74 L98,118 Q102,119 106,118 L103,74 Z" fill="#D97706"/>
    <ellipse cx="91" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <ellipse cx="102" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>

    <!-- Torso folding down from hips -->
    <path d="M84,54 C82,64 78,76 75,90 L64,86 C68,72 76,58 84,54 Z" fill="#E0A97E"/>
    <!-- Arms Reaching Ground -->
    <path d="M75,90 L70,118" fill="none" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="69" cy="119" rx="4" ry="1.8" fill="#FCD34D"/>

    <!-- Head toward knees -->
    <ellipse cx="68" cy="103" rx="5.5" ry="6.5" fill="#E0A97E"/>
    <circle cx="64" cy="98" r="4" fill="#0F172A"/>
    <circle cx="76" cy="74" r="2.8" fill="#F59E0B"/>
  </svg>`,

  // 3: Ashwa Sanchalanasana (Equestrian - Right Leg Back) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="98" cy="58" r="28" fill="rgba(56,189,248,0.2)" class="breath-aura-inhale"/>

    <!-- Right Leg Back, Left Leg Bent 90 deg -->
    <!-- Shorts -->
    <path d="M72,82 L96,82 L90,102 L70,98 Z" fill="url(#mWearGrad3)"/>
    <!-- Back leg extending to left -->
    <path d="M70,98 L36,114 L24,118 L28,120 L42,114 Z" fill="#D97706"/>
    <!-- Front leg bent -->
    <path d="M90,102 L106,86 L105,118 Q101,119 98,118 L99,94 Z" fill="#D97706"/>
    <ellipse cx="104" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>

    <!-- Muscular Torso Lifted -->
    <path d="M76,84 C78,74 86,66 94,56 L106,60 C98,70 90,78 82,88 Z" fill="#E0A97E"/>
    <!-- Hands Grounded -->
    <path d="M96,60 L98,118" fill="none" stroke="#D97706" stroke-width="4.2" stroke-linecap="round"/>
    <ellipse cx="98" cy="119" rx="4" ry="1.8" fill="#FCD34D"/>

    <!-- Head Lifted Gazing Forward/Up -->
    <ellipse cx="102" cy="44" rx="6" ry="7" fill="#E0A97E" transform="rotate(-15 102 44)"/>
    <circle cx="97" cy="38" r="4.2" fill="#0F172A"/>
    <circle cx="97" cy="60" r="3.2" fill="#38BDF8"/>
  </svg>`,

  // 4: Dandasana (Plank) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad4" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="82" cy="80" r="28" fill="rgba(52,211,153,0.18)" class="breath-aura-hold"/>

    <!-- Muscular Straight Plank Form -->
    <path d="M26,114 L72,86 L74,78 L24,108 Z" fill="#D97706"/>
    <!-- Shorts -->
    <path d="M68,88 L94,74 L92,66 L66,80 Z" fill="url(#mWearGrad4)"/>
    <!-- Torso -->
    <path d="M92,68 L114,64 L118,72 L94,78 Z" fill="#E0A97E"/>

    <!-- Strong Vertical Arm Support -->
    <path d="M114,66 L116,118" fill="none" stroke="#D97706" stroke-width="4.6" stroke-linecap="round"/>
    <ellipse cx="116" cy="119" rx="4.5" ry="2" fill="#FCD34D"/>

    <!-- Head Neutral -->
    <ellipse cx="128" cy="56" rx="6" ry="6.5" fill="#E0A97E" transform="rotate(25 128 56)"/>
    <circle cx="130" cy="51" r="4.2" fill="#0F172A"/>
    <circle cx="82" cy="82" r="3.5" fill="#34D399"/>
  </svg>`,

  // 5: Ashtanga Namaskara (8-Point Salute) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad5" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="96" cy="98" r="26" fill="rgba(245,158,11,0.15)" class="breath-aura-exhale"/>

    <!-- Toes, Knees, Elevated Hips, Chest, Chin -->
    <ellipse cx="24" cy="118" rx="4" ry="2" fill="#E0A97E"/>
    <path d="M26,116 L54,118 L52,110 L28,108 Z" fill="#D97706"/>
    <!-- Shorts over elevated pelvis -->
    <path d="M54,118 L76,88 L84,94 L58,120 Z" fill="url(#mWearGrad5)"/>
    <!-- Torso descending to mat -->
    <path d="M78,90 L108,112 L104,118 L74,94 Z" fill="#E0A97E"/>

    <!-- Elbows Bent & Hands Grounded beside chest -->
    <path d="M104,106 L96,94 L100,118" fill="none" stroke="#D97706" stroke-width="4.2" stroke-linecap="round"/>
    <ellipse cx="102" cy="119" rx="4" ry="1.8" fill="#FCD34D"/>

    <!-- Chin on mat -->
    <ellipse cx="122" cy="110" rx="5.5" ry="6" fill="#E0A97E"/>
    <circle cx="124" cy="104" r="3.8" fill="#0F172A"/>
    <circle cx="102" cy="112" r="2.8" fill="#F59E0B"/>
  </svg>`,

  // 6: Bhujangasana (Cobra) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad6" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="112" cy="68" r="32" fill="rgba(56,189,248,0.22)" class="breath-aura-inhale"/>

    <!-- Legs flat on mat -->
    <path d="M22,118 L70,118 L68,110 L22,112 Z" fill="#D97706"/>
    <!-- Shorts -->
    <path d="M66,118 L86,118 L84,108 L64,110 Z" fill="url(#mWearGrad6)"/>
    <!-- Arching Torso -->
    <path d="M82,114 C88,104 98,88 110,72 L122,76 C108,94 92,108 84,118 Z" fill="#E0A97E"/>

    <!-- Supporting Arms -->
    <path d="M108,76 L104,96 L104,118" fill="none" stroke="#D97706" stroke-width="4.5" stroke-linecap="round"/>
    <ellipse cx="104" cy="119" rx="4.5" ry="2" fill="#FCD34D"/>

    <!-- Head lifted -->
    <ellipse cx="122" cy="54" rx="6" ry="7" fill="#E0A97E" transform="rotate(-20 122 54)"/>
    <circle cx="118" cy="47" r="4.5" fill="#0F172A"/>
    <circle cx="114" cy="74" r="3.2" fill="#38BDF8"/>
  </svg>`,

  // 7: Adho Mukha Svanasana (Downward Dog) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad7" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="76" cy="54" r="28" fill="rgba(245,158,11,0.18)" class="breath-aura-exhale"/>

    <!-- Legs & Shorts at apex -->
    <path d="M36,118 L68,64 L74,68 L42,120 Z" fill="#D97706"/>
    <!-- Shorts over hips -->
    <path d="M66,66 L78,46 L86,52 L74,72 Z" fill="url(#mWearGrad7)"/>
    <ellipse cx="36" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>

    <!-- Torso angling down to mat -->
    <path d="M78,48 L110,84 L104,88 L74,52 Z" fill="#E0A97E"/>

    <!-- Arms firmly planted -->
    <path d="M108,86 L128,118" fill="none" stroke="#D97706" stroke-width="4.6" stroke-linecap="round"/>
    <ellipse cx="129" cy="119" rx="4.5" ry="2" fill="#FCD34D"/>

    <!-- Head aligned -->
    <ellipse cx="106" cy="94" rx="5.5" ry="6.5" fill="#E0A97E"/>
    <circle cx="102" cy="90" r="4.2" fill="#0F172A"/>
    <circle cx="78" cy="48" r="3.2" fill="#F59E0B"/>
  </svg>`,

  // 8: Ashwa Sanchalanasana (Left Leg Back) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad8" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="15,120 145,120 135,125 25,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="62" cy="58" r="28" fill="rgba(56,189,248,0.2)" class="breath-aura-inhale"/>

    <path d="M88,82 L64,82 L70,102 L90,98 Z" fill="url(#mWearGrad8)"/>
    <path d="M90,98 L124,114 L136,118 L132,120 L118,114 Z" fill="#D97706"/>
    <path d="M70,102 L54,86 L55,118 Q59,119 62,118 L61,94 Z" fill="#D97706"/>
    <ellipse cx="56" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>

    <path d="M84,84 C82,74 74,66 66,56 L54,60 C62,70 70,78 78,88 Z" fill="#E0A97E"/>
    <path d="M64,60 L62,118" fill="none" stroke="#D97706" stroke-width="4.2" stroke-linecap="round"/>
    <ellipse cx="62" cy="119" rx="4" ry="1.8" fill="#FCD34D"/>

    <ellipse cx="58" cy="44" rx="6" ry="7" fill="#E0A97E" transform="rotate(15 58 44)"/>
    <circle cx="63" cy="38" r="4.2" fill="#0F172A"/>
    <circle cx="63" cy="60" r="3.2" fill="#38BDF8"/>
  </svg>`,

  // 9: Hasta Padasana (Standing Forward Fold Return) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad9" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="70" cy="88" r="28" fill="rgba(245,158,11,0.15)" class="breath-aura-exhale"/>
    <path d="M84,54 L104,54 L103,74 L95,76 L92,62 L88,76 L82,74 Z" fill="url(#mWearGrad9)"/>
    <path d="M85,74 L88,118 Q92,119 96,118 L93,74 Z" fill="#D97706"/>
    <path d="M96,74 L98,118 Q102,119 106,118 L103,74 Z" fill="#D97706"/>
    <ellipse cx="91" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <ellipse cx="102" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <path d="M84,54 C82,64 78,76 75,90 L64,86 C68,72 76,58 84,54 Z" fill="#E0A97E"/>
    <path d="M75,90 L70,118" fill="none" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="69" cy="119" rx="4" ry="1.8" fill="#FCD34D"/>
    <ellipse cx="68" cy="103" rx="5.5" ry="6.5" fill="#E0A97E"/>
    <circle cx="64" cy="98" r="4" fill="#0F172A"/>
    <circle cx="76" cy="74" r="2.8" fill="#F59E0B"/>
  </svg>`,

  // 10: Hasta Uttanasana (Raised Arms Sweep) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad10" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="88" cy="46" r="32" fill="rgba(56,189,248,0.2)" class="breath-aura-inhale"/>
    <path d="M70,72 L86,72 L87,90 L80,90 L77,78 L74,90 L68,89 Z" fill="url(#mWearGrad10)"/>
    <path d="M71,90 Q75,104 76,118 Q80,119 83,118 Q81,104 77,90 Z" fill="#D97706"/>
    <path d="M83,90 Q87,104 88,118 Q92,119 95,118 Q91,104 88,90 Z" fill="#D97706"/>
    <ellipse cx="78" cy="119" rx="5" ry="2" fill="#E0A97E"/>
    <ellipse cx="90" cy="119" rx="5" ry="2" fill="#E0A97E"/>
    <path d="M70,72 C74,60 82,54 88,46 L100,50 C94,58 86,66 82,72 Z" fill="#E0A97E"/>
    <path d="M88,46 C98,32 108,18 116,8" fill="none" stroke="#D97706" stroke-width="4.8" stroke-linecap="round"/>
    <path d="M84,48 C94,34 104,20 112,10" fill="none" stroke="#E0A97E" stroke-width="4.2" stroke-linecap="round"/>
    <ellipse cx="94" cy="40" rx="6" ry="7" fill="#E0A97E" transform="rotate(25 94 40)"/>
    <circle cx="92" cy="48" r="3.5" fill="#38BDF8"/>
  </svg>`,

  // 11: Pranamasana (Prayer Return) - Male Yogi
  `<svg viewBox="0 0 160 130" class="pose-svg-pro">
    <defs>
      <linearGradient id="mWearGrad11" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
    <line x1="25" y1="120" x2="135" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="80" cy="62" r="26" fill="rgba(245,158,11,0.14)" class="breath-aura-exhale"/>
    <path d="M70,68 L90,68 L91,88 L83,89 L80,75 L77,89 L69,88 Z" fill="url(#mWearGrad11)"/>
    <path d="M71,88 L72,118 Q75,119 78,118 L76,88 Z" fill="#D97706"/>
    <path d="M84,88 L82,118 Q85,119 89,118 L89,88 Z" fill="#D97706"/>
    <ellipse cx="74" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <ellipse cx="86" cy="119" rx="4.5" ry="2" fill="#E0A97E"/>
    <path d="M68,48 C68,58 72,64 71,68 L89,68 C88,64 92,58 92,48 Z" fill="#E0A97E"/>
    <path d="M68,48 C60,54 62,64 77,59 L80,55" fill="none" stroke="#D97706" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M92,48 C100,54 98,64 83,59 L80,55" fill="none" stroke="#D97706" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M78,57 L80,52 L82,57 Z" fill="#FCD34D"/>
    <ellipse cx="80" cy="32" rx="6" ry="7" fill="#E0A97E"/>
    <path d="M73,32 C73,25 87,25 87,32 C87,28 85,24 80,24 C75,24 73,28 73,32 Z" fill="#0F172A"/>
    <circle cx="80" cy="55" r="2.8" fill="#34D399"/>
  </svg>`
];

// Idle Meditative Posture (Padmasana / Lotus Pose)
const IDLE_LOTUS_SVG = `<svg viewBox="0 0 160 130" class="pose-svg-pro">
  <polygon points="20,120 140,120 130,125 30,125" fill="rgba(15,23,42,0.3)"/>
  <circle cx="80" cy="70" r="35" fill="rgba(245,158,11,0.15)" class="breath-aura-hold"/>
  <!-- Crossed legs -->
  <path d="M48,116 Q80,118 112,116 Q100,100 80,102 Q60,100 48,116 Z" fill="#0D9488"/>
  <ellipse cx="56" cy="112" rx="6" ry="3" fill="#E0A97E"/>
  <ellipse cx="104" cy="112" rx="6" ry="3" fill="#E0A97E"/>
  <!-- Torso upright -->
  <path d="M72,70 C70,82 72,92 74,104 L86,104 C88,92 90,82 88,70 Z" fill="#115E59"/>
  <!-- Hands resting on knees in Jnana Mudra -->
  <path d="M72,72 L56,104" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
  <path d="M88,72 L104,104" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
  <circle cx="56" cy="104" r="3" fill="#FCD34D"/>
  <circle cx="104" cy="104" r="3" fill="#FCD34D"/>
  <!-- Head & crown chakra -->
  <ellipse cx="80" cy="48" rx="6" ry="7" fill="#E0A97E"/>
  <circle cx="80" cy="40" r="4.5" fill="#1C1917"/>
  <circle cx="80" cy="30" r="3" fill="#38BDF8"/>
</svg>`;

// Goal Completed Posture (Surya Mandal Siddhi)
const GOAL_COMPLETED_SVG = `<svg viewBox="0 0 160 130" class="pose-svg-pro">
  <circle cx="80" cy="65" r="48" fill="rgba(251,191,36,0.15)"/>
  <circle cx="80" cy="65" r="28" fill="rgba(245,158,11,0.25)"/>
  <!-- Golden Solar Rays -->
  <g stroke="#FBBF24" stroke-width="3" stroke-linecap="round" opacity="0.8">
    <line x1="80" y1="10" x2="80" y2="2"/>
    <line x1="80" y1="120" x2="80" y2="128"/>
    <line x1="25" y1="65" x2="17" y2="65"/>
    <line x1="135" y1="65" x2="143" y2="65"/>
    <line x1="41" y1="26" x2="35" y2="20"/>
    <line x1="119" y1="104" x2="125" y2="110"/>
    <line x1="41" y1="104" x2="35" y2="110"/>
    <line x1="119" y1="26" x2="125" y2="20"/>
  </g>
  <circle cx="80" cy="65" r="20" fill="#F59E0B"/>
  <circle cx="80" cy="65" r="14" fill="#FBBF24"/>
  <circle cx="80" cy="65" r="6" fill="#0F172A"/>
  <circle cx="80" cy="65" r="3" fill="#34D399"/>
</svg>`;

// Breathing Instructions & Detailed Alignment Cues for all 12 Steps
const POSE_INSTRUCTIONS = [
  {
    step: 1,
    name: "Pranamasana",
    sanskritName: "प्रणामासन",
    translation: "Prayer Pose",
    breath: "Exhale",
    breathClass: "exhale",
    mantra: "Om Mitraya Namaha",
    mantraDeva: "ॐ मित्राय नमः",
    meaning: "Salutations to the friend of all who sustains cosmic harmony",
    primaryCue: "Exhale slowly through the nostrils while bringing palms together in front of the chest in Anjali Mudra.",
    alignmentPoints: [
      "Stand upright on the front of the mat with feet together or hip-width apart.",
      "Distribute weight evenly across all four corners of both feet.",
      "Relax shoulders downward and back; lift the sternum gently toward thumbs.",
      "Maintain a calm, centered gaze forward and cultivate quiet inner gratitude."
    ],
    pranaFocus: "Anahata (Heart Chakra) & Manipura (Solar Plexus)"
  },
  {
    step: 2,
    name: "Hasta Uttanasana",
    sanskritName: "हस्त उत्तानासन",
    translation: "Raised Arms Arch",
    breath: "Inhale",
    breathClass: "inhale",
    mantra: "Om Ravaye Namaha",
    mantraDeva: "ॐ रवये नमः",
    meaning: "Salutations to the shining, radiant source of all illumination",
    primaryCue: "Inhale deeply, sweeping arms upwards and gently arching backwards from the upper spine.",
    alignmentPoints: [
      "Keep arms parallel, shoulder-width apart, with biceps framing the ears.",
      "Engage the core and press pelvis slightly forward to protect lumbar spine.",
      "Lift through the ribcage rather than collapsing into lower back.",
      "Gaze upward toward hands, welcoming the energizing solar rays into full lungs."
    ],
    pranaFocus: "Vishuddha (Throat Chakra) & Anahata (Heart)"
  },
  {
    step: 3,
    name: "Hasta Padasana",
    sanskritName: "पादहस्तासन / हस्तपादासन",
    translation: "Standing Forward Bend",
    breath: "Exhale",
    breathClass: "exhale",
    mantra: "Om Suryaya Namaha",
    mantraDeva: "ॐ सूर्याय नमः",
    meaning: "Salutations to the dispeller of darkness who guides conscious activity",
    primaryCue: "Exhale completely as you hinge forward from the hips with a long spine, placing hands beside feet.",
    alignmentPoints: [
      "Bend from hip joints, not the waist; keep micro-bend in knees if hamstrings are tight.",
      "Place palms flat on the mat in line with the toes if accessible.",
      "Release crown of head downward toward the floor, relaxing neck completely.",
      "Draw lower belly softly inward on each exhalation to deepen the forward fold."
    ],
    pranaFocus: "Swadhisthana (Sacral Chakra) & Muladhara (Root)"
  },
  {
    step: 4,
    name: "Ashwa Sanchalanasana",
    sanskritName: "अश्व सञ्चालनासन",
    translation: "Equestrian Pose (Right Leg Back)",
    breath: "Inhale",
    breathClass: "inhale",
    mantra: "Om Bhanave Namaha",
    mantraDeva: "ॐ भानवे नमः",
    meaning: "Salutations to the one who illumines the celestial sky",
    primaryCue: "Inhale deeply, stepping the right leg far back, resting the back knee on the mat and lifting chest.",
    alignmentPoints: [
      "Ensure left front knee is bent at 90°, stacked directly over left ankle.",
      "Extend right leg far back with top of right foot resting flat on the mat.",
      "Press fingertips or palms firmly into mat beside front foot.",
      "Roll shoulders back, elongate the spine, and gaze softly upward to expand chest."
    ],
    pranaFocus: "Ajna (Third Eye Chakra) & Anahata (Heart)"
  },
  {
    step: 5,
    name: "Dandasana / Phalakasana",
    sanskritName: "दण्डासन / फलकासन",
    translation: "Plank / Stick Pose",
    breath: "Hold (Kumbhaka)",
    breathClass: "hold",
    mantra: "Om Khagaya Namaha",
    mantraDeva: "ॐ खगाय नमः",
    meaning: "Salutations to the one who glides swiftly across the boundless heavens",
    primaryCue: "Retain (hold) the breath as you step the left leg back to meet the right in a strong plank.",
    alignmentPoints: [
      "Maintain a straight, unbroken diagonal line from heels to the crown of head.",
      "Wrists positioned directly under shoulders with fingers spread wide.",
      "Engage abdominal wall, quadriceps, and glutes to avoid sagging hips.",
      "Hold prana steady within the core, cultivating internal heat (tapas)."
    ],
    pranaFocus: "Manipura (Solar Plexus / Naval Fire)"
  },
  {
    step: 6,
    name: "Ashtanga Namaskara",
    sanskritName: "अष्टाङ्ग नमस्कार",
    translation: "Salute with Eight Limbs",
    breath: "Exhale",
    breathClass: "exhale",
    mantra: "Om Pushne Namaha",
    mantraDeva: "ॐ पूष्णे नमः",
    meaning: "Salutations to the all-nourishing life-giver",
    primaryCue: "Exhale smoothly as you lower knees, chest, and chin gently to the mat, keeping hips elevated.",
    alignmentPoints: [
      "Eight points touch the ground: 2 toes, 2 knees, 2 palms, chest, and chin.",
      "Hips remain suspended off the mat with abdomen hollowed slightly.",
      "Keep elbows hugged close to ribcage, pointing straight back.",
      "Surrender personal ego to the earth in reverent humility."
    ],
    pranaFocus: "Manipura (Solar Plexus) & Muladhara (Root)"
  },
  {
    step: 7,
    name: "Bhujangasana",
    sanskritName: "भुजङ्गासन",
    translation: "Cobra Pose",
    breath: "Inhale",
    breathClass: "inhale",
    mantra: "Om Hiranya Garbhaya Namaha",
    mantraDeva: "ॐ हिरण्यगर्भाय नमः",
    meaning: "Salutations to the golden cosmic womb and creator of all life",
    primaryCue: "Inhale, sliding forward and gently peeling the chest and heart upward into cobra pose.",
    alignmentPoints: [
      "Press tops of feet, thighs, and pubic bone firmly into the mat.",
      "Draw elbows back toward waist; do not lock arms or jam shoulders into ears.",
      "Use back muscles to lift the torso rather than solely pushing into hands.",
      "Open collarbones wide and gaze forward/upward with serene breath."
    ],
    pranaFocus: "Swadhisthana & Anahata (Heart Center)"
  },
  {
    step: 8,
    name: "Adho Mukha Svanasana",
    sanskritName: "अधोमुख श्वानासन",
    translation: "Downward-Facing Dog",
    breath: "Exhale",
    breathClass: "exhale",
    mantra: "Om Marichaye Namaha",
    mantraDeva: "ॐ मरीचये नमः",
    meaning: "Salutations to the lord of the dawn and shimmering rays",
    primaryCue: "Exhale, tucking toes and elevating hips high toward ceiling to create an inverted 'V'.",
    alignmentPoints: [
      "Press firmly through index knuckles and thumbs; broaden across shoulder blades.",
      "Reach sit bones toward the sky while gently sinking heels down toward mat.",
      "Relax neck completely, allowing ears to rest naturally between upper arms.",
      "Feel the calming, grounding rush of prana circulating toward brain and spine."
    ],
    pranaFocus: "Vishuddha (Throat) & Sahasrara (Crown)"
  },
  {
    step: 9,
    name: "Ashwa Sanchalanasana",
    sanskritName: "अश्व सञ्चालनासन",
    translation: "Equestrian Pose (Left Leg Back)",
    breath: "Inhale",
    breathClass: "inhale",
    mantra: "Om Adityaya Namaha",
    mantraDeva: "ॐ आदित्याय नमः",
    meaning: "Salutations to the eternal child of Aditi, the cosmic mother",
    primaryCue: "Inhale, stepping the right foot forward between the palms, lowering left knee to the floor.",
    alignmentPoints: [
      "Right knee at clean 90° angle directly over right ankle.",
      "Left leg stretches long behind with top of foot grounded.",
      "Chest broadens forward between upper arms; spine lengthens.",
      "Gaze upward, taking in fresh vitality and oxygen."
    ],
    pranaFocus: "Ajna (Third Eye) & Anahata (Heart)"
  },
  {
    step: 10,
    name: "Hasta Padasana",
    sanskritName: "हस्तपादासन",
    translation: "Standing Forward Bend",
    breath: "Exhale",
    breathClass: "exhale",
    mantra: "Om Savitre Namaha",
    mantraDeva: "ॐ सवित्रे नमः",
    meaning: "Salutations to the life-giving lord of creation",
    primaryCue: "Exhale as you step the left foot forward beside the right and fold deeply over thighs.",
    alignmentPoints: [
      "Bring feet parallel; distribute weight equally between ball and heel.",
      "Allow gravity to lengthen lower back and spine downward.",
      "Rest palms or fingertips on mat beside feet, head relaxed.",
      "Empty lungs completely of stale air and tension."
    ],
    pranaFocus: "Swadhisthana & Muladhara"
  },
  {
    step: 11,
    name: "Hasta Uttanasana",
    sanskritName: "हस्त उत्तानासन",
    translation: "Raised Arms Arch",
    breath: "Inhale",
    breathClass: "inhale",
    mantra: "Om Arkaya Namaha",
    mantraDeva: "ॐ अर्काय नमः",
    meaning: "Salutations to the supreme form of the sun worthy of worship",
    primaryCue: "Inhale deeply, sweeping arms outward and overhead, arching backwards into golden light.",
    alignmentPoints: [
      "Ground down through both feet to lift dynamically through fingertips.",
      "Engage thighs and glutes to steady the pelvic bowl.",
      "Expand lungs to full capacity, feeling solar energy surge through spine.",
      "Palms facing each other or joining overhead."
    ],
    pranaFocus: "Vishuddha (Throat) & Sahasrara (Crown)"
  },
  {
    step: 12,
    name: "Pranamasana",
    sanskritName: "प्रणामासन",
    translation: "Prayer Return",
    breath: "Exhale",
    breathClass: "exhale",
    mantra: "Om Bhaskaraya Namaha",
    mantraDeva: "ॐ भास्कराय नमः",
    meaning: "Salutations to the one who leads to spiritual enlightenment",
    primaryCue: "Exhale smoothly, bringing palms back together in front of heart in silent gratitude.",
    alignmentPoints: [
      "Return to Samastithi (Mountain Pose with Prayer Hands).",
      "Notice the heat, circulation, and prana pulsing through every cell.",
      "Maintain a slow, steady resting breath before commencing next cycle.",
      "Bow head slightly in self-awareness and peace."
    ],
    pranaFocus: "Anahata (Heart Chakra) & Sahasrara (Crown)"
  }
];

function getSuryaAvatarSvg(stepIndex, gender) {
  const isMale = (gender === "male");
  const list = isMale ? MALE_AVATARS : FEMALE_AVATARS;
  const idx = ((stepIndex % 12) + 12) % 12;
  return list[idx] || IDLE_LOTUS_SVG;
}

if (typeof window !== "undefined") {
  window.FEMALE_AVATARS = FEMALE_AVATARS;
  window.MALE_AVATARS = MALE_AVATARS;
  window.IDLE_LOTUS_SVG = IDLE_LOTUS_SVG;
  window.GOAL_COMPLETED_SVG = GOAL_COMPLETED_SVG;
  window.POSE_INSTRUCTIONS = POSE_INSTRUCTIONS;
  window.getSuryaAvatarSvg = getSuryaAvatarSvg;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    FEMALE_AVATARS,
    MALE_AVATARS,
    IDLE_LOTUS_SVG,
    GOAL_COMPLETED_SVG,
    POSE_INSTRUCTIONS,
    getSuryaAvatarSvg
  };
}
