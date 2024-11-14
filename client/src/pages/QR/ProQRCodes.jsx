import React, { useRef, useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import { IoIosLink, IoMdSettings } from "react-icons/io";
import { IoChatbubblesSharp, IoColorPalette, IoText } from "react-icons/io5";
import { MdEmail, MdKeyboardArrowDown } from "react-icons/md";
import { FaCopyright, FaPaypal, FaPhoneAlt, FaQrcode, FaSkype, FaWhatsapp, FaWifi } from "react-icons/fa";
import { BiLogoZoom } from "react-icons/bi";
import { BsFillPersonVcardFill } from 'react-icons/bs';
import sampleQR from '../..//assets/images.png'
import { useAuth } from '../../Context/AllContext';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import FreeTools from '../../components/FreeTools';
import { QRCodeCanvas } from 'qrcode.react'
import WebTools from '../../components/WebTools';

const ProQRCodes = () => {

    const canvasRef = useRef();
    const { darkMode } = useAuth();

    const colorsObj = {
        bgColor: "#ffffff",
        dotsColor: "#000000",
        cornerSquareColor: "#000000",
        cornerDotColor: "#000000"
    }

    const styleObj = {
        cornerSquare: "square",
        cornerDot: "dot",
        dotsStyle: "dot"
    }

    const optionObj = {
        size: "300",
        format: "png",
        errorCorrection: "L"
    }

    const vCardObj = {
        fName: "",
        lName: "",
        vPhone: "",
        vEmail: "",
        website: "",
        company: "",
        jobTitle: "",
        officePhone: "",
        fax: "",
        address: "",
        postCode: "",
        city: "",
        state: "",
        country: ""
    }

    const [tabs, setTabs] = useState(1);
    const [heading, setHeading] = useState("Link");
    const [expanded, setExpanded] = useState();
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [body, setBody] = useState({
        subject: "",
        body: ""
    });
    const [smsPhone, setSmsPhone] = useState('');
    const [phone, setPhone] = useState('');
    const [smsBody, setSmsBody] = useState('');
    const [wpContact, setWpContact] = useState('');
    const [wpMsg, setWpMsg] = useState('');
    const [skypeUsername, setSkypeUsername] = useState("");
    const [skypeAction, setSkypeAction] = useState("");
    const [zoomMeetID, setZoomMeetID] = useState("");
    const [zoomPsw, setZoomPsw] = useState("");
    const [wifi, setWiFi] = useState({
        ssid: "",
        password: "",
        encryption: ""
    })
    const [vCard, setVCard] = useState(vCardObj)
    const [paypal, setPaypal] = useState({
        email: "",
        amount: "",
        currency: ""
    })
    const [color, setColor] = useState(colorsObj);
    const [logo, setLogo] = useState(null);
    const [style, setStyle] = useState(styleObj);
    const [option, setOption] = useState(optionObj);
    const [qrValue, setQRValue] = useState('');

    const btnDisabled = !url && !text && !email && !phone && !smsPhone && !wpContact && !skypeUsername && !skypeAction && !zoomMeetID && !wifi.ssid && !wifi.password && !vCard.fName && !paypal.email;

    const qrProperty = [
        {
            tabs: 1,
            icon: <IoIosLink color={tabs === 1 ? "white" : "#535493"} fontSize={22} />,
            text: "Link"
        },
        {
            tabs: 2,
            icon: <IoText color={tabs === 2 ? "white" : "#535493"} fontSize={22} />,
            text: "Text"
        },
        {
            tabs: 3,
            icon: <MdEmail color={tabs === 3 ? "white" : "#535493"} fontSize={22} />,
            text: "Email"
        },
        {
            tabs: 4,
            icon: <FaPhoneAlt color={tabs === 4 ? "white" : "#535493"} fontSize={22} />,
            text: "Phone"
        },
        {
            tabs: 5,
            icon: <IoChatbubblesSharp color={tabs === 5 ? "white" : "#535493"} fontSize={22} />,
            text: "SMS"
        },
        {
            tabs: 6,
            icon: <FaWhatsapp color={tabs === 6 ? "white" : "#535493"} fontSize={22} />,
            text: "WhatsApp"
        },
        {
            tabs: 7,
            icon: <FaSkype color={tabs === 7 ? "white" : "#535493"} fontSize={22} />,
            text: "Skype"
        },
        {
            tabs: 8,
            icon: <BiLogoZoom color={tabs === 8 ? "white" : "#535493"} fontSize={22} />,
            text: "Zoom"
        },
        {
            tabs: 9,
            icon: <FaWifi color={tabs === 9 ? "white" : "#535493"} fontSize={22} />,
            text: "WiFi"
        },
        {
            tabs: 10,
            icon: <BsFillPersonVcardFill color={tabs === 10 ? "white" : "#535493"} fontSize={22} />,
            text: "vCard"
        },
        {
            tabs: 11,
            icon: <FaPaypal color={tabs === 11 ? "white" : "#535493"} fontSize={22} />,
            text: "PayPal"
        }
    ]

    const changeProperty = (tab, text) => {
        setTabs(tab);
        setHeading(text);
        reGenerateQRCode();
    }

    const handleChange = (panel) => {
        setExpanded(prev => (prev === panel ? false : panel));
    };

    const handleColorChange = (e) => {
        const { name, value } = e.target;
        setColor({
            ...color,
            [name]: value
        });
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleStyleChange = (e) => {
        const { name, value } = e.target;
        setStyle({
            ...style,
            [name]: value
        });
    }

    const handleOptionChange = (e) => {
        const { name, value } = e.target;
        setOption({
            ...option,
            [name]: value
        })
    }

    // const generateQRCode = () => {
    //     if (tabs === 1 && !url) {
    //         alert("Please Enter URL generate a QR code")
    //     } else {
    //         setQRValue(url);
    //         setUrl("");
    //     }

    //     if (tabs === 2 && !text) {
    //         alert("Please Enter Text to generate a QR Code.")
    //     } else {
    //         setQRValue(text);
    //         setText("");
    //     }

    //     if (tabs === 3 && !email) {
    //         alert("Please Enter Email to generate a QR Code.")
    //     } else {
    //         const mailToLink = `mailto:${email}?subject=${body.subject}&body=${body.body}`
    //         setQRValue(mailToLink);
    //         setEmail("");
    //         setBody({
    //             subject: "",
    //             body: ""
    //         })
    //     }

    //     if (tabs === 5 && !phone) {
    //         alert("Please Enter Mobile Number to generate a QR Code.")
    //     } else {
    //         const linkToPhone = `tel:${phone}`
    //         setQRValue(linkToPhone);
    //         setPhone("");
    //     }
    // }

    const handleVCardChange = (e) => {
        const { name, value } = e.target;
        setVCard({
            ...vCard,
            [name]: value
        })
    }

    const generateQRCode = () => {
        switch (tabs) {
            case 1:
                if (!url) {
                    alert("Please Enter URL to generate a QR code")
                } else {
                    setQRValue(url);
                    setUrl("");
                }
                break;
            case 2:
                if (!text) {
                    alert("Please Enter Text to generate a QR Code.")
                } else {
                    setQRValue(text);
                    setText("");
                }
                break;
            case 3:
                if (!email) {
                    alert("Please Enter Email to generate a QR Code.")
                } else {
                    const mailToLink = `mailto:${email}?subject=${body.subject}&body=${body.body}`
                    setQRValue(mailToLink);
                    setEmail("");
                    setBody({
                        subject: "",
                        body: ""
                    })
                }
                break;
            case 4:
                if (!phone) {
                    alert("Please Enter Mobile Number to generate a QR Code.")
                } else {
                    const linkToPhone = `tel:${phone}`
                    setQRValue(linkToPhone);
                    setPhone("");
                }
                break;
            case 5:
                if (!smsPhone) {
                    alert("Please Enter Mobile Number and Message to generate a QR Code.")
                } else {
                    const linkToSms = `sms:${smsPhone}?body=${smsBody}`
                    setQRValue(linkToSms);
                    setSmsPhone("");
                    setSmsBody("");
                }
                break;
            case 6:
                if (!wpContact) {
                    alert("Please Enter Contact Number to generate a WhatsApp QR Code.")
                } else {
                    const linkToWhatsApp = `https://wa.me/${wpContact}?text=${wpMsg}`
                    setQRValue(linkToWhatsApp);
                    setWpContact("");
                    setWpMsg("");
                }
                break;
            case 7:
                if (skypeUsername && skypeAction) {
                    let linkToSkype = `skype:${skypeUsername}?${skypeAction}`
                    setQRValue(linkToSkype);
                    setSkypeUsername("");
                    setSkypeAction("");
                } else {
                    alert("Please Enter Skype Username & Select Action to generate a QR Code.")
                }
                break;
            case 8:
                let link;
                if (zoomMeetID) {
                    link = `https://zoom.us/j/${zoomMeetID}`;
                    if (zoomPsw) {
                        link = `https://zoom.us/j/${zoomMeetID}?pwd=${zoomPsw}`;
                    }
                    setQRValue(link);
                    setZoomMeetID("");
                    setZoomPsw("");
                } else {
                    alert("Please Enter Zoom Meeting ID to generate a QR Code.")
                }
                break;
            case 9:
                if (wifi.ssid && wifi.password) {
                    let type = wifi.encryption === 'None' ? "nopass" : wifi.encryption;
                    let link = `WIFI:S:${wifi.ssid};T:${type};P:${wifi.password};;`
                    setQRValue(link);
                    setWiFi({
                        ssid: "",
                        password: "",
                        encryption: ""
                    })
                } else {
                    alert('Please enter SSID and Password to generate Wifi QR Code')
                }
                break;
            case 10:
                const { fName, lName, vPhone, vEmail, website, company, jobTitle, officePhone, fax, address, postCode, city, state, country } = vCard;
                if (fName && lName && vPhone) {
                    const vCardString = `BEGIN:VCARD
VERSION:3.0
FN:${fName} ${lName}
TEL;TYPE=cell:${vPhone}
EMAIL:${vEmail}
URL:${website}
ORG:${company}
TITLE:${jobTitle}
TEL;TYPE=work:${officePhone}
FAX:${fax}
ADR;TYPE=work:;;${address};${city};${state};${postCode};${country}
END:VCARD`;

                    // const link = `data:text/vcard;charset=utf-8,${vCard.trim()}`;
                    setQRValue(vCardString);
                    setVCard(vCardObj);

                } else {
                    alert("Please enter First , Last name and mobile number to generate vCard QR Code.")
                }
                break;
            case 11:
                if (paypal.email && paypal.amount && paypal.currency) {
                    const linkToPaypal = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypal.email}&amount=${paypal.amount}&currency_code=${paypal.currency}`;
                    setQRValue(linkToPaypal);
                    setPaypal({
                        email: "",
                        amount: "",
                        currency: ""
                    })
                } else {
                    alert("Please Enter Email , Amount and Currency to generate PayPal QR Code")
                }
                break;
            default:
                alert("Invalid tab selected")
        }
    }

    const downloadQRCode = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        if (option.format === 'png') {
            link.href = canvas.toDataURL('image/png');
            link.download = 'qrcode.png';
        } else if (option.format === 'jpg') {
            link.href = canvas.toDataURL('image/jpg');
            link.download = 'qrcode.jpg';
        } else if (option.format === 'webp') {
            link.href = canvas.toDataURL('image/webp');
            link.download = 'qrcode.webp';
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        reGenerateQRCode();
    }

    const reGenerateQRCode = () => {
        setUrl("");
        setColor(colorsObj);
        setLogo(null);
        setStyle(styleObj);
        setOption(optionObj);
        setQRValue("");
        setExpanded();
        setText("");
        setEmail("");
        setBody({
            subject: "",
            body: "",
        });
        setPhone("");
        setSmsPhone("");
        setSmsBody("");
        setWpContact("");
        setWpMsg("");
        setSkypeUsername("");
        setSkypeAction("");
        setZoomMeetID("");
        setZoomPsw("");
        setWiFi({
            ssid: "",
            password: "",
            encryption: ""
        })
        setVCard(vCardObj)
        setPaypal({
            email: "",
            amount: "",
            currency: ""
        })
    }

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>QR Code Generator</h1>
            <p className='text-center text-gray500 my-5'>Easily generate premium QR codes online for free.</p>
            <div className='flex flex-wrap justify-center items-center gap-5 dark:text-white mt-10'>
                {
                    qrProperty.map((val, ind) => {
                        return (
                            <button key={ind} className={`flex justify-center items-center gap-2 border px-4 py-2 dark:border-gray600 rounded ${val.tabs === tabs ? "bg-lightBlue text-white border-lightBlue dark:border-lightBlue" : ""}`} onClick={() => changeProperty(val.tabs, val.text)}>
                                {val.icon}{val.text}
                            </button>
                        )
                    })
                }
            </div>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 my-10 mx-10 sm:mx-20 md:mx-28 bg-[aliceblue] dark:bg-darkBlue p-5 rounded-2xl dark:border-gray600 dark:border-[1px]'>
                <div className='w-full flex flex-col gap-5 px-0 md:px-5'>
                    <h2 className='text-center dark:text-white text-xl sm:text-2xl md:text-3xl font-semibold'>{heading} : </h2>
                    <div className='w-[90%] mx-auto flex flex-col justify-center items-center gap-5'>
                        {
                            tabs === 1 &&
                            <input
                                type="text"
                                placeholder='Enter URL ...'
                                className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        }
                        {
                            tabs === 2 &&
                            <textarea
                                placeholder='Enter text ...'
                                className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                value={text}
                                rows={5}
                                onChange={(e) => setText(e.target.value)}
                            >
                            </textarea>
                        }
                        {
                            tabs === 3 &&
                            <>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder='Subject'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={body.subject}
                                    onChange={(e) => setBody({ ...body, subject: e.target.value })}
                                />
                                <textarea
                                    rows={5}
                                    placeholder='Body'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={body.body}
                                    onChange={(e) => setBody({ ...body, body: e.target.value })}
                                ></textarea>
                            </>
                        }
                        {
                            tabs === 4 &&
                            <input
                                type="text"
                                placeholder='Mobile Number with Country Code'
                                className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        }
                        {
                            tabs === 5 &&
                            <>
                                <input
                                    type="text"
                                    placeholder='Mobile Number with Country Code'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={smsPhone}
                                    onChange={(e) => setSmsPhone(e.target.value)}
                                />
                                <textarea
                                    rows={5}
                                    placeholder='Enter Message'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={smsBody}
                                    onChange={(e) => setSmsBody(e.target.value)}
                                ></textarea>
                            </>
                        }
                        {
                            tabs === 6 &&
                            <>
                                <input
                                    type="text"
                                    placeholder='WhatsApp Number with Country Code'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={wpContact}
                                    inputMode='numeric'
                                    onChange={(e) => setWpContact(e.target.value)}
                                />
                                <textarea
                                    rows={5}
                                    placeholder='Enter Message'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={wpMsg}
                                    onChange={(e) => setWpMsg(e.target.value)}
                                ></textarea>
                            </>
                        }
                        {
                            tabs === 7 &&
                            <>
                                <input
                                    type="text"
                                    placeholder='Skype Username'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={skypeUsername}
                                    inputMode='numeric'
                                    onChange={(e) => setSkypeUsername(e.target.value)}
                                />
                                <select
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full dark:text-white dark:bg-darkBlue dark:border-white'
                                    name='cornerSquare'
                                    value={skypeAction}
                                    onChange={(e) => setSkypeAction(e.target.value)}
                                >
                                    <option value="" disabled>Select Action</option>
                                    <option value="chat">Chat</option>
                                    <option value="call">Call</option>
                                </select>
                            </>
                        }
                        {
                            tabs === 8 &&
                            <>
                                <input
                                    type="text"
                                    placeholder='Meeting ID'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={zoomMeetID}
                                    onChange={(e) => setZoomMeetID(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder='Meeting Password'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={zoomPsw}
                                    onChange={(e) => setZoomPsw(e.target.value)}
                                />
                            </>
                        }
                        {
                            tabs === 9 &&
                            <>
                                <input
                                    type="text"
                                    placeholder='SSID'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={wifi.ssid}
                                    onChange={(e) => setWiFi({ ...wifi, ssid: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder='Password'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={wifi.password}
                                    onChange={(e) => setWiFi({ ...wifi, password: e.target.value })}
                                />
                                <select
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={wifi.encryption}
                                    onChange={(e) => setWiFi({ ...wifi, encryption: e.target.value })}
                                >
                                    <option value="" disabled>Select Encryption</option>
                                    <option value="WPA/WPA2">WPA/WPA2</option>
                                    {/* <option value="WPA2">WPA2</option> */}
                                    <option value="WEP">WEP</option>
                                    <option value="None">None</option>
                                </select>
                            </>
                        }
                        {
                            tabs === 10 &&
                            <>
                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <input
                                        type="text"
                                        placeholder='First Name'
                                        name='fName'
                                        className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                        value={vCard.fName}
                                        onChange={handleVCardChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Last Name'
                                        name='lName'
                                        className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                        value={vCard.lName}
                                        onChange={handleVCardChange}
                                    />
                                </div>
                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <input
                                        type="text"
                                        placeholder='Phone'
                                        name='vPhone'
                                        className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                        value={vCard.vPhone}
                                        onChange={handleVCardChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder='office Phone'
                                        name='officePhone'
                                        className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                        value={vCard.officePhone}
                                        onChange={handleVCardChange}
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder='Fax'
                                    name='fax'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={vCard.fax}
                                    onChange={handleVCardChange}
                                />
                                <input
                                    type="text"
                                    placeholder='Email'
                                    name='vEmail'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={vCard.vEmail}
                                    onChange={handleVCardChange}
                                />
                                <input
                                    type="text"
                                    placeholder='Website'
                                    name='website'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={vCard.website}
                                    onChange={handleVCardChange}
                                />
                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <input
                                        type="text"
                                        placeholder='Company'
                                        name='company'
                                        className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                        value={vCard.company}
                                        onChange={handleVCardChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Job Title'
                                        name='jobTitle'
                                        className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                        value={vCard.jobTitle}
                                        onChange={handleVCardChange}
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder='Address'
                                    name='address'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={vCard.address}
                                    onChange={handleVCardChange}
                                />
                                <input
                                    type="text"
                                    placeholder='Post Code'
                                    name='postCode'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={vCard.postCode}
                                    onChange={handleVCardChange}
                                />
                                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                    <input
                                        type="text"
                                        placeholder='City'
                                        name='city'
                                        className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                        value={vCard.city}
                                        onChange={handleVCardChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder='State'
                                        name='state'
                                        className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                        value={vCard.state}
                                        onChange={handleVCardChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Country'
                                        name='country'
                                        className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                        value={vCard.country}
                                        onChange={handleVCardChange}
                                    />
                                </div>
                            </>
                        }
                        {
                            tabs === 11 &&
                            <>
                                <input
                                    type="text"
                                    placeholder='PayPal Email'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={paypal.email}
                                    onChange={(e) => setPaypal({ ...paypal, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder='Enter Amount'
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={paypal.amount}
                                    onChange={(e) => setPaypal({ ...paypal, amount: e.target.value })}
                                />
                                <select
                                    className='w-full mx-auto border-2 outline-none border-lightBlue p-2 px-5 rounded-full text-black dark:text-white dark:bg-darkBlue dark:border-white'
                                    value={paypal.currency}
                                    onChange={(e) => setPaypal({ ...paypal, currency: e.target.value })}
                                >
                                    <option value="">Select Currency</option>
                                    <option value="USD">USD - United States Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound Sterling</option>
                                    <option value="AUD">AUD - Australian Dollar</option>
                                    <option value="CAD">CAD - Canadian Dollar</option>
                                    <option value="JPY">JPY - Japanese Yen</option>
                                    <option value="CHF">CHF - Swiss Franc</option>
                                    <option value="CNY">CNY - Chinese Yuan</option>
                                    <option value="SEK">SEK - Swedish Krona</option>
                                    <option value="NZD">NZD - New Zealand Dollar</option>
                                    <option value="KRW">KRW - South Korean Won</option>
                                    <option value="SGD">SGD - Singapore Dollar</option>
                                    <option value="NOK">NOK - Norwegian Krone</option>
                                    <option value="MXN">MXN - Mexican Peso</option>
                                    <option value="INR">INR - Indian Rupee</option>
                                </select>
                            </>
                        }
                    </div>
                    <Accordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')} sx={{ borderRadius: "12px !important", backgroundColor: darkMode ? "#1a252e" : "white", color: darkMode ? "white" : "" }} className="bg-black">
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<MdKeyboardArrowDown fontSize={26} color={`${darkMode ? "white" : "black"}`} />}>
                            <div className='flex text-center items-center gap-3'>
                                <IoColorPalette fontSize={28} /> <p className='text-lg font-medium'>Colors</p>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='flex flex-col justify-center items-center gap-5'>
                                <p className='font-semibold'>Background Color</p>
                                <input
                                    className='w-full'
                                    name='bgColor'
                                    type="color"
                                    value={color.bgColor}
                                    onChange={handleColorChange}
                                />
                            </div>
                            <div className='flex flex-col justify-center items-center gap-5 my-5'>
                                <p className='font-semibold'>Dots Color</p>
                                <input
                                    className='w-full'
                                    name='dotsColor'
                                    type="color"
                                    value={color.dotsColor}
                                    onChange={handleColorChange}
                                />
                            </div>
                            <div className='flex flex-col justify-center items-center gap-5'>
                                <p className='font-semibold'>Corner Square Color</p>
                                <input
                                    className='w-full'
                                    name='cornerSquareColor'
                                    type="color"
                                    value={color.cornerSquareColor}
                                    onChange={handleColorChange}
                                />
                            </div>
                            <div className='flex flex-col justify-center items-center gap-5 my-5'>
                                <p className='font-semibold'>Corner Dot Color</p>
                                <input
                                    className='w-full'
                                    name='cornerDotColor'
                                    type="color"
                                    value={color.cornerDotColor}
                                    onChange={handleColorChange}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')} sx={{ borderRadius: "12px !important", backgroundColor: darkMode ? "#1a252e" : "white", color: darkMode ? "white" : "" }} className="bg-black">
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<MdKeyboardArrowDown fontSize={26} color={`${darkMode ? "white" : "black"}`} />}>
                            <div className='flex text-center items-center gap-3'>
                                <FaCopyright fontSize={28} /> <p className='text-lg font-medium'>Logo</p>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='flex flex-col justify-center items-center gap-5'>
                                <p className='font-semibold'>Select Logo</p>
                                <input
                                    className='w-full border p-5 rounded-lg'
                                    type="file"
                                    name='logo'
                                    onChange={handleLogoChange}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')} sx={{ borderRadius: "12px !important", backgroundColor: darkMode ? "#1a252e" : "white", color: darkMode ? "white" : "" }} className="bg-black">
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<MdKeyboardArrowDown fontSize={26} color={`${darkMode ? "white" : "black"}`} />}>
                            <div className='flex text-center items-center gap-3'>
                                <FaQrcode fontSize={28} /> <p className='text-lg font-medium'>QR Styles</p>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='flex flex-col justify-center items-center gap-5'>
                                <p className='font-semibold'>Corner Square Style</p>
                                <select
                                    className='w-full border py-2 rounded-lg border-gray400 dark:bg-darkBlue px-1'
                                    name='cornerSquare'
                                    value={style.cornerSquare}
                                    onChange={handleStyleChange}
                                >
                                    <option value="square">Square</option>
                                    <option value="rounded">Rounded</option>
                                </select>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-5 my-5'>
                                <p className='font-semibold'>Corner Dot Style</p>
                                <select
                                    className='w-full border py-2 rounded-lg border-gray400 dark:bg-darkBlue px-1'
                                    name='cornerDot'
                                    value={style.cornerDot}
                                    onChange={handleStyleChange}
                                >
                                    <option value="dot">Dot</option>
                                    <option value="square">Square</option>
                                </select>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-5'>
                                <p className='font-semibold'>Dots Style</p>
                                <select
                                    className='w-full border py-2 rounded-lg border-gray400 dark:bg-darkBlue px-1'
                                    name='dotsStyle'
                                    value={style.dotsStyle}
                                    onChange={handleStyleChange}
                                >
                                    <option value="dot">Dot</option>
                                    <option value="rounded">Rounded</option>
                                    <option value="classy">Classy</option>
                                </select>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={() => handleChange('panel4')} sx={{ borderRadius: "12px !important", backgroundColor: darkMode ? "#1a252e" : "white", color: darkMode ? "white" : "" }} className="bg-black">
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<MdKeyboardArrowDown fontSize={26} color={`${darkMode ? "white" : "black"}`} />}>
                            <div className='flex text-center items-center gap-3'>
                                <IoMdSettings fontSize={28} /> <p className='text-lg font-medium'>Options</p>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='flex flex-col justify-center items-center gap-5'>
                                <p className='font-semibold'>Size</p>
                                <select
                                    className='w-full border py-2 rounded-lg border-gray400 dark:bg-darkBlue px-1'
                                    name='size'
                                    value={option.size}
                                    onChange={handleOptionChange}
                                >
                                    <option value="100">Small</option>
                                    <option value="200">Medium</option>
                                    <option value="300">Medium-Large</option>
                                    <option value="400">Large</option>
                                </select>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-5 my-5'>
                                <p className='font-semibold'>Format</p>
                                <select
                                    className='w-full border py-2 rounded-lg border-gray400 dark:bg-darkBlue px-1'
                                    name='format'
                                    value={option.format}
                                    onChange={handleOptionChange}
                                >
                                    <option value="png">PNG</option>
                                    <option value="jpg">JPG</option>
                                    <option value="webp">WEBP</option>
                                </select>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-5 my-5'>
                                <p className='font-semibold'>Error Correction Level</p>
                                <select
                                    className='w-full border py-2 rounded-lg border-gray400 dark:bg-darkBlue px-1'
                                    name='errorCorrection'
                                    value={option.errorCorrection}
                                    onChange={handleOptionChange}
                                >
                                    <option value="L">LOW</option>
                                    <option value="M">MEDIUM</option>
                                    <option value="Q">QUARTILE</option>
                                    <option value="H">HIGH</option>
                                </select>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className='w-full flex flex-col justify-start items-center gap-5'>
                    <div className='flex flex-col justify-center items-center gap-5'>
                        {
                            qrValue ?
                                <div className='flex flex-col justify-center items-center gap-5'>
                                    <p>Generated QR Code</p>
                                    <QRCodeCanvas
                                        ref={canvasRef}
                                        size={Number(option.size)}
                                        value={qrValue}
                                        bgColor={color.bgColor}
                                        fgColor={color.dotsColor}
                                        level={option.errorCorrection}
                                        style={{
                                            margin: '0 auto',
                                            borderRadius: style.cornerSquare === 'rounded' ? "20px" : "0"
                                        }}
                                        imageSettings={{
                                            src: logo ? logo : "",
                                            x: null,
                                            y: null,
                                            height: 40,
                                            width: 40,
                                            excavate: false
                                        }}
                                    />
                                    <style>
                                        {`.qr-corner {fill: ${color.cornerDotColor};}`}
                                    </style>
                                    <div className='flex justify-center items-center gap-5'>
                                        <button className='bg-lightBlue text-white rounded-lg  px-4 py-2' onClick={downloadQRCode}>Download QR</button>
                                        <button className='bg-lightBlue text-white rounded-lg  px-4 py-2' onClick={reGenerateQRCode}>Reset</button>
                                    </div>
                                </div>
                                :
                                <div className='flex flex-col justify-center items-center gap-5'>
                                    <img src={sampleQR} alt="Sample QR" />
                                    <button className={`${btnDisabled ? "bg-gray500" : "bg-lightBlue"} text-white rounded-lg  px-4 py-2`} disabled={btnDisabled} onClick={generateQRCode}>Generate QR</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default ProQRCodes

