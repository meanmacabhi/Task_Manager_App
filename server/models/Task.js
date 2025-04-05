const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },  // Format: YYYY-MM-DD
  time: { type: String, required: true },  // Format: HH:mm
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Task", TaskSchema);
