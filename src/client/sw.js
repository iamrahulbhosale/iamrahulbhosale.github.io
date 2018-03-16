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
sw.precache([])
