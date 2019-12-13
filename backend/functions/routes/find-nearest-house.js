const {app} = require('../setups/setup.js');
const MongoClient = require('mongodb').MongoClient;

const DB = '947g5';
const COLLECTION = 'addressbase';
const USERNAME = 'react-read';
const PASSWORD = '31vTs8wfBB9KvfIy';

app.post('/nearest', (req, res) => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-cbuck.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {useNewUrlParser: true});

  client.connect(err => {
    if (err) {
      console.log('Error occurred while connecting to MongoDB');
      console.log(`Error Message: ${err.message}`);
    } else {
      console.log('Successfully connected to the DB');
      const parameters = req.body;

      const nearestQuery = {
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parameters.longitude, parameters.latitude],
            },
            $maxDistance: 10,
          },
        },
      };

      client
        .db(DB)
        .collection(COLLECTION)
        .findOne(nearestQuery, (err1, nearestHouse) => {
          if (err1) {
            console.log('Error occurred while querying DB');
            console.log(`Error Message_nearest: ${err1.message}`);
          } else {
            // const modifiedResults = coordinates.map(coordinate => {
            //   return {
            //     PAON: coordinate.PAON,
            //     Street: coordinate.Street,
            //     Postcode: coordinate.Postcode,
            //     Price: coordinate.Price,
            //     latitude: coordinate.location.coordinates[1],
            //     longitude: coordinate.location.coordinates[0],
            //   };
            // });
            res.send(JSON.stringify(nearestHouse));
          }
        });
    }
  });
  client.close();
});

module.exports = {
  app,
};
