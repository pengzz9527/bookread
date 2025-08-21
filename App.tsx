import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogPost from './components/BlogPost';
import LoginModal from './components/LoginModal';
import AdminModal from './components/AdminModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import { BookPostData } from './types';
import { ADMIN_PASSWORD, INITIAL_BOOK_POSTS } from './constants';
import { generateBookReview } from './services/geminiService';
import { useLanguage, Language } from './context/LanguageContext';
import { useTranslation } from './hooks/useTranslation';

const App: React.FC = () => {
    const { language } = useLanguage();
    const { t } = useTranslation();
    const [posts, setPosts] = useState<BookPostData[]>(INITIAL_BOOK_POSTS);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
    const [isPrivacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    
    // State for the Admin Modal
    const [isAdmModalOpen, setAdmModalOpen] = useState<boolean>(false);
    const [editingPost, setEditingPost] = useState<BookPostData | null>(null);

    const handleLogin = (password: string): boolean => {
        if (password === ADMIN_PASSWORD) {
            setIsAdmin(true);
            setLoginModalOpen(false);
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        setIsAdmin(false);
    };

    const handleOpenAdminModal = (post: BookPostData | null) => {
        setEditingPost(post);
        setAdmModalOpen(true);
    };

    const handleCloseAdminModal = () => {
        setEditingPost(null);
        setAdmModalOpen(false);
    };

    const handleSavePost = (postToSave: BookPostData) => {
        if (editingPost) {
            // Update existing post
            setPosts(posts.map(p => p.id === postToSave.id ? postToSave : p));
        } else {
            // Add new post
            setPosts([ postToSave, ...posts ]);
        }
        handleCloseAdminModal();
    };

    const handleDeletePost = (id: string) => {
        setPosts(posts.filter(p => p.id !== id));
    };

    const handleGenerateReview = async (title: string, author: string, lang: Language): Promise<string> => {
        setIsGenerating(true);
        try {
            const review = await generateBookReview(title, author, lang);
            return review;
        } catch (error) {
            console.error("Failed to generate review:", error);
            return "Error: Could not generate a review. Please try again.";
        } finally {
            setIsGenerating(false);
        }
    };


    return (
        <div className="flex flex-col min-h-screen font-sans text-stone-800">
            <Header 
                isAdmin={isAdmin}
                onLoginClick={() => setLoginModalOpen(true)}
                onLogoutClick={handleLogout}
                onAddPostClick={() => handleOpenAdminModal(null)}
            />
            
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-stone-900">{t('welcomeTitle')}</h1>
                    <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">{t('welcomeSubtitle')}</p>
                </div>
                
                <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => (
                        <BlogPost 
                            key={post.id}
                            post={post}
                            isAdmin={isAdmin}
                            onEdit={() => handleOpenAdminModal(post)}
                            onDelete={() => handleDeletePost(post.id)}
                            language={language}
                        />
                    ))}
                </div>
            </main>
            
            <Footer onPrivacyClick={() => setPrivacyModalOpen(true)} />

            {isLoginModalOpen && (
                <LoginModal 
                    onClose={() => setLoginModalOpen(false)}
                    onLogin={handleLogin}
                />
            )}

            {isPrivacyModalOpen && (
                <PrivacyPolicyModal onClose={() => setPrivacyModalOpen(false)} />
            )}

            {isAdmModalOpen && (
                <AdminModal 
                    isOpen={isAdmModalOpen}
                    onClose={handleCloseAdminModal}
                    onSave={handleSavePost}
                    post={editingPost}
                    onGenerateReview={handleGenerateReview}
                    isGenerating={isGenerating}
                />
            )}
        </div>
    );
};

export default App;
