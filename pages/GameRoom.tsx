import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoBoard } from '../components/GoBoard';
import { GoEngine } from '../lib/goEngine';
import { CURRENT_USER } from '../services/mockService';
import { MessageSquare, SkipForward, Flag, RotateCcw } from 'lucide-react';
import { StoneColor } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const GameRoom: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [engine, setEngine] = useState(new GoEngine(19));
  const [activeTab, setActiveTab] = useState<'chat' | 'moves'>('moves');
  const [inputMsg, setInputMsg] = useState('');

  // Initial setup mock
  useEffect(() => {
    const e = new GoEngine(19);
    // Simulate some moves
    e.placeStone(15, 3); // B
    e.placeStone(3, 3);  // W
    e.placeStone(15, 15); // B
    setEngine(e);
  }, [id]);

  const handleMove = (x: number, y: number) => {
    // Clone engine to trigger re-render
    const newEngine = engine.clone();
    const result = newEngine.placeStone(x, y);
    
    if (result.success) {
      // Play sound here
      setEngine(newEngine);
      
      // Simulate opponent response (bot or realtime)
      setTimeout(() => {
        // Simple random bot for demo
        let moved = false;
        const botEngine = newEngine.clone();
        while(!moved && botEngine.moves.length < 300) {
            const rx = Math.floor(Math.random() * 19);
            const ry = Math.floor(Math.random() * 19);
            if(botEngine.isValidMove(rx, ry, botEngine.getCurrentTurn())) {
                botEngine.placeStone(rx, ry);
                setEngine(botEngine);
                moved = true;
            }
        }
      }, 500);
    }
  };

  const turnColor = engine.getCurrentTurn();
  const isMyTurn = true; // Mock check

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Game Board Area */}
      <div className="flex-1 flex flex-col items-center">
        
        {/* Player Header Mobile */}
        <div className="w-full flex justify-between items-center mb-2 px-2 lg:hidden">
            <div className="flex items-center gap-2">
                <img src="https://picsum.photos/50/50?r=2" className="w-8 h-8 rounded-full" />
                <span className="font-bold text-sm">{t('game.opponent')}</span>
            </div>
            <div className="bg-stone-200 px-3 py-1 rounded text-xs font-mono">23:45</div>
        </div>

        <div className="w-full max-w-[600px]">
           <GoBoard engine={engine} onMove={handleMove} interactive={isMyTurn} />
        </div>

        {/* Player Footer Mobile */}
        <div className="w-full flex justify-between items-center mt-2 px-2 lg:hidden">
            <div className="flex items-center gap-2">
                <img src={CURRENT_USER.avatar} className="w-8 h-8 rounded-full" />
                <span className="font-bold text-sm">{t('game.you')}</span>
            </div>
            <div className="bg-stone-200 px-3 py-1 rounded text-xs font-mono">29:10</div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-stone-200 rounded hover:bg-stone-300 text-stone-700 text-sm">
                <SkipForward size={16} /> {t('game.pass')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-stone-200 rounded hover:bg-stone-300 text-stone-700 text-sm">
                <Flag size={16} /> {t('game.resign')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-stone-200 rounded hover:bg-stone-300 text-stone-700 text-sm">
                <RotateCcw size={16} /> {t('game.undo')}
            </button>
        </div>
      </div>

      {/* Sidebar (Chat/Tree/Info) */}
      <div className="lg:w-80 bg-white rounded-xl shadow-sm border border-stone-200 flex flex-col h-[400px] lg:h-auto overflow-hidden">
        {/* Players Desktop */}
        <div className="hidden lg:block p-4 border-b border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-black border border-stone-600"></div>
                     <span className="font-bold">AlphaCat</span>
                     <span className="text-xs text-stone-500">3d</span>
                 </div>
                 <span className="font-mono text-sm bg-stone-200 px-2 rounded">23:45</span>
            </div>
            <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-white border border-stone-300"></div>
                     <span className="font-bold">GoMaster</span>
                     <span className="text-xs text-stone-500">1d</span>
                 </div>
                 <span className="font-mono text-sm bg-stone-200 px-2 rounded">29:10</span>
            </div>
            <div className="mt-3 text-center text-xs text-stone-400">
                {t('game.komi')}: 6.5 | {t('game.captures')}: B {engine.captures.black} - W {engine.captures.white}
            </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200">
            <button 
                onClick={() => setActiveTab('moves')}
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'moves' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-stone-500'}`}
            >
                {t('game.moves')}
            </button>
            <button 
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'chat' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-stone-500'}`}
            >
                {t('game.chat')}
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-stone-50/50">
            {activeTab === 'moves' ? (
                <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                    {engine.moves.map((m, i) => (
                        <div key={i} className={`p-1 ${i % 2 === 0 ? 'text-right pr-2' : 'pl-2'}`}>
                           <span className="text-stone-400 mr-2">{m.moveNumber}.</span> 
                           {m.color === StoneColor.BLACK ? 'B' : 'W'} {String.fromCharCode(65+m.x)}{19-m.y}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="text-sm">
                        <span className="font-bold text-stone-700">AlphaCat:</span> <span className="text-stone-600">Have fun!</span>
                    </div>
                </div>
            )}
        </div>

        {/* Chat Input */}
        {activeTab === 'chat' && (
            <div className="p-3 border-t border-stone-200 bg-white">
                <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setInputMsg(''); }}>
                    <input 
                        type="text" 
                        value={inputMsg}
                        onChange={e => setInputMsg(e.target.value)}
                        placeholder={t('game.saySomething')}
                        className="flex-1 border border-stone-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <MessageSquare size={18} />
                    </button>
                </form>
            </div>
        )}
      </div>
    </div>
  );
};
