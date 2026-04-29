import { useState } from 'react';
import { motion } from 'motion/react';
import {
  RefreshCw, Users, FileCheck, UserX, TrendingUp, ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

const HEADER_KPI = [
  { label: '전체', value: '1,520', range: '26.03.25 - 26.04.16' },
  { label: '지원서 접수', value: '1,520', range: '26.03.25 - 26.04.01', highlight: true },
  { label: '[서류 전형] 경력직 채용 서류전형', value: '00', range: '26.03.25 - 26.04.05', highlight: true },
];

const SUB_KPI = [
  { label: '전체 지원자', value: '2540', delta: '+30명' },
  { label: '지원자 제출', value: '2540', delta: '+20명' },
  { label: '지원자 미제출', value: '-' },
];

// 채용 전형별 지원자 분포
const STAGE_STATS = [
  { stage: '서류 전형', sub: '경력직 서류전형', pass: 54, reserve: 54, fail: 94, absent: 54 },
  { stage: '역량검사 전형', sub: '역량 검증 실시', pass: 42, reserve: 42, fail: 54, absent: 54 },
  { stage: '면접전형', sub: '실시기초 심사원', pass: 12, reserve: 30, fail: 58, absent: 33 },
  { stage: '면접전형', sub: '경력직 채용입원', pass: 8, reserve: 22, fail: 42, absent: 24 },
];

const UNRATED_APPLICANTS = [
  { dept: '시스템', unrated: 54, total: 260 },
  { dept: '서비스', unrated: 32, total: 180 },
  { dept: '플랫폼', unrated: 12, total: 110 },
  { dept: '사업', unrated: 28, total: 150 },
];

// AI 채팅 메시지 (할일 카드 포함)
interface TaskCard {
  type: string;
  title: string;
  content: string;
  button?: string;
}

const AI_CHAT: {
  type: 'user' | 'ai' | 'task-card';
  text?: string;
  card?: TaskCard;
  actions?: string[];
}[] = [
  { type: 'user', text: '지금 놓치고 있는 업무나 리스크 있는 부분이 있을까요?' },
  { type: 'ai', text: '채용 인사이트 데이터 분석을 통해 리스크를 찾았습니다.\n\n역량전형 평가 마감이 1일 지났지만 평가자 평가가 완료율 10%에 불과합니다.\n평가자 독려 발송하여 평가를 마무리해 보세요.' },
  {
    type: 'task-card',
    card: {
      type: '할 일 카드 생성',
      title: '[역량전형] 평가 독려 안내',
      content: '내용: 역량전형 평가 마감이 1일 남았습니다. 서류의 평가를 완료해 주세요.\n버튼: 독려 안내 발송하기',
    },
    actions: ['확인하러 가기', '즉시 발송하기'],
  },
];

export default function InsightDashboard() {
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">진행중</Badge>
            <h3 className="text-sm font-semibold">2026 마이다스인 대규모 공개 채용</h3>
            <Button variant="outline" size="xs"><RefreshCw size={11} /> 업데이트</Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-4">
          {/* 상단 KPI 3개 */}
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-3 gap-3">
              {HEADER_KPI.map((k, i) => (
                <Card key={i} className={`h-full ${k.highlight ? 'bg-[var(--gray-3)]/50' : ''}`}>
                  <CardContent>
                    <div className="text-[10px] text-[var(--foreground-muted)] line-clamp-1">{k.label}</div>
                    <div className="text-[10px] text-[var(--foreground-subtle)] mt-0.5">{k.range}</div>
                    <div className="text-2xl font-semibold mt-2 tabular-nums">{k.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* 서브 KPI */}
          <FadeIn delay={0.08}>
            <Card className="h-full">
              <CardContent className="flex items-center gap-6">
                {SUB_KPI.map((k, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    <span className="text-[11px] text-[var(--foreground-muted)]">{k.label}</span>
                    <span className="text-base font-semibold tabular-nums">{k.value}</span>
                    {k.value !== '-' && <span className="text-[11px] text-[var(--foreground-muted)]">명</span>}
                    {k.delta && <span className="text-[10px] text-[var(--success)]">{k.delta}</span>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>

          {/* 채용 전형 현황 bar chart */}
          <FadeIn delay={0.1}>
            <Card className="h-full">
              <div className="px-6 flex items-center justify-between">
                <h4 className="text-sm font-semibold">채용 전형 현황</h4>
                <div className="flex items-center gap-2.5 text-[10px]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--success)]" /> 합격</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--primary)]" /> 예비합격</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--warning)]" /> 불합격</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--foreground-muted)]" /> 미응시</span>
                </div>
              </div>
              <CardContent>
                <div className="h-[240px] flex items-end justify-around gap-6 px-4">
                  {STAGE_STATS.map((s, i) => {
                    const total = s.pass + s.reserve + s.fail + s.absent;
                    const max = 260;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex items-end justify-center gap-1" style={{ height: '200px' }}>
                          {[
                            { v: s.pass, c: 'var(--success)', lab: '합격' },
                            { v: s.reserve, c: 'var(--primary)', lab: '예비합격' },
                            { v: s.fail, c: 'var(--warning)', lab: '불합격' },
                            { v: s.absent, c: 'var(--foreground-muted)', lab: '미응시' },
                          ].map((b, j) => (
                            <motion.div
                              key={j}
                              initial={{ height: 0 }}
                              animate={{ height: `${(b.v / max) * 100}%` }}
                              transition={{ delay: i * 0.08 + j * 0.04, duration: 0.5, ease: 'easeOut' }}
                              style={{ backgroundColor: b.c }}
                              className="w-6 rounded-t relative group cursor-pointer"
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-[var(--foreground-muted)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                {b.v}명
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-medium">{s.stage}</div>
                          <div className="text-[10px] text-[var(--foreground-muted)]">{s.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* 미평가 지원자 비율 */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-4 gap-3">
              {UNRATED_APPLICANTS.map((u, i) => (
                <Card key={i} className="h-full">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[var(--foreground-muted)]">미평가 지원자 비율</span>
                      <span className="text-[10px] text-[var(--foreground-subtle)]">{u.dept}</span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-lg font-semibold tabular-nums">{u.unrated}</span>
                      <span className="text-xs text-[var(--foreground-muted)]">/ {u.total}</span>
                    </div>
                    <div className="h-1 mt-2 rounded-full bg-[var(--gray-3)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(u.unrated / u.total) * 100}%` }}
                        transition={{ delay: i * 0.08, duration: 0.6 }}
                        className="h-full bg-[var(--warning)]"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* AI 채팅 (inline) */}
        <FadeIn delay={0.2} className="col-span-12 xl:col-span-3">
          <Card className="h-full py-0 flex flex-col">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-semibold">새 AI 채팅</span>
              <Button variant="ghost" size="icon-xs"><RefreshCw size={11} /></Button>
            </div>
            <div className="flex-1 overflow-auto px-4 py-3 flex flex-col gap-3">
              {AI_CHAT.map((m, i) => {
                if (m.type === 'user') {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[90%] rounded-lg px-3 py-2 text-xs bg-[var(--gray-3)]">
                        {m.text}
                      </div>
                    </motion.div>
                  );
                }
                if (m.type === 'ai') {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs leading-relaxed whitespace-pre-wrap text-[var(--foreground)]"
                    >
                      {m.text}
                    </motion.div>
                  );
                }
                if (m.type === 'task-card' && m.card) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-2"
                    >
                      <div className="text-[10px] text-[var(--foreground-muted)] font-medium">{m.card.type}</div>
                      <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-2.5">
                        <div className="text-[11px] font-semibold">{m.card.title}</div>
                        <div className="text-[10px] text-[var(--foreground-muted)] mt-1 whitespace-pre-line leading-relaxed">
                          {m.card.content}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 mt-1">
                        {m.actions?.map(a => (
                          <Button key={a} variant="outline" size="xs" className="justify-center w-full">
                            {a === '즉시 발송하기' ? '📨 ' : '✓ '}{a}
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  );
                }
                return null;
              })}
            </div>
            <div className="p-2 border-t border-[var(--border)]">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="언제든지 질문해주세요"
                className="w-full h-8 px-2.5 text-[11px] rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
