const express = require('express');
const path = require('path');
const UserService = require('../services/userService');
const UserValidation = require('../validation/userValidation');
const router = express.Router();

// Registration controller
router.registerUser = (req, res) => {
    const validationErrors = UserValidation.validateRegistration(req.body);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    UserService.register(req.body, (err, successMessage) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.redirect('/login');  // Redirect after successful registration
    });
};

// Login controller
router.loginUser = (req, res) => {
    const validationErrors = UserValidation.validateLogin(req.body);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    const { email, password } = req.body;
    UserService.login(email, password, req, (err, data) => {
        if (err) {
            return res.status(401).json({ error: err.message });
        }

        // Redirect to dashboard upon successful login
        res.redirect('/dashboard');
    });
};

// Dashboard controller (protected route)
router.getDashboard = (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/template/dashboard.html'));
};

module.exports = router;