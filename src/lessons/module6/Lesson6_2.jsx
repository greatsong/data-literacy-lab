import { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const causalQuiz = [
  { statement: '아이스크림 판매량이 증가하면 익사 사고도 증가한다', answer: 'correlation', explanation: '둘 다 여름(기온)이라는 제3변수에 의한 것. 아이스크림이 익사를 유발하지 않음.', third: '기온(여름)' },
  { statement: '흡연량이 늘면 폐암 발생률이 높아진다', answer: 'causation', explanation: '수십 년간의 연구로 흡연→폐암의 인과관계가 입증됨 (단순 상관이 아닌 실험+역학 증거)', third: null },
  { statement: '신발 크기가 클수록 수학 점수가 높다', answer: 'correlation', explanation: '나이가 많을수록 발이 크고, 나이가 많을수록 어려운 수학을 배움. 제3변수는 나이.', third: '나이' },
  { statement: '해적 수가 줄수록 지구 평균 온도가 올라갔다', answer: 'correlation', explanation: '유명한 "날아다니는 스파게티 괴물교"의 예시. 시간이 지나며 둘 다 변한 것일 뿐.', third: '시간의 흐름' },
  { statement: '백신 접종률이 높은 지역에서 전염병 발생이 줄었다', answer: 'causation', explanation: '무작위 대조 시험(RCT)으로 백신→예방 효과의 인과관계가 입증됨.', third: null },
];

export default function Lesson6_2() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        <strong>"상관관계는 인과관계가 아니다"</strong> — 데이터 리터러시에서 가장 중요한 원칙 중 하나입니다.
        두 변수가 함께 변한다고 해서, 하나가 다른 하나를 <strong>유발</strong>하는 것은 아닙니다.
      </p>

      {/* 아이스크림 시각화 */}
      <IceCreamChart />

      <InfoBox type="key">
        <strong>상관관계</strong>: X가 변할 때 Y도 함께 변하는 패턴이 보임
        <br /><strong>인과관계</strong>: X가 Y를 실제로 유발함 (원인→결과)
        <br /><br />상관관계는 <strong>관찰만으로</strong> 알 수 있지만,
        인과관계는 <strong>실험이나 추가 증거</strong>가 필요합니다.
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-8">숨겨진 제3변수 (교란변수)</h2>
      <p>
        두 변수가 함께 변하는 이유가 <strong>숨겨진 다른 변수</strong> 때문인 경우가 많습니다.
      </p>

      <div className="my-6 p-4 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="text-center p-3 bg-blue-50 rounded-xl w-28">
            <div className="text-2xl mb-1">🍦</div>
            <div className="font-medium">아이스크림</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-red-400 text-xs mb-1">상관 (r=0.87)</div>
            <div className="w-20 h-0.5 bg-red-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-300">✗</div>
            </div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-xl w-28">
            <div className="text-2xl mb-1">🏊</div>
            <div className="font-medium">익사 사고</div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="inline-block p-3 bg-warm-50 rounded-xl border border-warm-200">
            <div className="text-2xl">🌡️</div>
            <div className="text-sm font-bold text-warm-700">기온 (제3변수)</div>
          </div>
          <div className="flex justify-center gap-12 mt-1">
            <span className="text-accent-500 text-xs">↗ 원인</span>
            <span className="text-accent-500 text-xs">↗ 원인</span>
          </div>
        </div>
      </div>

      <ExerciseBlock title="실습 1: 상관인가, 인과인가?">
        <CausalQuiz items={causalQuiz} />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">심슨의 역설</h2>
      <p>
        전체 데이터에서 보이는 추세가, 하위 그룹으로 나누면 <strong>완전히 반대</strong>가 되는 놀라운 현상입니다.
      </p>

      <SimpsonDemo />

      <InfoBox type="think">
        <strong>인과관계를 밝히려면?</strong>
        <ul className="mt-1 space-y-0.5">
          <li>1. <strong>무작위 대조 시험(RCT)</strong>: 가장 강력한 방법 (의약품 임상시험)</li>
          <li>2. <strong>교란변수 통제</strong>: 제3변수의 영향을 제거</li>
          <li>3. <strong>시간적 선후관계</strong>: 원인이 결과보다 먼저 발생</li>
          <li>4. <strong>용량-반응 관계</strong>: 원인이 많을수록 결과도 커지는지</li>
        </ul>
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 상관관계 ≠ 인과관계</li>
          <li>✓ 제3변수(교란변수)의 개념</li>
          <li>✓ 심슨의 역설: 전체 vs 하위그룹 결론이 뒤집힐 수 있음</li>
          <li>✓ 인과관계를 밝히려면 실험이 필요</li>
        </ul>
      </div>
    </div>
  );
}

