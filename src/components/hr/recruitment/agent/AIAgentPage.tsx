import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Pencil, Users, Megaphone, Globe, Video, CalendarClock,
  Briefcase, FileText, BarChart3, DollarSign, UserCheck, Target,
  Send, Search, ArrowRight, Clock3, Zap, History, Bookmark, Wand2,
  MessageSquare, RefreshCw, TrendingUp, AlertCircle, CheckCircle2,
  Mail, Activity, Timer, Heart,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { useNav, type MainTab } from '../shared/navContext';
import { parseIntent } from '../shared/intents';

// 카테고리별 기능 그리드 (AI 에이전트 전용)
const CATEGORIES = [
  {
    title: '채용 설계',
    items: [
      { icon: Pencil, label: 'AI 채용 설계', desc: '인재상·역량 자동 생성', target: { main: 'before' as MainTab, sub: 'planning' }, aiTag: true },
      { icon: Megaphone, label: '공고문 에디터', desc: 'AI 공고문 + 법규 검토', target: { main: 'before' as MainTab, sub: 'jd' }, aiTag: true },
      { icon: FileText, label: '지원서 빌더', desc: '250 모듈 위지윅', target: { main: 'before' as MainTab, sub: 'application' } },
      { icon: Globe, label: '채용 사이트', desc: 'AI 대화형 생성', target: { main: 'before' as MainTab, sub: 'site' }, aiTag: true },
    ],
  },
  {
    title: '지원자 관리',
    items: [
      { icon: Users, label: '지원자 칸반', desc: '6단계 파이프라인', target: { main: 'during' as MainTab, sub: 'kanban' } },
      { icon: Target, label: '통합 스크리닝', desc: 'AG Grid + AI 스코어', target: { main: 'during' as MainTab, sub: 'screening' } },
      { icon: FileText, label: 'AI 이력서 파서', desc: 'PDF → 구조화 데이터', target: { main: 'before' as MainTab, sub: 'parser' }, aiTag: true },
      { icon: Heart, label: '지원자 피드백', desc: 'NPS · 감정 분석', target: { main: 'during' as MainTab, sub: 'feedback' } },
    ],
  },
  {
    title: '면접 운영',
    items: [
      { icon: Video, label: '영상 면접', desc: 'AI 분석 리포트', target: { main: 'during' as MainTab, sub: 'video' }, aiTag: true },
      { icon: Video, label: '실시간 면접룸', desc: 'AI 실시간 코치', target: { main: 'during' as MainTab, sub: 'live' }, aiTag: true },
      { icon: CalendarClock, label: '일정 조율', desc: '수천명 자동 스케줄링', target: { main: 'during' as MainTab, sub: 'schedule' }, aiTag: true },
      { icon: Users, label: '면접관 풀', desc: '자격 · 캘리브레이션', target: { main: 'during' as MainTab, sub: 'interviewers' } },
    ],
  },
  {
    title: '오퍼 · 입사',
    items: [
      { icon: DollarSign, label: '오퍼 관리', desc: 'AI 처우 산정', target: { main: 'offer' as MainTab, sub: 'offer' }, aiTag: true },
      { icon: FileText, label: '오퍼 레터', desc: '블록 WYSIWYG', target: { main: 'offer' as MainTab, sub: 'letter' } },
      { icon: UserCheck, label: '레퍼런스', desc: 'AI 질문지 + 응답', target: { main: 'offer' as MainTab, sub: 'reference' }, aiTag: true },
      { icon: Briefcase, label: '발령 연동', desc: '발령관리 v3 핸드오프', target: { main: 'offer' as MainTab, sub: 'onboarding' } },
    ],
  },
  {
    title: '분석 · 리포트',
    items: [
      { icon: BarChart3, label: '결과 리포트', desc: '퍼널 · AI 요약', target: { main: 'after' as MainTab, sub: 'overview' }, aiTag: true },
      { icon: Timer, label: 'SLA 관리', desc: '리드타임 모니터링', target: { main: 'after' as MainTab, sub: 'sla' } },
      { icon: DollarSign, label: '예산 · ROI', desc: '채널별 성과', target: { main: 'after' as MainTab, sub: 'budget' } },
      { icon: Globe, label: '마켓 벤치마크', desc: '경쟁사 연봉 분석', target: { main: 'after' as MainTab, sub: 'market' } },
    ],
  },
];

