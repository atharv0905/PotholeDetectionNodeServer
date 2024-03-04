const mongoose = require('mongoose');

// Define the schema with specified collection name
const potholeSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  imagePath: String,
  reportedBy: String,
  fixed: { type: Boolean, default: false },
  fixededBy: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
}, { collection: 'potholes_data' });

module.exports = mongoose.model('Pothole', potholeSchema);