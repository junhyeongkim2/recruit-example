import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export type Icon3DName =
  | 'sparkles' | 'brain' | 'target' | 'rocket' | 'trophy'
  | 'chart' | 'users' | 'briefcase' | 'calendar' | 'shield'
  | 'lightbulb' | 'handshake';

interface Icon3DProps {
  name: Icon3DName;
  size?: number;
  className?: string;
  animate?: boolean;
}

export function Icon3D({ name, size = 48, className, animate = true }: Icon3DProps) {
  if (!animate) {
    return (
      <img
        src={`/icons/3d/${name}.svg`}
        alt=""
        width={size}
        height={size}
        className={cn('select-none pointer-events-none', className)}
        draggable={false}
      />
    );
  }
  return (
    <motion.img
      src={`/icons/3d/${name}.svg`}
      alt=""
      width={size}
      height={size}
      draggable={false}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className={cn('select-none pointer-events-none', className)}
    />
  );
}
