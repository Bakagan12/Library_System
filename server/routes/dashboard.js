const express = require('express');
const router = express.Router();
const path = require('path');

// Dashboard route
router.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '../../public/views/template/dashboard.html'));
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
