import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import jsPDF from 'jspdf';
import heic2any from 'heic2any'
import imageCompression from 'browser-image-compression';
import PSD from 'psd.js';
import WebTools from '../../components/WebTools';

const ToPDF = ({ type }) => {

    const [typeURL, setTypeURL] = useState('');
    const [orientation, setOrientation] = useState('portrait');
    const [padding, setPadding] = useState(0);

    const url = window.location.href;
    let heading;
    if (url.includes('graypdf')) {
        heading = 'to Gray PDF Converter'
    }

    const handleFileChange = async (e) => {
        const selectedFiles = e.target.files[0];
        if (type === 'heic' || type === 'heif') {
            const converted = await heic2any({
                blob: selectedFiles,
                toType: 'image/jpeg'
            });
            setTypeURL(URL.createObjectURL(converted))
        } else if (type === 'ico') {
            const compressedFile = await imageCompression(selectedFiles, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            });
            const base64String = await imageCompression.getDataUrlFromFile(compressedFile);
            setTypeURL(base64String);
        } else if (type === 'psd') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const psd = PSD.fromArrayBuffer(arrayBuffer);
                psd.parse();

                const image = psd.image.toPng();
                setTypeURL(URL.createObjectURL(image))
            }
        } else {
            setTypeURL(URL.createObjectURL(selectedFiles));
        }
    }

    const generatePDF = async () => {
        const pad = Number(padding);

        const pdf = new jsPDF({
            orientation: orientation
        });

        const img = new Image();
        img.src = typeURL; // Ensure this is the URL of the converted image (PNG or JPEG)

        img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;

            const pageWidth = pdf.internal.pageSize.getWidth() - 2 * pad;
            const pageHeight = pdf.internal.pageSize.getHeight() - 2 * pad;

            let width, height;

            if (imgWidth / imgHeight > pageWidth / pageHeight) {
                width = pageWidth;
                height = (imgHeight * pageWidth) / imgWidth;
            } else {
                height = pageHeight;
                width = (imgWidth * pageHeight) / imgHeight;
            }

            // Create a canvas to manipulate the image
            const canvas = document.createElement('canvas');
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

            // Convert the image to grayscale if heading is 'graypdf'
            if (url.includes('graypdf')) {
                const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg; // Red
                    data[i + 1] = avg; // Green
                    data[i + 2] = avg; // Blue
                }
                ctx.putImageData(imageData, 0, 0);
            }

            const imgData = canvas.toDataURL('image/jpeg'); // Use 'image/png' if the converted image is in PNG format

            // Calculate the x and y coordinates to center the image
            const x = (pdf.internal.pageSize.getWidth() - width) / 2;
            const y = (pdf.internal.pageSize.getHeight() - height) / 2;

            pdf.addImage(imgData, 'JPEG', x, y, width, height); // Use 'PNG' if the converted image is in PNG format
            pdf.save('converted.pdf');
            setTypeURL('');
            setOrientation('portrait')
            setPadding(0);
        };
    };


    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>
                <span className='uppercase'>{type}</span>&nbsp;<span>{heading || "to PDF Converter"}</span>
            </h1>
            <p className='text-center text-gray500 my-5'>Convert <span className='uppercase'>{type}</span> to {heading || 'PDF'} online for free</p>
            <input type="file" accept={`.${type}`} onChange={handleFileChange} className='hidden' />
            <div className='flex justify-center items-center'>
                <button className=' mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
            </div>
            <div className={`bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] ${typeURL ? "h-auto" : "h-[500px]"} mx-auto mt-10 ${typeURL ? "border-none" : "border-[1px] shadow-custom"} border-gray200`}>
                {typeURL && <img src={typeURL} alt={type} className='mx-auto' />}
            </div>
            {
                typeURL &&
                <>
                    <div className='flex justify-center items-center flex-wrap gap-5 mt-5'>
                        <div className='flex justify-center items-center gap-3'>
                            <p className='dark:text-white'>Select Orientation : </p>
                            <select className='outline-none p-2 rounded-lg border' value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                                <option value="portrait">Portrait</option>
                                <option value="landscape">Landscape</option>
                            </select>
                        </div>
                        <div className='flex justify-center items-center gap-3'>
                            <p className='dark:text-white'>Select Padding : </p>
                            <select className='outline-none p-2 rounded-lg border' value={padding} onChange={(e) => setPadding(e.target.value)}>
                                <option value={0} disabled>No Padding</option>
                                <option value={5}>5px</option>
                                <option value={10}>10px</option>
                                <option value={20}>20px</option>
                                <option value={30}>30px</option>
                                <option value={40}>40px</option>
                                <option value={50}>50px</option>
                                <option value={100}>100px</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-5'>
                        <button className=' mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={generatePDF}>Convert To PDF & Download</button>
                    </div>
                </>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default ToPDF