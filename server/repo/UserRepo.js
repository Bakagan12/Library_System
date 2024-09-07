const connection = require('../db/db');
const User = require('../models/User');

class UserRepository {
    static create(user, callback) {
        const query = 'INSERT INTO user (first_name, last_name, middle_name, email, password) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [user.first_name, user.last_name, user.middle_name, user.email, user.password], callback);
    }

    static findByEmail(email, callback) {
        const query = 'SELECT * FROM user WHERE email = ?';
        connection.query(query, [email], callback);
    }
}

module.exports = UserRepository;
