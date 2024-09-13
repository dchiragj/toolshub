import React from "react";
import { pdfFeatured, popularPdfTools } from "./HeaderHelper";
import { NavLink } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";

const PDFMenu = () => {
  return (
    <>
      <div className="absolute bg-white dark:bg-darkBlue top-[38px] -left-7 shadow-2xl w-[750px] justify-center hidden group-hover:flex rounded-md">
        <div className="w-[35%] flex flex-col border-r-[1px] border-r-gray200 px-3">
          <p className="uppercase text-xs font-bold text-gray400 mt-4 mb-2">
            Featured Tools
          </p>
          <div className="flex flex-col">
            {pdfFeatured.map((val, ind) => {
              return (
                <NavLink
                  key={ind}
                  className="flex items-center gap-3 hover:bg-gray200 dark:hover:bg-[#1a252e] hover:underline dark:hover:text-black px-2 py-3 rounded-lg"
                  to={val.link}
                >
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: val.backGround }}
                  >
                    <IoDocumentTextOutline color={val.color} fontSize={22} />
                  </div>
                  <div>
                    <p className="text-base font-bold dark:text-white mb-[3px]">
                      {val.title}
                    </p>
                    <p className="text-sm mb-[1.5px] text-gray600 leading-6">
                      {val.desc1} <br /> {val.desc2}
                    </p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="w-[65%] px-4">
          <p className="uppercase text-xs font-bold text-gray400 text-left mt-4 mb-3">
            OTHER POPULAR PDF TOOLS
          </p>
          <div className="mt-2 grid grid-cols-2 gap-x-14">
            {popularPdfTools.map((val, ind) => {
              return (
                <NavLink
                  key={ind}
                  to={val.link}
                  className={`my-3 font-medium hover:underline`}
                >
                  {val.title}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFMenu;
