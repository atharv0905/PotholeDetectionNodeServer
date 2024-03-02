const mongoose = require('mongoose');

// Define the schema with specified collection name
const adminSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String
}, { collection: 'admins' });

// Define the model
module.exports = mongoose.model('Admin', adminSchema);