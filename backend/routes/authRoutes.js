const express = require("express");
const multer = require("multer");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

//routes--->
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// image upload-->
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(401).json({ message: "No file found for upload" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;

  res.status(200).json({ message: "Image uploaded successfully", imageUrl });
});
module.exports = router;
