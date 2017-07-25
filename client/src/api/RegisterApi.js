import ApiBase from './ApiBase'
import ApiConfig from './ApiConfig'
import axios from 'axios';

class RegisterApi extends ApiBase {
	constructor() {
		super();
	}
	verifyInformation(state) {
		console.log('Register - Verify information');
		console.log('Register - App Token ' + state.sessionInfo.appToken);

		if (ApiConfig.UseMocks) {
			return new Promise((resolve, reject) => {
				resolve({
					data: {
						cliente: {
							estadoRegistro: 'Preregistro',
							idCliente: 10
						},
						respuesta: {
							codigo: 0,
							mensaje: 'Preregistro pendiente de validación'
						}
					}
				});
			});
		}
		else {
			return super.buildPost(
				ApiConfig.RegisterVerifyInformationApiMethod,
				state.data,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + state.sessionInfo.appToken,
						usuario: 'usuarioMonte'
					}
				}
			);
		}
	}
	createUser(state) {
		console.log('Register - Create User');
		console.log('Register - App Token ' + state.sessionInfo.appToken);

		if (ApiConfig.UseMocks) {
			return new Promise((resolve, reject) => {
				resolve({
					data: {
						cliente: {
							estadoRegistro: 'pendiente',
							idCliente: 10
						},
						respuesta: {
							codigo: 0,
							mensaje: 'Validacion de Medio de Contacto'
						}
					}
				});
			});
		}
		else {
			return super.buildPost(
				ApiConfig.RegisterCreateUserApiMethod,
				state.data,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + state.sessionInfo.appToken,
						usuario: 'usuarioMonte'
					}
				}
			);
		}
	}
	resendActivationCode(state) {
		console.log('Resend Token --');

		if (ApiConfig.UseMocks) {
			return new Promise((resolve, reject) => {
				resolve({
					data: {
						cliente: {
							estadoRegistro: 'validacion',
							idCliente: 10
						},
						respuesta: {
							codigo: 0,
							mensaje: 'Validacion de Medio de Contacto'
						}
					}
				});
			});
		}
		else {
			return super.buildPost(
				ApiConfig.RegisterResendTokenApiMethod,
				state.data,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + state.sessionInfo.appToken,
						usuario: 'usuarioMonte'
					}
				}
			);
		}
	}
}

export default new RegisterApi;