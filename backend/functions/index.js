// Set up Firebase functions
const functions = require('firebase-functions');

// Export logs as a cloud function
const logs = require('./routes/logs.js');
exports.logs = functions.https.onRequest(logs.app);

// Export heatMapsCoordinates as a cloud function
const heatMapsCoordinates = require('./routes/heatmaps-coordinates.js');
exports.heatMapsCoordinates = functions.https.onRequest(
  heatMapsCoordinates.app,
);
