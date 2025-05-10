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
            case "In Progress": return "text-slate-400 bg-cyan-50 border border-salte-200 ";
            case "Completed": return "text-slate-400 bg-cyan-50 border border-salte-200 ";
            default: return "text-slate-400 bg-cyan-50 border border-salte-200 ";
        }
    };
    const getPriorityTagColor = () => {
        switch (priority) {
            case "Low":
                return "text-slate-400 bg-cyan-50 border border-salte-200 ";
            case "Medium":
                return "text-slate-400 bg-cyan-50 border border-salte-200 ";
            default: return "text-slate-400 bg-cyan-50 border border-salte-200 ";
        }
    };

    return (
        <div className=' mt-2'>
            <div
                className="flex items-start justify-between gap-6 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-gray-100 cursor-pointer "
                onClick={onClick}
            >
                {/* Left: Status + Priority Tags */}
                <div className="flex flex-col gap-2 min-w-[120px]">
                    <span className={`${getStatusTagColor()} px-3 py-1 rounded-full text-xs font-semibold text-center`}>
                        {status}
                    </span>
                    <span className={`${getPriorityTagColor()} px-3 py-1 rounded-full text-xs font-semibold text-center`}>
                        {priority} Priority
                    </span>
                </div>

                {/* Middle: Task Content */}
                <div
                    className={`flex-1 border-l-4 pl-4 ${status === "In Progress"
                        ? "border-cyan-500"
                        : status === "Completed"
                            ? "border-purple-500"
                            : "border-violet-500"
                        }`}
                >
                    <p className="text-lg font-semibold text-gray-800">{title}</p>
                    <p className="text-sm text-gray-500 mb-2">
                        Task Done:
                        <span className="ml-1">{completedTodoCount}/{todoChecklist?.length || 0}</span>
                       
                        {
                            todoChecklist?.map((item,index)=>{
                                <div key={index}>
                                    <p>{item}</p>
                                </div>
                            })
                        }
                    </p>
                    <p>{description}</p>
                    <Progress progress={progress} status={status} />

                    {/* Dates */}
                    <div className="flex gap-6 mt-4 text-sm text-gray-600">
                        <div>
                            <label className="font-medium">Start Date</label>
                            <p>{createdAt}</p>
                        </div>
                        <div>
                            <label className="font-medium">Due Date</label>
                            <p>{dueDate}</p>
                        </div>
                    </div>
                </div>

                {/* Right: Avatars & Attachment */}
                <div className="flex flex-col items-end justify-between gap-4 min-w-[100px]">
                    <AvatarGroup avatars={assignedTo || []} />
                    {attachmentCount > 0 && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <LuPaperclip className="w-4 h-4" />
                            <span>{attachmentCount}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default TaskCard
