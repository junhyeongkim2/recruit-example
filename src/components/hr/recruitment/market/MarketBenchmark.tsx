import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Globe, TrendingUp, TrendingDown, DollarSign, Users, Building2, Sparkles,
  Target, ArrowUpRight, Download, Info,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

// 채용 마켓 벤치마크 — 경쟁사 연봉, 트렌드 분석
const SALARY_BENCHMARK = [
  { level: '주니어 (1-3년)', ours: 6200, market: 5800, p25: 5400, p75: 6400, high: 7200 },
  { level: '중견 (4-6년)', ours: 8800, market: 8400, p25: 7800, p75: 9200, high: 10500 },
  { level: '시니어 (7-10년)', ours: 12200, market: 12800, p25: 11500, p75: 13400, high: 15000 },
  { level: '리드 (10년+)', ours: 16500, market: 17200, p25: 15800, p75: 18500, high: 22000 },
];

const COMPETITOR_COMPANIES = [
  { name: '쿠팡', avgSalary: 13200, hiring: 320, trend: 'up', diff: 6 },
  { name: '네이버', avgSalary: 12800, hiring: 180, trend: 'neutral', diff: 3 },
  { name: '토스', avgSalary: 14500, hiring: 240, trend: 'up', diff: 16 },
  { name: '라인', avgSalary: 13600, hiring: 150, trend: 'down', diff: 10 },
  { name: '우아한형제들', avgSalary: 12400, hiring: 120, trend: 'neutral', diff: 0 },
  { name: '당근', avgSalary: 13800, hiring: 95, trend: 'up', diff: 12 },
];

const DEMAND_ROLES = [
  { role: 'AI/ML 엔지니어', demand: 95, supply: 45, competition: 'very-high' },
  { role: '백엔드 (Kotlin)', demand: 78, supply: 82, competition: 'balanced' },
  { role: 'iOS 엔지니어', demand: 85, supply: 58, competition: 'high' },
  { role: '프론트엔드 (React)', demand: 72, supply: 88, competition: 'low' },
  { role: '데이터 엔지니어', demand: 88, supply: 52, competition: 'high' },
  { role: 'DevOps', demand: 82, supply: 60, competition: 'high' },
];

const TRENDS = [
  { title: 'AI 개발자 연봉 급상승', trend: '+18%', period: '최근 6개월', tone: 'error', text: '업계 전반 GenAI 인재 수요 폭증. 시니어 기준 +2,400만 이상 상승.' },
  { title: '풀리모트 채용 비율 확대', trend: '+32%', period: '연간', tone: 'success', text: '업계 평균 16% → 24%. 지방 인재 유치 경쟁 심화.' },
  { title: '시니어 이직 주기 단축', trend: '-0.4년', period: '연간', tone: 'warning', text: '평균 2.3년 → 1.9년. 리텐션 비용 증가.' },
];

const COMPETITION_STYLE = {
  'very-high': { label: '매우 치열', tone: 'error' as const },
  'high': { label: '치열', tone: 'warning' as const },
  'balanced': { label: '균형', tone: 'secondary' as const },
  'low': { label: '여유', tone: 'success' as const },
};

