import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language } from '../lib/translations';

// --- Language Context ---

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path}`);
        return path;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

// --- Router Context & Implementation ---

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({ path: '/', navigate: () => {} });

interface RouteParamsContextType {
  params: Record<string, string>;
}

const RouteParamsContext = createContext<RouteParamsContextType>({ params: {} });

export const HashRouter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const onHashChange = () => {
      let p = window.location.hash.slice(1);
      if (!p) p = '/';
      setPath(p);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Routes: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { path } = useContext(RouterContext);
  let element: ReactNode = null;
  let params: Record<string, string> = {};

  React.Children.forEach(children, (child) => {
    if (element) return;
    if (!React.isValidElement(child)) return;
    
    const props = child.props as { path: string; element: ReactNode };
    const routePath = props.path;
    
    if (routePath === '*') {
      element = props.element;
      return;
    }
    
    const currentPathParts = path.split('/').filter(Boolean);
    const routePathParts = routePath.split('/').filter(Boolean);
    
    if (currentPathParts.length !== routePathParts.length) return;
    
    const currentParams: Record<string, string> = {};
    const match = routePathParts.every((part, i) => {
      if (part.startsWith(':')) {
        currentParams[part.slice(1)] = currentPathParts[i];
        return true;
      }
      return part === currentPathParts[i];
    });
    
    if (match) {
      element = props.element;
      params = currentParams;
    }
  });

  return (
    <RouteParamsContext.Provider value={{ params }}>
      {element}
    </RouteParamsContext.Provider>
  );
};

export const Route: React.FC<{ path: string; element: ReactNode }> = () => null;

export const Navigate: React.FC<{ to: string; replace?: boolean }> = ({ to }) => {
  const { navigate } = useContext(RouterContext);
  useEffect(() => navigate(to), [to, navigate]);
  return null;
};

export const useNavigate = () => {
  const { navigate } = useContext(RouterContext);
  return navigate;
};

export const useLocation = () => {
  const { path } = useContext(RouterContext);
  return { pathname: path };
};

export const useParams = () => {
  const { params } = useContext(RouteParamsContext);
  return params;
};