import React, { useState, useEffect } from 'react';
import { GoBoard } from '../components/GoBoard';
import { GoEngine } from '../lib/goEngine';
import { MOCK_PUZZLES } from '../services/mockService';
import { CheckCircle, XCircle, ArrowRight, Grid, ChevronLeft, Target, BookOpen, Brain, Zap, Hash } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type CategoryType = 'rank' | 'topic';

export const PuzzlePage: React.FC = () => {
  const { t, language } = useLanguage();
  
  // State
  const [selectedCategory, setSelectedCategory] = useState<{ type: CategoryType, value: string } | null>(null);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0); // 1-based index logically, 0-based for array
  const [jumpInput, setJumpInput] = useState('');
  
  // Engine State
  const [engine, setEngine] = useState(new GoEngine(19));
  const [status, setStatus] = useState<'playing' | 'success' | 'failed'>('playing');

  // Constants
  const ranks = ['15k','14k','13k','12k','11k','10k','9k','8k','7k','6k','5k','4k','3k','2k','1k','1d','2d','3d','4d','5d','6d'];
  const topics = [
    { id: 'lifeDeath', label: t('puzzle.categories.lifeDeath'), icon: Target },
    { id: 'tesuji', label: t('puzzle.categories.tesuji'), icon: Zap },
    { id: 'middle', label: t('puzzle.categories.middle'), icon: Grid },
    { id: 'fuseki', label: t('puzzle.categories.fuseki'), icon: BookOpen },
    { id: 'endgame', label: t('puzzle.categories.endgame'), icon: Hash },
    { id: 'theory', label: t('puzzle.categories.theory'), icon: Brain },
  ];

  // Initialize Puzzle
  useEffect(() => {
    if (selectedCategory) {
      initPuzzle(currentPuzzleIndex);
    }
  }, [selectedCategory, currentPuzzleIndex]);

  const initPuzzle = (index: number) => {
     // In a real app, fetch puzzle #index from category
     // Mocking: reuse the same few puzzles but change title/ID
     // const mockBase = MOCK_PUZZLES[index % MOCK_PUZZLES.length];
     const e = new GoEngine(19);
     
     // Simple mock setup for demo - create different problems based on index parity
     if (index % 2 === 0) {
        // Mock Problem A
        e.placeStone(16, 0); // B
        e.placeStone(16, 1); // B
        e.placeStone(15, 2); // B
        e.placeStone(14, 0); // W
        e.placeStone(14, 1); // W
        e.placeStone(14, 2); // W
     } else {
        // Mock Problem B
        e.placeStone(3, 3);
        e.placeStone(16, 16);
     }
     
     setEngine(e);
     setStatus('playing');
  };

  const handleMove = (x: number, y: number) => {
    if (status !== 'playing') return;
    
    const newEngine = engine.clone();
    if (newEngine.placeStone(x, y).success) {
      setEngine(newEngine);
      
      // Mock Check logic
      const isCorrect = Math.random() > 0.4; // 60% chance correct for demo
      if (isCorrect) {
          setStatus('success');
      } else {
          setStatus('failed');
          // Computer refutes
          setTimeout(() => {
             const refuteEngine = newEngine.clone();
             // Just place a stone nearby to simulate response
             refuteEngine.placeStone(x + (x<18?1:-1), y); 
             setEngine(refuteEngine);
          }, 500);
      }
    }
  };

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput);
    if (!isNaN(num) && num > 0) {
      setCurrentPuzzleIndex(num - 1); // Convert 1-based to 0-based
      setJumpInput('');
    }
  };

  const nextPuzzle = () => {
    setCurrentPuzzleIndex(prev => prev + 1);
  };

  // --- Render: Category Selection ---
  if (!selectedCategory) {
    return (
      <div className="space-y-8 pb-20">
        <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
           <Brain className="text-blue-600" />
           {t('puzzle.title')}
        </h2>

        {/* Topics */}
        <section>
           <h3 className="text-lg font-bold text-stone-700 mb-3 border-l-4 border-blue-500 pl-3">{t('puzzle.categories.topics')}</h3>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {topics.map(topic => (
                <button 
                  key={topic.id}
                  onClick={() => setSelectedCategory({ type: 'topic', value: topic.id })}
                  className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 hover:border-blue-400 hover:shadow-md transition flex flex-col items-center gap-2"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                    <topic.icon size={24} />
                  </div>
                  <span className="font-bold text-stone-700">{topic.label}</span>
                  <span className="text-xs text-stone-400">1200 {t('puzzle.solver.total')}</span>
                </button>
              ))}
           </div>
        </section>

        {/* Ranks */}
        <section>
           <h3 className="text-lg font-bold text-stone-700 mb-3 border-l-4 border-green-500 pl-3">{t('puzzle.categories.levels')}</h3>
           <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {ranks.map(rank => (
                <button 
                  key={rank}
                  onClick={() => setSelectedCategory({ type: 'rank', value: rank })}
                  className={`
                    py-2 rounded-lg font-bold text-sm transition border
                    ${rank.includes('d') 
                      ? 'bg-stone-800 text-white border-stone-800 hover:bg-stone-700' 
                      : 'bg-white text-stone-600 border-stone-200 hover:border-green-400 hover:bg-green-50'
                    }
                  `}
                >
                  {rank}
                </button>
              ))}
           </div>
        </section>
      </div>
    );
  }

  // --- Render: Solver ---
  const categoryLabel = selectedCategory.type === 'rank' 
     ? selectedCategory.value 
     : topics.find(t => t.id === selectedCategory.value)?.label;

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center h-full">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm border border-stone-100">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-1 text-stone-500 hover:text-stone-800 font-medium"
        >
          <ChevronLeft size={20} /> <span className="hidden md:inline">{t('puzzle.title')}</span>
        </button>
        
        <div className="text-center">
           <h2 className="font-bold text-stone-800">{categoryLabel}</h2>
           <div className="text-xs text-stone-500 flex items-center justify-center gap-1">
             <span>#{currentPuzzleIndex + 1}</span>
             <span className="text-stone-300">|</span>
             <span>{t('puzzle.solver.total')} 1000+</span>
           </div>
        </div>

        <form onSubmit={handleJump} className="flex gap-1">
           <input 
             type="number" 
             placeholder="#" 
             value={jumpInput}
             onChange={e => setJumpInput(e.target.value)}
             className="w-12 px-2 py-1 text-xs border border-stone-300 rounded text-center focus:outline-none focus:border-blue-500"
           />
           <button type="submit" className="text-xs bg-stone-100 px-2 rounded hover:bg-stone-200">
             {t('puzzle.solver.go')}
           </button>
        </form>
      </div>

      {/* Board */}
      <div className="w-full shadow-xl rounded overflow-hidden mb-6 relative">
        <GoBoard engine={engine} onMove={handleMove} interactive={status === 'playing'} />
        
        {status !== 'playing' && (
           <div className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity z-20`}>
               <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center animate-bounce-in">
                   {status === 'success' ? (
                       <>
                         <CheckCircle className="text-green-500 w-16 h-16 mb-2" />
                         <h3 className="text-2xl font-bold text-stone-800">{t('puzzle.correct')}</h3>
                         <button 
                           onClick={nextPuzzle}
                           className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-green-700"
                         >
                            {t('puzzle.next')} <ArrowRight size={18} />
                         </button>
                       </>
                   ) : (
                       <>
                         <XCircle className="text-red-500 w-16 h-16 mb-2" />
                         <h3 className="text-2xl font-bold text-stone-800">{t('puzzle.wrong')}</h3>
                         <button 
                            onClick={() => initPuzzle(currentPuzzleIndex)}
                            className="mt-4 bg-stone-800 text-white px-6 py-2 rounded-full font-bold hover:bg-stone-900"
                         >
                            {t('puzzle.retry')}
                         </button>
                       </>
                   )}
               </div>
           </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="w-full bg-blue-50 border border-blue-100 p-4 rounded-lg flex justify-between items-center">
        <div>
           <span className="text-xs uppercase font-bold text-stone-400 tracking-wider block mb-1">{t('puzzle.turn')}</span>
           <div className="flex items-center gap-2">
               <div className="w-4 h-4 bg-black rounded-full shadow-sm"></div>
               <span className="font-bold text-stone-800">{t('puzzle.black')}</span>
           </div>
        </div>
        <p className="text-sm text-blue-800 text-right max-w-[60%]">
           <strong>{t('puzzle.hint')}:</strong> {t('puzzle.hintText')}
        </p>
      </div>
    </div>
  );
};