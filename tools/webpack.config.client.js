const path = require('path')
const webpack = require('webpack')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const Config = require('../config')

const PATHS = require('./paths')
const LOADERS = require('./scripts/loaders')

const IS_PROD = process.env.NODE_ENV === 'production'
const IS_TEST = process.env.NODE_ENV === 'test'
const IS_DEV = process.env.NODE_ENV === 'development'

const envOption = (prod, dev, test) => {
  return IS_PROD ? prod : IS_TEST ? test : dev
}

// Initialize config
const config = {}

// Don't build in case of errors, on prod
config.bail = IS_PROD

config.mode = IS_PROD ? 'production' : 'development'

// Devtool
config.devtool = envOption('source-map', 'cheap-module-source-map', false)

config.cache = IS_DEV

config.target = 'web'

config.stats = {
  modules: false
}

// css-loader calculates hash based on path and name only
// path is derived from context
// To keep server renders in sync, either use the same context in both webpack configs,
// or read the client generated css in prod
// [TIP: since the hashes are provided by webpack, try to resolve this in hashing itself]
config.context = PATHS.SRC

// Entry
config.entry = {
  main: [PATHS.SRC_CLIENT + '/index.js']
}

// Output
config.output = {
  chunkFilename: '[name].[chunkhash:8].chunk.js',
  filename: IS_PROD ? '[name].[chunkhash:8].bundle.js' : '[name].bundle.js',
  path: PATHS.BUILD_PUBLIC,
  pathinfo: true,
  publicPath: '/public/',
  devtoolModuleFilenameTemplate: info => {
    return path.resolve(info.absoluteResourcePath).replace(process.cwd(), '')
  }
}

// Resolve dependencies strategy
config.resolve = {
  modules: ['node_modules', PATHS.NODE_MODULES, PATHS.SRC_CLIENT],
  extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx', '.styl'],
  plugins: [
    // Prevents importing files outside src
    new ModuleScopePlugin(PATHS.SRC_CLIENT)
  ]
}

config.module = {
  strictExportPresence: true,
  rules: [
    LOADERS.ESLINT_LOADER(),
    LOADERS.FILE_LOADER(),
    LOADERS.URL_LOADER(),
    LOADERS.JS_LOADER(),
    LOADERS.STYLUS_LOADER(),
    // LOADERS.SASS_LOADER(),
    LOADERS.CSS_LOADER()
  ]
}

/////////////
// Plugins //
/////////////

config.plugins = [
  new webpack.DefinePlugin({
    __DEV__: envOption(false, true, false),
    __TEST__: envOption(false, false, true),
    __SERVER__: false,
    'process.env.NODE_ENV': JSON.stringify(
      envOption('production', 'development', 'test')
    )
  }),
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: '/public/'
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: PATHS.SRC
    },
    minimize: IS_PROD,
    debug: !IS_PROD
  })
]

// Dev mode specific plugins
if (IS_DEV) {
  config.plugins = [new webpack.HotModuleReplacementPlugin(), ...config.plugins]

  config.entry.main = [
    require.resolve('react-hot-loader/patch'),
    // require.resolve('webpack-hot-middleware/client'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('react-error-overlay'),
    ...config.entry.main
  ]
}

if (IS_PROD) {
  config.entry.vendors = [PATHS.SRC_CLIENT + '/vendors.js']
  config.plugins = [
    new webpack.NormalModuleReplacementPlugin(
      /\.\/getStaticRoutes/,
      './getDynamicRoutes'
    ),
    new ExtractTextPlugin({
      filename: 'main.[contenthash:8].bundle.css',
      allChunks: true
    }),

    new WorkboxWebpackPlugin({
      globDirectory: PATHS.BUILD_PUBLIC,
      globPatterns: ['**/*.{css,js}'],
      swDest: path.join(PATHS.BUILD_PUBLIC, 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://fonts.googleapis.com'),
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: new RegExp('https://fonts.gstatic.com'),
          handler: 'staleWhileRevalidate'
        }
      ]
    }),

    ...config.plugins
  ]
}

config.optimization = {
  runtimeChunk: false,
  splitChunks: {
    name: true,
    cacheGroups: {
      vendors: {
        name: 'vendors',
        chunks: 'all',
        enforce: true,
        minChunks: 2
      }
    }
  }
}

// Turn off performance hints during development because we don't do any
// splitting or minification in interest of speed. These warnings become
// cumbersome.
config.performance = {
  hints: envOption('warning', false, false)
}

// Dev Server
config.devServer = {
  publicPath: config.output.publicPath,
  stats: { modules: false },
  index: '',
  compress: true,
  contentBase: false,
  hot: true,
  overlay: true,
  watchOptions: {
    ignored: /node_modules/
  },
  port: Config.PROXY_PORT,
  host: '0.0.0.0',
  disableHostCheck: true,
  proxy: {
    '**': 'http://0.0.0.0:' + Config.NODE_PORT
  }
}

module.exports = config
