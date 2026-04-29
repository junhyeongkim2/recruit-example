import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, MessageSquare, Bell, Edit3, Copy, Plus, Sparkles, Send, Eye,
  CheckCircle2, Clock3, Tag,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

type Channel = 'email' | 'sms' | 'push';

interface Template {
  id: string;
  channel: Channel;
  stage: string;
  title: string;
  subject?: string;
  body: string;
  variables: string[];
  lastUsed: string;
  usageCount: number;
}

const TEMPLATES: Template[] = [
  {
    id: 'T-1',
    channel: 'email',
    stage: '지원 접수',
    title: '[접수 완료 안내]',
    subject: '[카카오 채용] {공고명} 지원서 접수가 완료되었습니다',
    body: '{이름}님 안녕하세요.\n\n지원해주신 {공고명}의 지원서가 정상 접수되었습니다.\n전형 일정은 이메일과 SMS로 안내드릴 예정입니다.\n\n감사합니다.',
    variables: ['이름', '공고명', '접수일자'],
    lastUsed: '2026-04-20',
    usageCount: 1247,
  },
  {
    id: 'T-2',
    channel: 'sms',
    stage: '서류 통과',
    title: '[서류 합격 안내]',
    body: '[카카오] {이름}님, {공고명} 서류 전형에 합격하셨습니다. 1차 면접 일정은 곧 안내드리겠습니다.',
    variables: ['이름', '공고명'],
    lastUsed: '2026-04-18',
    usageCount: 423,
  },
  {
    id: 'T-3',
    channel: 'email',
    stage: '면접 초대',
    title: '[1차 면접 안내]',
    subject: '[카카오 채용] {공고명} 1차 면접 일정 안내',
    body: '{이름}님 안녕하세요.\n\n1차 면접 일정을 안내드립니다.\n\n일시: {면접일시}\n장소: {면접장소}\n면접관: {면접관}\n\n준비 사항은 첨부 안내문을 확인해주세요.',
    variables: ['이름', '공고명', '면접일시', '면접장소', '면접관'],
    lastUsed: '2026-04-16',
    usageCount: 198,
  },
  {
    id: 'T-4',
    channel: 'push',
    stage: '역량검사 독려',
    title: '[역검 마감 D-1]',
    body: '역량검사 마감이 1일 남았습니다. 지금 바로 응시해 주세요.',
    variables: ['이름', '마감일시'],
    lastUsed: '2026-04-19',
    usageCount: 87,
  },
  {
    id: 'T-5',
    channel: 'email',
    stage: '최종 합격',
    title: '[최종 합격 & 오퍼]',
    subject: '[카카오] {이름}님, {공고명} 최종 합격을 축하드립니다',
    body: '{이름}님 안녕하세요.\n\n{공고명}의 최종 합격을 축하드립니다.\n오퍼 레터와 처우 안내문을 첨부드립니다.\n\n입사 전 안내 사항은 온보딩 포털에서 확인 가능합니다.',
    variables: ['이름', '공고명', '입사일', '팀'],
    lastUsed: '2026-04-15',
    usageCount: 36,
  },
  {
    id: 'T-6',
    channel: 'sms',
    stage: '불합격 안내',
    title: '[전형 결과]',
    body: '[카카오] {이름}님, 아쉽게도 {공고명}의 {전형명} 전형에서 합격하지 못하셨음을 안내드립니다. 감사합니다.',
    variables: ['이름', '공고명', '전형명'],
    lastUsed: '2026-04-17',
    usageCount: 342,
  },
];

const CHANNEL_CONFIG = {
  email: { icon: Mail, label: '이메일', tone: 'primary' },
  sms: { icon: MessageSquare, label: 'SMS', tone: 'success' },
  push: { icon: Bell, label: '푸시', tone: 'warning' },
};

