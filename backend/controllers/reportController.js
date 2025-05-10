const Task=require("../models/Task");
const User=require("../models/User");
const exceljs=require("exceljs");

const exportTasksReport = async (req, res) => {
    try {
      const tasks = await Task.find().populate("assignedTo", "name email");
  
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet("Tasks Report");
  
      // Define columns
      worksheet.columns = [
        { header: "Task ID", key: "_id", width: 30 },
        { header: "Title", key: "title", width: 30 },
        { header: "Description", key: "description", width: 40 },
        { header: "Priority", key: "priority", width: 15 },
        { header: "Status", key: "status", width: 15 },
        { header: "Due Date", key: "duedate", width: 20 },
        { header: "Assigned To", key: "assignedTo", width: 30 },
      ];
  
      // Add rows
      tasks.forEach((task) => {
        const assignedTo = task.assignedTo.map((user) => user.email).join(", ");
        worksheet.addRow({
          _id: task._id,
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          duedate: task.duedate ? task.duedate.toISOString().split("T")[0] : "N/A",
          assignedTo: assignedTo || "Unassigned",
        });
      });
  
      // Send file
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=tasks_report.xlsx");
  
      return workbook.xlsx.write(res).then(() => {
        res.end();
      });
      
    } catch (error) {
      res.status(500).json({ message: "Error exporting tasks report", error });
    }
  };
  

  const exportUsersReport = async (req, res) => {
    try {
      const users = await User.find().select('name email _id').lean();
  
      const usertasks = await Task.find().populate(
        "assignedTo",
        "name email _id"
      );
  
      const userTaskMap = {};
      users.forEach((user) => {
        userTaskMap[user._id] = {
          name: user.name,
          email: user.email,
          taskCount: 0,
          pendingTask: 0,
          inProgressTask: 0,
          completedTask: 0,
        };
      });
  
      usertasks.forEach((task) => {
        if (Array.isArray(task.assignedTo)) {
          task.assignedTo.forEach((assignedUser) => {
            const userId = assignedUser._id.toString();
            if (userTaskMap[userId]) {
              userTaskMap[userId].taskCount += 1;
  
              if (task.status === "Pending") {
                userTaskMap[userId].pendingTask += 1;
              } else if (task.status === "In Progress") {
                userTaskMap[userId].inProgressTask += 1;
              } else if (task.status === "Completed") {
                userTaskMap[userId].completedTask += 1;
              }
            }
          });
        }
      });
  
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet("User Tasks Report");
      worksheet.columns = [
        { header: "Name", key: "name", width: 30 },
        { header: "Email", key: "email", width: 30 },
        { header: "Total Assigned Tasks", key: "taskCount", width: 25 },
        { header: "Pending Tasks", key: "pendingTask", width: 20 },
        { header: "In Progress Tasks", key: "inProgressTask", width: 25 },
        { header: "Completed Tasks", key: "completedTask", width: 25 },
      ];
  
      Object.values(userTaskMap).forEach((user) => {
        worksheet.addRow(user);
      });
  
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=users_report.xlsx");
  
      return workbook.xlsx.write(res).then(() => {
        res.end();
      });
    } catch (error) {
      res.status(500).json({ message: "Error exporting users report", error });
    }
  };
  

module.exports={exportTasksReport,exportUsersReport}