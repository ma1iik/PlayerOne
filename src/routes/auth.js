// src/routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models/db');

const router = express.Router();

// generate JWT tokens with short lifetimes for testing
const generateTokens = (user) => {
    console.log("🔑 Generating new tokens for user:", user.id);
    
    const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'access-secret-key',
        { expiresIn: '30s' }  // Short access token - 30 seconds for testing
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
        { expiresIn: '2m' }  // Short refresh token - 2 minutes for testing
    );

    console.log("✅ Generated access token expires in 30s");
    console.log("✅ Generated refresh token expires in 2m");
    
    return { accessToken, refreshToken };
};

// ⚡ Register User
router.post('/register', async (req, res) => {
  try {
      console.log("🔍 Incoming Registration Data:", req.body);
      
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
          console.error("⚠️ Missing Fields:", { username, email, password });
          return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if email already exists
      db.query('SELECT * FROM users WHERE email = ?', [email], async (checkErr, checkResults) => {
          if (checkErr) {
              console.error("🔥 Database Error:", checkErr);
              return res.status(500).json({ error: 'Registration failed' });
          }

          if (checkResults.length > 0) {
              return res.status(409).json({ error: 'Email already in use' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const query = `INSERT INTO users (username, email, hashed_password, auth_provider) VALUES (?, ?, ?, 'local')`;
          
          db.query(query, [username, email, hashedPassword], async (err, results) => {
              if (err) {
                  console.error("🔥 Registration Error:", err);
                  return res.status(500).json({ error: 'Registration failed' });
              }

              const newUser = { id: results.insertId, username, email };
              const { accessToken, refreshToken } = generateTokens(newUser);

              // ✅ Store refresh token in HTTP-only cookie
              res.cookie('refreshToken', refreshToken, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'Strict',
                  maxAge: 2 * 60 * 1000, // 2 minutes for testing
              });

              res.status(201).json({ accessToken, user: newUser });
          });
      });
  } catch (error) {
      console.error("🔥 Register Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// ⚡ Local Login
router.post('/local', async (req, res, next) => {
  console.log("📩 Received login request:", req.body);

  const { email, password } = req.body;
  if (!email || !password) {
      console.log("⚠️ Missing credentials - email or password not provided.");
      return res.status(400).json({ error: "Email and password are required." });
  }

  console.log("🔍 Login attempt for:", email);

  passport.authenticate('local', (err, user, info) => {
      if (err) {
          console.error("❌ Error during authentication:", err);
          return res.status(500).json({ error: "Internal server error" });
      }

      if (!user) {
          console.log("⚠️ Login failed: Invalid credentials", info);
          return res.status(401).json({ error: "Invalid credentials" });
      }

      console.log("✅ Login successful for:", user.username);

      const { accessToken, refreshToken } = generateTokens(user);

      // Store refresh token as HTTP-only cookie
      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          maxAge: 2 * 60 * 1000, // 2 minutes for testing
      });

      // Return a cleaner user object without sensitive data
      const userResponse = {
          id: user.id,
          username: user.username,
          email: user.email
      };

      res.json({ accessToken, user: userResponse });
  })(req, res, next);
});

// ⚡ Refresh Token Route (Get New Access Token)
router.post('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    console.log("🔄 Refresh token request received");
    
    if (!refreshToken) {
        console.log("❌ No refresh token provided");
        return res.status(401).json({ error: 'Unauthorized: No refresh token' });
    }

    try {
        jwt.verify(
            refreshToken, 
            process.env.JWT_REFRESH_SECRET || 'refresh-secret-key', 
            (err, decoded) => {
                if (err) {
                    console.error("❌ Invalid refresh token:", err);
                    
                    // Clear the invalid cookie
                    res.clearCookie('refreshToken');
                    
                    if (err.name === 'TokenExpiredError') {
                        console.log("⏰ Refresh token expired. User must login again.");
                        return res.status(401).json({ error: 'Refresh token expired' });
                    }
                    
                    return res.status(403).json({ error: 'Invalid refresh token' });
                }

                console.log("✓ Refresh token valid, user ID:", decoded.id);

                // Get user from database to ensure they still exist
                db.query('SELECT id, username, email FROM users WHERE id = ?', [decoded.id], (dbErr, results) => {
                    if (dbErr || results.length === 0) {
                        console.error("❌ User not found or DB error:", dbErr);
                        res.clearCookie('refreshToken');
                        return res.status(401).json({ error: 'User not found' });
                    }

                    const user = results[0];
                    console.log("✅ User found:", user.username);

                    // Generate new tokens
                    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

                    // Update refresh token cookie
                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Strict',
                        maxAge: 2 * 60 * 1000, // 2 minutes for testing
                    });

                    console.log("🔄 Tokens refreshed successfully");
                    res.json({ accessToken });
                });
            }
        );
    } catch (error) {
        console.error("🔥 Refresh token error:", error);
        res.clearCookie('refreshToken');
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ⚡ Logout
router.post('/logout', (req, res) => {
    console.log("👋 User logging out");
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;