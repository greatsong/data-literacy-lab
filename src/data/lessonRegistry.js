// 전체 모듈/레슨 메타데이터 (8개 모듈, 30개 레슨)
export const modules = [
  {
    id: 'module1',
    title: '데이터란 무엇인가',
    icon: 'chart',
    description: '일상 속 데이터를 발견하고, 데이터의 종류와 품질을 이해합니다.',
    color: 'primary',
    lessons: [
      { id: '1-1', title: '우리 주변의 데이터', description: '일상 속 데이터 찾기 퀴즈', duration: 15 },
      { id: '1-2', title: '데이터의 종류', description: '범주형 vs 수치형 분류 연습', duration: 20 },
      { id: '1-3', title: '좋은 데이터 vs 나쁜 데이터', description: '데이터 품질 평가', duration: 15 },
    ],
  },
  {
    id: 'module2',
    title: '질문을 설계하라',
    icon: 'question',
    description: '막연한 궁금증을 데이터로 답할 수 있는 질문으로 변환합니다.',
    color: 'accent',
    lessons: [
      { id: '2-1', title: '궁금증에서 질문으로', description: '3단계 질문 변환 연습', duration: 20 },
      { id: '2-2', title: '상황카드로 질문 만들기', description: '인터랙티브 상황카드 활동', duration: 25 },
      { id: '2-3', title: '좋은 질문의 조건', description: '질문 품질 자가진단', duration: 15 },
    ],
  },
  {
    id: 'module3',
    title: '데이터는 어디서 오는가',
    icon: 'target',
    description: '데이터 수집의 함정을 이해하고, 편향을 구별하는 눈을 키웁니다.',
    color: 'warm',
    lessons: [
      { id: '3-1', title: '표본과 모집단', description: '설문조사 설계 시뮬레이션', duration: 20 },
      { id: '3-2', title: '편향의 세계', description: '생존자/선택/확인 편향 사례', duration: 20 },
      { id: '3-3', title: '좋은 설문 vs 나쁜 설문', description: '유도 질문 판별 실습', duration: 20 },
    ],
  },
  {
    id: 'module4',
    title: '데이터 탐색하기',
    icon: 'search',
    description: '실제 데이터를 직접 다루며 패턴과 이상치를 발견합니다.',
    color: 'primary',
    lessons: [
      { id: '4-1', title: '데이터 읽기 기초', description: '인터랙티브 테이블 탐색', duration: 20 },
      { id: '4-2', title: '기초 통계 이해하기', description: '평균/중앙값/분산 체험', duration: 25 },
      { id: '4-3', title: '패턴 찾기', description: '데이터에서 패턴 발견', duration: 20 },
      { id: '4-4', title: '이상치 탐정', description: '이상치 찾고 처리하기', duration: 25 },
    ],
  },
  {
    id: 'module5',
    title: '시각화로 이야기하기',
    icon: 'trendUp',
    description: '데이터를 차트로 표현하고, 올바르게 읽는 법을 배웁니다.',
    color: 'accent',
    lessons: [
      { id: '5-1', title: '차트 읽기', description: '차트에서 정보 추출 퀴즈', duration: 15 },
      { id: '5-2', title: '올바른 차트 선택하기', description: '데이터 유형별 차트 매칭', duration: 20 },
      { id: '5-3', title: '나만의 차트 만들기', description: '위젯으로 차트 생성', duration: 25 },
      { id: '5-4', title: '거짓말하는 차트', description: '오해 유발 시각화 판별', duration: 20 },
    ],
  },
  {
    id: 'module6',
    title: '분석하고 검증하기',
    icon: 'flask',
    description: '상관관계와 인과관계를 구분하고, 분석 결과를 검증합니다.',
    color: 'warm',
    lessons: [
      { id: '6-1', title: '상관관계 놀이터', description: '산점도+상관계수 플레이그라운드', duration: 25 },
      { id: '6-2', title: '상관 ≠ 인과', description: '함정 사례로 배우는 비판적 사고', duration: 20 },
      { id: '6-3', title: '비교 분석', description: '그룹 비교 실습', duration: 25 },
      { id: '6-4', title: '분석 결과 검증 5단계', description: '체크리스트 검증 실습', duration: 20 },
    ],
  },
  {
    id: 'module7',
    title: 'AI 활용과 데이터 윤리',
    icon: 'robot',
    description: 'AI로 분석을 지시하는 법과 데이터를 윤리적으로 다루는 법을 배웁니다.',
    color: 'primary',
    lessons: [
      { id: '7-1', title: '좋은 지시 = 좋은 분석', description: 'Before/After 데모', duration: 20 },
      { id: '7-2', title: '소울 문서 작성하기', description: '구조화된 지시문 실습', duration: 30 },
      { id: '7-3', title: '데이터 윤리', description: '개인정보, 편향, 책임', duration: 20 },
      { id: '7-4', title: '데이터로 소통하기', description: '발견을 전달하는 스토리텔링', duration: 20 },
    ],
  },
  {
    id: 'module8',
    title: '미니 ML 실험실',
    icon: 'brain',
    description: '머신러닝의 기본 개념을 시각적으로 체험합니다.',
    color: 'accent',
    lessons: [
      { id: '8-1', title: 'ML이란?', description: '규칙 vs 학습, 일상 속 ML', duration: 15 },
      { id: '8-2', title: '분류 체험', description: '시각적 의사결정 트리', duration: 25 },
      { id: '8-3', title: '회귀 체험', description: '인터랙티브 선형 회귀', duration: 25 },
      { id: '8-4', title: '나의 첫 ML 프로젝트', description: 'Python ML 미니 프로젝트', duration: 30 },
    ],
  },
];

// 전체 레슨 수
export const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

// lessonId로 모듈과 레슨 정보 찾기
export function findLesson(lessonId) {
  for (const mod of modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { module: mod, lesson };
  }
  return null;
}

// 이전/다음 레슨 찾기
export function getAdjacentLessons(lessonId) {
  const flat = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id })));
  const idx = flat.findIndex((l) => l.id === lessonId);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
