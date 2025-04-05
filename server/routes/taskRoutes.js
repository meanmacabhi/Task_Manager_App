const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ➕ Add Task
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, date, time } = req.body;
    const newTask = new Task({ title, date, time, userId: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 📋 Fetch and Sort Tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ date: 1, time: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ❌ Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
