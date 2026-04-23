import React, { useRef, useState } from "react";
import CommonPageHeader from "./CommonPageHeader";
import FreeTools from "./FreeTools";
import WebTools from "./WebTools";
import { BsUpload } from "react-icons/bs";

function AiImageFaceSwap({ title, title1 }) {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const canvasRef = useRef(null);
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);

  const handleImageUpload = (event, setImageState) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageState(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaceSwap = () => {
    if (!image1 || !image2) {
      alert('Please upload both images');
      return;
    }
    const img1 = document.createElement('img');
    const img2 = document.createElement('img');
    img1.src = image1;
    img2.src = image2;

    img1.onload = () => {
      img2.onload = () => {
        swapFaces(img1, img2);
      };
    };
  };

  const swapFaces = (img1, img2) => {
    console.log(img1,img2)
  };
  return (
    <>
      <div className="mt-[72px] dark:bg-[#0f172a]">
        <CommonPageHeader />
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white">
          {title}
        </h1>
        <p className="text-center text-gray-500 my-5">{title1}</p>
        {image1 && <img ref={imgRef1} src={image1} className="hidden object-contain w-full h-full" alt="hidden1" />}
        {image2 && <img ref={imgRef2} src={image2} className="hidden object-contain w-full h-full" alt="hidden2" />}
        <div className="w-[90%] sm:w-[80%] mx-auto flex flex-wrap justify-start items-center gap-5">
          <div className="w-full md:w-[calc(50%-10px)] relative h-[400px]">
            <div className="w-full h-[calc(100%-48px)] border-2 flex justify-center items-center border-[#0f172a]">
              <div className="flex w-full h-full flex-col items-center justify-center">
                {image1 ? (
                  <img
                    src={image1}
                    alt="Selected_Image"
                    className="mx-auto object-contain w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <BsUpload size={36} color="#9CA3AF" />
                    <p className="text-gray-400 text-[18px]">
                      Upload Source Image
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full absolute bottom-0">
              <input
                id="sourceImage"
                name="sourceImage"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleImageUpload(e, setImage1)}
                className="hidden"
              />
              <button
                className="bg-[#0f172a] flex justify-center items-center h-12 text-white w-full"
                onClick={() => document.getElementById("sourceImage").click()}
              >
                Source Image
              </button>
            </div>
          </div>
          <div className="w-full md:w-[calc(50%-10px)] relative h-[400px]">
            <div className="w-full h-[calc(100%-48px)] border-2 border-[#0f172a] flex justify-center items-center">
              <div className="flex w-full h-full flex-col items-center justify-center">
                {image2 ? (
                  <img
                    src={image2}
                    alt="Selected_Image"
                    className="mx-auto object-contain w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <BsUpload size={36} color="#9CA3AF" />
                    <p className="text-gray-400 text-[18px]">
                      Upload Target Image
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full absolute bottom-0">
              <input
                id="targetImage"
                name="targetImage"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleImageUpload(e, setImage2)}
                className="hidden"
              />
              <button
                className="bg-[#0f172a] flex justify-center items-center h-12 text-white w-full"
                onClick={() => document.getElementById("targetImage").click()}
              >
                Target Image
              </button>
            </div>
          </div>
          <div className="w-full md:w-[calc(50%-10px)] relative h-[400px]">
            <div className="w-full h-[calc(100%-48px)] border-2 flex justify-center items-center border-[#0f172a]">
              <div className="flex w-full h-full flex-col items-center justify-center">
                <canvas ref={canvasRef} />
              </div>
            </div>
            <div className="w-full absolute bottom-0">
              <button
                className="bg-[#0f172a] flex justify-center items-center h-12 text-white w-full"
                onClick={handleFaceSwap}
              >
                Face Swap
              </button>
            </div>
          </div>
        </div>
        <FreeTools />
        <WebTools />
      </div>
    </>
  );
}

export default AiImageFaceSwap;
