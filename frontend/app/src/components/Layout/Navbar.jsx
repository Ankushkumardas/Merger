import React, { useState } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2 px-2">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-xl" />
        ) : (
          <HiOutlineMenuAlt3 className="text-xl" />
        )}
      </button>
      <h2 className="text-md font-medium text-black">Merger.</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] left-0 h-screen w-full bg-white">
          <Side activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;