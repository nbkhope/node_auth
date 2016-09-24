// Import module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model schema
const userSchema = new Schema({
  // enforce uniqueness and make string be saved as lowercase
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
