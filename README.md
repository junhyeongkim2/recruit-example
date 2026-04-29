# Recruit Agent · Demo

채용관리 모듈 데모 (HRIS에서 분리, 단독 실행)

## 스택
- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- motion (framer-motion)
- lucide-react

## 실행
```bash
npm install
npm run dev
```

## 빌드
```bash
npm run build
npm run preview
```

## 배포 (Vercel)
1. Vercel 프로젝트 생성 → 본 레포 import
2. 자동으로 Vite 프레임워크 감지, `vercel.json` 의 SPA rewrite 적용
3. 별도 환경 변수 없음

## 구성
- `src/components/hr/recruitment/` — 채용 모듈 본체 (35+ 서브뷰)
- `src/components/ui/` — shadcn 기반 UI 프리미티브 (Card, Button, Badge, page-transition)
- `src/components/shared/NotificationDropdown.tsx` — 알림 드롭다운
- `src/lib/utils.ts` — `cn()` 유틸 (clsx + tailwind-merge)
- `public/icons/3d/` — 3D 아이콘 12종 (Radix 팔레트)
- `src/index.css` — 디자인 토큰 (CSS 변수)
