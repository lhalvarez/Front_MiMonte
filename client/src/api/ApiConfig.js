export default {
	region: process.env.REACT_APP_COGNITO_REGION,
	IdentityPoolId: process.env.REACT_APP_COGNITO_IDENTITYPOOLID,
	UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID,
	ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
	MMEnpoint: process.env.REACT_APP_MMENDPOINT,

	ConsumidorId: process.env.REACT_APP_MMENDPOINT_CONSUMIDORID,
	DestinoId: process.env.REACT_APP_MMENDPOINT_DESTINOID,
	AppTokenApiMethod: '/oauth/token',
	AssetsByClientApiMethod: '/OperacionPrendaria/Partidas/v1/Cliente',
	RegisterVerifyInformationApiMethod: '/GestionClientes/UsuariosMonte/v1/validarDatos',
	RegisterCreateUserApiMethod: '/GestionClientes/UsuariosMonte/v1/solicitarAlta',
	RegisterResendTokenApiMethod: '/GestionClientes/UsuariosMonte/v1/validarMedioContacto',
	
	AuthenticationResetPasswordApiMethod: '/GestionClientes/UsuariosMonte/v1/solicitarReinicioContrasena',
	AuthenticationChangePasswordApiMethod: '/GestionClientes/UsuariosMonte/v1/registrarContrasena',

	UseMocks: process.env.REACT_APP_USE_MOCKS,
	            
	//TODO: Remove from here
	MMClientId: 'e24fe3a5-43db-4c83-99ea-e0723e9a9c93',
	MMClientSecret: '0d7f208d-0a5b-4225-984d-fd4313360e6b'
	
}

