// File: middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const tokenRepository = require('../repositories/tokenRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ isError: true, errorCode: 'AUTH_001', message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const dbToken = await tokenRepository.findByToken(token);
    
    if (!dbToken) {
      return res.status(401).json({ isError: true, errorCode: 'AUTH_002', message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ isError: true, errorCode: 'AUTH_003', message: 'Failed to authenticate token' });
  }
};