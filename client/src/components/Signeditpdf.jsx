import React from "react";
import "cropperjs/dist/cropper.css";
import CommonPageHeader from "./CommonPageHeader";
import FreeTools from "./FreeTools";
import WebTools from "./WebTools";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

const Signeditpdf = () => {
  return (
    <div className="mt-[72px] dark:bg-darkBlue">
      <CommonPageHeader />
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center">
        Edit PDF, Sign PDF
      </h1>
      <p className="text-center text-gray500 my-5">
        Easily edit and sign online for free.
      </p>
      <div className="mx-auto w-[90%] sm:w-[80%] flex flex-col justify-center items-center gap-5 overflow-x-hidden">
        <EmbedPDF>
          <button
            className=" mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg"
            type="button"
          >
            Open PDF Editor
          </button>
        </EmbedPDF>
      </div>
      <FreeTools />
      <WebTools />
    </div>
  );
};

export default Signeditpdf;
