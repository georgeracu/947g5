// Set up Firebase functions
const functions = require('firebase-functions');

// Export coordinates as a cloud function
const coords = require('./routes/coords.js');
exports.coords = functions.https.onRequest(coords.app);

// Export configs as a cloud function
const configs = require('./routes/configs.js');
exports.configs = functions.https.onRequest(configs.app);
