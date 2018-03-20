const fs = require('fs')
const { run } = require('./_utils')
const chalk = require('chalk')
const PATHS = require('../paths')

const Promise = require('bluebird')

const CONFIG = require(PATHS.CONFIG)

const APPROUTES_PATH = `${PATHS.SRC_CLIENT}/containers/App/AppRoutes.js`
const SERVER_PATH = `${PATHS.BUILD}/server.bundle.js`

// Should a server be started
const WITH_SERVER = process.argv.includes('--with-server')

const ReadAppRoutes = () => {
  return run(`cat ${APPROUTES_PATH}`).then(result => result.stdout)
}

function GetRoutesToRender(routesBuffer) {
  const pathRegex = /path="(.+)"/gm
  console.log('Passed buffer: ', routesBuffer)
  if (!pathRegex.test(routesBuffer))
    return Promise.reject(new Error(`Cannot read paths from ${APPROUTES_PATH}`))

  const matches = routesBuffer.match(pathRegex)
  const cleaned = matches.map(x => x.replace('path=', '').replace(/"/g, ''))

  console.log(chalk.green(`Found Routes...`))
  console.log(chalk.yellow(cleaned.join('\n')))

  return Promise.resolve(cleaned)
}

function StartBuildServer(routesToRender = []) {
  console.log(chalk.green(`Starting Server... ${SERVER_PATH}`))
  const server = require(SERVER_PATH)

  return Promise.resolve({ routesToRender, server })
}

function CloseServer(server) {
  const instance = server.getServerInstance()
  return new Promise((resolve, reject) => {
    instance.close(function() {
      console.log(chalk.green(`Closed server`))
      resolve()
    })
  })
}

function RenderOneRoute(routePath) {
  const routeName =
    routePath === '/' || !routePath
      ? 'index.html'
      : routePath.replace('/', '') + '.html'

  const cmd = `curl http://localhost:${CONFIG.NODE_PORT}${routePath} -o ${
    PATHS.BUILD
  }/${routeName}`

  // Render twice to allow critical css to picked up
  return run(cmd).then(() => run(cmd))
}

function RenderRoutes({ routesToRender, server }) {
  if (WITH_SERVER) {
    process.on('exit', () => CloseServer(server))
    process.on('SIGTERM', () => CloseServer(server))
  }

  return Promise.mapSeries(routesToRender, RenderOneRoute).then(
    () => (WITH_SERVER ? CloseServer(server) : Promise.resolve())
  )
}

function GeneratePages() {
  return ReadAppRoutes()
    .then(GetRoutesToRender)
    .then(StartBuildServer)
    .then(RenderRoutes)
    .then(() => {
      console.log(chalk.green(`Routes Rendered`))
    })
    .catch(err => {
      console.log(chalk.red(`GeneratePages errored out`))
      console.error(err)
      return null
    })
}

// Execute it
GeneratePages().then(() => process.exit(0))
