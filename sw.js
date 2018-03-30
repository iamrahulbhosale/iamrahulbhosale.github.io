/* eslint-disable no-restricted-globals */
/* globals importScripts, self */

// [TODO: find a better way to include workbox scripts, if version updates, this will throw an error]
importScripts('workbox-sw.v2.1.3.js')

const sw = new self.WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
})

const fetchWithCacheResponse = url => cache =>
  fetch(url).then(response => {
    return { cache, response }
  })

const putResponseInCacheWithFileName = fileName => ({ cache, response }) =>
  cache.put(fileName, response)

const fetchAndPutInCache = (url, cacheName, fileName) =>
  caches
    .open(cacheName)
    .then(fetchWithCacheResponse(url))
    .then(putResponseInCacheWithFileName(fileName))
    .catch(err => {
      console.log(`Could not open cache: ${cacheName}`)
      return err
    })

function cacheOfflineShell(event) {
  const promises = [
    fetchAndPutInCache('/app-shell.html', 'offline-pages', 'app-shell.html')
  ]

  return Promise.all(promises)
    .then(() => {
      console.log('Finished cacheOfflineShell')
    })
    .catch(console.error.bind(console))
}

/**
 * Checks if a request is a navigation request
 * Navigation requests mean a page change will occur
 * @param {*} event
 */
function isNavigationRequest(event) {
  return (
    event.request.mode === 'navigate' ||
    (event.request.method === 'GET' &&
      event.request.headers.get('accept').includes('text/html'))
  )
}

const handleNavigationRequests = event => {
  if (isNavigationRequest(event)) {
    event.respondWith(caches.match('app-shell.html'))
  }
  // No need to do anything here
  // when the above 'if' block fails
  // Other handlers will get a chance to respond
  // if no handlers are present, the browser handles it
}

function onInstallComplete(event) {
  const promises = [cacheOfflineShell(event)]

  event.waitUntil(
    Promise.all(promises)
      .then(() => {
        console.log('Finished onInstallComplete chain successfully')
      })
      .catch(console.error.bind(console))
  )
}

// Event Listeners
self.addEventListener('install', onInstallComplete)
self.addEventListener('fetch', handleNavigationRequests)

// Runtime caching
sw.router.registerRoute(
  /https:\/\/fonts.googleapis.com/,
  sw.strategies.staleWhileRevalidate({})
)
sw.router.registerRoute(
  /https:\/\/fonts.gstatic.com/,
  sw.strategies.staleWhileRevalidate({})
)

/******  DO NOT TOUCH *******
 * This is filled automatically by workbox-plugin
 */
sw.precache([
  {
    "url": "fonts/font.css",
    "revision": "3e8fcb198959738a51a1ea765b53603f"
  },
  {
    "url": "/public/LivePage.556cc126.chunk.js",
    "revision": "798cfb954072baf9963f20a0778100e9"
  },
  {
    "url": "/public/main.061f6ab5.bundle.css",
    "revision": "38f87d7fe73f0334cf80dd7fbb53efd0"
  },
  {
    "url": "/public/main.a7eb361b.bundle.js",
    "revision": "981fbaaa1ab394900db0641fcc923896"
  },
  {
    "url": "/public/vendors.6f4ea8c1.chunk.js",
    "revision": "405802e2f509af58b22bdaa0fd1b9d3d"
  },
  {
    "url": "/public/vendors.98861e8c.bundle.css",
    "revision": "d95c5bd8dd19eb49f2a05767bc82aaa5"
  }
])
