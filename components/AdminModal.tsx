import React, { useState, useEffect } from 'react';
import { BookPostData, BookPostContent } from '../types';
import { Language } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import Spinner from './Spinner';

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (post: BookPostData) => void;
    post: BookPostData | null;
    onGenerateReview: (title: string, author: string, lang: Language) => Promise<string>;
    isGenerating: boolean;
}

const BLANK_CONTENT: BookPostContent = { title: '', author: '', review: '' };

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onSave, onClose, post, onGenerateReview, isGenerating }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Omit<BookPostData, 'id' | 'publishDate'>>({
        en: { ...BLANK_CONTENT },
        zh: { ...BLANK_CONTENT },
        imageUrl: 'https://picsum.photos/600/800',
        amazonLink: ''
    });
    const [activeLang, setActiveLang] = useState<Language>('en');

    useEffect(() => {
        if (post) {
            setFormData({
                en: post.en,
                zh: post.zh,
                imageUrl: post.imageUrl,
                amazonLink: post.amazonLink,
            });
        } else {
            setFormData({
                en: { ...BLANK_CONTENT },
                zh: { ...BLANK_CONTENT },
                imageUrl: 'https://picsum.photos/600/800',
                amazonLink: ''
            });
        }
        setActiveLang('en'); // Reset to English tab on open
    }, [post, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'imageUrl' || name === 'amazonLink') {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({
                ...prev,
                [activeLang]: {
                    ...prev[activeLang],
                    [name]: value
                }
            }));
        }
    };

    const handleGenerateClick = async () => {
        const currentContent = formData[activeLang];
        if (currentContent.title && currentContent.author) {
            const generatedReview = await onGenerateReview(currentContent.title, currentContent.author, activeLang);
            setFormData(prev => ({ 
                ...prev, 
                [activeLang]: {
                    ...prev[activeLang],
                    review: generatedReview
                }
            }));
        } else {
            alert(t('enterTitleAuthorFirst'));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalPost: BookPostData = {
            ...formData,
            id: post?.id || new Date().toISOString(),
            publishDate: post?.publishDate || new Date().toISOString(),
        };
        onSave(finalPost);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-stone-800">{post ? t('editPostTitle') : t('addPostTitle')}</h2>
                    <button onClick={onClose} className="text-stone-500 hover:text-stone-800 text-3xl font-light">&times;</button>
                </div>
                
                <div className="border-b border-stone-200 mb-4">
                    <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                        <button onClick={() => setActiveLang('en')} className={`${activeLang === 'en' ? 'border-teal-500 text-teal-600' : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}>
                            English
                        </button>
                         <button onClick={() => setActiveLang('zh')} className={`${activeLang === 'zh' ? 'border-teal-500 text-teal-600' : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}>
                            中文 (Chinese)
                        </button>
                    </nav>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-stone-700">{t('bookTitle')}</label>
                        <input type="text" name="title" id="title" value={formData[activeLang].title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                    </div>
                     <div>
                        <label htmlFor="author" className="block text-sm font-medium text-stone-700">{t('author')}</label>
                        <input type="text" name="author" id="author" value={formData[activeLang].author} onChange={handleChange} required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                    </div>
                    <div>
                        <label htmlFor="review" className="block text-sm font-medium text-stone-700">{t('review')}</label>
                        <div className="relative">
                            <textarea name="review" id="review" value={formData[activeLang].review} onChange={handleChange} required rows={8} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                            {isGenerating && <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center"><Spinner /></div>}
                        </div>
                         <button type="button" onClick={handleGenerateClick} disabled={isGenerating} className="mt-2 text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md hover:bg-indigo-200 disabled:bg-stone-200 disabled:text-stone-500 flex items-center gap-2">
                             {isGenerating && <Spinner small />}
                             {isGenerating ? t('generating') : t('generateReview')}
                        </button>
                    </div>
                    
                    <div className="pt-4 border-t border-stone-200 space-y-4">
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-stone-700">{t('imageUrl')}</label>
                            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                        </div>
                        <div>
                            <label htmlFor="amazonLink" className="block text-sm font-medium text-stone-700">{t('amazonLink')}</label>
                            <input type="text" name="amazonLink" id="amazonLink" value={formData.amazonLink} onChange={handleChange} required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                         <button type="button" onClick={onClose} className="bg-stone-200 text-stone-800 px-4 py-2 rounded-md hover:bg-stone-300 transition-colors">{t('cancel')}</button>
                         <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">{t('savePost')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminModal;