export default function MessageTemplates() {
  const [selected, setSelected] = useState<Template>(TEMPLATES[0]);
  const [channelFilter, setChannelFilter] = useState<'all' | Channel>('all');
  const [editBody, setEditBody] = useState(selected.body);

  const filtered = channelFilter === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.channel === channelFilter);

  const selectTemplate = (t: Template) => {
    setSelected(t);
    setEditBody(t.body);
  };

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card className="h-full">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[var(--gray-3)] flex items-center justify-center">
                <Mail size={16} className="text-[var(--primary)]" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-sm font-semibold">이메일 · SMS · 푸시 템플릿</h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  전형 단계별 자동 발송 메시지 · 변수 치환 · AI 초안
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><Sparkles size={14} /> AI 초안</Button>
              <Button size="sm"><Plus size={14} /> 새 템플릿</Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4">
        {/* 좌측: 템플릿 리스트 */}
        <FadeIn delay={0.05} className="col-span-12 lg:col-span-4">
          <Card className="h-full">
            <div className="px-6 flex items-center justify-between">
              <h4 className="text-xs font-semibold">템플릿 ({filtered.length})</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {/* 채널 필터 */}
              <div className="flex items-center gap-1 pb-2 border-b border-[var(--border)]">
                <button
                  onClick={() => setChannelFilter('all')}
                  className={`text-[10px] px-2 py-1 rounded transition-colors ${
                    channelFilter === 'all' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                  }`}
                >
                  전체
                </button>
                {(['email', 'sms', 'push'] as Channel[]).map(c => {
                  const cfg = CHANNEL_CONFIG[c];
                  const Icon = cfg.icon;
                  return (
                    <button
                      key={c}
                      onClick={() => setChannelFilter(c)}
                      className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded transition-colors ${
                        channelFilter === c ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--foreground-muted)] hover:bg-[var(--gray-3)]'
                      }`}
                    >
                      <Icon size={10} />
                      {cfg.label}
                    </button>
                  );
                })}
              </div>

              <StaggerContainer className="flex flex-col gap-1.5">
                {filtered.map(t => {
                  const cfg = CHANNEL_CONFIG[t.channel];
                  const Icon = cfg.icon;
                  return (
                    <StaggerItem key={t.id}>
                      <motion.button
                        whileHover={{ x: 2 }}
                        onClick={() => selectTemplate(t)}
                        className={`w-full text-left p-2.5 rounded-md border transition-colors ${
                          selected.id === t.id
                            ? 'border-[var(--foreground)] bg-[var(--gray-3)]'
                            : 'border-[var(--border)] hover:bg-[var(--gray-3)]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <Icon size={11} className={`text-[var(--${cfg.tone})]`} />
                            <Badge variant="outline" className="text-[9px] py-0">{t.stage}</Badge>
                          </div>
                        </div>
                        <div className="text-xs font-medium truncate">{t.title}</div>
                        {t.subject && (
                          <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5 truncate">{t.subject}</div>
                        )}
                        <div className="flex items-center justify-between mt-1.5 text-[10px] text-[var(--foreground-subtle)]">
                          <span className="flex items-center gap-1">
                            <Clock3 size={9} /> {t.lastUsed}
                          </span>
                          <span>{t.usageCount.toLocaleString()}회 사용</span>
                        </div>
                      </motion.button>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </CardContent>
          </Card>
        </FadeIn>

        {/* 중앙: 에디터 */}
        <FadeIn delay={0.1} className="col-span-12 lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="h-full">
                <div className="px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit3 size={13} className="text-[var(--primary)]" />
                    <h4 className="text-sm font-semibold">{selected.title}</h4>
                    <Badge variant={CHANNEL_CONFIG[selected.channel].tone as any} className="text-[10px]">
                      {CHANNEL_CONFIG[selected.channel].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 rounded hover:bg-[var(--gray-3)] text-[var(--foreground-muted)]">
                      <Copy size={11} className="inline" />
                    </button>
                  </div>
                </div>
                <CardContent className="flex flex-col gap-3">
                  {selected.channel === 'email' && (
                    <div>
                      <label className="text-[10px] text-[var(--foreground-muted)]">제목</label>
                      <input
                        defaultValue={selected.subject}
                        className="w-full mt-1 h-8 px-2.5 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] font-mono"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] text-[var(--foreground-muted)]">본문</label>
                      <span className="text-[10px] text-[var(--foreground-subtle)]">
                        {editBody.length}
                        {selected.channel === 'sms' && ' / 90 (LMS 자동 전환)'}
                      </span>
                    </div>
                    <textarea
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      rows={selected.channel === 'sms' ? 4 : 10}
                      className="w-full px-3 py-2 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--primary)] resize-none leading-relaxed font-mono"
                    />
                  </div>

                  {/* 변수 칩 */}
                  <div>
                    <label className="text-[10px] text-[var(--foreground-muted)] mb-1 block">사용 가능한 변수</label>
                    <div className="flex items-center gap-1 flex-wrap">
                      {selected.variables.map(v => (
                        <motion.button
                          key={v}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditBody(editBody + `{${v}}`)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--primary)]/10 text-[10px] text-[var(--primary)] font-medium hover:bg-[var(--primary)]/20"
                        >
                          <Tag size={9} />
                          {`{${v}}`}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <Sparkles size={12} /> AI 문구 개선
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">임시 저장</Button>
                      <Button size="sm">저장 적용</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </FadeIn>

        {/* 우측: 미리보기 */}
        <FadeIn delay={0.15} className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <Eye size={13} className="text-[var(--primary)]" />
              <h4 className="text-xs font-semibold">실시간 미리보기</h4>
            </div>
            <CardContent>
              {selected.channel === 'email' && (
                <div className="rounded-md border border-[var(--border)] overflow-hidden">
                  <div className="px-3 py-2 bg-[var(--gray-3)] border-b border-[var(--border)]">
                    <div className="text-[10px] text-[var(--foreground-muted)]">From: noreply@kakaocorp.com</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">To: 이도윤 &lt;doyoon@email.com&gt;</div>
                    <div className="text-[11px] font-semibold mt-1 line-clamp-1">
                      {selected.subject?.replace('{공고명}', '시니어 백엔드 엔지니어').replace('{이름}', '이도윤')}
                    </div>
                  </div>
                  <div className="p-3 text-[11px] leading-relaxed whitespace-pre-line">
                    {editBody
                      .replace(/{이름}/g, '이도윤')
                      .replace(/{공고명}/g, '시니어 백엔드 엔지니어')
                      .replace(/{면접일시}/g, '2026-05-10 14:00')
                      .replace(/{면접장소}/g, '판교 오피스 3F 미팅룸')
                      .replace(/{면접관}/g, 'bentley.jun, may.kim, j.park')
                      .replace(/{입사일}/g, '2026-06-01')
                      .replace(/{팀}/g, 'HRIS 개발팀')}
                  </div>
                </div>
              )}
              {selected.channel === 'sms' && (
                <div className="relative max-w-[220px] mx-auto">
                  <div className="rounded-[20px] bg-[var(--gray-4)] p-3">
                    <div className="rounded-[14px] bg-[var(--card)] p-3 text-[11px] leading-relaxed whitespace-pre-line shadow-sm">
                      {editBody
                        .replace(/{이름}/g, '이도윤')
                        .replace(/{공고명}/g, '시니어 백엔드 엔지니어')
                        .replace(/{전형명}/g, '1차 면접')}
                    </div>
                    <div className="text-[9px] text-[var(--foreground-muted)] text-center mt-1">
                      오후 2:14 · 카카오
                    </div>
                  </div>
                </div>
              )}
              {selected.channel === 'push' && (
                <div className="rounded-md bg-[var(--gray-3)] p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-[10px] font-bold shrink-0">
                      H
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold">카카오 채용</div>
                      <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5 leading-relaxed">
                        {editBody
                          .replace(/{이름}/g, '이도윤')
                          .replace(/{마감일시}/g, '내일 23:59')}
                      </div>
                      <div className="text-[9px] text-[var(--foreground-subtle)] mt-1">지금</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--foreground-muted)]">이번 달 발송</span>
                  <span className="font-semibold tabular-nums">{selected.usageCount.toLocaleString()}건</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--foreground-muted)]">전달률</span>
                  <span className="font-semibold text-[var(--success)]">98.4%</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--foreground-muted)]">열람률</span>
                  <span className="font-semibold">
                    {selected.channel === 'email' ? '72%' : selected.channel === 'sms' ? '95%' : '48%'}
                  </span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full mt-3">
                <Send size={12} /> 테스트 발송
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
