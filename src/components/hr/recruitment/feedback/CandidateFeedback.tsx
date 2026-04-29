import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart, Star, MessageSquare, TrendingUp, Smile, Meh, Frown,
  Sparkles, Send, ThumbsUp, AlertCircle, Download,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

// 지원자 경험(CX) 피드백
const NPS_SCORES = [
  { range: '열성 지지 (9-10)', count: 142, pct: 58 },
  { range: '중립 (7-8)', count: 68, pct: 28 },
  { range: '비추천 (0-6)', count: 34, pct: 14 },
];

const STAGE_RATINGS = [
  { stage: '지원서 작성', score: 4.2, responses: 287 },
  { stage: '서류 심사 대기', score: 3.6, responses: 245 },
  { stage: '역량검사', score: 4.5, responses: 198 },
  { stage: '영상 면접', score: 4.4, responses: 156 },
  { stage: '대면 면접', score: 4.7, responses: 82 },
  { stage: '결과 안내', score: 3.8, responses: 210 },
];

const RECENT_FEEDBACK = [
  { name: '이도윤', stage: '대면 면접', score: 5, tone: 'positive', text: '면접관들이 제 경험을 깊이 이해해주셨고, 회사의 방향성에 대한 질문에도 솔직하게 답해주셔서 좋았어요.', date: '2026-04-21' },
  { name: '박지우', stage: '서류 심사', score: 2, tone: 'negative', text: '접수 후 10일이 지났는데 아무 안내가 없어서 답답했습니다. 진행 상황이라도 알려주셨으면 합니다.', date: '2026-04-20' },
  { name: '정유진', stage: '역량검사', score: 5, tone: 'positive', text: '검사 인터페이스가 깔끔했고 시간도 충분했습니다. 기술 관련 문제 난이도도 적절했어요.', date: '2026-04-19' },
  { name: '임채원', stage: '결과 안내', score: 3, tone: 'neutral', text: '불합격 사유를 구체적으로 안내해주셨으면 좋겠어요.', date: '2026-04-18' },
];

const AI_INSIGHTS = [
  { tone: 'warning', title: '서류 심사 대기 만족도 저조', text: '평균 3.6점 · 지원자 45%가 "진행 상황 안내 부족"을 언급. 자동 상태 업데이트 권장.' },
  { tone: 'success', title: '대면 면접 경험 최고 수준', text: '평균 4.7점 · 면접관 교육 효과로 판단. 베스트 프랙티스 공유 권장.' },
  { tone: 'warning', title: '불합격 피드백 요청 증가', text: '최근 2주간 "구체적 사유 안내" 요청 23건. AI 개인화 불합격 메시지 도입 검토.' },
];

const TONE_STYLE = {
  positive: { icon: Smile, color: 'text-[var(--success)]', bg: 'bg-[var(--success)]/10' },
  neutral: { icon: Meh, color: 'text-[var(--warning)]', bg: 'bg-[var(--warning)]/10' },
  negative: { icon: Frown, color: 'text-[var(--error)]', bg: 'bg-[var(--error)]/10' },
};

