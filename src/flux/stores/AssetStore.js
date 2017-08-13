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

				if (shouldProcess == false && state.assetsB) {
					state.assetsB.forEach((element) => {
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
			if (state.session) {
				return Promise.all([
					AssetsApi.byClient(state.session.clientId, 1, state.trackingA),
					AssetsApi.byClient(state.session.clientId, 2, state.trackingB),
					AssetsApi.byClient(state.session.clientId, 3, state.trackingC)
				])
			}
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
		this.initializeState();

		this.registerAsync(AssetSource);

		this.bindListeners({
			handleFetchAssets: Actions.fetchAssets,
			handleUpdateAssets: Actions.updateAssets,
			handleFetchAssetsBalance: Actions.fetchAssetsBalance,
			handleUpdateAssetDetail: Actions.updateAsset,
			handleFetchAssetDetail: Actions.fetchAssetDetail,
			handleLogout: Actions.logout,
			handleLogin: Actions.loggedIn
		});
	}
	initializeState() {

		let trackingA = uuid();// sessionStorage.getItem("assetsTrackingA");
		let trackingB = uuid();// sessionStorage.getItem("assetsTrackingB");
		let trackingC = uuid();//sessionStorage.getItem("assetsTrackingC");

		this.state = {
			asset: {},
			assets: [],
			trackingA: (trackingA) ? trackingA : uuid(),
			trackingB: (trackingB) ? trackingB : uuid(),
			trackingC: (trackingC) ? trackingC : uuid(),
			loading: false,
			totalBalance: 0,
			balanceRetries: 0,
			balanceFailed: false,
			filter: '',
			filterSource: []
		}
	}
	handleLogin() {
		this.initializeState();
		clearInterval(this.timerId);
	}
	handleLogout() {
		clearInterval(this.timerId);
		AssetsApi.cancelAll();
		this.initializeState();
	}
	handleFetchAssetDetail(state) {
		debugger;
		this.state.asset = null;
		this.state.loadingDetails = true;
		this.setState(this.state);
	}
	handleUpdateAssetDetail(state) {
		this.state.loadingDetails = false;
		if (state && state.asset) {
			this.state.asset = state.asset.partidas.partida[0];
			this.setState(this.state);
		}
	}
	handleFetchAssets(state) {
		debugger;
		if (state.filter && state.filterSource) {
			this.state.filter = state.filter;
			this.state.filterSource = state.filterSource;
			this.handleUpdateAssets(this.state);
		}
		else {
			if (this.getInstance().isLoading() == false && this.loading == false) {

				this.state.session = state.session;
				this.state.loading = true;
				this.setState(this.state);
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
		if (this.state && this.state.balanceRetries > 15) {
			clearInterval(this.timerId);
			this.state.balanceFailed = true;
		}

		let finalState = {
			assetsA: [],
			assetsB: [],
			assetsC: [],
			sourceAssetsA: [],
			sourceAssetsB: [],
			sourceAssetsC: [],
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

		if (this.state.balanceFailed == true) {
			finalState.assetsA.forEach((element) => {
				if (!element.saldos
					|| !element.saldos.saldoRefrendo
					|| !element.saldos.saldoDesempeno) {
					element.saldos = { failed: true }
				}
			})
		}

		finalState.filter = this.state.filter;
		finalState.filterSource = this.state.filterSource;

		if (this.state.filter && this.state.filter != '' && this.state.filterSource) {
			if (this.state.assetsA === this.state.filterSource) {
				let filter = this.state.filter;
				finalState.assetsA = finalState.sourceAssetsA.filter((asset) => {
					return asset.prenda.descripcion.toLowerCase().indexOf(filter) >= 0;
				});
			}
		}
		else {
			finalState.sourceAssetsA = finalState.assetsA;
			finalState.sourceAssetsB = finalState.assetsB;
			finalState.sourceAssetsC = finalState.assetsC;

			if (this.state.balanceRetries == 0) {
				this.timerId = setInterval(() => this.refreshBalance(), 5000);
			}

			this.state.balanceRetries++;
		}

		sessionStorage.setItem("assetsStoreState", JSON.stringify(finalState));
		this.setState(finalState);



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

			state.data.partidas.partida.forEach((element) => {
				element.folio = element.prenda.folio;
				element.descripcion = element.prenda.descripcion;
			});

			return state.data.partidas.partida;
		}
		else {
			return [];
		}
	}
}

export default alt.createStore(AssetStore, 'AssetStore');