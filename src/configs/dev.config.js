const path = require('path')
const merge = require('webpack-merge')
const config = require('../../webpack.config')

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    port: 8080,
    open: true,
    inline: true,
    contentBase: path.join(__dirname, 'src')
  }
})
