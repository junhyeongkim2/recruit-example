import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import {
  Plus, Download, Edit3, Trash2, GripVertical, LayoutGrid, ChevronDown,
  User, GraduationCap, Briefcase, Languages, Award, FileText,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

const FIELD_CATEGORIES = [
  { key: 'persona', icon: User, label: '인재상', color: 'primary' },
  { key: 'edu', icon: GraduationCap, label: '학력', color: 'success', active: true },
  { key: 'career', icon: Briefcase, label: '경력/경험', color: 'warning' },
  { key: 'lang', icon: Languages, label: '어학/자격', color: 'secondary' },
  { key: 'comp', icon: Award, label: '역량 정보', color: 'secondary' },
  { key: 'result', icon: FileText, label: '전형 결과', color: 'secondary' },
];

const DETAIL_FIELDS = [
  { label: '고등학교', value: '고등학교' },
  { label: '학교명', value: '학교명' },
];

// 도넛 차트 세그먼트
const DONUT_CHANNELS = [
  { name: '링크드인', pct: 42, count: 840, color: 'var(--primary)' },
  { name: '잡코리아', pct: 19, count: 380, color: 'var(--success)' },
  { name: '원티드', pct: 15, count: 300, color: 'var(--warning)' },
  { name: '리멤버', pct: 11, count: 220, color: 'var(--error)' },
  { name: '사람인', pct: 6, count: 120, color: 'var(--foreground-muted)' },
  { name: '잡다', pct: 4, count: 80, color: 'var(--foreground-subtle)' },
  { name: '지인 소개', pct: 2, count: 40, color: 'var(--primary-hover)' },
  { name: '기타', pct: 1, count: 20, color: 'var(--gray-4)' },
];

const EDU_DONUT = [
  { name: '고등학교 졸업', pct: 5.5, count: 110, color: 'var(--primary)' },
  { name: '전문학사 졸업', pct: 10, count: 200, color: 'var(--success)' },
  { name: '대학교 졸업', pct: 59.5, count: 1190, color: 'var(--warning)' },
  { name: '대학원(석사) 졸업', pct: 20, count: 400, color: 'var(--error)' },
  { name: '대학원(박사) 졸업', pct: 5, count: 100, color: 'var(--foreground-muted)' },
];

const CAREER_DONUT = [
  { name: '경력 없음', pct: 45, count: 900, color: 'var(--primary)' },
  { name: '1년 이하', pct: 20, count: 400, color: 'var(--success)' },
  { name: '1-3년', pct: 20, count: 400, color: 'var(--warning)' },
  { name: '3-7년', pct: 12, count: 240, color: 'var(--error)' },
  { name: '7년 이상', pct: 3, count: 60, color: 'var(--foreground-muted)' },
];

function Donut({ data, total, title }: { data: typeof DONUT_CHANNELS; total: string; title: string }) {
  let cumulative = 0;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
        {data.map((d) => {
          const length = (d.pct / 100) * 251.2;
          const dashArray = `${length} 251.2`;
          const offset = -cumulative;
          cumulative += length;
          return (
            <motion.circle
              key={d.name}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={d.color}
              strokeWidth="12"
              strokeDasharray={dashArray}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          );
        })}
        <foreignObject x="0" y="0" width="100" height="100">
          <div className="w-full h-full flex items-center justify-center rotate-90">
            <div className="text-center">
              <div className="text-[8px] text-[var(--foreground-muted)]">총 지원자</div>
              <div className="text-sm font-semibold">{total}</div>
            </div>
          </div>
        </foreignObject>
      </svg>
      <div className="flex flex-col gap-1 text-[11px] flex-1">
        {data.slice(0, 8).map(d => (
          <div key={d.name} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-[var(--foreground-muted)] truncate">{d.name}</span>
            </div>
            <span className="text-[var(--foreground)] font-medium shrink-0">{d.count}명 <span className="text-[var(--foreground-muted)]">({d.pct}%)</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WidgetEditor() {
  const [activeCat, setActiveCat] = useState('edu');
  const [editMode, setEditMode] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-[10px]">편집중</Badge>
            <h3 className="text-sm font-semibold">마이다스아이티 채용 결과 리포트 v1.2</h3>
            <span className="text-[11px] text-[var(--foreground-muted)]">2025.09.05 11:23:57 자동갱신</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">
              <Download size={13} />
            </button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측 메인 */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
          {/* 상단 타임 바 */}
          <FadeIn delay={0.05}>
            <Card className="py-3">
              <CardContent className="flex items-center gap-1 text-[10px] text-[var(--foreground-muted)]">
                {['09.16', '09.17', '09.18', '09.19', '09.20', '09.21', '09.22', '09.23', '09.24', '09.25', '09.26', '09.27', '09.28', '09.29', '09.30'].map(d => (
                  <div key={d} className="flex-1 text-center">{d}</div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>

          {/* 메인 위젯 그리드 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 지원자 유입 채널 분포 (선택 상태로 테두리) */}
            <FadeIn delay={0.1}>
              <motion.div whileHover={{ y: -2 }}>
                <Card className={editMode && activeCat === 'edu' ? 'ring-2 ring-[var(--success)]' : ''}>
                  <div className="px-6 flex items-center justify-between">
                    <h4 className="text-xs font-semibold">지원자 유입 채널 분포</h4>
                    <div className="flex items-center gap-1">
                      <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                        <Trash2 size={11} />
                      </button>
                      <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                        <Download size={11} />
                      </button>
                    </div>
                  </div>
                  <CardContent>
                    <Donut data={DONUT_CHANNELS} total="2000명" title="지원 유입" />
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>

            {/* 합격자 유입 채널 순위 */}
            <FadeIn delay={0.15}>
              <motion.div whileHover={{ y: -2 }}>
                <Card>
                  <div className="px-6 flex items-center justify-between">
                    <h4 className="text-xs font-semibold">합격자 유입 채널 순위</h4>
                    <div className="flex items-center gap-1">
                      <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                        <Trash2 size={11} />
                      </button>
                      <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                        <Download size={11} />
                      </button>
                    </div>
                  </div>
                  <CardContent className="flex flex-col gap-2">
                    {[
                      { rank: 1, name: '잡코리아', count: 32 },
                      { rank: 2, name: '링크드인', count: 11 },
                      { rank: 3, name: '리멤버', count: 4 },
                      { rank: 4, name: '잡다', count: 2 },
                      { rank: 5, name: '원티드', count: 1 },
                    ].map(r => (
                      <motion.div
                        key={r.rank}
                        whileHover={{ x: 2 }}
                        className="flex items-center justify-between py-1.5 px-3 rounded border border-[var(--border)]"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px]">{r.rank}순위</Badge>
                          <span className="text-xs font-medium">{r.name}</span>
                        </div>
                        <span className="text-xs text-[var(--foreground-muted)]">{r.count}명</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>

            {/* 학력 분포 */}
            <FadeIn delay={0.2}>
              <motion.div whileHover={{ y: -2 }}>
                <Card>
                  <div className="px-6 flex items-center justify-between">
                    <h4 className="text-xs font-semibold">전체 지원자 학력 분포</h4>
                    <div className="flex items-center gap-1">
                      <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                        <Trash2 size={11} />
                      </button>
                      <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                        <Download size={11} />
                      </button>
                    </div>
                  </div>
                  <CardContent>
                    <Donut data={EDU_DONUT as any} total="2000명" title="학력" />
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>

            {/* 경력 분포 */}
            <FadeIn delay={0.25}>
              <motion.div whileHover={{ y: -2 }}>
                <Card>
                  <div className="px-6 flex items-center justify-between">
                    <h4 className="text-xs font-semibold">전체 지원자 경력 분포</h4>
                    <div className="flex items-center gap-1">
                      <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                        <Trash2 size={11} />
                      </button>
                      <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                        <Download size={11} />
                      </button>
                    </div>
                  </div>
                  <CardContent>
                    <Donut data={CAREER_DONUT as any} total="2000명" title="경력" />
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            <Plus size={14} /> 위젯 추가
          </Button>
        </div>

        {/* 우측 편집 패널 */}
        <FadeIn delay={0.3} className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="success" className="text-[10px]">전체 지원자 학력 분포</Badge>
              </div>
            </div>
            <CardContent className="flex flex-col gap-3">
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-semibold">전체 지원자 학력 분포</h4>
                  <Edit3 size={11} className="text-[var(--foreground-muted)]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[var(--foreground-muted)]">추가 설정</span>
                  <div className="flex items-center gap-1">
                    <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                      <Edit3 size={10} />
                    </button>
                    <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-subtle)]">
                      <LayoutGrid size={10} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 항목 선택 */}
              <div>
                <div className="text-[11px] text-[var(--foreground-muted)] mb-2">항목 선택</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {FIELD_CATEGORIES.map(c => {
                    const Icon = c.icon;
                    const active = c.key === activeCat;
                    return (
                      <motion.button
                        key={c.key}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCat(c.key)}
                        className={`aspect-square rounded-md border flex flex-col items-center justify-center gap-1 text-[9px] transition-all ${
                          active
                            ? 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]'
                            : 'border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                        }`}
                      >
                        <Icon size={14} />
                        <span>{c.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* 상세 항목 */}
              <div>
                <div className="text-[11px] text-[var(--foreground-muted)] mb-2">상세 항목</div>
                <div className="flex flex-col gap-1.5">
                  {DETAIL_FIELDS.map(f => (
                    <div key={f.label} className="h-8 px-3 rounded-md border border-[var(--border)] flex items-center justify-between text-[11px]">
                      <span>{f.value}</span>
                      <ChevronDown size={11} className="text-[var(--foreground-muted)]" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-3 border-t border-[var(--border)] flex justify-end gap-2">
              <Button variant="outline" size="sm">취소</Button>
              <Button size="sm">적용</Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
