import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/UserContext';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPAth';
import InfoCard from '../../components/cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import { AiOutlineArrowRight } from "react-icons/ai";
import TaskListTable from '../../components/TaskListTable';
import CustomPieChart from '../../components/chart/CustomPieChart';
import CustomBarChart from '../../components/chart/CustomBarChart';
// import {moment} from "moment";


function Dashboard() {

  const COLORS = [
    '#FF6384', // Red
    '#36A2EB', // Blue
    '#FFCE56'  // Yellow
  ];
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [dashboarddata, setdashboarddata] = useState(null);
  const [piechartdata, setpiechartdata] = useState([]);
  const [barchartdata, setbarchartdata] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  // prepare chart data-->
  const perpareChartdata = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributiondata = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setpiechartdata(taskDistributiondata);

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "Hard", count: taskPriorityLevels?.Hard || 0 },
    ];
    setbarchartdata(PriorityLevelData);
  };


  const getDashboardData = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
      if (response.data) {
        setdashboarddata(response.data);
        perpareChartdata(response.data?.charts || null);
      } else {
        console.log("No data received from API.");
      }
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
      // Optionally set an error state here
    } finally {
      setLoading(false); // Set loading to false after fetching (success or error)
    }
  };



  const onSeeMore = () => {
    navigate('/admin/tasks')
  }

  useEffect(() => {
    getDashboardData();
    return () => { };
  }, []);

  useEffect(() => {
    if (dashboarddata && dashboarddata.recentTasks) {
      
    }
  }, [dashboarddata]);

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className='bg-white p-3 rounded-md border border-slate-200 shadow-sm my-5'>
        <div>
          <div className='col-span-3'>
            <h2>Good Morning!</h2>
            {/* <p>{moment().format("dddd Do MMM YYY")}</p> */}
          </div>
        </div>

        <div className=' grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mt-3'>
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(dashboarddata?.charts?.taskDistribution?.All || 0)}
            bgcolor={"bg-blue-500"} />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(dashboarddata?.charts?.taskDistribution?.Pending || 0)}
            bgcolor={"bg-yellow-500"} />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(dashboarddata?.charts?.taskDistribution?.InProgress || 0)}
            bgcolor={"bg-orange-500"} />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(dashboarddata?.charts?.taskDistribution?.Completed || 0)}
            bgcolor={"bg-green-500"} />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
        <div>
          <div >
            <div className='flex items-center justify-between mb-4'>
              <h2>Task Distribution</h2>
            </div>
            <CustomPieChart
            data={piechartdata}
            label={"Total Balance"}
            colors={COLORS}
            />
          </div>
        </div>

        <div>
          <div >
            <div className='flex items-center justify-between mb-4'>
              <h2>Task Priority Level</h2>
            </div>
            <CustomBarChart
            data={piechartdata}
            label={"Total Balance"}
            colors={COLORS}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Recent Tasks</h3>
          <button className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/80 hover:bg-blue-200/80 hover:text-blue-500 " onClick={onSeeMore}>
            See All <AiOutlineArrowRight className="text-base" />
          </button>
        </div>
        {/* <TaskListTable tableData={dashboarddata.recentTasks || []} /> */}
        {loading ? (
          <p>Loading recent tasks...</p> // Or a more sophisticated loader
        ) : dashboarddata ? (
          <TaskListTable tableData={dashboarddata.recentTasks || []} />
        ) : (
          <p>No recent tasks data available.</p> // Or handle the case where data fetching failed
        )}

      </div>


    </DashboardLayout>
  )
}

export default Dashboard

