import { motion } from 'motion/react';
import {
  Sparkles, Download, Share2, FileText, Video, MessageSquare, Star,
  CheckCircle2, Flag, TrendingUp, Award, Target,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';

// 지원자 종합 리포트 — 서류 + 영상 + 대면 + AI 종합 분석
const CANDIDATE = {
  name: '이도윤',
  position: '시니어 백엔드 엔지니어',
  company: '쿠팡',
  years: 7,
  email: 'doyoon@email.com',
  overall: 92,
  verdict: '매우 적합',
};

const COMPETENCY_RADAR = [
  { label: '기술 이해도', self: 85, interviewer: 92, ai: 94 },
  { label: '경험 적합성', self: 80, interviewer: 88, ai: 91 },
  { label: '커뮤니케이션', self: 75, interviewer: 87, ai: 85 },
  { label: '문화 적합도', self: 70, interviewer: 78, ai: 82 },
  { label: '성장 가능성', self: 85, interviewer: 90, ai: 88 },
];

const DOCUMENT_HIGHLIGHTS = [
  { tone: 'success', text: 'Kafka 기반 대규모 메시징 운영 5년 경험' },
  { tone: 'success', text: 'K8s 멀티클러스터 설계 및 운영' },
  { tone: 'warning', text: '리더 경험 2회 미만 — 시니어 요건 재검토 필요' },
];

const VIDEO_HIGHLIGHTS = [
  { time: '00:42', text: '분산 트랜잭션 처리 경험 설명 (Saga 패턴)' },
  { time: '01:58', text: '팀 갈등 해결 사례 — 구체적이고 성숙한 답변' },
  { time: '02:34', text: '학습 민첩성 관련 구체 프로젝트 언급' },
];

const INTERVIEW_SCORES = [
  { interviewer: 'bentley.jun', role: '팀 리드', score: 4.6, verdict: '강력 추천' },
  { interviewer: 'may.kim', role: 'HR BP', score: 4.2, verdict: '추천' },
  { interviewer: 'j.park', role: '본부장', score: 4.8, verdict: '강력 추천' },
];

const AI_ANALYSIS = [
  { title: '전반적 평가', body: '해당 지원자는 기술 이해도와 경험 적합성 측면에서 매우 높은 점수를 기록했으며, 팀 리드 역할 수행 경험이 있습니다. 조직 적합도에서도 양호한 평가를 받았습니다.' },
  { title: '핵심 강점', body: '• 분산 시스템 프로덕션 운영 경험\n• 기술 커뮤니케이션 명확성\n• 시니어로서의 멘토링 자세' },
  { title: '주의 사항', body: '• 이전 이직 주기가 1.8년으로 다소 짧음\n• 대규모 조직(500명+) 경험 부재\n• 오퍼 협상에서 base 5% 상향 제시 가능성' },
  { title: '추천 결정', body: '강력 추천 — 오퍼 발송 진행 권장. 레벨 L5, 연봉 밴드 상단(11,500만) 권장.' },
];

function RadarChart({ data }: { data: typeof COMPETENCY_RADAR }) {
  const size = 200;
  const center = size / 2;
  const radius = 70;
  const angleStep = (Math.PI * 2) / data.length;

  const getPoint = (value: number, idx: number) => {
    const angle = angleStep * idx - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: center + Math.cos(angle) * r, y: center + Math.sin(angle) * r };
  };

  const selfPoints = data.map((d, i) => getPoint(d.self, i));
  const intPoints = data.map((d, i) => getPoint(d.interviewer, i));
  const aiPoints = data.map((d, i) => getPoint(d.ai, i));

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[240px]">
      {/* Grid */}
      {[20, 40, 60, 80, 100].map(pct => {
        const pts = data.map((_, i) => getPoint(pct, i));
        return (
          <polygon
            key={pct}
            points={pts.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.5"
          />
        );
      })}
      {/* Axis */}
      {data.map((_, i) => {
        const p = getPoint(100, i);
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="var(--border)" strokeWidth="0.5" />;
      })}
      {/* AI (background) */}
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        points={aiPoints.map(p => `${p.x},${p.y}`).join(' ')}
        fill="var(--primary)"
      />
      <polygon
        points={aiPoints.map(p => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1"
      />
      {/* Interviewer */}
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 0.5 }}
        points={intPoints.map(p => `${p.x},${p.y}`).join(' ')}
        fill="var(--success)"
      />
      <polygon
        points={intPoints.map(p => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="var(--success)"
        strokeWidth="1"
      />
      {/* Self */}
      <polygon
        points={selfPoints.map(p => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="var(--warning)"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      {/* Labels */}
      {data.map((d, i) => {
        const p = getPoint(115, i);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            fontSize="7"
            fill="var(--foreground-muted)"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

export default function CandidateComprehensiveReport() {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--gray-3)] flex items-center justify-center text-sm font-semibold">
              {CANDIDATE.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">{CANDIDATE.name}</h3>
                <Badge variant="success" className="text-[10px]">{CANDIDATE.verdict}</Badge>
                <Badge variant="outline" className="text-[10px]">종합 리포트</Badge>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                {CANDIDATE.position} · {CANDIDATE.company} · {CANDIDATE.years}년 경력
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Share2 size={14} /> 공유</Button>
            <Button variant="outline" size="sm"><Download size={14} /> PDF</Button>
            <Button size="sm">오퍼 발송 →</Button>
          </div>
        </div>
      </FadeIn>

      {/* 종합 스코어 카드 */}
      <FadeIn delay={0.05}>
        <Card className="py-0 overflow-hidden">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-5 p-6 bg-[var(--foreground)] text-[var(--background)] flex flex-col justify-center">
              <div className="text-[10px] opacity-80">종합 적합도</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[56px] font-semibold leading-none tabular-nums">{CANDIDATE.overall}</span>
                <span className="text-sm opacity-80">점</span>
              </div>
              <div className="text-sm opacity-90 mt-2">{CANDIDATE.verdict}</div>
              <div className="mt-4 flex items-center gap-4 text-[11px]">
                <div>
                  <div className="opacity-60">AI 분석</div>
                  <div className="font-semibold">94점</div>
                </div>
                <div>
                  <div className="opacity-60">면접관 평균</div>
                  <div className="font-semibold">4.53</div>
                </div>
                <div>
                  <div className="opacity-60">결정권자 추천</div>
                  <div className="font-semibold">강력 추천</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">역량 레이더</h4>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--primary)]" /> AI</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--success)]" /> 면접관</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[var(--warning)]" /> 자가평가</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <RadarChart data={COMPETENCY_RADAR} />
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* 3컬럼 하이라이트 */}
      <div className="grid grid-cols-12 gap-4">
        <FadeIn delay={0.1} className="col-span-12 md:col-span-4">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[var(--primary)]/10 flex items-center justify-center">
                <FileText size={12} className="text-[var(--primary)]" />
              </div>
              <h4 className="text-sm font-semibold">서류 하이라이트</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {DOCUMENT_HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-2 p-2.5 rounded-md border border-[var(--border)]"
                >
                  {h.tone === 'success'
                    ? <CheckCircle2 size={12} className="text-[var(--success)] mt-0.5 shrink-0" />
                    : <Flag size={12} className="text-[var(--warning)] mt-0.5 shrink-0" />}
                  <span className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">{h.text}</span>
                </motion.div>
              ))}
              <Button variant="outline" size="xs" className="mt-1">
                <FileText size={11} /> 전체 이력서 보기
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15} className="col-span-12 md:col-span-4">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[var(--success)]/10 flex items-center justify-center">
                <Video size={12} className="text-[var(--success)]" />
              </div>
              <h4 className="text-sm font-semibold">영상 면접 하이라이트</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {VIDEO_HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="flex items-start gap-2 p-2.5 rounded-md border border-[var(--border)] hover:bg-[var(--gray-3)] cursor-pointer"
                >
                  <Badge variant="outline" className="text-[10px] shrink-0 font-mono">{h.time}</Badge>
                  <span className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">{h.text}</span>
                </motion.div>
              ))}
              <Button variant="outline" size="xs" className="mt-1">
                <Video size={11} /> 영상 전체 재생
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2} className="col-span-12 md:col-span-4">
          <Card className="h-full">
            <div className="px-6 flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[var(--warning)]/10 flex items-center justify-center">
                <MessageSquare size={12} className="text-[var(--warning)]" />
              </div>
              <h4 className="text-sm font-semibold">면접관 평가</h4>
            </div>
            <CardContent className="flex flex-col gap-2">
              {INTERVIEW_SCORES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.4 }}
                  className="p-2.5 rounded-md border border-[var(--border)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium">{s.interviewer}</div>
                      <div className="text-[10px] text-[var(--foreground-muted)]">{s.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-[var(--warning)] fill-[var(--warning)]" />
                        <span className="text-xs font-semibold">{s.score}</span>
                      </div>
                      <div className="text-[9px] text-[var(--success)]">{s.verdict}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* AI 종합 분석 */}
      <FadeIn delay={0.25}>
        <Card className="h-full">
          <div className="px-6 flex items-center gap-2">
            <Sparkles size={13} className="text-[var(--primary)]" />
            <h4 className="text-sm font-semibold">AI 종합 분석</h4>
            <Badge variant="outline" className="text-[10px]">GPT-4 기반</Badge>
          </div>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {AI_ANALYSIS.map((a, i) => {
              const icons = [Target, Award, Flag, TrendingUp];
              const Icon = icons[i];
              const tones = ['primary', 'success', 'warning', 'success'];
              const tone = tones[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="p-4 rounded-lg border border-[var(--border)]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded bg-[var(--${tone})]/10 flex items-center justify-center`}>
                      <Icon size={11} className={`text-[var(--${tone})]`} />
                    </div>
                    <span className="text-xs font-semibold">{a.title}</span>
                  </div>
                  <div className="text-[11px] text-[var(--foreground-muted)] leading-relaxed whitespace-pre-line">
                    {a.body}
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
