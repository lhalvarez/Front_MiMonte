import alt from '../Alt'
import AuthenticationApi from '../api/AuthenticationApi'
import RegisterApi from '../api/RegisterApi'
import AssetsApi from '../api/AssetsApi'
import axios from 'axios';
import appConfig from '../api/ApiConfig'

class Actions {
	constructor() {
		this.generateActions("updateAssets", "registerFailed", "updateAsset");
		this.sessionInfo = {};
		this.initAxios();
	}
	initAxios() {
		axios.defaults.baseURL = appConfig.MMEnpoint;
		axios.defaults.headers.common['idConsumidor'] = appConfig.ConsumidorId;
		axios.defaults.headers.common['idDestino'] = appConfig.DestinoId;
		axios.defaults.headers.common['Accept'] = 'application/json';
		axios.defaults.headers.common['Content-Type'] = 'application/json';
		axios.defaults.headers.common['usuario'] = 'usuarioMonte';
	}
	login(username, password) {
		AuthenticationApi.login(username, password)
			.then(result => this.loggedIn(result))
			.catch(error => this.loginFailed(error));
		return true;
	}
	loginFailed(state) {
		this.error(state); return state;
	}
	loggedIn(state) {
		console.info('User logged in...');
		if (state) {
			this.sessionInfo = state;

			sessionStorage.setItem('sessionInfo', JSON.stringify(this.sessionInfo));
			axios.defaults.headers.common['usuario'] = this.sessionInfo.username;
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.sessionInfo.appToken;

			this.fetchAssets();

			return state;
		}
	}
	logout() {
		sessionStorage.removeItem('sessionInfo');
		alt.recycle();
		return ({ sessionInfo: { loggedIn: false } });
	}
	getAppToken(resolve, reject) {
		if (this.sessionInfo && this.sessionInfo.appToken) {
			resolve(this.sessionInfo.appToken);
		}

		AuthenticationApi.getAppToken()
			.then(result => {
				this.appTokenIssued(result.data.access_token);
				resolve(result.data.access_token);
			})
			.catch(error => {
				this.error(error);
			});

		return true;
	}
	appTokenIssued(token) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		return token;
	}
	retrievePassword(username) {
		this.getAppToken(token => {
			AuthenticationApi.retrievePassword(username, token)
				.then(result => {
					if (this.verifyApiState(result.data)) {
						this.retrievePasswordCompleted(result.data)
					}
				})
				.catch(error => this.loginFailed(error));
		});

		return true;
	}
	registerPassword(username, newPassword, token) {
		this.getAppToken(appToken => {
			AuthenticationApi.registerPassword(username, newPassword, token, appToken)
				.then(result => {
					if (this.verifyApiState(result.data)) {
						this.registerPasswordCompleted(result.data)
					}
				})
				.catch(error => this.loginFailed(error));
		});
		return true;
	}
	retrievePasswordCompleted(state) {
		return state;
	}
	registerPasswordCompleted(state) {
		return state;
	}
	registerStepOne(data) {
		this.getAppToken(token => {
			RegisterApi.verifyInformation({ appToken: token, data: data })
				.then(result => {
					this.registerStepCompleted({ info: data, result: result.data });
				})
				.catch(error => {
					if (error.response.data && error.response.data.codigoError == "NMP-3002") {
						this.registerStepCompleted({ info: data, result: error.response.data });
					} else {
						this.error(error); this.registerFailed();
					}
				});
		});

		return true;
	}
	registerStepTwo(data) {
		this.getAppToken(token => {
			RegisterApi.createUser({ appToken: token, data: data })
				.then(result => {
					this.registerStepCompleted({ info: data, result: result.data });
				})
				.catch(error => {
					this.error(error); this.registerFailed();
				});
		});
		return true;
	}
	registerResendActivationCode(data) {
		this.getAppToken(token => {
			RegisterApi.resendActivationCode({ appToken: token, data: data })
				.then(result => {
					this.registerStepCompleted({ info: data, result: result.data });
				})
				.catch(error => {
					this.error(error); this.registerFailed();
				});
		});
		return true;
	}
	registerStepCompleted(state) {
		return state;
	}
	registerResendEmail(data) {
		return true;
	}
	verifyApiState(state) {
		if (state) {
			if (state.respuesta && state.respuesta.codigo != '0') {
				console.error('API Error -> ' + state.respuesta.codigo + ' - ' + state.respuesta.mensaje);
				this.error(state.respuesta);
				return false;
			}
		}
		return true;
	}
	error(error) {
		var message = '';
		console.error(error);
		if (error.response) {
			if (error.response.data) {
				try {
					let cod = error.response.data.codigoError;
					let description = error.response.data.descripcionError;
					message = "VERSION DESARROLLO - Error: (" + cod + ") " + description;
				} catch (e) {
					message = e;
				}
			} else if (error.response.text) {
				try {
					let r1 = JSON.parse(error.response.text)
					let cod = r1.codigoError;
					let description = r1.descripcionError;
					message = "VERSION DESARROLLO - Error: (" + cod + ") " + description;
				} catch (e) {
					message = e;
				}
			}
		}
		else if (error.code) {
			try {
				let cod = error.code;
				let description = error.message;

				switch (error.code) {
					case 'NotAuthorizedException':
						{
							switch (error.message)
							{
								case 'Incorrect username or password.':
									description = "Usuario o contraseña incorrecta";
									break;
								case "User is disabled":
								case "Password attempts exceeded":
									description = "Verifica que tus datos sean correctos e inténtalo nuevamente o llamanos al 01 800 EL MONTE (35 66683)";
									break;
							}
						}
						break;
					case 'UserNotFoundException':
						description = 'Usuario o contraseña incorrecta';
				}
				message = description;
			} catch (e) {
				message = e;
			}
		}
		else if (error.message) {
			message = "VERSION DESARROLLO - Error: " + error.message;
		}
		else {
			return error;
		}

		return message;
	}
	cleanError() {
		return true;
	}
	loading() {

	}
	isLoggedIn() {
		//TODO: also validate token expirations.
		return this.sessionInfo.loggedIn;
	}
	fetchAssets(filter, type) {
		return { session: this.sessionInfo, filter: filter, filterSource: type };
	}
	fetchAssetsBalance() {
		return { session: this.sessionInfo };
	}
	fetchAssetDetail(number) {
		AssetsApi.byNumber(number)
			.then(result => {
				this.updateAsset({ asset: result.data });
			})
			.catch(error => this.error(error));

		return number;
	}
}

export default alt.createActions(Actions);