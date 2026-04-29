import { motion } from 'motion/react';
import {
  Users, Megaphone, CheckCircle2, Clock3, TrendingUp, AlertCircle,
  Activity, Zap, Send, Download,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

// 대규모 공채 운영 콘솔 (수천명 배치 처리)
const LIVE_STATS = [
  { label: '총 지원자', value: '12,847', delta: '+234', live: true },
  { label: '현재 접속 중', value: '1,248', unit: '명', live: true },
  { label: '오늘 제출', value: '892', delta: '+23/분', live: true },
  { label: '배치 처리 대기', value: '3,420', unit: '건', tone: 'warning' },
];

const BATCH_JOBS = [
  { id: 'B-1', name: 'AI 스크리닝 일괄 처리', count: 3420, progress: 68, status: 'running', eta: '12분', throughput: '287/분' },
  { id: 'B-2', name: '합격 안내 SMS 발송', count: 1240, progress: 100, status: 'done', eta: '완료', throughput: '완료' },
  { id: 'B-3', name: '역량검사 코드 발송', count: 8540, progress: 45, status: 'running', eta: '34분', throughput: '142/분' },
  { id: 'B-4', name: '지원서 중복 검증', count: 12847, progress: 100, status: 'done', eta: '완료', throughput: '완료' },
  { id: 'B-5', name: '서류 심사 자동 배치', count: 4280, progress: 0, status: 'queued', eta: '대기', throughput: '예정' },
];

const STAGE_FUNNEL = [
  { name: '지원 접수', count: 12847, target: 15000 },
  { name: '중복 검증', count: 12642, target: 12847 },
  { name: 'AI 스크리닝', count: 8420, target: 12642 },
  { name: '서류 통과', count: 4280, target: 8420 },
  { name: '역량검사 완료', count: 3245, target: 4280 },
  { name: '면접 대상', count: 820, target: 3245 },
];

const RATE_LIMIT = [
  { service: '이메일 발송', current: 1850, limit: 3000, pct: 62 },
  { service: 'SMS 발송', current: 782, limit: 1000, pct: 78 },
  { service: 'AI 스크리닝 API', current: 287, limit: 500, pct: 57 },
  { service: '영상 인코딩', current: 42, limit: 100, pct: 42 },
];

const INCIDENTS = [
  { time: '14:28', level: 'warning', text: 'SMS 발송량 한계 80% 도달' },
  { time: '13:45', level: 'info', text: 'AI 스크리닝 배치 재시작 완료' },
  { time: '13:12', level: 'error', text: '지원서 접수 서버 30초 지연 (해결됨)' },
];

const STATUS_STYLE = {
  running: { tone: 'primary' as const, label: '진행 중' },
  done: { tone: 'success' as const, label: '완료' },
  queued: { tone: 'secondary' as const, label: '대기' },
  error: { tone: 'error' as const, label: '오류' },
};

export default function BatchRecruitConsole() {
  const maxFunnel = Math.max(...STAGE_FUNNEL.map(s => s.count));

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <Activity size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">대규모 공채 운영 콘솔</h3>
                <div className="flex items-center gap-1">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[var(--error)]"
                  />
                  <span className="text-[10px] text-[var(--error)] font-medium">LIVE</span>
                </div>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                2026 상반기 신입 공채 · 수천명 지원자 배치 처리 실시간 모니터링
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download size={14} /> 로그 다운로드</Button>
            <Button size="sm"><Zap size={14} /> 긴급 배치 실행</Button>
          </div>
        </div>
      </FadeIn>

      {/* 실시간 KPI */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-4 gap-3">
          {LIVE_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="h-full">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--foreground-muted)]">{s.label}</span>
                    {s.live && (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--success)]"
                      />
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <motion.span
                      key={s.value}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-semibold tabular-nums"
                    >
                      {s.value}
                    </motion.span>
                    {s.unit && <span className="text-xs text-[var(--foreground-muted)]">{s.unit}</span>}
                  </div>
                  {s.delta && (
                    <span className={`text-[10px] ${s.tone === 'warning' ? 'text-[var(--warning)]' : 'text-[var(--success)]'} mt-0.5 inline-block`}>
                      {s.delta}
                    </span>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 배치 작업 모니터 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">배치 작업 현황</h4>
              <Badge variant="secondary" className="text-[10px]">{BATCH_JOBS.length}건</Badge>
            </div>
            <CardContent className="flex flex-col gap-2">
              <StaggerContainer className="flex flex-col gap-2">
                {BATCH_JOBS.map(j => {
                  const s = STATUS_STYLE[j.status as keyof typeof STATUS_STYLE];
                  return (
                    <StaggerItem key={j.id}>
                      <motion.div
                        whileHover={{ x: 2 }}
                        className="p-3 rounded-md border border-[var(--border)]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold">{j.name}</span>
                            <Badge variant={s.tone} className="text-[9px]">{s.label}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-[var(--foreground-muted)]">
                            <span>{j.count.toLocaleString()}건</span>
                            <span>·</span>
                            <span>{j.throughput}</span>
                            <span>·</span>
                            <span>{j.eta}</span>
                          </div>
                        </div>
                        <div className="relative h-2 rounded-full bg-[var(--gray-3)] overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${j.status === 'done' ? 'bg-[var(--success)]' : j.status === 'queued' ? 'bg-[var(--foreground-muted)]/30' : 'bg-[var(--primary)]'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${j.progress}%` }}
                            transition={{ duration: 0.6 }}
                          />
                          {j.status === 'running' && (
                            <motion.div
                              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{ x: ['-80px', '100%'] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                              style={{ left: 0, width: `${j.progress}%` }}
                            />
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[10px] text-[var(--foreground-muted)]">
                          <span>{Math.round((j.progress / 100) * j.count).toLocaleString()} / {j.count.toLocaleString()}</span>
                          <span>{j.progress}%</span>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 퍼널 + 레이트 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5 flex flex-col gap-3">
          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-sm font-semibold">전체 퍼널</h4>
            </div>
            <CardContent className="flex flex-col gap-1.5">
              {STAGE_FUNNEL.map((s, i) => {
                const conv = i > 0 ? (s.count / STAGE_FUNNEL[i - 1].count) * 100 : 100;
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-[11px] mb-0.5">
                      <span>{s.name}</span>
                      <span className="tabular-nums">
                        <span className="font-semibold">{s.count.toLocaleString()}</span>
                        {i > 0 && <span className="text-[var(--foreground-muted)] ml-1">({conv.toFixed(1)}%)</span>}
                      </span>
                    </div>
                    <div className="h-4 rounded bg-[var(--gray-3)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(s.count / maxFunnel) * 100}%` }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        className="h-full bg-[var(--primary)]"
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">외부 API 레이트</h4>
              <Badge variant="secondary" className="text-[10px]">분당</Badge>
            </div>
            <CardContent className="flex flex-col gap-2">
              {RATE_LIMIT.map((r, i) => (
                <motion.div
                  key={r.service}
                  initial={{ opacity: 0, x: 4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.3 }}
                >
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span>{r.service}</span>
                    <span className="tabular-nums">
                      <span className="font-semibold">{r.current}</span>
                      <span className="text-[var(--foreground-muted)]"> / {r.limit}</span>
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${r.pct > 80 ? 'bg-[var(--error)]' : r.pct > 60 ? 'bg-[var(--warning)]' : 'bg-[var(--success)]'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${r.pct}%` }}
                      transition={{ delay: i * 0.06 + 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 인시던트 로그 */}
        <FadeIn delay={0.2} className="col-span-12">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">인시던트 · 이벤트 로그</h4>
              <Badge variant="secondary" className="text-[10px]">최근 1시간</Badge>
            </div>
            <CardContent>
              <div className="font-mono text-[11px] flex flex-col gap-0.5">
                {INCIDENTS.map((e, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 py-1.5 px-2 hover:bg-[var(--gray-3)] rounded"
                  >
                    <span className="text-[var(--foreground-subtle)] shrink-0">{e.time}</span>
                    <Badge
                      variant={e.level === 'error' ? 'error' : e.level === 'warning' ? 'warning' : 'secondary'}
                      className="text-[9px] shrink-0"
                    >
                      {e.level.toUpperCase()}
                    </Badge>
                    <span className="text-[11px]">{e.text}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
