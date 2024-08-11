// File: utils/emailService.js
const createTransporter = require('../config/email');

exports.sendVerificationEmail = async (email, token) => {
  try {
    // Get the transporter object
    let transporter = await createTransporter();

    // Define email options
    let mailOptions = {
      from: '"User Auth" <no-reply@userauth.com>', // sender address
      to: email, // list of receivers
      subject: 'Email Verification', // Subject line
      text: `Please verify your email using the following token: ${token}`, // plain text body
      html: `<p>Please verify your email using the following token: <strong>${token}</strong></p>`, // html body
    };

    // Send email using the transporter
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    // Preview URL only available when sending through Ethereal
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};