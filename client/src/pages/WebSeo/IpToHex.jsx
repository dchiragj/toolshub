import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import CopyToClipboard from 'react-copy-to-clipboard';

const IpToHex = () => {
    const [hex, setHex] = useState('');
    const [ip, setIp] = useState('');
    const [copy, setCopy] = useState(false);

    if (copy) {
        alert("Copied to clipboard Successfully.")
        setCopy(false);
        setHex("");
        setIp("");
    }

    const convert = () => {
        const parts = ip.split('.');
        if (parts.length !== 4 || parts.some(part => isNaN(part) || part < 0 || part > 255)) {
            alert('Invalid IP address. Please enter a valid IPv4 address.');
            return;
        }
        const hexParts = parts.map(part => {
            const hex = Number(part).toString(16).padStart(2, '0');
            return hex;
        });
        setHex(hexParts.join(''));
        setIp("");
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Ip to Hex Converter</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <input
                    type='url'
                    placeholder='Enter IP address ...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                ></input>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <button className={`px-5 py-2 ${!ip ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!ip} onClick={convert}>Convert to Hex</button>
            </div>
            {
                hex &&
                <div className='flex flex-col justify-center items-center gap-5'>
                    <p className='dark:text-white text-center my-5 font-semibold text-2xl'>HEX : {hex}</p>
                    <CopyToClipboard text={hex} onCopy={() => setCopy(true)}>
                        <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`}>Copy</button>
                    </CopyToClipboard>
                </div>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default IpToHex