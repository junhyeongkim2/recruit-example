import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeftRight, CheckCircle2, Clock3, UserPlus, Mail, Laptop, KeyRound,
  Building2, AlertCircle, ArrowRight, Sparkles, FileCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { useEscapeKey } from '../shared/useEscapeKey';
import { Icon3D } from '../shared/Icon3D';
import { useNav } from '../shared/navContext';

const NEW_HIRES = [
  { id: 'H-1', name: '이도윤', position: '백엔드 (시니어)', startDate: '2026-05-15', handoffReady: true, employeeNo: '2026-0042', progress: 85 },
  { id: 'H-2', name: '최민호', position: '백엔드 (시니어)', startDate: '2026-06-01', handoffReady: false, employeeNo: null, progress: 60 },
  { id: 'H-3', name: '임채원', position: '프론트 엔지니어', startDate: '2026-05-20', handoffReady: true, employeeNo: '2026-0043', progress: 92 },
];

const CHECKLIST = [
  { key: 'offer', label: '오퍼 수락 완료', icon: CheckCircle2, done: true },
  { key: 'docs', label: '입사 서류 제출', icon: FileCheck, done: true, detail: '4/4 완료' },
  { key: 'empno', label: '사번 채번', icon: UserPlus, done: true, detail: '2026-0042' },
  { key: 'email', label: '계정 생성 요청 (SSO)', icon: Mail, done: true, detail: 'iDOYOON@kakaocorp.com' },
  { key: 'device', label: '장비 신청', icon: Laptop, done: true, detail: 'MacBook Pro 16 (M4)' },
  { key: 'access', label: '출입 카드 발급', icon: KeyRound, done: false },
  { key: 'transfer', label: '발령관리 v3 연동', icon: ArrowLeftRight, done: false, critical: true },
];

const HANDOFF_FIELDS = [
  { label: '사번', value: '2026-0042', auto: true },
  { label: '이름', value: '이도윤', auto: true },
  { label: '입사일', value: '2026-05-15', auto: true },
  { label: '공동체', value: '카카오', auto: true },
  { label: '소속 본부', value: '기술플랫폼', auto: true },
  { label: '소속 팀', value: 'HRIS 개발팀', auto: true },
  { label: '직위', value: '시니어 백엔드 엔지니어', auto: true },
  { label: '레벨', value: 'L5', auto: true },
  { label: '조직장', value: 'j.park', auto: false },
  { label: '멘토', value: 'bentley.jun', auto: false },
];

