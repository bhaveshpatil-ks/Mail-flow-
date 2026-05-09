const express = require("express");
const { sendEmail } = require("../controllers/emailController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/send", sendEmail);

module.exports = router;
