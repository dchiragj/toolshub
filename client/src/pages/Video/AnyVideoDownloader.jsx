import React, { useState } from "react";
import CommonPageHeader from "../../components/CommonPageHeader";
import FreeTools from "../../components/FreeTools";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import WebTools from "../../components/WebTools";

const AnyDownloader = ({ title }) => {
  const [url, setUrl] = useState("");
  const [videoURL, setVideoURL] = useState({});
  const [linkedInURL, setLinkedInURL] = useState({});

  const fbDownloader = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/fb-video-download`,
        { url }
      );
      const data = response?.data?.videoURL;
      setVideoURL(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const xDownloader = async () => {
    try {
      const regex = /^https:\/\/x\.com\/i\/status\/\d+$/;
      const isValid = regex.test(url);
      if(isValid){
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/x-video-download`,
          { url },
        );
        if(response?.data?.data && response?.status === 200){
          const responseFatch = await fetch(response?.data?.data);
          if (!responseFatch.ok) throw new Error("Network response was not ok");
          const blob = await responseFatch.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "video.mp4";
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
        }
      } else {
        alert('X video url not valid.')
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const linkedinDownloader = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/linkedin-video-download`,
        { url },
      );
      setLinkedInURL(response?.data?.data)
      } catch (err) {
      console.error("Error:", err);
      alert("Error fetching video");
    }
  };

  const titktokDownloader = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/tiktok-video-download?url=${url}`
      );
      setVideoURL(response.data.videoUrl);
    } catch (err) {
      console.error("Error:", err);
      alert("Error fetching video");
    }
  };

  const getFromLink = () => {
    switch (title) {
      case "Facebook":
        fbDownloader();
        break;

      case "X":
        xDownloader();
        break;

      case "LinkedIn":
        linkedinDownloader();
        break;

      case "TikTok":
        titktokDownloader();
        break;

      default:
        break;
    }
  };

  const download = async () => {
    try {
      const response = await fetch(videoURL.sd);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "thumbnail.mp4";
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };

  const downloadLinkedIn = async ()=>{
    try {
      if(linkedInURL?.url){
        const response = await fetch(linkedInURL?.url);
        if (!response.ok) throw new Error("Network response was not ok");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "linkedIn.mp4";
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } 
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  }
  return (
    <div className="mt-[72px] dark:bg-darkBlue">
      <CommonPageHeader />
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white">
        {title} Video Downloader
      </h1>
      <p className="text-center text-gray500 my-5">Download from link!</p>
      <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto">
        <input
          type="text"
          placeholder={`Enter ${title} URL...`}
          className="w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white accent-lightBlue"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center gap-10 mt-5">
        <button
          disabled={!url}
          className={`px-5 py-2 ${
            !url ? "bg-gray500" : "bg-lightBlue"
          } text-white rounded-lg flex justify-center items-center gap-2`}
          onClick={getFromLink}
        >
          <span>
            <FaSearch />
          </span>{" "}
          Get
        </button>
      </div>
      {Object.keys(videoURL)?.length > 0 && (
        <div className="flex justify-center items-center gap-8 flex-col mt-4">
          <div>
            <video
              controls
              src={videoURL?.sd}
              poster={videoURL?.thumbnail}
              title={videoURL?.title}
            ></video>
            <div className="w-full px-3 md:px-0 md:w-[400px] mt-2 text-left font-medium">
              {videoURL?.title}
            </div>
          </div>
          <button
            onClick={download}
            type="button"
            className={`bg-lightBlue text-white rounded-lg  px-4 py-2`}
          >
            Download
          </button>
        </div>
      )}
      {Object.keys(linkedInURL)?.length > 0 && (
        <div className="flex justify-center items-center gap-8 flex-col mt-4">
          <div>
            <video
              controls
              src={linkedInURL?.url}
            ></video>
          </div>
          <button
            onClick={downloadLinkedIn}
            type="button"
            className={`bg-lightBlue text-white rounded-lg  px-4 py-2`}
          >
            Download
          </button>
        </div>
      )}
      <FreeTools />
      <WebTools />
    </div>
  );
};

export default AnyDownloader;
