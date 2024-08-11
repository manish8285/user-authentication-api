// File: routes/userRoutes.js
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;