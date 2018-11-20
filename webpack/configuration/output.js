// dependencies
const path = require('path')

function output(type) {
  if (type === 'server') {
    return {
      filename: 'server.js',
      path: path.resolve(__dirname, '../../dist'),
      libraryTarget: 'commonjs2'
    }
  }

  return {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../public/app'),
    publicPath: '/app/'
  }
}

module.exports = output
