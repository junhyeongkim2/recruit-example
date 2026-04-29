import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Heart, Ear, Briefcase, Edit3, Plus, CheckCircle2,
  Zap, Clock3, AlertTriangle, Users2, Workflow,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// h.place 1_62 — 긍정 / 일력(경청) / 직무·역할 기반 + 상황 조건 카드

const POSITIVE_TRAITS = [
  { label: '긍정', subtitle: '긍정성', desc: '어떤 상황에서도 긍정적으로 바라보며 해결책을 찾습니다.' },
  { label: '성실', subtitle: '성실성', desc: '상황이 힘들어도 흔들리지 않고 맡은 일을 끝까지 해냅니다.' },
  { label: '열정', subtitle: '열정성', desc: '높은 몰입도를 바탕으로 꾸준히 결과를 만들어 냅니다.' },
];

const LISTENING_TRAITS = [
  { label: '경청', subtitle: '경청성', desc: '다른 사람의 의견을 잘 듣고 공감하는 자세가 있어요.' },
  { label: '공감', subtitle: '공감력', desc: '상대방의 관점을 공감하며 관계를 유지할 수 있어요.' },
  { label: '배려', subtitle: '배려심', desc: '상대방의 상황을 이해하고 배려할 수 있어요.' },
];

const JOB_ROLES = [
  {
    label: '운영기획팀장 · 일반 직무',
    items: [
      '조직의 중장기 전략 목표를 직무 기반으로 분석함',
      '구성원의 성과 관리와 부서별 일정을 체계적으로 조율함',
      '기획안 및 주요 보고서를 명확하게 작성 및 전파함',
    ],
  },
];

const SITUATION_CARDS = [
  { icon: Clock3, label: '장기 근속이 예상되는 부족한 인재' },
  { icon: Zap, label: '변화하는 상황에 빠르게 적응할 수 있는 인재' },
  { icon: AlertTriangle, label: '변화한 위기와 지시에 빠르게 체계적으로 일하는 인재' },
  { icon: Users2, label: '자율성과 소통을 바탕으로 주도적으로 일하는 인재' },
];

const RECOMMENDATIONS = [
  {
    title: '장기 근속이 예상되는 부족한 인재',
    bullets: [
      '목표를 바탕으로 일상 업무의 우선순위를 조정하세요.',
      '어려운 업무 상황에서는 동료와 협력하며 해결책을 찾습니다.',
      '유용한 팀의 정기에 단단히 백본을 탔으며, 이를 기반으로 강한 실행력을 보이는 부족한 인재입니다.',
    ],
    tags: ['성실심', '근면성', '헌신'],
  },
  {
    title: '변화하는 상황에 빠르게 적응할 수 있는 인재',
    bullets: [
      '예상치 못한 변화에도 빠르게 대응할 수 있는 인재입니다.',
      '세로운 정보를 바로 이해하고 팀을 이끕니다.',
      '복잡한 상황에서도 경심있게 방향을 잡고, 새로운 정보를 빠르게 이해하고 적용하는 능력을 가지고 있는 인재입니다.',
    ],
    tags: ['단호성', '민첩성', '즉흥력'],
  },
];

