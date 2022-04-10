import React from "react";
import { IoShirt } from "react-icons/io5";
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
            className="cursor-pointer text-white text-3xl"
            onClick={() => toggleSidebar("open")}
          >
            <IoShirt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
