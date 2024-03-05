const Pothole = require('../models/potholeSchema');
const PotholeAnalysis = require('../models/potholeAnalysisSchema');

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes detected
const totalPotholesDetected = async (req, res) => {
    try {
        const totalDetectedPotholes = await Pothole.countDocuments();
        res.status(200).json({ totalDetectedPotholes });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes detected
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes fixed
const countResolvedPotholes = async (req, res) => {
    try {
        const totalResolvedPotholes = await Pothole.countDocuments({ fixed: true });
        res.status(200).json({ totalResolvedPotholes });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes fixed
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes detected in last 28 `days
const countDetectedPotholesLast28Days = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 28); // Subtract 28 days from the current date
        const totalDetectedPotholesLast28Days = await Pothole.countDocuments({
            detectedAt: { $gte: startDate }
        });
        res.status(200).json({ totalDetectedPotholesLast28Days });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes detected in last 28 `days
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes detected in last 24 hours
const countDetectedPotholesLast24Hours = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 24); // Subtract 24 hours from the current date
        const totalDetectedPotholesLast24Hours = await Pothole.countDocuments({
            detectedAt: { $gte: startDate }
        });
        res.status(200).json({ totalDetectedPotholesLast24Hours });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes detected in last 24 hours
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes detected in last 1 hour
const countDetectedPotholesLast1Hour = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 1); // Subtract 1 hour from the current date
        const totalDetectedPotholesLast1Hour = await Pothole.countDocuments({
            detectedAt: { $gte: startDate }
        });
        res.status(200).json({ totalDetectedPotholesLast1Hour });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes detected in last 1 hour
// ----------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes fixed in last 28 days
const countFixedPotholesLast28Days = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 28); // Subtract 28 days from the current date
        const totalFixedPotholesLast28Days = await Pothole.countDocuments({
            fixed: true,
            fixedAt: { $gte: startDate }
        });

        res.status(200).json({ totalFixedPotholesLast28Days });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes fixed in last 28 days
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes fixed in last 24 hours
const countFixedPotholesLast24Hours = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 24); // Subtract 24 hours from the current date
        const totalFixedPotholesLast24Hours = await Pothole.countDocuments({
            fixed: true,
            fixedAt: { $gte: startDate }
        });
        res.status(200).json({ totalFixedPotholesLast24Hours });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes fixed in last 24 hours
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes fixed in last 1 hour
const countFixedPotholesLast1Hour = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 1); // Subtract 1 hour from the current date
        const totalFixedPotholesLast1Hour = await Pothole.countDocuments({
            fixed: true,
            fixedAt: { $gte: startDate }
        });
        res.status(200).json({ totalFixedPotholesLast1Hour });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes fixed in last 1 hour
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes not fixed in last 28 days
const countUnfixedPotholesLast28Days = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 28); // Subtract 28 days from the current date
        const totalUnfixedPotholesLast28Days = await Pothole.countDocuments({
            fixed: false,
            detectedAt: { $lt: startDate }
        });
        res.status(200).json({ totalUnfixedPotholesLast28Days });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes not fixed in last 28 days
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes not fixed in last 24 hours
const countUnfixedPotholesLast24Hours = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 24); // Subtract 24 hours from the current date
        const totalUnfixedPotholesLast24Hours = await Pothole.countDocuments({
            fixed: false,
            detectedAt: { $lt: startDate }
        });
        res.status(200).json({ totalUnfixedPotholesLast24Hours });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes not fixed in last 24 hours
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// total potholes not fixed in last 1 hour
const countUnfixedPotholesLast1Hour = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 1); // Subtract 1 hour from the current date
        const totalUnfixedPotholesLast1Hour = await Pothole.countDocuments({
            fixed: false,
            detectedAt: { $lt: startDate }
        });
        res.status(200).json({ totalUnfixedPotholesLast1Hour });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// total potholes not fixed in last 1 hour
// ----------------------------------------------------------------------------------------------------------------------------------



module.exports = {
    totalPotholesDetected,
    countResolvedPotholes,

    countDetectedPotholesLast28Days,
    countDetectedPotholesLast24Hours,
    countDetectedPotholesLast1Hour,

    countFixedPotholesLast28Days,
    countFixedPotholesLast24Hours,
    countFixedPotholesLast1Hour,
    
    countUnfixedPotholesLast28Days,
    countUnfixedPotholesLast24Hours,
    countUnfixedPotholesLast1Hour
};