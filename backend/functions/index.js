// Set up Firebase functions
const functions = require('firebase-functions');

// Import the firestore
const coords = require('./routes/coords.js');

// Expose Express API as a single Cloud Function:
exports.coords = functions.https.onRequest(coords.app);
