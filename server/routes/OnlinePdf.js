const request = require('request');
const appToken = require('../components/AppToken');
const config = require('../config')
const cache = require('memory-cache');
const uuidv4 = require('uuid/v4')
const log4js = require('log4js');
const logger = log4js.getLogger('default');


/**
 * @param {*} req [linedownload, cliente, folio, token]
 * @param {*} res 
 */
module.exports = (req, res) => {

	let requestBody = {
		numeroFolio: req.query.folio,
		numeroCliente: req.query.cliente,
		tokenTemporal: req.query.token, 
		lineDownload: req.query.linedownload ? 'inline' : 'attachment'
	}

			request.post({
				url: config.pdfenpoint,
				headers: {
					'Content-Type': 'application/json',
					'usuario': req.headers.usuario,
					'idConsumidor': config.mmconsumerId,
					'idDestino': config.mmdestinationId,
					Authorization: 'Bearer ' + requestBody.tokenTemporal
				},
				json: true,
				body: requestBody,
				options: {
					checkServerIdentity: function (host, cert) {
						return true;
					}
				}
			}, (e1, r1, b1) => {


				logger.log("------------------------------b1")
				logger.log(b1)

				if (e1)
				{
                    logger.log("error:" + e1);

				}        

                let fileBase64String = b1.archivoBase64;
                
                res.set('Content-Disposition', 'inline; filename="mimonte.pdf"'); // attachment/inline
                res.set('Content-Type', 'application/pdf');            
                let buffer = new Buffer(fileBase64String, 'base64');
                res.send(buffer);
                
			});
}

