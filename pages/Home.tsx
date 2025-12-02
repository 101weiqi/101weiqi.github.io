
import React from 'react';
import { Play, Book, Clock, ChevronRight, Presentation, Trophy, Medal } from 'lucide-react';
import { MOCK_GAMES, MOCK_TOURNAMENT_GAMES } from '../services/mockService';
import { GoBoard } from '../components/GoBoard';
import { GoEngine } from '../lib/goEngine';
import { useLanguage, useNavigate } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Mini board for daily puzzle preview
  const puzzleEngine = new GoEngine(19);
  // Add some stones to look like a puzzle
  puzzleEngine.grid[3][3] = 'B' as any;
  puzzleEngine.grid[3][4] = 'B' as any;
  puzzleEngine.grid[4][3] = 'W' as any;

  return (
    <div className="space-y-8">
      
      {/* Hero Section / Daily Puzzle */}
      <section className="bg-white rounded-2xl shadow-sm p-6 border border-stone-200">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/3">
             <div className="relative">
               <GoBoard engine={puzzleEngine} interactive={false} />
               <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer rounded-sm"
                    onClick={() => navigate('/puzzles')}
               >
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-bold hover:bg-blue-700 transition pointer-events-none">
                   {t('home.solveDaily')}
                 </button>
               </div>
             </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-stone-800 mb-2">{t('home.dailyChallenge')}</h2>
            <div className="flex gap-2 mb-4">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{t('home.lifeDeath')}</span>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">1 Dan</span>
            </div>
            <p className="text-stone-600 mb-6">
              {t('home.dailyDesc')}
            </p>
            <div className="flex gap-4 text-sm text-stone-500">
              <span className="flex items-center gap-1"><Clock size={16}/> {t('home.endsIn')} 4h 20m</span>
              <span className="flex items-center gap-1"><Play size={16}/> 1,230 {t('home.solved')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => navigate('/lobby')}
          className="bg-stone-800 text-white p-4 rounded-xl shadow hover:bg-stone-700 transition flex flex-col items-center gap-2"
        >
          <Play size={24} />
          <span className="font-medium">{t('home.play19')}</span>
        </button>
        <button 
           onClick={() => navigate('/demo')}
           className="bg-orange-600 text-white p-4 rounded-xl shadow hover:bg-orange-700 transition flex flex-col items-center gap-2"
        >
          <Presentation size={24} />
          <span className="font-medium">{t('home.demoBoard')}</span>
        </button>
        <button className="bg-white text-stone-800 p-4 rounded-xl shadow border border-stone-200 hover:bg-stone-50 transition flex flex-col items-center gap-2">
          <Book size={24} />
          <span className="font-medium">{t('home.homework')}</span>
        </button>
      </div>

      {/* Major Tournaments */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-stone-700 flex items-center gap-2">
            <Trophy className="text-yellow-600 w-5 h-5" />
            {t('home.tournamentRecords')}
          </h3>
          <button onClick={() => navigate('/records')} className="text-blue-600 text-sm hover:underline">{t('home.viewAll')}</button>
        </div>
        <div className="grid gap-3">
          {MOCK_TOURNAMENT_GAMES.map(game => (
            <div 
              key={game.id} 
              onClick={() => navigate(`/game/${game.id}`)}
              className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 hover:border-yellow-400 transition cursor-pointer flex flex-col md:flex-row items-center gap-4 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
              
              <div className="flex-1 w-full md:w-auto">
                 <div className="flex items-center gap-2 text-yellow-700 font-bold mb-1 text-sm">
                   <Medal size={16} />
                   {game.tournamentName}
                 </div>
                 <div className="text-xs text-stone-400 flex items-center gap-2">
                   <span>{game.date}</span>
                   <span>•</span>
                   <span>{game.moveCount} moves</span>
                 </div>
              </div>

              <div className="flex-1 w-full flex justify-between items-center md:justify-center gap-4">
                 <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{game.blackPlayer?.username}</span>
                    <span className="text-xs bg-black text-white px-1 rounded">B</span>
                 </div>
                 <span className="text-stone-400 font-serif italic text-sm">vs</span>
                 <div className="flex items-center gap-2">
                    <span className="text-xs bg-stone-200 text-stone-800 px-1 rounded border border-stone-300">W</span>
                    <span className="font-bold text-stone-900">{game.whitePlayer?.username}</span>
                 </div>
              </div>

              <div className="text-right min-w-[60px]">
                 <span className="font-bold text-red-500">{game.result}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Games */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-stone-700">{t('home.yourGames')}</h3>
          <button onClick={() => navigate('/records')} className="text-blue-600 text-sm hover:underline">{t('home.viewAll')}</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {MOCK_GAMES.map(game => (
            <div 
              key={game.id} 
              onClick={() => navigate(`/game/${game.id}`)}
              className="block bg-white p-4 rounded-xl shadow-sm border border-stone-200 hover:border-blue-400 transition cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-sm font-semibold text-stone-600 uppercase tracking-wide">
                     {game.type === 'live' ? t('game.gameType.live') : t('game.gameType.correspondence')}
                   </span>
                </div>
                <span className="text-xs text-stone-400">{game.timeControl}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={game.blackPlayer?.avatar} className="w-10 h-10 rounded-full border-2 border-stone-800" alt="Black" />
                  <div>
                    <p className="font-bold text-stone-900">{game.blackPlayer?.username}</p>
                    <p className="text-xs text-stone-500">{game.blackPlayer?.rank}</p>
                  </div>
                </div>
                <span className="font-serif text-stone-400 italic">vs</span>
                <div className="flex items-center gap-3 text-right">
                  <div>
                    <p className="font-bold text-stone-900">{game.whitePlayer?.username}</p>
                    <p className="text-xs text-stone-500">{game.whitePlayer?.rank}</p>
                  </div>
                  <img src={game.whitePlayer?.avatar} className="w-10 h-10 rounded-full border-2 border-stone-200" alt="White" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center">
                <span className="text-xs text-stone-500">{t('home.lastMove')}: 2m {t('home.ago')}</span>
                <span className="flex items-center text-blue-600 text-sm font-medium">
                  {t('home.enterRoom')} <ChevronRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};