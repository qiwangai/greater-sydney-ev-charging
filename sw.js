/* Sydney EV — minimal offline shell; map tiles always load from network. */
const CACHE = "sydney-ev-pwa-v18";

function scopeUrls() {
  const scope = self.registration.scope;
  return [
    new URL("./", scope).href,
    new URL("index.html", scope).href,
    new URL("manifest.webmanifest", scope).href,
    new URL("icons/icon.svg", scope).href,
    new URL("data/stations.json", scope).href,
  ];
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        await cache.addAll(scopeUrls());
      } catch (e) {
        console.warn("[sw] precache partial", e);
      }
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
