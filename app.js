// File: app.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();
app.use(express.json());


// Import database configuration
require('./config/database');

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
