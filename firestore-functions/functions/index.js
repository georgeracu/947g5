const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

// Add middleware to authenticate requests
//app.use(myMiddleware);

app.get('/coords', (req, res) => {
  db.collection('coordinates')
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

// Expose Express API as a single Cloud Function:
exports.coords = functions.https.onRequest(app);
