const History = require("../models/History");

const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};

const clearHistory = async (req, res) => {
  try {
    await History.deleteMany({ user: req.user._id });

    res.json({
      success: true,
      message: "History cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear history",
    });
  }
};

module.exports = { getHistory, clearHistory };
