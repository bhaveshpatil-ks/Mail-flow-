const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    senderName: {
      type: String,
      trim: true,
      default: "",
    },
    senderEmail: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Sent", "Failed"],
      default: "Sent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
