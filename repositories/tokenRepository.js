// File: repositories/tokenRepository.js
const pool = require('../config/database');

exports.create = async (userId, token) => {
  await pool.execute('INSERT INTO tokens (userId, token) VALUES (?, ?)', [userId, token]);
};

exports.findByToken = async (token) => {
  const [rows] = await pool.execute('SELECT * FROM tokens WHERE token = ?', [token]);
  return rows[0];
};

exports.deleteByToken = async (token) => {
  await pool.execute('DELETE FROM tokens WHERE token = ?', [token]);
};
