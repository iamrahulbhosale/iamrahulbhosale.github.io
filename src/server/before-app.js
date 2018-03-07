import _ from 'lodash'
import PrettyError from 'pretty-error'
import errorTheme from './helpers/pe-theme'

require('source-map-support').install()

// Ignore lines if these strings are present in 'addr' of file
const PE_SKIP_PATHS = [
  'webpack/bootstrap', // Hides sub-bootstrap files from webpack
  'bootstrap_node.js' // Hides webpack bootstrap file
]

const formatFilePaths = t => {
  t.shortenedAddr = t.shortenedAddr || ''
  // replace webpack files with shorthand

  t.shortenedAddr = t.shortenedAddr
    .replace(/.+webpack:\//g, 'w:/')
    .replace(/^(.+)src\/server/, 'src/server')

  return t
}

// Errors with better readability in console
const PE = new PrettyError()

PE.skipNodeFiles()
PE.skipPackage('webpack', 'express', 'mysql')
PE.skip(function(traceLine, lineNumber) {
  if (_.isString(traceLine.addr)) {
    traceLine = formatFilePaths(traceLine)
    return PE_SKIP_PATHS.some(x => traceLine.addr.indexOf(x) !== -1)
  }
})

// Custom error theme - easy on the eyes
PE.appendStyle(errorTheme)

// To render exceptions thrown in non-promies code:
process.on('uncaughtException', function(error) {
  console.log(PE.render(error))
})

// To render unhandled rejections created in BlueBird:
process.on('unhandledRejection', function(reason) {
  console.log('Unhandled rejection')
  console.log(PE.render(reason))
})

// Expose to global
global.LOG_ERROR = err => {
  console.log(PE.render(err))
}
