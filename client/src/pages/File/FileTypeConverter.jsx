import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import TurndownService from 'turndown';
import CopyToClipboard from 'react-copy-to-clipboard';
import { marked } from 'marked';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import WebTools from '../../components/WebTools';

const FileTypeConverter = ({ from, to }) => {

    const [file, setFile] = useState(null);
    const [convertedFile, setConvertedFile] = useState("");
    const [text, setText] = useState("");
    const [convertedText, setConvertedText] = useState("");
    const [copyText, setCopyText] = useState(false);

    const fromFileType = from === 'Text' ? '.txt' : (from === 'DOC' && to !== 'Excel') ? '.doc' : (from === 'DOC' && to === 'Excel') ? '.docx' : from === 'Excel' ? '.xlx , .xlsx' : from === 'CSV' ? '.csv' : from === 'MD' ? '.md' : from === 'HTML' ? '.html' : from === 'SRT' ? '.srt' : from === 'VTT' ? '.vtt' : '';

    const toFileType = to === 'Word' ? 'doc' : to === 'HTML' ? 'html' : to === 'CSV' ? 'csv' : to === 'Excel' ? 'xlsx' : to === 'JSON' ? 'json' : to === 'SQL' ? 'sql' : to === 'TSV' ? 'tsv' : to === 'VTT' ? 'vtt' : to === 'SRT' ? 'srt' : '';

    const handleChange = (e) => {
        setFile(e.target.files[0])
    };

    if (copyText) {
        alert("Copied to Clipboard");
        setCopyText(false)
    }

    const convert = () => {
        let fileContent;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                fileContent = e.target.result;
                let converted;
                if (to === 'Html') {
                    converted = `<html><body>${fileContent}</body></html>`
                    setConvertedFile(converted)
                } else if ((from === 'DOC' && to === 'Excel') || (from === 'Text' && to === 'Excel')) {
                    mammoth.extractRawText({ arrayBuffer: file })
                        .then((result) => {
                            const content = result.value;
                            const rows = content.split('\n').map(row => [row]);

                            const newWorkbook = XLSX.utils.book_new();
                            const worksheet = XLSX.utils.aoa_to_sheet(rows);
                            XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'Sheet1');

                            converted = newWorkbook;
                            setConvertedFile(converted)
                        })
                        .catch((error) => {
                            console.error('Error extracting:', error);
                            alert('Error extracting from file. Please try again.');
                        })
                } else if (from === 'Text' && to === 'Excel') {
                    const rows = fileContent.split('\n').map(row => row.split('\t'));
                    const worksheet = XLSX.utils.aoa_to_sheet(rows);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                    setConvertedFile(workbook)
                } else if (from === 'Excel' && to === 'JSON') {
                    const data = new Uint8Array(fileContent);
                    const workbook = XLSX.read(data, { type: 'array' });

                    // Assuming you want to convert the first sheet
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    setConvertedFile(json);
                } else if (from === 'Text' && to === 'JSON') {
                    const lines = fileContent.split('\n');
                    const json = lines.map(line => {
                        const [key, value] = line.split(':');
                        return { [key.trim()]: value ? value.trim() : null };
                    });
                    setConvertedFile(json);
                } else if (from === 'CSV' && to === 'JSON') {
                    Papa.parse(file, {
                        complete: (results) => {
                            const json = results.data.map(row => {
                                const obj = {};
                                for (let i = 0; i < results.meta.fields.length; i++) {
                                    obj[results.meta.fields[i]] = row[i];
                                }
                                return obj;
                            });
                            setConvertedFile(json);
                        },
                        header: true,
                        skipEmptyLines: true,
                    });
                } else if (from === 'CSV' && to === 'Excel') {
                    const parsedData = XLSX.read(fileContent, { type: 'string' });

                    const ws = XLSX.utils.sheet_add_json(XLSX.utils.aoa_to_sheet(parsedData), { skipHeader: true });
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                    setConvertedFile(wb)
                } else if (from === 'CSV' && to === 'HTML') {
                    Papa.parse(file, {
                        header: true,
                        complete: (results) => {
                            setConvertedFile(results.data);
                        },
                        error: (error) => {
                            console.error("Error reading CSV file:", error);
                            alert("Failed to read the CSV file.");
                        },
                    });
                } else if (from === 'CSV' && to === 'SQL') {
                    Papa.parse(file, {
                        header: true,
                        complete: (results) => {
                            setConvertedFile(results.data);
                        },
                        error: (error) => {
                            console.error("Error reading CSV file:", error);
                            alert("Failed to read the CSV file.");
                        },
                    });
                } else if (from === 'CSV' && to === 'TSV') {
                    setConvertedFile(fileContent)
                } else if (from === 'Excel' && to === 'HTML') {
                    const data = new Uint8Array(fileContent);
                    const workbook = XLSX.read(data, { type: 'array' });

                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    const html = json.map(row =>
                        `<tr>${row.map(cell => `<td>${cell || ''}</td>`).join('')}</tr>`
                    ).join('');

                    setConvertedFile(`<table>${html}</table>`);
                } else if (from === 'MD' && to === 'Word') {
                    setConvertedFile(fileContent);
                } else if (from === 'SRT' && to === 'VTT') {
                    const vttHeader = 'WEBVTT\n\n';
                    const vttContent = fileContent
                        .replace(/(\r\n|\n|\r)/g, '\n')
                        .split('\n\n')
                        .map((block) => {
                            const lines = block.split('\n');
                            if (lines.length < 3) return '';

                            const timestamp = lines[1].replace(',', '.');
                            return `${lines[0]}\n${timestamp}\n${lines.slice(2).join('\n')}\n`;
                        })
                        .join('\n');

                    converted = vttHeader + vttContent.trim();
                    setConvertedFile(converted);
                } else if (from === 'VTT' && to === 'SRT') {
                    const srtContent = fileContent
                        .replace(/WEBVTT\s*[\n\r]/, '')
                        .replace(/\.\d+/g, ',')
                        .trim()
                        .split('\n\n')
                        .map((block, index) => {
                            const lines = block.split('\n');
                            if (lines.length < 2) return '';

                            const indexLine = (index + 1).toString();
                            const timestampLine = lines[0];
                            const textLine = lines.slice(1).join('\n');

                            return `${indexLine}\n${timestampLine}\n${textLine}\n`;
                        })
                        .join('\n');

                    setConvertedFile(srtContent);
                } else {
                    setConvertedFile(fileContent)
                }
            }
            { (from === "Excel" && to === 'JSON') || (from === 'Excel' && to === 'HTML') ? reader.readAsArrayBuffer(file) : reader.readAsText(file) };
        }
    }

    const handleDownload = async () => {
        if (to === 'Excel') {
            XLSX.writeFile(convertedFile, 'converted_file.xlsx');
        } else if (to === 'JSON') {
            const blob = new Blob([JSON.stringify(convertedFile, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted_data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        else if (from === 'CSV' && to === 'Excel') {
            XLSX.writeFile(convertedFile, 'converted_data.xlsx');
        }
        else if (from === 'CSV' && to === 'HTML') {
            const htmlContent = `
            <html>
                <head>
                    <title>CSV Data</title>
                </head>
                <body>
                ${convertedFile.map(row => `
                <div>
                    ${Object.entries(row).map(([key, value]) => `
                        <strong>${key}:</strong> ${value}<br/>
                    `).join('')}
                </div>
            `).join('<hr/>')}
                </body>
            </html>
        `;

            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'csv_data.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else if (from === 'CSV' && to === 'SQL') {
            const tableName = "your_table_name";
            const sqlStatements = convertedFile.map(row => {
                const columns = Object.keys(row).join(", ");
                const values = Object.values(row)
                    .map(value => `'${value.replace(/'/g, "''")}'`)
                    .join(", ");
                return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
            }).join("\n");

            const blob = new Blob([sqlStatements], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'output.sql';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else if (to === 'TSV') {
            const lines = convertedFile.split('\n');
            const tsv = lines.map(line => line.split(',').join('\t')).join('\n');

            const blob = new Blob([tsv], { type: 'text/tab-separated-values' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.tsv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else if (from === 'Excel' && to === 'HTML') {
            const blob = new Blob([convertedFile], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else if (from === 'MD' && to === 'Word') {
            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [],
                }],
            });

            const paragraphs = convertedFile.split(/\n+/).filter(paragraph => paragraph.trim() !== '');

            paragraphs.forEach(paragraph => {
                doc.addSection({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(paragraph),
                            ],
                        }),
                    ],
                });
            });

            Packer.toBlob(doc).then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'document.doc';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        } else if (from === 'HTML' && to === 'Word') {
            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [],
                }],
            });

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = convertedFile;
            const paragraphs = tempDiv.innerText.split('\n').filter(paragraph => paragraph.trim() !== '');

            paragraphs.forEach(paragraph => {
                doc.addSection({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(paragraph),
                            ],
                        }),
                    ],
                });
            });

            const blob = await Packer.toBlob(doc);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'document.doc';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else if (from === 'SRT' && to === 'VTT') {
            const blob = new Blob([convertedFile], { type: 'text/vtt' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'subtitles.vtt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else if (from === 'VTT' && to === 'SRT') {
            const blob = new Blob([convertedFile], { type: 'text/srt' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'subtitles.srt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            const blob = new Blob([convertedFile], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `converted_file.${toFileType}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        setFile(null);
        setConvertedFile("");
    }

    const convertToHTML = () => {
        const html = marked(text);
        setConvertedText(html);
    }

    const convertToMD = () => {
        const turndownService = new TurndownService();
        const markdown = turndownService.turndown(text);
        setConvertedText(markdown);
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            {
                from !== '' && to !== '' ?
                    <>
                        <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>{from} to {to} Converter</h1>
                        <p className='text-center text-gray500 my-5'>Easily convert {from} to {to} online for free.</p>
                        <input type="file" accept={`${fromFileType}`} onChange={handleChange} className='hidden' />
                        <div className='flex flex-col justify-center items-center gap-5'>
                            <button className=' mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                            {
                                file &&
                                <p className='text-center dark:text-white'>Selected : {file.name}</p>
                            }
                            {
                                convertedFile ? <button className=' mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={handleDownload}>Download File</button> :
                                    <button className={`mx-auto ${!file ? "bg-gray500" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!file} onClick={convert}>Convert to {to}</button>
                            }
                        </div>
                    </> :
                    <>
                        <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>HTML to MD and MD to HTML Converter</h1>
                        <p className='text-center text-gray500 my-5'>Easily convert markdown online for free.</p>
                        <div className='w-[90%] sm:w-[80%] mx-auto'>
                            <textarea
                                rows={5}
                                className='w-full border-2 border-lightBlue rounded-lg p-3'
                                placeholder='Enter HTML or Markdown'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div className='flex flex-wrap justify-center items-center gap-5 mt-5'>
                            <button className={`${!text ? "bg-gray500" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!text} onClick={convertToMD}>Convert to Markdown</button>
                            <button className={`${!text ? "bg-gray500" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!text} onClick={convertToHTML}>Convert to HTML</button>
                            <CopyToClipboard text={convertedText} onCopy={() => setCopyText(true)}>
                                <button className={`${!convertedText ? "bg-gray500" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!convertedText}>Copy</button>
                            </CopyToClipboard>
                            <button className={`${!convertedText ? "bg-gray500" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!convertedText} onClick={() => { setText(""); setConvertedText("") }}>Reset</button>
                        </div>
                        {
                            convertedText &&
                            <div className='w-[90%] sm:w-[80%] mx-auto mt-6'>
                                <div className='font-semibold mb-4 text-center text-xl'>
                                    Output :
                                </div>
                                <textarea
                                    rows={5}
                                    className='w-full border-2 border-lightBlue rounded-lg p-3'
                                    placeholder='Enter HTML or Markdown'
                                    value={convertedText}
                                    readOnly
                                >
                                </textarea>
                            </div>
                        }
                    </>
            }
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default FileTypeConverter