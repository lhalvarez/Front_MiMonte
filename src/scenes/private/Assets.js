import React, { Component } from 'react';
import Title from '../../components/Title';
import AssetList from '../components/AssetList';
import AssetTab from '../components/AssetTab';
import Actions from '../../flux/Actions';
import AssetStore from '../../flux/stores/AssetStore'
import connectToStores from 'alt-utils/lib/connectToStores';

class Assets extends Component {
	componentDidMount() {
		
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
				<Title title="Boletas"/>
				<AssetTab />
				<AssetList showSearch={true} assets={this.props.assetsA}/>
			</div>
		)
	}
}

export default connectToStores(Assets);