export default function MarketBenchmark() {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const level = SALARY_BENCHMARK[selectedLevel];
  const maxSalary = Math.max(...SALARY_BENCHMARK.map(l => l.high));

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <Globe size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">채용 마켓 벤치마크</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                경쟁사 연봉 분포 · 수요·공급 · 트렌드 분석
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download size={14} /> 리포트</Button>
            <Button size="sm"><Sparkles size={14} /> AI 처우 조정 제안</Button>
          </div>
        </div>
      </FadeIn>

      {/* 트렌드 */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TRENDS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full">
                <CardContent>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold">{t.title}</div>
                      <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{t.period}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-lg font-semibold ${
                        t.tone === 'error' ? 'text-[var(--error)]' : t.tone === 'success' ? 'text-[var(--success)]' : 'text-[var(--warning)]'
                      } tabular-nums`}>{t.trend}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[var(--foreground-muted)] mt-2 leading-relaxed">{t.text}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 연봉 벤치마크 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">연봉 밴드 비교</h4>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--foreground)]" /> 카카오</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--primary)]" /> 업계 평균</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--gray-3)]" /> 25-75 분위</span>
              </div>
            </div>
            <CardContent className="flex flex-col gap-3">
              {SALARY_BENCHMARK.map((l, i) => (
                <motion.button
                  key={l.level}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ x: 2 }}
                  onClick={() => setSelectedLevel(i)}
                  className={`text-left p-3 rounded-md border transition-colors ${
                    selectedLevel === i ? 'border-[var(--foreground)] bg-[var(--gray-3)]' : 'border-[var(--border)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">{l.level}</span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-[var(--foreground-muted)]">카카오</span>
                      <span className="font-semibold tabular-nums">{l.ours.toLocaleString()}</span>
                      <span className={`text-[10px] ${
                        l.ours > l.market ? 'text-[var(--success)]' : l.ours < l.market ? 'text-[var(--error)]' : 'text-[var(--foreground-muted)]'
                      }`}>
                        ({l.ours > l.market ? '+' : ''}{(((l.ours - l.market) / l.market) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <div className="relative h-6 rounded-full bg-[var(--gray-3)] overflow-hidden">
                    {/* p25~p75 범위 */}
                    <div
                      className="absolute inset-y-0 bg-[var(--gray-4)]"
                      style={{
                        left: `${(l.p25 / maxSalary) * 100}%`,
                        width: `${((l.p75 - l.p25) / maxSalary) * 100}%`,
                      }}
                    />
                    {/* 시장 평균 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.06 + 0.3 }}
                      className="absolute inset-y-0 w-0.5 bg-[var(--primary)]"
                      style={{ left: `${(l.market / maxSalary) * 100}%` }}
                    />
                    {/* 카카오 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 + 0.4 }}
                      className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--foreground)] border-2 border-[var(--card)]"
                      style={{ left: `${(l.ours / maxSalary) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-[var(--foreground-muted)] mt-1 tabular-nums">
                    <span>{l.p25.toLocaleString()}</span>
                    <span>{l.market.toLocaleString()}</span>
                    <span>{l.p75.toLocaleString()}</span>
                    <span>최고 {l.high.toLocaleString()}</span>
                  </div>
                </motion.button>
              ))}
              <div className="p-2.5 rounded-md bg-[var(--gray-3)] flex items-start gap-2">
                <Info size={11} className="text-[var(--foreground-muted)] mt-0.5 shrink-0" />
                <span className="text-[10px] text-[var(--foreground-muted)] leading-relaxed">
                  {level.level} 수준에서 카카오 연봉은 시장 평균 대비{' '}
                  <strong>{level.ours >= level.market ? '+' : ''}{(((level.ours - level.market) / level.market) * 100).toFixed(1)}%</strong>
                  입니다.{' '}
                  {level.ours < level.p25 && '경쟁력 확보를 위해 상향 조정 권장.'}
                  {level.ours >= level.p25 && level.ours < level.p75 && '시장 중간 수준 유지 중.'}
                  {level.ours >= level.p75 && '상위 25% 수준으로 경쟁력 확보.'}
                </span>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 경쟁사 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">경쟁사 현황</h4>
              <Badge variant="secondary" className="text-[10px]">시니어 기준</Badge>
            </div>
            <CardContent className="flex flex-col gap-2">
              {COMPETITOR_COMPANIES.map((c, i) => {
                const Icon = c.trend === 'up' ? TrendingUp : c.trend === 'down' ? TrendingDown : Building2;
                return (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.2 }}
                    className="flex items-center gap-3 p-2.5 rounded-md border border-[var(--border)]"
                  >
                    <div className="w-8 h-8 rounded bg-[var(--gray-3)] flex items-center justify-center shrink-0">
                      <Building2 size={13} className="text-[var(--foreground-muted)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium">{c.name}</div>
                      <div className="text-[10px] text-[var(--foreground-muted)]">현재 채용 {c.hiring}명</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-baseline gap-0.5 justify-end">
                        <span className="text-sm font-semibold tabular-nums">{c.avgSalary.toLocaleString()}</span>
                        <span className="text-[9px] text-[var(--foreground-muted)]">만</span>
                      </div>
                      <div className="flex items-center justify-end gap-0.5">
                        <Icon size={9} className={
                          c.trend === 'up' ? 'text-[var(--error)]' : c.trend === 'down' ? 'text-[var(--success)]' : 'text-[var(--foreground-muted)]'
                        } />
                        <span className={`text-[9px] ${
                          c.trend === 'up' ? 'text-[var(--error)]' : c.trend === 'down' ? 'text-[var(--success)]' : 'text-[var(--foreground-muted)]'
                        }`}>
                          우리 대비 +{c.diff}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 수요·공급 */}
        <FadeIn delay={0.2} className="col-span-12">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">직군별 수요 · 공급 지수</h4>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--error)]/70" /> 수요</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--primary)]" /> 공급</span>
              </div>
            </div>
            <CardContent>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {DEMAND_ROLES.map(r => {
                  const c = COMPETITION_STYLE[r.competition as keyof typeof COMPETITION_STYLE];
                  return (
                    <StaggerItem key={r.role}>
                      <motion.div
                        whileHover={{ y: -1 }}
                        className="p-3 rounded-md border border-[var(--border)]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold">{r.role}</span>
                          <Badge variant={c.tone} className="text-[9px]">{c.label}</Badge>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div>
                            <div className="flex items-center justify-between text-[10px] mb-0.5">
                              <span className="text-[var(--foreground-muted)]">수요</span>
                              <span className="font-medium tabular-nums">{r.demand}</span>
                            </div>
                            <div className="h-1 rounded-full bg-[var(--gray-3)] overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${r.demand}%` }}
                                className="h-full bg-[var(--error)]/70"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-[10px] mb-0.5">
                              <span className="text-[var(--foreground-muted)]">공급</span>
                              <span className="font-medium tabular-nums">{r.supply}</span>
                            </div>
                            <div className="h-1 rounded-full bg-[var(--gray-3)] overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${r.supply}%` }}
                                className="h-full bg-[var(--primary)]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-[var(--border)] flex items-center justify-between text-[10px]">
                          <span className="text-[var(--foreground-muted)]">수급 격차</span>
                          <span className={`font-semibold ${r.demand > r.supply ? 'text-[var(--error)]' : 'text-[var(--success)]'}`}>
                            {r.demand > r.supply ? '+' : ''}{r.demand - r.supply}
                          </span>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
