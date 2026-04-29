import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Image as ImageIcon, Upload, Palette, Type, Eye, Save, ChevronDown,
  Monitor, Smartphone,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNav } from '../shared/navContext';

// h.place 1_84 — 브랜드 이미지 편집 (지원서/사이트 공통)
const BRAND_COLORS = [
  { name: '프라이머리 블루', hex: '#0090FF', active: true },
  { name: '성공 그린', hex: '#30A46C' },
  { name: '에러 레드', hex: '#E5484D' },
  { name: '경고 옐로우', hex: '#FFC53D' },
  { name: '딥 블루', hex: '#113264' },
  { name: '차콜', hex: '#1C2024' },
];

const FONTS = [
  { name: 'Pretendard', weight: 'Regular 400' },
  { name: 'Inter', weight: 'SemiBold 600' },
  { name: 'Spoqa Han Sans', weight: 'Medium 500' },
];

export default function BrandImageEditor() {
  const [activeColor, setActiveColor] = useState(0);
  const [device, setDevice] = useState<'pc' | 'mobile'>('pc');
  const [heroTitle, setHeroTitle] = useState('2026년 상반기 신입사원 모집');
  const [heroSubtitle, setHeroSubtitle] = useState('함께 성장할 인재를 찾고 있습니다.');
  const { showToast } = useNav();

  const color = BRAND_COLORS[activeColor].hex;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h4 className="text-sm font-semibold">브랜드 이미지 설정</h4>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">기업 로고 · 브랜드 컬러 · 히어로 이미지로 지원서 디자인 완성</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => showToast('브랜드 미리보기 패널 열기')}>
            <Eye size={14} /> 미리보기
          </Button>
          <Button size="sm" onClick={() => showToast('브랜드 이미지 설정을 저장했어요')}>
            <Save size={14} /> 저장
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측: 미리보기 */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="py-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--gray-3)]">
              <div className="flex items-center gap-2 text-xs">
                <ImageIcon size={12} />
                <span className="font-medium">지원서 브랜드 미리보기</span>
              </div>
              <div className="inline-flex items-center gap-0.5 p-0.5 rounded bg-[var(--card)]">
                {[
                  { k: 'pc', l: 'PC', icon: Monitor },
                  { k: 'mobile', l: 'Mobile', icon: Smartphone },
                ].map(d => {
                  const Icon = d.icon;
                  return (
                    <button
                      key={d.k}
                      onClick={() => setDevice(d.k as any)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-all ${
                        device === d.k ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--foreground-muted)]'
                      }`}
                    >
                      <Icon size={11} />
                      {d.l}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 bg-[var(--gray-3)]/40">
              <motion.div
                key={`${activeColor}-${device}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`bg-[var(--card)] rounded-lg shadow-sm border border-[var(--border)] overflow-hidden mx-auto ${
                  device === 'pc' ? 'max-w-full' : 'max-w-[320px]'
                }`}
              >
                {/* 히어로 영역 */}
                <div
                  className="relative h-40 flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
                >
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full">
                      <circle cx="20" cy="20" r="30" fill="white" />
                      <circle cx="180" cy="80" r="40" fill="white" />
                    </svg>
                  </div>
                  <div className="relative text-white text-center px-6">
                    <div className="text-[10px] font-semibold tracking-widest opacity-80">MAIDAS</div>
                    <div className="text-lg font-bold mt-1 leading-tight">{heroTitle}</div>
                    <div className="text-[11px] opacity-90 mt-1">{heroSubtitle}</div>
                  </div>
                </div>

                {/* 로고 카드 */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: color }}
                    >
                      H.
                    </div>
                    <div>
                      <div className="text-xs font-semibold">MAIDAS</div>
                      <div className="text-[9px] text-[var(--foreground-muted)]">Career Page</div>
                    </div>
                  </div>

                  {/* 버튼 */}
                  <button
                    className="w-full py-2 rounded-md text-white text-sm font-medium"
                    style={{ background: color }}
                  >
                    지원서 작성
                  </button>

                  {/* 보조 정보 */}
                  <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-[var(--foreground-muted)]">
                    <div>
                      <div className="font-semibold" style={{ color }}>D-84</div>
                      <div>접수 마감</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--foreground)]">112명</div>
                      <div>지원 인원</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--foreground)]">5단계</div>
                      <div>채용 전형</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </div>

        {/* 우측: 설정 패널 */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
          {/* 로고 */}
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <ImageIcon size={13} className="text-[var(--primary)]" />
              <h4 className="text-sm font-semibold">로고 등록</h4>
            </div>
            <CardContent>
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-md border border-dashed border-[var(--border)] bg-[var(--gray-3)] flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center text-white font-bold"
                    style={{ background: color }}
                  >
                    H.
                  </div>
                </div>
                <div className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => showToast('로고 파일 선택 다이얼로그를 열었어요')}
                  >
                    <Upload size={12} /> 로고 업로드
                  </Button>
                  <div className="text-[10px] text-[var(--foreground-muted)] mt-1">SVG · PNG · 400×400 이상</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 브랜드 컬러 */}
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <Palette size={13} className="text-[var(--primary)]" />
              <h4 className="text-sm font-semibold">브랜드 컬러</h4>
            </div>
            <CardContent>
              <div className="grid grid-cols-6 gap-2">
                {BRAND_COLORS.map((c, i) => (
                  <motion.button
                    key={c.name}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveColor(i)}
                    className={`relative aspect-square rounded-md transition-all ${
                      activeColor === i ? 'ring-2 ring-[var(--foreground)] ring-offset-2 ring-offset-[var(--card)]' : ''
                    }`}
                    style={{ background: c.hex }}
                    title={c.name}
                  >
                    {activeColor === i && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <label className="text-[11px] text-[var(--foreground-muted)]">커스텀</label>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-[var(--border)] text-[11px] flex-1">
                  <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
                  <span className="font-mono">{color}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 텍스트 설정 */}
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <Type size={13} className="text-[var(--primary)]" />
              <h4 className="text-sm font-semibold">히어로 텍스트 · 폰트</h4>
            </div>
            <CardContent className="flex flex-col gap-2.5">
              <div>
                <label className="text-[10px] text-[var(--foreground-muted)]">메인 제목</label>
                <input
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full mt-1 h-8 px-2.5 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[var(--foreground-muted)]">서브 제목</label>
                <input
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full mt-1 h-8 px-2.5 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[var(--foreground-muted)]">폰트</label>
                <div className="mt-1 h-8 px-2.5 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                  <span>{FONTS[0].name} · {FONTS[0].weight}</span>
                  <ChevronDown size={11} className="text-[var(--foreground-muted)]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
