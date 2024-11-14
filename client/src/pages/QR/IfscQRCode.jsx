import React, { useRef, useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import sampleQR from '../../assets/images.png'
import { QRCodeCanvas } from 'qrcode.react';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const IfscQRCode = () => {

    const canvasRef = useRef(null);
    const [account, setAccount] = useState({
        name: "",
        AcNumber: "",
        ifsc: ""
    })

    const [qrValue, setQRValue] = useState("");

    const generate = () => {
        const linkToQR = `upi://pay?pa=${account.AcNumber}@bank&pn=${account.name}&am=0.00&tn=IFSC:${account.ifsc}`;
        setQRValue(linkToQR);
        setAccount({
            name: "",
            AcNumber: "",
            ifsc: ""
        })
    }

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');

        link.href = canvas.toDataURL('image/png');
        link.download = 'qrcode.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setAccount({
            name: "",
            AcNumber: "",
            ifsc: ""
        })
        setQRValue("")
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>IFSC Code For Indian Bank Details</h1>
            <p className='text-center text-gray500 my-5'>Easily IFSC Code For Indian Bank Details online for free.</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 m-10'>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <p className='font-medium text-xl dark:text-white'>Account Name : </p>
                    <input
                        type="text"
                        className='w-[90%] sm:w-[80%] mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                        value={account.name}
                        onChange={(e) => setAccount({ ...account, name: e.target.value })}
                    />
                    <p className='font-medium text-xl dark:text-white'>Account Number : </p>
                    <input
                        type="text"
                        className='w-[90%] sm:w-[80%] mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                        value={account.AcNumber}
                        onChange={(e) => setAccount({ ...account, AcNumber: e.target.value })}
                    />
                    <p className='font-medium text-xl dark:text-white'>IFSC : </p>
                    <input
                        type="text"
                        className='w-[90%] sm:w-[80%] mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                        value={account.ifsc}
                        onChange={(e) => setAccount({ ...account, ifsc: e.target.value })}
                    />
                    <button className={`${!account.name || !account.AcNumber || !account.ifsc ? "bg-gray500" : "bg-lightBlue"} text-white rounded-lg  px-4 py-2`} disabled={!account.name || !account.AcNumber || !account.ifsc} onClick={generate}>Generate Barcode</button>
                </div>
                <div className='flex flex-col justify-center items-center gap-5'>
                    {
                        qrValue ?
                            <>
                                <p className='font-medium text-xl dark:text-white'>Generated QR Code</p>
                                <QRCodeCanvas
                                    ref={canvasRef}
                                    value={qrValue}
                                    size={256}
                                />
                                <button className='bg-lightBlue text-white px-4 py-2 rounded-lg' onClick={handleDownload}>Download QR</button>
                            </>
                            : <img src={sampleQR} className='w-64 h-64' alt="IFSC Code QR" />
                    }
                </div>
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default IfscQRCode