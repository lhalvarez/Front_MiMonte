import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import FormInput from '../../components/FormInput'
import RegisterStore from '../../flux/stores/RegisterStore';
import Actions from '../../flux/Actions';

class RegisterStepTwo extends Component {
	constructor(props) {
		
		super(props);
		this.resendCode = this.resendCode.bind(this);
		this.continue = this.continue.bind(this);
		this.setValue = this.setValue.bind(this);
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
	validate() {

		let errors = [];
		
		if (this.state.smsCode == null || this.state.smsCode == '')
			errors.push({ field: 'email', message: 'El Código SMS es requerido' });

		if (this.state.password.length < 8)
			errors.push({ field: 'password', message: 'La contraseña debe tener al menos 8 caracteres' });

		if (this.state.password == null || this.state.password !=this.state.passwordConfirmacion)
			errors.push({ field: 'password', message: 'Confirmación de Contraseña no coincide' });

		if (errors.length > 0) {
			Actions.error(errors.map((error) =>
				<div>{error.message}</div>
			));
			return false;
		}

		return true;
	}
	resendCode() {
		Actions.registerResendActivationCode(
			{
				usuario: {
					nombreUsuario: this.props.contractInfo.cliente.correoElectronico,
					medioContacto: {
						contactoPor: 1,
						valorContacto: this.props.contractInfo.cliente.telefono.numeroTelefono
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
	continue() {
		if (!this.validate())
			return;

		Actions.registerStepTwo(
			{
				usuario: {
					nombreUsuario: this.props.contractInfo.cliente.correoElectronico,
					contrasena: this.state.password,
					datosValidacion: {
						token: this.state.smsCode
					},
					medioContacto: {
						contactoPor: 1,
						valorContacto: this.props.contractInfo.cliente.telefono.numeroTelefono
					}
				},
				cliente: {
					numCredencial: this.props.contractInfo.cliente.numCredencial
				}
			});
	}
	render() {
		return (
			<div role="tabpanel" className="tab-pane fade in active" id="stp2">
				<div className="col-md-8 col-xs-12 col-md-offset-2">
					<div className="bg-info pad-24 shadow">Crea tu contraseña y verifica tu número de teléfono para completar el proceso de registro.</div>
				</div>
				<div className="spacer-24"></div>
				<div className="row">
					<div className="col-md-4">
						<FormInput id="username" label="Usuario" defaultValue={this.props.contractInfo.cliente.correoElectronico} type="readonly" />
					</div>
					<div className="col-md-4">
						<FormInput id="password" label="Contraseña" onChange={this.setValue} type="password" />
					</div>
					<div className="col-md-4">
						<FormInput id="passwordConfirmacion" label="Confirma tu Contraseña" onChange={this.setValue} type="password" />
					</div>
				</div>
				<div className="spacer-24"></div>
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<p className="col-005 valign-wrapper"><i className="material-icons left s0">error_outline</i> La contraseña debe tener un mínimo de 8 caracteres, que podrán ser números, letras y símbolos. Los números y letras no podrán ser consecutivos y debes incluir mínimo una mayúscula y un símbolo.</p>
					</div>
				</div>
				<div className="spacer-24"></div>
				<div className="row">
					<div className="col-md-6">
						<p className="col-011">Escribe el código que te llegó por SMS al número de teléfono {this.props.contractInfo.cliente.telefono.maskedTelefono}</p>
						<FormInput id="smsCode" onChange={this.setValue} type="format" options={{ numeral: true, numeralIntegerScale: 6, numeralPositiveOnly: true, numeralDecimalMark: '', delimiter: '' }}  />
						<p className="text-center"><button className="btn btn-warning btn-raised btn-line btn-sm" onClick={this.resendCode}>Volver a Enviar</button></p>
						<div className="spacer-24"></div>
						<p className="col-005 small text-center">Si has intentado volver a enviar el SMS y no tuviste respuesta, comunícate al 01 800 EL MONTE (01 800 35 666 83).</p>
					</div>
					<div className="col-md-5 col-md-offset-1">
						<div className="embed-responsive embed-responsive-16by9">
							<iframe className="embed-responsive-item" src="https://youtu.be/5Jp-y5M6v9A"></iframe>
						</div>
					</div>
				</div>
				<div className="spacer-24"></div>
				<div className="row">
					<div className="col-md-4 col-md-offset-8 text-right">
						<button className="btn btn-danger btn-raised btn-sm" onClick={this.continue}>Terminar Registro</button>
					</div>
				</div>
			</div>
		)
	}
}

export default connectToStores(RegisterStepTwo);