const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
// Passport JWT
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

/**
 * Create local Strategy (for signing in)
 *   (callback arguments expect username and password,
 *    but we can specify the username to be the email)
 */
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Check the email ("username") and password
  // Call done with user if correct email and password
  // Otherwise, call done with false
  
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err) };

    if (!user) {
      return done(null, false); // user not found (no errors though)
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

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
  // IF so, call *done* with user
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
passport.use(localLogin);
