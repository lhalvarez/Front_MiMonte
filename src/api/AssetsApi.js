import ApiBase from './ApiBase'
import ApiConfig from './ApiConfig'

class AssetsApi extends ApiBase {
	constructor() {
		super();
	}
	byClient(clientNumber, criteria) {
		return super.buildPost(
			ApiConfig.BackendEndpoint + ApiConfig.AssetsByClientApiMethod, 
			{
				idCliente: clientNumber,
				criterios: {
					criterioBoleta: criteria
				}
			}
		);
	}
}

export default new AssetsApi();