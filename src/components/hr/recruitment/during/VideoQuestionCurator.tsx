import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, Pause, Sparkles, FileText, Settings, Check, ChevronDown,
  AlertCircle, Video, Plus,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { Lightbulb, ChevronLeft } from 'lucide-react';
import { useNav } from '../shared/navContext';

type TabKey = 'intro' | 'basic' | 'experience' | 'situation' | 'language';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'intro', label: '자기소개' },
  { key: 'basic', label: '기본 면접' },
  { key: 'experience', label: '경험 기반 면접' },
  { key: 'situation', label: '상황 면접' },
  { key: 'language', label: '외국어 면접' },
];

const QUESTIONS = {
  intro: [
    { num: '01', text: '본인을 이력서에 기재 성공하신 경험에 대해 말씀해 주세요.', difficulty: '쉬움' },
    { num: '02', text: '나의 어떤 장점을 팀에 접목할 수 있는지 말씀해 주세요.', difficulty: '보통' },
    { num: '03', text: '본인을 잘 알면 키우 특기가 있는지 말씀해 주세요.', difficulty: '쉬움' },
  ],
  basic: [
    { num: '01', text: '직무에 관한 이해와 이와 관련한 구체적인 사례를 설명해 주세요.', difficulty: '보통' },
    { num: '02', text: '이번 채용에 지원한 이유는 무엇입니까?', difficulty: '쉬움' },
    { num: '03', text: '우리 회사의 비전과 본인의 커리어 목표가 어떻게 연결되는지 말씀해 주세요.', difficulty: '보통' },
  ],
  experience: [
    { num: '01', text: '팀 프로젝트에서 갈등이 발생한 경험을 말씀해 주세요.', difficulty: '어려움' },
    { num: '02', text: '실패 경험과 극복 과정을 말씀해 주세요.', difficulty: '보통' },
  ],
  situation: [
    { num: '01', text: '긴급 이슈 발생 시 어떻게 대응하시겠습니까?', difficulty: '어려움' },
  ],
  language: [
    { num: '01', text: 'Please introduce yourself in English.', difficulty: '쉬움' },
  ],
};

const EVALUATION_CRITERIA = [
  { label: '창의성', weight: 25 },
  { label: '직무 이해도', weight: 30 },
  { label: '커뮤니케이션', weight: 20 },
  { label: '문제해결', weight: 25 },
];

