import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPAth';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../components/cards/UserCard';
import {toast} from 'react-hot-toast'
function ManageUser() {
  const [allUsers, setAllUsers] = useState([]);

  // const getAllUsers = async () => {
  //   try {
  //     const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
  //     if (response?.data?.length>0) {
  //       console.log("yes")
  //       setAllUsers(response.data);
  //       console.log(response.data);
  //     }
  //     else{
  //       console.log("object")
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      const users = response?.data?.usersWithTaskCount || [];
      
      if (users.length > 0) {
        setAllUsers(users);
        console.log(users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);


  const handleDownloadReport = async () => {
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
  
  return (
    <DashboardLayout activeMenu={"Create task"}>
      <div className='mt-3'>
        <div className='flex justify-between'>
          <h2>Team Members</h2>
          <button
            className='bg-green-100 text-green-500 rounded-md px-2 py-1 flex items-center gap-1'
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet />
            Download report
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2 mt-3'>
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageUser;
