const express = require('express');
const { supabase } = require('../config/supabase');
const SupabaseUser = require('../models/supabaseUser');
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username || email.split('@')[0],
          display_name: displayName || username || email.split('@')[0]
        }
      }
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // The profile will be created automatically by the trigger
    // But we can also create it manually if needed
    if (authData.user) {
      try {
        await SupabaseUser.create({
          id: authData.user.id,
          username: username || email.split('@')[0],
          displayName: displayName || username || email.split('@')[0],
          email: email
        });
      } catch (profileError) {
        console.log('Profile might already exist:', profileError.message);
      }
    }

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username: username || email.split('@')[0]
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user profile
    const profile = await SupabaseUser.findById(authData.user.id);

    res.json({
      message: 'Login successful',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username: profile?.username,
        displayName: profile?.display_name,
        level: profile?.level,
        experience: profile?.experience,
        coins: profile?.coins,
        gems: profile?.gems
      },
      session: authData.session
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout user
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get user profile
    const profile = await SupabaseUser.findById(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: profile?.username,
        displayName: profile?.display_name,
        level: profile?.level,
        experience: profile?.experience,
        coins: profile?.coins,
        gems: profile?.gems
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { username, displayName, avatarUrl } = req.body;
    
    // Update profile
    const updatedProfile = await SupabaseUser.update(user.id, {
      username,
      display_name: displayName,
      avatar_url: avatarUrl
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedProfile
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Password reset
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
