import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { sidebarLinks } from "../data/nav-links";
import { useUserContext } from "../context/User_Context";
import { Link } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsFillBasketFill } from "react-icons/bs";
import { useStoreContext } from "../context/Store_Context";
import axios from "axios";

const Sidebar = () => {
  const { is_sidebar_open, toggleSidebar, user, userLogout } = useUserContext();
  const { basket_items, clearBasket } = useStoreContext();
  const [logoutBtn, setLogoutBtn] = useState(false);

  const logoutUser = async () => {
    setLogoutBtn(true);
    try {
      await axios.delete("/api/v1/auth/logout");
      userLogout();
      clearBasket();
      setLogoutBtn(false);
    } catch (error) {
      setLogoutBtn(false);
    }
  };

  return (
    <aside
      className={`z-20 fixed grid grid-rows-[auto_1fr_auto] items-center top-0 left-0 w-full h-full transition-all duration-500 ease-in-out -translate-x-full bg-hero-pattern  ${
        is_sidebar_open && "!translate-x-0"
      } md:hidden`}
    >
      <div className="bg-green-200 flex items-center justify-between p-2">
        <h1 className="text-3xl font-heading">Scott Shop</h1>
        <button
          className="text-white text-2xl"
          onClick={() => toggleSidebar("close")}
        >
          <FaTimes />
        </button>
      </div>
      <ul
        className={`transition-all duration-500 delay-200 ease-in-out -translate-x-full px-4 py-4 text-lg  ${
          is_sidebar_open && "!translate-x-0"
        } `}
      >
        {sidebarLinks.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li
              key={id}
              className="font-links text-3xl text-shadow-md text-white transition-all duration-500 my-12 hover:px-4 hover:text-black"
            >
              <Link
                to={url}
                onClick={toggleSidebar}
                className="flex items-center gap-2"
              >
                {icon}
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between p-3 bg-green-200">
        {user ? (
          <div className="w-10">
            <button
              onClick={toggleSidebar}
              className="transition-all duration-500 mr-6 bg-green-100 px-2 rounded-md font-heading text-lg capitalize hover:bg-green-500 hover:text-white"
            >
              <Link to="/user/account">
                <div className="flex items-center">
                  <p className="mr-1">Account</p>
                  <RiAccountCircleFill />
                </div>
              </Link>
            </button>
          </div>
        ) : (
          <div className="w-10">
            <button className="transition-all duration-500 bg-green-50 p-1 rounded-md font-heading text-xl capitalize hover:bg-green-500 hover:text-white">
              <Link to="/login" onClick={toggleSidebar}>
                login
              </Link>
            </button>
          </div>
        )}
        {user && (
          <div>
            <button
              disabled={logoutBtn}
              onClick={logoutUser}
              className="transition-all duration-500 text-sm rounded-md capitalize  hover:text-green-500"
            >
              logout
            </button>
          </div>
        )}

        <div className="relative w-10">
          <Link to="/store/basket" onClick={toggleSidebar}>
            <BsFillBasketFill className="text-3xl" />
            <button className=" text-xl font-heading absolute w-7 h-7 text-white -top-2 -left-4 bg-green-500/70 rounded-full">
              {basket_items}
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
