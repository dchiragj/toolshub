import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import { Html5Qrcode } from 'html5-qrcode';
import { BrowserMultiFormatReader } from '@zxing/library';
import CopyToClipboard from 'react-copy-to-clipboard';
import WebTools from '../../components/WebTools';

const BarcodeQRScanner = () => {

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [result, setResult] = useState("");
    const [copy, setCopy] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImage(URL.createObjectURL(file))
    };

    const handleRead = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imageSrc = e.target.result;
                const isBarcodeResult = await isBarcode(imageSrc);
                if (isBarcodeResult) {
                    setResult(isBarcodeResult);
                } else {
                    const qrResult = await scanQrCode(imageSrc);
                    setResult(qrResult);
                }
            };
            reader.readAsDataURL(file);
            setImage("");
        }
    }

    const isBarcode = async (imageSrc) => {
        const codeReader = new BrowserMultiFormatReader();
        try {
            const result = await codeReader.decodeFromImage(undefined, imageSrc);
            return result.text;
        } catch (err) {
            return false;
        }
    };

    const scanQrCode = async (imageSrc) => {
        const html5QrCode = new Html5Qrcode("reader");
        try {
            const result = await html5QrCode.scanFile(imageSrc, true);
            return result;
        } catch (err) {
            console.error(err);
            return 'No QR code found';
        }
    };

    const handleReset = () => {
        setImage(null);
        setFile(null);
        setResult("");
    }

    if (copy) {
        alert("Copied to Clipboard")
        setCopy(false);
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Barcode / QR Code Scanner</h1>
            <p className='text-center text-gray500 my-5'>Easily Barcode / QR Code Scanner online for free.</p>
            <input type="file" accept='image/*' className='hidden' onChange={handleFileChange} />
            <div className='flex justify-center items-center'>
                <button className='bg-lightBlue text-white px-6 py-3 rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
            </div>
            <div className={`bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] ${image || result ? "h-[400px] border-none" : "h-[500px] border-[1px] shadow-custom"} mx-auto mt-10 border-gray200 flex flex-col justify-center items-center gap-5`}>
                {
                    image && !result &&
                    <>
                        <img src={image} alt="Image" />
                        <button className='bg-lightBlue text-white rounded-lg px-4 py-2' onClick={handleRead}>Read Barcode / QR</button>
                    </>
                }
                {
                    result && !image &&
                    <>
                        <p className='font-semibold text-2xl'> Result : </p>
                        <p className=''>{result}</p>
                        <div className='flex justify-center items-center gap-5'>
                            {
                                result &&
                                <CopyToClipboard text={result} onCopy={() => setCopy(true)}>
                                    <button className='bg-lightBlue text-white rounded-lg px-4 py-2 text-xl'>Copy Result</button>
                                </CopyToClipboard>
                            }
                            <button className='bg-lightBlue text-white rounded-lg px-4 py-2 text-xl' onClick={handleReset}>Reset</button>
                        </div>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default BarcodeQRScanner