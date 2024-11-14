import React, { useEffect, useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import { getDocument } from 'pdfjs-dist';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import { PDFDocument, PDFImage, degrees } from 'pdf-lib';
import { saveAs } from 'file-saver';

const PdfPageRotate = () => {

    const [pdfFile, setPdfFile] = useState(null);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageImages, setPageImages] = useState([]);
    const [rotations, setRotations] = useState([])

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            setPdfFile(file);
            setPdfDoc(pdfDoc);
            renderPages(pdfDoc);
        }
    }

    const renderPages = async (pdfDoc) => {
        const pageImages = [];
        const rotationsArray = new Array(pdfDoc.getPageCount()).fill(0);

        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
            const pdf = await getDocument({ data: await pdfDoc.save() }).promise;
            const page = await pdf.getPage(i + 1);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;
            pageImages.push({ url: canvas.toDataURL(), pageIndex: i });
        }
        setPageImages(pageImages);
        setRotations(rotationsArray);
    };

    const rotatePage = (pageIndex, direction) => {
        if (pdfDoc) {
            const rotation = direction === 'left' ? rotations[pageIndex] - 90 : rotations[pageIndex] + 90;
            rotations[pageIndex] = rotation;
            setRotations([...rotations]);

            const page = pdfDoc.getPage(pageIndex);
            page.setRotation(degrees(rotation));
            renderPages(pdfDoc);
        }
    };

    const downloadRotatedPDF = async () => {
        if (pdfDoc) {
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            saveAs(blob, 'rotated.pdf');
        }
        reset();
    }

    const reset = () => {
        setPdfFile(null);
        setPdfDoc(null);
        setPageImages([]);
        setRotations([]);
    }

    useEffect(() => {
        if (pdfDoc) {
            renderPages(pdfDoc);
        }
    }, [rotations]);

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>PDF Page Rotator</h1>
            <p className='text-center text-gray500 my-5'>Easily rotate pdf page online for free.</p>
            <input type="file" accept={`.pdf`} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <button className='bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        pageImages.length > 0 &&
                        pageImages.map((page, index) => (
                            <div className='flex flex-col justify-center items-center' key={page.pageIndex}>
                                <p className='dark:text-white'>Page : {index + 1}</p>
                                <img src={page.url} alt={`Page ${index + 1}`} className='border' style={{ margin: '10px', width: '100%', height: '100%' }} />
                                <div className='flex justify-center items-center gap-5 flex-wrap'>
                                    <button className='bg-purple p-2 text-white rounded-lg' onClick={() => rotatePage(page.pageIndex, 'left')}>Rotate Left</button>
                                    <button className='bg-purple p-2 text-white rounded-lg' onClick={() => rotatePage(page.pageIndex, 'right')}>Rotate Right</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    pageImages.length > 0 &&
                    <button className='bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={downloadRotatedPDF}>Download Rotated PDF</button>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default PdfPageRotate
