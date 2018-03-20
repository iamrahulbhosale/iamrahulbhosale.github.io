import path from 'path'
import { Router } from 'express'
import { getTemplateData } from '../renderer/render-template' //eslint-disable-line no-unused-vars

const router = Router()

const handleStaticFiles = (req, res, next) => {
  const isIgnored = [/\/public\//, /\/favicon.ico/].some(x =>
    x.test(req.originalUrl)
  )
  if (isIgnored) {
    let fpath = path.resolve(
      __dirname,
      '/public/' + req.originalUrl.replace('/public/', '')
    )
    console.log('handled: ', req.originalUrl, fpath)
    return res.sendFile(fpath)
  }
  next()
}

//eslint-disable-next-line no-unused-vars
const handleAppShellRequest = (req, res, next) => {
  if (req.originalUrl.includes('app-shell.html')) {
    return res.render('index', getTemplateData(req))
  }
  return next()
}

/**
 * [getRouter Returns main router for application]
 * @param  {object} app     [express.js app object]
 * @return {object} router  [express.js router with bound routes]
 */
export default function getRouter(app) {
  // Health check
  router.get('/ping', (req, res) => res.status(200).send('pong'))

  // No server rendering
  // router.get('*', handleStaticFiles, (req, res) => {
  //   res.render('index', getTemplateData(req))
  // })

  // Server rendering
  router.get(
    '*',
    handleStaticFiles,
    handleAppShellRequest,
    require('../renderer').StreamingRenderer
  )

  return router
}
