import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  Bell, CheckCircle2, AlertCircle, Calendar, FileText, Users, Sparkles, X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface FeedItem {
  id: string;
  type: 'success' | 'warning' | 'info';
  icon: any;
  title: string;
  detail: string;
  time: string;
}

const INITIAL_FEED: FeedItem[] = [
  { id: '1', type: 'success', icon: CheckCircle2, title: '백엔드 1차 면접 완료', detail: '박지우 / 면접관 3명 평가 완료', time: '방금 전' },
  { id: '2', type: 'warning', icon: AlertCircle, title: '역량검사 마감 24시간 전', detail: '지원자 12명 미완료', time: '2분 전' },
  { id: '3', type: 'info', icon: Calendar, title: '프론트 2차 면접 예정', detail: '임채원 / 05-23 14:00', time: '5분 전' },
  { id: '4', type: 'info', icon: FileText, title: 'AI 공고문 초안 준비 완료', detail: 'AI/ML 엔지니어 공고 3종', time: '12분 전' },
  { id: '5', type: 'success', icon: Users, title: '최민호 오퍼 수락', detail: '백엔드 엔지니어 · 입사일 확정', time: '1시간 전' },
  { id: '6', type: 'info', icon: Sparkles, title: 'AI 인사이트 업데이트', detail: '디자이너 채용 파이프라인 분석', time: '2시간 전' },
];

const TONE_STYLE = {
  success: 'bg-[var(--success)]/10 text-[var(--success)]',
  warning: 'bg-[var(--warning)]/10 text-[var(--warning)]',
  info: 'bg-[var(--gray-3)] text-[var(--foreground-muted)]',
};

export default function NotificationFeed() {
  const [feed, setFeed] = useState<FeedItem[]>(INITIAL_FEED);
  const [newItemPulse, setNewItemPulse] = useState<string | null>(null);

  // 새 알림 시뮬레이션
  useEffect(() => {
    const t = setTimeout(() => {
      const newItem: FeedItem = {
        id: Date.now().toString(),
        type: 'success',
        icon: Sparkles,
        title: 'AI 스크리닝 완료',
        detail: '신규 지원자 8명 평가 완료',
        time: '방금',
      };
      setFeed([newItem, ...feed]);
      setNewItemPulse(newItem.id);
      setTimeout(() => setNewItemPulse(null), 2500);
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  const remove = (id: string) => {
    setFeed(feed.filter(f => f.id !== id));
  };

  return (
    <Card className="py-0">
      <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-[var(--primary)]" />
          <h3 className="text-sm font-semibold">실시간 채용 알림</h3>
          <Badge variant="secondary" className="text-[10px]">{feed.length}</Badge>
        </div>
        <button
          onClick={() => setFeed([])}
          className="text-[10px] text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        >
          모두 읽음
        </button>
      </div>
      <div className="max-h-[320px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {feed.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20, backgroundColor: 'rgba(48,164,108,0.10)' }}
                animate={{
                  opacity: 1,
                  x: 0,
                  backgroundColor: newItemPulse === item.id ? 'rgba(48,164,108,0.08)' : 'rgba(0,0,0,0)',
                }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="relative group border-b border-[var(--border)] last:border-0"
              >
                <div className="px-4 py-3 flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${TONE_STYLE[item.type]}`}>
                    <Icon size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{item.title}</div>
                    <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5 truncate">{item.detail}</div>
                    <div className="text-[10px] text-[var(--foreground-subtle)] mt-0.5">{item.time}</div>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded hover:bg-[var(--gray-3)] flex items-center justify-center text-[var(--foreground-muted)] transition-opacity"
                  >
                    <X size={11} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Card>
  );
}
