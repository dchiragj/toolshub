import React from 'react'

const CommonPageHeader = ({text}) => {
  return (
    <div className='w-full py-2 text-white text-xs sm:text-base md:text-lg text-center bg-[#1a8fe3]'>
        {text}
    </div>

  )
}

export default CommonPageHeader