import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const ItemType = 'PAGE';

function Page({ pageIndex, movePage }) {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index: pageIndex }
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (item) => {
            if (item.index !== pageIndex) {
                movePage(item.index, pageIndex);
                item.index = pageIndex;
            }
        }
    });

    return (
        <div ref={(node) => ref(drop(node))} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', padding: '10px', border: '1px solid #ccc', margin: '5px', gap: 10 }}>
            <div style={{ cursor: 'grab' }}>☰</div>
            <span>Page {pageIndex + 1}</span>
        </div>
    );
}

const OrganizePdf = () => {

    const [pdfFile, setPdfFile] = useState(null);
    const [pageOrder, setPageOrder] = useState([]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            setPdfFile(pdfDoc);
            const pageCount = pdfDoc.getPageCount();
            setPageOrder([...Array(pageCount).keys()]);
        }
    };

    const organize = () => {

    }

    const movePage = (from, to) => {
        const updatedOrder = [...pageOrder];
        const [movedPage] = updatedOrder.splice(from, 1);
        updatedOrder.splice(to, 0, movedPage);
        setPageOrder(updatedOrder);
    };

    const downloadOrganizedPdf = async () => {
        if (pdfFile) {
            const newPdf = await PDFDocument.create();
            for (const pageIndex of pageOrder) {
                const [page] = await newPdf.copyPages(pdfFile, [pageIndex]);
                newPdf.addPage(page);
            }
            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            saveAs(blob, 'organized.pdf');
        }
    };

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>Organize PDF</h1>
            <p className='text-center text-gray500 my-5'>Easily organize pdf pages online for free.</p>
            <input type="file" accept={`.pdf`} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                {
                    pdfFile &&
                    <>
                        <p className='dark:text-white'>
                            <span className='font-semibold'>Selected File</span> : {pdfFile.name}
                        </p>
                        <DndProvider backend={HTML5Backend}>
                            <div className='w-1/2'>
                                {pageOrder.length > 0 && (
                                    <div>
                                        {
                                            pageOrder.map((pageIndex) => (
                                                <Page key={pageIndex} pageIndex={pageIndex} movePage={movePage} />
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        </DndProvider>
                        <div className='flex justify-center items-center gap-5'>
                            <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={downloadOrganizedPdf}>Organize & Download</button>
                            <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => { setPdfFile(null); setPageOrder([]) }}>Reset</button>
                        </div>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default OrganizePdf

// function PDFPageOrganizer() {
//     

//     const handleFileUpload = async (event) => {
//         
//     };

//     

//     

//     return (
//         <div className='mt-[72px]'>
//             
//         </div>
//     );
// }

// export default PDFPageOrganizer;

