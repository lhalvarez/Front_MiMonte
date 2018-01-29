const request = require('request');
const appToken = require('../components/AppToken');
const config = require('../config')
const cache = require('memory-cache');
const uuidv4 = require('uuid/v4')
const log4js = require('log4js');
const logger = log4js.getLogger('default');


/** http://localhost:6001/srv/download?lineDownload=1&cliente=711284&folio=120641726&token=eyJraWQiOiI3K0plUlpCQ1htaDBUUXc2Q3h4aDRkaXR6WHJPbG53WVhIK1wvMkhFaW1Faz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzY2I4Y2QyNi1jZDc4LTQzMjgtOGRiNC1iZTFjNjcyMmMxYjEiLCJldmVudF9pZCI6ImZkZTFkZjMxLTAyYjMtMTFlOC05NmU5LTNiYjdjOTU1M2VmNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9hTG9mbFM2dlIiLCJleHAiOjE1MTY5ODY4NzEsImlhdCI6MTUxNjk4MzI3MSwianRpIjoiMDliOWQzOGEtZDNjMy00NTJmLTgzM2ItYjZiYWMyMzJhNThlIiwiY2xpZW50X2lkIjoiNTBibmNqYmxtajhyYTRkMjYwN3E2MXVjOWgiLCJ1c2VybmFtZSI6ImVtb2xpbmFAbW9udGVwaWVkYWQuY29tLm14In0.hjDk_V5-eioKVyM2-_YsHYRYFHitJgQQwyf_lRpxfR7u0iHD47aP27YxLOSZ6-h93vdBeyU-KEupUgDSIJmzvV2O4GcYBE1hv4iiDQSLPCPWclPiae6JhN4cta178YMMQzznge6a5yR-48OULNjKO9Cs3sXtj8zwMb80c3MbsOyX7Mr0elSeyx7uzI9oIm37ea5f_Ku2P8t-FZgkgPcGcwfq2qbiC3GdJY_BRWVmBjK5ioVScm3IiLqPff4OYy_AgwL8lVarPXO7cunprNlcIhXErgPm9FYG7vypRVvp00qG9mtNWfloMgQQXHmNGhT6R5uB1fCMFCkbtwk9Ma5TQw


 * @param {*} req [linedownload, cliente, folio, token]
 * @param {*} res 
 */
module.exports = (req, res) => {

	//let requestBody = req.body;
	let requestBody = {
		numeroFolio: req.query.folio,
		numeroCliente: req.query.cliente,
		tokenTemporal: req.query.token, 
		lineDownload: req.query.linedownload ? 'inline' : 'attachment'
	}
	/*
	let requestBody = {
		numeroFolio:'120641726',
		numeroCliente:'711284',
		tokenTemporal:"eyJraWQiOiI3K0plUlpCQ1htaDBUUXc2Q3h4aDRkaXR6WHJPbG53WVhIK1wvMkhFaW1Faz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzY2I4Y2QyNi1jZDc4LTQzMjgtOGRiNC1iZTFjNjcyMmMxYjEiLCJldmVudF9pZCI6IjFkN2E0ZjY2LTAyMzQtMTFlOC1iMDgzLTY1OGQwNjE4MjRhNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9hTG9mbFM2dlIiLCJleHAiOjE1MTY5MzE5NDksImlhdCI6MTUxNjkyODM0OSwianRpIjoiOGU2MjZmNGYtNWUxZC00ZTE4LWIxYzctYTIyMWI3MDYyYWM3IiwiY2xpZW50X2lkIjoiNTBibmNqYmxtajhyYTRkMjYwN3E2MXVjOWgiLCJ1c2VybmFtZSI6ImVtb2xpbmFAbW9udGVwaWVkYWQuY29tLm14In0.aDUHzS6XZDvmUBgSIwp1ZIQMjsdF_e2sbGWy9R0O-N6X2Fz-FVgxQLIWKyFc52R7kzjK0Y3rYUCJJCGVgOL8ggdsB2DmVdzIM97QqsXGWiIULFR1dIp04GMvLXJsP6-JNW4H_ZtIwo3a7K8cu57w4Xct87ZME1J2sYfapWN5dG0h4Nhrofri4PwPiAv0wf-rQIDbCSmIA7injMQ3zxU28Q8HQS4ZT-4rULUZMcTANg58WMH2P4a0OfxwVFjEc_PUHw43Aevbr_zCKfBTI-eEE9H_DndqcWRXbG2eAumZzc2guXe8MCtefprq-S88lAHbdXYh_HHSBA3Xu9JGS08MEg"
	}
	*/

	//appToken(req, (appToken) => {
        
    //let tokenLocalStorage = req.body.tokenTemporal;
    //logger.log("tokenLocalStorage:" + tokenLocalStorage);

		//if (appToken) {

			request.post({
				url: config.pdfenpoint,
				headers: {
					'Content-Type': 'application/json',
					'usuario': req.headers.usuario,
					'idConsumidor': config.mmconsumerId,
					'idDestino': config.mmdestinationId,
					Authorization: 'Bearer ' + requestBody.tokenTemporal//appToken
				},
				json: true,
				body: requestBody,
				options: {
					checkServerIdentity: function (host, cert) {
						return true;
					}
				}
			}, (e1, r1, b1) => {


				logger.log("------------------------------b1");
				logger.log(b1);


				if (e1)
				{
                    logger.log("error:" + e1);

				}
			
                //res.json(b1);
                

                let fileBase64String = b1.archivoBase64;
                /**Procesamiento de dato para descarga PDF */
                
                res.set('Content-Disposition', 'attachment; filename="mimonte.pdf"'); // attachment/inline
                res.set('Content-Type', 'application/pdf');            
                let buffer = new Buffer(fileBase64String, 'base64');
                res.send(buffer);
                

                //res.json(fileBase64String)


			});
		//}
		// else {
		// 	console.error('App token failed...');
		// 	console.error(error);
		// 	res.json({
		// 		codigoError: "FEB-0001",
		// 		descripcionError: "No pudo obtenerse el token de aplicaci�n",
		// 		tipoError: "Error de Servicio",
		// 		severidad: "1"
		// 	});
		// }
    
        //});
}

