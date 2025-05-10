import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPAth";
import { LuUsers } from "react-icons/lu";
import Model from "../Model";
import AvatarGroup from "../AvatarGroup";

function SelectUsers({ selectedUsers, setselectedUsers }) {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.usersWithTaskCount?.length > 0) {
        setAllUsers(response.data.usersWithTaskCount);

        console.log(
          "Updated allUsers in getAllUsers:",
          response.data.usersWithTaskCount
        );
      } else {
        console.log("No users found or 'usersWithTaskCount' is empty.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setselectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatar = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
    return () => {};
  }, [selectedUsers]);

  return (
    <div className="  space-y-2">
      {selectedUserAvatar.length === 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className=" px-2 py-1.5  border border-slate-300 rounded-md cursor-pointer flex gap-1 items-center "
        >
          <LuUsers /> Add Member
        </button>
      )}

      {selectedUserAvatar.length > 0 && (
        <div className=" cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatar} maxVisible={3} />
        </div>
      )}

      <Model
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title="Select Users"
      >
        <div className="space-y-1">
          {allUsers?.map((user) => {
            return (
              <div
                key={user._id}
                className="flex items-center gap-4 border p-2 rounded"
              >
                {/* <img
                  src={user.profileImageUrl || "https://via.placeholder.com/40"}
                  alt="n/a"
                  className="w-10 h-10 rounded-full object-cover"
                /> */}

                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <input
                  type="checkbox"
                  checked={
                    Array.isArray(tempSelectedUsers) &&
                    tempSelectedUsers.includes(user._id)
                  }
                  onChange={() => toggleUserSelection(user._id)}
                />
              </div>
            );
          })}
        </div>

        <div className=" flex justify-end gap-2 mt-3">
          <button
            className="px-2 py-1 rounded-md border border-slate-200 bg-red-200 text-red-500"
            onClick={() => setIsModalOpen(false)}
          >
            CANCEL
          </button>
          <button
            className="px-2 py-1 rounded-md border border-slate-200 bg-blue-200 text-blue-500 "
            onClick={handleAssign}
          >
            DONE
          </button>
        </div>
      </Model>
    </div>
  );
}

export default SelectUsers;
