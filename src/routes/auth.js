const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models/db');

const router = express.Router();

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'access-secret-key',
        { expiresIn: '2h' }  // Extended to 2 hours
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
        { expiresIn: '7d' }  // Extended to 7 days
    );
    
    return { accessToken, refreshToken };
};

router.post('/register', async (req, res) => {
  try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
      }

      db.query('SELECT * FROM users WHERE email = ?', [email], async (checkErr, checkResults) => {
          if (checkErr) {
              return res.status(500).json({ error: 'Registration failed' });
          }

          if (checkResults.length > 0) {
              return res.status(409).json({ error: 'Email already in use' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const query = `INSERT INTO users (username, email, hashed_password, auth_provider) VALUES (?, ?, ?, 'local')`;
          
          db.query(query, [username, email, hashedPassword], async (err, results) => {
              if (err) {
                  return res.status(500).json({ error: 'Registration failed' });
              }

              const newUser = { id: results.insertId, username, email };
              const { accessToken, refreshToken } = generateTokens(newUser);

              res.cookie('refreshToken', refreshToken, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'Strict',
                  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
              });

              res.status(201).json({ accessToken, user: newUser });
          });
      });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/local', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
  }

  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return res.status(500).json({ error: "Internal server error" });
      }

      if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
      }

      const { accessToken, refreshToken } = generateTokens(user);

      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const userResponse = {
          id: user.id,
          username: user.username,
          email: user.email
      };

      res.json({ accessToken, user: userResponse });
  })(req, res, next);
});

router.post('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
        return res.status(401).json({ error: 'Unauthorized: No refresh token' });
    }

    try {
        jwt.verify(
            refreshToken, 
            process.env.JWT_REFRESH_SECRET || 'refresh-secret-key', 
            (err, decoded) => {
                if (err) {
                    res.clearCookie('refreshToken');
                    
                    if (err.name === 'TokenExpiredError') {
                        return res.status(401).json({ error: 'Refresh token expired' });
                    }
                    
                    return res.status(403).json({ error: 'Invalid refresh token' });
                }

                db.query('SELECT id, username, email FROM users WHERE id = ?', [decoded.id], (dbErr, results) => {
                    if (dbErr || results.length === 0) {
                        res.clearCookie('refreshToken');
                        return res.status(401).json({ error: 'User not found' });
                    }

                    const user = results[0];
                    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Strict',
                        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                    });

                    res.json({ accessToken });
                });
            }
        );
    } catch (error) {
        res.clearCookie('refreshToken');
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;