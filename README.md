# SURYASARTHI - 108 | सूर्यसारथी - १०८
> **Master Technical & User Guide: Ayurvedic Surya Namaskara, Automated 9:16 Social Media Reel Generator, 30s WhatsApp Status Screen Recorder, Bhagavad Gita Shloka Engine, Real Voice Manache Shlok Engine, Guided Pranayama Standards & PWA Architecture**

---

## 🚀 Quick Deployment: Run Live on GitHub Pages (100% Free Hosting)

Deploy **Suryasarthi 108** directly on GitHub Pages with zero server setup:

### Step 1: Create a Repository on GitHub
1. Sign in to your [GitHub account](https://github.com/).
2. Click **New Repository** (or visit `https://github.com/new`).
3. Repository name: `suryasarthi-108` (or any name you prefer).
4. Set visibility to **Public**.
5. Do NOT initialize with a README (as we already have a full README). Click **Create repository**.

### Step 2: Upload Files
* **Option A (Web Upload - Easiest)**:
  1. On your new repository page, click **"uploading an existing file"**.
  2. Extract `suryasarthi-108-github-ready.zip` (or open the `github-package/` folder).
  3. Select all files and the `audio/` folder, then drag and drop them into the GitHub web uploader.
  4. Commit message: `Initial release of Suryasarthi 108 with Real Voice Manache Shlok`.
  5. Click **Commit changes**.
* **Option B (Git Command Line)**:
  ```bash
  git init
  git add .
  git commit -m "Initial release of Suryasarthi 108"
  git branch -M main
  git remote add origin https://github.com/<your-username>/suryasarthi-108.git
  git push -u origin main
  ```

### Step 3: Enable GitHub Pages
1. Go to your repository's **Settings** tab.
2. In the left sidebar, click **Pages** (under "Code and automation").
3. Under **Build and deployment -> Source**, choose **"Deploy from a branch"**.
4. Under **Branch**, select `main` (or `master`) and directory `/(root)`, then click **Save**.
5. Wait 60–90 seconds for GitHub Actions to deploy.
6. Your live app is now live at:
   $$\text{\bf https://<your-username>.github.io/suryasarthi-108/}$$

### Step 4: Install as Mobile App (PWA)
* **Android (Chrome)**: Open the live link, tap the 3-dots menu (`⋮`), and tap **"Install App"** or **"Add to Home screen"**.
* **iOS (Safari)**: Open the live link, tap the Share icon (`⎙`), and tap **"Add to Home Screen"**.

---

## 📖 Table of Contents
1. [🌟 Project Overview & Tech Stack Philosophy](#-project-overview--tech-stack-philosophy)
2. [🎨 Visual Aesthetics & FHD Display Design System](#-visual-aesthetics--fhd-display-design-system)
3. [🧩 Module 1: Core Surya Namaskara Tracking & Daily Goal Scaling Algorithm](#-module-1-core-surya-namaskara-tracking--daily-goal-scaling-algorithm)
4. [🕉️ Module 2: Shri Manache Shlok Sacred Recitation Engine (Real Singing Voice)](#%EF%B8%8F-module-2-shri-manache-shlok-sacred-recitation-engine-real-singing-voice)
5. [📜 Module 3: Bhagavad Gita Shloka & Morning Motivation Engine](#-module-3-bhagavad-gita-shloka--morning-motivation-engine)
6. [🥗 Module 4: Ayurvedic Diet, Meal Timings & Hydration Tracker](#-module-4-ayurvedic-diet-meal-timings--hydration-tracker)
7. [🎬 Module 5: Automatic Social Media Reel Generator & WhatsApp Status Engine](#-module-5-automatic-social-media-reel-generator--whatsapp-status-engine)
8. [📹 Module 6: 30-Second WhatsApp Status Screen Recording Engine](#-module-6-30-second-whatsapp-status-screen-recording-engine)
9. [🫁 Module 7: Guided Pranayama & Classical Yoga / Ayurvedic Standards Engine](#-module-7-guided-pranayama--classical-yoga--ayurvedic-standards-engine)
10. [👑 Module 8: PRO Subscription & Data Preservation Engine](#-module-8-pro-subscription--data-preservation-engine)
11. [📊 Module 9: Analytics, Data Persistence & Offline PWA Architecture](#-module-9-analytics-data-persistence--offline-pwa-architecture)
12. [📱 Comprehensive User Guide (Basic to Advanced Usage)](#-comprehensive-user-guide-basic-to-advanced-usage)
13. [🛠️ Technical API Reference & Codebase Map](#%EF%B8%8F-technical-api-reference--codebase-map)

---

## 🌟 Project Overview & Tech Stack Philosophy

**SURYASARTHI - 108 (सूर्यसारथी - १०८)** is a premium, zero-dependency web application and offline-first Progressive Web App (PWA). It bridges ancient Vedic health practices—Surya Namaskara, Pranayama, Bhagavad Gita wisdom, Shri Manache Shlok, and Ayurvedic Ahara guidelines—with cutting-edge browser engineering, canvas animation engines, and automated social video creation.

### Design & Tech Stack Philosophy:
- **Core Technology**: Pure Vanilla HTML5, Vanilla CSS3, and ES6+ JavaScript (`app.js`, `manache-shlok.js`, `ayurvedic-diet.js`). Zero external frameworks or heavy npm bloat.
- **Aesthetic System**: High-contrast, dark-mode visual hierarchy with rich emerald-solar gradients (`#182B21`, `#0B1210`), glassmorphic overlays, animated circular SVG solar rings, and crisp typography.
- **Offline First**: 100% functional without an active internet connection via custom Service Worker caching (`sw.js`).
- **Privacy First**: All practice data, streak counters, video blobs, and configuration settings remain strictly private on the user's device via `localStorage` and `IndexedDB`.

---

## 🎨 Visual Aesthetics & FHD Display Design System

Suryasarthi 108 is built for maximum visual impact on Full HD (1080p / high-DPI OLED / AMOLED / IPS) mobile and desktop displays.

- **Lord Hanuman Aura & HD Watermark**: High-definition, subtle watermark of Lord Hanuman with illuminated golden borders positioned elegantly across the central practice canvas and all pranayama screens.
- **Modern High-Resolution Typography**:
  - Integrated Google Fonts (`'Outfit'` & `'Inter'`) for ultra-clean tabular digits, sharp headings, and crystal clear readability.
  - Devanagari Sanskrit mantras styled with `'Noto Sans Devanagari'` and radiant solar gold text shadows.
- **Deep Obsidian Emerald Palette & Glassmorphic Surfaces**:
  - Dark Mode Background: Deep obsidian background (`#060D0A`) with a subtle radial spotlight gradient.
  - Glassmorphic Cards: `backdrop-filter: blur(16px)` card surfaces with translucent borders, subtle inset light highlights, and soft drop-shadows.
- **Neon Gradients & Display Glows**:
  - Solar-Emerald Ring SVG (`url(#ringGrad)`) with electric gradient stroke and neon drop-shadow glow.
  - 3D Gradient Buttons with tactile scale responses and vibrant glowing box-shadows.
  - Radiant Gold Solar Badges (`#FBBF24`) and Electric Mint Green accents (`#34D399`).

---

## 🧩 Module 1: Core Surya Namaskara Tracking & Daily Goal Scaling Algorithm

- **Progressive Daily Goal Algorithm (`todayGoal()`)**:
  - **Starting Target**: Day 1 initializes at **4 rounds**.
  - **Completion Scaling**: Only upon completing today's target does the goal increment by **+4 rounds/day**, capped at **108 rounds max**.
  - **Incomplete / Skipped Days**: Incomplete or skipped days retain the current target without premature inflation, allowing users to build strength naturally.
- **Start Button Goal Lock & 12:00 AM Midnight Auto-Unlock (`checkMidnightRollover()`)**:
  - Upon completing today's target, the main Start button (`#main-btn`) locks (**`🔒 Goal Complete`**).
  - At **12:00 AM Midnight**, all daily locks auto-reset, recalculating the new goal target and unlocking the Start button for the morning practice session.
- **12 Authentic Poses with Color-Coded Breath Cues**:
  1. *Pranamasana* (Prayer Pose) — Inhale/Exhale — Anahata Chakra — *Om Mitraya Namah*
  2. *Hastauttanasana* (Raised Arms Pose) — Inhale — Vishuddhi Chakra — *Om Ravaye Namah*
  3. *Padahastasana* (Hand to Foot Pose) — Exhale — Swadhisthana Chakra — *Om Suryaya Namah*
  4. *Ashwa Sanchalanasana* (Equestrian Pose) — Inhale — Ajna Chakra — *Om Bhanave Namah*
  5. *Dandasana* (Plank Pose) — Exhale — Vishuddhi Chakra — *Om Khagaya Namah*
  6. *Ashtanga Namaskara* (Eight-Limbed Pose) — Retain Breath — Manipura Chakra — *Om Pushne Namah*
  7. *Bhujangasana* (Cobra Pose) — Inhale — Swadhisthana Chakra — *Om Hiranyagarbhaya Namah*
  8. *Adho Mukha Svanasana* (Downward Dog) — Exhale — Vishuddhi Chakra — *Om Marichaye Namah*
  9. *Ashwa Sanchalanasana* (Equestrian Pose) — Inhale — Ajna Chakra — *Om Adityaya Namah*
  10. *Padahastasana* (Hand to Foot Pose) — Exhale — Swadhisthana Chakra — *Om Savitre Namah*
  11. *Hastauttanasana* (Raised Arms Pose) — Inhale — Vishuddhi Chakra — *Om Arkaya Namah*
  12. *Tadasana / Pranamasana* (Mountain / Prayer) — Exhale — Anahata Chakra — *Om Bhaskaraya Namah*
- **Custom Pace & Recovery Triggers**:
  - Adjust pose duration from **2s to 30s** with configurable grace periods.
  - Break interval prompted every 12 sets (default configurable).
  - Recovery checkpoint prompted every 400 all-time completed sets.
- **Grace Time Krishna Chants**:
  - During the 10-second grace time between sets, the app speaks sacred Krishna names along with voice countdown for the next round.
- **SVG Circular Progress Ring**:
  Calculated dynamically using exact circumference math:
  $$\text{CIRC} = 2 \times \pi \times 98 \approx 615.75, \quad \text{offset} = \text{CIRC} \times \left(1 - \frac{\text{step}}{12}\right)$$
- **Screen WakeLock API**: Requests `navigator.wakeLock.request('screen')` during active practice sessions to prevent display sleep.

---

## 🕉️ Module 2: Shri Manache Shlok Sacred Recitation Engine (Real Singing Voice)

- **Authentic Master Voice Recordings**:
  - **पद्मश्री सुरेश वाडकर (Suresh Wadkar)**: Soulful baritone chanting with traditional "जय जय रघुवीर समर्थ" invocation.
  - **भारतरत्न लता मंगेशकर (Lata Mangeshkar)**: Sacred melodic rendition.
- **Real-Time Line-by-Line Vocal Highlighting**:
  - Synchronizes on-screen Devanagari lyrics (`#manache-line-0` to `3`) with `.active-line` golden glow directly matching the singer's vocal delivery.
- **Verbatim Sung Lyrics (Shlokas 1 to 12)**:
  - 100% matched to traditional verses with both Marathi Bhavarth and English philosophical meanings.
- **Interactive Switching**:
  - Toggle anytime between artists during break with one tap on pill buttons.
- **Auto-Continuation**:
  - Temple chime plays upon verse completion, followed by a 3-second countdown that automatically resumes practice sets without requiring touch interaction.

---

## 📜 Module 3: Bhagavad Gita Shloka & Morning Motivation Engine

- **Daily Authentic Shloka Display**: Displays authentic Bhagavad Gita verses complete with Devanagari Sanskrit text, chapter/verse reference (e.g. `श्रीमद्भगवद्गीता २.४७`), and multilingual translations (Hindi, Marathi, English).
- **Clear Voice Recitation (`speakCurrentGitaQuote()`)**:
  - Automatically speaks the full Devanagari Sanskrit Shloka and Translation Meaning in clear voice using Indian local speech synthesis (`hi-IN` / `mr-IN` / `en-IN`).
- **Manual Launch Control**:
  - Gita Shloka screen remains open comfortably so the user can read at their own pace.
  - Practice session begins only when the user taps `🧘 Start Surya Namaskara Now`.

---

## 🥗 Module 4: Ayurvedic Diet, Meal Timings & Hydration Tracker

- **Ayurvedic Ahara Schedule**:
  - Ushapan (5:30 AM – 7:00 AM) — Warm water with lemon/honey.
  - Pratarash (8:00 AM – 9:00 AM) — Energizing warm breakfast.
  - Madhyahna Bhojan (12:00 PM – 1:30 PM) — Principal meal when Pitta is highest.
  - Sandhya Ahara (7:00 PM – 7:30 PM) — Light dinner before sunset; strict avoidance after 8:00 PM.
- **Intelligent Visibility**:
  - Automatically surfaces upon completing daily Surya Namaskara goals and reminds users during key meal windows.
- **Hydration Logging**:
  - Tracks 3 bottles (2.4L total) with 1-tap logging and lockscreen system notifications.

---

## 🎬 Module 5: Automatic Social Media Reel Generator & WhatsApp Status Engine

An automated 9:16 vertical HD video generator (`autoGenerateWorkoutReel()`) that builds 16-second social media reels ready for WhatsApp Status, Instagram Reels, and YouTube Shorts.

### 🌟 2-Scene Reel Structure:
- **Scene 1 (0s to 8s — Bhagavad Gita Opening Scene)**:
  - Atmospheric dark gradient with radiant golden sunlight beams and sacred spinning Om chakra.
  - Authentic Sanskrit Shloka rendered in crisp Devanagari typography with glowing drop shadow.
  - Multilingual translation banner with chapter reference badge.
- **Scene 2 (8s to 16s — Surya Namaskara Achievement & Celebration)**:
  - Dynamic 12-round completion counter with solar achievement badges.
  - Real-time animated circular progress ring glowing in emerald-solar gradient.
  - Calories burned counter and streak milestones.
  - Celebration confetti particles and watermarked Suryasarthi 108 brand seal.

---

## 📹 Module 6: 30-Second WhatsApp Status Screen Recording Engine

- **Screen Capture Engine**: Uses `navigator.mediaDevices.getDisplayMedia()` with WebM media recorder to capture exactly 30 seconds of high-frame-rate workout video.
- **Automatic Trimming**: Auto-stops after 30 seconds (maximum duration for WhatsApp Status).
- **One-Tap Share**: Direct `navigator.share()` integration with pre-formatted motivational captions.

---

## 🫁 Module 7: Guided Pranayama & Classical Yoga / Ayurvedic Standards Engine

- **Pranayama Modules**:
  1. *Anulom Vilom* (Alternate Nostril Breathing) — 4:4:4 or 4:16:8 rhythm.
  2. *Kapalbhati* (Skull Shining Breath) — Active exhalations with stomach contraction.
  3. *Bhastrika* (Bellows Breath) — Deep energizing yogic breaths.
  4. *Bhramari* (Humming Bee Breath) — Soothing acoustic vibrations.
  5. *Sheetali / Sheetkari* (Cooling Breath) — Pitta-reducing cooling breaths.
- **Adaptive Theming**:
  - All pranayama screens automatically inherit the user-selected theme and background.
  - Lord Hanuman protective aura integrated into background canvas.

---

## 👑 Module 8: PRO Subscription & Data Preservation Engine

- **Preservation Architecture**:
  - Guarantees user subscription status (`isPremium: true`) and streak data persist across all updates and history cleansers.

---

## 📊 Module 9: Analytics, Data Persistence & Offline PWA Architecture

- **Stats Dashboard**: Displays Today's Sets, Target Goal, Current Streak, Total All-Time Sets, Today's Calorie Burn, and Total Calorie Burn.
- **Calorie Estimation Formula**:
  $$\text{Calories Burned} = \text{Completed Sets} \times 13.9 \quad (\text{kcal})$$
- **Cache-First PWA Service Worker (`sw.js`)**:
  - Version `surya-v135` caches all 24 Shloka MP3s, SVGs, images, fonts, and scripts for 100% offline functionality.

---

## 📱 Comprehensive User Guide (Basic to Advanced Usage)

### 1. Daily Surya Namaskara Practice Workflow
1. Launch the app and tap **▶ Start**.
2. The **Bhagavad Gita Shloka Modal** opens, reciting today's Sanskrit Shloka & Meaning in full voice.
3. Read the Shloka and Meaning comfortably at your own pace.
4. Tap **`🧘 Start Surya Namaskara Now`** to begin your workout.
5. Follow the animated pose ring, visual countdown, and spoken instructions.
6. During breaks (every 12 rounds), enjoy the **Shri Manache Shlok** sung by Suresh Wadkar or Lata Mangeshkar with real-time text glow.
7. Next sets auto-continue after the Shloka finishes!

### 2. Creating & Sharing Workout Reels
1. Complete today's target goal or achieve a streak milestone.
2. The app automatically builds a 2-scene 16s vertical Reel.
3. Tap **`🎬 Download / Share Workout Reel`** on the main screen anytime.
4. Tap **`📲 Share Reel to WhatsApp Status`** or **`📥 Save / Download Video`**.

---

## 🛠️ Technical API Reference & Codebase Map

### Production File Structure
```
suryasarthi-108/
├── index.html                   # Main single-page PWA interface
├── app.js                       # Core Surya Namaskara tracking & audio-visual engine
├── manache-shlok.js             # Real voice Manache Shlok recitation & line sync
├── ayurvedic-diet.js            # Ayurvedic meal schedule & hydration tracker
├── settings-engine.js           # Settings manager & theme engine
├── surya-avatars.js             # SVG artwork, Sun avatars & Lord Hanuman graphics
├── gita-quotes.js               # Bhagavad Gita verses & multilingual translations
├── reel-generator.js            # 9:16 Canvas reel generator & WhatsApp status recorder
├── sw.js                        # PWA Service Worker (v135 offline caching)
├── manifest.json                # PWA manifest for mobile installation
├── hanuman_watermark.png        # Lord Hanuman border artwork
├── surya_master_emblem.png      # High-res circular master emblem
├── surya_animated_*.svg         # Animated solar emblems & chakras
├── icon-*.png                   # PWA application icons
├── audio/
│   └── manache/
│       ├── suresh/              # Shlok 1-12 MP3s by Suresh Wadkar
│       │   └── shlok_1..12.mp3
│       └── lata/                # Shlok 1-12 MP3s by Lata Mangeshkar
│           └── shlok_1..12.mp3
├── server.py                    # Optional lightweight Python SQLite backend
├── requirements.txt             # Optional server dependencies
├── .gitignore                   # Clean Git configuration
└── README.md                    # Technical documentation & guide
```

---

## 📜 License & Credits

Designed and engineered with devotion for Health, Mindfulness, and Ayurvedic Wellness.  
**SURYA SARATHI - 108 | सूर्यसारथी - १०८**
