const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/db');
const bcrypt = require('bcryptjs');

const localStrategy = new LocalStrategy(
  { 
    usernameField: 'email',  
    passwordField: 'password',
    session: false 
  },
  async (email, password, done) => {
    console.log("🛠 Checking user:", email);

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error("❌ Database error:", err);
        return done(err);
      }
      if (results.length === 0) {
        console.log("⚠️ No user found with this email:", email);
        return done(null, false, { message: 'Invalid credentials' });
      }

      const user = results[0];
      console.log("🔑 Stored hash:", user.hashed_password);

      const isValidPassword = await bcrypt.compare(password, user.hashed_password);
      console.log("🔎 Password match result:", isValidPassword);

      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid credentials' });
      }

      return done(null, user);
    });
  }
);

module.exports = localStrategy;
