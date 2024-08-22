"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";

const ThemeToggler = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="h-10 w-[4.75rem] border dark:bg-[#3D3D3D] bg-[#F2F2F2] dark:border-[#343A40] border-[#DADEE1] rounded-full flex items-center justify-between py-1 px-[5px] gap-1 cursor-pointer transition-all ease-in-out duration-1000"
      onClick={() => setDarkMode(!darkMode)}
    >
      <div className="flex items-center justify-center dark:bg-[#1F1F1F] bg-transparent rounded-full p-2">
        <IoMoonOutline className="dark:text-white text-[#A3A3A3]" />
      </div>
      <div className="bg-white dark:bg-transparent p-2 rounded-full">
        <IoSunnyOutline className="dark:text-white text-[#A3A3A3]" />
      </div>
    </div>
  );
};

export default ThemeToggler;
