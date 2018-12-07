// dependencies
const webpackMerge = require('webpack-merge')
// Webpack configuration
const commonConfig = require('./webpack.config.common')
const {
  context,
  devtool,
  entry,
  name,
  output,
  optimization,
  plugins,
  stats,
  target
} = require('./configuration')

// Type of configuration
const type = 'client'

module.exports = webpackMerge(commonConfig(type), {
  mode: 'development',
  stats: stats(type),
  context: context(type),
  devtool: devtool(type),
  entry: entry(type),
  name: name(type),
  output: output(type),
  optimization: optimization(type),
  plugins: plugins(type),
  target: target(type)
})
