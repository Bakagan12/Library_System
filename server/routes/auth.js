// routes/yourRouterFile.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db/db');

// Registration route
router.post('/register', (req, res) => {
    const { last_name, first_name, middle_name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match');
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Internal server error');
        }

        // Insert new user into the database
        connection.query('INSERT INTO user (first_name, last_name, middle_name, email, password) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, middle_name, email, hashedPassword],
            (err) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).send('Error registering user');
                }
                res.redirect('/login');
            }
        );
    });
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length > 0) {
            // Check password
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send('Internal server error');
                }
                if (isMatch) {
                    // Password matches
                    req.session.user = results[0];
                    res.redirect('/dashboard');
                } else {
                    // Invalid credentials
                    res.status(401).send('Invalid credentials');
                }
            });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal server error');
        }
        res.redirect('/login');
    });
});

module.exports = router;
