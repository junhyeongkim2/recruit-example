import { motion } from 'motion/react';
import {
  DollarSign, TrendingUp, TrendingDown, AlertCircle, Sparkles, ArrowUpRight,
  Users, Megaphone, Video, Briefcase, Download,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { Icon3D } from '../shared/Icon3D';

// 채용 예산 · 비용 관리
const OVERALL = {
  totalBudget: 48000, // 만원
  spent: 31200,
  committed: 8400,
  remaining: 8400,
};

const CATEGORIES = [
  { icon: Megaphone, name: '채용 공고 / 광고', budget: 12000, spent: 8400, sub: '잡코리아·링크드인·사람인' },
  { icon: Users, name: '헤드헌터 수수료', budget: 18000, spent: 14200, sub: '성공 기반 수락 연봉 15%' },
  { icon: Briefcase, name: '이벤트 / 채용 설명회', budget: 6000, spent: 3800, sub: '오프라인·온라인 설명회' },
  { icon: Video, name: 'AI 도구 / 인프라', budget: 8000, spent: 4000, sub: 'h.place / Zoom / 영상 장비' },
  { icon: Sparkles, name: '사이닝 · 레퍼럴 보너스', budget: 4000, spent: 800, sub: '지급 예정 3,000' },
];

const MONTHLY_TREND = [
  { month: '1월', budget: 8000, actual: 5200 },
  { month: '2월', budget: 8000, actual: 6800 },
  { month: '3월', budget: 8000, actual: 7200 },
  { month: '4월', budget: 8000, actual: 6400 },
  { month: '5월', budget: 8000, actual: 5600 },
  { month: '6월', budget: 8000, actual: 0, forecast: true },
];

const CHANNEL_ROI = [
  { channel: '사내 추천', cost: 800, hires: 14, costPerHire: 57, quality: 91 },
  { channel: '링크드인', cost: 6200, hires: 10, costPerHire: 620, quality: 85 },
  { channel: '잡코리아', cost: 2800, hires: 5, costPerHire: 560, quality: 78 },
  { channel: '헤드헌터', cost: 14200, hires: 4, costPerHire: 3550, quality: 88 },
  { channel: '기타', cost: 7200, hires: 3, costPerHire: 2400, quality: 72 },
];

const ALERTS = [
  { tone: 'error', text: '헤드헌터 예산 78% 소진 · 4월 말 초과 예상', action: '예산 조정' },
  { tone: 'warning', text: 'AI 도구 월간 사용량 급증 (+34%)', action: '분석 보기' },
  { tone: 'success', text: '사내 추천 ROI 최고 · 보너스 상향 권장', action: '정책 제안' },
];

export default function BudgetManagement() {
  const utilization = Math.round(((OVERALL.spent + OVERALL.committed) / OVERALL.totalBudget) * 100);
  const totalHires = CHANNEL_ROI.reduce((s, c) => s + c.hires, 0);
  const totalCost = CHANNEL_ROI.reduce((s, c) => s + c.cost, 0);
  const avgCostPerHire = Math.round(totalCost / totalHires);
  const maxMonthly = Math.max(...MONTHLY_TREND.map(m => Math.max(m.budget, m.actual)));

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Icon3D name="chart" size={40} />
            <div>
              <h3 className="text-sm font-semibold">채용 예산 · 비용 관리</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                2026년 상반기 · 카테고리별 집행 · 채널 ROI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download size={14} /> 리포트 내보내기</Button>
            <Button size="sm"><Sparkles size={14} /> AI 최적화 제안</Button>
          </div>
        </div>
      </FadeIn>

      {/* 전체 예산 KPI */}
      <FadeIn delay={0.05}>
        <Card className="py-0 overflow-hidden">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-4 p-6 bg-[var(--foreground)] text-[var(--background)]">
              <div className="text-[10px] opacity-80">전체 예산</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[36px] font-semibold leading-none tabular-nums">{OVERALL.totalBudget.toLocaleString()}</span>
                <span className="text-xs opacity-80">만원</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="opacity-80">집행률</span>
                  <span className="font-semibold">{utilization}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(OVERALL.spent / OVERALL.totalBudget) * 100}%` }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-y-0 left-0 bg-[var(--success)]"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(OVERALL.committed / OVERALL.totalBudget) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute inset-y-0 bg-[var(--warning)]/80"
                    style={{ left: `${(OVERALL.spent / OVERALL.totalBudget) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 mt-2 text-[10px]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--success)]" /> 집행 {OVERALL.spent.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--warning)]/80" /> 약정 {OVERALL.committed.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-white/10" /> 잔여 {OVERALL.remaining.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 grid grid-cols-3 divide-x divide-[var(--border)]">
              <div className="p-6">
                <div className="text-[10px] text-[var(--foreground-muted)]">채용 건당 평균 비용</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-semibold tabular-nums">{avgCostPerHire.toLocaleString()}</span>
                  <span className="text-xs text-[var(--foreground-muted)]">만원</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-[var(--success)]">
                  <TrendingDown size={10} />
                  <span>전년 대비 -12%</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-[10px] text-[var(--foreground-muted)]">총 채용 (YTD)</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-semibold tabular-nums">{totalHires}</span>
                  <span className="text-xs text-[var(--foreground-muted)]">명</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-[var(--success)]">
                  <TrendingUp size={10} />
                  <span>목표 대비 92%</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-[10px] text-[var(--foreground-muted)]">예상 소진 (Q2 말)</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-semibold tabular-nums text-[var(--warning)]">94</span>
                  <span className="text-xs text-[var(--foreground-muted)]">%</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-[var(--warning)]">
                  <AlertCircle size={10} />
                  <span>일부 카테고리 초과 가능</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* 경고 */}
      <FadeIn delay={0.08}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ALERTS.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`p-3 rounded-md border ${
                a.tone === 'error' ? 'border-[var(--error)]/30 bg-[var(--error)]/5' :
                a.tone === 'warning' ? 'border-[var(--warning)]/30 bg-[var(--warning)]/5' :
                'border-[var(--success)]/30 bg-[var(--success)]/5'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-1.5 flex-1 min-w-0">
                  <AlertCircle
                    size={12}
                    className={`mt-0.5 shrink-0 ${
                      a.tone === 'error' ? 'text-[var(--error)]' :
                      a.tone === 'warning' ? 'text-[var(--warning)]' :
                      'text-[var(--success)]'
                    }`}
                  />
                  <span className="text-[11px] leading-relaxed">{a.text}</span>
                </div>
                <Button variant="ghost" size="xs">{a.action}</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 카테고리별 예산 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-sm font-semibold">카테고리별 예산 집행</h4>
            </div>
            <CardContent className="flex flex-col gap-3">
              {CATEGORIES.map((c, i) => {
                const Icon = c.icon;
                const pct = (c.spent / c.budget) * 100;
                return (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-md border border-[var(--border)]"
                  >
                    <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[var(--foreground)]" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium">{c.name}</span>
                        <span className="text-[11px] tabular-nums">
                          <span className="font-semibold">{c.spent.toLocaleString()}</span>
                          <span className="text-[var(--foreground-muted)]"> / {c.budget.toLocaleString()}</span>
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${pct > 80 ? 'bg-[var(--error)]' : pct > 60 ? 'bg-[var(--warning)]' : 'bg-[var(--success)]'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, delay: i * 0.06 }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="text-[var(--foreground-muted)]">{c.sub}</span>
                        <span className={pct > 80 ? 'text-[var(--error)]' : 'text-[var(--foreground-muted)]'}>{pct.toFixed(0)}%</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 월별 추이 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-sm font-semibold">월별 집행 추이</h4>
            </div>
            <CardContent>
              <div className="h-[200px] flex items-end justify-between gap-2 pt-4">
                {MONTHLY_TREND.map((m, i) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full flex items-end justify-center gap-0.5" style={{ height: '160px' }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(m.budget / maxMonthly) * 100}%` }}
                        transition={{ delay: i * 0.06, duration: 0.5 }}
                        className="flex-1 bg-[var(--gray-3)] rounded-t"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(m.actual / maxMonthly) * 100}%` }}
                        transition={{ delay: i * 0.06 + 0.2, duration: 0.5 }}
                        className={`flex-1 rounded-t ${m.forecast ? 'bg-[var(--primary)]/30 border border-dashed border-[var(--primary)]' : 'bg-[var(--primary)]'}`}
                      />
                    </div>
                    <span className="text-[10px] text-[var(--foreground-muted)]">{m.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3 mt-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--gray-3)]" /> 예산</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--primary)]" /> 집행</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--primary)]/30 border border-dashed border-[var(--primary)]" /> 예상</span>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 채널 ROI */}
        <FadeIn delay={0.2} className="col-span-12">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">채널별 ROI</h4>
              <Badge variant="secondary" className="text-[10px]">Cost per Hire 분석</Badge>
            </div>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-[var(--gray-3)]">
                  <tr>
                    {['채널', '총 비용', '채용 수', 'CPH', '품질 점수', 'ROI'].map(h => (
                      <th key={h} className="px-4 py-2 text-[10px] font-medium text-[var(--foreground-muted)] text-left whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CHANNEL_ROI.map((c, i) => {
                    const roi = (c.quality * 10) / c.costPerHire;
                    const roiTone = roi > 1 ? 'success' : roi > 0.2 ? 'warning' : 'error';
                    return (
                      <motion.tr
                        key={c.channel}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="border-t border-[var(--border)]"
                      >
                        <td className="px-4 py-2.5 text-xs font-medium">{c.channel}</td>
                        <td className="px-4 py-2.5 text-xs tabular-nums">{c.cost.toLocaleString()} 만원</td>
                        <td className="px-4 py-2.5 text-xs tabular-nums">{c.hires}명</td>
                        <td className="px-4 py-2.5 text-xs font-semibold tabular-nums">{c.costPerHire.toLocaleString()} 만원</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1 rounded-full bg-[var(--gray-3)] overflow-hidden">
                              <div className="h-full bg-[var(--success)]" style={{ width: `${c.quality}%` }} />
                            </div>
                            <span className="text-[11px] font-semibold">{c.quality}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <Badge variant={roiTone as any} className="text-[10px]">
                            {roiTone === 'success' ? '우수' : roiTone === 'warning' ? '보통' : '개선 필요'}
                          </Badge>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
