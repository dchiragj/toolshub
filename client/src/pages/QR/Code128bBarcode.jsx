import React, { useEffect, useRef, useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import BWIPJS from 'bwip-js';
import html2canvas from 'html2canvas';
import WebTools from '../../components/WebTools';

const Code128bBarcode = () => {

    const barcodeRef = useRef();
    const [input, setInput] = useState({
        text: "",
        width: 5,
        height: 5
    })
    const [valueBarcode, setValueBarcode] = useState({});

    const generateBarCode = () => {
        setValueBarcode(input);
        setInput({
            text: "",
            width: 5,
            height: 5
        })
    }

    const renderBarcode = () => {
        if (valueBarcode.text) {
            BWIPJS.toCanvas(barcodeRef.current, {
                bcid: 'code128',
                text: valueBarcode?.text,
                scale: 1,
                height: valueBarcode?.height,
                width: valueBarcode?.width,
                textxalign: 'center',
            })
        }
    }

    const downloadBarCode = async () => {
        if (barcodeRef.current) {
            const canvas = await html2canvas(barcodeRef.current);
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'code128b_barcode.png';
            link.click();
        }
    };

    const handleReset = () => {
        setValueBarcode({});
        setInput({
            text: '',
            width: 5,
            height: 5
        })
    };

    useEffect(() => {
        renderBarcode();
    }, [valueBarcode])

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>Code128 Barcode Generator</h1>
            <p className='text-center text-gray500 my-5'>Easily Code128B Barcode generateor online for free.</p>
            <div className='flex flex-col justify-center items-center gap-5'>
                <p className='font-medium text-xl dark:text-white'>Enter Text : </p>
                <input
                    type="text"
                    placeholder='Enter text to generate ...'
                    className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={input.text}
                    onChange={(e) => setInput({ ...input, text: e.target.value })}
                />
                <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='w-full flex flex-col justify-center items-center gap-5'>
                        <p className='font-medium text-xl dark:text-white'>Enter Width : </p>
                        <input
                            type="text"
                            placeholder='Width'
                            className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                            value={input.width}
                            onChange={(e) => setInput({ ...input, width: e.target.value })}
                        />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-5'>
                        <p className='font-medium text-xl dark:text-white'>Enter Height : </p>
                        <input
                            type="text"
                            placeholder='Enter '
                            className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                            value={input.height}
                            onChange={(e) => setInput({ ...input, height: e.target.value })}
                        />
                    </div>
                </div>
                <button className={`${!input.text ? "bg-gray500" : "bg-lightBlue"} text-white rounded-lg  px-4 py-2`} disabled={!input.text} onClick={generateBarCode}>Generate Barcode</button>
            </div>
            <div className={`bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] ${valueBarcode.text ? "h-auto border-none" : "h-[300px] border-[1px] shadow-custom"} mx-auto mt-10 border-gray200`}>
                {
                    valueBarcode.text &&
                    <div className='flex flex-col justify-center items-center gap-5 py-5'>
                        <p className='text-gray500'>Generated Barcode</p>
                        <div className='scale-150'>
                            <canvas ref={barcodeRef}></canvas>
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

export default Code128bBarcode