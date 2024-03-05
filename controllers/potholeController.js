const Pothole = require('../models/potholeSchema');
const EmployeeAnalysis = require('../models/employeeAnalysisSchema');
const path = require('path');
const fs = require('fs').promises;
const moment = require('moment');

// ----------------------------------------------------------------------------------------------------------------------------------
// add new pothole
// ----------------------------------------------------------------------------------------------------------------------------------
const addNewPothole = async (req, res) => {
    try {
        // Create a new Pothole document
        const potholeData = new Pothole({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            reportedBy: req.body.reportedBy,
            region: req.body.region,
            imagePath: req.file.path
        });

        // Save the pothole data to the database
        const result = await potholeData.save();

        // Calculate the date 28 days ago and 90 days ago
        const date28DaysAgo = new Date();
        date28DaysAgo.setDate(date28DaysAgo.getDate() - 28);

        const date90DaysAgo = new Date();
        date90DaysAgo.setDate(date90DaysAgo.getDate() - 90);

        // Count the total number of potholes detected by the employee
        const totalPotholesDetected = await Pothole.countDocuments({ reportedBy: req.body.reportedBy });
        
        // Count the total number of potholes detected in the last 28 days
        const totalPotholesDetectedInLast28Days = await Pothole.countDocuments({ 
            reportedBy: req.body.reportedBy, 
            detectedAt: { $gte: date28DaysAgo } 
        });

        // Count the total number of potholes detected in the last 90 days
        const totalPotholesDetectedInLast90Days = await Pothole.countDocuments({ 
            reportedBy: req.body.reportedBy, 
            detectedAt: { $gte: date90DaysAgo } 
        });

        // Update the employee's document in the EmployeeAnalysis collection
        await EmployeeAnalysis.findOneAndUpdate(
            { username: req.body.reportedBy },
            { 
                totalPotholesDetected,
                totalPotholeDetectedInLast28Days: totalPotholesDetectedInLast28Days,
                totalPotholeDetectedInLast90Days: totalPotholesDetectedInLast90Days
            },
            { upsert: true } // Create a new document if it doesn't exist
        );

        res.status(200).send('Added New Pothole Data');
    } catch (error) {
        console.error('Error adding new pothole data:', error);
        res.status(400).send(`Error processing request: ${error.message}`);
    }
};



// ----------------------------------------------------------------------------------------------------------------------------------
// add new pothole
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// get all pothole data
// ----------------------------------------------------------------------------------------------------------------------------------
const getAllPotholeData = async (req, res) => {
    try {
        const potholes = await Pothole.find();
        res.status(200).json(potholes);
    } catch (error) {
        res.status(500).send(`Error fetching locations: ${error.message}`);
    }
};

const getLatLngOfAllPothole = async (req, res) => {
    try {
        const potholes = await Pothole.find({}, { latitude: 1, longitude: 1 });
        res.status(200).json(potholes);
    } catch (error) {
        res.status(500).send(`Error fetching locations: ${error.message}`);
    }
}

const getImageOfSpecificPothole = async (req, res) => {
    const { id } = req.params;
    try {
        const pothole = await Pothole.findById(id);
        // res.status(200).send(pothole.imagePath);
        res.status(200).sendFile(path.resolve(pothole.imagePath));
    } catch (error) {
        res.status(500).send(`Error fetching locations: ${error.message}`);
    }
};
// ----------------------------------------------------------------------------------------------------------------------------------
// get all pothole data
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// resolve pothole issue
const deletePotholeById = async (req, res) => {
    const { id } = req.params;
    try {
        const pothole = await Pothole.findById(req.params.id);
        if (!pothole) {
            return res.status(404).send('Pothole not found');
        }

        // Delete the image file
        await fs.unlink(path.resolve(pothole.imagePath));

        // Delete the pothole record from the database
        await Pothole.findByIdAndDelete(req.params.id);

        res.status(200).send('Pothole and corresponding image deleted successfully');
    } catch (error) {
        res.status(500).send(`Error deleting pothole: ${error.message}`);
    }
};
// resolve pothole issue
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// mark pothole as fixed
async function markPotholeAsFixed(req, res) {
    const { potholeId, fixededBy } = req.body;
    try {
        // Check if the pothole is already fixed
        const existingPothole = await Pothole.findById(potholeId);
        if (existingPothole.fixed) {
            return res.status(400).json({ success: false, message: 'Pothole is already fixed' });
        }

        // Get the current date and time
        const currentDate = new Date();

        // Calculate the date 28 days ago and 90 days ago
        const date28DaysAgo = new Date();
        date28DaysAgo.setDate(date28DaysAgo.getDate() - 28);

        const date90DaysAgo = new Date();
        date90DaysAgo.setDate(date90DaysAgo.getDate() - 90);

        // Find the pothole by its ID and update the fixed attribute to true
        const updatedPothole = await Pothole.findByIdAndUpdate(potholeId, {
            fixed: true,
            fixededBy,
            fixedAt: currentDate // Update fixedAt with current date and time
        }, { new: true });

        // Count the total number of potholes fixed by the employee
        const totalPotholesFixed = await Pothole.countDocuments({ fixededBy });

        // Count the total number of potholes fixed in the last 28 days
        const totalPotholesFixedInLast28Days = await Pothole.countDocuments({ 
            fixededBy, 
            fixedAt: { $gte: date28DaysAgo } 
        });

        // Count the total number of potholes fixed in the last 90 days
        const totalPotholesFixedInLast90Days = await Pothole.countDocuments({ 
            fixededBy, 
            fixedAt: { $gte: date90DaysAgo } 
        });

        // Update the employee's document in the EmployeeAnalysis collection
        await EmployeeAnalysis.findOneAndUpdate(
            { username: req.body.fixededBy },
            { 
                totalPotholeFixed: totalPotholesFixed,
                totalPotholeFixedInLast28Days: totalPotholesFixedInLast28Days,
                totalPotholeFixedInLast90Days: totalPotholesFixedInLast90Days
            },
            { upsert: true } // Create a new document if it doesn't exist
        );

        res.status(200).json({ success: true, message: 'Pothole marked as fixed successfully', pothole: updatedPothole });
    } catch (error) {
        console.error('Error marking pothole as fixed:', error);
        res.status(500).json({ success: false, message: 'An error occurred while marking pothole as fixed' });
    }
}

// mark pothole as fixed
// ----------------------------------------------------------------------------------------------------------------------------------


module.exports = {
    addNewPothole,
    getAllPotholeData,
    getLatLngOfAllPothole,
    getImageOfSpecificPothole,
    deletePotholeById,
    markPotholeAsFixed
};
