import React, { useState } from "react";
import CommonPageHeader from "./CommonPageHeader";
import FreeTools from "./FreeTools";
import WebTools from "./WebTools";
import axios from "axios";
function AiTexttoImagePage({ title, title1 }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const generateImage = async () => {
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
        JSON.stringify({ inputs: text }),
        {
          headers: {
            Authorization:
              `Bearer ${process.env.REACT_APP_HUGGINGFACE_TOKEN}`,
              "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
      if (response?.status === 200) {
        const url = response?.data
          ? window.URL.createObjectURL(response?.data)
          : null;
        setImage(url);
        setText("");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const handleDownloadbtn = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "Image.jpg";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(image);
    setImage(null);
    setText("");
  };

  return (
    <>
      <div className="mt-[72px] dark:bg-darkBlue">
        <CommonPageHeader />
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white">
          {title}
        </h1>
        <p className="text-center text-gray500 my-5">{title1}</p>
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] mx-auto flex flex-col justify-center items-center gap-5">
          <textarea
            rows={3}
            value={text}
            onChange={(e) => {
              setText(e?.target?.value);
            }}
            className="w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white"
          ></textarea>
          <button
            disabled={!text}
            onClick={generateImage}
            type="button"
            className={`${
              !text ? "bg-gray500" : "bg-lightBlue"
            } px-6 py-3 text-white rounded-lg`}
          >
            Generate Image
          </button>
          {image && (
            <>
              <div className="bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] h-auto border-none border-gray200">
                <img src={image} alt="Selected_Image" className="mx-auto" />
              </div>
              <button
                onClick={handleDownloadbtn}
                type="button"
                className={`bg-lightBlue text-white rounded-lg  px-4 py-2`}
              >
                Download
              </button>
            </>
          )}
        </div>
        <FreeTools />
        <WebTools />
      </div>
    </>
  );
}

export default AiTexttoImagePage;
