import { motion } from 'motion/react';
import { RefreshCw, TrendingUp, Users, BarChart3, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/page-transition';

// h.place 1_154 — 역량검사 전형 인사이트
const HEADER_KPI = [
  { label: '전체', value: '2,540', range: '26.03.25 ~ 26.04.16' },
  { label: '역량검사 응시', value: '2,540', sub: '+ 30명', range: '26.03.25 ~ 26.04.16' },
  { label: '[역량검사] 평가 합격', value: '00', sub: '00%', range: '26.03.25 ~ 26.04.16', highlight: true },
];

const STATUS_KPI = [
  { label: '역량검사 미응시', value: 10, tone: 'warning' },
  { label: '응시 포기', value: 10, tone: 'error' },
  { label: '자격 미달', value: 24, tone: 'warning' },
  { label: '대기', value: 10, tone: 'secondary' },
  { label: '예비합격', value: 10, tone: 'success' },
];

const APPLICANTS = [
  { id: '0001-010121', name: '김정림', score: 85, grade: 'A-', result: '합격' },
  { id: '0001-000765', name: '이미원', score: 80, grade: 'B+', result: '합격' },
  { id: '0001-000332', name: '백서진', score: 70, grade: 'B', result: '합격' },
  { id: '0001-000780', name: '최음진', score: 55, grade: 'C+', result: '불합격' },
  { id: '0001-000252', name: '차인', score: 50, grade: 'C+', result: '대기중' },
  { id: '0001-000320', name: '황지아', score: 60, grade: 'B-', result: '대기중' },
  { id: '0001-000195', name: '원상지', score: 55, grade: 'C+', result: '대기중' },
];

const AI_CHAT = [
  { role: 'user', text: '지원자별 역량검사 합격 여부 확인' },
  { role: 'ai', text: '2025년 하반기 신입전형 채용의 전체 역량검사 응시율은 42명, 이력서를 지원하는 128명은 역검을 완료한 42.5%입니다.' },
];

const AI_TABLE = [
  { label: '응시자 수', value: '42명' },
  { label: '합격자 수', value: '128명' },
  { label: '합격 완료율', value: '24.7%' },
];

export default function CompetencyInsight() {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">진행중</Badge>
            <h3 className="text-sm font-semibold">2026 상반기 마이다스 공개채용 · 역량검사 전형 인사이트</h3>
            <Button variant="outline" size="xs"><RefreshCw size={11} /> 업데이트</Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-4">
          {/* 상단 KPI */}
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-3 gap-3">
              {HEADER_KPI.map((k, i) => (
                <Card key={i} className={`h-full ${k.highlight ? 'bg-[var(--gray-3)]/50' : ''}`}>
                  <CardContent>
                    <div className="text-[10px] text-[var(--foreground-muted)] line-clamp-1">{k.label}</div>
                    <div className="text-[10px] text-[var(--foreground-subtle)] mt-0.5">{k.range}</div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-semibold tabular-nums">{k.value}</span>
                      {k.sub && <span className="text-[10px] text-[var(--success)]">{k.sub}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* 상태 KPI */}
          <FadeIn delay={0.08}>
            <Card className="h-full">
              <CardContent className="grid grid-cols-5 gap-4">
                {STATUS_KPI.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[10px] text-[var(--foreground-muted)]">{s.label}</div>
                    <div className="mt-1 flex items-baseline justify-center gap-0.5">
                      <Badge variant={s.tone as any} className="text-[10px]">{s.value}</Badge>
                      <span className="text-[9px] text-[var(--foreground-muted)]">명</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>

          {/* 지원자 테이블 */}
          <FadeIn delay={0.1}>
            <Card className="h-full py-0">
              <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-semibold">지원자 현황</h4>
                  <Badge variant="secondary" className="text-[10px]">{APPLICANTS.length}명</Badge>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[var(--foreground-muted)]">
                  <span>정렬</span>
                  <span>·</span>
                  <span>필터</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--gray-3)]">
                    <tr>
                      {['이름', '수험번호', '점수', '등급', '결과'].map(h => (
                        <th key={h} className="px-3 py-2 text-[10px] font-medium text-[var(--foreground-muted)] text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {APPLICANTS.map((a, i) => (
                      <motion.tr
                        key={a.id}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-t border-[var(--border)] hover:bg-[var(--gray-3)] transition-colors"
                      >
                        <td className="px-3 py-2 text-xs font-medium">{a.name}</td>
                        <td className="px-3 py-2 text-[11px] text-[var(--foreground-muted)]">{a.id}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-10 h-1 rounded-full bg-[var(--gray-3)] overflow-hidden">
                              <div className="h-full bg-[var(--primary)]" style={{ width: `${a.score}%` }} />
                            </div>
                            <span className="text-[11px] font-semibold tabular-nums">{a.score}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <Badge variant="outline" className="text-[10px]">{a.grade}</Badge>
                        </td>
                        <td className="px-3 py-2">
                          <Badge
                            variant={a.result === '합격' ? 'success' : a.result === '불합격' ? 'error' : 'warning'}
                            className="text-[10px]"
                          >
                            {a.result}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* 우측 AI 채팅 */}
        <FadeIn delay={0.15} className="col-span-12 xl:col-span-3">
          <Card className="h-full py-0 flex flex-col">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-semibold">새 AI 채팅</span>
              <Button variant="ghost" size="icon-xs"><RefreshCw size={11} /></Button>
            </div>
            <div className="flex-1 overflow-auto px-4 py-3 flex flex-col gap-3">
              {AI_CHAT.map((m, i) => {
                if (m.role === 'user') {
                  return (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[88%] rounded-lg px-3 py-2 text-xs bg-[var(--gray-3)]">
                        {m.text}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="text-xs leading-relaxed text-[var(--foreground)]">
                    {m.text}
                  </div>
                );
              })}

              {/* 인라인 표 */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md border border-[var(--border)] overflow-hidden"
              >
                <div className="px-2.5 py-1.5 bg-[var(--gray-3)] text-[10px] font-semibold flex items-center gap-1">
                  <BarChart3 size={10} />
                  지원서 제출 완료 확인
                </div>
                {AI_TABLE.map((r, i) => (
                  <div key={i} className="px-2.5 py-1.5 flex items-center justify-between text-[10px] border-t border-[var(--border)]">
                    <span className="text-[var(--foreground-muted)]">{r.label}</span>
                    <span className="font-semibold tabular-nums">{r.value}</span>
                  </div>
                ))}
              </motion.div>

              <div className="flex flex-col gap-1.5 mt-1">
                <Button variant="outline" size="xs">✓ 지원서 미 제출 지원자 확인하기</Button>
                <Button variant="outline" size="xs">📨 지원서 작성 안내 독려 발송하기</Button>
              </div>
            </div>
            <div className="p-2 border-t border-[var(--border)]">
              <input
                placeholder="언제든지 질문해주세요"
                className="w-full h-8 px-2.5 text-[11px] rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
