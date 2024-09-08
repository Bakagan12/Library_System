const express = require('express');
const session = require('express-session');
const path = require('path');
const server = express();
const authenticateSession = require('./server/middleware/authMiddleware');

const bodyParser = require('body-parser');

// Middleware
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'client/public'))); // Serving static files from 'client/public'
server.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' } // Adjust as needed
}));

// Routes
const indexRoutes = require('./server/controller/auth');
server.use('/auth', indexRoutes);

server.get('/', (req, res) => {
    res.redirect('/login');
});

// Fallback route for SPA (Single Page Application)
server.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/views/template/login.html'));
});
server.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/views/template/register.html'));
});
server.get('/dashboard', authenticateSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/views/template/dashboard.html'));
});
server.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/views/template/login.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
