const CACHE_NAME = 'el-lugar-vFinal';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.jpg',
  './bible_at.json',
  './bible_nt.json',
  './strongs_h1.json',
  './strongs_h2.json',
  './strongs_g.json'
];

// Instalación: Guardar archivos en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activación: Limpiar versiones viejas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

// Estrategia: Cache First (Prioriza lo guardado para que sea instantáneo)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});