/* eslint-disable no-restricted-globals */
/* globals importScripts, self */

// [TODO: find a better way to include workbox scripts, if version updates, this will throw an error]
importScripts('workbox-sw.v2.1.3.js')

const sw = new self.WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
})

function cacheOfflineShell(event) {
  console.log('will cache app-shell.html')
  event.waitUntil(
    caches
      .open('offline-pages')
      .then(cache => {
        return fetch('/app-shell.html').then(response => {
          cache.put('app-shell.html', response)
        })
      })
      .then(() => {
        console.log('/app-shell.html cached')
      })
      .catch(err => {
        console.log('Could not catch app-shell')
        console.error(err)
      })
  )
}

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

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', cacheOfflineShell)

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
