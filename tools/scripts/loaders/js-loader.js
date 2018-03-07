const PATHS = require('../../paths')

module.exports = function CreateJSLoader() {
  const envOptions = {
    cacheDirectory: process.env.NODE_ENV !== 'production',
    compact: process.env.NODE_ENV === 'production',
    presets: ['react-app']
  }

  return {
    test: /\.(js|jsx)$/,
    include: PATHS.SRC,
    loader: require.resolve('babel-loader'),
    options: envOptions
  }
}
