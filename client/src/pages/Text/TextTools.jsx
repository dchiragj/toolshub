import React, { useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import CopyToClipboard from 'react-copy-to-clipboard';
import FreeTools from '../../components/FreeTools';
import CryptoJS from 'crypto-js';
import WebTools from '../../components/WebTools';

const TextTools = ({ title, title1 }) => {

    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [convertedText, setConvertedText] = useState("");
    const [lineNumberOpt, setLineNumberOpt] = useState({
        startFrom: 1,
        stepBy: 1
    })
    const [copyText, setCopyText] = useState(false);
    const [wordAnalysis, setWordAnalysis] = useState({
        characters: '',
        Words: '',
        Phrases: '',
        Sentences: '',
        ReadingTime: '',
        TopKeywords: '',
        CharactersWithWhitespace: '',
        CharactersWithoutWhitespace: '',
        MostCommonWords: '',
        ReadabilityScore: '',
        EstimatedReadingTime: ''
    });
    const [textCase, setTextCase] = useState('');
    const [sortOrder, setSortOrder] = useState(1);
    const [hashType, setHashType] = useState('md5');

    if (copyText) {
        alert("Copied to clipboard.")
        setCopyText(false)
    }

    const handleFileChange = (e) => {
        let files = e.target.files[0];
        setFile(files);
        if (files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setText(e.target.result);
            };
            reader.onerror = () => {
                alert("Error");
                setText('');
            };
            reader.readAsText(files);
        }
    }

    const addLineNumber = () => {
        const lines = text.split("\n");
        let numberedText = '';

        lines.forEach((line, index) => {
            const lineNumber = lineNumberOpt.startFrom + index * lineNumberOpt.stepBy;
            numberedText += `${lineNumber}: ${line}\n`;
        });

        setConvertedText(numberedText);
        setText("");
        setFile(null);
    }

    const bbConverter = () => {
        const textOutput = text.replace(/\[.*?\]/g, '').trim();
        setConvertedText(textOutput);
    }

    const textToBinary = () => {
        const binary = text
            .split('')
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join(' ');
        setConvertedText(binary);
    }

    const getCommonWords = (text) => {
        const wordsArray = text.toLowerCase().match(/\w+/g) || [];
        const wordCounts = {};
        wordsArray.forEach(word => {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        });
        return Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word]) => word);
    };

    const calculateReadability = (text) => {
        const wordsArray = text.split(/\s+/).filter(Boolean);
        const wordCount = wordsArray.length;
        const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
        const syllableCount = wordsArray.reduce((count, word) => count + countSyllables(word), 0);

        if (sentenceCount === 0 || wordCount === 0) return 0;
        return 206.835 - (1.015 * (wordCount / sentenceCount)) - (84.6 * (syllableCount / wordCount));
    };

    const countSyllables = (word) => {
        word = word.toLowerCase();
        if (word.length <= 3) return 1; // simple heuristic for short words
        return word.match(/[aeiouy]{1,2}/g)?.length || 0;
    };

    const wordCounter = () => {
        const texts = text.trim();
        const charactersWithWhitespace = texts.length;
        const charactersWithoutWhitespace = texts.replace(/\s+/g, '').length;
        const words = texts.split(/\s+/).filter(Boolean).length;
        const phrases = texts.split(/[,.!?]+/).filter(Boolean).length;
        const sentences = texts.split(/[.!?]+/).filter(Boolean).length;
        const readingTime = Math.ceil(words / 200); // assuming average reading speed of 200 wpm
        const commonWords = getCommonWords(texts);
        const readabilityScore = calculateReadability(texts);

        setWordAnalysis({
            characters: charactersWithoutWhitespace,
            Words: words,
            Phrases: phrases,
            Sentences: sentences,
            ReadingTime: readingTime,
            TopKeywords: commonWords,
            CharactersWithWhitespace: charactersWithWhitespace,
            charactersWithoutWhitespace: charactersWithoutWhitespace,
            ReadabilityScore: readabilityScore,
        });
    }

    const reverseText = () => {
        const reverseTexts = text
            .split(' ')
            .map(word => word.split('').reverse().join(''))
            .reverse()
            .join(' ');;
        setConvertedText(reverseTexts);
    }

    const textCaseConverter = () => {
        if (!textCase) {
            alert("Select Text Case");
        } else {
            switch (textCase) {
                case 'upper':
                    setConvertedText(text.toUpperCase());
                    break;

                case 'lower':
                    setConvertedText(text.toLowerCase());
                    break;

                case 'sentence':
                    setConvertedText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
                    break;

                case 'title':
                    const texts = text
                        .split(' ')
                        .map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                        )
                        .join(' ');

                    setConvertedText(texts)
                    break;

                case 'pascal':
                    const pascal = text
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join('');
                    setConvertedText(pascal);
                    break;

                case 'snake':
                    const snack = text
                        .split(' ')
                        .map(word => word.toLowerCase())
                        .join('_');
                    setConvertedText(snack);
                    break;

                case 'kebab':
                    const kebab = text
                        .split(' ')
                        .map(word => word.toLowerCase())
                        .join('-');
                    setConvertedText(kebab);
                    break;

                case 'camel':
                    const camel = text
                        .split(' ')
                        .map((word, index) => {
                            return index === 0
                                ? word.toLowerCase()
                                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                        })
                        .join('');
                    setConvertedText(camel);
                    break;

                case 'dot':
                    const dot = text
                        .split(' ')
                        .map(word => word.toLowerCase())
                        .join('.');
                    setConvertedText(dot);
                    break;

                default:
                    break;
            }
        }
    }

    const listSorter = () => {
        if (!sortOrder) {
            alert("Select Sort Order to sort list.")
        } else {
            switch (sortOrder) {
                case 1:
                    const asc = text.split(' ').sort().join(' ');
                    setConvertedText(asc);
                    break;

                case 2:
                    const desc = text.split(' ').sort().reverse().join(' ')
                    setConvertedText(desc);
                    break;

                default:
                    break;
            }
        }
    }

    const removeEmoji = () => {
        const emojiFreeText = text.replace(/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1F0A0}-\u{1F0FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}]/gu, '');
        setConvertedText(emojiFreeText);

    }

    const letterAccents = () => {
        const accentFreeText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
        setConvertedText(accentFreeText)
    }

    const superscriptMap = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
        'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ',
        'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
        'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ',
        'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ',
        'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ'
    };

    const subscriptMap = {
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
        '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
        'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
        'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
        'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
        'v': 'ᵥ', 'x': 'ₓ'
    };

    const convertText = (text, map) => {
        return text.split('').map(char => map[char] || char).join('');
    };

    const scriptConvert = (mode) => {
        const map = mode === 'superScript' ? superscriptMap : subscriptMap;
        setConvertedText(convertText(text, map));
    };

    const upsideDownMap = {
        'A': '∀', 'B': 'ƃ', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ',
        'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '⅃',
        'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'Я',
        'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
        'Y': '⅄', 'Z': 'Ƨ', '0': '0', '1': 'Ɩ', '2': '˥', '3': 'Ɛ',
        '4': 'h', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ',
        'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': '⅃',
        'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ',
        's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
        'y': 'ʎ', 'z': 'z'
    };

    const upsideDownText = () => {
        const result = text.split('').reverse().map(char => {
            return upsideDownMap[char] || char;
        }).join('');

        setConvertedText(result)
    };

    const hashGenerator = () => {
        let hash

        switch (hashType) {
            case 'md5':
                hash = CryptoJS.MD5(text).toString();
                break;
            case 'base64':
                hash = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
                break;
            case 'sha1':
                hash = CryptoJS.SHA1(text).toString();
                break;
            case 'sha224':
                hash = CryptoJS.SHA224(text).toString();
                break;
            case 'sha256':
                hash = CryptoJS.SHA256(text).toString();
                break;
            case 'sha384':
                hash = CryptoJS.SHA384(text).toString();
                break;
            case 'sha512':
                hash = CryptoJS.SHA512(text).toString();
                break;
            case 'sha3224':
                hash = CryptoJS.SHA3(text, { outputLength: 224 }).toString();
                break;
            case 'sha3256':
                hash = CryptoJS.SHA3(text, { outputLength: 256 }).toString();
                break;
            case 'sha3384':
                hash = CryptoJS.SHA3(text, { outputLength: 384 }).toString();
                break;
            case 'sha3512':
                hash = CryptoJS.SHA3(text, { outputLength: 512 }).toString();
                break;
            default:
                hash = '';
        }

        setConvertedText(hash);
    };

    const convert = () => {
        switch (title) {
            case 'Add Line Number':
                addLineNumber();
                break;

            case 'BB To Text Converter':
                bbConverter();
                break;

            case 'Text to Binary Converter':
                textToBinary();
                break;

            case 'Word Counter':
                wordCounter();
                break;

            case 'Reverse Text':
                reverseText();
                break;

            case 'Text Case Converter':
                textCaseConverter();
                break;

            case 'List Sorter':
                listSorter();
                break;

            case 'Remove Emojis from Text':
                removeEmoji();
                break;

            case 'Remove Letter Accents':
                letterAccents();
                break;

            case 'Upside Down Text Generator':
                upsideDownText();
                break;

            case 'Hashes Generator':
                hashGenerator();
                break;

            default:
                break;
        }
    }

    const handleReset = () => {
        setText("");
        setConvertedText("");
        setFile(null);
        setLineNumberOpt({
            startFrom: 1,
            stepBy: 1
        })
        setWordAnalysis({
            characters: '',
            Words: '',
            Phrases: '',
            Sentences: '',
            ReadingTime: '',
            TopKeywords: '',
            CharactersWithWhitespace: '',
            CharactersWithoutWhitespace: '',
            MostCommonWords: '',
            ReadabilityScore: '',
            EstimatedReadingTime: ''
        });
        setTextCase('');
        setSortOrder(1);
        setHashType('md5')
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>{title}</h1>
            <p className='text-center text-gray500 my-5'>{title1}</p>
            <div className='w-[90%] sm:w-[80%] mx-auto flex flex-col justify-center items-center gap-5'>
                <input type="file" accept='.txt' onChange={handleFileChange} className='hidden' />
                <button className='bg-lightBlue px-6 py-3 text-white rounded-lg' onClick={() => document.querySelector('input[type="file"]').click()}>Choose File</button>
                {file && <p className='text-xl dark:text-white font-semibold'>Selected : {file.name}</p>}
                <p className='text-xl dark:text-white font-bold'>OR</p>
                <textarea
                    rows={5}
                    className='w-full border-2 border-lightBlue rounded-lg p-3'
                    placeholder='Enter Text ...'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                >
                </textarea>
                {
                    title === 'List Sorter' &&
                    <div className='flex justify-center items-center gap-2'>
                        <span className='dark:text-white'>Sort Order : </span>
                        <select className='border p-2 rounded-lg outline-none' value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}>
                            <option value={1}>Ascending</option>
                            <option value={2}>Descending</option>
                        </select>
                    </div>
                }
                {
                    title === 'Text Case Converter' &&
                    <div className='flex justify-center items-center gap-2'>
                        <span className='dark:text-white'>Select Case : </span>
                        <select className='border p-2 rounded-lg outline-none' value={textCase} onChange={(e) => setTextCase(e.target.value)}>
                            <option value="">Select Case</option>
                            <option value="upper">UPPER CASE</option>
                            <option value="lower">lower case</option>
                            <option value="sentence">Sentence case</option>
                            <option value="title">Title case</option>
                            <option value="pascal">Pascal Case</option>
                            <option value="snake">snack_case</option>
                            <option value="kebab">kebab-case</option>
                            <option value="camel">camelCase</option>
                            <option value="dot">dot.separated</option>
                        </select>
                    </div>
                }
                {
                    title === 'Add Line Number' &&
                    <div className='flex flex-wrap justify-center items-center gap-5'>
                        <div className='flex justify-center items-center gap-2'>
                            <span>Start From : </span>
                            <input
                                type="text"
                                className='border-2 border-gray500 rounded-lg p-1'
                                value={lineNumberOpt.startFrom}
                                onChange={(e) => setLineNumberOpt({ ...lineNumberOpt, startFrom: e.target.value })}
                            />
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <span>Step By : </span>
                            <input
                                type="text"
                                className='border-2 border-gray500 rounded-lg p-1'
                                value={lineNumberOpt.stepBy}
                                onChange={(e) => setLineNumberOpt({ ...lineNumberOpt, stepBy: e.target.value })}
                            />
                        </div>
                    </div>
                }
                {
                    title === 'Hashes Generator' &&
                    <div className='flex justify-center items-center gap-2'>
                        <span className='dark:text-white'>Select Conversion Type : </span>
                        <select className='border p-2 rounded-lg outline-none' value={hashType} onChange={(e) => setHashType(e.target.value)}>
                            <option value="md5">MD5 Hash</option>
                            <option value="base64">Base64</option>
                            <option value="sha1">SHA-1</option>
                            <option value="sha224">SHA-224</option>
                            <option value="sha256">SHA-256</option>
                            <option value="sha384">SHA-384</option>
                            <option value="sha512">SHA-512</option>
                            <option value="sha3224">SHA3-224</option>
                            <option value="sha3256">SHA3-256</option>
                            <option value="sha3384">SHA3-384</option>
                            <option value="sha3512">SHA3-512</option>
                        </select>
                    </div>
                }
                {
                    title !== 'Small Text Generator' ?
                        <button className={`${!text ? "bg-gray500" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!text} onClick={convert}>Apply</button>
                        :
                        <div className='flex justify-center items-center gap-5'>
                            <button className={`${!text ? "bg-gray500" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!text} onClick={() => scriptConvert('superScript')}>Convert to SuperScript</button>
                            <button className={`${!text ? "bg-gray500" : "bg-lightBlue"} px-6 py-3 text-white rounded-lg`} disabled={!text} onClick={() => scriptConvert('subScript')}>Convert to Subscript</button>
                        </div>
                }
                {
                    convertedText && title !== 'Word Counter' &&
                    <>
                        <p className='dark:text-white font-semibold text-xl'>Result : </p>
                        <textarea
                            rows={5}
                            className='w-full border-2 border-lightBlue rounded-lg p-3'
                            value={convertedText}
                            readOnly
                        >
                        </textarea>
                        <div className='flex justify-center items-center gap-5'>
                            <CopyToClipboard text={convertedText} onCopy={() => setCopyText(true)}>
                                <button className={`bg-lightBlue px-6 py-3 text-white rounded-lg`}>Copy</button>
                            </CopyToClipboard>
                            <button className={`bg-lightBlue px-6 py-3 text-white rounded-lg`} onClick={handleReset}>Reset</button>
                        </div>
                    </>
                }
                {
                    wordAnalysis.characters && title === 'Word Counter' &&
                    <>
                        <table className='border-2  border-gray500' cellPadding={'1px'}>
                            <thead>
                                <th>Metric</th>
                                <th>Value</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Characters</td>
                                    <td>{wordAnalysis.characters}</td>
                                </tr>
                                <tr>
                                    <td>words</td>
                                    <td>{wordAnalysis.Words}</td>
                                </tr>
                                <tr>
                                    <td>Phrases</td>
                                    <td>{wordAnalysis.Phrases}</td>
                                </tr>
                                <tr>
                                    <td>Sentences</td>
                                    <td>{wordAnalysis.Sentences}</td>
                                </tr>
                                <tr>
                                    <td>Reading Time</td>
                                    <td>{wordAnalysis.ReadingTime}</td>
                                </tr>
                                <tr>
                                    <td>Top Keywords</td>
                                    <td>{wordAnalysis.TopKeywords}</td>
                                </tr>
                                <tr>
                                    <td>Character With Whitespace</td>
                                    <td>{wordAnalysis.CharactersWithWhitespace}</td>
                                </tr>
                                <tr>
                                    <td>Character Without Whitespace</td>
                                    <td>{wordAnalysis.CharactersWithoutWhitespace}</td>
                                </tr>
                                <tr>
                                    <td>Readability Score</td>
                                    <td>{wordAnalysis.ReadabilityScore}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='flex justify-center items-center gap-5'>
                            <CopyToClipboard text={wordAnalysis} onCopy={() => setCopyText(true)}>
                                <button className={`bg-lightBlue px-6 py-3 text-white rounded-lg`}>Copy</button>
                            </CopyToClipboard>
                            <button className={`bg-lightBlue px-6 py-3 text-white rounded-lg`} onClick={handleReset}>Reset</button>
                        </div>
                    </>
                }
            </div>
            <FreeTools />
            <WebTools />
        </div >
    )
}

export default TextTools