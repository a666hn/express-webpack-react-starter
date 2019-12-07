const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const getFileFromDir = require('./src/configs/getFileFromDir')

const _PATH__DIR_ = path.join('src', '_pages', path.sep)

const HtmlPlugins = getFileFromDir(_PATH__DIR_, ['.html']).map(filePath => {
  const filename = filePath.replace(_PATH__DIR_, '')
  return new HtmlWebpackPlugin({
    chunks: [filename.replace(path.extname(filename), ''), 'vendor'],
    template: filePath,
    filename,
  })
})

const entry = getFileFromDir(_PATH__DIR_, ['.js']).reduce((obj, filepath) => {
  console.log('OBJ => ', obj)
  console.log('filepath =>', filepath)
  const entryChunkName = filepath.replace(path.extname(filepath), '').replace(_PATH__DIR_, '')
  obj[entryChunkName] = `./${filepath}`
  return obj
}, {})

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.[hash].min.js'
  },
  module: {
    rules: [
      {
        test: /\.j(s|sx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
    new webpack.HotModuleReplacementPlugin(),
    ...HtmlPlugins
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src', 'components')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  }
}
