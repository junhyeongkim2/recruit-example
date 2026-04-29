import { motion } from 'motion/react';
import { TrendingUp, RefreshCw, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/page-transition';

// h.place 실물: "이번 채용, 어떤 결과를 만들었을까요?" — 5단계 대형 숫자 + area chart
const FUNNEL = [
  { label: '접수', days: '14일', range: '2025.03.24 - 2025.04.07', pct: 100, total: 2000, height: 100 },
  { label: '역량검사 전형', days: '14일', range: '2025.03.24 - 2025.04.07', pct: 90, total: 1800, height: 85 },
  { label: '서류 전형', days: '2일', range: '2025.04.08 - 2025.04.10', pct: 50, total: 1000, height: 55 },
  { label: '면접 전형', days: '3일', range: '2025.04.11 - 2025.04.14', pct: 10, total: 200, height: 20 },
  { label: '채용 합격', days: '5일', range: '2025.04.15 - 2025.04.20', pct: 2.5, total: 50, height: 8 },
];

const INFLOW_CHANNELS = [
  { day: 1, v: 12 }, { day: 2, v: 18 }, { day: 3, v: 25 }, { day: 4, v: 42 },
  { day: 5, v: 38 }, { day: 6, v: 55 }, { day: 7, v: 48 }, { day: 8, v: 62 },
  { day: 9, v: 58 }, { day: 10, v: 72 }, { day: 11, v: 65 }, { day: 12, v: 80 },
];

const CAREER_DONUT = [
  { label: '경력 없음', pct: 45, color: 'var(--primary)' },
  { label: '1년 이하', pct: 25, color: 'var(--success)' },
  { label: '1-3년', pct: 15, color: 'var(--warning)' },
  { label: '3-7년', pct: 10, color: 'var(--error)' },
  { label: '7년 이상', pct: 5, color: 'var(--foreground-muted)' },
];

const AI_MESSAGES = [
  { role: 'user', text: '이번 공채의 모집 채널 효과성에 대해 평가해줘.' },
  {
    role: 'ai',
    text: '채용 결과에 모집 채널별로 지원자 유입 및 합격자 분포도를 분석해 드렸어요.',
  },
  { role: 'ai', card: { title: '모집 채널 효과성 분석', content: '지원자 유입 효과성 측면에서는 링크드인이 최상 규모(840명)를 보이며, 잡코리아(380명), 원티드(300명)가 뒤를 이었습니다.\n\n합격자 분포 측면에서는 잡코리아 32명이 최상 규모이며 링크드인은 11명, 리멤버 4명, 잡다 2명, 원티드 1명이 있어요.' } },
  { role: 'user', text: '어떤 공고를서의 모집 공고를 채용 비교해줘.' },
  { role: 'ai', text: '경력별 유입 채널과 양상별 합격자 분포도의 놀라 점수에 따라보았어요.\n\n지금 유입한 경력별 이력자 분포를 해당 채용 공고의 선발군과 비교해야 경력 최종 선발 감안이 크게 기여하게 했어요.\n\n다만 그 인재 완전 이 인재가 더 높은 확률로 30대 이하 비중이 더 크게 증가한다고 보이고요. 30대 이하 비율에서 경력자 남자 비중이 조금 크게 부분되어 나오네요.' },
];

function AreaChart() {
  // 퍼널을 area chart로
  const points = FUNNEL.map((f, i) => `${(i / (FUNNEL.length - 1)) * 100},${100 - f.height}`).join(' ');
  const areaPath = `M 0,${100 - FUNNEL[0].height} L ${points.split(' ').map(p => p).join(' L ')} L 100,100 L 0,100 Z`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      {FUNNEL.map((f, i) => (
        <motion.circle
          key={i}
          cx={(i / (FUNNEL.length - 1)) * 100}
          cy={100 - f.height}
          r="1.2"
          fill="var(--primary)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.08 }}
        />
      ))}
    </svg>
  );
}

