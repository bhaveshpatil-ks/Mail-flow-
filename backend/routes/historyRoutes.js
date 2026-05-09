const express = require("express");
const {
  getHistory,
  clearHistory,
} = require("../controllers/historyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getHistory);
router.delete("/", clearHistory);

module.exports = router;
