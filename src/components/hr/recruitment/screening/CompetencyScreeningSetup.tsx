import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, Info, ChevronDown, ChevronUp, ClipboardCheck, FileText,
  Megaphone, Globe, Video, ClipboardList, AlertCircle, Target, Briefcase,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// h.place 1_176 — 역량검사 스크리닝 설정
const STEPS = [
  { icon: ClipboardList, label: '인재 조건 설정', active: false },
  { icon: Megaphone, label: '채용 프로세스 설정', active: false },
  { icon: FileText, label: '지원서 설정', active: false },
  { icon: Globe, label: '채용 공고문 설정', active: false },
  { icon: Sparkles, label: '인재 조건 자동 심사', active: true },
  { icon: ClipboardCheck, label: '지원서 자동 심사', active: false },
  { icon: Video, label: '대면 면접 질문 생성', active: false },
  { icon: Sparkles, label: '채용 성과 리포트', active: false },
];

const GRADES = ['C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S'];

function Gauge() {
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[240px]">
      <path d="M 20 100 A 80 80 0 0 1 60 30" stroke="var(--error)" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M 60 30 A 80 80 0 0 1 140 30" stroke="var(--warning)" strokeWidth="14" fill="none" opacity="0.35" />
      <path d="M 140 30 A 80 80 0 0 1 180 100" stroke="var(--success)" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.65" />
      <motion.g
        initial={{ rotate: -90 }}
        animate={{ rotate: 20 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ transformOrigin: '100px 100px' }}
      >
        <line x1="100" y1="100" x2="100" y2="40" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="100" r="5" fill="var(--foreground)" />
      </motion.g>
      <text x="30" y="115" fontSize="9" fill="var(--foreground-muted)">부적합</text>
      <text x="160" y="115" fontSize="9" fill="var(--foreground-muted)">적합</text>
    </svg>
  );
}

