// LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({width}) => {
    const { i18n } = useTranslation();

    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <select onChange={handleChange} defaultValue={i18n.language} className={`w-[100%] border-[1px] border-gray400 pl-1 pr-10 py-2 text-sm rounded-2xl`}>
            <option value="en">English</option>
            <option value="es">Español</option>
        </select> 
    );
};

export default LanguageSelector;
