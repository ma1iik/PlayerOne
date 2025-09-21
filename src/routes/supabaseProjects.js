const express = require('express');
const { supabase } = require('../config/supabase');
const SupabaseProject = require('../models/supabaseProject');
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

// Get all projects for user
router.get('/', verifyUser, async (req, res) => {
  try {
    const projects = await SupabaseProject.findByUserId(req.user.id);
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get project by ID
router.get('/:id', verifyUser, async (req, res) => {
  try {
    const project = await SupabaseProject.findById(req.params.id);
    
    if (!project || project.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new project
router.post('/', verifyUser, async (req, res) => {
  try {
    const { title, description, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const projectData = {
      user_id: req.user.id,
      title,
      description,
      due_date,
      status: 'planning',
      progress: 0
    };

    const project = await SupabaseProject.create(projectData);
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update project
router.put('/:id', verifyUser, async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;

    // First check if project exists and belongs to user
    const existingProject = await SupabaseProject.findById(req.params.id);
    if (!existingProject || existingProject.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;
    if (due_date !== undefined) updates.due_date = due_date;

    const project = await SupabaseProject.update(req.params.id, updates);
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete project
router.delete('/:id', verifyUser, async (req, res) => {
  try {
    // First check if project exists and belongs to user
    const existingProject = await SupabaseProject.findById(req.params.id);
    if (!existingProject || existingProject.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await SupabaseProject.delete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update project progress
router.put('/:id/progress', verifyUser, async (req, res) => {
  try {
    const { progress } = req.body;

    if (progress === undefined) {
      return res.status(400).json({ error: 'Progress is required' });
    }

    // First check if project exists and belongs to user
    const existingProject = await SupabaseProject.findById(req.params.id);
    if (!existingProject || existingProject.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = await SupabaseProject.updateProgress(req.params.id, progress);
    res.json(project);
  } catch (error) {
    console.error('Update project progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get projects by status
router.get('/status/:status', verifyUser, async (req, res) => {
  try {
    const { status } = req.params;
    const projects = await SupabaseProject.findByStatus(req.user.id, status);
    res.json(projects);
  } catch (error) {
    console.error('Get projects by status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
