const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serves static files like index.html and styles.css

// Email route
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'madrizivanandres@gmail.com', // 🔒 your Gmail
      pass: 'xtogfuyzjkjeecwc'    // 🔒 Gmail App Password
    }
  });

  const mailOptions = {
    from: email,
    to: 'madrizivanandres@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.json({ success: false, message: 'Error sending email: ' + error.message });
    }
    res.json({ success: true, message: 'Message sent successfully!' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
