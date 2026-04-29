import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, X, MessageSquare, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNav } from './navContext';
import { parseIntent } from './intents';

import type { MainTab } from './navContext';

type Msg =
  | { role: 'user' | 'ai'; text: string }
  | { role: 'ai'; widget: 'funnel' | 'candidate' | 'pipeline' }
  | { role: 'ai'; navAction: { label: string; target: { main: MainTab; sub?: string } } };

// 컨텍스트 기반 응답 + 인텐트 기반 네비게이션
function generateResponse(input: string): Msg[] {
  const q = input.toLowerCase();
  if (q.includes('퍼널') || q.includes('funnel')) {
    return [
      { role: 'ai', text: '현재 채용 퍼널입니다. 서류 통과율 34%, 1차 면접 전환 47%로 전주 대비 개선되었습니다.' },
      { role: 'ai', widget: 'funnel' },
    ];
  }
  if (q.includes('지원자') && (q.includes('보여') || q.includes('알려') || q.includes('분석'))) {
    return [
      { role: 'ai', text: '상위 AI 스코어 지원자 5명입니다. 최민호·이도윤이 가장 적합합니다.' },
      { role: 'ai', widget: 'candidate' },
    ];
  }
  if (q.includes('파이프라인') || q.includes('진행')) {
    return [
      { role: 'ai', text: '채용 파이프라인 진행 현황입니다. 2차 면접 단계에 병목이 있습니다.' },
      { role: 'ai', widget: 'pipeline' },
    ];
  }
  if (q.includes('지연') || q.includes('리스크')) {
    return [
      { role: 'ai', text: '역량검사 평가 마감이 1일 지났지만 평가자 완료율 10%입니다. 평가자 독려 안내를 권장합니다.' },
      { role: 'ai', navAction: { label: 'SLA 관리로 이동', target: { main: 'after', sub: 'sla' } } },
    ];
  }
  // 인텐트 파싱 → 네비게이션 제안
  const intent = parseIntent(input);
  if (intent) {
    return [
      { role: 'ai', text: `"${intent.action}"(으)로 이동하시겠어요?` },
      { role: 'ai', navAction: { label: `${intent.action} 열기`, target: intent.target } },
    ];
  }
  return [{ role: 'ai', text: '정확한 요청을 찾지 못했어요. 예: "현재 퍼널 보여줘", "면접 일정", "SLA 지연"' }];
}

const INITIAL_MESSAGES: Msg[] = [
  { role: 'ai', text: '안녕하세요! 채용 데이터 분석을 도와드릴게요.\n\n이런 질문을 해보세요:\n• "현재 퍼널 보여줘"\n• "상위 지원자 분석해줘"\n• "파이프라인 진행 상황은?"' },
];

const QUICK_ACTIONS = [
  '현재 퍼널 보여줘',
  '상위 지원자 분석해줘',
  '파이프라인 진행 상황',
  '리스크 있는 업무 있어?',
];

