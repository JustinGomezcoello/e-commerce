import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './translations/en';
import { es } from './translations/es';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: en,
            es: es
        },
        lng: 'es', // idioma por defecto
        fallbackLng: 'en', // idioma de respaldo
        interpolation: {
            escapeValue: false
        }
    });

export default i18n; 