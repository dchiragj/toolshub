import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

const AnalyzePdf = () => {

    const [file, setFile] = useState(null);
    const [pdfPages, setPdfPages] = useState([]);
    const [analysis, setAnalysis] = useState({
        totalCharacters: null,
        totalWords: null,
        totalLines: null,
        totalParagraphs: null,
    });
    const [isAnalysis, setIsAnalysis] = useState(false);

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

    const analyze = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let textData = '';

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                textData += pageText + '\n';
            }

            performAnalysis(textData);
        };
        reader.readAsArrayBuffer(file);
    };

    const performAnalysis = (text) => {
        const totalCharacters = text.length;
        const totalWords = text.split(/\s+/).filter(word => word).length;
        const totalLines = text.split('\n').length;
        const totalParagraphs = text.split(/\n\s*\n/).length;

        setAnalysis({
            totalCharacters,
            totalWords,
            totalLines,
            totalParagraphs,
        });
        setIsAnalysis(true)
    };

    return (
        <div className='mt-[72px] dark:bg-darkBlue' >
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>Analyze PDF</h1>
            <p className='text-center text-gray500 my-5'>Easily analyze pdfs online for free.</p>
            <input type="file" accept={'.pdf'} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <p><span className='text-[red]'>*</span> <span className='dark:text-white'>Select Only Text based pdf file</span></p>
                <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                <button className={`mx-auto ${!file ? "bg-gray600" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!file} onClick={analyze}>Analyze</button>
                {
                    isAnalysis &&
                    <>
                        <p className='dark:text-white font-semibold'>Analysis : </p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Total Characters</td>
                                    <td>{analysis.totalCharacters}</td>
                                </tr>
                                <tr>
                                    <td>Total Words</td>
                                    <td>{analysis.totalWords}</td>
                                </tr>
                                <tr>
                                    <td>Total Lines</td>
                                    <td>{analysis.totalLines}</td>
                                </tr>
                                <tr>
                                    <td>Total Paragraphs</td>
                                    <td>{analysis.totalParagraphs}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                }
            </div>
            {
                !isAnalysis &&
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto mt-5'>
                    {
                        pdfPages.map((page, index) => (
                            <div className='flex flex-col justify-center items-center' key={index}>
                                <p className='dark:text-white'>Page : {index + 1}</p>
                                <img key={index} src={page} alt={`Page ${index + 1}`} className='border' style={{ margin: '10px', width: '100%' }} />
                            </div>
                        ))
                    }
                </div>
            }
            <FreeTools />
            <WebTools />
        </div >
    )
}

export default AnalyzePdf