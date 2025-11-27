// Service Worker for Bhagavad Gita PWA
const CACHE_NAME = 'bhagavad-gita-v1.0.0';
const OFFLINE_PAGE = '/index.html';

// Resources to cache for offline functionality
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/chapter.js',
  '/manifest.json',
  '/data/gita-metadata.json',
  '/data/chapter-1.json',
  // Add all chapter HTML files
  '/chapter1.html',
  '/chapter2.html',
  '/chapter3.html',
  '/chapter4.html',
  '/chapter5.html',
  '/chapter6.html',
  '/chapter7.html',
  '/chapter8.html',
  '/chapter9.html',
  '/chapter10.html',
  '/chapter11.html',
  '/chapter12.html',
  '/chapter13.html',
  '/chapter14.html',
  '/chapter15.html',
  '/chapter16.html',
  '/chapter17.html',
  '/chapter18.html',
  // External fonts and CDN resources
  'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600&family=Noto+Sans+Devanagari:wght@400;500&display=swap'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker: Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: App shell cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activate event');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return response;
        }

        console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_PAGE);
            }
          });
      })
  );
});

// Background sync for bookmarks
self.addEventListener('sync', event => {
  if (event.tag === 'sync-bookmarks') {
    console.log('Service Worker: Syncing bookmarks');
    event.waitUntil(syncBookmarks());
  }
});

// Sync bookmarks function
async function syncBookmarks() {
  try {
    // Get bookmarks from IndexedDB and sync if needed
    const bookmarks = await getBookmarksFromIndexedDB();
    console.log('Service Worker: Bookmarks synced', bookmarks);
  } catch (error) {
    console.error('Service Worker: Bookmark sync failed:', error);
  }
}

// IndexedDB helper function (placeholder)
async function getBookmarksFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BhagavadGitaDB', 1);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['bookmarks'], 'readonly');
      const store = transaction.objectStore('bookmarks');
      const getRequest = store.getAll();
      
      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => reject(getRequest.error);
    };
  });
}

// Push notifications for daily verses
self.addEventListener('push', event => {
  const options = {
    body: 'Your daily verse from the Bhagavad Gita is ready',
    icon: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=192&h=192&q=80',
    badge: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=72&h=72&q=80',
    tag: 'daily-verse',
    data: {
      url: '/index.html#daily'
    },
    actions: [
      {
        action: 'read-now',
        title: 'Read Now'
      },
      {
        action: 'bookmark',
        title: 'Bookmark'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Daily Wisdom from Bhagavad Gita', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'read-now' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/index.html#daily');
      })
    );
  } else if (event.action === 'bookmark') {
    // Handle bookmarking action
    event.waitUntil(
      self.registration.showNotification('Verse bookmarked!', {
        body: 'Added to your spiritual reading list',
        icon: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=192&h=192&q=80',
        tag: 'bookmark-success'
      })
    );
  }
});

// Message handling for client communication
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});