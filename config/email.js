// File: utils/emailConfig.js
const nodemailer = require('nodemailer');

const createTransporter = async () => {
  // Create a test account using Ethereal
  let testAccount = await nodemailer.createTestAccount();

  // Create a transporter object using the default SMTP transport
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

module.exports = createTransporter;