export default function CandidateFeedback() {
  const [filter, setFilter] = useState<'all' | keyof typeof TONE_STYLE>('all');

  const nps = Math.round(((NPS_SCORES[0].count - NPS_SCORES[2].count) / (NPS_SCORES[0].count + NPS_SCORES[1].count + NPS_SCORES[2].count)) * 100);

  const filtered = filter === 'all' ? RECENT_FEEDBACK : RECENT_FEEDBACK.filter(f => f.tone === filter);

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <Heart size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">지원자 경험 (CX) 피드백</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                전형 단계별 NPS · 실시간 피드백 · AI 감정 분석
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download size={14} /> 리포트</Button>
            <Button size="sm"><Send size={14} /> 피드백 요청 발송</Button>
          </div>
        </div>
      </FadeIn>

      {/* NPS 커버 */}
      <FadeIn delay={0.05}>
        <Card className="py-0 overflow-hidden">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-4 p-6 bg-[var(--foreground)] text-[var(--background)]">
              <div className="text-[10px] opacity-80">지원자 NPS</div>
              <div className="flex items-baseline gap-1 mt-1">
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-[52px] font-semibold leading-none tabular-nums"
                >
                  +{nps}
                </motion.span>
              </div>
              <div className="text-xs opacity-80 mt-1">업계 평균 +32 대비 우수</div>
              <div className="mt-4 flex items-center gap-1 text-[10px]">
                <TrendingUp size={10} />
                <span className="opacity-80">전 분기 대비 +8</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 p-6">
              <div className="flex flex-col gap-3">
                {NPS_SCORES.map((n, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-medium">{n.range}</span>
                      <span className="text-[var(--foreground-muted)]">
                        <span className="font-semibold text-[var(--foreground)]">{n.count}</span>명 ({n.pct}%)
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-[var(--gray-3)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${n.pct}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className={`h-full rounded-full ${
                          i === 0 ? 'bg-[var(--success)]' : i === 1 ? 'bg-[var(--warning)]' : 'bg-[var(--error)]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 단계별 평점 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">전형 단계별 평점</h4>
              <Badge variant="secondary" className="text-[10px]">
                총 {STAGE_RATINGS.reduce((s, r) => s + r.responses, 0).toLocaleString()}건 응답
              </Badge>
            </div>
            <CardContent className="flex flex-col gap-2">
              {STAGE_RATINGS.map((s, i) => (
                <motion.div
                  key={s.stage}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-2.5 rounded-md border border-[var(--border)]"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium">{s.stage}</span>
                      <span className="text-[10px] text-[var(--foreground-muted)]">{s.responses}명</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${s.score >= 4.3 ? 'bg-[var(--success)]' : s.score >= 3.8 ? 'bg-[var(--primary)]' : 'bg-[var(--warning)]'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(s.score / 5) * 100}%` }}
                        transition={{ duration: 0.6, delay: i * 0.06 }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 w-14 justify-end">
                    <Star size={11} className="text-[var(--warning)] fill-[var(--warning)]" />
                    <span className="text-sm font-semibold tabular-nums">{s.score}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        {/* AI 인사이트 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <Sparkles size={13} className="text-[var(--primary)]" />
              <h4 className="text-sm font-semibold">AI 감정 분석 · 인사이트</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {AI_INSIGHTS.map((ins, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="p-3 rounded-md border border-[var(--border)]"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {ins.tone === 'warning'
                      ? <AlertCircle size={12} className="text-[var(--warning)]" />
                      : <ThumbsUp size={12} className="text-[var(--success)]" />}
                    <span className="text-xs font-semibold">{ins.title}</span>
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">{ins.text}</div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 피드백 리스트 */}
        <FadeIn delay={0.2} className="col-span-12">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare size={13} className="text-[var(--foreground)]" />
                <h4 className="text-sm font-semibold">최근 피드백</h4>
              </div>
              <div className="flex items-center gap-1">
                {[
                  { k: 'all' as const, l: '전체' },
                  { k: 'positive' as const, l: '긍정', icon: Smile },
                  { k: 'neutral' as const, l: '중립', icon: Meh },
                  { k: 'negative' as const, l: '부정', icon: Frown },
                ].map(f => (
                  <button
                    key={f.k}
                    onClick={() => setFilter(f.k)}
                    className={`flex items-center gap-1 text-[10px] px-2.5 py-1 rounded transition-colors ${
                      filter === f.k ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                    }`}
                  >
                    {f.k !== 'all' && (f.icon ? <f.icon size={11} /> : null)}
                    {f.l}
                  </button>
                ))}
              </div>
            </div>
            <CardContent>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filtered.map((f, i) => {
                  const style = TONE_STYLE[f.tone as keyof typeof TONE_STYLE];
                  const Icon = style.icon;
                  return (
                    <StaggerItem key={i}>
                      <motion.div whileHover={{ x: 2 }}>
                        <div className="p-3 rounded-md border border-[var(--border)] flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full ${style.bg} flex items-center justify-center shrink-0`}>
                            <Icon size={14} className={style.color} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-medium">{f.name}</span>
                              <Badge variant="outline" className="text-[10px]">{f.stage}</Badge>
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map(v => (
                                  <Star
                                    key={v}
                                    size={9}
                                    className={v <= f.score ? 'text-[var(--warning)] fill-[var(--warning)]' : 'text-[var(--foreground-subtle)]'}
                                    fill={v <= f.score ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">"{f.text}"</div>
                            <div className="text-[10px] text-[var(--foreground-subtle)] mt-1">{f.date}</div>
                          </div>
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
