import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const mlExamples = [
  { emoji: '📧', name: '스팸 메일 필터', how: '수천 개의 스팸/정상 메일을 학습 → 새 메일이 스팸인지 자동 판단', type: '분류' },
  { emoji: '🎵', name: '음악 추천', how: '내가 들은 노래 패턴을 학습 → 좋아할 만한 새 노래 추천', type: '추천' },
  { emoji: '🔍', name: '검색어 자동완성', how: '수많은 검색 기록을 학습 → 입력 중에 나머지를 예측', type: '예측' },
  { emoji: '📸', name: '얼굴 인식', how: '수만 장의 얼굴 사진을 학습 → 사진 속 사람이 누구인지 판단', type: '분류' },
  { emoji: '🌤️', name: '날씨 예측', how: '과거 기상 데이터를 학습 → 미래 날씨를 예측', type: '예측' },
  { emoji: '🚗', name: '자율주행', how: '도로 상황 데이터를 학습 → 실시간 운전 판단', type: '분류/예측' },
];

const ruleVsLearnItems = [
  {
    task: '숫자가 짝수인지 판별',
    rule: { code: 'if 숫자 % 2 == 0: "짝수"', pros: '정확, 빠름, 이해 쉬움', cons: '사람이 규칙을 알아야 함' },
    ml: { code: '데이터 → [2→짝, 3→홀, 4→짝...] → 학습', pros: '규칙을 몰라도 됨', cons: '불필요하게 복잡' },
    winner: 'rule',
    reason: '규칙이 명확한 경우 프로그래밍이 훨씬 효율적',
  },
  {
    task: '사진 속 고양이와 개 구분',
    rule: { code: 'if 귀가 삼각형 and 눈이 크면: "고양이"?', pros: '-', cons: '규칙으로 표현 불가능' },
    ml: { code: '고양이/개 사진 수만 장 → 학습 → 새 사진 판별', pros: '사람이 규칙을 몰라도 학습 가능', cons: '많은 데이터 필요' },
    winner: 'ml',
    reason: '규칙으로 설명하기 어려운 패턴은 ML이 유리',
  },
  {
    task: '내일 비가 올 확률',
    rule: { code: 'if 습도 > 80% and 기압 < 1013: "비 올 확률 높음"', pros: '해석 쉬움', cons: '변수가 많아지면 규칙이 복잡' },
    ml: { code: '과거 10년 기상 데이터 → 학습 → 예측', pros: '수백 개 변수를 동시 고려', cons: '왜 그렇게 예측했는지 설명 어려움' },
    winner: 'ml',
    reason: '변수가 많고 복잡한 패턴은 ML이 더 정확',
  },
];

export default function Lesson8_1() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        우리는 이미 매일 <strong>머신러닝(ML)</strong>을 사용하고 있습니다.
        스팸 메일 필터, 음악 추천, 얼굴 인식... 이 모든 것이 ML입니다.
        이번 레슨에서는 ML이 무엇인지, 언제 유용한지 알아봅니다.
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8">ML이란?</h2>
      <div className="my-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl mb-2">👨‍💻</div>
            <div className="font-bold text-blue-700">전통적 프로그래밍</div>
            <div className="mt-2 text-sm text-slate-600">
              <div className="p-1.5 bg-white rounded mb-1">규칙 + 데이터</div>
              <div className="text-blue-500">↓</div>
              <div className="p-1.5 bg-white rounded">결과</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">사람이 규칙을 직접 작성</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl mb-2">🤖</div>
            <div className="font-bold text-purple-700">머신러닝</div>
            <div className="mt-2 text-sm text-slate-600">
              <div className="p-1.5 bg-white rounded mb-1">데이터 + 결과(정답)</div>
              <div className="text-purple-500">↓</div>
              <div className="p-1.5 bg-white rounded">규칙(모델)</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">컴퓨터가 데이터에서 규칙을 학습</p>
          </div>
        </div>
      </div>

      <InfoBox type="key">
        <strong>머신러닝 = "데이터에서 패턴을 학습하여 새로운 데이터에 대해 예측/판단하는 것"</strong>
        <br />핵심 차이: 사람이 규칙을 만드는 것이 아니라, <strong>데이터가 규칙을 만들어줍니다</strong>.
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-10">일상 속 머신러닝</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
        {mlExamples.map((ex) => (
          <div key={ex.name} className="p-3 bg-white rounded-xl border border-slate-200">
            <div className="text-2xl mb-1">{ex.emoji}</div>
            <h4 className="font-bold text-sm text-slate-800">{ex.name}</h4>
            <p className="text-xs text-slate-600 mt-1">{ex.how}</p>
            <span className="mt-2 inline-block px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full">{ex.type}</span>
          </div>
        ))}
      </div>

      <ExerciseBlock title="실습 1: 규칙 vs 학습 — 언제 ML이 필요할까?">
        <RuleVsLearnQuiz items={ruleVsLearnItems} />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">ML의 3가지 유형</h2>
      <div className="space-y-3 my-6">
        <MLTypeCard emoji="📁" name="지도학습" subtitle="Supervised Learning"
          desc="정답(라벨)이 있는 데이터로 학습"
          examples={['스팸/정상 메일 분류', '집값 예측', '질병 진단']}
          analogy="선생님이 정답을 알려주며 가르치는 것" />
        <MLTypeCard emoji="🔍" name="비지도학습" subtitle="Unsupervised Learning"
          desc="정답 없이 데이터의 구조/패턴을 발견"
          examples={['고객 그룹 분류', '이상 거래 탐지', '주제 분류']}
          analogy="정답 없이 스스로 비슷한 것끼리 모으는 것" />
        <MLTypeCard emoji="🎮" name="강화학습" subtitle="Reinforcement Learning"
          desc="시행착오를 통해 보상을 최대화하는 행동을 학습"
          examples={['게임 AI', '로봇 제어', '자율주행']}
          analogy="게임을 반복하며 점수를 높이는 전략을 찾는 것" />
      </div>

      <ExerciseBlock title="실습 2: 이것은 어떤 ML 유형?">
        <MLTypeQuiz />
      </ExerciseBlock>

      <InfoBox type="tip">
        이 모듈에서는 가장 기본적이고 많이 쓰이는 <strong>지도학습</strong>에 집중합니다.
        <br />다음 레슨에서 <strong>분류</strong>와 <strong>회귀</strong>를 직접 체험해봅시다!
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ ML의 정의: 데이터에서 패턴을 학습하는 것</li>
          <li>✓ 전통적 프로그래밍 vs ML의 차이</li>
          <li>✓ 일상 속 ML 사례 6가지</li>
          <li>✓ ML의 3가지 유형: 지도/비지도/강화학습</li>
        </ul>
      </div>
    </div>
  );
}

