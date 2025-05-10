const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getUsers,
  getUsersId,
  deleteUsersId,
  getUser,
} = require("../controllers/userController");
const router = express.Router();

// routes-->
router.get("/", protect, adminOnly, getUsers); //admin only get all users
router.get("/", protect, getUser); // get all users
router.get("/:id", protect, getUsersId);
router.delete("/:id", protect, adminOnly, deleteUsersId);

module.exports = router;
