const request = require('request');
const config = require('../config')

module.exports = (callback) => {
	console.log('Getting app token ' + config.token_client_id);
	request.post({
		url: config.mmendpoint + '/NMP/oauth/token',
		form: {
			grant_type: config.token_grant_type,
			client_id: config.token_client_id,
			client_secret: config.token_client_secret
		}
	}, callback);
}