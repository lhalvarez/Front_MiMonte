import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from 'react-router-dom'
import Actions from '../flux/Actions'
import SessionStore from '../flux/stores/SessionStore'
import connectToStores from 'alt-utils/lib/connectToStores';

class Nav extends Component {
	constructor(props) {
		super(props);
	}
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

			navBar = <nav className="navbar navbar-default nomargin-bottom">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#mnuPpal" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						</div>
						<div className="collapse navbar-collapse" id="mnuPpal">
							<ul className="nav navbar-nav navbar-right">
								<li className="w400 cond">
									<Link to="/home">INICIO</Link></li>
								<li className="w400 cond"><Link to="/assets">BOLETAS</Link></li>
								<li className="w400 cond"><Link to="/payments">PAGO EN L&iacute;NEA</Link></li>
								<li className="w400 cond"><a href="#" onClick={this.logoutClick}>CERRAR SESI&oacute;N</a></li>
								<li className="cond visible-md visible-lg"><a className="btn btn-primary btn-fab btn-fab-mini bkg-002 relative" ><i className="material-icons amber-text text-darken-2 z-depth-1">notifications</i></a></li>
							</ul>
						</div>
					</nav>;
		}
		else {
			navBar = <div className="spacer-48">asfdsaf</div>;
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

export default connectToStores(Nav);