import React from "react";
import { otherFeaturedTools, otherOtherTools } from "./HeaderHelper";
import { NavLink } from "react-router-dom";

const OtherMenu = () => {
  return (
    <>
      <div className="absolute bg-white dark:bg-darkBlue top-[55px] right-[25%] shadow-2xl w-[700px] justify-center hidden group-hover:flex rounded-md">
        <div className="w-[40%] flex flex-col border-r-[1px] border-r-gray200 px-3 pb-3">
          <p className="uppercase text-xs font-bold text-gray400 mt-4 mb-2">
            Featured Tools
          </p>
          <div className="flex flex-col">
            {otherFeaturedTools.map((val, ind) => {
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
        <div className="w-[60%] px-3">
          <p className="uppercase text-xs font-bold text-gray400 text-left mt-4 mb-3">
            OTHER POPULAR PDF TOOLS
          </p>
          <div className="mt-2 grid grid-cols-2 gap-x-10">
            {otherOtherTools.map((val, ind) => {
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

export default OtherMenu;
