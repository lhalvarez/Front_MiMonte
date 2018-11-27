// dependencies
const webpackMerge = require('webpack-merge')
// Webpack configuration
const commonConfig = require('./webpack.config.common')
// Configuration
const {
  context,
  entry,
  externals,
  name,
  output,
  optimization,
  plugins,
  stats,
  target
} = require('./configuration')
// Type of configuration
const type = 'server'

module.exports = webpackMerge(commonConfig(type), {
  mode: 'production',
  stats: stats(type),
  context: context(type),
  entry: entry(type),
  externals,
  name: name(type),
  optimization: optimization(type),
  output: output(type),
  plugins: plugins(type),
  target: target(type)
})
