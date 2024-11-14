import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import WebTools from '../../components/WebTools';

const ImageToAnyImageType = ({ type }) => {

    const [imgURL, setImgURL] = useState("");
    const [file, setFile] = useState(null);
    const [convertedImageUrl, setConvertedImageUrl] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const Url = URL.createObjectURL(file);
        setImgURL(Url)
    };

    const convert = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = async () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL(`image/${type}`);
                setConvertedImageUrl(dataURL);
            }
        }
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = convertedImageUrl;
        link.download = `converted.${type}`
        link.click();
        link.remove();
        setFile(null);
        setImgURL('');
        setConvertedImageUrl('');
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />I
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>
                <span className='uppercase'>{type}</span><span> Converter</span>
            </h1>
            <p className='text-center text-gray500 my-5'>Easily convert image to <span className='uppercase'>{type}</span> online for free</p>
            <input type="file" accept='image/*' onChange={handleFileChange} className='hidden' />
            <div className='flex justify-center items-center'>
                <button className=' mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
            </div>
            {imgURL && !convertedImageUrl && <div className='flex justify-center items-center mt-5'>
                <button className='bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={convert}>Convert To {type.toUpperCase()}</button>
            </div>}
            <div className={`bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] ${imgURL ? "h-auto" : "h-[500px]"} mx-auto mt-10 ${imgURL ? "border-none" : "border-[1px] shadow-custom"} border-gray200`}>
                {imgURL && !convertedImageUrl && <img src={imgURL} alt={type} className='mx-auto' />}
                {
                    convertedImageUrl &&
                    <div className='flex flex-col justify-center items-center gap-5 dark:bg-darkBlue dark:text-white'>
                        <p className='text-xl'>Converted Image</p>
                        <img src={convertedImageUrl} alt={type} className='mx-auto' />
                        <button className='bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={handleDownload}>Download File</button>
                    </div>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default ImageToAnyImageType