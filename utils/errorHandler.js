// File: utils/errorHandler.js
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ isError: true, errorCode: 'SYS_001', message: 'Internal server error' });
  };