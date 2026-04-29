import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Shield, Send, Edit3, Check, X, FileText, Image as ImageIcon,
  AlertCircle, CheckCircle2, Monitor, Smartphone, Tablet, Eye,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

type Tab = 'template' | 'edit' | 'legal' | 'preview';

const LEGAL_ITEMS = {
  law: [
    { id: 1, ok: true, label: '응시자격 요건', detail: '연령 / 학력 / 경력' },
    { id: 2, ok: true, label: '금지사항 입력', detail: '금지어 / 성차별 / 지역차별 검사 완료' },
    { id: 3, ok: false, label: '개인정보 보유 기간 및 위탁 정보', detail: '미표기 항목 발견', warn: true },
  ],
  internal: [
    { id: 4, ok: true, label: '회사 내규 검토', detail: '2026 인사 규정 준수' },
    { id: 5, ok: true, label: '연봉 표기 기준', detail: '직무별 밴드 연동' },
  ],
  guide: [
    { id: 6, ok: true, label: '서울 보장법 제28조(직원 모집의 보호)', detail: '이상 없음' },
    { id: 7, ok: true, label: '채용 공고 기재사항 채용과 관련된 법령', detail: '이상 없음' },
    { id: 8, ok: true, label: '기타 법률 근거', detail: '채용 담당자 확인 완료' },
    { id: 9, ok: true, label: '채용 절차의 공정화에 관한 법률 제10조(지원자 개인정보 보호)', detail: '이상 없음' },
  ],
};

const SUGGESTIONS = [
  '더 밝고 밝은 톤의 디자인',
  '미드센츄리 계열 타이포',
  '자연 색감 모던하게',
];

import JobPostingTemplates from './JobPostingTemplates';
import JobPostingSizeConverter from './JobPostingSizeConverter';

