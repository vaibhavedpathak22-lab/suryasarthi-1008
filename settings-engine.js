'use strict';

/* ═══════════════════════════════════════════════════════════════
   SETTINGS & CONFIGURATION ENGINE
   Handles Settings Drawer UI, Toggles, Preferences & Data Resets
═══════════════════════════════════════════════════════════════ */

var togSet = window.togSet = (id, on) => {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("on", on);
};

var togGet = window.togGet = id => {
  const el = document.getElementById(id);
  return el ? el.classList.contains("on") : false;
};

/* ── System Theme & Dynamic Color Schemes (Windows & Android) ── */
const THEME_META_COLORS = {
  surya_tejas: "#200800",
  samudra_lapis: "#0C2340",
  vaikuntha_amrita: "#2E0854",
  dhyana_aranya: "#063A26",
  rudraksha_dhuni: "#381508",
  sandhya_raga: "#3D0A1C",
  kailash_himadri: "#083344",
  swarna_mandir: "#FFFBEB",
  surya_grahan: "#000000",
  moksha_shilajit: "#261B14",
  chakravyuh_chrono: "#1C1E26",
  chandra_prabha: "#161D3A",
  light: "#FFFBEB",
  dark: "#2E0854"
};

function updateMetaThemeColor(theme) {
  try {
    const targetColor = THEME_META_COLORS[theme] || (theme === "swarna_mandir" || theme === "light" ? "#FFFBEB" : "#2E0854");
    let meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", targetColor);
  } catch(e) {}
}

const ALL_THEME_CLASSES = [
  "theme-light", "theme-dark",
  "theme-surya_tejas", "theme-samudra_lapis", "theme-vaikuntha_amrita",
  "theme-dhyana_aranya", "theme-rudraksha_dhuni", "theme-sandhya_raga",
  "theme-kailash_himadri", "theme-swarna_mandir", "theme-surya_grahan",
  "theme-moksha_shilajit", "theme-chakravyuh_chrono", "theme-chandra_prabha"
];

function applyTheme(theme) {
  const root = document.documentElement;
  let t = theme || (typeof cfg !== "undefined" && cfg.theme) || "vaikuntha_amrita";

  // System OS Default option was removed; fallback/default is vaikuntha_amrita
  if (t === "auto" || t === "system" || !t) {
    t = "vaikuntha_amrita";
  }

  // Remove previous theme classes
  ALL_THEME_CLASSES.forEach(cls => root.classList.remove(cls));

  // Apply new theme class
  root.classList.add(`theme-${t}`);

  // Maintain light/dark broad compatibility
  if (t === "swarna_mandir" || t === "light") {
    root.classList.add("theme-light");
  } else {
    root.classList.add("theme-dark");
  }

  updateMetaThemeColor(t);

  // Sync select element if open or present
  const themeEl = document.getElementById("cfg-theme");
  if (themeEl && themeEl.value !== t) {
    themeEl.value = t;
  }
}

// Auto-check for dawn/dusk hour transitions every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const curTheme = (typeof cfg !== "undefined" && cfg.theme) || "auto";
    if (curTheme === "auto" || curTheme === "system") {
      applyTheme(curTheme);
    }
  }, 300000);
}

