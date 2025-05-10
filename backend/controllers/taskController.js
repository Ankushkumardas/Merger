const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    // Step 1: Build filter based on query
    let filter = {};
    if (status) {
      filter.status = status;
    }

    let tasks;

    // Step 2: Fetch tasks
    if (req.user.role === "admin") {
      // Admin gets all tasks
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      // Members get only their tasks
      tasks = await Task.find({
        ...filter,
        assignedTo: req.user._id,
      }).populate("assignedTo", "name email profileImageUrl");
    }

    // Step 3: Add completed todoChecklist count to each task
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completeCount = task.todoChecklist.filter(
          (item) => item.completed
        ).length;
        return {
          ...task._doc,
          completedTodoCount: completeCount,
        };
      })
    );

    // Step 4: Task status summary counts

    // Count all tasks for admin or member
    const allTasksCount = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    // Count Pending tasks
    const pendingTasks = await Task.countDocuments({
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    // Count In Progress tasks
    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    // Count Completed tasks
    const completedTasks = await Task.countDocuments({
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    // Step 5: Send response
    res.status(200).json({
      tasks,
      statusSummary: {
        all: allTasksCount,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}; //done

const getTasksById = async (req, res) => {
  try {
    const Id=req.params.id;
    const task = await Task.findById(Id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    if (!task) return res.status(404).json({ messgae: "Tasks not found" });
  
    res.json( task);
  } catch (error) {
    res.status(404).json({ message: "server eror", error });
  }
}; //done

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      duedate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;
    if (!Array.isArray(assignedTo)) {
      res.status(404).json({ message: "assigned to must be array of ID's" });
    }
    const task = await Task.create({
      title,
      description,
      priority,
      duedate,
      assignedTo,
      createdBy: req.user._id,
      todoChecklist,
      attachments,
    });
    res.status(200).json({ message: "task craeted successfully", task });
  } catch (error) {
    res.status(404).json({ message: "server eror", error });
  }
}; //done

const updateTasks = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found to update" });
    }

    // Use req.body, not res.body
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.duedate = req.body.duedate || task.duedate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;
    if (req.body.status) {
      if (["Pending", "In Progress", "Completed"].includes(req.body.status)) {
        task.status = req.body.status;
      } else {
        return res.status(400).json({ message: "Invalid status value" });
      }
    }
    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "assignedTo must be an array of user IDs" });
      }
      task.assignedTo = req.body.assignedTo;
    }

    // Call .save() on the document, not Task (model)
    const updatedTasks = await task.save();
    res
      .status(200)
      .json({ message: "Task updated successfully", updatedTasks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}; //done

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "task with this id nbot found" });
    }
    await task.deleteOne();
    res.status(200).json({ message: "task deleted succesfully", task });
  } catch (error) {
    res.status(404).json({ message: "server eror", error });
  }
}; //done

const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isAssigned && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.status = req.body.status || task.status;

    if (task.status === "Completed") {
      task.todoChecklist.forEach((item) => (item.completed = true));
      task.progress = 100;
    }

    await task.save();

    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}; //done

const updateTaskCheckList = async (req, res) => {
  try {
    const { todoChecklist } = req.body;

    // Find the task by ID
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the user is authorized to update the checklist (admins are allowed)
    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(402)
        .json({ message: "Not authorized to update checklist" });
    }

    // Update the todoChecklist
    task.todoChecklist = todoChecklist;

    // Auto-update the progress based on the checklist
    const completeCount = task.todoChecklist.filter((item) => item.completed)
      .length;
    const totalItems = task.todoChecklist.length;
    task.progress =
      totalItems > 0 ? Math.round((completeCount / totalItems) * 100) : 0;

    // Auto-mark task as completed if all items are checked
    if (task.progress === 100) {
      task.status = "Completed";
    } else if (task.progress > 0) {
      task.status = "In Progress";
    } else {
      task.status = "Pending";
    }

    // Save the updated task
    await task.save();

    // Populate task with assigned user details
    const updatedTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    // Send the updated task response
    res
      .status(200)
      .json({ message: "Task checklist updated", task: updatedTask });
  } catch (error) {
    res.status(404).json({ message: "Server error", error });
  }
};
//done

const getDashboardData = async (req, res) => {
  try {
    // fetch statistics
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const overdueTasks = await Task.countDocuments({
      status: { $ne: "Completed" },
      duedate: { $lt: new Date() },
    });

    // ensure all possible status are included
    const taskStatus = ["Pending", "In Progress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskDistribution = taskStatus.reduce((acc, status) => {
      const formatedkey = status.replace(/\s+/g, "");
      acc[formatedkey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistribution["All"] = totalTasks;

    // ensure all priority levels are included
    const taskpriorities = ["Low", "Medium", "High"];
    const taskpriorityLevelsRaw = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskprioritylevels = taskpriorities.reduce((acc, priority) => {
      acc[priority] =
        taskpriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority duedate createdAt");

    res.status(200).json({
      message: "get dashboard data",
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskprioritylevels,
      },
      recentTasks,
    });
  } catch (error) {
    res.status(404).json({ message: "server error", error });
  }
};
//done

const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ assignedTo: userId });
    const pendingTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Pending",
    });
    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Completed",
    });
    const overdueTasks = await Task.countDocuments({
      assignedTo: userId,
      status: { $ne: "Completed" },
      duedate: { $lt: new Date() },
    });

    const taskStatus = ["Pending", "In Progress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      { $match: { assignedTo: { $in: [userId] } } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskDistribution = taskStatus.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistribution["All"] = totalTasks;

    const taskPriorities = ["Low", "Medium", "High"];
    const taskPriorityLevelsRaw = await Task.aggregate([
      { $match: { assignedTo: { $in: [userId] } } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    const recentTasks = await Task.find({ assignedTo: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority duedate createdAt");

    res.status(200).json({
      message: "User dashboard data fetched successfully",
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
//done

module.exports = {
  createTask,
  updateTasks,
  deleteTask,
  updateTaskStatus,
  getTasks,
  getTasksById,
  updateTaskCheckList,
  getUserDashboardData,
  getDashboardData,

};
