const request = require('request');
const appToken = require('../components/AppToken');
const config = require('../config')
const cache = require('memory-cache');
const uuidv4 = require('uuid/v4')

module.exports = (req, res) => {

	let requestBody = req.body;
	
	let trazabilidadGuid = requestBody.trazabilidad.GUID ? requestBody.trazabilidad.GUID : uuidv4(); 

	requestBody.trazabilidad = {
		GUID: trazabilidadGuid,
		urlCallBack: config.baseLocalUrl + '/srv/balance'
	};

	let cacheKey = 'assets-' + trazabilidadGuid;
	
	let cacheObject = cache.get(cacheKey);

	if (cacheObject) {
		res.json(cacheObject.data);
		return;
	}
	else {
		cacheObject = {
			clientId: requestBody.idCliente,
			criteria: requestBody.criterios.criterioBoleta,
			trackingId: trazabilidadGuid,
			data: null
		};
	}
	
	appToken(function (error, response, body) {

		if (response && response.statusCode == 200) {
			let token = JSON.parse(body);
			let appToken = token.access_token;
			
			request.post({
				url: config.mmendpoint + '/NMP/OperacionPrendaria/Partidas/v1/Cliente',
				headers: {
					'Content-Type': 'application/json',
					'usuario': req.headers.usuario,
					'idConsumidor': config.mmconsumerId,
					'idDestino': config.mmdestinationId,
					Authorization: 'Bearer ' + appToken
				},
				json: true,
				body: requestBody,
				options: {
					checkServerIdentity: function (host, cert) {
						return true;
					}
				}
			}, (e1, r1, b1) => {

				if (e1)
				{
					console.error(e1);
				}
				if (b1) {
					b1.requestGUID = trazabilidadGuid;
					cacheObject.data = b1;
					cache.put(cacheKey, cacheObject);
				}
				res.json(b1);
			});
		}
		else {
			console.error('App token failed...');
			console.error(error);
			res.json({
				codigoError: "FEB-0001",
				descripcionError: "No pudo obtenerse el token de aplicación",
				tipoError: "Error de Servicio",
				severidad: "1"
			});
		}
	});
}