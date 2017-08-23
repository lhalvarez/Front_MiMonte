import axios from 'axios';
import ApiConfig from './ApiConfig'
import qs from 'qs'

class ApiBase {
	buildPost(apiMethod, data, config) {
		return axios.create().post(apiMethod, data, config);
	}
	buildPut(apiMethod, data, config) {
		return axios.create().put(apiMethod, data, config);
	}
	getAppToken() {
		return axios.create().post(
			ApiConfig.BackendEndpoint + ApiConfig.AppTokenApiMethod,
			qs.stringify({}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
			
	}

}

export default ApiBase