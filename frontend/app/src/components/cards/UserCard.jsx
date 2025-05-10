import React from "react";

function UserCard({ userInfo }) {
  return (
    <div className="border border-slate-200 p-3 rounded-lg shadow-sm bg-white hover:shadow-md transition-all flex flex-col gap-2">
      <div className="flex justify-between items-center gap-3">

        <div className=" text-sm space-y-1">
          <p>
            <span className="text-gray-600">Name:</span>{" "}
            <span className="font-medium">{userInfo?.name}</span>
          </p>
          <p>
            <span className="text-gray-600">Email:</span>{" "}
            <span>{userInfo?.email}</span>
          </p>
          <p>
            <span className="text-gray-600">Role:</span>{" "}
            <span>{userInfo?.role}</span>
          </p>
        </div>
        <img
          src={
            userInfo?.profileImageUrl ||
            `https://ui-avatars.com/api/?name=${userInfo?.name}`
          }
          alt="User"
          className="w-12 h-12 rounded-full object-cover border border-slate-300"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-end mt-2">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inprogressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
}

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-800 bg-cyan-100";
      case "Pending":
        return "text-yellow-800 bg-yellow-100";
      case "Completed":
        return "text-green-800 bg-green-100";
      default:
        return "text-gray-800 bg-gray-100";
    }
  };

  return (
    <div
      className={`flex flex-col items-center px-2 py-1 rounded-md min-w-[70px] ${getStatusTagColor()}`}
    >
      <span className="text-[11px] font-medium">{label}</span>
      <span className="text-sm font-semibold">{count}</span>
    </div>
  );
};
