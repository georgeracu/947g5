const {app} = require('../setups/setup.js');
const MongoClient = require('mongodb').MongoClient;

const DB = '947g5';
const COLLECTION = 'addressbase';
const USERNAME = 'react-read';
const PASSWORD = '31vTs8wfBB9KvfIy';

app.post('/heatmaps', (req, res) => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-cbuck.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {useNewUrlParser: true});

  /**
   * Average prices on the whole dataset
   */
  const max = 71400000;
  const min = 498;
  const avg = 272745.7789;
  const std = 394919.9604536758;

  function getWeight() {}

  client.connect(err => {
    if (err) {
      console.log('Error occurred while connecting to MongoDB');
      console.log(`Error Message: ${err.message}`);
    } else {
      console.log('Successfully connected to the DB');
      const parameters = req.body;
      console.log(
        'Attempting to load dynamic radius, value:  ' + parameters.radius,
      );

      const coordinatesQuery = {
        location: {
          $geoWithin: {
            $centerSphere: [
              [parameters.longitude, parameters.latitude],
              parameters.radius / 6371,
            ],
          },
        },
      };

      const project = {location: 1, Price: 1};

      client
        .db(DB)
        .collection(COLLECTION)
        .find(coordinatesQuery, project)
        .toArray((err1, coordinates) => {
          if (err1) {
            console.log('Error occurred while querying DB');
            console.log(`Error Message: ${err1.message}`);
          } else {
            const modifiedResults = coordinates.map(coordinate => {
              return {
                latitude: coordinate.location.coordinates[1],
                longitude: coordinate.location.coordinates[0],
                weight: coordinate.price.valueOf() / avg,
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