export default function StrategyReport() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-4">
          {/* 타이틀 */}
          <FadeIn>
            <div className="text-center py-3">
              <h2 className="text-[22px] font-semibold tracking-tight">
                이번 채용, 어떤 결과를 만들었을까요?
              </h2>
            </div>
          </FadeIn>

          {/* 5단계 대형 숫자 + area chart */}
          <FadeIn delay={0.05}>
            <Card className="py-0 overflow-hidden">
              <div className="px-4 pt-4 grid grid-cols-5 gap-2">
                {FUNNEL.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex flex-col items-center text-center p-2"
                  >
                    <div className="text-[10px] text-[var(--foreground-muted)]">{f.label}</div>
                    <div className="text-sm font-medium mt-0.5">{f.days}</div>
                    <div className="text-[9px] text-[var(--foreground-subtle)] mt-0.5">{f.range}</div>
                    <div className="mt-2 text-[28px] font-semibold leading-none tabular-nums">
                      {f.pct}<span className="text-base text-[var(--foreground-muted)]">%</span>
                    </div>
                    <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{f.total.toLocaleString()}명</div>
                  </motion.div>
                ))}
              </div>
              <div className="h-[180px] relative">
                <AreaChart />
              </div>
            </Card>
          </FadeIn>

          {/* 하단 유입/분포 */}
          <div className="grid grid-cols-2 gap-3">
            <FadeIn delay={0.15}>
              <Card className="h-full">
                <div className="px-6 flex items-center justify-between">
                  <h4 className="text-sm font-semibold">지원자 유입</h4>
                  <span className="text-[10px] text-[var(--foreground-muted)]">신규 유입 지원자 수</span>
                </div>
                <CardContent>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold tabular-nums">268</span>
                    <span className="text-xs text-[var(--foreground-muted)]">명</span>
                    <span className="text-[10px] text-[var(--success)] ml-2 flex items-center gap-0.5">
                      <TrendingUp size={10} /> +34명
                    </span>
                  </div>
                  <div className="h-16 mt-2">
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                      <motion.polyline
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                        points={INFLOW_CHANNELS.map((c, i) => `${(i / (INFLOW_CHANNELS.length - 1)) * 100},${40 - (c.v / 80) * 35}`).join(' ')}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="h-full">
                <div className="px-6 flex items-center justify-between">
                  <h4 className="text-sm font-semibold">전체 지원자 경력 분포</h4>
                  <span className="text-[10px] text-[var(--foreground-muted)]">경력자 이상 지원 비율</span>
                </div>
                <CardContent className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      {CAREER_DONUT.reduce<{ offset: number; nodes: any[] }>(
                        (acc, d, i) => {
                          const len = (d.pct / 100) * 100;
                          acc.nodes.push(
                            <motion.circle
                              key={i}
                              cx="18" cy="18" r="15.915"
                              fill="none"
                              stroke={d.color}
                              strokeWidth="4"
                              strokeDasharray={`${len} 100`}
                              strokeDashoffset={-acc.offset}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                            />
                          );
                          acc.offset += len;
                          return acc;
                        },
                        { offset: 0, nodes: [] }
                      ).nodes}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-sm font-semibold tabular-nums">268</div>
                      <div className="text-[8px] text-[var(--foreground-muted)]">명</div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    {CAREER_DONUT.slice(0, 3).map(d => (
                      <div key={d.label} className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                          <span className="text-[var(--foreground-muted)]">{d.label}</span>
                        </div>
                        <span className="font-medium">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* 하단 상세 */}
          <FadeIn delay={0.25}>
            <Card className="h-full">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">마이다스 2025년 하반기 신입 채용</span>
                      <Badge variant="outline" className="text-[10px]">완료</Badge>
                    </div>
                    <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">2025.09.01 - 2025.09.30</div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div><span className="text-[var(--foreground-muted)]">전체 지원자 </span><span className="font-semibold tabular-nums">2,500</span>명</div>
                    <div><span className="text-[var(--foreground-muted)]">지원자 제출 </span><span className="font-semibold tabular-nums">2,000</span>명</div>
                    <div><span className="text-[var(--foreground-muted)]">지원자 미제출 </span><span className="font-semibold tabular-nums">500</span>명</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* 우측 AI 채팅 */}
        <FadeIn delay={0.3} className="col-span-12 xl:col-span-3">
          <Card className="h-full py-0 flex flex-col">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-semibold">새 AI 채팅</span>
              <Button variant="ghost" size="icon-xs"><RefreshCw size={11} /></Button>
            </div>
            <div className="flex-1 overflow-auto px-4 py-3 flex flex-col gap-3">
              {AI_MESSAGES.map((m, i) => {
                if (m.role === 'user') {
                  return (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[88%] rounded-lg px-3 py-2 text-xs bg-[var(--gray-3)]">
                        {m.text}
                      </div>
                    </div>
                  );
                }
                if (m.card) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-md border border-[var(--border)] bg-[var(--card)] p-2.5"
                    >
                      <div className="text-[11px] font-semibold flex items-center gap-1.5">
                        <Sparkles size={10} className="text-[var(--primary)]" />
                        {m.card.title}
                      </div>
                      <div className="text-[10px] text-[var(--foreground-muted)] mt-1 leading-relaxed whitespace-pre-line">
                        {m.card.content}
                      </div>
                    </motion.div>
                  );
                }
                return (
                  <div key={i} className="text-xs leading-relaxed whitespace-pre-wrap text-[var(--foreground)]">
                    {m.text}
                  </div>
                );
              })}
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
