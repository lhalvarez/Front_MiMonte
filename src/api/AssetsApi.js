import ApiBase from './ApiBase'
import ApiConfig from './ApiConfig'


class AssetsApi extends ApiBase {
	byClient(clientNumber, criteria, trackingId) {
		console.log('Getting assets -> ' + trackingId);
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
}

export default new AssetsApi();