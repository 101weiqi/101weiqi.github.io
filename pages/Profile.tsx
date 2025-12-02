import React from 'react';
import { CURRENT_USER, MOCK_GAMES } from '../services/mockService';
import { Trophy, Activity, BookOpen, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Profile: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <img 
            src={CURRENT_USER.avatar} 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-stone-100 shadow-inner"
          />
          <span className="absolute bottom-0 right-0 bg-stone-800 text-white text-xs px-2 py-1 rounded-full border-2 border-white">
            {CURRENT_USER.rank}
          </span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-stone-800">{CURRENT_USER.username}</h1>
          <p className="text-stone-500 text-sm mb-4">Member since 2024</p>
          <div className="flex justify-center md:justify-start gap-4">
             <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
                <span className="block text-xl font-bold text-blue-700">142</span>
                <span className="text-xs text-blue-400 uppercase font-bold">Wins</span>
             </div>
             <div className="text-center px-4 py-2 bg-stone-50 rounded-lg">
                <span className="block text-xl font-bold text-stone-700">89</span>
                <span className="text-xs text-stone-400 uppercase font-bold">Losses</span>
             </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-700 rounded-full">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm text-stone-500">Rank Points</p>
            <p className="text-lg font-bold">2103 <span className="text-xs text-green-500 font-normal">+12</span></p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-full">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-stone-500">Puzzle Rating</p>
            <p className="text-lg font-bold">1850 <span className="text-xs text-stone-400 font-normal">1k</span></p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-stone-500">Homework</p>
            <p className="text-lg font-bold">85% <span className="text-xs text-stone-400 font-normal">Complete</span></p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <section>
        <h3 className="text-lg font-bold text-stone-700 mb-4">{t('home.yourGames')}</h3>
        <div className="space-y-3">
           {MOCK_GAMES.map(game => (
             <div key={game.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className={`w-2 h-12 rounded-full ${game.type === 'live' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                   <div>
                      <p className="font-bold text-stone-800">vs {game.whitePlayer?.id === CURRENT_USER.id ? game.blackPlayer?.username : game.whitePlayer?.username}</p>
                      <p className="text-xs text-stone-500">{game.type} • {game.timeControl}</p>
                   </div>
                </div>
                <div className="text-right">
                   <span className="block text-sm font-medium text-stone-600">{game.status}</span>
                   <span className="text-xs text-stone-400 flex items-center gap-1 justify-end">
                     <Clock size={12} /> 2h ago
                   </span>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};