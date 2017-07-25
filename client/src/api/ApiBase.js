import axios from 'axios';
import ApiConfig from './ApiConfig'
import Actions from '../flux/Actions'
import qs from 'qs'

class ApiBase {
	buildPost(apiMethod, data, config) {
		return axios.create().post(apiMethod, data, config);
	}
	getAppToken() {
		return axios.create().post(ApiConfig.AppTokenApiMethod,
			qs.stringify({
				'grant_type': 'client_credentials',
				'client_id': ApiConfig.MMClientId,
				'client_secret': ApiConfig.MMClientSecret
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
			
	}

}

export default ApiBase