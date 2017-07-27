var config = module.exports = {};

config.env = process.env.NODE_ENV;
config.hostname = process.env.HOSTNAME;
config.mmendpoint = process.env.MMENDPOINT;

config.mmconsumerId = process.env.MMCONSUMERID;
config.mmdestinationId = process.env.MMDESTINATIONID;

config.baseLocalUrl = 'http://' + process.env.HOSTNAME + '/';

config.token_grant_type = 'client_credentials';
config.token_client_id = process.env.APP_TOKEN_CLIENT_ID;
config.token_client_secret = process.env.APP_TOKEN_CLIENT_SECRET;


