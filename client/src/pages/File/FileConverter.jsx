import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools';
import WebTools from '../../components/WebTools';

const FileConverter = () => {

    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [format, setFormat] = useState("");
    const [converted, setConverted] = useState("");

    const formatOptions = [
        { value: "txt", label: "TXT" },
        { value: "doc", label: "DOC" },
        { value: "docx", label: "DOCX" },
        { value: "xls", label: "XLX" },
        { value: "ppt", label: "PPT" },
        { value: "csv", label: "CSV" },
        { value: "html", label: "HTML" },
        { value: "xml", label: "XML" },
        { value: "js", label: "JS" },
        { value: "css", label: "CSS" },
        { value: "php", label: "PHP" },
        { value: "py", label: "PYTHON" },
        { value: "ini", label: "INI" },
        { value: "yaml", label: "YAML" },
        { value: "tsv", label: "TSV" },
        { value: "srt", label: "SRT" },
        { value: "vtt", label: "VTT" },
        { value: "sql", label: "SQL" },
        { value: "env", label: "ENV" },
        { value: "md", label: "MD" },
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "cs", label: "C#" },
        { value: "apk", label: "APK" },
        { value: "bin", label: "BIN" },
        { value: "dat", label: "DAt" },
        { value: "sty", label: "STY" },
    ]

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleGenerateDownload = async () => {
        let fileContent;
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                fileContent = e.target.result;
                let convertedContent;

                switch (format) {
                    case 'html':
                        convertedContent = `<html><body>${fileContent}</body></html>`
                        break;

                    case 'xml':
                        convertedContent = `<data>${fileContent}</data>`
                        break;

                    default:
                        convertedContent = fileContent
                }
                setConverted(convertedContent)
            }
            reader.readAsText(file);
        } else {
            fileContent = text;
            let convertedContent;
            switch (format) {
                case 'html':
                    convertedContent = `<html><body>${fileContent}</body></html>`
                    break;

                case 'xml':
                    convertedContent = `<data>${fileContent}</data>`
                    break;

                default:
                    convertedContent = fileContent
            }
            setConverted(convertedContent)
        }
    }

    const handleDownload = () => {
        const blob = new Blob([converted], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted_file.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up
        setFile(null);
        setText("");
        setFormat("");
        setConverted("");
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>File Generator</h1>
            <p className='text-center text-gray500 my-5'>Easily generate all formats file online for free.</p>
            <input type="file" accept='text/plain' onChange={handleChange} className='hidden' />
            <div className='flex justify-center items-center'>
                <button className=' mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
            </div>
            <p className='text-center dark:text-white my-5'>OR</p>
            <div className='w-[90%] sm:w-[80%] mx-auto'>

                <textarea
                    rows="5"
                    placeholder='Enter or Paste Text here ...'
                    className='w-full border-2 border-lightBlue p-2 rounded-lg outline-none'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>
            {
                file &&
                <p className='text-center dark:text-white text-xl'>Selected : {file.name}</p>
            }
            {
                (file || text) &&
                <div className='flex flex-col mt-5 justify-center items-center gap-5'>
                    <div className='flex justify-center items-center gap-3'>
                        <p className='dark:text-white'>Choose File Format : </p>
                        <select value={format} onChange={(e) => setFormat(e.target.value)} className='rounded-lg p-3 border outline-none'>
                            <option value="" disabled>Select Format</option>
                            {
                                formatOptions.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.label}</option>
                                })
                            }
                        </select>
                    </div>
                    {
                        converted ?
                            <button className={`mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg`} onClick={handleDownload}>Download File</button> :
                            <button className={`${(!file && !text) || !format ? "bg-gray600" : "bg-lightBlue"} mx-auto px-6 py-3 text-white rounded-lg`} disabled={(!file && !text) || !format} onClick={handleGenerateDownload}>Generate & Download File</button>
                    }
                </div>
            }
            <FreeTools />
            <WebTools />
        </div >
    )
}

export default FileConverter