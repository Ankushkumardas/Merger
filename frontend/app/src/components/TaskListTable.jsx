import React from 'react';

function TaskListTable({ tableData }) {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 border border-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border border-blue-300';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-300';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border border-red-300';
      case 'Medium':
        return 'bg-orange-100 text-orange-700 border border-orange-300';
      case 'Low':
        return 'bg-green-100 text-green-700 border border-green-300';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-300';
    }
  };

  return (
    <div className='overflow-x-auto rounded-lg  shadow-sm'>
      <table className='min-w-full bg-white border border-slate-200/80 text-left'>
        <thead className=''>
          <tr>
            <th className='px-2 py-2 font-medium text-gray-600 uppercase '>Task Name</th>
            <th className='px-2 py-2 font-medium text-gray-600 uppercase text-center'>Status</th>
            <th className='px-2 py-2 font-medium text-gray-600 uppercase text-center'>Priority</th>
            <th className='px-2 py-2 font-medium text-gray-600 uppercase text-center'>Created On</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {tableData && tableData.length > 0 ? (
            tableData.map((task) => (
              <tr key={task._id} className='hover:bg-slate-50 transition'>
                <td className='px-2 py-2 text-gray-800'>{task.title}</td>
                <td className='px-2 py-2 text-center'>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getStatusBadgeColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className='px-2 py-2 text-center'>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getPriorityBadgeColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className='px-2 py-2 text-center text-gray-500'>
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskListTable;
