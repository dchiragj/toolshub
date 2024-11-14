import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const IpDomainLocation = () => {

    const [domain, setDomain] = useState("");
    const [details, setDetails] = useState(null);

    const getLocation = async () => {
        try {
            const response = await fetch(`http://ip-api.com/json/${domain}`);
            const data = await response.json();
            if (data.status === 'fail') {
                alert('Invalid IP address or domain.');
                setDetails(null);
            } else {
                setDetails({ domain, ...data });
                setDomain("");
            }
        } catch (err) {
            console.log('Error fetching location. Please try again.');
        }
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>IP Address / Domain Location Finder</h1>
            <p className='text-center text-gray500 my-5'>Analyze your website seo with our online seo tools.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <input
                    type='url'
                    placeholder='Enter Domain or IP Address'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                ></input>
                <button className={`px-5 py-2 ${!domain ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!domain} onClick={getLocation}>Get Location</button>
                {
                    details &&
                    <div className='dark:text-white'>
                        <p><span className='font-semibold'>IP / Domain</span> : {details.domain}</p>
                        <p><span className='font-semibold'>Country</span> : {details.country}</p>
                        <p><span className='font-semibold'>City</span> : {details.city}</p>
                        <p><span className='font-semibold'>Country Code</span> : {details.countryCode}</p>
                        <p><span className='font-semibold'>Latitude</span> : {details.lat}</p>
                        <p><span className='font-semibold'>Longitude</span> : {details.lon}</p>
                        <p><span className='font-semibold'>Timezone</span> : {details.timezone}</p>
                        <p><span className='font-semibold'>Organization</span> : {details.org}</p>
                    </div>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default IpDomainLocation