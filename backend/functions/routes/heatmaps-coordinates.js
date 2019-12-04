const {app} = require('../setups/setup.js');
const MongoClient = require('mongodb').MongoClient;

const DB = '947g5';
const COLLECTION = 'addressbase';
const USERNAME = 'react-read';
const PASSWORD = '31vTs8wfBB9KvfIy';

app.post('/heatmaps', (req, res) => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-cbuck.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {useNewUrlParser: true});
  client.connect(err => {
    if (err) {
      console.log('Error occurred while connecting to MongoDB');
      console.log(`Error Message: ${err.message}`);
    } else {
      console.log('Successfully connected to the DB');
      const longLats = req.body;
      const coordinatesQuery = {
        location: {
          $geoWithin: {
            $centerSphere: [[longLats.longitude, longLats.latitude], longLats.zoomdata /6371],
          },
        },
      };
      client
          .db(DB)
          .collection(COLLECTION)
          .find(coordinatesQuery)
          .toArray((err1, coordinates) => {
            if (err1) {
              console.log('Error occurred while querying DB');
              console.log(`Error Message: ${err1.message}`);
            } else {
              const modifiedResults = coordinates.map(coordinate => {
                return {
                  latitude: coordinate.location.coordinates[1],
                  longitude: coordinate.location.coordinates[0],
                  weight: 1,
                };
              });
              res.send(JSON.stringify(modifiedResults));
            }
          });
    }
  });
  client.close();
});

module.exports = {
  app,
};