// Inline 위젯
function FunnelWidget() {
  const data = [
    { stage: '지원', count: 1247, pct: 100 },
    { stage: '서류', count: 423, pct: 34 },
    { stage: '1차', count: 198, pct: 47 },
    { stage: '2차', count: 82, pct: 41 },
    { stage: '오퍼', count: 41, pct: 50 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <BarChart3 size={11} className="text-[var(--primary)]" />
        <span className="text-[10px] font-semibold">채용 퍼널</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {data.map((d, i) => (
          <div key={d.stage}>
            <div className="flex justify-between text-[10px] mb-0.5">
              <span>{d.stage}</span>
              <span className="text-[var(--foreground-muted)]">{d.count} ({d.pct}%)</span>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${d.pct}%` }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="h-full bg-[var(--primary)]"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CandidateWidget() {
  const top = [
    { name: '최민호', score: 94, reason: '분산 시스템 · 8년차' },
    { name: '이도윤', score: 92, reason: 'Kafka · K8s 운영' },
    { name: '임채원', score: 91, reason: 'React · Performance' },
    { name: '송지훈', score: 90, reason: 'SQL · Python' },
    { name: '정유진', score: 89, reason: 'Kotlin · JPA' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]"
    >
      <div className="text-[10px] font-semibold mb-2">상위 AI 스코어 TOP 5</div>
      <div className="flex flex-col gap-1">
        {top.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center justify-between p-1.5 rounded"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold w-3 text-[var(--foreground-muted)]">{i + 1}</span>
              <span className="text-[11px] font-medium">{c.name}</span>
              <span className="text-[10px] text-[var(--foreground-muted)]">· {c.reason}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Sparkles size={9} className="text-[var(--primary)]" />
              <span className="text-[10px] font-semibold">{c.score}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function PipelineWidget() {
  const stages = [
    { name: '지원서', count: 56, trend: '+12', ok: true },
    { name: '역량검사', count: 230, trend: '진행', ok: true },
    { name: '서류', count: 170, trend: '정상', ok: true },
    { name: '1차 면접', count: 85, trend: '지연', ok: false },
    { name: '2차 면접', count: 32, trend: '병목', ok: false },
    { name: '오퍼', count: 12, trend: '정상', ok: true },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]"
    >
      <div className="text-[10px] font-semibold mb-2">파이프라인</div>
      <div className="grid grid-cols-3 gap-1">
        {stages.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`p-2 rounded border ${s.ok ? 'border-[var(--border)]' : 'border-[var(--warning)]/40 bg-[var(--warning)]/5'}`}
          >
            <div className="text-[9px] text-[var(--foreground-muted)]">{s.name}</div>
            <div className="text-sm font-semibold mt-0.5">{s.count}</div>
            <div className={`text-[9px] mt-0.5 ${s.ok ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`}>{s.trend}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AIChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { navigateTo, showToast } = useNav();
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = (text?: string) => {
    const q = text || input;
    if (!q.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, ...generateResponse(q)]);
      setTyping(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="w-[400px] shrink-0 border-l border-[var(--border)] bg-[var(--card)] flex flex-col"
        >
          <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles size={14} className="text-[var(--primary)]" />
              </motion.div>
              <span className="text-sm font-semibold">AI 채팅</span>
              <Badge variant="outline" className="text-[10px]">컨텍스트 분석</Badge>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-md hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">
              <X size={14} />
            </button>
          </header>

          <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((m, i) => {
              if ('widget' in m) {
                return (
                  <div key={i}>
                    {m.widget === 'funnel' && <FunnelWidget />}
                    {m.widget === 'candidate' && <CandidateWidget />}
                    {m.widget === 'pipeline' && <PipelineWidget />}
                  </div>
                );
              }
              if ('navAction' in m) {
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ x: 2 }}
                    onClick={() => {
                      navigateTo(m.navAction.target.main, m.navAction.target.sub);
                      showToast(`${m.navAction.label} 이동`);
                      onClose();
                    }}
                    className="flex items-center justify-between text-left text-xs px-3 py-2 rounded-md border border-[var(--primary)]/30 bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                  >
                    <span>{m.navAction.label}</span>
                    <ArrowRight size={11} />
                  </motion.button>
                );
              }
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-[var(--foreground)] text-[var(--background)]'
                        : 'bg-[var(--gray-3)] text-[var(--foreground)]'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              );
            })}
            {typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
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
              </motion.div>
            )}
            {messages.length <= 1 && (
              <div className="flex flex-col gap-1.5 mt-2">
                {QUICK_ACTIONS.map(a => (
                  <motion.button
                    key={a}
                    whileHover={{ x: 2 }}
                    onClick={() => send(a)}
                    className="text-left text-xs px-3 py-2 rounded-md border border-[var(--border)] hover:bg-[var(--gray-3)] text-[var(--foreground)]"
                  >
                    {a}
                  </motion.button>
                ))}
              </div>
            )}

            {/* AI 응답 이후 네비게이션 액션 */}
            {messages.length > 1 && !typing && (
              <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-[var(--border)]">
                <div className="text-[10px] text-[var(--foreground-muted)] px-1">빠른 이동</div>
                {[
                  { label: '지원자 칸반 열기', main: 'during' as const, sub: 'kanban' },
                  { label: '통합 스크리닝', main: 'during' as const, sub: 'screening' },
                  { label: '공채 배치 콘솔', main: 'during' as const, sub: 'batch' },
                  { label: 'SLA 지연 확인', main: 'after' as const, sub: 'sla' },
                ].map(n => (
                  <motion.button
                    key={n.label}
                    whileHover={{ x: 2 }}
                    onClick={() => {
                      navigateTo(n.main, n.sub);
                      showToast(`${n.label} 화면으로 이동`);
                      onClose();
                    }}
                    className="flex items-center justify-between text-left text-xs px-3 py-2 rounded-md border border-[var(--border)] hover:bg-[var(--gray-3)]"
                  >
                    <span>{n.label}</span>
                    <ArrowRight size={11} className="text-[var(--foreground-subtle)]" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[var(--border)] flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="퍼널, 지원자, 파이프라인 물어보세요"
              className="flex-1 h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
            />
            <Button size="icon-sm" onClick={() => send()}>
              <Send size={13} />
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function AIChatToggle({ onClick }: { onClick: () => void }) {
  return (
    <Button size="sm" variant="outline" onClick={onClick}>
      <MessageSquare size={14} /> AI 채팅
    </Button>
  );
}
