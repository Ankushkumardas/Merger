import React, { useEffect, useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPAth';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import AvatarGroup from '../../components/AvatarGroup';
import Attachment from '../../components/Attachment'

function ViewtaskDetails() {

  const { id } = useParams();
  console.log(id);
  const [task, settask] = useState(null);
  const getStatusColors = (status) => {
    switch (status) {
      case "In Progress": return "text-white bg-yellow-500  ";
      case "Completed": return "text-white bg-green-500 ";
      default: return "text-white bg-red-500  ";
    }
  };

  const getTaskDetailsById = async () => {
    try {
      const responce = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      if (responce.data) {
        const taskInfo = responce.data;
        settask(taskInfo);
      } else {
        console.log("taskinf data not fetched")
      }
    } catch (error) {
      console.log("errro in fetchinnf data bt id", error)
    }
  };

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist];
    const taskId = task?._id;

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;
      try {
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
          {
            todoChecklist: [todoChecklist[index]],
          }
        );
        if (response.status === 200) {
          settask(response.data?.task || task);
        } else {
          // optionally revert the toggle if the API call fails
          todoChecklist[index].completed = !todoChecklist[index].completed;
        }
      } catch (error) {
        console.error(error);
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
      // setTodoChecklist(todoChecklist);
    }
  };


  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://+link";
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsById();
    }
  }, [id])
  return (
    <DashboardLayout activeMenu={"View Details"}>
      <div className=' mt-5'>
        <h2>View Detail of User</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
  <div className="bg-white w-full max-w-xs mx-auto border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4">
    
    {/* Header: Title + Status */}
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-semibold text-gray-800">{task?.title}</h3>
      <div className={`${getStatusColors(task?.status)} text-xs font-medium px-2 py-0.5 rounded-full`}>
        {task?.status}
      </div>
    </div>

    {/* Description */}
    <div className="text-sm text-gray-600 mb-2">
      <span className="font-medium">Description: </span>
      <span>{task?.description}</span>
    </div>

    {/* Priority */}
    <div className="text-sm text-gray-600 mb-2">
      <span className="font-medium">Priority: </span>
      <span>{task?.priority}</span>
    </div>

    {/* Todo Checklist */}
    <div className="mb-3">
      <h4 className="text-sm font-medium text-gray-700 mb-1">Checklist</h4>
      <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
        {task?.todoChecklist?.map((item, index) => (
          <TodoCheckList
            key={`todo_${index}`}
            text={item.text}
            isChecked={item?.completed}
            onChange={() => updateTodoChecklist(index)}
          />
        ))}
      </div>
    </div>

    {/* Assigned To */}
    <div className="mb-3 flex justify-between items-center">
      <p className="text-sm font-medium text-gray-700 mb-1">Assigned To</p>
      <AvatarGroup
        avatars={task?.assignedTo?.map((item) => item?.profileImageUrl) || []}
        maxVisible={5}
      />
    </div>

    {/* Attachments */}
    {task?.attachments?.length > 0 && (
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Attachments</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-600">
          {task?.attachments?.map((link, index) => (
            <Attachment
              key={`link_${index}`}
              link={link}
              index={index}
              onClick={() => handleLinkClick(link)}
            />
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

      </div>
    </DashboardLayout>
  )
}

export default ViewtaskDetails


const TodoCheckList = ({ key, text, isChecked, onChange }) => {

  return (
    <div key={key} className=' flex gap-2'>
      <input type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <p>{text}</p>
    </div>
  )
};



