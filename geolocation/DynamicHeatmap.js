import Geolocation from 'react-native-geolocation-service';

/*async function DHM(Long, Lat) {
  const Datastore = require('mongodb');
  const db = new Datastore();
  db.findOne({Street: 'PARK CRESCENT ROAD'}, function (err, docs) {
    console.log(docs.Street);
  });
}

async function dynamicheatmap(Long, Lat) {
  const MongoClient = require('mongodb').MongoClient;
  const uri =
    'mongodb+srv://<react-read>:<31vTs8wfBB9KvfIy>@cluster0-cbuck.mongodb.net/test?retryWrites=true&w=majority';
  const client = new MongoClient(uri, {useNewUrlParser: true});
  const coordinatesQuery = {
    location: {
      $geoWithin: {
        $centerSphere: [[Long, Lat], 5 / 6371],
      },
    },
  };
  client.connect(err => {
    client
      .db('947g5')
      .collection('addressbase')
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
    client.close();
  });
}

module.exports = {
  dynamicheatmap,
};*/
