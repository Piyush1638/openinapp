import React from "react";
import { DataItem } from "@/lib/types/type";
import DataTable from "./DataTable";

interface UploadsProps {
  data: DataItem[];
}

const Uploads: React.FC<UploadsProps> = ({ data }) => {
  return (
    <div className=" h-full flex flex-col gap-10">
      <h3 className="text-2xl font-semibold font-figtree dark:text-white text-black">
        Uploads
      </h3>
      <DataTable data={data} />
    </div>
  );
};

export default Uploads;
