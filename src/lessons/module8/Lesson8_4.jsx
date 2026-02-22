import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const mlWorkflow = [
  { num: 1, emoji: '❓', title: '문제 정의', desc: '무엇을 예측/분류할 것인가?', example: '"수면 시간으로 성적만족도를 예측할 수 있을까?"' },
  { num: 2, emoji: '📊', title: '데이터 수집', desc: '필요한 데이터를 모으고 정리', example: '설문조사, 공공데이터, 실험 등으로 데이터 확보' },
  { num: 3, emoji: '🔍', title: '데이터 탐색', desc: '시각화, 통계로 데이터 이해', example: '산점도, 히스토그램, 이상치 확인' },
  { num: 4, emoji: '🧹', title: '데이터 전처리', desc: '결측치 처리, 이상치 제거, 변환', example: '빈 값 채우기, 스케일링, 범주형 인코딩' },
  { num: 5, emoji: '🤖', title: '모델 학습', desc: '알고리즘 선택 + 학습 데이터로 훈련', example: '의사결정 트리, 선형 회귀, 랜덤 포레스트 등' },
  { num: 6, emoji: '📏', title: '모델 평가', desc: '테스트 데이터로 성능 측정', example: '정확도, R², 혼동행렬 등' },
  { num: 7, emoji: '💡', title: '해석 & 활용', desc: '결과를 해석하고 의사결정에 활용', example: '"수면 7시간 이상이면 만족도가 높을 확률 80%"' },
];

const projectOptions = [
  {
    title: '🎓 학생 성적 예측',
    description: '수면시간, 운동일수, 스마트폰 사용시간으로 성적 만족도 예측',
    type: '분류',
    features: ['수면시간', '운동일수', '스마트폰 사용시간'],
    target: '성적만족도 (높음/낮음)',
    algorithm: '의사결정 트리',
    data: '학생 설문조사 200명',
  },
  {
    title: '🌡️ 기온 예측',
    description: '월, 연도로 서울 평균 기온 예측',
    type: '회귀',
    features: ['월', '연도'],
    target: '평균기온 (°C)',
    algorithm: '선형 회귀',
    data: '서울 월별 기온 2015-2025',
  },
  {
    title: '🏃 운동과 수면의 관계',
    description: '운동일수로 수면 시간 예측',
    type: '회귀',
    features: ['주당 운동일수'],
    target: '수면 시간 (시간)',
    algorithm: '선형 회귀',
    data: '학생 설문조사 200명',
  },
];

const quizQuestions = [
  { q: 'ML 프로젝트에서 가장 먼저 해야 할 일은?', options: ['모델 학습', '데이터 탐색', '문제 정의', '데이터 수집'], answer: 2, explanation: '어떤 문제를 풀 것인지 명확하게 정의하는 것이 첫 번째 단계입니다.' },
  { q: '학습 데이터와 테스트 데이터를 분리하는 이유는?', options: ['시간을 절약하기 위해', '모델의 일반화 능력을 평가하기 위해', '데이터를 절반만 사용하기 위해', '컴퓨터 메모리를 아끼기 위해'], answer: 1, explanation: '학습에 사용하지 않은 새로운 데이터에서도 잘 작동하는지 확인해야 합니다.' },
  { q: '모델의 정확도가 100%라면?', options: ['완벽한 모델이다', '과적합(overfitting)을 의심해야 한다', '다른 모델보다 무조건 좋다', '배포해도 된다'], answer: 1, explanation: '100% 정확도는 모델이 데이터를 외운 것일 수 있습니다. 새 데이터에서는 성능이 떨어질 수 있습니다.' },
  { q: '데이터의 80%로 학습하고 20%로 테스트하는 비율은?', options: ['8:2 분할', '교차검증', '앙상블', '부스팅'], answer: 0, explanation: '80/20 분할(train-test split)은 가장 기본적인 모델 평가 방법입니다.' },
];

