var Intercom = require('intercom.io');
var env = process.env;

if (!env.INTERCOM_API_KEY) {
  throw new Error('intercom_init requires the INTERCOM_API_KEY env variable');
}

if (!env.INTERCOM_APP_ID) {
  throw new Error('intercom_init requires the INTERCOM_APP_ID env variable');
}

var options = {
  apiKey: process.env.INTERCOM_API_KEY,
  appId: process.env.INTERCOM_APP_ID
};

module.exports = new Intercom(options);