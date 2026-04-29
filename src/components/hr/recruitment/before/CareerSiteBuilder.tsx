import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Palette, Megaphone, Layout, FileText as FileIcon, MessageSquare,
  Globe, ChevronDown, Send, ArrowRight, Check,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { useNav } from '../shared/navContext';

const SIDE_NAV = [
  { key: 'design', icon: Palette, label: '디자인', active: true },
  { key: 'job', icon: Megaphone, label: '채용 공고 설정' },
  { key: 'header', icon: Layout, label: '헤더 설정' },
  { key: 'board', icon: FileIcon, label: '게시판 설정' },
];

const TEMPLATES = [
  { id: 1, name: '미니멀 레이아웃', accent: 'from-[var(--gray-3)]', items: 3 },
  { id: 2, name: '브랜드 컬러 중심', accent: 'from-[var(--gray-4)]', items: 4 },
  { id: 3, name: '조직문화 중심', accent: 'from-[var(--gray-3)]', items: 2 },
];

const CONVERSATION = [
  { role: 'user' as const, text: '자동으로 제조업 채용홈페이지를 만들어줘.' },
  { role: 'ai' as const, text: '작성하신 프롬프트를 기반으로 템플릿을 추천드려요.' },
];

export default function CareerSiteBuilder() {
  const [input, setInput] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const { showToast } = useNav();

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                <Globe size={16} className="text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">AI 채용사이트 자동 생성</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  기업 특성을 분석하여 최적의 템플릿을 추천합니다
                </p>
              </div>
            </div>
            <Button size="sm" onClick={() => showToast('AI가 새 채용 사이트 생성을 시작했어요')}>
              <Sparkles size={14} /> 새 사이트 시작
            </Button>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측 사이드 네비 */}
        <FadeIn delay={0.05} className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <div className="px-6">
              <div className="text-xs text-[var(--foreground-muted)]">사이트 설정</div>
            </div>
            <CardContent className="flex flex-col gap-1">
              {SIDE_NAV.map(n => {
                const Icon = n.icon;
                return (
                  <motion.button
                    key={n.key}
                    whileHover={{ x: 2 }}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-left transition-colors ${
                      n.active
                        ? 'bg-[var(--foreground)] text-[var(--background)]'
                        : 'text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                    }`}
                  >
                    <Icon size={13} />
                    <span>{n.label}</span>
                  </motion.button>
                );
              })}
              <div className="h-px bg-[var(--border)] my-2" />
              <div className="text-[10px] text-[var(--foreground-muted)] px-2.5">채용 설정</div>
              <button className="flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]">
                <MessageSquare size={13} /> 채널 연동
              </button>
              <div className="h-px bg-[var(--border)] my-2" />
              <div className="text-[10px] text-[var(--foreground-muted)] px-2.5">템플릿 관리</div>
              <button className="flex items-center gap-2 px-2.5 py-2 rounded-md bg-[var(--primary)]/10 text-xs text-[var(--primary)] font-medium">
                <Sparkles size={13} /> AI 채용사이트
              </button>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 중앙 AI 대화 + 템플릿 추천 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-9">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--gray-3)] text-[11px]">
                  <ChevronDown size={10} /> 히스토리
                </span>
                <Badge variant="outline" className="text-[10px]">새 프로젝트</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles size={12} className="text-[var(--primary)]" />
                <span className="text-[10px] text-[var(--foreground-muted)]">AI 활성</span>
              </div>
            </div>
            <CardContent className="flex flex-col gap-4">
              {/* 대화 영역 */}
              <div className="flex flex-col gap-3">
                {CONVERSATION.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {m.role === 'ai' && (
                      <div className="w-7 h-7 rounded-full bg-[var(--gray-3)] flex items-center justify-center shrink-0 text-[10px] font-semibold">
                        H.
                      </div>
                    )}
                    <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                      m.role === 'user'
                        ? 'bg-[var(--foreground)] text-[var(--background)]'
                        : 'bg-[var(--gray-3)] text-[var(--foreground)]'
                    }`}>
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 템플릿 3종 */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {TEMPLATES.map((t) => (
                  <StaggerItem key={t.id}>
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`w-full text-left rounded-lg border overflow-hidden transition-all ${
                        selectedTemplate === t.id
                          ? 'border-[var(--foreground)] shadow-md'
                          : 'border-[var(--border)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="aspect-[3/4] bg-[var(--gray-3)] relative">
                        {/* 템플릿 목업 */}
                        <div className="absolute top-3 left-3 right-3 h-5 rounded bg-[var(--card)]" />
                        <div className="absolute top-10 left-3 right-3 h-20 rounded bg-[var(--card)]" />
                        <div className="absolute top-32 left-3 right-3 grid grid-cols-2 gap-1">
                          <div className="h-10 rounded bg-[var(--card)]" />
                          <div className="h-10 rounded bg-[var(--card)]" />
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 h-8 rounded bg-[var(--card)]" />
                        {selectedTemplate === t.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--foreground)] flex items-center justify-center"
                          >
                            <Check size={14} className="text-[var(--background)]" />
                          </motion.div>
                        )}
                      </div>
                      <div className="p-3 border-t border-[var(--border)] flex items-center justify-between">
                        <div>
                          <div className="text-xs font-medium">{t.name}</div>
                          <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{t.items}개 섹션</div>
                        </div>
                        <ArrowRight size={12} className="text-[var(--foreground-muted)]" />
                      </div>
                    </motion.button>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => showToast('AI에 추가 정보를 요청합니다')}>
                  더 정확한 디자인 추천받기 →
                </Button>
                <Button variant="ghost" size="sm" onClick={() => showToast('새로운 템플릿 추천을 받았어요')}>
                  다른 디자인 추천 받기
                </Button>
              </div>

              {/* AI 입력 */}
              <div className="p-3 rounded-lg bg-[var(--gray-3)] border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-[var(--card)] flex items-center justify-center text-[9px] font-semibold">H.</div>
                  <span className="text-[11px] text-[var(--foreground-muted)]">
                    아래 내용을 입력해 주시면, 더 정확한 템플릿을 추천받을 수 있어요.
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-[var(--card)] text-[11px]">
                    <Palette size={10} className="text-[var(--foreground-muted)]" />
                    <span className="text-[var(--foreground-muted)]">기업명 세조</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-[var(--card)] text-[11px]">
                    <span className="text-[var(--foreground-muted)]">업종의 채용 홈페이지를 만들어봐.</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-[var(--card)] text-[11px]">
                    <span className="w-3 h-3 rounded-sm bg-[var(--primary)]" />
                    <span className="text-[var(--foreground-muted)]">#228EBC</span>
                    <span className="text-[var(--foreground-muted)]">메인(포인) 컬러에요.</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2.5">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="업종, 브랜드 컬러, 회사 분위기 등을 입력해주세요..."
                    className="flex-1 h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
                  />
                  <Button
                    size="icon-sm"
                    onClick={() => {
                      if (!input.trim()) return;
                      showToast('AI가 입력 내용을 반영하고 있어요');
                      setInput('');
                    }}
                  >
                    <Send size={13} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
