const UserLogin = require('../models/userLoginSchema');
const User = require('../models/userSchema');

// ----------------------------------------------------------------------------------------------------------------------------------
// get total number of users
async function getTotalUsers(req, res) {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error getting total users:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while getting total users' });
    }
}
// get total number of users
// ----------------------------------------------------------------------------------------------------------------------------------

// get total active users in last 7 days
async function getActiveUsersLast7Days(req, res) {
    try {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        const activeUsers = await UserLogin.aggregate([
            {
                $match: {
                    timestamp: { $gte: date },
                    username: { $not: /@emp/ } // Exclude usernames containing "@emp"
                }
            },
            {
                $group: {
                    _id: "$username", // Grouping by username
                    count: { $sum: 1 } // Counting occurrences
                }
            },
            {
                $count: "totalActiveUsers" // Counting the number of grouped documents
            }
        ]);
        res.status(200).json({ activeUsers: activeUsers.length > 0 ? activeUsers[0].totalActiveUsers : 0 });
    } catch (error) {
        console.error('Error getting active users:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while getting active users' });
    }
}
// get total active users in last 7 days
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// get total active users in last 30 days
async function getActiveUsersLast30Days(req, res) {
    try {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        const activeUsers = await UserLogin.aggregate([
            {
                $match: {
                    timestamp: { $gte: date },
                    username: { $not: /@emp/ } // Exclude usernames containing "@emp"
                }
            },
            {
                $group: {
                    _id: "$username", // Grouping by username
                    count: { $sum: 1 } // Counting occurrences
                }
            },
            {
                $count: "totalActiveUsers" // Counting the number of grouped documents
            }
        ]);
        res.status(200).json({ activeUsers: activeUsers.length > 0 ? activeUsers[0].totalActiveUsers : 0 });
    } catch (error) {
        console.error('Error getting active users:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while getting active users' });
    }
}
// get total active users in last 30 days
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// get total active users in last 24 hours
async function getActiveUsersLast24Hours(req, res) {
    try {
        const date = new Date();
        date.setHours(date.getHours() - 24);
        const activeUsers = await UserLogin.aggregate([
            {
                $match: {
                    timestamp: { $gte: date },
                    username: { $not: /@emp/ } // Exclude usernames containing "@emp"
                }
            },
            {
                $group: {
                    _id: "$username", // Grouping by username
                    count: { $sum: 1 } // Counting occurrences
                }
            },
            {
                $count: "totalActiveUsers" // Counting the number of grouped documents
            }
        ]);
        res.status(200).json({ activeUsers: activeUsers.length > 0 ? activeUsers[0].totalActiveUsers : 0 });
    } catch (error) {
        console.error('Error getting active users:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while getting active users' });
    }
}
// get total active users in last 24 hours
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// Function to find new users created in the last 7 days
async function getNewUsersLast7Days(req, res) {
    try {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        const newUsersCount = await User.countDocuments({ timestamp: { $gte: date } });
        res.status(200).json({ newUsersCount });
    } catch (error) {
        console.error('Error getting new users:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while getting new users' });
    }
}
// Function to find new users created in the last 7 days
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// Function to find new users created in the last 30 days
async function getNewUsersLast30Days(req, res) {
    try {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        const newUsersCount = await User.countDocuments({ timestamp: { $gte: date } });
        res.status(200).json({ newUsersCount });
    } catch (error) {
        console.error('Error getting new users:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while getting new users' });
    }
}
// Function to find new users created in the last 30 days
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// Function to find new users created in the last 1 year
async function getNewUsersLast1Year(req, res) {
    try {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1);
        const newUsersCount = await User.countDocuments({ timestamp: { $gte: date } });
        res.status(200).json({ newUsersCount });
    } catch (error) {
        console.error('Error getting new users:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while getting new users' });
    }
}
// Function to find new users created in the last 1 year
// ----------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    getTotalUsers,
    getActiveUsersLast7Days,
    getActiveUsersLast30Days,
    getActiveUsersLast24Hours,
    getNewUsersLast7Days,
    getNewUsersLast30Days,
    getNewUsersLast1Year
};