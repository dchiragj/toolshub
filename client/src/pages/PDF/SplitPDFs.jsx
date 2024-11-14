import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const SplitPDFs = () => {

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        let files = e.target.files[0];
        if (files) {
            setFile(files);
        }
    }

    const splitPDF = () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await PDFDocument.load(pdfData);
            const numPages = pdf.getPageCount();

            for (let i = 0; i < numPages; i++) {
                const newPdf = await PDFDocument.create();
                const [page] = await newPdf.copyPages(pdf, [i]);
                newPdf.addPage(page);
                const pdfBytes = await newPdf.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                saveAs(blob, `page-${i + 1}.pdf`);
            }
            setFile(null);
        };
        reader.readAsArrayBuffer(file);
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>Split Pdfs</h1>
            <p className='text-center text-gray500 my-5'>Easily split pdfs online for free.</p>
            <input type="file" accept={`.pdf`} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                {
                    file &&
                    <>
                        <p className='dark:text-white'>
                            <span className='font-semibold'>Selected File</span> : {file.name}
                        </p>
                        <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={splitPDF}>Split PDF</button>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default SplitPDFs