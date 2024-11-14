import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';

const LinkShortener = () => {

    const [url, setURL] = useState("");
    const [shortURL, setShortURL] = useState("");
    const [copy, setCopy] = useState(false);

    if (copy) {
        alert("Copied to clipboard Successfully.");
        setCopy(false);
    }

    const handleShortURL = async () => {
        alert(process.env.REACT_APP_TINY_URL)
        try {
            const response = await axios.post('https://api.tinyurl.com/create', {
                url: url,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_TINY_URL}`,
                },
            });
            setShortURL(response.data.data.tiny_url);
        } catch (error) {
            console.log('Error creating shortened URL:', error);
        }
    }

    console.log('shortURL', shortURL);

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Link Shortener</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <p className='text-center text-black my-5 text-lg md:text-2xl font-medium dark:text-white'>SEO Keyword Idea Generator / Suggestion Tool</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <input
                    type='url'
                    placeholder='Enter URL ...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                ></input>
            </div>
            <div className='flex flex-col justify-center items-center mt-5 gap-5 dark:text-white'>
                <button className={`px-5 py-2 ${!url ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!url} onClick={handleShortURL}>Shorten URL</button>
                {
                    shortURL &&
                    <>
                        <p className='font-semibold text-xl'>Shorten URL : </p>
                        <p>{shortURL}</p>
                        <div className='flex justify-center items-center gap-5'>
                            <CopyToClipboard text={shortURL} onCopy={() => setCopy(true)}>
                                <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`}>Copy</button>
                            </CopyToClipboard>
                            <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`} onClick={() => { setURL(""); setShortURL(""); setCopy(false) }}>Reset</button>
                        </div>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default LinkShortener