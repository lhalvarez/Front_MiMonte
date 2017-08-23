const request = require('request');
const config = require('../config')
const log4js = require('log4js');
const logger = log4js.getLogger('file');
const cache = require('memory-cache');

module.exports = (req, callback) => {
	
	let user = req.headers.usuario;

	logger.info('Getting application token ' + user);

	let cacheKey = 'appToken-' + user;
	
	let cachedAppToken = cache.get(cacheKey);

	if (cachedAppToken) {
		callback(cachedAppToken);
		logger.info('App Token cached');
	} else {
		request.post({
			url: config.mmendpoint + '/NMP/oauth/token',
			form: {
				grant_type: config.token_grant_type,
				client_id: config.token_client_id,
				client_secret: config.token_client_secret
			}
		}, (error, response, body) => {
			if (response && response.statusCode == 200) {
				let token = JSON.parse(body);
				let appToken = token.access_token;
				cache.put(cacheKey, appToken, 120 * 1000);
				callback(appToken);
			}
			else {
				console.error('App token failed...');
				console.error(error);
			}
		});
	}
}