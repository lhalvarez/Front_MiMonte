const base64 = require('base64topdf')
const fs = require('fs')
const path = require('path')

function createDirectory(directoryPath) {
  const directory = path.normalize(directoryPath)

  return new Promise((resolve, reject) => {
    fs.stat(directory, error => {
      if (error) {
        if (error.code === 'ENOENT') {
          // eslint-disable-next-line no-shadow
          fs.mkdir(directory, error => {
            if (error) {
              reject(error)
            } else {
              resolve(directory)
            }
          })
        } else {
          reject(error)
        }
      } else {
        resolve(directory)
      }
    })
  })
}

const directoryPath = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'tmp',
  'boletas'
)

createDirectory(directoryPath)
  // eslint-disable-next-line no-shadow
  .then(path => {
    // eslint-disable-next-line no-console
    console.log(`Successfully created directory:${path}`)
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log(`Problem creating directory:${error.message}`)
  })

const GenerateDoc = (base64String, res, extension) => {
  base64.base64Decode(base64String, `${directoryPath}/boleta.${extension}`)

  const file = fs.createReadStream(`${directoryPath}/boleta.${extension}`)
  const stat = fs.statSync(`${directoryPath}/boleta.${extension}`)

  res.setHeader('Content-Length', stat.size)
  if (extension === 'pdf') {
    res.setHeader('Content-Type', 'application/pdf')
  } else if (extension === 'xlsx') {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
  } else if (extension === 'xls') {
    res.setHeader('Content-Type', 'application/vnd.ms-excel')
  }

  res.setHeader(
    'Content-Disposition',
    `attachment; filename=boleta.${extension}`
  )

  file.pipe(res)
}

module.exports = { GenerateDoc }
