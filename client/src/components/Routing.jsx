import Home from "../pages/Home";
import CompressPDF from "../pages/PDF/CompressPDF";
import WebmVideo from "../pages/Video/WebmVideo";
import WebScreenshot from "../pages/WebScreenshot";
import AnyImgTypeToPDF from "../pages/PDF/AnyImgTypeToPDF";
import ImageToAnyImageType from "../pages/Image/ImageToAnyImageType";
import AnyImageToSVG from "../pages/Image/AnyImageToSVG";
import AnyDownloader from "../pages/Video/AnyVideoDownloader";
import YTThumbnail from "../pages/Video/YTThumbnail";
import ProQRCodes from "../pages/QR/ProQRCodes";
import BarcodeGenerator from "../pages/QR/BarcodeGenerator";
import Code128bBarcode from "../pages/QR/Code128bBarcode";
import IfscQRCode from "../pages/QR/IfscQRCode";
import ImgToQR from "../pages/QR/ImgToQR";
import BarcodeQRScanner from "../pages/QR/BarcodeQRScanner";
import FileConverter from "../pages/File/FileConverter";
import FileTypeConverter from "../pages/File/FileTypeConverter";
import TextTools from "../pages/Text/TextTools";
import CropPdf from "../pages/PDF/CropPdf";
import YTLogo from "../pages/Video/YTLogo";
import YTShorts from "../pages/Video/YTShorts";
import AdKeywords from "../pages/WebSeo/AdKeywords";
import DnsLookup from "../pages/WebSeo/DnsLookup";
import FindMyIP from "../pages/WebSeo/FindMyIP";
import HexToIp from "../pages/WebSeo/HexToIp";
import HostnameToIp from "../pages/WebSeo/HostnameToIp";
import HtAccess from "../pages/WebSeo/HtAccess";
import IpDomainLocation from "../pages/WebSeo/IpDomainLocation";
import IpToHex from "../pages/WebSeo/IpToHex";
import KeyWordFinder from "../pages/WebSeo/KeyWordFinder";
import LinkShortener from "../pages/WebSeo/LinkShortener";
import MetaTagGenerator from "../pages/WebSeo/MetaTagGenerator";
import NameServer from "../pages/WebSeo/NameServer";
import Base64 from "../pages/PDF/Base64";
import ColorTextToPdf from "../pages/PDF/ColorTextToPdf";
import AnyTextTypeToPDF from "../pages/PDF/AnyTextTypeToPDF";
import PdfToAnyImg from "../pages/PDF/PdfToAnyImg";
import PdfToAnyText from "../pages/PDF/PdfToAnyText";
import AnalyzePdf from "../pages/PDF/AnalyzePdf";
import RenderPageFromPDF from "../pages/PDF/RenderPageFromPDF";
import MergePdf from "../pages/PDF/MergePdf";
import PdfPageCounter from "../pages/PDF/PdfPageCounter";
import SplitPDFs from "../pages/PDF/SplitPDFs";
import PdfPageRotate from "../pages/PDF/PdfPageRotate";
import PdfParts from "../pages/PDF/PdfParts";
import PdfPageNumberAdd from "../pages/PDF/PdfPageNumberAdd";
import OrganizePdf from "../pages/PDF/OrganizePdf";

