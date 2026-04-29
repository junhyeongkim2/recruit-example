import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare, Phone, Mail, Users, AlertCircle, CheckCircle2, Send,
  Filter, Search, MoreVertical,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

const KPI = [
  { label: '전체', value: '12,630', unit: '명', sub: '25.11.05 ~ 05.02.05' },
  { label: '[면접전형] 상반기 공개수시 면접진형', value: '11,058', unit: '명', trend: '+3.2%' },
  { label: '[면접전형] 하반기 공개수시 연봉진형', value: '170', unit: '명', highlight: true },
];

const SECONDARY_KPI = [
  { label: '미응시', value: 10, color: 'warning' },
  { label: '중도포기', value: 10, color: 'error' },
  { label: '자격미달', value: 24, color: 'warning' },
  { label: '연결', value: 1, color: 'secondary' },
  { label: '응답', value: 10, color: 'success' },
];

const APPLICANTS = [
  { id: '0001-010121', name: '김정림', round: '배정 완료', status: '합격', ok: true, time: '11/19 (15:00~16:00)' },
  { id: '0001-000765', name: '이미원', round: '배정 완료', status: '합격', score: '80점', ok: true, time: '11/19 (15:00~16:00)' },
  { id: '0001-000332', name: '백서진', round: '배정 완료', status: '합격', score: '70점', ok: true, time: '11/19 (15:00~16:00)' },
  { id: '0001-000780', name: '최음진', round: '—', status: '불합격', ok: false, time: '11/19 (15:00~16:00)' },
  { id: '0001-000252', name: '차인', round: '배정 완료', status: '대기중', score: '50점', ok: null, time: '11/18 (15:30~16:00)' },
  { id: '0001-000320', name: '황지아', round: '배정 완료', status: '대기중', score: '60점', ok: null, time: '11/18 (15:00~16:00)' },
  { id: '0001-000195', name: '원상지', round: '배정 완료', status: '대기중', score: '55점', ok: null, time: '11/18 (16:00~16:30)' },
  { id: '0001-000777', name: '지은희', round: '—', status: '불합격', ok: false, time: '11/17 (16:00~16:30)' },
];

const APPLICANT_QUESTIONS = [
  { name: '김정림', time: '2025.11.19', category: '전형 문의', answered: false, text: '역량검사 확인이 잘못 되었을 때 다시 진행할 수 있을까요?' },
  { name: '이미원', time: '2025.11.19', category: '전형 문의', answered: false, text: '면접 일정 확정 메시지 수령 확인 부탁드립니다.' },
  { name: '박시훈', time: '2025.11.19', category: '전형 문의', answered: true, text: '서류 통과 축하 메시지 받았습니다. 다음 단계 안내가 궁금합니다.' },
  { name: '정한남', time: '2025.11.19', category: '전형 문의', answered: false, text: '지원서 수정할 내용이 있어요.' },
];

