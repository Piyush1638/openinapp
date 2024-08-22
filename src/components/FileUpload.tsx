import { DataItem } from "@/lib/types/type";
import Image from "next/image";
import React, { useState, ChangeEvent, DragEvent } from "react";
import { AiOutlineUpload } from "react-icons/ai";

const defaultTags = [
  "Technology",
  "Fashion",
  "Food",
  "Travel",
  "Sports",
  "Music",
  "Art",
  "Health",
  "Education",
  "Finance",
];

interface FileUploadProps {
  setData: React.Dispatch<React.SetStateAction<DataItem[] | null>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleFileInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = (): void => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        const data = csvToDataItems(text);
        setData(data);
      };

      reader.onerror = () => {
        console.error("Error reading file");
        setLoading(false);
      };

      reader.onloadend = () => {
        setLoading(false);
      };

      reader.readAsText(file);
    } else {
      console.log("No file selected");
    }
  };

  const csvToDataItems = (csv: string): DataItem[] => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map((line, index) => {
      const values = line.split(",");
      return {
        id: index + 1,
        links: values[headers.indexOf("links")],
        prefix: values[headers.indexOf("prefix")],
        selectTags: defaultTags,
        selectedTags: null,
      };
    });
  };

  const handleRemoveFile = (): void => {
    setFile(null);
    setData(null);
  };

  return (
    <div className="lg:w-3/5 w-full p-4 dark:bg-[#0D0D0D] bg-[#FFFFFF] rounded-lg flex flex-col gap-2 mt-10 lg:mt-20">
      <div
        className="flex items-center justify-center h-72 w-full border-2 border-dashed border-[#EBEBEB] dark:border-[#212121] rounded-lg text-gray-400 relative cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          id="fileInput"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <label htmlFor="fileInput" className="text-center">
          <div className="flex flex-col items-center">
            <Image
              height={28}
              width={30}
              src="/homepage/upload.svg"
              alt="Excel Icon"
              className="w-12 h-12 mb-4"
            />
            {file ? (
              <>
                <p className="mt-4 text-center text-white">
                  Uploaded file: {file.name}
                </p>
                <button
                  className="text-red-700 mt-2"
                  onClick={handleRemoveFile}
                >
                  Remove
                </button>
              </>
            ) : (
              <p>
                Drop your excel sheet here or{" "}
                <span className="text-blue-500 underline">browse</span>
              </p>
            )}
          </div>
        </label>
      </div>
      <button
        className="w-full py-3 dark:text-black text-white bg-[#605BFF] rounded-lg flex items-center justify-center gap-2"
        onClick={handleUpload}
      >
        {loading ? (
          <div className="h-8 w-8 rounded-full border-b border-r border-t border-white animate-spin" />
        ) : (
          <>
            <AiOutlineUpload className="text-xl dark:text-black text-white" />
            Upload
          </>
        )}
      </button>
    </div>
  );
};

export default FileUpload;
