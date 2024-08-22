"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataItem } from "@/lib/types/type";
import { RxCross2 } from "react-icons/rx";

interface UploadsProps {
  data: DataItem[];
}

const DataTable: React.FC<UploadsProps> = ({ data }) => {
  const [rows, setRows] = useState<DataItem[]>(data);

  const handleTagChange = (index: number, selectedTag: string) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index
          ? {
              ...row,
              selectedTags: row.selectedTags
                ? [...row.selectedTags, selectedTag]
                : [selectedTag],
            }
          : row
      )
    );
  };

  const handleTagRemove = (rowIndex: number, tagToRemove: string) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              selectedTags: row.selectedTags
                ? row.selectedTags.filter((tag) => tag !== tagToRemove)
                : [],
            }
          : row
      )
    );
  };

  return (
    <div className="w-full p-5 dark:bg-[#0D0D0D] rounded-xl">
      <Table className="bg-[#F5F5F5] dark:bg-[#0D0D0D] border-collapse">
        <TableHeader className="">
          <TableRow className="dark:text-white text-black font-figtree font-semibold">
            <TableHead className="py-4 px-4 text-start text-nowrap">
              SI No.
            </TableHead>
            <TableHead className="py-4 px-4 text-start text-nowrap">
              Links
            </TableHead>
            <TableHead className="py-4 px-4 text-start text-nowrap">
              Prefix
            </TableHead>
            <TableHead className="py-4 px-4 text-start text-nowrap">
              Add Tags
            </TableHead>
            <TableHead className="py-4 px-4 text-start text-nowrap">
              Selected Tags
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item, index) => (
            <TableRow
              key={index}
              className="dark:bg-[#161616] bg-white mt-2 mb-2"
            >
              <TableCell className="py-4 px-6 dark:text-white text-black font-figtree">
                {index + 1}
              </TableCell>
              <TableCell className="py-4 px-6 whitespace-nowrap">
                <a
                  href={`https://${item.links}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#75A3FF] text-sm font-normal font-figtree hover:underline"
                >
                  {item.links}
                </a>
              </TableCell>
              <TableCell className="py-4 px-6 text-sm font-normal font-figtree dark:text-white text-black">
                {item.prefix}
              </TableCell>
              <TableCell className="py-4 px-6">
                <select
                  className="dark:bg-[#0D0D0D] bg-white border border-gray-400 dark:border-none font-figtree px-2 py-1 dark:text-white text-black outline-none rounded-md"
                  onChange={(e) => handleTagChange(index, e.target.value)}
                >
                  <option value="">Select a tag</option>
                  {item.selectTags.map((tag, idx) => (
                    <option value={tag} key={idx}>
                      {tag}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell className={`py-4 px-6 font-figtree overflow-x-auto `}>
                <div className="flex flex-wrap gap-2 overflow-auto text-nowrap">
                  {(item.selectedTags || []).map((tag, tagIndex) => (
                    <div
                      key={tagIndex}
                      className="bg-[#605BFF] dark:text-black text-white w-fit px-2 py-1 rounded-lg flex items-center gap-2"
                    >
                      {tag}
                      <RxCross2
                        className="text-sm dark:text-black text-white cursor-pointer"
                        onClick={() => handleTagRemove(index, tag)}
                      />
                    </div>
                  ))}
                  {(item.selectedTags || []).length === 0 && (
                    <span className="text-gray-500">None</span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
