import React, { Component } from 'react';
import Title from '../components/Title';
import AssetList from './assets/AssetList';
import AssetTab from './assets/AssetTab';

class Assets extends Component {

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