export default function Lesson8_4() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        지금까지 분류와 회귀의 개념을 배웠습니다.
        이번 레슨에서는 <strong>ML 프로젝트의 전체 흐름</strong>을 정리하고,
        미니 프로젝트를 설계해봅니다.
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8">ML 프로젝트 7단계</h2>
      <div className="space-y-3 my-6">
        {mlWorkflow.map((step) => (
          <div key={step.num} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center text-lg shrink-0">
              {step.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-accent-500">Step {step.num}</span>
                <h4 className="font-bold text-sm text-slate-800">{step.title}</h4>
              </div>
              <p className="text-sm text-slate-600">{step.desc}</p>
              <p className="text-xs text-slate-400 mt-1 italic">{step.example}</p>
            </div>
          </div>
        ))}
      </div>

      <InfoBox type="key">
        ML 프로젝트에서 <strong>데이터 준비(1~4단계)가 전체 시간의 70~80%</strong>를 차지합니다.
        모델 학습은 오히려 적은 비율입니다. "쓰레기 데이터로는 쓰레기 모델만 나온다(GIGO)"를 기억하세요!
      </InfoBox>

      <ExerciseBlock title="실습 1: ML 지식 퀴즈">
        <MLQuiz questions={quizQuestions} />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">미니 ML 프로젝트 설계</h2>
      <p>
        아래 3개 프로젝트 중 하나를 선택하여, ML 프로젝트의 7단계를 따라 설계해보세요.
      </p>

      <ExerciseBlock title="실습 2: 나의 첫 ML 프로젝트 설계">
        <ProjectDesigner projects={projectOptions} />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">과적합 vs 과소적합</h2>
      <OverfittingDemo />

      <InfoBox type="think">
        ML은 "마법의 도구"가 아닙니다.
        <ul className="mt-1 space-y-0.5">
          <li>• 좋은 데이터 없이는 좋은 모델을 만들 수 없습니다</li>
          <li>• 모델의 예측이 항상 맞는 것은 아닙니다</li>
          <li>• ML 결과도 비판적으로 검증해야 합니다</li>
          <li>• 윤리적 고려 없는 ML은 해로울 수 있습니다</li>
        </ul>
        <br />데이터 리터러시가 있는 사람만이 ML을 올바르게 활용할 수 있습니다!
      </InfoBox>

      <div className="mt-10 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200">
        <h3 className="font-bold text-slate-800 mb-2">🎉 데이터 리터러시 랩 완주!</h3>
        <p className="text-sm text-slate-600 mb-3">
          축하합니다! 8개 모듈을 모두 학습하셨습니다. 여러분은 이제:
        </p>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✅ 데이터의 정의, 종류, 품질을 이해합니다</li>
          <li>✅ 데이터로 답할 수 있는 좋은 질문을 만들 수 있습니다</li>
          <li>✅ 데이터 수집의 함정과 편향을 알아챕니다</li>
          <li>✅ 데이터를 탐색하고 패턴을 발견할 수 있습니다</li>
          <li>✅ 적절한 시각화를 선택하고 해석할 수 있습니다</li>
          <li>✅ 상관관계와 인과관계를 구분하고 검증할 수 있습니다</li>
          <li>✅ AI에게 효과적으로 분석을 지시하고, 윤리적으로 판단합니다</li>
          <li>✅ 머신러닝의 기본 개념과 활용을 이해합니다</li>
        </ul>
        <p className="text-sm text-slate-600 mt-3 font-medium">
          이제 여러분은 <strong>데이터를 비판적으로 읽고, 분석하고, 소통하는 능력</strong>을 갖추었습니다! 🚀
        </p>
      </div>
    </div>
  );
}