function MLTypeCard({ emoji, name, subtitle, desc, examples, analogy }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{emoji}</span>
        <div>
          <span className="font-bold text-slate-800">{name}</span>
          <span className="text-xs text-slate-400 ml-2">{subtitle}</span>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-2">{desc}</p>
      <p className="text-xs text-slate-400 mb-2 italic">비유: {analogy}</p>
      <div className="flex flex-wrap gap-1">
        {examples.map((ex) => (
          <span key={ex} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{ex}</span>
        ))}
      </div>
    </div>
  );
}

function RuleVsLearnQuiz({ items }) {
  const [answers, setAnswers] = useState({});

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">각 문제에서 "규칙 기반"과 "ML" 중 더 적합한 방법을 선택하세요.</p>
      {items.map((item, i) => {
        const answered = answers[i] !== undefined;
        const isCorrect = answers[i] === item.winner;
        return (
          <div key={i} className={`p-4 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <h4 className="font-bold text-sm text-slate-800 mb-3">🎯 {item.task}</h4>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="text-xs font-bold text-blue-600 mb-1">👨‍💻 규칙 기반</div>
                <code className="text-xs text-slate-600 block mb-1">{item.rule.code}</code>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <div className="text-xs font-bold text-purple-600 mb-1">🤖 ML</div>
                <code className="text-xs text-slate-600 block mb-1">{item.ml.code}</code>
              </div>
            </div>
            <div className="flex gap-2">
              {[{ key: 'rule', label: '👨‍💻 규칙 기반' }, { key: 'ml', label: '🤖 ML' }].map(({ key, label }) => (
                <button key={key} onClick={() => setAnswers((p) => ({ ...p, [i]: key }))}
                  disabled={answered}
                  className={`px-3 py-1.5 rounded-lg text-xs cursor-pointer ${answered && key === item.winner ? 'bg-accent-500 text-white' : answered && key === answers[i] ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100'}`}>
                  {label}
                </button>
              ))}
            </div>
            {answered && <p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ ' : '❌ '}{item.reason}</p>}
          </div>
        );
      })}
    </div>
  );
}

function MLTypeQuiz() {
  const questions = [
    { q: '넷플릭스가 시청 기록을 바탕으로 "당신이 좋아할 영화"를 추천', answer: '지도학습', explanation: '사용자의 평점(정답)이 있는 데이터로 학습하여 선호도를 예측' },
    { q: '쇼핑몰이 구매 패턴으로 고객을 몇 개 그룹으로 나눔', answer: '비지도학습', explanation: '미리 정해진 그룹 없이 데이터의 패턴으로 자연스럽게 군집화' },
    { q: '바둑 AI 알파고가 수백만 번의 대국으로 전략을 학습', answer: '강화학습', explanation: '시행착오(대국)를 통해 승리(보상)를 최대화하는 전략을 학습' },
    { q: '의사가 X-ray 사진에 "정상/폐렴" 라벨을 붙인 데이터로 진단 AI 훈련', answer: '지도학습', explanation: '전문가가 붙인 정답 라벨로 학습하는 전형적인 지도학습' },
  ];

  const types = ['지도학습', '비지도학습', '강화학습'];
  const [answers, setAnswers] = useState({});

  return (
    <div className="space-y-3">
      {questions.map((q, i) => {
        const answered = answers[i] !== undefined;
        const isCorrect = answers[i] === q.answer;
        return (
          <div key={i} className={`p-3 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <p className="text-sm mb-2">{q.q}</p>
            <div className="flex flex-wrap gap-1.5">
              {types.map((t) => (
                <button key={t} onClick={() => setAnswers((p) => ({ ...p, [i]: t }))}
                  disabled={answered}
                  className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${answered && t === q.answer ? 'bg-accent-500 text-white' : answered && t === answers[i] ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100'}`}>
                  {t}
                </button>
              ))}
            </div>
            {answered && <p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ ' : '❌ '}{q.explanation}</p>}
          </div>
        );
      })}
    </div>
  );
}
