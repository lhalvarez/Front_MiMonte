//! Reparar errores de eslint
/* eslint-disable */
/**
 * Configuration for system logger
 * Logger library: Log4js
 * Encapsulates the logger functions, the main idea is to have a centralized way to
 * manage al logging configurations
 */
const log4js = require('log4js')
const moment = require('moment')

const today = moment(Date.now()).format('YYYYDDMM')

const CONFIG = require('../config')

const appenders = {
  console: {
    type: 'console',
    layout: {
      type: 'pattern',
      pattern: '[%d{ISO8601}] [%[%-5.5p%]] - [%[%-18c%]] %m'
    }
  },
  file: {
    type: 'file',
    filename: `DIS_${today}.log`,
    maxLogSize: 100024,
    backups: 10000,
    layout: {
      type: 'pattern',
      pattern: '[%d{ISO8601}] [%-5.5p] - [%-18c] %m'
    }
  }
}

const categories = {
  default: { appenders: ['console', 'file'], level: CONFIG.LEVEL_LOG }
}

CONFIG.CATEGORIES.map(category => {
  categories[category] = {
    appenders: ['console', 'file'],
    level: CONFIG.LEVEL_LOG
  }
})

log4js.configure({
  appenders,
  categories,
  replaceConsole: true // this will replace the default behavior of the console.log() method
})

/**
 * Establishes a main logger for all conections in the app.
 * @param {express application} app
 * @returns none
 */
module.exports.getConectionsLogger = app => {
  // define logger
  const logger = log4js.getLogger(CONFIG.CATEGORIES[0])
  // logger.setLevel('ERROR')
  /**
   * ### AUTO LEVEL DETECTION
   * http responses 3xx, level = WARN
   * http responses 4xx & 5xx, level = ERROR
   * else.level = INFO
   * app.use(log4js.connectLOGGER(logger, { level: log4js.levels.INFO }))
   * Les details: app.use(log4js.connectLOGGER(logger, { level: "auto", format: ":method :url :status" }))
   * More details:
   */
  app.use(
    log4js.connectLogger(logger, {
      level: 'auto',
      format: ':method :url :status'
    })
  )
}

/**
 * Registers a log message and show it in the console.
 * @param {string} logLevel Possible values: ["TRACE","DEBUG", "INFO","WARN", "ERROR", "FATAL", ]
 * @param {string} logMessage A string with the content to be logged.
 * @returns {none}
 */
module.exports.Logger = (logLevel, logMessage, catalog) => {
  const catalogIndex = catalog || 'TRACE'
  const logger = log4js.getLogger(CONFIG.CATEGORIES[catalogIndex])

  switch (logLevel) {
    case 'TRACE':
      if (logger.isTraceEnabled) logger.trace(logMessage)
      break
    case 'INFO':
      logger.info(logMessage)
      break
    case 'WARN':
      logger.warn(logMessage)
      break
    case 'ERROR':
      logger.error(logMessage)
      break
    case 'FATAL':
      logger.fatal(logMessage)
      break
    default:
      if (logger.isDebugEnabled) logger.debug(logMessage)
      break
  }
}

/*
 * Returns a reference to log4js library with all previous configurations.
 */
module.exports.log4js = log4js
/* eslint-enable */
