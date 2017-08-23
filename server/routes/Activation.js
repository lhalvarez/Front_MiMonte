const appToken = require('../components/AppToken');
const config = require('../config');
const request = require('request');
const log4js = require('log4js');
const logger = log4js.getLogger('default');

module.exports = (req, res) => {

	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);

	let activationCode = req.query.t;
	let username = req.query.u;
	
	appToken(req, (appToken) => {
		if (appToken) {

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
					console.error(e1);
					res.redirect('/activationError');
				}
				else if (r1.statusCode == 200) {
					res.statusCode = 307;
					res.redirect('/activationSucceed');
				}
				else {
					res.statusCode = 307;
					res.redirect('/activationError');
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