function MLQuiz({ questions }) {
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
              {q.options.map((opt, oi) => (
                <button key={oi} onClick={() => setAnswers((p) => ({ ...p, [i]: oi }))}
                  disabled={answered}
                  className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${answered && oi === q.answer ? 'bg-accent-500 text-white' : answered && oi === answers[i] ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100'}`}>
                  {opt}
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

function ProjectDesigner({ projects }) {
  const [selected, setSelected] = useState(null);
  const [steps, setSteps] = useState({});

  const stepQuestions = [
    { key: 'problem', label: '1. 문제 정의', placeholder: '무엇을 예측하고 싶은가요? 왜 이것이 유용한가요?' },
    { key: 'data', label: '2. 데이터 설명', placeholder: '어떤 데이터를 사용하나요? 몇 개의 변수가 있나요?' },
    { key: 'explore', label: '3. 탐색 계획', placeholder: '어떤 시각화/통계를 먼저 확인할 건가요?' },
    { key: 'preprocess', label: '4. 전처리 계획', placeholder: '결측치나 이상치는 어떻게 처리할 건가요?' },
    { key: 'model', label: '5. 모델 선택', placeholder: '어떤 알고리즘을 사용할 건가요? 이유는?' },
    { key: 'evaluate', label: '6. 평가 방법', placeholder: '어떤 지표로 모델 성능을 평가할 건가요?' },
    { key: 'interpret', label: '7. 활용 방안', placeholder: '결과를 어떻게 활용할 수 있을까요?' },
  ];

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-3 gap-2">
        {projects.map((p, i) => (
          <button key={i} onClick={() => { setSelected(i); setSteps({}); }}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${selected === i ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-200' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
            <div className="font-bold text-sm">{p.title}</div>
            <div className="text-xs text-slate-500 mt-1">{p.description}</div>
            <div className="flex gap-1 mt-2">
              <span className="px-1.5 py-0.5 bg-slate-100 text-xs rounded">{p.type}</span>
              <span className="px-1.5 py-0.5 bg-slate-100 text-xs rounded">{p.algorithm}</span>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <>
          <div className="p-3 bg-primary-50 rounded-xl border border-primary-200">
            <h4 className="font-bold text-sm text-primary-700 mb-2">{projects[selected].title} — 프로젝트 정보</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="font-bold">유형:</span> {projects[selected].type}</div>
              <div><span className="font-bold">알고리즘:</span> {projects[selected].algorithm}</div>
              <div><span className="font-bold">입력 변수:</span> {projects[selected].features.join(', ')}</div>
              <div><span className="font-bold">예측 대상:</span> {projects[selected].target}</div>
              <div className="col-span-2"><span className="font-bold">데이터:</span> {projects[selected].data}</div>
            </div>
          </div>

          <div className="space-y-2">
            {stepQuestions.map((sq) => (
              <div key={sq.key} className="p-2 bg-white rounded-lg border border-slate-200">
                <label className="text-xs font-bold text-slate-600">{sq.label}</label>
                <textarea rows={2} placeholder={sq.placeholder}
                  value={steps[sq.key] || ''}
                  onChange={(e) => setSteps((p) => ({ ...p, [sq.key]: e.target.value }))}
                  className="mt-1 w-full px-2 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <span className="text-sm text-slate-500">
              {Object.values(steps).filter((v) => v?.trim()).length}/7 단계 작성 완료
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function OverfittingDemo() {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-center">
        <div className="text-2xl mb-2">📉</div>
        <h4 className="font-bold text-red-700">과소적합</h4>
        <p className="text-xs text-slate-600 mt-1">너무 단순해서 패턴을 못 찾음</p>
        <div className="mt-2 p-2 bg-white rounded-lg text-xs text-slate-500">
          비유: 시험 범위를 대충 훑고 본 시험
        </div>
      </div>
      <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-center">
        <div className="text-2xl mb-2">✅</div>
        <h4 className="font-bold text-green-700">적절한 적합</h4>
        <p className="text-xs text-slate-600 mt-1">패턴을 잘 학습 + 새 데이터에도 잘 작동</p>
        <div className="mt-2 p-2 bg-white rounded-lg text-xs text-slate-500">
          비유: 개념을 이해하고 응용도 가능
        </div>
      </div>
      <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-center">
        <div className="text-2xl mb-2">📈</div>
        <h4 className="font-bold text-yellow-700">과적합</h4>
        <p className="text-xs text-slate-600 mt-1">학습 데이터를 외움 → 새 데이터에 약함</p>
        <div className="mt-2 p-2 bg-white rounded-lg text-xs text-slate-500">
          비유: 기출문제만 외우고 새 문제에 당황
        </div>
      </div>
    </div>
  );
}
