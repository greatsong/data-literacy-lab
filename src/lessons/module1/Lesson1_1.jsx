import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';

// 일상 속 데이터 퀴즈 문항
const dailyDataQuiz = [
  {
    question: '오늘 아침 기온이 -3°C라는 정보를 봤습니다. 이것은 데이터일까요?',
    options: ['데이터다', '데이터가 아니다'],
    answer: 0,
    explanation: '기온 -3°C는 측정 가능한 수치 데이터입니다. 온도계로 측정된 객관적 사실이죠.',
  },
  {
    question: '"오늘 날씨가 좀 추운 것 같아"라는 말은 데이터일까요?',
    options: ['데이터다', '데이터가 아니다'],
    answer: 1,
    explanation: '이것은 주관적 느낌(의견)입니다. "좀 춥다"는 사람마다 다르게 느끼죠. 데이터가 되려면 "기온 -3°C"처럼 측정 가능한 값이어야 합니다.',
  },
  {
    question: '학교 급식 만족도 조사에서 "4점(5점 만점)"이라고 응답했습니다. 이것은?',
    options: ['데이터다', '데이터가 아니다'],
    answer: 0,
    explanation: '설문 응답도 데이터입니다! 주관적 의견이지만, 숫자로 기록되어 분석 가능하죠.',
  },
  {
    question: '버스 정류장의 "다음 버스: 5분 후"라는 안내는?',
    options: ['데이터다', '데이터가 아니다'],
    answer: 0,
    explanation: 'GPS 위치와 운행 데이터를 분석해 만든 예측 결과입니다. 데이터에서 나온 정보죠.',
  },
];

// "데이터 찾기" 시나리오
const findDataScenarios = [
  {
    scene: '🏫 교실',
    hint: '교실 안에서 데이터가 될 수 있는 것들을 3가지 이상 떠올려보세요.',
    examples: ['학생 수(35명)', '교실 온도(24°C)', '출석률(95%)', '과목별 시험 점수', '사물함 번호'],
  },
  {
    scene: '🏪 편의점',
    hint: '편의점에서 생기는 데이터를 3가지 이상 떠올려보세요.',
    examples: ['상품 가격(1,200원)', '일일 판매량', '재고 수량', '방문 고객 수', '결제 수단(카드/현금)'],
  },
  {
    scene: '📱 스마트폰',
    hint: '내 스마트폰이 기록하고 있는 데이터를 3가지 이상 떠올려보세요.',
    examples: ['일일 스크린 타임(4시간)', '걸음 수(8,234보)', '배터리 사용량', '앱별 사용 시간', '위치 정보'],
  },
];

