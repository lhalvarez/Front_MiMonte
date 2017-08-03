import React, { Component, PropTypes } from 'react';
import Cleave from 'cleave.js/react';

class FormInput extends Component {
	getValue() {
		return 'value' in this.refs.input
			? this.refs.input.value
			: this.refs.input.getValue();
	}
	render() {
		const common = { // properties applicable to all
			id: this.props.id,
			ref: 'input',
			defaultValue: this.props.defaultValue
		};
		var control = '';
		switch (this.props.type) {
			case 'text':
				control = <textarea {...common} className="form-control" onChange={this.props.onChange} onLoad={this.props.onLoad} />;
				break;
			case 'email':
				control = <input {...common} type="email" className="form-control" onChange={this.props.onChange} onLoad={this.props.onLoad} />;
				break;
			case 'password':
				control = <input {...common} type="password" className="form-control" onChange={this.props.onChange} onLoad={this.props.onLoad} />;
				break;
			case 'readonly':
				control = <input {...common} type="text" className="form-control" readOnly="true" />;
				break;
			case 'date':
				control = <Cleave {...common} className="form-control" options={{ date: true, datePattern: ['Y', 'm', 'd'] }} onChange={this.props.onChange} placeholder="yyyy/mm/dd" />
				break;
			case 'format':
				control = <Cleave {...common} className="form-control" placeholder={this.props.placeholder} onChange={this.props.onChange} options={this.props.options} />
				break;
			default:
				control = <input {...common} type="text" className="form-control" onChange={this.props.onChange} onLoad={this.props.onLoad} />;
				break;
		}
		return (
			<div className="form-group label-floating">
				<label className="control-label">{this.props.label} <span className="col-005">{this.props.subLabel}</span></label>
				{control}
			</div>
		)
	}
}

FormInput.propTypes = {
	type: PropTypes.oneOf(['year', 'password', 'text', 'input', 'email', 'readonly', 'date', 'format']),
	id: PropTypes.string,
	defaultValue: PropTypes.any,
	label: PropTypes.string,
	subLabel: PropTypes.string,
	options: PropTypes.any,
	placeholder: PropTypes.string
};

export default FormInput

