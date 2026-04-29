import { motion } from 'motion/react';
import { CheckCircle2, Download, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { Icon3D } from '../shared/Icon3D';

const GRADE_LABELS = ['C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S'];

const GRADE_STATS = [
  {
    name: '종합 등급',
    standard: 'A-등급 이상',
    allAppliedPct: 30,
    allCount: 540,
    unfit: 'C~B',
    fit: 'A-~S',
    highlightFrom: 5, // A-
    highlightTo: 8,   // S
    avgIdx: 5, // 적합 평균
  },
  {
    name: '인재상 등급',
    standard: 'A-등급 이상',
    allAppliedPct: 23,
    allCount: 414,
    unfit: '부적합 평균',
    fit: '적합 평균',
    highlightFrom: 4,
    highlightTo: 8,
    avgIdx: 4,
  },
  {
    name: '직무 등급',
    standard: 'A-등급 이상',
    allAppliedPct: 32,
    allCount: 576,
    unfit: '부적합 평균',
    fit: '적합 평균',
    highlightFrom: 3,
    highlightTo: 8,
    avgIdx: 5,
  },
  {
    name: '상황 등급',
    standard: 'A-등급 이상',
    allAppliedPct: 21,
    allCount: 378,
    unfit: '부적합 평균',
    fit: '적합 평균',
    highlightFrom: 4,
    highlightTo: 8,
    avgIdx: 5,
  },
];

const EXTRA_STATS = [
  { name: '정서 안정성', pct: 35, count: 630 },
  { name: '응답 신뢰 여부', pct: 27, count: 486, standard: 'A-등급 이상' },
];

function GaugeSpeedometer() {
  return (
    <div className="relative w-56 h-32">
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Red zone */}
        <path
          d="M 20 100 A 80 80 0 0 1 60 30"
          stroke="var(--error)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Yellow/mid zone */}
        <path
          d="M 60 30 A 80 80 0 0 1 140 30"
          stroke="var(--warning)"
          strokeWidth="14"
          fill="none"
          opacity="0.3"
        />
        {/* Green zone */}
        <path
          d="M 140 30 A 80 80 0 0 1 180 100"
          stroke="var(--success)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: 15 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ transformOrigin: '100px 100px' }}
        >
          <line x1="100" y1="100" x2="100" y2="40" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="100" r="5" fill="var(--foreground)" />
        </motion.g>
        <text x="30" y="115" fontSize="9" fill="var(--foreground-muted)">최소</text>
        <text x="160" y="115" fontSize="9" fill="var(--foreground-muted)">최적</text>
      </svg>
    </div>
  );
}

function GradeBar({ stat }: { stat: typeof GRADE_STATS[0] }) {
  return (
    <Card>
      <div className="px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-semibold">{stat.name}</h4>
          <span className="text-[10px] text-[var(--foreground-muted)]">스크리닝 기준: {stat.standard}</span>
        </div>
        <span className="text-[10px] text-[var(--foreground-muted)]">
          전체 <span className="font-semibold text-[var(--foreground)]">{stat.allAppliedPct}%</span> 적합 ({stat.allCount}명)
        </span>
      </div>
      <CardContent>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[var(--foreground-muted)] w-20 text-right">부적합 평균</span>
          <div className="flex-1 grid grid-cols-9 gap-1">
            {GRADE_LABELS.map((g, i) => {
              const isHighlight = i >= stat.highlightFrom && i <= stat.highlightTo;
              const isAvg = i === stat.avgIdx;
              return (
                <div key={g} className="flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 20, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className={`w-full rounded ${
                      isHighlight ? 'bg-[var(--success)]' : 'bg-[var(--gray-3)]'
                    }`}
                    style={{ opacity: isHighlight ? (0.4 + (i - stat.highlightFrom) * 0.15) : 1 }}
                  />
                  <span className={`text-[9px] ${isAvg ? 'font-semibold text-[var(--success)]' : 'text-[var(--foreground-muted)]'}`}>{g}</span>
                  {isAvg && (
                    <div className="flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-[var(--success)]" />
                      <span className="text-[8px] text-[var(--success)] font-semibold">적합 평균</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <span className="text-[10px] text-[var(--foreground-muted)] w-20">적합 평균</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function VerificationReport() {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Icon3D name="shield" size={36} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[var(--foreground-muted)]">부록</span>
                <span className="text-[10px] text-[var(--foreground-muted)]">|</span>
                <span className="text-sm font-semibold">전형 선발 기준</span>
              </div>
              <p className="text-[10px] text-[var(--foreground-muted)] mt-0.5">통합 검증 리포트 · 공정성·적합도 지표</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]">
              <Trash2 size={12} className="inline" />
            </button>
            <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]">
              <Download size={12} className="inline" />
            </button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <Card>
          <div className="px-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold">역량검사 전형 선발 기준</h3>
            <div className="flex items-center gap-2 text-[10px] text-[var(--foreground-muted)]">
              <span>마이다스 2025년 하반기 신입 채용</span>
              <span>·</span>
              <span>2025.09.01 ~ 2025.09.30</span>
            </div>
          </div>
          <CardContent className="flex flex-col gap-4">
            <div className="text-[11px] text-[var(--foreground-muted)]">
              <span>지원자 스크리닝 : 신입 스크리닝 기준</span>
            </div>

            {/* Success banner */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-[var(--success)]/10"
            >
              <CheckCircle2 size={14} className="text-[var(--success)]" />
              <span className="text-xs text-[var(--foreground)]">
                역량검사 전형 전체 대상자 1800명 중 <strong className="text-[var(--success)]">1000명 적합</strong>
              </span>
            </motion.div>

            {/* 게이지 + 기준 */}
            <div className="grid grid-cols-12 gap-4 p-4 rounded-lg border border-[var(--border)]">
              <div className="col-span-12 md:col-span-4 flex items-center justify-center">
                <GaugeSpeedometer />
              </div>
              <div className="col-span-12 md:col-span-8 flex flex-col gap-2.5 justify-center">
                {[
                  { label: '인재 조건', result: '최적 부합', tone: 'success', text: '조직이 지향하는 인재상에 부합하는 역량을 갖춘 인원을 선발합니다.' },
                  { label: '직무 조건', result: '조건 충족', tone: 'warning', text: '직무에서 요구하는 역량을 균형 있게 갖춘 인원을 선발합니다.' },
                  { label: '상황 조건', result: '부적합 제외', tone: 'error', text: '기대하는 특성의 기본 요건을 만족하지 못하는 인원을 제외합니다.' },
                ].map(c => (
                  <motion.div
                    key={c.label}
                    whileHover={{ x: 2 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 size={12} className="text-[var(--success)] mt-0.5 shrink-0" />
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium">{c.label}</span>
                      <Badge variant={c.tone as any} className="text-[10px]">{c.result}</Badge>
                      <span className="text-[11px] text-[var(--foreground-muted)]">{c.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 등급별 바 차트 그리드 */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GRADE_STATS.map(s => (
                <StaggerItem key={s.name}>
                  <GradeBar stat={s} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* 추가 지표 */}
            <div className="grid grid-cols-2 gap-3">
              {EXTRA_STATS.map(s => (
                <Card key={s.name} className="h-full">
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold">{s.name}</div>
                      {s.standard && (
                        <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">스크리닝 기준: {s.standard}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-[var(--foreground-muted)]">전체</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-semibold text-[var(--success)]">{s.pct}%</span>
                        <span className="text-[10px] text-[var(--foreground-muted)]">적합</span>
                      </div>
                      <div className="text-[10px] text-[var(--foreground-subtle)]">({s.count}명)</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
