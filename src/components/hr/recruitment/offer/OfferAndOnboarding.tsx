import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, ArrowLeftRight, Star, FileText as FileIcon, UserCheck } from 'lucide-react';
import OfferManagement from './OfferManagement';
import OnboardingHandoff from './OnboardingHandoff';
import TalentPool from './TalentPool';
import OfferLetterEditor from './OfferLetterEditor';
import ReferenceCheck from '../references/ReferenceCheck';
import { SubViewTabs } from '../shared/commonUI';
import { useNav } from '../shared/navContext';

type View = 'offer' | 'letter' | 'reference' | 'onboarding' | 'pool';

const VIEWS: { key: View; label: string; icon: any }[] = [
  { key: 'offer', label: '처우 · 오퍼', icon: DollarSign },
  { key: 'letter', label: '오퍼 레터 에디터', icon: FileIcon },
  { key: 'reference', label: '레퍼런스 체크', icon: UserCheck },
  { key: 'onboarding', label: '입사 · 발령 연동', icon: ArrowLeftRight },
  { key: 'pool', label: '탤런트 풀', icon: Star },
];

export default function OfferAndOnboarding() {
  const { subViews, setSubView } = useNav();
  const view = subViews.offer as View;
  const setView = (v: View) => setSubView('offer', v);

  return (
    <div className="flex flex-col gap-6">
      <SubViewTabs views={VIEWS} active={view} onChange={setView} layoutId="offer-view-indicator" />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'offer' && <OfferManagement />}
          {view === 'letter' && <OfferLetterEditor />}
          {view === 'reference' && <ReferenceCheck />}
          {view === 'onboarding' && <OnboardingHandoff />}
          {view === 'pool' && <TalentPool />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
