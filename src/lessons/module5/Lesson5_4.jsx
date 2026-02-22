import { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';

// ── 사례 1: 잘린 Y축 ──
const truncatedY = {
  misleading: {
    data: [{ x: ['후보 A', '후보 B', '후보 C'], y: [47.2, 45.8, 44.1], type: 'bar', marker: { color: ['#3b82f6', '#ef4444', '#22c55e'] } }],
    layout: { yaxis: { title: '지지율(%)', range: [43, 48] }, title: { text: '후보별 지지율 (조작된 차트)', font: { size: 13 } } },
  },
  honest: {
    data: [{ x: ['후보 A', '후보 B', '후보 C'], y: [47.2, 45.8, 44.1], type: 'bar', marker: { color: ['#3b82f6', '#ef4444', '#22c55e'] } }],
    layout: { yaxis: { title: '지지율(%)', range: [0, 100] }, title: { text: '후보별 지지율 (정직한 차트)', font: { size: 13 } } },
  },
};

// ── 사례 2: 체리 피킹 ──
const cherryPicked = {
  misleading: {
    data: [{ x: ['7월', '8월', '9월', '10월'], y: [320, 380, 410, 450], type: 'scatter', mode: 'lines+markers', line: { color: '#22c55e', width: 3 }, marker: { size: 8 } }],
    layout: { yaxis: { title: '매출(만원)' }, title: { text: '매출이 꾸준히 성장 중! (조작)', font: { size: 13 } } },
  },
  honest: {
    data: [{ x: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월'], y: [500,480,420,350,310,290,320,380,410,450], type: 'scatter', mode: 'lines+markers', line: { color: '#ef4444', width: 2 }, marker: { size: 6 } }],
    layout: { yaxis: { title: '매출(만원)' }, title: { text: '올해 전체 매출 추이 (정직)', font: { size: 13 } } },
  },
};

// ── 사례 3: 시각적 왜곡 ──
const distortedSize = {
  misleading: {
    data: [{ labels: ['우리 회사', '경쟁사 A', '경쟁사 B', '기타'], values: [28, 32, 25, 15], type: 'pie', rotation: 180, pull: [0.15, 0, 0, 0], marker: { colors: ['#3b82f6', '#94a3b8', '#cbd5e1', '#e2e8f0'] }, textinfo: 'label+percent', textfont: { size: 14 } }],
    layout: { title: { text: '시장 점유율 (조작: 우리 회사 강조)', font: { size: 13 } }, showlegend: false },
  },
  honest: {
    data: [{ labels: ['우리 회사', '경쟁사 A', '경쟁사 B', '기타'], values: [28, 32, 25, 15], type: 'pie', marker: { colors: ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b'] }, textinfo: 'label+percent' }],
    layout: { title: { text: '시장 점유율 (정직한 표현)', font: { size: 13 } }, showlegend: false },
  },
};

// ── 사례 4: 거짓 인과관계 ──
const dualAxis = {
  misleading: {
    data: [
      { x: ['1월','3월','5월','7월','9월','11월'], y: [20,35,65,95,55,15], type: 'scatter', mode: 'lines+markers', name: '아이스크림 판매량', line: { color: '#3b82f6', width: 2 }, marker: { size: 6 } },
      { x: ['1월','3월','5월','7월','9월','11월'], y: [2,5,12,18,8,1], type: 'scatter', mode: 'lines+markers', name: '익사 사고 건수', yaxis: 'y2', line: { color: '#ef4444', width: 2 }, marker: { size: 6 } },
    ],
    layout: { yaxis: { title: '판매량(만 개)', side: 'left' }, yaxis2: { title: '사고 건수', overlaying: 'y', side: 'right' }, title: { text: '아이스크림이 익사를 유발?! (조작)', font: { size: 13 } }, legend: { x: 0, y: 1.15, orientation: 'h' } },
  },
  honest: {
    data: [
      { x: ['1월','3월','5월','7월','9월','11월'], y: [20,35,65,95,55,15], type: 'bar', name: '아이스크림 판매량(만 개)', marker: { color: '#3b82f6' } },
      { x: ['1월','3월','5월','7월','9월','11월'], y: [2,5,12,18,8,1], type: 'bar', name: '익사 사고 건수', marker: { color: '#ef4444' } },
    ],
    layout: { barmode: 'group', title: { text: '두 변수 모두 "기온"의 영향 (정직)', font: { size: 13 } }, legend: { x: 0, y: 1.15, orientation: 'h' } },
  },
};

// ── 전체 사례 목록 ──
const allCases = [
  {
    id: 'truncated', ...truncatedY,
    trick: '잘린 Y축 (Truncated Y-Axis)',
    description: 'Y축을 0에서 시작하지 않고, 데이터 범위에 맞춰 잘라냅니다. 작은 차이가 매우 큰 것처럼 보이게 됩니다.',
    problem: '후보 A(47.2%)와 후보 C(44.1%)의 차이는 실제로 3.1%p에 불과하지만, 잘린 Y축 때문에 후보 A가 압도적으로 앞서는 것처럼 보입니다.',
    howToSpot: 'Y축이 0에서 시작하는지 확인하세요!',
    quizQuestion: '이 막대 차트에서 속이는 기법은 무엇인가요?',
    quizOptions: ['Y축을 0이 아닌 43부터 시작함', '데이터를 지어냄', '색깔로 혼란을 줌', '범례가 없음'],
    quizAnswer: 0,
    quizExplanation: 'Y축이 43부터 시작하여 3%p 차이가 마치 몇 배 차이인 것처럼 보입니다. Y축을 0부터 시작하면 실제 차이가 작다는 것을 알 수 있습니다.',
  },
  {
    id: 'cherry', ...cherryPicked,
    trick: '체리 피킹 (Cherry-Picking)',
    description: '자신에게 유리한 기간의 데이터만 선택적으로 보여줍니다. 전체 추세와 반대되는 결론을 이끌어낼 수 있습니다.',
    problem: '7~10월의 상승 구간만 보여주면 "꾸준한 성장"처럼 보이지만, 1~6월에는 큰 폭으로 하락했습니다. 연초(500만원) 대비 10월(450만원)은 오히려 감소입니다!',
    howToSpot: '차트의 시작점과 끝점을 확인하세요. 전체 기간이 표시되어 있나요?',
    quizQuestion: '이 매출 차트에서 사용된 속이는 기법은?',
    quizOptions: ['Y축을 잘라냄', '유리한 기간만 선택적으로 보여줌', '단위를 바꿈', '3D 효과로 왜곡함'],
    quizAnswer: 1,
    quizExplanation: '7~10월만 보여주면 매출이 성장 중인 것처럼 보이지만, 전체 데이터를 보면 연초 대비 오히려 감소 추세입니다. 이것이 체리 피킹입니다.',
  },
  {
    id: 'distorted', ...distortedSize,
    trick: '시각적 왜곡 (Visual Distortion)',
    description: '특정 항목을 끌어내거나(pull out), 색상 대비를 강조하거나, 3D 효과를 사용하여 실제보다 크게/작게 보이게 합니다.',
    problem: '우리 회사는 28%로 실제로는 경쟁사 A(32%)보다 작지만, 조각을 끌어내고 진한 색을 사용하여 가장 큰 것처럼 보이게 만들었습니다.',
    howToSpot: '실제 수치(%)를 직접 비교하세요. 시각적 크기에만 의존하지 마세요!',
    quizQuestion: '이 원형 차트에서 "우리 회사"가 가장 커 보이는 이유는?',
    quizOptions: ['실제로 점유율이 가장 높아서', '조각을 끌어내고 진한 색으로 강조해서', '데이터를 조작해서', '범례를 숨겨서'],
    quizAnswer: 1,
    quizExplanation: '우리 회사(28%)는 실제로 경쟁사 A(32%)보다 작지만, 조각을 바깥으로 끌어내고 진한 파란색을 사용하여 시각적으로 가장 눈에 띄게 만들었습니다.',
  },
  {
    id: 'correlation', ...dualAxis,
    trick: '거짓 인과관계 (Spurious Correlation)',
    description: '두 변수를 같은 차트에 겹쳐 놓으면, 마치 인과관계가 있는 것처럼 보입니다. 하지만 상관관계는 인과관계가 아닙니다!',
    problem: '아이스크림 판매량과 익사 사고가 같이 증가하지만, 아이스크림이 익사를 유발하는 것이 아닙니다. 둘 다 "더운 날씨(기온)"라는 공통 원인의 영향을 받을 뿐입니다.',
    howToSpot: '"A가 증가할 때 B도 증가"는 상관관계일 뿐, A가 B의 원인이라는 뜻은 아닙니다.',
    quizQuestion: '아이스크림 판매량과 익사 사고의 진짜 관계는?',
    quizOptions: ['아이스크림이 익사를 유발한다', '익사 사고가 아이스크림 판매를 증가시킨다', '둘 다 기온이라는 제3의 변수의 영향을 받는다', '아무 관계도 없다'],
    quizAnswer: 2,
    quizExplanation: '두 변수 모두 "기온 상승"의 영향을 받습니다. 더우면 아이스크림을 더 먹고, 수영/물놀이를 더 많이 하여 사고도 증가합니다. 이것이 "제3변수 문제"입니다.',
  },
];

export default function Lesson4_4() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentCase = allCases[currentIdx];

  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        차트는 데이터를 효과적으로 전달하는 도구이지만,
        의도적으로 <strong>사람을 속이는 도구</strong>로도 사용될 수 있습니다.
        잘못 만들어진 차트를 무비판적으로 받아들이면,
        <strong> 완전히 틀린 결론</strong>에 도달할 수 있습니다.
      </p>
      <p>
        이번 레슨에서는 현실에서 자주 등장하는
        <strong> 4가지 차트 속임수</strong>를 배우고, 이를 식별하는 눈을 기릅니다.
      </p>

      <InfoBox type="warning">
        뉴스, 광고, SNS에서 보는 차트 중 상당수가 의도적이든 무의식적이든 왜곡을 포함하고 있습니다.
        <strong> 비판적 시각</strong>이 필수입니다!
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-10">차트 속임수 4가지 유형</h2>

      <div className="grid gap-3 sm:grid-cols-2 my-6">
        {allCases.map((c, i) => (
          <button key={c.id} onClick={() => setCurrentIdx(i)}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${currentIdx === i ? 'border-primary-400 bg-primary-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
            <div className="text-sm font-bold text-slate-800">{i + 1}. {c.trick}</div>
            <p className="text-xs text-slate-500 mt-1">{c.description}</p>
          </button>
        ))}
      </div>

      <ExerciseBlock title={`사례 분석: ${currentCase.trick}`}>
        <p className="text-sm text-slate-600 mb-4">{currentCase.description}</p>

        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div>
            <div className="text-xs font-semibold text-red-600 mb-2 text-center">조작된 차트</div>
            <MiniChart data={currentCase.misleading.data} layout={currentCase.misleading.layout} id={`misleading-${currentCase.id}`} />
          </div>
          <div>
            <div className="text-xs font-semibold text-green-600 mb-2 text-center">정직한 차트</div>
            <MiniChart data={currentCase.honest.data} layout={currentCase.honest.layout} id={`honest-${currentCase.id}`} />
          </div>
        </div>

        <div className="p-3 bg-red-50 rounded-xl border border-red-200 mb-4">
          <div className="text-xs font-semibold text-red-700 mb-1">무엇이 문제인가?</div>
          <p className="text-sm text-slate-700">{currentCase.problem}</p>
        </div>

        <div className="p-3 bg-accent-50 rounded-xl border border-accent-200 mb-4">
          <div className="text-xs font-semibold text-accent-700 mb-1">어떻게 발견하나?</div>
          <p className="text-sm text-slate-700">{currentCase.howToSpot}</p>
        </div>

        <CaseQuiz question={currentCase.quizQuestion} options={currentCase.quizOptions} answer={currentCase.quizAnswer} explanation={currentCase.quizExplanation} key={currentCase.id} />

        <div className="flex justify-between mt-4">
          <button onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
            ← 이전 사례
          </button>
          <span className="text-xs text-slate-400 self-center">{currentIdx + 1} / {allCases.length}</span>
          <button onClick={() => setCurrentIdx(Math.min(allCases.length - 1, currentIdx + 1))} disabled={currentIdx === allCases.length - 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
            다음 사례 →
          </button>
        </div>
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">종합: 속임수를 찾아라!</h2>
      <p>아래 상황들을 보고, 어떤 속임수가 사용되었는지 맞춰보세요.</p>

      <ExerciseBlock title="종합 퀴즈: 이 차트의 문제는?">
        <ComprehensiveQuiz />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">차트를 볼 때 확인해야 할 체크리스트</h2>

      <div className="my-6 space-y-2">
        {[
          { check: 'Y축이 0에서 시작하는가?', why: '잘린 Y축은 차이를 과장합니다' },
          { check: '전체 기간의 데이터가 표시되어 있는가?', why: '일부 기간만 보여주면 추세가 왜곡됩니다' },
          { check: '3D 효과나 특수한 시각 강조가 있는가?', why: '시각적 효과가 크기 인식을 왜곡합니다' },
          { check: '"상관관계"를 "인과관계"로 해석하고 있지 않은가?', why: '함께 변한다고 원인-결과는 아닙니다' },
          { check: '축의 눈금 간격이 일정한가?', why: '불균등한 간격은 변화율을 왜곡합니다' },
          { check: '출처와 조사 방법이 명시되어 있는가?', why: '출처 없는 데이터는 신뢰하기 어렵습니다' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="text-lg shrink-0">{i < 3 ? '🔍' : i < 5 ? '⚠️' : '📋'}</div>
            <div>
              <div className="text-sm font-semibold text-slate-800">{item.check}</div>
              <div className="text-xs text-slate-500">{item.why}</div>
            </div>
          </div>
        ))}
      </div>

      <InfoBox type="tip">
        <strong>핵심 원칙:</strong> 차트를 볼 때 "이 차트가 나에게 무엇을 설득하려 하는가?"를
        항상 자문하세요. 차트의 메시지를 그대로 받아들이지 말고,
        <strong> 데이터 자체</strong>를 먼저 확인하는 습관을 기르세요.
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 잘린 Y축: 작은 차이를 과장하는 기법</li>
          <li>✓ 체리 피킹: 유리한 데이터만 선택적으로 보여주는 기법</li>
          <li>✓ 시각적 왜곡: 3D, 색상, 크기 조작으로 인식을 왜곡하는 기법</li>
          <li>✓ 거짓 인과관계: 상관관계를 인과관계처럼 보이게 하는 기법</li>
          <li>✓ 차트를 비판적으로 읽기 위한 6가지 체크리스트</li>
        </ul>
      </div>
    </div>
  );
}

// ── MiniChart ──
function MiniChart({ data, layout, id }) {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const mergedLayout = { margin: { t: 35, r: 15, b: 40, l: 45 }, height: 250, font: { family: 'Noto Sans KR', size: 10 }, ...layout };
    Plotly.newPlot(chartRef.current, data, mergedLayout, { responsive: true, displayModeBar: false });
    return () => { if (chartRef.current) Plotly.purge(chartRef.current); };
  }, [data, layout, id]);
  return <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />;
}

// ── CaseQuiz ──
function CaseQuiz({ question, options, answer, explanation }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  const isCorrect = selected === answer;
  return (
    <div className={`p-4 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
      <p className="text-sm font-medium mb-3">{question}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button key={i} onClick={() => setSelected(i)} disabled={answered}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${answered && i === answer ? 'bg-accent-500 text-white' : answered && i === selected ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100 text-slate-700'}`}>
            {opt}
          </button>
        ))}
      </div>
      {answered && <p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ ' : '❌ '}{explanation}</p>}
    </div>
  );
}

// ── ComprehensiveQuiz ──
const comprehensiveQuestions = [
  { scenario: '한 뉴스에서 "올해 범죄율 급증!"이라며 보여준 차트의 Y축이 4.2%~4.9% 범위로 잘려 있었다.', question: '이 차트에서 사용된 속임수는?', options: ['잘린 Y축', '체리 피킹', '시각적 왜곡', '거짓 인과관계'], answer: 0, explanation: '4.2%에서 4.9%로의 변화(0.7%p)를 Y축을 잘라 마치 큰 변화인 것처럼 과장한 것입니다.' },
  { scenario: '한 다이어트 광고에서 "2주간 체중 감량 효과!"라며 2주 데이터만 보여줬다. 하지만 전체 3개월 데이터에서는 2주 후 다시 원래 체중으로 돌아갔다.', question: '이 차트에서 사용된 속임수는?', options: ['잘린 Y축', '체리 피킹', '시각적 왜곡', '거짓 인과관계'], answer: 1, explanation: '효과가 있어 보이는 2주 구간만 선택적으로 보여준 체리 피킹입니다.' },
  { scenario: '"한국의 초콜릿 소비량이 많을수록 노벨상 수상자가 많다"는 차트를 봤다.', question: '이 차트에서 사용된 속임수는?', options: ['잘린 Y축', '체리 피킹', '시각적 왜곡', '거짓 인과관계'], answer: 3, explanation: '초콜릿 소비와 노벨상은 인과관계가 아닙니다. 둘 다 "경제 수준"이라는 제3의 변수와 관련이 있을 뿐입니다.' },
  { scenario: '회사 발표에서 자사 제품의 원형 차트 조각이 유독 크고 화려한 색이었는데, 실제 수치를 보니 2위였다.', question: '이 차트에서 사용된 속임수는?', options: ['잘린 Y축', '체리 피킹', '시각적 왜곡', '거짓 인과관계'], answer: 2, explanation: '색상과 크기 강조로 실제 수치와 다른 인상을 주는 시각적 왜곡입니다.' },
];

function ComprehensiveQuiz() {
  const [answers, setAnswers] = useState({});
  const handleAnswer = (idx, optIdx) => { setAnswers((prev) => ({ ...prev, [idx]: optIdx })); };
  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = Object.entries(answers).filter(([idx, ans]) => ans === comprehensiveQuestions[Number(idx)].answer).length;

  return (
    <div className="space-y-4">
      {comprehensiveQuestions.map((q, idx) => {
        const selected = answers[idx];
        const answered = selected !== undefined;
        const isCorrect = selected === q.answer;
        return (
          <div key={idx} className={`p-4 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <div className="text-xs text-slate-400 mb-1">문제 {idx + 1}</div>
            <p className="text-sm text-slate-600 mb-2 italic">"{q.scenario}"</p>
            <p className="text-sm font-medium mb-3">{q.question}</p>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt, oi) => (
                <button key={oi} onClick={() => handleAnswer(idx, oi)} disabled={answered}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${answered && oi === q.answer ? 'bg-accent-500 text-white' : answered && oi === selected ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100 text-slate-700'}`}>
                  {opt}
                </button>
              ))}
            </div>
            {answered && <p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ ' : '❌ '}{q.explanation}</p>}
          </div>
        );
      })}
      {totalAnswered === comprehensiveQuestions.length && (
        <div className="p-4 bg-primary-50 rounded-xl text-center">
          <p className="font-bold text-primary-800">
            {totalCorrect === comprehensiveQuestions.length
              ? '모두 정답! 차트 속임수를 완벽하게 구별할 수 있습니다!'
              : `${totalCorrect}/${comprehensiveQuestions.length}개 정답! 틀린 문제를 다시 살펴보세요.`}
          </p>
        </div>
      )}
    </div>
  );
}
