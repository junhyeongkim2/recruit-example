import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, User, FileText, Briefcase, AlertTriangle, Save, Edit3,
  ChevronRight, CheckCircle2, Settings,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { useNav } from '../shared/navContext';

const CONFIG_TOGGLES = [
  { key: 'intro', label: '자기소개', desc: '지원자의 자기소개 및 이력 관련 질문', enabled: true },
  { key: 'experience', label: '지원자별 경험', desc: '지원서에 기재된 경험·사례 기반 심층 검증', enabled: true },
  { key: 'situation', label: '상황 면접', desc: '직무에서 접할 수 있는 업무 시뮬레이션', enabled: true },
  { key: 'culture', label: '조직 문화', desc: '조직 적합도·가치관 확인', enabled: false },
];

const QUESTIONS = [
  {
    num: '01',
    category: '지원자 대표 질문',
    title: 'ABC대학교 창업 프로그램에 경진대회에서 친환경 카페 창업 아이디어를 발표할 때, 고객 설문조사를 통해 어떤 주요 인사이트를 얻었으며, 이를 바탕으로 어떻게 실행 전략을 수정하였는지 구체적으로 설명해주시겠습니까?',
    context: '지원서 ABC대 창업 프로젝트에서 고객니즈를 분석해 구체적인 방향성에 대한 구체적인 설명을 요청하는 질문입니다. B2B 모델에서의 경기기소득 B2C 전환에 따른 시장 파트너를 어떻게 분석했는지, 의원교 프로젝트 참여 등과 같이 그 무엇보다 관련성 높은 창업 경험을 설명하고, 이를 프로젝트 성공의 설명과 요인으로 어떻게 요약하시는지 확인이 필요합니다.',
  },
];

const APPLICANT_SUMMARY = [
  { icon: User, title: '학력사항', text: 'ABC 대학교 우수한 성적으로 졸업 후, 커리 수강 경력을 거쳐 해외 유수의 대학원에서 심리학 학위를 받았으며, 졸업 후 영국에서의 활동을 하였습니다.' },
  { icon: Briefcase, title: '주 업무', text: '경력 사항이 아직 미비된 경험을 있습니다.' },
];

