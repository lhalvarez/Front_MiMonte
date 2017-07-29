import alt from '../../Alt'
import Actions from '../Actions'
import AssetsApi from '../../api/AssetsApi'
import SessionStore from './SessionStore'

const AssetSource = {
	load: {
		local: (state) => {
			//debugger;
			if (state.assets && state.assets.length > 0) {
				return state;
			}
			//else {
			//	let savedState = localStorage.getItem("assets");
			//	if (savedState) {
			//		state = JSON.parse(savedState);
			//	}
			//}

			//return state;
		},
		remote: (state) => {
			return Promise.all([
				AssetsApi.byClient(state.session.clientId,1),
				AssetsApi.byClient(state.session.clientId,2),
				AssetsApi.byClient(state.session.clientId,3)
			]);
		},
		loading: Actions.loading,
		success: Actions.updateAssets,
		error: Actions.error
	}
}
class AssetStore {
	constructor() {
		this.state = { assets: [] };
		this.loading = false;
		this.errorMessage = null;
		this.registerAsync(AssetSource);
		this.bindListeners({
			handleFetchAssets: Actions.fetchAssets,
			handleUpdateAssets: Actions.updateAssets
		});
	}
	handleFetchAssets(state)
	{
		if (this.getInstance().isLoading() == false)
		{
			this.setState({ 
				assets: this.state.assets,
				session: state.session,
				loading: true,
				totalBalance: 0
			});
			this.getInstance().load();
		}
		
	}
	handleUpdateAssets(state) {
		let finalState = {
			assetsA: [],
			assetsB: [],
			assetsC: [], 
			loading: false, 
			totalBalance: 140
		};
		if (state.length > 0)
		{
			finalState.assetsA = this.parseState(state[0]);
			finalState.assetsB = this.parseState(state[1]);
			finalState.assetsC = this.parseState(state[2]);
		}
		else {
			finalState.assetsA = this.parseState(state);
		}
		
		localStorage.setItem("assets", JSON.stringify(finalState));
		this.setState(finalState);
		this.errorMessage = null;
	}
	isLoading() {
		return this.getInstance().isLoading();
	}
	parseState(state)
	{
		if (state.data && state.data.partidas)
		{
			return state.data.partidas.partida;
		}
		else
		{
			return [];
		}
	}
}

export default alt.createStore(AssetStore, 'AssetStore');