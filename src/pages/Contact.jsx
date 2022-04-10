import React from "react";
import { Link } from "react-router-dom";
import { social } from "../data/nav-links";

const Contact = () => {
  return (
    <main>
      <div className="mt-20 md:gap-16 md:h-screen md:flex md:justify-center md:items-center md:m-0">
        <div className="grid md:grid-cols-2 items-center p-10">
          <div className="flex justify-center px-4">
            <img
              src="/img/contact-us.jpg"
              alt="contact"
              className="rounded-md h-[18rem] md:h-[20rem] lg:h-[25rem] object-cover"
            />
          </div>

          <div className="mt-10 text-center text-lg lg:text-xl md:m-0 px-4">
            <p className="py-2">
              Hi, I'm Scott Mitchell, and I built{" "}
              <span className="italic">Scott Shop</span> as a personal coding
              project - it's not a real shop.
            </p>
            <p className="py-2">
              But... you can browse the cool clothes, "buy" them with the test
              credit card provided, view your orders and leave reviews.
            </p>
            <p className="py-2">
              Also, if you're wondering where the awesome shop images come from,
              check out this{" "}
              <Link to="/credits" className="link">
                page
              </Link>
              .
            </p>
            <p className="py-2">Finally, any questions, please get in touch.</p>
            <ul className="flex justify-center gap-4 py-4">
              {social.map((item, index) => {
                const { url, icon, text } = item;
                return (
                  <li
                    key={index}
                    className="bg-green-700 p-1 text-3xl text-white rounded shadow-sm transition-all duration-500 hover:bg-green-600"
                  >
                    <a href={url} alt={text} target="_blank" rel="noreferrer">
                      {icon}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
