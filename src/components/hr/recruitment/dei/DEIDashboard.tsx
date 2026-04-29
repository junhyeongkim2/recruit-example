import { motion } from 'motion/react';
import {
  BarChart3, TrendingUp, TrendingDown, AlertCircle, Download, Info, Target,
  Users, Briefcase, Globe, Heart,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

// DEI (Diversity, Equity, Inclusion) 대시보드
const DIVERSITY_KPI = [
  { label: '여성 비율', value: 38, target: 45, unit: '%' },
  { label: '경력 다양성 지수', value: 72, target: 80, unit: '점' },
  { label: '지역 다양성', value: 15, target: 20, unit: '개' },
  { label: '전공 다양성', value: 42, target: 40, unit: '개', achieved: true },
];

const FUNNEL_DIVERSITY = [
  { stage: '지원', female: 42, male: 58 },
  { stage: '서류 통과', female: 40, male: 60 },
  { stage: '1차 면접', female: 38, male: 62 },
  { stage: '2차 면접', female: 36, male: 64 },
  { stage: '오퍼', female: 36, male: 64 },
  { stage: '입사', female: 38, male: 62 },
];

const AGE_DISTRIBUTION = [
  { label: '20대 초', pct: 18 },
  { label: '20대 말', pct: 32 },
  { label: '30대 초', pct: 28 },
  { label: '30대 말', pct: 14 },
  { label: '40대 이상', pct: 8 },
];

const EDUCATION = [
  { label: '학사', pct: 62, color: 'var(--primary)' },
  { label: '석사', pct: 28, color: 'var(--success)' },
  { label: '박사', pct: 4, color: 'var(--warning)' },
  { label: '고졸/기타', pct: 6, color: 'var(--foreground-muted)' },
];

const BIAS_ALERTS = [
  { tone: 'warning', title: '학벌 편향 감지', text: '특정 대학 출신 지원자의 합격률이 평균 대비 +18%. 학교명 마스킹 심사 강화 권장.' },
  { tone: 'success', title: '성별 편향 완화', text: 'AI 스크리닝 도입 후 여성 지원자 합격률 격차 4%p → 1%p 감소.' },
  { tone: 'warning', title: '연령 편향 주의', text: '40대+ 지원자의 면접 도달률이 절반. 경력 우대 항목 재검토 필요.' },
];

const TEAM_DIVERSITY = [
  { team: 'HRIS 개발팀', gender: 35, age: 72, region: 12, overall: 68 },
  { team: '피플실', gender: 62, age: 78, region: 8, overall: 78 },
  { team: '디자인실', gender: 58, age: 68, region: 15, overall: 72 },
  { team: 'QA팀', gender: 45, age: 62, region: 10, overall: 60 },
];

export default function DEIDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <Heart size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">다양성 · 형평성 · 포용성 (DEI)</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                채용 다양성 지표 · 편향 모니터링 · 팀별 비교
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download size={14} /> DEI 리포트</Button>
            <Button size="sm"><Target size={14} /> 목표 설정</Button>
          </div>
        </div>
      </FadeIn>

      {/* 핵심 KPI */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DIVERSITY_KPI.map((k, i) => {
            const ratio = k.value / k.target;
            const done = k.achieved || k.value >= k.target;
            return (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="h-full">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--foreground-muted)]">{k.label}</span>
                      {done && <Badge variant="success" className="text-[9px]">달성</Badge>}
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-semibold tabular-nums">{k.value}</span>
                      <span className="text-xs text-[var(--foreground-muted)]">{k.unit}</span>
                      <span className="text-[10px] text-[var(--foreground-subtle)] ml-1">/ {k.target}{k.unit}</span>
                    </div>
                    <div className="h-1.5 mt-2 rounded-full bg-[var(--gray-3)] overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${done ? 'bg-[var(--success)]' : ratio > 0.85 ? 'bg-[var(--warning)]' : 'bg-[var(--primary)]'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, ratio * 100)}%` }}
                        transition={{ delay: i * 0.06, duration: 0.6 }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </FadeIn>

      {/* 편향 경고 */}
      <FadeIn delay={0.08}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {BIAS_ALERTS.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`p-3 rounded-md border ${
                a.tone === 'warning' ? 'border-[var(--warning)]/30 bg-[var(--warning)]/5' : 'border-[var(--success)]/30 bg-[var(--success)]/5'
              }`}
            >
              <div className="flex items-start gap-2">
                {a.tone === 'warning'
                  ? <AlertCircle size={12} className="text-[var(--warning)] mt-0.5 shrink-0" />
                  : <TrendingUp size={12} className="text-[var(--success)] mt-0.5 shrink-0" />}
                <div className="min-w-0">
                  <div className="text-xs font-semibold">{a.title}</div>
                  <div className="text-[11px] text-[var(--foreground-muted)] mt-1 leading-relaxed">{a.text}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 퍼널 성별 분포 */}
        <FadeIn delay={0.12} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">전형 단계별 성별 분포</h4>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--primary)]" /> 여성</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--gray-4)]" /> 남성</span>
              </div>
            </div>
            <CardContent className="flex flex-col gap-2">
              {FUNNEL_DIVERSITY.map((f, i) => (
                <motion.div
                  key={f.stage}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{f.stage}</span>
                    <span className="text-[var(--foreground-muted)] tabular-nums">{f.female}% / {f.male}%</span>
                  </div>
                  <div className="h-5 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${f.female}%` }}
                      transition={{ delay: i * 0.06, duration: 0.6 }}
                      className="h-full bg-[var(--primary)] flex items-center justify-end pr-2 text-[9px] text-white"
                    >
                      {f.female >= 15 && `${f.female}%`}
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${f.male}%` }}
                      transition={{ delay: i * 0.06 + 0.1, duration: 0.6 }}
                      className="h-full bg-[var(--gray-4)] flex items-center pl-2 text-[9px] text-[var(--foreground)]"
                    >
                      {f.male >= 15 && `${f.male}%`}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
              <div className="mt-2 p-2 rounded bg-[var(--gray-3)] flex items-start gap-2">
                <Info size={11} className="text-[var(--foreground-muted)] mt-0.5 shrink-0" />
                <span className="text-[10px] text-[var(--foreground-muted)] leading-relaxed">
                  전형 진행에 따라 여성 비율이 6%p 감소. 2차 면접 이후 유지되어 면접 과정 점검 권장.
                </span>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 연령 + 학력 분포 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5 flex flex-col gap-3">
          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-sm font-semibold">연령대 분포</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {AGE_DISTRIBUTION.map((a, i) => (
                <div key={a.label}>
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span>{a.label}</span>
                    <span className="font-medium tabular-nums">{a.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${a.pct * 2.5}%` }}
                      transition={{ delay: i * 0.06 + 0.2 }}
                      className="h-full bg-[var(--primary)]"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-sm font-semibold">학력 분포</h4>
            </div>
            <CardContent>
              <div className="h-4 rounded-full overflow-hidden flex">
                {EDUCATION.map((e, i) => (
                  <motion.div
                    key={e.label}
                    initial={{ width: 0 }}
                    animate={{ width: `${e.pct}%` }}
                    transition={{ delay: i * 0.08 + 0.3, duration: 0.5 }}
                    style={{ background: e.color }}
                    className="h-full"
                    title={`${e.label} ${e.pct}%`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {EDUCATION.map(e => (
                  <div key={e.label} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-sm" style={{ background: e.color }} />
                      <span>{e.label}</span>
                    </div>
                    <span className="font-medium tabular-nums">{e.pct}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 팀별 다양성 점수 */}
        <FadeIn delay={0.2} className="col-span-12">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">팀별 다양성 스코어</h4>
              <Badge variant="secondary" className="text-[10px]">100점 만점</Badge>
            </div>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-[var(--gray-3)]">
                  <tr>
                    {['팀', '성별 균형', '연령 다양성', '지역 다양성', '종합'].map(h => (
                      <th key={h} className="px-4 py-2 text-[10px] font-medium text-[var(--foreground-muted)] text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TEAM_DIVERSITY.map((t, i) => (
                    <motion.tr
                      key={t.team}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 + 0.3 }}
                      className="border-t border-[var(--border)]"
                    >
                      <td className="px-4 py-2.5 text-xs font-medium">{t.team}</td>
                      {[t.gender, t.age, t.region].map((v, j) => (
                        <td key={j} className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1 rounded-full bg-[var(--gray-3)] overflow-hidden">
                              <div className={`h-full ${v >= 70 ? 'bg-[var(--success)]' : v >= 50 ? 'bg-[var(--warning)]' : 'bg-[var(--error)]'}`} style={{ width: `${v}%` }} />
                            </div>
                            <span className="text-[11px] tabular-nums">{v}</span>
                          </div>
                        </td>
                      ))}
                      <td className="px-4 py-2.5">
                        <Badge variant={t.overall >= 75 ? 'success' : t.overall >= 60 ? 'warning' : 'error'} className="text-[10px]">
                          {t.overall}점
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
