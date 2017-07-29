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

	UsuariosApiMethod: '/GestionClientes/Cliente/v2/usuarioMonte',
	RegisterVerifyInformationApiMethod: '/GestionClientes/UsuariosMonte/v1/validarDatos',
	RegisterCreateUserApiMethod: '/GestionClientes/UsuariosMonte/v1/solicitarAlta',
	RegisterResendTokenApiMethod: '/GestionClientes/UsuariosMonte/v1/validarMedioContacto',
	
	AuthenticationResetPasswordApiMethod: '/GestionClientes/UsuariosMonte/v1/solicitarReinicioContrasena',
	AuthenticationChangePasswordApiMethod: '/GestionClientes/UsuariosMonte/v1/registrarContrasena',

	UseMocks: process.env.REACT_APP_USE_MOCKS
	
}

