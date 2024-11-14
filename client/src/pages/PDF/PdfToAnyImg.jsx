import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js`

const PdfToAnyImg = ({ from, to }) => {

    const [file, setFile] = useState(null);
    const [pdfPages, setPdfPages] = useState([]); 

    const handleFileChange = (e) => {
        let files = e.target.files[0];
        if (files) {
            setFile(files);
            displayPdf(files);
        }
    }

    const displayPdf = (file) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            const pages = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport }).promise;
                pages.push(canvas.toDataURL());
            }
            setPdfPages(pages);
        };
        reader.readAsArrayBuffer(file);
    };

    const convert = async () => {
        if (pdfPages.length === 1) {
            // Convert and download as image and text files
            const imgBlob = await fetch(pdfPages[0]).then(res => res.blob());
            saveAs(imgBlob, `page.${to}`);

            // const textBlob = new Blob([await extractText(file)], { type: 'text/plain' });
            // saveAs(textBlob, 'text.txt');
        } else {
            // Convert and download as a ZIP file
            const zip = new JSZip();
            for (let i = 0; i < pdfPages.length; i++) {
                const imgBlob = await fetch(pdfPages[i]).then(res => res.blob());
                zip.file(`page${i + 1}.${to}`, imgBlob);

                // const textBlob = new Blob([await extractText(file)], { type: 'text/plain' });
                // zip.file(`text${i + 1}.txt`, textBlob);
            }
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'files.zip');
        }
    };

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>{from.toUpperCase()} to {to.toUpperCase()} Converter</h1>
            <p className='text-center text-gray500 my-5'>Convert {from.toUpperCase()} to {to.toUpperCase()} online for free</p>
            <input type="file" accept={`.${from}`} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                <button className={`mx-auto ${!file ? "bg-gray600" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!file} onClick={convert}>Convert to {to.toUpperCase()}</button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto mt-5'>
                {
                    pdfPages.map((page, index) => (
                        <div className='flex flex-col justify-center items-center'>
                            <p className='dark:text-white'>Page : {index + 1}</p>
                            <img key={index} src={page} alt={`Page ${index + 1}`} className='border' style={{ margin: '10px', width: '100%' }} />
                        </div>
                    ))
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default PdfToAnyImg