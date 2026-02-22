import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';
import ChartPicker from '../../components/interactive/ChartPicker';
import DragDropSort from '../../components/interactive/DragDropSort';

// ── 차트 유형 소개 카드 데이터 ──
const chartTypeCards = [
  { name: '막대 차트', icon: '📊', when: '범주별 크기를 비교할 때', data: '범주형(X) + 수치형(Y)', examples: ['과목별 성적', '반별 학생 수', '브랜드별 판매량'], color: 'blue' },
  { name: '꺾은선 차트', icon: '📈', when: '시간에 따른 변화를 보여줄 때', data: '시간(X) + 수치형(Y)', examples: ['월별 기온 변화', '연도별 인구', '일별 주가'], color: 'green' },
  { name: '원형 차트', icon: '🥧', when: '전체 대비 비율을 보여줄 때', data: '범주형 + 비율', examples: ['교통수단 비율', '예산 구성', '시장 점유율'], color: 'yellow' },
  { name: '산점도', icon: '🔵', when: '두 수치 변수의 관계를 볼 때', data: '수치형(X) + 수치형(Y)', examples: ['키와 몸무게', '공부 시간과 성적', '온도와 아이스크림 판매량'], color: 'purple' },
  { name: '히스토그램', icon: '📶', when: '수치 데이터의 분포를 볼 때', data: '수치형 하나의 분포', examples: ['시험 점수 분포', '키 분포', '나이 분포'], color: 'red' },
];

// ── 드래그앤드롭: 데이터 유형 → 차트 유형 매칭 ──
const matchItems = [
  { id: 'q1', label: '2020~2025년 학교 급식 만족도 변화' },
  { id: 'q2', label: '우리 반 학생들의 혈액형 비율' },
  { id: 'q3', label: '키와 50m 달리기 기록의 관계' },
  { id: 'q4', label: '5개 반의 봉사활동 시간 비교' },
  { id: 'q5', label: '학생 200명의 수학 점수 분포' },
  { id: 'q6', label: '우리 학교 동아리별 가입자 수' },
];

const matchCategories = [
  { id: 'bar', title: '막대 차트', color: 'blue' },
  { id: 'line', title: '꺾은선 차트', color: 'green' },
  { id: 'pie', title: '원형 차트', color: 'yellow' },
  { id: 'scatter', title: '산점도', color: 'purple' },
];

const matchCorrect = { q1: 'line', q2: 'pie', q3: 'scatter', q4: 'bar', q5: 'bar', q6: 'bar' };

// ── 퀴즈: 잘못된 차트 선택 판단 ──
const wrongChartQuiz = [
  { scenario: '10년간 서울 인구 변화를 원형 차트로 표현했다.', question: '이 차트 선택에 문제가 있을까요?', options: ['문제 없다', '문제 있다'], answer: 1, explanation: '시간에 따른 변화는 꺾은선 차트가 적합합니다. 원형 차트는 한 시점의 비율을 보여줄 때 사용하므로, 10년간의 추세를 보기 어렵습니다.' },
  { scenario: '반별 학생 수를 막대 차트로 표현했다.', question: '이 차트 선택에 문제가 있을까요?', options: ['문제 없다', '문제 있다'], answer: 0, explanation: '범주(반)별 수치(학생 수)를 비교하는 것이므로 막대 차트가 적합합니다!' },
  { scenario: '학생 5명의 키와 몸무게 관계를 원형 차트로 표현했다.', question: '이 차트 선택에 문제가 있을까요?', options: ['문제 없다', '문제 있다'], answer: 1, explanation: '두 수치형 변수(키, 몸무게)의 관계를 보려면 산점도가 적합합니다. 원형 차트로는 두 변수 간의 관계를 표현할 수 없습니다.' },
  { scenario: '전교생의 좋아하는 계절 비율을 원형 차트로 표현했다.', question: '이 차트 선택에 문제가 있을까요?', options: ['문제 없다', '문제 있다'], answer: 0, explanation: '범주(계절)가 4개이고, 전체 대비 비율을 보여주는 것이므로 원형 차트가 적합합니다!' },
];

