// Import controllers
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Middleware interceptor
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

/**
 * Define all the routes here
 */
module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.send(['one', 'two', 'three']);
  });

  // place requireAuth in between to require authentication
  app.get('/hidden', requireAuth, function(req, res) {
    res.send({ message: "Welcome to the hidden area" });
  });

  app.post('/signup', Authentication.signup);

  app.post('/signin', requireSignin, Authentication.signin);
};
