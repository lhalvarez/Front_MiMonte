'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const morgan = require('morgan');

const activation = require('./routes/Activation')
const token = require('./routes/Token')
const assets = require('./routes/Assets')
const assetsCallBack = require('./routes/AssetsCallback')

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Public proxy service
app.get('/svc/activate', activation);
// Internal access token.
app.get('/svc/token', token);

app.post('/svc/assets', assets);
app.post('/svc/balance', assetsCallBack);

app.listen(8080);
console.log('Serving MiMonte on localhost:8080');	