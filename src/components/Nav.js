import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Actions from '../flux/Actions'
import SessionStore from '../flux/stores/SessionStore'
import connectToStores from 'alt-utils/lib/connectToStores';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class MMNav extends Component {
	componentDidMount() {
	}
	static getStores() {
		return [SessionStore];
	}
	static getPropsFromStores() {
		return SessionStore.getState();
	}
	logoutClick() {
		Actions.logout();
	}
	render() {
		var navBar;

		if (this.props != null
			&& this.props.sessionInfo != null
			&& this.props.sessionInfo.loggedIn) {

			navBar =
				<Navbar collapseOnSelect>
					<Navbar.Header>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem eventKey={1}><Link to="/home">INICIO</Link></NavItem>
							<NavItem eventKey={2} ><Link to="/assets">BOLETAS</Link></NavItem>
							<NavItem eventKey={2} onClick={this.logoutClick}>CERRAR SESIÓN</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>;
		}
		else {
			navBar = <div className="spacer-48">&nbsp;</div>;
		}

		return (
			<div>
				<div className="container-fluid bkg-000 inshadow">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								{navBar}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connectToStores(MMNav);