const RECENT_ACTIONS = [
  { time: '방금', text: '백엔드 시니어 공고 초안 생성', target: { main: 'before' as MainTab, sub: 'jd' } },
  { time: '12분 전', text: '이도윤 지원자 종합 리포트 조회', target: { main: 'after' as MainTab, sub: 'candidate' } },
  { time: '1시간 전', text: '역량검사 마감 SMS 발송 (12명)', target: { main: 'during' as MainTab, sub: 'inquiry' } },
  { time: '3시간 전', text: '프론트엔드 면접관 3명 자동 배정', target: { main: 'during' as MainTab, sub: 'interviewers' } },
  { time: '어제', text: '2026 Q1 성과 리포트 생성', target: { main: 'after' as MainTab, sub: 'overview' } },
];

const CONTEXT_SUGGESTIONS = [
  { tone: 'warning', icon: AlertCircle, title: '역량검사 마감 D-1', detail: '12명 미응시 · 독려 발송 권장', actionLabel: '독려 SMS 발송', target: { main: 'before' as MainTab, sub: 'messages' } },
  { tone: 'primary', icon: Sparkles, title: 'AI 매칭 TOP 3 지원자', detail: '최민호·이도윤·임채원 · 즉시 면접 권장', actionLabel: '면접 일정 잡기', target: { main: 'during' as MainTab, sub: 'schedule' } },
  { tone: 'success', icon: CheckCircle2, title: '오퍼 수락 대기 2건', detail: '이도윤·정유진 · D-2 만료', actionLabel: '오퍼 확인', target: { main: 'offer' as MainTab, sub: 'offer' } },
  { tone: 'warning', icon: Timer, title: 'SLA 지연 4건', detail: '1차 면접 일정 지연 · 즉시 조치 필요', actionLabel: 'SLA 확인', target: { main: 'after' as MainTab, sub: 'sla' } },
];

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: string;
  action?: { label: string; target: { main: MainTab; sub?: string } };
}

