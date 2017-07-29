import React, { Component } from 'react';
import Title from '../../components/Title'
import FormInput from '../../components/FormInput'
import Actions from '../../flux/Actions';

class RegisterStepThree extends Component {
	constructor(props) {
		super(props);
		this.setValue = this.setValue.bind(this);
	}
	componentDidMount() {
		this.setState({});
	}
	setValue(event) {
		var object = {};
		object[event.target.id] = event.target.value;
		this.setState(object);
	}
	render() {
		return (
			<div role="tabpanel" className="tab-pane fade in active" id="stp3">
				<div className="spacer-24"></div>
				<div className="col-md-8 col-md-offset-2">
					<div className="bg-info pad-24 shadow">
						<p className="purple-text text-darken-4"><strong>Tu usuario ya esta creado.</strong></p>
						<p>Ahora debes activarlo. Para esto solo ingresa a tu correo electrónico y haz click en la liga que te hemos enviado.</p>
					</div>
					<div className="spacer-24"></div>
					<p className="text-center"><a className="btn btn-line btn-raised btn-warning btn-sm">Volver a Enviar Email</a></p>
				</div>
			</div>
		)
	}
}
export default RegisterStepThree