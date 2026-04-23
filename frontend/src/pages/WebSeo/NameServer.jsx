import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import axios from 'axios';

const NameServer = () => {

    const [domain, setDomain] = useState("");
    const [data, setData] = useState([]);

    const lookUp = async () => {
        try {
            const response = await axios.get(`https://cloudflare-dns.com/dns-query`, {
                params: {
                    name: domain,
                    type: 'NS'
                },
                headers: {
                    'Accept': 'application/dns-json'
                }
            });
            setData(response.data.Answer);
        } catch (err) {
            console.log('Failed to fetch nameservers');
        }
    };

    return (
        <div className='mt-[72px] dark:bg-[#0f172a]'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Nameserver Lookup Tool</h1>
            <p className='text-center text-gray-500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <input
                    type='text'
                    placeholder='Enter Domain ...'
                    className='w-full border-2 outline-none border-[#1A8FE3] p-2 px-5 rounded-full text-black dark:text-white dark:bg-[#0f172a] dark:border-white'
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                ></input>
                <button className={`${domain ? "bg-[#1A8FE3]" : "bg-gray-500"} rounded-lg px-4 py-2 text-white`} disabled={!domain} onClick={lookUp}>Look Up</button>
                {
                    data.length > 0 &&
                    <>
                        <p className='text-xl font-medium dark:text-white'>NameServers for {domain}</p>
                        {
                            data?.map((item, index) =>
                                <p key={index} className='dark:text-white'>{index + 1}. {item.data}</p>
                            )
                        }
                        <button className={`bg-[#1A8FE3] rounded-lg px-4 py-2 text-white`} onClick={() => { setDomain(""); setData([]) }}>Rest</button>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default NameServer