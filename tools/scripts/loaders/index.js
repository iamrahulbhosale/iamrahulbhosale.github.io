module.exports = {
  ESLINT_LOADER: require('./eslint-loader'),
  JS_LOADER: require('./js-loader'),
  CSS_LOADER: require('./css-loader').CreateCSSLoader,
  FILE_LOADER: require('./file-loader'),
  URL_LOADER: require('./url-loader'),
  STYLUS_LOADER: require('./stylus-loader')
  // SASS_LOADER: require('./sass-loader')
}
