import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, FileText, Palette, Globe, CheckCircle2, ClipboardList,
  Target, Shield, ArrowRight, Wand2, LayoutGrid, Edit3,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import ApplicationBuilder from './ApplicationBuilder';
import JobPostingEditor from './JobPostingEditor';
import CareerSiteBuilder from './CareerSiteBuilder';
import BrandImageEditor from './BrandImageEditor';
import HiringPlanningSuite from '../planning/HiringPlanningSuite';
import JobPostingList from '../jobs/JobPostingList';
import MessageTemplates from '../communication/MessageTemplates';
import CandidatePortalView from '../portal/CandidatePortalView';
import ResumeParser from '../parser/ResumeParser';
import AutomationRules from '../automation/AutomationRules';
import { SubViewTabs } from '../shared/commonUI';
import { useNav } from '../shared/navContext';
import { Icon3D } from '../shared/Icon3D';
import { Palette as PaletteIcon, FolderOpen, Mail, Eye, FileText as FileIcon2, Zap as ZapIcon } from 'lucide-react';

type View = 'overview' | 'planning' | 'application' | 'jd' | 'site' | 'brand' | 'jobs' | 'messages' | 'portal' | 'parser' | 'automation';

const FEATURES = [
  { id: 'plan', icon: Target, title: '채용 기획 · 선발 기준 · 프로세스', desc: 'TO · 역량 가중치 · 프로세스 설계', status: 'NEW', to: 'planning' as const },
  { id: 'application', icon: Palette, title: '커스텀 지원서 빌더', desc: '250개 모듈 조합, 위지윅 편집', status: 'NEW', to: 'application' as const },
  { id: 'jd', icon: FileText, title: 'AI 공고문 에디터', desc: '실시간 수정 + 법규 검토', status: 'HOT', to: 'jd' as const },
  { id: 'site', icon: Globe, title: '채용 사이트 자동 생성', desc: 'AI 대화형 템플릿 추천', status: 'NEW', to: 'site' as const },
];

const VIEWS: { key: View; label: string; icon: any; group?: string }[] = [
  { key: 'overview', label: '개요', icon: LayoutGrid, group: '개요' },
  { key: 'jobs', label: '공고 관리', icon: FolderOpen, group: '개요' },
  { key: 'planning', label: '기획 · 기준 · 프로세스', icon: ClipboardList, group: '기획' },
  { key: 'jd', label: '공고문 에디터', icon: Edit3, group: '공고 · 지원서' },
  { key: 'application', label: '지원서 빌더', icon: Palette, group: '공고 · 지원서' },
  { key: 'brand', label: '브랜드 이미지', icon: PaletteIcon, group: '공고 · 지원서' },
  { key: 'site', label: '채용 사이트', icon: Globe, group: '응시자 접점' },
  { key: 'portal', label: '응시자 포털', icon: Eye, group: '응시자 접점' },
  { key: 'parser', label: 'AI 이력서 파서', icon: FileIcon2, group: 'AI · 자동화' },
  { key: 'messages', label: '메시지 템플릿', icon: Mail, group: 'AI · 자동화' },
  { key: 'automation', label: '자동화 규칙', icon: ZapIcon, group: 'AI · 자동화' },
];

const BEFORE_GROUPS = ['개요', '기획', '공고 · 지원서', '응시자 접점', 'AI · 자동화'];

export default function BeforeRecruitment() {
  const { subViews, setSubView } = useNav();
  const view = subViews.before as View;
  const setView = (v: View) => setSubView('before', v);

  return (
    <div className="flex flex-col gap-6">
      <SubViewTabs views={VIEWS} active={view} onChange={setView} layoutId="before-view-indicator" groups={BEFORE_GROUPS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'overview' && (
            <div className="flex flex-col gap-6">
              <FadeIn>
                <Card>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon3D name="lightbulb" size={44} />
                      <div>
                        <h2 className="text-[15px] font-semibold">채용 시작 전, AI가 모든 준비를 도와드립니다</h2>
                        <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                          기획 · 선발 기준 · 공고 · 지원서 · 채용 사이트까지 원클릭 생성
                        </p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => setView('jd')}>
                      <Sparkles size={14} /> 새 공고 시작
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {FEATURES.map(f => {
                  const Icon = f.icon;
                  return (
                    <StaggerItem key={f.id}>
                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                        <Card
                          className="h-full hover:shadow-md transition-shadow cursor-pointer group"
                          onClick={() => f.to && setView(f.to)}
                        >
                          <CardContent className="flex flex-col gap-3">
                            <div className="flex items-start justify-between">
                              <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center group-hover:bg-[var(--primary)]/10 transition-colors">
                                <Icon size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
                              </div>
                              <Badge
                                variant={f.status === 'HOT' ? 'error' : f.status === 'NEW' ? 'warning' : 'success'}
                                className="text-[10px]"
                              >
                                {f.status}
                              </Badge>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold leading-snug">{f.title}</h3>
                              <p className="text-[11px] text-[var(--foreground-muted)] mt-1 leading-relaxed">{f.desc}</p>
                            </div>
                            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                              <span className="text-[11px] text-[var(--foreground-muted)]">바로 시작</span>
                              <ArrowRight size={12} className="text-[var(--foreground-subtle)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          )}
          {view === 'jobs' && <JobPostingList />}
          {view === 'planning' && <HiringPlanningSuite />}
          {view === 'application' && <ApplicationBuilder />}
          {view === 'jd' && <JobPostingEditor />}
          {view === 'brand' && <BrandImageEditor />}
          {view === 'site' && <CareerSiteBuilder />}
          {view === 'portal' && <CandidatePortalView />}
          {view === 'parser' && <ResumeParser />}
          {view === 'messages' && <MessageTemplates />}
          {view === 'automation' && <AutomationRules />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
