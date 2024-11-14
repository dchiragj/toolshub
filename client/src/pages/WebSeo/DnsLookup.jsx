import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import WebTools from '../../components/WebTools';
import FreeTools from '../../components/FreeTools';

const DnsLookup = () => {

    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);

    const getDns = async () => {
        try {
            const response = await fetch(`https://dns.google/resolve?name=${url}`);
            const data = await response.json();
            const organizedData = organizeDNSData(data);
            if (!response.ok) {
                throw new Error(data.error);
            }
            setResult(organizedData);
            setUrl("");
        } catch (err) {
            console.log(err.message);
        }
    };

    const organizeDNSData = (data) => {
        const records = {
            CNAME: [],
            A: [],
            AAAA: [],
            CAA: [],
            MX: [],
            TXT: [],
            SRV: [],
            NS: []
        };

        if (data.Answer) {
            data.Answer.forEach((record) => {
                switch (record.type) {
                    case 1:
                        records.A.push(record);
                        break;
                    case 5:
                        records.CNAME.push(record);
                        break;
                    case 28:
                        records.AAAA.push(record);
                        break;
                    case 257:
                        records.CAA.push(record);
                        break;
                    case 15:
                        records.MX.push(record);
                        break;
                    case 16:
                        records.TXT.push(record);
                        break;
                    case 33:
                        records.SRV.push(record);
                        break;
                    case 2:
                        records.NS.push(record);
                        break;
                    default:
                        break;
                }
            });
        }

        return records;
    };

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>DNS Lookup</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto'>
                <input
                    type='url'
                    placeholder='Enter Domain ...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                ></input>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <button className={`px-5 py-2 ${!url ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!url} onClick={getDns}>Submit</button>
            </div>
            {result && (
                <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5 mt-5 dark:text-white'>
                    <h3 className='font-semibold'>DNS Data : </h3>
                    <p>{JSON.stringify(result, null, 2)}</p>
                </div>
            )}
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default DnsLookup