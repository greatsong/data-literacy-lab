import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const surveyPairs = [
  { bad: '우리 학교 급식이 맛없다고 생각하지 않나요?', good: '우리 학교 급식의 맛에 대해 어떻게 생각하나요?', issue: '부정 유도 질문 — "맛없다"를 전제로 질문' },
  { bad: '대부분의 학생이 찬성하는 교복 자율화에 대해 어떻게 생각하세요?', good: '교복 자율화에 대해 어떻게 생각하세요?', issue: '"대부분의 학생이 찬성"이라는 사회적 압력 포함' },
  { bad: '건강에 해로운 에너지 음료를 자주 마시나요?', good: '에너지 음료를 얼마나 자주 마시나요?', issue: '"건강에 해로운"이라는 평가가 포함되어 부정적 응답 유도' },
  { bad: '훌륭한 교장 선생님의 운영에 만족하시나요?', good: '학교 운영에 대한 만족도는 어떤가요?', issue: '"훌륭한"이라는 긍정 수식어가 긍정 응답 유도' },
  { bad: '주 52시간 근무제를 폐지해야 한다고 생각하지 않습니까?', good: '주 52시간 근무제에 대해 어떻게 생각하십니까?', issue: '이중 부정 + 특정 방향 유도' },
];

const badSurveyItems = [
  { question: '우리 동네 공원이 부족하다고 느끼시나요? (예/아니오)', problems: ['유도 질문 ("부족하다"를 전제)', '2지선다만 제공 (척도 부재)'], improved: '우리 동네의 공원/녹지 공간에 대해 어떻게 느끼십니까? (매우 부족 ~ 매우 충분, 5점 척도)' },
  { question: '어제 저녁에 뭘 드셨나요? (서술형)', problems: ['기억에 의존하는 모호한 질문', '응답 분석이 어려운 완전 개방형'], improved: '어제 저녁 식사로 무엇을 드셨나요? (1) 집밥 (2) 외식 (3) 배달 (4) 편의점 (5) 기타' },
  { question: '운동을 좋아하고, 건강에 관심이 있으신가요?', problems: ['이중 질문 — 두 가지를 동시에 물어봄', '운동은 싫지만 건강에 관심 있는 경우 답하기 어려움'], improved: '운동을 얼마나 좋아하시나요? / 건강 관리에 얼마나 관심이 있으신가요? (각각 별도 질문)' },
];

export default function Lesson3_3() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        설문조사는 데이터를 수집하는 가장 흔한 방법이지만,
        <strong>질문을 어떻게 하느냐</strong>에 따라 결과가 완전히 달라집니다.
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8">유도 질문의 함정</h2>
      <p>
        질문 속에 특정 방향의 답을 암시하면, 응답자는 무의식적으로 그 방향으로 답하게 됩니다.
      </p>

      <div className="my-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="font-bold text-red-600 mb-1">❌ 유도 질문</div>
            <p className="text-slate-600">"이 비효율적인 정책에 대해 어떻게 생각하세요?"</p>
            <p className="text-xs text-red-400 mt-1">→ "비효율적"이라는 평가가 이미 포함</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="font-bold text-green-600 mb-1">✅ 중립적 질문</div>
            <p className="text-slate-600">"이 정책에 대해 어떻게 생각하세요?"</p>
            <p className="text-xs text-green-500 mt-1">→ 응답자가 스스로 판단</p>
          </div>
        </div>
      </div>

      <ExerciseBlock title="실습 1: 유도 질문 vs 중립적 질문 구분하기">
        <SurveyPairQuiz pairs={surveyPairs} />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">설문 설계의 흔한 실수</h2>
      <div className="space-y-3 my-4">
        <MistakeCard emoji="❓" title="이중 질문" desc='하나의 질문에 두 가지를 묻는 것' example='"운동을 좋아하고 건강에 관심 있나요?"' />
        <MistakeCard emoji="📏" title="부적절한 척도" desc='예/아니오만 제공하거나, 척도가 균형이 맞지 않는 것' example='"만족" "매우 만족" "극도로 만족" (불만족 선택지 없음)' />
        <MistakeCard emoji="📋" title="순서 효과" desc='질문 순서가 이후 응답에 영향을 주는 것' example='먼저 부정적 사건을 물어보면 이후 만족도가 낮아짐' />
        <MistakeCard emoji="🔢" title="모호한 기준" desc='응답 기준이 사람마다 다르게 해석되는 것' example='"자주", "가끔" → 사람마다 기준이 다름' />
      </div>

      <ExerciseBlock title="실습 2: 나쁜 설문 고치기">
        <FixSurveyExercise items={badSurveyItems} />
      </ExerciseBlock>

      <InfoBox type="key">
        <strong>좋은 설문의 5가지 원칙</strong>
        <ol className="mt-1 space-y-0.5">
          <li>1. <strong>중립적</strong>으로 질문한다 (유도하지 않는다)</li>
          <li>2. <strong>한 번에 하나만</strong> 묻는다 (이중 질문 금지)</li>
          <li>3. <strong>균형 잡힌 척도</strong>를 사용한다 (긍정-부정 동일하게)</li>
          <li>4. <strong>구체적 기준</strong>을 제시한다 ("가끔" → "주 1-2회")</li>
          <li>5. <strong>순서 효과</strong>를 고려하여 배치한다</li>
        </ol>
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 유도 질문이 데이터를 왜곡하는 방법</li>
          <li>✓ 설문 설계의 흔한 실수 4가지</li>
          <li>✓ 좋은 설문의 5가지 원칙</li>
          <li>✓ 나쁜 질문을 개선하는 실전 연습</li>
        </ul>
      </div>
    </div>
  );
}

