const express = require('express');
const router = express.Router();
const EmployeeAnalysisController = require('../controllers/employeeAnalysisController');

// Route to track potholes detected by a specific employee
router.get('/totalPotholesDetected/:username', EmployeeAnalysisController.trackPotholesDetectedByEmployee);

// Route to track potholes resolved by a specific employee
router.get('/totalPotholesResolved/:username', EmployeeAnalysisController.trackPotholesResolvedByEmployee);

module.exports = router;
