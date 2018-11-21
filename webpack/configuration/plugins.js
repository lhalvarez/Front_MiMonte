// dependencies
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
// eslint-disable-next-line
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const Stylish = require('webpack-stylish')
const DashboardPlugin = require('webpack-dashboard/plugin')
// enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'
// Analyzer
const isAnalyzer = process.env.ANALYZER === 'true'

const GLOBALS = {
  'process.env.APP': JSON.stringify(process.env.APP),
  'process.env.baseURL': JSON.stringify(process.env.BACKEND_SERVER),
  'process.env.BACKEND_CAT': JSON.stringify(process.env.BACKEND_CAT),
  'process.env.BACKEND_SERVER': JSON.stringify(process.env.BACKEND_SERVER),
  'process.env.BACKEND_BPM': JSON.stringify(process.env.BACKEND_BPM),
  'process.env.BACKEND_OAUTH': JSON.stringify(process.env.BACKEND_OAUTH),
  'process.env.BACKEND_PROFILE': JSON.stringify(process.env.BACKEND_PROFILE),
  'process.env.BACKEND_ROLE': JSON.stringify(process.env.BACKEND_ROLE),
  'process.env.USER_POOL_ID': JSON.stringify(process.env.USER_POOL_ID),
  'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID)
}

function plugins() {
  const plugin = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: '../../public/css/style.css'
    }),
    new Stylish(),
    new webpack.DefinePlugin(GLOBALS)
  ]

  if (isAnalyzer) {
    plugin.push(
      new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
      new DashboardPlugin()
    )
  }

  if (isDevelopment) {
    plugin.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new DashboardPlugin()
    )
  } else {
    plugin.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new HtmlWebpackPlugin({ minify: true })
    )
  }

  return plugin
}

module.exports = plugins
