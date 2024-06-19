// controllers/emailController.js

const { sendEmail } = require('../services/emailService')

const sendTestEmail = async (req, res) => {
  const { email, subject, message } = req.body

  try {
    await sendEmail(email, subject, message);
    res.status(200).json({ message: 'Email sent successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error })
  }
}

module.exports = {
  sendTestEmail,
}