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
			debugger;
			var x = AssetsApi.byClient(state.session.clientId);
			return x;
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
		this.waitFor(SessionStore);

		if (this.getInstance().isLoading() == false)
		{
			this.setState({ assets: this.state.assets, session: state.session });
			this.getInstance().load();
		}
		
	}
	handleUpdateAssets(state) {
		debugger;
		this.waitFor(SessionStore);
		let finalState = { assets: state.data.partidas.partida };
		localStorage.setItem("assets", JSON.stringify(finalState));
		this.setState(finalState);
		this.errorMessage = null;
	}
	isLoading() {
		debugger;
		return this.getInstance().isLoading();
	}
}

export default alt.createStore(AssetStore, 'AssetStore');