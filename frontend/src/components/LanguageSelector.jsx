import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-selector">
            <button
                className={`language-btn ${i18n.language === 'es' ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}
            >
                <span className="flag">🇪🇸</span>
                ES
            </button>
            <button
                className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
            >
                <span className="flag">🇺🇸</span>
                EN
            </button>
        </div>
    );
};

export default LanguageSelector; 