export default function AIAgentPage() {
  const { navigateTo, showToast } = useNav();
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runQuery = (query: string, autoNavigate = false) => {
    if (!query.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setHistory(h => [...h, { id: `u-${Date.now()}`, role: 'user', text: query, timestamp: time }]);
    setInput('');
    setThinking(true);

    setTimeout(() => {
      const intent = parseIntent(query);
      if (intent) {
        setHistory(h => [...h, {
          id: `a-${Date.now()}`,
          role: 'agent',
          text: autoNavigate
            ? `"${intent.action}" 화면으로 바로 이동합니다.`
            : `"${intent.action}" 화면으로 이동할 수 있어요. 지금 바로 이동하시겠어요?`,
          timestamp: time,
          action: { label: `${intent.action} 열기`, target: intent.target },
        }]);
        if (autoNavigate) {
          navigateTo(intent.target.main, intent.target.sub);
          showToast(`💡 ${intent.action}(으)로 이동`);
        }
      } else {
        setHistory(h => [...h, {
          id: `a-${Date.now()}`,
          role: 'agent',
          text: '정확한 기능을 찾지 못했어요. 아래 제안 카드 또는 예시 질문을 참고해주세요.',
          timestamp: time,
        }]);
      }
      setThinking(false);
    }, 500);
  };

  const handleSubmit = () => runQuery(input);

  return (
    <div className="flex flex-col gap-8 max-w-[1280px] mx-auto">
      {/* Hero */}
      <FadeIn>
        <section className="flex flex-col items-center pt-6 pb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-20 h-20 flex items-center justify-center mb-5"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--primary)]/20"
            />
            <motion.img
              src="/icons/3d/sparkles.svg"
              alt="AI"
              animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14"
            />
          </motion.div>

          <h1 className="text-[28px] font-semibold text-center leading-tight tracking-tight">
            AI 채용 에이전트
          </h1>
          <p className="text-sm text-[var(--foreground-muted)] mt-2 text-center max-w-[520px]">
            자연어로 무엇이든 말씀해주세요. 채용의 모든 화면과 작업을 즉시 열어드립니다.
          </p>

          {/* 입력창 */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 w-full max-w-[720px]"
          >
            <div className="relative">
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder='예: "백엔드 시니어 공고 만들어줘", "오늘 지원자 보여줘", "SLA 지연 확인"'
                disabled={thinking}
                className="w-full h-14 pl-12 pr-36 text-sm rounded-full border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--foreground)] focus:shadow-md transition-all placeholder:text-[var(--foreground-subtle)]"
              />
              {!input && !thinking && (
                <div className="absolute right-[108px] top-1/2 -translate-y-1/2 inline-flex items-center gap-1 pointer-events-none">
                  <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-[var(--border)] bg-[var(--gray-3)] text-[var(--foreground-muted)] font-mono">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-[var(--border)] bg-[var(--gray-3)] text-[var(--foreground-muted)] font-mono">K</kbd>
                </div>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={!input.trim() || thinking}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-medium flex items-center gap-1.5 disabled:opacity-40 transition-opacity"
              >
                {thinking ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-3.5 h-3.5 border-2 border-[var(--background)]/30 border-t-[var(--background)] rounded-full"
                    />
                    분석 중
                  </>
                ) : (
                  <>
                    실행 <Send size={13} />
                  </>
                )}
              </motion.button>
            </div>

            {/* 예시 쿼리 */}
            <div className="mt-4 flex items-center gap-1.5 flex-wrap justify-center">
              <span className="text-[10px] text-[var(--foreground-muted)] mr-1">자주 묻는 질문:</span>
              {[
                '지원자 보여줘',
                '공고 만들어줘',
                '면접 일정',
                'SLA 지연',
                '예산 현황',
                '레퍼런스 체크',
                '탤런트풀',
              ].map(s => (
                <motion.button
                  key={s}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => runQuery(s, true)}
                  className="text-[11px] px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 대화 히스토리 */}
          <AnimatePresence>
            {history.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="w-full max-w-[720px] mt-6 overflow-hidden"
              >
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col gap-3 max-h-[320px] overflow-y-auto">
                  {history.map(m => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] rounded-lg px-3 py-2 ${
                        m.role === 'user' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-[var(--gray-3)]'
                      }`}>
                        <div className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</div>
                        {m.action && (
                          <button
                            onClick={() => {
                              navigateTo(m.action!.target.main, m.action!.target.sub);
                              showToast(`${m.action!.label}(으)로 이동`);
                            }}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-medium bg-[var(--background)] text-[var(--foreground)] px-2.5 py-1 rounded-md hover:bg-[var(--gray-3)] transition-colors"
                          >
                            {m.action.label} <ArrowRight size={11} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {thinking && (
                    <div className="flex justify-start">
                      <div className="bg-[var(--gray-3)] rounded-lg px-3 py-2 flex items-center gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[var(--foreground-muted)]"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setHistory([])}
                  className="mt-2 text-[10px] text-[var(--foreground-muted)] hover:text-[var(--foreground)] inline-flex items-center gap-1"
                >
                  <RefreshCw size={10} /> 대화 초기화
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </FadeIn>

      {/* 컨텍스트 추천 */}
      <FadeIn delay={0.15}>
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-[var(--primary)]" />
              <h3 className="text-sm font-semibold">지금 필요한 작업</h3>
              <Badge variant="outline" className="text-[10px]">AI 추천</Badge>
            </div>
            <span className="text-[10px] text-[var(--foreground-muted)]">현재 채용 상황 기반 실시간 제안</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {CONTEXT_SUGGESTIONS.map((s, i) => {
              const Icon = s.icon;
              const toneClass = s.tone === 'warning' ? 'border-[var(--warning)]/30 bg-[var(--warning)]/5' :
                s.tone === 'success' ? 'border-[var(--success)]/30 bg-[var(--success)]/5' :
                'border-[var(--primary)]/30 bg-[var(--primary)]/5';
              const iconClass = s.tone === 'warning' ? 'text-[var(--warning)]' :
                s.tone === 'success' ? 'text-[var(--success)]' : 'text-[var(--primary)]';
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                  onClick={() => {
                    navigateTo(s.target.main, s.target.sub);
                    showToast(`${s.actionLabel} 진행`);
                  }}
                  className={`text-left p-4 rounded-xl border transition-shadow hover:shadow-md ${toneClass}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-8 h-8 rounded-md bg-[var(--card)] flex items-center justify-center`}>
                      <Icon size={14} className={iconClass} strokeWidth={1.75} />
                    </div>
                    <ArrowRight size={12} className="text-[var(--foreground-subtle)] mt-1" />
                  </div>
                  <div className="text-sm font-semibold leading-snug">{s.title}</div>
                  <div className="text-[11px] text-[var(--foreground-muted)] mt-1 leading-relaxed">{s.detail}</div>
                  <div className="mt-3 text-[11px] font-medium text-[var(--foreground)]">
                    {s.actionLabel} →
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {/* 5개 카테고리 기능 그리드 */}
      <FadeIn delay={0.2}>
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">주요 기능 바로가기</h3>
              <p className="text-[11px] text-[var(--foreground-muted)] mt-0.5">카테고리별 핵심 기능 20개 · 클릭으로 즉시 이동</p>
            </div>
          </div>

          {CATEGORIES.map((cat, ci) => (
            <div key={cat.title}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-semibold text-[var(--foreground-muted)]">{cat.title}</span>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <StaggerItem key={item.label}>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          navigateTo(item.target.main, item.target.sub);
                          showToast(`${item.label}(으)로 이동`);
                        }}
                        className="w-full text-left p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:shadow-sm hover:border-[var(--border-strong)] transition-all group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center group-hover:bg-[var(--primary)]/10 transition-colors">
                            <Icon size={15} className="text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors" strokeWidth={1.75} />
                          </div>
                          {item.aiTag && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-[var(--primary)] font-medium">
                              <Sparkles size={9} /> AI
                            </span>
                          )}
                        </div>
                        <div className="text-[13px] font-semibold">{item.label}</div>
                        <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5 leading-relaxed">{item.desc}</div>
                      </motion.button>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          ))}
        </section>
      </FadeIn>

      {/* 최근 AI 작업 히스토리 */}
      <FadeIn delay={0.25}>
        <section>
          <div className="flex items-center gap-2 mb-3">
            <History size={13} className="text-[var(--foreground-muted)]" />
            <h3 className="text-sm font-semibold">최근 AI 작업</h3>
            <Badge variant="secondary" className="text-[10px]">{RECENT_ACTIONS.length}</Badge>
          </div>
          <Card className="h-full">
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {RECENT_ACTIONS.map((r, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 2 }}
                    onClick={() => {
                      navigateTo(r.target.main, r.target.sub);
                      showToast('이동했어요');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--gray-3)] transition-colors"
                  >
                    <div className="w-7 h-7 rounded bg-[var(--gray-3)] flex items-center justify-center shrink-0">
                      <Clock3 size={12} className="text-[var(--foreground-muted)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{r.text}</div>
                      <div className="text-[10px] text-[var(--foreground-subtle)]">{r.time}</div>
                    </div>
                    <ArrowRight size={11} className="text-[var(--foreground-subtle)] shrink-0" />
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </FadeIn>
    </div>
  );
}
