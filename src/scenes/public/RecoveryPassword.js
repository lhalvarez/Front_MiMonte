import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import FormInput from '../../components/FormInput'
import Loading from '../../components/Loading'
import Actions from '../../flux/Actions'
import AuthenticationApi from '../../api/AuthenticationApi'
import { Link, Redirect } from 'react-router-dom'
import SessionStore from '../../flux/stores/SessionStore';

class RecoveryPassword extends Component {
	constructor(props) {
		super(props);
		this.retrievePassword = this.retrievePassword.bind(this);
		this.registerPassword = this.registerPassword.bind(this);
		this.setValue = this.setValue.bind(this);
	}
	componentDidMount() {
		this.setState({ username: '', token: '', newPassword: '' })
		Actions.logout();
	}
	validateRetrievePassword() {

		let valid = true;
		let errors = [];

		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.username) == false)
			errors.push({ field: 'email', message: 'El correo electrónico tiene un formato incorrecto' });

		if (errors.length > 0) {
			let errorMessage = '';
			errors.forEach(e => errorMessage += e.message + '\r\n');
			Actions.error(errorMessage);
			return false;
		}

		return true;
	}
	validateRegisterPassword() {

		let valid = true;
		let errors = [];

		if (this.state.token == null || this.state.token == '')
			errors.push({ field: 'email', message: 'El Código SMS es requerido' });

		if (this.state.newPassword == null || this.state.newPassword != this.state.newPasswordConfirmation)
			errors.push({ field: 'password', message: 'Confirmación de Contraseña no coincide' });

		if (errors.length > 0) {
			let errorMessage = '';
			errors.forEach(e => errorMessage += e.message + '\r\n');
			Actions.error(errorMessage);
			return false;
		}

		return true;
	}
	retrievePassword(e) {
		e.preventDefault();
		if (!this.validateRetrievePassword())
			return;
		Actions.retrievePassword(this.state.username);
	}
	registerPassword(e) {
		e.preventDefault();
		if (!this.validateRegisterPassword())
			return;
		Actions.registerPassword(this.state.username, this.state.newPassord, this.state.token);
	}
	setValue(event) {
		var object = {};
		object[event.target.id] = event.target.value;
		this.setState(object);
	}
	static getStores() {
		return [SessionStore];
	}
	static getPropsFromStores() {
		return SessionStore.getState();
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-xs-12 col-md-offset-4">
						<div className="panel panel-default well">
							<div className="panel-header">
								<p className="s2 cond w700 col-005 nomargin-bottom nopadding-bottom" >Recuperar contraseña</p>
							</div>
							
							<Loading visible={this.props.loading} />

							{this.props.loading == false && (
								<div>
									{this.props.recoveryPasswordTokenIssued == false && (
										<div className="panel-body nomargin-top nopadding-top">
											<form onSubmit={this.retrievePassword} >
												<div className="spacer-12"></div>
												<p><span className="w400">Recupera tu contraseña ingresando tu correo electrónico de usuario. Verificaremos que exista y te enviaremos un código de desbloqueo vía SMS al teléfono enlazado a tu cuenta.</span></p>

												<FormInput id="username" label="Usuario" subLabel="(Correo Electrónico)" onChange={this.setValue} />

												<div className="spacer-12"></div>
												<div className="g-recaptcha center-block" data-sitekey="6LdjGiMUAAAAAL4-XZ-ONukUQrA2OWaz3MUHWKcF"></div>
												<div className="spacer-12"></div>
												<button className="btn btn-danger btn-raised btn-sm center-block" type="submit">Enviar</button>
											</form>
										</div>
									)}
									{this.props.recoveryPasswordTokenIssued && (
										<div className="panel-body nomargin-top nopadding-top">
											<form onSubmit={this.registerPassword} >
												<div className="spacer-12"></div>
												<p><span className="w400">Escribe el código de desbloqueo que te llegó vía SMS al teléfono ** **** {this.props.retrievePasswordPhoneNumber} enlazado a tu cuenta.</span></p>
												<FormInput id="token" label="Código de desbloqueo" onChange={this.setValue} />
												<FormInput id="newPassword" label="Contraseña" type="password" onChange={this.setValue} />
												<FormInput id="newPasswordConfirmation" label="Confirma tu contraseña" type="password"  onChange={this.setValue} />
												<div className="spacer-12"></div>
												<button className="btn btn-danger btn-raised btn-sm center-block" type="submit">Enviar</button>
											</form>
										</div>
									)}
									{this.props.registerPasswordCompleted && (
										<Redirect to="/login" />
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default connectToStores(RecoveryPassword);