import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTask from "./pages/Admin/ManageTask";
import CreateTask from "./pages/Admin/Createtask";
import ManageUser from "./pages/Admin/ManageUser";
import UserDashboard from "./pages/User/UserDashboard";
import MyTask from './pages/User/MyTask';
import ViewTaskDetails from './pages/User/ViewtaskDetails';
import Signup from "./pages/Auth/Signup";

import UserProvider, { UserContext } from "./context/UserContext";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <UserProvider>
<Toaster
toastOptions={{
  className:"",
  style:{
    fontSize:"12px"
  }
}}
/>
      <div className=" text-sm">
        <BrowserRouter>
          <Routes>
          <Route index element={<Home/>}/>
            {/* <Route index element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* {Private routes} */}
            <Route element={<PrivateRoute allowedRoles={"admin"} />} >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/tasks" element={<ManageTask />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/users" element={<ManageUser />} />
            </Route>

            {/* {user routes} */}
            <Route element={<PrivateRoute allowedRoles={"user"} />} >
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/task" element={<MyTask />} />
              <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
            </Route>
            <Route path="/" element={<Root />} />
              
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>

  );
}

export default App;

const Root = () => {
  const [user, loading] = useContext(UserContext);
  if (loading) return <Outlet />

  if (!user) {
    return <Navigate to={"/login"} />
  }
  return user.role === 'admin' ? <Navigate to={"/admin/dashboard"} /> : <Navigate to={"/user/dashboard"} />
}
