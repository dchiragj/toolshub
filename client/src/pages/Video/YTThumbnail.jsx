import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const YTThumbnail = () => {

    const [url, setUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const getFromLink = async () => {
        const videoId = url.split('v=')[1];
        const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        setThumbnailUrl(thumbnail);
        setUrl('');
    }

    const download = () => {
        const link = document.createElement('a');
        link.target = '_blank'
        link.href = thumbnailUrl;
        link.download = 'thumbnail.jpg';
        link.click();
        link.remove();
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>YouTube Thumbnail Downloader</h1>
            <p className='text-center text-gray500 my-5'>Easily download thumbnails from youtube online for free.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <input
                    type="text"
                    placeholder='Enter YouTube URL...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <div className='flex justify-center items-center gap-10 mt-5'>
                <button disabled={!url} className={`px-5 py-2 ${!url ? "bg-gray500" : "bg-lightBlue hover:bg-white hover:text-lightBlue"} text-white rounded-lg flex justify-center items-center gap-2`} onClick={getFromLink}>
                    Get Thumbnail
                </button>
            </div>
            {
                thumbnailUrl &&
                <div className='my-5 flex flex-col justify-center items-center gap-5'>
                    <img src={thumbnailUrl} alt="Thumbnail" className='mx-auto' />
                    <button className='px-5 py-2 bg-lightBlue text-white rounded-lg' onClick={download}>Download Thumbnail</button>
                </div>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default YTThumbnail