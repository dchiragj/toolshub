import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import "cropperjs/dist/cropper.css";
import CommonPageHeader from "../components/CommonPageHeader";
import FreeTools from "../components/FreeTools";
import WebTools from "../components/WebTools";

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfBgColor = () => {
  const [bgcolor, setBgcolor] = useState("#ffffff");
  const [pdfUrl, setPdfUrl] = useState(null);
  const handleChange = (e) => {
    setBgcolor(e?.target?.value?.includes("#") ? e?.target?.value : "#ffffff");
  };

  const GeneratePDF = async () => {
    const newPdf = await PDFDocument.create();
    const page = newPdf.addPage();
    const { width, height } = page.getSize();
    page.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: height,
      color: rgb(
        parseInt(bgcolor.slice(1, 3), 16) / 255,
        parseInt(bgcolor.slice(3, 5), 16) / 255,
        parseInt(bgcolor.slice(5, 7), 16) / 255
      ),
    });
    const pdfBytes = await newPdf.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl ? pdfUrl : null);
  };
  return (
    <div className="mt-[72px] dark:bg-darkBlue">
      <CommonPageHeader />
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center">
        Generate PDF With Background Color
      </h1>
      <p className="text-center text-gray500 my-5">
        Easily generate background color pdf online for free.
      </p>
      <div className="mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex flex-col justify-center items-center gap-5 overflow-x-hidden">
        <div className="w-fit flex flex-col items-center gap-2">
          <label
            htmlFor="hs-color-input"
            className="block text-gray500 text-[16px] font-medium"
          >
            Select Background Color:
          </label>
          <input
            type="color"
            onChange={handleChange}
            className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
            id="hs-color-input"
            value={bgcolor}
            title="Choose your Background Color"
          ></input>
        </div>
        <button
          type="button"
          onClick={GeneratePDF}
          className={`bg-lightBlue text-white py-2 px-5 rounded-lg`}
        >
          Generate PDF
        </button>
        {pdfUrl && (
            <iframe src={pdfUrl} className="w-full h-[600px]" title="PDF"/>
        )}
      </div>
      <FreeTools />
      <WebTools />
    </div>
  );
};

export default PdfBgColor;
