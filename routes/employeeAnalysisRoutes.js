const express = require('express');
const router = express.Router();
const EmployeeAnalysisController = require('../controllers/employeeAnalysisController');

// Route to track potholes detected by a specific employee
router.get('/totalPotholesDetected/:username', EmployeeAnalysisController.trackPotholesDetectedByEmployee);

// Route to track potholes resolved by a specific employee
router.get('/totalPotholesResolved/:username', EmployeeAnalysisController.trackPotholesResolvedByEmployee);

// Route to track potholes detected by a specific employee in the last 28 days
router.get('/totalPotholesDetectedLast28Days/:username', EmployeeAnalysisController.trackPotholesDetectedByEmployeeLast28Days);

// Route to track potholes detected by a specific employee in the last 90 days
router.get('/totalPotholesDetectedLast90Days/:username', EmployeeAnalysisController.trackPotholesDetectedByEmployeeLast90Days);

// Route to track potholes resolved by a specific employee in the last 28 days
router.get('/totalPotholesResolvedLast28Days/:username', EmployeeAnalysisController.trackPotholesResolvedByEmployeeLast28Days);

// Route to track potholes resolved by a specific employee in the last 90 days
router.get('/totalPotholesResolvedLast90Days/:username', EmployeeAnalysisController.trackPotholesResolvedByEmployeeLast90Days);

module.exports = router;
