'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const morgan = require('morgan');
const servicesBaseUrl = 'https://iamdr.montepiedad.com.mx:4444';

var appToken = {
	currentAppToken: null,
	fetchToken: function (callback) {
		request.post({
			url: servicesBaseUrl + '/NMP/oauth/token',
			form: {
				grant_type: 'client_credentials',
				client_id: 'e24fe3a5-43db-4c83-99ea-e0723e9a9c93',
				client_secret: '0d7f208d-0a5b-4225-984d-fd4313360e6b'
			}
		}, callback);
	}
}

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Public proxy service
app.get('/svc/activate', (req, res) => {
	let activationCode = req.query.t;
	let username = req.query.u;

	appToken.fetchToken(function (error, response, body) {
		if (response.statusCode == 200) {
			let token = JSON.parse(body);
			let appToken = token.access_token;

			request.put({
				url: servicesBaseUrl + '/NMP/GestionClientes/UsuariosMonte/v1/solicitarActivacion',
				headers: {
					'Content-Type': 'application/json',
					usuario: 'usuarioMonte',
					idConsumidor: 25,
					idDestino: 14,
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
				}
				if (r1.statusCode == 200 || r1.statusCode == 500) {
					console.log('Activación... ' + b1);
					res.json(b1);
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
			console.error('App token failed...');
			res.json({
				"codigoError": "FEB-0001",
				"descripcionError": "No pudo obtenerse el token de aplicación",
				"tipoError": "Error de Servicio",
				"severidad": "1"
			});
		}
	});

});

// Internal access token.
app.get('/svc/token', (req, res) => {
	console.log('Getting app token...')
	appToken.fetchToken(function (error, response, body) {
		if (response.statusCode == 200) {
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
});

app.listen(3000);
console.log('Serving MiMonte on localhost:3000');	