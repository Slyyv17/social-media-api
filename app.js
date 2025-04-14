const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('./config/db'); // MongoDB connection

// Middleware
app.use(express.json());
app.use(cors());

// Use the router under /api/users
app.use('/api/users', userRoutes);

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000...");
});
