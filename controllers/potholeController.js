const Pothole = require('../models/potholeSchema');
const EmployeeAnalysis = require('../models/employeeAnalysisSchema');
const path = require('path');
const fs = require('fs').promises;

// ----------------------------------------------------------------------------------------------------------------------------------
// add new pothole
// ----------------------------------------------------------------------------------------------------------------------------------
const addNewPothole = async (req, res) => {
    try {
        const potholeData = new Pothole({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            reportedBy: req.body.reportedBy,
            imagePath: req.file.path
        });

        const totalPotholesDetected = await Pothole.countDocuments({ reportedBy: req.body.reportedBy });
        // Save the pothole data to the database
        const result = await potholeData.save();
        console.log('Pothole Data:', result);

        // Update the employee's document in the EmployeeAnalysis collection
        await EmployeeAnalysis.findOneAndUpdate(
            { username: req.body.reportedBy },
            { totalPotholesDetected },
            { upsert: true } // Create a new document if it doesn't exist
        );
        
        res.status(200).send('Added New Pothole Data');
    } catch (error) {
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
        const potholes = await Pothole.find({}, {latitude: 1, longitude: 1});
        res.status(200).json(potholes);
    } catch (error) {
        res.status(500).send(`Error fetching locations: ${error.message}`);
    }
}

const getImageOfSpecificPothole = async (req, res) => {
    const {id} = req.params;
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
    const {id} = req.params;
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
        // Find the pothole by its ID and update the fixed attribute to true
        const updatedPothole = await Pothole.findByIdAndUpdate(potholeId, { fixed: true, fixededBy }, { new: true });

        if (!updatedPothole) {
            return res.status(404).json({ success: false, message: 'Pothole not found' });
        }

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
