import { motion } from 'motion/react';
import {
  Building2, ArrowLeftRight, TrendingUp, Users, Sparkles, ExternalLink,
  Check,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { useNav } from '../shared/navContext';

// 공동체 간 크로스 채용 (카카오·카카오페이·카카오뱅크·카카오엔터 등)
const COMMUNITIES = [
  { id: 'k', name: '카카오', short: 'K', color: '#FEE500', count: 3847, icon: '💛' },
  { id: 'pay', name: '카카오페이', short: 'P', color: '#0066FF', count: 1245, icon: '💙' },
  { id: 'bank', name: '카카오뱅크', short: 'B', color: '#F6C522', count: 982, icon: '🏦' },
  { id: 'ent', name: '카카오엔터테인먼트', short: 'E', color: '#FF3C78', count: 1687, icon: '🎵' },
  { id: 'mob', name: '카카오모빌리티', short: 'M', color: '#00C85A', count: 756, icon: '🚖' },
  { id: 'games', name: '카카오게임즈', short: 'G', color: '#FF0080', count: 412, icon: '🎮' },
];

const CROSS_FLOWS = [
  { from: 'pay', to: 'k', count: 12, role: '백엔드', period: '최근 3개월' },
  { from: 'k', to: 'bank', count: 8, role: '데이터 분석', period: '최근 3개월' },
  { from: 'ent', to: 'k', count: 15, role: 'AI/ML', period: '최근 3개월' },
  { from: 'bank', to: 'pay', count: 6, role: '보안', period: '최근 3개월' },
  { from: 'mob', to: 'k', count: 4, role: '모바일', period: '최근 3개월' },
];

const OPEN_CROSS_JOBS = [
  { community: 'pay', title: '백엔드 엔지니어 (Payments Core)', level: 'L5', referrable: true, match: 94 },
  { community: 'bank', title: '데이터 분석가 (Risk)', level: 'L4', referrable: true, match: 88 },
  { community: 'ent', title: 'AI 추천 엔지니어', level: 'L5', referrable: false, match: 82 },
  { community: 'mob', title: 'iOS 엔지니어', level: 'L4', referrable: true, match: 76 },
];

export default function CrossCommunityHiring() {
  const totalFlows = CROSS_FLOWS.reduce((s, f) => s + f.count, 0);
  const { showToast } = useNav();

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <ArrowLeftRight size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">공동체 크로스 채용</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                카카오 공동체 간 인재 이동 · 내부 추천 · 오픈 포지션
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => showToast('내 프로필을 공동체에 동기화했어요')}>
              <Users size={14} /> 내 프로필 동기화
            </Button>
            <Button size="sm" onClick={() => showToast('AI 매칭 결과를 불러오는 중')}>
              <Sparkles size={14} /> AI 매칭 보기
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* 공동체 카드 그리드 */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {COMMUNITIES.map(c => (
          <StaggerItem key={c.id}>
            <motion.div whileHover={{ y: -2 }}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center text-center gap-2 py-3">
                  <div className="text-2xl">{c.icon}</div>
                  <div>
                    <div className="text-xs font-semibold">{c.name}</div>
                    <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">구성원 {c.count.toLocaleString()}명</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid grid-cols-12 gap-4">
        {/* 크로스 이동 플로우 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-sm font-semibold">공동체 간 이동 현황</h4>
              <Badge variant="secondary" className="text-[10px]">총 {totalFlows}건 · 최근 3개월</Badge>
            </div>
            <CardContent className="flex flex-col gap-2">
              {CROSS_FLOWS.map((f, i) => {
                const from = COMMUNITIES.find(c => c.id === f.from)!;
                const to = COMMUNITIES.find(c => c.id === f.to)!;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-md border border-[var(--border)]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-base">
                        {from.icon}
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">{from.name}</div>
                      </div>
                    </div>

                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowLeftRight size={14} className="text-[var(--primary)]" />
                    </motion.div>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-base">
                        {to.icon}
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">{to.name}</div>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center justify-end gap-3">
                      <Badge variant="outline" className="text-[10px]">{f.role}</Badge>
                      <div className="text-right">
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-sm font-semibold tabular-nums">{f.count}</span>
                          <span className="text-[10px] text-[var(--foreground-muted)]">명</span>
                        </div>
                        <div className="text-[9px] text-[var(--foreground-subtle)]">{f.period}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </FadeIn>

        {/* AI 추천 오픈 포지션 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <Sparkles size={13} className="text-[var(--primary)]" />
              <h4 className="text-sm font-semibold">나에게 추천된 크로스 포지션</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              <div className="text-[10px] text-[var(--foreground-muted)] mb-1">
                현재 프로필·성과 기반 AI 매칭 점수가 높은 순
              </div>
              {OPEN_CROSS_JOBS.map((j, i) => {
                const c = COMMUNITIES.find(x => x.id === j.community)!;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.2 }}
                    whileHover={{ x: 2 }}
                    className="p-3 rounded-md border border-[var(--border)] hover:bg-[var(--gray-3)] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-base">{c.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold truncate">{j.title}</div>
                          <div className="text-[10px] text-[var(--foreground-muted)]">{c.name} · {j.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Sparkles size={10} className="text-[var(--primary)]" />
                        <span className="text-xs font-semibold">{j.match}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="h-1 rounded-full bg-[var(--gray-3)] overflow-hidden flex-1 mr-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${j.match}%` }}
                          transition={{ delay: i * 0.08 + 0.3 }}
                          className={`h-full ${j.match >= 85 ? 'bg-[var(--success)]' : j.match >= 70 ? 'bg-[var(--warning)]' : 'bg-[var(--foreground-muted)]'}`}
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {j.referrable && (
                          <Badge variant="success" className="text-[9px] inline-flex items-center gap-0.5">
                            <Check size={9} /> 추천 가능
                          </Badge>
                        )}
                        <button className="text-[10px] text-[var(--primary)] hover:underline inline-flex items-center gap-0.5">
                          자세히 <ExternalLink size={9} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </FadeIn>

        {/* 통계 요약 */}
        <FadeIn delay={0.2} className="col-span-12">
          <div className="grid grid-cols-4 gap-3">
            <Card className="h-full">
              <CardContent className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--primary)]/10 flex items-center justify-center">
                  <TrendingUp size={13} className="text-[var(--primary)]" />
                </div>
                <div>
                  <div className="text-[10px] text-[var(--foreground-muted)]">연간 크로스 이동</div>
                  <div className="text-lg font-semibold tabular-nums">214명</div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--success)]/10 flex items-center justify-center">
                  <Users size={13} className="text-[var(--success)]" />
                </div>
                <div>
                  <div className="text-[10px] text-[var(--foreground-muted)]">이동 성공률</div>
                  <div className="text-lg font-semibold tabular-nums">87%</div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--warning)]/10 flex items-center justify-center">
                  <Building2 size={13} className="text-[var(--warning)]" />
                </div>
                <div>
                  <div className="text-[10px] text-[var(--foreground-muted)]">평균 리드타임</div>
                  <div className="text-lg font-semibold tabular-nums">21일</div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--primary)]/10 flex items-center justify-center">
                  <Sparkles size={13} className="text-[var(--primary)]" />
                </div>
                <div>
                  <div className="text-[10px] text-[var(--foreground-muted)]">나의 AI 매칭</div>
                  <div className="text-lg font-semibold tabular-nums">17건</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
