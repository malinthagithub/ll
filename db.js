require('dotenv').config();  // Import dotenv to load environment variables
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,         // MySQL Host (e.g., MYSQLHOST)
    user: process.env.DB_USER,         // MySQL User (e.g., MYSQLUSER)
    password: process.env.DB_PASSWORD, // MySQL Password (e.g., MYSQLPASSWORD)
    database: process.env.DB_NAME,     // MySQL Database (e.g., MYSQLDATABASE)
    port: process.env.DB_PORT || 3306  // MySQL Port, default is 3306 if not provided
});

db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.error(err.stack);
        return;
    }
    console.log('✅ Connected to MySQL database!');
});

module.exports = db;
