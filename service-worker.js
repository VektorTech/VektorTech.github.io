const staticCacheName = 'vektor-v1';
const assets = [
  '/',
  '/index.html',
  '/js/icons.js',
  '/js/script.min.js',
  '/style/style.min.css',
  '/favicon.png',
  '/slides/burga.jpg',
  '/slides/dashboard.jpg',
  '/slides/jobboard.jpg',
  '/slides/portfolio.jpg',
  '/manifest.json',
  'https://fonts.googleapis.com/css?family=Inria+Sans&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/fontawesome.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/solid.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/brands.min.css',
];
// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});