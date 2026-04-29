import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, Briefcase, Users, Clock3, CheckCircle2, TrendingUp, ArrowRight,
  FileText, Megaphone, Video, CalendarClock, DollarSign, UserCheck, BarChart3,
  Wand2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/page-transition';
import { AI_TASKS, KPI_METRICS, JOB_POSTINGS, FUNNEL_DATA, STATUS_LABELS } from '../mockData';
import NotificationFeed from '../shared/NotificationFeed';
import { SectionHeader } from '../shared/commonUI';
import InsightDashboard from '../insight/InsightDashboard';
import StrategyReport from '../insight/StrategyReport';
import CompetencyInsight from '../insight/CompetencyInsight';
import { useNav, type MainTab } from '../shared/navContext';

type Mode = 'overview' | 'insight' | 'competency' | 'strategy';

const CATEGORY_TARGET: Record<string, { main: MainTab; sub?: string }> = {
  '공고': { main: 'before', sub: 'jd' },
  '스크리닝': { main: 'during', sub: 'screening' },
  '면접': { main: 'during', sub: 'schedule' },
  '리포트': { main: 'after', sub: 'overview' },
  '채용사이트': { main: 'before', sub: 'site' },
};

const KPI_TARGET: Record<string, { main: MainTab; sub?: string }> = {
  '진행 중 공고': { main: 'before', sub: 'jobs' },
  '이번 주 지원자': { main: 'during', sub: 'kanban' },
  '평균 채용 소요일': { main: 'after', sub: 'sla' },
  '오퍼 수락률': { main: 'offer', sub: 'offer' },
  '평균 AI 스코어': { main: 'during', sub: 'screening' },
  '신규 지원': { main: 'during', sub: 'kanban' },
};

function KpiTile({ icon: Icon, label, value, unit, delta, onClick }: any) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group text-left"
    >
      <Card className="group-hover:shadow-md transition-shadow h-full">
        <CardContent className="flex items-start justify-between">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-[11px] text-[var(--foreground-muted)] truncate">{label}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[24px] font-semibold text-[var(--foreground)] leading-none tabular-nums">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
              {unit && <span className="text-xs text-[var(--foreground-muted)]">{unit}</span>}
            </div>
            <span className="text-[11px] mt-0.5 text-[var(--success)]">{delta} 전주</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="w-8 h-8 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <Icon size={14} strokeWidth={1.75} className="text-[var(--foreground-muted)]" />
            </div>
            <ArrowRight size={11} className="text-[var(--foreground-subtle)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 transition-all" />
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
}

