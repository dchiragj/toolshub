import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const YTLogo = () => {

    const [channelId, setChannelId] = useState("");
    const [ytLogo, setYTLogo] = useState("");

    const getLogo = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_YT_API_KEY}`);
            const data = await response.json();

            if (data.items.length > 0) {
                setYTLogo(data.items[0].snippet.thumbnails.default.url);
                setChannelId("");
            } else {
                alert('Channel not found. Please check the Channel ID.');
            }
        } catch (error) {
            console.log('Error fetching channel logo. Please try again.');
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = ytLogo;
        link.download = 'ytLogo.png';
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link)
        setChannelId("");
        setYTLogo("");
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Download YouTube Logo</h1>
            <p className='text-center text-gray500 my-5'>Easily download youtube channel logo online for free.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <p className='text-center dark:text-white'>Enter Channel ID : </p>
                <input
                    type='text'
                    placeholder='Channel Id'
                    className='w-full border-2 border-lightBlue outline-none rounded-full p-2'
                    value={channelId}
                    onChange={(e) => setChannelId(e.target.value)}
                />
                <button disabled={!channelId} className={`${channelId ? "bg-lightBlue" : "bg-gray600"} text-white px-4 py-2 rounded-lg`} onClick={getLogo}>Get Logo</button>
                {
                    ytLogo &&
                    <>
                        <img src={ytLogo} alt="YouTube Logo" className='w-[200px]' />
                        <button className='bg-lightBlue text-white rounded-lg px-4 py-2' onClick={handleDownload}>Download</button>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default YTLogo