import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface SpinnerProps {
    small?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ small = false }) => {
    const { t } = useTranslation();
    const sizeClasses = small ? 'h-5 w-5' : 'h-8 w-8';
    const borderClasses = small ? 'border-2' : 'border-4';

    return (
        <div 
            className={`${sizeClasses} ${borderClasses} border-t-teal-500 border-stone-200 rounded-full animate-spin`}
            role="status"
            aria-live="polite"
        >
           <span className="sr-only">{t('loading')}</span>
        </div>
    );
};

export default Spinner;
