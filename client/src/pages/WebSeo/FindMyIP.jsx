import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import WebTools from '../../components/WebTools'

const FindMyIP = () => {

    const [ip, setIp] = useState("");

    const findIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            if (!response.ok) {
                throw new Error('Failed to fetch IP address');
            }
            const data = await response.json();
            setIp(data.ip);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Find My IP</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='flex justify-center items-center mt-5'>
                <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`} onClick={findIP}>Find My IP</button>
            </div>
            {
                ip &&
                <p className='dark:text-white text-center mt-5'>Your IP Address : {ip}</p>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default FindMyIP