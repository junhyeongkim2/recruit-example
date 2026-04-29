import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import {
  Sparkles, Target, ClipboardList, Users, Calendar, DollarSign, Plus,
  CheckCircle2, GripVertical, ChevronDown, Save, Trash2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import CompetencyDesigner from './CompetencyDesigner';
import ProcessFlowDesigner from './ProcessFlowDesigner';
import { Icon3D } from '../shared/Icon3D';

type Step = 'plan' | 'criteria' | 'process';

const STEPS: { key: Step; label: string; icon: any; desc: string }[] = [
  { key: 'plan', label: '채용 계획', icon: ClipboardList, desc: 'TO · 예산 · 담당자' },
  { key: 'criteria', label: '선발 기준 설계', icon: Target, desc: '역량 가중치 · 인재상' },
  { key: 'process', label: '프로세스 설계', icon: Calendar, desc: '단계 · 면접관 · 일정' },
];

interface ProcessStage {
  id: string;
  name: string;
  duration: number;
  interviewers: number;
}

const INIT_PROCESS: ProcessStage[] = [
  { id: 's1', name: '서류 심사', duration: 3, interviewers: 2 },
  { id: 's2', name: '1차 면접', duration: 5, interviewers: 3 },
  { id: 's3', name: '2차 임원 면접', duration: 7, interviewers: 2 },
  { id: 's4', name: '처우 협의', duration: 3, interviewers: 1 },
];

const COMPETENCIES = [
  { name: '분산 시스템 설계', weight: 35 },
  { name: '오너십 · 자율성', weight: 25 },
  { name: '기술 커뮤니케이션', weight: 20 },
  { name: '문제해결 능력', weight: 20 },
];

export default function HiringPlanningSuite() {
  const [step, setStep] = useState<Step>('plan');
  const [stages, setStages] = useState<ProcessStage[]>(INIT_PROCESS);
  const [weights, setWeights] = useState(COMPETENCIES);

  const totalDuration = stages.reduce((s, x) => s + x.duration, 0);

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon3D name="target" size={40} />
              <div>
                <h3 className="text-sm font-semibold">채용 기획 에이전트</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  TO 계획 · 선발 기준 · 프로세스 설계를 한 번에
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><Save size={14} /> 임시 저장</Button>
              <Button size="sm">공고로 내보내기 →</Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* 3단계 프로그레스 */}
      <FadeIn delay={0.05}>
        <Card className="h-full">
          <CardContent>
            <div className="flex items-center gap-3">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const active = s.key === step;
                const done = STEPS.findIndex(x => x.key === step) > i;
                return (
                  <div key={s.key} className="flex-1 flex items-center gap-2">
                    <motion.button
                      whileHover={{ y: -1 }}
                      onClick={() => setStep(s.key)}
                      className={`flex-1 flex items-center gap-2 p-3 rounded-lg border transition-all ${
                        active
                          ? 'border-[var(--foreground)] bg-[var(--gray-3)]'
                          : done
                          ? 'border-[var(--success)]/30 bg-[var(--success)]/5'
                          : 'border-[var(--border)]'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        active ? 'bg-[var(--foreground)] text-[var(--background)]' : done ? 'bg-[var(--success)] text-white' : 'bg-[var(--gray-3)] text-[var(--foreground-muted)]'
                      }`}>
                        {done ? <CheckCircle2 size={14} /> : i + 1}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-xs font-semibold truncate">{s.label}</div>
                        <div className="text-[10px] text-[var(--foreground-muted)] truncate">{s.desc}</div>
                      </div>
                      <Icon size={14} className="text-[var(--foreground-muted)]" />
                    </motion.button>
                    {i < STEPS.length - 1 && (
                      <div className="w-4 h-px bg-[var(--border)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <AnimatePresence mode="wait">
        {/* STEP 1: 채용 계획 */}
        {step === 'plan' && (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-12 gap-4"
          >
            <div className="col-span-12 lg:col-span-7">
              <Card className="h-full">
                <div className="px-6">
                  <h3 className="text-sm font-semibold">기본 정보</h3>
                </div>
                <CardContent className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-xs text-[var(--foreground-muted)]">채용 공고명 *</label>
                    <input
                      type="text"
                      defaultValue="2026년 상반기 백엔드 엔지니어 (시니어)"
                      className="w-full mt-1 h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--foreground-muted)]">부서 *</label>
                    <div className="mt-1 h-9 px-3 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                      <span>기술플랫폼 · HRIS 개발팀</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[var(--foreground-muted)]">채용 유형 *</label>
                    <div className="mt-1 h-9 px-3 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                      <span>경력 수시</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[var(--foreground-muted)]">채용 인원 (TO) *</label>
                    <input type="number" defaultValue="3" className="w-full mt-1 h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)]" />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--foreground-muted)]">예상 입사일 *</label>
                    <input type="text" defaultValue="2026-06-01" className="w-full mt-1 h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)]" />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--foreground-muted)]">연봉 밴드 *</label>
                    <div className="mt-1 h-9 px-3 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                      <span>Senior · 8,000 ~ 12,000</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[var(--foreground-muted)]">담당 HR BP *</label>
                    <div className="mt-1 h-9 px-3 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                      <span>may.kim · 피플 HRBP</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-[var(--foreground-muted)]">채용 배경</label>
                    <textarea
                      className="w-full mt-1 px-3 py-2 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] resize-none"
                      rows={3}
                      defaultValue="HRIS 플랫폼 확장에 따른 시니어 백엔드 인력 충원. Kafka·K8s 프로덕션 경험자 우대."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              <Card className="h-full">
                <div className="px-6 flex items-center gap-2">
                  <DollarSign size={14} className="text-[var(--primary)]" />
                  <h3 className="text-sm font-semibold">예산 · 승인</h3>
                </div>
                <CardContent className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] text-[var(--foreground-muted)]">배정 예산</div>
                      <div className="text-xl font-semibold mt-1">3.6억</div>
                      <div className="text-[10px] text-[var(--foreground-muted)]">1인당 1.2억</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--foreground-muted)]">채용 에이전시 예상</div>
                      <div className="text-xl font-semibold mt-1">2,400만</div>
                      <div className="text-[10px] text-[var(--foreground-muted)]">수락 연봉 × 15%</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[var(--border)]">
                    <div className="text-xs font-medium mb-2">승인 라인</div>
                    <div className="flex items-center gap-2 text-xs">
                      {[
                        { n: 'bentley.jun', r: '기안', ok: true },
                        { n: 'may.kim', r: 'HR BP', ok: true },
                        { n: 'j.park', r: '본부장', ok: false },
                        { n: 'cfo', r: 'CFO', ok: false },
                      ].map((a, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] ${
                            a.ok ? 'bg-[var(--success)]/15 text-[var(--success)]' : 'bg-[var(--gray-3)] text-[var(--foreground-muted)]'
                          }`}>
                            {a.ok ? <CheckCircle2 size={13} /> : i + 1}
                          </div>
                          <div className="text-[10px] text-center">
                            <div className="font-medium truncate w-full">{a.n}</div>
                            <div className="text-[var(--foreground-subtle)]">{a.r}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full">
                <div className="px-6 flex items-center gap-2">
                  <Users size={14} className="text-[var(--primary)]" />
                  <h3 className="text-sm font-semibold">채용 담당자</h3>
                </div>
                <CardContent className="flex flex-col gap-1.5">
                  {[
                    { name: 'bentley.jun', role: '기안자', badge: '주담당' },
                    { name: 'may.kim', role: 'HR BP' },
                    { name: 'jay.lee', role: '채용 운영' },
                  ].map(m => (
                    <div key={m.name} className="flex items-center gap-2 p-2 rounded-md border border-[var(--border)]">
                      <div className="w-7 h-7 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium">{m.name}</div>
                        <div className="text-[10px] text-[var(--foreground-muted)]">{m.role}</div>
                      </div>
                      {m.badge && <Badge variant="success" className="text-[10px]">{m.badge}</Badge>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* STEP 2: 선발 기준 설계 (h.place 실물 역량 설계 복제) */}
        {step === 'criteria' && (
          <motion.div
            key="criteria"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <CompetencyDesigner />
          </motion.div>
        )}

        {/* STEP 3: 프로세스 설계 (h.place 실물 9단계 플로우 복제) */}
        {step === 'process' && (
          <motion.div
            key="process"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-4"
          >
            <ProcessFlowDesigner />

            {/* 간단 가중치 편집 (아래쪽 축약) */}
            <Card className="h-full">
              <div className="px-6 flex items-center justify-between">
                <h4 className="text-sm font-semibold">세부 단계 설정</h4>
                <span className="text-xs text-[var(--foreground-muted)]">예상 소요 <span className="font-semibold text-[var(--foreground)]">{totalDuration}일</span></span>
              </div>
              <CardContent>
                <Reorder.Group axis="y" values={stages} onReorder={setStages} className="flex flex-col gap-2">
                  {stages.map((s, i) => (
                    <Reorder.Item key={s.id} value={s}>
                      <motion.div
                        layout
                        whileDrag={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical size={14} className="text-[var(--foreground-subtle)]" />
                        <div className="w-7 h-7 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">{i + 1}</div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={s.name}
                            onChange={(e) => setStages(stages.map(x => x.id === s.id ? { ...x, name: e.target.value } : x))}
                            className="w-full text-sm font-medium bg-transparent focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[var(--foreground-muted)]">
                          <span>{s.duration}일</span><span>·</span><span>면접관 {s.interviewers}명</span>
                        </div>
                        <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]">
                          <Trash2 size={12} className="inline" />
                        </button>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => setStages([...stages, { id: `s${Date.now()}`, name: '새 단계', duration: 3, interviewers: 2 }])}
                >
                  <Plus size={14} /> 단계 추가
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
