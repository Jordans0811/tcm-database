const CACHE_VERSION = 'v128';
const APP_CACHE = `tcm-app-${CACHE_VERSION}`;
const IMAGE_CACHE = `tcm-images-${CACHE_VERSION}`;

const INITIAL_CACHED_RESOURCES = [
  './',
  './index.html',
  './manifest.json',
  './tcm-stopwords.js',
  './tcm-keywords.js',
  './tcm-semantic-map.js',
  './tcm-lexicon.js',
  './tcm-graph.js',
  './tcm-inference-engine.js',
  './tcm-quiz.js',
  './tcm-occlusion.js',
  './distractors.js'
];

const EXTERNAL_PDFJS_RESOURCES = [
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

// 1. Install Event: Lock the core files in the vault immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE).then(async cache => {
      await cache.addAll(INITIAL_CACHED_RESOURCES);
      await Promise.allSettled(
        EXTERNAL_PDFJS_RESOURCES.map(url => cache.add(new Request(url, { mode: 'cors' })))
      );
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Clean up only old versioned app/image caches (never delete tcm-data-vault!)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if ((key.startsWith('tcm-app-') || key.startsWith('tcm-images-')) && !key.includes(CACHE_VERSION)) {
          return caches.delete(key);
        }
      })
    )).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Intercept network traffic
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // A. Bypass API endpoints & Google Apps Script redirects completely
  if (
    url.hostname.includes('script.google.com') ||
    url.hostname.includes('script.googleusercontent.com') ||
    url.hostname.includes('workers.dev')
  ) {
    return;
  }

  // B. Handle Photos (Cache First, fallback to Network, never cache 404/500 errors)
  if (url.pathname.includes('/DeadmanPhotos/')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(IMAGE_CACHE).then(cache => cache.put(event.request, clone));
          }
          return networkResponse;
        }).catch(() => new Response('', { status: 503, statusText: 'Image offline' }));
      })
    );
    return;
  }

  // C. Handle Everything Else (HTML, JS, Manifest) with offline navigation fallback
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('', { status: 503, statusText: 'Offline' });
      });
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
