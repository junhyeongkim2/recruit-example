import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Upload, Sparkles, CheckCircle2, GraduationCap, Briefcase,
  Languages, Award, User, Mail, Phone, MapPin, Eye, Download, ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { Icon3D } from '../shared/Icon3D';

// AI 이력서 파서 — PDF/DOCX → 구조화 데이터 추출
const SAMPLE_FIELDS = [
  { icon: User, label: '이름', value: '이도윤', confidence: 100 },
  { icon: Mail, label: '이메일', value: 'doyoon@email.com', confidence: 100 },
  { icon: Phone, label: '연락처', value: '010-1234-5678', confidence: 98 },
  { icon: MapPin, label: '거주지', value: '서울 강남구', confidence: 95 },
];

const EXTRACTED_SECTIONS = [
  {
    icon: GraduationCap, title: '학력',
    items: [
      { main: '서울대학교', sub: '컴퓨터공학과 학사', meta: '2013 - 2017', confidence: 99 },
      { main: 'KAIST', sub: '컴퓨터과학 석사', meta: '2017 - 2019', confidence: 99 },
    ],
  },
  {
    icon: Briefcase, title: '경력',
    items: [
      { main: '쿠팡', sub: '시니어 백엔드 엔지니어', meta: '2022 - 현재 (2.5년)', confidence: 100 },
      { main: '카카오페이', sub: '백엔드 엔지니어', meta: '2019 - 2022 (3년)', confidence: 100 },
    ],
  },
  {
    icon: Languages, title: '어학',
    items: [
      { main: 'TOEIC', sub: '920점', meta: '2023', confidence: 95 },
      { main: 'OPIc', sub: 'AL (Advanced Low)', meta: '2023', confidence: 92 },
    ],
  },
  {
    icon: Award, title: '자격 · 수상',
    items: [
      { main: '정보처리기사', sub: '', meta: '2015', confidence: 98 },
      { main: '전국 대학생 프로그래밍 경진대회', sub: '대상', meta: '2016', confidence: 88 },
    ],
  },
];

const SKILLS_EXTRACTED = [
  { name: 'Kotlin', level: 'Expert', years: 5, source: '경력 섹션 + 프로젝트', confidence: 98 },
  { name: 'Spring Boot', level: 'Expert', years: 5, source: '경력 섹션', confidence: 99 },
  { name: 'Kafka', level: 'Advanced', years: 4, source: '프로젝트', confidence: 94 },
  { name: 'K8s', level: 'Advanced', years: 3, source: '자기소개', confidence: 91 },
  { name: 'Redis', level: 'Intermediate', years: 4, source: '경력 섹션', confidence: 88 },
  { name: 'Python', level: 'Intermediate', years: 2, source: '자기소개', confidence: 78 },
];

const AI_SUMMARY = [
  '시니어 백엔드 엔지니어 · 경력 7년차',
  'Kotlin / Spring Boot 기반 대규모 서비스 경험 풍부',
  'Kafka·K8s 프로덕션 운영 경험 (쿠팡 4년+)',
  '영어 비즈니스 커뮤니케이션 가능',
];

