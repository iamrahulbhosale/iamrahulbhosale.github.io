// checks if current window is controlled by a service worker or not
// if it's not, then it means service worker will be activated immediately
function windowIsNotControlled() {
  return !navigator.serviceWorker.controller
}

function fetchAndInstallSW() {
  return navigator.serviceWorker
    .register('./sw.js')
    .then(registration => {
      console.log('RegisteredSW: ', registration)
    })
    .catch(err => {
      console.log('ERR_RegisterSW: ', err.message)
      console.error(err)
    })
}

export default function registerServiceWorker() {
  // Don't do anything if service worker is not supported
  if (!navigator.serviceWorker) {
    return
  }

  // Install the service worker after document has loaded
  // so it doesn't interefere with app loading
  window.addEventListener('load', fetchAndInstallSW)
}
