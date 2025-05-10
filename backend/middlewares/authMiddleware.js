const User = require("../models/User");
const jwt = require("jsonwebtoken");

// middleware to protect routes-->
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (err) {
    res.status(401).json({ message: "Server error, no token", err });
  }
};

// middleware for admin only access-->
const adminOnly = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "Access denied ,only admin has acces to this route",
      err,
    });
  }
};

module.exports = { protect, adminOnly };
