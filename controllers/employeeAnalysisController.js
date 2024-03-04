const Pothole = require('../models/potholeSchema');
const EmployeeAnalysis = require('../models/employeeAnalysisSchema');

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

module.exports = {
    trackPotholesDetectedByEmployee,
    trackPotholesResolvedByEmployee
};
