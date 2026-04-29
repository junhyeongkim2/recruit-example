import { useMemo, useState } from 'react';
import { Sparkles, Flag, Video, Clock3, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/page-transition';
import { CANDIDATES, STAGE_LABELS, JOB_POSTINGS, type CandidateStage } from '../mockData';
import { useCandidateModal } from '../shared/useCandidateDetail';

const STAGES: CandidateStage[] = ['applied', 'screening', 'interview1', 'interview2', 'offer', 'hired'];

function ScoreLabel({ score }: { score: number }) {
  const tone = score >= 85 ? 'text-[var(--success)]'
    : score >= 70 ? 'text-[var(--warning)]'
    : 'text-[var(--error)]';
  return (
    <div className="inline-flex items-center gap-1">
      <Sparkles size={10} className={tone} />
      <span className={`text-xs font-semibold ${tone}`}>{score}</span>
    </div>
  );
}

export default function CandidateKanban() {
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const { setCandidate } = useCandidateModal();

  const filtered = useMemo(() => {
    if (selectedJob === 'all') return CANDIDATES;
    return CANDIDATES.filter(c => c.jobId === selectedJob);
  }, [selectedJob]);

  const byStage = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    STAGES.forEach(s => (map[s] = []));
    filtered.forEach(c => { if (map[c.stage]) map[c.stage].push(c); });
    return map;
  }, [filtered]);

  const jobOptions = JOB_POSTINGS.filter(j => j.status === 'open' || j.status === 'reviewing');

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedJob('all')}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors border ${
                selectedJob === 'all'
                  ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                  : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
              }`}
            >
              전체 공고 ({CANDIDATES.length})
            </button>
            {jobOptions.map(j => {
              const count = CANDIDATES.filter(c => c.jobId === j.id).length;
              return (
                <button
                  key={j.id}
                  onClick={() => setSelectedJob(j.id)}
                  className={`text-xs px-3 py-1.5 rounded-md transition-colors border ${
                    selectedJob === j.id
                      ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                      : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                  }`}
                >
                  {j.title.split(' (')[0]} ({count})
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]" />
              <input
                type="text"
                placeholder="지원자 검색"
                className="h-8 pl-7 pr-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] w-[180px] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <button className="h-8 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--gray-3)] flex items-center gap-1.5 text-[var(--foreground-muted)]">
              <Filter size={12} /> 필터
            </button>
          </div>
        </div>
      </FadeIn>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const cards = byStage[stage] || [];
          return (
            <div key={stage} className="flex-1 min-w-[220px] flex flex-col gap-2">
              <div className="flex items-center justify-between px-2 py-2 rounded-md bg-[var(--gray-3)]">
                <span className="text-xs font-semibold">{STAGE_LABELS[stage]}</span>
                <span className="text-[10px] text-[var(--foreground-muted)]">{cards.length}</span>
              </div>

              <div className="flex flex-col gap-2 min-h-[400px]">
                {cards.map(c => (
                  <Card
                    key={c.id}
                    onClick={() => setCandidate(c)}
                    className="py-0 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-3 flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold text-[var(--foreground)]">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium flex items-center gap-1">
                              {c.name}
                              {c.flagged && <Flag size={10} className="text-[var(--warning)] fill-[var(--warning)]" />}
                            </div>
                            <div className="text-[10px] text-[var(--foreground-subtle)]">
                              {c.currentCompany || '경력 없음'}
                            </div>
                          </div>
                        </div>
                        <ScoreLabel score={c.aiScore} />
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        <Badge variant="outline" className="text-[10px] py-0">{c.experience}년차</Badge>
                        {c.skills.slice(0, 2).map(s => (
                          <Badge key={s} variant="secondary" className="text-[10px] py-0">{s}</Badge>
                        ))}
                        {c.skills.length > 2 && (
                          <span className="text-[10px] text-[var(--foreground-subtle)]">+{c.skills.length - 2}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[var(--foreground-subtle)] pt-1 border-t border-[var(--border)]">
                        <span className="flex items-center gap-1">
                          <Clock3 size={10} /> {c.appliedAt.slice(5)}
                        </span>
                        {c.hasVideoInterview && (
                          <span className="flex items-center gap-1 text-[var(--foreground-muted)]">
                            <Video size={10} /> 영상
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {cards.length === 0 && (
                  <div className="h-full min-h-[100px] rounded-md border border-dashed border-[var(--border)] flex items-center justify-center">
                    <span className="text-[10px] text-[var(--foreground-subtle)]">해당 단계 없음</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
