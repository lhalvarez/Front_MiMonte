import SessionInfo from './SessionInfo';
import Dispatcher from './Dispatcher';
import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import alt from '../Alt';

class SessionInfoStore extends ReduceStore<SessionInfo> {
	constructor() {
		super(Dispatcher);
	}
	getInitialState() {
		return new SessionInfo({
			id: 1,
			email: 'jdoe@foo.com',
			fullName: 'Usuario Desarrollo'
		});
	}
	reduce(state, action) {
		return state;
	}
}

export default new SessionInfoStore();
//export default alt.createStore(SessionInfoStore, 'SessionInfoStore');