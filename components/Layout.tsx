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

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-stone-800 text-white p-4 flex justify-between items-center z-50 sticky top-0 shadow-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
           <Home size={20} className="text-stone-300" />
           <h1 className="text-xl font-bold tracking-wider">{t('app.title')}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="text-stone-300 hover:text-white flex items-center gap-1 text-xs border border-stone-600 rounded px-2 py-1">
             <Languages size={14} />
             {language === 'en' ? '中文' : 'EN'}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 w-64 bg-stone-900 text-stone-300 transform transition-transform duration-200 ease-in-out z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        flex flex-col shadow-xl
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

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                location.pathname === item.path 
                ? 'bg-stone-700 text-white' 
                : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <div className="flex items-center space-x-3">
            <img src="https://picsum.photos/200/200?random=1" className="w-10 h-10 rounded-full border border-stone-600" alt="Avatar" />
            <div>
              <p className="text-sm font-medium text-white">GoMaster</p>
              <p className="text-xs text-stone-500">Rank: 1d</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen p-4 md:p-6 pb-20 md:pb-6">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};