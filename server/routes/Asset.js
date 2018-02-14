const request = require('request');
const appToken = require('../components/AppToken');
const config = require('../config')
const cache = require('memory-cache');
const uuidv4 = require('uuid/v4')

module.exports = (req, res) => {

	let requestBody = req.body;
	let folio = requestBody.folios.folio;
	
	let cacheKey = 'asset-' + folio;
	
	let cacheObject = cache.get(cacheKey);

	if (cacheObject) {
		res.json(cacheObject);
		return;
	}
	
	appToken(req, (appToken) => {
		if (appToken) {
			request.post({
				url: config.mmendpoint + '/NMP/OperacionPrendaria/Partidas/v1/Folio',
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
					cache.put(cacheKey, b1, 120 * 1000);
				}
				res.json(b1);
			});
		}
		else {
			res.json({
				codigoError: "FEB-0001",
				descripcionError: "No pudo obtenerse el token de aplicación",
				tipoError: "Error de Servicio",
				severidad: "1"
			});
		}
	});
}