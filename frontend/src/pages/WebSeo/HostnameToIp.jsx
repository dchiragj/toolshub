import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const HostnameToIp = () => {

    const [hostname, setHostName] = useState("");
    const [ip, setIp] = useState("");

    const convert = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dns-lookup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hostname }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            setIp(data.addresses);
            setHostName("");
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className='mt-[72px] dark:bg-[#0f172a]'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Hostname to IP Tool</h1>
            <p className='text-center text-gray-500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <input
                    type='url'
                    placeholder='Enter Hostname ...'
                    className='w-full border-2 outline-none border-[#1A8FE3] p-3 px-5 rounded-full text-black dark:text-white dark:bg-[#0f172a] dark:border-white'
                    value={hostname}
                    onChange={(e) => setHostName(e.target.value)}
                ></input>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <button className={`px-5 py-2 ${!hostname ? "bg-gray-500" : "bg-[#1A8FE3]"} text-white rounded-lg`} disabled={!hostname} onClick={convert}>Get IP Address</button>
            </div>
            {
                ip &&
                <p className='font-semibold dark:text-white text-center mt-5'>IP Address : {ip}</p>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default HostnameToIp