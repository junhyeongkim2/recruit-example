import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap, Plus, Settings, Play, Pause, Copy, Trash2, ChevronDown, ChevronRight,
  Mail, MessageSquare, Bell, Users, Clock3, Sparkles, ArrowRight, CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { Icon3D } from '../shared/Icon3D';

// 채용 자동화 규칙 빌더
interface Rule {
  id: string;
  name: string;
  enabled: boolean;
  trigger: { type: string; label: string };
  conditions: { field: string; op: string; value: string }[];
  actions: { type: string; label: string; icon: any }[];
  executions: number;
  lastRun: string;
  successRate: number;
}

const RULES: Rule[] = [
  {
    id: 'r1', name: '서류 통과 자동 안내',
    enabled: true,
    trigger: { type: 'stage_change', label: '단계 변경' },
    conditions: [
      { field: '단계', op: '=', value: '서류 통과' },
    ],
    actions: [
      { type: 'email', label: '합격 안내 이메일', icon: Mail },
      { type: 'sms', label: '합격 SMS 발송', icon: MessageSquare },
    ],
    executions: 423,
    lastRun: '3분 전',
    successRate: 99.3,
  },
  {
    id: 'r2', name: '역량검사 마감 D-1 독려',
    enabled: true,
    trigger: { type: 'schedule', label: '일정 기반' },
    conditions: [
      { field: '역량검사 마감', op: '=', value: 'D-1' },
      { field: '응시 상태', op: '=', value: '미응시' },
    ],
    actions: [
      { type: 'sms', label: '독려 SMS', icon: MessageSquare },
      { type: 'push', label: '푸시 알림', icon: Bell },
    ],
    executions: 89,
    lastRun: '2시간 전',
    successRate: 96.5,
  },
  {
    id: 'r3', name: 'AI 스코어 90+ 자동 추천',
    enabled: true,
    trigger: { type: 'ai_event', label: 'AI 이벤트' },
    conditions: [
      { field: 'AI 스코어', op: '≥', value: '90' },
      { field: '단계', op: '=', value: '서류 검토' },
    ],
    actions: [
      { type: 'notify', label: '팀 리드 알림', icon: Users },
      { type: 'flag', label: '우선 검토 플래그', icon: Sparkles },
    ],
    executions: 34,
    lastRun: '12분 전',
    successRate: 100,
  },
  {
    id: 'r4', name: '면접 일정 미확정 경고',
    enabled: false,
    trigger: { type: 'schedule', label: '일정 기반' },
    conditions: [
      { field: '서류 통과 후 경과', op: '≥', value: '5일' },
      { field: '면접 일정', op: '=', value: '미확정' },
    ],
    actions: [
      { type: 'notify', label: 'HR BP 알림', icon: Users },
      { type: 'task', label: '태스크 생성', icon: CheckCircle2 },
    ],
    executions: 12,
    lastRun: '어제',
    successRate: 91.7,
  },
  {
    id: 'r5', name: '오퍼 수락 → 발령 자동 생성',
    enabled: true,
    trigger: { type: 'stage_change', label: '단계 변경' },
    conditions: [
      { field: '단계', op: '=', value: '오퍼 수락' },
    ],
    actions: [
      { type: 'handoff', label: '발령관리 v3 핸드오프', icon: ArrowRight },
      { type: 'email', label: '입사 안내 발송', icon: Mail },
    ],
    executions: 36,
    lastRun: '1일 전',
    successRate: 100,
  },
];

const TRIGGER_TYPES = [
  { id: 'stage_change', label: '단계 변경', icon: ArrowRight },
  { id: 'schedule', label: '일정 기반', icon: Calendar },
  { id: 'ai_event', label: 'AI 이벤트', icon: Sparkles },
  { id: 'form_submit', label: '폼 제출', icon: CheckCircle2 },
  { id: 'manual', label: '수동 실행', icon: Play },
];

