import React, { Component } from 'react';
import UserInfo from './UserInfo';
import connectToStores from 'alt-utils/lib/connectToStores';
import MMNav from './Nav';
import SessionStore from '../flux/stores/SessionStore'
import { Link } from 'react-router-dom'

class Header extends Component {
	static getStores() {
		return [SessionStore];
	}
	static getPropsFromStores() {
		return SessionStore.getState();
	}
	render() {
		var isLoggedIn = this.props.sessionInfo != null
			&& this.props.sessionInfo.loggedIn;
		return (
			<div>

				<div className="container-fluid bkg-001">
					<div className="container">
						{isLoggedIn && (
							<div className="row visible-sm visible-md visible-lg">
								<div className="col-sm-3 pad-12">
									<Link to="/home">
										<img src="images/logoNMPch.png" className="img-responsive" alt="" />
									</Link>
								</div>

								<div className='col-sm-3 pad-12'>
									<div className="spacer-24"></div>
									<p className="text-right"><img src="images/logo-tel.png" alt="" /></p>
								</div>
								<div className="col-sm-6 pad-12">
									<UserInfo />
								</div>
							</div>
						)}
						{isLoggedIn == false && (
							<div className="row visible-sm visible-md visible-lg">
								<div className="col-sm-3 pad-12">
									<Link to="/home">
										<img src="images/logoNMPch.png" className="img-responsive" alt="" />
									</Link>
								</div>

								<div className='col-sm-9 pad-12'>
									<div className="spacer-24"></div>
									<p className="text-right"><img src="images/logo-tel.png" alt="" /></p>
								</div>
							</div>
						)}
					</div>
					<div className="row visible-xs">
						<div className="col-xs-6 pad-12">
							<img src="images/logoNMPch.png" className="img-responsive" alt="" />
						</div>
						<div className="col-xs-6 pad-12">
							<UserInfo />
						</div>
					</div>
					<MMNav />
					<div className="spacer-24"></div>
				</div>
			</div>

		);
	}
}

export default connectToStores(Header);