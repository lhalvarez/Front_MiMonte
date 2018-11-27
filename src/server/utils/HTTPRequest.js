//! Reparar errores de eslint
/* eslint-disable */
const http = require('http')
const https = require('https')
const querystring = require('querystring')
const fs = require('fs')
const request = require('request')

const HANDLER = require('../config/ErrorHandler').handler
const LOGGER = require('../config/Logger').Logger
const CONFIG = require('../config')

const LOGGER_REQUEST = CONFIG.LOGGER_REQUEST

module.exports.doRequestRest = (
  protocol,
  host,
  port,
  endpoint,
  method,
  headers,
  body,
  onSuccess,
  onError
) => {
  let dataString

  const options = {
    protocol,
    host,
    port,
    path: endpoint,
    method,
    headers,
    query: dataString
  }

  let link

  if (protocol === 'https:') {
    options.requestCert = true
    options.rejectUnauthorized = false
    link = https
  } else {
    link = http
  }

  if (method === 'GET' || method === 'DELETE') {
    dataString = querystring.stringify(body)
    options.path = `${options.path}?${dataString}`
  } else {
    dataString = JSON.stringify(body)
  }

  LOGGER('DEBUG', `OPTIONS: ${JSON.stringify(options)}`, LOGGER_REQUEST)

  LOGGER('DEBUG', `BODY: ${dataString}`, LOGGER_REQUEST)

  const req = link.request(options, res => {
    res.setEncoding('utf8')
    let responseString = ''

    res.on('data', chunk => {
      responseString += chunk
    })

    res.on('end', () => {
      LOGGER('DEBUG', `RESPONSE: ${responseString}`, LOGGER_REQUEST)

      if (res.statusCode == 404) {
        const error = {
          status: res.statusCode,
          error: 'Server Error',
          message: responseString,
          path: options.path
        }

        onError(JSON.stringify(error))
      } else if (res.statusCode == 200 || res.statusCode == 201) {
        try {
          onSuccess(responseString)
        } catch (e) {
          const error = {
            status: 500,
            error: 'Server Error',
            message: 'Error en Negocio',
            path: options.path
          }

          onError(JSON.stringify(error))
        }
      } else {
        try {
          onError(responseString)
        } catch (e) {
          const error = {
            status: 500,
            error: 'Server Error',
            message: 'Error en Negocio',
            path: options.path
          }

          onError(JSON.stringify(error))
        }
      }
    })
  })

  if (method !== 'GET') {
    req.write(dataString)
  }

  req.on('error', e => {
    HANDLER(e)
    onError(JSON.stringify(e))
  })
  req.end()
}

module.exports.doRequestRestURLEncoded = (
  protocol,
  host,
  port,
  endpoint,
  method,
  headers,
  body,
  onSuccess,
  onError
) => {
  const data = querystring.stringify(body)

  const options = {
    protocol,
    host,
    port,
    path: endpoint,
    method,
    headers
  }

  let link

  if (protocol === 'https:') {
    options.requestCert = true
    options.rejectUnauthorized = false

    link = https
  } else {
    link = http
  }

  LOGGER('DEBUG', `OPTIONS: ${JSON.stringify(options)}`, LOGGER_REQUEST)

  LOGGER('DEBUG', `BODY: ${data}`, LOGGER_REQUEST)

  const req = link.request(options, res => {
    res.setEncoding('utf8')
    let responseString = ''

    res.on('data', chunk => {
      responseString += chunk
    })

    res.on('end', () => {
      LOGGER('DEBUG', `RESPONSE: ${responseString}`, LOGGER_REQUEST)

      if (res.statusCode == 404) {
        const error = {
          status: res.statusCode,
          error: 'Server Error',
          message: responseString,
          path: options.path
        }

        onError(JSON.stringify(error))
      } else if (res.statusCode == 200 || res.statusCode == 201) {
        onSuccess(responseString)
      } else {
        onError(responseString)
      }
    })
  })

  req.write(data)
  req.on('error', e => {
    HANDLER(e)
    onError(e)
  })
  req.end()
}

module.exports.doRequestRestFormData = (
  uri,
  method,
  headers,
  data,
  onSuccess,
  onError
) => {
  const arr = []

  let obj = JSON.parse(data.body.json)

  const tmpIndex = obj.nombre.lastIndexOf('.')

  const tmpNombre = obj.nombre.substr(0, tmpIndex)

  const tmpExt = obj.nombre.substr(tmpIndex)
  obj.nombre = `${tmpNombre}_${new Date().toISOString().slice(0, 10)}${tmpExt}`
  obj.nombre = encodeURI(obj.nombre)
  obj = Object.assign({}, obj, { usuarioModifica: headers.usuario })

  arr.push({
    'Content-Type': 'multipart/form-data; charset=utf-8',
    'Content-Transfer-Encoding': '8bit',
    body: JSON.stringify(obj)
  })

  data.files.map(file => {
    arr.push({
      'Content-Type': `application/octet-stream; charset=utf-8; name="${
        file.originalname
      }"`,
      'Content-Transfer-Encoding': 'binary',
      'Content-Disposition': `form-data; name="${
        file.originalname
      }"; filename="${file.originalname}"`,
      body: fs.createReadStream(file.path)
    })

    headers = Object.assign({}, headers, { 'Content-Length': file.size })
  })

  const options = {
    method,
    preambleCRLF: true,
    postambleCRLF: true,
    uri,
    headers,
    multipart: {
      chunked: false,
      data: arr
    }
  }

  options.requestCert = true
  options.rejectUnauthorized = false

  LOGGER('DEBUG', `OPTIONS: ${JSON.stringify(options)}`, LOGGER_REQUEST)

  LOGGER('DEBUG', `BODY: ${data}`, LOGGER_REQUEST)

  request(options, (error, response, body) => {
    if (error) {
      LOGGER('ERROR', `Upload failed:${error}`, LOGGER_REQUEST)
      onError({ Error: 'Error enviando los archivos' })
    }

    LOGGER('DEBUG', `Server responded with:${body}`, LOGGER_REQUEST)

    try {
      onSuccess(body)
    } catch (e) {
      const error = {
        status: 500,
        error: 'Server Error',
        message: 'Error en Negocio',
        path: options.uri
      }

      onError(JSON.stringify(error))
    } finally {
      data.files.map(file => {
        fs.unlink(file.path)
      })
    }
  })
}
/* eslint-enable */
