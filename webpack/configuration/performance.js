// enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'

function performances() {
  return {
    hints: !isDevelopment ? 'warning' : false,
    maxAssetSize: 250000,
    maxEntrypointSize: 250000,
    assetFilter(assetFilename) {
      // Function predicate that provides asset filenames
      return (
        assetFilename.endsWith('.css') ||
        assetFilename.endsWith('.js') ||
        assetFilename.endsWith('.jsx')
      )
    }
  }
}

module.exports = performances
