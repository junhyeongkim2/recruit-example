import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft, ChevronRight, Workflow, Target, FileText, Megaphone, Video,
  CalendarClock, ClipboardCheck, MessageSquare, BarChart3, CheckCircle2, Sparkles,
  Lock, Play,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2 as Check2 } from 'lucide-react';

// h.place 1_72 — 9단계 완료 흐름도
interface Step {
  no: number;
  label: string;
  icon: any;
  status: 'done' | 'active' | 'locked';
  row: number;
  col: number;
}

const STEPS: Step[] = [
  { no: 1, label: '채용 프로세스 설정', icon: Workflow, status: 'done', row: 0, col: 0 },
  { no: 2, label: '인재 조건 설정', icon: Target, status: 'done', row: 0, col: 1 },
  { no: 3, label: '지원서 설정', icon: FileText, status: 'done', row: 0, col: 2 },
  { no: 4, label: '채용 공고문 설정', icon: Megaphone, status: 'done', row: 0, col: 3 },
  { no: 5, label: '영상 면접 설정', icon: Video, status: 'active', row: 1, col: 3 },
  { no: 6, label: '채용 프로세스 자동 설계', icon: CalendarClock, status: 'locked', row: 1, col: 2 },
  { no: 7, label: '지원서 자동 심사', icon: ClipboardCheck, status: 'locked', row: 1, col: 1 },
  { no: 8, label: '영상 면접 질문 생성', icon: MessageSquare, status: 'locked', row: 1, col: 0 },
  { no: 9, label: '채용 성과 리포트', icon: BarChart3, status: 'locked', row: 2, col: 0 },
];

const STATUS_STYLE = {
  done: 'bg-[var(--success)] text-white border-[var(--success)]',
  active: 'bg-[var(--primary)] text-white border-[var(--primary)] ring-4 ring-[var(--primary)]/20',
  locked: 'bg-[var(--gray-3)] text-[var(--foreground-muted)] border-[var(--border)]',
};

const AI_CHECKLIST = [
  '우리 회사가 인재상에 맞는 인재를 채용하고',
  '직 문제를 같이 풀어갈 인재를 채용하고 싶어요',
  '회사의 성장 속도에 맞는 인재를 채용하고',
  '모든 일에서 기대이상의 능력을 보여줄 인재를 채용하고 싶어요',
];

const AI_RECOMMENDATIONS = [
  '성실함을 바탕으로 목표를 향해 지속적으로 노력하는 인재',
  '조직의 성장에 적극적으로 기여하는 인재',
  '기술과 서비스를 기반으로 한 실무 역량을 갖춘 인재',
  '팀 내 협업을 주도하며 동료들과 긍정적인 관계를 쌓는 인재',
  '데이터 기반 의사결정과 분석 능력을 갖춘 인재',
  '인재상에 맞는 문제해결 역량을 갖춘 인재',
];

