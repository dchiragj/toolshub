import React, { useRef, useState } from 'react'
import CommonPageHeader from '../../components/CommonPageHeader'
import FreeTools from '../../components/FreeTools'
import Ads from '../../components/Ads';
import WebTools from '../../components/WebTools';

const WebmVideo = () => {

    const videoRef = useRef(null);
    // const playbackRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const isAdServe = JSON.parse(process.env.REACT_APP_PUBLIC_SERVE_ADS)

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setVideoURL(url);  // Save the video URL for playback
                setRecordedChunks([]);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            alert(`Accessing WebCam : ${error.message}`)
        }
    };

    const downloadVideo = () => {
        if (videoURL) {
            const a = document.createElement('a');
            a.href = videoURL;
            a.download = 'recording.webm'; // Set the default download filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a); // Clean up
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            {isAdServe && <Ads slot='' className="mx-10 mt-5" />}
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white'>WEBM Video Maker</h1>
            <p className='text-center text-gray500 my-5'>Easily convert web cam to webm online for free.</p>
            <div className='sm:mx-10 flex flex-col gap-5'>
                <video ref={videoRef} playsInline className='w-full h-[500px] bg-black'>

                </video>
                <div className='flex justify-center items-center gap-5'>
                    {
                        !isRecording ? <button className='px-5 py-2 text-white bg-lightBlue hover:bg-white hover:text-lightBlue rounded-lg' onClick={startRecording}>Start Recording</button>
                            : <button className='px-5 py-2 text-white bg-lightBlue hover:bg-white hover:text-lightBlue rounded-lg' onClick={stopRecording}>Stop Recording</button>
                    }
                </div>
                {videoURL &&
                    <div className='flex flex-col gap-5'>
                        <video src={videoURL} controls className='w-full h-[500px]'></video>
                        <button className='px-5 py-2 text-white bg-lightBlue hover:bg-white hover:text-lightBlue rounded-lg' onClick={downloadVideo}>Download</button>
                    </div>
                }
            </div>
            {isAdServe && <Ads slot='' className="mx-10 mt-5" />}
            <FreeTools />
            <WebTools />
        </div>
    )
}

export default WebmVideo