import alt from '../Alt'
import AuthenticationApi from '../api/AuthenticationApi'
import AssetsApi from '../api/AssetsApi'
import RegisterApi from '../api/RegisterApi'
import axios from 'axios';
import appConfig from '../api/ApiConfig'
import SessionStore from './stores/SessionStore'

class Actions {
	constructor() {
		this.generateActions("updateAssets", "loginFailed", "registerFailed");
		this.sessionInfo = {};
		this.initAxios();
	}
	initAxios() {
		axios.defaults.baseURL = appConfig.MMEnpoint;
		axios.defaults.headers.common['idConsumidor'] = appConfig.ConsumidorId;
		axios.defaults.headers.common['idDestino'] = appConfig.DestinoId;
		axios.defaults.headers.common['Accept'] = 'application/json';
		axios.defaults.headers.common['Content-Type'] = 'application/json';
	}
	login(username, password) {
		AuthenticationApi.login(username, password)
			.then(result => this.loggedIn(result))
			.catch(error => { this.error(error); this.loginFailed(); });
		return true;
	}
	loggedIn(state) {
		if (state) {
			this.sessionInfo = state;
			var savedSessionInfo = localStorage.getItem('sessionInfo');
			localStorage.setItem('sessionInfo', JSON.stringify(this.sessionInfo));
			axios.defaults.headers.common['usuario'] = this.sessionInfo.username;
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.sessionInfo.appToken;
			return state;
		}
	}
	logout() {
		localStorage.removeItem('sessionInfo');
		alt.recycle();
		return ({ sessionInfo: { loggedIn: false } });
	}
	appToken(resolve, reject) {
		if (this.sessionInfo && this.sessionInfo.appToken)
		{
			resolve(this.sessionInfo.appToken);
		}

		AuthenticationApi.appToken()
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
		return token;
	}
	retrievePassword(username) {
		this.appToken(token => {
			AuthenticationApi.retrievePassword(username, token)
				.then(result => {
					this.retrievePasswordCompleted(result.data)
				})
				.catch(error => this.error(error));
		});

		return true;
	}
	registerPassword(username, newPassword, token) {
		this.appToken();
		//AuthenticationApi.registerPassword(username, newPassword, token, this.sessionInfo.appToken)
		//	.then(result => {
		//		this.registerPasswordCompleted(result.data)
		//	})
		//	.catch(error => this.error(error));
		return true;
	}
	retrievePasswordCompleted(state) {
		return true;
	}
	registerPasswordCompleted(state) {
		return true;
	}
	registerStepOne(data) {
		RegisterApi.verifyInformation({ sessionInfo: this.sessionInfo, data: data })
			.then(result => {
				this.registerStepCompleted({ info: data, result: result.data });
			})
			.catch(error => {
				this.error(error); this.registerFailed();
			});

		return true;
	}
	registerStepTwo(data) {
		RegisterApi.createUser({ sessionInfo: this.sessionInfo, data: data })
			.then(result => {
				this.registerStepCompleted({ info: data, result: result.data });
			})
			.catch(error => {
				this.error(error); this.registerFailed();
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
	error(error) {
		debugger;
		console.error(JSON.stringify(error));
		if (error.response) {
			var message = '';
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
			var message = '';
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
	isLoggedIn() {
		//TODO: also validate token expirations.
		return this.sessionInfo.loggedIn;
	}
}

export default alt.createActions(Actions);