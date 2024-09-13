const bcrypt = require('bcrypt');
const UserRepository = require('../repo/UserRepo');
const User = require('../models/User');

class UserService {
    static register(userData, callback) {
        if (userData.password !== userData.confirm_password) {
            return callback({ message: 'Passwords do not match' });
        }

        // Hash the password
        bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
            if (err) {
                return callback({ message: 'Error hashing password' });
            }

            const user = new User(null, userData.first_name, userData.last_name, userData.middle_name, userData.email, hashedPassword);
            UserRepository.create(user, (err) => {
                if (err) {
                    return callback({ message: 'Error registering user' });
                }
                callback(null, 'User registered successfully');
            });
        });
    }

    static login(email, password, req, callback) {
        UserRepository.findByEmail(email, (err, users) => {
            const validationErrors = UserValidation.validateRegistration(userData);
            if (err || users.length === 0) {
                return callback({ message: 'Invalid email or password' });
            }

            const user = users[0];  // Use the first element if multiple users are found
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return callback({ message: 'Invalid email or password' });
                }

                // Ensure req.session exists
                if (!req.session) {
                    return callback({ message: 'Session not initialized' });
                }

                // Store user ID in the session
                req.session.userId = user.id;
                return callback(null, { user });
            });
        });
    }
}

module.exports = UserService;
