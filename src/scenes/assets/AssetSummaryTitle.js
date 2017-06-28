import React, { Component } from 'react';
import AssetStore from '../../flux/AssetStore';

class AssetSummaryTitle extends Component {
	constructor(props) {
		super(props);
		this.state = AssetStore.getState();
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="spacer-24"></div>
						<p className="s4 col-005 w400">Tu saldo es de $9.392,29 | Tienes 8 Boletas Activas</p>
						<div className="spacer-24"></div>
					</div>
				</div>
			</div>
		)
	}
}
export default AssetSummaryTitle;