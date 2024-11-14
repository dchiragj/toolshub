import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const HtAccess = () => {

    const [page1Url, setPage1Url] = useState("");
    const [page2Url, setPage2Url] = useState("");
    const [redirectURL, setRedirectURL] = useState("");

    const convert = () => {
        if (!page1Url || !page2Url) {
            alert('Please enter both page 1 and page 2 URLs.');
            return;
        }
        const rule = `<IfModule mod_rewrite.c> RewriteEngine On Redirect 301 ${page1Url} ${page2Url} </IfModule>`;
        setRedirectURL(rule);
        setPage1Url("");
        setPage2Url("");
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>HTACCESS Redirect Generator</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <input
                    type='url'
                    placeholder='Enter From Page URL /page-1 ...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={page1Url}
                    onChange={(e) => setPage1Url(e.target.value)}
                ></input>
                <input
                    type='url'
                    placeholder='Enter To Page URL /page-2 ...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={page2Url}
                    onChange={(e) => setPage2Url(e.target.value)}
                ></input>
                <button className={`px-5 py-2 ${!page1Url || !page2Url ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!page1Url || !page2Url} onClick={convert}>Generate HTACCESS Redirect</button>
            </div>
            {
                redirectURL &&
                <p className='text-center dark:text-white mt-5'>{redirectURL}</p>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default HtAccess