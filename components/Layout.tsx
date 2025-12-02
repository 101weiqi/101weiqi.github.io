import React from 'react';
import { User, BookOpen, MessageSquare, PlayCircle, Menu, X, Languages, FileText, Presentation, Library, Home } from 'lucide-react';
import { useLanguage, useLocation, useNavigate } from '../contexts/LanguageContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const navItems = [
    { label: t('nav.home'), path: '/', icon: <Home className="w-5 h-5" /> }, 
    { label: t('nav.puzzles'), path: '/puzzles', icon: <BookOpen className="w-5 h-5" /> },
    { label: t('nav.records'), path: '/records', icon: <FileText className="w-5 h-5" /> },
    { label: t('nav.books'), path: '/books', icon: <Library className="w-5 h-5" /> },
    { label: t('nav.demo'), path: '/demo', icon: <Presentation className="w-5 h-5" /> },
    { label: t('nav.lobby'), path: '/lobby', icon: <MessageSquare className="w-5 h-5" /> },
    { label: t('nav.profile'), path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  // Mobile Bottom Nav Items - Explicitly includes Home
  const mobileNavItems = [
    { label: t('nav.home'), path: '/', icon: <Home size={20} /> },
    { label: t('nav.puzzles'), path: '/puzzles', icon: <BookOpen size={20} /> },
    { label: t('nav.records'), path: '/records', icon: <FileText size={20} /> },
    { label: t('nav.lobby'), path: '/lobby', icon: <MessageSquare size={20} /> },
    { label: t('nav.profile'), path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-stone-800 text-white p-3 flex justify-between items-center z-50 sticky top-0 shadow-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
           <div className="w-8 h-8 bg-stone-700 rounded-full flex items-center justify-center border border-stone-600">
             <div className="w-4 h-4 rounded-full bg-white"></div>
           </div>
           <h1 className="text-lg font-bold tracking-wider">{t('app.title')}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleLanguage} className="text-stone-300 hover:text-white flex items-center gap-1 text-xs border border-stone-600 rounded px-2 py-1">
             <Languages size={14} />
             {language === 'en' ? '中' : 'EN'}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation (Desktop & Mobile Drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-stone-900 text-stone-300 transform transition-transform duration-300 ease-in-out z-50 shadow-2xl
        md:relative md:translate-x-0 md:shadow-xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:block cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex justify-between items-start">
             <div>
                <h1 className="text-2xl font-bold text-white tracking-widest">{t('app.title')}</h1>
                <p className="text-xs text-stone-500 mt-1">{t('app.subtitle')}</p>
             </div>
             <button onClick={(e) => { e.stopPropagation(); toggleLanguage(); }} className="text-stone-500 hover:text-white transition" title="Switch Language">
                <Languages size={20} />
             </button>
          </div>
        </div>

        {/* Mobile Sidebar Header */}
        <div className="md:hidden p-4 bg-stone-950 flex justify-between items-center border-b border-stone-800">
           <span className="font-bold text-white">Menu</span>
           <button onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                location.pathname === item.path 
                ? 'bg-stone-800 text-white font-medium' 
                : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-800 bg-stone-950/50">
          <div className="flex items-center space-x-3">
            <img src="https://picsum.photos/200/200?random=1" className="w-10 h-10 rounded-full border border-stone-600" alt="Avatar" />
            <div>
              <p className="text-sm font-medium text-white">GoMaster</p>
              <p className="text-xs text-stone-500">Rank: 1d</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-56px)] md:h-screen p-4 md:p-6 pb-24 md:pb-6 relative">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-2 py-2 pb-safe z-40 flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
         {mobileNavItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
             <button
               key={item.path}
               onClick={() => navigate(item.path)}
               className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all flex-1 ${
                 isActive ? 'text-blue-600 scale-105' : 'text-stone-400 hover:text-stone-600'
               }`}
             >
               {item.icon}
               <span className="text-[10px] font-medium">{item.label}</span>
             </button>
           );
         })}
      </div>
    </div>
  );
};