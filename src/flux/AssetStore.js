import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Asset from './Asset';
import Dispatcher from './Dispatcher';
import alt from '../Alt';
import dummyData from '../mocks/obtenerCreditos.json';
var assets = dummyData.partidas.partida;
class AssetStore extends ReduceStore {
	constructor() {
		super(Dispatcher);
	}
	getInitialState() {
		return { assets: assets };
	}
	reduce(state, action) {
		return state;
	}
}

export default new AssetStore();
//export default alt.createStore(AssetStore, 'AssetStore');