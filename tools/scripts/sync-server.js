const chalk = require('chalk')
const Webpackserver = require('webpack-dev-server')

var server

function makeserver(compiler, webpackConfig, config) {
  server = new Webpackserver(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: { colors: true, chunks: false, modules: false },
    index: '',
    compress: true,
    contentBase: false,
    hot: true,
    overlay: true,
    watchOptions: {
      ignored: /node_modules/
    },
    port: config.PROXY_PORT,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '**': 'http://0.0.0.0:' + config.NODE_PORT
    }
  })

  return server
}

function startServer(server, config) {
  return new Promise((resolve, reject) => {
    server.listen(config.PROXY_PORT, '0.0.0.0', err => {
      if (err) {
        console.log(chalk.red('Could not start dev server'))
        return reject(err)
      }
      console.log(chalk.cyan('Starting dev server...'))
      resolve(server)
    })
  })
}

function exitDevServer() {
  server && server.close()
  console.log(chalk.green('Server Stopped'))
}

process.on('SIGINT', exitDevServer)
process.on('SIGTERM', exitDevServer)

module.exports = function startSyncServer(compiler, webpackConfig, config) {
  const server = makeserver(compiler, webpackConfig, config)
  return startServer(server, config)
}
