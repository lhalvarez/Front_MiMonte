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

	getAppTokenNPM() {
		return axios.create().post(
			ApiConfig.NPM_END_POINT,
			qs.stringify({}),
			{
				headers: {
					'grant_type': 'client_credentials',
					'client_id': 'e24fe3a5-43db-4c83-99ea-e0723e9a9c93',
					'client_secret': '0d7f208d-0a5b-4225-984d-fd4313360e6b'
				}
			});
			
	}

}

export default ApiBase