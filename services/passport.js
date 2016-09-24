const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
// Passport JWT
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options for JWT Strategy
const jwtOptions = {
  // tell JWT Strategy to look for token in the authorization header
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // give your secret
  secretOrKey: config.secret
};

// Create JWT Strategy
// payload is the decoded jwt token
//   { sub: ..., iat: ... }    sub has the user ID
// done is a callback part of passport
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // Check to see if user ID in payload is present in the DB
  // IF so, call *done* with
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); } // not authenticated

    if (user) {
      done(null, user);
    }
    else {
      done(null, false);
    }
  });
  // Otherwise, if user ID is not found, call *done* without a user obj
});

// Make passport use the strategy
passport.use(jwtLogin);
