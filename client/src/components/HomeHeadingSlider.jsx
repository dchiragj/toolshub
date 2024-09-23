import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'

const HomeHeadingSlider = () => {
    return (
        <>
            <Swiper
                direction='vertical'
                className='mySwiper'
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                modules={[Autoplay]}
                loop='true'
            >
                <SwiperSlide className='text-white px-2' style={{ backgroundColor: "#1c67ca" }}>Education</SwiperSlide>
                <SwiperSlide className='text-white px-2' style={{ backgroundColor: "#f66213" }}>Conversion</SwiperSlide>
                <SwiperSlide className='text-white px-2' style={{ backgroundColor: "#d61c4e" }}>Your Life</SwiperSlide>
                <SwiperSlide className='text-white px-2' style={{ backgroundColor: "#247881" }}>Business</SwiperSlide>
            </Swiper>
        </>
    )
}

export default HomeHeadingSlider