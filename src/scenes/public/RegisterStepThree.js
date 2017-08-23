import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import Actions from '../../flux/Actions';
import RegisterStore from '../../flux/stores/RegisterStore';

class RegisterStepThree extends Component {
	constructor(props) {
		super(props);
		this.setValue = this.setValue.bind(this);
		this.resendCode = this.resendCode.bind(this);
	}
	componentDidMount() {
		this.setState({});
	}
	static getStores() {
		return [RegisterStore];
	}
	static getPropsFromStores() {
		return RegisterStore.getState();
	}
	setValue(event) {
		var object = {};
		object[event.target.id] = event.target.value;
		this.setState(object);
	}
	resendCode() {
		Actions.registerResendActivationCode(
			{
				usuario: {
					nombreUsuario: this.props.contractInfo.cliente.correoElectronico,
					medioContacto: {
						contactoPor: 2,
						valorContacto: this.props.contractInfo.cliente.correoElectronico
					},
					datosValidacion: {
						"@reenvioToken": true
					}
				},
				cliente: {
					idCliente: this.props.stepOneResult.cliente.idCliente
				}
			});
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
					<p className="text-center"><button className="btn btn-line btn-raised btn-warning btn-sm" onClick={this.resendCode}>Volver a Enviar Email</button></p>
				</div>
			</div>
		)
	}
}

export default connectToStores(RegisterStepThree);