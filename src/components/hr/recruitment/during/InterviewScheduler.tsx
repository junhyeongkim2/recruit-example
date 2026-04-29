import { Sparkles, Calendar, Users, Clock3, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/page-transition';
import { Icon3D } from '../shared/Icon3D';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const DATES = [27, 28, 29, 30, 31, 1, 2];

// 캘린더에 표시할 면접 블록들
const INTERVIEW_BLOCKS = [
  { day: 3, startHour: 9, duration: 1, label: '1명' },
  { day: 3, startHour: 10, duration: 1, label: '2명' },
  { day: 4, startHour: 9, duration: 1, label: '1명' },
  { day: 4, startHour: 10, duration: 1, label: '2명' },
  { day: 5, startHour: 9, duration: 1, label: '1명' },
  { day: 5, startHour: 10, duration: 1, label: '2명' },
  { day: 4, startHour: 14, duration: 1, label: '2명' },
  { day: 4, startHour: 15, duration: 1, label: '2명' },
];

const SCHEDULE_SLOTS = [
  { date: '2026.04.28', slots: [{ start: '09:00', end: '10:00', count: 1 }, { start: '10:00', end: '11:00', count: 2 }] },
  { date: '2026.04.30', slots: [{ start: '09:00', end: '09:30', count: 1 }, { start: '10:30', end: '11:30', count: 2 }] },
  { date: '2026.04.31', slots: [{ start: '09:00', end: '10:00', count: 1 }, { start: '13:30', end: '14:30', count: 2 }, { start: '15:00', end: '16:00', count: 2 }] },
];

export default function InterviewScheduler() {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon3D name="calendar" size={40} />
              <div>
                <h3 className="text-sm font-semibold">자동 일정 조율</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  수천 명 면접 스케줄링 · 면접관 가용 시간 자동 매칭
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Sparkles size={14} /> AI 재조율
              </Button>
              <Button size="sm">모두 확정</Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* 캘린더 + 단계별 폼 — h.place 실물 패턴 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 좌측 주간 캘린더 */}
        <FadeIn delay={0.05} className="col-span-12 lg:col-span-7">
          <Card className="h-full py-0">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="xs">오늘</Button>
                <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">‹</button>
                <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">›</button>
                <span className="text-sm font-semibold ml-2">2026년 4월 27일 ~ 5월 2일</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="inline-flex items-center gap-1 text-[var(--foreground-muted)]">
                  <span className="w-2 h-2 rounded-sm bg-[var(--primary)]/30 border border-[var(--primary)]" /> 평가자 면접 일정 조율
                </span>
                <span className="inline-flex items-center gap-1 text-[var(--foreground-muted)]">
                  <span className="w-2 h-2 rounded-sm bg-[var(--success)]/30 border border-[var(--success)]" /> 지원자 면접 일정 조율
                </span>
              </div>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b border-[var(--border)]">
              <div className="px-2 py-2" />
              {DAYS.map((d, i) => (
                <div key={d} className="px-2 py-2 text-center">
                  <div className="text-[10px] text-[var(--foreground-muted)]">{d}</div>
                  <div className={`text-sm mt-0.5 ${i === 2 ? 'w-6 h-6 mx-auto rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center' : 'text-[var(--foreground)]'}`}>
                    {DATES[i]}
                  </div>
                </div>
              ))}
            </div>

            {/* 상단 라벨 띠 */}
            <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b border-[var(--border)] bg-[var(--gray-3)]/40">
              <div />
              <div className="col-span-2 px-2 py-1 mx-1 my-1 rounded bg-[var(--primary)]/15 text-[10px] text-[var(--foreground)] text-center">
                평가자 면접 일정 조율
              </div>
              <div className="col-span-1 px-2 py-1 mx-1 my-1 rounded bg-[var(--success)]/20 text-[10px] text-[var(--foreground)] text-center">
                지원자
              </div>
              <div className="col-span-4" />
            </div>

            {/* 시간 그리드 */}
            <div className="relative overflow-auto max-h-[480px]">
              <div className="grid grid-cols-[50px_repeat(7,1fr)]">
                {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => (
                  <>
                    <div key={`h-${hour}`} className="px-2 py-3 text-[10px] text-[var(--foreground-muted)] text-right border-b border-[var(--border)]">
                      {hour}시
                    </div>
                    {DAYS.map((_, dIdx) => {
                      const block = INTERVIEW_BLOCKS.find(b => b.day === dIdx && b.startHour === hour);
                      return (
                        <div key={`${hour}-${dIdx}`} className="border-b border-l border-[var(--border)] h-12 relative">
                          {block && (
                            <div className="absolute inset-1 rounded border border-[var(--primary)]/40 bg-[var(--primary)]/10 flex items-center justify-center text-[10px] text-[var(--foreground)] font-medium">
                              {block.label}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* 우측 단계별 폼 — 01. 면접 일정 생성 → 02. 지원자/평가자 배정 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 border-b border-[var(--border)] -mx-6 pb-3">
              <div className="flex gap-4 px-6">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-[var(--foreground)]">
                  <span className="text-sm font-semibold">01. 면접 일정 생성</span>
                </div>
                <div className="flex items-center gap-2 pb-2 text-[var(--foreground-muted)]">
                  <span className="text-sm">02. 지원자/평가자 배정</span>
                </div>
              </div>
            </div>

            <CardContent className="flex flex-col gap-4">
              {/* 면접 일정 조율 방식 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium">면접 일정 조율 방식</span>
                  <ChevronDown size={12} className="text-[var(--foreground-muted)]" />
                </div>
                <div className="h-9 px-3 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                  <span>지원자 및 평가자에게 면접 가능 시간 조사</span>
                  <ChevronDown size={12} className="text-[var(--foreground-muted)]" />
                </div>
                <input
                  type="text"
                  placeholder="일정 제목을 입력해주세요."
                  className="w-full mt-2 h-9 px-3 rounded-md border border-[var(--border)] text-xs focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              {/* 면접 일정 설정 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium">면접 일정 설정</span>
                  <ChevronDown size={12} className="text-[var(--foreground-muted)]" />
                </div>

                <div className="text-[10px] text-[var(--foreground-muted)] mb-1.5">일정 입력 방식</div>
                <div className="grid grid-cols-2 gap-1 p-1 rounded-md bg-[var(--gray-3)]">
                  <button className="py-1.5 rounded bg-[var(--card)] text-xs font-medium shadow-sm">면접 일정 직접 입력</button>
                  <button className="py-1.5 rounded text-xs text-[var(--foreground-muted)]">면접 일정 범위 설정</button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <div className="text-[10px] text-[var(--foreground-muted)] mb-1">소요/여유 시간</div>
                    <div className="h-9 px-3 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                      <span>면접 소요 60분</span>
                      <ChevronDown size={12} className="text-[var(--foreground-muted)]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--foreground-muted)] mb-1">&nbsp;</div>
                    <div className="h-9 px-3 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                      <span>여유 시간 없음</span>
                      <ChevronDown size={12} className="text-[var(--foreground-muted)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 면접 일정 리스트 */}
              <div>
                <div className="text-xs font-medium mb-2">면접 일정</div>
                <div className="flex flex-col gap-3">
                  {SCHEDULE_SLOTS.map(s => (
                    <div key={s.date} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar size={12} className="text-[var(--foreground-muted)]" />
                        <span className="font-medium">{s.date}</span>
                        <button className="ml-auto w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">
                          <Plus size={12} />
                        </button>
                        <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">
                          <Trash2 size={11} />
                        </button>
                      </div>
                      {s.slots.map((slot, i) => (
                        <div key={i} className="grid grid-cols-[1fr_auto_1fr_auto] gap-1.5 items-center">
                          <div className="h-8 px-2 rounded-md border border-[var(--border)] flex items-center justify-between text-[11px]">
                            <span>{slot.start}</span>
                            <ChevronDown size={10} className="text-[var(--foreground-subtle)]" />
                          </div>
                          <span className="text-[var(--foreground-subtle)]">—</span>
                          <div className="h-8 px-2 rounded-md border border-[var(--border)] flex items-center justify-between text-[11px]">
                            <span>{slot.end}</span>
                            <ChevronDown size={10} className="text-[var(--foreground-subtle)]" />
                          </div>
                          <div className="h-8 px-2 rounded-md border border-[var(--border)] flex items-center text-[11px] whitespace-nowrap">
                            참석인원 {slot.count}명
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <div className="px-6 pt-3 border-t border-[var(--border)] flex justify-end gap-2">
              <Button variant="outline" size="sm">취소</Button>
              <Button size="sm">다음</Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
