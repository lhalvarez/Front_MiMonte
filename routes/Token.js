const appToken = require('../components/AppToken');
const config = require('../config')

module.exports = (req, res) =>
{
	console.log('Getting app token...')
	console.log(config.mmendpoint);
	appToken(function (error, response, body) {
		
		if (error) {
			console.error(error);
		}

		if (response && response.statusCode == 200) {
			console.log('App token issued...');
			res.status(200);
			res.json(JSON.parse(body));
		}
		else {
			console.error('App token failed...');
			res.json({
				servicesToken: 'FAILED'
			});
		}
	});
}