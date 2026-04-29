// 채용관리 목업 데이터 — h.place 채용 에이전트 기능 기반

export type JobStatus = 'draft' | 'open' | 'closed' | 'reviewing';
export type CandidateStage = 'applied' | 'screening' | 'interview1' | 'interview2' | 'offer' | 'hired' | 'rejected';

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  team: string;
  employmentType: '정규직' | '계약직' | '인턴';
  status: JobStatus;
  applicants: number;
  newApplicants: number;
  deadline: string;
  owner: string;
  createdAt: string;
  aiGenerated?: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  jobId: string;
  jobTitle: string;
  stage: CandidateStage;
  aiScore: number;
  appliedAt: string;
  experience: number;
  currentCompany?: string;
  skills: string[];
  hasVideoInterview?: boolean;
  flagged?: boolean;
}

export interface AITask {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: '공고' | '면접' | '스크리닝' | '채용사이트' | '리포트';
  dueIn: string;
  count?: number;
}

export const JOB_POSTINGS: JobPosting[] = [
  {
    id: 'JOB-2026-041',
    title: '백엔드 엔지니어 (Kotlin/Spring)',
    department: '기술플랫폼',
    team: 'HRIS 개발팀',
    employmentType: '정규직',
    status: 'open',
    applicants: 87,
    newApplicants: 12,
    deadline: '2026-05-10',
    owner: 'bentley.jun',
    createdAt: '2026-04-05',
    aiGenerated: true,
  },
  {
    id: 'JOB-2026-042',
    title: '프론트엔드 엔지니어 (React/TS)',
    department: '기술플랫폼',
    team: 'HRIS 개발팀',
    employmentType: '정규직',
    status: 'open',
    applicants: 134,
    newApplicants: 23,
    deadline: '2026-05-15',
    owner: 'may.kim',
    createdAt: '2026-04-08',
    aiGenerated: true,
  },
  {
    id: 'JOB-2026-043',
    title: 'HR 데이터 분석가',
    department: '피플실',
    team: '피플데이터팀',
    employmentType: '정규직',
    status: 'reviewing',
    applicants: 42,
    newApplicants: 0,
    deadline: '2026-04-30',
    owner: 'jay.lee',
    createdAt: '2026-03-28',
  },
  {
    id: 'JOB-2026-044',
    title: '프로덕트 디자이너',
    department: '디자인실',
    team: 'HR 프로덕트 디자인팀',
    employmentType: '정규직',
    status: 'open',
    applicants: 56,
    newApplicants: 8,
    deadline: '2026-05-20',
    owner: 'sue.park',
    createdAt: '2026-04-10',
  },
  {
    id: 'JOB-2026-045',
    title: 'AI/ML 엔지니어',
    department: '기술플랫폼',
    team: 'AI 추론팀',
    employmentType: '정규직',
    status: 'draft',
    applicants: 0,
    newApplicants: 0,
    deadline: '2026-06-01',
    owner: 'bentley.jun',
    createdAt: '2026-04-20',
    aiGenerated: true,
  },
  {
    id: 'JOB-2026-039',
    title: 'QA 엔지니어 (인턴)',
    department: '기술플랫폼',
    team: 'QA팀',
    employmentType: '인턴',
    status: 'closed',
    applicants: 231,
    newApplicants: 0,
    deadline: '2026-03-15',
    owner: 'daniel.choi',
    createdAt: '2026-02-20',
  },
];

export const CANDIDATES: Candidate[] = [
  { id: 'C-001', name: '김서연', jobId: 'JOB-2026-041', jobTitle: '백엔드 엔지니어', stage: 'applied', aiScore: 87, appliedAt: '2026-04-19', experience: 5, currentCompany: '네이버', skills: ['Kotlin', 'Spring', 'Kafka'], hasVideoInterview: true },
  { id: 'C-002', name: '이도윤', jobId: 'JOB-2026-041', jobTitle: '백엔드 엔지니어', stage: 'screening', aiScore: 92, appliedAt: '2026-04-18', experience: 7, currentCompany: '쿠팡', skills: ['Kotlin', 'Spring', 'Redis', 'K8s'], hasVideoInterview: true, flagged: true },
  { id: 'C-003', name: '박지우', jobId: 'JOB-2026-041', jobTitle: '백엔드 엔지니어', stage: 'interview1', aiScore: 85, appliedAt: '2026-04-15', experience: 4, currentCompany: '토스', skills: ['Java', 'Spring', 'MSA'] },
  { id: 'C-004', name: '정유진', jobId: 'JOB-2026-041', jobTitle: '백엔드 엔지니어', stage: 'interview2', aiScore: 89, appliedAt: '2026-04-12', experience: 6, currentCompany: '당근', skills: ['Kotlin', 'JPA', 'Event Sourcing'], hasVideoInterview: true },
  { id: 'C-005', name: '최민호', jobId: 'JOB-2026-041', jobTitle: '백엔드 엔지니어', stage: 'offer', aiScore: 94, appliedAt: '2026-04-08', experience: 8, currentCompany: '라인', skills: ['Kotlin', 'Spring', 'DDD', 'Kafka'], flagged: true },
  { id: 'C-006', name: '강하늘', jobId: 'JOB-2026-042', jobTitle: '프론트엔드 엔지니어', stage: 'applied', aiScore: 78, appliedAt: '2026-04-20', experience: 3, skills: ['React', 'TypeScript'] },
  { id: 'C-007', name: '윤서아', jobId: 'JOB-2026-042', jobTitle: '프론트엔드 엔지니어', stage: 'applied', aiScore: 82, appliedAt: '2026-04-20', experience: 4, currentCompany: '우아한형제들', skills: ['Next.js', 'React', 'Tailwind'], hasVideoInterview: true },
  { id: 'C-008', name: '한준서', jobId: 'JOB-2026-042', jobTitle: '프론트엔드 엔지니어', stage: 'screening', aiScore: 88, appliedAt: '2026-04-17', experience: 5, currentCompany: '카카오페이', skills: ['React', 'TypeScript', 'Zustand'] },
  { id: 'C-009', name: '조예린', jobId: 'JOB-2026-042', jobTitle: '프론트엔드 엔지니어', stage: 'screening', aiScore: 76, appliedAt: '2026-04-16', experience: 2, skills: ['Vue', 'React'] },
  { id: 'C-010', name: '임채원', jobId: 'JOB-2026-042', jobTitle: '프론트엔드 엔지니어', stage: 'interview1', aiScore: 91, appliedAt: '2026-04-13', experience: 6, currentCompany: '넷플릭스코리아', skills: ['React', 'Performance', 'A11y'] },
  { id: 'C-011', name: '송지훈', jobId: 'JOB-2026-043', jobTitle: 'HR 데이터 분석가', stage: 'interview2', aiScore: 90, appliedAt: '2026-04-10', experience: 5, currentCompany: '라인비즈플러스', skills: ['SQL', 'Python', 'Tableau'] },
  { id: 'C-012', name: '배소율', jobId: 'JOB-2026-044', jobTitle: '프로덕트 디자이너', stage: 'applied', aiScore: 81, appliedAt: '2026-04-20', experience: 4, currentCompany: '토스', skills: ['Figma', 'Design System', 'User Research'] },
  { id: 'C-013', name: '황민재', jobId: 'JOB-2026-044', jobTitle: '프로덕트 디자이너', stage: 'interview1', aiScore: 86, appliedAt: '2026-04-14', experience: 6, skills: ['Figma', 'Motion', 'Prototyping'] },
  { id: 'C-014', name: '오지안', jobId: 'JOB-2026-041', jobTitle: '백엔드 엔지니어', stage: 'rejected', aiScore: 54, appliedAt: '2026-04-17', experience: 2, skills: ['Python'] },
];

