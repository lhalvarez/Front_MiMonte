import React, { Component } from 'react';
import Title from '../../components/Title';
import AssetList from '../components/AssetList';
import AssetTab from '../components/AssetTab';
import Actions from '../../flux/Actions';

class Assets extends Component {
	componentDidMount() {
		setTimeout(() => Actions.fetchAssets(), 2000);
	}
	render() {
		return (
			<div>
				<Title title="Boletas"/>
				<AssetTab />
				<AssetList showSearch={true}/>
			</div>
		)
	}
}

export default Assets;