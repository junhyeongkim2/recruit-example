import { motion } from 'motion/react';
import {
  Clock3, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Target,
  Zap, Calendar, Timer,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

// SLA 관리 — 단계별 리드타임 SLA 모니터링
const STAGE_SLA = [
  { stage: '지원 접수 → 서류 통과 회신', target: 5, actual: 4.2, violated: 3, total: 1247, tone: 'success' },
  { stage: '서류 통과 → 1차 면접 일정', target: 7, actual: 8.5, violated: 42, total: 423, tone: 'warning' },
  { stage: '1차 면접 → 2차 면접', target: 10, actual: 9.2, violated: 8, total: 198, tone: 'success' },
  { stage: '2차 면접 → 오퍼 발송', target: 5, actual: 6.8, violated: 18, total: 82, tone: 'warning' },
  { stage: '오퍼 발송 → 수락', target: 7, actual: 5.4, violated: 2, total: 41, tone: 'success' },
  { stage: '수락 → 입사', target: 30, actual: 32.5, violated: 4, total: 36, tone: 'warning' },
];

const OVERDUE_ITEMS = [
  { candidate: '박지우', stage: '1차 면접 일정', waitDays: 12, sla: 7, owner: 'bentley.jun', severity: 'high' },
  { candidate: '강하늘', stage: '서류 통과 회신', waitDays: 8, sla: 5, owner: 'may.kim', severity: 'medium' },
  { candidate: '윤서아', stage: '오퍼 발송', waitDays: 9, sla: 5, owner: 'jay.lee', severity: 'high' },
  { candidate: '조예린', stage: '1차 면접 일정', waitDays: 10, sla: 7, owner: 'sue.park', severity: 'medium' },
];

const TEAM_PERFORMANCE = [
  { team: 'HRIS 개발팀', avgTime: 24, target: 28, compliance: 92 },
  { team: '피플실', avgTime: 21, target: 25, compliance: 96 },
  { team: '디자인실', avgTime: 32, target: 28, compliance: 74 },
  { team: 'QA팀', avgTime: 35, target: 30, compliance: 68 },
];

const IMPACT = [
  { metric: '후보자 이탈률', value: 8.2, trend: 'down', text: 'SLA 준수 시 이탈 -46%' },
  { metric: '오퍼 수락률', value: 87, trend: 'up', text: 'SLA 3일 이내 발송 시 +12%p' },
  { metric: 'NPS 지수', value: 44, trend: 'up', text: 'SLA 준수 지원자 NPS +18점' },
];

export default function SLAManagement() {
  const totalViolated = STAGE_SLA.reduce((s, x) => s + x.violated, 0);
  const totalCases = STAGE_SLA.reduce((s, x) => s + x.total, 0);
  const compliance = Math.round(((totalCases - totalViolated) / totalCases) * 100);

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <Timer size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">SLA · 리드타임 관리</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                단계별 응답 시간 목표 · 지연 모니터링 · 비즈니스 임팩트
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Target size={14} /> SLA 목표 조정</Button>
            <Button size="sm"><Zap size={14} /> 지연 건 일괄 독려</Button>
          </div>
        </div>
      </FadeIn>

      {/* 전체 KPI */}
      <FadeIn delay={0.05}>
        <Card className="py-0 overflow-hidden">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-4 p-6 bg-[var(--foreground)] text-[var(--background)]">
              <div className="text-[10px] opacity-80">전체 SLA 준수율</div>
              <div className="flex items-baseline gap-1 mt-1">
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-[48px] font-semibold leading-none tabular-nums"
                >
                  {compliance}
                </motion.span>
                <span className="text-sm opacity-80">%</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-[11px]">
                <TrendingUp size={10} />
                <span className="opacity-80">전 분기 대비 +6%p</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 grid grid-cols-3 divide-x divide-[var(--border)]">
              <div className="p-6">
                <div className="text-[10px] text-[var(--foreground-muted)]">SLA 위반 (현재)</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-semibold text-[var(--error)] tabular-nums">{totalViolated}</span>
                  <span className="text-xs text-[var(--foreground-muted)]">건</span>
                </div>
                <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">전체 {totalCases.toLocaleString()}건 중</div>
              </div>
              <div className="p-6">
                <div className="text-[10px] text-[var(--foreground-muted)]">평균 리드타임</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-semibold tabular-nums">28</span>
                  <span className="text-xs text-[var(--foreground-muted)]">일</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5 text-[10px] text-[var(--success)]">
                  <TrendingDown size={10} />
                  <span>-4일</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-[10px] text-[var(--foreground-muted)]">즉시 조치 필요</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-semibold text-[var(--warning)] tabular-nums">{OVERDUE_ITEMS.filter(o => o.severity === 'high').length}</span>
                  <span className="text-xs text-[var(--foreground-muted)]">건</span>
                </div>
                <div className="text-[10px] text-[var(--warning)] mt-0.5">Critical</div>
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 단계별 SLA */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-sm font-semibold">단계별 SLA 준수 현황</h4>
            </div>
            <CardContent className="flex flex-col gap-3">
              {STAGE_SLA.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-3 rounded-md border border-[var(--border)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">{s.stage}</span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-[var(--foreground-muted)]">목표</span>
                      <span className="font-semibold tabular-nums">{s.target}일</span>
                      <span className="text-[var(--foreground-muted)]">/</span>
                      <span className="text-[var(--foreground-muted)]">실제</span>
                      <span className={`font-semibold tabular-nums ${s.actual <= s.target ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`}>
                        {s.actual}일
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2 rounded-full bg-[var(--gray-3)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (s.actual / (s.target * 1.5)) * 100)}%` }}
                      transition={{ delay: i * 0.06, duration: 0.6 }}
                      className={`h-full ${s.actual <= s.target ? 'bg-[var(--success)]' : 'bg-[var(--warning)]'}`}
                    />
                    <div
                      className="absolute inset-y-0 w-0.5 bg-[var(--foreground)]"
                      style={{ left: `${(s.target / (s.target * 1.5)) * 100}%` }}
                      title={`목표 ${s.target}일`}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-[var(--foreground-muted)]">
                    <span>준수 {s.total - s.violated}건 · 위반 {s.violated}건</span>
                    <Badge variant={s.tone === 'success' ? 'success' : 'warning'} className="text-[9px]">
                      {((1 - s.violated / s.total) * 100).toFixed(0)}% 준수
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 긴급 지연 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle size={13} className="text-[var(--warning)]" />
                <h4 className="text-sm font-semibold">즉시 조치 필요</h4>
              </div>
              <Badge variant="error" className="text-[10px]">{OVERDUE_ITEMS.length}건</Badge>
            </div>
            <CardContent className="flex flex-col gap-2">
              {OVERDUE_ITEMS.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className={`p-3 rounded-md border ${
                    o.severity === 'high'
                      ? 'border-[var(--error)]/30 bg-[var(--error)]/5'
                      : 'border-[var(--warning)]/30 bg-[var(--warning)]/5'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold">{o.candidate}</span>
                        <Badge variant={o.severity === 'high' ? 'error' : 'warning'} className="text-[9px]">
                          {o.severity === 'high' ? 'High' : 'Med'}
                        </Badge>
                      </div>
                      <div className="text-[11px] text-[var(--foreground-muted)]">{o.stage}</div>
                      <div className="text-[10px] text-[var(--foreground-subtle)] mt-0.5">담당 {o.owner}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-0.5 justify-end">
                        <span className="text-base font-semibold tabular-nums text-[var(--error)]">{o.waitDays}</span>
                        <span className="text-[10px] text-[var(--foreground-muted)]">일 대기</span>
                      </div>
                      <div className="text-[10px] text-[var(--foreground-muted)]">SLA {o.sla}일</div>
                    </div>
                  </div>
                  <Button variant="outline" size="xs" className="w-full mt-2">
                    <Zap size={10} /> 즉시 처리
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 팀별 성과 */}
        <FadeIn delay={0.2} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-sm font-semibold">팀별 SLA 준수</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {TEAM_PERFORMANCE.map((t, i) => (
                <motion.div
                  key={t.team}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.3 }}
                  className="flex items-center gap-3 p-2.5 rounded-md border border-[var(--border)]"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{t.team}</span>
                      <span className="text-[10px] tabular-nums">
                        <span className="font-semibold">{t.avgTime}</span>
                        <span className="text-[var(--foreground-muted)]"> / 목표 {t.target}일</span>
                      </span>
                    </div>
                    <div className="h-1.5 mt-1 rounded-full bg-[var(--gray-3)] overflow-hidden">
                      <motion.div
                        className={`h-full ${t.compliance >= 90 ? 'bg-[var(--success)]' : t.compliance >= 75 ? 'bg-[var(--warning)]' : 'bg-[var(--error)]'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${t.compliance}%` }}
                      />
                    </div>
                  </div>
                  <Badge
                    variant={t.compliance >= 90 ? 'success' : t.compliance >= 75 ? 'warning' : 'error'}
                    className="text-[10px] shrink-0"
                  >
                    {t.compliance}%
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 비즈니스 임팩트 */}
        <FadeIn delay={0.25} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <Target size={13} className="text-[var(--primary)]" />
              <h4 className="text-sm font-semibold">SLA 준수 → 비즈니스 임팩트</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {IMPACT.map((m, i) => (
                <motion.div
                  key={m.metric}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.4 }}
                  className="p-3 rounded-md border border-[var(--border)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{m.metric}</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lg font-semibold tabular-nums">{m.value}</span>
                      <span className="text-[10px] text-[var(--foreground-muted)]">{m.metric.includes('NPS') ? '' : '%'}</span>
                      {m.trend === 'up' ? <TrendingUp size={11} className="text-[var(--success)] ml-1" /> : <TrendingDown size={11} className="text-[var(--success)] ml-1" />}
                    </div>
                  </div>
                  <div className="text-[10px] text-[var(--foreground-muted)] mt-1">{m.text}</div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
