import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import WebTools from '../../components/WebTools'
import { IoMdCloseCircle } from "react-icons/io";
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const MergePdf = () => {

    const [files, setFiles] = useState([]);
    const [mergedPdf, setMergedPdf] = useState(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    }

    const removeFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    const mergePdfs = async () => {
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            const pdfBytes = await file.arrayBuffer();
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setMergedPdf(blob);
    }

    const handleDownload = () => {
        if (mergedPdf) {
            saveAs(mergedPdf, 'merged.pdf');
            setFiles([]);
            setMergedPdf(null)
        }
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>Merge PDFs</h1>
            <p className='text-center text-gray500 my-5'>Easily merge pdf documents with text files online for free.</p>
            <input type="file" accept={`.pdf , .txt`} multiple onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                {files.length > 0 && (
                    <div className='w-full flex flex-col justify-center items-center gap-5'>
                        <h3 className='dark:text-white'>Selected Files:</h3>
                        <ul className='border-2 w-full border-dashed dark:border-white flex justify-start items-center gap-5 p-3'>
                            {files.map((file, index) => (
                                <li key={index} className='flex flex-col dark:text-white relative'>
                                    <p>{file.name}</p>
                                    <button onClick={() => removeFile(index)} className='absolute -top-1 -right-1 text-[red] bg-white rounded-full'><IoMdCloseCircle /></button>
                                </li>
                            ))}
                        </ul>
                        <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={mergePdfs}>Merge PDFs</button>
                        {<button className={`mx-auto ${!mergedPdf ? "bg-gray600" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!mergedPdf} onClick={handleDownload}>Download</button>}
                    </div>
                )}
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default MergePdf