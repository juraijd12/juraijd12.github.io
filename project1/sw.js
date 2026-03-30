const CACHE_NAME = 'product-landing-v2';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './manifest.json',
  './images/logo-design.png',
  './images/logo-192.png',
  './images/logo-512.png',
  './images/apple-touch-icon.png',
  './images/favicon-32.png',
  './images/favicon-16.png',
  './images/favicon.ico',
  './images/og-image.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
