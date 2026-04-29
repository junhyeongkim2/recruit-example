import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DollarSign, Send, Check, X, Clock3, TrendingUp, Sparkles, FileText,
  ChevronRight, CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { Icon3D } from '../shared/Icon3D';
import { useNav } from '../shared/navContext';

const OFFERS = [
  { id: 'O-1', name: '이도윤', position: '백엔드 (시니어)', base: 11200, bonus: 1500, sign: 3000, level: 'L5', status: 'accepted', sentAt: '2026-04-12', respondedAt: '2026-04-15' },
  { id: 'O-2', name: '최민호', position: '백엔드 (시니어)', base: 11800, bonus: 1800, sign: 3500, level: 'L5', status: 'accepted', sentAt: '2026-04-10', respondedAt: '2026-04-14' },
  { id: 'O-3', name: '정유진', position: '백엔드 (시니어)', base: 10500, bonus: 1200, sign: 2500, level: 'L4', status: 'pending', sentAt: '2026-04-18' },
  { id: 'O-4', name: '송지훈', position: 'HR 분석가', base: 9800, bonus: 1000, sign: 2000, level: 'L4', status: 'negotiating', sentAt: '2026-04-15', note: '베이스 +5% 역제안' },
  { id: 'O-5', name: '황민재', position: '프로덕트 디자이너', base: 8500, bonus: 800, sign: 1500, level: 'L3', status: 'declined', sentAt: '2026-04-10', respondedAt: '2026-04-13', note: '경쟁사 오퍼 수락' },
];

const CALC_BREAKDOWN = [
  { label: '직무 밴드 기본', value: 9500 },
  { label: '경력 가산 (7년)', value: 1200 },
  { label: '성과 프리미엄', value: 500 },
  { label: '시장 조정', value: 0 },
];

const STATUS = {
  accepted: { label: '수락', variant: 'success' as const, icon: CheckCircle2 },
  pending: { label: '응답 대기', variant: 'warning' as const, icon: Clock3 },
  negotiating: { label: '협상 중', variant: 'warning' as const, icon: TrendingUp },
  declined: { label: '거절', variant: 'error' as const, icon: X },
};

