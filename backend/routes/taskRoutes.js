const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTasksById, createTask, updateTasks, deleteTask, updateTaskStatus, updateTaskCheckList, getTask } = require("../controllers/taskController");
const router = express.Router();

// routes-->
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); //admin only get all users
router.get("/:id", protect, getTasksById);
router.post("/", protect, adminOnly, createTask);
router.put("/:id", protect, updateTasks);
router.delete("/:id", protect, adminOnly, deleteTask);
router.put("/:id/status", protect, updateTaskStatus);
router.put("/:id/todo", protect, updateTaskCheckList);

module.exports = router;