const Routing = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/compress-pdf",
        element: <CompressPDF />
    },
    {
        path: "/webm-video",
        element: <WebmVideo />
    },
    {
        path: "/web-screenshot",
        element: <WebScreenshot />
    },
    //header pdf start
    {
        path: '/crop-pdf',
        element: <CropPdf />
    },
    //header pdf end
    //header other start
    {
        path: '/yt-logo',
        element: <YTLogo />
    },
    //header other end
    // Popular Tools Routing start pdf
    {
        path: "/avif-to-pdf",
        element: <AnyImgTypeToPDF type="avif" />
    },
    {
        path: "/bmp-to-pdf",
        element: <AnyImgTypeToPDF type="bmp" />
    },
    {
        path: "/gif-to-pdf",
        element: <AnyImgTypeToPDF type="gif" />
    },
    {
        path: "/heic-to-pdf",
        element: <AnyImgTypeToPDF type="heic" />
    },
    {
        path: "/heif-to-pdf",
        element: <AnyImgTypeToPDF type="heif" />
    },
    {
        path: "/ico-to-pdf",
        element: <AnyImgTypeToPDF type="ico" />
    },
    {
        path: "/jpg-to-pdf",
        element: <AnyImgTypeToPDF type="jpg" />
    },
    {
        path: "/png-to-graypdf",
        element: <AnyImgTypeToPDF type="png" />
    },
    {
        path: "/png-to-pdf",
        element: <AnyImgTypeToPDF type="png" />
    },
    {
        path: "/raw-to-pdf",
        element: <AnyImgTypeToPDF type="raw" />
    },
    {
        path: "/tiff-to-pdf",
        element: <AnyImgTypeToPDF type="tiff" />
    },
    {
        path: "/webp-to-pdf",
        element: <AnyImgTypeToPDF type="webp" />
    },
    {
        path: "/base64-to-pdf",
        element: <Base64 from={'base64'} to={'pdf'} />
    },
    {
        path: "/color-text-to-pdf",
        element: <ColorTextToPdf />
    },
    {
        path: "/css-to-pdf",
        element: <AnyTextTypeToPDF type="css" />
    },
    {
        path: "/excel-to-plain-pdf",
        element: <AnyTextTypeToPDF type=".xlx , .xlsx" />
    },
    {
        path: "/html-to-pdf",
        element: <AnyTextTypeToPDF type="html" />
    },
    {
        path: "/json-to-pdf",
        element: <AnyTextTypeToPDF type="json" />
    },
    {
        path: "/md-to-pdf",
        element: <AnyTextTypeToPDF type="md" />
    },
    {
        path: "/svg-to-pdf",
        element: <AnyTextTypeToPDF type="svg" />
    },
    {
        path: "/text-to-pdf",
        element: <AnyTextTypeToPDF type="txt" />
    },
    {
        path: "/tsv-to-pdf",
        element: <AnyTextTypeToPDF type="tsv" />
    },
    {
        path: "/word-to-pdf",
        element: <AnyTextTypeToPDF type="docx" />
    },
    {
        path: "/xml-to-pdf",
        element: <AnyTextTypeToPDF type="xml" />
    },
    {
        path: "/yaml-to-pdf",
        element: <AnyTextTypeToPDF type="yaml" />
    },
    {
        path: '/pdf-to-avif',
        element: <PdfToAnyImg from={'pdf'} to={'avif'} />
    },
    {
        path: '/pdf-to-bmp',
        element: <PdfToAnyImg from={'pdf'} to={'bmp'} />
    },
    {
        path: '/pdf-to-eps',
        element: <PdfToAnyImg from={'pdf'} to={'eps'} />
    },
    {
        path: '/pdf-to-heic',
        element: <PdfToAnyImg from={'pdf'} to={'heic'} />
    },
    {
        path: '/pdf-to-heif',
        element: <PdfToAnyImg from={'pdf'} to={'heif'} />
    },
    {
        path: '/pdf-to-ico',
        element: <PdfToAnyImg from={'pdf'} to={'ico'} />
    },
    {
        path: '/pdf-to-jpg',
        element: <PdfToAnyImg from={'pdf'} to={'jpg'} />
    },
    {
        path: '/pdf-to-png',
        element: <PdfToAnyImg from={'pdf'} to={'png'} />
    },
    {
        path: '/pdf-to-raw',
        element: <PdfToAnyImg from={'pdf'} to={'raw'} />
    },
    {
        path: '/pdf-to-tiff',
        element: <PdfToAnyImg from={'pdf'} to={'tiff'} />
    },
    {
        path: '/pdf-to-webp',
        element: <PdfToAnyImg from={'pdf'} to={'webp'} />
    },
    {
        path: '/pdf-to-base64',
        element: <Base64 from={'pdf'} to={'base64'} />
    },
    {
        path: '/pdf-to-csv',
        element: <PdfToAnyText from={'pdf'} to={'csv'} />
    },
    {
        path: '/pdf-to-excel',
        element: <PdfToAnyText from={'pdf'} to={'xlsx'} />
    },
    {
        path: '/pdf-to-html',
        element: <PdfToAnyText from={'pdf'} to={'html'} />
    },
    {
        path: '/pdf-to-json',
        element: <PdfToAnyText from={'pdf'} to={'json'} />
    },
    {
        path: '/pdf-to-md',
        element: <PdfToAnyText from={'pdf'} to={'md'} />
    },
    {
        path: '/pdf-to-sql',
        element: <PdfToAnyText from={'pdf'} to={'sql'} />
    },
    {
        path: '/pdf-to-text',
        element: <PdfToAnyText from={'pdf'} to={'text'} />
    },
    {
        path: '/pdf-to-tsv',
        element: <PdfToAnyText from={'pdf'} to={'tsv'} />
    },
    {
        path: '/pdf-to-xml',
        element: <PdfToAnyText from={'pdf'} to={'xml'} />
    },
    {
        path: '/pdf-to-yaml',
        element: <PdfToAnyText from={'pdf'} to={'yaml'} />
    },
    {
        path: '/pdf-to-rtf',
        element: <PdfToAnyText from={'pdf'} to={'rtf'} />
    },
    {
        path: '/pdf-to-word',
        element: <PdfToAnyText from={'pdf'} to={'word'} />
    },
    {
        path: '/analyze-pdf',
        element: <AnalyzePdf />
    },
    {
        path: '/render-pdf-pages',
        element: <RenderPageFromPDF />
    },
    {
        path: '/merge-pdfs',
        element: <MergePdf />
    },
    {
        path: '/pdf-page-counter',
        element: <PdfPageCounter />
    },
    {
        path: '/split-bulk-pdfs',
        element: <SplitPDFs />
    },
    {
        path: '/make-pdf-parts',
        element: <PdfParts />
    },
    {
        path: '/rotate-pdf-pages',
        element: <PdfPageRotate />
    },
    {
        path: '/pdf-page-no',
        element: <PdfPageNumberAdd />
    },
    {
        path: '/organize-pdf',
        element: <OrganizePdf />
    },
    // Popular Tools Routing end pdf
    // Popular tools routing start image-anyImageType
    {
        path: "/image-to-png",
        element: <ImageToAnyImageType type='png' />
    },
    {
        path: "/image-to-jpg",
        element: <ImageToAnyImageType type='jpg' />
    },
    {
        path: "/image-to-gif",
        element: <ImageToAnyImageType type='gif' />
    },
    {
        path: "/image-to-bmp",
        element: <ImageToAnyImageType type='bmp' />
    },
    {
        path: "/image-to-avif",
        element: <ImageToAnyImageType type='avif' />
    },
    {
        path: "/image-to-tiff",
        element: <ImageToAnyImageType type='tiff' />
    },
    {
        path: "/image-to-heic",
        element: <ImageToAnyImageType type='heic' />
    },
    {
        path: "/image-to-heif",
        element: <ImageToAnyImageType type='heif' />
    },
    {
        path: "/image-to-webp",
        element: <ImageToAnyImageType type='webp' />
    },
    {
        path: "/image-to-ico",
        element: <ImageToAnyImageType type='ico' />
    },
    {
        path: "/image-to-raw",
        element: <ImageToAnyImageType type='raw' />
    },
    {
        path: "/image-to-tga",
        element: <ImageToAnyImageType type='tga' />
    },
    {
        path: "/image-to-svg",
        element: <AnyImageToSVG />
    },
    // Popular tools routing end image-anyImageType
    // Popular tools routing start video
    {
        path: "/facebook-video-downloader",
        element: <AnyDownloader title={"Facebook"} />
    },
    {
        path: "/x-video-downloader",
        element: <AnyDownloader title={"X"} />
    },
    {
        path: "/linkedin-video-downloader",
        element: <AnyDownloader title={"LinkedIn"} />
    },
    {
        path: "/tiktok-video-downloader",
        element: <AnyDownloader title={"TikTok"} />
    },
    {
        path: "/instagram-video-downloader",
        element: <AnyDownloader title={"Instagram"} />
    },
    {
        path: "/youtube-downloader",
        element: <AnyDownloader title={"YouTube"} />
    },
    {
        path: "/yt-thumbnail",
        element: <YTThumbnail />
    },
    {
        path: "/yt-shorts-downloader",
        element: <YTShorts />
    },
    // Popular tools routing end video
    // Popular tools routing start qr code
    {
        path: "/pro-qr-codes",
        element: <ProQRCodes />
    },
    {
        path: "/barcode-generator",
        element: <BarcodeGenerator />
    },
    {
        path: "/code128b-barcode",
        element: <Code128bBarcode />
    },
    {
        path: "/ifsc-qr-code",
        element: <IfscQRCode />
    },
    {
        path: "/image-to-qr-code",
        element: <ImgToQR />
    },
    {
        path: "/barcode-qrcode-scanner",
        element: <BarcodeQRScanner />
    },
    // Popular tools routing end qr code
    // Popular tools routing start file
    {
        path: "/file-converter",
        element: <FileConverter />
    },
    {
        path: "/text-to-word",
        element: <FileTypeConverter from="Text" to="Word" />
    },
    {
        path: "/doc-to-html",
        element: <FileTypeConverter from="DOC" to="HTML" />
    },
    {
        path: "/doc-to-csv",
        element: <FileTypeConverter from="DOC" to="CSV" />
    },
    {
        path: "/doc-to-excel",
        element: <FileTypeConverter from="DOC" to="Excel" />
    },
    {
        path: "/text-to-excel",
        element: <FileTypeConverter from="Text" to="Excel" />
    },
    {
        path: "/excel-to-json",
        element: <FileTypeConverter from="Excel" to="JSON" />
    },
    {
        path: "/text-to-json",
        element: <FileTypeConverter from="Text" to="JSON" />
    },
    {
        path: "/csv-to-json",
        element: <FileTypeConverter from="CSV" to="JSON" />
    },
    {
        path: "/csv-to-excel",
        element: <FileTypeConverter from="CSV" to="Excel" />
    },
    {
        path: "/csv-to-html",
        element: <FileTypeConverter from="CSV" to="HTML" />
    },
    {
        path: "/csv-to-sql",
        element: <FileTypeConverter from="CSV" to="SQL" />
    },
    {
        path: "/csv-to-tsv",
        element: <FileTypeConverter from="CSV" to="TSV" />
    },
    {
        path: "/excel-to-html",
        element: <FileTypeConverter from="Excel" to="HTML" />
    },
    {
        path: '/html-markdown',
        element: <FileTypeConverter from='' to='' />
    },
    {
        path: '/md-to-word',
        element: <FileTypeConverter from='MD' to='Word' />
    },
    {
        path: '/csv-to-word',
        element: <FileTypeConverter from='CSV' to='Word' />
    },
    {
        path: '/html-to-word',
        element: <FileTypeConverter from='HTML' to='Word' />
    },
    {
        path: '/srt-to-vtt',
        element: <FileTypeConverter from='SRT' to='VTT' />
    },
    {
        path: '/vtt-to-srt',
        element: <FileTypeConverter from='VTT' to='SRT' />
    },
    // Popular tools routing end file
    // Popular tools routing start webseo
    {
        path: '/ad-keywords',
        element: <AdKeywords />
    },
    {
        path: '/dns-lookup-json',
        element: <DnsLookup />
    },
    {
        path: '/find-my-ip',
        element: <FindMyIP />
    },
    {
        path: '/hex-to-ip',
        element: <HexToIp />
    },
    {
        path: '/hostname-to-ip',
        element: <HostnameToIp />
    },
    {
        path: '/htaccess-redirect',
        element: <HtAccess />
    },
    {
        path: '/ip-domain-location',
        element: <IpDomainLocation />
    },
    {
        path: '/ip-to-hex',
        element: <IpToHex />
    },
    {
        path: '/keyword-finder',
        element: <KeyWordFinder />
    },
    {
        path: '/link-shortener',
        element: <LinkShortener />
    },
    {
        path: '/meta-tag-generator',
        element: <MetaTagGenerator />
    },
    {
        path: '/nameserver-lookup',
        element: <NameServer />
    },
    // Popular tools routing end webseo
    // Popular tools routing start text
    {
        path: '/add-line-number',
        element: <TextTools title='Add Line Number' title1='Easily add line numbers online for free' />
    },
    {
        path: '/bbcode-to-text',
        element: <TextTools title='BB To Text Converter' title1='Easily convert bbcode to text online for free.' />
    },
    {
        path: '/binary-converter',
        element: <TextTools title='Text to Binary Converter' title1='Easily convert text to binary online for free.' />
    },
    {
        path: '/word-counter',
        element: <TextTools title='Word Counter' title1='Easily count words online for free.' />
    },
    {
        path: '/reverse-text',
        element: <TextTools title='Reverse Text' title1='Easily convert text reverse online for free.' />
    },
    {
        path: '/case-converter',
        element: <TextTools title='Text Case Converter' title1='Easily convert text case online for free.' />
    },
    {
        path: '/list-sorter',
        element: <TextTools title='List Sorter' title1='Easily sort list online for free.' />
    },
    {
        path: '/remove-emojis',
        element: <TextTools title='Remove Emojis from Text' title1='Easily remove emojis from text online for free.' />
    },
    {
        path: '/remove-accent',
        element: <TextTools title='Remove Letter Accents' title1='Easily remove letter accents online for free.' />
    },
    {
        path: '/small-text',
        element: <TextTools title='Small Text Generator' title1='Easily make small text online for free.' />
    },
    {
        path: '/upside-down-text',
        element: <TextTools title='Upside Down Text Generator' title1='Upside down text generator online for free.' />
    },
    {
        path: '/sha-hashes',
        element: <TextTools title='Hashes Generator' title1='Easily convert text to hashes online for free.' />
    },
    // Popular tools routing end text
]

export default Routing;