export const AI_TASKS: AITask[] = [
  { id: 'T-1', title: '백엔드 엔지니어 공고 심사 대기 12건', description: '서류 검토가 필요한 신규 지원자가 있습니다. AI 추천순 정렬 완료.', priority: 'high', category: '스크리닝', dueIn: '오늘', count: 12 },
  { id: 'T-2', title: '프론트엔드 1차 면접 일정 조율', description: '3명 지원자의 면접 시간을 면접관 3명과 자동 매칭했습니다. 확정해 주세요.', priority: 'high', category: '면접', dueIn: '내일까지', count: 3 },
  { id: 'T-3', title: '디자이너 공고문 법규 검토 완료', description: '노동법·성차별 조항 검토 통과. 즉시 게시 가능합니다.', priority: 'medium', category: '공고', dueIn: '대기 중' },
  { id: 'T-4', title: 'AI/ML 공고 초안 생성', description: '작년 공고 및 시장 공고 120건 분석 기반 초안 3종 준비됨.', priority: 'medium', category: '공고', dueIn: '검토 필요', count: 3 },
  { id: 'T-5', title: '2026 Q1 채용 성과 리포트', description: '분기 리포트 자동 생성 완료. 경영진 보고용 시각화 포함.', priority: 'low', category: '리포트', dueIn: '준비 완료' },
  { id: 'T-6', title: '채용 사이트 A/B 테스트 결과', description: '템플릿 B가 전환율 +23% 개선. 전환 권장.', priority: 'medium', category: '채용사이트', dueIn: '결정 대기' },
];

export const KPI_METRICS = {
  activeJobs: { value: 12, delta: '+2', label: '진행 중 공고' },
  totalApplicants: { value: 1247, delta: '+87', label: '이번 주 지원자' },
  avgTimeToHire: { value: 28, unit: '일', delta: '-4일', label: '평균 채용 소요일' },
  offerAcceptance: { value: 87, unit: '%', delta: '+3%p', label: '오퍼 수락률' },
  avgAiScore: { value: 82.4, unit: '점', delta: '+1.2점', label: '평균 AI 스코어' },
  newThisWeek: { value: 87, delta: '+23%', label: '신규 지원' },
};

export const FUNNEL_DATA = [
  { stage: '지원', count: 1247, ratio: 100 },
  { stage: '서류 통과', count: 423, ratio: 34 },
  { stage: '1차 면접', count: 198, ratio: 15.9 },
  { stage: '2차 면접', count: 82, ratio: 6.6 },
  { stage: '오퍼', count: 41, ratio: 3.3 },
  { stage: '입사 확정', count: 36, ratio: 2.9 },
];

export const WEEKLY_APPLICATIONS = [
  { day: '월', applicants: 142, hired: 3 },
  { day: '화', applicants: 187, hired: 4 },
  { day: '수', applicants: 203, hired: 2 },
  { day: '목', applicants: 178, hired: 5 },
  { day: '금', applicants: 241, hired: 6 },
  { day: '토', applicants: 89, hired: 1 },
  { day: '일', applicants: 67, hired: 0 },
];

export const STAGE_LABELS: Record<CandidateStage, string> = {
  applied: '지원',
  screening: '서류검토',
  interview1: '1차면접',
  interview2: '2차면접',
  offer: '오퍼',
  hired: '입사',
  rejected: '불합격',
};

export const STATUS_LABELS: Record<JobStatus, string> = {
  draft: '작성 중',
  open: '진행 중',
  reviewing: '심사 중',
  closed: '마감',
};
