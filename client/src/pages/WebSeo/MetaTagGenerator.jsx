import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import CopyToClipboard from 'react-copy-to-clipboard';

const MetaTagGenerator = () => {

    const metaObj = {
        description: '',
        keywords: '',
        author: '',
        language: '',
        country: '',
        robots: ''
    }

    const [metaDetails, setMetaDetails] = useState(metaObj);
    const [generatedMeta, setGeneratedMeta] = useState(null);
    const [copy, setCopy] = useState(false);

    if (copy) {
        alert("Copied to clipboard successfully.")
        setCopy(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMetaDetails({ ...metaDetails, [name]: value });
    }

    const generateMeta = () => {
        let metaTags = '';

        Object.keys(metaDetails).forEach((key) => {
            metaTags += `<meta name="${key}" content="${metaDetails[key]}" />\n\n`;
        });

        setGeneratedMeta(metaTags);
    };

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Meta Tags Generator</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-3'>
                <p className='dark:text-white font-semibold'>Description</p>
                <input
                    type='text'
                    name='description'
                    placeholder='Description'
                    className='w-full border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={metaDetails.description}
                    onChange={handleChange}
                ></input>
                <p className='dark:text-white font-semibold'>KeyWords</p>
                <input
                    type='text'
                    name='keywords'
                    placeholder='KeyWords'
                    className='w-full border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={metaDetails.keywords}
                    onChange={handleChange}
                ></input>
                <p className='dark:text-white font-semibold'>Author</p>
                <input
                    type='text'
                    name='author'
                    placeholder='Author'
                    className='w-full border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={metaDetails.author}
                    onChange={handleChange}
                ></input>
                <p className='dark:text-white font-semibold'>KeyWords</p>
                <input
                    type='text'
                    name='language'
                    placeholder='Language'
                    className='w-full border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={metaDetails.language}
                    onChange={handleChange}
                ></input>
                <p className='dark:text-white font-semibold'>Country</p>
                <input
                    type='text'
                    name='country'
                    placeholder='Country'
                    className='w-full border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={metaDetails.country}
                    onChange={handleChange}
                ></input>
                <div className='flex justify-center items-center gap-3'>
                    <p className='dark:text-white font-semibold'>Robots : </p>
                    <select value={metaDetails.robots} name='robots' onChange={handleChange} className='border rounded-lg p-2 outline-none'>
                        <option value="">Select One</option>
                        <option value="all">All</option>
                        <option value="none">None</option>
                        <option value="index">Index</option>
                        <option value="no index">No Index</option>
                        <option value="follow">Follow</option>
                        <option value="no follow">No Follow</option>

                    </select>
                </div>
                <button className={`${metaDetails.description ? "bg-lightBlue" : "bg-gray600"} rounded-lg px-4 py-2 text-white mt-3`} disabled={!metaDetails.description} onClick={generateMeta}>Generate</button>
                {
                    generatedMeta &&
                    <div className='border border-gray200 shadow-custom flex flex-col justify-center items-center p-5 rounded-lg'>
                        {generatedMeta.split('\n').map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                        <div className='flex justify-center items-center gap-5'>
                            <CopyToClipboard text={generatedMeta} onCopy={() => setCopy(true)}>
                                <button className={`bg-lightBlue rounded-lg px-4 py-2 text-white mt-3`}>Copy</button>
                            </CopyToClipboard>
                            <button className={`bg-lightBlue rounded-lg px-4 py-2 text-white mt-3`} onClick={() => { setMetaDetails(metaObj); setGeneratedMeta(''); }}>Reset</button>
                        </div>
                    </div>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default MetaTagGenerator