import React from "react";
import { NavLink } from "react-router-dom";
import {
  AIImageTools,
  AIImageTools1,
  featuredTools,
  otherImageTools,
} from "../Helpers/HeaderHelper";
import { FaArrowRight } from "react-icons/fa6";

const ImageMenu = () => {
  return (
    <>
      <div className="absolute z-[1000] bg-white dark:bg-darkBlue top-[55px] left-0 w-full shadow-2xl hidden justify-center group-hover:flex px-0 md:px-25 lg:px-36 xl:px-56 rounded-lg">
        {/* <div className="w-full flex"> */}
        <div className="w-[25%] flex flex-col border-r-[1px] border-r-gray200 px-3">
          <div className="py-3">
            <p className="uppercase text-xs font-bold text-gray400 m-2">
              Ai image tools
            </p>
            <div className="flex flex-col">
              {AIImageTools.map((val, ind) => {
                return (
                  <NavLink
                    key={ind}
                    className="flex items-center gap-3 hover:underline px-2 py-4 group border-b-[1px] border-b-gray200"
                    to={val.link}
                  >
                    <div
                      className="p-4 rounded-xl group-hover:underline"
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
            <div className="flex flex-col pl-2 gap-5 mt-4">
              {AIImageTools1.map((val, ind) => {
                return (
                  <NavLink
                    key={ind}
                    to={val.link}
                    className={
                      "flex items-center gap-3 text-base hover:underline"
                    }
                  >
                    <div
                      className="p-3 rounded-xl group-hover:underline py-3"
                      style={{ backgroundColor: val.backGround }}
                    >
                      {val.icon}
                    </div>
                    {val.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-[75%] flex flex-col px-3">
          <p className="uppercase text-xs font-bold text-gray400 mt-4 mb-3">
            Featured tools
          </p>
          <div className="grid grid-cols-3 gap-16 border-b-[1px] border-b-gray200 pb-10">
            {featuredTools.map((val, ind) => {
              return (
                <NavLink
                  key={ind}
                  to={val.link}
                  className={"flex flex-col gap-5 hover:underline"}
                >
                  <img
                    src={val.image}
                    alt={val.title}
                    className="rounded-2xl"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-lg">{val.title}</p>
                      <span className="text-sm text-gray400">{val.desc}</span>
                    </div>
                    <FaArrowRight fontSize={24} className="text-yellow-600" />
                  </div>
                </NavLink>
              );
            })}
          </div>
          <p className="uppercase text-xs font-bold text-gray400 mt-4 mb-3">
            other image tools
          </p>
          <div className="grid grid-cols-3 gap-3 pb-5">
            {otherImageTools.map((val, ind) => {
              return (
                <NavLink
                  key={ind}
                  to={val.link}
                  className={"hover:underline font-medium"}
                >
                  {val.title}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ImageMenu;
