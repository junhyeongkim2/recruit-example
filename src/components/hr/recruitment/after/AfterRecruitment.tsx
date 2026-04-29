import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download, Share2, Sparkles, Clock3, Users, CheckCircle2, TrendingUp,
  LayoutGrid, ShieldCheck, FileText, PanelRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/page-transition';
import WidgetEditor from './WidgetEditor';
import VerificationReport from './VerificationReport';
import CandidateComprehensiveReport from '../reports/CandidateComprehensiveReport';
import BudgetManagement from '../budget/BudgetManagement';
import DEIDashboard from '../dei/DEIDashboard';
import MarketBenchmark from '../market/MarketBenchmark';
import CrossCommunityHiring from '../crosshire/CrossCommunityHiring';
import SLAManagement from '../sla/SLAManagement';
import { SubViewTabs } from '../shared/commonUI';
import { useNav } from '../shared/navContext';
import { Icon3D } from '../shared/Icon3D';
import { User, DollarSign, Heart as HeartIcon, Globe, ArrowLeftRight as ArrowLRIcon, Timer as TimerIcon } from 'lucide-react';

type View = 'overview' | 'editor' | 'verify' | 'candidate' | 'budget' | 'dei' | 'market' | 'crosshire' | 'sla';

const VIEWS: { key: View; label: string; icon: any; group?: string }[] = [
  { key: 'overview', label: '결과 리포트', icon: FileText, group: '리포트' },
  { key: 'candidate', label: '지원자 종합 리포트', icon: User, group: '리포트' },
  { key: 'verify', label: '통합 검증 리포트', icon: ShieldCheck, group: '리포트' },
  { key: 'editor', label: '위젯 편집기', icon: PanelRight, group: '리포트' },
  { key: 'budget', label: '예산 · 비용 관리', icon: DollarSign, group: '분석' },
  { key: 'sla', label: 'SLA · 리드타임', icon: TimerIcon, group: '분석' },
  { key: 'dei', label: 'DEI 다양성', icon: HeartIcon, group: '분석' },
  { key: 'market', label: '마켓 벤치마크', icon: Globe, group: '전략' },
  { key: 'crosshire', label: '공동체 크로스 채용', icon: ArrowLRIcon, group: '전략' },
];

const AFTER_GROUPS = ['리포트', '분석', '전략'];

const COVER = {
  title: '2026년 상반기',
  subtitle: '채용 결과 리포트',
  range: '2026.04.01 ~ 2026.04.15',
  version: 'v1.2',
};

const FUNNEL_STEPS = [
  { label: '응시 완료 (공개공고)', days: '89일', ratio: '100%', count: 1480 },
  { label: '서류 전형 (공개 3개월)', days: '20일', ratio: '23.9%', count: 252 },
  { label: '역량검사 전형 (공개 3개월)', days: '23일', ratio: '10%', count: 54 },
  { label: '면접 전형 (공개 3개월)', days: '15일', ratio: '3.8%', count: 32 },
  { label: '채용 완료', days: '5일', ratio: '0.4%', count: 12 },
];

const KPI = [
  { icon: Users, label: '총 입사자', value: 36, unit: '명', delta: '+12%' },
  { icon: Clock3, label: '평균 채용 소요일', value: 28, unit: '일', delta: '-4일' },
  { icon: CheckCircle2, label: '목표 달성률', value: 92, unit: '%', delta: '+8%p' },
  { icon: TrendingUp, label: '오퍼 수락률', value: 87, unit: '%', delta: '+3%p' },
];

