import NotFoundPage from 'pages/NotFound'
import HomePage from 'pages/HomePage'

// Pass location to switch component, so history updates don't block app from re-rendering
export default function Pages(location, auth) {
  return {
    NotFoundPage,
    HomePage
  }
}
