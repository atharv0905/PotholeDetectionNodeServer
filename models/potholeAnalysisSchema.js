const mongoose = require('mongoose');

// Define the schema with specified collection name
const potholeAnalysisSchema = new mongoose.Schema({
    region: String,
    totalPotholesDetected: { type: Number, default: 0 },
    totalPotholesResolved: { type: Number, default: 0 },
    totalPotholesDetectedInLast28days: { type: Number, default: 0 },
    totalPotholesDetectedInLast24hours: { type: Number, default: 0 },
    totalPotholesResolvedInLast28days: { type: Number, default: 0},
    totalPotholesResolvedInLast24hours: { type: Number, default: 0 }
}, { collection: 'pothole_analysis' });

// Define the model
module.exports = mongoose.model('PotholeAnalysis', potholeAnalysisSchema);