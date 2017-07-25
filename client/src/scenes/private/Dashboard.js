import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import AssetList from '../components/AssetList';
import AssetSummaryTitle from '../components/AssetSummaryTitle';
import Actions from '../../flux/Actions';

import Promotions from '../components/Promotions';

class Dashboard extends Component {
	constructor() {
		super();
	}
	componentDidMount() {
		setTimeout(() => Actions.fetchAssets(), 3000);
	}
	render() {
		return (
			<div>
				<AssetSummaryTitle />
				<div className="container">
					<AssetList showSearch={false} title="Prendas en Comercial" />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-6">
						</div>
						<div className="col-md-6">
							<Promotions/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
