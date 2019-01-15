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
const AssetsPlugin = require('assets-webpack-plugin')
// enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'
// Analyzer
const isAnalyzer = process.env.ANALYZER === 'true'

const GLOBALS = {
  'process.env.APP': JSON.stringify(process.env.APP),
  'process.env.baseURL': JSON.stringify(process.env.BACKEND_SERVER),
  'process.env.setId': JSON.stringify(process.env.API_SET_ID_OPENPAY),
  'process.env.setApiPublicKey': JSON.stringify(
    process.env.API_PUBLIC_KEY_OPENPAY
  ),
  'process.env.setApiPrivateKey': JSON.stringify(
    process.env.API_PRIVATE_KEY_OPENPAY
  ),
  'process.env.setSandboxMode': JSON.stringify(process.env.SET_SANDBOX_MODE)
}

function plugins() {
  const plugin = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'React Initial'
    }),
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
