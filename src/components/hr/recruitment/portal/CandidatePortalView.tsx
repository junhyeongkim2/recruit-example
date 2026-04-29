import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Eye, Smartphone, Monitor, Search, ArrowRight, Check, Clock3,
  Users, Briefcase, MapPin, Heart, Share2, Bookmark, Bell,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/page-transition';
import { useNav } from '../shared/navContext';

// 지원자가 실제 보는 채용 포털 미리보기
const FEATURED = {
  title: '2026년 상반기\n시니어 백엔드 엔지니어 채용',
  subtitle: '함께 HRIS 플랫폼의 미래를 만들어갈 시니어 엔지니어를 찾습니다.',
  department: 'HRIS 개발팀',
  deadline: '2026-05-10',
  applicants: 87,
};

const OPEN_JOBS = [
  { id: '1', title: '시니어 백엔드 엔지니어 (Kotlin)', dept: 'HRIS 개발팀', type: '정규직', location: '판교', deadline: 'D-18', new: true },
  { id: '2', title: '프론트엔드 엔지니어 (React/TS)', dept: 'HRIS 개발팀', type: '정규직', location: '판교', deadline: 'D-23', new: true },
  { id: '3', title: 'HR 데이터 분석가', dept: '피플실', type: '정규직', location: '판교', deadline: 'D-8' },
  { id: '4', title: '프로덕트 디자이너', dept: 'HR 프로덕트 디자인팀', type: '정규직', location: '판교', deadline: 'D-28' },
  { id: '5', title: 'QA 엔지니어', dept: 'QA팀', type: '정규직', location: '판교', deadline: 'D-35' },
  { id: '6', title: 'AI/ML 엔지니어', dept: 'AI 추론팀', type: '정규직', location: '판교', deadline: 'D-40', new: true },
];

const BENEFITS = [
  { icon: '🏠', label: '하이브리드 근무', desc: '유연한 재택 · 오피스 조합' },
  { icon: '📚', label: '학습 지원', desc: '연 200만원 교육비 · 도서' },
  { icon: '💻', label: '장비 지원', desc: '최신 MacBook · 모니터' },
  { icon: '🍱', label: '식사 지원', desc: '점심 · 저녁 전액' },
  { icon: '🎁', label: '사이닝 보너스', desc: '직급별 차등 지급' },
  { icon: '💼', label: '스톡옵션', desc: '4년 베스팅' },
];

const CULTURE_VALUES = [
  { title: '오너십', desc: '주인 의식을 가지고 문제를 끝까지 해결합니다' },
  { title: '솔직한 소통', desc: '건강한 피드백으로 함께 성장합니다' },
  { title: '학습 민첩성', desc: '변화를 두려워하지 않고 빠르게 배웁니다' },
];

const EMPLOYEE_VOICES = [
  { name: '이도윤', role: '백엔드 엔지니어', years: '2년차', text: '내가 만든 시스템이 수천 명의 HR 업무를 바꾸는 것을 실시간으로 확인할 수 있어요.' },
  { name: '김서연', role: '프론트엔드 엔지니어', years: '1년차', text: '동료들이 서로 배우려는 자세가 특별해요. 기술 토론이 매일 즐겁습니다.' },
  { name: '박지우', role: '디자이너', years: '3년차', text: '사용자와 가까운 제품을 만드는 재미가 있어요.' },
];

