const request = require('request');
const appToken = require('../components/AppToken');
const config = require('../config')
const cache = require('memory-cache');
var _ = require('underscore');

module.exports = (req, res) => {

	let cacheKey = 'assets-' + req.body.requestGUID;

	console.log('Callback for -> ' + cacheKey);
	let cachedRequest = cache.get(cacheKey);
	if (cachedRequest) {

		let newest = req.body.partidas.partida;
		let oldest = cachedRequest.partidas.partida;

		_.each(newest, (newestPrenda) => {
			console.log('Looking for ' + newestPrenda.prenda.folio);

			var match = _.find(oldest, function (oldestPrenda) { return oldestPrenda.prenda.folio === newestPrenda.prenda.folio })
			if (match) {
				console.log('Updating ' + newestPrenda.prenda.folio);
				match.saldos = newestPrenda.saldos;
			}
		});
		
		res.json({
			"respuesta": {
				"codigo": "0",
				"mensaje": "Saldos Recibidos"
			}
		});
	}
	else
	{
		res.json({
			"respuesta": {
				"codigo": "1",
				"mensaje": "Saldos No Recibidos"
			}
		});
	}

	
}