export default function JobPostingEditor() {
  const [tab, setTab] = useState<Tab>('template');
  const [legalTab, setLegalTab] = useState<'law' | 'internal' | 'guide'>('law');
  const [device, setDevice] = useState<'pc' | 'tablet' | 'mobile'>('pc');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '수정을 원하는 디자인을 선택해 주세요.' },
  ]);

  const sendSuggestion = (s: string) => {
    setMessages([...messages, { role: 'user', text: s }, { role: 'ai', text: `${s}로 반영했습니다. 좌측 미리보기를 확인해주세요.` }]);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 상단 탭 */}
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1">
            {[
              { k: 'template', l: '템플릿 선택' },
              { k: 'edit', l: '공고문 편집' },
              { k: 'legal', l: '법률 검토' },
              { k: 'preview', l: '플랫폼별 미리보기' },
            ].map(t => (
              <button
                key={t.k}
                onClick={() => setTab(t.k as Tab)}
                className={`relative text-sm px-3 py-1.5 transition-colors ${
                  tab === t.k ? 'font-semibold text-[var(--foreground)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {t.l}
                {tab === t.k && (
                  <motion.div
                    layoutId="jd-tab-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[var(--foreground)]"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Eye size={14} /> 미리보기</Button>
            <Button size="sm"><Sparkles size={14} /> AI 재생성</Button>
          </div>
        </div>
      </FadeIn>

      <AnimatePresence mode="wait">
        {/* 템플릿 탭 */}
        {tab === 'template' && (
          <motion.div
            key="template"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <JobPostingTemplates />
          </motion.div>
        )}

        {/* 편집 탭 */}
        {tab === 'edit' && (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-12 gap-4"
          >
            {/* 공고문 미리보기 */}
            <div className="col-span-12 lg:col-span-7">
              <Card className="py-0 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--gray-3)]">
                  <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                    <FileText size={12} />
                    <span>공고문 미리보기</span>
                  </div>
                  <Badge variant="success" className="text-[10px]">AI 생성</Badge>
                </div>
                <div className="aspect-[4/5] relative bg-[var(--gray-3)] flex items-center justify-center overflow-hidden">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-[75%] bg-[var(--card)] rounded-lg shadow-sm overflow-hidden border border-[var(--border)]"
                  >
                    <div className="p-6">
                      <div className="text-[10px] font-semibold tracking-widest text-[var(--foreground-muted)]">MAIDAS</div>
                      <div className="mt-4 text-base font-semibold leading-snug">
                        기업명<br />2026년 상반기<br />신입 경력 채용
                      </div>
                      <div className="mt-4 h-32 rounded bg-[var(--gray-3)] flex items-center justify-center">
                        <ImageIcon size={24} className="text-[var(--foreground-subtle)]" />
                      </div>
                      <div className="mt-3 text-[10px] text-[var(--foreground-muted)] leading-relaxed">
                        진취적 도전 정신으로 새로운 가치를 만들어갈<br />인재를 찾고 있습니다.
                      </div>
                      <div className="mt-3 flex items-center justify-center py-2 rounded bg-[var(--foreground)] text-[var(--background)] text-[10px]">
                        지원하기 →
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </div>

            {/* 우측 AI 수정 채팅 */}
            <div className="col-span-12 lg:col-span-5">
              <Card className="h-full flex flex-col">
                <div className="px-6 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--gray-3)] flex items-center justify-center">
                    <Sparkles size={12} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="text-sm font-semibold">AI 에디터</h3>
                  <Badge variant="outline" className="text-[10px]">실시간</Badge>
                </div>
                <CardContent className="flex-1 flex flex-col gap-3">
                  <div className="flex-1 flex flex-col gap-2.5">
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${
                          m.role === 'user' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-[var(--gray-3)]'
                        }`}>
                          {m.text}
                        </div>
                      </motion.div>
                    ))}
                    <div className="flex flex-col gap-1.5 mt-2">
                      {SUGGESTIONS.map(s => (
                        <motion.button
                          key={s}
                          whileHover={{ x: 2 }}
                          onClick={() => sendSuggestion(s)}
                          className="text-left px-3 py-2 rounded-md border border-[var(--border)] text-xs hover:bg-[var(--gray-3)]"
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-[var(--border)]">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="원하는 수정 내용을 입력해주세요"
                      className="flex-1 h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
                    />
                    <Button size="icon-sm"><Send size={13} /></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* 법률 검토 탭 */}
        {tab === 'legal' && (
          <motion.div
            key="legal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-12 gap-4"
          >
            <div className="col-span-12 lg:col-span-5">
              <Card className="h-full">
                <div className="px-6 flex items-center gap-2">
                  <Shield size={14} className="text-[var(--primary)]" />
                  <h3 className="text-sm font-semibold">법률 검토 결과</h3>
                  <Badge variant="warning" className="text-[10px]">일부 확인 필요</Badge>
                </div>
                <CardContent className="flex flex-col gap-3">
                  <div className="p-3 rounded-md bg-[var(--gray-3)] text-xs leading-relaxed">
                    <strong className="font-semibold">종합 결과</strong> — 채용공고는 전반적으로 법률 및 사규 요건을 충족하였으나, 개인정보 위·수탁 및 보유 기간 표기 관련 일부 보완이 필요합니다. 해당 항목 검토 후 게시를 권장드립니다.
                  </div>

                  <div className="flex gap-1">
                    {[
                      { k: 'law', l: `법률 ${LEGAL_ITEMS.law.length}` },
                      { k: 'internal', l: `내규 ${LEGAL_ITEMS.internal.length}` },
                      { k: 'guide', l: `딥라이즈 검사 ${LEGAL_ITEMS.guide.length}` },
                    ].map(t => (
                      <button
                        key={t.k}
                        onClick={() => setLegalTab(t.k as any)}
                        className={`text-[11px] px-2.5 py-1.5 rounded-md transition-colors ${
                          legalTab === t.k
                            ? 'bg-[var(--foreground)] text-[var(--background)]'
                            : 'text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                        }`}
                      >
                        {t.l}
                      </button>
                    ))}
                  </div>

                  <StaggerContainer className="flex flex-col gap-2">
                    {LEGAL_ITEMS[legalTab].map(item => (
                      <StaggerItem key={item.id}>
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="flex items-start gap-2 p-3 rounded-md border border-[var(--border)]"
                        >
                          {item.ok ? (
                            <CheckCircle2 size={14} className="text-[var(--success)] mt-0.5 shrink-0" />
                          ) : (
                            <AlertCircle size={14} className="text-[var(--warning)] mt-0.5 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium">{item.label}</div>
                            <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5">{item.detail}</div>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  <Button variant="outline" size="sm" className="w-full mt-1">
                    체크리스트 다운로드
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* PDF 미리보기 */}
            <div className="col-span-12 lg:col-span-7">
              <Card className="h-full py-0 overflow-hidden">
                <div className="px-4 py-2.5 flex items-center justify-between border-b border-[var(--border)] bg-[var(--gray-3)]">
                  <div className="flex items-center gap-2 text-xs">
                    <FileText size={12} />
                    <span className="font-medium">마이다스 2026년도 공채 채용 공고문.pdf</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[var(--foreground-muted)]">
                    <button className="w-6 h-6 rounded hover:bg-[var(--card)]">-</button>
                    <span>50%</span>
                    <button className="w-6 h-6 rounded hover:bg-[var(--card)]">+</button>
                  </div>
                </div>
                <div className="p-8 bg-[var(--gray-3)] flex items-center justify-center">
                  <div className="w-[80%] aspect-[4/5] bg-[var(--card)] rounded-sm shadow-sm border border-[var(--border)] p-6 text-[10px]">
                    <div className="font-semibold mb-2">7. 지원서 접수</div>
                    <div className="leading-relaxed text-[var(--foreground-muted)]">
                      <p>① 접수기간 : 4. 21(월) 14:00 ~ 4. 30(화) 14:00</p>
                      <p>② 접수방법 : 마이다스아이티 채용 홈페이지(https://...)를 통해 접수</p>
                      <p className="mt-2">※ 접수 마감일 이후에는 지원서 접수 및 수정이 불가능합니다.</p>
                    </div>
                    <div className="font-semibold mt-4 mb-2">8. 블라인드 채용 안내</div>
                    <div className="leading-relaxed text-[var(--foreground-muted)]">
                      <p>① 본 채용은 블라인드 채용 원칙에 따라 심사를 진행합니다.</p>
                      <p>② 지원서 항목에서 사진, 학력, 출신학교, 가족관계 등은 미기재 가능합니다.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* 플랫폼별 미리보기 탭 (규격 변환 상세) */}
        {tab === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <JobPostingSizeConverter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
