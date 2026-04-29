import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// 공통 서브뷰 탭 스위처 — 카테고리 그룹 지원
interface SubView<T extends string> {
  key: T;
  label: string;
  icon: any;
  group?: string;
}

interface SubViewTabsProps<T extends string> {
  views: SubView<T>[];
  active: T;
  onChange: (v: T) => void;
  layoutId: string;
  groups?: string[];
}

export function SubViewTabs<T extends string>({ views, active, onChange, layoutId, groups }: SubViewTabsProps<T>) {
  // 카테고리가 정의되어 있으면 그룹핑 모드
  const hasGroups = groups && groups.length > 0 && views.some(v => v.group);

  if (!hasGroups) {
    return (
      <div className="overflow-x-auto -mx-1 px-1 scrollbar-thin">
        <div className="inline-flex items-center gap-0.5 p-1 rounded-lg bg-[var(--gray-3)]">
          {views.map(v => {
            const Icon = v.icon;
            const isActive = v.key === active;
            return (
              <motion.button
                key={v.key}
                whileHover={{ y: -0.5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange(v.key)}
                className={cn(
                  'relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap',
                  isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                )}
              >
                <Icon size={13} strokeWidth={1.75} />
                <span>{v.label}</span>
                {isActive && (
                  <motion.div
                    layoutId={layoutId}
                    className="absolute inset-0 rounded-md bg-[var(--card)] shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // 카테고리 그룹 모드
  const activeView = views.find(v => v.key === active);
  const activeGroup = activeView?.group || groups![0];

  return (
    <div className="flex flex-col gap-2">
      {/* 1단 카테고리 */}
      <div className="inline-flex items-center gap-0.5 p-1 rounded-lg bg-[var(--gray-3)] w-fit">
        {groups!.map(g => {
          const isActive = g === activeGroup;
          const groupViews = views.filter(v => v.group === g);
          return (
            <motion.button
              key={g}
              whileHover={{ y: -0.5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (groupViews.length > 0) onChange(groupViews[0].key);
              }}
              className={cn(
                'relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap',
                isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              )}
            >
              <span>{g}</span>
              <span className={cn(
                'text-[9px] px-1 py-0.5 rounded',
                isActive ? 'bg-[var(--gray-3)] text-[var(--foreground-muted)]' : 'text-[var(--foreground-subtle)]'
              )}>
                {groupViews.length}
              </span>
              {isActive && (
                <motion.div
                  layoutId={`${layoutId}-group`}
                  className="absolute inset-0 rounded-md bg-[var(--card)] shadow-sm -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 2단 세부 탭 (현재 그룹의 views만) */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="inline-flex items-center gap-1 py-1">
          {views.filter(v => v.group === activeGroup).map(v => {
            const Icon = v.icon;
            const isActive = v.key === active;
            return (
              <motion.button
                key={v.key}
                whileHover={{ y: -0.5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange(v.key)}
                className={cn(
                  'relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap border',
                  isActive
                    ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                    : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--gray-3)] hover:text-[var(--foreground)]'
                )}
              >
                <Icon size={12} strokeWidth={1.75} />
                <span>{v.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 공통 섹션 헤더
interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  icon?: any;
  size?: 'sm' | 'md';
}

export function SectionHeader({ title, description, badge, actions, icon: Icon, size = 'md' }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3 min-w-0">
        {Icon && (
          <div className={cn(
            'rounded-md bg-[var(--gray-3)] flex items-center justify-center shrink-0',
            size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
          )}>
            <Icon size={size === 'sm' ? 14 : 16} className="text-[var(--foreground)]" strokeWidth={1.75} />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={cn('font-semibold text-[var(--foreground)]', size === 'sm' ? 'text-sm' : 'text-[15px]')}>
              {title}
            </h3>
            {badge}
          </div>
          {description && (
            <p className="text-xs text-[var(--foreground-muted)] mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-1.5 shrink-0">{actions}</div>}
    </div>
  );
}

// 공통 KPI 카드
interface KpiCardProps {
  icon: any;
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
}

export function KpiCard({ icon: Icon, label, value, unit, delta, trend = 'up', highlight = false }: KpiCardProps) {
  const trendColor = trend === 'up' ? 'text-[var(--success)]' : trend === 'down' ? 'text-[var(--error)]' : 'text-[var(--foreground-muted)]';

  return (
    <Card className={highlight ? 'bg-[var(--gray-3)]/50' : ''}>
      <CardContent className="flex items-start justify-between">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[11px] text-[var(--foreground-muted)] truncate">{label}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-[24px] font-semibold text-[var(--foreground)] leading-none tabular-nums">
              {value}
            </span>
            {unit && <span className="text-xs text-[var(--foreground-muted)]">{unit}</span>}
          </div>
          {delta && (
            <span className={cn('text-[11px] mt-0.5', trendColor)}>
              {delta}
            </span>
          )}
        </div>
        <div className="w-8 h-8 rounded-md bg-[var(--gray-3)] flex items-center justify-center shrink-0">
          <Icon size={14} strokeWidth={1.75} className="text-[var(--foreground-muted)]" />
        </div>
      </CardContent>
    </Card>
  );
}

// 공통 빈 상태
interface EmptyStateProps {
  icon?: any;
  title: string;
  description?: string;
  action?: ReactNode;
  size?: 'sm' | 'md';
}

export function EmptyState({ icon: Icon, title, description, action, size = 'md' }: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      size === 'sm' ? 'py-6 gap-2' : 'py-10 gap-3'
    )}>
      {Icon && (
        <div className={cn(
          'rounded-full bg-[var(--gray-3)] flex items-center justify-center',
          size === 'sm' ? 'w-10 h-10' : 'w-12 h-12'
        )}>
          <Icon size={size === 'sm' ? 16 : 20} className="text-[var(--foreground-muted)]" strokeWidth={1.5} />
        </div>
      )}
      <div>
        <div className={cn('font-medium text-[var(--foreground)]', size === 'sm' ? 'text-xs' : 'text-sm')}>{title}</div>
        {description && (
          <div className={cn('text-[var(--foreground-muted)] mt-0.5', size === 'sm' ? 'text-[11px]' : 'text-xs')}>
            {description}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}

// 정보 밀도 높은 통계 인라인 (라벨 · 값)
export function StatInline({ label, value, unit, trend }: { label: string; value: string | number; unit?: string; trend?: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-xs text-[var(--foreground-muted)]">{label}</span>
      <span className="text-sm font-semibold tabular-nums">{value}</span>
      {unit && <span className="text-[10px] text-[var(--foreground-muted)]">{unit}</span>}
      {trend && <span className="text-[10px] text-[var(--success)]">{trend}</span>}
    </div>
  );
}

// 프로세스 스텝 인디케이터
export function StepIndicator({ step, total, label }: { step: number; total: number; label?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-1 rounded-full transition-all',
            i < step ? 'w-6 bg-[var(--foreground)]' : i === step ? 'w-8 bg-[var(--foreground)]' : 'w-4 bg-[var(--gray-3)]'
          )}
        />
      ))}
      {label && <span className="text-[10px] text-[var(--foreground-muted)] ml-1">{label}</span>}
    </div>
  );
}