export default function AfterRecruitment() {
  const { subViews, setSubView, showToast } = useNav();
  const view = subViews.after as View;
  const setView = (v: View) => setSubView('after', v);

  return (
    <div className="flex flex-col gap-6">
      <SubViewTabs views={VIEWS} active={view} onChange={setView} layoutId="after-view-indicator" groups={AFTER_GROUPS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'overview' && (
            <div className="flex flex-col gap-6">
              <FadeIn>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon3D name="trophy" size={44} />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold">채용 결과 리포트</h2>
                        <Badge variant="success" className="text-[10px]">AI 자동 생성</Badge>
                        <Badge variant="outline" className="text-[10px]">{COVER.version}</Badge>
                      </div>
                      <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                        퍼널 · 인재 · 운영 성과 통합 분석 · 경영진 보고용
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => showToast('리포트 공유 링크를 복사했어요')}
                    >
                      <Share2 size={14} /> 공유
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => showToast('PDF로 다운로드를 시작했어요')}
                    >
                      <Download size={14} /> PDF
                    </Button>
                    <Button size="sm" onClick={() => setView('editor')}><LayoutGrid size={14} /> 편집</Button>
                  </div>
                </div>
              </FadeIn>

              {/* 표지 */}
              <FadeIn delay={0.05}>
                <Card className="py-0 overflow-hidden">
                  <div className="grid grid-cols-12">
                    <div className="col-span-5 bg-[var(--gray-3)] aspect-[4/3] relative flex items-center justify-center">
                      <motion.svg
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        viewBox="0 0 200 160"
                        className="w-full h-full"
                      >
                        <motion.path
                          d="M 20,80 Q 60,20 100,80 T 180,80"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="text-[var(--foreground-muted)]"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, ease: 'easeInOut' }}
                        />
                        {[
                          { cx: 40, cy: 60, r: 4, color: 'var(--warning)' },
                          { cx: 100, cy: 80, r: 4, color: 'var(--success)' },
                          { cx: 140, cy: 60, r: 4, color: 'var(--primary)' },
                          { cx: 170, cy: 90, r: 4, color: 'var(--warning)' },
                        ].map((c, i) => (
                          <motion.circle
                            key={i}
                            cx={c.cx}
                            cy={c.cy}
                            r={c.r}
                            fill={c.color}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                          />
                        ))}
                      </motion.svg>
                    </div>
                    <div className="col-span-7 p-8 flex flex-col justify-center bg-[var(--foreground)] text-[var(--background)]">
                      <div className="text-xs opacity-80">채용 결과 리포트</div>
                      <h2 className="text-3xl font-semibold mt-2 leading-tight">
                        {COVER.title}<br />
                        {COVER.subtitle}
                      </h2>
                      <div className="text-xs opacity-80 mt-6">마이다스아이티 {COVER.title} 채용</div>
                      <div className="text-xs opacity-60 mt-0.5">{COVER.range}</div>
                    </div>
                  </div>
                </Card>
              </FadeIn>

              {/* 단계별 히스토리 */}
              <FadeIn delay={0.1}>
                <Card>
                  <div className="px-6 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">채용 단계별 히스토리</h3>
                  </div>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-3">
                      {FUNNEL_STEPS.map((s, i) => (
                        <motion.div
                          key={s.label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          whileHover={{ y: -2 }}
                          className="rounded-lg border border-[var(--border)] p-4 flex flex-col"
                        >
                          <div className="text-[11px] text-[var(--foreground-muted)] line-clamp-2 min-h-[32px]">{s.label}</div>
                          <div className="text-xs text-[var(--foreground-muted)] mt-2">{s.days}</div>
                          <div className="mt-3 flex items-baseline gap-1">
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.08 + 0.3 }}
                              className="text-2xl font-semibold"
                            >
                              {s.ratio}
                            </motion.span>
                          </div>
                          <div className="text-xs text-[var(--foreground-muted)] mt-1">{s.count.toLocaleString()}명</div>
                          <div className="h-10 mt-3">
                            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                              <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: i * 0.08 }}
                                d={`M 0,${40 - (s.count / 1480) * 40} L 20,${38 - (s.count / 1480) * 30} L 40,${36 - (s.count / 1480) * 35} L 60,${34 - (s.count / 1480) * 28} L 80,${38 - (s.count / 1480) * 24} L 100,${40 - (s.count / 1480) * 20}`}
                                stroke="currentColor"
                                strokeWidth="1.5"
                                fill="none"
                                className="text-[var(--primary)]"
                              />
                            </svg>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* KPI */}
              <FadeIn delay={0.15}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {KPI.map(k => {
                    const Icon = k.icon;
                    return (
                      <Card key={k.label} className="h-full">
                        <CardContent className="flex items-start justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-[var(--foreground-muted)]">{k.label}</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-[26px] font-semibold leading-none">{k.value}</span>
                              <span className="text-sm text-[var(--foreground-muted)]">{k.unit}</span>
                            </div>
                            <span className="text-xs mt-1 text-[var(--success)]">{k.delta} YoY</span>
                          </div>
                          <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                            <Icon size={16} className="text-[var(--foreground-muted)]" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </FadeIn>

              {/* AI 요약 */}
              <FadeIn delay={0.2}>
                <Card>
                  <div className="px-6 flex items-center gap-2">
                    <Sparkles size={14} className="text-[var(--primary)]" />
                    <h3 className="text-sm font-semibold">경영진 리포트 AI 요약</h3>
                  </div>
                  <CardContent className="flex flex-col gap-2 text-xs leading-relaxed">
                    {[
                      { ok: true, text: '평균 채용 소요일이 전년 대비 4일 단축되어 업계 상위 15%에 진입했습니다.' },
                      { ok: true, text: '사내 추천 채널의 품질 스코어가 91점으로 가장 높으며, 수락률도 96%로 탁월합니다.' },
                      { ok: false, text: '디자인실 채용이 88% 수준으로, 디자이너 시장 경쟁 심화에 따른 대안 전략이 필요합니다.' },
                      { ok: true, text: '입사 90일 유지율이 95%로 전년 대비 +6%p 개선되었습니다.' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-3 rounded-md border border-[var(--border)] flex items-start gap-2"
                      >
                        <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${item.ok ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`} />
                        <span className="text-[var(--foreground-muted)]">{item.text}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          )}
          {view === 'candidate' && <CandidateComprehensiveReport />}
          {view === 'budget' && <BudgetManagement />}
          {view === 'sla' && <SLAManagement />}
          {view === 'dei' && <DEIDashboard />}
          {view === 'market' && <MarketBenchmark />}
          {view === 'crosshire' && <CrossCommunityHiring />}
          {view === 'editor' && <WidgetEditor />}
          {view === 'verify' && <VerificationReport />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
