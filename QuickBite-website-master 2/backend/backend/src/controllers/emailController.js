const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "devvijay7113@gmail.com",
        pass: process.env.EMAIL_PASS || "kktl ibbg miyj kfrn",
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER || "devvijay7113@gmail.com",
      to: "diyavijay2371@gmail.com",
      subject: "testingggggggggg",
      text: "hello",
    });

    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Email sending failed", error });
  }
};

module.exports = { sendEmail };
