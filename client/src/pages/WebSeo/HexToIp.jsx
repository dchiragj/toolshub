import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const HexToIp = () => {

    const [hex, setHex] = useState('');
    const [ip, setIp] = useState('');

    const convert = () => {
        const hexs = hex.trim();
        if (hexs.length !== 8) {
            alert('Please enter 8 digit hex value');
            return;
        }

        const parts = [];
        for (let i = 0; i < 8; i += 2) {
            parts.push(parseInt(hexs.substr(i, 2), 16));
        }
        const ips = parts.join('.');
        setIp(ips);
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Hex to IP Converter</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <input
                    type='url'
                    placeholder='Enter Hex ...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                ></input>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <button className={`px-5 py-2 ${!hex ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!hex} onClick={convert}>Convert to IP</button>
            </div>
            {
                ip &&
                <p className='dark:text-white text-center my-5'>IP Address : {ip}</p>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default HexToIp