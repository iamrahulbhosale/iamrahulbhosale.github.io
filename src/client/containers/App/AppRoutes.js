import React from 'react'
import { Switch, Route } from 'react-router-dom'

import getPages from './getStaticRoutes'

// import AuthRoute from 'utils/auth-route'

// Pass location to switch component,
// so that history updates don't block app from re-rendering
export default function AppRoutes(location, auth) {
  const Pages = getPages(location, auth)
  return (
    <Switch location={location}>
      <Route path="/" exact component={Pages.HomePage} />
      <Route path="/live" component={Pages.LivePage} />
      <Route path="/404" component={Pages.NotFoundPage} />
      <Route component={Pages.NotFoundPage} />
    </Switch>
  )
}
