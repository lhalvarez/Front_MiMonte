const request = require('request');
const appToken = require('../components/AppToken');
const config = require('../config')
const cache = require('memory-cache');
var _ = require('underscore');
const log4js = require('log4js');
const logger = log4js.getLogger('default');

module.exports = (req, res) => {


	let cacheKey = 'assets-' + req.body.requestGUID;
	
	console.log('Callback for -> ' + cacheKey);
	let cachedRequest = cache.get(cacheKey);
	if (cachedRequest) {

		let newest = req.body.partidas.partida;
		let oldest = cachedRequest.data.partidas.partida;


		_.each(newest, (newestPrenda) => {
			
			var match = _.find(oldest, function (oldestPrenda) { return oldestPrenda.prenda.folio == newestPrenda.prenda.folio })
			if (match) {
				if (!match.saldos) {
					match.saldos = {};
				}
				
				if (newestPrenda.saldos.saldoRefrendo)
				{
					match.saldos.saldoRefrendo = newestPrenda.saldos.saldoRefrendo;
				}
				if (newestPrenda.saldos.saldoDesempeno)
				{
					match.saldos.saldoDesempeno = newestPrenda.saldos.saldoDesempeno;
				}
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