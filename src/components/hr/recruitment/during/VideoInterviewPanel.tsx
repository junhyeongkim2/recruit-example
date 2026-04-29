import { Play, Sparkles, Video, CheckCircle2, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { CANDIDATES } from '../mockData';

const VIDEO_CANDIDATES = CANDIDATES.filter(c => c.hasVideoInterview);

const COMPETENCIES = [
  { name: '기본 역량', score: 81 },
  { name: '실무 역량', score: 98 },
  { name: '자발기심', score: 65 },
  { name: '외국어 역량', score: 43 },
];

export default function VideoInterviewPanel() {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                <Video size={16} className="text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">영상 면접 시스템</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  영상으로 만나는 전체 지원자 · 검토 시간 5분
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-[var(--foreground-muted)]">완료 <span className="font-semibold text-[var(--foreground)]">{VIDEO_CANDIDATES.length}</span> / 전체 {CANDIDATES.length}</span>
              <Badge variant="success" className="text-[10px]">AI 분석 활성</Badge>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 영상 리스트 */}
        <FadeIn delay={0.05} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6">
              <h3 className="text-sm font-semibold">영상 면접 목록</h3>
            </div>
            <CardContent>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {VIDEO_CANDIDATES.map(c => (
                  <StaggerItem key={c.id}>
                    <div className="rounded-lg border border-[var(--border)] overflow-hidden hover:shadow-sm transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-[var(--gray-3)] flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[var(--foreground)] flex items-center justify-center">
                          <Play size={16} className="text-[var(--background)] ml-0.5" fill="currentColor" />
                        </div>
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px]">
                          04:32
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge variant="success" className="text-[10px]">AI 분석</Badge>
                        </div>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{c.name}</div>
                          <div className="text-[10px] text-[var(--foreground-subtle)] truncate">{c.jobTitle}</div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Sparkles size={10} className="text-[var(--primary)]" />
                          <span className="text-xs font-semibold">{c.aiScore}</span>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 적합도 스코어 카드 — h.place 스타일: 큰 스코어 중심 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h3 className="text-sm font-semibold">영상면접 요약 결과표</h3>
              <Badge variant="secondary" className="text-[10px]">이도윤</Badge>
            </div>
            <CardContent className="flex flex-col gap-4">
              {/* 상단 프로필 */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-base font-semibold">
                  이
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">이도윤</div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">백엔드 엔지니어 · 경력 7년 · 쿠팡</div>
                </div>
              </div>

              {/* 종합 스코어 — 큰 숫자 중심 */}
              <div className="p-5 rounded-lg bg-[var(--gray-3)] flex items-center gap-4">
                <div>
                  <div className="text-[10px] text-[var(--foreground-muted)]">종합 결과</div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-semibold text-[var(--success)]">매우 적합</span>
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-[10px] text-[var(--foreground-muted)]">AI 스코어</div>
                  <div className="flex items-baseline justify-end gap-0.5 mt-0.5">
                    <span className="text-[40px] font-semibold leading-none">92</span>
                    <span className="text-sm text-[var(--foreground-muted)]">점</span>
                  </div>
                </div>
              </div>

              {/* 역량별 점수 리스트 */}
              <div className="flex flex-col gap-2">
                <div className="text-xs text-[var(--foreground-muted)]">과제별 평가 요약</div>
                {COMPETENCIES.map(c => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between p-2.5 rounded-md border border-[var(--border)]"
                  >
                    <div className="flex items-center gap-2">
                      <Star size={12} className="text-[var(--primary)]" />
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={c.score >= 80 ? 'success' : c.score >= 60 ? 'warning' : 'error'}
                        className="text-[10px]"
                      >
                        {c.score >= 80 ? '적합' : c.score >= 60 ? '보통' : '미달'}
                      </Badge>
                      <span className="text-base font-semibold w-10 text-right">{c.score}점</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI 요약 */}
              <div className="pt-3 border-t border-[var(--border)]">
                <div className="text-xs text-[var(--foreground-muted)] mb-2">AI 요약</div>
                <div className="flex flex-col gap-1.5">
                  {[
                    '분산 시스템 경험 풍부, 오너십 높음',
                    'Kafka · K8s 프로덕션 운영 경험 5년+',
                    '커뮤니케이션 명확, 팀 협업 강점',
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs">
                      <CheckCircle2 size={12} className="text-[var(--success)] mt-0.5 shrink-0" />
                      <span className="text-[var(--foreground-muted)]">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
