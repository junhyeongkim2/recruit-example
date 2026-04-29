import { motion } from 'motion/react';
import {
  Inbox, BrainCircuit, FileText, Users, CheckCircle2, ChevronRight,
  Clock3, ExternalLink, TrendingUp,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { useNav } from '../shared/navContext';

// h.place 실물: 5단계 파이프라인, 각 단계마다 차수별 전형 카드
const PIPELINE = [
  {
    key: 'apply',
    icon: Inbox,
    label: '지원서 접수',
    rounds: [
      { label: '접수 수시', count: 56, status: '진행중', date: '04-01 ~ 04-20' },
      { label: '서류 정격', count: 32, status: '완료', date: '~04-18' },
      { label: '상 지 심사', count: 24, status: '완료', date: '~04-15' },
    ],
    detail: [
      { label: '지원서 접수', count: 11, pct: 100 },
      { label: '1차 필터', count: 12, pct: 85 },
      { label: '적격지 보유', count: 8, pct: 72 },
      { label: '지급 통과', count: 10, pct: 65 },
    ],
  },
  {
    key: 'assess',
    icon: BrainCircuit,
    label: '역량검사 전형',
    rounds: [
      { label: '1차 (공개수시)', count: 230, status: '진행중', date: '04-12 ~ 04-28' },
      { label: '1차 (대장심 기반)', count: 180, status: '진행중', date: '04-15 ~ 04-30' },
    ],
    detail: [
      { label: '응시 대상', count: 30, pct: 100 },
      { label: '역량검사 완료 ①', count: 28, pct: 93, highlight: true },
      { label: '역량검사 완료 ②', count: 24, pct: 80, highlight: true },
      { label: '역량검사 완료 ③', count: 20, pct: 67, highlight: true },
      { label: '1차 통과', count: 12, pct: 40 },
      { label: '2차 통과', count: 8, pct: 27 },
    ],
  },
  {
    key: 'doc',
    icon: FileText,
    label: '서류 전형',
    rounds: [
      { label: '1차 (공개수시)', count: 170, status: '진행중', date: '04-18 ~ 05-02' },
      { label: '2차 (대장)', count: 95, status: '대기', date: '05-05 ~ 05-15' },
    ],
    detail: [
      { label: '응시 대상', count: 35, pct: 100 },
      { label: '서류 전송 ①', count: 30, pct: 85, highlight: true },
      { label: '서류 검증 ②', count: 26, pct: 74, highlight: true },
      { label: '합격 대기', count: 12, pct: 35 },
    ],
  },
  {
    key: 'interview',
    icon: Users,
    label: '면접전형(3차수)',
    rounds: [
      { label: '1차 (공개수시)', count: 85, status: '예정', date: '05-10 ~ 05-20' },
      { label: '2차 임원', count: 32, status: '예정', date: '05-22 ~ 05-25' },
    ],
    detail: [
      { label: '응시 대상', count: 20, pct: 100 },
      { label: '1차 면접', count: 15, pct: 75 },
      { label: '2차 면접', count: 10, pct: 50 },
      { label: '최종 면접', count: 7, pct: 35, highlight: true },
    ],
  },
  {
    key: 'done',
    icon: CheckCircle2,
    label: '채용 완료',
    rounds: [
      { label: '채종합 현황', count: 12, status: '진행중', date: '최종' },
    ],
    detail: [
      { label: '채종합 대기', count: 10, pct: 100 },
      { label: '채용 완료', count: 8, pct: 80, highlight: true },
    ],
  },
];

export default function OpenRecruitDashboard() {
  const { showToast, navigateTo } = useNav();
  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-[10px]">진행중</Badge>
            <h3 className="text-sm font-semibold">수상시 채용 통합관리 대시보드</h3>
            <Badge variant="outline" className="text-[10px]">2026년 상반기</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => showToast('최근 업데이트 패널을 열었어요')}>
              <Clock3 size={13} /> 최근 업데이트
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateTo('after', 'overview')}>
              <TrendingUp size={13} /> 지표 보기
            </Button>
            <Button size="sm" onClick={() => showToast('리포트 생성을 시작했어요')}>
              리포트 생성 <ExternalLink size={13} />
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* 5단계 파이프라인 */}
      <StaggerContainer className="grid grid-cols-5 gap-3">
        {PIPELINE.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <StaggerItem key={stage.key}>
              <Card className="py-0 h-full relative">
                {/* 화살표 커넥터 */}
                {idx < PIPELINE.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="absolute -right-4 top-12 w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center z-10 shadow-sm"
                  >
                    <ChevronRight size={14} className="text-[var(--foreground-muted)]" />
                  </motion.div>
                )}

                {/* 단계 헤더 */}
                <div className="px-4 py-4 border-b border-[var(--border)] bg-[var(--gray-3)]/50">
                  <div className="flex items-start gap-2">
                    <div className="w-9 h-9 rounded-md bg-[var(--card)] flex items-center justify-center shrink-0 border border-[var(--border)]">
                      <Icon size={16} className="text-[var(--primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-[var(--foreground-muted)]">{idx + 1}단계</div>
                      <div className="text-xs font-semibold">{stage.label}</div>
                    </div>
                  </div>
                </div>

                {/* 차수별 전형 카드 */}
                <div className="px-3 py-3 flex flex-col gap-2 border-b border-[var(--border)]">
                  {stage.rounds.map((r, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 2 }}
                      className="p-2.5 rounded-md border border-[var(--border)] cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className="text-[11px] font-medium truncate">{r.label}</div>
                        <Badge
                          variant={r.status === '진행중' ? 'success' : r.status === '완료' ? 'secondary' : r.status === '예정' ? 'warning' : 'outline'}
                          className="text-[9px] py-0 shrink-0"
                        >
                          {r.status}
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-base font-semibold">{r.count}</span>
                        <span className="text-[10px] text-[var(--foreground-muted)]">명</span>
                      </div>
                      <div className="text-[10px] text-[var(--foreground-subtle)] mt-0.5">{r.date}</div>
                    </motion.div>
                  ))}
                </div>

                {/* 세부 퍼널 */}
                <CardContent className="py-3">
                  <div className="text-[10px] text-[var(--foreground-muted)] mb-2">세부 진행 현황</div>
                  <div className="flex flex-col gap-1.5">
                    {stage.detail.map((d, i) => (
                      <div key={i} className={`flex items-center justify-between px-2 py-1.5 rounded text-[11px] ${
                        d.highlight ? 'bg-[var(--success)]/10' : 'bg-[var(--gray-3)]'
                      }`}>
                        <span className={d.highlight ? 'text-[var(--success)] font-medium' : 'text-[var(--foreground-muted)]'}>
                          {d.label}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={d.highlight ? 'text-[var(--success)] font-semibold' : 'text-[var(--foreground)] font-semibold'}>
                            {d.count}
                          </span>
                          {d.highlight && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] text-[var(--success)]">
                              <span className="w-1 h-1 rounded-full bg-[var(--success)]" />
                              {d.pct}%
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}