export default function OnboardingHandoff() {
  const [selectedId, setSelectedId] = useState<string>('H-1');
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [handoffStep, setHandoffStep] = useState(0);
  const { showToast } = useNav();

  useEscapeKey(handoffOpen, () => setHandoffOpen(false));

  const selected = NEW_HIRES.find(h => h.id === selectedId) || NEW_HIRES[0];
  const completed = CHECKLIST.filter(c => c.done).length;

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon3D name="users" size={40} />
              <div>
                <h3 className="text-sm font-semibold">입사 · 발령관리 핸드오프</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  입사 서류 → 사번 채번 → 계정 생성 → <span className="text-[var(--primary)] font-medium">발령관리 v3 연동</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const count = NEW_HIRES.filter(h => h.handoffReady).length;
                  showToast(`핸드오프 준비 완료 ${count}명을 일괄 처리했어요`);
                }}
              >
                일괄 처리 ({NEW_HIRES.filter(h => h.handoffReady).length})
              </Button>
              <Button size="sm" onClick={() => setHandoffOpen(true)}>
                <ArrowLeftRight size={14} /> 발령 생성
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 입사자 리스트 */}
        <FadeIn delay={0.05} className="col-span-12 lg:col-span-4">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h3 className="text-sm font-semibold">입사 예정자</h3>
              <Badge variant="secondary" className="text-[10px]">{NEW_HIRES.length}명</Badge>
            </div>
            <CardContent className="flex flex-col gap-1.5">
              {NEW_HIRES.map(h => (
                <motion.button
                  key={h.id}
                  whileHover={{ x: 2 }}
                  onClick={() => setSelectedId(h.id)}
                  className={`text-left p-3 rounded-md border transition-all ${
                    selectedId === h.id
                      ? 'border-[var(--foreground)] bg-[var(--gray-3)]'
                      : 'border-[var(--border)] hover:bg-[var(--gray-3)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                      {h.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{h.name}</span>
                        {h.handoffReady ? (
                          <Badge variant="success" className="text-[9px]">준비 완료</Badge>
                        ) : (
                          <Badge variant="warning" className="text-[9px]">진행 중</Badge>
                        )}
                      </div>
                      <div className="text-[10px] text-[var(--foreground-muted)]">{h.position}</div>
                      <div className="text-[10px] text-[var(--foreground-subtle)]">입사일 {h.startDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 rounded-full bg-[var(--gray-3)] overflow-hidden">
                      <motion.div
                        className="h-full bg-[var(--primary)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${h.progress}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <span className="text-[10px] text-[var(--foreground-muted)]">{h.progress}%</span>
                  </div>
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 체크리스트 + 핸드오프 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-8">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">{selected.name} 입사 체크리스트</h3>
                <Badge variant="outline" className="text-[10px]">{completed}/{CHECKLIST.length}</Badge>
              </div>
            </div>
            <CardContent className="flex flex-col gap-2">
              <StaggerContainer className="flex flex-col gap-1.5">
                {CHECKLIST.map((c, i) => {
                  const Icon = c.icon;
                  const connectNext = i < CHECKLIST.length - 1;
                  return (
                    <StaggerItem key={c.key}>
                      <motion.div
                        whileHover={{ x: 2 }}
                        className={`relative flex items-center gap-3 p-3 rounded-md border ${
                          c.critical && !c.done
                            ? 'border-[var(--primary)]/40 bg-[var(--primary)]/5'
                            : c.done
                            ? 'border-[var(--success)]/30 bg-[var(--success)]/5'
                            : 'border-[var(--border)]'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          c.done ? 'bg-[var(--success)]/15 text-[var(--success)]' : c.critical ? 'bg-[var(--primary)]/15 text-[var(--primary)]' : 'bg-[var(--gray-3)] text-[var(--foreground-muted)]'
                        }`}>
                          {c.done ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium">
                            {c.label}
                            {c.critical && <Badge variant="warning" className="text-[9px] ml-1.5">중요</Badge>}
                          </div>
                          {c.detail && <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{c.detail}</div>}
                        </div>
                        {c.done ? (
                          <Badge variant="success" className="text-[9px]">완료</Badge>
                        ) : c.critical ? (
                          <Button size="xs" onClick={() => setHandoffOpen(true)}>
                            <ArrowLeftRight size={11} /> 연동
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => showToast(`${c.label} 진행 화면을 열었어요`)}
                          >
                            진행
                          </Button>
                        )}
                        {connectNext && (
                          <div className="absolute left-[27px] top-full w-px h-1.5 bg-[var(--border)]" />
                        )}
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* 핸드오프 모달 */}
      <AnimatePresence>
        {handoffOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHandoffOpen(false)}
              className="fixed inset-0 bg-black/40 z-[1040]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] max-w-[90vw] max-h-[85vh] overflow-auto bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-2xl z-[1050]"
            >
              <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight size={16} className="text-[var(--primary)]" />
                  <h3 className="text-sm font-semibold">발령관리 v3 연동</h3>
                  <Badge variant="outline" className="text-[10px]">신규 입사 → 첫 발령 자동 생성</Badge>
                </div>
              </div>

              <div className="p-6">
                {/* 진행 단계 */}
                <div className="flex items-center gap-2 mb-4">
                  {['데이터 매핑', '검증', '발령 생성'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className={`flex-1 flex items-center gap-2 p-2 rounded border ${
                        i === handoffStep ? 'border-[var(--foreground)] bg-[var(--gray-3)]' : i < handoffStep ? 'border-[var(--success)]/40 bg-[var(--success)]/5' : 'border-[var(--border)]'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                          i === handoffStep ? 'bg-[var(--foreground)] text-[var(--background)]' : i < handoffStep ? 'bg-[var(--success)] text-white' : 'bg-[var(--gray-3)]'
                        }`}>
                          {i < handoffStep ? <CheckCircle2 size={12} /> : i + 1}
                        </div>
                        <span className="text-xs font-medium">{s}</span>
                      </div>
                      {i < 2 && <ArrowRight size={12} className="text-[var(--foreground-subtle)]" />}
                    </div>
                  ))}
                </div>

                {/* 매핑 */}
                {handoffStep === 0 && (
                  <div>
                    <div className="text-xs text-[var(--foreground-muted)] mb-2">
                      채용관리 → 발령관리 v3 필드 매핑. 자동 채움 항목을 검토해 주세요.
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {HANDOFF_FIELDS.map(f => (
                        <div key={f.label} className="p-2 rounded-md border border-[var(--border)]">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] text-[var(--foreground-muted)]">{f.label}</span>
                            {f.auto ? (
                              <Badge variant="success" className="text-[9px]">자동</Badge>
                            ) : (
                              <Badge variant="warning" className="text-[9px]">확인 필요</Badge>
                            )}
                          </div>
                          <div className="text-xs font-medium">{f.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {handoffStep === 1 && (
                  <div className="flex flex-col gap-2">
                    {[
                      { ok: true, text: '사번 중복 검사 통과 (2026-0042)' },
                      { ok: true, text: '조직 구조 유효성 확인 (기술플랫폼/HRIS 개발팀)' },
                      { ok: true, text: '입사일 업무일 검증 통과 (2026-05-15 목요일)' },
                      { ok: true, text: '계정 생성 상태: 활성' },
                      { ok: false, text: '출입 카드 발급 대기 중 — 첫 출근일 지급 예정' },
                    ].map((v, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-2 p-2.5 rounded-md border border-[var(--border)]"
                      >
                        {v.ok ? <CheckCircle2 size={14} className="text-[var(--success)] mt-0.5" /> : <AlertCircle size={14} className="text-[var(--warning)] mt-0.5" />}
                        <span className="text-xs">{v.text}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
                {handoffStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-3 py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="w-16 h-16 rounded-full bg-[var(--success)]/15 flex items-center justify-center"
                    >
                      <CheckCircle2 size={28} className="text-[var(--success)]" />
                    </motion.div>
                    <div className="text-center">
                      <div className="text-sm font-semibold">발령 생성 완료</div>
                      <div className="text-xs text-[var(--foreground-muted)] mt-1">
                        발령 번호: <span className="font-mono font-semibold text-[var(--foreground)]">TRF-2026-0142</span>
                      </div>
                      <div className="text-xs text-[var(--foreground-muted)] mt-0.5">
                        발령관리 v3에서 승인 라인으로 전송되었습니다.
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => showToast('발령관리 v3 새 탭으로 이동')}
                    >
                      발령관리 v3에서 열기 →
                    </Button>
                  </motion.div>
                )}
              </div>

              <div className="px-6 py-3 border-t border-[var(--border)] flex justify-between">
                <Button variant="outline" size="sm" onClick={() => setHandoffOpen(false)}>취소</Button>
                <div className="flex gap-2">
                  {handoffStep > 0 && (
                    <Button variant="outline" size="sm" onClick={() => setHandoffStep(handoffStep - 1)}>이전</Button>
                  )}
                  {handoffStep < 2 ? (
                    <Button size="sm" onClick={() => setHandoffStep(handoffStep + 1)}>
                      {handoffStep === 0 ? '검증' : '발령 생성'} <ArrowRight size={13} />
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => setHandoffOpen(false)}>
                      확인
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
