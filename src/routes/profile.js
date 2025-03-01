const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const router = express.Router();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log("❌ Unauthorized: No token provided");
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.log("⚠️ Token Expired for user:", err);
                return res.status(403).json({ error: 'Forbidden: Token expired' });
            }
            console.log("❌ Forbidden: Invalid token", err);
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        console.log("✅ Token valid for user:", user.id);
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
            console.log("⚠️ User not found:", userId);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log("📄 Profile fetched for user:", results[0].username);
        res.json({ profile: results[0] });
    });
});

module.exports = router;