export default function CandidatePortalView() {
  const [device, setDevice] = useState<'pc' | 'mobile'>('pc');
  const { showToast } = useNav();

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <Eye size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">응시자 포털 미리보기</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                지원자가 실제 보는 채용 사이트 · careers.kakao.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-0.5 p-0.5 rounded-md bg-[var(--gray-3)]">
              {[
                { k: 'pc' as const, l: 'PC', icon: Monitor },
                { k: 'mobile' as const, l: 'Mobile', icon: Smartphone },
              ].map(d => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.k}
                    onClick={() => setDevice(d.k)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] transition-all ${
                      device === d.k ? 'bg-[var(--card)] shadow-sm font-medium' : 'text-[var(--foreground-muted)]'
                    }`}
                  >
                    <Icon size={11} />
                    {d.l}
                  </button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('공유 링크를 복사했어요')}
            >
              <Share2 size={14} /> 공유 링크
            </Button>
            <Button size="sm" onClick={() => showToast('실제 채용 사이트를 새 창에서 열었어요')}>
              실제 URL에서 보기 ↗
            </Button>
          </div>
        </div>
      </FadeIn>

      <motion.div
        key={device}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="py-0 overflow-hidden">
          <div className="p-6 bg-[var(--gray-3)]/40 min-h-[700px]">
            <motion.div
              key={device}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`mx-auto bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)] overflow-hidden ${
                device === 'pc' ? 'max-w-full' : 'max-w-[380px]'
              }`}
            >
              {/* Topbar */}
              <div className="px-6 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-xs font-bold">K.</div>
                    <span className="text-sm font-bold">카카오 채용</span>
                  </div>
                  {device === 'pc' && (
                    <nav className="flex items-center gap-4 text-[11px] text-[var(--foreground-muted)]">
                      <a className="hover:text-[var(--foreground)]">채용 공고</a>
                      <a className="hover:text-[var(--foreground)]">카카오 이야기</a>
                      <a className="hover:text-[var(--foreground)]">복지 · 문화</a>
                      <a className="hover:text-[var(--foreground)]">FAQ</a>
                    </nav>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">
                    <Search size={12} />
                  </button>
                  <Button variant="outline" size="xs" onClick={() => showToast('로그인 페이지로 이동')}>
                    로그인
                  </Button>
                </div>
              </div>

              {/* Hero */}
              <div className="relative bg-gradient-to-br from-[#FFF8BB] via-[#FFEAAC] to-[#FFC53D] px-8 py-12 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
                    <circle cx="180" cy="20" r="40" fill="white" />
                    <circle cx="30" cy="90" r="30" fill="white" />
                  </svg>
                </div>
                <div className="relative">
                  <Badge variant="outline" className="text-[10px] bg-[var(--card)]">Featured</Badge>
                  <h1 className={`font-bold mt-3 leading-tight whitespace-pre-line ${device === 'pc' ? 'text-3xl' : 'text-xl'}`}>
                    {FEATURED.title}
                  </h1>
                  <p className={`text-[var(--foreground)] mt-2 leading-relaxed ${device === 'pc' ? 'text-sm' : 'text-xs'}`}>
                    {FEATURED.subtitle}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-[11px] text-[var(--foreground)]">
                    <span className="inline-flex items-center gap-1">
                      <Briefcase size={11} /> {FEATURED.department}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 size={11} /> 마감 {FEATURED.deadline}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Users size={11} /> {FEATURED.applicants}명 지원
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <button className="px-5 py-2 rounded-md bg-black text-white text-xs font-semibold">
                      지원하기 →
                    </button>
                    <button className="px-5 py-2 rounded-md bg-white/80 backdrop-blur text-xs font-medium border border-[var(--border)]">
                      자세히 보기
                    </button>
                  </div>
                </div>
              </div>

              {/* Open Jobs */}
              <div className="px-8 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">진행 중인 공고</h2>
                  <div className="flex items-center gap-1 text-[11px] text-[var(--foreground-muted)]">
                    <span>{OPEN_JOBS.length}개</span>
                    <span>·</span>
                    <a className="text-[var(--primary)]">전체 보기 →</a>
                  </div>
                </div>

                <div className={`grid gap-2 ${device === 'pc' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {OPEN_JOBS.map((j, i) => (
                    <motion.div
                      key={j.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ x: 2 }}
                      className="p-3 rounded-md border border-[var(--border)] hover:border-[var(--foreground)] hover:shadow-sm transition-all cursor-pointer flex items-center gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs font-semibold truncate">{j.title}</span>
                          {j.new && <Badge variant="warning" className="text-[9px]">NEW</Badge>}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--foreground-muted)]">
                          <span>{j.dept}</span>
                          <span>·</span>
                          <span>{j.type}</span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-0.5">
                            <MapPin size={9} /> {j.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className="text-[10px]">{j.deadline}</Badge>
                        <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)]">
                          <Bookmark size={11} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="px-8 py-8 bg-[var(--gray-3)]/40">
                <h2 className="text-lg font-bold mb-1">카카오에서 일하면</h2>
                <p className="text-xs text-[var(--foreground-muted)] mb-4">구성원의 성장과 행복을 위한 복지</p>
                <div className={`grid gap-3 ${device === 'pc' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  {BENEFITS.map((b, i) => (
                    <motion.div
                      key={b.label}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-3 rounded-lg bg-[var(--card)] border border-[var(--border)]"
                    >
                      <div className="text-2xl mb-1">{b.icon}</div>
                      <div className="text-xs font-semibold">{b.label}</div>
                      <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{b.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Culture */}
              <div className="px-8 py-8">
                <h2 className="text-lg font-bold mb-1">우리가 일하는 방식</h2>
                <p className="text-xs text-[var(--foreground-muted)] mb-4">이런 동료와 함께하고 싶어요</p>
                <div className={`grid gap-3 ${device === 'pc' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                  {CULTURE_VALUES.map((c, i) => (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 rounded-lg border border-[var(--border)]"
                    >
                      <div className="text-sm font-bold mb-1">{c.title}</div>
                      <div className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">{c.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Employee Voices */}
              <div className="px-8 py-8 bg-[var(--gray-3)]/40">
                <h2 className="text-lg font-bold mb-4">구성원의 목소리</h2>
                <div className={`grid gap-3 ${device === 'pc' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                  {EMPLOYEE_VOICES.map((v, i) => (
                    <motion.div
                      key={v.name}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 rounded-lg bg-[var(--card)]"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-xs font-semibold">
                          {v.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{v.name}</div>
                          <div className="text-[10px] text-[var(--foreground-muted)]">{v.role} · {v.years}</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-[var(--foreground)] leading-relaxed">"{v.text}"</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="px-8 py-10 text-center bg-black text-white">
                <h2 className={`font-bold leading-tight ${device === 'pc' ? 'text-2xl' : 'text-lg'}`}>
                  함께 성장할 준비가 되셨나요?
                </h2>
                <p className="text-xs opacity-80 mt-2">관심 공고에 바로 지원해 보세요.</p>
                <button className="mt-5 px-6 py-2.5 rounded-md bg-white text-black text-sm font-semibold">
                  공고 전체 보기 →
                </button>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-[var(--foreground)] text-white text-[10px] flex items-center justify-between">
                <span className="opacity-60">© Kakao Corp. 2026</span>
                <div className="flex items-center gap-3 opacity-80">
                  <a>채용 FAQ</a>
                  <a>개인정보처리방침</a>
                  <a>문의하기</a>
                </div>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
