// dependencies
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const cssnano = require('cssnano')
// enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'

function optimization(type) {
  const optimizations = {
    splitChunks: {
      cacheGroups: {
        default: false,
        // vendors chunk
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/].*js/,
          chunks: 'all',
          priority: 20,
          reuseExistingChunk: true
        },
        // commons chunk
        commons: {
          name: 'commons',
          chunks: 'async',
          enforce: true,
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true
        },
        styles: {
          name: 'main',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          minChunks: Infinity
        }
      }
    },
    minimize: true,
    minimizer: []
  }

  if (!isDevelopment || type === 'server') {
    optimizations.minimizer.push(
      new TerserPlugin({
        cache: false,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        terserOptions: {
          ecma: 8,
          warnings: false, // Suppress terser warnings
          keep_classnames: undefined,
          keep_fnames: false,
          toplevel: false,
          ie8: false,
          safari10: false
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true
      })
    )
  }

  return optimizations
}

module.exports = optimization
