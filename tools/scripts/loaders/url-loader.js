// const PATHS = require('../../paths')

module.exports = function CreateURLLoader() {
  return {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
    loader: require.resolve('url-loader'),
    options: {
      limit: 10000,
      name: `[name].[hash:8].[ext]`
    }
  }
}
