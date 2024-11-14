import React from 'react'
import { NavLink } from 'react-router-dom'
import CommonPageHeader from '../components/CommonPageHeader'
import HomeHeadingSlider from '../components/HomeHeadingSlider';
import { IoDocumentTextOutline } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { MdOutlineVideoLibrary, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { RiTokenSwapFill } from "react-icons/ri";
import PopularTools from '../components/PopularTools';
import FreeTools from '../components/FreeTools';
import Ads from '../components/Ads';
import WebTools from '../components/WebTools';

const Home = () => {

    const isAdServe = JSON.parse(process.env.REACT_APP_PUBLIC_SERVE_ADS);

    const FeaturedCard = [
        {
            icon: <IoDocumentTextOutline fontSize={20} />,
            bgColor: '#6f56ec',
            color: '#9d8cf2',
            note: "85+ PDF tools",
            title: "Featured PDF Tools",
            link: '/compress-pdf',
            desc: "Compress PDF Online",
            otherText: "PDF to JPG",
            otherLink: "/pdf-to-jpg",
            bottomBgColor: "#efedfd"
        },
        {
            icon: <GrGallery fontSize={20} />,
            bgColor: '#f66213',
            color: '#f8935f',
            note: "40+ Image tools",
            title: "Featured Image Tool",
            link: '/image-resizer',
            desc: "Resize Image",
            otherText: "Image to PNG",
            otherLink: "/image-to-png",
            bottomBgColor: "#fef2eb"
        },
        {
            icon: <MdOutlineVideoLibrary fontSize={20} />,
            bgColor: '#d61c4e',
            color: '#e36587',
            note: "30+ tools",
            title: "Featured Video Tool",
            link: '/webm-video',
            desc: "WEBM Video Maker",
            otherText: "GIF Splitter",
            otherLink: "/gif-splitter",
            bottomBgColor: "#fdedf1"
        },
        {
            icon: <RiTokenSwapFill fontSize={20} />,
            bgColor: '#1c67ca',
            color: '#6598db',
            note: "40+ tools",
            title: "Featured AI Tool",
            link: '/ai-qa',
            desc: "AI Question Answer",
            otherText: "Case Converter",
            otherLink: "/case-converter",
            bottomBgColor: "#edf4fd"
        },
        {
            icon: <MdOutlineMarkUnreadChatAlt fontSize={20} />,
            bgColor: '#247881',
            color: '#6aa3aa',
            note: "25+ tools",
            title: "Featured Generator",
            link: '/web-screenshot',
            desc: "Web Screenshot Generator",
            otherText: "YT Logo",
            otherLink: "/yt-logo",
            bottomBgColor: "#eff9fb"
        },
    ]

    return (
        <div className='dark:bg-darkBlue mt-[72px]'>
            <CommonPageHeader text={"Free Online Web Tools For Everyone. No Sign-Up Required. No Limits."} />
            {isAdServe && <Ads slot='' className="mx-10 mt-5" />}
            <div className='dark:bg-darkBlue dark:text-white p-5 px-2'>
                <div className='flex flex-wrap justify-center items-center gap-3 text-4xl sm:text-5xl font-bold text-center mb-8'><span>Free Tools to Make</span> <HomeHeadingSlider /> <span>Simple</span></div>
                <div className='text-xl text-[#707375] m-1.5 text-center flex items-center justify-center'>We offer PDF, file, image and other online tools to make your life easier</div>
            </div>
            <div className=' bg-blue-500 rounded-xl shadow-custom grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 sm:m-10  p-10 px-10 sm:px-12 xl:px-20'>
                {
                    FeaturedCard.map((val, ind) => {
                        return (
                            <div key={ind} className="flex flex-col">
                                <NavLink to={val.link} style={{ backgroundColor: val.bgColor }} className='p-5 rounded-t-xl hover:underline underline-white decoration-white'>
                                    <div className='text-white'>
                                        <div className='flex justify-between items-center mb-5'>
                                            <span className="p-3 rounded-full" style={{ backgroundColor: val.color }}>{val.icon}</span>
                                            <div className='p-1 px-3 rounded-full text-xs' style={{ backgroundColor: val.color }}>
                                                {val.note}
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex flex-col'>
                                                <p className='mb-3 text-lg font-semibold'>{val.title}</p>
                                                <span className='text-sm'>{val.desc}</span>
                                            </div>
                                            <FaArrowRight fontSize={20} />
                                        </div>
                                    </div>
                                </NavLink>
                                <div className='p-5 py-3 dark:border-gray400 dark:bg-darkBlue border-[1px] border-t-0 rounded-b-xl border-gray200 text-xs'>
                                    <div className='flex justify-between items-center p-5 py-3 rounded-lg' style={{ backgroundColor: val.bottomBgColor }}>
                                        <p>Other Featured : </p>
                                        <NavLink to={val.otherLink} className="text-lightBlue text-xs font-medium px-2 rounded-full hover:underline decoration-lightBlue">{val.otherText}</NavLink>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {isAdServe && <Ads slot='' className={'mx-10'} />}
            <PopularTools />
            {isAdServe && <Ads slot='' className={'mx-10'} />}
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default Home
