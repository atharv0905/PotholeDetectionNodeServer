const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

// ----------------------------------------------------------------------------------------------------------------------------------
// create User
async function createUser(req, res) {
    const { name, username, password } = req.body;
    try {
        // Check if the User already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with the provided username' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        // Create a new User instance with hashed password
        const newUser = new User({ name, username, password: hashedPassword });

        // Save the new User to the database
        await newUser.save();

        return res.status(201).json({ success: true, User: newUser });
    } catch (error) {
        console.error('Error creating User:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while creating User' });
    }
}
// create User
// ----------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------------------
// User login
async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        // Find the User with the provided username
        const user = await User.findOne({ username });

        // If no User found with the provided username
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // If username and password are correct
        return res.status(200).json({ success: true, User: user });
    } catch (error) {
        console.error('Error during User login:', error);
        return res.status(500).json({ success: false, message: 'An error occurred' });
    }
}
// User login
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// Delete User
async function deleteUser(req, res) {
    const { username } = req.params;
    try {
        // Find the User with the provided username and delete it
        const deletedUser = await User.findOneAndDelete({ username });

        // If no User found with the provided username
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, message: 'User deleted successfully', deletedUser });
    } catch (error) {
        console.error('Error deleting User:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while deleting User' });
    }
}
// Delete User
// ----------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    loginUser,
    createUser,
    deleteUser
};
