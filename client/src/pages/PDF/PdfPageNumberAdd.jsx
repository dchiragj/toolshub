import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import WebTools from '../../components/WebTools'
import { PDFDocument, rgb } from 'pdf-lib'
import { saveAs } from 'file-saver'

const PdfPageNumberAdd = () => {

    const [file, setFile] = useState(null);
    const [position, setPosition] = useState("top left")

    const handleFileChange = (e) => {
        let files = e.target.files[0];
        if (files) {
            setFile(files);
        }
    }

    const addPageNumber = () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdfDoc = await PDFDocument.load(pdfData);
            const numPages = pdfDoc.getPageCount();

            for (let i = 0; i < numPages; i++) {
                const page = pdfDoc.getPage(i);
                const { width, height } = page.getSize();
                const fontSize = 12;
                let x, y;

                switch (position) {
                    case 'top left':
                        x = 10;
                        y = height - 20;
                        break;
                    case 'top center':
                        x = width / 2 - fontSize / 2;
                        y = height - 20;
                        break;
                    case 'top right':
                        x = width - 40;
                        y = height - 20;
                        break;
                    case 'bottom left':
                        x = 10;
                        y = 20;
                        break;
                    case 'bottom center':
                        x = width / 2 - fontSize / 2;
                        y = 20;
                        break;
                    case 'bottom right':
                    default:
                        x = width - 40;
                        y = 20;
                        break;
                }

                page.drawText(`${i + 1}`, {
                    x,
                    y,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            saveAs(blob, 'numbered.pdf');
        };
        reader.readAsArrayBuffer(file);

    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>PDF Page Number Adder</h1>
            <p className='text-center text-gray500 my-5'>Easily add page numbers to pdf documents online for free.</p>
            <input type="file" accept={`.pdf`} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                {
                    file &&
                    <>
                        <p className='dark:text-white'>
                            <span className='font-semibold'>Selected File</span> : {file.name}
                        </p>
                        <p className='dark:text-white'>Select Number Position :</p>
                        <select
                            className='border-2 border-lightBlue rounded-lg p-2'
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        >
                            <option value="top left">Top Left</option>
                            <option value="top center">Top Center</option>
                            <option value="top right">Top Right</option>
                            <option value="bottom left">Bottom Left</option>
                            <option value="bottom center">Bottom Center</option>
                            <option value="bottom right">Bottom Right</option>
                        </select>
                        <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={addPageNumber}>Add Page Number & Download</button>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default PdfPageNumberAdd