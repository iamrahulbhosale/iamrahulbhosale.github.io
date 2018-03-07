const autoprefixer = require('autoprefixer')

const IS_PROD = process.env.NODE_ENV === 'production'

const _CSS_LOADER = (isServer = false) => ({
  loader: 'css-loader',
  options: {
    minimize: IS_PROD,
    sourceMap: !IS_PROD && !isServer,
    localIdentName: !IS_PROD && '[name]_[local]_[hash:base64:3]'
  }
})

const _POSTCSS_LOADER = (isServer = false) => ({
  loader: require.resolve('postcss-loader'),
  options: {
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['> 3%', 'last 4 versions', 'iOS 7'],
        flexbox: 'no-2009'
      })
    ],
    sourceMap: !IS_PROD && !isServer
  }
})

function CreateCSSLoader(isServer = false) {
  const config = {
    test: /\.css$/,
    use: [require.resolve('style-loader'), _CSS_LOADER(isServer)]
  }

  if (!isServer) {
    config.use.push(_POSTCSS_LOADER(isServer))
  }

  return config
}

module.exports = {
  CreateCSSLoader: CreateCSSLoader,
  _POSTCSS_LOADER: _POSTCSS_LOADER,
  _CSS_LOADER: _CSS_LOADER
}
