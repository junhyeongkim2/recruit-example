import { motion } from 'motion/react';
import { ChevronRight, Home } from 'lucide-react';
import { useNav, type MainTab } from './navContext';

const MAIN_LABELS: Record<MainTab, string> = {
  agent: 'AI 에이전트',
  dashboard: '대시보드',
  before: '채용 전',
  during: '채용 중',
  offer: '오퍼 · 입사',
  after: '채용 후',
};

// 서브뷰 key → 레이블 매핑
const SUB_LABELS: Record<string, string> = {
  // before
  overview: '개요',
  jobs: '공고 관리',
  planning: '기획 · 기준 · 프로세스',
  application: '지원서 빌더',
  jd: '공고문 에디터',
  brand: '브랜드 이미지',
  site: '채용 사이트',
  portal: '응시자 포털',
  parser: 'AI 이력서 파서',
  messages: '메시지 템플릿',
  automation: '자동화 규칙',
  // during
  open: '수상시 채용',
  timeline: '자동 운영 타임라인',
  batch: '공채 배치 콘솔',
  kanban: '지원자 칸반',
  screening: '통합 스크리닝',
  'screening-setup': '서류 조건 설계',
  'competency-setup': '역량 조건 설계',
  'video-q': '영상면접 질문',
  video: '영상 면접 결과',
  live: '실시간 면접룸',
  meeting: 'AI 대면 면접',
  schedule: '일정 조율',
  evaluation: '평가 수집 · 집계',
  scorecard: '평가 입력',
  interviewers: '면접관 풀',
  feedback: '지원자 피드백',
  inquiry: '문의 채널',
  // offer
  offer: '처우 · 오퍼',
  letter: '오퍼 레터 에디터',
  reference: '레퍼런스 체크',
  onboarding: '입사 · 발령 연동',
  pool: '탤런트 풀',
  // after
  candidate: '지원자 종합 리포트',
  verify: '통합 검증 리포트',
  editor: '위젯 편집기',
  budget: '예산 · 비용 관리',
  sla: 'SLA · 리드타임',
  dei: 'DEI 다양성',
  market: '마켓 벤치마크',
  crosshire: '공동체 크로스 채용',
};

export default function Breadcrumb() {
  const { mainTab, subViews, setMainTab } = useNav();

  if (mainTab === 'agent' || mainTab === 'dashboard') return null;

  const currentSub = (subViews as any)[mainTab];
  const subLabel = SUB_LABELS[currentSub];
  const mainLabel = MAIN_LABELS[mainTab];

  if (!subLabel) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-1 text-[11px] text-[var(--foreground-muted)]"
      aria-label="Breadcrumb"
    >
      <button
        onClick={() => setMainTab('agent')}
        className="inline-flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
      >
        <Home size={10} />
        <span>채용관리</span>
      </button>
      <ChevronRight size={10} className="text-[var(--foreground-subtle)]" />
      <span className="text-[var(--foreground-muted)]">{mainLabel}</span>
      <ChevronRight size={10} className="text-[var(--foreground-subtle)]" />
      <span className="font-medium text-[var(--foreground)]">{subLabel}</span>
    </motion.nav>
  );
}
