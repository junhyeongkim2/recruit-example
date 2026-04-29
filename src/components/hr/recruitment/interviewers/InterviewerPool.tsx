import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users2, Search, Filter, Plus, Star, Clock3, CheckCircle2, AlertCircle,
  TrendingUp, Award, MessageSquare, Mail,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

interface Interviewer {
  id: string;
  name: string;
  team: string;
  role: string;
  level: string;
  specialties: string[];
  totalInterviews: number;
  monthlyQuota: number;
  monthlyDone: number;
  avgScore: number;
  calibration: 'strict' | 'average' | 'lenient';
  lastInterview: string;
  certifications: string[];
  availability: 'available' | 'busy' | 'off';
}

const INTERVIEWERS: Interviewer[] = [
  {
    id: 'I-1', name: 'bentley.jun', team: 'HRIS 개발팀', role: '팀 리드', level: 'L6',
    specialties: ['Kotlin', 'Spring', 'K8s'],
    totalInterviews: 142, monthlyQuota: 12, monthlyDone: 10, avgScore: 4.2,
    calibration: 'strict', lastInterview: '2026-04-20',
    certifications: ['면접관 교육 수료', '편견 배제 교육'],
    availability: 'available',
  },
  {
    id: 'I-2', name: 'may.kim', team: '피플실', role: 'HR BP', level: 'L5',
    specialties: ['문화 적합도', '커뮤니케이션', '행동 면접'],
    totalInterviews: 234, monthlyQuota: 20, monthlyDone: 18, avgScore: 4.0,
    calibration: 'average', lastInterview: '2026-04-21',
    certifications: ['HR 공인', '면접관 교육', 'STAR 기법'],
    availability: 'busy',
  },
  {
    id: 'I-3', name: 'j.park', team: '기술플랫폼', role: '본부장', level: 'L7',
    specialties: ['리더십', '전략', '기술 비전'],
    totalInterviews: 89, monthlyQuota: 8, monthlyDone: 3, avgScore: 4.5,
    calibration: 'lenient', lastInterview: '2026-04-15',
    certifications: ['임원 면접관 교육'],
    availability: 'available',
  },
  {
    id: 'I-4', name: 'sue.park', team: '디자인실', role: '디자인 리드', level: 'L5',
    specialties: ['Figma', 'Design System', 'User Research'],
    totalInterviews: 67, monthlyQuota: 10, monthlyDone: 8, avgScore: 4.3,
    calibration: 'strict', lastInterview: '2026-04-19',
    certifications: ['면접관 교육 수료'],
    availability: 'available',
  },
  {
    id: 'I-5', name: 'daniel.choi', team: 'QA팀', role: 'QA 리드', level: 'L5',
    specialties: ['테스트 자동화', '품질 전략'],
    totalInterviews: 45, monthlyQuota: 8, monthlyDone: 2, avgScore: 3.8,
    calibration: 'lenient', lastInterview: '2026-04-10',
    certifications: [],
    availability: 'off',
  },
  {
    id: 'I-6', name: 'jay.lee', team: 'HRIS 개발팀', role: '시니어 백엔드', level: 'L5',
    specialties: ['Kotlin', 'DDD', '시스템 설계'],
    totalInterviews: 78, monthlyQuota: 12, monthlyDone: 8, avgScore: 4.1,
    calibration: 'average', lastInterview: '2026-04-18',
    certifications: ['면접관 교육', '기술 면접 심화'],
    availability: 'available',
  },
];

const AVAIL_STYLE = {
  available: { tone: 'success' as const, label: '가능' },
  busy: { tone: 'warning' as const, label: '바쁨' },
  off: { tone: 'secondary' as const, label: '미참여' },
};

const CAL_STYLE = {
  strict: { tone: 'error' as const, label: '엄격' },
  average: { tone: 'secondary' as const, label: '평균' },
  lenient: { tone: 'warning' as const, label: '관대' },
};

