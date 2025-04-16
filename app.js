const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
require('./config/db'); // MongoDB connection
require('dotenv').config(); // load env 

// Middleware
app.use(express.json());
app.use(cors());

// Use the router under /api/users
app.use('/api/users', userRoutes);

// Use the router under /api/posts
app.use('/api/posts', postRoutes);

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000...");
}); 
