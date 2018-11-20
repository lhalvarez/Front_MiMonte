// dependencies
const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  App: resolveApp('src/app/'),
  Containers: resolveApp('src/app/containers/'),
  Components: resolveApp('src/app/components/'),
  Api: resolveApp('src/app/features/api'),
  Context: resolveApp('src/app/features/context'),
  Shared: resolveApp('src/shared/'),
  SharedApi: resolveApp('src/shared/api'),
  SharedComponents: resolveApp('src/shared/components'),
  SharedUtils: resolveApp('src/shared/utils/'),
  SharedStyles: resolveApp('src/shared/styles/'),
  SharedImages: resolveApp('src/shared/images/'),
  Server: resolveApp('src/server/')
}
