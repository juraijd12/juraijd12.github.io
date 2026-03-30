const CACHE_NAME = 'restaurant-landing-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/config.js',
  '/main.js',
  '/images/restauran-logo.png',
  '/images/chef.jpg',
  '/images/room.jpg'
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
