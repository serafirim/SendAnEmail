// services/emailService.js

const nodemailer = require('nodemailer')

// Create the transport
const createTransporter = () => {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
      debug: true,
      logger: true
    })
}

const sendEmail = async (to, subject, text) => {
    const transporter = createTransporter()
  
    const mailOptions = {
      from: `"Your Name" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      text: text,
    }
  
    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Message sent: %s', info.messageId)
      return info
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
}

module.exports = {
    sendEmail
}