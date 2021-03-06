import React, { Component } from 'react';
import AssetStore from '../../flux/stores/AssetStore';
import connectToStores from 'alt-utils/lib/connectToStores';

class AssetSummaryTitle extends Component {
	static getStores() {
		return [AssetStore];
	}
	static getPropsFromStores() {
		return AssetStore.getState();
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="spacer-24"></div>
						{this.props.assetsB && (
							<p className="s4 col-005 w400">
								{this.props.totalBalance > 0 && (
									<span>Tu saldo es de ${this.props.totalBalance} | </span>
								)}
								Tienes {this.props.assetsB.length} Boletas Activas</p>
						)}
						<div className="spacer-24"></div>
					</div>
				</div>
			</div>
		)
	}
}
export default connectToStores(AssetSummaryTitle);