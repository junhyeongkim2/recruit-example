import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Plus, Search, Filter, MoreVertical, Copy, Archive, ExternalLink,
  Pause, Play, Eye, Users, Clock3, Sparkles, LayoutGrid, List,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { JOB_POSTINGS, STATUS_LABELS, type JobStatus } from '../mockData';
import { Icon3D } from '../shared/Icon3D';
import { useNav } from '../shared/navContext';

type ViewMode = 'grid' | 'list';
type Filter = 'all' | JobStatus;

const STATUS_TONE: Record<JobStatus, 'success' | 'warning' | 'secondary' | 'error'> = {
  draft: 'secondary',
  open: 'success',
  reviewing: 'warning',
  closed: 'secondary',
};

export default function JobPostingList() {
  const [view, setView] = useState<ViewMode>('grid');
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const { showToast, navigateTo } = useNav();

  const filtered = useMemo(() => {
    return JOB_POSTINGS.filter(j => {
      if (filter !== 'all' && j.status !== filter) return false;
      if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, search]);

  const counts = {
    all: JOB_POSTINGS.length,
    open: JOB_POSTINGS.filter(j => j.status === 'open').length,
    reviewing: JOB_POSTINGS.filter(j => j.status === 'reviewing').length,
    draft: JOB_POSTINGS.filter(j => j.status === 'draft').length,
    closed: JOB_POSTINGS.filter(j => j.status === 'closed').length,
  };

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Icon3D name="briefcase" size={40} />
            <div>
              <h3 className="text-sm font-semibold">공고 관리</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                전체 공고 · 상태 관리 · 일괄 작업
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => showToast('아카이브된 공고를 표시했어요')}>
              <Archive size={14} /> 아카이브
            </Button>
            <Button size="sm" onClick={() => navigateTo('before', 'jd')}>
              <Plus size={14} /> 새 공고 생성
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* 상태 탭 */}
      <FadeIn delay={0.05}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            {([
              ['all', '전체', counts.all],
              ['open', '진행 중', counts.open],
              ['reviewing', '심사 중', counts.reviewing],
              ['draft', '작성 중', counts.draft],
              ['closed', '마감', counts.closed],
            ] as [Filter, string, number][]).map(([k, l, c]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border transition-colors ${
                  filter === k
                    ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                    : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                }`}
              >
                <span>{l}</span>
                <Badge
                  variant={filter === k ? 'outline' : 'secondary'}
                  className={`text-[10px] ${filter === k ? 'bg-[var(--background)]/20 text-[var(--background)] border-transparent' : ''}`}
                >
                  {c}
                </Badge>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="공고명·부서 검색"
                className="h-8 pl-7 pr-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] w-[200px] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <Button variant="outline" size="xs" onClick={() => showToast('상세 필터 패널을 열었어요')}>
              <Filter size={11} /> 필터
            </Button>
            <div className="inline-flex items-center gap-0.5 p-0.5 rounded-md bg-[var(--gray-3)]">
              {[
                { k: 'grid' as const, icon: LayoutGrid },
                { k: 'list' as const, icon: List },
              ].map(v => {
                const Icon = v.icon;
                return (
                  <button
                    key={v.k}
                    onClick={() => setView(v.k)}
                    className={`p-1.5 rounded transition-all ${
                      view === v.k ? 'bg-[var(--card)] shadow-sm' : 'text-[var(--foreground-muted)]'
                    }`}
                  >
                    <Icon size={12} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 그리드 뷰 */}
      {view === 'grid' && (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(j => (
            <StaggerItem key={j.id}>
              <motion.div whileHover={{ y: -2 }}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={STATUS_TONE[j.status]} className="text-[10px]">{STATUS_LABELS[j.status]}</Badge>
                        {j.aiGenerated && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[var(--primary)]">
                            <Sparkles size={9} /> AI 생성
                          </span>
                        )}
                      </div>
                      <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={13} className="inline" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="text-[10px] text-[var(--foreground-subtle)] font-mono">{j.id}</div>
                      <h4 className="text-sm font-semibold leading-snug line-clamp-2 min-h-[38px]">{j.title}</h4>
                      <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5">{j.department} · {j.team}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border)]">
                      <div>
                        <div className="text-[10px] text-[var(--foreground-muted)]">지원자</div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-sm font-semibold tabular-nums">{j.applicants}</span>
                          {j.newApplicants > 0 && (
                            <span className="text-[10px] text-[var(--warning)] font-medium">+{j.newApplicants}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--foreground-muted)]">유형</div>
                        <div className="text-[11px]">{j.employmentType}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--foreground-muted)]">마감</div>
                        <div className="text-[11px]">{j.deadline.slice(5)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 pt-2 border-t border-[var(--border)]">
                      <Button
                        variant="outline"
                        size="xs"
                        className="flex-1"
                        onClick={() => showToast(`${j.title} 상세 보기`)}
                      >
                        <Eye size={10} /> 보기
                      </Button>
                      {j.status === 'open' ? (
                        <Button variant="outline" size="xs" onClick={() => showToast(`${j.title} 일시 중지`)}>
                          <Pause size={10} />
                        </Button>
                      ) : j.status === 'draft' ? (
                        <Button variant="outline" size="xs" onClick={() => showToast(`${j.title} 공개 시작`)}>
                          <Play size={10} />
                        </Button>
                      ) : (
                        <Button variant="outline" size="xs" onClick={() => showToast(`${j.title} 새 창에서 열기`)}>
                          <ExternalLink size={10} />
                        </Button>
                      )}
                      <Button variant="outline" size="xs" onClick={() => showToast(`${j.title} 복사 완료`)}>
                        <Copy size={10} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* 리스트 뷰 */}
      {view === 'list' && (
        <Card className="py-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--gray-3)]">
                <tr>
                  {['공고 ID', '공고명', '상태', '부서', '유형', '지원자', '담당자', '마감일', '액션'].map(h => (
                    <th key={h} className="px-3 py-2.5 text-[10px] font-medium text-[var(--foreground-muted)] text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((j, i) => (
                  <motion.tr
                    key={j.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-t border-[var(--border)] hover:bg-[var(--gray-3)]"
                  >
                    <td className="px-3 py-2.5 text-[10px] text-[var(--foreground-muted)] font-mono">{j.id}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{j.title}</span>
                        {j.aiGenerated && <Sparkles size={10} className="text-[var(--primary)]" />}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge variant={STATUS_TONE[j.status]} className="text-[10px]">{STATUS_LABELS[j.status]}</Badge>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-[var(--foreground-muted)]">{j.department}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant="outline" className="text-[10px]">{j.employmentType}</Badge>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-semibold tabular-nums">{j.applicants}</span>
                        {j.newApplicants > 0 && (
                          <span className="text-[10px] text-[var(--warning)]">+{j.newApplicants}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-[var(--foreground-muted)]">{j.owner}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[var(--foreground-muted)]">{j.deadline}</td>
                    <td className="px-3 py-2.5">
                      <button className="w-7 h-7 rounded hover:bg-[var(--gray-4)] text-[var(--foreground-muted)]">
                        <MoreVertical size={12} className="inline" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filtered.length === 0 && (
        <Card>
          <CardContent>
            <div className="text-center py-8 text-xs text-[var(--foreground-muted)]">
              조건에 맞는 공고가 없습니다.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
