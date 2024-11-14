import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import WebTools from '../../components/WebTools';

const AnyDownloader = ({ title }) => {

    const [url, setUrl] = useState('');
    const [videoURL, setVideoURL] = useState('');
    const [media, setMedia] = useState("");

    const fbDownloader = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/fb-video-download`, { url });
            const data = response.data;
            setVideoURL(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const xDownloader = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/x-video-download`, { url }, {
                responseType: 'blob', // Important for handling binary data
            });
            alert("Hello")

            const urls = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = urls;
            link.setAttribute('download', 'video.mp4'); // Default filename
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error: ', error);
            alert('Error downloading video');
        }
    }

    const linkedinDownloader = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/linkedin-video-download?url=${url}`);
            setVideoURL(response.data.videoUrl);
        } catch (err) {
            console.error('Error:', err);
            alert('Error fetching video');
        }
    }

    const titktokDownloader = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tiktok-video-download?url=${url}`);
            setVideoURL(response.data.videoUrl);
        } catch (err) {
            console.error('Error:', err);
            alert('Error fetching video');
        }
    }

    const getFromLink = () => {
        switch (title) {
            case "Facebook":
                fbDownloader();
                break;

            case "X":
                xDownloader();
                break;

            case "LinkedIn":
                linkedinDownloader();
                break;

            case "TikTok":
                titktokDownloader();
                break;

            default:
                break;
        }
    }

    const download = () => {
        const link = document.createElement('a');
        link.href = videoURL;
        link.download = 'thumbnail.mp4';
        link.click();
        link.remove()
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>{title} Video Downloader</h1>
            <p className='text-center text-gray500 my-5'>Download from link!</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <input
                    type="text"
                    placeholder={`Enter ${title} URL...`}
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white accent-lightBlue'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <div className='flex justify-center items-center gap-10 mt-5'>
                <button disabled={!url} className={`px-5 py-2 ${!url ? "bg-gray500" : "bg-lightBlue"} text-white rounded-lg flex justify-center items-center gap-2`} onClick={getFromLink}>
                    <span><FaSearch /></span> Get
                </button>
            </div>
            {videoURL && <video controls src={videoURL}></video>}
            {/* <a href={thumbnailUrl} download={"thumbnail.jpg"}>download</a> */}
            <button onClick={download}>Download</button>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default AnyDownloader