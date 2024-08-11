// File: routes/authRoutes.js
const express = require('express');
const { signup, login, logout, verifyEmail } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.get('/verify-email/:token', verifyEmail);

module.exports = router;