export default function MeetingInterviewGuide() {
  const { showToast } = useNav();
  const [toggles, setToggles] = useState(CONFIG_TOGGLES);
  const [includeAll, setIncludeAll] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const toggle = (key: string) => {
    setToggles(toggles.map(t => t.key === key ? { ...t, enabled: !t.enabled } : t));
  };

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                <Sparkles size={16} className="text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">AI 대면 면접 가이드</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  조직의 면접 목적(인재상·직무 요건·커스텀)에 맞춘 맞춤형 질문 구성
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditMode(true);
                  showToast('편집 모드로 전환했어요');
                }}
              >
                <Save size={14} /> 면접 가이드 편집
              </Button>
              <Button size="sm" onClick={() => showToast('AI가 면접 가이드를 생성했어요')}>
                <CheckCircle2 size={14} /> 면접 가이드 생성
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측 설정 패널 */}
        <FadeIn delay={0.05} className="col-span-12 lg:col-span-4">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <Sparkles size={14} className="text-[var(--primary)]" />
              <h3 className="text-sm font-semibold">AI 면접 가이드 템플릿 생성</h3>
            </div>
            <CardContent className="flex flex-col gap-3">
              <ul className="text-[11px] text-[var(--foreground-muted)] leading-relaxed space-y-1">
                <li>• 공고에서 요구하는 인재상과 직무 요건으로 AI 면접 가이드가 생성됩니다.</li>
                <li>• 설정 시 AI 질문 생성 시간이 단축됩니다. 해당 공고에 맞춰 입력해주세요.</li>
                <li>• 지원자가 많은 경우 AI 가이드 템플릿 관리에서 세팅해 놓으시길 추천드립니다.</li>
              </ul>

              <div>
                <label className="text-xs font-medium">설정명 *</label>
                <input
                  type="text"
                  placeholder="설정명을 입력해주세요."
                  className="w-full mt-1 h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] placeholder:text-[var(--foreground-subtle)]"
                />
              </div>

              {/* 지원자 정보 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold">지원자 정보</span>
                  <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAll}
                      onChange={(e) => setIncludeAll(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-[var(--foreground-muted)]">전체 정보 반영</span>
                  </label>
                </div>
                <div className="flex flex-col gap-1.5">
                  {toggles.map(t => (
                    <motion.div
                      key={t.key}
                      whileHover={{ x: 2 }}
                      className="flex items-center justify-between p-2.5 rounded-md border border-[var(--border)]"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-medium">{t.label}</div>
                        <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5 line-clamp-1">{t.desc}</div>
                      </div>
                      <button
                        onClick={() => toggle(t.key)}
                        className={`relative w-9 h-5 rounded-full transition-colors ${
                          t.enabled ? 'bg-[var(--success)]' : 'bg-[var(--gray-4)]'
                        }`}
                      >
                        <motion.span
                          layout
                          className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                          animate={{ left: t.enabled ? '18px' : '2px' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold mb-2">직무 정보</div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between p-2.5 rounded-md border border-[var(--border)]">
                    <div>
                      <div className="text-xs font-medium">직무 사항에 맞춘 전문 지식·경험 확인</div>
                      <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">직무 설명 기반 전문성 검증</div>
                    </div>
                    <div className="relative w-9 h-5 rounded-full bg-[var(--success)]">
                      <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 질문 방식 */}
              <div>
                <div className="text-xs font-semibold mb-2">질문 방식</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {['면접 방식', '세부 설명', '사용 언어', '세부 설명 선택'].map(l => (
                    <div key={l} className="h-8 px-2 rounded border border-[var(--border)] flex items-center text-[11px] text-[var(--foreground-muted)]">
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 우측 생성 결과 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-8">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">생성형 AI 면접 가이드</h3>
                <Badge variant="outline" className="text-[10px]">마이다스아이티</Badge>
                <Badge variant="success" className="text-[10px]">박주영 · 2266사관 신입사원 채용 · 합격 엔지니어 · 2022 인천대학 산교</Badge>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="w-7 h-7 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]"
                >
                  <Edit3 size={13} />
                </button>
                <button
                  onClick={() => showToast('면접 가이드 설정 패널 열기')}
                  className="w-7 h-7 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]"
                >
                  <Settings size={13} />
                </button>
              </div>
            </div>
            <CardContent className="flex flex-col gap-4">
              {/* 지원자 프로필 카드 */}
              <div className="p-4 rounded-lg bg-[var(--gray-3)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--card)] flex items-center justify-center text-base font-semibold">박</div>
                  <div>
                    <div className="text-sm font-semibold">박주영</div>
                    <div className="text-[11px] text-[var(--foreground-muted)]">2266사관 신입사원 채용 · 합격 엔지니어</div>
                    <div className="text-[11px] text-[var(--foreground-muted)]">2022 인천대학 산교</div>
                  </div>
                </div>
              </div>

              {/* 대표 질문 */}
              <div>
                <div className="text-xs font-medium text-[var(--foreground-muted)] mb-2">대표 질문</div>
                <div className="flex gap-3">
                  <div className="w-20 shrink-0 p-3 rounded-md bg-[var(--foreground)] text-[var(--background)] text-center">
                    <div className="text-[10px] opacity-80">지원자</div>
                    <div className="text-sm font-semibold mt-1">대표<br />질문</div>
                  </div>
                  <StaggerContainer className="flex-1 flex flex-col gap-2">
                    {QUESTIONS.map(q => (
                      <StaggerItem key={q.num}>
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="p-3 rounded-md border border-[var(--border)] bg-[var(--card)]"
                        >
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-[10px] font-semibold shrink-0">
                              {q.num}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] text-[var(--foreground-muted)]">{q.category}</div>
                              <div className="text-xs mt-1 leading-relaxed">{q.title}</div>
                              <div className="mt-2 pt-2 border-t border-[var(--border)] flex items-start gap-1.5">
                                <AlertTriangle size={11} className="text-[var(--warning)] mt-0.5 shrink-0" />
                                <div className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                                  {q.context}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>

              {/* 지원자 정보 요약 (컬러 헤더 카드) */}
              <div>
                <div className="text-xs font-medium text-[var(--foreground-muted)] mb-2">지원자 정보 요약</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[
                    { title: '학력사항', color: 'bg-[var(--success)]/15 text-[var(--success)]', text: 'ABC 대학교에서 우수한 성적으로 졸업 후, 커리 수강 경력을 거쳐 해외 유수의 대학원에서 심리학 학위를 받았으며, 졸업 후 영국에서의 활동을 하였습니다.' },
                    { title: '자기소개', color: 'bg-[var(--primary)]/15 text-[var(--primary)]', text: '매출 상장을 이끈 마케팅 경험을 바탕으로, 고객 중심의 브랜드 전략 경험을 나누고 싶습니다.' },
                    { title: '영상면접 결과', color: 'bg-[var(--warning)]/15 text-[var(--warning)]', text: '목표 달성을 위한 몰입도와 반복적 실행력을 보였으며, 국내 평가에서 성공을 이룬 모습이 인상적입니다.' },
                  ].map((s, i) => {
                    const icons = [User, FileText, Briefcase];
                    const Icon = icons[i];
                    return (
                      <motion.div
                        key={s.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-md border border-[var(--border)] overflow-hidden"
                      >
                        <div className={`px-3 py-2 flex items-center gap-2 ${s.color}`}>
                          <Icon size={12} strokeWidth={1.75} />
                          <span className="text-xs font-semibold">{s.title}</span>
                        </div>
                        <div className="p-3 text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                          {s.text}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => showToast('대면 면접 평가 시트를 열었어요')}>
                대문 면접 평가
              </Button>
              <Button size="sm" onClick={() => showToast('면접 가이드 공유 링크를 복사했어요')}>
                면접 가이드 공유 <ChevronRight size={13} />
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
