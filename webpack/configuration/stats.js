// enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'

function stats() {
  const stat = isDevelopment ? 'verbose' : 'none'

  return stat
}

module.exports = stats
