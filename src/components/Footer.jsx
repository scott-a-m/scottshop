import React from "react";
import { Link } from "react-router-dom";
import { social } from "../data/nav-links";
const Footer = () => {
  return (
    <footer className="bg-green-800 p-2 text-white">
      <div className="flex items-center justify-center gap-2">
        <p>©Scott Mitchell</p>
        <div className="flex items-center gap-2">
          <ul className="flex gap-2 ">
            {social.map((link) => {
              const { id, url, icon } = link;
              return (
                <li
                  key={id}
                  className="text-2xl transition-all duration-500 hover:text-black"
                >
                  <a href={url}>{icon}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
