import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import atob from 'atob'
import { PDFDocument, rgb } from 'pdf-lib';
import CopyToClipboard from 'react-copy-to-clipboard';

const Base64ToPdf = ({ from, to }) => {

    const [base64, setBase64] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [copy, setCopy] = useState(false);

    if (copy) {
        alert('Copied to clipboard Successfully.')
        setCopy(false);
    }

    const convertToPDF = async () => {
        try {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();
            const base64Text = atob(base64);
            page.drawText(base64Text, { x: 50, y: 350, size: 25, color: rgb(0, 0, 0) });

            const pdfBytes = await pdfDoc.save();
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setPdfUrl(pdfUrl);
            setBase64('');
        } catch (err) {
            alert("Invalid Base64 String.")
        }
    }

    const convertToBase64 = async () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                setText(base64String);
                setFile(null);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleFileChange = (e) => {
        let files = e.target.files[0];
        if (files) {
            setFile(files);
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'sample.pdf';
        link.click();
        link.remove();
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>
                {from.toUpperCase()} to {to.toUpperCase()} Converter
            </h1>
            <p className='text-center text-gray500 my-5'>Easily convert {from.toUpperCase()} to {to.toUpperCase()} documents online.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                {
                    to === 'pdf' &&
                    <textarea
                        rows={5}
                        placeholder='Enter Base64 string'
                        className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                        value={base64}
                        onChange={(e) => setBase64(e.target.value)}
                    ></textarea>
                }
                {
                    to === 'base64' &&
                    <>
                        <input type="file" accept='application/pdf' onChange={handleFileChange} className='hidden' />
                        <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                    </>
                }
                {
                    to === 'pdf' ?
                        <button className={`px-5 py-2 ${!base64 ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!base64} onClick={convertToPDF}>Generate PDF</button> :
                        <button className={`px-5 py-2 ${!file ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!file} onClick={convertToBase64}>Generate Base64</button>
                }
                {
                    pdfUrl &&
                    <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`} onClick={handleDownload}>Download PDF</button>
                }
                {
                    text &&
                    <>
                    <p className='dark:text-white font-semibold'>Result : </p>
                        <textarea
                            rows={6}
                            className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                            value={text}
                            readOnly
                        ></textarea>
                        <CopyToClipboard text={text} onCopy={() => setCopy(true)}>
                            <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`}>Copy Base64</button>
                        </CopyToClipboard>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default Base64ToPdf