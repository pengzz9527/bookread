import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

interface HeaderProps {
    isAdmin: boolean;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onAddPostClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, onLoginClick, onLogoutClick, onAddPostClick }) => {
    const { language, setLanguage } = useLanguage();
    const { t } = useTranslation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as 'en' | 'zh');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold font-serif text-stone-800">AI Book Nook</h1>
                <div className="flex items-center gap-4">
                     <div>
                        <select 
                            value={language} 
                            onChange={handleLanguageChange}
                            className="bg-stone-100 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2"
                            aria-label={t('language')}
                        >
                            <option value="en">English</option>
                            <option value="zh">中文</option>
                        </select>
                    </div>

                    {isAdmin ? (
                        <>
                            <button 
                                onClick={onAddPostClick}
                                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300 text-sm font-semibold"
                            >
                                {t('addNewPost')}
                            </button>
                            <button 
                                onClick={onLogoutClick}
                                className="bg-stone-500 text-white px-4 py-2 rounded-md hover:bg-stone-600 transition-colors duration-300 text-sm font-semibold"
                            >
                                {t('logout')}
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={onLoginClick}
                            className="bg-stone-700 text-white px-4 py-2 rounded-md hover:bg-stone-800 transition-colors duration-300 text-sm font-semibold"
                        >
                            {t('adminLogin')}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
