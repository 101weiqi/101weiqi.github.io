
import React, { useState } from 'react';
import { useNavigate } from '../contexts/LanguageContext';
import { MOCK_GAMES, CURRENT_USER } from '../services/mockService';
import { Clock, Eye, Download, PlayCircle, Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { GameType } from '../types';

export const Records: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | GameType>('all');

  const filteredGames = MOCK_GAMES.filter(g => {
    if (filter === 'all') return true;
    return g.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
          <Trophy className="text-yellow-600" />
          {t('nav.records')}
        </h2>
        <div className="flex bg-white p-1 rounded-lg shadow-sm border border-stone-200">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition ${filter === 'all' ? 'bg-stone-800 text-white' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('live')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition ${filter === 'live' ? 'bg-green-600 text-white' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            Live
          </button>
          <button 
            onClick={() => setFilter('correspondence')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition ${filter === 'correspondence' ? 'bg-blue-600 text-white' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            Corr
          </button>
        </div>
      </div>

      {/* Games List */}
      <div className="grid gap-3">
        {filteredGames.map(game => {
          const isBlack = game.blackPlayer?.id === CURRENT_USER.id;
          const opponent = isBlack ? game.whitePlayer : game.blackPlayer;
          const resultStr = (game as any).result || ''; 
          const isWin = (isBlack && resultStr.startsWith('B')) || (!isBlack && resultStr.startsWith('W'));
          const resultColor = isWin ? 'text-red-500' : 'text-stone-500';
          
          return (
            <div 
              key={game.id}
              onClick={() => navigate(`/game/${game.id}`)}
              className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col md:flex-row items-center gap-4"
            >
              {/* Status Indicator */}
              <div className={`w-full md:w-1 h-1 md:h-12 rounded-full ${game.status === 'playing' ? 'bg-green-500' : 'bg-stone-300'}`}></div>

              {/* Game Info */}
              <div className="flex-1 w-full flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="relative">
                       <img src={opponent?.avatar} className="w-12 h-12 rounded-full border border-stone-200" alt="Opponent" />
                       <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white ${!isBlack ? 'bg-white text-black' : 'bg-black'}`}>
                         {!isBlack ? 'B' : 'W'}
                       </div>
                    </div>
                    <div>
                       <h3 className="font-bold text-stone-800">{opponent?.username} <span className="text-xs font-normal text-stone-500">{opponent?.rank}</span></h3>
                       <p className="text-xs text-stone-400 flex items-center gap-1">
                          <Clock size={10} /> 2024-03-20 • {game.moveCount} moves
                       </p>
                    </div>
                 </div>

                 {/* Result / Action */}
                 <div className="text-right">
                    {game.status === 'finished' ? (
                       <span className={`text-lg font-bold ${resultColor}`}>{resultStr}</span>
                    ) : (
                       <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-700 flex items-center gap-1">
                          Play <PlayCircle size={12} />
                       </button>
                    )}
                    <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">{game.type}</p>
                 </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-stone-100 pt-3 md:pt-0 md:pl-4 justify-end md:justify-center">
                 <button className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-lg" title="Review">
                   <Eye size={18} />
                 </button>
                 <button className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-lg" title="Download SGF">
                   <Download size={18} />
                 </button>
              </div>
            </div>
          );
        })}

        {filteredGames.length === 0 && (
           <div className="text-center py-12 text-stone-400">
             <p>No games found in this category.</p>
           </div>
        )}
      </div>
    </div>
  );
};
