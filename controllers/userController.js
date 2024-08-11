// File: controllers/userController.js
const userRepository = require('../repositories/userRepository');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userRepository.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ isError: true, errorCode: 'USR_001', message: 'User not found' });
    }

    res.json({ isError: false, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { username } = req.body;
    
    await userRepository.updateProfile(req.user.id, username);
    
    res.json({ isError: false, message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};