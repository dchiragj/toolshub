import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from "@pdf-lib/fontkit"
import FreeTools from "../../components/FreeTools"
import WebTools from "../../components/WebTools"

const AnyTextTypeToPDF = ({ type }) => {

    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");

    const handleFileChange = (e) => {
        const files = e.target.files[0];
        setFile(files);
        let content;
        if (files) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                content = e.target.result;
                setText(content);
            }
            reader.readAsText(files);
        }
    }

    // const convert = async () => {
    //     const pdfDoc = await PDFDocument.create();

    //     const page = pdfDoc.addPage();

    //     page.drawText(text, {
    //         x: 40,
    //         y: 800,
    //     });

    //     const pdfBytes = await pdfDoc.save();
    //     const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    //     const pdfUrl = URL.createObjectURL(pdfBlob);

    //     setPdfUrl(pdfUrl);
    // }

    // const convert = async () => {
    //     const pdfDoc = await PDFDocument.create();
    //     pdfDoc.registerFontkit(fontkit);

    //     const fontUrl = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf'; // You can change this URL to your custom font file URL
    //     const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
    //     const customFont = await pdfDoc.embedFont(fontBytes);

    //     let page = pdfDoc.addPage();

    //     const styles = text.split(';').reduce((acc, style) => {
    //         const [key, value] = style.split(':').map(s => s.trim());
    //         if (key && value) {
    //             acc[key] = value;
    //         }
    //         return acc;
    //     }, {});

    //     const textColor = styles.color ? rgb(
    //         parseInt(styles.color.slice(1, 3), 16) / 255,
    //         parseInt(styles.color.slice(3, 5), 16) / 255,
    //         parseInt(styles.color.slice(5, 7), 16) / 255
    //     ) : rgb(0, 0, 0);

    //     const fontSize = styles['font-size'] ? parseInt(styles['font-size']) : 12;

    //     const lines = text.split('\n');
    //     let y = page.getHeight() - 50;

    //     lines.forEach(line => {
    //         const textWidth = customFont.widthOfTextAtSize(line, fontSize);
    //         const maxWidth = page.getWidth() - 100;

    //         if (textWidth > maxWidth) {
    //             const words = line.split(' ');
    //             let currentLine = '';
    //             words.forEach(word => {
    //                 const width = customFont.widthOfTextAtSize(`${currentLine} ${word}`, fontSize);
    //                 if (width < maxWidth) {
    //                     currentLine += ` ${word}`;
    //                 } else {
    //                     page.drawText(currentLine.trim(), {
    //                         x: 50,
    //                         y,
    //                         size: fontSize,
    //                         color: textColor,
    //                         font: customFont,
    //                     });
    //                     currentLine = word;
    //                     y -= fontSize + 10;
    //                     if (y < 50) {
    //                         y = page.getHeight() - 50;
    //                         page = pdfDoc.addPage();
    //                     }
    //                 }
    //             });
    //             page.drawText(currentLine.trim(), {
    //                 x: 50,
    //                 y,
    //                 size: fontSize,
    //                 color: textColor,
    //                 font: customFont,
    //             });
    //             y -= fontSize + 10;
    //             if (y < 50) {
    //                 y = page.getHeight() - 50;
    //                 page = pdfDoc.addPage();
    //             }
    //         } else {
    //             page.drawText(line, {
    //                 x: 50,
    //                 y,
    //                 size: fontSize,
    //                 color: textColor,
    //                 font: customFont,
    //             });
    //             y -= fontSize + 10;
    //             if (y < 50) {
    //                 y = page.getHeight() - 50;
    //                 page = pdfDoc.addPage();
    //             }
    //         }
    //     });

    //     const pdfBytes = await pdfDoc.save();
    //     const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    //     const pdfUrl = URL.createObjectURL(pdfBlob);

    //     setPdfUrl(pdfUrl)
    // };

    const parseCSSColor = (color) => {
        if (color.startsWith('#')) {
            return {
                r: parseInt(color.slice(1, 3), 16) / 255,
                g: parseInt(color.slice(3, 5), 16) / 255,
                b: parseInt(color.slice(5, 7), 16) / 255,
            };
        }
        return { r: 0, g: 0, b: 0 };
    };

    const convert = async () => {
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        const fontUrl = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf'; // You can change this URL to your custom font file URL
        const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
        const customFont = await pdfDoc.embedFont(fontBytes);

        let page = pdfDoc.addPage();

        const styles = text.split(';').reduce((acc, style) => {
            const [key, value] = style.split(':').map(s => s.trim());
            if (key && value) {
                acc[key] = value;
            }
            return acc;
        }, {});

        const textColor = styles.color ? rgb(
            parseCSSColor(styles.color).r,
            parseCSSColor(styles.color).g,
            parseCSSColor(styles.color).b
        ) : rgb(0, 0, 0);

        const fontSize = styles['font-size'] ? parseInt(styles['font-size']) : 12;

        const lines = text.split('\n');
        let y = page.getHeight() - 50;

        lines.forEach(line => {
            const textWidth = customFont.widthOfTextAtSize(line, fontSize);
            const maxWidth = page.getWidth() - 100;

            if (textWidth > maxWidth) {
                const words = line.split(' ');
                let currentLine = '';
                words.forEach(word => {
                    const width = customFont.widthOfTextAtSize(`${currentLine} ${word}`, fontSize);
                    if (width < maxWidth) {
                        currentLine += ` ${word}`;
                    } else {
                        page.drawText(currentLine.trim(), {
                            x: 50,
                            y,
                            size: fontSize,
                            color: textColor,
                            font: customFont,
                        });
                        currentLine = word;
                        y -= fontSize + 10;
                        if (y < 50) {
                            y = page.getHeight() - 50;
                            page = pdfDoc.addPage();
                        }
                    }
                });
                page.drawText(currentLine.trim(), {
                    x: 50,
                    y,
                    size: fontSize,
                    color: textColor,
                    font: customFont,
                });
                y -= fontSize + 10;
                if (y < 50) {
                    y = page.getHeight() - 50;
                    page = pdfDoc.addPage();
                }
            } else {
                page.drawText(line, {
                    x: 50,
                    y,
                    size: fontSize,
                    color: textColor,
                    font: customFont,
                });
                y -= fontSize + 10;
                if (y < 50) {
                    y = page.getHeight() - 50;
                    page = pdfDoc.addPage();
                }
            }
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        setPdfUrl(pdfUrl);


    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'sample.pdf';
        link.click();
        link.remove();
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>{type.toUpperCase()} to PDF Converter</h1>
            <p className='text-center text-gray500 my-5'>Convert {type.toUpperCase()} to PDF online for free</p>
            <input type="file" accept={`.${type}`} onChange={handleFileChange} className='hidden' />
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <button className=' mx-auto bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                <p className='dark:text-white font-semibold'>OR</p>
                <textarea
                    rows="5"
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    placeholder={`Enter ${type} text`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button className={`px-5 py-2 ${!file && !text ? "bg-gray600" : "bg-lightBlue"} text-white rounded-lg`} disabled={!file && !text} onClick={convert}>Generate PDF</button>
                {
                    pdfUrl &&
                    <button className={`px-5 py-2 bg-lightBlue text-white rounded-lg`} disabled={!file && !text} onClick={handleDownload}>Download</button>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default AnyTextTypeToPDF;