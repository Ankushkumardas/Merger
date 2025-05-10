import React from 'react'
import Progress from '../Progress';
import AvatarGroup from '../AvatarGroup';
import { LuPaperclip } from 'react-icons/lu';

const TaskCard = (
    { title,
        description,
        priority,
        status,
        progress,
        createdAt,
        dueDate,
        assignedTo,
        attachmentCount,
        totalTodoCount,
        completedTodoCount,
        todoChecklist,
        onClick }
) => {
    console.log(todoChecklist)
    const getStatusTagColor = () => {
        switch (status) {
            case "In Progress": return "text-yellow-400 bg-yellow-100 border border-yellow-200 ";
            case "Completed": return "text-green-400 bg-green-100 border border-green-200 ";
            default: return "text-red-400 bg-red-100 border border-red-200 ";
        }
    };
    const getPriorityTagColor = () => {
        switch (priority) {
            case "Low":
                return "text-yellow-400 bg-yellow-50 border border-yellow-200 ";
            case "Medium":
                return "text-orange-400 bg-orange-50 border border-orange-200 ";
            default: return "text-red-400 bg-red-50 border border-red-200 ";
        }
    };

    return (
        <div className=' mt-2'>
            <div
  className="flex flex-row items-start justify-between gap-1 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-200 cursor-pointer"
  onClick={onClick}
>
  {/* Left: Status & Priority */}
  <div className="flex flex-col items-start gap-3 min-w-[130px]">
    <span
      className={`${getStatusTagColor()} px-3 py-1 rounded-full text-xs font-medium text-center whitespace-nowrap`}
    >
      {status}
    </span>
    <span
      className={`${getPriorityTagColor()} px-3 py-1 rounded-full text-xs font-medium text-center whitespace-nowrap`}
    >
      {priority} Priority
    </span>
    <div className="mt-5">
        <p>Assigned To</p>
      <AvatarGroup avatars={assignedTo || []} />
    </div>
  </div>

  {/* Right: All Other Content */}
  <div className="flex-1 flex flex-col border-l pl-3">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Task Done:
          <span className="ml-1">
            {completedTodoCount}/{todoChecklist?.length || 0}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {attachmentCount > 0 && (
          <>
            <LuPaperclip className="w-4 h-4" />
            <span>{attachmentCount}</span>
          </>
        )}
      </div>
    </div>

    <p className="mt-2 text-sm text-gray-600 max-w-72 overflow-hidden">{description}</p>
    <div className="mt-3">
      <Progress progress={progress} status={status} />
    </div>

    {/* Dates */}
    <div className="flex gap-10 mt-4 text-sm text-gray-500">
      <div>
        <label className="font-medium text-gray-600">Start Date</label>
        <p>{createdAt}</p>
      </div>
      <div>
        <label className="font-medium text-gray-600">Due Date</label>
        <p>{dueDate}</p>
      </div>
    </div>

    
  </div>
</div>

        </div>

    )
}

export default TaskCard
