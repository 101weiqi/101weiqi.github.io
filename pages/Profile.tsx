import React, { useState } from 'react';
import { CURRENT_USER, MOCK_GAMES, MOCK_HOMEWORK } from '../services/mockService';
import { Trophy, Activity, BookOpen, Clock, Plus, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { useLanguage, useNavigate } from '../contexts/LanguageContext';
import { CreateHomeworkModal } from '../components/CreateHomeworkModal';
import { HomeworkItem } from '../types';

export const Profile: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(MOCK_HOMEWORK);

  const handleCreateHomework = (data: any) => {
    // Generate description string from config
    let configDesc = '';
    if (data.source === 'bank') {
      const parts = [];
      if (data.bankConfig.lifeDeath > 0) parts.push(`${data.bankConfig.lifeDeath} L&D`);
      if (data.bankConfig.tesuji > 0) parts.push(`${data.bankConfig.tesuji} Tesuji`);
      if (data.bankConfig.middle > 0) parts.push(`${data.bankConfig.middle} Mid`);
      if (data.bankConfig.endgame > 0) parts.push(`${data.bankConfig.endgame} End`);
      if (data.bankConfig.fuseki > 0) parts.push(`${data.bankConfig.fuseki} Fus`);
      configDesc = parts.join(', ');
    } else {
      configDesc = `Random ${data.bookConfig.quantity} from Book`;
    }

    const newItem: HomeworkItem = {
      id: `h${Date.now()}`,
      title: data.source === 'bank' ? 'Custom Training' : 'Book Review',
      source: data.source,
      totalProblems: data.source === 'bank' 
        ? Object.values(data.bankConfig).reduce((a:any,b:any) => a+b, 0) as number
        : data.bookConfig.quantity,
      completedProblems: 0,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      config: configDesc || 'General Practice'
    };

    setHomeworkList([newItem, ...homeworkList]);
  };

  return (
    <div className="space-y-6 pb-20">
      
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
                <span className="text-xs text-blue-400 uppercase font-bold">{t('profile.stats.wins')}</span>
             </div>
             <div className="text-center px-4 py-2 bg-stone-50 rounded-lg">
                <span className="block text-xl font-bold text-stone-700">89</span>
                <span className="text-xs text-stone-400 uppercase font-bold">{t('profile.stats.losses')}</span>
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
            <p className="text-sm text-stone-500">{t('profile.stats.rankPoints')}</p>
            <p className="text-lg font-bold">2103 <span className="text-xs text-green-500 font-normal">+12</span></p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-full">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-stone-500">{t('profile.stats.puzzleRating')}</p>
            <p className="text-lg font-bold">1850 <span className="text-xs text-stone-400 font-normal">1k</span></p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-stone-500">{t('profile.stats.homework')}</p>
            <p className="text-lg font-bold">85% <span className="text-xs text-stone-400 font-normal">Done</span></p>
          </div>
        </div>
      </div>

      {/* Homework Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-stone-700 flex items-center gap-2">
            <BookOpen className="text-blue-600" size={20} />
            {t('profile.homework.title')}
          </h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-stone-800 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-stone-900 transition shadow-sm"
          >
            <Plus size={16} /> {t('profile.homework.create')}
          </button>
        </div>

        <div className="space-y-3">
          {homeworkList.length === 0 && (
            <div className="text-center py-8 bg-stone-50 rounded-xl border border-stone-200 border-dashed text-stone-400">
              No homework assignments yet.
            </div>
          )}
          
          {homeworkList.map(hw => (
            <div 
              key={hw.id}
              onClick={() => navigate('/puzzles')} // In real app, pass homework ID
              className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 hover:border-blue-400 transition cursor-pointer flex flex-col md:flex-row items-center gap-4 group"
            >
              {/* Status Icon */}
              <div className="flex-shrink-0">
                 {hw.status === 'completed' ? (
                   <CheckCircle2 className="text-green-500 w-8 h-8" />
                 ) : (
                   <div className="relative w-8 h-8 flex items-center justify-center">
                     <Circle className="text-stone-300 w-8 h-8" />
                     <span className="absolute text-[10px] font-bold text-stone-600">{Math.round((hw.completedProblems/hw.totalProblems)*100)}%</span>
                   </div>
                 )}
              </div>

              {/* Details */}
              <div className="flex-1 w-full text-center md:text-left">
                 <h4 className="font-bold text-stone-800 group-hover:text-blue-600 transition-colors">{hw.title}</h4>
                 <p className="text-xs text-stone-500 mt-1">{hw.config}</p>
                 <div className="md:hidden mt-2 w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${(hw.completedProblems/hw.totalProblems)*100}%` }}></div>
                 </div>
              </div>

              {/* Meta */}
              <div className="text-right text-xs text-stone-400 hidden md:block">
                 <p>{hw.completedProblems} / {hw.totalProblems}</p>
                 <p>{hw.createdAt}</p>
              </div>

              <ChevronRight className="text-stone-300 group-hover:text-blue-500 hidden md:block" />
            </div>
          ))}
        </div>
      </section>

      {/* Recent Games */}
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

      <CreateHomeworkModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateHomework}
      />
    </div>
  );
};