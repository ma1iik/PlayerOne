const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

// Supabase routes
const supabaseAuthRoutes = require('./routes/supabaseAuth');
const supabaseTaskRoutes = require('./routes/supabaseTasks');
const supabaseHabitRoutes = require('./routes/supabaseHabits');
const supabaseProjectRoutes = require('./routes/supabaseProjects');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';
const isSallMode = process.argv.includes('--sall') || process.env.SALL_MODE === 'true';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

// Supabase API routes
app.use('/api/auth', supabaseAuthRoutes);
app.use('/api/tasks', supabaseTaskRoutes);
app.use('/api/habits', supabaseHabitRoutes);
app.use('/api/projects', supabaseProjectRoutes);

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
