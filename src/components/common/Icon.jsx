// 프로젝트 전체에서 사용하는 SVG 아이콘 모음
// 이모지 대신 깔끔한 벡터 아이콘을 사용합니다.

const icons = {
  // 모듈 아이콘
  chart: (
    <>
      <rect x="3" y="12" width="4" height="9" rx="1" fill="currentColor" opacity=".4" />
      <rect x="10" y="7" width="4" height="14" rx="1" fill="currentColor" opacity=".7" />
      <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.87.8c0 1.7-2.37 2.2-2.37 3.7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" opacity=".6" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="15.5" y1="15.5" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  trendUp: (
    <>
      <polyline points="3,17 9,11 13,14 21,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16,6 21,6 21,11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6.5L4 20a1 1 0 0 0 .87 1.5h14.26A1 1 0 0 0 20 20l-6-10.5V3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="14" r="1.5" fill="currentColor" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" />
      <line x1="12" y1="4" x2="12" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      <line x1="2" y1="13" x2="4" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  brain: (
    <>
      <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1.5 3.5C6 11.5 5 13 5 15c0 3 2.5 5 5 5h4c2.5 0 5-2 5-5 0-2-1-3.5-2.5-4.5C17.5 9.5 18 8.5 18 7c0-2.5-2.5-5-6-5z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v18M8 6.5c1 .5 3 .5 4 0M8 14c1-.5 3-.5 4 0M12 6.5c1 .5 3 .5 4 0M12 14c1-.5 3-.5 4 0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
    </>
  ),

  // 통계 아이콘
  books: (
    <>
      <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
    </>
  ),
  memo: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
      <line x1="8" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <polyline points="12,9 12,13 15,15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="2" x2="15" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),

  // 공통 컴포넌트 아이콘
  lightbulb: (
    <>
      <path d="M9 18h6M10 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
    </>
  ),
  warning: (
    <>
      <path d="M10.3 3.2 1.7 18a2 2 0 0 0 1.7 3h17.2a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </>
  ),
  thinking: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 15c1.5 1.5 5 1.5 6.5 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8.5" cy="10" r="1" fill="currentColor" />
      <circle cx="15.5" cy="10" r="1" fill="currentColor" />
      <path d="M15 5c2 0 3 1 3 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  keyIcon: (
    <>
      <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11.5 20 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 15l2.5 2.5M14.5 17l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  eyes: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity=".6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  construction: (
    <>
      <rect x="2" y="14" width="20" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 14V8l3.5-3.5L12 8v6M12 8l3.5-3.5L19 8v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="2" y1="16" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" opacity=".4" />
      <line x1="9" y1="18" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" opacity=".4" />
      <line x1="16" y1="18" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" opacity=".4" />
    </>
  ),
  check: (
    <polyline points="6,12 10,16 18,8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  ),

  // 특징 소개 아이콘
  realData: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5" opacity=".5" />
      <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="1.5" opacity=".5" />
      <circle cx="15" cy="15" r="2" fill="currentColor" opacity=".6" />
    </>
  ),
};

export default function Icon({ name, size = 20, className = '' }) {
  const content = icons[name];
  if (!content) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}

// 모듈 emoji 키를 Icon name으로 매핑
export const moduleIconMap = {
  chart: 'chart',
  question: 'question',
  target: 'target',
  search: 'search',
  trendUp: 'trendUp',
  flask: 'flask',
  robot: 'robot',
  brain: 'brain',
};
