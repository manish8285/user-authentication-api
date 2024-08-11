// File: repositories/verificationTokenRepository.js
const pool = require('../config/database');

exports.create = async (userId, token) => {
  await pool.execute('INSERT INTO verificationTokens (userId, token) VALUES (?, ?)', [userId, token]);
};

exports.findByToken = async (token) => {
  const [rows] = await pool.execute('SELECT * FROM verificationTokens WHERE token = ?', [token]);
  return rows[0];
};

exports.deleteByUserId = async (userId) => {
  await pool.execute('DELETE FROM verificationTokens WHERE userId = ?', [userId]);
};