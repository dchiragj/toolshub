import React, { useEffect, useState } from 'react'
import { HiMiniArrowUpCircle } from "react-icons/hi2";
import { useAuth } from '../Context/AllContext';

const BottomToTop = () => {

    const {darkMode} = useAuth();

    const [visible, setVisible] = useState(false);

    const bottomToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const scrollFun = () => {
        if (window.pageYOffset > 50) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollFun)
        return () => {
            window.removeEventListener('scroll', scrollFun)
        }
    }, [])

    return (
        <button className={`${visible ? "" : "hidden"} fixed right-5 bottom-5 z-[1000]`} onClick={bottomToTop} title='Click to top'>
            <HiMiniArrowUpCircle fontSize={54} color={darkMode ? "#ffffff" : "#000000"} />
        </button>
    )
}

export default BottomToTop