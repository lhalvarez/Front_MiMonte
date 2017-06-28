import React, { Component } from 'react';
import SessionInfoStore from '../flux/SessionInfoStore' 

class UserInfo extends Component {
	constructor() {
		super();
		this.state = SessionInfoStore.getState();
		debugger;
	}
	render() {
		return (
			<p className="s1 cond w400 text-center col-005">Bienvenido {this.state.fullName} <a className="btn btn-primary btn-fab btn-fab-mini bkg-002"><i className="material-icons">person</i></a></p>
		);
	}
}

export default UserInfo;