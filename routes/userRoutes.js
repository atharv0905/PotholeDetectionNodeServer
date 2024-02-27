const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user creation
router.post('/create', userController.createUser);

// Route for user login
router.post('/login', userController.loginUser);

// Route for user delete 
router.delete('/:username', userController.deleteUser);

module.exports = router;
