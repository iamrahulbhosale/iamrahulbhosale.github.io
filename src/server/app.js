import './before-app'
import express from 'express'

import { configureServer, readDependencies } from './configure'
import { Config, initConfig } from './config'

const debug = require('debug')('portfolio:server')

const app = express()

var serverInstance

const runServer = app => {
  const port =
    process.env.PORT && Number.isInteger(Number(process.env.PORT))
      ? process.env.PORT
      : Config.NODE_PORT

  serverInstance = app.listen(port, function onListentingCB() {
    debug(`Node server on http://127.0.0.1:${port}`)
    if (__DEV__) {
      debug(`Hot  server on http://127.0.0.1:${Config.PROXY_PORT}`)
    }
  })
}

// Startup steps
initConfig(app) // reads config
  .then(readDependencies) // reads webpack assets and other files
  .then(configureServer) // configures express server
  .then(runServer) // run server
  .catch(console.error.bind(console)) // report any startup errors

export function getServerInstance() {
  return serverInstance
}
export default app
