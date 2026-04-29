import { useEffect } from 'react';

interface Shortcut {
  key: string;
  meta?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  action: () => void;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // input 포커스 중에는 단축키 비활성화 (Cmd+K는 제외)
      const target = e.target as HTMLElement;
      const isEditable = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isEditable && !isCmdK) return;

      for (const s of shortcuts) {
        const keyMatch = e.key.toLowerCase() === s.key.toLowerCase();
        const metaMatch = s.meta ? e.metaKey : true;
        const ctrlMatch = s.ctrl ? e.ctrlKey : true;
        const shiftMatch = s.shift ? e.shiftKey : !e.shiftKey || true;
        if (keyMatch && (s.meta ? e.metaKey : s.ctrl ? e.ctrlKey : true) && shiftMatch) {
          e.preventDefault();
          s.action();
          return;
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcuts]);
}

export function getShortcutHint(key: string, meta = false, ctrl = false) {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);
  const prefix = meta ? (isMac ? '⌘' : 'Ctrl') : ctrl ? 'Ctrl' : '';
  return prefix ? `${prefix}${key.toUpperCase()}` : key.toUpperCase();
}