export default function InterviewerPool() {
  const [selected, setSelected] = useState<Interviewer>(INTERVIEWERS[0]);
  const [filter, setFilter] = useState<'all' | 'available' | 'cert'>('all');

  const filtered = INTERVIEWERS.filter(i => {
    if (filter === 'available') return i.availability === 'available';
    if (filter === 'cert') return i.certifications.length > 0;
    return true;
  });

  const avgInterviews = Math.round(INTERVIEWERS.reduce((s, i) => s + i.totalInterviews, 0) / INTERVIEWERS.length);
  const certifiedCount = INTERVIEWERS.filter(i => i.certifications.length > 0).length;

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <Users2 size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">면접관 풀</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                면접관 자격 · 할당 · 캘리브레이션 관리
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Mail size={14} /> 교육 일괄 안내</Button>
            <Button size="sm"><Plus size={14} /> 면접관 등록</Button>
          </div>
        </div>
      </FadeIn>

      {/* KPI */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-4 gap-3">
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">전체 면접관</div>
              <div className="text-2xl font-semibold mt-1 tabular-nums">{INTERVIEWERS.length}</div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">이번 달 참여 가능</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold text-[var(--success)] tabular-nums">{INTERVIEWERS.filter(i => i.availability === 'available').length}</span>
                <span className="text-sm text-[var(--foreground-muted)]">명</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">교육 이수율</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold tabular-nums">{Math.round((certifiedCount / INTERVIEWERS.length) * 100)}</span>
                <span className="text-sm text-[var(--foreground-muted)]">%</span>
              </div>
              <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{certifiedCount} / {INTERVIEWERS.length}명</div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">평균 면접 수</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold tabular-nums">{avgInterviews}</span>
                <span className="text-sm text-[var(--foreground-muted)]">회</span>
              </div>
              <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">1인 누적</div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* 필터 */}
      <FadeIn delay={0.08}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {([
              ['all', '전체', INTERVIEWERS.length],
              ['available', '참여 가능', INTERVIEWERS.filter(i => i.availability === 'available').length],
              ['cert', '교육 수료', certifiedCount],
            ] as const).map(([k, l, c]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                  filter === k
                    ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                    : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                }`}
              >
                {l} ({c})
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]" />
              <input
                placeholder="이름·팀·전문성"
                className="h-8 pl-7 pr-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] w-[180px]"
              />
            </div>
            <Button variant="outline" size="xs"><Filter size={11} /> 필터</Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 면접관 리스트 */}
        <div className="col-span-12 lg:col-span-7">
          <StaggerContainer className="flex flex-col gap-2">
            {filtered.map(i => (
              <StaggerItem key={i.id}>
                <motion.div whileHover={{ y: -1 }}>
                  <Card
                    className={`cursor-pointer transition-shadow ${
                      selected.id === i.id ? 'ring-2 ring-[var(--foreground)]' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelected(i)}
                  >
                    <CardContent className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-sm font-semibold shrink-0">
                        {i.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold">{i.name}</span>
                          <Badge variant="outline" className="text-[10px]">{i.level}</Badge>
                          <Badge variant={AVAIL_STYLE[i.availability].tone} className="text-[10px]">{AVAIL_STYLE[i.availability].label}</Badge>
                        </div>
                        <div className="text-[11px] text-[var(--foreground-muted)]">{i.team} · {i.role}</div>
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          {i.specialties.slice(0, 3).map(s => (
                            <Badge key={s} variant="secondary" className="text-[9px] py-0">{s}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-right shrink-0">
                        <div>
                          <div className="text-[10px] text-[var(--foreground-muted)]">이번 달</div>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-sm font-semibold tabular-nums">{i.monthlyDone}</span>
                            <span className="text-[10px] text-[var(--foreground-muted)]">/{i.monthlyQuota}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[var(--foreground-muted)]">평균</div>
                          <div className="flex items-center gap-0.5">
                            <Star size={10} className="text-[var(--warning)] fill-[var(--warning)]" />
                            <span className="text-sm font-semibold tabular-nums">{i.avgScore}</span>
                          </div>
                        </div>
                        <Badge variant={CAL_STYLE[i.calibration].tone} className="text-[10px]">{CAL_STYLE[i.calibration].label}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* 우측: 상세 */}
        <div className="col-span-12 lg:col-span-5">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="h-full">
              <div className="px-6 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-sm font-semibold">
                  {selected.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold">{selected.name}</h4>
                    <Badge variant={AVAIL_STYLE[selected.availability].tone} className="text-[10px]">{AVAIL_STYLE[selected.availability].label}</Badge>
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">{selected.team} · {selected.role}</div>
                </div>
              </div>
              <CardContent className="flex flex-col gap-4">
                {/* 누적 지표 */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-md bg-[var(--gray-3)] text-center">
                    <div className="text-[10px] text-[var(--foreground-muted)]">누적 면접</div>
                    <div className="text-lg font-semibold tabular-nums">{selected.totalInterviews}</div>
                  </div>
                  <div className="p-2.5 rounded-md bg-[var(--gray-3)] text-center">
                    <div className="text-[10px] text-[var(--foreground-muted)]">평균 점수</div>
                    <div className="text-lg font-semibold tabular-nums">{selected.avgScore}</div>
                  </div>
                  <div className="p-2.5 rounded-md bg-[var(--gray-3)] text-center">
                    <div className="text-[10px] text-[var(--foreground-muted)]">캘리브레이션</div>
                    <div className="text-xs font-semibold mt-1">
                      <Badge variant={CAL_STYLE[selected.calibration].tone} className="text-[10px]">{CAL_STYLE[selected.calibration].label}</Badge>
                    </div>
                  </div>
                </div>

                {/* 이번 달 진행 */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">이번 달 면접</span>
                    <span className="tabular-nums"><strong>{selected.monthlyDone}</strong> / {selected.monthlyQuota}회</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--gray-3)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(selected.monthlyDone / selected.monthlyQuota) * 100}%` }}
                      className="h-full bg-[var(--primary)]"
                    />
                  </div>
                </div>

                {/* 전문성 */}
                <div>
                  <div className="text-xs font-semibold mb-1.5">전문성</div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {selected.specialties.map(s => (
                      <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                    ))}
                  </div>
                </div>

                {/* 인증 */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold">교육 · 인증</span>
                    {selected.certifications.length === 0 && (
                      <Badge variant="error" className="text-[10px]">미이수</Badge>
                    )}
                  </div>
                  {selected.certifications.length > 0 ? (
                    <div className="flex flex-col gap-1.5">
                      {selected.certifications.map(c => (
                        <div key={c} className="flex items-center gap-2 p-2 rounded-md bg-[var(--success)]/5 border border-[var(--success)]/20">
                          <CheckCircle2 size={11} className="text-[var(--success)]" />
                          <span className="text-[11px]">{c}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2 rounded-md bg-[var(--error)]/5 border border-[var(--error)]/20">
                      <AlertCircle size={11} className="text-[var(--error)]" />
                      <span className="text-[11px]">교육 미수료 — 안내 발송 필요</span>
                    </div>
                  )}
                </div>

                {/* 최근 활동 */}
                <div className="pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 text-[var(--foreground-muted)]">
                      <Clock3 size={10} /> 최근 면접
                    </span>
                    <span className="font-medium">{selected.lastInterview}</span>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 py-3 border-t border-[var(--border)] flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1"><MessageSquare size={12} /> 메시지</Button>
                <Button size="sm" className="flex-1"><Award size={12} /> 면접 배정</Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
