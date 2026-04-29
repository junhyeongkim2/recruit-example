import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, Info, Plus, ChevronDown, Minus, ClipboardCheck, FileText,
  Megaphone, Globe, Video, ClipboardList,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// h.place 1_171 — 서류 전형 스크리닝 조건 설정 (테이블 전체)
const CONDITIONS = [
  { main: '인적사항', sub: '취업우대', subsub: '보훈여부', cond1: '대상', cond2: '5%', type: '적합', result: '부적합', score: '-' },
  { main: '인적사항', sub: '신체정보', subsub: '색맹여부', cond1: '대상', cond2: '적색약', type: '가점', result: '감점', score: '3점' },
  { main: '어학/자격/기타', sub: '어학능력', subsub: '외국어 활용 능력', cond1: '영어', cond2: '회화', type: '가점', result: '감점', score: '1점' },
  { main: '어학/자격/기타', sub: '자격', subsub: '자격증', cond1: '산업안전기사 외 5개', cond2: '보유', type: '가점', result: '감점', score: '1점' },
  { main: '학력사항', sub: '종합점수', subsub: '', cond1: '5점', cond2: '이상', type: '적합', result: '부적합', score: '-' },
  { main: '', sub: '최종학력', subsub: '구분', cond1: '학사', cond2: '', type: '가점', result: '', score: '3점' },
  { main: '', sub: '대학원', subsub: '학교명', cond1: '한국대학교 외 10개', cond2: '', type: '가점', result: '', score: '2점' },
  { main: '', sub: '대학교', subsub: '학교명', cond1: '한국대학교 경영/경제학 외 ...', cond2: '', type: '가점', result: '', score: '1점' },
  { main: '경력', sub: '경력사항', subsub: '총 경력', cond1: '3년', cond2: '이상', type: '가점', result: '감점', score: '1점' },
  { main: '가점/감점 총합', sub: '', subsub: '', cond1: '10점', cond2: '이상', type: '적합', result: '부적합', score: '-' },
];

const STEPS = [
  { icon: ClipboardList, label: '인재 조건 설정', active: false },
  { icon: Megaphone, label: '채용 프로세스 설정', active: false },
  { icon: FileText, label: '지원서 설정', active: false },
  { icon: Globe, label: '채용 공고문 설정', active: false },
  { icon: Sparkles, label: '인재 조건 자동 심사', active: false },
  { icon: ClipboardCheck, label: '지원서 자동 심사', active: true },
  { icon: Video, label: '대면 면접 질문 생성', active: false },
  { icon: Sparkles, label: '채용 성과 리포트', active: false },
];