export default function ResumeParser() {
  const [stage, setStage] = useState<'upload' | 'parsing' | 'result'>('result');

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Icon3D name="brain" size={40} />
            <div>
              <h3 className="text-sm font-semibold">AI 이력서 파서</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                PDF · DOCX · 이미지 → 구조화 데이터 자동 추출
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setStage('upload')}><Upload size={14} /> 새 파일</Button>
            <Button size="sm"><Sparkles size={14} /> 지원서 자동 채우기</Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측: 원본 미리보기 */}
        <FadeIn delay={0.05} className="col-span-12 lg:col-span-5">
          <Card className="h-full py-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--gray-3)]">
              <div className="flex items-center gap-2 text-xs">
                <FileText size={12} />
                <span className="font-medium">이도윤_이력서_2026.pdf</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-xs"><Download size={10} /></Button>
                <Button variant="ghost" size="icon-xs"><Eye size={10} /></Button>
              </div>
            </div>
            <div className="p-6 bg-[var(--gray-3)]/40 min-h-[500px]">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded shadow-sm p-6 text-black text-[10px] leading-relaxed"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[var(--foreground)]">
                  <div>
                    <div className="text-2xl font-bold">이도윤</div>
                    <div className="text-[10px] text-[var(--foreground-muted)] mt-1">Senior Backend Engineer</div>
                  </div>
                  <div className="text-[9px] text-right text-[var(--foreground-muted)]">
                    <div>📧 doyoon@email.com</div>
                    <div>📱 010-1234-5678</div>
                    <div>📍 서울 강남구</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="font-bold text-xs mb-1.5 text-[var(--foreground)]">● 학력</div>
                  <div className="pl-3 space-y-1">
                    <div className="flex justify-between">
                      <div><strong>KAIST</strong> · 컴퓨터과학 석사</div>
                      <div className="text-[var(--foreground-muted)]">2017.03 - 2019.02</div>
                    </div>
                    <div className="flex justify-between">
                      <div><strong>서울대학교</strong> · 컴퓨터공학과 학사</div>
                      <div className="text-[var(--foreground-muted)]">2013.03 - 2017.02</div>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="font-bold text-xs mb-1.5 text-[var(--foreground)]">● 경력</div>
                  <div className="pl-3 space-y-2">
                    <div>
                      <div className="flex justify-between">
                        <div><strong>쿠팡</strong> · 시니어 백엔드 엔지니어</div>
                        <div className="text-[var(--foreground-muted)]">2022.03 - 현재</div>
                      </div>
                      <div className="pl-3 text-[9px] text-[var(--foreground)] mt-0.5 space-y-0.5">
                        <div>- 주문 처리 플랫폼 설계 · Kotlin/Spring 기반 MSA</div>
                        <div>- Kafka 기반 이벤트 소싱 · 초당 50k 메시지 처리</div>
                        <div>- K8s 멀티클러스터 운영 · 장애율 99.99% 유지</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <div><strong>카카오페이</strong> · 백엔드 엔지니어</div>
                        <div className="text-[var(--foreground-muted)]">2019.02 - 2022.02</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="font-bold text-xs mb-1.5 text-[var(--foreground)]">● 기술 스택</div>
                  <div className="pl-3 text-[9px] text-[var(--foreground)]">
                    Kotlin, Spring Boot, Kafka, K8s, Redis, PostgreSQL, Python
                  </div>
                </div>

                <div>
                  <div className="font-bold text-xs mb-1.5 text-[var(--foreground)]">● 어학 · 자격</div>
                  <div className="pl-3 text-[9px] text-[var(--foreground)] space-y-0.5">
                    <div>TOEIC 920점 · OPIc AL</div>
                    <div>정보처리기사 (2015)</div>
                    <div>전국 대학생 프로그래밍 대회 대상 (2016)</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </FadeIn>

        {/* 우측: 추출 결과 */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-3">
          {/* AI 요약 */}
          <FadeIn delay={0.1}>
            <Card className="border-[var(--primary)]/20 bg-[var(--primary)]/5">
              <div className="px-6 flex items-center gap-2">
                <Sparkles size={13} className="text-[var(--primary)]" />
                <h4 className="text-sm font-semibold">AI 요약</h4>
                <Badge variant="success" className="text-[10px]">신뢰도 96%</Badge>
              </div>
              <CardContent className="flex flex-col gap-1.5">
                {AI_SUMMARY.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 size={11} className="text-[var(--success)] mt-0.5 shrink-0" />
                    <span className="text-xs leading-relaxed">{s}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>

          {/* 기본 정보 */}
          <FadeIn delay={0.12}>
            <Card className="h-full">
              <div className="px-6">
                <h4 className="text-sm font-semibold">기본 정보</h4>
              </div>
              <CardContent className="grid grid-cols-2 gap-2">
                {SAMPLE_FIELDS.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 + 0.1 }}
                      className="flex items-center gap-2 p-2 rounded-md border border-[var(--border)]"
                    >
                      <div className="w-7 h-7 rounded bg-[var(--gray-3)] flex items-center justify-center shrink-0">
                        <Icon size={12} className="text-[var(--foreground-muted)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-[var(--foreground-muted)]">{f.label}</div>
                        <div className="text-xs font-medium truncate">{f.value}</div>
                      </div>
                      <Badge variant={f.confidence >= 95 ? 'success' : 'warning'} className="text-[9px]">
                        {f.confidence}%
                      </Badge>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </FadeIn>

          {/* 구조화 섹션 */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {EXTRACTED_SECTIONS.map((sec, si) => {
                const Icon = sec.icon;
                return (
                  <Card key={si} className="h-full">
                    <div className="px-6 flex items-center gap-2">
                      <Icon size={13} className="text-[var(--foreground)]" />
                      <h4 className="text-xs font-semibold">{sec.title}</h4>
                      <Badge variant="secondary" className="text-[10px]">{sec.items.length}</Badge>
                    </div>
                    <CardContent className="flex flex-col gap-1.5">
                      {sec.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: si * 0.06 + i * 0.04 + 0.2 }}
                          className="p-2 rounded-md border border-[var(--border)]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">{item.main}</span>
                            <Badge variant="outline" className="text-[9px]">{item.confidence}%</Badge>
                          </div>
                          {item.sub && <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{item.sub}</div>}
                          <div className="text-[10px] text-[var(--foreground-subtle)] mt-0.5">{item.meta}</div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </FadeIn>

          {/* 기술 스택 */}
          <FadeIn delay={0.2}>
            <Card className="h-full">
              <div className="px-6 flex items-center justify-between">
                <h4 className="text-sm font-semibold">추출된 기술 스택</h4>
                <Badge variant="secondary" className="text-[10px]">{SKILLS_EXTRACTED.length}개</Badge>
              </div>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {SKILLS_EXTRACTED.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.3 }}
                    className="flex items-center gap-2 p-2 rounded-md border border-[var(--border)]"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold">{s.name}</span>
                        <Badge
                          variant={s.level === 'Expert' ? 'success' : s.level === 'Advanced' ? 'warning' : 'secondary'}
                          className="text-[9px]"
                        >
                          {s.level}
                        </Badge>
                      </div>
                      <div className="text-[9px] text-[var(--foreground-muted)] mt-0.5">
                        {s.years}년 · {s.source}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[9px] text-[var(--foreground-muted)]">신뢰도</div>
                      <div className="text-[11px] font-semibold tabular-nums">{s.confidence}</div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
              <div className="px-6 py-3 border-t border-[var(--border)] flex justify-end">
                <Button size="sm">
                  지원서 자동 채우기 <ArrowRight size={12} />
                </Button>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
