import React, { useEffect, useState } from "react";
import CommonPageHeader from "./CommonPageHeader";
import FreeTools from "./FreeTools";
import WebTools from "./WebTools";
import axios from "axios";
function AiToolsBgChangerPage({ title, title1 }) {
  const [newImageDataURL, setNewImageDataURL] = useState(null);
  const [file, setFile] = useState({});
  const [color, setColor] = useState("");
  const handleFileChange = (e) => {
    let files = e.target.files[0];
    if (files) {
      const Url = URL.createObjectURL(files);
      setFile({ blobUrl: Url, files });
    }
  };
  const colorsList = [
    { name: "Transparent ( PNG )", val: "transparent", hex: "transparent" },
    { name: "White", val: "white", hex: "FFFFFF" },
    { name: "Black", val: "black", hex: "000000" },
    { name: "Green", val: "green", hex: "00FF00" },
    { name: "Red", val: "red", hex: "FF0000" },
    { name: "Blue", val: "blue", hex: "0000FF" },
  ];
  useEffect(() => {
    setColor("");
    setNewImageDataURL(null);
  }, [file]);

  const removeBackground = async (image) => {
    try {
      const formData = new FormData();
      formData.append("image_file", image);
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": "mGs545DZBg4vhrS6bGX9Z6ng",
          },
          responseType: "blob",
        }
      );

      const imageBlob = response.data;
      const fileName = "output.png";
      const file = new File([imageBlob], fileName, { type: "image/png" });
      return file;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (Object.keys(file)?.length > 0 && color) {
        const removeBg = await removeBackground(file?.files);
        if (removeBg) {
          const hexCode = colorsList?.find((data) => data?.val === color)?.hex;
          const formData = new FormData();
          formData.append("file", removeBg);
          formData.append("upload_preset", "AI_Tools_Algoscripts");
          formData.append("cloud_name", "dw2ceqgta");
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dw2ceqgta/image/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response?.status === 200) {
            const transformedUrl =
              hexCode === "transparent"
                ? response?.data?.secure_url
                : `https://res.cloudinary.com/dw2ceqgta/image/upload/b_rgb:${hexCode}/${response?.data?.public_id}.jpg`;
            const getImageUrl = await axios.get(transformedUrl);
            if (getImageUrl?.status === 200) {
              setNewImageDataURL(transformedUrl);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDownloadbtn = async () => {
    try {
      const response = await fetch(newImageDataURL);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "change_background.jpg";
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setNewImageDataURL(null);
      setFile({});
      setColor("");
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
            className="bg-[#1A8FE3] px-6 py-3 text-white rounded-lg"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Choose File
          </button>
          {Object.keys(file)?.length > 0 && (
            <div className="mt-10 flex justify-center items-center flex-col gap-3">
              <div className="bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] h-auto border-none border-gray-200">
                <img
                  src={file?.blobUrl}
                  alt="Selected_Image"
                  className="mx-auto"
                />
              </div>
              <select
                className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto border-2 outline-none border-[#1A8FE3] p-2 px-5 rounded-full dark:text-white dark:bg-[#0f172a] dark:border-white"
                name="background"
                onChange={(e) => {
                  setColor(e?.target?.value);
                }}
              >
                <option value="" selected={color === ""}>
                  Choose background color
                </option>
                {colorsList?.map((dataMap) => (
                  <option
                    value={dataMap?.val}
                    selected={color === dataMap?.val}
                  >
                    {dataMap?.name}
                  </option>
                ))}
              </select>
              <button
                disabled={!color}
                onClick={handleSubmit}
                type="button"
                className={`px-6 py-3 ${
                  !color ? "bg-gray-500" : "bg-[#1A8FE3]"
                } text-white rounded-lg flex justify-center items-center`}
              >
                Submit
              </button>
              {newImageDataURL && (
                <>
                  <div className="bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] h-auto border-none border-gray-200">
                    <img
                      src={newImageDataURL}
                      alt="Selected_Image"
                      className="mx-auto"
                    />
                  </div>
                  <button
                    onClick={handleDownloadbtn}
                    type="button"
                    className={`bg-[#1A8FE3] text-white rounded-lg  px-4 py-2`}
                  >
                    Download
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <FreeTools />
        <WebTools />
      </div>
    </>
  );
}

export default AiToolsBgChangerPage;
