import { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2, AlertCircle, Clock3, Send, BarChart3, Users, Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

const EVALUATORS = [
  { name: 'bentley.jun', role: '주담당', assigned: 12, done: 12, pct: 100 },
  { name: 'may.kim', role: 'HR BP', assigned: 12, done: 10, pct: 83 },
  { name: 'j.park', role: '팀 리드', assigned: 8, done: 5, pct: 63 },
  { name: 'sue.park', role: '디자인 리드', assigned: 6, done: 6, pct: 100 },
  { name: 'daniel.choi', role: 'QA 리드', assigned: 8, done: 2, pct: 25 },
  { name: 'jay.lee', role: '백엔드 시니어', assigned: 10, done: 8, pct: 80 },
];

const CANDIDATES_EVAL = [
  { name: '이도윤', position: '백엔드', done: 3, total: 3, avg: 4.3, recommend: '강력 추천', tone: 'success' },
  { name: '정유진', position: '백엔드', done: 2, total: 3, avg: 4.0, recommend: '추천', tone: 'success' },
  { name: '최민호', position: '백엔드', done: 3, total: 3, avg: 4.7, recommend: '강력 추천', tone: 'success' },
  { name: '임채원', position: '프론트', done: 1, total: 2, avg: 3.5, recommend: '검토 중', tone: 'warning' },
  { name: '박지우', position: '백엔드', done: 2, total: 3, avg: 3.2, recommend: '보류', tone: 'warning' },
  { name: '송지훈', position: 'HR 분석', done: 2, total: 2, avg: 4.2, recommend: '추천', tone: 'success' },
];

export default function EvaluationCollect() {
  const [selectedEvaluators, setSelectedEvaluators] = useState<Set<string>>(new Set());

  const totalAssigned = EVALUATORS.reduce((s, e) => s + e.assigned, 0);
  const totalDone = EVALUATORS.reduce((s, e) => s + e.done, 0);
  const overallPct = Math.round((totalDone / totalAssigned) * 100);

  const toggle = (name: string) => {
    const next = new Set(selectedEvaluators);
    next.has(name) ? next.delete(name) : next.add(name);
    setSelectedEvaluators(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                <BarChart3 size={16} className="text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">평가 수집 · 집계</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  평가자 진행률 · 지원자별 집계 · 결정 지원
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={selectedEvaluators.size === 0}>
                <Send size={14} /> 독려 발송 ({selectedEvaluators.size})
              </Button>
              <Button size="sm"><CheckCircle2 size={14} /> 평가 마감</Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* 전체 진행률 */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-4 gap-3">
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">전체 진행률</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold">{overallPct}</span>
                <span className="text-sm text-[var(--foreground-muted)]">%</span>
              </div>
              <div className="h-1.5 mt-2 rounded-full bg-[var(--gray-3)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--success)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallPct}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">평가 완료</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold">{totalDone}</span>
                <span className="text-sm text-[var(--foreground-muted)]">/ {totalAssigned}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">미제출 평가자</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold text-[var(--warning)]">
                  {EVALUATORS.filter(e => e.pct < 100).length}
                </span>
                <span className="text-sm text-[var(--foreground-muted)]">명</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">평균 평가 점수</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold">4.1</span>
                <span className="text-sm text-[var(--foreground-muted)]">/ 5.0</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 평가자별 진행률 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-[var(--primary)]" />
                <h3 className="text-sm font-semibold">평가자 진행률</h3>
              </div>
              <Badge variant="secondary" className="text-[10px]">{EVALUATORS.length}명</Badge>
            </div>
            <CardContent className="flex flex-col gap-1.5">
              {EVALUATORS.map(ev => (
                <motion.label
                  key={ev.name}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-3 p-2.5 rounded-md border border-[var(--border)] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedEvaluators.has(ev.name)}
                    onChange={() => toggle(ev.name)}
                    className="rounded"
                  />
                  <div className="w-7 h-7 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                    {ev.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-medium truncate">{ev.name}</div>
                      {ev.pct < 50 && <Badge variant="error" className="text-[9px]">지연</Badge>}
                      {ev.pct >= 50 && ev.pct < 100 && <Badge variant="warning" className="text-[9px]">진행 중</Badge>}
                      {ev.pct === 100 && <Badge variant="success" className="text-[9px]">완료</Badge>}
                    </div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">{ev.role}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 rounded-full bg-[var(--gray-3)] overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            ev.pct === 100 ? 'bg-[var(--success)]' : ev.pct >= 50 ? 'bg-[var(--primary)]' : 'bg-[var(--warning)]'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${ev.pct}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <span className="text-[10px] text-[var(--foreground-muted)] w-14 text-right">
                        {ev.done}/{ev.assigned}
                      </span>
                    </div>
                  </div>
                </motion.label>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 지원자별 평가 집계 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[var(--primary)]" />
                <h3 className="text-sm font-semibold">지원자별 평가 집계</h3>
              </div>
              <Button variant="outline" size="xs">AI 결정 추천</Button>
            </div>
            <CardContent className="flex flex-col gap-2">
              {CANDIDATES_EVAL.map(c => (
                <motion.div
                  key={c.name}
                  whileHover={{ x: 2 }}
                  className="grid grid-cols-[auto_1fr_80px_120px_80px] items-center gap-3 p-3 rounded-md border border-[var(--border)]"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">{c.position}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[10px] text-[var(--foreground-muted)]">수집</div>
                    <div className="text-xs font-semibold">{c.done}/{c.total}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden">
                      <div className="h-full bg-[var(--primary)]" style={{ width: `${(c.avg / 5) * 100}%` }} />
                    </div>
                    <span className="text-xs font-semibold">{c.avg}</span>
                  </div>
                  <Badge variant={c.tone as any} className="text-[10px]">{c.recommend}</Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
