import React, { useState } from "react";
import CommonPageHeader from "../../components/CommonPageHeader";
import FreeTools from "../../components/FreeTools";
import WebTools from "../../components/WebTools";
import axios from "axios";
const YTShorts = () => {
  const [link, setLink] = useState("");
  const [ytShorts, setYTShorts] = useState("");
  const [format, setFormat] = useState([]);
  const [selectUrlDownload, setselectUrlDownload] = useState("");

  const getShorts = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/download`,{url:link});
      if (response?.status === 200) {
        const filterFormats = response?.data?.data?.filter((datamap)=> datamap?.mimeType && datamap?.height && datamap?.hasVideo)
        setFormat(filterFormats);
        setYTShorts(filterFormats[0]?.url);
      } else {
        alert("Video not found. Please check the URL.");
      }
    } catch (error) {
      console.log("Error fetching video info. Please try again.");
    }
  };

  const handleDownload = async () => {
        if (selectUrlDownload !== "") {
          const link = document.createElement("a");
          link.href = selectUrlDownload;
          link.download = "YouTube_Shorts.mp4";
          link.click();
          link.remove();
      }
  };

  return (
    <div className="mt-[72px] dark:bg-darkBlue">
      <CommonPageHeader />
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white">
        YouTube Shorts Downloader
      </h1>
      <p className="text-center text-gray500 my-5">
        Easily download youtube shorts online for free.
      </p>
      <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5">
        <p className="text-center dark:text-white">Enter Shorts Link : </p>
        <input
          type="text"
          placeholder="Paste Link Here ..."
          className="w-full border-2 border-lightBlue outline-none rounded-full p-2"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          disabled={!link}
          className={`${
            link ? "bg-lightBlue" : "bg-gray600"
          } text-white px-4 py-2 rounded-lg`}
          onClick={getShorts}
        >
          Get Shorts
        </button>
        {ytShorts && format?.length > 0 && (
          <>
            <video controls controlsList="nodownload">
              <source src={ytShorts} type="video/mp4"></source>
            </video>
            <select
              className="w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full dark:text-white dark:bg-darkBlue dark:border-white"
              name="formet"
              onChange={(e) => {
                setselectUrlDownload(e?.target?.value);
              }}
            >
              <option value="" selected>
                Select video format
              </option>
              {format?.map((dataformet) => {
                return (
                  <option value={dataformet?.url}>
                    {dataformet?.mimeType?.split(";")[0] + " "}
                    {dataformet?.hasVideo && dataformet?.height ? dataformet?.height + "p" : ""}
                  </option>
                );
              })}
            </select>
            <button
              disabled={!selectUrlDownload}
              className={`${
                !selectUrlDownload ? "bg-gray600" : "bg-lightBlue"
              } text-white rounded-lg px-4 py-2`}
              onClick={handleDownload}
            >
              Download
            </button>
          </>
        )}
      </div>
      <FreeTools />
      <WebTools />
    </div>
  );
};

export default YTShorts;
