// Set up Firebase functions
const functions = require('firebase-functions');

// Export configs as a cloud function
const configs = require('./routes/configs.js');
exports.configs = functions.https.onRequest(configs.app);

// Export logs as a cloud function
const logs = require('./routes/logs.js');
exports.logs = functions.https.onRequest(logs.app);
