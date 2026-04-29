import { useMemo, useState } from 'react';
import { Sparkles, Video, ArrowUpDown, CheckSquare, Flag, MessageSquare, X, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/page-transition';
import { CANDIDATES, STAGE_LABELS } from '../mockData';
import { useCandidateModal } from '../shared/useCandidateDetail';

type SortKey = 'aiScore' | 'appliedAt' | 'experience' | 'name';

const FILTER_CHIPS = [
  { label: '지원서 제출 결과', active: true },
  { label: '학력', active: true },
  { label: '경력지역', active: true },
  { label: '희망위치', active: true },
];

export default function ScreeningGrid() {
  const [sortKey, setSortKey] = useState<SortKey>('aiScore');
  const [sortDesc, setSortDesc] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { setCandidate } = useCandidateModal();

  const sorted = useMemo(() => {
    const arr = [...CANDIDATES];
    arr.sort((a, b) => {
      let v: number | string;
      let v2: number | string;
      if (sortKey === 'name') { v = a.name; v2 = b.name; }
      else { v = (a as any)[sortKey]; v2 = (b as any)[sortKey]; }
      if (v < v2) return sortDesc ? 1 : -1;
      if (v > v2) return sortDesc ? -1 : 1;
      return 0;
    });
    return arr;
  }, [sortKey, sortDesc]);

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === sorted.length) setSelected(new Set());
    else setSelected(new Set(sorted.map(c => c.id)));
  };

  const header = (label: string, key?: SortKey) => (
    <th
      onClick={key ? () => {
        if (sortKey === key) setSortDesc(!sortDesc);
        else { setSortKey(key); setSortDesc(true); }
      } : undefined}
      className={`px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left whitespace-nowrap ${key ? 'cursor-pointer hover:text-[var(--foreground)]' : ''}`}
    >
      <div className="flex items-center gap-1">
        {label}
        {key && <ArrowUpDown size={10} className={sortKey === key ? 'text-[var(--foreground)]' : 'opacity-30'} />}
      </div>
    </th>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* 필터 바 */}
      <FadeIn>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Button variant="outline" size="xs">전체 10명</Button>
            <Button variant="outline" size="xs">3개월</Button>
            <Button variant="outline" size="xs">채용 공고</Button>
            <Button variant="outline" size="xs">전형</Button>
            <Button variant="outline" size="xs">채용분야</Button>
            <Button variant="outline" size="xs">지점</Button>
            <span className="mx-1 h-4 w-px bg-[var(--border)]" />
            <span className="text-[11px] text-[var(--foreground-subtle)]">필터 추가</span>
            {FILTER_CHIPS.map(f => (
              <span key={f.label} className="inline-flex items-center gap-1 px-2 py-1 text-[11px] rounded-md bg-[var(--gray-3)] text-[var(--foreground)]">
                {f.label}
                <X size={10} className="text-[var(--foreground-subtle)] cursor-pointer hover:text-[var(--foreground)]" />
              </span>
            ))}
            <Button variant="ghost" size="xs"><Save size={11} /> 필터 저장</Button>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="xs">
              {selected.size > 0 ? `${selected.size}명 선택됨` : '전체 선택'}
            </Button>
            <Button variant="outline" size="xs" disabled={selected.size === 0}>
              <CheckSquare size={11} /> 일괄 통과
            </Button>
            <Button size="xs" disabled={selected.size === 0}>
              다음 단계로
            </Button>
          </div>
        </div>
      </FadeIn>

      <Card className="py-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--gray-3)] border-b border-[var(--border)]">
              <tr>
                <th className="px-3 py-2.5 w-9">
                  <input
                    type="checkbox"
                    checked={selected.size === sorted.length && sorted.length > 0}
                    onChange={toggleAll}
                    className="rounded border-[var(--border)]"
                  />
                </th>
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left">영상</th>
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left">수험번호</th>
                {header('이름', 'name')}
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left">성별</th>
                {header('나이', 'experience')}
                {header('지원서 제출일', 'appliedAt')}
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left">공고명</th>
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left">지원분야</th>
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left">전형명</th>
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left">스크리닝 최종 결과</th>
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left">지원자 키워드</th>
                {header('AI 스코어', 'aiScore')}
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-left">단계</th>
                <th className="px-3 py-2.5 text-xs font-medium text-[var(--foreground-muted)] text-right">액션</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, idx) => (
                <tr
                  key={c.id}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'BUTTON') {
                      setCandidate(c);
                    }
                  }}
                  className={`border-b border-[var(--border)] hover:bg-[var(--gray-3)] transition-colors cursor-pointer ${selected.has(c.id) ? 'bg-[var(--gray-3)]' : ''}`}
                >
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(c.id)}
                      onChange={() => toggle(c.id)}
                      className="rounded border-[var(--border)]"
                    />
                  </td>
                  <td className="px-3 py-3">
                    {c.hasVideoInterview ? (
                      <Badge variant="success" className="text-[10px]">완료</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">미제출</Badge>
                    )}
                  </td>
                  <td className="px-3 py-3 text-xs text-[var(--foreground-muted)] whitespace-nowrap">
                    0022-{(1000 + idx).toString().padStart(6, '0')}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                        {c.name.charAt(0)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{c.name}</span>
                        {c.flagged && <Flag size={11} className="text-[var(--warning)] fill-[var(--warning)]" />}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs text-[var(--foreground-muted)]">{idx % 2 === 0 ? '남' : '여'}</td>
                  <td className="px-3 py-3 text-xs text-[var(--foreground-muted)]">{25 + c.experience}</td>
                  <td className="px-3 py-3 text-xs text-[var(--foreground-muted)] whitespace-nowrap">{c.appliedAt}</td>
                  <td className="px-3 py-3 text-xs text-[var(--foreground-muted)] max-w-[180px] truncate">{c.jobTitle}</td>
                  <td className="px-3 py-3 text-xs text-[var(--foreground-muted)]">{c.currentCompany || '신입'}</td>
                  <td className="px-3 py-3 text-xs text-[var(--foreground-muted)]">채용혁신개발팀 사원연봉</td>
                  <td className="px-3 py-3">
                    <Badge
                      variant={c.aiScore >= 85 ? 'success' : c.aiScore >= 70 ? 'warning' : 'error'}
                      className="text-[10px]"
                    >
                      {c.aiScore >= 85 ? '적합' : c.aiScore >= 70 ? '보류' : '부적합'}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1 flex-wrap max-w-[180px]">
                      {c.skills.slice(0, 2).map(s => (
                        <Badge key={s} variant="secondary" className="text-[10px] py-0">{s}</Badge>
                      ))}
                      {c.skills.length > 2 && (
                        <span className="text-[10px] text-[var(--foreground-subtle)]">+{c.skills.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-1.5 rounded-full bg-[var(--gray-3)] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            c.aiScore >= 85 ? 'bg-[var(--success)]' : c.aiScore >= 70 ? 'bg-[var(--warning)]' : 'bg-[var(--error)]'
                          }`}
                          style={{ width: `${c.aiScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold">{c.aiScore}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant="outline" className="text-[10px]">{STAGE_LABELS[c.stage]}</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {c.hasVideoInterview && (
                        <button className="w-7 h-7 rounded hover:bg-[var(--gray-4)] flex items-center justify-center text-[var(--foreground-muted)]" title="영상 면접 보기">
                          <Video size={13} />
                        </button>
                      )}
                      <button className="w-7 h-7 rounded hover:bg-[var(--gray-4)] flex items-center justify-center text-[var(--foreground-muted)]" title="메모">
                        <MessageSquare size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-2.5 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--foreground-muted)]">
          <span>총 {sorted.length}명</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)]">‹</button>
            <button className="w-7 h-7 rounded bg-[var(--foreground)] text-[var(--background)]">1</button>
            <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)]">2</button>
            <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)]">3</button>
            <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)]">›</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
