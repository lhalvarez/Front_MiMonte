// enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'

function entry(type) {
  if (type === 'server') {
    return './serverRender.jsx'
  }

  const entries = {
    main: []
  }

  if (isDevelopment) {
    entries.main.push('webpack-hot-middleware/client', 'react-hot-loader/patch')
  }

  entries.main.push('./client.jsx')

  return entries
}

module.exports = entry
