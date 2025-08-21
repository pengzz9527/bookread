import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyPolicyModalProps {
    onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const { language } = useLanguage();

    const lastUpdatedDate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-stone-800">{t('privacyPolicyTitle')}</h2>
                    <button onClick={onClose} className="text-stone-500 hover:text-stone-800 text-3xl font-light">&times;</button>
                </div>
                <div className="text-stone-700 space-y-4 text-sm">
                    <p><strong>{t('lastUpdated')}</strong> {lastUpdatedDate}</p>
                    <p>{t('ppIntro')}</p>
                    
                    <h3 className="font-bold text-lg pt-2">{t('ppInfoCollectTitle')}</h3>
                    <p>{t('ppInfoCollectBody')}</p>

                    <h3 className="font-bold text-lg pt-2">{t('ppCookiesTitle')}</h3>
                    <p>{t('ppCookiesBody')}</p>

                    <h3 className="font-bold text-lg pt-2">{t('ppAffiliateTitle')}</h3>
                    <p>{t('ppAffiliateBody')}</p>

                    <h3 className="font-bold text-lg pt-2">{t('ppDataRightsTitle')}</h3>
                    <p>{t('ppDataRightsBody')}</p>
                    
                    <h3 className="font-bold text-lg pt-2">{t('ppChangesTitle')}</h3>
                    <p>{t('ppChangesBody')}</p>
                </div>
                 <div className="mt-6 text-right">
                    <button onClick={onClose} className="bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
                        {t('close')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;
