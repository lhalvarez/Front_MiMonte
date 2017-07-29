import React, { Component } from 'react';
import UserInfo from './UserInfo';
import Nav from './Nav';
import { Link } from 'react-router-dom'

class Header extends Component {

	render() {
		return (
			<div>

				<div className="container-fluid bkg-001">
					<div className="container">
						<div className="row visible-sm visible-md visible-lg">
							<div className="col-sm-3 pad-12">
								<Link to="/home">
									<img src="images/logoNMPch.png" className="img-responsive" alt="" />
								</Link>
							</div>
							<div className="col-sm-3 pad-12">
								<div className="spacer-24"></div>
								<p className="text-right"><img src="images/logo-tel.png" alt="" /></p>
							</div>
							<div className="col-sm-6 pad-12">
								<UserInfo />
							</div>
						</div>
						<div className="row visible-xs">
							<div className="col-xs-6 pad-12">
								<img src="images/logoNMPch.png" className="img-responsive" alt="" />
							</div>
							<div className="col-xs-6 pad-12">
								<div className="spacer-24"></div>
								<p className="text-right"><img src="images/logo-tel.png" alt="" /></p>
							</div>
							<div className="col-xs-12">
								<UserInfo />
							</div>
						</div>
					</div>
				</div>
				<Nav />
				<div className="spacer-24"></div>
			</div>

		);
	}
}

export default Header;