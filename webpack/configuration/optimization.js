/* eslint-disable import/no-extraneous-dependencies */
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
        vendors: false,
        // vendor chunk; splitting react and react-dom into a separate chunk
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all',
          priority: 1,
          reuseExistingChunk: true
        },
        // commons chunk
        common: {
          name: 'common',
          chunks: 'async',
          minChunks: 2,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true
        },
        styles: {
          name: 'style',
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
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        terserOptions: {
          ecma: 8,
          warnings: false,
          parse: {},
          compress: {
            dead_code: true,
            global_defs: {
              DEBUG: false
            }
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: true,
          output: {
            comments: false
          },
          toplevel: true,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
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
