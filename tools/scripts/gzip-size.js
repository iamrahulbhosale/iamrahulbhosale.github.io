const Promise = require('bluebird') //eslint-disable-line
const fs = Promise.promisifyAll(require('fs-extra'))
const { run } = require('./_utils') //eslint-disable-line
const gzipSize = require('gzip-size')
const PATHS = require('../paths')
const Table = require('easy-table')
const chalk = require('chalk')

const DIR = PATHS.BUILD_PUBLIC

const noDirectories = (filename = '') =>
  ['js', 'css'].some(x => filename.endsWith(x))

function readBundle() {
  return fs.readdirAsync(DIR).then(list => list.filter(noDirectories))
}

function getGzipSizesOfOne(filename) {
  const result = { filename }
  return fs
    .readFileAsync(`${DIR}/${filename}`, 'utf-8')
    .tap(fileContents => {
      result.original = Buffer.byteLength(fileContents) / 1000
    })
    .then(str => gzipSize.sync(str))
    .then(size => {
      result.size = size / 1000
      return result
    })
}

function getGzipSizes(list) {
  return Promise.mapSeries(list, getGzipSizesOfOne)
}

function prettyPrintSizes(stats) {
  const t = new Table()
  stats.forEach(stat => {
    const compression = Math.floor(stat.size * 100 / stat.original)
    t.cell('filename', stat.filename)
    t.cell('original', stat.original + 'KB')
    t.cell('gzipped', chalk.green(stat.size + 'KB'))
    t.cell('compression', chalk.greenBright(100 - compression + '%'))
    t.newRow()
  })
  console.log(t.toString())
}

// Perform
readBundle()
  .then(getGzipSizes)
  .then(prettyPrintSizes)
  .then(() => process.exit(0))
  .catch(console.error.bind(console))
