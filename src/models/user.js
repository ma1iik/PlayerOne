const db = require('./db');
const bcrypt = require('bcrypt');

const User = {
    async findByGoogleId(googleId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE google_id = ?', [googleId], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    async create({ googleId, displayName, email }) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO users (google_id, display_name, email) VALUES (?, ?, ?)',
                [googleId, displayName, email],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({ id: results.insertId, googleId, displayName, email });
                }
            );
        });
    },

    async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); 
            });
        });
    },

    async validatePassword(inputPassword, storedPassword) {
        return bcrypt.compare(inputPassword, storedPassword); 
    },

    async createLocalUser({ email, password, displayName }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO users (email, password, display_name) VALUES (?, ?, ?)',
                [email, hashedPassword, displayName],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({ id: results.insertId, email, displayName });
                }
            );
        });
    },
};

module.exports = User;
