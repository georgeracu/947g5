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

app.get(READ_COORD, (req, res) => {
  db.collection(COLLECTION)
    .get()
    // eslint-disable-next-line promise/always-return
    .then(snapshot => {
      let listOfCoords = [];
      snapshot.forEach(doc => {
        listOfCoords.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      res.send(JSON.stringify(listOfCoords));
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
});

app.post(CREATE_COORD, (req, res) => {
  let coordsObj = req.body;
  let response = db
    .collection(COLLECTION)
    .add({
      latitude: coordsObj.latitude,
      longitude: coordsObj.longitude,
      timestamp: coordsObj.timestamp,
    })
    .then(docRef => {
      return {
        message: docRef.id,
      };
    })
    .catch(error => {
      console.log(error.message);
      return {
        message: error.message,
      };
    });
  res.send(JSON.stringify(response));
});

module.exports = {
  app,
};
