// If you add a new loader, remeber to exlude the extension here
// const PATHS = require('../../paths')

module.exports = function CreateFileLoader() {
  return {
    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
      /\.css$/,
      /\.json$/,
      /\.bmp$/,
      /\.gif$/,
      /\.jpe?g$/,
      /\.png$/,
      /\.styl$/,
      /\.(scss|sass)$/
    ],
    loader: require.resolve('file-loader'),
    options: {
      limit: 10000,
      name: `[name].[hash:8].[ext]`
    }
  }
}
