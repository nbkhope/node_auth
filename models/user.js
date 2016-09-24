// Import module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model schema
const userSchema = new Schema({
  // enforce uniqueness and make string be saved as lowercase
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Before save, encrypt the password
userSchema.pre('save', function(next) {
  // to get access to the user model
  const user = this;

  // generate a salt then run the callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain-text pw with encrypted one
      user.password = hash;

      // go ahead, you can save the model
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
