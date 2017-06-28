import ActionTypes from './ActionTypes';
import Dispatcher from './Dispatcher';
var alt = require('../alt');

const Actions = {
	login() {
		SessionDispatcher.dispatch({
			type: ActionTypes.LOGIN
		});
	},
	logout() {
		SessionDispatcher.dispatch({
			type: ActionTypes.LOGOUT
		})
	}
};

export default alt.createActions(Actions);