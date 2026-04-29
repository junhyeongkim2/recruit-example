import type { MainTab } from './navContext';

export interface Intent {
  keywords: string[];
  target: { main: MainTab; sub?: string };
  action: string;
}

export const INTENTS: Intent[] = [
  // 기획
  { keywords: ['기획', '계획', '선발 기준', '역량', '프로세스 설계', '인재상'], target: { main: 'before', sub: 'planning' }, action: '채용 기획 · 선발 기준' },
  // 공고
  { keywords: ['공고 만들', '공고 생성', '새 공고', '공고 작성', '채용 공고', '공고문'], target: { main: 'before', sub: 'jd' }, action: 'AI 공고문 에디터' },
  { keywords: ['공고 관리', '공고 리스트', '공고 목록', '전체 공고'], target: { main: 'before', sub: 'jobs' }, action: '공고 관리' },
  // 지원서
  { keywords: ['지원서', '지원 양식'], target: { main: 'before', sub: 'application' }, action: '지원서 빌더' },
  { keywords: ['브랜드', '로고', '디자인 설정'], target: { main: 'before', sub: 'brand' }, action: '브랜드 이미지 설정' },
  // 채용 사이트
  { keywords: ['채용 사이트', '랜딩', '사이트 빌더'], target: { main: 'before', sub: 'site' }, action: '채용 사이트 빌더' },
  { keywords: ['포털', '지원자 뷰'], target: { main: 'before', sub: 'portal' }, action: '응시자 포털' },
  // AI 도구
  { keywords: ['이력서', '파싱', '파서', 'resume'], target: { main: 'before', sub: 'parser' }, action: 'AI 이력서 파서' },
  { keywords: ['자동화', '규칙', '워크플로', 'if then'], target: { main: 'before', sub: 'automation' }, action: '자동화 규칙 빌더' },
  { keywords: ['메시지', '이메일', 'sms', '템플릿', '문자'], target: { main: 'before', sub: 'messages' }, action: '메시지 템플릿' },
  // 지원자 운영
  { keywords: ['지원자 칸반', '칸반', '지원자 보여', '지원자 리스트'], target: { main: 'during', sub: 'kanban' }, action: '지원자 칸반' },
  { keywords: ['지원자', '후보자', '지원 현황'], target: { main: 'during', sub: 'kanban' }, action: '지원자 관리' },
  { keywords: ['스크리닝', '서류 심사', '통합 스크리닝'], target: { main: 'during', sub: 'screening' }, action: '통합 스크리닝' },
  { keywords: ['서류 조건', '서류 심사 조건'], target: { main: 'during', sub: 'screening-setup' }, action: '서류 조건 설계' },
  { keywords: ['역량 조건', '역량검사 설정'], target: { main: 'during', sub: 'competency-setup' }, action: '역량 조건 설계' },
  // 면접
  { keywords: ['영상 면접 질문', '면접 질문 생성'], target: { main: 'during', sub: 'video-q' }, action: '영상면접 질문 큐레이터' },
  { keywords: ['영상 면접', '영상', '비디오 면접'], target: { main: 'during', sub: 'video' }, action: '영상 면접 결과' },
  { keywords: ['실시간 면접', '라이브 면접', '화상 면접', '면접룸'], target: { main: 'during', sub: 'live' }, action: '실시간 면접룸' },
  { keywords: ['대면 면접', 'ai 면접 가이드', '면접 가이드'], target: { main: 'during', sub: 'meeting' }, action: 'AI 대면 면접 가이드' },
  { keywords: ['면접 일정', '일정 조율', '면접 스케줄', '스케줄링'], target: { main: 'during', sub: 'schedule' }, action: '면접 일정 조율' },
  { keywords: ['면접관', '면접관 풀', '면접관 배정'], target: { main: 'during', sub: 'interviewers' }, action: '면접관 풀' },
  // 운영 콘솔
  { keywords: ['자동 운영', '타임라인'], target: { main: 'during', sub: 'timeline' }, action: '자동 운영 타임라인' },
  { keywords: ['수상시', '수상시 채용', '상시 채용'], target: { main: 'during', sub: 'open' }, action: '수상시 채용 대시보드' },
  { keywords: ['공채', '공채 콘솔', '대규모 공채', '배치 콘솔', '배치'], target: { main: 'during', sub: 'batch' }, action: '공채 배치 콘솔' },
  // 평가
  { keywords: ['평가자', '스코어카드', '평가 입력'], target: { main: 'during', sub: 'scorecard' }, action: '평가자 스코어카드' },
  { keywords: ['평가 수집', '평가 집계', '평가 현황'], target: { main: 'during', sub: 'evaluation' }, action: '평가 수집 · 집계' },
  { keywords: ['문의', '질문', 'q&a', 'qna'], target: { main: 'during', sub: 'inquiry' }, action: '문의 채널' },
  { keywords: ['지원자 피드백', 'cx', '지원자 경험', 'nps'], target: { main: 'during', sub: 'feedback' }, action: '지원자 피드백' },
  // 오퍼
  { keywords: ['오퍼 레터', '레터', '오퍼 문서'], target: { main: 'offer', sub: 'letter' }, action: '오퍼 레터 에디터' },
  { keywords: ['오퍼', '처우', '연봉', '오퍼 발송'], target: { main: 'offer', sub: 'offer' }, action: '오퍼 관리' },
  { keywords: ['레퍼런스', '추천인', '신원 검증'], target: { main: 'offer', sub: 'reference' }, action: '레퍼런스 체크' },
  { keywords: ['입사', '발령', '온보딩', '핸드오프'], target: { main: 'offer', sub: 'onboarding' }, action: '입사·발령 연동' },
  { keywords: ['탤런트풀', '풀', '불합격자', '인재풀'], target: { main: 'offer', sub: 'pool' }, action: '탤런트 풀' },
  // 분석
  { keywords: ['리포트', '성과 리포트', '결과 리포트'], target: { main: 'after', sub: 'overview' }, action: '채용 결과 리포트' },
  { keywords: ['지원자 종합', '종합 리포트'], target: { main: 'after', sub: 'candidate' }, action: '지원자 종합 리포트' },
  { keywords: ['검증 리포트'], target: { main: 'after', sub: 'verify' }, action: '통합 검증 리포트' },
  { keywords: ['위젯', '편집기', '리포트 편집'], target: { main: 'after', sub: 'editor' }, action: '위젯 편집기' },
  { keywords: ['예산', '비용', 'roi'], target: { main: 'after', sub: 'budget' }, action: '예산 · 비용 관리' },
  { keywords: ['sla', '리드타임', '지연'], target: { main: 'after', sub: 'sla' }, action: 'SLA · 리드타임 관리' },
  { keywords: ['dei', '다양성', '포용', '형평'], target: { main: 'after', sub: 'dei' }, action: 'DEI 다양성 대시보드' },
  { keywords: ['마켓', '벤치마크', '경쟁사', '연봉 비교'], target: { main: 'after', sub: 'market' }, action: '마켓 벤치마크' },
  { keywords: ['크로스', '공동체', '공동체 이동', '공동체 채용'], target: { main: 'after', sub: 'crosshire' }, action: '공동체 크로스 채용' },
];

export function parseIntent(text: string): Intent | null {
  const lower = text.toLowerCase();
  for (const intent of INTENTS) {
    if (intent.keywords.some(k => lower.includes(k))) return intent;
  }
  return null;
}
