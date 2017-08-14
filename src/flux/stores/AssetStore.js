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
							|| !element.saldos.saldoDesempeno) {
							shouldProcess = true;
						}
					})
				}

				if (shouldProcess)
					return null;

				if (state.assetsB) {
					state.assetsB.forEach((element) => {
						if (!element.saldos
							|| !element.saldos.saldoRefrendo
							|| !element.saldos.saldoDesempeno) {
							shouldProcess = true;
						}
					})
				}

				if (shouldProcess)
					return null;

				if (state.assetsA == null || state.assetsB == null) {
					return null;
				}
				else {
					return state;
				}
			}

			return null;
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
			loadingDetails: false,
			totalBalance: 0,
			balanceRetries: 0,
			balanceFailed: false,
			filter: '',
			filterSource: []
		}
	}
	refresh() {
		this.setState(this.state);
	}
	handleLogin() {
		clearInterval(this.timerId);
	}
	handleLogout() {
		clearInterval(this.timerId);
		AssetsApi.cancelAll();
		this.initializeState();
	}
	handleFetchAssetDetail(state) {
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

		let finalState = this.state;

		if (this.state && this.state.balanceRetries > 10) {
			clearInterval(this.timerId);
			finalState.balanceFailed = true;
		}

		if (state) {
			if (Array.isArray(state) == false) {
				state = [state];
			}
			let me = this;
			state.forEach(s => {
				if (s.data) {
					let assetsData = s.data;
					let parsedDate = this.parseState(s);

					if (assetsData.requestGUID == me.state.trackingA) {
						finalState.assetsA = parsedDate;
					}
					else if (assetsData.requestGUID == me.state.trackingB) {
						finalState.assetsB = parsedDate;
					}
					else if (assetsData.requestGUID == me.state.trackingC) {
						finalState.assetsC = parsedDate;
					}
				}
			})
		}

		if (finalState.balanceFailed) {
			finalState.assetsB.forEach((element) => {
				element.saldos = {
					failed: element.saldos == null || (element.saldos.saldoRefrendo == null && element.saldos.saldoDesempeno == null)
				}
			});

			finalState.assetsA.forEach((element) => {
				element.saldos = {
					failed: element.saldos == null || (element.saldos.saldoRefrendo == null && element.saldos.saldoDesempeno == null)
				}
			})
		}

		finalState.filter = this.state.filter;
		finalState.filterSource = this.state.filterSource;
		
		if (finalState.balanceRetries == 0) {
			this.timerId = setInterval(() => this.refreshBalance(), 5000);
		}

		finalState.balanceRetries++;
		
		this.setState(finalState);
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