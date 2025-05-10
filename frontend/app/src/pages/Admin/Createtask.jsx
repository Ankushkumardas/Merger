
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { PRIORITY_DATA, STATUS_DATA } from '../../utils/data';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPAth';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LuTrash2 } from 'react-icons/lu';
import SelectDropdown from '../../components/Inputs/SelectDropdown';
import SelectUsers from '../../components/Inputs/SelectUsers';
import TodoListinput from '../../components/Inputs/TodoListinput';
import AddAttachmentInput from '../../components/Inputs/AddAttachmentInput';
import Model from '../../components/Model';
import DeleteAlert from '../../components/DeleteAlert';

function Createtask() {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskdata, settaskdata] = useState({
    title: '',
    description: '',
    duedate: '',
    assignedTo: '',
    priority: 'Low',
    status: 'Pending',
    todoChecklist: [],
    attachments: [],
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setopenDeleteAlert] = useState(false);
  const [currentTask, setcurrentTask] = useState([]);
  const [error, seterror] = useState("");

  const handleValueChange = (key, value) => {
    settaskdata((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    settaskdata({
      title: '',
      description: '',
      duedate: '',
      assignedTo: '',
      priority: 'Low',
      status: 'Pending',
      todoChecklist: [],
      attachments: [],
    });
  };

  const createTask = async () => {
    setLoading(true);
    try {
      const todolist = taskdata.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));
  
      const payload = {
        ...taskdata,
        duedate: taskdata.duedate ? new Date(taskdata.duedate).toISOString() : null,
        todoChecklist: todolist,
      };
  
      const responce = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, payload);
      toast.success("Task Created");
      clearData();
      navigate('/admin/tasks');
  
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error('Error creating task');
    } finally {
      setLoading(false);
    }
  };
  
  // const updateTask = async () => {
  //   try {
  //     setLoading(true);
  
  //     const prevChecklist = currentTask?.todoChecklist || [];
  
  //     const updatedChecklist = taskdata.todoChecklist?.map((item) => {
  //       const matchedItem = prevChecklist.find((task) => task.text === item);
  //       return {
  //         text: item,
  //         completed: matchedItem ? matchedItem.completed : false,
  //       };
  //     });
  
  //     const payload = {
  //       ...taskdata,
  //       duedate: new Date(taskdata.duedate).toISOString(),
  //       todoChecklist: updatedChecklist,
  //     };
  
  //     const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), payload);
  
  //     toast.success("Task updated successfully");
  //   } catch (err) {
  //     console.error("Error updating task:", err);
  //     toast.error("Error updating task");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const updateTask = async () => {
  //   try {
  //     setLoading(true);
  
  //     const prevChecklist = currentTask?.todoChecklist || [];
  //     const updatedChecklist = taskdata.todoChecklist?.map((text) => {
  //       const matchedItem = prevChecklist.find((item) => item.text === text);
  //       return {
  //         text,
  //         completed: matchedItem ? matchedItem.completed : false,
  //       };
  //     }) || [];
  
  //     const payload = {
  //       ...taskdata,
  //       duedate: new Date(taskdata.duedate).toISOString(), // duedate preserved
  //       todoChecklist: updatedChecklist,
  //     };
  
  //     await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), payload);
  
  //     toast.success("Task updated successfully");
  //   } catch (err) {
  //     console.error("Error updating task:", err);
  //     toast.error("Error updating task");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const updateTask=async()=>{
  //   try {
  //     setLoading(false);
  //     const todolist=taskdata.todoChecklist?.map((item)=>{
  //       const prevtodochecklist=currentTask?.todoChecklist||[];
  //       const matchedtask=prevtodochecklist.find((task)=>task.text==item);
  //       return{
  //         text:item,
  //         cempleted:matchedtask?matchedtask.cempleted:false,
  //       };

  //       const responce=await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId),{
  //         ...taskdata,duedate:new Date(taskdata.duedate).toISOString(),
  //         todoChecklist:todolist
  //       });

  //       toast.success("task updates succefully")
  //     })
  //   } catch (error) {
  //     console.log("Error in updateding",error);
  //     toast.error("task not updated");
  //     setLoading(false);
  //   }finally{
  //     setLoading(false);
  //   }
  // }

  // const updateTask = async () => {
  //   try {
  //     setLoading(true); // Set loading to true at the beginning
  
  //     const todolist = taskdata.todoChecklist?.map((item) => {
  //       const prevtodochecklist = currentTask?.todoChecklist || [];
  //       const matchedtask = prevtodochecklist.find((task) => task.text === item);
  //       return {
  //         text: item,
  //         completed: matchedtask ? matchedtask.completed : false, // Corrected spelling: cempleted to completed
  //       };
  //     }) || []; // Added fallback to empty array if taskdata.todoChecklist is null/undefined
  
  //     const response = await axiosInstance.put(
  //       API_PATHS.TASKS.UPDATE_TASK.replace(taskId), // Use replace for dynamic ID
  //       {
  //         ...taskdata,
  //         duedate: taskdata.duedate ? new Date(taskdata.duedate).toISOString() : null, // Added null check for duedate
  //         todoChecklist: todolist,
  //       }
  //     );
  
  //     if (response.status === 200) {
  //       toast.success("Task updated successfully"); // 
  //     } else {
  //       toast.error("Task not updated");
  //       console.error("Error updating task:", response); // 
  //     }
  //   } catch (error) {
  //     console.error("Error in updating task:", error); // 
  //     toast.error("Task not updated");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateTask = async () => {
    try {
      setLoading(true);
  
      // Get the previous checklist (if any)
      const prevChecklist = currentTask?.todoChecklist || [];
  
      // Ensure the checklist items are properly reconstructed
      const updatedChecklist = taskdata.todoChecklist?.map((text) => {
        const prevItem = prevChecklist.find((item) => item.text === text);
        return {
          text,
          completed: prevItem ? prevItem.completed : false,
        };
      }) || [];
  
      // Prepare payload with proper key naming
      const payload = {
        ...taskdata,
        dueDate: new Date(taskdata.dueDate || taskdata.duedate).toISOString(), // support both keys
        todoChecklist: updatedChecklist,
      };
  
      // Make PUT request to update task
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), payload);
  
      toast.success("Task updated successfully");
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Error updating task");
    } finally {
      setLoading(false);
    }
  };
  
  
  const getTaskById = async () => {  
    try {
      const res = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
      if(res.data){
        const taskInfo=res.data;
        setcurrentTask(taskInfo);
        settaskdata((prevdata)=>({
          title: taskInfo.title ,
          description: taskInfo.description || '',
          priority: taskInfo.priority || 'Low',
          duedate: taskInfo.duedate ? taskInfo.duedate.split('T')[0] : '',
          assignedTo: taskInfo.assignedTo?.map(item => item?._id) || [],
          todoChecklist: taskInfo.todoChecklist?.map(item => item?.text) || [],
          attachments: taskInfo.attachments || [],
          status: taskInfo.status || 'Pending',
        }));
      } 
    } catch (err) {
      console.error("Error fetching task:", err);
      toast.error('Failed to fetch task details');
    }
  };
  
  useEffect(() => {
    if (taskId) {
      getTaskById(taskId);  
    }
  }, [taskId]);

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      setopenDeleteAlert(false);
      toast.success('Task deleted');
      navigate('/admin/tasks');
    } catch (err) {
      toast.error('Error deleting task');
    }
  };

  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  
  const handleSubmit = async () => {
    let errors = {};
    setIsValid(true);
  
    if (!taskdata.title.trim()) {
      errors.title = "Title is required";
      setIsValid(false);
    }
    if (!taskdata.description.trim()) {
      errors.description = "Description is required";
      setIsValid(false);
    }
    if (!taskdata.duedate.trim()) {
      errors.duedate = "Due date is required";
      setIsValid(false);
    }
    if (taskdata.todoChecklist.length === 0) {
      errors.todoChecklist = "Todo checklist cannot be empty";
      setIsValid(false);
    }
  
    setValidationErrors(errors);
  
    if (isValid) {
      if (taskId) {
        await updateTask(taskId);
      } else {
        await createTask();
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.GET_USERS);
      setUsers(res.data || []);
    } catch (err) {
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-3">
        <div className="grid grid-cols-12 md:grid-cols-4 mt-2">
          <div className="p-4 rounded-md shadow-sm border border-slate-200 col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {taskId ? 'Update Task' : 'Create Task'}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                  onClick={() => setopenDeleteAlert(true)}
                >
                  <LuTrash2 /> Delete
                </button>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Task Title</label>
              <input
                type="text"
                className="w-full text-sm outline-none border px-2 py-1 mt-1 rounded"
                placeholder="Create App UI"
                value={taskdata.title}
                onChange={(e) => handleValueChange('title', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full text-sm outline-none border px-2 py-1 mt-1 rounded"
                placeholder="Enter task description"
                rows={3}
                value={taskdata.description}
                onChange={(e) => handleValueChange('description', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Priority</label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskdata.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  className="w-full border px-2 py-1 rounded"
                  value={taskdata.duedate}
                  onChange={(e) => handleValueChange('duedate', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Assigned To</label>
                <SelectUsers
                  selectedUsers={taskdata.assignedTo}
                  setselectedUsers={(value) => {
                    handleValueChange("assignedTo", value)
                  }}
                />
              </div>

              {/* <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  className="w-full border px-2 py-1 rounded"
                  value={taskdata.status}
                  onChange={(e) => handleValueChange('status', e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div> */}


<div>
                <label className="text-sm font-medium">Status</label>
                <SelectDropdown
                  options={STATUS_DATA}
                  value={taskdata.status}
                  onChange={(value) => handleValueChange("status", value)}
                  placeholder="Select status"
                />
              </div>


            </div>

            

            <div className=' mt-3'>
              <label >
                Todo Checklist
              </label>
              <TodoListinput
                todolist={taskdata?.todoChecklist}
                setTodolist={(value) => {
                  handleValueChange("todoChecklist", value)
                }}
              />
            </div>

            <div>
              <label >Add Attachment</label>
              <AddAttachmentInput
                attachments={taskdata?.attachments}
                setattachments={(value) => handleValueChange("attachments", value)}
              />
            </div>

            {error && (
              <p>{error}</p>
            )}

            <div className=' flex justify-end'>
              <button onClick={handleSubmit} disabled={loading} className=' px-2 py-1 rounded-md bg-blue-500 text-white '>
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>

          </div>
        </div>
      </div>

      <Model
        isOpen={openDeleteAlert}
        title="Deleted Task"
        onClose={() => {
          setopenDeleteAlert(false);
        }}
      >
        <DeleteAlert
        content="Are you sure want to delet this task"
        onDelete={()=>deleteTask()}/>
      </Model>
    </DashboardLayout>
  );
}

export default Createtask;
