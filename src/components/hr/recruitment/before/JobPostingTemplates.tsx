import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// h.place 1_95 — 공고 디자인 템플릿 9종 그리드 (컬러풀)
interface Template {
  id: number;
  name: string;
  accent: string;
  bg: string;
  text: string;
  tagline: string;
  subtitle?: string;
  layout: 'card' | 'hero' | 'split' | 'gradient';
}

const TEMPLATES: Template[] = [
  { id: 1, name: '프라이머리 블루', accent: 'var(--primary)', bg: 'bg-gradient-to-br from-[#B7E0FE] to-[#0090FF]', text: 'text-white', tagline: '우리와 함께', subtitle: '성장할 분', layout: 'hero' },
  { id: 2, name: '임팩트 레드', accent: 'var(--error)', bg: 'bg-gradient-to-br from-[#FDBDBE] to-[#E5484D]', text: 'text-white', tagline: '2026 상반기\n신입 공채', layout: 'gradient' },
  { id: 3, name: '그린 내추럴', accent: 'var(--success)', bg: 'bg-gradient-to-br from-[#B4DFC4] to-[#30A46C]', text: 'text-white', tagline: '지속가능한\n미래 채용', layout: 'hero' },
  { id: 4, name: '미니멀 블랙', accent: 'var(--foreground)', bg: 'bg-[#1C2024]', text: 'text-white', tagline: 'WE ARE\nHIRING', subtitle: '경력직 수시 채용', layout: 'split' },
  { id: 5, name: '워밍 옐로우', accent: 'var(--warning)', bg: 'bg-[#FFC53D]', text: 'text-[#1C2024]', tagline: '함께할\n동료를 찾아요', layout: 'card' },
  { id: 6, name: '소프트 뉴트럴', accent: 'var(--primary)', bg: 'bg-gradient-to-br from-[#F9F9FB] to-[#E0E1E6]', text: 'text-[#1C2024]', tagline: '새로운\n시작', layout: 'hero' },
  { id: 7, name: '딥 블루', accent: 'var(--primary)', bg: 'bg-gradient-to-br from-[#113264] to-[#0068D0]', text: 'text-white', tagline: 'EXPAND\nYOUR WORLD', layout: 'split' },
  { id: 8, name: '라이트 미스트', accent: 'var(--success)', bg: 'bg-gradient-to-br from-[#E9F9EE] to-[#B4DFC4]', text: 'text-[#1C2024]', tagline: '우리와\n함께 성장', layout: 'card' },
  { id: 9, name: '레드 임팩트', accent: 'var(--error)', bg: 'bg-gradient-to-br from-[#E5484D] to-[#CA3214]', text: 'text-white', tagline: 'TALENT\n찾습니다', layout: 'gradient' },
];

function TemplatePreview({ t, selected, onClick }: { t: Template; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
        selected ? 'border-[var(--foreground)] shadow-md' : 'border-[var(--border)] hover:border-[var(--border-strong)]'
      }`}
    >
      <div className={`absolute inset-0 ${t.bg} ${t.text} p-4 flex flex-col`}>
        {t.layout === 'hero' && (
          <>
            <div className="text-[8px] font-bold tracking-widest opacity-80">MAIDAS</div>
            <div className="mt-auto">
              <div className="text-xl font-bold leading-tight whitespace-pre-line">{t.tagline}</div>
              {t.subtitle && <div className="text-[10px] mt-1 opacity-90">{t.subtitle}</div>}
            </div>
          </>
        )}
        {t.layout === 'split' && (
          <div className="flex flex-col h-full justify-between">
            <div className="text-xl font-black leading-tight whitespace-pre-line">{t.tagline}</div>
            {t.subtitle && <div className="text-[9px] opacity-80 mt-auto">{t.subtitle}</div>}
            <div className="h-1 w-8 bg-current mt-2 opacity-80" />
          </div>
        )}
        {t.layout === 'card' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-[8px] opacity-70 mb-2">2026 RECRUIT</div>
            <div className="text-lg font-bold leading-tight whitespace-pre-line">{t.tagline}</div>
            <div className="mt-3 px-3 py-1 rounded-full bg-white/20 text-[8px]">지원하기 →</div>
          </div>
        )}
        {t.layout === 'gradient' && (
          <>
            <div className="text-[8px] opacity-80">HIRING</div>
            <div className="mt-auto">
              <div className="text-xl font-bold leading-tight whitespace-pre-line">{t.tagline}</div>
            </div>
            <div className="h-0.5 w-full bg-current opacity-30 mt-2" />
          </>
        )}
      </div>

      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--foreground)] flex items-center justify-center"
        >
          <Check size={12} className="text-[var(--background)]" />
        </motion.div>
      )}

      <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-[var(--card)]/95 backdrop-blur border-t border-[var(--border)] flex items-center justify-between">
        <span className="text-[10px] font-medium">{t.name}</span>
        <Badge variant="outline" className="text-[9px]">T{t.id}</Badge>
      </div>
    </motion.button>
  );
}

export default function JobPostingTemplates() {
  const [selected, setSelected] = useState<number | null>(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold">공고 디자인 템플릿</h4>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">기업 인재상과 공고 내용을 분석한 AI 추천 템플릿</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]" />
            <input
              type="text"
              placeholder="템플릿명 검색"
              className="h-8 pl-7 pr-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] w-[180px] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          <Button size="sm" disabled={selected === null}>템플릿 적용 →</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {TEMPLATES.map(t => (
          <TemplatePreview
            key={t.id}
            t={t}
            selected={selected === t.id}
            onClick={() => setSelected(t.id)}
          />
        ))}
      </div>

      <div className="px-4 py-2 rounded-md bg-[var(--gray-3)] text-[11px] text-[var(--foreground-muted)] text-center">
        총 {TEMPLATES.length}개 템플릿 · 기업 브랜드 컬러 자동 적용 · 모바일·데스크탑 자동 대응
      </div>
    </div>
  );
}
