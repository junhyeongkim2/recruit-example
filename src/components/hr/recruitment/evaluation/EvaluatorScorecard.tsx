import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star, Save, Send, ArrowLeft, ArrowRight, MessageSquare, User,
  Sparkles, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

// 평가자 관점 스코어카드 입력 화면
interface Criterion {
  id: string;
  name: string;
  desc: string;
  weight: number;
}

const CRITERIA: Criterion[] = [
  { id: 'tech', name: '기술 이해도', desc: '직무 관련 기술 전반 이해와 깊이', weight: 30 },
  { id: 'exp', name: '경험의 적합성', desc: '지원서 기재 경험의 직무 연관성', weight: 25 },
  { id: 'comm', name: '커뮤니케이션', desc: '논리적 설명과 질문 경청 태도', weight: 20 },
  { id: 'culture', name: '문화 적합도', desc: '팀 가치관·업무 스타일 일치', weight: 15 },
  { id: 'growth', name: '성장 가능성', desc: '학습 민첩성과 오너십', weight: 10 },
];

const CANDIDATES_TO_EVAL = [
  { id: 'C-002', name: '이도윤', position: '백엔드 엔지니어', company: '쿠팡', years: 7, aiScore: 92 },
  { id: 'C-003', name: '박지우', position: '백엔드 엔지니어', company: '토스', years: 4, aiScore: 85 },
  { id: 'C-005', name: '최민호', position: '백엔드 엔지니어', company: '라인', years: 8, aiScore: 94 },
];

