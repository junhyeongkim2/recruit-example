import { motion, AnimatePresence } from 'motion/react';
import { useEscapeKey } from './useEscapeKey';
import {
  X, Sparkles, Mail, Phone, Calendar, Clock3, Briefcase, GraduationCap,
  MessageSquare, Video, CheckCircle2, Flag, ArrowRight, Star,
  FileText, Award,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Candidate } from '../mockData';
import { STAGE_LABELS } from '../mockData';

interface Props {
  candidate: Candidate | null;
  onClose: () => void;
}

const TIMELINE = [
  { date: '2026-04-08', type: '지원 접수', text: '이력서 + 포트폴리오 제출', icon: FileText },
  { date: '2026-04-10', type: 'AI 스크리닝', text: '적합도 점수 92점 — 강력 추천', icon: Sparkles, tone: 'success' },
  { date: '2026-04-12', type: '서류 통과', text: 'HR BP may.kim 검토 완료', icon: CheckCircle2, tone: 'success' },
  { date: '2026-04-14', type: '영상 면접', text: '4문항 · 완료 · AI 분석 스코어 92', icon: Video, tone: 'success' },
  { date: '2026-04-18', type: '1차 면접', text: '면접관 3명 · 평균 4.5 / 5.0', icon: MessageSquare, tone: 'success' },
  { date: '2026-04-22', type: '2차 임원 면접', text: '예정 (05-23 14:00)', icon: Calendar, tone: 'pending' },
];

const SKILLS_DETAIL = [
  { name: 'Kotlin', years: 5, level: 'Expert' },
  { name: 'Spring Boot', years: 5, level: 'Expert' },
  { name: 'Kafka', years: 4, level: 'Advanced' },
  { name: 'K8s', years: 3, level: 'Advanced' },
  { name: 'Redis', years: 4, level: 'Intermediate' },
];

const EDUCATION = [
  { school: '서울대학교', major: '컴퓨터공학', period: '2013-2017', degree: '학사' },
];

const AI_INSIGHTS = [
  { tone: 'success', text: '분산 시스템 설계 경험 풍부 — 목표 역량과 95% 일치' },
  { tone: 'success', text: 'Kafka 프로덕션 운영 경험 4년 — 팀 기대치 초과' },
  { tone: 'warning', text: '이전 이직 주기 평균 1.8년 — 리텐션 리스크 참고' },
  { tone: 'info', text: '블로그 · 컨퍼런스 발표 이력으로 기술 커뮤니케이션 강점' },
];

