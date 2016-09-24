const User = require('../models/user');

// Authentications Controller
exports.signup = function(req, res, next) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  // Don't allow a record to be saved without all fields
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and a password' });
  }

  // (you might also want to check email was well-formatted, etc)

  // Check to see if the user exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // Return an error if user already exists
    if (existingUser) {
      // Unprocessable Entity
      return res.status(422).send({ error: 'Email already exists in the system' });

      // The 422 (Unprocessable Entity) status code means the server
      // understands the content type of the request entity
      // but was unable to process the contained instructions
    }

    // Otherwise, create and save user if it does not exist
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) { return next(err); }

      // Send a response indicating user was created successfully
      //res.json(user);
      res.json({ success: true });
    });
  });
};
