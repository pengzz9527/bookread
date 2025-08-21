import React from 'react';
import { BookPostData } from '../types';
import { Language } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

interface BlogPostProps {
    post: BookPostData;
    isAdmin: boolean;
    onEdit: () => void;
    onDelete: () => void;
    language: Language;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, isAdmin, onEdit, onDelete, language }) => {
    const { t } = useTranslation();
    const content = post[language];

    const formattedDate = new Date(post.publishDate).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="relative">
                <img src={post.imageUrl} alt={`Cover of ${content.title}`} className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-stone-500 mb-1">{formattedDate}</p>
                <h2 className="text-2xl font-bold font-serif text-stone-900">{content.title}</h2>
                <h3 className="text-md font-semibold text-stone-600 mb-4">{t('byAuthor', { author: content.author })}</h3>
                <p className="text-stone-700 font-serif leading-relaxed flex-grow">{content.review}</p>
                
                <div className="mt-6">
                    <a 
                        href={post.amazonLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full block text-center bg-amber-500 text-stone-900 font-bold py-3 px-4 rounded-md hover:bg-amber-600 transition-colors duration-300"
                    >
                        {t('buyOnAmazon')}
                    </a>
                </div>

                {isAdmin && (
                    <div className="mt-4 pt-4 border-t border-stone-200 flex gap-2">
                        <button 
                            onClick={onEdit}
                            className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-md hover:bg-blue-200"
                        >
                            {t('edit')}
                        </button>
                        <button 
                            onClick={onDelete}
                            className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200"
                        >
                            {t('delete')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPost;
