import React from 'react'
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GrGallery } from "react-icons/gr";

const FreeTools = () => {

    const cards = [
        {
            title: "PDF Cropper",
            description: "Crop a PDF quickly and easily with our free tool at free",
            icon: <BsFileEarmarkPdfFill fontSize={80} color='rgb(187, 27, 174)' />,
            backgroundColor: "#d8e6ef",
            link: "/crop-pdf"
        },
        {
            title: "Merge PDFs",
            description: "Merge multiple pdf documents together free online",
            icon: <BsFileEarmarkPdfFill fontSize={80} color='rgb(17, 146, 26)' />,
            backgroundColor: "#e2e3fe",
            link: "/merge-pdfs"
        },
        {
            title: "Compress PDF",
            description: "Compress pdf document online for free with robust solutions",
            icon: <BsFileEarmarkPdfFill fontSize={80} color='rgb(55, 18, 191)' />,
            backgroundColor: "#fae2fe",
            link: "/compress-pdf"
        },
        {
            title: "PDF Editor",
            description: "Edit an existing PDF and download with no sign-up",
            icon: <BsFileEarmarkPdfFill fontSize={80} color='rgb(53, 62, 65)' />,
            backgroundColor: "#e2edfe",
            link: "/edit-pdf"
        },
        {
            title: "Profile Photo Maker",
            description: "Style your profile photo for social media at no cost",
            icon: <CgProfile fontSize={80} color='rgb(247, 2, 39)' />,
            backgroundColor: "#e1fde5",
            link: "/profile-photo-maker"
        },
        {
            title: "Image Resizer",
            description: "Resize an image with our ai technology , no sign-up required",
            icon: <GrGallery fontSize={80} color='rgb(25, 143, 88)' />,
            backgroundColor: "#e2fefc",
            link: "/image-resizer"
        },
        {
            title: "PNG Converter",
            description: "Convert any image format to PNG online free experience",
            icon: <GrGallery fontSize={80} color='rgb(25, 143, 88)' />,
            backgroundColor: "#FEE2E2",
            link: "/png-converter"
        },
    ]

    return (
        <>
            <div className='mx-10 rounded-3xl py-10 dark:bg-darkBlue'>
                <div className='flex flex-col'>
                    <div className='flex flex-col text-center mb-10'>
                        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 dark:text-white'>Free Tools You'd Usually Pay For</h2>
                        <p className='text-xs sm:text-sm md:text-base lg:text-lg  text-gray500'>No Limits, No Sign-Up, Here's our featured tools</p>
                    </div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1300: {
                                slidesPerView: 4,
                                spaceBetween: 40
                            },
                            1680: {
                                slidesPerView: 5,
                                spaceBetween: 40
                            }
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop='true'
                        modules={[Autoplay]}
                        className="swiper2"
                    >
                        {
                            cards.map((val, ind) => {
                                return (
                                    <SwiperSlide key={ind} className='rounded-xl shadow-lg dark:bg-[#1a252e]'>
                                        <NavLink to={val.link} className='flex flex-col p-3 dark:bg-[#1a252e] rounded-xl'>
                                            <div className='grid place-items-center rounded-xl mt-1 py-10' style={{ backgroundColor: val.backgroundColor }}>
                                                {val.icon}
                                            </div>
                                            <div className='flex flex-col text-left mt-5'>
                                                <h3 className='text-lg sm:text-xl font-medium dark:text-white'>{val.title}</h3>
                                                <p className='text-base sm:text-lg text-gray600 pt-2'>{val.description}</p>
                                            </div>
                                        </NavLink>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default FreeTools