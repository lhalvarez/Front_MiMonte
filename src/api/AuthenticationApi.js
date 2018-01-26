import {
	CognitoUserPool,
	AuthenticationDetails,
	CognitoUser
} from "amazon-cognito-identity-js"
import ApiBase from './ApiBase'
import appConfig from "./ApiConfig"

import Actions from '../flux/Actions'

class AuthenticationApi extends ApiBase {
	getAppToken() {
		return super.getAppToken();
	}
	getAppTokenNPM(){
		return super.getAppTokenNPM();
	}
	login(username, password) {
		let me = this;
		return new Promise((resolve, reject) => {
			var authenticationData = {
				Username: username,
				Password: password,
			};
			var authenticationDetails = new AuthenticationDetails(authenticationData);
			var poolData = {
				UserPoolId: appConfig.UserPoolId,
				ClientId: appConfig.ClientId
			};
			var userPool = new CognitoUserPool(poolData);
			var userData = {
				Username: username,
				Pool: userPool
			};
			var cognitoUser = new CognitoUser(userData);
			me.appToken = null;
			me.fullName = null;
			me.clientId = null;

			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: function (result) {

					/** Trae token de cognito */
					let token = result.getAccessToken().getJwtToken();
					
					me.getAppToken()
						.then(result => {
							Actions.appTokenIssued(result.data.access_token);

							/** Envia username a ruta: appConfig.UsuariosApiMethod con token de cognito */
							me.retrieveUserInfo(username)
								.then(result => {
									let sessionInfo = {
										id: 1,
										email: username,
										fullName: result.data.Cliente.nombre + ' ' + result.data.Cliente.apellidoPaterno + ' ' + result.data.Cliente.apellidoMaterno,
										token: token,
										appToken: me.appToken,
										loggedIn: true,
										clientId: result.data.Cliente.idCliente,
										credentialNumber: result.data.Cliente.numeroDeCredencial,
										username: username
									};

									resolve(sessionInfo);
								})
								.catch(error => {
									reject(error);
								});

						})
						.catch(error => {
							reject(error);
						});

					if (token != null) {
					
					}
				},
				onFailure: err => reject(err)
			});
		});
	}

	/** Get token service NPM */
	tokenNPM_PDF() {
		let me = this;
	
		me.getAppTokenNPM()
			.then(result => {
				//Actions.appTokenIssued(result.data.access_token);

				console.log("result:" + result);
			})
			.catch(error => {
				console.log("error:" + error);
			});
					
	}

	logout() {
		// nothing to do.
	}
	retrieveUserInfo(username)
	{
		return super.buildPost(
			appConfig.UsuariosApiMethod,
			{ usuarioMonte: username });
	}

	retrievePdf(numeroFolio, numeroCliente){
		return super.buildPost(
			appConfig.NPM_PDF_ENDPOINT,
			{ 
				numeroFolio:numeroFolio, 
				numeroCliente:numeroCliente 
			});
	}

	retrievePassword(username, appToken) {

		if (appConfig.UseMocks) {
			return new Promise((resolve, reject) => {
				setTimeout(resolve({
					data: {
						telefono: {
							ultimosDigitos: 5905
						},
						respuesta: {
							codigo: 0,
							mensaje: 'Reinicio de contrasena pendiente de validaci�n'
						}
					}
				}), 3000);
			});
		} else {
			return super.buildPost(
				appConfig.AuthenticationResetPasswordApiMethod,
				{
					usuario: {
						nombreUsuario: username
					}
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + appToken,
						usuario: 'usuarioMonte'
					}
				}
			);
		}
	}
	registerPassword(username, newPassword, token, appToken) {
		if (appConfig.UseMocks) {
			return new Promise((resolve, reject) => {
				setTimeout(resolve({
					data: {
						"respuesta": {
							"codigo": "0",
							"mensaje": "Nueva contrase�a registrada exitosamente"
						}
					}
				}), 3000);
			});
		}
		else {
			return super.buildPut(
				appConfig.AuthenticationChangePasswordApiMethod,
				{
					usuario: {
						nombreUsuario: username,
						contrasena: newPassword,
						datosValidacion: {
							'token': token
						}
					}
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + appToken,
						usuario: 'usuarioMonte'
					}
				}
			);
		}
	}


}

export default new AuthenticationApi();

