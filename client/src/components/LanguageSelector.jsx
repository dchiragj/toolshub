import React from 'react'

const LanguageSelector = ({width}) => {
    return (
        <>
            <select className={`w-full border-[1px] border-gray400 pl-1 pr-10 py-2 text-sm rounded-2xl`}>
                <option value="Gujarati">Gujarati</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
            </select>
        </>
    )
}

export default LanguageSelector