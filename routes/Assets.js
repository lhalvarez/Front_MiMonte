const request = require('request');
const appToken = require('../components/AppToken');
const config = require('../config')
const cache = require('memory-cache');
const uuidv4 = require('uuid/v4')

module.exports = (req, res) => {

	let requestBody = req.body;
	
	//requestBody.trazabilidad.GUID = uuidv4(); 
	requestBody.trazabilidad.urlCallBack = config.baseLocalUrl + '/balance';
	let cacheKey = 'assets-' + requestBody.trazabilidad.GUID;
	console.log("Callback url -> " + requestBody.trazabilidad.urlCallBack);

	let cachedRequest = cache.get(cacheKey);
	if (cachedRequest)
	{
		res.json(cachedRequest);
		return;
	}

	appToken(function (error, response, body) {

		if (response && response.statusCode == 200) {
			let token = JSON.parse(body);
			let appToken = token.access_token;
			console.log('Getting assets...' + cacheKey);

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
				console.log('Assets output ' + b1);
				if (e1)
				{
					console.error(e1);
				}
				cache.put(cacheKey, b1);
				console.log('Cached response with ' + cacheKey);
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