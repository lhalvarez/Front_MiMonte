import React, { Component } from 'react';
import AssetList from './assets/AssetList';
import AssetSummaryTitle from './assets/AssetSummaryTitle';

class Dashboard extends Component {
	render() {
		return (
			<div>
				<AssetSummaryTitle />
				<div className="container">

					<AssetList showSearch={false} />

				</div>
			</div>
		);
	}
}

export default Dashboard;