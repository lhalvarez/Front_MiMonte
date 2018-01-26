var config = module.exports = {};

config.application = JSON.parse(process.env.VCAP_APPLICATION);

config.env = process.env.NODE_ENV;
config.hostname = config.application.uris[0];
config.mmendpoint = process.env.SERVER_MMENDPOINT;

config.mmconsumerId = process.env.SERVER_MMCONSUMERID;
config.mmdestinationId = process.env.SERVER_MMDESTINATIONID;

config.baseLocalUrl = 'https://' + config.hostname;

config.token_grant_type = 'client_credentials';
config.token_client_id = process.env.SERVER_APP_TOKEN_CLIENT_ID;
config.token_client_secret = process.env.SERVER_APP_TOKEN_CLIENT_SECRET;

config.request_debug = process.env.SERVER_LOG_REQUESTS;

config.npmendpoint = process.env.REACT_APP_NPM_ENDPOINT;
config.pdfenpoint = process.env.REACT_APP_NPM_PDF_ENDPOINT;
config.xmlenpoint = process.env.REACT_APP_NPM_XML_ENDPOINT;
