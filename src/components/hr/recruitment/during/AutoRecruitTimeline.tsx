import { motion } from 'motion/react';
import {
  Inbox, BrainCircuit, FileText, Users, Plus, CheckCircle2, Clock3,
  AlertCircle, ExternalLink, MoreHorizontal,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

// h.place 1_128 — 지원서 접수 자동 운영 (4열 타임라인)
interface TimelineEvent {
  date: string;
  time: string;
  status: 'done' | 'pending' | 'scheduled';
  title: string;
  sub?: string;
}

interface Column {
  icon: any;
  title: string;
  status: '대기' | '진행중' | '완료' | '예정';
  date: string;
  meta: { label: string; value: string }[];
  events: TimelineEvent[];
}

const COLUMNS: Column[] = [
  {
    icon: Inbox,
    title: '지원서 접수',
    status: '완료',
    date: '2026년 상반기 마이다스 공개채용 / 지원서 접수',
    meta: [
      { label: '공고 기간', value: '1일' },
      { label: '채용일정 개시', value: '12건' },
      { label: '자기 완료일', value: '12,630일' },
    ],
    events: [
      { date: '11.05', time: '완료', status: 'done', title: '공고 개시', sub: '2026년 상반기 마이다스 공개채용' },
      { date: '11.08', time: '완료', status: 'done', title: '1차 접수 안내 SMS 발송', sub: '지원자 12,630명' },
      { date: '12.29', time: '완료', status: 'done', title: '접수 마감 10일 전 안내', sub: '미완료자 645명 대상' },
      { date: '12.30', time: '완료', status: 'done', title: '접수 마감 3일 전 안내', sub: '미완료자 218명 대상' },
      { date: '12.31', time: '완료', status: 'done', title: '접수 마감', sub: '제출 11,058명 · 미제출 1,572명' },
    ],
  },
  {
    icon: BrainCircuit,
    title: '역량검사 전형',
    status: '진행중',
    date: '2026년 상반기 마이다스 역량검사전형',
    meta: [
      { label: '전형일', value: '2026년 상반기 마이다스 역량검사전형' },
      { label: '선택된 전형 설정', value: 'NCS 역량검사' },
      { label: '응시 기한 서류 관람/보관', value: '1건' },
    ],
    events: [
      { date: '11.21', time: '완료', status: 'done', title: '전형 안내 발송' },
      { date: '11.19', time: '완료', status: 'done', title: '추가 안내 SMS 발송' },
      { date: '11.30', time: '진행중', status: 'pending', title: '역검실시 안내 준비중', sub: '전 전형 응시자 대상' },
      { date: '11.30', time: '완료', status: 'done', title: '역검실시 진행 완료', sub: '개인별 완료 11,058 / 1,572' },
      { date: '12.05', time: '진행중', status: 'pending', title: '합격자 발표 안내 준비', sub: '합격 예정 · 254명' },
    ],
  },
  {
    icon: FileText,
    title: '면접 전형',
    status: '예정',
    date: '2026년 상반기 마이다스 면접전형_ST대방',
    meta: [
      { label: '전형일', value: '2026년 상반기 마이다스 면접전형_ST대방' },
      { label: '지원자수', value: '170건' },
      { label: '집결 조료', value: '-' },
    ],
    events: [
      { date: '01.09', time: '예정', status: 'scheduled', title: '면접 진행 1차' },
      { date: '01.15', time: '예정', status: 'scheduled', title: '서류 합격 발송', sub: '2026년 상반기 마이다스 면접전형' },
      { date: '01.16', time: '예정', status: 'scheduled', title: '면접 일정 알림' },
      { date: '01.18', time: '예정', status: 'scheduled', title: '면접 진행 완료', sub: '2026년 상반기 마이다스 면접전형' },
      { date: '02.05', time: '예정', status: 'scheduled', title: '합격자 발표', sub: '임원 면접 대상자' },
    ],
  },
  {
    icon: Users,
    title: '채용 완료',
    status: '대기',
    date: '채용 확정 안내',
    meta: [
      { label: '전형일', value: '채용 확정 안내' },
      { label: '지원자수', value: '-' },
      { label: '채용 설정', value: '-' },
    ],
    events: [
      { date: '01.02', time: '대기', status: 'scheduled', title: '채용 확정 안내', sub: '최종 합격자 12명 대상' },
      { date: '01.08', time: '대기', status: 'scheduled', title: '입사 안내 발송', sub: '2026년 상반기 최종 12명' },
      { date: '01.10', time: '대기', status: 'scheduled', title: '인사 서류 수령 마감' },
      { date: '01.20', time: '대기', status: 'scheduled', title: '합격자 OT 개최', sub: '최종 합격자 12명' },
    ],
  },
];

const STATUS_STYLE = {
  '완료': { bg: 'bg-[var(--success)]/10', text: 'text-[var(--success)]', dot: 'bg-[var(--success)]' },
  '진행중': { bg: 'bg-[var(--primary)]/10', text: 'text-[var(--primary)]', dot: 'bg-[var(--primary)]' },
  '예정': { bg: 'bg-[var(--warning)]/10', text: 'text-[var(--warning)]', dot: 'bg-[var(--warning)]' },
  '대기': { bg: 'bg-[var(--gray-3)]', text: 'text-[var(--foreground-muted)]', dot: 'bg-[var(--foreground-muted)]' },
};

const EVENT_ICON = {
  done: CheckCircle2,
  pending: Clock3,
  scheduled: AlertCircle,
};

export default function AutoRecruitTimeline() {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-[10px]">자동운영 중</Badge>
            <h3 className="text-sm font-semibold">2026년 상반기 마이다스 공개채용</h3>
            <span className="text-[11px] text-[var(--foreground-muted)]">전형별 자동 안내 타임라인</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
            <span>알림</span>
            <span>·</span>
            <span>일정</span>
            <span>·</span>
            <span>문의</span>
            <Button variant="outline" size="xs">자동운영 설정</Button>
          </div>
        </div>
      </FadeIn>

      {/* 4-column 타임라인 */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {COLUMNS.map((col, colIdx) => {
          const Icon = col.icon;
          const styles = STATUS_STYLE[col.status];
          return (
            <StaggerItem key={colIdx}>
              <Card className="h-full py-0 relative overflow-visible">
                {/* 연결선 */}
                {colIdx < COLUMNS.length - 1 && (
                  <div className="hidden xl:block absolute top-[64px] -right-2 w-4 h-px bg-[var(--border)] z-0" />
                )}

                {/* 상단 아이콘 */}
                <div className="px-4 pt-4 pb-3 flex flex-col items-center border-b border-[var(--border)]">
                  <div className={`w-12 h-12 rounded-full ${styles.bg} flex items-center justify-center mb-2`}>
                    <Icon size={18} className={styles.text} strokeWidth={1.75} />
                  </div>
                  <div className="text-sm font-semibold">{col.title}</div>
                </div>

                {/* 메타 정보 */}
                <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--gray-3)]/40">
                  <div className="text-[10px] text-[var(--foreground-muted)] line-clamp-1 mb-2">{col.date}</div>
                  <div className="flex flex-col gap-1">
                    {col.meta.map((m, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px]">
                        <span className="text-[var(--foreground-muted)] truncate">{m.label}</span>
                        <span className="font-medium truncate ml-2">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <Button variant="outline" size="xs" className="w-full">
                      전형 상세 <ExternalLink size={10} />
                    </Button>
                  </div>
                </div>

                {/* 이벤트 타임라인 */}
                <CardContent className="relative">
                  <div className="absolute left-[27px] top-3 bottom-3 w-px bg-[var(--border)]" />
                  <div className="flex flex-col gap-2">
                    {col.events.map((ev, i) => {
                      const EvIcon = EVENT_ICON[ev.status];
                      const evColor =
                        ev.status === 'done' ? 'text-[var(--success)] bg-[var(--success)]/15' :
                        ev.status === 'pending' ? 'text-[var(--primary)] bg-[var(--primary)]/15' :
                        'text-[var(--foreground-muted)] bg-[var(--gray-3)]';
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: colIdx * 0.1 + i * 0.05 }}
                          className="relative flex items-start gap-3 pl-0 py-0.5"
                        >
                          <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${evColor}`}>
                            <EvIcon size={11} />
                          </div>
                          <div className="flex-1 min-w-0 py-0.5">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[10px] font-semibold">{ev.date}</span>
                              <span className={`text-[9px] px-1 py-0.5 rounded ${
                                ev.status === 'done' ? 'bg-[var(--success)]/10 text-[var(--success)]' :
                                ev.status === 'pending' ? 'bg-[var(--primary)]/10 text-[var(--primary)]' :
                                'bg-[var(--gray-3)] text-[var(--foreground-muted)]'
                              }`}>{ev.time}</span>
                            </div>
                            <div className="text-[11px] font-medium leading-tight">{ev.title}</div>
                            {ev.sub && (
                              <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5 line-clamp-1">{ev.sub}</div>
                            )}
                          </div>
                          <button className="w-5 h-5 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-subtle)] shrink-0 opacity-0 hover:opacity-100">
                            <MoreHorizontal size={11} />
                          </button>
                        </motion.div>
                      );
                    })}
                    <button className="flex items-center gap-1.5 pl-8 mt-1 text-[10px] text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
                      <Plus size={10} /> 이벤트 추가
                    </button>
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
