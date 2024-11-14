import React, { useCallback, useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import { useDropzone } from 'react-dropzone';
import { PiLinkBold } from "react-icons/pi";
import { TbWorldWww } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { Slider } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import Ads from '../../components/Ads';
import WebTools from '../../components/WebTools';

const CommonPage = ({ name }) => {

    const isAdServe = JSON.parse(process.env.REACT_APP_PUBLIC_SERVE_ADS)

    const [file, setFile] = useState(null)

    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0])
    }, []);
    const urlRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'application/pdf',
        multiple: false
    });
    const [linkUploadClicked, setLinkUploadClicked] = useState(false);
    const [url, setUrl] = useState("");
    const [showProgress, setShowProgress] = useState(false);
    const [progressValue, setProgressValue] = useState(50);
    const [compressedFile, setCompressedFile] = useState("");

    const urlUploadHandle = (e) => {
        e.stopPropagation();
        setLinkUploadClicked(!linkUploadClicked);
        setUrl("");
    }

    const urlSubmitHandle = (e) => {
        e.stopPropagation();
        if (urlRegex.test(url) || !url) {
            setUrl("");
            setShowProgress(false);
            alert("Enter Valid URL");
            return;
        }
        setShowProgress(true);
        setUrl("");
    }

    const handleCompress = async () => {
        let pdfBytes;
        if (file) {
            pdfBytes = await file.arrayBuffer();
        } else if (url) {
            const response = await fetch(url);
            pdfBytes = await response.arrayBuffer();
        } else {
            return;
        }

        const pdfDoc = await PDFDocument.load(pdfBytes);

        const pages = pdfDoc.getPages();
        for (const page of pages) {
            const images = page.node.Resources?.XObject;

            if (images) {
                for (const [, image] of Object.entries(images)) {
                    const imageData = await pdfDoc.embedPng(image?.bytes || image);
                    const compressedImage = await compressImageUsingCanvas(imageData, progressValue);
                    const compressedImageEmbed = await pdfDoc.embedPng(compressedImage);
                    page.drawImage(compressedImageEmbed, {
                        x: page.getWidth() / 2 - compressedImageEmbed.width / 2,
                        y: page.getHeight() / 2 - compressedImageEmbed.height / 2,
                    });
                }
            }
        }
        const compressedPdfBytes = await pdfDoc.save();
        setCompressedFile(new Blob([compressedPdfBytes], { type: 'application/pdf' }));
    };

    const compressImageUsingCanvas = async (imageData, compressionLevel) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = URL.createObjectURL(new Blob([imageData], { type: 'image/png' }));

        return new Promise((resolve) => {
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                canvas.toBlob(
                    (compressedBlob) => {
                        resolve(compressedBlob);
                    },
                    'image/jpeg',
                    compressionLevel / 100
                );
            };
        });
    };



    const handleDownload = () => {
        if (compressedFile) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(compressedFile);
            link.download = 'compressed.pdf';
            link.click();
            setFile(null);
            setLinkUploadClicked(false);
            setShowProgress(false)
            setCompressedFile(null);
        }
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue h-full'>
            <CommonPageHeader />
            {isAdServe && <Ads slot='' className="mx-10 my-5" />}
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>PDF Compressor</h1>
            <div className='pb-16 pt-2'>
                <div
                    className={`w-[90%] h-[400px] bg-darkBlue p-20 text-center mx-auto text-white flex flex-col justify-center items-center gap-14 dark:border-[1px] dark:border-dashed`}
                    {...getRootProps()}
                >
                    <input accept='.pdf' {...getInputProps()} />
                    {
                        isDragActive ? (
                            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold '>Drop the files here...</p>
                        ) : (
                            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold '>{file ? file.name : "Drag and drop files here, or click to select files"}</p>
                        )
                    }
                    {!linkUploadClicked && !showProgress &&
                        <div className='flex justify-center items-center gap-5'>
                            {

                                file ?
                                    <div className='flex justify-center items-center gap-5'>
                                        <button
                                            className='border-[1px] border-solid border-gray500 bg-[transparent] text-[#4ca49f] hover:bg-[#4ca49f] hover:text-white px-5 py-[14px] sm:py-3 flex justify-center items-center gap-3 rounded text-xs sm:text-base'
                                            onClick={() => { setFile(null); setShowProgress(false) }}
                                            title='Remove File'
                                        >
                                            Remove File
                                        </button>
                                        <button
                                            className='border-[1px] border-solid border-gray500 bg-[#4ca49f] text-[white] hover:bg-[transparent] hover:text-[#4ca49f] px-5 py-[14px] sm:py-3 flex justify-center items-center gap-3 rounded text-xs sm:text-base'
                                            title='Compress File'
                                            onClick={() => setShowProgress(true)}
                                        >
                                            Compress File
                                        </button>
                                    </div>
                                    :
                                    <button
                                        className='border-[1px] border-solid border-gray500 bg-[transparent] text-[#4ca49f] hover:bg-[#4ca49f] hover:text-white px-5 py-[14px] sm:py-3 flex justify-center items-center gap-3 rounded text-xs sm:text-base'
                                        onClick={() => document.querySelector('input[type="file"]').click()}
                                        title='Choose File'
                                    >
                                        Choose File
                                    </button>

                            }
                            {
                                !file && <button
                                    className='border-[1px] border-solid border-gray500 bg-[transparent] text-[white] hover:bg-[#4ca49f] hover:text-[white] p-2 px-3 flex justify-center items-center gap-3 rounded'
                                    title='Upload From Web URL'
                                    onClick={urlUploadHandle}
                                >
                                    <PiLinkBold fontSize={30} />
                                </button>
                            }
                        </div>
                    }
                    {linkUploadClicked && !showProgress && <div className='flex justify-center items-center border border-gray500'>
                        <div className='h-full p-2'>
                            <TbWorldWww className='' fontSize={28} />
                        </div>
                        <input type="text" placeholder='Paste Link Here...' className='p-2 w-52 h-full text-black outline-none' autoFocus value={url} onChange={(e) => setUrl(e.target.value)} />
                        <button onClick={urlUploadHandle} className='bg-[red] h-full px-3'><RxCross2 /></button>
                        <button onClick={urlSubmitHandle} className='bg-[green] h-full px-3'><FaCheck /></button>
                    </div>}

                    {
                        showProgress &&
                        <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] flex flex-col justify-center items-center gap-5' >
                            <div className='w-full flex justify-center items-center gap-5'>
                                <Slider defaultValue={50} aria-label='default' valueLabelDisplay='auto' value={progressValue} onChange={(e) => setProgressValue(Number(e.target.value))} />
                                <input type="number" className='w-12 text-white outline-none border-none border-b-2 bg-[transparent]' min={0} max={100} value={progressValue} onChange={(e) => setProgressValue(Number(e.target.value))} />
                            </div>
                            <button className='bg-lightBlue px-5 py-2 rounded-lg text-lg' onClick={handleCompress}>Compress File</button>
                            <p>Your file size can reduced up to {progressValue}% of your origional Size</p>
                        </div>
                    }
                    {
                        compressedFile && <button className='bg-lightBlue px-5 py-2 rounded-lg text-lg' onClick={handleDownload}>Download File</button>
                    }
                </div>
            </div>
            {isAdServe && <Ads slot='' className="mx-10" />}
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default CommonPage