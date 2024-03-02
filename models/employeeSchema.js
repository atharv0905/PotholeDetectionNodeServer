const mongoose = require('mongoose');

// Define the schema with specified collection name
const employeeSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String
}, { collection: 'employees' });

// Define the model
module.exports = mongoose.model('Employee', employeeSchema);