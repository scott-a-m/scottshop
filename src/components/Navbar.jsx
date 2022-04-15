import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarLinks } from "../data/nav-links";
import { BsFillBasketFill } from "react-icons/bs";
import { useUserContext } from "../context/User_Context";
import { useStoreContext } from "../context/Store_Context";
import axios from "axios";
import { MdAccountBox } from "react-icons/md";

const Navbar = () => {
  const { user, userLogout } = useUserContext();
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
    <nav>
      <div className="z-20 hidden bg-green-200 items-center justify-between p-0 m-0 md:fixed md:flex md:w-full md:top-0 md:left-0">
        <div className="bg-green-200 p-0 block w-[150px]">
          <p className="font-heading text-3xl py-2 px-2">Scott Shop</p>
        </div>
        <div className="bg-green-200 overflow-hidden transition-all ease-in-out duration-1000 md:!h-auto md:!opacity-100 md:!w-fit">
          <ul className="flex">
            {sidebarLinks.map((link) => {
              const { id, url, text, icon } = link;
              return (
                <li
                  key={id}
                  className="transition-all duration-500 px-4 font-heading text-2xl hover:text-green-500"
                >
                  <Link to={url} className="flex gap-2 items-center">
                    {text}
                    {icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pr-4 flex justify-end items-center w-[150px]">
          {user ? (
            <div className="flex flex-col">
              <button className="transition-all duration-500 mr-6 bg-green-50 px-2 rounded-md font-heading text-lg capitalize cursor-default hover:bg-green-500 hover:text-white">
                <Link to="/user/account">
                  <div className="flex items-center">
                    <p className="mr-1">Account</p>
                    <MdAccountBox />
                  </div>
                </Link>
              </button>
              <hr />
              <button
                disabled={logoutBtn}
                onClick={logoutUser}
                className="transition-all duration-500 mr-6 px-2 text-sm rounded-md capitalize  hover:text-green-500"
              >
                logout
              </button>
            </div>
          ) : (
            <button className="mr-6 transition-all duration-500 bg-green-50 p-1 rounded-md font-heading text-xl capitalize hover:bg-green-500 hover:text-white">
              <Link to="/login">login</Link>
            </button>
          )}
          <div className="relative">
            <Link to="/store/basket">
              <BsFillBasketFill className="text-3xl" />
              <button className=" text-xl font-heading absolute w-7 h-7 text-white -top-2 -left-4 bg-green-500/70 rounded-full">
                {basket_items}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