export default function ScreeningConditionDesigner() {
  const [useTotal, setUseTotal] = useState(true);

  return (
    <div className="grid grid-cols-12 gap-4 min-h-[560px]">
      {/* 좌측 학습 패널 */}
      <div className="col-span-12 lg:col-span-3">
        <Card className="h-full bg-[var(--success)]/8 border-[var(--success)]/20">
          <CardContent className="flex flex-col gap-3">
            <h3 className="text-base font-semibold leading-snug">
              서류 전형에서 지원자를<br />
              자동 심사할 수 있어요.
            </h3>
            <p className="text-[11px] text-[var(--foreground-muted)]">
              심사 결과는 지원자 관리 메뉴에서 확인하실 수 있어요.
            </p>

            <div className="flex flex-col gap-1 mt-2">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-[11px] transition-colors ${
                      s.active
                        ? 'bg-[var(--card)] font-semibold'
                        : 'text-[var(--foreground-muted)] hover:bg-[var(--card)]/50'
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

      {/* 메인 */}
      <div className="col-span-12 lg:col-span-9 flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-semibold">
            가점/감점 및 적합/부적합 조건을 추가하여<br />
            서류 전형에서 지원자들을 자동으로 심사할 수 있어요.
          </h3>
        </div>

        <Card className="h-full">
          <CardContent className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-[var(--foreground-muted)]">명칭</label>
                <input
                  type="text"
                  defaultValue="기본 심사 템플릿"
                  className="w-full mt-1 h-8 px-2.5 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[var(--foreground-muted)]">점수 계산 방식</label>
                <div className="mt-1 h-8 px-2.5 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                  <span>최대/최소값 계산</span>
                  <ChevronDown size={11} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-0 flex-1">
          <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold">조건 설정</h4>
              <Info size={11} className="text-[var(--foreground-subtle)]" />
            </div>
            <div className="flex items-center gap-1.5">
              <label className="flex items-center gap-1 text-[11px] cursor-pointer">
                <button
                  onClick={() => setUseTotal(!useTotal)}
                  className={`relative w-7 h-4 rounded-full transition-colors ${
                    useTotal ? 'bg-[var(--success)]' : 'bg-[var(--gray-4)]'
                  }`}
                >
                  <motion.span
                    layout
                    className="absolute top-0.5 w-3 h-3 rounded-full bg-white"
                    animate={{ left: useTotal ? '14px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
                <span>점수 종합 조건 추가</span>
              </label>
              <Button variant="outline" size="xs"><Plus size={10} /> 적합/부적합 조건 추가</Button>
              <Button variant="outline" size="xs"><Plus size={10} /> 가점/감점 조건 추가</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--gray-3)]">
                <tr>
                  {['대분류', '중분류', '소분류', '조건1', '조건2', '기준 조건', '점수', '예시'].map(h => (
                    <th key={h} className="px-3 py-2 text-[10px] font-medium text-[var(--foreground-muted)] text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONDITIONS.map((c, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-t border-[var(--border)] hover:bg-[var(--gray-3)] ${
                      c.main === '가점/감점 총합' ? 'bg-[var(--primary)]/5' : ''
                    }`}
                  >
                    <td className="px-3 py-2">
                      {c.main && (
                        <div className="flex items-center gap-1">
                          {c.main !== '가점/감점 총합' && <Minus size={10} className="text-[var(--foreground-subtle)]" />}
                          <span className={`text-[11px] ${c.main === '가점/감점 총합' ? 'font-semibold text-[var(--primary)]' : ''}`}>{c.main}</span>
                          {c.main !== '가점/감점 총합' && <ChevronDown size={10} className="text-[var(--foreground-subtle)]" />}
                        </div>
                      )}
                      {!c.main && <Plus size={10} className="text-[var(--foreground-subtle)]" />}
                    </td>
                    <td className="px-3 py-2">
                      {c.sub && (
                        <div className="flex items-center gap-1 text-[11px]">
                          <Minus size={10} className="text-[var(--foreground-subtle)]" />
                          <span>{c.sub}</span>
                          <ChevronDown size={10} className="text-[var(--foreground-subtle)]" />
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 text-[11px]">{c.subsub}</td>
                    <td className="px-3 py-2 text-[11px]">
                      {c.cond1 && (
                        <div className="flex items-center gap-1">
                          <span className="truncate">{c.cond1}</span>
                          <ChevronDown size={10} className="text-[var(--foreground-subtle)] shrink-0" />
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 text-[11px]">
                      {c.cond2 && (
                        <div className="flex items-center gap-1">
                          <span className="truncate">{c.cond2}</span>
                          <ChevronDown size={10} className="text-[var(--foreground-subtle)] shrink-0" />
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <Badge variant={c.type === '적합' ? 'success' : 'warning'} className="text-[9px]">{c.type}</Badge>
                        {c.result && (
                          <Badge variant={c.result === '부적합' ? 'error' : 'secondary'} className="text-[9px]">{c.result}</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-[11px] font-medium">{c.score}</td>
                    <td className="px-3 py-2">
                      <Info size={11} className="text-[var(--foreground-subtle)]" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-[var(--border)] flex items-center justify-end">
            <Button size="sm">다음</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
