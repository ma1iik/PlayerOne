const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

router.post('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    const { title, description, due_date } = req.body;

    const query = 'INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, title, description, due_date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Task created successfully', taskId: results.insertId });
    });
});

module.exports = router;
