const {app, db} = require('../setups/setup.js');

app.post('/log', (req, res) => {
  db.collection('logs').add(req.body);
});

module.exports = {
  app,
};
