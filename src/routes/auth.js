const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models/db');

const router = express.Router();

// generate JWT tokens
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );

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

      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `INSERT INTO users (username, email, hashed_password, auth_provider) VALUES (?, ?, ?, 'local')`;
      
      db.query(query, [username, email, hashedPassword], async (err, results) => {
          if (err) {
              console.error("🔥 Registration Error:", err);
              return res.status(500).json({ error: 'Registration failed' });
          }

          const newUser = { id: results.insertId, username, email };
          const { accessToken, refreshToken } = generateTokens(newUser);

          // ✅ Store refresh token in HTTP-only cookie (NOT in DB)
          res.cookie('refreshToken', refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'Strict',
          });

          res.json({ accessToken, user: newUser });
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
      });

      res.json({ accessToken, user });
  })(req, res, next);
});


// ⚡ Refresh Token Route (Get New Access Token)
router.post('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken; // ✅ Get from HTTP-only cookie

    if (!refreshToken) {
        return res.status(401).json({ error: 'Unauthorized: No refresh token' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid refresh token' });

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.json({ accessToken: newAccessToken });
    });
});

// ⚡ Logout
router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
