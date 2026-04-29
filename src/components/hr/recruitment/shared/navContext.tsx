import { createContext, useContext, useState, useRef, ReactNode } from 'react';

export type MainTab = 'agent' | 'dashboard' | 'before' | 'during' | 'offer' | 'after';

type SubViews = {
  before: string;
  during: string;
  offer: string;
  after: string;
};

export interface ToastItem {
  id: string;
  msg: string;
  tone?: 'success' | 'info';
}

interface NavContextValue {
  mainTab: MainTab;
  subViews: SubViews;
  setMainTab: (t: MainTab) => void;
  setSubView: <K extends keyof SubViews>(tab: K, view: SubViews[K]) => void;
  navigateTo: (main: MainTab, sub?: string) => void;
  toasts: ToastItem[];
  showToast: (msg: string, tone?: 'success' | 'info') => void;
  scrollRootRef: React.RefObject<HTMLDivElement>;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [mainTab, setMainTabInternal] = useState<MainTab>('agent');
  const [subViews, setSubViewsState] = useState<SubViews>({
    before: 'overview',
    during: 'open',
    offer: 'offer',
    after: 'overview',
  });
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const scrollRootRef = useRef<HTMLDivElement>(null);

  const scrollTop = () => {
    requestAnimationFrame(() => {
      scrollRootRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const setMainTab = (t: MainTab) => {
    setMainTabInternal(t);
    scrollTop();
  };

  const setSubView = <K extends keyof SubViews>(tab: K, view: SubViews[K]) => {
    setSubViewsState(prev => ({ ...prev, [tab]: view }));
    scrollTop();
  };

  const navigateTo = (main: MainTab, sub?: string) => {
    setMainTabInternal(main);
    if (sub && main !== 'dashboard' && main !== 'agent') {
      setSubViewsState(prev => ({ ...prev, [main]: sub }));
    }
    scrollTop();
  };

  const showToast = (msg: string, tone: 'success' | 'info' = 'success') => {
    const id = `t-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, msg, tone }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  return (
    <NavContext.Provider value={{ mainTab, subViews, setMainTab, setSubView, navigateTo, toasts, showToast, scrollRootRef }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within NavProvider');
  return ctx;
}
