import React, { Component } from 'react';
import FormInput from '../../components/FormInput'
import Actions from '../../flux/Actions';

class RegisterStepOne extends Component {
	constructor(props) {
		super(props);
		this.continue = this.continue.bind(this);
		this.setValue = this.setValue.bind(this);
		this.birthdateChange = this.birthdateChange.bind(this);
	}
	componentDidMount() {
		this.setState({
			fechaNacimiento: new Date().toISOString()
		});
	}
	birthdateChange(v, fv) {
		let object = {}; object['fechaNacimiento'] = fv;
		this.setState(object);
	}
	setValue(event) {
		let object = {}; object[event.target.id] = event.target.value;
		this.setState(object);
	}
	validate() {
		let errors = [];

		if (this.state.privacidad == null || this.state.privacidad != 'on') {
			errors.push({ field: 'privacidad', message: 'Debe firmar el acuerdo de privacidad' });
		}

		if (this.state.nombre == null || this.state.nombre == '')
			errors.push({ field: 'nombre', message: 'El Nombre es requerido' });

		if (this.state.apellidoPaterno == null || this.state.apellidoPaterno == '')
			errors.push({ field: 'apellidoPaterno', message: 'El Apellido Paterno es requerido' });

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
					fechaNacimiento: fn.toISOString().substring(0, 10),
					correoElectronico: this.state.email,
					telefono: {
						numeroTelefono: this.state.celular
					},
					medioValidacion: 1,
					datosPrendarios: {
						numContrato: 0
					}
				}
			}
		);
	}
	onlyLetter(event) {
		var inputValue = event.which;
		if (!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)
			&& inputValue != 241 && inputValue != 209) {
			event.preventDefault();
		}
	}
	onlyNumbers(event) {
		var inputValue = event.which;
		if (!(inputValue >= 48 && inputValue <= 57)) {
			event.preventDefault();
		}
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
						<FormInput id="nombre" label="Nombre" onChange={this.setValue} onLoad={this.setField} pattern="[A-Za-z]" onKeyPress={this.onlyLetter} />
					</div>
					<div className="col-md-4">
						<FormInput id="apellidoPaterno" label="Apellido Paterno" onChange={this.setValue} pattern="[A-Za-z]" onKeyPress={this.onlyLetter} />
					</div>
					<div className="col-md-4">
						<FormInput id="apellidoMaterno" label="Apellido Materno" onChange={this.setValue} pattern="[A-Za-z]" onKeyPress={this.onlyLetter} />
					</div>
				</div>
				<div className="spacer-24"></div>
				<div className="row">
					<div className="col-md-4">
						<FormInput id="fechaNacimiento" label="Fecha Nacimiento" value={this.state ? this.state.fechaNacimiento : new Date().toISOString()} maxDate={new Date().toISOString()} onChange={this.birthdateChange} type="calendar" />
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
						<FormInput id="credencial" label="No. de Credencial Monte" onChange={this.setValue} maxLength="16" onKeyPress={this.onlyNumbers} />
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
							<input type="checkbox" id="privacidad" onChange={this.setValue} /> He le&iacute;do y aceptado el <a className="cond col-003" href="http://www.montepiedad.com.mx/portal/storage/Aviso-de-Privacidad-Jul-MiMonte.pdf" target="_blank">aviso de privacidad</a>
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