export default function ProcessFlowDesigner() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="grid grid-cols-12 gap-4 min-h-[560px]">
      {/* 좌측 학습 사이드바 */}
      {sidebarOpen && (
        <div className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <span className="text-[10px] text-[var(--foreground-muted)]">채용 플래너</span>
              <button onClick={() => setSidebarOpen(false)} className="w-6 h-6 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]">
                <ChevronLeft size={12} className="inline" />
              </button>
            </div>
            <CardContent className="flex flex-col gap-3">
              <h3 className="text-base font-semibold leading-snug">
                영상 면접 설정에서는<br />어떤 것들을 할 수 있나요?
              </h3>

              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <Sparkles size={12} className="text-[var(--primary)] mt-0.5 shrink-0" />
                  <span className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                    인재 조건에 최적화된 영상 면접 질문을 AI가 추천드려요.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles size={12} className="text-[var(--primary)] mt-0.5 shrink-0" />
                  <span className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                    응시자 답변대로 지원자의 면접 답변이 자동으로 분석되요.
                  </span>
                </div>
              </div>

              <div className="relative aspect-[3/4] rounded-lg bg-[var(--gray-3)] overflow-hidden mt-2">
                <div className="absolute inset-2 rounded-md bg-[var(--card)] p-2 flex flex-col">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--error)]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--warning)]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                  </div>
                  <div className="mt-2 flex-1 rounded bg-[var(--gray-3)] flex items-center justify-center">
                    <Video size={20} className="text-[var(--foreground-muted)]" />
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <div className="flex-1 h-6 rounded bg-[var(--gray-3)]" />
                    <div className="flex-1 h-6 rounded bg-[var(--primary)]/20" />
                  </div>
                </div>
                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[9px] text-[var(--foreground-muted)]">
                  <ChevronLeft size={10} />
                  <span>5 / 9</span>
                  <ChevronRight size={10} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 메인 9단계 플로우 */}
      <div className={
        sidebarOpen && chatOpen ? 'col-span-12 lg:col-span-6' :
        sidebarOpen || chatOpen ? 'col-span-12 lg:col-span-9' :
        'col-span-12'
      }>
        <Card className="h-full">
          <CardContent className="p-6 h-full relative">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="absolute top-3 left-3 w-6 h-6 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]"
              >
                <ChevronRight size={12} className="inline" />
              </button>
            )}

            {/* SVG 커넥터 + 노드 */}
            <div className="relative h-full min-h-[500px]">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Row 1 (top) 좌→우 */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  d="M 10,15 L 90,15"
                  stroke="var(--success)"
                  strokeWidth="0.4"
                  fill="none"
                  strokeDasharray="1 0.5"
                />
                {/* Row 1 → Row 2 커넥터 (우측 끝에서 아래로) */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  d="M 90,15 Q 95,30 90,45"
                  stroke="var(--primary)"
                  strokeWidth="0.4"
                  fill="none"
                />
                {/* Row 2 우→좌 */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  d="M 90,45 L 10,45"
                  stroke="var(--border)"
                  strokeWidth="0.4"
                  fill="none"
                  strokeDasharray="1 0.8"
                />
                {/* Row 2 → Row 3 */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  d="M 10,45 Q 5,65 10,85"
                  stroke="var(--border)"
                  strokeWidth="0.4"
                  fill="none"
                />
              </svg>

              {/* Row 1: 1-4 */}
              <div className="absolute top-[5%] left-0 right-0 grid grid-cols-4 gap-4 px-4">
                {STEPS.slice(0, 4).map((s, i) => (
                  <StepNode key={s.no} step={s} delay={i * 0.1} />
                ))}
              </div>

              {/* Row 2: 5-8 (right-to-left) */}
              <div className="absolute top-[38%] left-0 right-0 grid grid-cols-4 gap-4 px-4">
                {/* 배치: col 0=8, col 1=7, col 2=6, col 3=5 */}
                <StepNode step={STEPS[7]} delay={0.5} />
                <StepNode step={STEPS[6]} delay={0.6} />
                <StepNode step={STEPS[5]} delay={0.7} />
                <StepNode step={STEPS[4]} delay={0.4} />
              </div>

              {/* Row 3: 9 */}
              <div className="absolute top-[78%] left-0 right-0 grid grid-cols-4 gap-4 px-4">
                <StepNode step={STEPS[8]} delay={0.9} />
              </div>
            </div>

            {/* 안내 말풍선 overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="absolute top-[45%] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            >
              <div className="relative bg-[var(--foreground)] text-[var(--background)] px-3 py-2 rounded-lg text-[11px] font-medium shadow-lg max-w-[240px] text-center">
                인재 조건을 기반으로 공고문이 완성됐어요!<br />
                <span className="opacity-80">완성된 공고문을 검토해주세요.</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--foreground)] rotate-45" />
              </div>
            </motion.div>

            <div className="absolute bottom-3 right-3">
              <Button size="sm">설정 완료</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 우측 AI 채팅 */}
      {chatOpen && (
        <div className="col-span-12 lg:col-span-3">
          <Card className="h-full py-0 flex flex-col">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MessageSquare size={12} className="text-[var(--primary)]" />
                <span className="text-xs font-semibold">채용 챗 비서</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-6 h-6 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)] text-xs"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto px-4 py-3 flex flex-col gap-3">
              <div className="text-[11px] text-[var(--foreground-muted)]">채용할 인재 조건을 알려주세요.</div>

              {/* 체크리스트 응답 */}
              <div className="flex flex-col gap-1.5">
                {AI_CHECKLIST.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2 p-2 rounded-md bg-[var(--success)]/8 border border-[var(--success)]/20"
                  >
                    <Check2 size={11} className="text-[var(--success)] mt-0.5 shrink-0" />
                    <span className="text-[10px] leading-relaxed">{t}</span>
                  </motion.div>
                ))}
              </div>

              {/* 경고 배너 */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-2 rounded-md border border-[var(--warning)]/30 bg-[var(--warning)]/5"
              >
                <span className="text-[var(--warning)] text-[10px] mt-0.5">⚠</span>
                <span className="text-[10px] leading-relaxed">
                  우리 회사에 필요한 추가 특성 중 이 특허화된 인재를 있어요. (선택해주세요)
                </span>
              </motion.div>

              {/* 추천 리스트 */}
              <div className="flex flex-col gap-1">
                {AI_RECOMMENDATIONS.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-start gap-1.5 py-1"
                  >
                    <span className="text-[var(--foreground-subtle)] text-[9px] mt-0.5">{i + 1}.</span>
                    <span className="text-[10px] text-[var(--foreground-muted)] leading-relaxed">{r}</span>
                  </motion.div>
                ))}
              </div>

              {/* AI 마무리 카드 */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="p-2.5 rounded-md bg-[var(--gray-3)]"
              >
                <div className="text-[10px] font-semibold mb-1">필요한 인재 조건을 더 추가해 드릴까요?</div>
                <div className="text-[10px] text-[var(--foreground-muted)] leading-relaxed">
                  추가로 원하시는 특성이나 직무 조건을 채팅에 입력해 주시면, 인재 조건에 반영해 드려요.
                </div>
              </motion.div>
            </div>
            <div className="p-2 border-t border-[var(--border)]">
              <input
                placeholder="언제든지 질문해주세요"
                className="w-full h-8 px-2.5 text-[11px] rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function StepNode({ step, delay }: { step: Step; delay: number }) {
  const Icon = step.icon;
  const StatusIcon = step.status === 'done' ? CheckCircle2 : step.status === 'active' ? Play : Lock;
  const isActive = step.status === 'active';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col items-center gap-2 relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center ${STATUS_STYLE[step.status]}`}
      >
        <Icon size={18} strokeWidth={2} />
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-[var(--primary)]/30"
          />
        )}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
          <StatusIcon size={10} className={
            step.status === 'done' ? 'text-[var(--success)]' :
            step.status === 'active' ? 'text-[var(--primary)]' :
            'text-[var(--foreground-subtle)]'
          } />
        </div>
      </motion.div>
      <div className="text-center">
        <div className="flex items-center gap-1 justify-center">
          <span className="text-[10px] text-[var(--foreground-muted)]">{step.no}.</span>
          <span className="text-xs font-medium">{step.label}</span>
          {step.status === 'done' && <Badge variant="success" className="text-[9px] py-0">완료</Badge>}
          {step.status === 'active' && <Badge variant="warning" className="text-[9px] py-0">진행중</Badge>}
        </div>
        {!isActive && (
          <button className="text-[10px] text-[var(--foreground-muted)] hover:text-[var(--foreground)] mt-0.5">
            설정하기
          </button>
        )}
      </div>
    </motion.div>
  );
}
