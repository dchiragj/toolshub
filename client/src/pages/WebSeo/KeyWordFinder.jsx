import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import { GoogleGenerativeAI } from '@google/generative-ai';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import CopyToClipboard from 'react-copy-to-clipboard';

const KeyWordFinder = () => {

    const [text, setText] = useState("");
    const [keyWord, setKeyWord] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copy, setCopy] = useState(false);

    if (copy) {
        alert("Copied to clipboard successfully.");
        setCopy(false);
    }

    const findKeyword = async () => {
        try {
            setLoading(true);
            const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Find keywords for ${text} for SEO and give only and only list of keyword with comma seperated , not any other description like title and any other description is not required`;

            const result = await model.generateContent(prompt);
            if (result) {
                setKeyWord(result.response.text());
                setLoading(false)
            }
        } catch (error) {
            console.log("Error : ", error);
            setLoading(false);
        }
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Keyword finder</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <p className='text-center text-black my-5 text-lg md:text-2xl font-medium dark:text-white'>SEO Keyword Idea Generator / Suggestion Tool</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <input
                    type='url'
                    placeholder='Enter Text to find keyword ...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></input>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <button className={`px-5 py-2 ${!text ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!text} onClick={findKeyword}>Find Keyword</button>
            </div>
            {
                loading &&
                <p className='text-xl text-center dark:text-white font-semibold mt-5'>Loading ....</p>
            }
            {
                keyWord && !loading &&
                <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto mt-5 flex flex-col justify-center items-center gap-5 dark:text-white'>
                    <p className='font-semibold text-xl'>Result :</p>
                    {keyWord}
                    <div className='flex flex-wrap justify-center items-center gap-5'>
                        <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`} onClick={findKeyword}>Regenerate</button>
                        <CopyToClipboard text={keyWord} onCopy={() => setCopy(true)}>
                            <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`}>Copy</button>
                        </CopyToClipboard>
                        <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`} disabled={!text} onClick={() => { setText(""); setKeyWord(null) }}>Reset</button>
                    </div>
                </div>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default KeyWordFinder