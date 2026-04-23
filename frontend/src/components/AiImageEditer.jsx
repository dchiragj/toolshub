import React, { useState } from "react";
import CommonPageHeader from "./CommonPageHeader";
import FreeTools from "./FreeTools";
import WebTools from "./WebTools";
import { PinturaEditorModal } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";
import "@pqina/pintura/pintura.css";

function AiImageEditer({ title, title1 }) {
  const editorDefaults = getEditorDefaults({
    imageReader: { orientImage: true },
  });
  const [file, setFile] = useState({});
  const handleFileChange = (e) => {
    let files = e.target.files[0];
    if (files) {
      setFile({ files, blobUrl: URL.createObjectURL(files) });
    }
  };
  const handleDownload = async (newImageDataURL) => {
    try {
      const response = await fetch(newImageDataURL);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "EditImage.jpg";
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setFile({});
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };
  return (
    <>
      <div className="mt-[72px] dark:bg-[#0f172a]">
        <CommonPageHeader />
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white">
          {title}
        </h1>
        <p className="text-center text-gray-500 my-5">{title1}</p>
        <div className="w-[90%] sm:w-[80%] mx-auto flex flex-col justify-center items-center gap-5">
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            className="bg-[#0f172a] px-6 py-3 text-white rounded-lg"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Choose File
          </button>
          {Object.keys(file)?.length > 0 && (
            <PinturaEditorModal
              {...editorDefaults}
              src={file?.blobUrl}
              imageCropAspectRatio={1}
              onProcesserror={(err) => {
                console.log(err);
              }}
              onProcess={({ dest }) =>
                handleDownload(URL.createObjectURL(dest))
              }
              onLoaderror={(err) => {
                console.log(err);
              }}
              onHide={() => {
                setFile({});
              }}
            />
          )}
        </div>
        <FreeTools />
        <WebTools />
      </div>
    </>
  );
}

export default AiImageEditer;