function MistakeCard({ emoji, title, desc, example }) {
  return (
    <div className="flex gap-3 p-3 bg-white rounded-xl border border-slate-200">
      <span className="text-xl shrink-0">{emoji}</span>
      <div>
        <h4 className="font-bold text-sm text-slate-800">{title}</h4>
        <p className="text-xs text-slate-600">{desc}</p>
        <p className="text-xs text-slate-400 mt-1 italic">예: {example}</p>
      </div>
    </div>
  );
}

function SurveyPairQuiz({ pairs }) {
  const [answers, setAnswers] = useState({});
  // 각 쌍의 옵션 순서를 초기 렌더링 시 한 번만 결정
  const [orders] = useState(() => pairs.map(() => Math.random() > 0.5));

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 mb-2">각 쌍에서 유도 질문을 골라보세요.</p>
      {pairs.map((pair, i) => {
        const answered = answers[i] !== undefined;
        const options = orders[i] ? [pair.bad, pair.good] : [pair.good, pair.bad];
        const correctIdx = options.indexOf(pair.bad);
        const isCorrect = answers[i] === correctIdx;

        return (
          <div key={i} className={`p-3 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <div className="space-y-1.5">
              {options.map((opt, oi) => (
                <button key={oi} onClick={() => setAnswers((p) => ({ ...p, [i]: oi }))}
                  disabled={answered}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${answered && oi === correctIdx ? 'bg-red-100 text-red-800 font-medium' : answered ? 'bg-slate-50 text-slate-400' : 'bg-slate-50 hover:bg-primary-50'}`}>
                  {oi === 0 ? 'A' : 'B'}. {opt}
                </button>
              ))}
            </div>
            {answered && <p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ 맞습니다! ' : '❌ '}{pair.issue}</p>}
          </div>
        );
      })}
    </div>
  );
}

function FixSurveyExercise({ items }) {
  const [revealed, setRevealed] = useState({});

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="p-4 bg-white rounded-xl border border-slate-200">
          <p className="text-sm font-medium text-slate-800 mb-2">"{item.question}"</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {item.problems.map((p, pi) => (
              <span key={pi} className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full">⚠️ {p}</span>
            ))}
          </div>
          {!revealed[i] ? (
            <button onClick={() => setRevealed((p) => ({ ...p, [i]: true }))}
              className="px-3 py-1.5 bg-primary-100 hover:bg-primary-200 text-primary-700 text-xs rounded-lg cursor-pointer">
              개선된 질문 보기
            </button>
          ) : (
            <div className="p-2 bg-accent-50 rounded-lg text-sm text-accent-800">
              ✅ {item.improved}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
