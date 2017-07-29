import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import SessionStore from '../flux/stores/SessionStore' 
import Actions from '../flux/Actions'
import ComponentBase from './ComponentBase'

class UserInfo extends ComponentBase {
	constructor() {
		super();
	}
	static getStores() {
		return [SessionStore];
	}
	static getPropsFromStores() {
		return SessionStore.getState();
	}
	render() {
		var isLoggedIn = this.props.sessionInfo != null
			&& this.props.sessionInfo.loggedIn;
		return (
			<div>
				{ isLoggedIn && (
					<p className="s1 cond w400 text-center col-005">Bienvenido {this.props.sessionInfo.fullName} <a className="btn btn-primary btn-fab btn-fab-mini bkg-002"><i className="material-icons">person</i></a></p>
				)}
			</div>
		);
	}
}
export default connectToStores(UserInfo);