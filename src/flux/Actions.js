import alt from '../Alt'
import AuthenticationApi from '../api/AuthenticationApi'
import RegisterApi from '../api/RegisterApi'
import axios from 'axios';
import appConfig from '../api/ApiConfig'

class Actions {
	constructor() {
		this.generateActions("updateAssets", "registerFailed");
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
			localStorage.setItem('sessionInfo', JSON.stringify(this.sessionInfo));
			axios.defaults.headers.common['usuario'] = this.sessionInfo.username;
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.sessionInfo.appToken;

			this.fetchAssets();

			return state;
		}
	}
	logout() {
		localStorage.removeItem('sessionInfo');
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
				reject(error);
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
		this.getAppToken(token => {
			AuthenticationApi.registerPassword(username, newPassword, token, this.sessionInfo.appToken)
				.then(result => {
					if (this.verifyApiState(result.data)) {
						this.registerPasswordCompleted(result.data)
					}
				})
				.catch(error => this.error(error));
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
					this.error(error); this.registerFailed();
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
		RegisterApi.resendActivationCode({ sessionInfo: this.sessionInfo, data: data })
			.then(result => {
				this.registerStepCompleted({ info: data, result: result.data });
			})
			.catch(error => {
				this.error(error); this.registerFailed();
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
		if (state)
		{
			if (state.respuesta && state.respuesta.codigo !== '0')
			{
				console.error('API Error -> ' + state.respuesta.codigo + ' - ' + state.respuesta.mensaje);
				this.error(state.respuesta);
				return false;
			}
		}
		return true;
	}
	error(error) {
		var message = '';
		console.error(JSON.stringify(error));
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
			return message;
		}
		else if (error.code) {
	
			try {
				let cod = error.code;
				let description = error.message;
				message = "VERSION DESARROLLO - Error: (" + cod + ") " + description;
			} catch (e) {
				message = e;
			}
			return message;

		}
		else {
			return error;
		}
	}
	cleanError() {
		return true;
	}
	loading() {

	}
	fetchAssets() {
		return { session: this.sessionInfo };
	}
	fetchAssetsBalance() {
		return { session: this.sessionInfo };
	}
	isLoggedIn() {
		//TODO: also validate token expirations.
		return this.sessionInfo.loggedIn;
	}
}

export default alt.createActions(Actions);