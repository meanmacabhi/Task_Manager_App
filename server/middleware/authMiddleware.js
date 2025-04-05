const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Ensure header exists and follows correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied, invalid token format" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request object
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Debugging log
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
