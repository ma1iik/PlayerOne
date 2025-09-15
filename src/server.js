const express = require('express');
const session = require('express-session');
const passport = require('./auth/passport');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const taskRoutes = require('./routes/tasks');
const db = require('./models/db');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';
const isSallMode = process.argv.includes('--sall') || process.env.SALL_MODE === 'true';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.use(
    session({
        secret: process.env.APP_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict',
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/tasks', taskRoutes);

// Serve static files in production or when using sall command
if (!isDevelopment || isSallMode) {
    const frontendPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(frontendPath));

    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/')) return next();
        res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
            if (err) {
                console.error("🔥 Server Error:", err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
}

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    if (isDevelopment && !isSallMode) {
        console.log(`🌐 Frontend dev server should be running on http://localhost:5173`);
        console.log(`📱 Open http://localhost:5173 in your browser`);
    } else {
        console.log(`🌐 Serving frontend from /frontend/dist`);
        console.log(`📱 Open http://localhost:${PORT} in your browser`);
    }
});
