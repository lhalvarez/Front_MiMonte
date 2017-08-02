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

				//if (state.assetsB && !shouldProcess) {
				//	state.assetsB.forEach((element) => {
				//		if (!element.saldos
				//			|| !element.saldos.saldoRefrendo
				//			|| !element.saldos.saldoDesempeno)
				//			shouldProcess = true;
				//	})
				//}
				//if (state.assetsC && !shouldProcess) {
				//	state.assetsC.forEach((element) => {
				//		if (!element.saldos
				//			|| !element.saldos.saldoRefrendo
				//			|| !element.saldos.saldoDesempeno)
				//			shouldProcess = true;
				//	})
				//}

				if (!shouldProcess) {
					console.log('Assets Source - Using local');
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
			balanceRetries: 0
		}
		this.registerAsync(AssetSource);
		this.bindListeners({
			handleFetchAssets: Actions.fetchAssets,
			handleUpdateAssets: Actions.updateAssets,
			handleFetchAssetsBalance: Actions.fetchAssetsBalance,
			handleFetchAssetDetail: Actions.fetchAssetDetail
		});
	}
	handleFetchAssetDetail(state) {
		if (state && state.asset)
		{
			debugger;
			this.state.asset = state.asset.partidas.partida[0];
		}
	}
	handleFetchAssets(state) {
		if (this.getInstance().isLoading() == false) {

			this.state.session = state.session;
			this.state.loading = true;

			this.getInstance().load(this.state);
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
			clearTimeout(this.timerId);
			console.log('Assets balance reached max retries');
		}

		let finalState = {
			assetsA: [],
			assetsB: [],
			assetsC: [],
			loading: false,
			totalBalance: 0
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

		localStorage.setItem("assets", JSON.stringify(finalState));
		this.setState(finalState);

		this.timerId = setTimeout(() => this.refreshBalance(), 5000);

		this.errorMessage = null;
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