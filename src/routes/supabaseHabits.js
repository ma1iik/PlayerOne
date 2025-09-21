const express = require('express');
const { supabase } = require('../config/supabase');
const SupabaseHabit = require('../models/supabaseHabit');
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

// Get all habits for user
router.get('/', verifyUser, async (req, res) => {
  try {
    const habits = await SupabaseHabit.findByUserId(req.user.id);
    res.json(habits);
  } catch (error) {
    console.error('Get habits error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get habit by ID
router.get('/:id', verifyUser, async (req, res) => {
  try {
    const habit = await SupabaseHabit.findById(req.params.id);
    
    if (!habit || habit.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    
    res.json(habit);
  } catch (error) {
    console.error('Get habit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new habit
router.post('/', verifyUser, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      recurrence, 
      difficulty, 
      countable, 
      target_count 
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const habitData = {
      user_id: req.user.id,
      title,
      description,
      recurrence: recurrence || 'daily',
      difficulty: difficulty || 1,
      countable: countable || false,
      target_count: target_count || 1,
      current_count: 0,
      streak: 0,
      completed: false
    };

    const habit = await SupabaseHabit.create(habitData);
    res.status(201).json(habit);
  } catch (error) {
    console.error('Create habit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update habit
router.put('/:id', verifyUser, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      recurrence, 
      difficulty, 
      countable, 
      target_count 
    } = req.body;

    // First check if habit exists and belongs to user
    const existingHabit = await SupabaseHabit.findById(req.params.id);
    if (!existingHabit || existingHabit.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (recurrence !== undefined) updates.recurrence = recurrence;
    if (difficulty !== undefined) updates.difficulty = difficulty;
    if (countable !== undefined) updates.countable = countable;
    if (target_count !== undefined) updates.target_count = target_count;

    const habit = await SupabaseHabit.update(req.params.id, updates);
    res.json(habit);
  } catch (error) {
    console.error('Update habit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete habit
router.delete('/:id', verifyUser, async (req, res) => {
  try {
    // First check if habit exists and belongs to user
    const existingHabit = await SupabaseHabit.findById(req.params.id);
    if (!existingHabit || existingHabit.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    await SupabaseHabit.delete(req.params.id);
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Delete habit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle habit completion
router.post('/:id/toggle', verifyUser, async (req, res) => {
  try {
    // First check if habit exists and belongs to user
    const existingHabit = await SupabaseHabit.findById(req.params.id);
    if (!existingHabit || existingHabit.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const habit = await SupabaseHabit.toggleCompletion(req.params.id);
    res.json(habit);
  } catch (error) {
    console.error('Toggle habit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update habit count
router.put('/:id/count', verifyUser, async (req, res) => {
  try {
    const { count } = req.body;

    if (count === undefined) {
      return res.status(400).json({ error: 'Count is required' });
    }

    // First check if habit exists and belongs to user
    const existingHabit = await SupabaseHabit.findById(req.params.id);
    if (!existingHabit || existingHabit.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const habit = await SupabaseHabit.updateCount(req.params.id, count);
    res.json(habit);
  } catch (error) {
    console.error('Update habit count error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get habits by recurrence
router.get('/recurrence/:recurrence', verifyUser, async (req, res) => {
  try {
    const { recurrence } = req.params;
    const habits = await SupabaseHabit.findByRecurrence(req.user.id, recurrence);
    res.json(habits);
  } catch (error) {
    console.error('Get habits by recurrence error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
