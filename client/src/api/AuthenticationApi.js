import { Config, CognitoIdentityCredentials } from "aws-sdk";
import {
	CognitoUserPool,
	CognitoUserAttribute,
	AuthenticationDetails,
	CognitoUser
} from "amazon-cognito-identity-js"
import request from 'superagent'
import ApiBase from './ApiBase'
import appConfig from "./ApiConfig"

import ValidarDatosPayload from './RequestPayload'
import Actions from '../flux/Actions'

class AuthenticationApi extends ApiBase {
	constructor() {
		super();
	}
	appToken() {
		return super.getAppToken();
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

					console.log('access token + ' + result.getAccessToken().getJwtToken());

					let token = result.getAccessToken().getJwtToken();

					if (token != null) {
						request.post(appConfig.MMEnpoint + '/oauth/token')
							.send('grant_type=client_credentials')
							.send('client_id=' + appConfig.MMClientId)
							.send('client_secret=' + appConfig.MMClientSecret)
							.end((err, res) => {
								if (err || !res.ok) {
									reject(err);
								} else {
									me.appToken = res.body.access_token;
									console.log('APP token -> ' + me.appToken);
									request.post(appConfig.MMEnpoint + '/GestionClientes/Cliente/v2/usuarioMonte')

										.set('usuario', username)
										.set('idConsumidor', appConfig.ConsumidorId)
										.set('idDestino', appConfig.DestinoId)
										.set('Authorization', 'Bearer ' + me.appToken)
										.set('Accept', 'application/json')
										.set('Content-Type', 'application/json')
										.send({ usuarioMonte: username })
										.end(function (err, res) {
											if (err || !res.ok) {
												reject(err);
											} else {
												let sessionInfo = {
													id: 1,
													email: username,
													fullName: res.body.Cliente.nombre + ' ' + res.body.Cliente.apellidoPaterno + ' ' + res.body.Cliente.apellidoMaterno,
													token: token,
													appToken: me.appToken,
													loggedIn: true,
													clientId: res.body.Cliente.idCliente,
													credentialNumber: res.body.Cliente.numeroDeCredencial,
													username: username
												};
												//Actions.loggedIn(sessionInfo);
												resolve(sessionInfo);
											}
										});
								}
							});
					}
				},

				onFailure: function (err) {
					reject(err);
					//Actions.error(err);
					//Actions.loginFailed();
				},

			});
		});
	}
	logout() {

	}
	retrievePassword(username, appToken) {
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
	registerPassword(username, newPassword, token, appToken) {
		return super.buildPost(
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

export default new AuthenticationApi();

