import alt from '../../Alt';
import Actions from '../Actions';

class SessionStore {
	constructor() {
		
		this.flushState();

		this.bindListeners({
			onAppToken: Actions.appToken,
			onAppTokenIssued: Actions.appTokenIssued,
			onLogin: Actions.login,
			onLoggedIn: Actions.loggedIn,
			onLogout: Actions.logout,
			onLoginFailed: Actions.loginFailed,
			onRetrievePassword: Actions.retrievePassword,
			onRetrievePasswordSucceed: Actions.retrievePasswordCompleted
		});
	}
	flushState()
	{
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
	onAppToken(state) {
		console.log('loading');
		this.state.loading = true;
	}
	onAppTokenIssued(token) {
		this.state['loading'] = false;
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