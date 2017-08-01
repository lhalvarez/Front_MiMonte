import React, { Component } from 'react';
import FormInput from '../../components/FormInput'
import Actions from '../../flux/Actions';

class RegisterStepOne extends Component {
	constructor(props) {
		super(props);
		this.continue = this.continue.bind(this);
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
	validate() {
		if (this.state.privacidad == false) {
			Actions.error('Debe firmar el acuerdo de privacidad');
		}

		let errors = [];

		if (this.state.nombre == null || this.state.nombre == '')
			errors.push({ field: 'nombre', message: 'El Nombre es requerido' });

		if (this.state.apellidoMaterno == null || this.state.apellidoMaterno == '')
			errors.push({ field: 'apellidoMaterno', message: 'El Apellido Materno es requerido' });

		if (this.state.apellidoPaterno == null || this.state.apellidoPaterno == '')
			errors.push({ field: 'apellidoPaterno', message: 'El Apellido Paterno es requerido' });

		if (this.state.nombre == null || this.state.nombre == '')
			errors.push({ field: 'nombre', message: 'El Nombre es requerido' });

		if (this.state.celular == null || this.state.celular == '')
			errors.push({ field: 'celular', message: 'El Número de celular es requerido' });

		if (this.state.email == null || this.state.email == '')
			errors.push({ field: 'email', message: 'El Correo Electrónico es requerido' });

		if (this.state.celular == null || this.state.celular != this.state.celularConfirmacion)
			errors.push({ field: 'celular', message: 'Confirmación de Número de celular no coincide' });

		if (this.state.email == null || this.state.email != this.state.emailConfirmacion)
			errors.push({ field: 'email', message: 'Confirmación de Correo Electrónico no coincide' });

		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) == false)
			errors.push({ field: 'email', message: 'El Correo Electrónico tiene un formato incorrecto' });

		if (errors.length > 0) {
			Actions.error(errors.map((error) =>
				<div>{error.message}</div>
			));
			return false;
		}

		return true;
	}
	continue() {
		if (!this.validate())
			return;

		let dateString = this.state.fechaNacimiento.match(/^(\d{2})\-(\d{2})\-(\d{4})$/);
		let fn = new Date(dateString[3], dateString[2] - 1, dateString[1]);

		Actions.registerStepOne(
			{
				cliente: {
					numCredencial: this.state.credencial,
					apellidoPaterno: this.state.apellidoPaterno,
					apellidoMaterno: this.state.apellidoMaterno,
					nombres: this.state.nombre,
					fechaNacimiento: fn.toISOString().substring(0,10),
					correoElectronico: this.state.email,
					telefono: {
						numeroTelefono: this.state.celular
					},
					medioValidacion: 1,
					datosPrendarios: {
						numContrato: this.state.boleta //partida
					}
				}
			}
		);
	}
	render() {
		return (
			<div role="tabpanel" className="tab-pane fade in active" id="stp1">
				<div className="row">
					<div className="col-md-8 col-xs-12 col-md-offset-2">
						<div className="bg-info pad-24 shadow">Bienvenido!. Para registrarte ten a la mano tu tarjeta Monte y boleta activa. Cerci&oacute;rate de que toda la informaci&oacute;n coincida con la de tu contrato. Todos los campos son obligatorios.</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<FormInput id="nombre" label="Nombre" onChange={this.setValue} onLoad={this.setField} />
					</div>
					<div className="col-md-4">
						<FormInput id="apellidoPaterno" label="Apellido Paterno" onChange={this.setValue} />
					</div>
					<div className="col-md-4">
						<FormInput id="apellidoMaterno" label="Apellido Materno" onChange={this.setValue} />
					</div>
				</div>
				<div className="spacer-24"></div>
				<div className="row">
					<div className="col-md-4">
						<FormInput id="fechaNacimiento" label="Fecha de Nacimiento" format="dtp_fNC7M" onChange={this.setValue} type="format" options={{ date: true, datePattern: ['d','m', 'Y'], delimiter: '-' }} />
					</div>
					<div className="col-md-4">
						<FormInput id="email" label="Correo Electr&oacute;nico" subLabel="(Este será tu usuario)" type="email" onChange={this.setValue} />
					</div>
					<div className="col-md-4">
						<FormInput id="emailConfirmacion" label="Confirma tu correo electr&oacute;nico" onChange={this.setValue} type="email" />
					</div>
				</div>
				<div className="spacer-24"></div>
				<div className="row">
					<div className="col-md-4">
						<FormInput id="credencial" label="No. de Credencial Monte" onChange={this.setValue} />
					</div>
					<div className="col-md-4">
						<FormInput id="boleta" label="No. de Boleta Activa" onChange={this.setValue} type="format" options={{ numeral: true, numeralIntegerScale: 9, numeralPositiveOnly: true, numeralDecimalMark: '', delimiter: '' }} />
					</div>

				</div>
				<div className="spacer-24"></div>
				<div className="row">
					<div className="col-md-4">
						<FormInput id="celular" label="N&uacute;mero de celular a 10 d&iacute;gitos" onChange={this.setValue} type="format" options={{ numeral: true, numeralIntegerScale: 10, numeralPositiveOnly: true, numeralDecimalMark: '', delimiter: '' }} />
					</div>
					<div className="col-md-4">
						<FormInput id="celularConfirmacion" label="Confirma tu n&uacute;mero de celular" onChange={this.setValue} type="format" options={{ numeral: true, numeralIntegerScale: 10, numeralPositiveOnly: true, numeralDecimalMark: '', delimiter: '' }} />
					</div>
					<div className="col-md-4">
						<p className="col-005"><i className="material-icons left h0">error_outline</i> Te enviaremos un c&oacute;digo v&iacute;a SMS para verificar tu tel&eacute;fono.</p>
					</div>
				</div>
				<div className="spacer-24"></div>
				<div className="row">
					<div className="col-md-4">
						<div className="">
							<input type="checkbox" id="privacidad" onChange={this.onChange} /> He le&iacute;do y aceptado el <a className="cond col-003">aviso de privacidad</a>
						</div>
					</div>
					<div className="col-md-4 text-center center-block">
						<div className="g-recaptcha center-block" data-sitekey="6LdjGiMUAAAAAL4-XZ-ONukUQrA2OWaz3MUHWKcF"></div>
					</div>
					<div className="col-md-4 text-right">
						<button className="btn btn-danger btn-raised btn-sm" onClick={this.continue}>Verificar Datos</button>
					</div>
				</div>
			</div>
		)
	}
}

export default RegisterStepOne