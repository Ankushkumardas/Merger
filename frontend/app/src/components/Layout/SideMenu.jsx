
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import {
  LuLayoutDashboard,
  LuUsers,
  LuClipboardCheck,
  LuSquarePlus,
  LuLogOut,
} from 'react-icons/lu';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === '/logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
  }, [user]);


  return (
    <div className="w-52 h-screen bg-white border-r border-gray-200/50 sticky top-0 left-0 pt-5">
      <div className="relative">
        <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden">
          <img src={user?.profileImageUrl ||" "} alt="Profile" className="object-cover w-full h-full" />
        </div>
        {user?.role === 'ADMIN' && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-[10px] font-medium py-0.5 px-2 rounded-md">
            Admin
          </div>
        )}
      </div>
      <h5 className="text-gray-700 text-center mt-2 font-semibold">{user?.name || ''}</h5>
      <p className="text-gray-500 text-center text-sm">{user?.email || ''}</p>

      <div className="mt-6">
        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-2 text-md py-2 px-4 mb-2 cursor-pointer ${
              activeMenu === item.label.toLowerCase().replace(' ', '')
                ? 'text-blue-500 bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-4 border-blue-500'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon>{item.icon}</item.icon> 
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
