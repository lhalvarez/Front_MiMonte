function target(type) {
  const targets = type === 'server' ? 'node' : 'web'

  return targets
}

module.exports = target
