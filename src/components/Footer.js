import React, { Component } from 'react';

class Footer extends Component {

	render() {
		return (
			<div>
				<div className="footer container-fluid bkg-010 pad-6">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="spacer-12"></div>
								<a className="cond col-001 text-underline s4" href="#">AVISO DE PRIVACIDAD</a>
								<span className="cond col-001 s4">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;TEL&Eacute;FONO DE ATENCI&Oacute;N 01 800 EL MONTE (01 800 35 666 83)</span>
								<div className="pull-right">
									<a className="btn btn-primary btn-fab btn-fab-mini bkg-002 relative" ><i className="material-icons">chat</i></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;