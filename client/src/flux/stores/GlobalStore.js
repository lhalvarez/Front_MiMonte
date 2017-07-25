import alt from '../../Alt';
import Actions from '../Actions';

class GlobalStore {
	constructor() {
		this.state = {
			loading: false,
			error: ''
		}
		this.bindListeners({
			onError: Actions.error,
			onCleanError: Actions.cleanError
		});
	}
	onError(error) {
		this.state.error = error;
	}
	onCleanError() {
		this.state.error = '';
	}
}

export default alt.createStore(GlobalStore, 'GlobalStore');