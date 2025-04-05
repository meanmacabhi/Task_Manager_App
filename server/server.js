const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const { router: authRoutes } = require("./routes/authRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());  // Allows frontend to communicate with backend

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
.connect(MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch((error) => console.error("Database Error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
