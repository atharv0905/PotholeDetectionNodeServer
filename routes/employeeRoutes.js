const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route for user creation
router.post('/create', employeeController.createUser);                      // tested

// Route for user login
router.post('/login', employeeController.loginUser);                        // tested

// Route for verifying user token
// Protected route
router.post('/protected', employeeController.verifyToken, (req, res) => {   // tested
    res.send(req.username);
});

// Route for user delete 
router.delete('/:username', employeeController.deleteUser);                 // tested

// Route to update user password
router.put('/updatePassword', employeeController.updatePassword);           // tested
                 

module.exports = router;
