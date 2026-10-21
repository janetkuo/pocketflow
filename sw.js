const CACHE_NAME = 'pocketflow-tracker-v7';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon.svg',
  './icon-maskable.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Helper: Fetch with timeout for fast offline/weak network fallback
function fetchWithTimeout(request, timeoutMs = 2500) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Fetch timed out'));
    }, timeoutMs);

    fetch(request)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isNavigation = event.request.mode === 'navigate';
  const isCoreScript = isSameOrigin && url.pathname.endsWith('app.js');

  // Strategy 1: Network-First for Navigation (HTML) & core app logic (app.js)
  // Ensures updates appear immediately upon refreshing without requiring two reloads
  if (isNavigation || isCoreScript) {
    event.respondWith(
      fetchWithTimeout(event.request, 2500)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline or timed out, fallback to local cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return caches.match('./index.html').then((fallbackHtml) => {
              return fallbackHtml || caches.match('./');
            });
          });
        })
    );
    return;
  }

  // Strategy 2: Cache-First for static assets (icons, manifest, etc.)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.ok && isSameOrigin) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});
