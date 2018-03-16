/**
 * React Server Render Helper
 * Steps to take -
 * 1. Prepare App on Server
 * 2. Prepare Store
 * 3. Prepare data calls
 * 4. Prepare CSS ( critical css )
 * 5. Render react with data
 */

// import { Config } from '../config'
import Promise from 'bluebird'
import createStore from './create-store'
import fetchData from './fetch-data'
import getCriticalCSS from './get-critical-css'
import renderTemplate from './render-template'
import renderPage from './render-page'

const debug = require('debug')('portfolio:renderer')

export function StreamingRenderer(req, res, next) {
  const context = { req, res, next }
  console.time('renderCompletionTime')
  debug('Attempting Streaming Render of ' + req.originalUrl)

  // Affects renderPage and generateCriticalCSS
  context.streamingRender = true

  // Start rendering
  Promise.resolve(context)
    .then(renderTemplate)
    .then(context => getCriticalCSS(context, { generate: false }))
    .then(context => {
      // TTFB
      res.write(context.templateBeforeCSS)
      res.write(context.criticalCSS)
      res.write(context.templateBeforeApp)
      debug('Sent html before app')
      return context
    })
    .then(createStore)
    .tap(() => debug('Created Store'))
    .then(renderPage)
    .then(() => {
      const stream = context.html
      stream.pipe(res, { end: false })
      stream.on('end', () => {
        debug('Sent react app')
        res.write(context.templateAfterApp)
        res.end()
        debug('Sent html after app')
      })

      if (!context.criticalCSS) {
        debug('Critical CSS will be generated now')
        context.renderStream = stream
        return getCriticalCSS(context)
      }

      return true
    })
    .tap(() => {
      debug('Success')
      console.timeEnd('renderCompletionTime')
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
}

export default function Renderer(req, res, next) {
  const context = { req, res, next }
  console.time('renderCompletionTime')
  debug('Attempting render of ' + req.originalUrl)

  // Order of steps is important
  Promise.resolve(context)
    .then(createStore)
    .tap(() => debug('Store created'))
    .then(fetchData)
    .tap(() => debug('Fetched required data'))
    .then(renderTemplate)
    .tap(() => debug('Rendererd template'))
    .then(renderPage)
    .tap(() => debug('Rendererd react'))
    .then(getCriticalCSS)
    .tap(() => debug('Extracted critical css'))
    .then(context => {
      // If a redirect was found
      if (context.renderContext.url) {
        debug('Redirect was found to : ' + context.renderContext.url)
        res.writeHead(301, { Location: context.renderContext.url })
        res.end()
        return true
      }

      // Right now the app is rendered before already
      res.write(context.templateBeforeCSS)
      res.write(context.criticalCSS)
      res.write(context.templateBeforeApp)
      res.write(context.html)
      res.write(context.templateAfterApp)
      res.end()

      debug('Success')
      console.timeEnd('renderCompletionTime')

      return true
    })
    .catch(err => {
      next(err)
    })
}
