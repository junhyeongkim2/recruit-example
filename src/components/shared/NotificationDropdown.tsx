import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  CircleCheck,
  Clock3,
  ArrowRight,
  XCircle,
  CheckCheck,
} from 'lucide-react';

const STATUS_ICON = {
  '진행 예정': Clock3,
  '진행 중': ArrowRight,
  '진행 완료': CircleCheck,
  '진행 취소': XCircle,
};

const STATUS_COLOR = {
  '진행 예정': {
    icon: 'text-[var(--foreground-muted)]',
    bg: 'bg-[var(--gray-3)]',
  },
  '진행 중': {
    icon: 'text-[var(--success)]',
    bg: 'bg-[var(--success-3)]',
  },
  '진행 완료': {
    icon: 'text-[var(--foreground)]',
    bg: 'bg-[var(--gray-3)]',
  },
  '진행 취소': {
    icon: 'text-[var(--error)]',
    bg: 'bg-[var(--error-3)]',
  },
};

const MOCK_NOTIFICATIONS = [
  {
    id: 'NTF-001',
    planId: 'PLAN-2026-001',
    planTitle: '2026년 상반기 정기 발령',
    status: '진행 중',
    message: '발령 계획이 진행 중으로 변경되었습니다. 각 조직별 건의서를 제출해주세요.',
    timestamp: '2026-02-15T09:30:00',
    isRead: false,
  },
  {
    id: 'NTF-012',
    planId: 'PLAN-2026-001',
    planTitle: '2026년 상반기 정기 발령',
    status: '진행 중',
    message: '마감일(2026-02-28)까지 14일 남았습니다. 미제출 조직: Tech',
    timestamp: '2026-02-15T08:00:00',
    isRead: false,
  },
  {
    id: 'NTF-002',
    planId: 'PLAN-2026-001',
    planTitle: '2026년 상반기 정기 발령',
    status: '진행 중',
    message: 'Product 조직에서 발령 건의서 5건이 제출되었습니다.',
    timestamp: '2026-02-14T16:00:00',
    isRead: false,
  },
  {
    id: 'NTF-010',
    planId: 'PLAN-2026-011',
    planTitle: 'R&D 조직 개편 발령',
    status: '진행 예정',
    message: '발령 계획이 생성되었습니다. 발령 반영일: 2026-04-01',
    timestamp: '2026-02-14T10:30:00',
    isRead: false,
  },
  {
    id: 'NTF-003',
    planId: 'PLAN-2026-002',
    planTitle: '조직개편 후속 발령',
    status: '진행 완료',
    message: '발령 계획이 진행 완료 처리되었습니다. 총 12건이 반영되었습니다.',
    timestamp: '2026-02-14T14:20:00',
    isRead: false,
  },
  {
    id: 'NTF-004',
    planId: 'PLAN-2026-010',
    planTitle: '신사업부 인력 충원',
    status: '진행 중',
    message: '발령 건의서 보완 요청 2건이 접수되었습니다. 확인 바랍니다.',
    timestamp: '2026-02-13T11:00:00',
    isRead: true,
  },
  {
    id: 'NTF-005',
    planId: 'PLAN-2026-003',
    planTitle: '기술 인력 재배치',
    status: '진행 예정',
    message: '발령 계획이 생성되었습니다. 발령 반영일: 2026-03-15',
    timestamp: '2026-02-12T10:00:00',
    isRead: true,
  },
  {
    id: 'NTF-009',
    planId: 'PLAN-2026-012',
    planTitle: '유럽 법인 교환 근무',
    status: '진행 취소',
    message: '발령 계획이 취소되었습니다. 사유: 프로그램 연기',
    timestamp: '2026-02-09T13:00:00',
    isRead: true,
  },
];

function formatRelativeTime(timestamp) {
  const now = new Date('2026-02-15T18:00:00');
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const sorted = useMemo(
    () => [...notifications].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [notifications]
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)] hover:text-[var(--foreground)] transition-colors"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full text-[10px] font-semibold bg-[var(--error)] text-[var(--error-foreground)]">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{  duration: 0.15, ease: [0.4, 0, 0.2, 1] as [number, number, number, number]  } as any}
            className="absolute right-0 top-full mt-2 w-[400px] max-h-[480px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--foreground)]">알림</span>
                {unreadCount > 0 && (
                  <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full text-[10px] font-semibold bg-[var(--error)] text-[var(--error-foreground)]">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="flex items-center gap-1.5 text-xs font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <CheckCheck size={14} />
                  모두 읽음
                </button>
              )}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {sorted.map((notification) => {
                const statusColor = STATUS_COLOR[notification.status] || STATUS_COLOR['진행 예정'];
                const StatusIcon = STATUS_ICON[notification.status] || Clock3;

                return (
                  <button
                    key={notification.id}
                    onClick={() => handleToggleRead(notification.id)}
                    className={`w-full flex gap-3 px-4 py-3 text-left transition-colors border-b border-[var(--border-subtle)] last:border-b-0 ${
                      notification.isRead
                        ? 'bg-[var(--card)] hover:bg-[var(--gray-2)]'
                        : 'bg-[var(--background)] hover:bg-[var(--gray-2)]'
                    }`}
                  >
                    {/* Status Icon */}
                    <div className={`w-7 h-7 rounded-md ${statusColor.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <StatusIcon size={14} className={statusColor.icon} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {!notification.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--error)] shrink-0" />
                        )}
                        <span className="text-xs font-medium text-[var(--foreground-muted)] truncate">
                          {notification.planTitle}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed line-clamp-2 ${
                        notification.isRead ? 'text-[var(--foreground-muted)]' : 'text-[var(--foreground)]'
                      }`}>
                        {notification.message}
                      </p>
                      <span className="text-[11px] text-[var(--foreground-subtle)] mt-1 block">
                        {formatRelativeTime(notification.timestamp)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