function openSettings() {
  // 1. OPEN SETTINGS DRAWER UI IMMEDIATELY FIRST
  const dr = document.getElementById("dr");
  if(dr) {
    dr.style.cssText = "display:flex !important; position:fixed !important; inset:0 !important; z-index:99999 !important; align-items:flex-end !important; justify-content:center !important;";
    dr.classList.add("show");
  }

  // 2. Populate input fields safely
  try {
    const themeEl = document.getElementById("cfg-theme");
    if (themeEl) themeEl.value = (typeof cfg !== "undefined" && cfg.theme) || "vaikuntha_amrita";

    const incEl = document.getElementById("cfg-inc"); if(incEl) incEl.value = (typeof cfg !== "undefined" ? cfg.dailyIncrease : 4) || 4;
    const goalEl = document.getElementById("cfg-goal");
    if(goalEl) {
      if(typeof todayGoal === "function") goalEl.value = todayGoal();
      else if(typeof window.todayGoal === "function") goalEl.value = window.todayGoal();
      else if(typeof data !== "undefined") goalEl.value = data.baseGoal || 32;
    }
    const maxEl = document.getElementById("cfg-max"); if(maxEl) maxEl.value = (typeof cfg !== "undefined" ? cfg.maxSets : 108) || 108;
    const brkEl = document.getElementById("cfg-brk"); if(brkEl) brkEl.value = (typeof cfg !== "undefined" ? cfg.breakEvery : 12) || 12;
    const paceEl = document.getElementById("cfg-pace"); if(paceEl) paceEl.value = (typeof cfg !== "undefined" ? cfg.poseSeconds : 5) || 5;
    const graceEl = document.getElementById("cfg-grace"); if(graceEl) graceEl.value = (typeof cfg !== "undefined" ? cfg.graceSeconds : 5) || 5;
    
    const ltBadge = document.getElementById("cfg-lifetime-badge"); if(ltBadge && typeof data !== "undefined") ltBadge.textContent = data.totalAllTime || 0;
    const ltInput = document.getElementById("cfg-lifetime"); if(ltInput && typeof data !== "undefined") ltInput.value = data.totalAllTime || 0;

    if (typeof cfg !== "undefined") {
      togSet("tog-voice",   cfg.voiceOn !== false);
      togSet("tog-mantras", cfg.mantrasOn !== false);
      togSet("tog-breath",  cfg.breathOn !== false);
      const blEl = document.getElementById("cfg-breath-lang");
      if(blEl) blEl.value = cfg.breathLang || "en";
      togSet("tog-auto",    cfg.autoOn !== false);
      togSet("tog-prana",   cfg.pranayamaAuto !== false);
      togSet("tog-auto-phase", cfg.autoPaceMode !== false);
      togSet("tog-pose-anim",  cfg.poseAnimOn !== false);

      const pranaMin = document.getElementById("cfg-prana-min"); if(pranaMin) pranaMin.value = cfg.pranayamaMinutes || 35;
      const pranaLang = document.getElementById("cfg-prana-lang"); if(pranaLang) pranaLang.value = cfg.pranaLang || "en";

      togSet("tog-alarm", cfg.alarmOn !== false);
      togSet("tog-daytime-notif", cfg.daytimeNotifOn !== false);
      togSet("tog-auto-reel", cfg.autoReelOn !== false);
      togSet("tog-manache", cfg.manacheShlokOn !== false);
      togSet("tog-goal-voice-appreciation", cfg.goalAppreciationVoiceOn !== false);
      togSet("tog-show-diet-card", cfg.showDietCardOnMain === true);
      togSet("tog-diet-reminders", cfg.dietRemindersOn !== false && cfg.dietNotifOn !== false);
      togSet("tog-water-reminders", cfg.waterRemindersOn !== false);
      const alEl = document.getElementById("cfg-appreciation-lang");
      if (alEl) alEl.value = cfg.voiceAppreciationLang || "auto";

      const unEl = document.getElementById("cfg-user-name"); if(unEl) unEl.value = cfg.userName || "Vaibhav";
      const uwEl = document.getElementById("cfg-user-weight"); if(uwEl) uwEl.value = cfg.userWeight || 66;
      const bsEl = document.getElementById("cfg-bottle-size"); if(bsEl) bsEl.value = cfg.bottleMl || 1000;
      const dtEl = document.getElementById("cfg-diet-type"); if(dtEl) dtEl.value = cfg.dietType || "veg";
      const qlEl = document.getElementById("cfg-quote-lang"); if(qlEl) qlEl.value = cfg.quoteLang || cfg.pranaLang || "hi";

      const alarmTimeEl = document.getElementById("cfg-alarm-time");
      if(alarmTimeEl) {
        alarmTimeEl.value = String(cfg.alarmHour||5).padStart(2,"0") + ":" + String(cfg.alarmMinute||0).padStart(2,"0");
      }
    }

    const voiceInfoEl = document.getElementById("cfg-voice-info");
    if(voiceInfoEl) {
      const activeVoice = (typeof hiVoice !== "undefined" && hiVoice) ? hiVoice : null;
      voiceInfoEl.textContent = activeVoice ? ("Active: " + activeVoice.name + " (" + activeVoice.lang + ")") : "Voice Speech Ready ✓";
    }

    // Populate Current User & Admin Portal controls
    const userBadgeEl = document.getElementById("cfg-user-badge");
    const user = window.currentUser || (typeof currentUser !== "undefined" ? currentUser : null);
    if(userBadgeEl) {
      if(user) {
        userBadgeEl.innerHTML = `👤 Logged in as: <strong>${user.name}</strong> (@${user.username}) ${user.role === 'admin' ? '<span style="background:#F59E0B;color:#000;padding:2px 6px;border-radius:6px;font-size:10px;font-weight:900">ADMIN</span>' : ''}`;
        userBadgeEl.style.display = "block";
      } else {
        userBadgeEl.style.display = "none";
      }
    }
    const adminBtnEl = document.getElementById("cfg-admin-btn");
    if(adminBtnEl) {
      adminBtnEl.style.display = (user && user.role === "admin") ? "block" : "none";
    }
  } catch(e) {
    console.warn("openSettings field population error handled:", e);
  }
}

