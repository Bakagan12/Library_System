const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');  // Ensure body-parser is installed


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Adjust path if needed
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'client/public')));

// Routes
const indexRoutes = require('./server/routes/auth');
app.use('/auth', indexRoutes);

// Fallback route for SPA (Single Page Application)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/views/template/login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/views/template/register.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/views/template/dashboard.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
