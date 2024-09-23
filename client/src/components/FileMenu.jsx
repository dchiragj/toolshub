import React from "react";
import { fileTools } from "../Helpers/HeaderHelper";
import { NavLink } from "react-router-dom";

const FileMenu = () => {
  return (
    <>
      <div className="absolute z-[1000] bg-white dark:bg-darkBlue top-[55px] right-[25%] shadow-2xl w-[750px] justify-center hidden group-hover:flex rounded-md">
        <div className="w-full flex flex-col px-3">
          <p className="uppercase text-xs font-bold text-gray400 mt-4 mb-2">
            File Tools
          </p>
          <div className="grid grid-cols-2 gap-4 pb-3">
            {fileTools.map((val, ind) => {
              return (
                <NavLink
                  key={ind}
                  className="flex items-center gap-3 hover:bg-gray200 dark:hover:bg-[#1a252e] hover:underline px-2 py-3 rounded-lg"
                  to={val.link}
                >
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: val.backGround }}
                  >
                    {val.icon}
                  </div>
                  <div>
                    <p className="text-base font-bold text-black dark:text-white mb-[3px]">
                      {val.title}
                    </p>
                    <p className="text-sm mb-[1.5px] text-gray600 leading-6">
                      {val.desc}
                    </p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileMenu;
