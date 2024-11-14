import React, { useRef, useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import { QRCodeCanvas } from 'qrcode.react';
import WebTools from '../../components/WebTools';

const ImgToQR = () => {

    const canvasRef = useRef(null);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState("");
    const [qrValue, setQrValue] = useState("");

    const fileChangeHandle = (e) => {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const generateQrCode = () => {
        setQrValue(image);
        setImage("");
    }

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setFile(null)
        setQrValue("")
        setImage("")
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Image to QR Code Converter</h1>
            <p className='text-center text-gray500 my-5'>Easily convert image to qr code online for free.</p>
            <input type="file" accept='image/*' className='hidden' onChange={fileChangeHandle} />
            <div className='flex justify-center items-center'>
                <button className='bg-lightBlue text-white px-6 py-3 rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
            </div>
            <div className={`bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] ${image || qrValue ? "h-auto border-none" : "h-[500px] border-[1px] shadow-custom"} mx-auto mt-10 border-gray200`}>
                <div className='flex flex-col justify-center items-center gap-5'>
                    {
                        image && !qrValue &&
                        <>
                            <img src={image} alt="Image" />
                            <button className='bg-lightBlue text-white rounded-lg px-4 py-2' onClick={generateQrCode}>Generate QR Code</button>
                        </>
                    }
                    {
                        qrValue && !image &&
                        <>
                            <QRCodeCanvas
                                ref={canvasRef}
                                value={qrValue}
                                size={256}
                            />
                            <button className='bg-lightBlue text-white rounded-lg px-4 py-2' onClick={handleDownload}>Download QR</button>
                        </>
                    }
                </div>
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default ImgToQR