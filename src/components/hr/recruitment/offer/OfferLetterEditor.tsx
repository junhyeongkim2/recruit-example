import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Bold, Italic, Underline, List, Link as LinkIcon, Image as ImageIcon,
  Save, Send, Eye, Download, Sparkles, Tag, Plus, Trash2, GripVertical,
  ChevronDown,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { useEscapeKey } from '../shared/useEscapeKey';
import { useNav } from '../shared/navContext';

interface Block {
  id: string;
  type: 'heading' | 'paragraph' | 'terms' | 'variable' | 'signature';
  content: string;
  locked?: boolean;
}

const INIT_BLOCKS: Block[] = [
  { id: 'b1', type: 'heading', content: '오퍼 레터', locked: true },
  { id: 'b2', type: 'paragraph', content: '{이름}님께\n\n카카오의 {공고명} 채용 프로세스에 참여해주셔서 감사드립니다.\n아래와 같은 조건으로 정식 오퍼를 드립니다.' },
  { id: 'b3', type: 'terms', content: '• 직급 / 레벨: {레벨}\n• 부서: {부서}\n• 입사 예정일: {입사일}\n• 근무 형태: 정규직' },
  { id: 'b4', type: 'variable', content: '연봉 패키지' },
  { id: 'b5', type: 'paragraph', content: '본 오퍼는 {수락마감일}까지 유효하며, 수락 시 전자서명 절차가 진행됩니다.' },
  { id: 'b6', type: 'signature', content: '카카오 피플실\nHRBP {담당자}', locked: true },
];

const TEMPLATES = [
  { id: 'std', name: '표준 오퍼', desc: '일반 정규직 공채용' },
  { id: 'exec', name: '임원 오퍼', desc: '임원/시니어 리더' },
  { id: 'intern', name: '인턴 전환', desc: '인턴 → 정규직' },
  { id: 'return', name: '재입사 오퍼', desc: '알럼나이 재영입' },
];

const VARIABLES = [
  '이름', '공고명', '레벨', '부서', '입사일', '수락마감일', '담당자',
  '베이스 연봉', '성과 보너스', '사이닝 보너스', '스톡옵션',
];

const BLOCK_LABELS: Record<Block['type'], { label: string; tone: string }> = {
  heading: { label: '제목', tone: 'primary' },
  paragraph: { label: '본문', tone: 'secondary' },
  terms: { label: '조건 블록', tone: 'success' },
  variable: { label: '변수 블록', tone: 'warning' },
  signature: { label: '서명', tone: 'secondary' },
};

const COMPENSATION = [
  { label: '베이스', value: 11200, unit: '만원', sub: '월 분할 지급' },
  { label: '성과 보너스', value: 1500, unit: '만원', sub: '연 1회 평가 기준' },
  { label: '사이닝 보너스', value: 3000, unit: '만원', sub: '입사 후 3개월 분할' },
  { label: '스톡옵션', value: 500, unit: '주', sub: '4년 veting · 1년 cliff' },
];

