const appToken = require('../components/AppToken');
const config = require('../config')
const log4js = require('log4js');
const logger = log4js.getLogger('default');

module.exports = (req, res) =>
{
	appToken(function (error, response, body) {
		
		if (error) {
			console.error(error);
		}

		if (response && response.statusCode == 200) {
			logger.info('Application Token Successful Issued.');
			res.status(200);
			res.json(JSON.parse(body));
		}
		else {
			logger.error('Application Token ERROR. Unable to get a valid token.');
			res.json({
				servicesToken: 'FAILED'
			});
		}
	});
}