import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star, Tag, Mail, Phone, Sparkles, Filter, Search, RotateCcw, Send,
  Briefcase, GraduationCap,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

const POOL = [
  { id: 'T-1', name: '박지우', position: '백엔드', declineReason: '2차 면접 부적합', year: 2026, tags: ['Kotlin', '미들', '재검토 가능'], score: 78, contactable: true, appliedCount: 1 },
  { id: 'T-2', name: '강하늘', position: '프론트', declineReason: '경력 미달', year: 2026, tags: ['React', '주니어'], score: 74, contactable: true, appliedCount: 1 },
  { id: 'T-3', name: '조예린', position: '프론트', declineReason: '서류 부적합', year: 2026, tags: ['Vue', '포트폴리오'], score: 72, contactable: true, appliedCount: 2 },
  { id: 'T-4', name: '오지안', position: '백엔드', declineReason: 'AI 스코어 미달', year: 2026, tags: ['Python', '분석 역량'], score: 54, contactable: false, appliedCount: 1 },
  { id: 'T-5', name: '김준영', position: '디자이너', declineReason: '포지션 클로즈', year: 2025, tags: ['Figma', '재접촉 가능'], score: 85, contactable: true, appliedCount: 1 },
  { id: 'T-6', name: '윤서아', position: '프론트', declineReason: '경쟁사 이동', year: 2026, tags: ['Next.js', '우아한형제들'], score: 82, contactable: true, appliedCount: 1, starred: true },
];

const FILTER_TAGS = ['전체', '재검토 가능', '경력', '주니어', '시니어', 'AI 추천'];

export default function TalentPool() {
  const [filter, setFilter] = useState('전체');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = filter === '전체' ? POOL : POOL.filter(p => p.tags.includes(filter));

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                <Star size={16} className="text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">탤런트 풀</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  불합격자 관리 · 재지원 이력 · 차기 채용 매칭
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={selected.size === 0}>
                <Mail size={14} /> 이메일 캠페인 ({selected.size})
              </Button>
              <Button size="sm" disabled={selected.size === 0}>
                <RotateCcw size={14} /> 재접촉 ({selected.size})
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* 필터 */}
      <FadeIn delay={0.05}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {FILTER_TAGS.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                  filter === t
                    ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                    : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]" />
              <input
                type="text"
                placeholder="이름 · 태그 검색"
                className="h-8 pl-7 pr-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] w-[180px] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <Button variant="outline" size="xs"><Filter size={12} /> 상세 필터</Button>
          </div>
        </div>
      </FadeIn>

      {/* KPI */}
      <FadeIn delay={0.08}>
        <div className="grid grid-cols-4 gap-3">
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">풀 총계</div>
              <div className="text-2xl font-semibold mt-1">{POOL.length}</div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">재접촉 가능</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold text-[var(--success)]">{POOL.filter(p => p.contactable).length}</span>
                <span className="text-sm text-[var(--foreground-muted)]">명</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">재지원 이력</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold">{POOL.filter(p => p.appliedCount > 1).length}</span>
                <span className="text-sm text-[var(--foreground-muted)]">명</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="flex items-center gap-1 text-xs text-[var(--foreground-muted)]">
                <Sparkles size={11} className="text-[var(--primary)]" />
                AI 추천 재검토
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold">{POOL.filter(p => p.score >= 75 && p.contactable).length}</span>
                <span className="text-sm text-[var(--foreground-muted)]">명</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* 풀 그리드 */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(p => (
          <StaggerItem key={p.id}>
            <motion.div whileHover={{ y: -2 }}>
              <Card className={`h-full cursor-pointer transition-shadow ${selected.has(p.id) ? 'ring-2 ring-[var(--foreground)]' : 'hover:shadow-md'}`}>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-sm font-semibold">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold">{p.name}</span>
                          {p.starred && <Star size={11} className="text-[var(--warning)] fill-[var(--warning)]" />}
                        </div>
                        <div className="text-[10px] text-[var(--foreground-muted)]">{p.position} · {p.year}</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggle(p.id)}
                      className="rounded"
                    />
                  </div>

                  <div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">불합격 사유</div>
                    <div className="text-xs mt-0.5">{p.declineReason}</div>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap">
                    {p.tags.map(t => (
                      <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                    <div className="flex items-center gap-1.5 text-[10px] text-[var(--foreground-muted)]">
                      <Sparkles size={10} className="text-[var(--primary)]" />
                      <span className="font-semibold text-[var(--foreground)]">{p.score}</span>점
                      {p.appliedCount > 1 && (
                        <>
                          <span>·</span>
                          <span>지원 {p.appliedCount}회</span>
                        </>
                      )}
                    </div>
                    {p.contactable ? (
                      <Badge variant="success" className="text-[10px]">재접촉 가능</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">연락 불가</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
