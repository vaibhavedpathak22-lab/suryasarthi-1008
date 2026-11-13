/* Service Worker — surya-v139
   Forces immediate activation so new files are served right away.
   Cache-busted by version string in cache name. */
const C = "surya-v139";
const A = [
  "./", "./index.html", "./app.js",
  "./surya-avatars.js", "./gita-quotes.js", "./ayurvedic-diet.js", "./reel-generator.js", "./manache-shlok.js", "./settings-engine.js",
  "./hanuman_watermark.png", "./surya_master_emblem.png",
  "./surya_animated_logo.svg", "./surya_animated_ivory.svg", "./surya_animated_seal.svg",
  "./surya_animated_emblem.png", "./surya_animated_emblem.gif",
  "./manifest.json", "./favicon.ico",
  "./icon-192.png", "./icon-512.png",
  "./icon-maskable-192.png", "./icon-maskable-512.png",
  // Flat audio paths (for GitHub direct upload compatibility)
  "./audio/suresh_shlok_1.mp3", "./audio/suresh_shlok_2.mp3", "./audio/suresh_shlok_3.mp3",
  "./audio/suresh_shlok_4.mp3", "./audio/suresh_shlok_5.mp3", "./audio/suresh_shlok_6.mp3",
  "./audio/suresh_shlok_7.mp3", "./audio/suresh_shlok_8.mp3", "./audio/suresh_shlok_9.mp3",
  "./audio/suresh_shlok_10.mp3", "./audio/suresh_shlok_11.mp3", "./audio/suresh_shlok_12.mp3",
  "./audio/lata_shlok_1.mp3", "./audio/lata_shlok_2.mp3", "./audio/lata_shlok_3.mp3",
  "./audio/lata_shlok_4.mp3", "./audio/lata_shlok_5.mp3", "./audio/lata_shlok_6.mp3",
  "./audio/lata_shlok_7.mp3", "./audio/lata_shlok_8.mp3", "./audio/lata_shlok_9.mp3",
  "./audio/lata_shlok_10.mp3", "./audio/lata_shlok_11.mp3", "./audio/lata_shlok_12.mp3",
  // Nested audio paths
  "./audio/manache/suresh/shlok_1.mp3", "./audio/manache/suresh/shlok_2.mp3", "./audio/manache/suresh/shlok_3.mp3",
  "./audio/manache/suresh/shlok_4.mp3", "./audio/manache/suresh/shlok_5.mp3", "./audio/manache/suresh/shlok_6.mp3",
  "./audio/manache/suresh/shlok_7.mp3", "./audio/manache/suresh/shlok_8.mp3", "./audio/manache/suresh/shlok_9.mp3",
  "./audio/manache/suresh/shlok_10.mp3", "./audio/manache/suresh/shlok_11.mp3", "./audio/manache/suresh/shlok_12.mp3",
  "./audio/manache/lata/shlok_1.mp3", "./audio/manache/lata/shlok_2.mp3", "./audio/manache/lata/shlok_3.mp3",
  "./audio/manache/lata/shlok_4.mp3", "./audio/manache/lata/shlok_5.mp3", "./audio/manache/lata/shlok_6.mp3",
  "./audio/manache/lata/shlok_7.mp3", "./audio/manache/lata/shlok_8.mp3", "./audio/manache/lata/shlok_9.mp3",
  "./audio/manache/lata/shlok_10.mp3", "./audio/manache/lata/shlok_11.mp3", "./audio/manache/lata/shlok_12.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(C)
      .then(async cache => {
        // Cache assets resiliently so individual missing files never abort SW installation
        await Promise.allSettled(
          A.map(url => cache.add(url).catch(err => console.warn("[SW] Cache item skipped:", url, err)))
        );
      })
      .then(() => self.skipWaiting())   // ← force activate immediately, don't wait
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== C).map(k => {
          console.log("[SW] Deleting old cache:", k);
          return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())  // ← take control of all open tabs immediately
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const isNav = e.request.mode === "navigate" || e.request.destination === "document";

  if (isNav) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(C).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(async () => {
          const direct = await caches.match(e.request);
          if (direct) return direct;
          const html = await caches.match("./index.html");
          if (html) return html;
          const root = await caches.match("./");
          if (root) return root;
          return new Response("<!DOCTYPE html><html><head><meta http-equiv='refresh' content='2;url=./index.html'></head><body><h3>Reconnecting Surya Sarthi...</h3></body></html>", {
            headers: { "Content-Type": "text/html; charset=utf-8" }
          });
        })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(res => {
        if (res && res.status === 200 && (res.type === "basic" || res.type === "cors")) {
          const clone = res.clone();
          caches.open(C).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});

// Tell all open clients to reload when new SW activates
self.addEventListener("message", e => {
  if (e.data === "skipWaiting") self.skipWaiting();
});

// Lockscreen System Notification Click & Action Handler
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const action = e.action;
  const data = e.notification.data || {};

  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      for (let client of clientList) {
        if ("focus" in client) {
          client.focus();
          client.postMessage({ type: "NOTIFICATION_CLICK", action: action, data: data });
          return;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("./?notif_action=" + (action || data.type || "water"));
      }
    })
  );
});
