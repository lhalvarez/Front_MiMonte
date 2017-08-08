import ApiBase from './ApiBase'
import ApiConfig from './ApiConfig'


class AssetsApi extends ApiBase {
	byClient(clientNumber, criteria, trackingId) {
		
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
		debugger;
		return super.buildPost(
			ApiConfig.BackendEndpoint + ApiConfig.AssetsByNumberApiMethod,
			{
				folios: {
					folio: [ number ]
				}
			}
		);
	}
}

export default new AssetsApi();