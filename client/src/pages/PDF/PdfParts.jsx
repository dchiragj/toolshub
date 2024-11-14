import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import WebTools from '../../components/WebTools'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'

const PdfParts = () => {

    const [file, setFile] = useState(null);
    const [splitNumber, setSplitNumber] = useState(1);

    const handleFileChange = (e) => {
        let files = e.target.files[0];
        if (files) {
            setFile(files)
        }
    }

    const splitPDF = () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await PDFDocument.load(pdfData);
            const numPages = pdf.getPageCount();
            const pagesPerPart = Math.ceil(numPages / splitNumber);

            for (let i = 0; i < splitNumber; i++) {
                const startPage = i * pagesPerPart;
                const endPage = Math.min(startPage + pagesPerPart, numPages);
                const newPdf = await PDFDocument.create();

                for (let j = startPage; j < endPage; j++) {
                    const [page] = await newPdf.copyPages(pdf, [j]);
                    newPdf.addPage(page);
                }

                const newPdfBytes = await newPdf.save();
                const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
                saveAs(blob, `part-${i + 1}.pdf`);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    const handleNumberChange = (e) => {
        const parts = Math.max(1, parseInt(e.target.value, 10));
        setSplitNumber(parts);
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>Split PDF into Parts</h1>
            <p className='text-center text-gray500 my-5'>Easily make pdf parts online for free.</p>
            <input type="file" accept={`.pdf`} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                {
                    file &&
                    <>
                        <p className='dark:text-white'>
                            <span className='font-semibold'>Selected File</span> : {file.name}
                        </p>
                        <p>Number Of Parts : </p>
                        <input
                            type="number"
                            value={splitNumber}
                            onChange={handleNumberChange}
                            className='w-[25%] border-2 border-lightBlue p-2 rounded-lg'
                        />
                        <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={splitPDF}>Make Parts</button>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default PdfParts 