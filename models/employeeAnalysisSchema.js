const mongoose = require('mongoose');

// Define the schema with specified collection name
const employeeAnalysisSchema = new mongoose.Schema({
    username: String,
    totalPotholesDetected: Number,
    totalPotholeDetectedInLast28Days: Number,
    totalPotholeFixed: Number,
    totalPotholeFixedInLast28Days: Number,
}, { collection: 'employee_analysis' });

// Define the model
module.exports = mongoose.model('EmployeeAnalysis', employeeAnalysisSchema);