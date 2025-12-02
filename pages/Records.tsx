
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FileText } from 'lucide-react';

export const Records: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-stone-400">
      <div className="bg-stone-200 p-6 rounded-full mb-4">
        <FileText size={48} className="text-stone-500" />
      </div>
      <h2 className="text-2xl font-bold text-stone-600">{t('nav.records')}</h2>
      <p className="mt-2 text-stone-500">Feature coming soon.</p>
    </div>
  );
};
