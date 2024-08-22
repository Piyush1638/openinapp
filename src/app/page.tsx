"use client";
import React, { useState } from "react";
import FileUpload from "@/components/FileUpload";
import Sidebar from "@/components/Sidebar";
import Uploads from "@/components/Uploads";
import { DataItem } from "@/lib/types/type";
import NotificationProfile from "@/components/NotificationProfile";

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [data, setData] = useState<DataItem[] | null>(null); // Initialize as null

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <main className="flex w-full relative dark:bg-[#161616] bg-[#FAFAFB] min-h-screen items-center justify-between">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col gap-10 items-start min-h-screen w-full overflow-auto py-12 px-8 transition-all duration-300 ${
          isSidebarCollapsed ? "lg:ml-40" : "lg:ml-64"
        }`}
      >
        <Header />
        <div className="h-full flex items-center justify-center w-full">
          <FileUpload setData={setData} />
        </div>
        <div className="w-full">{data && <Uploads data={data} />}</div>
      </div>
    </main>
  );
}

const Header = () => (
  <div className="flex items-center justify-between w-full">
    <h3 className="dark:text-white text-black font-semibold text-2xl leading-8 font-figtree">
      Upload CSV
    </h3>
    <NotificationProfile />
  </div>
);
