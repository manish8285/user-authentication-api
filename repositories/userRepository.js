// File: repositories/userRepository.js
const pool = require('../config/database');

exports.create = async (username, email, password) => {
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return { id: result.insertId, username, email };
};

exports.findByEmail = async (email) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

exports.verifyUser = async (userId) => {
  await pool.execute('UPDATE users SET isVerified = TRUE WHERE id = ?', [userId]);
};

exports.updateProfile = async (userId, username) => {
  await pool.execute('UPDATE users SET username = ? WHERE id = ?', [username, userId]);
};
