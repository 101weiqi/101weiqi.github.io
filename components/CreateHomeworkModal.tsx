import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Book, Grid } from 'lucide-react';
import { MOCK_BOOKS } from '../services/mockService';

interface CreateHomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export const CreateHomeworkModal: React.FC<CreateHomeworkModalProps> = ({ isOpen, onClose, onCreate }) => {
  const { t } = useLanguage();
  const [source, setSource] = useState<'bank' | 'book'>('bank');
  
  // Bank Config State
  const [bankConfig, setBankConfig] = useState({
    lifeDeath: 0,
    tesuji: 0,
    middle: 0,
    endgame: 0,
    fuseki: 0
  });

  // Book Config State
  const [selectedBookId, setSelectedBookId] = useState('');
  const [bookQuantity, setBookQuantity] = useState(10);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      source,
      bankConfig: source === 'bank' ? bankConfig : undefined,
      bookConfig: source === 'book' ? { bookId: selectedBookId, quantity: bookQuantity } : undefined
    });
    onClose();
  };

  const categories = [
    { key: 'lifeDeath', label: t('puzzle.categories.lifeDeath') },
    { key: 'tesuji', label: t('puzzle.categories.tesuji') },
    { key: 'middle', label: t('puzzle.categories.middle') },
    { key: 'endgame', label: t('puzzle.categories.endgame') },
    { key: 'fuseki', label: t('puzzle.categories.fuseki') },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-bounce-in">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-stone-100 bg-stone-50">
          <h3 className="font-bold text-lg text-stone-800">{t('profile.homework.createModal.title')}</h3>
          <button onClick={onClose} className="p-1 hover:bg-stone-200 rounded-full transition">
            <X size={20} className="text-stone-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Source Selection */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">{t('profile.homework.createModal.source')}</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setSource('bank')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition font-bold ${
                  source === 'bank' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-stone-200 text-stone-500 hover:border-stone-300'
                }`}
              >
                <Grid size={18} /> {t('profile.homework.fromBank')}
              </button>
              <button 
                type="button"
                onClick={() => setSource('book')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition font-bold ${
                  source === 'book' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-stone-200 text-stone-500 hover:border-stone-300'
                }`}
              >
                <Book size={18} /> {t('profile.homework.fromBook')}
              </button>
            </div>
          </div>

          {/* Config Area */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            {source === 'bank' ? (
              <div className="space-y-3">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">{t('profile.homework.createModal.selectCategories')}</p>
                {categories.map(cat => (
                  <div key={cat.key} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-stone-700">{cat.label}</span>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button"
                        onClick={() => setBankConfig({...bankConfig, [cat.key]: Math.max(0, bankConfig[cat.key as keyof typeof bankConfig] - 1)})}
                        className="w-6 h-6 rounded bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:border-blue-400"
                      >-</button>
                      <span className="w-6 text-center font-bold text-stone-800">{bankConfig[cat.key as keyof typeof bankConfig]}</span>
                      <button 
                        type="button"
                        onClick={() => setBankConfig({...bankConfig, [cat.key]: bankConfig[cat.key as keyof typeof bankConfig] + 1})}
                        className="w-6 h-6 rounded bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:border-blue-400"
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">{t('profile.homework.createModal.selectBook')}</label>
                  <select 
                    value={selectedBookId}
                    onChange={(e) => setSelectedBookId(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-lg text-sm bg-white"
                    required
                  >
                    <option value="">-- Select --</option>
                    {MOCK_BOOKS.map(book => (
                      <option key={book.id} value={book.id}>{book.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Quantity</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="50" 
                    value={bookQuantity}
                    onChange={(e) => setBookQuantity(parseInt(e.target.value))}
                    className="w-full p-2 border border-stone-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 text-stone-500 font-bold hover:bg-stone-100 rounded-xl transition"
            >
              {t('profile.homework.createModal.cancel')}
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-stone-800 text-white font-bold rounded-xl shadow-lg hover:bg-stone-900 transition flex items-center justify-center gap-2"
            >
              {t('profile.homework.createModal.create')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};