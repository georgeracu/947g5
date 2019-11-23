const {app} = require('../setups/setup.js');
const MongoClient = require('mongodb').MongoClient;

const DB = 'PricePaid';
const COLLECTION = 'Addresses';
const USERNAME = '947g5';
const PASSWORD = 'automation';

app.get('/heatmaps-coordinates', (req, res) => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@947g5-nx4jt.azure.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {useNewUrlParser: true});
  client.connect(err => {
    if (err) {
      console.log('Error occurred while connecting to MongoDB');
      console.log(`Error Message: ${err.message}`);
    } else {
      console.log('Successfully connected to the DB');
      const collection = client.db(DB).collection(COLLECTION);
      collection
        .find({})
        .limit(1000)
        .toArray((err1, coordinates) => {
          if (err1) {
            console.log('Error occurred while querying DB');
            console.log(`Error Message: ${err1.message}`);
          } else {
            const modifiedResults = coordinates.map(coordinate => {
              return {
                latitude: coordinate.LATITUDE,
                longitude: coordinate.LONGITUDE,
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
