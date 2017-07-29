const appToken = require('../components/AppToken');
const config = require('../config');
const request = require('request');
const log4js = require('log4js');
const logger = log4js.getLogger('default');

module.exports = (req, res) => {

	let activationCode = req.query.t;
	let username = req.query.u;

	console.log('Activation user invoked / Token: ' + activationCode +  ' Username: ' + username);

	appToken(function (error, response, body) {
		if (error) {
			console.error(error);
		}

		if (response && response.statusCode == 200) {
			let token = JSON.parse(body);
			let appToken = token.access_token;

			request.put({
				url: config.mmendpoint + '/NMP/GestionClientes/UsuariosMonte/v1/solicitarActivacion',
				headers: {
					'Content-Type': 'application/json',
					usuario: 'usuarioMonte',
					idConsumidor: config.mmconsumerId,
					idDestino: config.mmdestinationId,
					Authorization: 'Bearer ' + appToken
				},
				json: true,
				body: {
					"usuario": {
						"nombreUsuario": username,
						"medioContacto": {
							"contactoPor": 2,
							"tipoContacto": "correo",
							"valorContacto": username
						},
						"datosValidacion": {
							"token": activationCode
						}
					}
				}
			}, function (e1, r1, b1) {

				if (e1) {
					console.log(e1);
					res.redirect('/activationError');
				}
				else if (r1.statusCode == 200 || r1.statusCode == 500) {
					console.log('Activación... ' + b1);
					res.redirect('/activationSucceed');
				}
				else {

					res.json({
						"codigoError": "FEB-0001",
						"descripcionError": "No pudo activarse el usuario.",
						"tipoError": "Error de Servicio",
						"severidad": "1"
					})
				}
			});

		}
		else {
			console.error('Unable to get an application token');
			res.json({
				"codigoError": "FEB-0001",
				"descripcionError": "No pudo obtenerse el token de aplicación",
				"tipoError": "Error de Servicio",
				"severidad": "1"
			});
		}
	});
};