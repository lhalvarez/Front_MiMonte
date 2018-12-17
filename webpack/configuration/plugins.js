/* eslint-disable import/no-extraneous-dependencies */
// dependencies
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
// eslint-disable-next-line
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const DashboardPlugin = require('webpack-dashboard/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
/* const BrotliPlugin = require('brotli-webpack-plugin') */
const AssetsPlugin = require('assets-webpack-plugin')
// enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'
// Analyzer
const isAnalyzer = process.env.ANALYZER === 'true'

const GLOBALS = {
  'process.env.APP': JSON.stringify(process.env.APP),
  'process.env.baseURL': JSON.stringify(process.env.BACKEND_SERVER)
}

function plugins() {
  // the path(s) that should be cleaned
  const pathsToClean = [
    path.resolve(__dirname, '../../dist/'),
    path.resolve(__dirname, '../../build')
  ]
  // the clean options to use
  const cleanOptions = {
    verbose: true,
    dry: false,
    watch: false,
    allowExternal: true,
    beforeEmit: true
  }

  const plugin = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }) /* 
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }), */,
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
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
      new HtmlWebpackPlugin({ minify: true }),
      new AssetsPlugin({
        prettyPrint: true,
        filename: 'assets.json',
        path: path.resolve(__dirname, '../../dist/app')
      })
    )
  }

  return plugin
}

module.exports = plugins
