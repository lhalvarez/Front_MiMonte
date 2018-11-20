// configuration
const {
  alias,
  extensions,
  modules,
  rules,
  performance
} = require('./configuration')

module.exports = type => ({
  module: {
    rules: rules(type)
  },
  resolve: {
    extensions,
    modules,
    alias
  },
  performance: performance(type)
})
