import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'

const ColorTextToPdf = () => {

    const [text, setText] = useState('');

    const styleOptObj = {
        color: '#000000',
        bg: '#ffffff',
        fontSize: 10,
        fontStyle: ''
    }

    const [styleOpt, setStyleOpt] = useState(styleOptObj);
    const [applied, setApplied] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('')

    const handleStyleChange = (e) => {
        const { name, value } = e.target;
        setStyleOpt({ ...styleOpt, [name]: value });
    }

    const applyStyle = () => {
        setApplied(true)
    }
    const convert = async () => {
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit)

        const page = pdfDoc.addPage();

        page.drawRectangle({
            x: 0,
            y: 0,
            width: page.getWidth(),
            height: page.getHeight(),
            color: rgb(
                parseInt(styleOpt.bg.slice(1, 3), 16) / 255,
                parseInt(styleOpt.bg.slice(3, 5), 16) / 255,
                parseInt(styleOpt.bg.slice(5, 7), 16) / 255
            ),
        });

        const textHeight = page.getHeight() - 50;
        const textColorRgb = rgb(
            parseInt(styleOpt.color.slice(1, 3), 16) / 255,
            parseInt(styleOpt.color.slice(3, 5), 16) / 255,
            parseInt(styleOpt.color.slice(5, 7), 16) / 255
        )

        let x;
        const pageWidth = page.getWidth();


        switch (styleOpt.textAlign) {
            case 'center':
                x = pageWidth / 2;
                break;
            case 'right':
                x = pageWidth - 540;
                break;
            case 'left':
            default:
                x = 40;
        }

        page.drawText(text, {
            x: 40,
            y: textHeight,
            size: Number(styleOpt.fontSize),
            color: textColorRgb,
            lineHeight: 20,
            maxWidth: 500,
            align: styleOpt.textAlign,
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        setPdfUrl(pdfUrl);
    }
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'sample.pdf';
        link.click();
        link.remove();
    }

    const handleReset = () => {
        setPdfUrl('');
        setText('');
        setApplied(false);
        setStyleOpt(styleOptObj)
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>
                Color Text to PDF Converter
            </h1>
            <p className='text-center text-gray500 my-5'>Easily generate colored text pdf documents online.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <textarea
                    rows={5}
                    placeholder='Enter Text ...'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className='flex flex-wrap justify-center items-center gap-5'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='dark:text-white font-semibold'>Color</p>
                        <input
                            name='color'
                            className='w-full'
                            type="color"
                            value={styleOpt.color}
                            onChange={handleStyleChange}
                        />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='dark:text-white font-semibold'>Background</p>
                        <input
                            name='bg'
                            className='w-full'
                            type="color"
                            value={styleOpt.bg}
                            onChange={handleStyleChange}
                        />
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='dark:text-white font-semibold'>Font Size</p>
                        <select
                            className='w-full dark:text-white border py-2 rounded-lg border-gray400 dark:bg-darkBlue px-1 outline-none'
                            name='fontSize'
                            value={styleOpt.fontSize}
                            onChange={handleStyleChange}
                        >
                            <option value="10">10 px</option>
                            <option value="12">12 px</option>
                            <option value="14">14 px</option>
                            <option value="16">16 px</option>
                            <option value="18">18 px</option>
                            <option value="20">20 px</option>
                        </select>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='dark:text-white font-semibold' style={{ fontFamily: "" }}>Font Style</p>
                        <select
                            className='w-full dark:text-white border py-2 rounded-lg border-gray400 dark:bg-darkBlue px-1 outline-none'
                            name='fontStyle'
                            value={styleOpt.fontStyle}
                            onChange={handleStyleChange}
                        >
                            <option value="">Normal</option>
                            <option value="italic">Italic</option>
                            <option value="bold">Bold</option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                    <button className={`px-5 py-2 ${!text ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!text} onClick={applyStyle}>Apply Styles</button>
                    <button className={`px-5 py-2 ${!text ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!text} onClick={convert}>Generate PDF</button>
                </div>
                {
                    pdfUrl &&
                    <div className='flex justify-center items-center gap-5'>
                        <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`} onClick={handleDownload}>Download PDF</button>
                        <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`} onClick={handleReset}>Reset</button>
                    </div>
                }
            </div>
            {
                applied &&
                <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto mt-5'>
                    <p className='dark:text-white font-semibold text-center text-xl mb-5'>Results : </p>
                    <div className='mx-auto text-wrap' style={{ color: styleOpt.color, backgroundColor: styleOpt.bg, fontSize: styleOpt.fontSize + "px", fontStyle: styleOpt.fontStyle, textAlign: styleOpt.textAlign }}>
                        {text}
                    </div>
                </div>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default ColorTextToPdf