import React, { useState } from 'react';
import { GoBoard } from '../components/GoBoard';
import { GoEngine } from '../lib/goEngine';
import { MOCK_PUZZLES } from '../services/mockService';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const PuzzlePage: React.FC = () => {
  const { t, language } = useLanguage();
  // Load first puzzle mock
  const [currentPuzzle, setCurrentPuzzle] = useState(MOCK_PUZZLES[0]);
  
  const initPuzzleEngine = () => {
     // Normally we parse SGF here. Hardcoding a setup for demo.
     const e = new GoEngine(19);
     e.placeStone(18, 0); // B
     e.placeStone(18, 1); // B
     e.placeStone(16, 2); // B
     e.placeStone(17, 2); // B
     e.placeStone(16, 0); // W
     e.placeStone(16, 1); // W
     e.placeStone(15, 2); // W
     return e;
  };

  const [engine, setEngine] = useState(initPuzzleEngine);
  const [status, setStatus] = useState<'playing' | 'success' | 'failed'>('playing');

  const handleMove = (x: number, y: number) => {
    if (status !== 'playing') return;
    
    const newEngine = engine.clone();
    if (newEngine.placeStone(x, y).success) {
      setEngine(newEngine);
      
      // Mock Logic for Puzzle checking
      // In real app, check against SGF variations tree
      if (x === 18 && y === 2) {
          setStatus('success');
      } else {
          setStatus('failed');
          // Computer refutes
          setTimeout(() => {
             const refuteEngine = newEngine.clone();
             refuteEngine.placeStone(18, 2); // Vital point
             setEngine(refuteEngine);
          }, 500);
      }
    }
  };

  const handleRetry = () => {
    setEngine(initPuzzleEngine());
    setStatus('playing');
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          {/* Using translated title if available in dictionary, otherwise mock data for demo */}
          <h2 className="text-xl font-bold text-stone-800">{language === 'zh' ? t('puzzle.title') : currentPuzzle.title}</h2>
          <span className="text-sm text-stone-500 font-mono">{currentPuzzle.rank} • {currentPuzzle.type}</span>
        </div>
        <div className="text-right">
             <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">{t('puzzle.turn')}</span>
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-black rounded-full"></div>
                 <span className="font-medium">{t('puzzle.black')}</span>
             </div>
        </div>
      </div>

      <div className="w-full shadow-xl rounded overflow-hidden mb-6 relative">
        <GoBoard engine={engine} onMove={handleMove} interactive={status === 'playing'} />
        
        {status !== 'playing' && (
           <div className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity`}>
               <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center animate-bounce-in">
                   {status === 'success' ? (
                       <>
                         <CheckCircle className="text-green-500 w-16 h-16 mb-2" />
                         <h3 className="text-2xl font-bold text-stone-800">{t('puzzle.correct')}</h3>
                         <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-green-700">
                            {t('puzzle.next')} <ArrowRight size={18} />
                         </button>
                       </>
                   ) : (
                       <>
                         <XCircle className="text-red-500 w-16 h-16 mb-2" />
                         <h3 className="text-2xl font-bold text-stone-800">{t('puzzle.wrong')}</h3>
                         <button 
                            onClick={handleRetry} 
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

      <div className="w-full bg-blue-50 border border-blue-100 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
            <strong>{t('puzzle.hint')}:</strong> {t('puzzle.hintText')}
        </p>
      </div>
    </div>
  );
};