const request = require('request');
const config = require('../config')
const log4js = require('log4js');
const logger = log4js.getLogger('file');

module.exports = (callback) => {
	logger.info('Getting application token');
	request.post({
		url: config.mmendpoint + '/NMP/oauth/token',
		form: {
			grant_type: config.token_grant_type,
			client_id: config.token_client_id,
			client_secret: config.token_client_secret
		}
	}, callback);
}