export default function OfferManagement() {
  const [selectedId, setSelectedId] = useState<string>('O-1');
  const selected = OFFERS.find(o => o.id === selectedId) || OFFERS[0];
  const total = selected.base + selected.bonus + selected.sign;
  const { showToast, navigateTo } = useNav();

  const acceptedCount = OFFERS.filter(o => o.status === 'accepted').length;
  const pendingCount = OFFERS.filter(o => o.status === 'pending' || o.status === 'negotiating').length;
  const acceptRate = Math.round((acceptedCount / OFFERS.length) * 100);

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon3D name="handshake" size={40} />
              <div>
                <h3 className="text-sm font-semibold">처우 산정 · 오퍼 관리</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  밴드 기반 처우 자동 계산 · 승인 라인 · 오퍼 발송 추적
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => showToast('AI가 추천 처우안을 산출했어요')}>
                <Sparkles size={14} /> AI 처우 추천
              </Button>
              <Button size="sm" onClick={() => navigateTo('offer', 'letter')}>
                <Send size={14} /> 새 오퍼 발송
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* KPI */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-4 gap-3">
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">발송 총계</div>
              <div className="text-2xl font-semibold mt-1">{OFFERS.length}</div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">수락</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold text-[var(--success)]">{acceptedCount}</span>
                <span className="text-sm text-[var(--foreground-muted)]">건</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">대기/협상</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold text-[var(--warning)]">{pendingCount}</span>
                <span className="text-sm text-[var(--foreground-muted)]">건</span>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <div className="text-xs text-[var(--foreground-muted)]">오퍼 수락률</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold">{acceptRate}</span>
                <span className="text-sm text-[var(--foreground-muted)]">%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 오퍼 리스트 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
          <Card className="h-full py-0">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="text-sm font-semibold">오퍼 발송 이력</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--gray-3)]">
                  <tr>
                    {['지원자', '포지션', '레벨', '연간 패키지', '상태', '발송일'].map(h => (
                      <th key={h} className="px-3 py-2 text-[10px] font-medium text-[var(--foreground-muted)] text-left whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {OFFERS.map(o => {
                    const S = STATUS[o.status as keyof typeof STATUS];
                    const SIcon = S.icon;
                    const active = o.id === selectedId;
                    return (
                      <motion.tr
                        key={o.id}
                        whileHover={{ backgroundColor: 'var(--gray-3)' }}
                        onClick={() => setSelectedId(o.id)}
                        className={`border-t border-[var(--border)] cursor-pointer transition-colors ${active ? 'bg-[var(--gray-3)]' : ''}`}
                      >
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                              {o.name.charAt(0)}
                            </div>
                            <span className="text-xs font-medium">{o.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-xs text-[var(--foreground-muted)]">{o.position}</td>
                        <td className="px-3 py-2.5">
                          <Badge variant="outline" className="text-[10px]">{o.level}</Badge>
                        </td>
                        <td className="px-3 py-2.5 text-xs font-semibold">
                          {(o.base + o.bonus + o.sign).toLocaleString()}만
                        </td>
                        <td className="px-3 py-2.5">
                          <Badge variant={S.variant} className="text-[10px] flex items-center gap-1 w-fit">
                            <SIcon size={10} /> {S.label}
                          </Badge>
                        </td>
                        <td className="px-3 py-2.5 text-xs text-[var(--foreground-muted)]">{o.sentAt}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </FadeIn>

        {/* 상세 + 계산기 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full">
                <div className="px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{selected.name} 오퍼 상세</h3>
                    <Badge variant={STATUS[selected.status as keyof typeof STATUS].variant} className="text-[10px]">
                      {STATUS[selected.status as keyof typeof STATUS].label}
                    </Badge>
                  </div>
                </div>
                <CardContent className="flex flex-col gap-4">
                  {/* 처우 계산 */}
                  <div className="p-4 rounded-lg bg-[var(--gray-3)]">
                    <div className="text-[10px] text-[var(--foreground-muted)]">연간 총 패키지</div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl font-semibold">{total.toLocaleString()}</span>
                      <span className="text-sm text-[var(--foreground-muted)]">만원</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="p-2 rounded bg-[var(--card)]">
                        <div className="text-[10px] text-[var(--foreground-muted)]">베이스</div>
                        <div className="text-sm font-semibold mt-0.5">{selected.base.toLocaleString()}</div>
                      </div>
                      <div className="p-2 rounded bg-[var(--card)]">
                        <div className="text-[10px] text-[var(--foreground-muted)]">보너스</div>
                        <div className="text-sm font-semibold mt-0.5">{selected.bonus.toLocaleString()}</div>
                      </div>
                      <div className="p-2 rounded bg-[var(--card)]">
                        <div className="text-[10px] text-[var(--foreground-muted)]">사이닝</div>
                        <div className="text-sm font-semibold mt-0.5">{selected.sign.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  {/* AI 산정 근거 */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles size={12} className="text-[var(--primary)]" />
                      <span className="text-xs font-semibold">AI 산정 근거</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {CALC_BREAKDOWN.map(c => (
                        <div key={c.label} className="flex items-center justify-between text-xs">
                          <span className="text-[var(--foreground-muted)]">{c.label}</span>
                          <span className="font-medium">
                            {c.value > 0 && '+'}{c.value.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 승인 라인 */}
                  <div className="pt-3 border-t border-[var(--border)]">
                    <div className="text-xs font-semibold mb-2">승인 라인</div>
                    <div className="flex items-center gap-1">
                      {[
                        { n: 'bentley', ok: true },
                        { n: 'HR BP', ok: true },
                        { n: '본부장', ok: true },
                        { n: 'CFO', ok: selected.status === 'accepted' || selected.status === 'pending' },
                      ].map((a, i, arr) => (
                        <div key={i} className="flex items-center gap-1 flex-1">
                          <div className={`flex-1 flex flex-col items-center gap-1 p-2 rounded border ${
                            a.ok ? 'border-[var(--success)]/40 bg-[var(--success)]/5' : 'border-dashed border-[var(--border)]'
                          }`}>
                            {a.ok ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Clock3 size={14} className="text-[var(--foreground-muted)]" />}
                            <span className="text-[9px] text-[var(--foreground-muted)] text-center truncate w-full">{a.n}</span>
                          </div>
                          {i < arr.length - 1 && <ChevronRight size={10} className="text-[var(--foreground-subtle)]" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selected.note && (
                    <div className="p-2.5 rounded border border-[var(--warning)]/30 bg-[var(--warning)]/5 text-xs">
                      <span className="font-semibold text-[var(--warning)]">메모: </span>
                      {selected.note}
                    </div>
                  )}
                </CardContent>
                <div className="px-6 py-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateTo('offer', 'letter')}
                  >
                    <FileText size={13} /> 오퍼 문서
                  </Button>
                  <Button
                    size="sm"
                    disabled={selected.status === 'accepted' || selected.status === 'declined'}
                    onClick={() => showToast(`${selected.name}님께 오퍼를 재발송했어요`)}
                  >
                    <Send size={13} /> 재발송
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </FadeIn>
      </div>
    </div>
  );
}
