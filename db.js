// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'hotel_booking_db',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        // You can also add a stack trace for more details:
        console.error(err.stack);
        return;
    }
    console.log('✅ Connected to MySQL database!');
});

module.exports = db;
