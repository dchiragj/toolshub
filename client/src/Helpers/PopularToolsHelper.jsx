import React, { useEffect, useState } from 'react'
import { FaFilePdf } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AllContext'

const PopularToolsHelper = ({ clicked = 1 }) => {
    const { darkMode } = useAuth();
    const pdfTools = [
        {
            link: "/avif-to-pdf",
            title: "AVIF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "AVIF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "AVIF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "AVIF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
    ]

    const imageTools = [
        {
            link: "/avif-to-pdf",
            title: "image",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "image",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "image",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "image",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
    ]

    const other = [
        {
            link: "/avif-to-pdf",
            title: "video",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "video",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "video",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "video",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
    ]

    const file = [
        {
            link: "/avif-to-pdf",
            title: "File",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "File",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "File",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "File",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
    ]
    const WebSeo = [
        {
            link: "/avif-to-pdf",
            title: "Web & Seo",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "Web & Seo",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "Web & Seo",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "Web & Seo",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
    ]
    const text = [
        {
            link: "/avif-to-pdf",
            title: "Text",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "Text",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "Text",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "Text",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        }
    ]
    const AiTools = [
        {
            link: "/avif-to-pdf",
            title: "AiTools",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "AiTools",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "AiTools",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            link: "/avif-to-pdf",
            title: "AiTools",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
    ]
    const selectedTools = clicked === 1 ? pdfTools : clicked === 2 ? imageTools : clicked === 4 ? file  : clicked === 5 ? WebSeo : clicked === 6 ? text  : clicked === 7 ? AiTools : other;

    const [tools,setTools] = useState(selectedTools);

    useEffect(() => {
        setTools(selectedTools);
    },[clicked])

    return (
        tools?.map((val, ind) => {
            return (
                <NavLink key={ind} to={val.link} className="bg-white dark:bg-[#1a252e] flex flex-col hover:underline p-5 rounded-xl" style={{backgroundColor: darkMode ? "#1a252e" : ""}}>
                    <div className='flex gap-2 mb-2'>
                        <div className='p-3 text-white rounded-lg' style={{ backgroundColor: "#fbe6e5" }}>
                            {/* <div style={{backgroundColor:"#e24841"}}> */}
                            <FaFilePdf color='#e24841' fontSize={26} />
                            {/* </div> */}
                        </div>
                        <div className='flex flex-col'>
                            <p className='flex justify-start items-center gap-2 font-semibold dark:text-white mb-2'><span>{val.title}</span><FaArrowRight /><span>{val.title1}</span></p>
                            <p className='text-left uppercase text-sm text-[#6f56ec]'>{val.desc}</p>
                        </div>
                    </div>
                    <div className='text-left'>
                        {val.description}
                    </div>
                </NavLink>
            )
        })
    )
};

export default PopularToolsHelper