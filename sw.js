const CACHE_VERSION = 'v24';
const APP_CACHE = `tcm-app-${CACHE_VERSION}`;
const IMAGE_CACHE = `tcm-images-${CACHE_VERSION}`;

const INITIAL_CACHED_RESOURCES = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Install Event: Lock the core files in the vault immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE).then(cache => cache.addAll(INITIAL_CACHED_RESOURCES))
  );
  self.skipWaiting();
});

// 2. Activate Event: Clean up old versions if you update the app
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!key.includes(CACHE_VERSION)) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

// 3. Fetch Event: Intercept network traffic
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // A. Handle Google Apps Script Data (Network First, fallback to offline cache)
  if (url.hostname.includes('script.google.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Only cache GET requests (downloading the database), not POSTs (saving notes)
          if (event.request.method === 'GET') {
            const clone = response.clone();
            caches.open(APP_CACHE).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request)) // If offline, serve the last downloaded JSON
    );
    return;
  }

  // B. Handle Photos (Cache First, fallback to Network, save new photos invisibly)
  if (url.pathname.includes('/DeadmanPhotos/')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse; // Instantly serve from offline vault
        
        // If photo isn't in vault, download it and lock a copy away for next time
        return fetch(event.request).then(networkResponse => {
          const clone = networkResponse.clone();
          caches.open(IMAGE_CACHE).then(cache => cache.put(event.request, clone));
          return networkResponse;
        }).catch(() => new Response('Image offline')); 
      })
    );
    return;
  }

  // C. Handle Everything Else (HTML, Manifest)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// 4. Eager Cache Listener: Silently grab new photos in the background so they are ready offline
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PREFETCH_IMAGES') {
    caches.open(IMAGE_CACHE).then(cache => {
      event.data.urls.forEach(url => {
        // Check if we already have it first to save battery!
        cache.match(url).then(existingResponse => {
          if (!existingResponse) {
            // If we don't have it, go fetch it silently
            fetch(url).then(networkResponse => {
              if (networkResponse.ok) {
                cache.put(url, networkResponse.clone());
              }
            }).catch(err => {
              console.log('Skipping missing or offline photo:', url);
            });
          }
        });
      });
    });
  }
});