export default function CandidateDetailModal({ candidate, onClose }: Props) {
  useEscapeKey(!!candidate, onClose);

  return (
    <AnimatePresence>
      {candidate && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[1040]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[680px] max-w-[92vw] bg-[var(--card)] border-l border-[var(--border)] shadow-2xl z-[1050] overflow-y-auto"
          >
            {/* 헤더 */}
            <div className="sticky top-0 z-10 bg-[var(--card)] px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-sm font-semibold">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold">{candidate.name}</h3>
                    {candidate.flagged && <Flag size={12} className="text-[var(--warning)] fill-[var(--warning)]" />}
                    <Badge variant="outline" className="text-[10px]">{STAGE_LABELS[candidate.stage]}</Badge>
                  </div>
                  <div className="text-xs text-[var(--foreground-muted)] mt-0.5">
                    {candidate.jobTitle} · {candidate.currentCompany || '경력 없음'} · {candidate.experience}년차
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* AI 스코어 하이라이트 */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-lg bg-[var(--gray-3)] flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-[var(--foreground-muted)]">종합 적합도</div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-3xl font-semibold">
                      {candidate.aiScore >= 85 ? '매우 적합' : candidate.aiScore >= 70 ? '적합' : '재검토'}
                    </span>
                  </div>
                  <div className="text-[10px] text-[var(--foreground-muted)] mt-1">AI 분석 기반</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[var(--foreground-muted)]">AI 스코어</div>
                  <div className="flex items-baseline gap-1 justify-end mt-1">
                    <span className="text-[44px] font-semibold leading-none text-[var(--success)]">{candidate.aiScore}</span>
                    <span className="text-sm text-[var(--foreground-muted)]">점</span>
                  </div>
                </div>
              </motion.div>

              {/* 연락처 */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Mail, label: '이메일', value: `${candidate.name.toLowerCase()}@email.com` },
                  { icon: Phone, label: '전화', value: '010-1234-5678' },
                ].map(c => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="flex items-center gap-2 p-2.5 rounded-md border border-[var(--border)]">
                      <Icon size={13} className="text-[var(--foreground-muted)]" />
                      <div>
                        <div className="text-[10px] text-[var(--foreground-muted)]">{c.label}</div>
                        <div className="text-xs font-medium">{c.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI 인사이트 */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles size={13} className="text-[var(--primary)]" />
                  <h4 className="text-xs font-semibold">AI 인사이트</h4>
                </div>
                <div className="flex flex-col gap-1.5">
                  {AI_INSIGHTS.map((ins, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-2.5 rounded-md border border-[var(--border)] flex items-start gap-2"
                    >
                      {ins.tone === 'success' && <CheckCircle2 size={12} className="text-[var(--success)] mt-0.5 shrink-0" />}
                      {ins.tone === 'warning' && <Flag size={12} className="text-[var(--warning)] mt-0.5 shrink-0" />}
                      {ins.tone === 'info' && <Star size={12} className="text-[var(--primary)] mt-0.5 shrink-0" />}
                      <span className="text-xs text-[var(--foreground-muted)]">{ins.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 스킬 */}
              <div>
                <h4 className="text-xs font-semibold mb-2">보유 기술</h4>
                <div className="flex flex-col gap-1.5">
                  {SKILLS_DETAIL.map(s => (
                    <div key={s.name} className="flex items-center gap-3 p-2 rounded-md border border-[var(--border)]">
                      <div className="flex-1 flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">{s.name}</Badge>
                        <span className="text-[10px] text-[var(--foreground-muted)]">{s.years}년</span>
                      </div>
                      <Badge
                        variant={s.level === 'Expert' ? 'success' : s.level === 'Advanced' ? 'warning' : 'secondary'}
                        className="text-[10px]"
                      >
                        {s.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* 학력 */}
              <div>
                <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5">
                  <GraduationCap size={13} /> 학력
                </h4>
                {EDUCATION.map(e => (
                  <div key={e.school} className="p-2.5 rounded-md border border-[var(--border)]">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-medium">{e.school}</div>
                      <Badge variant="outline" className="text-[10px]">{e.degree}</Badge>
                    </div>
                    <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{e.major} · {e.period}</div>
                  </div>
                ))}
              </div>

              {/* 타임라인 */}
              <div>
                <h4 className="text-xs font-semibold mb-2">전형 타임라인</h4>
                <div className="relative pl-6">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--border)]" />
                  {TIMELINE.map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="relative flex gap-3 pb-3"
                      >
                        <div className={`absolute left-[-24px] w-6 h-6 rounded-full flex items-center justify-center ${
                          t.tone === 'success' ? 'bg-[var(--success)]/15 text-[var(--success)]' :
                          t.tone === 'pending' ? 'bg-[var(--gray-3)] text-[var(--foreground-muted)]' :
                          'bg-[var(--primary)]/15 text-[var(--primary)]'
                        }`}>
                          <Icon size={11} />
                        </div>
                        <div className="flex-1 p-2.5 rounded-md border border-[var(--border)]">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">{t.type}</span>
                            <span className="text-[10px] text-[var(--foreground-muted)]">{t.date}</span>
                          </div>
                          <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5">{t.text}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 하단 액션 */}
            <div className="sticky bottom-0 bg-[var(--card)] px-6 py-3 border-t border-[var(--border)] flex items-center justify-between">
              <Button variant="outline" size="sm">
                <MessageSquare size={13} /> 메모
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  거절
                </Button>
                <Button size="sm">
                  다음 단계로 <ArrowRight size={13} />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