export default function Lesson1_1() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      {/* 도입 */}
      <p className="text-lg">
        우리는 매일 수많은 <strong>데이터</strong> 속에서 살고 있습니다.
        아침에 확인하는 날씨, 버스 도착 시간, SNS의 좋아요 수...
        이 모든 것이 데이터입니다.
      </p>
      <p>
        하지만 정확히 <strong>"데이터"란 무엇일까요?</strong>
        그리고 어떤 것이 데이터이고, 어떤 것은 데이터가 아닐까요?
      </p>

      <InfoBox type="key">
        <strong>데이터(Data)</strong>란 관찰이나 측정을 통해 수집된 사실이나 값입니다.
        데이터는 숫자일 수도, 텍스트일 수도, 이미지일 수도 있지만,
        핵심은 <strong>"기록 가능하고, 분석 가능한 정보"</strong>라는 점입니다.
      </InfoBox>

      {/* 실습 1: 데이터 vs 비데이터 퀴즈 */}
      <ExerciseBlock title="실습 1: 이것은 데이터일까?">
        <p className="text-sm text-slate-500 mb-4">
          아래 상황을 보고, 데이터인지 아닌지 판단해보세요.
        </p>
        <QuizSection items={dailyDataQuiz} />
      </ExerciseBlock>

      {/* 데이터의 3가지 특징 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">데이터의 세 가지 특징</h2>

      <div className="grid gap-4 sm:grid-cols-3 my-6">
        <FeatureCard
          emoji="📏"
          title="측정 가능"
          description="숫자든 범주든, 일정한 기준으로 기록할 수 있어야 합니다."
          example='예) 키 172cm, 혈액형 A형'
        />
        <FeatureCard
          emoji="📋"
          title="기록 가능"
          description="누가, 언제 보더라도 같은 값을 확인할 수 있어야 합니다."
          example='예) 2026년 2월 22일 서울 기온 -3°C'
        />
        <FeatureCard
          emoji="🔍"
          title="분석 가능"
          description="모아서 패턴을 찾거나, 비교하거나, 예측에 활용할 수 있어야 합니다."
          example='예) 10년간 기온 데이터 → 온난화 추세 분석'
        />
      </div>

      <InfoBox type="think">
        "맛있다"는 데이터가 될 수 있을까요?
        <br />그냥 "맛있다"는 의견이지만, <strong>"맛 평점 4.5/5"</strong>로 기록하면 데이터가 됩니다.
        <br />즉, <strong>기록 방식에 따라 의견도 데이터가 될 수 있습니다!</strong>
      </InfoBox>

      {/* 실습 2: 데이터 찾기 */}
      <ExerciseBlock title="실습 2: 주변에서 데이터 찾기">
        <p className="text-sm text-slate-500 mb-4">
          아래 장소에서 발생하는 데이터를 직접 떠올려보세요. 생각한 후 정답을 확인해보세요.
        </p>
        <div className="space-y-4">
          {findDataScenarios.map((s, i) => (
            <FindDataCard key={i} {...s} />
          ))}
        </div>
      </ExerciseBlock>

      {/* 데이터가 중요한 이유 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">왜 데이터가 중요할까?</h2>
      <p>
        데이터는 <strong>"감(느낌)"을 "근거"로 바꿔주는 힘</strong>이 있습니다.
      </p>

      <div className="my-6 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="p-4 bg-red-50 border-r border-slate-200">
            <div className="text-sm font-semibold text-red-600 mb-2">❌ 감에 의존</div>
            <p className="text-sm text-slate-600">"요즘 학생들이 스마트폰을 너무 많이 하는 것 같아요"</p>
          </div>
          <div className="p-4 bg-green-50">
            <div className="text-sm font-semibold text-green-600 mb-2">✅ 데이터에 근거</div>
            <p className="text-sm text-slate-600">"조사 결과 고등학생 평균 스마트폰 사용 시간은 하루 3.5시간이며, 2년 전보다 0.8시간 증가했습니다"</p>
          </div>
        </div>
      </div>

      <InfoBox type="tip">
        이 사이트에서는 실제 200명 학생의 설문 데이터와 10년간의 서울 기온 데이터를 사용합니다.
        앞으로 이 데이터를 직접 탐색하고 분석하게 될 거예요!
      </InfoBox>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 데이터의 정의: 관찰/측정으로 수집된 기록 가능한 정보</li>
          <li>✓ 데이터의 3가지 특징: 측정 가능, 기록 가능, 분석 가능</li>
          <li>✓ 의견과 데이터의 차이, 그리고 의견을 데이터로 바꾸는 방법</li>
          <li>✓ 데이터가 중요한 이유: 감을 근거로 바꾸는 힘</li>
        </ul>
      </div>
    </div>
  );
}

// --- 하위 컴포넌트 ---

function QuizSection({ items }) {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (idx, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [idx]: optionIdx }));
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const selected = answers[idx];
        const isCorrect = selected === item.answer;
        const answered = selected !== undefined;

        return (
          <div key={idx} className={`p-4 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <p className="font-medium text-sm mb-3">{idx + 1}. {item.question}</p>
            <div className="flex gap-2 mb-2">
              {item.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => handleAnswer(idx, oi)}
                  disabled={answered}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    answered && oi === item.answer
                      ? 'bg-accent-500 text-white'
                      : answered && oi === selected && !isCorrect
                        ? 'bg-red-400 text-white'
                        : answered
                          ? 'bg-slate-100 text-slate-400'
                          : 'bg-slate-100 hover:bg-primary-100 text-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {answered && (
              <p className="text-xs text-slate-600 mt-2">
                {isCorrect ? '✅ ' : '❌ '}{item.explanation}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FeatureCard({ emoji, title, description, example }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="text-2xl mb-2">{emoji}</div>
      <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-sm text-slate-600 mb-2">{description}</p>
      <p className="text-xs text-slate-400 italic">{example}</p>
    </div>
  );
}

function FindDataCard({ scene, hint, examples }) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{scene}</span>
        <span className="text-sm text-slate-500">{hint}</span>
      </div>
      <RevealAnswer label="예시 정답 보기">
        <ul className="space-y-1">
          {examples.map((ex, i) => (
            <li key={i} className="text-sm">• {ex}</li>
          ))}
        </ul>
      </RevealAnswer>
    </div>
  );
}
