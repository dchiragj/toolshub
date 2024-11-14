import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import keywordExtractor from 'keyword-extractor';
import CopyToClipboard from 'react-copy-to-clipboard';

const AdKeywords = () => {

    const [description, setDescription] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [copy, setCopy] = useState(false);

    if (copy) {
        alert("Copied to clipboard Successfully.")
        setCopy(false);
    }

    const generateKeywords = () => {
        const extractionResult = keywordExtractor.extract(description, {
            language: 'english',
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: true,
        });

        setKeywords(extractionResult);
        setDescription("");
    }

    const handleReset = () => {
        setKeywords([]);
        setDescription("");
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Ad Keyword Generator</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <textarea
                    rows={5}
                    placeholder='Enter the product or service you are advertising and get a list of relevant keywords to use in your ad campaign:'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <button className={`px-5 py-2 ${!description ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!description} onClick={generateKeywords}>Generate Keywords</button>
            </div>
            {
                keywords.length > 0 &&
                <div className='flex flex-col justify-center items-center gap-5 mt-5'>
                    <p className='dark:text-white text-center font-semibold'>Results : </p>
                    <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                        {
                            keywords.join(", ")
                        }
                    </div>
                    <div className='flex justify-center items-center gap-5'>
                        <CopyToClipboard onCopy={() => setCopy(true)} text={keywords.join(", ")}>
                            <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`}>Copy</button>
                        </CopyToClipboard>
                        <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`} onClick={handleReset}>Reset</button>
                    </div>
                </div>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default AdKeywords