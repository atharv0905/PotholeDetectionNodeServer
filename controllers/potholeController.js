const Pothole = require('../models/potholeSchema');
const path = require('path');

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


module.exports = {
    addNewPothole
};
