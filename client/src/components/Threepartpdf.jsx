import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import "cropperjs/dist/cropper.css";
import CommonPageHeader from "../components/CommonPageHeader";
import FreeTools from "../components/FreeTools";
import WebTools from "../components/WebTools";

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Threepartpdf = () => {
  const [downlodLink, setDownlodLink] = useState([]);
  const splitPdf = async (start, end, pdfDoc) => {
    const pdfBytesOld = pdfDoc?._transport?._params?.data;
    const srcDoc = await PDFDocument.load(pdfBytesOld);
    const newPdf = await PDFDocument.create();
    for (let i = start; i < end; i++) {
      const [copiedPage] = await newPdf.copyPages(srcDoc, [i]);
      newPdf.addPage(copiedPage);
    }
    const pdfBytes = await newPdf.save();
    const blobData = new Blob([pdfBytes], { type: "application/pdf" });
    return URL.createObjectURL(blobData);
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const pdfData = await file.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;

        const totalPages = pdfDoc.numPages;
        const pagesPerPart = Math.ceil(totalPages / 3);

        const part1 = await splitPdf(0, pagesPerPart, pdfDoc);
        const part2 = await splitPdf(pagesPerPart, 2 * pagesPerPart, pdfDoc);
        const part3 = await splitPdf(2 * pagesPerPart, totalPages, pdfDoc);
        setDownlodLink([part1, part2, part3]);
      }
    } catch (err) {
      console.error(err);
      alert("Internal Server Error");
    }
  };
  const filterNullUrl = downlodLink?.filter((url) => url);

  const downloadSplitPdf = async () => {
    if (filterNullUrl?.length > 0) {
      filterNullUrl?.forEach((url, index) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = `split_${index + 1}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  };

  const handleReset = () => {
    setDownlodLink([]);
  };

  return (
    <div className="mt-[72px] dark:bg-darkBlue">
      <CommonPageHeader />
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center">
        Split PDF 3 Parts
      </h1>
      <p className="text-center text-gray500 my-5">
        Easily generate pdf online for free.
      </p>
      <input
        type="file"
        accept={`.pdf`}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex flex-col justify-center items-center gap-5 overflow-x-hidden">
        <button
          className=" mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          Choose File
        </button>
      </div>
      <div className="flex justify-center flex-wrap items-center gap-5 mt-5">
        <button
          className={`${
            !filterNullUrl?.length > 0 ? "bg-gray600" : "bg-lightBlue"
          } text-white py-2 px-5 rounded-lg`}
          onClick={downloadSplitPdf}
          disabled={!filterNullUrl?.length > 0}
        >
          Download PDF
        </button>
        <button
          className={`${
            !filterNullUrl?.length > 0 ? "bg-gray600" : "bg-lightBlue"
          } text-white py-2 px-5 rounded-lg`}
          onClick={handleReset}
          disabled={!filterNullUrl?.length > 0}
        >
          Reset
        </button>
      </div>
      <FreeTools />
      <WebTools />
    </div>
  );
};

export default Threepartpdf;
