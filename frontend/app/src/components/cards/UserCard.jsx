import React from "react";

function UserCard({ userInfo }) {
  return (
    <div>
      <div className=" border border-slate-200 p-2 rounded-md shadow-sm">
        <div className="flex">
          <img src={userInfo?.profileImageUrl} alt="" />
          <div className=" ">
            <p>Name:{userInfo?.name}</p>
            <p>Email:{userInfo?.email}</p>
            <p>Role:{userInfo?.role}</p>
            <div className=" flex ">
              <StatCard
                label={"Pending"}
                count={userInfo?.pendingTasks || 0}
                status={"Pending"}
              />
              <StatCard
                label={"In Progress"}
                count={userInfo?.pendingTasks || 0}
                status={"In Progress"}
              />
              <StatCard
                label={"Completed"}
                count={userInfo?.pendingTasks || 0}
                status={"Completed"}
              />
            </div>
          </div>
        </div>
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
    <div className={`flex ${getStatusTagColor()} px-3 py-3 rounded-md`}>
        <div className=" flex flex-col items-center gap-1">
      <span className=" text-center text-xs">{label}</span>
      <span className=" text-center">{count}</span>
      </div>
    </div>
  );
};