export default function CompetencyScreeningSetup() {
  const [gradeIdx, setGradeIdx] = useState(4); // B+ 기본
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ persona: true, job: false });

  return (
    <div className="grid grid-cols-12 gap-4 min-h-[560px]">
      {/* 좌측 학습 패널 */}
      <div className="col-span-12 lg:col-span-3">
        <Card className="h-full bg-[var(--success)]/8 border-[var(--success)]/20">
          <CardContent className="flex flex-col gap-3">
            <h3 className="text-base font-semibold leading-snug">
              역량검사 전형에서<br />
              인재 조건에 맞는 지원자를<br />
              바로 확인할 수 있어요.
            </h3>
            <p className="text-[11px] text-[var(--foreground-muted)]">
              심사 결과는 역량검사 전형 결과 &gt; 스마트 스크리닝에서 확인하실 수 있어요.
            </p>

            <div className="flex flex-col gap-1 mt-2">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-[11px] transition-colors ${
                      s.active ? 'bg-[var(--card)] font-semibold' : 'text-[var(--foreground-muted)] hover:bg-[var(--card)]/50'
                    }`}
                  >
                    <Icon size={12} strokeWidth={1.75} />
                    <span>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 lg:col-span-9 flex flex-col gap-3">
        <h3 className="text-sm font-semibold">
          설정한 인재 조건에 따라 적합한 지원자를 자동으로 심사할 수 있어요.
        </h3>

        {/* 상단 배너 */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 rounded-md bg-[var(--card)] border border-[var(--border)]"
        >
          <span className="text-xs">
            전체 지원자 중 <span className="font-semibold text-[var(--success)]">상위 10%</span>의 인원이 선발될 것으로 예상됩니다.
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-[var(--error)]">
            <AlertCircle size={11} /> 선발 인원이 제한될 수 있습니다.
          </span>
        </motion.div>

        {/* 게이지 + 조건 */}
        <Card className="h-full">
          <CardContent>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4 flex items-center justify-center">
                <Gauge />
              </div>
              <div className="col-span-12 md:col-span-8 flex flex-col gap-2">
                {[
                  { label: '인재 조건', tone: 'success', result: '우수', text: '조직이 지향하는 인재상에 부합하는 역량을 갖춘 인원을 선발합니다.' },
                  { label: '직무 조건', tone: 'success', result: '적합', text: '직무에서 요구하는 역량을 균형 있게 갖춘 인원을 선발합니다.' },
                  { label: '상황 조건', tone: 'warning', result: '부적합 제외', text: '기대하는 특성의 기본 요건을 만족하지 못하는 인원을 제외합니다.' },
                ].map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <Badge variant="outline" className="text-[10px] shrink-0">{c.label}</Badge>
                    <Badge variant={c.tone as any} className="text-[10px] shrink-0">{c.result}</Badge>
                    <span className="text-[11px] text-[var(--foreground-muted)]">{c.text}</span>
                  </motion.div>
                ))}
                <div className="mt-1 flex items-start gap-1 text-[10px] text-[var(--foreground-muted)]">
                  <Info size={10} className="mt-0.5 shrink-0" />
                  <span>조건 충족도가 낮은 일부 인원이 제외되며, 기본 요건을 충족한 인원이 합격 처리됩니다.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 인재상 기반 조건 */}
        <Card className="h-full">
          <button
            onClick={() => setExpanded({ ...expanded, persona: !expanded.persona })}
            className="w-full px-6 py-3 flex items-center justify-between bg-[var(--success)]/8"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[var(--card)] flex items-center justify-center">
                <Target size={12} className="text-[var(--success)]" />
              </div>
              <span className="text-sm font-semibold">인재상 기반 조건</span>
            </div>
            {expanded.persona ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          {expanded.persona && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
            >
              <CardContent className="flex flex-col gap-3 pt-4">
                <div className="flex items-center gap-2">
                  <button className="relative w-9 h-5 rounded-full bg-[var(--success)]">
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white" />
                  </button>
                  <div>
                    <div className="text-xs font-semibold">인재상 등급</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">
                      인재상과 핵심가치를 바탕으로 도출된 역량의 평가 점수를 기준으로 부여된 등급으로 우리 회사의 가치에 부합하는 기준으로 인재를 선발할 수 있습니다.
                    </div>
                  </div>
                </div>

                {/* 등급 슬라이더 */}
                <div className="relative pt-6 pb-2 px-1">
                  <div className="h-2 rounded-full bg-[var(--gray-3)] relative overflow-hidden">
                    <motion.div
                      className="h-full bg-[var(--success)]"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((8 - gradeIdx) / 8) * 100}%`, marginLeft: `${(gradeIdx / 8) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <motion.div
                    animate={{ left: `${(gradeIdx / 8) * 100}%` }}
                    className="absolute top-0 -translate-x-1/2"
                  >
                    <div className="flex flex-col items-center">
                      <Badge variant="success" className="text-[10px] whitespace-nowrap">{GRADES[gradeIdx]} 이상</Badge>
                      <div className="w-0.5 h-3 bg-[var(--success)]" />
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-[var(--success)]" />
                    </div>
                  </motion.div>

                  <div className="flex justify-between mt-4">
                    {GRADES.map((g, i) => (
                      <button
                        key={g}
                        onClick={() => setGradeIdx(i)}
                        className={`text-[10px] transition-colors ${
                          i === gradeIdx ? 'font-semibold text-[var(--foreground)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-[var(--foreground-subtle)]">
                    <span>낮음 →</span>
                    <span>← 높음</span>
                  </div>
                </div>

                <div className="flex items-start gap-1 text-[10px] text-[var(--foreground-muted)]">
                  <Info size={10} className="mt-0.5 shrink-0" />
                  <span>조건 충족도가 낮은 일부 인원이 제외되며, 기본 요건을 충족한 인원이 합격 처리됩니다.</span>
                </div>

                <button className="text-[10px] text-[var(--foreground-muted)] hover:text-[var(--foreground)] self-center flex items-center gap-0.5">
                  자세히 보기 <ChevronDown size={10} />
                </button>
              </CardContent>
            </motion.div>
          )}
        </Card>

        {/* 직군·직무 기반 조건 */}
        <Card className="h-full">
          <button
            onClick={() => setExpanded({ ...expanded, job: !expanded.job })}
            className="w-full px-6 py-3 flex items-center justify-between bg-[var(--success)]/8"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[var(--card)] flex items-center justify-center">
                <Briefcase size={12} className="text-[var(--success)]" />
              </div>
              <span className="text-sm font-semibold">직군·직무 기반 조건</span>
            </div>
            {expanded.job ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          {expanded.job && (
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <button className="relative w-9 h-5 rounded-full bg-[var(--success)]">
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white" />
                </button>
                <div>
                  <div className="text-xs font-semibold">직군·직무 등급</div>
                  <div className="text-[10px] text-[var(--foreground-muted)]">
                    직군과 직무 조건을 기반으로 도출된 역량의 평가 점수를 기준으로 부여된 등급으로 실무에 필요한 역량을 확인하고 인재를 선발할 수 있습니다.
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