export default function CompetencyDesigner() {
  const [selectedSituation, setSelectedSituation] = useState(0);

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* 좌측: 긍정 / 경청 / 직무 역할 */}
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-md bg-[var(--success)]/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-[var(--success)]" />
            <span className="text-xs">인재상 및 핵심 가치를 기반으로 우리 회사에 필요한 행동 특성을 정리했어요.</span>
          </div>
          <Button variant="outline" size="xs"><Edit3 size={10} /> 수정하기</Button>
        </motion.div>

        {/* 긍정 카드 */}
        <Card className="h-full">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[var(--primary)]/10 flex items-center justify-center">
                <Heart size={14} className="text-[var(--primary)]" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-semibold">긍정</div>
                <div className="text-[10px] text-[var(--foreground-muted)]">긍정성, 낙관성, 수용성, 용기, 희망</div>
              </div>
            </div>
            <div className="pl-10 flex flex-col gap-1.5">
              {POSITIVE_TRAITS.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-2 text-[11px]"
                >
                  <span className="text-[var(--foreground-subtle)]">•</span>
                  <span className="text-[var(--foreground-muted)] leading-relaxed">{t.desc}</span>
                </motion.div>
              ))}
            </div>
            <div className="pl-10 flex items-center gap-1.5 pt-2 border-t border-[var(--border)]">
              <Badge variant="secondary" className="text-[10px]">긍정성</Badge>
              <Badge variant="secondary" className="text-[10px]">태도</Badge>
              <Badge variant="secondary" className="text-[10px]">인식</Badge>
              <Plus size={10} className="text-[var(--foreground-muted)] ml-1" />
            </div>
          </CardContent>
        </Card>

        {/* 경청 카드 */}
        <Card className="h-full">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[var(--primary)]/10 flex items-center justify-center">
                <Ear size={14} className="text-[var(--primary)]" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-semibold">경청</div>
                <div className="text-[10px] text-[var(--foreground-muted)]">배려, 이해, 공감, 존중, 소통력</div>
              </div>
            </div>
            <div className="pl-10 flex flex-col gap-1.5">
              {LISTENING_TRAITS.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.2 }}
                  className="flex items-start gap-2 text-[11px]"
                >
                  <span className="text-[var(--foreground-subtle)]">•</span>
                  <span className="text-[var(--foreground-muted)] leading-relaxed">{t.desc}</span>
                </motion.div>
              ))}
            </div>
            <div className="pl-10 flex items-center gap-1.5 pt-2 border-t border-[var(--border)]">
              <Badge variant="secondary" className="text-[10px]">공감력</Badge>
              <Badge variant="secondary" className="text-[10px]">경청성</Badge>
              <Badge variant="secondary" className="text-[10px]">관계관리</Badge>
              <Plus size={10} className="text-[var(--foreground-muted)] ml-1" />
            </div>
          </CardContent>
        </Card>

        {/* 직무·역할 기반 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-md bg-[var(--primary)]/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Briefcase size={13} className="text-[var(--primary)]" />
            <span className="text-xs">직군 · 직무를 기반으로 실무에서 요구하는 행동 특성을 정리했어요.</span>
          </div>
          <Button variant="outline" size="xs"><Edit3 size={10} /> 수정하기</Button>
        </motion.div>

        <Card className="h-full">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                <Workflow size={14} className="text-[var(--foreground)]" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-semibold">{JOB_ROLES[0].label}</div>
                <div className="text-[10px] text-[var(--foreground-muted)]">운영기획팀장 · 일반 직무</div>
              </div>
            </div>
            <div className="pl-10 flex flex-col gap-1.5">
              {JOB_ROLES[0].items.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 size={11} className="text-[var(--success)] mt-0.5 shrink-0" />
                  <span className="text-[var(--foreground-muted)] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <div className="pl-10 flex items-center gap-1.5 pt-2 border-t border-[var(--border)]">
              <Badge variant="secondary" className="text-[10px]">분석력</Badge>
              <Badge variant="secondary" className="text-[10px]">조정력</Badge>
              <Badge variant="secondary" className="text-[10px]">인내력</Badge>
              <Plus size={10} className="text-[var(--foreground-muted)] ml-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 우측: 상황 조건 카드 + 맞춤 추천 */}
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-md bg-[var(--warning)]/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-[var(--warning)]" />
            <span className="text-xs">회사 상황에 맞는 카드를 선택하면 해당 조건에 적합한 행동 특성을 추천해 드려요.</span>
          </div>
          <Button variant="outline" size="xs"><Edit3 size={10} /> 수정하기</Button>
        </motion.div>

        {/* 상황 조건 요약 */}
        <Card className="h-full">
          <div className="px-6">
            <h4 className="text-sm font-semibold">상황 조건 요약</h4>
          </div>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {SITUATION_CARDS.map((s, i) => {
                const Icon = s.icon;
                const active = i === selectedSituation;
                return (
                  <motion.button
                    key={i}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSituation(i)}
                    className={`text-left p-3 rounded-md border transition-colors relative ${
                      active
                        ? 'border-[var(--success)]/40 bg-[var(--success)]/5'
                        : 'border-[var(--border)] hover:bg-[var(--gray-3)]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-md bg-[var(--gray-3)] flex items-center justify-center mb-2">
                      <Icon size={13} className="text-[var(--foreground)]" strokeWidth={1.75} />
                    </div>
                    <div className="text-[11px] leading-relaxed line-clamp-2">{s.label}</div>
                    {active && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[var(--success)] flex items-center justify-center"
                      >
                        <CheckCircle2 size={10} className="text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI 맞춤 추천 */}
        <AnimatePresence mode="wait">
          {RECOMMENDATIONS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[var(--primary)]/10 flex items-center justify-center">
                      <Sparkles size={12} className="text-[var(--primary)]" />
                    </div>
                    <span className="text-sm font-semibold">{r.title}</span>
                  </div>
                  <div className="pl-9 flex flex-col gap-1.5">
                    {r.bullets.map((b, j) => (
                      <div key={j} className="text-[11px] text-[var(--foreground-muted)] leading-relaxed flex items-start gap-2">
                        <span className="text-[var(--foreground-subtle)] shrink-0">•</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pl-9 flex items-center gap-1.5 pt-2 border-t border-[var(--border)]">
                    {r.tags.map(t => (
                      <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                    ))}
                    <Plus size={10} className="text-[var(--foreground-muted)] ml-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