export default function InquiryChannel() {
  const [qTab, setQTab] = useState<'applicant' | 'evaluator'>('applicant');
  const [openReply, setOpenReply] = useState<number | null>(null);
  const [autoReply, setAutoReply] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-[10px]">자동원영</Badge>
            <h3 className="text-sm font-semibold">2026년 상반기 마이다스 공개채용</h3>
            <span className="text-xs text-[var(--foreground-muted)]">업데이트</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-[var(--foreground-muted)]">
              <span>알림</span>
              <span>일정</span>
              <span>문의</span>
              <Badge variant="outline" className="text-[10px]">자동운영 설정</Badge>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측 메인 */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          {/* KPI 3개 */}
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-3 gap-3">
              {KPI.map((k, i) => (
                <Card key={i} className={`h-full ${k.highlight ? 'bg-[var(--success)]/5' : ''}`}>
                  <CardContent>
                    <div className="text-[10px] text-[var(--foreground-muted)] line-clamp-1">{k.label}</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-2xl font-semibold ${k.highlight ? 'text-[var(--success)]' : ''}`}
                      >
                        {k.value}
                      </motion.span>
                      <span className="text-xs text-[var(--foreground-muted)]">{k.unit}</span>
                    </div>
                    <div className="text-[10px] text-[var(--foreground-subtle)] mt-1">{k.sub || k.trend}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* 서브 지표 */}
          <FadeIn delay={0.1}>
            <Card className="h-full">
              <CardContent className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold">170</span>
                    <span className="text-xs text-[var(--foreground-muted)]">명</span>
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)] mt-1">면접인원</div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold">30</span>
                    <span className="text-xs text-[var(--foreground-muted)]">명</span>
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)] mt-1">응답전자 다차장</div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold">30</span>
                    <span className="text-xs text-[var(--foreground-muted)]">명</span>
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)] mt-1">자동응답 다차장</div>
                </div>
                <div className="flex items-center gap-3">
                  {SECONDARY_KPI.map(s => (
                    <div key={s.label} className="text-center">
                      <Badge variant={s.color as any} className="text-[9px]">{s.label}</Badge>
                      <div className="text-sm font-semibold mt-1">{s.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* 지원자 테이블 */}
          <FadeIn delay={0.15}>
            <Card className="h-full py-0">
              <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button className="text-xs font-semibold px-3 py-1 rounded-md bg-[var(--gray-3)]">
                    평가자 현황
                  </button>
                  <button className="text-xs text-[var(--foreground-muted)] px-3 py-1 rounded-md hover:bg-[var(--gray-3)]">
                    지원자 현황
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[var(--foreground-muted)]">총 170명</span>
                  <div className="relative">
                    <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]" />
                    <input
                      type="text"
                      placeholder="이름으로 검색"
                      className="h-7 pl-6 pr-2 text-[11px] rounded border border-[var(--border)] bg-[var(--card)] w-[120px]"
                    />
                  </div>
                  <Button variant="outline" size="xs"><Filter size={10} /> 전형 설정</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--gray-3)]">
                    <tr>
                      {['이름', '수험번호', '평가자 배정(정/부)', '중도포기', '자격미달', '전형진행', '대기중'].map(h => (
                        <th key={h} className="px-3 py-2 text-[10px] font-medium text-[var(--foreground-muted)] text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {APPLICANTS.map((a) => (
                      <tr key={a.id} className="border-t border-[var(--border)] hover:bg-[var(--gray-3)] transition-colors">
                        <td className="px-3 py-2 text-xs font-medium">{a.name}</td>
                        <td className="px-3 py-2 text-[11px] text-[var(--foreground-muted)]">{a.id}</td>
                        <td className="px-3 py-2 text-[11px] text-[var(--foreground-muted)]">{a.round}</td>
                        <td className="px-3 py-2 text-[11px] text-[var(--foreground-muted)]">{a.score || '—'}</td>
                        <td className="px-3 py-2">
                          {a.ok === true && <Badge variant="success" className="text-[10px]">{a.status}</Badge>}
                          {a.ok === false && <Badge variant="error" className="text-[10px]">{a.status}</Badge>}
                          {a.ok === null && <Badge variant="warning" className="text-[10px]">{a.status}</Badge>}
                        </td>
                        <td className="px-3 py-2 text-[11px] text-[var(--foreground-muted)]">{a.time}</td>
                        <td className="px-3 py-2">
                          <Badge variant={a.ok === null ? 'warning' : a.ok ? 'success' : 'error'} className="text-[10px]">
                            {a.ok === null ? '대기중' : a.ok ? '응답' : '불응답'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 border-t border-[var(--border)] text-[11px] text-[var(--foreground-muted)] flex items-center justify-between">
                <span>총 8명</span>
                <div className="flex items-center gap-1">
                  <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)]">‹</button>
                  <button className="w-6 h-6 rounded bg-[var(--foreground)] text-[var(--background)]">1</button>
                  <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)]">2</button>
                  <button className="w-6 h-6 rounded hover:bg-[var(--gray-3)]">›</button>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* 우측 Q&A 패널 */}
        <FadeIn delay={0.2} className="col-span-12 lg:col-span-4">
          <Card className="h-full py-0 flex flex-col">
            <div className="px-4 py-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-1 mb-2">
                <button
                  onClick={() => setQTab('applicant')}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-md transition-colors ${
                    qTab === 'applicant' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                  }`}
                >
                  <Users size={11} /> 지원자 Q&A <Badge variant="secondary" className="text-[9px] ml-1">999+</Badge>
                </button>
                <button
                  onClick={() => setQTab('evaluator')}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-md transition-colors ${
                    qTab === 'evaluator' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                  }`}
                >
                  <CheckCircle2 size={11} /> 평가자 Q&A <Badge variant="secondary" className="text-[9px] ml-1">10</Badge>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 px-2 rounded border border-[var(--border)] text-[11px] flex items-center flex-1 text-[var(--foreground-muted)]">
                  전체
                </div>
                <label className="flex items-center gap-1 text-[11px] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoReply}
                    onChange={(e) => setAutoReply(e.target.checked)}
                  />
                  <span className="text-[var(--foreground-muted)]">답변하지 않은 보기</span>
                </label>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <StaggerContainer className="flex flex-col">
                {APPLICANT_QUESTIONS.map((q, i) => (
                  <StaggerItem key={i}>
                    <motion.div
                      whileHover={{ x: 2 }}
                      className="px-4 py-3 border-b border-[var(--border)] cursor-pointer hover:bg-[var(--gray-3)]"
                      onClick={() => setOpenReply(openReply === i ? null : i)}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-medium">{q.name}</span>
                          <span className="text-[10px] text-[var(--foreground-subtle)]">{q.time}</span>
                        </div>
                        {q.answered ? (
                          <Badge variant="success" className="text-[10px]">답변완료</Badge>
                        ) : (
                          <Badge variant="warning" className="text-[10px]">답변대기</Badge>
                        )}
                      </div>
                      <div className="text-[11px] text-[var(--foreground-muted)] mb-1">{q.category}</div>
                      <div className="text-[11px] leading-relaxed">{q.text}</div>

                      <AnimatePresence>
                        {openReply === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 pt-2 border-t border-[var(--border)]">
                              <textarea
                                placeholder="답변을 입력하세요..."
                                className="w-full h-16 px-2 py-1.5 text-[11px] rounded border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] resize-none"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="flex gap-1 mt-1.5 justify-end">
                                <Button variant="outline" size="xs" onClick={(e) => e.stopPropagation()}>
                                  AI 초안
                                </Button>
                                <Button size="xs" onClick={(e) => e.stopPropagation()}>
                                  <Send size={10} /> 답변
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
