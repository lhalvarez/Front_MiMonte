import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import History from '../flux/History'

import LoggedInContainer from './private/Container'
import connectToStores from 'alt-utils/lib/connectToStores';
import Login from './public/Login'
import Register from './public/Register'
import RecoveryPassword from './public/RecoveryPassword'
import Header from '../components/Header'
import Footer from '../components/Footer'
import 'react-confirm-alert/src/react-confirm-alert.css'
import GlobalStore from '../flux/stores/GlobalStore'
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Actions from '../flux/Actions';

class AppView extends Component {
	static getStores() {
		return [GlobalStore];
	}
	static getPropsFromStores() {
		return GlobalStore.getState();
	}
	render() {
		return (
			<div className="App">
				<Router history={History}>
					<div>
						<Header />
						<Modal show={this.props.showErrorsDialog}>
							<Modal.Header>
								<Modal.Title>Atención</Modal.Title>
							</Modal.Header>

							<Modal.Body>
								{this.props.error}
							</Modal.Body>

							<Modal.Footer>
								<Button onClick={Actions.cleanError}>Continuar</Button>
							</Modal.Footer>
						</Modal>

						<Switch>
							<Route path="/activationSucceed" component={Login} />
							<Route path="/activationError" component={Login} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route path="/recoverypassword" component={RecoveryPassword} />
							<Route component={LoggedInContainer} />
						</Switch>
						<Footer />
					</div>
				</Router>

			</div>
		);
	}
}


export default connectToStores(AppView);
