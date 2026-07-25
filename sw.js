const CACHE = 'zverys2-v1';
const FILES = ['./', './index.html', './icon.png', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    // Trinam TIK savo cache'us – github.io visi repo dalinasi vienu origin'u,
    // todėl be prefikso filtro būtų ištrinti ir kitų projektų cache'ai
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k.startsWith('zverys2-') && k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
