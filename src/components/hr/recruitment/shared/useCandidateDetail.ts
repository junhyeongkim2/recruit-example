import { createContext, useContext, useState } from 'react';
import type { Candidate } from '../mockData';

interface CandidateCtx {
  candidate: Candidate | null;
  setCandidate: (c: Candidate | null) => void;
}

export const CandidateContext = createContext<CandidateCtx>({
  candidate: null,
  setCandidate: () => {},
});

export function useCandidateDetail() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  return { candidate, setCandidate };
}

export function useCandidateModal() {
  return useContext(CandidateContext);
}
