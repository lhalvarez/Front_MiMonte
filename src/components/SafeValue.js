import React, { Component } from 'react';

class SafeValue extends Component {
	constructor(props)
	{
		super(props);
		this.safeValue = props.value;

		//this.safeValue = this.htmlEscape(this.safeValue);
		console.log(this.safeValue);
	}
	htmlEscape(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/�/g, '&aacute;')
			.replace(/�/g, '&eacute;')
			.replace(/�/g, '&iacute;')
			.replace(/�/g, '&oacute;')
			.replace(/�/g, '&uacute;')
			.replace(/�/g, '&nacute;')

	}
	render() {
		return (
			<div>{this.safeValue}</div>
			);
	}
}

export default SafeValue;