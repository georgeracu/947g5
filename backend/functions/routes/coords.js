// Set up Firebase functions
const functions = require('firebase-functions');

// Set up Firebase Admin for Firestore
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

// Set up Express
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: true})); // Automatically allow cross-origin requests

// Coordinates paths
const COLLECTION = 'coordinates';
const CREATE_COORD = '/create';
const READ_COORD = '/read';
const UPDATE_COORD = '/update';
const DELETE_COORD = '/delete';

/**
 * This endpoint returns all coordinates
 */
app.get(READ_COORD, (req, res) => {
  db.collection(COLLECTION)
    .get()
    // eslint-disable-next-line promise/always-return
    .then(snapshot => {
      let coords = [];
      snapshot.forEach(doc => {
        coords.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      res.send(coords);
    })
    .catch(err => {
      res.send({
        code: -1,
        message: err.message,
      });
    });
});

/**
 * This endpoint inserts a coordinate into the collection
 */
app.post(CREATE_COORD, (req, res) => {
  let coordsObj = req.body;
  db.collection(COLLECTION)
    .add({
      latitude: coordsObj.latitude,
      longitude: coordsObj.longitude,
      deviceId: coordsObj.deviceId,
      timestamp: coordsObj.timestamp,
    })
    .then(docRef => {
      res.send({
        code: 1,
        message: docRef.id,
      });
      return '';
    })
    .catch(error => {
      res.send({
        code: -1,
        message: error.message,
      });
    });
});

module.exports = {
  app,
};
