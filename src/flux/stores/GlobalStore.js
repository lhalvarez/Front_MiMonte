import alt from '../../Alt';
import Actions from '../Actions';

class GlobalStore {
	constructor() {
		this.state = {
			showErrorsDialog: false,
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
		this.state.showErrorsDialog = true;
	}
	onCleanError() {
		this.state.error = '';
		this.state.showErrorsDialog = false;
	}
}

export default alt.createStore(GlobalStore, 'GlobalStore');