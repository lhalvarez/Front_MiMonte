export default {
	region: process.env.REACT_APP_COGNITO_REGION,
	IdentityPoolId: process.env.REACT_APP_COGNITO_IDENTITYPOOLID,
	UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID,
	ClientId: process.env.REACT_APP_COGNITO_CLIENTID,

	MMEnpoint: process.env.REACT_APP_MMENDPOINT,
	BackendEndpoint: process.env.REACT_APP_BACKENDENDPOINT,

	ConsumidorId: process.env.REACT_APP_MMENDPOINT_CONSUMIDORID,
	DestinoId: process.env.REACT_APP_MMENDPOINT_DESTINOID,

	AppTokenApiMethod: '/token',
	AssetsByClientApiMethod: '/assets',
	AssetsByNumberApiMethod: '/asset',

	UsuariosApiMethod: '/GestionClientes/Cliente/v2/usuarioMonte',
	RegisterVerifyInformationApiMethod: '/GestionClientes/UsuariosMonte/v1/validarDatos',
	RegisterCreateUserApiMethod: '/GestionClientes/UsuariosMonte/v1/solicitarAlta',
	RegisterResendTokenApiMethod: '/GestionClientes/UsuariosMonte/v1/validarMedioContacto',
	
	AuthenticationResetPasswordApiMethod: '/GestionClientes/UsuariosMonte/v1/solicitarReinicioContrasena',
	AuthenticationChangePasswordApiMethod: '/GestionClientes/UsuariosMonte/v1/registrarContrasena',

	UseMocks: process.env.REACT_APP_USE_MOCKS,

	SERVER_APP_TOKEN_CLIENT_ID:"e24fe3a5-43db-4c83-99ea-e0723e9a9c93",
	SERVER_APP_TOKEN_CLIENT_SECRET:"0d7f208d-0a5b-4225-984d-fd431336",
	NPM_END_POINT:"https://dcpsoadapi1.nmp.com.mx:8089/NMP/oauth/token",
	NPM_PDF_ENDPOINT:"http://10.30.3.15:8011/NMP/OperacionPrendaria/EstadoCuenta/v1/PDF",
	NPM_XML_ENDPOINT:"https://dcpsoadapi1.nmp.com.mx:8089/NMP/OperacionPrendaria/EstadoCuenta/v1/",

	BACKEND_SERVER: process.env.BACKEND_SERVER
	
}

