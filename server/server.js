'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const morgan = require('morgan');
const cfenv = require('cfenv');
const fs = require('fs');

const activation = require('./routes/Activation')
const token = require('./routes/Token')
const assets = require('./routes/Assets')
const assetsCallBack = require('./routes/AssetsCallback')

const log4js = require('log4js');
log4js.configure({
  appenders: { 
  	out: { type: 'stdout' },
  	file: { type: 'file', filename: 'mimonte-server.log' } 
  },
  categories: { default: { appenders: ['file', 'out'], level: 'debug' } }
});

const logger = log4js.getLogger('default');
const config = require('./config')

if (config.request_debug == 1)
{
	require('request-debug')(request);
}

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'build')));


app.all('/srv/activate', activation);
app.post('/srv/token', token);

app.post('/srv/assets', assets);
app.post('/srv/balance', assetsCallBack);


app.get('/', function (req, res) {

	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);

	res.sendfile('index.html', { root: path.join(__dirname, '..', 'build') });
});

app.get('*', function (req, res) {

	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);

	res.sendFile('index.html', { root: path.join(__dirname, '..', 'build') });
});

var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port || 6003, appEnv.bind,  function() {
	logger.info('Env configuration -> ');
	logger.info('Static resources @ ' + path.join(__dirname, 'client', 'build'));

	logger.info('config.env ' + config.env);
	logger.info('hostname '+ config.hostname);
	logger.info('mmendpoint '+ config.mmendpoint);
	logger.info('mmdestinationId ' + config.mmdestinationId);
	logger.info('mmconsumerId ' + config.mmconsumerId);
	logger.info('baseLocalUrl '+ config.baseLocalUrl);
	logger.info('token_client_id '+ config.token_client_id);
	logger.info('token_client_secret ' + config.token_client_secret);
	logger.info('server started on ' + appEnv.url);
	
	console.log("server starting on " + appEnv.url);

})