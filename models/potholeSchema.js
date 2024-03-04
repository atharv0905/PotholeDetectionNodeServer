const mongoose = require('mongoose');

// Define the schema with specified collection name
const potholeSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  imagePath: String,
  reportedBy: String,
  fixed: { type: Boolean, default: false },
  detectedAt: { type: Date, default: Date.now },
  fixededBy: { type: String, default: '' },
  fixedAt: { type: Date, default: null }
}, { collection: 'potholes_data' });

module.exports = mongoose.model('Pothole', potholeSchema);