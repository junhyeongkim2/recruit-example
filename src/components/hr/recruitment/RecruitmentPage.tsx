import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Wand2, Users, Award, Briefcase, Plus, HandCoins, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageTransition, FadeIn } from '@/components/ui/page-transition';
import NotificationDropdown from '../../shared/NotificationDropdown';
import RecruitmentDashboard from './dashboard/RecruitmentDashboard';
import BeforeRecruitment from './before/BeforeRecruitment';
import DuringRecruitment from './during/DuringRecruitment';
import OfferAndOnboarding from './offer/OfferAndOnboarding';
import AfterRecruitment from './after/AfterRecruitment';
import AIAgentPage from './agent/AIAgentPage';
import AIChatPanel, { AIChatToggle } from './shared/AIChatPanel';
import CandidateDetailModal from './shared/CandidateDetailModal';
import { CandidateContext, useCandidateDetail } from './shared/useCandidateDetail';
import { NavProvider, useNav, type MainTab } from './shared/navContext';
import { useKeyboardShortcuts } from './shared/useKeyboardShortcuts';
import Breadcrumb from './shared/Breadcrumb';

const TABS: { key: MainTab; label: string; icon: any; stage: string; accent?: boolean }[] = [
  { key: 'agent', label: 'AI 에이전트', icon: Wand2, stage: '★', accent: true },
  { key: 'dashboard', label: '대시보드', icon: LayoutDashboard, stage: '—' },
  { key: 'before', label: '채용 전', icon: Sparkles, stage: '1' },
  { key: 'during', label: '채용 중', icon: Users, stage: '2' },
  { key: 'offer', label: '오퍼 · 입사', icon: HandCoins, stage: '3' },
  { key: 'after', label: '채용 후', icon: Award, stage: '4' },
];

function ToastOverlay() {
  const { toasts } = useNav();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] flex flex-col-reverse gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="px-4 py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] shadow-xl flex items-center gap-2 text-sm max-w-[90vw] pointer-events-auto"
          >
            <CheckCircle2 size={14} className="shrink-0" />
            <span>{t.msg}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function RecruitmentPageInner() {
  const [chatOpen, setChatOpen] = useState(false);
  const { candidate, setCandidate } = useCandidateDetail();
  const { mainTab, setMainTab, scrollRootRef, navigateTo, showToast } = useNav();

  // 글로벌 키보드 단축키
  useKeyboardShortcuts([
    { key: 'k', meta: true, action: () => setMainTab('agent') },
    { key: 'k', ctrl: true, action: () => setMainTab('agent') },
    { key: '1', meta: true, action: () => setMainTab('agent') },
    { key: '2', meta: true, action: () => setMainTab('dashboard') },
    { key: '3', meta: true, action: () => setMainTab('before') },
    { key: '4', meta: true, action: () => setMainTab('during') },
    { key: '5', meta: true, action: () => setMainTab('offer') },
    { key: '6', meta: true, action: () => setMainTab('after') },
  ]);

  return (
    <CandidateContext.Provider value={{ candidate, setCandidate }}>
      <div className="flex-1 flex overflow-hidden bg-[var(--background)] font-primary">
        <div className="flex-1 flex flex-col overflow-hidden">
          <PageTransition className="flex-1 flex flex-col overflow-hidden">
            <FadeIn>
              <header className="px-8 pt-6 pb-4 border-b border-[var(--border)]/40">
                <div className="max-w-[1600px] mx-auto flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                      <Briefcase size={18} className="text-[var(--foreground)]" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-[20px] font-semibold text-[var(--foreground)] tracking-tight">채용관리</h1>
                        <Badge variant="outline" className="text-[10px]">BETA</Badge>
                        <span className="inline-flex items-center gap-1 text-[10px] text-[var(--primary)] font-medium">
                          <Sparkles size={10} /> AI 에이전트
                        </span>
                      </div>
                      <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                        기획 → 공고 → 심사 → 오퍼 → 입사 → 성과까지 전 주기 자동화
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigateTo('before', 'jd');
                        showToast('새 공고 작성 화면으로 이동');
                      }}
                    >
                      <Plus size={14} /> 새 공고
                    </Button>
                    <AIChatToggle onClick={() => setChatOpen(!chatOpen)} />
                    <NotificationDropdown />
                  </div>
                </div>
              </header>
            </FadeIn>

            <div className="px-8 border-b border-[var(--border)] bg-[var(--background)]">
              <div className="max-w-[1600px] mx-auto flex items-center gap-0 overflow-x-auto">
                {TABS.map((t, idx) => {
                  const Icon = t.icon;
                  const active = mainTab === t.key;
                  const shortcutNum = idx + 1;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setMainTab(t.key)}
                      title={`⌘${shortcutNum} 로 이동`}
                      className={`group relative flex items-center gap-2 px-4 py-3 text-sm transition-colors whitespace-nowrap ${
                        active
                          ? 'text-[var(--foreground)] font-semibold'
                          : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      <Icon size={14} strokeWidth={1.75} />
                      <span>{t.label}</span>
                      {t.stage !== '—' && (
                        <span className={`text-[10px] ${
                          active ? 'text-[var(--foreground-muted)]' : 'text-[var(--foreground-subtle)]'
                        }`}>
                          {t.stage}
                        </span>
                      )}
                      <kbd className={`hidden lg:inline-block px-1 py-0.5 text-[9px] rounded border font-mono leading-none transition-opacity ${
                        active
                          ? 'border-[var(--border)] bg-[var(--gray-3)] text-[var(--foreground-muted)] opacity-100'
                          : 'border-transparent opacity-0 group-hover:opacity-70'
                      }`}>
                        ⌘{shortcutNum}
                      </kbd>
                      {active && (
                        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-[var(--foreground)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div ref={scrollRootRef} className="flex-1 overflow-auto">
              <div className="max-w-[1600px] mx-auto px-8 pt-4">
                <Breadcrumb />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainTab}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-[1600px] mx-auto px-8 py-4"
                >
                  {mainTab === 'agent' && <AIAgentPage />}
                  {mainTab === 'dashboard' && <RecruitmentDashboard />}
                  {mainTab === 'before' && <BeforeRecruitment />}
                  {mainTab === 'during' && <DuringRecruitment />}
                  {mainTab === 'offer' && <OfferAndOnboarding />}
                  {mainTab === 'after' && <AfterRecruitment />}
                </motion.div>
              </AnimatePresence>
            </div>

            <footer className="px-8 py-3 border-t border-[var(--border)]">
              <div className="max-w-[1600px] mx-auto flex justify-between items-center text-[11px] text-[var(--foreground-muted)]">
                <span>© Kakao Corp. All rights reserved.</span>
                <span>데이터 영감 · h.place 채용 에이전트</span>
              </div>
            </footer>
          </PageTransition>
        </div>

        <AIChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
        <CandidateDetailModal candidate={candidate} onClose={() => setCandidate(null)} />
        <ToastOverlay />
      </div>
    </CandidateContext.Provider>
  );
}

export default function RecruitmentPage() {
  return (
    <NavProvider>
      <RecruitmentPageInner />
    </NavProvider>
  );
}
