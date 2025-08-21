import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface FooterProps {
    onPrivacyClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick }) => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-stone-800 text-stone-300 mt-12 py-8">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-4">
                    <p className="font-semibold text-white">{t('affiliateDisclosure')}</p>
                    <p className="text-sm italic max-w-3xl mx-auto">
                        {t('disclosureText')}
                    </p>
                </div>
                <div className="border-t border-stone-700 pt-4 mt-4 text-sm">
                    <p>{t('copyright', { year })}</p>
                    <button onClick={onPrivacyClick} className="underline hover:text-white transition-colors">
                        {t('privacyPolicy')}
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
