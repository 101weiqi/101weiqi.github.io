import React from 'react';
import { MOCK_MESSAGES, CURRENT_USER } from '../services/mockService';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Lobby: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="p-4 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
        <h2 className="font-bold text-stone-700">{t('lobby.globalHall')}</h2>
        <div className="text-xs text-green-600 font-medium flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          42 {t('lobby.online')}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {MOCK_MESSAGES.map((msg) => {
          const isMe = msg.sender === CURRENT_USER.username;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-bold text-stone-700">{msg.sender}</span>
                <span className="text-[10px] text-stone-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-stone-100 text-stone-800 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-stone-50 border-t border-stone-200">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder={t('lobby.placeholder')}
            className="flex-1 border border-stone-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md">
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-stone-400 mt-2 text-center">
          {t('lobby.disclaimer')}
        </p>
      </div>
    </div>
  );
};
