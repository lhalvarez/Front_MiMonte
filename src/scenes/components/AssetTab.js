import React, { Component } from 'react';

class AssetTab extends Component {

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-body">
								<div className="col-md-12">
									<ul className="nav nav-pills " id="tabBoletas">
										<li role="presentation" className="active cond w400"><a href="#bol1" aria-controls="bol1" role="tab" data-toggle="tab">Prendas en Empe&Ntilde;o</a></li>
										<li role="presentation" className="cond w400"><a href="#bol2" aria-controls="bol2" role="tab" data-toggle="tab">Prendas en Comercializaci&oacute;n</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default AssetTab;