function closeSettings() {
  // Save settings first, then hide drawer
  try {
    if (typeof cfg !== "undefined") {
      const themeEl = document.getElementById("cfg-theme");
      if(themeEl) {
        cfg.theme = themeEl.value || "vaikuntha_amrita";
        applyTheme(cfg.theme);
      }

      const incEl = document.getElementById("cfg-inc"); if(incEl) cfg.dailyIncrease = parseInt(incEl.value) || 4;
      const goalEl = document.getElementById("cfg-goal");
      const newGoal = goalEl ? (parseInt(goalEl.value) || 0) : 0;
      if(newGoal > 0) {
        if (typeof setTodayGoal === "function") setTodayGoal(newGoal);
        else if (typeof window.setTodayGoal === "function") window.setTodayGoal(newGoal);
      }

      const maxEl = document.getElementById("cfg-max"); if(maxEl) cfg.maxSets = parseInt(maxEl.value) || 108;
      const brkEl = document.getElementById("cfg-brk"); if(brkEl) cfg.breakEvery = parseInt(brkEl.value) || 12;
      const paceEl = document.getElementById("cfg-pace"); if(paceEl) cfg.poseSeconds = Math.max(2, Math.min(30, parseInt(paceEl.value)||5));
      const graceEl = document.getElementById("cfg-grace"); if(graceEl) cfg.graceSeconds = Math.max(0, Math.min(30, parseInt(graceEl.value)||5));

      cfg.voiceOn          = togGet("tog-voice");
      cfg.mantrasOn        = togGet("tog-mantras");
      cfg.breathOn         = togGet("tog-breath");
      const blEl = document.getElementById("cfg-breath-lang");
      if(blEl) cfg.breathLang = blEl.value || "en";
      cfg.autoOn           = togGet("tog-auto");
      cfg.pranayamaAuto    = togGet("tog-prana");
      cfg.autoPaceMode     = togGet("tog-auto-phase");
      cfg.poseAnimOn       = togGet("tog-pose-anim");

      const pranaMin = document.getElementById("cfg-prana-min"); if(pranaMin) cfg.pranayamaMinutes = parseInt(pranaMin.value) || 35;
      const pranaLang = document.getElementById("cfg-prana-lang"); if(pranaLang) cfg.pranaLang = pranaLang.value || "en";

      cfg.alarmOn          = togGet("tog-alarm");
      cfg.daytimeNotifOn   = togGet("tog-daytime-notif");
      cfg.autoReelOn       = togGet("tog-auto-reel");
      cfg.manacheShlokOn   = togGet("tog-manache");
      cfg.goalAppreciationVoiceOn = togGet("tog-goal-voice-appreciation");
      const alEl2 = document.getElementById("cfg-appreciation-lang");
      if (alEl2) cfg.voiceAppreciationLang = alEl2.value;

      cfg.showDietCardOnMain = togGet("tog-show-diet-card");
      cfg.dietRemindersOn = togGet("tog-diet-reminders");
      cfg.dietNotifOn = cfg.dietRemindersOn;
      cfg.waterRemindersOn = togGet("tog-water-reminders");

      const unEl2 = document.getElementById("cfg-user-name"); if(unEl2) cfg.userName = unEl2.value.trim() || "Vaibhav";
      const uwEl2 = document.getElementById("cfg-user-weight"); if(uwEl2) cfg.userWeight = Math.max(30, Math.min(250, parseInt(uwEl2.value) || 66));
      const bsEl2 = document.getElementById("cfg-bottle-size"); if(bsEl2) cfg.bottleMl = parseInt(bsEl2.value) || 1000;
      const dtEl2 = document.getElementById("cfg-diet-type"); if(dtEl2) cfg.dietType = dtEl2.value || "veg";

      const alarmTimeEl = document.getElementById("cfg-alarm-time");
      if(alarmTimeEl && alarmTimeEl.value) {
        const [aH, aM] = alarmTimeEl.value.split(":").map(Number);
        cfg.alarmHour   = isNaN(aH) ? 5  : aH;
        cfg.alarmMinute = isNaN(aM) ? 0  : aM;
      }

      const qlEl = document.getElementById("cfg-quote-lang"); if(qlEl) cfg.quoteLang = qlEl.value;
      if (typeof voiceMuted !== "undefined") voiceMuted = !cfg.voiceOn; else window.voiceMuted = !cfg.voiceOn;

      const chartDaysEl = document.getElementById("cfg-chart-days"); if(chartDaysEl) cfg.chartDays = parseInt(chartDaysEl.value) || 21;
      const chartModeEl = document.getElementById("cfg-chart-mode"); if(chartModeEl) cfg.chartMode = chartModeEl.value || "bar";
    }

    if (typeof scheduleAlarm === "function") scheduleAlarm();
    if (typeof scheduleAyurvedicDietNotifications === "function") scheduleAyurvedicDietNotifications();
    if (typeof scheduleWaterIntakeReminders === "function") scheduleWaterIntakeReminders();
    if (typeof updateDietPlanButtonLockUI === "function") updateDietPlanButtonLockUI();

    if (typeof saveAll === "function") saveAll(); else if (typeof window.saveAll === "function") window.saveAll();
    if (typeof render === "function") render(); else if (typeof window.render === "function") window.render();
    if (typeof renderBars === "function") renderBars(); else if (typeof window.renderBars === "function") window.renderBars();
    if (typeof syncChartUI === "function") syncChartUI(); else if (typeof window.syncChartUI === "function") window.syncChartUI();
  } catch(e) {
    console.warn("closeSettings save error handled:", e);
  } finally {
    const dr = document.getElementById("dr");
    if(dr) {
      dr.style.cssText = "display:none !important;";
      dr.classList.remove("show");
    }
  }
}

