import { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import ChartQuiz from '../../components/interactive/ChartQuiz';

export default function Lesson6_3() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        "A반 평균이 B반보다 높다"고 하면 A반이 더 잘한 걸까요?
        <strong>평균만으로는 부족합니다.</strong> 분포를 함께 봐야 올바른 비교가 가능합니다.
      </p>

      <ExerciseBlock title="실습 1: 학년별 운동일수 비교">
        <ChartQuiz
          chartData={[{
            x: ['1학년', '2학년', '3학년'],
            y: [3.2, 2.8, 2.1],
            type: 'bar',
            marker: { color: ['#3b82f6', '#22c55e', '#f59e0b'] },
            text: ['3.2일', '2.8일', '2.1일'],
            textposition: 'outside',
          }]}
          chartLayout={{ yaxis: { title: '주당 운동일수', range: [0, 5] }, xaxis: { title: '학년' } }}
          questions={[
            { question: '어떤 학년의 운동일수가 가장 적은가요?', options: ['1학년', '2학년', '3학년'], answer: 2, explanation: '3학년이 주 2.1일로 가장 적습니다. 학년이 올라갈수록 감소하는 경향이 보입니다.' },
            { question: '1학년과 3학년의 운동일수 차이는?', options: ['약 0.5일', '약 1.1일', '약 2일'], answer: 1, explanation: '3.2 - 2.1 = 1.1일 차이입니다.' },
          ]}
        />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">평균이 같아도 분포는 다르다</h2>
      <SameAvgDiffDist />

      <InfoBox type="warning">
        <strong>평균의 함정</strong>: "우리 반 평균이 72점"이라고 하면, 모든 학생이 70점대인 반과
        40점·100점이 반반인 반이 같은 평균입니다.
        <br />반드시 <strong>분산(퍼진 정도)</strong>을 함께 확인하세요.
      </InfoBox>

      <ExerciseBlock title="실습 2: 박스 플롯으로 비교하기">
        <BoxPlotComparison />
      </ExerciseBlock>

      <InfoBox type="tip">
        <strong>그룹 비교 체크리스트:</strong>
        <ol className="mt-1 space-y-0.5">
          <li>1. 평균(대표값)을 비교한다</li>
          <li>2. 분포(박스 플롯 또는 히스토그램)를 확인한다</li>
          <li>3. 표본 크기를 확인한다 (각 그룹 몇 명?)</li>
          <li>4. 차이가 "우연"인지 "의미 있는" 차이인지 판단한다</li>
        </ol>
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 막대 차트로 그룹별 평균 비교</li>
          <li>✓ 평균이 같아도 분포가 다를 수 있음</li>
          <li>✓ 박스 플롯으로 분포까지 비교하는 방법</li>
          <li>✓ 그룹 비교 시 확인해야 할 4가지</li>
        </ul>
      </div>
    </div>
  );
}

function SameAvgDiffDist() {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const classA = [65, 68, 70, 71, 72, 73, 74, 75, 78, 80]; // 평균 72.6
    const classB = [40, 45, 55, 60, 72, 80, 90, 95, 98, 100]; // 평균 73.5
    Plotly.newPlot(chartRef.current, [
      { x: classA, type: 'histogram', name: 'A반 (고른 분포)', marker: { color: '#3b82f680' }, nbinsx: 8 },
      { x: classB, type: 'histogram', name: 'B반 (양극화)', marker: { color: '#ef444480' }, nbinsx: 8 },
    ], {
      barmode: 'overlay',
      margin: { t: 30, r: 20, b: 40, l: 40 }, height: 230,
      xaxis: { title: '점수' }, yaxis: { title: '학생 수' },
      legend: { x: 0, y: 1.15, orientation: 'h' },
      font: { family: 'Noto Sans KR', size: 10 },
    }, { responsive: true, displayModeBar: false });
  }, []);

  return (
    <div className="my-4">
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />
      <div className="grid grid-cols-2 gap-3 mt-2 text-center text-sm">
        <div className="p-2 bg-blue-50 rounded-lg">
          <div className="font-bold text-blue-700">A반</div>
          <div className="text-slate-600">평균 72.6 · 표준편차 4.5</div>
        </div>
        <div className="p-2 bg-red-50 rounded-lg">
          <div className="font-bold text-red-700">B반</div>
          <div className="text-slate-600">평균 73.5 · 표준편차 21.2</div>
        </div>
      </div>
    </div>
  );
}

function BoxPlotComparison() {
  const chartRef = useRef(null);
  const [answered, setAnswered] = useState(null);

  useEffect(() => {
    if (!chartRef.current) return;
    Plotly.newPlot(chartRef.current, [
      { y: [6, 6.5, 7, 7, 7.5, 7.5, 8, 8, 8.5, 9], type: 'box', name: '운동 O', marker: { color: '#22c55e' } },
      { y: [4, 5, 5.5, 6, 6, 6.5, 7, 7, 7.5, 8], type: 'box', name: '운동 X', marker: { color: '#ef4444' } },
    ], {
      margin: { t: 10, r: 20, b: 40, l: 40 }, height: 250,
      yaxis: { title: '수면 시간(시간)' },
      font: { family: 'Noto Sans KR', size: 10 },
    }, { responsive: true, displayModeBar: false });
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">운동하는 학생 vs 안 하는 학생의 수면 시간 비교</p>
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />
      <div className="p-3 bg-white rounded-xl border border-slate-200">
        <p className="text-sm mb-2">이 박스 플롯에서 읽을 수 있는 것은?</p>
        <div className="flex flex-wrap gap-1.5">
          {['운동O 그룹이 수면 시간이 더 김', '두 그룹의 분포가 비슷함', '운동X 그룹에 이상치가 있음'].map((opt, i) => (
            <button key={i} onClick={() => setAnswered(i)} disabled={answered !== null}
              className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${answered === 0 && i === 0 ? 'bg-accent-500 text-white' : answered !== null && i === answered ? 'bg-red-400 text-white' : answered !== null ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100'}`}>
              {opt}
            </button>
          ))}
        </div>
        {answered !== null && (
          <p className="text-xs text-slate-600 mt-2">
            {answered === 0 ? '✅ 맞습니다! 운동하는 그룹의 중앙값(7.75)이 안 하는 그룹(6.25)보다 높고, 전체적으로 분포가 위에 위치합니다.' : '❌ 박스 플롯을 보면 운동O 그룹의 상자 전체가 더 위에 있어, 수면 시간이 더 긴 것을 알 수 있습니다.'}
          </p>
        )}
      </div>
    </div>
  );
}
