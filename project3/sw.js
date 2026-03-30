const CACHE_NAME = 'service-business-v3';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './manifest.json',
  './images/fr_logo.png',
  './images/logo-192.png',
  './images/logo-512.png',
  './images/apple-touch-icon.png',
  './images/favicon-32.png',
  './images/favicon-16.png',
  './images/favicon.ico',
  './images/og-image.png',
  './images/hero-kitchen.jpg',
  './images/hero-kitchen.webp',
  './images/project-kitchen.jpg',
  './images/project-kitchen.webp',
  './images/project-bathroom.jpg',
  './images/project-bathroom.webp',
  './images/project-living.jpg',
  './images/project-living.webp',
  './images/gallery-materials.jpg',
  './images/gallery-materials.webp',
  './images/gallery-site.jpg',
  './images/gallery-site.webp',
  './images/gallery-detail.jpg',
  './images/gallery-detail.webp',
  './thank-you.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
