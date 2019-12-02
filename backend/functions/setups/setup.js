// Set up Firebase functions
const functions = require('firebase-functions');

// Set up Firebase Admin for Firestore
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// Set up Express
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: true})); // Automatically allow cross-origin requests

module.exports = {
  app,
  db,
};
