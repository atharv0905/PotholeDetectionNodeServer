const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route for user creation
router.post('/create', adminController.createUser);                      // tested

// Route for user login
router.post('/login', adminController.loginUser);                        // tested

// Route for verifying user token
// Protected route
router.post('/protected', adminController.verifyToken, (req, res) => {   // tested
    res.send(req.username);
});

// Route for user delete 
router.delete('/:username', adminController.deleteUser);                 // tested
                 

module.exports = router;
