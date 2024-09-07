const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');
const UserValidation = require('../validation/UserValidation');
const session = require('express-session');
const authenticateSession = require('../middleware/authMiddleware');

// Configure session middleware
router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' } // Adjust as needed
}));

// Registration route
router.post('/register', (req, res) => {
    const validationErrors = UserValidation.validateRegistration(req.body);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    const { email, password } = req.body;

    UserService.register(req.body, (err, successMessage) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // Automatically log in the user after registration
        UserService.login(email, password, (err, data) => {
            if (err) {
                return res.status(401).json({ error: err.message });
            }

            // Store user information in session
            req.session.userId = data.user.id;

            // Redirect to /login
            res.redirect('/login');
        });
    });
});
router.get('/logout', (req, res) => {
    res.redirect('/login');
});
// Login route
// In your route file
router.post('/login', (req, res) => {
    const validationErrors = UserValidation.validateLogin(req.body);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    const { email, password } = req.body;

    UserService.login(email, password, req, (err, data) => {
        if (err) {
            return res.status(401).json({ error: err.message });
        }

        // Redirect to /dashboard
        res.redirect('/dashboard');
    });
});


// Protected route example
router.get('/dashboard', authenticateSession, (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/views/template/dashboard.html'));
});

module.exports = router;
