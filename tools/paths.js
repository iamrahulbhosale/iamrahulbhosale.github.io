const path = require('path')
const ROOT = path.resolve(__dirname, '../')

const BUILD_DIR = process.env.DIST_MODE === '1' ? 'dist' : 'build'

module.exports = {
  ROOT: ROOT,

  CONFIG: `${ROOT}/config.js`,

  SRC: `${ROOT}/src`,
  SRC_CLIENT: `${ROOT}/src/client`,
  SRC_PUBLIC: `${ROOT}/src/public`,
  SRC_SERVER: `${ROOT}/src/server`,
  SRC_SERVER_VIEWS: `${ROOT}/src/server/views`,

  BUILD: `${ROOT}/${BUILD_DIR}`,
  BUILD_PUBLIC: `${ROOT}/${BUILD_DIR}/public`,
  BUILD_SERVER_VIEWS: `${ROOT}/${BUILD_DIR}/views`,

  NODE_MODULES: `${ROOT}/node_modules`,

  STYLUS_BASE: `${ROOT}/src/ui-framework/index.styl`,
  SCSS_BASE: `${ROOT}/src/ui-framework`
}