function IceCreamChart() {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
    Plotly.newPlot(chartRef.current, [
      { x: months, y: [20,25,40,60,100,150,200,210,130,70,30,22], name: '🍦 아이스크림 판매(만원)', yaxis: 'y', marker: { color: '#3b82f6' } },
      { x: months, y: [5,4,6,8,15,25,38,40,20,10,6,4], name: '🏊 익사 사고(건)', yaxis: 'y2', marker: { color: '#ef4444' } },
    ], {
      margin: { t: 30, r: 60, b: 40, l: 60 }, height: 250,
      yaxis: { title: '아이스크림(만원)', side: 'left' },
      yaxis2: { title: '익사(건)', overlaying: 'y', side: 'right' },
      legend: { x: 0, y: 1.15, orientation: 'h' },
      font: { family: 'Noto Sans KR', size: 10 },
    }, { responsive: true, displayModeBar: false });
  }, []);
  return <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200 my-4" />;
}

function CausalQuiz({ items }) {
  const [answers, setAnswers] = useState({});
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const answered = answers[i] !== undefined;
        const isCorrect = answers[i] === item.answer;
        return (
          <div key={i} className={`p-3 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <p className="text-sm mb-2">"{item.statement}"</p>
            <div className="flex gap-2">
              {['correlation', 'causation'].map((val) => (
                <button key={val} onClick={() => setAnswers((p) => ({ ...p, [i]: val }))} disabled={answered}
                  className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${answered && val === item.answer ? 'bg-accent-500 text-white' : answered && val === answers[i] ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100'}`}>
                  {val === 'correlation' ? '상관관계일 뿐' : '인과관계다'}
                </button>
              ))}
            </div>
            {answered && (
              <div className="text-xs text-slate-600 mt-2">
                {isCorrect ? '✅ ' : '❌ '}{item.explanation}
                {item.third && <span className="block mt-1 text-warm-600">🔑 제3변수: {item.third}</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SimpsonDemo() {
  const [showGroups, setShowGroups] = useState(false);
  return (
    <div className="my-6 p-4 bg-white rounded-xl border border-slate-200">
      <div className="text-sm font-medium text-slate-800 mb-3">약물 A vs 약물 B — 어떤 것이 더 효과적?</div>
      <div className="grid grid-cols-2 gap-4 text-center text-sm mb-3">
        <div className="p-3 bg-blue-50 rounded-xl">
          <div className="font-bold text-blue-700">약물 A</div>
          <div className="text-2xl font-bold text-blue-800 my-1">73%</div>
          <div className="text-xs text-blue-500">전체 치료율</div>
        </div>
        <div className="p-3 bg-green-50 rounded-xl">
          <div className="font-bold text-green-700">약물 B</div>
          <div className="text-2xl font-bold text-green-800 my-1">69%</div>
          <div className="text-xs text-green-500">전체 치료율</div>
        </div>
      </div>

      <button onClick={() => setShowGroups(!showGroups)}
        className="w-full py-2 bg-warm-100 hover:bg-warm-200 text-warm-700 text-sm rounded-lg cursor-pointer">
        {showGroups ? '전체만 보기' : '🔍 경증/중증 나눠서 보기'}
      </button>

      {showGroups && (
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2 bg-blue-50 rounded-lg text-center">
              <div className="font-bold text-blue-600">약물 A (경증)</div>
              <div className="text-lg font-bold">93%</div>
              <div className="text-blue-400">93/100명</div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-center">
              <div className="font-bold text-green-600">약물 B (경증)</div>
              <div className="text-lg font-bold text-green-700">95%</div>
              <div className="text-green-400">19/20명</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2 bg-blue-50 rounded-lg text-center">
              <div className="font-bold text-blue-600">약물 A (중증)</div>
              <div className="text-lg font-bold">30%</div>
              <div className="text-blue-400">3/10명</div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-center">
              <div className="font-bold text-green-600">약물 B (중증)</div>
              <div className="text-lg font-bold text-green-700">45%</div>
              <div className="text-green-400">36/80명</div>
            </div>
          </div>
          <div className="p-2 bg-warm-50 rounded-lg text-xs text-warm-700">
            ⚠️ <strong>역설!</strong> 경증에서도 B가 낫고, 중증에서도 B가 낫지만, 전체에서는 A가 높아 보입니다.
            <br />이유: 약물 A는 경증 환자(치료 쉬운)에게 많이 쓰이고, B는 중증에 많이 쓰여서 전체 비율이 왜곡됨.
          </div>
        </div>
      )}
    </div>
  );
}
