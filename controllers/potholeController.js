const Pothole = require('../models/potholeSchema');
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

        // Save the pothole data to the database
        const result = await potholeData.save();
        console.log('Pothole Data:', result);
        
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
    try {
        const pothole = await Pothole.findById(req.query.id);
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


module.exports = {
    addNewPothole,
    getAllPotholeData,
    getLatLngOfAllPothole,
    getImageOfSpecificPothole,
    deletePotholeById
};
