import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
import { GoShareAndroid } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineLightMode } from "react-icons/md";
import PDFMenu from "./PDFMenu";
import ImageMenu from "./ImageMenu";
import TextMenu from "./TextMenu";
import OtherMenu from "./OtherMenu";
import FileMenu from "./FileMenu";
import { useAuth } from "../Context/AllContext";
import Sidebar from "./Sidebar";
import LanguageSelector from "./LanguageSelector";

const Header = ({ expandSidebar, setExpandSidebar }) => {
  const { darkMode, darkModeHandler } = useAuth();
  return (
    <>
      <div className="p-4 shadow-md h-[72px] dark:bg-darkBlue relative">
        <div className="flex justify-between item-center">
          <div className="flex items-center gap-4">
            <div onClick={() => setExpandSidebar(!expandSidebar)}>
              <GiHamburgerMenu
                className="block lg:hidden dark:text-white"
                fontSize={24}
                cursor={"pointer"}
              />
            </div>
            <NavLink to={"/"} className="text-3xl font-bold">
              Logo
            </NavLink>
          </div>
          <nav className="gap-8 text-lg hidden lg:flex dark:text-white">
            <li className="relative flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer">
              <p className="hover:text-lightBlue">PDF</p>
              <IoIosArrowDown className="text-gray500" />
              <PDFMenu />
            </li>
            <li className="flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer hover:text">
              <p className="hover:text-lightBlue">Image</p>
              <IoIosArrowDown className="text-gray500" />
              <ImageMenu />
            </li>
            <li className="flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer">
              <p className="hover:text-lightBlue">Text</p>
              <IoIosArrowDown className="text-gray500" />
              <TextMenu />
            </li>
            <li className="flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer">
              <p className="hover:text-lightBlue">Others</p>
              <IoIosArrowDown className="text-gray500" />
              <OtherMenu />
            </li>
            <li className="flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer">
              <p className="hover:text-lightBlue">File</p>
              <IoIosArrowDown className="text-gray500" />
              <FileMenu />
            </li>
          </nav>
          <div className="flex items-center">
            <div className="flex gap-3 border-r-0 md:border-r-2 md:px-4 border-r-gray200">
              <div
                className="p-2 rounded-full shadow-2xl border-[1px] border-gray400 cursor-pointer bg-transparent dark:text-white hover:bg-yellow-200 hover:border-yellow-200"
                onClick={darkModeHandler}
              >
                {darkMode ? (
                  <MdOutlineLightMode fontSize={20} />
                ) : (
                  <IoMoonOutline fontSize={20} />
                )}
              </div>
              <div className="p-2 rounded-full shadow-2xl border-[1px] border-gray400 cursor-pointer bg-transparent dark:text-white hover:bg-yellow-200 hover:border-yellow-200">
                <GoShareAndroid fontSize={20} />
              </div>
            </div>
            <div className="pl-3 hidden md:flex">
              <LanguageSelector/>
            </div>
            <Sidebar
              expandSidebar={expandSidebar}
              setExpandSidebar={setExpandSidebar}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
