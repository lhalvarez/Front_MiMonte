import ApiBase from './ApiBase'
import ApiConfig from './ApiConfig'
import axios from 'axios';

class AssetsApi extends ApiBase {
	constructor() {
		super();
		this.CancelToken = axios.CancelToken;
		this.state = {
			tokens: []
		}
	}
	cancelAll(){
		if (this.state.tokens)
		{
			this.state.tokens.forEach(t => {
				console.log('canceling.. ' + t.key);
				t.token.cancel();
			});
		}
	}
	getCancelToken(clientNumber, criteria, trackingId, cancelExistent)
	{
		let tokenKey = clientNumber + criteria + trackingId;

		let tokenInfo = this.state.tokens.find(ti => {
			return (ti.key == tokenKey);
		});

		if (tokenInfo) {
			//tokenInfo.token.cancel();
			tokenInfo.token = this.CancelToken.source();
			return tokenInfo.token;
		}
		else {
			let tokenInfo = {
				key: tokenKey,
				token: this.CancelToken.source()
			};

			this.state.tokens.push(tokenInfo);

			return tokenInfo.token;
		}
	}
	byClient(clientNumber, criteria, trackingId) {
		
		let ctoken = this.getCancelToken(clientNumber, criteria, trackingId, true);
		
		return super.buildPost(
			ApiConfig.BackendEndpoint + ApiConfig.AssetsByClientApiMethod,
			{
				idCliente: clientNumber,
				criterios: {
					criterioBoleta: criteria
				},
				trazabilidad: {
					GUID: trackingId
				}
			}
		);
	}
	byNumber(number) {
		return super.buildPost(
			ApiConfig.BackendEndpoint + ApiConfig.AssetsByNumberApiMethod,
			{
				folios: {
					folio: [number]
				}
			}
		);
	}
}

export default new AssetsApi();