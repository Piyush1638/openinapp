"use client";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { PiCalendarDotsFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { CgNotes } from "react-icons/cg";

const navItems = [
  {
    icon: <RxDashboard size={24} className="text-[#CDCDCD]" />,
    title: "Dashboard",
  },
  {
    icon: "/sidebar/upload.png",
    title: "Upload",
  },
  {
    icon: "/sidebar/invoice.png",
    title: "Invoice",
  },
  {
    icon: <CgNotes size={24} className="text-[#CDCDCD]" />,
    title: "Schedule",
  },
  {
    icon: <PiCalendarDotsFill size={24} className="text-[#CDCDCD]" />,
    title: "Calendar",
  },
  {
    icon: <FaBell className="text-[#CDCDCD]" size={24} />,
    title: "Notification",
  },
  {
    icon: <IoMdSettings size={24} className="text-[#CDCDCD]" />,
    title: "Settings",
  },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="z-50">
      {/* Hamburger Icon */}
      <div className="p-4">
        <button
          onClick={toggleMenu}
          className="text-gray-500 focus:outline-none"
        >
          <IoMdMenu className="dark:text-white text-black" size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 dark:bg-[#0D0D0D] bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/sidebar/brand-logo.svg"
              alt="Logo"
              width={42}
              height={42}
            />
            <span className="font-bold dark:text-white text-black text-lg">
              Base
            </span>
          </div>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {navItems.map((item, index) => (
              <li
                onClick={() => setActiveIndex(index)}
                key={index}
                className={`flex items-center px-4 py-2 hover:bg-gray-100 my-8 ${
                  activeIndex === index &&
                  "bg-gradient-to-r  from-[#bab8ffe8] "
                }`}
              >
                {typeof item.icon === "string" ? (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    height={24}
                    width={24}
                    className="object-cover"
                  />
                ) : (
                  item.icon
                )}
                <span className="ml-3 text-gray-700 font-semibold  dark:text-[#9A9AA9]">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
