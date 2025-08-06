const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { PORT, DB_URI } = require('./config');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const potholeRoutes = require('./routes/potholeRoutes');
const userAnalysisRoutes = require('./routes/userAnalysisRoutes');
const employeeAnalysisRoutes = require('./routes/employeeAnalysisRoutes');

const app = express();
console.log("\x1b[2J\x1b[0f");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/user', userRoutes); // user routes
app.use('/employee', employeeRoutes); // employee routes
app.use('/admin', adminRoutes);
app.use('/pothole', potholeRoutes);
app.use('/userAnalysis', userAnalysisRoutes);
app.use('/employeeAnalysis', employeeAnalysisRoutes);

// Connect to MongoDB 
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
