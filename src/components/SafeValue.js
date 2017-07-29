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
			.replace(/á/g, '&aacute;')
			.replace(/é/g, '&eacute;')
			.replace(/í/g, '&iacute;')
			.replace(/ó/g, '&oacute;')
			.replace(/ú/g, '&uacute;')
			.replace(/ñ/g, '&nacute;')

	}
	render() {
		return (
			<div>{this.safeValue}</div>
			);
	}
}

export default SafeValue;