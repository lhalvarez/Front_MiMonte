import ApiBase from './ApiBase'
import ApiConfig from './ApiConfig'

class RegisterApi extends ApiBase {
	verifyInformation(state) {
		
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
						Authorization: 'Bearer ' + state.appToken,
						usuario: 'usuarioMonte'
					}
				}
			);
		}
	}
	createUser(state) {

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
						Authorization: 'Bearer ' + state.appToken,
						usuario: 'usuarioMonte'
					}
				}
			);
		}
	}
	resendActivationCode(state) {

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
						Authorization: 'Bearer ' + state.appToken,
						usuario: 'usuarioMonte'
					}
				}
			);
		}
	}
}

export default new RegisterApi();