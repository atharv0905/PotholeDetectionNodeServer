const Pothole = require('../models/potholeSchema');
const EmployeeAnalysis = require('../models/employeeAnalysisSchema');
const moment = require('moment');

// ----------------------------------------------------------------------------------------------------------------------------------
// Function to track the number of potholes detected by a specific employee
async function trackPotholesDetectedByEmployee(req, res) {
    const { employeeUsername } = req.params;
    try {
        const totalPotholesDetected = await Pothole.countDocuments({ reportedBy: employeeUsername });

        res.status(200).json({ totalPotholesDetected: totalPotholesDetected });
    } catch (error) {
        console.error('Error tracking potholes detected by employee:', error);
        res.status(500).json({ success: false, message: 'An error occurred while tracking potholes detected by employee' });
    }
}
// function to track the number of potholes detected by a specific employee
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// Function to track the number of potholes resolved by a specific employee
async function trackPotholesResolvedByEmployee(req, res) {
    const { employeeUsername } = req.params;
    try {
        const totalPotholesFixed = await Pothole.countDocuments({ reportedBy: employeeUsername, fixed: true });

        res.status(200).json({ totalPotholesFixed: totalPotholesFixed });
    } catch (error) {
        console.error('Error tracking potholes resolved by employee:', error);
        res.status(500).json({ success: false, message: 'An error occurred while tracking potholes resolved by employee' });
    }
}
// function to track the number of potholes resolved by a specific employee
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// Function to track the number of potholes detected by a specific employee in the last 28 days
async function trackPotholesDetectedByEmployeeLast28Days(req, res) {
    const { employeeUsername } = req.params;
    try {
        const date28DaysAgo = moment().subtract(28, 'days').toDate();
        const totalPotholesDetectedLast28Days = await Pothole.countDocuments({ reportedBy: employeeUsername, detectedAt: { $gte: date28DaysAgo } });

        res.status(200).json({ totalPotholesDetectedLast28Days: totalPotholesDetectedLast28Days });
    } catch (error) {
        console.error('Error tracking potholes detected by employee in the last 28 days:', error);
        res.status(500).json({ success: false, message: 'An error occurred while tracking potholes detected by employee in the last 28 days' });
    }
}
// function to track the number of potholes detected by a specific employee in the last 28 days
// ----------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------------------
// Function to track the number of potholes detected by a specific employee in the last 90 days
async function trackPotholesDetectedByEmployeeLast90Days(req, res) {
    const { employeeUsername } = req.params;
    try {
        const date90DaysAgo = moment().subtract(90, 'days').toDate();
        const totalPotholesDetectedLast90Days = await Pothole.countDocuments({ reportedBy: employeeUsername, detectedAt: { $gte: date90DaysAgo } });

        res.status(200).json({ totalPotholesDetectedLast90Days: totalPotholesDetectedLast90Days });
    } catch (error) {
        console.error('Error tracking potholes detected by employee in the last 90 days:', error);
        res.status(500).json({ success: false, message: 'An error occurred while tracking potholes detected by employee in the last 90 days' });
    }
}
// function to track the number of potholes detected by a specific employee in the last 90 days
// ----------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------------------
// Function to track the number of potholes resolved by a specific employee in the last 28 days
async function trackPotholesResolvedByEmployeeLast28Days(req, res) {
    const { employeeUsername } = req.params;
    try {
        const date28DaysAgo = moment().subtract(28, 'days').toDate();
        const totalPotholesFixedLast28Days = await Pothole.countDocuments({ reportedBy: employeeUsername, fixed: true, fixedAt: { $gte: date28DaysAgo } });

        res.status(200).json({ totalPotholesFixedLast28Days: totalPotholesFixedLast28Days });
    } catch (error) {
        console.error('Error tracking potholes resolved by employee in the last 28 days:', error);
        res.status(500).json({ success: false, message: 'An error occurred while tracking potholes resolved by employee in the last 28 days' });
    }
}
// function to track the number of potholes resolved by a specific employee in the last 28 days
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// Function to track the number of potholes resolved by a specific employee in the last 90 days
async function trackPotholesResolvedByEmployeeLast90Days(req, res) {
    const { employeeUsername } = req.params;
    try {
        const date90DaysAgo = moment().subtract(90, 'days').toDate();
        const totalPotholesFixedLast90Days = await Pothole.countDocuments({ reportedBy: employeeUsername, fixed: true, fixedAt: { $gte: date90DaysAgo } });

        res.status(200).json({ totalPotholesFixedLast90Days: totalPotholesFixedLast90Days });
    } catch (error) {
        console.error('Error tracking potholes resolved by employee in the last 90 days:', error);
        res.status(500).json({ success: false, message: 'An error occurred while tracking potholes resolved by employee in the last 90 days' });
    }
}
// function to track the number of potholes resolved by a specific employee in the last 90 days
// ----------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------------------
// Performance Analysis

// Function to find the best performing employees based on total potholes detected in the last 28 days
async function findBestPerformingEmployeesLast28DaysBasedOnDetection(req, res) {
    try {
        const bestPerformers = await EmployeeAnalysis.find({ totalPotholeDetectedInLast28Days: { $gt: 0 } })
            .sort({ totalPotholeDetectedInLast28Days: -1 })
            .limit(5)
            .select('username'); // Only select the username field
        
        const usernames = bestPerformers.map(employee => employee.username);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error finding best performing employees in the last 28 days based on detection:', error);
        res.status(500).json({ success: false, message: 'An error occurred while finding best performing employees based on detection' });
    }
}

