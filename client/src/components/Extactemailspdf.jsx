import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import "cropperjs/dist/cropper.css";
import CommonPageHeader from "../components/CommonPageHeader";
import FreeTools from "../components/FreeTools";
import WebTools from "../components/WebTools";

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Extactemailspdf = () => {
  const [emails, setEmails] = useState([]);
  const [file, setFile] = useState(null);
  const extractEmailsFromPdf = async (file) => {
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
          const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
          const matches = pageText.match(emailRegex);
          if (matches) {
            matches.forEach((email) => totalEmails.add(email));
          }
        }
        setEmails(Array.from(totalEmails));
      };
      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      console.log(err);
      alert("Failed to extract emails from the PDF. Please try again.");
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
  return (
    <div className="mt-[72px] dark:bg-darkBlue">
      <CommonPageHeader />
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center">
        PDF Email Extractor
      </h1>
      <p className="text-center text-gray500 my-5">
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
          className=" mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          Choose File
        </button>

        <button
          className=" mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg"
          onClick={() => {
            if (file) {
              extractEmailsFromPdf(file);
            }
          }}
        >
          Extract Emails
        </button>
        <div className="mt-2 mx-auto w-full max-h-[100px] h-auto overflow-y-auto">
          <ul className="flex justify-center list-disc items-center w-full flex-col gap-2">
            {emails?.map((email) => (
              <li className="text-[16px] text-gray600">{email}</li>
            ))}
          </ul>
        </div>
      </div>
      <FreeTools />
      <WebTools />
    </div>
  );
};

export default Extactemailspdf;
