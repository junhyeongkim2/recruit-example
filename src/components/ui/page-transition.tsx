"use client";

import { motion } from "motion/react";
import { cn } from "../../lib/utils";

// 페이지 전환 래퍼 - fade + slight slide
export function PageTransition({ children, className }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
       } as any}
      className={cn("h-full", className)}
    >
      {children}
    </motion.div>
  );
}

// 섹션별 stagger 애니메이션용 컨테이너
export function StaggerContainer({ children, className, delay = 0 }: any) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: 0.08,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Stagger 아이템 - StaggerContainer 내부에서 사용
export function StaggerItem({ children, className }: any) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// 개별 fade-in 애니메이션
export function FadeIn({ children, className, delay = 0, duration = 0.4 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay,
        duration,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
       } as any}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// 스케일 애니메이션 (모달, 카드 hover 등)
export function ScaleIn({ children, className, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        delay,
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
       } as any}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