export default function AutomationRules() {
  const [selected, setSelected] = useState<Rule>(RULES[0]);
  const [expanded, setExpanded] = useState<string | null>(RULES[0].id);

  const totalExecutions = RULES.reduce((s, r) => s + r.executions, 0);
  const activeCount = RULES.filter(r => r.enabled).length;

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Icon3D name="rocket" size={40} />
            <div>
              <h3 className="text-sm font-semibold">자동화 규칙 빌더</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                If-Then 규칙 · 트리거 5종 · 채용 프로세스 반복 작업 자동화
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Sparkles size={14} /> AI 규칙 추천</Button>
            <Button size="sm"><Plus size={14} /> 새 규칙</Button>
          </div>
        </div>
      </FadeIn>

      {/* KPI */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-4 gap-3">
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">활성 규칙</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold text-[var(--success)] tabular-nums">{activeCount}</span>
                <span className="text-xs text-[var(--foreground-muted)]">/ {RULES.length}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">이번 달 실행</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold tabular-nums">{totalExecutions.toLocaleString()}</span>
                <span className="text-xs text-[var(--foreground-muted)]">회</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">평균 성공률</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold tabular-nums">97.5</span>
                <span className="text-xs text-[var(--foreground-muted)]">%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">절감 공수</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold tabular-nums">124</span>
                <span className="text-xs text-[var(--foreground-muted)]">시간/월</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 규칙 리스트 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
          <Card className="h-full py-0">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <h4 className="text-sm font-semibold">규칙 {RULES.length}개</h4>
              <div className="flex items-center gap-1 text-[10px] text-[var(--foreground-muted)]">
                <span>정렬:</span>
                <span className="font-medium">최근 실행</span>
                <ChevronDown size={10} />
              </div>
            </div>
            <CardContent className="p-2">
              <StaggerContainer className="flex flex-col gap-1.5">
                {RULES.map(r => (
                  <StaggerItem key={r.id}>
                    <motion.div
                      whileHover={{ x: 2 }}
                      className={`rounded-md border transition-colors ${
                        selected.id === r.id ? 'border-[var(--foreground)] bg-[var(--gray-3)]' : 'border-[var(--border)]'
                      }`}
                    >
                      <button
                        onClick={() => {
                          setSelected(r);
                          setExpanded(expanded === r.id ? null : r.id);
                        }}
                        className="w-full p-3 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${
                              r.enabled ? 'bg-[var(--success)]' : 'bg-[var(--gray-4)]'
                            }`}
                            style={{ height: '18px' }}
                          >
                            <motion.span
                              layout
                              className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white"
                              animate={{ left: r.enabled ? '16px' : '2px' }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold">{r.name}</span>
                              <Badge variant="outline" className="text-[9px]">{r.trigger.label}</Badge>
                            </div>
                            <div className="flex items-center gap-3 mt-0.5 text-[10px] text-[var(--foreground-muted)]">
                              <span>실행 {r.executions}회</span>
                              <span>· 성공률 {r.successRate}%</span>
                              <span>· {r.lastRun}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {r.actions.map((a, i) => {
                              const Icon = a.icon;
                              return (
                                <div key={i} className="w-6 h-6 rounded bg-[var(--gray-3)] flex items-center justify-center" title={a.label}>
                                  <Icon size={11} />
                                </div>
                              );
                            })}
                            {expanded === r.id
                              ? <ChevronDown size={12} className="text-[var(--foreground-muted)]" />
                              : <ChevronRight size={12} className="text-[var(--foreground-muted)]" />}
                          </div>
                        </div>
                      </button>
                      <AnimatePresence>
                        {expanded === r.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-[var(--border)]"
                          >
                            <div className="p-3 bg-[var(--gray-3)]/30 flex flex-col gap-2.5">
                              <div>
                                <div className="text-[10px] font-semibold text-[var(--foreground-muted)] mb-1">IF 조건</div>
                                <div className="flex flex-col gap-1">
                                  {r.conditions.map((c, i) => (
                                    <div key={i} className="flex items-center gap-1 text-[11px] font-mono">
                                      <Badge variant="secondary" className="text-[9px]">{c.field}</Badge>
                                      <span className="text-[var(--foreground-muted)]">{c.op}</span>
                                      <Badge variant="outline" className="text-[9px]">{c.value}</Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] font-semibold text-[var(--foreground-muted)] mb-1">THEN 액션</div>
                                <div className="flex flex-col gap-1">
                                  {r.actions.map((a, i) => {
                                    const Icon = a.icon;
                                    return (
                                      <div key={i} className="flex items-center gap-2 text-[11px]">
                                        <div className="w-5 h-5 rounded bg-[var(--primary)]/10 flex items-center justify-center">
                                          <Icon size={10} className="text-[var(--primary)]" />
                                        </div>
                                        <span>{a.label}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 pt-2 border-t border-[var(--border)]">
                                <Button variant="outline" size="xs"><Settings size={10} /> 편집</Button>
                                <Button variant="outline" size="xs"><Copy size={10} /> 복제</Button>
                                <Button variant="outline" size="xs"><Play size={10} /> 테스트</Button>
                                <Button variant="ghost" size="xs" className="ml-auto">
                                  <Trash2 size={10} className="text-[var(--error)]" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 빌더 패널 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <Settings size={13} />
              <h4 className="text-sm font-semibold">규칙 빌더</h4>
              <Badge variant="outline" className="text-[10px]">{selected.name}</Badge>
            </div>
            <CardContent className="flex flex-col gap-3">
              {/* IF */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Badge variant="secondary" className="text-[10px]">IF</Badge>
                  <span className="text-[10px] text-[var(--foreground-muted)]">트리거 선택</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {TRIGGER_TYPES.map(t => {
                    const Icon = t.icon;
                    const active = t.id === selected.trigger.type;
                    return (
                      <motion.button
                        key={t.id}
                        whileHover={{ y: -1 }}
                        className={`flex items-center gap-1.5 p-2 rounded-md border text-[11px] transition-colors ${
                          active
                            ? 'border-[var(--foreground)] bg-[var(--gray-3)] font-medium'
                            : 'border-[var(--border)] hover:bg-[var(--gray-3)]'
                        }`}
                      >
                        <Icon size={11} />
                        <span>{t.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* AND/OR 조건 */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Badge variant="secondary" className="text-[10px]">AND</Badge>
                  <span className="text-[10px] text-[var(--foreground-muted)]">조건</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {selected.conditions.map((c, i) => (
                    <div key={i} className="grid grid-cols-[1fr_60px_1fr_auto] gap-1 items-center">
                      <div className="h-8 px-2 rounded-md border border-[var(--border)] flex items-center justify-between text-[11px]">
                        <span>{c.field}</span>
                        <ChevronDown size={10} />
                      </div>
                      <div className="h-8 px-2 rounded-md border border-[var(--border)] flex items-center justify-center text-[11px] font-mono">
                        {c.op}
                      </div>
                      <div className="h-8 px-2 rounded-md border border-[var(--border)] flex items-center justify-between text-[11px]">
                        <span>{c.value}</span>
                        <ChevronDown size={10} />
                      </div>
                      <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]">
                        <Trash2 size={10} className="inline" />
                      </button>
                    </div>
                  ))}
                  <Button variant="outline" size="xs" className="w-full">
                    <Plus size={10} /> 조건 추가
                  </Button>
                </div>
              </div>

              {/* THEN */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Badge variant="success" className="text-[10px]">THEN</Badge>
                  <span className="text-[10px] text-[var(--foreground-muted)]">액션</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {selected.actions.map((a, i) => {
                    const Icon = a.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-md border border-[var(--border)] bg-[var(--primary)]/5">
                        <div className="w-7 h-7 rounded bg-[var(--primary)]/15 flex items-center justify-center shrink-0">
                          <Icon size={12} className="text-[var(--primary)]" />
                        </div>
                        <div className="flex-1 text-[11px] font-medium">{a.label}</div>
                        <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]">
                          <Settings size={10} className="inline" />
                        </button>
                      </div>
                    );
                  })}
                  <Button variant="outline" size="xs" className="w-full">
                    <Plus size={10} /> 액션 추가
                  </Button>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-3 border-t border-[var(--border)] flex justify-end gap-2">
              <Button variant="outline" size="sm">테스트 실행</Button>
              <Button size="sm">저장 적용</Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
