import React from "react";
import { FiMenu } from "react-icons/fi";
import { useUserContext } from "../context/User_Context";

const SidebarHeader = () => {
  const { toggleSidebar } = useUserContext();

  return (
    <div
      className={`z-10 fixed top-0 left-0 w-full p-2 bg-green-200 md:hidden
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-heading">Scott Shop</h1>
        </div>
        <div>
          <button
            className="cursor-pointer transition-all duration-500 text-white text-3xl hover:rotate-90"
            onClick={() => toggleSidebar("open")}
          >
            <FiMenu />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
