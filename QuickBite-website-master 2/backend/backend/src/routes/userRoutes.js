const express = require("express");
const { sendEmail } = require("../controllers/emailController");
const { signup, login } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-email", sendEmail);

module.exports = router;
