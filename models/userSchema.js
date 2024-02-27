const mongoose = require('mongoose');

// Define the schema with specified collection name
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String
}, { collection: 'users' });

// Define the model
module.exports = mongoose.model('User', userSchema);