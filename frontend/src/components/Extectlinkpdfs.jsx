import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
// import "cropperjs/dist/cropper.css";
import CommonPageHeader from "../components/CommonPageHeader";
import FreeTools from "../components/FreeTools";
import WebTools from "../components/WebTools";
import { Link } from "react-router-dom";

GlobalWorkerOptions.workerSrc = pdfjsWorker

const Extectlinkpdfs = () => {
  const [links, setLinks] = useState([]);
  const [file, setFile] = useState(null);
  const extractLinksFromPdf = async (file) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const pdfDoc = await pdfjsLib.getDocument(typedArray).promise;
        const totalEmails = new Set();
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          const linkRegex =
            /https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(?:\/[^\s]*)?/g;
          const matches = pageText.match(linkRegex);
          if (matches) {
            matches.forEach((email) => totalEmails.add(email));
          }
        }
        setLinks(Array.from(totalEmails));
      };
      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      console.log(err);
      alert("Failed to extract links from the PDF. Please try again.");
    }
  };
  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        setFile(file);
      }
    } catch (err) {
      console.error(err);
      alert("Internal Server Error");
    }
  };
  const download = (content, filename, type) => {
    const blob = new Blob([content], { type: type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };
  return (
    <div className="mt-[72px] dark:bg-[#0f172a]">
      <CommonPageHeader />
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center">
        PDF Email Extractor
      </h1>
      <p className="text-center text-gray-500 my-5">
        Easily extractemails from pdf online for free.
      </p>
      <input
        type="file"
        accept={`.pdf`}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex flex-col justify-center items-center gap-5 overflow-x-hidden">
        <button
          className="mx-auto bg-[#1A8FE3] px-6 py-3 text-white rounded-lg"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          Choose File
        </button>
        <div className="w-auto flex justify-center flex-wrap items-center gap-2">
          <button
            className="mx-auto bg-[#1A8FE3] px-6 py-3 text-white rounded-lg"
            onClick={() => {
              if (file) {
                extractLinksFromPdf(file);
              }
            }}
          >
            Extract Links
          </button>
          <button
            disabled={!links?.length > 0}
            onClick={() => {
              download(links, "downloadlinks.txt", "text/plain");
            }}
            className={`${
              links?.length > 0 ? "bg-[#1A8FE3]" : "bg-gray-500"
            } mx-auto px-6 py-3 text-white rounded-lg`}
          >
            Download as Text
          </button>
          <button
            disabled={!links?.length > 0}
            onClick={() => {
              download(
                links?.map((dataLink) => (`<a href="${dataLink}">${dataLink}</a><br/><br/>`)).join('\n'),
                "downloadlinks.html",
                "text/html"
              );
            }}
            className={`${
              links?.length > 0 ? "bg-[#1A8FE3]" : "bg-gray-500"
            } mx-auto px-6 py-3 text-white rounded-lg`}
          >
            Download as HTML
          </button>
        </div>
        <div className="mt-2 mx-auto w-full max-h-[100px] h-auto overflow-y-auto">
          <ul className="flex justify-center list-disc items-center w-full flex-col gap-2">
            {links?.map((link) => (
              <li className="text-[16px] text-[#1A8FE3]">
                <Link to={link}>{link}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <FreeTools />
      <WebTools />
    </div>
  );
};

export default Extectlinkpdfs;
