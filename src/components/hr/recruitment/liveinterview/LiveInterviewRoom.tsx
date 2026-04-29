import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video, Mic, MicOff, VideoOff, PhoneOff, ScreenShare, MessageSquare,
  FileText, Users, Clock3, Sparkles, CheckCircle2, Circle, Star,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/page-transition';
import { useNav } from '../shared/navContext';

// 실시간 화상 면접 진행 화면
const CANDIDATE = { name: '이도윤', position: '시니어 백엔드 엔지니어', company: '쿠팡', years: 7 };

const INTERVIEW_FLOW = [
  { time: '00:00', label: '인사 및 도입', duration: 5, status: 'done' },
  { time: '00:05', label: '지원자 소개', duration: 7, status: 'done' },
  { time: '00:12', label: '직무 경험', duration: 15, status: 'active' },
  { time: '00:27', label: '기술 심층', duration: 15, status: 'upcoming' },
  { time: '00:42', label: '협업 경험', duration: 10, status: 'upcoming' },
  { time: '00:52', label: 'Q&A', duration: 8, status: 'upcoming' },
];

const AI_LIVE_CUES = [
  { type: 'suggestion', text: '지원자가 Kafka 경험을 언급했습니다. 구체 사례 질문 추천.', time: '12:34' },
  { type: 'insight', text: '전 회사 이직 주기 1.8년 언급 — 리텐션 관련 질문 고려.', time: '12:28' },
  { type: 'warning', text: '현재 답변이 일반론적입니다. STAR 기법 가이드 발동?', time: '12:22' },
  { type: 'suggestion', text: '프로덕션 장애 경험 질문 권장 — 자기소개 언급 있음.', time: '12:15' },
];

const QUESTIONS = [
  { q: '분산 트랜잭션 처리 경험을 설명해주세요.', asked: true, good: true },
  { q: 'Kafka 기반 이벤트 소싱 구현 시 가장 어려웠던 점은?', asked: true, good: true },
  { q: 'K8s 운영 중 겪은 프로덕션 장애 사례와 해결 과정', asked: false },
  { q: '팀 내 기술 의사결정 충돌 시 조율 경험', asked: false },
  { q: '레거시 시스템 현대화 프로젝트 참여 경험', asked: false },
];

const PARTICIPANTS = [
  { name: 'bentley.jun', role: '팀 리드', mic: true, video: true },
  { name: 'may.kim', role: 'HR BP', mic: false, video: true },
  { name: 'j.park', role: '본부장', mic: true, video: false },
];

