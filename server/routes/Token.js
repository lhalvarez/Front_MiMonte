const appToken = require('../components/AppToken');
const config = require('../config')
const log4js = require('log4js');
const logger = log4js.getLogger('default');

module.exports = (req, res) =>
{
	appToken(req, (appToken) => {
		console.log("Token server/routes/Token.js   appToken");

		if (appToken) {
			logger.info('Application Token Successful Issued.');
			res.json(
				{
					"access_token": appToken
				});
		}
		else {
			logger.error('Application Token ERROR. Unable to get a valid token.');
			res.json({
				servicesToken: 'FAILED'
			});
		}
	});
}