import React from "react";
import { FaGithub, FaFreeCodeCamp, FaTwitter } from "react-icons/fa";
import { BiEnvelope } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { RiCustomerServiceFill } from "react-icons/ri";
import { GiGreenhouse } from "react-icons/gi";
import { BsLightningFill } from "react-icons/bs";
import { ImCool2 } from "react-icons/im";

const links = [
  {
    id: 1,
    url: "/store",
    text: "Shop",
  },
  {
    id: 2,
    url: "/",
    text: "Home",
  },
  {
    id: 3,
    url: "/contact",
    text: "Contact",
  },
];

const sidebarLinks = [
  {
    id: 1,
    url: "/store",
    text: "Shop",
    icon: <GiShoppingBag />,
  },
  {
    id: 2,
    url: "/",
    text: "Home",
    icon: <AiFillHome />,
  },
  {
    id: 3,
    url: "/contact",
    text: "Contact",
    icon: <MdEmail />,
  },
];

const social = [
  {
    id: 1,
    text: "Github",
    url: "https://github.com/scott-a-m/",
    icon: <FaGithub />,
  },
  {
    id: 2,
    text: "Twitter",
    url: "https://twitter.com/scotts_dev",
    icon: <FaTwitter />,
  },
  {
    id: 3,
    text: "freeCodeCamp",
    url: "https://www.freecodecamp.org/scott-a-m",
    icon: <FaFreeCodeCamp />,
  },
  {
    id: 4,
    text: "Email",
    url: "mailto:scott_a_mitchell@163.com",
    icon: <BiEnvelope />,
  },
];

const mission = [
  {
    name: "Dedicated Support",
    img: "/img/customer-support.jpg",
    icon: <RiCustomerServiceFill />,
  },
  {
    name: "Sustainable Fashion",
    img: "/img/sustainable.jpg",
    icon: <GiGreenhouse />,
  },
  {
    name: "Lightning Delivery",
    img: "/img/delivery.jpg",
    icon: <BsLightningFill />,
  },
  {
    name: "Latest Trends",
    img: "/img/trends.jpg",
    icon: <ImCool2 />,
  },
];

export { social, links, sidebarLinks, mission };
