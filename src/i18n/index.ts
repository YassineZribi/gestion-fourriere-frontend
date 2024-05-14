import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common';
import frCommon from './locales/fr/common';
import arCommon from './locales/ar/common';
import enRoot from './locales/en/root';
import frRoot from './locales/fr/root';
import arRoot from './locales/ar/root';
import enGlossary from './locales/en/glossary';
import frGlossary from './locales/fr/glossary';
import arGlossary from './locales/ar/glossary';

export const defaultNS = 'common'; // Default name space

// Configuration for i18next
i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ar', // Fallback language
        supportedLngs: ['en', 'fr', 'ar'],
        // lng: 'ar',
        debug: import.meta.env.DEV,
        defaultNS: defaultNS,
        fallbackNS: defaultNS,
        resources: {
            en: { [defaultNS]: enCommon, root: enRoot, glossary: enGlossary },
            fr: { [defaultNS]: frCommon, root: frRoot, glossary: frGlossary },
            ar: { [defaultNS]: arCommon, root: arRoot, glossary: arGlossary }
        },
        detection: {
            order: ['localStorage']
        },
    });

export default i18next;