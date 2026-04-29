import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check, Download, Image as ImageIcon, Info, Monitor, Smartphone, Tablet,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// h.place 1_105 — 공고문 규격별 자동 변환
interface Size {
  label: string;
  w: number;
  h: number;
  platform: string;
  aspect: string;
  recommended?: boolean;
}

const SIZES: Size[] = [
  { label: '900×1200', w: 900, h: 1200, platform: '잡코리아 상단', aspect: '3:4', recommended: true },
  { label: '1600×900', w: 1600, h: 900, platform: '링크드인 커버', aspect: '16:9' },
  { label: '1200×628', w: 1200, h: 628, platform: '페이스북 피드', aspect: '1.91:1' },
  { label: '1080×1080', w: 1080, h: 1080, platform: '인스타그램', aspect: '1:1' },
  { label: '1080×1920', w: 1080, h: 1920, platform: '인스타 스토리', aspect: '9:16' },
  { label: '750×1334', w: 750, h: 1334, platform: '원티드 상세', aspect: '9:16' },
  { label: '400×400', w: 400, h: 400, platform: '사람인 썸네일', aspect: '1:1' },
  { label: '320×50', w: 320, h: 50, platform: '배너 광고', aspect: '32:5' },
];

const THUMB_SIZES = [
  { id: 1, label: '잡코리아 메인 배너' },
  { id: 2, label: '링크드인 포스트' },
  { id: 3, label: '원티드 커버' },
  { id: 4, label: '사람인 썸네일' },
  { id: 5, label: '블라인드 포스트' },
];

export default function JobPostingSizeConverter() {
  const [selected, setSelected] = useState(0);
  const size = SIZES[selected];

  // 화면 표시용 aspect
  const displayWidth = Math.min(400, size.w / 3);
  const displayHeight = displayWidth * (size.h / size.w);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h4 className="text-sm font-semibold">플랫폼별 규격 자동 변환</h4>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">하나의 공고로 모든 플랫폼에 맞게 자동 리사이징</p>
        </div>
        <Button size="sm"><Download size={14} /> 전체 다운로드 ({SIZES.length})</Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측: 사이즈 리스트 */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-xs font-semibold">규격 선택</h4>
              <Badge variant="secondary" className="text-[10px]">{SIZES.length}</Badge>
            </div>
            <CardContent className="flex flex-col gap-1">
              {SIZES.map((s, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 2 }}
                  onClick={() => setSelected(i)}
                  className={`relative flex items-center justify-between p-2.5 rounded-md border text-left transition-colors ${
                    selected === i
                      ? 'border-[var(--foreground)] bg-[var(--gray-3)]'
                      : 'border-[var(--border)] hover:bg-[var(--gray-3)]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium tabular-nums">{s.label}</span>
                      {s.recommended && <Badge variant="warning" className="text-[9px] py-0">권장</Badge>}
                    </div>
                    <div className="text-[10px] text-[var(--foreground-muted)] truncate">{s.platform}</div>
                  </div>
                  <span className="text-[9px] text-[var(--foreground-subtle)] shrink-0 ml-1">{s.aspect}</span>
                  {selected === i && (
                    <motion.div
                      layoutId="size-indicator"
                      className="absolute -left-1 top-2 bottom-2 w-0.5 bg-[var(--foreground)] rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 중앙: 미리보기 */}
        <div className="col-span-12 lg:col-span-6">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-semibold">{size.platform}</h4>
                <Badge variant="outline" className="text-[10px]">{size.label}</Badge>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[var(--foreground-muted)]">
                <Info size={10} />
                <span>AI가 자동으로 요소를 재배치합니다</span>
              </div>
            </div>
            <CardContent>
              <div className="flex items-center justify-center bg-[var(--gray-3)]/40 rounded-lg min-h-[400px] p-6">
                <motion.div
                  key={selected}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="bg-gradient-to-br from-[#FFC53D] to-[#E5484D] rounded-lg shadow-lg overflow-hidden flex flex-col relative"
                  style={{ width: displayWidth, height: displayHeight }}
                >
                  {/* 배경 패턴 */}
                  <div className="absolute inset-0 opacity-30">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <circle cx="180" cy="40" r="60" fill="white" />
                      <circle cx="30" cy="170" r="40" fill="white" />
                    </svg>
                  </div>

                  <div className="relative p-4 flex flex-col h-full text-white">
                    <div className="text-[9px] font-bold tracking-widest opacity-90">MAIDAS</div>
                    <div className="mt-auto">
                      <div className="text-xs opacity-90">기업명</div>
                      <div className="text-lg font-bold leading-tight mt-1">
                        2026년 하반기<br />신입 경력 채용
                      </div>
                      <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-white/20 text-[9px]">
                        지원하기 →
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--foreground-muted)]">
                <div className="flex items-center gap-2">
                  <Check size={11} className="text-[var(--success)]" />
                  <span>{size.platform} 규격 최적화 완료</span>
                </div>
                <Button variant="outline" size="xs"><Download size={10} /> PNG 다운로드</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 우측: 다른 플랫폼 썸네일 */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <div className="px-6">
              <h4 className="text-xs font-semibold">다른 플랫폼</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {THUMB_SIZES.map((t, i) => (
                <motion.div
                  key={t.id}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-2 p-2 rounded-md border border-[var(--border)] hover:bg-[var(--gray-3)] cursor-pointer"
                >
                  <div className="w-14 h-10 rounded bg-gradient-to-br from-[#FFC53D] to-[#E5484D] flex items-center justify-center shrink-0">
                    <ImageIcon size={12} className="text-white/80" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium truncate">{t.label}</div>
                    <div className="text-[9px] text-[var(--foreground-muted)]">자동 변환됨</div>
                  </div>
                  <Check size={11} className="text-[var(--success)] shrink-0" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
