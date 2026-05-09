const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  try {
    const {
      to,
      subject,
      message,
      senderEmail,
      senderName,
    } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MailFlow" <${process.env.EMAIL_USER}>`,

      to,

      subject,

      text: message,

      replyTo: senderEmail || process.env.EMAIL_USER,

      headers: {
        "X-Mailer": "MailFlow",
      },
    });

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};

module.exports = { sendEmail };