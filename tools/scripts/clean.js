const { run } = require('./_utils')
const PATHS = require('../paths')

module.exports = function CleanTask(done) {
  var cmd = `rm -rf ${PATHS.BUILD}/*`
  return run(cmd)
}
