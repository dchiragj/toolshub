import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader';
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx'
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js`

const PdfToAnyText = ({ from, to }) => {

    const [file, setFile] = useState(null);
    const [pdfPages, setPdfPages] = useState([]);
    const [convertedText, setConvertedText] = useState(null);
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

    const toCSV = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData.push({ text: pageText });
            }

            const csv = Papa.unparse(allTextData);
            setConvertedText(csv);
        };
        reader.readAsArrayBuffer(file);
    }

    const toExcel = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData.push([`Page ${i}`, pageText]);
            }

            setConvertedText(allTextData);
        };
        reader.readAsArrayBuffer(file);
    }

    const toHtml = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = '';

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData += `<div style="margin-bottom: 20px;"><h2>Page ${i}</h2><p>${pageText}</p></div>`;
            }

            setConvertedText(allTextData);
        };
        reader.readAsArrayBuffer(file);
    }

    const toJSON = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str);
                allTextData.push({ page: i, text: pageText });
            }

            setConvertedText(JSON.stringify(allTextData, null, 2));
        };
        reader.readAsArrayBuffer(file);
    }

    const toMd = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = '';

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData += `## Page ${i}\n\n${pageText}\n\n`;
            }

            setConvertedText(allTextData);
        };
        reader.readAsArrayBuffer(file);
    }

    const generateSqlScript = (data) => {
        let sqlScript = 'CREATE TABLE pdf_data (id INT, content TEXT);\n\n';
        data.forEach((text, index) => {
            sqlScript += `INSERT INTO pdf_data (id, content) VALUES (${index + 1}, '${text.replace(/'/g, "''")}');\n`;
        });
        setConvertedText(sqlScript);
    };

    const toSql = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData.push(pageText);
            }

            generateSqlScript(allTextData);
        };
        reader.readAsArrayBuffer(file);
    }

    const toText = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = '';

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData += `Page ${i}\n${pageText}\n\n`;
            }

            setConvertedText(allTextData);
        };
        reader.readAsArrayBuffer(file);
    }

    const toTsv = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join('\t');
                allTextData.push(pageText);
            }

            generateTsv(allTextData);
        };
        reader.readAsArrayBuffer(file);
    }

    const generateTsv = (data) => {
        const tsv = data.join('\n');
        setConvertedText(tsv);
    };

    const toXml = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData.push({ page: i, text: pageText });
            }

            generateXml(allTextData);
        };
        reader.readAsArrayBuffer(file);
    }

    const generateXml = (data) => {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<pdf>\n`;
        data.forEach((page) => {
            xml += `  <page number="${page.page}">\n    <content>${page.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</content>\n  </page>\n`;
        });
        xml += `</pdf>`;
        setConvertedText(xml);
    };

    const toYaml = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData.push({ page: i, text: pageText });
            }

            generateYaml(allTextData);
        };
        reader.readAsArrayBuffer(file);
    };

    const generateYaml = (data) => {
        let yaml = `pdf:\n`;
        data.forEach((page) => {
            yaml += `  - page: ${page.page}\n    content: "${page.text.replace(/"/g, '\\"')}"\n`;
        });
        setConvertedText(yaml);
    };

    const toRtf = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = '';

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData += `{\\b Page ${i}}\\line ${pageText}\\line\\line `;
            }

            generateRtf(allTextData);
        };
        reader.readAsArrayBuffer(file);
    };

    const generateRtf = (data) => {
        const rtfHeader = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}\\viewkind4\\uc1\\pard\\f0\\fs20 `;
        const rtfFooter = `}`;
        const rtfContent = rtfHeader + data + rtfFooter;
        setConvertedText(rtfContent);
    };

    const toWord = () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let allTextData = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                allTextData.push(new Paragraph({
                    children: [
                        new TextRun({ text: pageText })
                    ]
                }));
            }

            setConvertedText(allTextData);
        };
        reader.readAsArrayBuffer(file);
    }

    const convert = () => {
        switch (to) {
            case 'csv':
                toCSV();
                break;

            case 'xlsx':
                toExcel();
                break;

            case 'html':
                toHtml();
                break;

            case 'json':
                toJSON();
                break;

            case 'md':
                toMd();
                break;

            case 'sql':
                toSql();
                break;

            case 'text':
                toText();
                break;

            case 'tsv':
                toTsv();
                break;

            case 'xml':
                toXml();
                break;

            case 'yaml':
                toYaml();
                break;

            case 'rtf':
                toRtf();
                break;

            case 'word':
                toWord();
                break;

            default:
                break;
        }
    }

    const downloadFunction = (text, type, extension) => {
        const blob = new Blob([text], { type: `text/${type}` });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `output.${extension}`;
        link.click();
        URL.revokeObjectURL(url);
    }

    const handleDownload = () => {
        switch (to) {
            case 'csv':
                downloadFunction(convertedText, 'csv', 'csv');
                break;

            case 'xlsx':
                const ws = XLSX.utils.aoa_to_sheet(convertedText);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'PDF Data');
                XLSX.writeFile(wb, 'output.xlsx');
                break;

            case 'html':
                downloadFunction(convertedText, 'html', 'html');
                break;

            case 'json':
                downloadFunction(convertedText, 'json', 'json');
                break;

            case 'md':
                downloadFunction(convertedText, 'markdown', 'md');
                break;

            case 'sql':
                downloadFunction(convertedText, 'sql', 'sql');
                break;

            case 'text':
                downloadFunction(convertedText, 'txt', 'txt');
                break;

            case 'tsv':
                downloadFunction(convertedText, 'tsv', 'tsv');
                break;

            case 'xml':
                downloadFunction(convertedText, 'xml', 'xml');
                break;

            case 'yaml':
                downloadFunction(convertedText, 'yaml', 'yaml');
                break;

            case 'rtf':
                downloadFunction(convertedText, 'rtf', 'rtf');
                break;

            case 'word':
                const doc = new Document({
                    sections: [{
                        properties: {},
                        children: convertedText,
                    }],
                });

                Packer.toBlob(doc).then((blob) => {
                    saveAs(blob, 'output.doc');
                });

                setConvertedText(doc);
                break;

            default:
                break;
        }

        setFile(null);
        setConvertedText(null);
        setPdfPages([])
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>{from.toUpperCase()} to {to.toUpperCase()} Converter</h1>
            <p className='text-center text-gray500 my-5'>Convert {from.toUpperCase()} to {to.toUpperCase()} online for free</p>
            <input type="file" accept={`.${from}`} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <p><span className='text-[red]'>*</span> <span className='dark:text-white'>Select Only Text based pdf file</span></p>
                <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                <button className={`mx-auto ${!file ? "bg-gray600" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!file} onClick={convert}>Convert to {to.toUpperCase()}</button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto mt-5'>
                {
                    !convertedText &&
                    pdfPages.map((page, index) => (
                        <div className='flex flex-col justify-center items-center'>
                            <p className='dark:text-white'>Page : {index + 1}</p>
                            <img key={index} src={page} alt={`Page ${index + 1}`} className='border' style={{ margin: '10px', width: '100%' }} />
                        </div>
                    ))
                }
            </div>
            {
                convertedText &&
                <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                    <p className='dark:text-white font-semibold'>Results : </p>
                    <textarea
                        rows={5}
                        className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                        value={convertedText}
                        readOnly
                    ></textarea>
                    <button className='mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={handleDownload}>Download</button>
                </div>

            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default PdfToAnyText