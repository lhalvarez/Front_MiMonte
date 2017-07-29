import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import connectToStores from 'alt-utils/lib/connectToStores';
import { Redirect } from 'react-router'
import SessionStore from '../../flux/stores/SessionStore'

import Assets from './Assets';
import AssetDetails from '../components/AssetDetails';
import Payments from './Payments';
import Promotions from './Promotions';
import Dashboard from './Dashboard';

class LoggedInContainer extends Component {
	componentDidMount() {
	}
	static getStores() {
		return [SessionStore];
	}
	static getPropsFromStores() {
		return SessionStore.getState();
	}
	render() {
		return (
			<div>
				{this.props.sessionInfo.loggedIn === false && (
					<Redirect to="/login" />
				)}
				{this.props.sessionInfo.loggedIn  && (
					<Redirect to="/home" />
				)}
				<Route path="/home" component={Dashboard} />
				<Route path="/assets" component={Assets} />
				<Route path="/asset/details/:id" component={AssetDetails} />
				<Route path="/payments" component={Payments} />
				<Route path="/promotions" component={Promotions} />
			</div>
		)
	}
}
export default connectToStores(LoggedInContainer);