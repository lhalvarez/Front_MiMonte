import React, { Component } from 'react'
import connectToStores from 'alt-utils/lib/connectToStores';
import { Link, Redirect } from 'react-router-dom'
import Title from '../../components/Title'
import Loading from '../../components/Loading'
import FormInput from '../../components/FormInput'
import Recaptcha from '../../components/Recaptcha'
import SessionStore from '../../flux/stores/SessionStore'
import Actions from '../../flux/Actions'

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setValue = this.setValue.bind(this);
	}
	componentDidMount() {
		this.setState({ username: '', password: '' })
	}
	static getStores() {
		return [SessionStore];
	}
	static getPropsFromStores() {
		return SessionStore.getState();
	}
	validate() {

		let errors = [];

		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.username) === false)
			errors.push({ field: 'email', message: 'El correo electrónico tiene un formato incorrecto' });

		if (errors.length > 0) {
			let errorMessage = '';
			errors.forEach(e => errorMessage += e.message + '\r\n');
			Actions.error(errorMessage);
			return false;
		}

		return true;
	}
	handleSubmit(e) {
		e.preventDefault();
		if (!this.validate())
			return;
		Actions.login(this.state.username, this.state.password);
	}
	setValue(event) {
		var object = {};
		object[event.target.id] = event.target.value;
		this.setState(object);
	}
	render() {
		return (
			<div>
				{this.props.sessionInfo.loggedIn && (
					<Redirect to="/home" />
				)}
				{this.props.location.pathname === '/activationSucceed' && (
					<div className="container">
						<div className="row">
							<div className="col-md-4 col-xs-12 col-md-offset-4">
								<div className="bg-info pad-12 shadow">
									<p className="s4 col-005 w400 cond">¡Tu usuario ya está activo!</p>
									<p>Ahora podrás consultar el estatus de tus empeños y pagar en línea.</p>
								</div>
							</div>
						</div>
					</div>
				)}
				{this.props.location.pathname === '/activationError' && (
					<div className="container">
						<div className="row">
							<div className="col-md-4 col-xs-12 col-md-offset-4">
								<div className="bg-info pad-12 shadow">
									<p className="s4 col-005 w400 cond">¡Ocurrio un error durante la activación!</p>
									<p>Comunicate con la mesa de ayuda.</p>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className="spacer-24"></div>


				<div className="container">
					<div className="row">
						<div className="col-md-4 col-xs-12 col-md-offset-4">
							<div className="panel panel-default well">
								<Loading visible={this.props.loggingIn || this.props.loading} text="verificando información" />


								{this.props.loggingIn === false && (
									<div>
										<Title title="Ingresa" />
										<div className="panel-body nomargin-top nopadding-top">
											<form onSubmit={this.handleSubmit} >
												<FormInput id="username" label="Usuario" subLabel="(Correo Electrónico)" onChange={this.setValue} />
												<FormInput id="password" label="Contraseña" type="password" onChange={this.setValue} />
												<Recaptcha />
												<button className="btn btn-danger btn-raised btn-sm center-block" type="submit">Ingresar</button>
											</form>
										</div>

										<div className="panel-footer text-right nopadding">
											<Link className="btn btn-flat btn-default btn-sm" to="/recoverypassword">¿Olvidaste tu Contraseña?<div className="ripple-container"></div></Link>
											<Link className="btn btn-flat btn-warning btn-sm" to="/register">Regístrate Aquí<div className="ripple-container"></div></Link>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connectToStores(Login);