export default function RecruitmentDashboard() {
  const { navigateTo, showToast } = useNav();
  const [mode, setMode] = useState<Mode>('overview');
  const [liveCounter, setLiveCounter] = useState(1247);

  useEffect(() => {
    const t = setInterval(() => setLiveCounter(c => c + Math.floor(Math.random() * 3)), 4000);
    return () => clearInterval(t);
  }, []);

  const activeJobs = JOB_POSTINGS.filter(j => j.status === 'open').slice(0, 4);

  const modeToggle = () => (
    <div className="inline-flex items-center gap-0.5 p-1 rounded-lg bg-[var(--gray-3)]">
      {([
        ['overview', '현황'],
        ['insight', '채용 인사이트'],
        ['competency', '역량검사 인사이트'],
        ['strategy', '전략 리포트'],
      ] as [Mode, string][]).map(([k, label]) => (
        <button
          key={k}
          onClick={() => setMode(k)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
            mode === k ? 'bg-[var(--card)] shadow-sm text-[var(--foreground)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  if (mode === 'insight') return <div className="flex flex-col gap-4">{modeToggle()}<InsightDashboard /></div>;
  if (mode === 'competency') return <div className="flex flex-col gap-4">{modeToggle()}<CompetencyInsight /></div>;
  if (mode === 'strategy') return <div className="flex flex-col gap-4">{modeToggle()}<StrategyReport /></div>;

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더 + 모드 토글 + AI 에이전트 CTA */}
      <FadeIn>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">채용 대시보드</h2>
            <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
              2026년 상반기 신입사원 채용 · 실시간 지원자{' '}
              <motion.span
                key={liveCounter}
                initial={{ scale: 1.1, color: 'var(--success)' }}
                animate={{ scale: 1, color: 'var(--foreground)' }}
                transition={{ duration: 0.6 }}
                className="font-semibold tabular-nums"
              >
                {liveCounter.toLocaleString()}
              </motion.span>명
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateTo('agent')}
              className="border-[var(--border)] hover:bg-[var(--primary)]/5"
            >
              <Wand2 size={13} className="text-[var(--primary)]" /> AI 에이전트
              <kbd className="ml-1 px-1 py-0 text-[9px] rounded bg-[var(--gray-3)] text-[var(--foreground-muted)] font-mono leading-none">⌘K</kbd>
            </Button>
            {modeToggle()}
          </div>
        </div>
      </FadeIn>

      {/* KPI */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {[
            { icon: Briefcase, ...KPI_METRICS.activeJobs },
            { icon: Users, ...KPI_METRICS.totalApplicants, value: KPI_METRICS.totalApplicants.value.toLocaleString() },
            { icon: Clock3, ...KPI_METRICS.avgTimeToHire },
            { icon: CheckCircle2, ...KPI_METRICS.offerAcceptance },
            { icon: TrendingUp, ...KPI_METRICS.avgAiScore },
            { icon: Sparkles, ...KPI_METRICS.newThisWeek },
          ].map((m) => {
            const target = KPI_TARGET[m.label];
            return (
              <KpiTile
                key={m.label}
                {...m}
                onClick={() => {
                  if (target) {
                    navigateTo(target.main, target.sub);
                    showToast(`${m.label} 상세 화면으로 이동`);
                  }
                }}
              />
            );
          })}
        </div>
      </FadeIn>

      {/* 진행 중 공고 + AI 제안 작업 */}
      <section className="grid grid-cols-12 gap-4">
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">진행 중 공고</h3>
                <Badge variant="secondary" className="text-[10px]">{activeJobs.length}</Badge>
              </div>
              <button
                onClick={() => navigateTo('before', 'jobs')}
                className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              >
                전체 공고 →
              </button>
            </div>
            <CardContent>
              <div className="flex flex-col divide-y divide-[var(--border)]">
                {activeJobs.map(job => (
                  <motion.button
                    key={job.id}
                    whileHover={{ x: 2 }}
                    onClick={() => {
                      navigateTo('before', 'jobs');
                      showToast(`${job.title} 이동`);
                    }}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-[var(--gray-3)] -mx-2 px-2 rounded-md text-left transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="success" className="text-[10px]">{STATUS_LABELS[job.status]}</Badge>
                        {job.aiGenerated && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[var(--primary)]">
                            <Sparkles size={9} /> AI 생성
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-medium truncate">{job.title}</div>
                      <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5">{job.department} · {job.team}</div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-base font-semibold tabular-nums">{job.applicants}</div>
                        <div className="text-[10px] text-[var(--foreground-subtle)]">지원자</div>
                      </div>
                      {job.newApplicants > 0 && (
                        <Badge variant="warning" className="text-[10px]">+{job.newApplicants}</Badge>
                      )}
                      <div className="text-[11px] text-[var(--foreground-muted)] w-16 text-right">
                        마감 {job.deadline.slice(5)}
                      </div>
                      <ArrowRight size={13} className="text-[var(--foreground-subtle)]" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[var(--primary)]" strokeWidth={1.75} />
                <h3 className="text-sm font-semibold">AI 제안 작업</h3>
              </div>
              <Badge variant="secondary" className="text-[10px]">{AI_TASKS.length}</Badge>
            </div>
            <CardContent className="flex flex-col divide-y divide-[var(--border)]">
              {AI_TASKS.slice(0, 5).map(t => (
                <motion.button
                  key={t.id}
                  whileHover={{ x: 2 }}
                  onClick={() => {
                    const target = CATEGORY_TARGET[t.category];
                    if (target) {
                      navigateTo(target.main, target.sub);
                      showToast(`${t.title} — 이동했어요`);
                    }
                  }}
                  className="py-2.5 flex items-start gap-3 hover:bg-[var(--gray-3)] -mx-2 px-2 rounded-md text-left transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={t.priority === 'high' ? 'error' : t.priority === 'medium' ? 'warning' : 'success'}
                        className="text-[10px]"
                      >
                        {t.priority === 'high' ? '긴급' : t.priority === 'medium' ? '중요' : '일반'}
                      </Badge>
                      <span className="text-[11px] text-[var(--foreground-subtle)]">{t.category}</span>
                    </div>
                    <div className="text-sm font-medium mt-1 line-clamp-1">{t.title}</div>
                    <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5 line-clamp-1">{t.description}</div>
                  </div>
                  <div className="flex flex-col items-end shrink-0 mt-1">
                    <span className="text-[10px] text-[var(--foreground-subtle)]">{t.dueIn}</span>
                    <ArrowRight size={11} className="text-[var(--foreground-subtle)] mt-0.5" />
                  </div>
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      {/* 실시간 알림 + 퍼널 */}
      <section className="grid grid-cols-12 gap-4">
        <FadeIn delay={0.2} className="col-span-12 lg:col-span-5">
          <NotificationFeed />
        </FadeIn>

        <FadeIn delay={0.22} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">지원자 퍼널</h3>
                <p className="text-[11px] text-[var(--foreground-muted)] mt-0.5">2026년 Q2 누적 · 각 단계 클릭 시 이동</p>
              </div>
              <button
                onClick={() => setMode('strategy')}
                className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              >
                상세 리포트 →
              </button>
            </div>
            <CardContent>
              <div className="grid grid-cols-6 gap-2">
                {FUNNEL_DATA.map((s, i) => {
                  const STAGE_TARGETS: Record<string, { main: MainTab; sub?: string }> = {
                    '지원': { main: 'during', sub: 'kanban' },
                    '서류 통과': { main: 'during', sub: 'screening' },
                    '1차 면접': { main: 'during', sub: 'schedule' },
                    '2차 면접': { main: 'during', sub: 'schedule' },
                    '오퍼': { main: 'offer', sub: 'offer' },
                    '입사 확정': { main: 'offer', sub: 'onboarding' },
                  };
                  const target = STAGE_TARGETS[s.stage];
                  return (
                    <motion.button
                      key={s.stage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -2 }}
                      onClick={() => {
                        if (target) {
                          navigateTo(target.main, target.sub);
                          showToast(`${s.stage} 단계 이동`);
                        }
                      }}
                      className="flex flex-col items-center text-center p-2 rounded-md hover:bg-[var(--gray-3)] transition-colors"
                    >
                      <div className="text-[11px] text-[var(--foreground-muted)]">{s.stage}</div>
                      <div className="text-xl font-semibold mt-1 tabular-nums">{s.count.toLocaleString()}</div>
                      <div className="text-[10px] text-[var(--foreground-subtle)] mt-0.5">{s.ratio}%</div>
                      <div className="w-full h-1 mt-2 rounded-full bg-[var(--gray-3)] overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--primary)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${s.ratio}%` }}
                          transition={{ delay: i * 0.06, duration: 0.6 }}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </section>
    </div>
  );
}
