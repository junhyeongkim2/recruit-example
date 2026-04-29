import { useState } from 'react';
import { motion } from 'motion/react';
import {
  UserCheck, Phone, Mail, Sparkles, Send, CheckCircle2, Clock3,
  AlertCircle, Shield, ChevronRight, ThumbsUp, Star,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

// 레퍼런스 체크 (합격자 공식 검증)
const CANDIDATES = [
  {
    id: 'C-1', name: '이도윤', position: '백엔드 엔지니어',
    refs: [
      { name: 'A. 김팀장', relation: '전 직장 팀 리드', company: '쿠팡', status: 'completed', score: 4.5, contact: 'a.kim@coupang.com', provided: '2026-04-19' },
      { name: 'B. 박매니저', relation: '전 직장 매니저', company: '쿠팡', status: 'pending', contact: 'b.park@coupang.com', provided: '2026-04-18' },
      { name: 'C. 이동료', relation: '동료', company: '쿠팡', status: 'scheduled', contact: 'c.lee@coupang.com', provided: '2026-04-20' },
    ],
    consent: true,
  },
  {
    id: 'C-2', name: '최민호', position: '백엔드 엔지니어',
    refs: [
      { name: 'D. 최리드', relation: '전 직장 팀 리드', company: '라인', status: 'completed', score: 4.8, contact: 'd.choi@line.me', provided: '2026-04-17' },
      { name: 'E. 정팀장', relation: '전 프로젝트 PM', company: '라인', status: 'completed', score: 4.7, contact: 'e.jung@line.me', provided: '2026-04-16' },
    ],
    consent: true,
  },
];

const QUESTIONS = [
  { id: 'q1', q: '지원자와의 근무 관계와 기간을 알려주세요.', type: '기본' },
  { id: 'q2', q: '지원자의 핵심 역량 3가지를 꼽는다면?', type: '역량' },
  { id: 'q3', q: '지원자가 팀에서 담당한 대표 성과는?', type: '성과' },
  { id: 'q4', q: '지원자의 커뮤니케이션 스타일은 어땠나요?', type: '협업' },
  { id: 'q5', q: '다시 함께 일할 기회가 있다면 함께하시겠습니까?', type: '핵심' },
  { id: 'q6', q: '개선이 필요한 부분이 있다면 알려주세요.', type: '개선점' },
];

const STATUS_STYLE = {
  completed: { icon: CheckCircle2, label: '완료', tone: 'success' as const },
  pending: { icon: Clock3, label: '대기', tone: 'warning' as const },
  scheduled: { icon: Clock3, label: '예정', tone: 'secondary' as const },
};

export default function ReferenceCheck() {
  const [selected, setSelected] = useState(CANDIDATES[0]);
  const [selectedRef, setSelectedRef] = useState(selected.refs[0]);

  const completedCount = selected.refs.filter(r => r.status === 'completed').length;
  const completeness = (completedCount / selected.refs.length) * 100;

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <UserCheck size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">레퍼런스 체크</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                합격 예정자 공식 검증 · 개인정보 동의 기반
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Sparkles size={14} /> AI 질문 재생성</Button>
            <Button size="sm"><Send size={14} /> 요청 발송</Button>
          </div>
        </div>
      </FadeIn>

      {/* 동의 배너 */}
      <FadeIn delay={0.05}>
        <div className="flex items-center gap-2 p-3 rounded-md bg-[var(--primary)]/5 border border-[var(--primary)]/20">
          <Shield size={13} className="text-[var(--primary)]" />
          <span className="text-[11px]">
            지원자 <strong>{selected.name}</strong>님은 레퍼런스 체크에 동의하셨습니다. (2026-04-15)
          </span>
          <span className="text-[10px] text-[var(--foreground-muted)] ml-auto">
            보관 기간: 채용 완료 후 6개월
          </span>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측: 대상자 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-xs font-semibold">검증 대상자</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {CANDIDATES.map(c => {
                const done = c.refs.filter(r => r.status === 'completed').length;
                return (
                  <motion.button
                    key={c.id}
                    whileHover={{ x: 2 }}
                    onClick={() => {
                      setSelected(c);
                      setSelectedRef(c.refs[0]);
                    }}
                    className={`text-left p-2.5 rounded-md border transition-colors ${
                      selected.id === c.id ? 'border-[var(--foreground)] bg-[var(--gray-3)]' : 'border-[var(--border)] hover:bg-[var(--gray-3)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                        {c.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium">{c.name}</div>
                        <div className="text-[10px] text-[var(--foreground-muted)]">{c.position}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[10px]">
                      <span className="text-[var(--foreground-muted)]">레퍼런스 {done}/{c.refs.length}</span>
                      <Badge variant={done === c.refs.length ? 'success' : 'warning'} className="text-[9px]">
                        {done === c.refs.length ? '완료' : '진행'}
                      </Badge>
                    </div>
                  </motion.button>
                );
              })}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 중앙: 레퍼런스 리스트 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">{selected.name}의 추천인</h4>
              </div>
              <span className="text-[10px] text-[var(--foreground-muted)]">
                <span className="font-semibold text-[var(--foreground)]">{completedCount}</span> / {selected.refs.length}
              </span>
            </div>
            <CardContent className="flex flex-col gap-2">
              {/* 진행률 */}
              <div className="h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-[var(--success)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${completeness}%` }}
                />
              </div>

              <StaggerContainer className="flex flex-col gap-2">
                {selected.refs.map(r => {
                  const style = STATUS_STYLE[r.status as keyof typeof STATUS_STYLE];
                  const Icon = style.icon;
                  return (
                    <StaggerItem key={r.name}>
                      <motion.div
                        whileHover={{ x: 2 }}
                        onClick={() => setSelectedRef(r)}
                        className={`p-3 rounded-md border transition-colors cursor-pointer ${
                          selectedRef.name === r.name ? 'border-[var(--foreground)] bg-[var(--gray-3)]' : 'border-[var(--border)] hover:bg-[var(--gray-3)]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold">{r.name}</span>
                              <Badge variant={style.tone} className="text-[9px] inline-flex items-center gap-1">
                                <Icon size={9} />
                                {style.label}
                              </Badge>
                            </div>
                            <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{r.relation} · {r.company}</div>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--foreground-muted)]">
                              <Mail size={9} />
                              <span>{r.contact}</span>
                            </div>
                          </div>
                          {r.status === 'completed' && r.score && (
                            <div className="text-right shrink-0">
                              <div className="flex items-center gap-0.5">
                                <Star size={11} className="text-[var(--warning)] fill-[var(--warning)]" />
                                <span className="text-sm font-semibold">{r.score}</span>
                              </div>
                              <div className="text-[9px] text-[var(--foreground-muted)]">평점</div>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 pt-2 border-t border-[var(--border)] flex items-center justify-between text-[10px]">
                          <span className="text-[var(--foreground-muted)]">요청일 {r.provided}</span>
                          <ChevronRight size={10} className="text-[var(--foreground-subtle)]" />
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              <Button variant="outline" size="sm" className="mt-2">
                <Phone size={12} /> 추천인 추가 요청
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 우측: AI 질문지 + 응답 */}
        <FadeIn delay={0.2} className="col-span-12 lg:col-span-4">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-[var(--primary)]" />
                <h4 className="text-sm font-semibold">AI 질문지</h4>
              </div>
              <Badge variant="outline" className="text-[10px]">6문항</Badge>
            </div>
            <CardContent className="flex flex-col gap-2">
              {selectedRef.status === 'completed' ? (
                <>
                  <div className="p-2.5 rounded-md bg-[var(--success)]/5 border border-[var(--success)]/20">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ThumbsUp size={11} className="text-[var(--success)]" />
                      <span className="text-[11px] font-semibold">재고용 의향 · YES</span>
                    </div>
                    <div className="text-[10px] text-[var(--foreground-muted)] leading-relaxed">
                      {selectedRef.name}님은 재고용 의향에 긍정 답변을 주셨습니다.
                    </div>
                  </div>
                  {QUESTIONS.slice(0, 4).map((q, i) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="p-2.5 rounded-md border border-[var(--border)]"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Badge variant="outline" className="text-[9px]">{q.type}</Badge>
                      </div>
                      <div className="text-[11px] font-medium mb-1">{q.q}</div>
                      <div className="text-[10px] text-[var(--foreground-muted)] leading-relaxed line-clamp-3">
                        분산 시스템 설계에 강점을 보였으며, 팀원들과의 협업에서도 리더십을 발휘했습니다. 어려운 상황에서 침착하게 의사결정하는 모습이 인상적이었습니다.
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <>
                  <div className="p-3 rounded-md bg-[var(--warning)]/5 border border-[var(--warning)]/20 flex items-start gap-2">
                    <AlertCircle size={12} className="text-[var(--warning)] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] font-semibold">응답 대기 중</div>
                      <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">
                        요청일로부터 {new Date().getDate() - new Date(selectedRef.provided).getDate()}일 경과
                      </div>
                    </div>
                  </div>
                  {QUESTIONS.map((q, i) => (
                    <div key={q.id} className="p-2.5 rounded-md border border-dashed border-[var(--border)]">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[10px] text-[var(--foreground-muted)]">Q{i + 1}.</span>
                        <Badge variant="outline" className="text-[9px]">{q.type}</Badge>
                      </div>
                      <div className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">{q.q}</div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="mt-1">
                    <Send size={12} /> 재요청 발송
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
