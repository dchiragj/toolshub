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
import LanguageSelector from "../LanguageSelector";
import { useTranslation } from 'react-i18next';

const Header = ({ expandSidebar, setExpandSidebar }) => {

  const { darkMode, darkModeHandler } = useAuth();
  const { t } = useTranslation();

  const shareHandle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check this out!',
          text: 'This is an awesome tools converter site, I want to share with you.',
          url: window.location.href,
        });
        console.log('Share was successful.');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.error('Web Share API is not supported in this browser.');
      // Fallback logic here (e.g., copying the link to clipboard)
    }
  }

  return (
    <>
      <div className="p-4 shadow-lg h-[72px] bg-white dark:bg-darkBlue w-full fixed top-0 left-0 z-[2000]">
        <div className="flex justify-between item-center">
          <div className="flex items-center gap-4">
            <div onClick={() => setExpandSidebar(!expandSidebar)}>
              <GiHamburgerMenu
                className="block lg:hidden dark:text-white"
                fontSize={24}
                cursor={"pointer"}
              />
            </div>
            <NavLink to={"/"} className="text-3xl font-bold dark:text-white">
              LOGO
            </NavLink>
          </div>
          <nav className="gap-8 text-lg hidden lg:flex dark:text-white">
            <li className="relative flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer">
              <p className="hover:text-lightBlue">{t('pdf')}</p>
              <IoIosArrowDown className="text-gray500" />
              <PDFMenu />
            </li>
            <li className="flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer hover:text">
              <p className="hover:text-lightBlue">{t('image')}</p>
              <IoIosArrowDown className="text-gray500" />
              <ImageMenu />
            </li>
            <li className="flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer">
              <p className="hover:text-lightBlue">{t('text')}</p>
              <IoIosArrowDown className="text-gray500" />
              <TextMenu />
            </li>
            <li className="flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer">
              <p className="hover:text-lightBlue">{t('other')}</p>
              <IoIosArrowDown className="text-gray500" />
              <OtherMenu />
            </li>
            <li className="flex items-center gap-2 rounded-lg px-2 hover:bg-[aliceblue] dark:hover:bg-[#1a252e] delay-150 group cursor-pointer">
              <p className="hover:text-lightBlue">{t('file')}</p>
              <IoIosArrowDown className="text-gray500" />
              <FileMenu />
            </li>
          </nav>
          <div className="flex items-center">
            <div className="flex gap-3 border-r-0 md:border-r-2 md:px-4 border-r-gray200">
              <div
                className="p-2 rounded-full shadow-2xl border-[1px] border-gray400 cursor-pointer bg-transparent dark:text-white hover:bg-yellow-200 hover:border-yellow-200"
                onClick={darkModeHandler}
                title="Toggle Light/Dark Mode"
              >
                {darkMode ? (
                  <MdOutlineLightMode fontSize={20} />
                ) : (
                  <IoMoonOutline fontSize={20} />
                )}
              </div>
              <div className="p-2 rounded-full shadow-2xl border-[1px] border-gray400 cursor-pointer bg-transparent dark:text-white hover:bg-yellow-200 hover:border-yellow-200" onClick={shareHandle} title="Share">
                <GoShareAndroid fontSize={20} />
              </div>
            </div>
            <div className="pl-3 hidden md:flex">
              <LanguageSelector />
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
