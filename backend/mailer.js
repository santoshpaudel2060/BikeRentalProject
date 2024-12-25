const nodemailer = require("nodemailer");

const sendLoginEmail = async (userEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: userEmail,
      subject: "Login Notification",
      text: `You just logged into our service using this email address (${userEmail}). If this wasn't you, please contact us immediately.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendLoginEmail;
