import alt from '../../Alt';
import Actions from '../Actions';

class SessionStore {
	constructor() {
		
		this.flushState();

		this.bindListeners({
			onAppToken: Actions.getAppToken,
			onAppTokenIssued: Actions.appTokenIssued,
			onLogin: Actions.login,
			onLoggedIn: Actions.loggedIn,
			onLogout: Actions.logout,
			onLoginFailed: Actions.loginFailed,
			onRetrievePassword: Actions.retrievePassword,
			onRetrievePasswordSucceed: Actions.retrievePasswordCompleted,
			onRegisterPasswordCompleted: Actions.registerPasswordCompleted
		});
	}
	flushState()
	{
		if (this.state) {
			this.state['loading'] = false;
			this.state['loggingIn'] = false;
		}
		else {
			this.state = {
				loading: false,
				loggingIn: false,
				recoveryPasswordTokenIssued: false,
				sessionInfo: {
					loggedIn: false,
					appToken: null
				}
			};
		}
	}
	onAppToken(state) {
		console.log('loading');
		this.state.loading = true;
	}
	onAppTokenIssued(token) {
		this.state.sessionInfo.appToken = token;
	}
	onRetrievePassword(state) {
		this.state['loading'] = true;
	}
	onRetrievePasswordSucceed(state) {
		this.state['loading'] = false;
		this.state['retrievePasswordStep'] = 1;
		this.state['retrievePasswordPhoneNumber'] = state.telefono.ultimosDigitos;
		this.state['recoveryPasswordTokenIssued'] = true;
	}
	onRegisterPasswordCompleted(state) {
		this.state['loading'] = false;
		this.state['registerPasswordCompleted'] = true;
	}
	onLogin(state) {
		this.state['loading'] = true;
		this.state['loggingIn'] = true;
	}
	onLoggedIn(state) {
		this.setState({ loading: false, loggingIn: false, sessionInfo: state });
	}
	onLogout(state) {
		this.flushState();
	}
	onLoginFailed(state) {
		
		this.flushState();
	}
	isAppTokenValid() {
		return this.state.sessionInfo.appToken != null;
	}
}

export default alt.createStore(SessionStore, 'SessionStore');