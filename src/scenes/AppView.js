import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from 'react-router-dom'
import History from '../flux/History'

import LoggedInContainer from './private/Container'
import connectToStores from 'alt-utils/lib/connectToStores';
import Dashboard from './private/Dashboard'
import Login from './public/Login'
import Register from './public/Register'
import RecoveryPassword from './public/RecoveryPassword'
import Header from '../components/Header'
import Footer from '../components/Footer'

import Confirm from 'react-confirm-bootstrap';

import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';

import ConfirmLink from 'react-confirm-dialog';

import 'react-confirm-alert/src/react-confirm-alert.css' 
import GlobalStore from '../flux/stores/GlobalStore'
import Actions from '../flux/Actions'

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
