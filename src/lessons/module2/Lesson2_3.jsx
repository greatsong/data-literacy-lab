import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const evaluationQuestions = [
  {
    question: '스마트폰 사용 시간이 3시간 이상인 고등학생의 수면 시간이 3시간 미만인 학생보다 짧은가?',
    criteria: {
      measurable: true,
      specific: true,
      answerable: true,
      neutral: true,
    },
    feedback: '훌륭한 질문입니다! 측정 가능한 변수(사용 시간, 수면 시간), 명확한 대상(고등학생), 데이터로 답 가능, 중립적입니다.',
    score: 4,
  },
  {
    question: '학생들이 운동을 해야 하는가?',
    criteria: {
      measurable: false,
      specific: false,
      answerable: false,
      neutral: false,
    },
    feedback: '이것은 가치 판단 질문이지 데이터 질문이 아닙니다. "운동 빈도와 학업 성취도의 관계는?"으로 바꿔보세요.',
    score: 0,
  },
  {
    question: '서울 1월 평균 기온은 2015년부터 2025년까지 상승 추세인가?',
    criteria: {
      measurable: true,
      specific: true,
      answerable: true,
      neutral: true,
    },
    feedback: '완벽한 질문입니다! 구체적 시간(2015-2025), 장소(서울), 변수(1월 평균 기온), 분석 방법(추세)이 모두 명확합니다.',
    score: 4,
  },
  {
    question: '공부를 많이 하면 성적이 오를까?',
    criteria: {
      measurable: false,
      specific: false,
      answerable: true,
      neutral: true,
    },
    feedback: '"많이"가 모호합니다. "일 평균 공부 시간이 4시간 이상인 학생의 평균 성적이 2시간 미만 학생보다 높은가?"로 구체화해보세요.',
    score: 2,
  },
  {
    question: '우리 반 학생들의 키는 전국 평균보다 큰가?',
    criteria: {
      measurable: true,
      specific: true,
      answerable: true,
      neutral: true,
    },
    feedback: '좋은 질문입니다! 변수(키), 비교 기준(전국 평균), 대상(우리 반)이 명확합니다.',
    score: 4,
  },
];

const checkLabels = {
  measurable: { label: '측정 가능한 변수 포함', emoji: '📏' },
  specific: { label: '분석 대상 명확', emoji: '🎯' },
  answerable: { label: '데이터로 답 가능', emoji: '📊' },
  neutral: { label: '중립적 질문', emoji: '⚖️' },
};

export default function Lesson2_3() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        지금까지 질문을 만드는 법을 배웠습니다.
        이제 <strong>만들어진 질문의 품질을 평가</strong>하는 눈을 키워봅시다.
      </p>

      {/* 4가지 체크 기준 복습 */}
      <h2 className="text-xl font-bold text-slate-800 mt-8">질문 품질 4가지 체크포인트</h2>
      <div className="grid sm:grid-cols-2 gap-3 my-6">
        {Object.entries(checkLabels).map(([key, { label, emoji }]) => (
          <div key={key} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-xl">{emoji}</span>
            <span className="text-sm font-medium text-slate-700">{label}</span>
          </div>
        ))}
      </div>

      <InfoBox type="note">
        4가지 기준을 모두 충족하면 좋은 데이터 질문입니다.
        하나라도 부족하면 다듬어야 할 부분이 있다는 뜻이에요.
      </InfoBox>

      {/* 실습: 질문 평가하기 */}
      <ExerciseBlock title="실습: 질문 품질 평가하기">
        <p className="text-sm text-slate-500 mb-4">
          아래 질문들을 읽고, 4가지 기준에 맞는지 체크해보세요.
          체크를 마치면 "평가 확인"을 눌러 결과를 확인하세요.
        </p>
        <div className="space-y-6">
          {evaluationQuestions.map((eq, i) => (
            <QuestionEvalCard key={i} index={i} {...eq} />
          ))}
        </div>
      </ExerciseBlock>

      {/* 질문 개선 팁 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">질문을 개선하는 3가지 팁</h2>
      <div className="space-y-3 my-6">
        <TipCard
          num={1}
          title='"많이", "적게" → 구체적 숫자로'
          bad='"공부를 많이 하면"'
          good='"일 평균 4시간 이상 공부하면"'
        />
        <TipCard
          num={2}
          title='"~해야 하는가" → "~인가"로'
          bad='"운동을 해야 하는가?"'
          good='"운동 빈도와 체력 지수 사이에 상관관계가 있는가?"'
        />
        <TipCard
          num={3}
          title='비교 기준을 명시하기'
          bad='"성적이 높은가?"'
          good='"A반의 평균 성적이 B반보다 높은가?"'
        />
      </div>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 질문 품질의 4가지 체크포인트 (측정가능, 명확, 답변가능, 중립)</li>
          <li>✓ 실전 질문 평가 연습</li>
          <li>✓ 모호한 질문을 구체적으로 개선하는 3가지 팁</li>
        </ul>
      </div>
    </div>
  );
}

function QuestionEvalCard({ index, question, criteria, feedback, score }) {
  const [userChecks, setUserChecks] = useState({});
  const [revealed, setRevealed] = useState(false);

  const toggleCheck = (key) => {
    setUserChecks((prev) => ({ ...prev, [key]: !prev[key] }));
    setRevealed(false);
  };

  const userScore = Object.values(userChecks).filter(Boolean).length;
  const allChecked = Object.keys(checkLabels).every((k) => userChecks[k] !== undefined);

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="flex items-start gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-600 shrink-0">
          {index + 1}
        </span>
        <p className="text-sm font-medium text-slate-800">"{question}"</p>
      </div>

      {/* 체크리스트 */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {Object.entries(checkLabels).map(([key, { label, emoji }]) => (
          <label key={key} className="flex items-center gap-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={!!userChecks[key]}
              onChange={() => toggleCheck(key)}
              className="w-3.5 h-3.5 rounded"
            />
            <span>{emoji} {label}</span>
          </label>
        ))}
      </div>

      {/* 확인 버튼 */}
      <button
        onClick={() => setRevealed(true)}
        className="px-3 py-1.5 bg-primary-100 hover:bg-primary-200 text-primary-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
      >
        평가 확인
      </button>

      {revealed && (
        <div className={`mt-3 p-3 rounded-lg text-xs ${score >= 3 ? 'bg-accent-50' : score >= 2 ? 'bg-warm-50' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">
              {score >= 3 ? '✅ 좋은 질문!' : score >= 2 ? '🔧 개선 가능' : '⚠️ 다듬기 필요'}
            </span>
            <span className="text-slate-400">({score}/4)</span>
          </div>
          <p className="text-slate-600">{feedback}</p>

          {/* 정답과 비교 */}
          <div className="mt-2 pt-2 border-t border-slate-200">
            <span className="text-slate-400">정답 기준: </span>
            {Object.entries(criteria).map(([key, val]) => (
              <span key={key} className={`inline-block mr-1 ${val ? 'text-accent-600' : 'text-red-400'}`}>
                {val ? '✓' : '✗'}{checkLabels[key].emoji}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TipCard({ num, title, bad, good }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="font-bold text-sm text-slate-800 mb-2">
        <span className="text-primary-500">Tip {num}.</span> {title}
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-red-50 rounded-lg">
          <span className="text-red-400">✗ </span>{bad}
        </div>
        <div className="p-2 bg-accent-50 rounded-lg">
          <span className="text-accent-500">✓ </span>{good}
        </div>
      </div>
    </div>
  );
}
