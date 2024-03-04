const mongoose = require('mongoose');

// Define the schema with specified collection name
const employeeAnalysisSchema = new mongoose.Schema({
    username: String,
    totalPotholesDetected: { type: Number, default: 0 },
    totalPotholeFixed: { type: Number, default: 0 },
    totalPotholeDetectedInLast28Days: { type: Number, default: 0 },
    totalPotholeFixedInLast28Days: { type: Number, default: 0 },
    totalPotholeDetectedInLast90Days: { type: Number, default: 0 },
    totalPotholeFixedInLast90Days: { type: Number, default: 0 }
}, { collection: 'employee_analysis' });

// Define the model
module.exports = mongoose.model('EmployeeAnalysis', employeeAnalysisSchema);