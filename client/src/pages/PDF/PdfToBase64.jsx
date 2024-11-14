import React from 'react'

const PdfToBase64 = () => {
    return (
        <div className='mt-[72px] dark:bg-darkBlue'>
            <CommonPageHeader />
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white flex items-center justify-center'>
                Base-64 to PDF Converter
            </h1>
            <p className='text-center text-gray500 my-5'>Easily convert base-64 string to pdf documents online.</p>
            <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto flex flex-col justify-center items-center gap-5'>
                <textarea
                    rows={5}
                    placeholder='Enter Base64 string'
                    className='w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white'
                    value={base64}
                    onChange={(e) => setBase64(e.target.value)}
                ></textarea>
            </div>
        </div>
    )
}

export default PdfToBase64