const express = require('express');
const router = express.Router();
const userAnalysisController = require('../controllers/userAnalysisController');

// Route for getting total users
router.get('/totalUsers', userAnalysisController.getTotalUsers);

// Route for getting active users in the last 7 days
router.get('/activeUsersLast7Days', userAnalysisController.getActiveUsersLast7Days);

// Route for getting active users in the last 30 days
router.get('/activeUsersLast30Days', userAnalysisController.getActiveUsersLast30Days);

// Route for getting active users in the last 24 hours
router.get('/activeUsersLast24Hours', userAnalysisController.getActiveUsersLast24Hours);

// Route for getting new users in the last 7 days
router.get('/newUsersLast7Days', userAnalysisController.getNewUsersLast7Days);

// Route for getting new users in the last 30 days
router.get('/newUsersLast30Days', userAnalysisController.getNewUsersLast30Days);

// Route for getting new users in the last 1 year
router.get('/newUsersLast1Year', userAnalysisController.getNewUsersLast1Year);

module.exports = router;