export default function OfferLetterEditor() {
  const [blocks, setBlocks] = useState<Block[]>(INIT_BLOCKS);
  const [selectedTemplate, setSelectedTemplate] = useState('std');
  const [previewOpen, setPreviewOpen] = useState(false);
  const { showToast } = useNav();

  useEscapeKey(previewOpen, () => setPreviewOpen(false));

  const total = COMPENSATION.slice(0, 3).reduce((s, c) => s + c.value, 0);

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
              <FileText size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">오퍼 레터 에디터</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                블록 기반 WYSIWYG · 변수 치환 · 전자서명 연동
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}><Eye size={14} /> 미리보기</Button>
            <Button variant="outline" size="sm" onClick={() => showToast('오퍼 레터를 임시 저장했어요')}>
              <Save size={14} /> 임시 저장
            </Button>
            <Button size="sm" onClick={() => showToast('전자서명 요청을 발송했어요')}>
              <Send size={14} /> 서명 요청 발송
            </Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측: 템플릿 + 변수 */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3">
          <Card>
            <div className="px-6">
              <h4 className="text-xs font-semibold">템플릿</h4>
            </div>
            <CardContent className="flex flex-col gap-1.5">
              {TEMPLATES.map(t => (
                <motion.button
                  key={t.id}
                  whileHover={{ x: 2 }}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`text-left p-2.5 rounded-md border transition-colors ${
                    selectedTemplate === t.id
                      ? 'border-[var(--foreground)] bg-[var(--gray-3)]'
                      : 'border-[var(--border)] hover:bg-[var(--gray-3)]'
                  }`}
                >
                  <div className="text-xs font-medium">{t.name}</div>
                  <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{t.desc}</div>
                </motion.button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-xs font-semibold">변수</h4>
              <Badge variant="secondary" className="text-[10px]">{VARIABLES.length}</Badge>
            </div>
            <CardContent>
              <div className="flex items-center gap-1 flex-wrap">
                {VARIABLES.map(v => (
                  <motion.button
                    key={v}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md bg-[var(--primary)]/10 text-[10px] text-[var(--primary)] font-medium hover:bg-[var(--primary)]/20"
                  >
                    <Tag size={9} />
                    {v}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="px-6 flex items-center gap-2">
              <Sparkles size={12} className="text-[var(--primary)]" />
              <h4 className="text-xs font-semibold">AI 도우미</h4>
            </div>
            <CardContent className="flex flex-col gap-1.5">
              {[
                '문구를 더 전문적으로',
                '따뜻한 톤으로 재작성',
                '법무팀 권고 항목 삽입',
                '경쟁력 있는 표현으로',
              ].map(a => (
                <motion.button
                  key={a}
                  whileHover={{ x: 2 }}
                  className="text-left text-[11px] px-2.5 py-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--gray-3)]"
                >
                  {a}
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 중앙: 블록 에디터 */}
        <div className="col-span-12 lg:col-span-6">
          <Card className="py-0">
            {/* 툴바 */}
            <div className="px-4 py-2 border-b border-[var(--border)] flex items-center gap-1 bg-[var(--gray-3)]/40">
              {[Bold, Italic, Underline, List, LinkIcon, ImageIcon].map((Icon, i) => (
                <button
                  key={i}
                  className="w-7 h-7 rounded hover:bg-[var(--card)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                >
                  <Icon size={12} />
                </button>
              ))}
              <div className="h-4 w-px bg-[var(--border)] mx-1" />
              <Button variant="ghost" size="xs" onClick={() => showToast('AI가 본문을 다시 작성했어요')}>
                <Sparkles size={10} /> AI 다시쓰기
              </Button>
            </div>

            {/* 블록 리스트 */}
            <CardContent className="flex flex-col gap-2">
              <StaggerContainer className="flex flex-col gap-2">
                {blocks.map((b, i) => {
                  const meta = BLOCK_LABELS[b.type];
                  return (
                    <StaggerItem key={b.id}>
                      <motion.div
                        whileHover={{ x: 2 }}
                        className="relative group flex gap-2"
                      >
                        <div className="opacity-0 group-hover:opacity-100 flex flex-col items-center gap-0.5 pt-1 transition-opacity">
                          <GripVertical size={12} className="text-[var(--foreground-subtle)] cursor-grab" />
                          {!b.locked && (
                            <button className="w-4 h-4 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]">
                              <Trash2 size={9} className="inline" />
                            </button>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 mb-1">
                            <Badge variant={meta.tone as any} className="text-[9px]">{meta.label}</Badge>
                            {b.locked && <Badge variant="outline" className="text-[9px]">🔒 고정</Badge>}
                          </div>
                          {b.type === 'heading' && (
                            <input
                              value={b.content}
                              readOnly={b.locked}
                              className="w-full text-xl font-bold bg-transparent focus:outline-none focus:bg-[var(--gray-3)] rounded px-1 py-0.5"
                            />
                          )}
                          {b.type === 'paragraph' && (
                            <textarea
                              value={b.content}
                              rows={3}
                              className="w-full text-sm bg-transparent focus:outline-none focus:bg-[var(--gray-3)] rounded px-1 py-0.5 resize-none leading-relaxed"
                            />
                          )}
                          {b.type === 'terms' && (
                            <div className="p-3 rounded-md bg-[var(--success)]/5 border border-[var(--success)]/20">
                              <textarea
                                value={b.content}
                                rows={4}
                                className="w-full text-sm bg-transparent focus:outline-none resize-none leading-relaxed"
                              />
                            </div>
                          )}
                          {b.type === 'variable' && (
                            <div className="p-3 rounded-md bg-[var(--warning)]/5 border border-dashed border-[var(--warning)]/40">
                              <div className="text-xs font-semibold mb-2">{b.content}</div>
                              <div className="grid grid-cols-2 gap-2">
                                {COMPENSATION.map(c => (
                                  <div key={c.label} className="flex items-baseline gap-1">
                                    <span className="text-[10px] text-[var(--foreground-muted)]">{c.label}</span>
                                    <span className="text-xs font-semibold tabular-nums">{c.value.toLocaleString()}</span>
                                    <span className="text-[10px] text-[var(--foreground-muted)]">{c.unit}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 pt-2 border-t border-[var(--warning)]/20 flex items-baseline gap-1">
                                <span className="text-[10px] text-[var(--foreground-muted)]">총 패키지</span>
                                <span className="text-lg font-semibold tabular-nums">{total.toLocaleString()}</span>
                                <span className="text-xs text-[var(--foreground-muted)]">만원</span>
                              </div>
                            </div>
                          )}
                          {b.type === 'signature' && (
                            <div className="p-3 rounded-md bg-[var(--gray-3)] text-xs whitespace-pre-line leading-relaxed">
                              {b.content}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              <button
                onClick={() => setBlocks([...blocks, { id: `b${Date.now()}`, type: 'paragraph', content: '' }])}
                className="flex items-center justify-center gap-1.5 py-2 border border-dashed border-[var(--border)] rounded-md text-[11px] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--gray-3)] transition-colors"
              >
                <Plus size={11} /> 블록 추가
              </button>
            </CardContent>
          </Card>
        </div>

        {/* 우측: 수신자 & 체크리스트 */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3">
          <Card>
            <div className="px-6">
              <h4 className="text-xs font-semibold">수신자</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-center gap-2 p-2 rounded-md bg-[var(--gray-3)]">
                <div className="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center text-xs font-semibold">이</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium">이도윤</div>
                  <div className="text-[10px] text-[var(--foreground-muted)] truncate">doyoon@email.com</div>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-[var(--foreground-muted)]">수락 마감</label>
                <div className="h-8 px-2.5 mt-1 rounded-md border border-[var(--border)] flex items-center justify-between text-xs">
                  <span>2026-04-30 18:00</span>
                  <ChevronDown size={11} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="px-6">
              <h4 className="text-xs font-semibold">체크리스트</h4>
            </div>
            <CardContent className="flex flex-col gap-1.5">
              {[
                { label: '변수 모두 치환됨', ok: true },
                { label: '처우 승인 완료', ok: true },
                { label: '법무 검토 완료', ok: true },
                { label: '전자서명 연동', ok: false },
                { label: 'CFO 최종 승인', ok: false },
              ].map((c, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 p-2 rounded text-[11px] ${
                    c.ok ? 'bg-[var(--success)]/5' : 'bg-[var(--gray-3)]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    c.ok ? 'bg-[var(--success)] text-white' : 'bg-[var(--gray-4)] text-[var(--foreground-muted)]'
                  }`}>
                    {c.ok ? '✓' : ''}
                  </div>
                  <span className={c.ok ? '' : 'text-[var(--foreground-muted)]'}>{c.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 미리보기 모달 */}
      <AnimatePresence>
        {previewOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewOpen(false)}
              className="fixed inset-0 bg-black/40 z-[1040]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] max-w-[92vw] max-h-[85vh] overflow-auto bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-2xl z-[1050]"
            >
              <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={14} />
                  <span className="text-sm font-semibold">오퍼 레터 미리보기</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="xs" onClick={() => showToast('PDF로 다운로드를 시작했어요')}>
                    <Download size={11} /> PDF
                  </Button>
                  <button onClick={() => setPreviewOpen(false)} className="w-7 h-7 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]">✕</button>
                </div>
              </div>
              <div className="p-8 bg-white">
                <div className="max-w-[520px] mx-auto text-black">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-xl font-bold">카카오</div>
                    <div className="text-[10px] text-[var(--foreground-subtle)]">2026-04-22</div>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">오퍼 레터</h1>
                  <p className="text-sm leading-relaxed mb-4">
                    이도윤님께,<br /><br />
                    카카오의 시니어 백엔드 엔지니어 채용 프로세스에 참여해주셔서 감사드립니다.
                    아래와 같은 조건으로 정식 오퍼를 드립니다.
                  </p>
                  <div className="p-4 rounded bg-[var(--gray-2)] border border-[var(--border)] mb-4 text-sm leading-relaxed">
                    <div>• 직급 / 레벨: <strong>시니어 · L5</strong></div>
                    <div>• 부서: HRIS 개발팀</div>
                    <div>• 입사 예정일: 2026-06-01</div>
                    <div>• 근무 형태: 정규직</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm font-semibold mb-2">연봉 패키지</div>
                    <table className="w-full text-xs">
                      <tbody>
                        {COMPENSATION.map(c => (
                          <tr key={c.label} className="border-b border-[var(--border)]">
                            <td className="py-1.5 text-[var(--foreground-muted)]">{c.label}</td>
                            <td className="py-1.5 text-right font-semibold tabular-nums">{c.value.toLocaleString()} {c.unit}</td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-[var(--foreground)]">
                          <td className="py-2 font-bold">총 연간 패키지</td>
                          <td className="py-2 text-right font-bold tabular-nums">{total.toLocaleString()} 만원</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    본 오퍼는 2026-04-30 18:00까지 유효하며, 수락 시 전자서명 절차가 진행됩니다.
                  </p>
                  <div className="mt-8 pt-4 border-t border-[var(--border)] text-xs text-[var(--foreground-muted)]">
                    카카오 피플실<br />
                    HRBP may.kim
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
