//! Reparar errores de eslint
const [PROTOCOL, HOST, PORT] = process.env.BACKEND_CAT.split('#')
const [
  PROTOCOL_OAUTH,
  HOST_OAUTH,
  PORT_OAUTH
] = process.env.BACKEND_OAUTH.split('#')
const [PROTOCOL_BPM, HOST_BPM, PORT_BPM] = process.env.BACKEND_BPM.split('#')
module.exports = {
  FEATURE_PRE_REGISTER: process.env.FEATURE_PRE_REGISTER,

  LEVEL_LOG:
    process.env.LEVEL_LOG === undefined ? 'TRACE' : process.env.LEVEL_LOG,

  BASIC: 'Basic ',
  BEARER: 'Bearer ',
  APP_NM: process.env.APP_NM,
  APP_ID: process.env.APP_ID,
  PSW_ID: process.env.PSW_ID,
  APP_PL: process.env.APP_PL,
  PSW_PL: process.env.PSW_PL,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  API_SET_ID_OPENPAY: process.env.API_SET_ID_OPENPAY,
  API_KEY_OPENPAY: process.env.API_KEY_OPENPAY,

  USER_POOL_ID: process.env.USER_POOL_ID,
  CLIENT_ID: process.env.CLIENT_ID,

  STATE_ACTIVO: 1,

  // eslint-disable-next-line no-array-constructor
  CATEGORIES: new Array(
    'App',
    'Utils.HTTPRequest',
    'Routes.Auth',
    'Routes.UserInfo',
    'Routes.Register'
  ),

  LOGGER_DEFAULT: 0,
  LOGGER_EXAMPLE: 1,
  LOGGER_AUTH: 2,
  LOGGER_USER_INFO: 3,
  LOGGER_USER_TICKETS: 4,
  LOGGER_DETAILS_TICKET: 5,
  LOGGER_REGISTER: 6,
  LOGGER_CARD_REGISTRATION: 7,
  LOGGER_MOVEMENTS: 8,
  LOGGER_PAY_ON_LINE: 9,

  PROTOCOL,
  HOST,
  PORT,

  METHOD_POST: 'POST',
  METHOD_GET: 'GET',
  METHOD_PUT: 'PUT',
  METHOD_DELETE: 'DELETE',

  SERVICE_TOKEN_OAUTH: {
    ID_CONSUMIDOR: '25',
    ID_DESTINO: '14',
    SERVER_APP_TOKEN_CLIENT_ID: process.env.OAUTH_TOKEN_CLIENT_ID,
    SERVER_APP_TOKEN_CLIENT_SECRET: process.env.OAUTH_TOKEN_CLIENT_SECRET,
    PROTOCOL: PROTOCOL_OAUTH,
    HOST: HOST_OAUTH,
    PORT: PORT_OAUTH,
    PATH: '/NMP/oauth/token',
    PATH_REGISTRY_PWD:
      '/NMP/GestionClientes/UsuariosMonte/v1/registrarContrasena',
    PATH_RESTART_PWD:
      '/NMP/GestionClientes/UsuariosMonte/v1/solicitarReinicioContrasena'
  },
  SERVICE_USER_INFO: {
    ID_CONSUMIDOR: '25',
    ID_DESTINO: '14',
    PROTOCOL: PROTOCOL_BPM,
    HOST: HOST_BPM,
    PORT: PORT_BPM,
    PATH: '/NMP/GestionClientes/Cliente/v2/usuarioMonte',
    PATH_CLIENT_LEVEL: '/NMP/GestionClientes/NivelCliente/v1'
  },
  SERVICE_REGISTER: {
    ID_CONSUMIDOR: '25',
    ID_DESTINO: '14',
    PROTOCOL: PROTOCOL_BPM,
    HOST: HOST_BPM,
    PORT: PORT_BPM,
    PATH: '/NMP/GestionClientes/UsuariosMonte/v1/validarDatos',
    PATH_CREATE_USER: '/NMP/GestionClientes/UsuariosMonte/v1/solicitarAlta',
    PATH_VALIDATE_MEDIA_CONTACT:
      '/NMP/GestionClientes/UsuariosMonte/v1/validarMedioContacto',
    PATH_ACTIVATE_ACCOUNT:
      '/NMP/GestionClientes/UsuariosMonte/v1/solicitarActivacion'
  },
  SERVICE_USER_TICKETS: {
    ID_CONSUMIDOR: '25',
    ID_DESTINO: '14',
    PROTOCOL: PROTOCOL_BPM,
    HOST: HOST_BPM,
    PORT: PORT_BPM,
    PATH: '/NMP/OperacionPrendaria/Partidas/v1/Cliente'
  },
  SERVICE_DETAILS_TICKET: {
    ID_CONSUMIDOR: '25',
    ID_DESTINO: '14',
    PROTOCOL: PROTOCOL_BPM,
    HOST: HOST_BPM,
    PORT: PORT_BPM,
    PATH: '/NMP/OperacionPrendaria/Partidas/v1/Folio'
  },
  SERVICE_STATEMENT_ACCOUNT_PDF: {
    ID_CONSUMIDOR: '25',
    ID_DESTINO: '14',
    PROTOCOL: PROTOCOL_BPM,
    HOST: HOST_BPM,
    PORT: PORT_BPM,
    PATH: '/NMP/OperacionPrendaria/EstadoCuenta/v1/PDF'
  },
  SERVICE_MOVEMENTS: {
    ID_CONSUMIDOR: '25',
    ID_DESTINO: '100',
    PROTOCOL: PROTOCOL_BPM,
    HOST: HOST_BPM,
    PORT: PORT_BPM,
    PATH:
      '/NMP/OperacionPrendaria/OperacionesEnLinea/Transaccion.svc/v1/Movimientos',
    PATH_RECIBOS:
      '/NMP/OperacionPrendaria/OperacionesEnLinea/Transaccion.svc/v1/Recibos'
  },
  SERVICE_PAY_ON_LINE: {
    ID_CONSUMIDOR: '25',
    ID_DESTINO: '100',
    PROTOCOL: PROTOCOL_BPM,
    HOST: HOST_BPM,
    PORT: PORT_BPM,
    PATH:
      '/NMP/OperacionPrendaria/OperacionesEnLinea/Transaccion.svc/v1/Transaccion'
  },
  SERVICE_CARD_REGISTRATION: {
    PATH: 'mimonte/v1/tarjetas/cliente',
    PATH_SAVE_CARD: 'mimonte/v1/tarjeta',
    PATH_DELETE_CARD: 'mimonte/v1/tarjeta',
    PATH_UPDATE_CARD: 'mimonte/v1/tarjeta/update'
  }
}
