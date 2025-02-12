const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const router = express.Router();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
};

// ✅ **Get User Profile**
router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.id; 

    db.query('SELECT id, username, email FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error("🔥 Profile Fetch Error:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ profile: results[0] });
    });
});

module.exports = router;
