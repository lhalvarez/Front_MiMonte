import React, { Component, PropTypes } from 'react';
import Cleave from 'cleave.js/react';
import DatePicker from 'react-bootstrap-date-picker';
import DateTimeField from "react-bootstrap-datetimepicker";

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
			case 'calendar1':
				control = <DateTimeField
					{...common}
					format="YYYY-MM-DD"
					inputFormat="DD-MM-YYYY"
					onChange={this.props.onChange}
					viewMode="date"
					maxDate={this.props.maxDate}
					defaultText="DD-MM-AAAA"
				/>
				break;
			case 'calendar':
				control = <DatePicker {...common} dateFormat="DD-MM-YYYY" maxDate={this.props.maxDate} className="form-control" placeholder="DD-MM-YYYY"
					onChange={(v, fv) => {

						this.value = new Date().toISOString();
						this.props.onChange(v, fv);
					}}
					value={this.props.value}
					monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
					dayLabels={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
				/>
				break;
			default:
				control = <input {...common} type="text" className={'form-control ' + (this.props.upperCase ? " upperCase" : "") + (this.props.lowerCase ? " lowerCase" : "")} onChange={this.props.onChange} onLoad={this.props.onLoad} maxLength={this.props.maxLength} onKeyPress={this.props.onKeyPress}/>;
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
	type: PropTypes.oneOf(['year', 'password', 'text', 'input', 'email', 'readonly', 'date', 'format', 'calendar']),
	id: PropTypes.string,
	defaultValue: PropTypes.any,
	label: PropTypes.string,
	subLabel: PropTypes.string,
	options: PropTypes.any,
	placeholder: PropTypes.string,
	upperCase: PropTypes.string,
	lowerCase: PropTypes.string
};

export default FormInput

