import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Table2, Video, Calendar, Users, MessageSquare, Sparkles, ListChecks, BarChart3 } from 'lucide-react';
import CandidateKanban from './CandidateKanban';
import ScreeningGrid from './ScreeningGrid';
import VideoInterviewPanel from './VideoInterviewPanel';
import InterviewScheduler from './InterviewScheduler';
import MeetingInterviewGuide from './MeetingInterviewGuide';
import OpenRecruitDashboard from './OpenRecruitDashboard';
import InquiryChannel from './InquiryChannel';
import VideoQuestionCurator from './VideoQuestionCurator';
import EvaluationCollect from '../evaluation/EvaluationCollect';
import EvaluatorScorecard from '../evaluation/EvaluatorScorecard';
import ScreeningConditionDesigner from '../screening/ScreeningConditionDesigner';
import CompetencyScreeningSetup from '../screening/CompetencyScreeningSetup';
import AutoRecruitTimeline from './AutoRecruitTimeline';
import InterviewerPool from '../interviewers/InterviewerPool';
import CandidateFeedback from '../feedback/CandidateFeedback';
import LiveInterviewRoom from '../liveinterview/LiveInterviewRoom';
import BatchRecruitConsole from '../batch/BatchRecruitConsole';
import { SubViewTabs } from '../shared/commonUI';
import { useNav } from '../shared/navContext';
import { ClipboardCheck, Target, Workflow, Star, Users2, Heart, Activity } from 'lucide-react';

type View = 'open' | 'timeline' | 'batch' | 'kanban' | 'screening' | 'screening-setup' | 'competency-setup' | 'video' | 'video-q' | 'live' | 'schedule' | 'meeting' | 'inquiry' | 'evaluation' | 'scorecard' | 'interviewers' | 'feedback';

const VIEWS: { key: View; label: string; icon: any; group?: string }[] = [
  { key: 'open', label: '수상시 채용', icon: ListChecks, group: '운영' },
  { key: 'timeline', label: '자동 운영 타임라인', icon: Workflow, group: '운영' },
  { key: 'batch', label: '공채 배치 콘솔', icon: Activity, group: '운영' },
  { key: 'kanban', label: '지원자 칸반', icon: LayoutGrid, group: '지원자' },
  { key: 'screening', label: '통합 스크리닝', icon: Table2, group: '지원자' },
  { key: 'screening-setup', label: '서류 조건 설계', icon: ClipboardCheck, group: '지원자' },
  { key: 'competency-setup', label: '역량 조건 설계', icon: Target, group: '지원자' },
  { key: 'feedback', label: '지원자 피드백', icon: Heart, group: '지원자' },
  { key: 'video-q', label: '영상면접 질문', icon: Sparkles, group: '면접' },
  { key: 'video', label: '영상 면접 결과', icon: Video, group: '면접' },
  { key: 'live', label: '실시간 면접룸', icon: Video, group: '면접' },
  { key: 'meeting', label: 'AI 대면 면접', icon: Users, group: '면접' },
  { key: 'schedule', label: '일정 조율', icon: Calendar, group: '면접' },
  { key: 'interviewers', label: '면접관 풀', icon: Users2, group: '면접' },
  { key: 'evaluation', label: '평가 수집 · 집계', icon: BarChart3, group: '평가 · 문의' },
  { key: 'scorecard', label: '평가 입력 (평가자)', icon: Star, group: '평가 · 문의' },
  { key: 'inquiry', label: '문의 채널', icon: MessageSquare, group: '평가 · 문의' },
];

const DURING_GROUPS = ['운영', '지원자', '면접', '평가 · 문의'];

export default function DuringRecruitment() {
  const { subViews, setSubView } = useNav();
  const view = subViews.during as View;
  const setView = (v: View) => setSubView('during', v);

  return (
    <div className="flex flex-col gap-6">
      <SubViewTabs views={VIEWS} active={view} onChange={setView} layoutId="during-view-indicator" groups={DURING_GROUPS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'open' && <OpenRecruitDashboard />}
          {view === 'timeline' && <AutoRecruitTimeline />}
          {view === 'batch' && <BatchRecruitConsole />}
          {view === 'kanban' && <CandidateKanban />}
          {view === 'screening' && <ScreeningGrid />}
          {view === 'screening-setup' && <ScreeningConditionDesigner />}
          {view === 'competency-setup' && <CompetencyScreeningSetup />}
          {view === 'video-q' && <VideoQuestionCurator />}
          {view === 'video' && <VideoInterviewPanel />}
          {view === 'live' && <LiveInterviewRoom />}
          {view === 'meeting' && <MeetingInterviewGuide />}
          {view === 'schedule' && <InterviewScheduler />}
          {view === 'evaluation' && <EvaluationCollect />}
          {view === 'scorecard' && <EvaluatorScorecard />}
          {view === 'interviewers' && <InterviewerPool />}
          {view === 'feedback' && <CandidateFeedback />}
          {view === 'inquiry' && <InquiryChannel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