export default function LiveInterviewRoom() {
  const [recording, setRecording] = useState(true);
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [elapsed, setElapsed] = useState(772); // 12:52
  const { showToast, navigateTo } = useNav();

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const format = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <Video size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">{CANDIDATE.name} · 1차 기술 면접</h3>
                {recording && (
                  <div className="flex items-center gap-1">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-[var(--error)]"
                    />
                    <span className="text-[10px] text-[var(--error)] font-medium">REC {format(elapsed)}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                {CANDIDATE.position} · {CANDIDATE.company} {CANDIDATE.years}년차
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowNotes(!showNotes)}>
              <FileText size={14} /> 노트
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateTo('during', 'scorecard')}
            >
              <Star size={14} /> 평가 입력
            </Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 메인 비디오 */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-3">
          {/* 지원자 영상 */}
          <div className="relative aspect-video rounded-lg bg-[var(--gray-4)] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-2xl font-semibold">
                {CANDIDATE.name.charAt(0)}
              </div>
            </div>

            {/* 지원자 이름 태그 */}
            <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/60 text-white text-[11px] flex items-center gap-1.5">
              <Mic size={11} />
              <span>{CANDIDATE.name}</span>
            </div>

            {/* 면접관 썸네일 */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5">
              {PARTICIPANTS.map(p => (
                <div key={p.name} className="relative w-24 h-16 rounded bg-[var(--gray-3)] border-2 border-white/30 overflow-hidden">
                  {p.video ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-4)]">
                      <div className="w-8 h-8 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                      <VideoOff size={14} className="text-white/60" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 px-1 py-0.5 bg-black/60 text-[8px] text-white flex items-center justify-between">
                    <span className="truncate">{p.name}</span>
                    {!p.mic && <MicOff size={8} className="text-[var(--error)] shrink-0" />}
                  </div>
                </div>
              ))}
            </div>

            {/* 컨트롤 바 */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur rounded-full px-3 py-2">
              <button
                onClick={() => setMic(!mic)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  mic ? 'bg-[var(--gray-3)] text-[var(--foreground)]' : 'bg-[var(--error)] text-white'
                }`}
              >
                {mic ? <Mic size={14} /> : <MicOff size={14} />}
              </button>
              <button
                onClick={() => setVideo(!video)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  video ? 'bg-[var(--gray-3)] text-[var(--foreground)]' : 'bg-[var(--error)] text-white'
                }`}
              >
                {video ? <Video size={14} /> : <VideoOff size={14} />}
              </button>
              <button
                onClick={() => showToast('화면 공유를 시작했어요')}
                className="w-9 h-9 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground)]"
              >
                <ScreenShare size={14} />
              </button>
              <button
                onClick={() => setShowNotes(true)}
                className="w-9 h-9 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground)]"
              >
                <MessageSquare size={14} />
              </button>
              <div className="h-6 w-px bg-white/20" />
              <button
                onClick={() => showToast('면접을 종료했어요')}
                className="px-3 h-9 rounded-full bg-[var(--error)] flex items-center gap-1.5 text-white text-[11px] font-medium"
              >
                <PhoneOff size={14} />
                종료
              </button>
            </div>
          </div>

          {/* 진행 타임라인 */}
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">면접 진행</h4>
              <span className="text-[10px] text-[var(--foreground-muted)] tabular-nums">{format(elapsed)} / 60:00</span>
            </div>
            <CardContent>
              <div className="flex items-center gap-1">
                {INTERVIEW_FLOW.map((f, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full h-1.5 rounded ${
                      f.status === 'done' ? 'bg-[var(--success)]' :
                      f.status === 'active' ? 'bg-[var(--primary)]' :
                      'bg-[var(--gray-3)]'
                    }`} />
                    <div className="text-[9px] text-center">
                      <div className={f.status === 'active' ? 'font-semibold text-[var(--foreground)]' : 'text-[var(--foreground-muted)]'}>
                        {f.label}
                      </div>
                      <div className="text-[8px] text-[var(--foreground-subtle)]">{f.duration}분</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 우측: AI 실시간 + 질문지 */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Sparkles size={13} className="text-[var(--primary)]" />
              </motion.div>
              <h4 className="text-sm font-semibold">AI 실시간 코치</h4>
              <Badge variant="outline" className="text-[10px]">LIVE</Badge>
            </div>
            <CardContent className="flex flex-col gap-2">
              {AI_LIVE_CUES.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-2.5 rounded-md border-l-2 ${
                    c.type === 'warning' ? 'border-[var(--warning)] bg-[var(--warning)]/5' :
                    c.type === 'insight' ? 'border-[var(--primary)] bg-[var(--primary)]/5' :
                    'border-[var(--success)] bg-[var(--success)]/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] leading-relaxed">{c.text}</span>
                    <span className="text-[9px] text-[var(--foreground-subtle)] shrink-0 tabular-nums">{c.time}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">질문지</h4>
              <Badge variant="success" className="text-[10px]">
                {QUESTIONS.filter(q => q.asked).length} / {QUESTIONS.length}
              </Badge>
            </div>
            <CardContent className="flex flex-col gap-1.5">
              {QUESTIONS.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 + 0.3 }}
                  className={`flex items-start gap-2 p-2 rounded ${
                    q.asked ? 'bg-[var(--success)]/5' : 'hover:bg-[var(--gray-3)]'
                  }`}
                >
                  {q.asked ? (
                    <CheckCircle2 size={12} className={`mt-0.5 shrink-0 ${q.good ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`} />
                  ) : (
                    <Circle size={12} className="mt-0.5 shrink-0 text-[var(--foreground-subtle)]" />
                  )}
                  <span className={`text-[11px] leading-relaxed ${q.asked ? 'text-[var(--foreground-muted)] line-through' : ''}`}>
                    {q.q}
                  </span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 노트 패널 */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Card className="h-full">
              <div className="px-6 flex items-center gap-2">
                <FileText size={13} />
                <h4 className="text-sm font-semibold">실시간 노트</h4>
                <Badge variant="secondary" className="text-[10px]">자동 저장</Badge>
              </div>
              <CardContent>
                <textarea
                  rows={5}
                  placeholder="면접 중 메모를 입력하세요. AI가 요약과 평가 초안을 자동 생성합니다."
                  className="w-full px-3 py-2 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] resize-none leading-relaxed"
                  defaultValue="• 분산 시스템 경험 매우 풍부 - 쿠팡 4년 Kafka 운영\n• 답변이 구체적이고 논리적\n• 장애 대응 경험 질문 추가 필요"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
