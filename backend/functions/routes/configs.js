const {app, db} = require('../setups/setup.js');

// Configs paths
const CONFIGS = 'configs';
const GEOLOCATION_CONFIG = '/geoConfig';

app.get(GEOLOCATION_CONFIG, (req, res) => {
  db.collection(CONFIGS)
    .doc('geolocationConfig')
    .get()
    // eslint-disable-next-line promise/always-return
    .then(snapshot => {
      res.send(snapshot.data());
    })
    // eslint-disable-next-line handle-callback-err
    .catch(err => {
      res.send('');
    });
});

module.exports = {
  app,
};
