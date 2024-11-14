import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfCropper = () => {
    const [cropperInstances, setCropperInstances] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [pdfPages, setPdfPages] = useState([]);
    const containerRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const pdfData = await file.arrayBuffer();
            const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;

            const pages = [];
            for (let i = 0; i < pdfDoc.numPages; i++) {
                pages.push(await pdfDoc.getPage(i + 1));
            }

            setPdfPages(pages);
            setCurrentPageIndex(0);
            renderPage(pages[0]);
            setCropperInstances(new Array(pages.length).fill(null));
        }
    };

    const renderPage = async (page) => {
        if (containerRef.current && page) {
            containerRef.current.innerHTML = '';
        }

        if (!page) return;

        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        canvas.style.width = '50%';
        canvas.style.height = '100%';

        const context = canvas.getContext('2d');
        await page.render({ canvasContext: context, viewport }).promise;

        if (containerRef.current) {
            containerRef.current.appendChild(canvas);
        }

        const cropper = new Cropper(canvas, {
            aspectRatio: NaN,
            viewMode: 1,
            responsive: true,
            crop: () => {
                const updatedCropperInstances = [...cropperInstances];
                updatedCropperInstances[currentPageIndex] = cropper;
                setCropperInstances(updatedCropperInstances);
            },
        });

        const updatedCropperInstances = [...cropperInstances];
        updatedCropperInstances[currentPageIndex] = cropper;
        setCropperInstances(updatedCropperInstances);
    };

    const nextPage = () => {
        if (currentPageIndex < pdfPages.length - 1) {
            const newIndex = currentPageIndex + 1;
            setCurrentPageIndex(newIndex);
            renderPage(pdfPages[newIndex]);
        }
    };

    const prevPage = () => {
        if (currentPageIndex > 0) {
            const newIndex = currentPageIndex - 1;
            setCurrentPageIndex(newIndex);
            renderPage(pdfPages[newIndex]);
        }
    };

    const downloadCroppedPdf = async () => {
        const pdfDoc = await PDFDocument.create();

        for (let i = 0; i < pdfPages.length; i++) {
            const page = pdfPages[i];
            const cropper = cropperInstances[i];

            if (cropper) {
                const croppedCanvas = cropper.getCroppedCanvas();
                const imageData = croppedCanvas.toDataURL('image/jpeg');
                const imgBytes = await fetch(imageData).then(res => res.arrayBuffer());

                const img = await pdfDoc.embedJpg(imgBytes);
                const newPage = pdfDoc.addPage([croppedCanvas.width, croppedCanvas.height]);
                newPage.drawImage(img, {
                    x: 0,
                    y: 0,
                    width: croppedCanvas.width,
                    height: croppedCanvas.height,
                });
            } else {
                const originalViewport = page.getViewport({ scale: 1 });
                const originalCanvas = document.createElement('canvas');
                originalCanvas.width = originalViewport.width;
                originalCanvas.height = originalViewport.height;

                const originalContext = originalCanvas.getContext('2d');
                await page.render({ canvasContext: originalContext, viewport: originalViewport }).promise;

                const imgBytes = originalCanvas.toDataURL('image/jpeg');
                const img = await pdfDoc.embedJpg(await fetch(imgBytes).then(res => res.arrayBuffer()));
                const newPage = pdfDoc.addPage([originalCanvas.width, originalCanvas.height]);
                newPage.drawImage(img, {
                    x: 0,
                    y: 0,
                    width: originalCanvas.width,
                    height: originalCanvas.height,
                });
            }
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cropped.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className='mt-20'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>PDF Cropper</h1>
            <p className='text-center text-gray500 my-5'>Easily crop PDF pages online for free</p>
            <input type="file" accept={`.pdf`} onChange={handleFileChange} className='hidden' />
            <div className='mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex flex-col justify-center items-center gap-5 overflow-x-hidden'>
                <button className=' mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                <div ref={containerRef}></div>
            </div>
            {
                pdfPages.length > 0 &&
                <div className='flex flex-col justify-center items-center gap-5 mt-5'>
                    <div className='flex justify-center items-center gap-5 flex-wrap'>
                        <button className={`${currentPageIndex === 0 ? "bg-gray600" : "bg-lightBlue"} text-white py-2 px-5 rounded-lg`} onClick={prevPage} disabled={currentPageIndex === 0}>
                            Previous
                        </button>
                        <button className={`${currentPageIndex === pdfPages.length - 1 ? "bg-gray600" : "bg-lightBlue"} text-white py-2 px-5 rounded-lg`} onClick={nextPage} disabled={currentPageIndex === pdfPages.length - 1}>
                            Next
                        </button>
                    </div>
                    <button className={`${!cropperInstances.some(c => c) ? "bg-gray600" : "bg-lightBlue"} text-white py-2 px-5 rounded-lg`} onClick={downloadCroppedPdf} disabled={!cropperInstances.some(c => c)}>
                        Download Cropped PDF
                    </button>
                </div>
            }
            <FreeTools />
            <WebTools />
        </div>
    );
};

export default PdfCropper;














