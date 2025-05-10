const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// routes-->
// get all users data Admin only

const getUsers = async (req, res) => {
    try {
      // Step 1: Get all users with role "member" (without password)
      const users = await User.find({ role: "member" }).select("-password");
  
      // Step 2: Add task counts for each user
      const usersWithTaskCount = await Promise.all(
        users.map(async (user) => {
          const pendingTasks = await Task.countDocuments({
            assignedTo: user._id,
            status: "Pending",
          });
          const inprogressTasks = await Task.countDocuments({
            assignedTo: user._id,
            status: "In Progress",
          });
          const completedTasks = await Task.countDocuments({
            assignedTo: user._id,
            status: "Completed",
          });
  
          // Spread the user object and add task counts
          return {
            ...user._doc,
            pendingTasks,
            inprogressTasks,
            completedTasks,
          };
        })
      );
  
      // Step 3: Send the final data
      res.status(200).json({
        message: "Tasks data of users fetched successfully",
         usersWithTaskCount,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

  const getUser = async (req, res) => {
    try {
      // Step 1: Get all users with role "member" (without password)
      const users = await User.find({ role: "member" }).select("-password");
  
      // Step 2: Add task counts for each user
      const usersWithTaskCount = await Promise.all(
        users.map(async (user) => {
          const pendingTasks = await Task.countDocuments({
            assignedTo: user._id,
            status: "Pending",
          });
          const inprogressTasks = await Task.countDocuments({
            assignedTo: user._id,
            status: "In Progress",
          });
          const completedTasks = await Task.countDocuments({
            assignedTo: user._id,
            status: "Completed",
          });
  
          // Spread the user object and add task counts
          return {
            ...user._doc,
            pendingTasks,
            inprogressTasks,
            completedTasks,
          };
        })
      );
  
      // Step 3: Send the final data
      res.status(200).json({
        message: "Tasks data of users fetched successfully",
         usersWithTaskCount,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

// get specific user data Private
const getUsersId = async (req, res) => {
  try {
    const user=await User.findById(req.params.id).select("-password");
    if(!user){
        res.status(401).json({ message: "user not found" });
    }
    else{
        res.status(200).json({ message: "user found",user });
    }
  } 
  catch (error) {
    res.status(401).json({ message: "server error", error });
  }
};

//   delete specoific user Admin only
const deleteUsersId = async (req, res) => {
  try {
  } catch (error) {
    res.status(401).json({ message: "server error", error });
  }
};

module.exports = { getUsers, getUsersId, deleteUsersId,getUser };
