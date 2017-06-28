import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

import Header from '../components/Header';
import Footer from '../components/Footer';

import Assets from './Assets';
import AssetDetails from './assets/AssetDetails';
import Payments from './Payments';
import Promotions from './Promotions';
import Dashboard from './Dashboard';

class AppView extends Component {
	render() {
		return (

			<div className="App">

				<Header />
				<Router>
					<div>
						<div className="container-fluid bkg-000 inshadow">
							<div className="container">
								<div className="row">
									<div className="col-md-12">
										<nav className="navbar navbar-default nomargin-bottom">
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
													<li className="w400 cond"><a href="./login/">CERRAR SESI&oacute;N</a></li>
													<li className="cond visible-md visible-lg"><a className="btn btn-primary btn-fab btn-fab-mini bkg-002 relative" ><i className="material-icons amber-text text-darken-2 z-depth-1">notifications</i></a></li>
												</ul>
											</div>
										</nav>
									</div>
								</div>
							</div>
						</div>

						<Route path="/" />
						<Route path="/home" component={Dashboard} />
						<Route path="/assets" component={Assets} />
						<Route path="/asset/details/:id" component={AssetDetails} />
						<Route path="/payments" component={Payments} />
						<Route path="/promotions" component={Promotions} />
					</div>
				</Router>
				<Footer/>
			</div>

		);
	}
}


export default AppView;
