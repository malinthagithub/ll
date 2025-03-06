const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql2");

// Create the MySQL connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Use the environment variable for DB host
    user: process.env.DB_USER, // Use the environment variable for DB user
    password: process.env.DB_PASSWORD, // Use the environment variable for DB password
    database: process.env.DB_NAME, // Use the environment variable for DB name
    port: process.env.DB_PORT || 3306 // Default to 3306 if not set
});

// Import routes
const stripeRoutes = require("./routes/stripeRoutes");
const roomRoutes = require("./routes/room");
const userRoutes = require("./routes/users");
const availableRoutes = require('./routes/available');
const bookingRoutes = require("./routes/bookingRoutes");
const searchRoutes = require('./routes/searchRoutes');
const reviewRoutes = require('./routes/reviews');
const revenueroutes = require('./routes/revenue');
const booktodyRoute = require('./routes/booktody');
const reportRoutes = require('./routes/reportRoutes');
const reviewOwnerRoutes = require('./routes/reviewOwnerRoutes');

// Create an Express app
const app = express();

// Middleware setup
app.use(express.json()); // Allows parsing of JSON data in requests
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "*", // Use the frontend URL or wildcard for production
        credentials: true, // Allow cookies/auth headers if needed
    })
);

// Enable CORS for frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

// Define API routes
app.use("/api/stripe", stripeRoutes); // Payment & Booking API
app.use("/api/rooms", roomRoutes);    // Room-related API
app.use("/api/users", userRoutes);    // User-related API (register, login)
app.use('/api/available', availableRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/revenue', revenueroutes);
app.use('/api/booktody', booktodyRoute);
app.use('/api/reports', reportRoutes);
app.use('/room', reviewOwnerRoutes); // Add owner route

// Connect to the database and start the server
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        return;
    }
    console.log("✅ Connected to MySQL database!");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
});
