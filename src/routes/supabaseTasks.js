const express = require('express');
const { supabase } = require('../config/supabase');
const SupabaseTask = require('../models/supabaseTask');
const router = express.Router();

// Middleware to verify user
const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all tasks for user
router.get('/', verifyUser, async (req, res) => {
  try {
    const tasks = await SupabaseTask.findByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get task by ID
router.get('/:id', verifyUser, async (req, res) => {
  try {
    const task = await SupabaseTask.findById(req.params.id);
    
    if (!task || task.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new task
router.post('/', verifyUser, async (req, res) => {
  try {
    const { title, description, difficulty, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const taskData = {
      user_id: req.user.id,
      title,
      description,
      difficulty: difficulty || 1,
      due_date,
      status: 'pending'
    };

    const task = await SupabaseTask.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update task
router.put('/:id', verifyUser, async (req, res) => {
  try {
    const { title, description, status, difficulty, due_date } = req.body;

    // First check if task exists and belongs to user
    const existingTask = await SupabaseTask.findById(req.params.id);
    if (!existingTask || existingTask.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;
    if (difficulty !== undefined) updates.difficulty = difficulty;
    if (due_date !== undefined) updates.due_date = due_date;

    const task = await SupabaseTask.update(req.params.id, updates);
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete task
router.delete('/:id', verifyUser, async (req, res) => {
  try {
    // First check if task exists and belongs to user
    const existingTask = await SupabaseTask.findById(req.params.id);
    if (!existingTask || existingTask.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await SupabaseTask.delete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get tasks by status
router.get('/status/:status', verifyUser, async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await SupabaseTask.findByStatus(req.user.id, status);
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks by status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get overdue tasks
router.get('/overdue/list', verifyUser, async (req, res) => {
  try {
    const tasks = await SupabaseTask.findOverdue(req.user.id);
    res.json(tasks);
  } catch (error) {
    console.error('Get overdue tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
