import React, { useState } from 'react'
import CommonPageHeader from '../components/CommonPageHeader'
import FreeTools from '../components/FreeTools'
import Ads from '../components/Ads';
import WebTools from '../components/WebTools';

const WebScreenshot = () => {

    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageType, setImageType] = useState('');
    const isAdserve = JSON.parse(process.env.REACT_APP_PUBLIC_SERVE_ADS)

    const handleScreenshot = async (type) => {
        setLoading(true);
        if (!url) {
            alert("Please Enter Valid URL");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/screenshot?url=${url}&type=${imageType}`,
                {
                    method: "POST",
                }
            );
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: `image/${imageType}` });
            setImage(URL.createObjectURL(blob));
            setUrl("");
            setLoading(false);
        } catch (error) {
            alert(`Error taking Screenshot : ${error.message}`)
            setUrl("");
            setLoading(false);
        }
    }

    const jpgHandle = () => {
        setImageType('jpg')
        handleScreenshot();
    }

    const pngHandle = () => {
        setImageType('png')
        handleScreenshot();
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `screenshot.${imageType}`;
        link.click();
        link.remove();
    }

    return (
        <div className='dark:bg-darkBlue mt-[72px]'>
            <CommonPageHeader />
            {isAdserve && <Ads slot='' className={"mx-10 mt-5"} />}
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Website Screenshot Generator</h1>
            <p className='text-center text-gray500 my-5'>Free AI based tools to generate website screenshots.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <input
                    type="text"
                    placeholder='Enter URL...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            {
                loading ?
                    <p className='text-center text-2xl dark:text-white my-5'>Please Wait .... </p>
                    :
                    <div className='flex flex-col justify-center items-center gap-3 my-5'>
                        <div className='flex flex-wrap justify-center items-center gap-3'>
                            <button disabled={!url} className={`px-5 py-2 text-white rounded-lg ${!url ? "bg-gray500" : "bg-lightBlue hover:bg-white hover:text-lightBlue"}`} onClick={jpgHandle}>{loading ? "Taking Screenshot" : "Take Screenshot In JPG"}</button>
                            <button disabled={!url} className={`px-5 py-2 text-white rounded-lg ${!url ? "bg-gray500" : "bg-lightBlue hover:bg-white hover:text-lightBlue"}`} onClick={pngHandle}>Take Screenshot In PNG</button>
                        </div>
                    </div>
            }
            {
                image &&
                <div className='flex flex-col justify-center items-center gap-5 mt-10'>
                    <div className='flex justify-center items-center gap-10'>
                        <button onClick={handleDownload} className='px-5 py-2 bg-lightBlue text-white hover:bg-white hover:text-lightBlue rounded-lg'>Download Screenshot</button>
                    </div>
                    <img src={image} alt="screenshot" className='mx-auto' />
                </div>
            }
            {isAdserve && <Ads slot='' className={"mx-10"} />}
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default WebScreenshot
