// app.js or server.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');  // Ensure body-parser is installed

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Adjust path if needed
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Other routes and fallback
app.get('*', (req, res) => {
    res.redirect('/auth/login');
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
