import React from 'react';

function Progress({ status }) {
  const getColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-400";
      case "Completed":
        return "bg-green-400";
      case "Pending":
      default:
        return "bg-red-400";
    }
  };

  const getWidth = () => {
    switch (status) {
      case "In Progress":
        return "50%";
      case "Completed":
        return "100%";
      case "Pending":
      default:
        return "33.33%";
    }
  };

  return (
    <div className="w-full my-2">
      <div className="flex justify-between items-center mb-1 text-sm text-gray-600">
        <span>Status: {status}</span>
        <span>{getWidth()}</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className={`${getColor()} h-2 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: getWidth() }}
        />
      </div>
    </div>
  );
}

export default Progress;