// ── 의사결정 흐름도 ──
const decisionTree = [
  { question: '비교하려는 것이 "시간에 따른 변화"인가요?', yes: '꺾은선 차트', no: '다음 질문으로' },
  { question: '전체에서 각 부분의 "비율"을 보고 싶은 건가요?', yes: '원형 차트 (항목 5개 이하일 때)', no: '다음 질문으로' },
  { question: '두 수치형 변수 사이의 "관계"를 보고 싶은 건가요?', yes: '산점도', no: '다음 질문으로' },
  { question: '하나의 수치형 변수의 "분포"를 보고 싶은 건가요?', yes: '히스토그램', no: '다음 질문으로' },
  { question: '범주별 값의 "크기"를 비교하고 싶은 건가요?', yes: '막대 차트', no: '상황에 맞는 차트를 다시 생각해보세요' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
  yellow: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' },
};

export default function Lesson4_2() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        차트를 읽을 줄 아는 것도 중요하지만, <strong>올바른 차트를 선택하는 능력</strong>은
        더욱 중요합니다. 잘못된 차트를 선택하면 데이터의 핵심 메시지가 왜곡되거나 숨겨질 수 있습니다.
      </p>
      <p>
        이번 레슨에서는 <strong>데이터의 특성에 따라 어떤 차트가 적합한지</strong>{' '}
        판단하는 방법을 배웁니다.
      </p>

      <InfoBox type="key">
        차트 선택의 핵심 원칙: <strong>"데이터로 하고 싶은 이야기가 무엇인가?"</strong>를 먼저 정하고,
        그 이야기에 가장 잘 맞는 차트를 선택합니다.
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-10">주요 차트 유형과 용도</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-6">
        {chartTypeCards.map((card, i) => {
          const c = colorMap[card.color] || colorMap.blue;
          return (
            <div key={i} className={`p-4 rounded-xl border ${c.bg} ${c.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{card.icon}</span>
                <h4 className={`font-bold ${c.text}`}>{card.name}</h4>
              </div>
              <p className="text-sm text-slate-600 mb-2"><strong>언제?</strong> {card.when}</p>
              <p className="text-xs text-slate-500 mb-2"><strong>데이터:</strong> {card.data}</p>
              <div className="text-xs text-slate-400">
                {card.examples.map((ex, j) => (<span key={j}>{j > 0 && ' · '}{ex}</span>))}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold text-slate-800 mt-10">차트 선택 의사결정 가이드</h2>
      <p>아래 질문을 순서대로 따라가면 적절한 차트를 찾을 수 있습니다.</p>

      <div className="my-6 space-y-2">
        {decisionTree.map((node, i) => (
          <div key={i} className="p-3 bg-white rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-xs shrink-0 mt-0.5">Q{i + 1}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{node.question}</p>
                <div className="flex gap-4 mt-1 text-xs">
                  <span className="text-accent-600">YES → {node.yes}</span>
                  <span className="text-slate-400">NO → {node.no}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ExerciseBlock title="실습 1: 직접 차트를 골라보세요">
        <p className="text-sm text-slate-500 mb-4">시나리오가 주어지면, 가장 적합한 차트 유형을 선택하세요. 선택한 차트를 미리 볼 수 있습니다!</p>
        <ChartPicker />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">데이터 유형과 차트 매칭</h2>
      <p>데이터의 유형을 보고 <strong>어떤 차트가 적합한지</strong> 판단하는 연습을 해봅시다. 핵심은 데이터의 <strong>목적</strong>과 <strong>변수 유형</strong>을 파악하는 것입니다.</p>

      <ExerciseBlock title="실습 2: 데이터를 알맞은 차트에 분류하기">
        <DragDropSort items={matchItems} categories={matchCategories} correctMapping={matchCorrect} instruction="아래 데이터 상황을 드래그하여 적합한 차트 유형에 놓으세요." />
        <RevealAnswer label="분류 기준 해설 보기">
          <ul className="space-y-2 text-sm">
            <li><strong>급식 만족도 변화(2020~2025)</strong> → 꺾은선: 시간에 따른 추세</li>
            <li><strong>혈액형 비율</strong> → 원형: 전체 대비 비율 (항목 4개)</li>
            <li><strong>키와 달리기 기록</strong> → 산점도: 두 수치형 변수의 관계</li>
            <li><strong>반별 봉사활동 시간</strong> → 막대: 범주별 크기 비교</li>
            <li><strong>수학 점수 분포</strong> → 막대(히스토그램): 수치 분포 표현</li>
            <li><strong>동아리별 가입자 수</strong> → 막대: 범주별 크기 비교</li>
          </ul>
        </RevealAnswer>
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">잘못된 차트 선택 찾기</h2>
      <p>실제로 많은 뉴스나 보고서에서 부적절한 차트가 사용됩니다. 잘못된 차트 선택을 <strong>비판적으로 판단</strong>하는 연습을 해봅시다.</p>

      <ExerciseBlock title="실습 3: 이 차트 선택, 괜찮을까?">
        <p className="text-sm text-slate-500 mb-4">각 상황에서 사용된 차트가 적절한지 판단해보세요.</p>
        <WrongChartQuiz items={wrongChartQuiz} />
      </ExerciseBlock>

      <InfoBox type="tip">
        차트 선택에서 가장 흔한 실수 세 가지:
        <br />1. 시간 변화 데이터를 원형 차트로 그리기 (꺾은선이 적합)
        <br />2. 너무 많은 항목(10개 이상)을 원형 차트에 넣기
        <br />3. 두 변수의 관계를 막대 차트로 그리기 (산점도가 적합)
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 5가지 주요 차트 유형과 각각의 용도</li>
          <li>✓ 차트 선택 의사결정 가이드 (질문 흐름도)</li>
          <li>✓ 데이터 특성(시간 변화, 비율, 관계, 비교)에 맞는 차트 매칭</li>
          <li>✓ 잘못된 차트 선택을 비판적으로 판단하는 능력</li>
        </ul>
      </div>
    </div>
  );
}

// ── 하위 컴포넌트: 잘못된 차트 퀴즈 ──
function WrongChartQuiz({ items }) {
  const [answers, setAnswers] = useState({});
  const handleAnswer = (idx, optionIdx) => { setAnswers((prev) => ({ ...prev, [idx]: optionIdx })); };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const selected = answers[idx];
        const answered = selected !== undefined;
        const isCorrect = selected === item.answer;
        return (
          <div key={idx} className={`p-4 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <div className="text-sm text-slate-500 mb-1">상황</div>
            <p className="font-medium text-sm mb-2">"{item.scenario}"</p>
            <p className="text-sm mb-3">{item.question}</p>
            <div className="flex gap-2">
              {item.options.map((opt, oi) => (
                <button key={oi} onClick={() => handleAnswer(idx, oi)} disabled={answered}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${answered && oi === item.answer ? 'bg-accent-500 text-white' : answered && oi === selected && !isCorrect ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100 text-slate-700'}`}>
                  {opt}
                </button>
              ))}
            </div>
            {answered && (<p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ ' : '❌ '}{item.explanation}</p>)}
          </div>
        );
      })}
    </div>
  );
}