export default function VideoQuestionCurator() {
  const [tab, setTab] = useState<TabKey>('basic');
  const [scriptOpen, setScriptOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [learnSideOpen, setLearnSideOpen] = useState(true);
  const { showToast } = useNav();

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                <Video size={16} className="text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">영상 면접 질문 자동 생성 및 분석</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  전문 면접관 수준의 면접 질문 큐레이팅 · 평가 척도 자동 생성
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => showToast('평가 설정 패널을 열었어요')}>
                <Settings size={14} /> 평가 설정
              </Button>
              <Button size="sm" onClick={() => showToast('AI가 새로운 질문을 생성하고 있어요')}>
                <Sparkles size={14} /> AI 질문 재생성
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측 녹색 학습 사이드 (h.place 영상면접 질문 녹색 사이드 복제) */}
        {learnSideOpen && (
          <div className="col-span-12 lg:col-span-3">
            <Card className="h-full bg-[var(--success)]/8 border-[var(--success)]/20">
              <div className="px-6 flex items-center justify-between">
                <span className="text-[10px] text-[var(--foreground-muted)]">채용 플래너</span>
                <button
                  onClick={() => setLearnSideOpen(false)}
                  className="w-6 h-6 rounded hover:bg-[var(--card)] text-[var(--foreground-muted)]"
                >
                  <ChevronLeft size={12} className="inline" />
                </button>
              </div>
              <CardContent className="flex flex-col gap-3">
                <h3 className="text-base font-semibold leading-snug">
                  AI가 제안하는<br />
                  영상 면접 질문을<br />
                  확인할 수 있어요.
                </h3>
                <p className="text-[11px] text-[var(--foreground-muted)]">
                  직무·인재상 기반으로 최적화된 질문과 평가 척도를 제공합니다.
                </p>

                <div className="flex flex-col gap-2 mt-2">
                  {[
                    { icon: Sparkles, text: '직무 요건과 인재상을 자동 반영' },
                    { icon: Lightbulb, text: '평가 척도와 함께 구조화된 질문' },
                    { icon: Video, text: '영상 답변 자동 분석 리포트 제공' },
                  ].map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-2"
                      >
                        <Icon size={12} className="text-[var(--success)] mt-0.5 shrink-0" />
                        <span className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">{t.text}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* 예시 썸네일 */}
                <div className="relative aspect-video rounded-lg bg-[var(--gray-3)] overflow-hidden mt-2 cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[var(--card)]/80 flex items-center justify-center">
                      <Play size={14} className="text-[var(--foreground)] ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 text-[9px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded">
                    예시 보기 · 2분
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--success)]/20 flex items-center justify-between">
                  <span className="text-[10px] text-[var(--foreground-muted)]">가이드 문서</span>
                  <span className="text-[10px] text-[var(--success)] font-medium">4 / 9</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 좌측 영상 미리보기 */}
        <FadeIn delay={0.05} className={learnSideOpen ? 'col-span-12 lg:col-span-4' : 'col-span-12 lg:col-span-5'}>
          <Card className="py-0 overflow-hidden">
            {/* 탭 */}
            <div className="px-4 py-2 border-b border-[var(--border)] overflow-x-auto">
              <div className="flex items-center gap-1">
                {TABS.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`relative text-[11px] px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                      tab === t.key
                        ? 'text-[var(--foreground)] font-semibold'
                        : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {t.label}
                    {tab === t.key && (
                      <motion.div
                        layoutId="vq-tab-bar"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[var(--foreground)]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 영상 */}
            <div className="relative aspect-video bg-[var(--gray-4)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlaying(!playing)}
                  className="w-14 h-14 rounded-full bg-[var(--foreground)] flex items-center justify-center"
                >
                  {playing ? (
                    <Pause size={20} className="text-[var(--background)]" fill="currentColor" />
                  ) : (
                    <Play size={20} className="text-[var(--background)] ml-0.5" fill="currentColor" />
                  )}
                </motion.button>
              </div>

              {/* 질문 오버레이 */}
              <div className="absolute top-0 left-0 right-0 p-4">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-xs font-semibold shrink-0">
                    Q1
                  </div>
                  <div className="bg-[var(--card)]/95 backdrop-blur rounded-md p-2 flex-1">
                    <div className="text-[11px] font-medium leading-relaxed">
                      자기 자신에 대한 강점과 약점을 설명해 주세요.
                    </div>
                  </div>
                </div>
              </div>

              {/* 타임라인 */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <div className="h-1 rounded-full bg-white/30 overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: '0%' }}
                    animate={{ width: playing ? '30%' : '12%' }}
                    transition={{ duration: playing ? 10 : 0.3, ease: 'linear' }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-white/80">
                  <span>{playing ? '00:35' : '00:12'}</span>
                  <span>04:32</span>
                </div>
              </div>
            </div>

            {/* 답변 스크립트 토글 */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">답변 스크립트</span>
                <Badge variant="outline" className="text-[10px]">자기심 이후</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[var(--foreground-muted)]">답변 요약 보기</span>
                <button
                  onClick={() => setScriptOpen(!scriptOpen)}
                  className={`relative w-9 h-5 rounded-full transition-colors ${
                    scriptOpen ? 'bg-[var(--success)]' : 'bg-[var(--gray-4)]'
                  }`}
                >
                  <motion.span
                    layout
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                    animate={{ left: scriptOpen ? '18px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {scriptOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-xs leading-relaxed text-[var(--foreground-muted)] bg-[var(--gray-3)]/50">
                    대학교 때 프로젝트를 진행하며 책임감 없이 일 하는 분들을 많이 봤는데, 당시에 프로젝트에 어떻게 임하는 지원자 성격을 확인한 후에, 책임감 있는 멤버들과 함께 가야 한다고 느꼈었습니다. 이런 프로젝트 안에 사이클을 제게 다시 주어진 과정을 거치면 되는 것 같았습니다. 프로젝트 경험에서 저의 가장 큰 강점은 한 번 시작한 프로젝트에 끝까지 매진하는 것입니다.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </FadeIn>

        {/* 우측 질문 설정 */}
        <FadeIn delay={0.1} className={learnSideOpen ? 'col-span-12 lg:col-span-5' : 'col-span-12 lg:col-span-7'}>
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">기본 질문 세팅 (평가 기준에 따른 리스크를 수정 수 있습니다)</h3>
              </div>
              <div className="flex items-center gap-1">
                <button className="text-[10px] text-[var(--foreground-muted)] px-2 py-1 rounded hover:bg-[var(--gray-3)]">상세보기</button>
              </div>
            </div>
            <CardContent className="flex flex-col gap-4">
              {/* 레벨 선택 */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[var(--foreground-muted)]">채용 본 정보</label>
                  <div className="mt-1 h-8 px-2 rounded border border-[var(--border)] flex items-center justify-between text-[11px]">
                    <span>HRIS 사원 연봉</span>
                    <ChevronDown size={11} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-[var(--foreground-muted)]">질문 분야</label>
                  <div className="mt-1 h-8 px-2 rounded border border-[var(--border)] flex items-center justify-between text-[11px]">
                    <span>역량검사 전형 선발 기준</span>
                    <ChevronDown size={11} />
                  </div>
                </div>
              </div>

              {/* 질문 카테고리 칩 */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {['전체', '자기소개', '기본 질문', '상황 질문', '경험 질문', '문답 질문', '외국어 질문'].map((c, i) => (
                  <button
                    key={c}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                      i === 0
                        ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                        : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
                <Button variant="outline" size="xs" onClick={() => showToast('새 질문을 추가했어요')}>
                  <Plus size={10} /> 추가
                </Button>
              </div>

              {/* 질문 리스트 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <StaggerContainer className="flex flex-col gap-2">
                    {QUESTIONS[tab].map((q) => (
                      <StaggerItem key={q.num}>
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="flex items-start gap-3 p-3 rounded-md border border-[var(--border)] bg-[var(--card)]"
                        >
                          <div className="w-8 h-8 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-[10px] font-semibold shrink-0">
                            {q.num}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant={q.difficulty === '어려움' ? 'error' : q.difficulty === '보통' ? 'warning' : 'success'}
                                className="text-[9px]"
                              >
                                {q.difficulty}
                              </Badge>
                            </div>
                            <div className="text-xs leading-relaxed">{q.text}</div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">
                              <FileText size={12} />
                            </button>
                            <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">
                              <Settings size={12} />
                            </button>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </motion.div>
              </AnimatePresence>

              {/* 평가 척도 */}
              <div className="pt-3 border-t border-[var(--border)]">
                <div className="text-xs font-semibold mb-2">평가 척도 (AI 자동 가중치)</div>
                <div className="space-y-2">
                  {EVALUATION_CRITERIA.map((c, i) => (
                    <div key={c.label}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>{c.label}</span>
                        <span className="text-[var(--foreground-muted)]">{c.weight}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${c.weight * 2.5}%` }}
                          transition={{ duration: 0.6, delay: i * 0.08 }}
                          className="h-full bg-[var(--primary)] rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
