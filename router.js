// Import controllers
const Authentication = require('./controllers/authentication');

/**
 * Define all the routes here
 */
module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.send(['one', 'two', 'three']);
  });

  app.post('/signup', Authentication.signup);
};
