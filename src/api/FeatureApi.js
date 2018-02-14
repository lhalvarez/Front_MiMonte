import ApiBase from './ApiBase'
import ApiConfig from './ApiConfig'
import axios from 'axios';

class FeatureApi extends ApiBase {
	constructor() {
		super();
		this.CancelToken = axios.CancelToken;
		this.state = {
			tokens: []
		}
	}
	
}

export default new FeatureApi();