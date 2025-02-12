const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/db');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const query = `SELECT * FROM users WHERE google_id = ?`;
                db.query(query, [profile.id], (err, results) => {
                    if (err) return done(err);

                    if (results.length > 0) {
                        return done(null, results[0]);
                    } else {
                        const insertQuery = `INSERT INTO users (username, email, google_id, auth_provider) VALUES (?, ?, ?, 'google')`;
                        db.query(
                            insertQuery,
                            [profile.displayName, profile.emails[0].value, profile.id],
                            (insertErr, insertResults) => {
                                if (insertErr) return done(insertErr);

                                const newUser = {
                                    id: insertResults.insertId,
                                    username: profile.displayName,
                                    email: profile.emails[0].value,
                                };
                                return done(null, newUser);
                            }
                        );
                    }
                });
            } catch (error) {
                return done(error);
            }
        }
    )
);
