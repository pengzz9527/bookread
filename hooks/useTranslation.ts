import { useLanguage } from '../context/LanguageContext';
import en from '../locales/en.ts';
import zh from '../locales/zh.ts';

const translations = { en, zh };

type TranslationKey = keyof typeof en;

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (key: TranslationKey, replacements?: Record<string, string | number>): string => {
        // Treat the selected language object as having the same shape as 'en' for type safety
        let translation = (translations[language] as typeof en)[key] || key;
        
        if (replacements) {
            Object.keys(replacements).forEach(placeholder => {
                translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
            });
        }
        
        return translation;
    };

    return { t };
};
