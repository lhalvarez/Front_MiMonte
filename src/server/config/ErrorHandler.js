//! Reparar errores de eslint
/* eslint-disable */
/**
 * Configuration for Errors to
 * manage the logging configurations
 */

const LOGGER = require('../config/Logger').Logger

const AppError = function(err) {
  LOGGER('DEBUG', 'AppError')

  const name = err.name === undefined ? 'Application Error' : err.name
  let msg =
    err.message === undefined
      ? err.description === undefined
        ? ''
        : err.description
      : err.message

  if (!(err instanceof Error)) {
    msg = err
  }

  // To print the stackTrace
  Error.call(this)
  // Error.captureStackTrace(this, arguments.callee)

  err.Error = ''
  err.name = name
  err.descripcionError = msg
  err.status = getErrorStatus(msg)

  LOGGER('ERROR', err)
}

var getErrorStatus = errMessage => {
  let returned

  switch (errMessage) {
    case 'Bad Request': // The request could not be understood by the server
      returned = 400
      break

    case 'Unauthorized': // The request requires user authentication
      returned = 401
      break

    case 'Token expired':
      returned = 401 // authorization has been refused for the credentials
      break

    case 'ValidationError':
      returned = 409 // Conflict
      break

    case 'Internal Server Error':
      returned = 500 // Conflict
      break

    default:
      returned = 500 // Internal server error
      break
  }

  return returned
}

/**
 * wrapper: An error wrapper for errors caught in Mongoose request.
 * It should be called has a callback function.
 * @param {type} res
 * @returns {Function}
 */
module.exports.wrapper = res => err => {
  LOGGER('DEBUG', 'Wrapper...')
  new AppError(err)
  res.status(getErrorStatus(err.name)).send(err)
}

/**
 * handler: It is a generic function to manage generic errors
 * It should be invoqued
 * @param {error} err
 * @param {request} res
 * @returns {router} Returns an error object to client
 */
module.exports.handler = (err, res) => {
  LOGGER('ERROR', 'Handler...')
  LOGGER('ERROR', `err... ${err}`)
  LOGGER('ERROR', `res... ${res}`)

  let name = ''
  err.name.toLowerCase() === 'error' ? (name = err.message) : (name = err.name)

  new AppError(err)

  if (res != undefined) {
    res.status(getErrorStatus(name)).send(err)
  }
}

/**
 * errorHandler: Is the default handler defined to manage uncaught errors or exceptions
 * It shouldn"t be called by the user.
 * @returns {Function}
 */
module.exports.errorHandler = () => (err, req, res) => {
  LOGGER('DEBUG', `errorHandler...: ${err}`)

  let name = ''
  err.name.toLowerCase() === 'error' ? (name = err.message) : (name = err.name)
  err.description = err.message
  err.code = getErrorStatus(name)

  res.status(err.code).send(err)
}

/**
 * Function to create a new Exception
 */
module.exports.NMPException = (type, message) => {
  LOGGER('DEBUG', 'module.exports.NMPException... ')
  this.name = type
  this.message = message
}
/* eslint-enable */
