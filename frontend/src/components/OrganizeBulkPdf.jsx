import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
// import "cropperjs/dist/cropper.css";
import CommonPageHeader from "./CommonPageHeader";
import FreeTools from "./FreeTools";
import WebTools from "./WebTools";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiMenu } from "react-icons/fi";
GlobalWorkerOptions.workerSrc = pdfjsWorker

const OrganizeBulkPdf = () => {
  const [pagesList, setPagesList] = useState({});
  const handleFileChange = async (event) => {
    try {
      const { files } = event?.target;
      if (files?.length > 0) {
        for (let index = 0; index < files?.length; index++) {
          const element = files[index];
          const pdfData = await element.arrayBuffer();
          const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;

          const totalPages = pdfDoc.numPages;
          const pagesList = [];
          for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            pagesList.push(page);
          }
          setPagesList((prev) => ({
            ...prev,
            [index]: { name: element?.name, list: pagesList },
          }));
        }
      }
    } catch (err) {
      console.error(err);
      alert("Internal Server Error");
    }
  };

  const DraggableItem = ({ item, index, moveItem, ItemType }) => {
    const [, drag] = useDrag(() => ({
      type: ItemType,
      item: { index },
    }));

    const [, drop] = useDrop(() => ({
      accept: ItemType,
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveItem(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    }));

    return (
      <div
        ref={(node) => drag(drop(node))}
        className="px-4 mb-2 bg-gray-200 border-[#1A8FE3] border-dashed border-2 rounded w-full h-10 flex gap-2 justify-start items-center cursor-move"
      >
        <FiMenu size={20} />
        {`Page ${item?._pageIndex + 1}`}
      </div>
    );
  };

  const moveItem = (fromIndex, toIndex, array, index) => {
    const updatedItems = [...array];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setPagesList((prev) => ({
      ...prev,
      [index]: { ...prev[index], list: updatedItems },
    }));
  };
  const handleDownloadpdf = async () => {
    try {
      Object.keys(pagesList)?.forEach(async (keyName) => {
        const list = pagesList[keyName]?.list;
        const name = pagesList[keyName]?.name?.replace(".pdf", "");
        const pdfDoc = await PDFDocument.create();
        for (let i = 0; i < list?.length; i++) {
          const srcDoc = await PDFDocument.load(
            list[i]?._transport?._params?.data
          );
          const [copiedPageData] = await pdfDoc.copyPages(srcDoc, [
            list[i]?._pageIndex,
          ]);
          pdfDoc.addPage(copiedPageData);
        }
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `organize-${name}.pdf`;
        link.click();
        URL.revokeObjectURL(pdfUrl);
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Internal Server Error");
    }
  };
  return (
    <div className="mt-[72px] dark:bg-[#0f172a]">
      <CommonPageHeader />
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center">
        Organize Bulk PDFs
      </h1>
      <p className="text-center text-gray-500 my-5">
        Easily organize bulk pdfs online for free.
      </p>
      <input
        type="file"
        multiple={true}
        accept={`.pdf`}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex flex-col justify-center items-center gap-5 overflow-x-hidden">
        <button
          className=" mx-auto bg-[#1A8FE3] px-6 py-3 text-white rounded-lg"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          Choose File
        </button>
      </div>
      <div className="mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mt-2">
        {Object.keys(pagesList)?.length > 0 &&
          Object.keys(pagesList)?.map((keyName, index) => {
            const list = pagesList[keyName]?.list;
            const name = pagesList[keyName]?.name;
            return (
              <div
                className={`${
                  index === Object.keys(pagesList)?.length - 1 ? "" : "mb-8"
                }`}
                key={index}
              >
                <p className="text-[18px] text-black mb-2">
                  File Name : {name}
                </p>
                <DndProvider backend={HTML5Backend}>
                  {list.map((item, index) => (
                    <DraggableItem
                      key={index}
                      index={index}
                      ItemType={keyName}
                      item={item}
                      moveItem={(from, to) => {
                        moveItem(from, to, list, keyName);
                      }}
                    />
                  ))}
                </DndProvider>
              </div>
            );
          })}
      </div>
      <div className="flex justify-center flex-wrap items-center gap-5 mt-5">
        <button
          disabled={!Object.keys(pagesList)?.length > 0}
          onClick={handleDownloadpdf}
          className={`${
            !Object.keys(pagesList)?.length > 0 ? "bg-gray-500" : "bg-[#1A8FE3]"
          } text-white py-2 px-5 rounded-lg`}
        >
          Download PDF
        </button>
      </div>
      <FreeTools />
      <WebTools />
    </div>
  );
};

export default OrganizeBulkPdf;
