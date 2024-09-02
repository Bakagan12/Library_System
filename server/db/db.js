const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library_systemdb'
});
// Test connection
connection.getConnection((err, conn) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database successfully!');

    // Test a simple query
    conn.query('SELECT 1 + 1 AS solution', (err, results) => {
        conn.release(); // Release the connection back to the pool
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Query result:', results[0].solution); // Should output 2
    });
});
module.exports = connection;
