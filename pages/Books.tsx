
import React, { useState } from 'react';
import { MOCK_BOOKS } from '../services/mockService';
import { BookChapter } from '../types';
import { Library, Folder, FileText, ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';
import { useLanguage, useNavigate } from '../contexts/LanguageContext';

export const Books: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const selectedBook = MOCK_BOOKS.find(b => b.id === selectedBookId);

  // Recursive component for rendering chapters
  const ChapterNode = ({ node, level = 0 }: { node: BookChapter; level?: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    
    // For Demo: if it's a leaf (problem/content), we can navigate to a viewer (using DemoBoard for now)
    const handleClick = () => {
      if (hasChildren) {
        setIsOpen(!isOpen);
      } else {
        // In a real app, pass the SGF to the demo board or puzzle viewer
        navigate('/demo');
      }
    };

    return (
      <div className="select-none">
        <div 
          onClick={handleClick}
          className="flex items-center gap-2 p-3 hover:bg-stone-50 cursor-pointer border-b border-stone-100 transition-colors"
          style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
        >
          <div className="text-stone-400">
             {hasChildren ? (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />) : <FileText size={16} className="text-blue-400" />}
          </div>
          <div className="flex-1">
             <span className={`text-sm ${hasChildren ? 'font-bold text-stone-700' : 'text-stone-600'}`}>{node.title}</span>
          </div>
        </div>
        
        {hasChildren && isOpen && (
           <div className="bg-stone-50/30">
             {node.children!.map(child => (
               <ChapterNode key={child.id} node={child} level={level + 1} />
             ))}
           </div>
        )}
      </div>
    );
  };

  if (selectedBook) {
    return (
      <div className="h-full flex flex-col">
        {/* Book Header */}
        <div className="bg-white p-4 border-b border-stone-200 flex items-center gap-4 sticky top-0 z-10">
           <button 
             onClick={() => setSelectedBookId(null)}
             className="p-2 hover:bg-stone-100 rounded-full text-stone-500"
           >
             <ChevronLeft size={24} />
           </button>
           <div className="flex-1">
             <h2 className="text-xl font-bold text-stone-800">{selectedBook.title}</h2>
             <p className="text-xs text-stone-500">by {selectedBook.author}</p>
           </div>
        </div>
        
        {/* Book Content Tree */}
        <div className="flex-1 overflow-y-auto bg-white shadow-sm rounded-b-xl">
           {selectedBook.content.map(chapter => (
             <ChapterNode key={chapter.id} node={chapter} />
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
           <Library className="text-stone-600" />
           {t('nav.books')}
         </h2>
         <button className="bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-stone-700 transition">
            + New Book
         </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {MOCK_BOOKS.map(book => (
           <div 
             key={book.id} 
             onClick={() => setSelectedBookId(book.id)}
             className="group cursor-pointer"
           >
             <div className="aspect-[3/4] rounded-lg shadow-md overflow-hidden bg-stone-200 relative mb-3 group-hover:shadow-xl transition-all transform group-hover:-translate-y-1">
                <img src={book.cover} className="w-full h-full object-cover" alt={book.title} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                {!book.isPublic && (
                   <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                     Private
                   </span>
                )}
             </div>
             <h3 className="font-bold text-stone-800 leading-tight group-hover:text-blue-600 transition-colors">{book.title}</h3>
             <p className="text-xs text-stone-500 mt-1">{book.author}</p>
           </div>
         ))}
      </div>
    </div>
  );
};
