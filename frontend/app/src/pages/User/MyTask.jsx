import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPAth';
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatustabs from '../../components/TaskStatustabs';
import TaskCard from '../../components/cards/TaskCard';
import axios from 'axios';

function MyTask() {

  const [allTasks, setallTasks] = useState([]);
  const [tabs, settabs] = useState([]);
  const [filterStatus, setfilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAlltask = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: { status: filterStatus === "All" ? "" : filterStatus },
      });
      setallTasks(response.data?.tasks || []);

      setallTasks(response.data?.tasks || []);

      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pending || 0 },
        { label: "In Progress", count: statusSummary.inProgress || 0 },
        { label: "Completed", count: statusSummary.completed || 0 }, // ✅ Fixed spelling
      ];
      settabs(statusArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/user/task-details/${taskData}`, { state: { taskId: taskData } });
  };

  const handleDownloadtaskreport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob", // Ensure blob response
      });
  
      // Create a download URL from the blob
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", "UserDetails.xlsx");
  
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      toast.success("Excel file downloaded successfully");
    } catch (error) {
      console.error("Error downloading Excel file:", error);
      toast.error("Failed to download Excel file");
    }
  };

  useEffect(() => {
    getAlltask(); // ✅ Correct: it uses filterStatus from closure
    return () => { };
  }, [filterStatus]);
  return (

    <DashboardLayout activeMenu={"User Tasks"}>
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">My Tasks</h2>
          <button
      onClick={handleDownloadtaskreport}
      className="px-2 py-1 rounded-md bg-green-200 text-green-600 hover:bg-green-300/70 flex gap-1 items-center"
    >
      <LuFileSpreadsheet />
      Download Report
    </button>
        </div>

        {tabs?.[0]?.count > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <TaskStatustabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setfilterStatus}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-4 mt-4">
          {allTasks.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              progress={task.progress}
              createdAt={task.createdAt}
              dueDate={task.dueDate}
              assignedTo={
                task.assignedTo?.map((user) => ({
                  name: user.name,
                  profileImageUrl: user.profileImageUrl,
                })) || []
              }
              attachmentCount={task.attachments?.length || 0}
              completedTodoCount={
                task.todoChecklist?.filter((todo) => todo.completed).length || 0
              }
              totalTodoCount={task.todoChecklist?.length || 0}
              onClick={() => handleClick(task._id)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>

  )
}

export default MyTask
