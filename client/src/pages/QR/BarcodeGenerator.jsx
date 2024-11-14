import React, { useRef, useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import WebTools from '../../components/WebTools';

const BarcodeGenerator = () => {

    const [text, setText] = useState("");
    const [barcodeValue, setbarcodeValue] = useState('');
    const barcodeRef = useRef(null);

    const generateBarCode = () => {
        setbarcodeValue(text);
        setText("");
    }

    const downloadBarCode = async () => {
        if (barcodeRef.current) {
            const canvas = await html2canvas(barcodeRef.current);
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'barcode.png';
            link.click();
            handleReset();
        }
    }

    const handleReset = () => {
        setText("");
        setbarcodeValue("");
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Barcode Generator</h1>
            <p className='text-center text-gray500 my-5'>Easily generate barcodes online for free.</p>
            <div className='flex flex-col justify-center items-center gap-5 my-10'>
                <p className='font-medium text-xl dark:text-white'>Enter Text : </p>
                <input
                    type="text"
                    placeholder='Enter text to generate barcode ...'
                    className='w-full sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className={`${!text ? "bg-gray500" : "bg-lightBlue"} text-white rounded-lg  px-4 py-2`} disabled={!text} onClick={generateBarCode}>Generate Barcode</button>
            </div>
            <div className={`bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] ${barcodeValue ? "h-auto border-none" : "h-[300px] border-[1px] shadow-custom"} mx-auto mt-10 border-gray200`}>
                {
                    barcodeValue &&
                    <div className='flex flex-col justify-center items-center gap-5 py-5'>
                        <p className='text-gray500'>Generated Barcode</p>
                        <div ref={barcodeRef}>
                            <Barcode value={barcodeValue} width={5} height={100} displayValue={true} />
                        </div>
                        <div className='flex justify-center items-center gap-5'>
                            <button className={`bg-lightBlue text-white rounded-lg  px-4 py-2`} onClick={downloadBarCode}>Download Barcode</button>
                            <button className={`bg-lightBlue text-white rounded-lg  px-4 py-2`} onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default BarcodeGenerator