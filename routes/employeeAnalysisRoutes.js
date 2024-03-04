const express = require('express');
const router = express.Router();
const EmployeeAnalysisController = require('../controllers/employeeAnalysisController');

// Route to track potholes detected by a specific employee
router.get('/totalPotholesDetected/:employeeUsername', EmployeeAnalysisController.trackPotholesDetectedByEmployee);  // tested 

// Route to track potholes resolved by a specific employee
router.get('/totalPotholesResolved/:employeeUsername', EmployeeAnalysisController.trackPotholesResolvedByEmployee);  // tested

// Route to track potholes detected by a specific employee in the last 28 days
router.get('/totalPotholesDetectedLast28Days/:employeeUsername', EmployeeAnalysisController.trackPotholesDetectedByEmployeeLast28Days); // tested

// Route to track potholes detected by a specific employee in the last 90 days
router.get('/totalPotholesDetectedLast90Days/:employeeUsername', EmployeeAnalysisController.trackPotholesDetectedByEmployeeLast90Days); // tested

// Route to track potholes resolved by a specific employee in the last 28 days
router.get('/totalPotholesResolvedLast28Days/:employeeUsername', EmployeeAnalysisController.trackPotholesResolvedByEmployeeLast28Days);     // tested

// Route to track potholes resolved by a specific employee in the last 90 days
router.get('/totalPotholesResolvedLast90Days/:employeeUsername', EmployeeAnalysisController.trackPotholesResolvedByEmployeeLast90Days);    // tested

// --------------------------------------------------------------------------------------------------------------------------------------
// Performance Analysis

// Best performing employee in terms of potholes detected in the last 28 days
router.get('/bestPerformingEmployeeDetectedLast28Days', EmployeeAnalysisController.findBestPerformingEmployeesLast28DaysBasedOnDetection);

// Best performing employee in terms of potholes detected in the last 90 days
router.get('/bestPerformingEmployeeDetectedLast90Days', EmployeeAnalysisController.findBestPerformingEmployeesLast90DaysBasedOnDetection);

// Worst performing employee in terms of potholes detected in the last 28 days
router.get('/worstPerformingEmployeeDetectedLast28Days', EmployeeAnalysisController.findWorstPerformingEmployeesLast28DaysBasedOnDetection);

// Worst performing employee in terms of potholes detected in the last 90 days
router.get('/worstPerformingEmployeeDetectedLast90Days', EmployeeAnalysisController.findWorstPerformingEmployeesLast90DaysBasedOnDetection);


// Best performing employee in terms of potholes resolved in the last 28 days
router.get('/bestPerformingEmployeeResolvedLast28Days', EmployeeAnalysisController.findBestPerformingEmployeesLast28DaysBasedOnResolution);

// Best performing employee in terms of potholes resolved in the last 90 days
router.get('/bestPerformingEmployeeResolvedLast90Days', EmployeeAnalysisController.findBestPerformingEmployeesLast90DaysBasedOnResolution);

// Worst performing employee in terms of potholes resolved in the last 28 days
router.get('/worstPerformingEmployeeResolvedLast28Days', EmployeeAnalysisController.findWorstPerformingEmployeesLast28DaysBasedOnResolution);

// Worst performing employee in terms of potholes resolved in the last 90 days
router.get('/worstPerformingEmployeeResolvedLast90Days', EmployeeAnalysisController.findWorstPerformingEmployeesLast90DaysBasedOnResolution);

// Performance Analysis
// --------------------------------------------------------------------------------------------------------------------------------------


module.exports = router;