// Function to find the worst performing employees based on total potholes detected in the last 28 days
async function findWorstPerformingEmployeesLast28DaysBasedOnDetection(req, res) {
    try {
        const date28DaysAgo = moment().subtract(28, 'days').toDate();
        const worstPerformers = await EmployeeAnalysis.find({ totalPotholeDetectedInLast28Days: { $gt: 0 } }).sort({ totalPotholeDetectedInLast28Days: 1 }).limit(5).select('username');

        const usernames = worstPerformers.map(employee => employee.username);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error finding worst performing employees in the last 28 days based on detection:', error);
        res.status(500).json({ success: false, message: 'An error occurred while finding worst performing employees based on detection' });
    }
}

// Function to find the best performing employees based on total potholes detected in the last 90 days
async function findBestPerformingEmployeesLast90DaysBasedOnDetection(req, res) {
    try {
        const date90DaysAgo = moment().subtract(90, 'days').toDate();
        const bestPerformers = await EmployeeAnalysis.find({ totalPotholeDetectedInLast90Days: { $gt: 0 } }).sort({ totalPotholeDetectedInLast90Days: -1 }).limit(5).select('username');

        const usernames = bestPerformers.map(employee => employee.username);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error finding best performing employees in the last 90 days based on detection:', error);
        res.status(500).json({ success: false, message: 'An error occurred while finding best performing employees based on detection' });
    }
}

// Function to find the worst performing employees based on total potholes detected in the last 90 days
async function findWorstPerformingEmployeesLast90DaysBasedOnDetection(req, res) {
    try {
        const date90DaysAgo = moment().subtract(90, 'days').toDate();
        const worstPerformers = await EmployeeAnalysis.find({ totalPotholeDetectedInLast90Days: { $gt: 0 } }).sort({ totalPotholeDetectedInLast90Days: 1 }).limit(5).select('username');

        const usernames = worstPerformers.map(employee => employee.username);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error finding worst performing employees in the last 90 days based on detection:', error);
        res.status(500).json({ success: false, message: 'An error occurred while finding worst performing employees based on detection' });
    }
}






// Function to find the best performing employees based on total potholes resolved in the last 28 days
async function findBestPerformingEmployeesLast28DaysBasedOnResolution(req, res) {
    try {
        const date28DaysAgo = moment().subtract(28, 'days').toDate();
        const bestPerformers = await EmployeeAnalysis.find({ totalPotholeFixedInLast28Days: { $gt: 0 } }).sort({ totalPotholeFixedInLast28Days: -1 }).limit(5).select('username');

        const usernames = bestPerformers.map(employee => employee.username);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error finding best performing employees in the last 28 days based on resolution:', error);
        res.status(500).json({ success: false, message: 'An error occurred while finding best performing employees based on resolution' });
    }
}

// Function to find the worst performing employees based on total potholes resolved in the last 28 days
async function findWorstPerformingEmployeesLast28DaysBasedOnResolution(req, res) {
    try {
        const date28DaysAgo = moment().subtract(28, 'days').toDate();
        const worstPerformers = await EmployeeAnalysis.find({ totalPotholeFixedInLast28Days: { $gt: 0 } }).sort({ totalPotholeFixedInLast28Days: 1 }).limit(5).select('username');

        const usernames = worstPerformers.map(employee => employee.username);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error finding worst performing employees in the last 28 days based on resolution:', error);
        res.status(500).json({ success: false, message: 'An error occurred while finding worst performing employees based on resolution' });
    }
}

// Function to find the best performing employees based on total potholes resolved in the last 90 days
async function findBestPerformingEmployeesLast90DaysBasedOnResolution(req, res) {
    try {
        const date90DaysAgo = moment().subtract(90, 'days').toDate();
        const bestPerformers = await EmployeeAnalysis.find({ totalPotholeFixedInLast90Days: { $gt: 0 } }).sort({ totalPotholeFixedInLast90Days: -1 }).limit(5).select('username');

        const usernames = bestPerformers.map(employee => employee.username);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error finding best performing employees in the last 90 days based on resolution:', error);
        res.status(500).json({ success: false, message: 'An error occurred while finding best performing employees based on resolution' });
    }
}

// Function to find the worst performing employees based on total potholes resolved in the last 90 days
async function findWorstPerformingEmployeesLast90DaysBasedOnResolution(req, res) {
    try {
        const date90DaysAgo = moment().subtract(90, 'days').toDate();
        const worstPerformers = await EmployeeAnalysis.find({ totalPotholeFixedInLast90Days: { $gt: 0 } }).sort({ totalPotholeFixedInLast90Days: 1 }).limit(5).select('username');

        const usernames = worstPerformers.map(employee => employee.username);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error finding worst performing employees in the last 90 days based on resolution:', error);
        res.status(500).json({ success: false, message: 'An error occurred while finding worst performing employees based on resolution' });
    }
}

// Performance Analysis
// ----------------------------------------------------------------------------------------------------------------------------------


module.exports = {
    trackPotholesDetectedByEmployee,
    trackPotholesResolvedByEmployee,
    trackPotholesDetectedByEmployeeLast28Days,
    trackPotholesDetectedByEmployeeLast90Days,
    trackPotholesResolvedByEmployeeLast28Days,
    trackPotholesResolvedByEmployeeLast90Days,

    findBestPerformingEmployeesLast28DaysBasedOnDetection,
    findWorstPerformingEmployeesLast28DaysBasedOnDetection,
    findBestPerformingEmployeesLast90DaysBasedOnDetection,
    findWorstPerformingEmployeesLast90DaysBasedOnDetection,

    findBestPerformingEmployeesLast28DaysBasedOnResolution,
    findWorstPerformingEmployeesLast28DaysBasedOnResolution,
    findBestPerformingEmployeesLast90DaysBasedOnResolution,
    findWorstPerformingEmployeesLast90DaysBasedOnResolution
};
