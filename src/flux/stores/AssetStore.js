import alt from '../../Alt'
import Actions from '../Actions'
import AssetsApi from '../../api/AssetsApi'
import uuid from 'uuid/v4'

const AssetSource = {
	load: {
		local: (state) => {
			if (state) {
				let shouldProcess = false;

				if (state.assetsA) {
					state.assetsA.forEach((element) => {
						if (!element.saldos
							|| !element.saldos.saldoRefrendo
							|| !element.saldos.saldoDesempeno)
							shouldProcess = true;
					})
				}
				else {
					shouldProcess = true;
				}
				
				if (!shouldProcess) {
					return state;
				}
				else {
					return null;
				}
			}
			else {
				return null;
			}
		},
		remote: (state) => {	
			return Promise.all([
				AssetsApi.byClient(state.session.clientId, 1, state.trackingA),
				AssetsApi.byClient(state.session.clientId, 2, state.trackingB),
				AssetsApi.byClient(state.session.clientId, 3, state.trackingC)
			])
		},
		loading: Actions.loading,
		success: Actions.updateAssets,
		error: Actions.error,
		shouldProcessBalance: (assets) => {
			let process = false;
			assets.forEach((element) => {
				process = !element.saldos
					|| !element.saldos.saldoRefrendo
					|| !element.saldos.saldoDesempeno;

				if (process)
					return true;
			})
			return process;
		}
	}
}
class AssetStore {
	constructor() {
		this.loading = false;
		this.errorMessage = null;
		this.state = {
			asset: {},
			assets: [],
			trackingA: uuid(),
			trackingB: uuid(),
			trackingC: uuid(),
			loading: false,
			totalBalance: 0,
			balanceRetries: 0,
			balanceFailed: false,
			filter: '',
			filterSource: []
		}
		this.registerAsync(AssetSource);
		this.bindListeners({
			handleFetchAssets: Actions.fetchAssets,
			handleUpdateAssets: Actions.updateAssets,
			handleFetchAssetsBalance: Actions.fetchAssetsBalance,
			handleUpdateAssetDetail: Actions.updateAsset,
			handleFetchAssetDetail: Actions.fetchAssetDetail
		});
	}
	handleFetchAssetDetail(state) {
		this.state.loading = true;
		alert('lodin..');
	}
	handleUpdateAssetDetail(state) {
		this.state.loading = false;
		if (state && state.asset)
		{
			this.state.asset = state.asset.partidas.partida[0];
		}
	}
	handleFetchAssets(state) {
		
		if (state.filter && state.filterSource)
		{
			
			this.state.filteredAssetsA = [this.state.assetsA[0]];
			this.handleUpdateAssets(this.state);
		}
		else 
		{
			if (this.getInstance().isLoading() == false && this.loading == false) {
				this.state.filter = state.filter;
				this.state.filterSource = state.filterSource;
				this.state.session = state.session;
				this.state.loading = true;
				this.getInstance().load(this.state);
			}
		}
	}
	handleFetchAssetsBalance() {
		if (this.getInstance().isLoading() == false) {
			this.getInstance().load(this.state);
		}
	}
	handleUpdateAssets(state) {
		if (this.state && this.state.balanceRetries > 10)
		{
			clearInterval(this.timerId);
			this.state.balanceFailed = true;
		}

		let finalState = {
			asset: null,
			assetsA: [],
			assetsB: [],
			assetsC: [],
			filteredAssetsA: [],
			loading: false,
			totalBalance: 0,
			filter: '',
			filterSource: []
		};

		if (state.length > 0) {
			finalState.assetsA = this.parseState(state[0]);

			if (state.length >= 1)
				finalState.assetsB = this.parseState(state[1]);
			if (state.length >= 2)
				finalState.assetsC = this.parseState(state[2]);
		}
		else {
			finalState = state;
		}

		if (this.state.balanceFailed == true)
		{
			finalState.assetsA.forEach((element) => {
				if (!element.saldos
					|| !element.saldos.saldoRefrendo
					|| !element.saldos.saldoDesempeno)
				{
					element.saldos = { failed: true }
				}
			})
		}

		finalState.filteredAssetsA = this.state.filteredAssetsA ? this.state.filteredAssetsA : finalState.assetsA;
		
		//if (this.state.filter && this.state.filter != '' && this.state.filterSource) {
		//	if (this.state.assetsA === this.state.filterSource) {

		//		finalState.filteredAssetsA = [finalState.assetsA[0]];
		//		finalState.filter = this.state.filter;
		//		finalState.filterSource = this.state.filterSource;

		//		let foo = finalState.assetsA.filter((asset) => {
		//			return asset.prenda.descripcion.indexOf(this.state.filter) >= 0;
		//		});	

		//		debugger;
		//	}
		//}

		localStorage.setItem("assets", JSON.stringify(finalState));
		this.setState(finalState);

		if (this.state.balanceRetries == 0) {
			this.timerId = setInterval(() => this.refreshBalance(), 5000);
		}

		this.errorMessage = null;

		this.state.balanceRetries++;
	}

	refreshBalance() {
		Actions.fetchAssetsBalance();
	}
	isLoading() {
		return this.getInstance().isLoading();
	}
	parseState(state) {
		if (state && state.data && state.data.partidas) {
			return state.data.partidas.partida;
		}
		else {
			return [];
		}
	}
}

export default alt.createStore(AssetStore, 'AssetStore');