const {app, db} = require('../setups/setup.js');

// Coordinates paths
const COORDINATES = 'coordinates';
const CREATE_COORD = '/create';
const READ_COORD = '/read';
const UPDATE_COORD = '/update';
const DELETE_COORD = '/delete';

/**
 * This endpoint returns all coordinates
 */
app.get(READ_COORD, (req, res) => {
  db.collection(COORDINATES)
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
  let coords = req.body;
  db.collection(COORDINATES)
    .add(coords)
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
