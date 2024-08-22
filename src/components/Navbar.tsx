"use client";
import React from "react";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const path = usePathname();

  return (
    <nav
      className={`lg:hidden flex items-center justify-between ${
        path !== "/" ? "bg-[#5f5bf6]" : "dark:bg-black bg-[#f5f5f5]"
      } w-full px-4`}
    >
      <div className="flex items-center justify-center">
        {path === "/" && <HamburgerMenu />}
        <div className="flex items-center gap-2 h-20">
          {path === "/" ? (
            <img
              src="/login-signup/brand.svg"
              alt="Brand Logo"
              height={27.5}
              width={27.5}
            />
          ) : (
            <img
              src="/navbar/brand.svg"
              alt="Brand Logo"
              height={27.5}
              width={27.5}
            />
          )}
          <h1 className="dark:text-[#FAFAFB] text-black font-semibold text-xl leading-7">
            Base
          </h1>
        </div>
      </div>
      {path === "/" && (
        <div className="flex items-center justify-end gap-8">
          <FaRegBell className="text-3xl dark:text-white text-black" />
          <Image
            alt="Profile"
            src={"/homepage/profile.jpg"}
            height={30}
            width={39}
            className="object-cover rounded-full"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