function initSettingsBindings() {
  ["tog-voice","tog-mantras","tog-breath","tog-auto","tog-prana","tog-alarm","tog-daytime-notif","tog-auto-reel","tog-auto-phase","tog-pose-anim","tog-manache","tog-goal-voice-appreciation"].forEach(id => {
    const el = document.getElementById(id);
    if(el) {
      el.onclick = function(e) {
        if (typeof toggleSettingKey === "function") {
          toggleSettingKey(id, e);
        } else {
          if (e && typeof e.stopPropagation === "function") e.stopPropagation();
          el.classList.toggle("on");
        }
      };
    }
  });

  const settingsBtn = document.getElementById("settings-btn");
  if(settingsBtn) settingsBtn.onclick = openSettings;

  const drClose = document.getElementById("dr-close");
  if(drClose) drClose.onclick = closeSettings;

  const drBg = document.getElementById("dr-bg");
  if(drBg) drBg.onclick = closeSettings;

  // Real-time Theme selector change listener (preview immediately)
  const themeSelect = document.getElementById("cfg-theme");
  if(themeSelect) {
    themeSelect.onchange = function(e) {
      const chosen = e.target.value || "vaikuntha_amrita";
      if (typeof cfg !== "undefined") cfg.theme = chosen;
      applyTheme(chosen);
      if (typeof saveAll === "function") saveAll();
      else if (typeof window.saveAll === "function") window.saveAll();
    };
  }

  // Real-time OS System Color change listener for Windows & Android
  if (window.matchMedia) {
    try {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = () => {
        const curTheme = (typeof cfg !== "undefined" && cfg.theme) || "system";
        if (curTheme === "system") {
          applyTheme("system");
        }
      };
      if (mql.addEventListener) {
        mql.addEventListener("change", handleSystemThemeChange);
      } else if (mql.addListener) {
        mql.addListener(handleSystemThemeChange);
      }
    } catch(e) {}
  }

  const qlSelect = document.getElementById("cfg-quote-lang");
  if(qlSelect) {
    qlSelect.onchange = function(e) {
      if (typeof setGitaQuoteLanguage === "function") setGitaQuoteLanguage(e.target.value);
    };
  }

  const adminBtn = document.getElementById("cfg-admin-btn");
  if(adminBtn) {
    adminBtn.onclick = () => {
      closeSettings();
      if(typeof openAdminPortal === "function") openAdminPortal();
      else if(typeof window.openAdminPortal === "function") window.openAdminPortal();
    };
  }

  const logoutBtn = document.getElementById("cfg-logout-btn");
  if(logoutBtn) {
    logoutBtn.onclick = () => {
      if(!confirm("Are you sure you want to log out / switch user?")) return;
      closeSettings();
      if(typeof logoutUser === "function") logoutUser();
      else if(typeof window.logoutUser === "function") window.logoutUser();
    };
  }

  const resetDataBtn = document.getElementById("reset-data");
  if(resetDataBtn) {
    resetDataBtn.onclick = () => {
      if(!confirm("Reset practice history and data?\n\n(Your active PRO Plan subscription will be preserved).")) return;

      const preservedSub = {
        isPremium      : (typeof data !== "undefined" && data.isPremium) || false,
        subSku         : (typeof data !== "undefined" && data.subSku) || "",
        subDate        : (typeof data !== "undefined" && data.subDate) || "",
        trialStartDate : (typeof data !== "undefined" && data.trialStartDate) || ""
      };

      if (typeof data !== "undefined") {
        data = {
          history          : {},
          totalAllTime     : 0,
          totalTimeMs      : 0,
          totalPranaMs     : 0,
          programDay       : 1,
          lastDate         : "",
          baseGoal         : 0,
          goalDate         : "",
          lastGoal         : 0,
          lastCompletedGoal: 0,
          lastRecoveryAt   : 0,
          isPremium        : preservedSub.isPremium,
          subSku           : preservedSub.subSku,
          subDate          : preservedSub.subDate,
          trialStartDate   : preservedSub.trialStartDate
        };
      }

      if (typeof saveAll === "function") saveAll();
      location.reload();
    };
  }
}

// Bind Settings Event Listeners on DOMReady and immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initSettingsBindings();
    applyTheme();
  });
} else {
  initSettingsBindings();
  applyTheme();
}

// Export globally
window.applyTheme = applyTheme;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.togSet = togSet;
window.togGet = togGet;
window.initSettingsBindings = initSettingsBindings;
