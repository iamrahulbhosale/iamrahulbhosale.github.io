const Promise = require('bluebird')
const { run } = require('./_utils')
const PATHS = require('../paths')
const fs = require('fs-extra')

// Add pairs of src:dest and they will be moved automatically
const ASSETS = {
  './config.js': `${PATHS.BUILD}/config.js`
}

module.exports = function copyTask(cb) {
  const commands = [
    `mkdir -p ${PATHS.BUILD}/public/vendor`,
    `cp -r src/public ${PATHS.BUILD}/`,
    `cp -r src/server/views ${PATHS.BUILD}/`
  ]

  const manifestPath = `${PATHS.BUILD}/public/vendor-manifest.json`

  if (!fs.existsSync(manifestPath)) commands.push(`echo "{}" > ${manifestPath}`)

  Object.keys(ASSETS).forEach(srcPath => {
    commands.push(`cp -r ${srcPath} ${ASSETS[srcPath]}`)
  })

  return Promise.mapSeries(commands.filter(x => !!x), run)
}
