import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import Actions from '../../flux/Actions';
import AssetList from '../components/AssetList';
import AssetSummaryTitle from '../components/AssetSummaryTitle';
import Promotions from '../components/Promotions';
import AssetStore from '../../flux/stores/AssetStore'
import AssetListB from '../components/AssetListB';

class Dashboard extends Component {
	componentDidMount() {
		Actions.fetchAssets.defer();
	}
	static componentDidConnect() {
		
	}
	static getStores() {
		return [AssetStore];
	}
	static getPropsFromStores() {
		return AssetStore.getState();
	}
	render() {
		return (
			<div>
				<AssetSummaryTitle />

				<div className="container">
					<div className="tab-content">
						<div role="tabpanel" className="tab-pane fade in active" id="bol1">
							<div className="panel panel-default well nopadding-bottom">
								<AssetList showSearch={true} loading={this.props.assetsB == null} assets={this.props.assetsB} title="Tus boletas próximas a vencer" />
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="tab-content">
								<div role="tabpanel" className="tab-pane fade in active" id="bol1">
									<div className="panel panel-default well nopadding-bottom">

										<AssetListB showSearch={true} loading={this.props.assetsC == null} assets={this.props.assetsC} title="Prendas en Comercialización" />
									</div></div></div>
						</div>
						<div className="col-md-6">
							<Promotions />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connectToStores(Dashboard);
