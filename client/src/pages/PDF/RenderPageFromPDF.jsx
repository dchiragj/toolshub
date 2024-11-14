import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import { getDocument } from 'pdfjs-dist';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

const RenderPageFromPDF = () => {

    const [file, setFile] = useState(null);

    const [pageNo, setPageNo] = useState(0);
    const [pageLength, setPageLength] = useState(0);
    const [pdfPage, setPdfPage] = useState([]);
    const [renderedPage, setRenderedPage] = useState(0);

    const handleFileChange = (e) => {
        let files = e.target.files[0];
        if (files) {
            setFile(files);
            const reader = new FileReader();
            reader.onload = async () => {
                const pdfData = new Uint8Array(reader.result);
                const pdf = await getDocument({ data: pdfData }).promise;
                const numPages = pdf.numPages;
                setPageLength(numPages);
            };
            reader.readAsArrayBuffer(files);
        }
    }

    const renderPage = () => {
        if (pageNo > 0 && pageNo <= pageLength) {
            if (pageNo === 0) {
                alert(`Please Enter Page No between 1 and ${pageLength}`)
            } else {
                const reader = new FileReader();
                reader.onload = async () => {
                    const pdfData = new Uint8Array(reader.result);
                    const pdf = await getDocument({ data: pdfData }).promise;
                    const numPages = pdf.numPages;
                    const pages = [];

                    for (let i = 1; i <= numPages; i++) {
                        if (pageNo === i) {
                            const page = await pdf.getPage(i);
                            const viewport = page.getViewport({ scale: 1.5 });
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            await page.render({ canvasContext: context, viewport }).promise;
                            pages.push(canvas.toDataURL());
                        }
                    }
                    setPdfPage(pages);
                    setRenderedPage(pageNo);
                };
                reader.readAsArrayBuffer(file);
            }
        } else if (pageNo < 0) {
            alert(`Please Enter Page No between 1 and ${pageLength} , because selected file has ${pageLength} pages`)
        } else if (pageNo > pageLength) {
            alert(`Please Enter Page No between 1 and ${pageLength} , because selected file has ${pageLength} pages`)
        }
    }

    const handleDownload = async () => {
        // const imgBlob = await fetch(pdfPage).then(res => res.blob());
        // saveAs(imgBlob, `page.png`);
        const pdf = new jsPDF();
        const scale = 0.1; // ensure the scale value is between 0.1 and 10
        pdf.scale(scale);
        const imgData = pdfPage[0];
        const imgWidth = pdfPage[0].width; // original image width
        const imgHeight = pdfPage[0].height; // original image height
        const x = 1; // x-coordinate of the image
        const y = 1; // y-coordinate of the image

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, `page_${pageNo}.pdf`);
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue' >
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>Render Page From PDFs</h1>
            <p className='text-center text-gray500 my-5'>Easily extract any page from pdf documents online for free.</p>
            <input type="file" accept={'.pdf'} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                {file &&
                    <>
                        <p>Selected Files : {file.name}</p>
                        <p>Enter Page Number :</p>
                        <input
                            type="number"
                            inputMode='numeric'
                            placeholder='Enter Page No'
                            className='p-2 border-2 border-lightBlue rounded-full'
                            value={pageNo}
                            onChange={(e) => setPageNo(Number(e.target.value))}
                        />
                        <div className='flex justify-center items-center gap-5'>
                            <button className={`mx-auto ${!pageNo ? "bg-gray600" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!pageNo} onClick={renderPage}>Render Page No : {pageNo}</button>
                            <button className={`mx-auto ${!renderedPage ? "bg-gray600" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!renderedPage} onClick={handleDownload}>Download Page : {renderedPage}</button>
                        </div>
                        {
                            pdfPage.length > 0 && <img src={pdfPage} alt={`Page ${pageNo}`} className='border' style={{ margin: '10px', width: "50%", height: "50%" }} />
                        }
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default RenderPageFromPDF