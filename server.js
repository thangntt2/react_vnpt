var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack/dev')

var port = process.env.PORT || 3000

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: false,
  historyApiFallback: true,
  quiet: true
}).listen(port, '0.0.0.0', function (error, result) {
  if (error) {
    console.log(error)
  }

  console.log('Listening at http://localhost:' + port + '!')
})
