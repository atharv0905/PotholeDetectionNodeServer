const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user creation
router.post('/create', userController.createUser);                      // tested

// Route for user login
router.post('/login', userController.loginUser);                        // tested

// Route for user delete 
router.delete('/:username', userController.deleteUser);                 // tested

// Route for user logout
router.post('/logout', userController.logoutUser);                      // tested

module.exports = router;
