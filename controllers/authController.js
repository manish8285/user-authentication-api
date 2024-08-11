// File: controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const userRepository = require('../repositories/userRepository');
const tokenRepository = require('../repositories/tokenRepository');
const verificationTokenRepository = require('../repositories/verificationToken');
const { sendVerificationEmail } = require('../utils/emailService');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ isError: true, errorCode: 'REG_001', message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create(username, email, hashedPassword);

    const verificationToken = uuidv4();
    await verificationTokenRepository.create(user.id, verificationToken);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({ isError: false, message: 'User registered successfully. Please check your email for verification.' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(400).json({ isError: true, errorCode: 'AUTH_004', message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ isError: true, errorCode: 'AUTH_005', message: 'Email not verified' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ isError: true, errorCode: 'AUTH_006', message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    await tokenRepository.create(user.id, token);

    res.json({ isError: false, token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await tokenRepository.deleteByToken(token);

    res.json({ isError: false, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const verificationToken = await verificationTokenRepository.findByToken(token);
    if (!verificationToken) {
      return res.status(400).json({ isError: true, errorCode: 'VER_001', message: 'Invalid or expired verification token' });
    }

    await userRepository.verifyUser(verificationToken.userId);
    await verificationTokenRepository.deleteByUserId(verificationToken.userId);

    res.json({ isError: false, message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};