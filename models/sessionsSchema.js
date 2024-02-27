const mongoose = require('mongoose');

// Define the schema for the session
const sessionSchema = new mongoose.Schema({
    userid: String,
    token: String,
    expires: Date,
    is_active: Boolean,
    created_at: Date
}, { collection: 'Sessions' });

// Define the model
module.exports = mongoose.model('Session', sessionSchema);