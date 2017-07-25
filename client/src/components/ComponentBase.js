import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import SessionStore from '../flux/stores/SessionStore' 

class ComponentBase extends Component {
	constructor() {
		super();
	}
	static getStores() {
		return [SessionStore];
	}
	static getPropsFromStores() {
		return SessionStore.getState();
	}
	isLoggedIn() {
		return this.props != null
			&& this.props.sessionInfo != null
			&& this.props.sessionInfo.loggedIn;
	}
}

export default connectToStores(ComponentBase);