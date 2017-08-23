import React, { Component, PropTypes } from 'react';

import SessionStore from '../flux/stores/SessionStore'

class FormComponent extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setValue = this.setValue.bind(this);
	}
	componentDidMount() {
		this.setState({});
	}
	static getStores() {
		return [SessionStore];
	}
	static getPropsFromStores() {
		return SessionStore.getState();
	}
	setValue(event) {
		var object = {};
		object[event.target.id] = event.target.value;
		this.setState(object);
	}
	handleSubmit()
	{
		
	}
}

export default FormComponent;