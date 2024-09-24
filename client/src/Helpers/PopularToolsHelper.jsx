import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AllContext'
import { GrGallery } from 'react-icons/gr';
import { FaFileAlt } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { BsQrCode } from "react-icons/bs";
import { IoDocumentTextOutline, IoBarChartOutline } from 'react-icons/io5'
import { FaCalendarAlt, FaMoneyBillAlt } from "react-icons/fa"
import { FaVideo, FaHashtag, FaKey, FaGlobe, FaChartLine, FaChartPie, FaFacebook, FaFilePdf, FaPinterest, FaReddit, FaYoutube, FaArrowRight, FaTwitter, FaLinkedin, FaTiktok, FaInstagram, FaSpotify, FaFileVideo, FaImage, FaCamera, FaMicrophone, FaCalendar } from "react-icons/fa6";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const PopularToolsHelper = ({ clicked = 1 }) => {
    const { darkMode } = useAuth();

    const pdfTools = [
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/avif-to-pdf",
            title: "AVIF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/bmp-to-pdf",
            title: "BMP",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/eps-to-pdf",
            title: "EPS",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/gif-to-pdf",
            title: "GIF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/heic-to-pdf",
            title: "HEIC",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/heif-to-pdf",
            title: "HEIF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/ico-to-pdf",
            title: "ICO",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/jpg-to-pdf",
            title: "JPG",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/png-to-graypdf",
            title: "PNG",
            title1: "Gray PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/png-to-pdf",
            title: "PNG",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/psd-to-pdf",
            title: "PSD",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/raw-to-pdf",
            title: "RAW",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/tiff-to-pdf",
            title: "TIFF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/webp-to-pdf",
            title: "WEBP",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/base64-to-pdf",
            title: "Base64",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/color-text-to-pdf",
            title: "Color Text",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/css-to-pdf",
            title: "CSS",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/csv-to-pdf",
            title: "CSV",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/csv-to-plain-pdf",
            title: "CSV",
            title1: "Plain PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/excel-to-plain-pdf",
            title: "GIF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/html-to-pdf",
            title: "HTML",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/json-to-pdf",
            title: "JSON",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/md-to-pdf",
            title: "MD",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/speech-to-pdf",
            title: "GIF",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/svg-to-pdf",
            title: "SVG",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/text-to-pdf",
            title: "Text",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/tsv-to-pdf",
            title: "TSV",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/word-to-pdf",
            title: "Word",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/xml-to-pdf",
            title: "XML",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/yaml-to-pdf",
            title: "YAML",
            title1: "PDF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-avif",
            title: "PDF",
            title1: "AVIF",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-bmp",
            title: "PDF",
            title1: "BMP",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-eps",
            title: "PDF",
            title1: "eps",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-gray-png",
            title: "pdf",
            title1: "gray png",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-heic",
            title: "pdf",
            title1: "heic",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-heif",
            title: "pdf",
            title1: "heif",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-ico",
            title: "pdf",
            title1: "ico",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-jpg",
            title: "pdf",
            title1: "jpg",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-png",
            title: "pdf",
            title1: "png",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-psd",
            title: "pdf",
            title1: "psd",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-raw",
            title: "pdf",
            title1: "raw",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-tiff",
            title: "pdf",
            title1: "tiff",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-webp",
            title: "pdf",
            title1: "webp",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-base64",
            title: "pdf",
            title1: "base64",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-csv",
            title: "pdf",
            title1: "csv",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-excel",
            title: "pdf",
            title1: "excel",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-html",
            title: "pdf",
            title1: "html",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-json",
            title: "pdf",
            title1: "json",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-md",
            title: "pdf",
            title1: "md",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-sql",
            title: "pdf",
            title1: "sql",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-webp",
            title: "pdf",
            title1: "text",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-tsv",
            title: "pdf",
            title1: "tsv",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-xml",
            title: "pdf",
            title1: "xml",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-yaml",
            title: "pdf",
            title1: "yaml",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-rtf",
            title: "pdf",
            title1: "rtf",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-to-word",
            title: "pdf",
            title1: "word",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/analyze-pdf",
            title: "analyze pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/render-pdf-pages",
            title: "Render pdf pages",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/merge-pdf-text",
            title: "merge pdf & text",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/merge-pdfs",
            title: "merge pdfs",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-page-counter",
            title: "pdf page counter",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/split-bulk-pdfs",
            title: "split bulk pdfs",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/make-pdf-parts",
            title: "make pdf parts",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-page-no",
            title: "pdf page no",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/split-pdf",
            title: "split pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/rotate-pdf-pages",
            title: "rotate pdf pages",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/organize-pdf-text",
            title: "organize pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/crop-pdfs",
            title: "crop pdfs",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/3parts-pdf",
            title: "3parts pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-bg-color",
            title: "pdf with bg color",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/organize-bulk-pdf",
            title: "organize bulk pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/sign-edit-pdf",
            title: "Sign , Edit PDF",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/extract-pdf-emails",
            title: "Extract pdf emails",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/extract-pdf-links",
            title: "extract pdf links",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/listen-pdf",
            title: "listen pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/split-pdf-text",
            title: "split pdf text",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/remove-pdf-pages",
            title: "remove pdf pages",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/compress-pdf",
            title: "compress pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/extract-pdf-image",
            title: "extract pdf image",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/valid-mime-pdf",
            title: "valid mime pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/us-patent-to-pdf",
            title: "us patent to pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/resume-to-pdf",
            title: "resume to pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/reverse-pdf",
            title: "reverse pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/word-url-to-pdf",
            title: "word url to pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/excel-url-to-pdf",
            title: "excel url to pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/spreadsheet-to-pdf",
            title: "Spreadsheet to pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/add-padding-to-pdf",
            title: "add padding to pdf",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/pdf-margin",
            title: "pdf margin",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/flipkart-label-crop",
            title: "flipkart label crop",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <FaFilePdf color='#e24841' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/meesho-label-crop",
            title: "meesho label crop",
            title1: "",
            desc: "PDF Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        }
    ]

    const imageTools = [
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-png",
            title: "image",
            title1: "png",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-jpg",
            title: "image",
            title1: "JPG",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-gif",
            title: "image",
            title1: "GIF",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-bmp",
            title: "image",
            title1: "BMP",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-avif",
            title: "image",
            title1: "AVIF",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-tiff",
            title: "image",
            title1: "TIFF",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-heic",
            title: "image",
            title1: "HEIC",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-heif",
            title: "image",
            title1: "HEIF",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-webp",
            title: "image",
            title1: "WEBP",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-lco",
            title: "image",
            title1: "LCO",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-raw",
            title: "image",
            title1: "RAW",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-tga",
            title: "image",
            title1: "TGA",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-svg",
            title: "image",
            title1: "SVG",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },

        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-sketch",
            title: "image",
            title1: "SKETCH",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },

        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-grayscale",
            title: "image",
            title1: "GRAYSCALE",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-qrcode",
            title: "image",
            title1: "QR CODE",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/resize-image",
            title: "RESIZE IMAGE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },

        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/add-image-blur",
            title: "ADD IMAGE BLUR",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/dummy-image",
            title: "DUMMY Image",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },

        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/png-bg-color",
            title: "PNG BG COLOR",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/crop-image",
            title: "CROP IMAGE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },

        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/compress-image",
            title: "COMMPRESS IMAGE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },

        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/compress-png",
            title: "COMMPRESS PNG",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },

        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-flip-rotate",
            title: "IMAGE FLIP & ROTATE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/invert-image",
            title: "INVERT IMAGE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-to-favicon",
            title: "IMAGE TO FAVICON",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image enhancer",
            title: "IMAGE  ENHANCER",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/yt-banner-size",
            title: "YT BANNER  SIZE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/png-glow-adder",
            title: "PNg GLOW ADDER",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/png-padding-adder",
            title: "PNG PADDING  ADDER",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },

        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/ascii image",
            title: "ASCII IMAGE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-direction",
            title: "IMAGE DIRECTION",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-shape-changer",
            title: "IMAGE SHAPE CHANGER",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-effects",
            title: "IMAGE EFFECTS",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/round-profile-image",
            title: "ROUND PROFILE IMAGE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-splash",
            title: "IMAGE SPLASH",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },

        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/image-outline",
            title: "IMAGE OUTLINE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/insta-size-image",
            title: "INSTA SIZE IMAGE",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/png-shaddow",
            title: "PNG_SHADDOW",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
        {
            icon: <GrGallery color='#ff7919' fontSize={26} />,
            backgroundColor: "#ffede0",
            link: "/text-favicon",
            title: "TEXT FAVICON",
            title1: "",
            desc: "IMAGE Tools",
            description: "Easily convert, organize, edit, sign and compress your pdfs"
        },
    ]

    const video = [
        {
            icon: <HiOutlineSpeakerWave color='#FF0000' fontSize={26} />,
            backgroundColor: "#f9ecef",
            link: "/soundcloud-to-mp3",
            title: "Soundcloud to MP3",
            title1: "",
            desc: "Downloader",
            description: "Download Soundcloud to MP3 with our pinterest downloader."
        },
        {
            icon: <FaPinterest color='#bd081c' fontSize={26} />,
            backgroundColor: "#fff5f6",
            link: "/pinterest-video-downloader",
            title: "Pinterest Video Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download pinterest videos in HD with our pinterest downloader."
        },
        {
            icon: <FaReddit color='#FF4500' fontSize={26} />,
            backgroundColor: "#fdf4e8",
            link: "/reddit-video-downloader",
            title: "Reddit Video Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download reddit videos in HD with our pinterest downloader."
        },
        {
            icon: <FaFacebook color='#1877F2' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/facebook-video-downloader",
            title: "Facebook Video Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download reddit videos in HD with our pinterest downloader."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#f9ecef",
            link: "/yt-shorts-downloader",
            title: "Yt Shorts Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download reddit videos in HD with our pinterest downloader."
        },
        {
            icon: <FaTwitter color='#1DA1F2' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/x-video-downloader",
            title: "X Video Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download twitter videos in HD with our pinterest downloader."
        },
        {
            icon: <FaLinkedin color='#0077B5' fontSize={26} />,
            backgroundColor: "#f2f8ff",
            link: "/linkedin-video-downloader",
            title: "LinkedIn Video Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download twitter videos in HD with our pinterest downloader."
        },
        {
            icon: <FaTiktok color='#000000' fontSize={26} />,
            backgroundColor: "#f2f7f9",
            link: "/tiktok-video-downloader",
            title: "TikTok Video Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download twitter videos in HD with our pinterest downloader."
        },
        {
            icon: <FaInstagram color='#d6249f' fontSize={26} />,
            backgroundColor: "#fff0f3",
            link: "/instagram-video-downloader",
            title: "Insta Video Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download twitter videos in HD with our pinterest downloader."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#e7f1ff",
            link: "/youtube-downloader",
            title: "YouTube Downloader",
            title1: "",
            desc: "Downloader",
            description: "Easily download spotify music online with our webm maker tool for free."
        },
        {
            icon: <FaSpotify color='#1DB954' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/spotify-downloader",
            title: "Spotify Downloader",
            title1: "",
            desc: "Downloader",
            description: "Easily download spotify music online with our webm maker tool for free."
        },
        {
            icon: <FaPinterest color='#bd081c' fontSize={26} />,
            backgroundColor: "#fff5f6",
            link: "/pinterest-image-downloader",
            title: "Pinterest Image Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download twitter videos in HD with our pinterest downloader."
        },
        {
            icon: <FaInstagram color='#d6249f' fontSize={26} />,
            backgroundColor: "#fff0f3",
            link: "/instagram-image-downloader",
            title: "Insta Image Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download phptos from Instagram wiyh our instagram image downloader."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#e7f1ff",
            link: "/youtube-thumbnail-downloader",
            title: "YT Thumbnail Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download thumbnail from youtube with our thumbnail downloader."
        },
        {
            icon: <FaFacebook color='#1877F2' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/facebook-image-downloader",
            title: "Facebook Image Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download images from facebook with our fb image downloader."
        },
        {
            icon: <FaTwitter color='#1DA1F2' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/x-image-downloader",
            title: "X Image Downloader",
            title1: "",
            desc: "Downloader",
            description: "Download images from twitter with our x image downloader online tool."
        },
        {
            icon: <FaSpotify color='#1DB954' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/spotify-downloader",
            title: "Spotify Downloader",
            title1: "",
            desc: "Video Tools",
            description: "Easily download spotify music online with our webm maker tool for free."
        },
        {
            icon: <FaFileVideo color='#FF0000' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/compress-video",
            title: "Compress Video",
            title1: "",
            desc: "Video Tools",
            description: "Easily compress videos online with our webm maker tool for free."
        },
        {
            icon: <FaFileVideo color='#FF0000' fontSize={26} />,
            backgroundColor: "#fbe6e5",
            link: "/webm-video-maker",
            title: "WEBM Video Maker",
            title1: "",
            desc: "Video Tools",
            description: "Easily make webm videos online with our webm maker tool for free."
        },
        {
            icon: <FaImage color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/gif-splitter",
            title: "GIF Splitter",
            title1: "",
            desc: "GIF Tools",
            description: "Easily split and download all images from gif image online free."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#f5f9ff",
            link: "/yt-channel-logo-downloader",
            title: "YT Channel Logo Downloader",
            title1: "",
            desc: "Downloader",
            description: "Easily split and download all images from gif image online free."
        },
        {
            icon: <FaCamera color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/web-screenshot-generator",
            title: "Web Screenshot Generator",
            title1: "",
            desc: "Generator",
            description: "Easily generate website screenshots with our screenshot generator"
        },
        {
            icon: <FaMicrophone color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/compress-audio",
            title: "Compress Audio",
            title1: "",
            desc: "Video Tools",
            description: "Easily compress videos online with our video compressor tool."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/channel-activity",
            title: "Channel Activity",
            title1: "",
            desc: "Video Tools",
            description: "Easily check youtube channel activity timeline online free."
        },
        {
            icon: <FaCalendar color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-channel-age",
            title: "YT Channel Age",
            title1: "",
            desc: "Analyzer",
            description: "Easily download youtube channel logo online with our logo downloader."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-video-comments",
            title: "YT Video Comments",
            title1: "",
            desc: "Analyzer",
            description: "Easily download videos comments from youtube with our ig downloader."
        },
        {
            icon: <FaCalendarAlt color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-channel-age",
            title: "YT Channel Age",
            title1: "",
            desc: "Analyzer",
            description: "Easily analyze youtube channel statistics online for free."
        },

        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-channel-stats",
            title: "YT Channel Stats",
            title1: "",
            desc: "Analyzer",
            description: "Easily analyze youtube channel statistics online for free."
        },
        {
            icon: <FaVideo color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-livestream-check",
            title: "YT Livestream",
            title1: "",
            desc: "Video Tools",
            description: "Easily track livestream from youtube with our livstream monitor."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-video-title-extractor",
            title: "YT Title Extractor",
            title1: "",
            desc: "Video Tools",
            description: "<p>Analyze your youtube channel and video with our youtube tools.</p>"
        },
        {
            icon: <FaHashtag color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-hashtag-search",
            title: "Hashtag Search",
            title1: "",
            desc: "Video Tools",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-video-tag-search",
            title: "Video Tag Search",
            title1: "",
            desc: "Analyzer",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaCalendarAlt color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-video-publish-time",
            title: "Video Publish Time",
            title1: "",
            desc: "Video Tools",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-subscribe-link-generator",
            title: "YT Subscribe Link",
            title1: "",
            desc: "Generator",
            description: "Easily generate youtube channel subscriber link online for free."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-title-extractor",
            title: "YT Title Extractor",
            title1: "",
            desc: "Analyzer",
            description: "Extract video titles from YouTube."
        },
        {
            icon: <FaKey color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-video-copyright-check",
            title: "Video Copyright",
            title1: "",
            desc: "Analyzer",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaFileVideo color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-video-trends",
            title: "YouTube Trends",
            title1: "",
            desc: "Analyzer",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-frame-extractor",
            title: "YouTube Frame",
            title1: "",
            desc: "Video Tools",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-tag-generator",
            title: "YouTube Tag Generator",
            title1: "",
            desc: "Generator",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaYoutube color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-banner-downloader",
            title: "YT Banner Downloader",
            title1: "",
            desc: "Video Tools",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaGlobe color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/region-restriction-check",
            title: "Region Restriction",
            title1: "",
            desc: "Video Tools",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaMoneyBillAlt color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-money-calculator",
            title: "Money Calculator",
            title1: "",
            desc: "Video Tools",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaChartLine color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-channel-analyzer",
            title: "Channel Analyzer",
            title1: "",
            desc: "video Tools",
            description: "Analyze your youtube channel and video with our youtube tools."
        },
        {
            icon: <FaChartPie color='#FF0000' fontSize={26} />,
            backgroundColor: "#ffeef2",
            link: "/yt-channel-checker",
            title: "YouTube Channel Checker",
            title1: "",
            desc: "video Tools",
            description: "Analyze your youtube channel and video with our youtube tools."
        }
    ];

    const file = [
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/file-converter",
            title: "File Converter",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/text-to-word",
            title: "text to word",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/doc-to-html",
            title: "doc to html",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/doc-to-csv",
            title: "doc to csv",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/doc-to-excel",
            title: "doc to excel",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/doc-to-rft",
            title: "doc to rft",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/text-to-excel",
            title: "text to excel",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/excel-to-json",
            title: "excel to json",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/text-to-json",
            title: "text to json",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/csv-to-json",
            title: "csv to json",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/csv-to-excel",
            title: "csv to exel",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/csv-to-html",
            title: "csv to html",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/csv-to-sql",
            title: "csv to sql",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/csv-to-tsv",
            title: "csv to tsv",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/excel-to-html",
            title: "excel to html",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/html-markdown",
            title: "html markdown",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/scss-to-css",
            title: "scss to css",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/md-to-word",
            title: "md to word",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/csv-to-word",
            title: "csv to word",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/html-to-word",
            title: "html to word",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/srt-to-vtt",
            title: "srt to vtt",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
        {
            icon: <FaFileAlt color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/vtt-to-srt",
            title: "vtt to srt",
            title1: "",
            desc: "Document Tools",
            description: "Convert xlx,xlsx,doc,docx,pptx,rft,csv and more online"
        },
    ]

    const WebSeo = [
        {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/ad-keywords",
            title: "ad keywords",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/dns-lookup-json",
            title: "dns lookup json",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/hex-to-ip",
            title: "hex to ip",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/hoostname-to-ip",
            title: "hoostname to ip",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/htaccess-redirect",
            title: "htaccess redirect",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/http-headers",
            title: "http headers",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/ip-domain-location",
            title: "ip/domain location",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/ip-to-hex",
            title: "ip to hex",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/keyword-finder",
            title: "keyword finder",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/link-shortener",
            title: "link shortener",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/meta-tag-generator",
            title: "meta tag generator",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/nameserver-lookup",
            title: "nameserver-lookup",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/on-page-seo",
            title: "on-page-seo",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/robots-txt-generator",
            title: "robots txt generator",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/safe-url-checker",
            title: "safe url checker",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/hosting-checker",
            title: "hosting checker",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/responsive-view",
            title: "responsive view",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/backlink-maker",
            title: "backlink maker",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/wordpress-keyword",
            title: "wordpress keyword",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/instagram-hash-tag",
            title: "instagram hash tag",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/domain-digg",
            title: "domain-digg",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/google-boot-crawl",
            title: "google boot crawl",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/domain-avilibility",
            title: "domain avilibility",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/bin-lookup",
            title: "bin lookup",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/keyword-counter",
            title: "keyword counter",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/social-link-generator",
            title: "social link generator",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/article-re-writer",
            title: "article re writer",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/alexa-rank",
            title: "alexa rank",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/google-index",
            title: "google index",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/google-cache",
            title: "google cache",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/domain-age-checker",
            title: "domain age checker",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/whois-lookup",
            title: "whois lookup",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/keyword-density",
            title: "keyword density",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/meta-analyzer",
            title: "meta analyzer",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/page-size-checker",
            title: "page size checker",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/wp-theme-detector",
            title: "wp theme detector",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/keywords-suggestion",
            title: "keywords suggestion",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/code-compressor",
            title: "code compressor",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/compress css",
            title: "compress css",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/css-gradient",
            title: "css-gradient",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/html-banner",
            title: "html-banner",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/source-extractor",
            title: "source-extractor",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/format-css",
            title: "format css",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/url-re-writer",
            title: "url re-writer",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/url-parser",
            title: "url parser",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/blogger-sitemap",
            title: "blogger sitemap",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/wp-sitemap",
            title: "wp-sitemap",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/html-table",
            title: "html table",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/compress-xml",
            title: "compress xml",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/base64-converter",
            title: "base64 converter",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/url-encode-decode",
            title: "url encode decode",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/md5-hash",
            title: "md5 hash",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/generate-password",
            title: "generate password",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/seo-analyzer",
            title: "seo analyzer",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/resume-builder",
            title: "resume builder",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/css-generator",
            title: "css generator",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/gradient-generator",
            title: "gradient generator",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/waves-generator",
            title: "waves generator",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }, {
            icon: <IoBarChartOutline color='black' fontSize={26} />,
            backgroundColor: "aliceblue",
            link: "/css-flex-box",
            title: "css flex box",
            title1: "",
            desc: "Web Tools",
            description: "Analyze website, make backlinks, generate sitemap."
        }
    ]

    const text = [
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/add-line-number",
            title: "add line number",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/bbcode to text",
            title: "bbcode to text",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/binary-converter",
            title: "binary converter",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/word-counter",
            title: "word counter",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/reverse-text",
            title: "reverse text",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/case-converter",
            title: "case converter",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/list-sorter",
            title: "list sorter",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/remove-emojis",
            title: "remove emojis",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/remove-accent",
            title: "remove accent",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/small-text",
            title: "small text",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/upside-down-text",
            title: "upside down text",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
        {
            icon: <IoIosSettings color='#000' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/sha-hshes",
            title: "sha hshes",
            title1: "",
            desc: "text",
            description: "Binary Converter Text Explore our more latest free online web tools collection."
        },
    ]

    const AiTools = [
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-image-art",
            title: "AI Image Art",
            title1: "",
            desc: "AI Tools",
            description: "Easily create an AI art from images with AI."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-image-background-editor",
            title: "AI Image Background Editor",
            title1: "",
            desc: "AI Tools",
            description: "Improve your image quality with our AI image editor."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-image-editor",
            title: "AI Image Editor",
            title1: "",
            desc: "AI Tools",
            description: "Improve your image quality with our AI image editor."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-nude-generator",
            title: "AI Nude Generator",
            title1: "",
            desc: "AI Write",
            description: "Ask our AI to generate nude art online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/image-face-swap",
            title: "Image Face Swap",
            title1: "",
            desc: "AI Write",
            description: "Easily swap faces from images online with our face swap tool."
        },
        {
            icon: <IoDocumentTextOutline color='#624bd8' fontSize={26} />,
            backgroundColor: "#e9e6f9",
            link: "/text-to-image",
            title: "Text to Image",
            title1: "",
            desc: "AI Write",
            description: "Generate text to image online with our AI image-to-image tool."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/ai-emi-generator",
            title: "AI EMI Generator",
            title1: "",
            desc: "AI Write",
            description: "Create inpainting image with our AI inpainting tool online."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/mirror-image-ai",
            title: "Mirror Image AI",
            title1: "",
            desc: "AI Write",
            description: "Easily convert images into mirrored images online with our AI tool."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/image-colorizer",
            title: "Image Colorizer",
            title1: "",
            desc: "AI Write",
            description: "Colorize your photos with AI effects online with our AI tool."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/add-image-noise",
            title: "Add Image Noise",
            title1: "",
            desc: "AI Tools",
            description: "Easily add noise to an image online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/add-image-stroke",
            title: "Add Image Stroke",
            title1: "",
            desc: "AI Write",
            description: "Easily add stroke to an image online for free with our AI tool."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/image-analysis",
            title: "Image Analysis",
            title1: "",
            desc: "AI Tools",
            description: "Easily perform Image Analysis online for free with our AI image analyzer."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/broken-image-effect",
            title: "Broken Image Effect",
            title1: "",
            desc: "AI Tools",
            description: "Easily convert image to broken mirror effects online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/background-eraser",
            title: "Background Eraser",
            title1: "",
            desc: "AI Tools",
            description: "Easily remove image background online for free with our tool."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/image-scanner",
            title: "Image Scanner",
            title1: "",
            desc: "AI Tools",
            description: "Easily scan your photos online for free with our image scanner."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/photo-collage",
            title: "Photo Collage",
            title1: "",
            desc: "AI Tools",
            description: "Free online photo collage maker AI-based tool for you."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/full-body-anime",
            title: "Full Body Anime",
            title1: "",
            desc: "AI Tools",
            description: "Generate full-body anime online for free with our AI face swap."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/background-remover",
            title: "Background Remover",
            title1: "",
            desc: "AI Tools",
            description: "Easily remove background online for free with our tool."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/gray-dutone-image",
            title: "Gray Dutone Image",
            title1: "",
            desc: "AI Tools",
            description: "Easily convert dutone gray image online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/image-swap",
            title: "Image Swap",
            title1: "",
            desc: "AI Tools",
            description: "Easily swap an image with an image online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/resume-builder",
            title: "Resume Builder",
            title1: "",
            desc: "AI Tools",
            description: "Easily swap an image with an image online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/fake-person-data",
            title: "Fake Person Data",
            title1: "",
            desc: "AI Tools",
            description: "Easily generate fake person data online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/anonymous-email",
            title: "Anonymous Email",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/blog-post-image",
            title: "Blog Post Image",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/image-to-anime",
            title: "Image to Anime",
            title1: "",
            desc: "AI Tools",
            description: "Easily generate anime to images online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/image-to-line-draw",
            title: "Image to Line Draw",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/ai-text-to-audio",
            title: "AI Text to Audio",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/ai-background-remover",
            title: "AI Background Remover",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/dall-e-image",
            title: "DALL-E Image",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/ai-text-to-speech",
            title: "AI Text to Speech",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/ai-video-maker",
            title: "AI Video Maker",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/art-illustrator",
            title: "Art Illustrator",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/web-safe-colors",
            title: "Web Safe Colors",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/glitch-effect",
            title: "Glitch Effect",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/image-upscaler",
            title: "Image Upscaler",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/kaleidoscope-effect",
            title: "Kaleidoscope Effect",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/live-portrait-video",
            title: "LivePortrait Video",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/portrait-video",
            title: "Portrait Video",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/ai-instant-mesh",
            title: "AI Instant Mesh",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/ai-garment-image",
            title: "AI Garment Image",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/ai-outfit",
            title: "AI Outfit",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/undress-ai",
            title: "Undress AI",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/ai-cloth-segmentation",
            title: "AI Cloth Segmentation",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/cloth-identifier",
            title: "Cloth Identifier",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/animegen",
            title: "AnimeGen",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/reverse-image-and-color",
            title: "Reverse Image and Color",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/object-cutout",
            title: "Object Cutout",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        },
        {
            icon: <IoDocumentTextOutline color='#ffd700' fontSize={26} />,
            backgroundColor: "#fff7db",
            link: "/realtime-flux-image",
            title: "Realtime FLUX Image",
            title1: "",
            desc: "AI Tools",
            description: "Easily send anonymous email online for free."
        }
    ];

    const AiWrite = [
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/biography-title",
            title: "Biography Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/questions-generator",
            title: "Questions Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-paper-writer",
            title: "AI Paper Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/underline-text",
            title: "Underline Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/story-idea-generator",
            title: "Story Idea Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/concluding-paragraph",
            title: "Concluding Paragraph",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/thesis-statement",
            title: "Thesis Statement",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/report-writer",
            title: "Report Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/article-generator",
            title: "Article Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-to-human-text",
            title: "AI to Human Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-headline",
            title: "AI Headline",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/backwards-text",
            title: "Backwards Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/press-release-helper",
            title: "Press Release Helper",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/autobiography-title",
            title: "Autobiography Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/playground-ai-text",
            title: "Playground AI Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-storyteller",
            title: "AI Storyteller",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-news-writer",
            title: "AI News Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-funny-text",
            title: "AI Funny Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/insta-hashtags",
            title: "Insta Hashtags",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-paper-title",
            title: "AI Paper Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-youtube-title",
            title: "AI YouTube Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/sentence-shortener",
            title: "Sentence Shortener",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-game-title",
            title: "AI Game Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools"
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/content-improver",
            title: "Content Improver",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-book-title",
            title: "AI Book Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/conclusion-ai-writer",
            title: "Conclusion AI Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-thesis-title",
            title: "AI Thesis Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/linkedin-content",
            title: "LinkedIn Content",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/documentary-title",
            title: "Documentary Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/webinar-title",
            title: "Webinar Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/crossed-text",
            title: "Crossed Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/conversation-starter",
            title: "Conversation Starter",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/case-study-title",
            title: "Case Study Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/video-script-copywriter",
            title: "Video Script Copywriter",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/header-formatter",
            title: "Header Formatter",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-press-release",
            title: "AI Press Release",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/topic-sentence",
            title: "Topic Sentence",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/newsletter-headline",
            title: "Newsletter Headline",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/word-rearranger",
            title: "Word Rearranger",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/old-english-text",
            title: "Old English Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/twitter-text",
            title: "Twitter Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/blog-text-generator",
            title: "Blog Text Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-hashtag-generator",
            title: "AI Hashtag Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/seo-content-generator",
            title: "SEO Content Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/facebook-text-generator",
            title: "Facebook Text Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/agreement-writer",
            title: "Agreement Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-note-taker",
            title: "AI Note Taker",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/outline-for-essay",
            title: "Outline For Essay",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/title-story-generator",
            title: "Title Story Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/poem-idea-generator",
            title: "Poem Idea Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/kids-book-title",
            title: "Kids Book Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/romance-title-generator",
            title: "Romance Title Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/plot-idea-generator",
            title: "Plot Idea Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/amazon-book",
            title: "Amazon Book",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/blog-outline",
            title: "Blog Outline",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/essay-elongator",
            title: "Essay Elongator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/story-summary-generator",
            title: "Story Summary Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-proposal-writer",
            title: "AI Proposal Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/article-title-generator",
            title: "Article Title Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/seo-description-generator",
            title: "SEO Description Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/artist-writer",
            title: "Artist Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-content-review-generator",
            title: "AI Content Review Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/snapchat-text",
            title: "Snapchat Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/outline-generator",
            title: "Outline Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/yt-channel-description",
            title: "YT Channel Description",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/comic-idea-generator",
            title: "Comic Idea Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/formatting-ai",
            title: "Formatting AI",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/abstract-writer",
            title: "Abstract Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/abstract-title",
            title: "Abstract Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/google-ads-writing",
            title: "Google Ads Writing",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/expand-essay-ai",
            title: "Expand Essay AI",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/fake-headline",
            title: "Fake Headline",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/japanese-text",
            title: "Japanese Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/english-anagram",
            title: "English Anagram",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/clickable-titles",
            title: "Clickable Titles",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/fake-text-generator",
            title: "Fake Text Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-text-editors",
            title: "AI Text Editors",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/meta-description",
            title: "Meta Description",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/fiction-title-generator",
            title: "Fiction Title Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/pinterest-title-generator",
            title: "Pinterest Title Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/pinterest-description-generator",
            title: "Pinterest Description Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/automated-blog",
            title: "Automated Blog",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/block-text-generator",
            title: "Block Text Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/conversation-generator",
            title: "Conversation Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-script-writer",
            title: "AI Script Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/shorten-sentences",
            title: "Shorten Sentences",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-essay-reviewer",
            title: "AI Essay Reviewer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/repeat-text-generator",
            title: "Repeat Text Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/introduction-generator",
            title: "Introduction Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/youtube-title",
            title: "YouTube Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/movie-script",
            title: "Movie Script",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-article-writer",
            title: "AI Article Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/text-lengthener",
            title: "Text Lengthener",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/random-art-ideas",
            title: "Random Art Ideas",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/word-list-generator",
            title: "Word List Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/article-maker",
            title: "Article Maker",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/phd-thesis-title",
            title: "PhD Thesis Title",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/text-responses",
            title: "Text Responses",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-review-writer",
            title: "AI Review Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/expand-my-essay",
            title: "Expand My Essay",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/number-text",
            title: "Number Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools"
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/sentence-randomizer",
            title: "Sentence Randomizer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/summary-generator",
            title: "Summary Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/chat-gpt-rewriter",
            title: "Chat GPT Rewriter",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/crossed-out-text",
            title: "Crossed Out Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/instagram-text",
            title: "Instagram Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/scary-text",
            title: "Scary Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/expand-text",
            title: "Expand Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/text-enhancer",
            title: "Text Enhancer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-content-generator",
            title: "AI Content Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/research-outline",
            title: "Research Outline",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/fake-word-generator",
            title: "Fake Word Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/letter-script",
            title: "Letter Script",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/paragraph-to-poem",
            title: "Paragraph to Poem",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-worksheet",
            title: "AI Worksheet",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/magic-writer",
            title: "Magic Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/story-hook",
            title: "Story Hook",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/marketing-copy",
            title: "Marketing Copy",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/seo-meta-tags",
            title: "SEO Meta Tags",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/content-brief",
            title: "Content Brief",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/word-combination",
            title: "Word Combination",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/facebook-ad-copy",
            title: "Facebook Ad Copy",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-email-writer",
            title: "AI Email Writer",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/text-multiplier",
            title: "Text Multiplier",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/cryptic-text",
            title: "Cryptic Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/text-formatter",
            title: "Text Formatter",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/rephrase-thesis",
            title: "Rephrase Thesis",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-content-rewriter",
            title: "AI Content Rewriter",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/banner-text",
            title: "Banner Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/write-resignation",
            title: "Write Resignation",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/title-tag-generator",
            title: "Title Tag Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/google-ads-headline",
            title: "Google Ads Headline",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/ai-ghostwriter",
            title: "AI Ghostwriter",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/text-simplifier",
            title: "Text Simplifier",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/video-idea",
            title: "Video Idea",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/tiktok-hashtag",
            title: "Tiktok Hashtag",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/resume-summary",
            title: "Resume Summary",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/list-formatter",
            title: "List Formatter",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/wide-text",
            title: "Wide Text",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/rephrase-sentence",
            title: "Rephrase Sentence",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/pinterest-hash",
            title: "Pinterest Hash",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/tweet-content",
            title: "Tweet Content",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/speechwriter-ai",
            title: "Speechwriter AI",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/meta-title-generator",
            title: "Meta Title Generator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/facebook-hash",
            title: "Facebook Hash",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/english-to-arabic",
            title: "English to Arabic",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/twitter-hashtags",
            title: "Twitter Hashtags",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/text-to-html-ai",
            title: "Text to HTML AI",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/writer-assistant",
            title: "Writer Assistant",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/unique-content",
            title: "Unique Content",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/article-creator",
            title: "Article Creator",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        },
        {
            icon: <IoDocumentTextOutline color='#10d0d5' fontSize={26} />,
            backgroundColor: "#e3fcfd",
            link: "/seo-meta-description",
            title: "SEO Meta Description",
            title1: "",
            desc: "AI Write",
            description: "Easily create content online with our free AI writing tools."
        }
    ]

    const QR = [
        {
            icon: <BsQrCode color='#000' fontSize={26} />,
            backgroundColor: "bisque",
            link: "/pro-qr-codes",
            title: "pro qr codes",
            title1: "",
            desc: "Text",
            description: "Generate premium quality QR codes online for free."
        },
        {
            icon: <BsQrCode color='#000' fontSize={26} />,
            backgroundColor: "bisque",
            link: "/barcode-generator",
            title: "Barcode generator",
            title1: "",
            desc: "Text",
            description: "Easily generate barcodes online for free."
        },
        {
            icon: <BsQrCode color='#000' fontSize={26} />,
            backgroundColor: "bisque",
            link: "/code128b-barcode",
            title: "code128b barcode",
            title1: "",
            desc: "Text",
            description: "Easily Code128B Barcode Generator online for free."
        },
        {
            icon: <BsQrCode color='#000' fontSize={26} />,
            backgroundColor: "bisque",
            link: "/ifsc-qr-code",
            title: "ifsc qr code",
            title1: "",
            desc: "Text",
            description: "Easily IFSC Code For Indian Bank Details online for free."
        },
        {
            icon: <BsQrCode color='#000' fontSize={26} />,
            backgroundColor: "bisque",
            link: "/image-to-qr-code",
            title: "image to qr code",
            title1: "",
            desc: "Text",
            description: "Generate image to QR Code free online web tools collection."
        },
        {
            icon: <BsQrCode color='#000' fontSize={26} />,
            backgroundColor: "bisque",
            link: "/halftone-qr-code",
            title: "halftone qr code",
            title1: "",
            desc: "Text",
            description: "Drop an image into your browser, then click generate."
        },
        {
            icon: <BsQrCode color='#000' fontSize={26} />,
            backgroundColor: "bisque",
            link: "/premium-barcode",
            title: "Premium Barcode",
            title1: "",
            desc: "Text",
            description: "SVG/PNG Premium Barcode generator online for free."
        },
        {
            icon: <BsQrCode color='#000' fontSize={26} />,
            backgroundColor: "bisque",
            link: "/barcode-qrcode-scanner",
            title: "Barcode Qr Code Scanner",
            title1: "",
            desc: "Text",
            description: "Easily Barcode/QR Code Scanner online for free."
        },
    ]

    const selectedTools = clicked === 1 ? pdfTools : clicked === 2 ? imageTools : clicked === 3 ? video : clicked === 4 ? file : clicked === 5 ? WebSeo : clicked === 6 ? text : clicked === 7 ? AiTools : clicked === 8 ? AiWrite : QR;

    const [tools, setTools] = useState(selectedTools);

    useEffect(() => {
        setTools(selectedTools);
    }, [clicked])

    return (
        tools?.map((val, ind) => {
            return (
                <NavLink key={ind} to={val.link} className={`bg-white dark:bg-[#1a252e] flex flex-col p-5 rounded-xl group`}>
                    <div className='flex gap-2 mb-2'>
                        <div className={`p-3 text-white rounded-lg`} style={{ backgroundColor: val.backgroundColor }}>
                            {val.icon}
                        </div>
                        <div className='flex flex-col uppercase'>
                            <p className='flex justify-start items-center gap-2 text-sm font-bold dark:text-white mb-2 text-left'><span>{val.title}</span>{val.title1 && <FaArrowRight />}<span>{val.title1}</span></p>
                            <p className='text-left uppercase text-xs text-purple'>{val.desc}</p>
                        </div>
                    </div>
                    <div className='text-left text-base group-hover:underline'>
                        {val.description}
                    </div>
                </NavLink>
            )
        })
    )
};

export default PopularToolsHelper