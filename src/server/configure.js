/*eslint-env node*/
import fs from 'fs'
import express from 'express'
import path from 'path'
import Promise from 'bluebird'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'

import getRouter from './routes/index'

//eslint-disable-next-line no-unused-vars
import { printAsTable } from './helpers/common'

import { CachedFileResponseMiddleware } from './helpers/common'

//eslint-disable-next-line
import { Config } from './config'

const debug = require('debug')('react-app:server/configure')

// Read external dependencies here
// configs, buffers etc
export function readDependencies(app) {
  const assets_path = path.resolve(__dirname, './public/asset-manifest.json')

  debug('Webpack Assets from: ' + assets_path)

  try {
    var assets = JSON.parse(fs.readFileSync(assets_path, 'utf-8'))
  } catch (e) {
    return Promise.reject(new Error('Cannot read webpack assets'))
  }

  app.set('webpack_assets', assets)
  app.locals.webpack_assets = assets

  // debug('Found assets:')
  // printAsTable(assets)

  return Promise.resolve(app)
}

// configure the express app
export function configureServer(app) {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'pug')

  // Enables templates to decide env related behaviour
  app.locals.is_prod = process.env.NODE_ENV === 'production'

  // Enables pretty printing of pugjs templates in dev mode
  app.locals.pretty =
    process.env.DIST_MODE === '1' || process.env.NODE_ENV !== 'production'

  // Logger
  // 'combined' is standard apache log format
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Use compression
  if (process.env.DIST_MODE !== '1') app.use(compression())

  const staticOptions = {}

  if (process.env.NODE_ENV === 'production') {
    staticOptions.maxAge = '30 days'
  }

  // Static assets should be served without cookies
  // and ideally through a cdn
  app.use(
    '/public',
    express.static(path.join(__dirname, 'public'), staticOptions)
  )

  // Serve service worker from root
  app.get(
    '/sw.js',
    CachedFileResponseMiddleware(__dirname + '/public/sw.js', 'text/javascript')
  )
  app.get(
    '/workbox-sw.js',
    CachedFileResponseMiddleware(
      __dirname + '/public/workbox-sw.js',
      'text/javascript'
    )
  )

  // Enable cookies after static routes
  app.use(cookieParser())

  // Add routes
  app.use('/', getRouter(app))

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.error_message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

  // Return control to next bootstrapper function
  return Promise.resolve(app)
}
