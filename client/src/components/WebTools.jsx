import React from 'react'
import AI from "../assets/aiImg.png"

const WebTools = () => {
    return (
        <div className='bg-lightBlue dark:bg-darkBlue py-5 pb-10'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <div className='w-full flex flex-col justify-center items-start gap-5 px-5'>
                        <h3 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold'>Free AI Powered Web Tools</h3>
                        <p className='text-white font-semibold'>
                            We are 100% free to use (We also do OCR without asking for registration). For our most loyal supporters, Discover the boundless possibilities with our suite of free AI-powered web tools that is meant to empower everyone. Our platform leverages the power of the latest artificial intelligence technology and provides you with a variety of intuitive and innovative solutions designed according to your needs.
                            From easy AI writing content to powerful PDF & image processing tools, we develop software with an emphasis on simplicity and usability. No matter if you are a student or professional writer or just want to be a prolific blogger, our intuitive interface and best-in-class AI algorithms makes it easy to quickly produce high quality content.
                            Discover the next generation of online tools now by exploring these modern artificial intelligence powered web apps.
                        </p>
                    </div>
                    <div className='w-full h-full flex flex-col justify-center items-center gap-5 px-3'>
                        <img src={AI} alt="Ai Images" className='mt-4 rounded-full object-cover aspect-auto'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WebTools