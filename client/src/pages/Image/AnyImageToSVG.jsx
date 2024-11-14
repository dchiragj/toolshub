import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import Image from 'image-js'
import WebTools from '../../components/WebTools'

const AnyImageToSVG = () => {

    const [imgURL, setImgURL] = useState("");
    const [file, setFile] = useState(null);
    const [convertedImageUrl, setConvertedImageUrl] = useState("");
    const [svgContent, setSvgContent] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const Url = URL.createObjectURL(file);
        setImgURL(Url)
    };

    const convertSVG = async () => {
        const arrayBuffer = await file.arrayBuffer();
        const img = await Image.load(arrayBuffer);

        // Create a data URL from the file for embedding
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;

            // Basic conversion to SVG
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}">
                    <image href="${dataUrl}" width="${img.width}" height="${img.height}" />
                </svg>
            `;

            setSvgContent(svg);
            // setImageDataUrl(dataUrl); // Save the data URL for later use
        };

        reader.readAsDataURL(file);
    }

    const handleDownloadSVG = () => {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.svg';
        a.click();
        URL.revokeObjectURL(url);
        a.remove();
        setFile(null);
        setImgURL('');
        setConvertedImageUrl('');
        setSvgContent('')
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>SVG Converter</h1>
            <p className='text-center text-gray500 my-5'>Easily convert image to SVG online for free</p>
            <input type="file" accept='image/*' onChange={handleFileChange} className='hidden' />
            <div className='flex justify-center items-center'>
                <button className=' mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
            </div>
            {imgURL && !convertedImageUrl && !svgContent && <div className='flex justify-center items-center mt-5'>
                <button className='bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={convertSVG}>Convert To SVG</button>
            </div>}
            <div className={`${imgURL ? "bg-[transparent]" : "bg-white"} w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] ${imgURL ? "h-auto" : "h-[500px]"} mx-auto mt-10 ${imgURL ? "border-none" : "border-[1px] shadow-custom"} border-gray200`}>
                {imgURL && !convertedImageUrl && !svgContent && <img src={imgURL} alt={'svg'} className='mx-auto' />}
                {
                    svgContent && !convertedImageUrl &&
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <p className='text-xl dark:text-white'>Converted SVG</p>
                        <div dangerouslySetInnerHTML={{ __html: svgContent }}></div>
                        <button className='bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={handleDownloadSVG}>Download SVG FILE</button>
                    </div>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default AnyImageToSVG