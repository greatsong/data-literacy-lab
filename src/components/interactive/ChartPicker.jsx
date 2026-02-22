import { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

/**
 * 올바른 차트 선택 위젯
 * 데이터 시나리오가 주어지면, 적절한 차트 유형을 선택 → 결과 비교
 */

const chartTypes = ['bar', 'pie', 'scatter', 'line', 'histogram', 'box'];
const chartLabels = {
  bar: '막대 차트',
  pie: '원형 차트',
  scatter: '산점도',
  line: '꺾은선 차트',
  histogram: '히스토그램',
  box: '박스 플롯',
};

// 시나리오별 차트 프리셋 데이터
const scenarios = [
  {
    title: '학년별 평균 성적 비교',
    dataType: '범주형(학년) × 수치형(성적)',
    correct: 'bar',
    explanation: '범주별 수치를 비교할 때는 막대 차트가 가장 적합합니다.',
    plotData: {
      bar: [{ x: ['1학년', '2학년', '3학년'], y: [75, 82, 78], type: 'bar', marker: { color: ['#3b82f6', '#22c55e', '#f59e0b'] } }],
      pie: [{ labels: ['1학년', '2학년', '3학년'], values: [75, 82, 78], type: 'pie' }],
      scatter: [{ x: [1, 2, 3], y: [75, 82, 78], mode: 'markers', type: 'scatter', marker: { size: 12 } }],
      line: [{ x: ['1학년', '2학년', '3학년'], y: [75, 82, 78], type: 'scatter', mode: 'lines+markers' }],
    },
  },
  {
    title: '월별 기온 변화 추이',
    dataType: '시간(월) × 수치형(기온)',
    correct: 'line',
    explanation: '시간에 따른 변화 추이를 보려면 꺾은선 차트가 적합합니다.',
    plotData: {
      bar: [{ x: ['1월', '4월', '7월', '10월'], y: [-2, 13, 26, 15], type: 'bar' }],
      line: [{ x: ['1월', '4월', '7월', '10월'], y: [-2, 13, 26, 15], type: 'scatter', mode: 'lines+markers', line: { color: '#ef4444' } }],
      scatter: [{ x: [1, 4, 7, 10], y: [-2, 13, 26, 15], mode: 'markers', type: 'scatter', marker: { size: 12 } }],
      pie: [{ labels: ['1월', '4월', '7월', '10월'], values: [2, 13, 26, 15], type: 'pie' }],
    },
  },
  {
    title: '키와 몸무게의 관계',
    dataType: '수치형(키) × 수치형(몸무게)',
    correct: 'scatter',
    explanation: '두 수치형 변수의 관계를 보려면 산점도가 적합합니다.',
    plotData: {
      scatter: [{ x: [160, 165, 170, 172, 175, 180, 168, 163], y: [55, 60, 65, 68, 72, 78, 62, 57], mode: 'markers', type: 'scatter', marker: { size: 10, color: '#3b82f6' } }],
      bar: [{ x: ['160', '165', '170', '175', '180'], y: [55, 60, 65, 72, 78], type: 'bar' }],
      line: [{ x: [160, 165, 170, 175, 180], y: [55, 60, 65, 72, 78], type: 'scatter', mode: 'lines+markers' }],
      histogram: [{ x: [160, 165, 170, 172, 175, 180, 168, 163], type: 'histogram' }],
    },
  },
];

export default function ChartPicker() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const chartRef = useRef(null);
  const scenario = scenarios[currentIdx];

  useEffect(() => {
    if (!chartRef.current || !selected || !scenario.plotData[selected]) return;
    Plotly.react(chartRef.current, scenario.plotData[selected], {
      margin: { t: 20, r: 20, b: 40, l: 40 },
      height: 250,
      font: { family: 'Noto Sans KR', size: 11 },
    }, { responsive: true, displayModeBar: false });
  }, [selected, currentIdx, scenario]);

  const handleSubmit = () => setSubmitted(true);
  const handleNext = () => {
    setCurrentIdx((i) => (i + 1) % scenarios.length);
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      {/* 시나리오 */}
      <div className="p-4 bg-primary-50 rounded-xl">
        <div className="text-xs text-primary-400 mb-1">시나리오 {currentIdx + 1}/{scenarios.length}</div>
        <h4 className="font-bold text-slate-800">{scenario.title}</h4>
        <p className="text-sm text-slate-500 mt-1">데이터 유형: {scenario.dataType}</p>
      </div>

      {/* 차트 유형 선택 */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(scenario.plotData).map((type) => (
          <button
            key={type}
            onClick={() => { setSelected(type); setSubmitted(false); }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
              selected === type
                ? 'bg-primary-500 text-white'
                : 'bg-slate-100 hover:bg-primary-100 text-slate-700'
            }`}
          >
            {chartLabels[type] || type}
          </button>
        ))}
      </div>

      {/* 미리보기 */}
      {selected && (
        <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />
      )}

      {/* 확인 */}
      {selected && !submitted && (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium rounded-lg cursor-pointer"
        >
          이 차트가 적합한가요?
        </button>
      )}

      {submitted && (
        <div className={`p-3 rounded-xl text-sm ${selected === scenario.correct ? 'bg-accent-50 text-accent-800' : 'bg-red-50 text-red-800'}`}>
          {selected === scenario.correct ? '✅ 정답! ' : `❌ 아쉬워요. 정답은 "${chartLabels[scenario.correct]}"입니다. `}
          {scenario.explanation}
          <button
            onClick={handleNext}
            className="block mt-2 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            다음 시나리오 →
          </button>
        </div>
      )}
    </div>
  );
}
