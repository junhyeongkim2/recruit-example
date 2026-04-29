import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import {
  User, GraduationCap, Languages, FileText, Camera, Plus, X, GripVertical,
  ChevronDown, Save, Eye, Monitor, Smartphone, Download,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/page-transition';

const STEPS = [
  { key: 'basic', icon: User, label: '기본정보' },
  { key: 'edu', icon: GraduationCap, label: '학력 및 경력사항' },
  { key: 'lang', icon: Languages, label: '어학 및 자격정보' },
  { key: 'intro', icon: FileText, label: '자기소개서/이력서' },
];

const INITIAL_FIELDS = [
  { id: 'photo', label: '사진', required: true, enabled: true },
  { id: 'name', label: '이름(한글)', required: true, enabled: true },
  { id: 'englishName', label: '영문이름', required: true, enabled: true },
  { id: 'gender', label: '성별', required: true, enabled: true },
  { id: 'birth', label: '생년월일', required: true, enabled: true },
  { id: 'phone', label: '핸드폰 번호', required: true, enabled: true },
  { id: 'email', label: '이메일', required: true, enabled: true },
  { id: 'address', label: '일반전화번호', required: false, enabled: false },
];

const APPLICANT_FIELDS = [
  { id: 'location', label: '거주지역', required: true, enabled: true },
  { id: 'desired', label: '희망직무', required: false, enabled: true },
  { id: 'code', label: '가입코드', required: false, enabled: false },
];

const REFERRER_FIELDS = [
  { id: 'ref', label: '추천인', required: false, enabled: true },
];

const MILITARY_FIELDS = [
  { id: 'mil', label: '병역 대상', required: false, enabled: true },
  { id: 'rank', label: '군복무 상태', required: false, enabled: true },
];

export default function ApplicationBuilder() {
  const [activeStep, setActiveStep] = useState<string>('basic');
  const [basicFields, setBasicFields] = useState(INITIAL_FIELDS);
  const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>({
    basic: true, applicant: true, referrer: false, military: false,
  });
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [device, setDevice] = useState<'pc' | 'mobile'>('pc');

  const toggleField = (id: string) => {
    setBasicFields(basicFields.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 상단 바 */}
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMode('edit')}
              className={`text-sm px-3 py-1.5 transition-colors ${
                mode === 'edit' ? 'font-semibold border-b-2 border-[var(--foreground)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              }`}
            >
              지원서 설정
            </button>
            <button
              onClick={() => setMode('preview')}
              className={`text-sm px-3 py-1.5 transition-colors ${
                mode === 'preview' ? 'font-semibold border-b-2 border-[var(--foreground)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              }`}
            >
              미리보기
            </button>
          </div>
          <div className="flex items-center gap-2">
            {mode === 'preview' && (
              <div className="inline-flex items-center gap-0.5 p-0.5 rounded-md bg-[var(--gray-3)] mr-2">
                {[
                  { k: 'pc', l: 'PC', icon: Monitor },
                  { k: 'mobile', l: 'Mobile', icon: Smartphone },
                ].map(d => {
                  const Icon = d.icon;
                  return (
                    <button
                      key={d.k}
                      onClick={() => setDevice(d.k as any)}
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
            )}
            <Button variant="outline" size="sm"><Eye size={14} /> 새 지원서 양식</Button>
            <Button variant="outline" size="sm">불러오기</Button>
            <Button size="sm"><Save size={14} /> 저장</Button>
          </div>
        </div>
      </FadeIn>

      {/* 미리보기 모드 */}
      {mode === 'preview' && (
        <motion.div
          key={device}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="py-0 overflow-hidden">
            <div className="p-6 bg-[var(--gray-3)]/40 min-h-[600px] flex items-start justify-center">
              <motion.div
                key={device}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)] overflow-hidden ${
                  device === 'pc' ? 'max-w-[960px] w-full' : 'max-w-[360px] w-full'
                }`}
              >
                {/* 헤더 영역 */}
                <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold text-sm">H.</div>
                    <div>
                      <div className="text-sm font-semibold">[에이치닷] 2026 하반기 신입사원 모집</div>
                      <div className="text-[10px] text-[var(--foreground-muted)] flex items-center gap-2">
                        <Badge variant="success" className="text-[9px]">D-84</Badge>
                        <span>2026.03.06 (금) 12:00 - 2026.03.19 (목) 18:30</span>
                      </div>
                    </div>
                  </div>
                  <div className={device === 'pc' ? 'flex gap-1.5' : 'hidden'}>
                    <Button variant="outline" size="xs"><Download size={10} /> PDF 다운로드</Button>
                    <Button variant="outline" size="xs">저장 후 나가기</Button>
                  </div>
                </div>

                {/* 단계 표시 (desktop만) */}
                <div className={`px-6 py-4 border-b border-[var(--border)] ${device === 'pc' ? 'block' : 'hidden'}`}>
                  <div className="flex items-center gap-2">
                    {STEPS.map((s, i) => {
                      const Icon = s.icon;
                      const active = s.key === activeStep;
                      return (
                        <div key={s.key} className="flex items-center gap-2 flex-1">
                          <div className={`flex items-center gap-1.5 flex-1 ${active ? '' : 'opacity-50'}`}>
                            <div className={`w-7 h-7 rounded-full border flex items-center justify-center ${
                              active ? 'border-[var(--success)] bg-[var(--success)]/15 text-[var(--success)]' : 'border-[var(--border)] text-[var(--foreground-muted)]'
                            }`}>
                              <Icon size={12} strokeWidth={1.75} />
                            </div>
                            <span className="text-[11px] font-medium">{s.label}</span>
                          </div>
                          {i < STEPS.length - 1 && <div className="flex-1 h-px bg-[var(--border)]" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 모바일에서는 현재 단계만 */}
                <div className={`px-6 py-3 border-b border-[var(--border)] bg-[var(--gray-3)]/40 ${device === 'mobile' ? 'block' : 'hidden'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium">1. 기본정보</span>
                    <span className="text-[10px] text-[var(--foreground-muted)]">1 / 4</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">기본정보 <span className="text-[var(--error)]">*</span></h3>
                    <span className="text-[10px] text-[var(--foreground-muted)]">필수입력 *</span>
                  </div>

                  {/* 프로필 사진 */}
                  <div className={`grid gap-3 ${device === 'pc' ? 'grid-cols-[120px_1fr]' : 'grid-cols-1'}`}>
                    <div className="aspect-[3/4] rounded-md border border-dashed border-[var(--border)] bg-[var(--gray-3)] flex flex-col items-center justify-center gap-1">
                      <Camera size={16} className="text-[var(--foreground-muted)]" />
                      <span className="text-[9px] text-[var(--foreground-subtle)] text-center">
                        사진 등록 *<br />
                        <span className="text-[8px]">(3:4 권장)</span>
                      </span>
                    </div>
                    <div className={`grid gap-2 ${device === 'pc' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {[
                        { label: '이름 *', placeholder: '이름을 입력해주세요' },
                        { label: '영문이름 *', placeholder: 'English name' },
                        { label: '한문이름', placeholder: '한문이름을 입력해주세요' },
                        { label: '생년월일 *', placeholder: '생년월일' },
                        { label: '성별 *', placeholder: '남 / 여' },
                        { label: '이름 *', placeholder: '010-1234-1234' },
                        { label: '이메일 *', placeholder: 'abc@naver.com' },
                        { label: '일반전화번호', placeholder: '일반전화번호를 입력해주세요' },
                      ].map(f => (
                        <div key={f.label}>
                          <label className="text-[10px] text-[var(--foreground-muted)]">{f.label}</label>
                          <input
                            placeholder={f.placeholder}
                            className="w-full mt-0.5 h-8 px-2.5 text-[11px] rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] placeholder:text-[var(--foreground-subtle)]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 지원 정보 */}
                  <div className="pt-3 border-t border-dashed border-[var(--border)]">
                    <label className="text-[10px] text-[var(--foreground-muted)]">지망 *</label>
                    <div className={`grid gap-2 mt-1 ${device === 'pc' ? 'grid-cols-4' : 'grid-cols-2'}`}>
                      {['지망을 선택해주세요', '분야를 선택입력해주세요', '직무를 선택입력해주세요', '지역을 선택입력해주세요'].map(p => (
                        <div key={p} className="h-8 px-2.5 rounded-md border border-[var(--border)] flex items-center justify-between text-[10px] text-[var(--foreground-subtle)]">
                          <span className="truncate">{p}</span>
                          <ChevronDown size={10} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3 border-t border-[var(--border)] flex items-center justify-between">
                  <Button variant="outline" size="sm" disabled>‹ 이전</Button>
                  <Button size="sm">다음 ›</Button>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      )}

      {mode === 'edit' && (<>

      {/* 단계 표시 */}
      <FadeIn delay={0.05}>
        <Card className="h-full py-0">
          <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--border)]">
            <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
              <span>기업 공고 등록</span>
              <span>›</span>
              <span>로고 등록</span>
              <span>›</span>
              <span>섹션 페이지 설정</span>
              <span>›</span>
              <span>지원 폼</span>
              <span>›</span>
              <span>기본 이미지 선택</span>
              <span>›</span>
              <span>브랜드 컬러 설정</span>
              <span className="inline-block w-4 h-4 rounded bg-[var(--foreground)]" />
              <span>버튼 폰트 컬러 설정</span>
              <span className="inline-block w-4 h-4 rounded border border-[var(--border)]" />
            </div>
          </div>
          <div className="px-4 py-4 grid grid-cols-4 gap-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = s.key === activeStep;
              return (
                <motion.button
                  key={s.key}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveStep(s.key)}
                  className={`relative flex items-center gap-2 px-3 py-2.5 rounded-md border transition-all ${
                    active
                      ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]'
                      : 'border-[var(--border)] bg-[var(--card)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                    active ? 'bg-[var(--background)] text-[var(--foreground)]' : 'bg-[var(--gray-3)] text-[var(--foreground-muted)]'
                  }`}>
                    {i + 1}
                  </div>
                  <Icon size={14} />
                  <span className="text-xs font-medium">{s.label}</span>
                  {active && (
                    <motion.div
                      layoutId="app-step-indicator"
                      className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[var(--foreground)]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측 폼 미리보기 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full">
                <div className="px-6 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">기본 정보 <span className="text-[var(--error)]">*</span></h3>
                  <span className="text-[11px] text-[var(--foreground-muted)]">필수항목 *</span>
                </div>
                <CardContent className="grid grid-cols-12 gap-3">
                  {/* 사진 */}
                  <div className="col-span-12 md:col-span-3">
                    <label className="text-xs text-[var(--foreground-muted)]">사진 *</label>
                    <div className="mt-1.5 aspect-[3/4] rounded-md border border-dashed border-[var(--border)] bg-[var(--gray-3)] flex flex-col items-center justify-center gap-1.5 hover:border-[var(--border-strong)] cursor-pointer transition-colors">
                      <Camera size={20} className="text-[var(--foreground-muted)]" />
                      <span className="text-[10px] text-[var(--foreground-subtle)] text-center px-2">
                        사진 업로드<br />3:4 권장<br />300×400 이상 / 5MB 이하
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2"><Camera size={12} /> 사진 등록</Button>
                  </div>
                  {/* 기본 정보 필드 */}
                  <div className="col-span-12 md:col-span-9 grid grid-cols-2 gap-3">
                    {[
                      { label: '이름 *', placeholder: '이름을 입력해주세요.' },
                      { label: '영문이름 *', placeholder: '영문이름을 입력해주세요.' },
                      { label: '한글이름 *', placeholder: '한글이름을 입력해주세요.' },
                      { label: '생년월일 *', placeholder: '생년월일 선택' },
                      { label: '성별 *', placeholder: '남 / 여' },
                      { label: '핸드폰 번호 *', placeholder: '010-1234-1234' },
                      { label: '이메일 *', placeholder: 'abc@naver.com' },
                      { label: '일반전화번호', placeholder: '일반전화번호를 입력해주세요.' },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="text-[11px] text-[var(--foreground-muted)]">{f.label}</label>
                        <input
                          type="text"
                          placeholder={f.placeholder}
                          className="w-full mt-1 h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] placeholder:text-[var(--foreground-subtle)]"
                        />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="text-[11px] text-[var(--foreground-muted)]">긴급연락처</label>
                      <input type="text" placeholder="긴급연락처" className="w-full mt-1 h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] placeholder:text-[var(--foreground-subtle)]" />
                    </div>
                  </div>

                  {/* 지망 정보 */}
                  <div className="col-span-12 grid grid-cols-3 gap-3 pt-4 border-t border-[var(--border)]">
                    {['1지망', '2지망', '3지망'].map((label) => (
                      <div key={label}>
                        <label className="text-[11px] text-[var(--foreground-muted)]">{label} *</label>
                        <div className="mt-1 h-9 px-3 rounded-md border border-[var(--border)] bg-[var(--card)] flex items-center justify-between text-xs text-[var(--foreground-subtle)]">
                          <span>지망을 선택해주세요.</span>
                          <ChevronDown size={12} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </FadeIn>

        {/* 우측 항목 설정 사이드바 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-4">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">지원서 항목 설정</h3>
                <Badge variant="secondary" className="text-[10px]">STEP 1</Badge>
              </div>
              <span className="text-[10px] text-[var(--foreground-muted)]">선택 항목 보기</span>
            </div>
            <CardContent className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                className="w-full h-9 px-3 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)]"
              />

              {/* 기본 정보 섹션 */}
              <div>
                <button
                  onClick={() => setSectionOpen({ ...sectionOpen, basic: !sectionOpen.basic })}
                  className="w-full flex items-center justify-between text-xs font-semibold py-2"
                >
                  <span>기본 정보</span>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--success)]/10 text-[10px] text-[var(--success)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                    </span>
                    <Plus size={12} className="text-[var(--foreground-muted)]" />
                  </div>
                </button>
                <AnimatePresence>
                  {sectionOpen.basic && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-1.5 py-1">
                        {basicFields.map((f) => (
                          <motion.div
                            key={f.id}
                            whileHover={{ x: 2 }}
                            className={`flex items-center justify-between px-2 py-1.5 rounded border text-[11px] ${
                              f.enabled ? 'border-[var(--border)] bg-[var(--card)]' : 'border-dashed border-[var(--border)] bg-[var(--gray-3)]/50 text-[var(--foreground-subtle)]'
                            }`}
                          >
                            <div className="flex items-center gap-1 truncate">
                              <GripVertical size={10} className="text-[var(--foreground-subtle)]" />
                              <span className="truncate">{f.label}</span>
                              {f.required && <span className="text-[var(--error)]">*</span>}
                            </div>
                            <button onClick={() => toggleField(f.id)} className="ml-1">
                              <X size={10} className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                      <button className="w-full mt-1.5 text-[11px] text-[var(--foreground-muted)] hover:text-[var(--foreground)] py-1.5 rounded-md border border-dashed border-[var(--border)] hover:border-[var(--border-strong)]">
                        <Plus size={10} className="inline mr-1" /> 항목추가
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 지원자 정보 섹션 */}
              <div>
                <button
                  onClick={() => setSectionOpen({ ...sectionOpen, applicant: !sectionOpen.applicant })}
                  className="w-full flex items-center justify-between text-xs font-semibold py-2"
                >
                  <span>지원자 정보</span>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--success)]/10 text-[10px] text-[var(--success)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                    </span>
                    <Plus size={12} className="text-[var(--foreground-muted)]" />
                  </div>
                </button>
                {sectionOpen.applicant && (
                  <div className="grid grid-cols-2 gap-1.5 py-1">
                    {APPLICANT_FIELDS.map(f => (
                      <div key={f.id} className={`flex items-center justify-between px-2 py-1.5 rounded border text-[11px] ${
                        f.enabled ? 'border-[var(--border)] bg-[var(--card)]' : 'border-dashed border-[var(--border)] bg-[var(--gray-3)]/50 text-[var(--foreground-subtle)]'
                      }`}>
                        <div className="flex items-center gap-1">
                          <GripVertical size={10} className="text-[var(--foreground-subtle)]" />
                          <span>{f.label}</span>
                          {f.required && <span className="text-[var(--error)]">*</span>}
                        </div>
                        <X size={10} className="text-[var(--foreground-muted)]" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 추천인 */}
              <div className="flex items-center justify-between py-1.5 border-t border-[var(--border)]">
                <span className="text-xs font-semibold">추천인</span>
                <button className="w-9 h-5 rounded-full bg-[var(--success)] flex items-center justify-start px-0.5">
                  <span className="w-4 h-4 rounded-full bg-white ml-auto" />
                </button>
              </div>

              {/* 병역정보 */}
              <div className="flex items-center justify-between py-1.5 border-t border-[var(--border)]">
                <span className="text-xs font-semibold">병역정보</span>
                <button className="w-9 h-5 rounded-full bg-[var(--success)] flex items-center justify-start px-0.5">
                  <span className="w-4 h-4 rounded-full bg-white ml-auto" />
                </button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
      </>)}
    </div>
  );
}
