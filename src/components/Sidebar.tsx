"use client";
import React, { useState } from "react";
import Image from "next/image";
import ThemeToggler from "./ThemeToggler";
import { RxDashboard } from "react-icons/rx";
import { PiCalendarDotsFill } from "react-icons/pi";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CgNotes } from "react-icons/cg";


const Sidebar = ({
  isCollapsed,
  toggleSidebar,
}: {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
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

  return (
    <div
      className={`bg-white dark:bg-[#0D0D0D] fixed left-0 top-0 min-h-screen h-full transition-all ease-in-out duration-300 lg:inline-block hidden ${
        isCollapsed ? "w-40" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between gap-1 p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/sidebar/brand-logo.svg"
            alt="Logo"
            width={42}
            height={42}
          />
          {!isCollapsed && (
            <span className="font-bold text-lg dark:text-white">Base</span>
          )}
        </div>

        <button onClick={toggleSidebar}>
          <Image
            src="/sidebar/collapsable.svg"
            alt="Toggle Icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </button>
      </div>
      <nav className="mt-4">
        <ul className="flex flex-col gap-6">
          {navItems.map((item, idx) => (
            <li
              onClick={() => setActiveIndex(idx)}
              key={idx}
              className={`flex items-center gap-4 py-2 px-8 hover:bg-gray-200 dark:hover:bg-[#333] ${activeIndex === idx && "bg-gradient-to-r dark:from-[#ACA9FFE8]  from-[#ACA9FFE8] to-[#ACA9FF00]"}`}
            >
              {typeof item.icon === "string" ? (
                <Image
                  src={item.icon}
                  alt={`${item.title} Icon`}
                  width={24}
                  height={24}
                />
              ) : (
                item.icon
              )}
              {!isCollapsed && (
                <span
                  className={`dark:text-white ${"dark:text-[#6764f6] font-semibold"}`}
                >
                  {item.title}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-10 left-4">
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Sidebar;
