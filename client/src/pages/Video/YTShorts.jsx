import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const YTShorts = () => {

    const [link, setLink] = useState("");
    const [ytShorts, setYTShorts] = useState("");

    const getShorts = async () => {
        try {
            const videoId = new URL(link).pathname.split('/').pop();
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=1LvEHlPeg1s&key=${process.env.REACT_APP_YT_API_KEY}`);
            const data = await response.json();
            console.log("Res : ", data)

            if (data.items.length > 0) {
                setYTShorts(data.items[0].snippet);
            } else {
                alert('Video not found. Please check the URL.');
            }
        } catch (error) {
            console.log('Error fetching video info. Please try again.');
        }
    }

    const handleDownload = () => { }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>YouTube Shorts Downloader</h1>
            <p className='text-center text-gray500 my-5'>Easily download youtube shorts online for free.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <p className='text-center dark:text-white'>Enter Shorts Link : </p>
                <input
                    type='text'
                    placeholder='Paste Link Here ...'
                    className='w-full border-2 border-lightBlue outline-none rounded-full p-2'
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button disabled={!link} className={`${link ? "bg-lightBlue" : "bg-gray600"} text-white px-4 py-2 rounded-lg`} onClick={getShorts}>Get Shorts</button>
                {
                    ytShorts &&
                    <>
                        <video src={ytShorts} controls></video>
                        <button className='bg-lightBlue text-white rounded-lg px-4 py-2' onClick={handleDownload}>Download</button>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default YTShorts