export default function EvaluatorScorecard() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comment, setComment] = useState('');
  const [recommend, setRecommend] = useState<'strong' | 'yes' | 'hold' | 'no' | null>(null);

  const candidate = CANDIDATES_TO_EVAL[currentIdx];
  const totalWeight = CRITERIA.reduce((s, c) => s + c.weight, 0);
  const weightedScore = CRITERIA.reduce((sum, c) => {
    const s = scores[c.id] || 0;
    return sum + (s * c.weight) / totalWeight;
  }, 0);

  const progress = CRITERIA.filter(c => scores[c.id] > 0).length;
  const isComplete = progress === CRITERIA.length && recommend !== null;

  const setScore = (id: string, value: number) => setScores({ ...scores, [id]: value });

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                <Star size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-sm font-semibold">평가자 스코어카드</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  1차 면접 · 기술 평가 · 평가자 me <span className="font-medium">bentley.jun</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><Save size={14} /> 임시 저장</Button>
              <Button size="sm" disabled={!isComplete}>
                <Send size={14} /> 제출
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측: 지원자 리스트 (페이지네이터) */}
        <FadeIn delay={0.05} className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-xs font-semibold">평가 대상 ({CANDIDATES_TO_EVAL.length})</h4>
              <Badge variant="secondary" className="text-[10px]">{currentIdx + 1}/{CANDIDATES_TO_EVAL.length}</Badge>
            </div>
            <CardContent className="flex flex-col gap-1.5">
              {CANDIDATES_TO_EVAL.map((c, i) => (
                <motion.button
                  key={c.id}
                  whileHover={{ x: 2 }}
                  onClick={() => setCurrentIdx(i)}
                  className={`text-left p-2.5 rounded-md border transition-colors ${
                    i === currentIdx
                      ? 'border-[var(--foreground)] bg-[var(--gray-3)]'
                      : 'border-[var(--border)] hover:bg-[var(--gray-3)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{c.name}</div>
                      <div className="text-[10px] text-[var(--foreground-muted)] truncate">{c.company} · {c.years}년</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1">
                      <Sparkles size={9} className="text-[var(--primary)]" />
                      <span className="font-semibold">{c.aiScore}</span>
                    </div>
                    {i === currentIdx && progress > 0 && (
                      <Badge variant="warning" className="text-[9px]">{progress}/5 진행</Badge>
                    )}
                    {i === currentIdx && progress === 0 && (
                      <Badge variant="secondary" className="text-[9px]">미시작</Badge>
                    )}
                  </div>
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 중앙: 평가 폼 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-6">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">{candidate.name} 평가</h4>
                <Badge variant="outline" className="text-[10px]">{candidate.position}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                  className="w-7 h-7 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)] disabled:opacity-30"
                >
                  <ArrowLeft size={13} className="inline" />
                </button>
                <button
                  disabled={currentIdx === CANDIDATES_TO_EVAL.length - 1}
                  onClick={() => setCurrentIdx(Math.min(CANDIDATES_TO_EVAL.length - 1, currentIdx + 1))}
                  className="w-7 h-7 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)] disabled:opacity-30"
                >
                  <ArrowRight size={13} className="inline" />
                </button>
              </div>
            </div>

            <CardContent className="flex flex-col gap-4">
              {/* 5역량 점수 */}
              <StaggerContainer className="flex flex-col gap-3">
                {CRITERIA.map((c, i) => (
                  <StaggerItem key={c.id}>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-semibold">{c.name}</span>
                          <span className="text-[10px] text-[var(--foreground-muted)]">{c.desc}</span>
                        </div>
                        <span className="text-[10px] text-[var(--foreground-muted)]">가중치 {c.weight}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(v => {
                          const filled = (scores[c.id] || 0) >= v;
                          return (
                            <motion.button
                              key={v}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setScore(c.id, v)}
                              className={`w-9 h-9 rounded-md border transition-colors ${
                                filled
                                  ? 'bg-[var(--primary)]/15 border-[var(--primary)] text-[var(--primary)]'
                                  : 'border-[var(--border)] text-[var(--foreground-subtle)] hover:bg-[var(--gray-3)]'
                              }`}
                            >
                              <Star size={14} fill={filled ? 'currentColor' : 'none'} strokeWidth={1.75} className="mx-auto" />
                            </motion.button>
                          );
                        })}
                        <div className="ml-3 flex items-center gap-1.5 text-[10px] text-[var(--foreground-muted)]">
                          {scores[c.id] ? (
                            <>
                              <CheckCircle2 size={11} className="text-[var(--success)]" />
                              <span className="font-semibold text-[var(--foreground)]">{scores[c.id]}.0 / 5.0</span>
                            </>
                          ) : (
                            <span>점수를 선택하세요</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* 면접관 코멘트 */}
              <div className="pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-1.5 mb-2">
                  <MessageSquare size={12} className="text-[var(--foreground-muted)]" />
                  <label className="text-xs font-semibold">면접관 코멘트</label>
                  <Badge variant="outline" className="text-[9px]">{comment.length} / 500</Badge>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, 500))}
                  placeholder="구체적인 질문·답변 · 인상적인 강점 · 우려 사항 등"
                  rows={4}
                  className="w-full px-3 py-2 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] resize-none leading-relaxed"
                />
                <Button variant="outline" size="xs" className="mt-2">
                  <Sparkles size={11} /> AI 코멘트 초안 생성
                </Button>
              </div>

              {/* 최종 추천 */}
              <div className="pt-4 border-t border-[var(--border)]">
                <label className="text-xs font-semibold mb-2 block">최종 추천</label>
                <div className="grid grid-cols-4 gap-2">
                  {([
                    ['strong', '강력 추천', 'success'],
                    ['yes', '추천', 'success'],
                    ['hold', '보류', 'warning'],
                    ['no', '비추천', 'error'],
                  ] as const).map(([k, l, tone]) => (
                    <motion.button
                      key={k}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRecommend(k)}
                      className={`p-2.5 rounded-md border transition-colors text-xs font-medium ${
                        recommend === k
                          ? tone === 'success' ? 'border-[var(--success)]/40 bg-[var(--success)]/10 text-[var(--success)]'
                          : tone === 'warning' ? 'border-[var(--warning)]/40 bg-[var(--warning)]/10 text-[var(--warning)]'
                          : 'border-[var(--error)]/40 bg-[var(--error)]/10 text-[var(--error)]'
                          : 'border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                      }`}
                    >
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 우측: 실시간 요약 + 지원자 프로필 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-xs font-semibold">평가 요약</h4>
            </div>
            <CardContent className="flex flex-col gap-3">
              {/* 현재 가중 점수 */}
              <div className="p-3 rounded-lg bg-[var(--gray-3)]">
                <div className="text-[10px] text-[var(--foreground-muted)]">가중 평균 점수</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <motion.span
                    key={weightedScore.toFixed(2)}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-semibold tabular-nums"
                  >
                    {weightedScore.toFixed(2)}
                  </motion.span>
                  <span className="text-xs text-[var(--foreground-muted)]">/ 5.00</span>
                </div>
                <div className="h-1.5 mt-2 rounded-full bg-[var(--card)] overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--primary)]"
                    animate={{ width: `${(weightedScore / 5) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  />
                </div>
              </div>

              {/* 완료 진행 */}
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-[var(--foreground-muted)]">평가 진행</span>
                  <span className="font-semibold">{progress} / {CRITERIA.length}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--success)]"
                    animate={{ width: `${(progress / CRITERIA.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* AI 스코어 비교 */}
              <div className="p-2.5 rounded-md bg-[var(--card)] border border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Sparkles size={11} className="text-[var(--primary)]" />
                    <span className="text-[10px] text-[var(--foreground-muted)]">AI 스코어 참고</span>
                  </div>
                  <span className="text-xs font-semibold">{candidate.aiScore}</span>
                </div>
                {weightedScore > 0 && Math.abs(weightedScore * 20 - candidate.aiScore) > 15 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1.5 flex items-start gap-1 text-[10px] text-[var(--warning)]"
                  >
                    <AlertCircle size={10} className="mt-0.5 shrink-0" />
                    <span>AI 스코어와 {Math.abs(weightedScore * 20 - candidate.aiScore).toFixed(0)}점 차이</span>
                  </motion.div>
                )}
              </div>

              {/* 지원자 요약 */}
              <div className="pt-3 border-t border-[var(--border)]">
                <div className="text-[10px] text-[var(--foreground-muted)] mb-2">지원자 프로필</div>
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold shrink-0">
                    {candidate.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold">{candidate.name}</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">{candidate.company}</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">경력 {candidate.years}년</div>
                  </div>
                </div>
                <Button variant="outline" size="xs" className="w-full mt-2">
                  <User size={11} /> 상세 프로필 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
