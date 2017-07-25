import ApiBase from './ApiBase'
import ApiConfig from './ApiConfig'

class AssetsApi extends ApiBase {
	constructor() {
		super();
	}
	byClient(clientNumber) {
		return super.buildPost(
			ApiConfig.AssetsByClientApiMethod, 
			{
				idCliente: clientNumber,
				criterios: {
					criterioBoleta: 2
				},
				trazabilidad: {
					GUID: '123e4567-e89b-12d3-a456-426655440000',
					urlCallBack: ''
				}
			}
		);
	}
}

export default new AssetsApi();