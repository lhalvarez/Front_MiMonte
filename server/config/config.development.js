var config = module.exports = {};

config.env = process.env.NODE_ENV;
config.hostname = process.env.SERVER_HOSTNAME;
config.mmendpoint = process.env.SERVER_MMENDPOINT;

config.mmconsumerId = process.env.SERVER_MMCONSUMERID;
config.mmdestinationId = process.env.SERVER_MMDESTINATIONID;

config.baseLocalUrl = 'http://' + process.env.SERVER_HOSTNAME;

config.token_grant_type = 'client_credentials';
config.token_client_id = process.env.SERVER_APP_TOKEN_CLIENT_ID;
config.token_client_secret = process.env.SERVER_APP_TOKEN_CLIENT_SECRET;

config.request_debug = process.env.SERVER_LOG_REQUESTS;
