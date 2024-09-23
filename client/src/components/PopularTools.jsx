import React, { useState } from 'react'
import { useAuth } from '../Context/AllContext'
import { Button } from '@mui/material';
import { IoDocumentTextOutline } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { MdOutlineVideoLibrary, MdOutlineWidgets } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { FaQrcode } from "react-icons/fa";
import PopularToolsHelper from '../Helpers/PopularToolsHelper';

const PopularTools = () => {

  const [tabs, setTabs] = useState(1);
  const { darkMode } = useAuth();
  const handleChange = (newVal) => {
    setTabs(newVal);
  }

  const buttons = [
    {
      tabs: 1,
      icon: <IoDocumentTextOutline />,
      text: "PDF"
    },
    {
      tabs: 2,
      icon: <GrGallery />,
      text: "Image"
    },
    {
      tabs: 3,
      icon: <MdOutlineVideoLibrary />,
      text: "Video"
    },
    {
      tabs: 4,
      icon: <MdOutlineWidgets />,
      text: "file"
    },
    {
      tabs: 5,
      icon: <MdOutlineWidgets />,
      text: "web & seo"
    },
    {
      tabs: 6,
      icon: <MdOutlineWidgets />,
      text: "text"
    },
    {
      tabs: 7,
      icon: <LiaPenSolid />,
      text: "Ai tools"
    },
    {
      tabs: 8,
      icon: <LiaPenSolid />,
      text: "ai write"
    },
    {
      tabs: 9,
      icon: <FaQrcode />,
      text: "QR"
    },
  ]

  return (
    <div className='border-[1px] text-center border-gray200 dark:border-white sm:m-10 rounded-3xl py-10 my-10 bg-[aliceblue] dark:bg-darkBlue'>
      <h2 className='dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold'>Explore Our All popular Tools</h2>
      <p className='dark:text-white my-10 text-gray500 text-xs sm:text-sm md:text-base lg:text-lg'>We present the best of the best. All free, no catch</p>
      <div className='w-[90%] mx-auto p-3 overflow-x-auto shadow-custom rounded-3xl border-[1px] border-gray200'>
        <div className='whitespace-nowrap'>
          {
            buttons.map((val, ind) => {
              return (
                <Button key={ind} startIcon={val.icon} variant={tabs === val.tabs ? 'contained' : ""} sx={{ borderRadius: "25px", color: darkMode ? "white" : '' }} onClick={() => handleChange(val.tabs)}>{val.text}</Button>
              )
            })
          }
        </div>
      </div>
      <div className='w-[90%] mx-auto mt-5 dark:text-white'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {/* <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam rerum nisi illo esse, tempora quasi mollitia est repudiandae impedit perferendis iste cupiditate? Nihil, dolor consequuntur?
          </div>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam rerum nisi illo esse, tempora quasi mollitia est repudiandae impedit perferendis iste cupiditate? Nihil, dolor consequuntur?
          </div>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam rerum nisi illo esse, tempora quasi mollitia est repudiandae impedit perferendis iste cupiditate? Nihil, dolor consequuntur?
          </div>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam rerum nisi illo esse, tempora quasi mollitia est repudiandae impedit perferendis iste cupiditate? Nihil, dolor consequuntur?
          </div>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam rerum nisi illo esse, tempora quasi mollitia est repudiandae impedit perferendis iste cupiditate? Nihil, dolor consequuntur?
          </div> */}
          <PopularToolsHelper clicked={tabs} />
        </div>
      </div>
    </div>
  )
}

export default PopularTools