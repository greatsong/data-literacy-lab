import { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

// 학생 데이터: 수면시간, 운동일수 → 성적만족도(높음/낮음)
const studentData = [
  { sleep: 8, exercise: 4, label: '높음' }, { sleep: 7.5, exercise: 3, label: '높음' },
  { sleep: 7, exercise: 5, label: '높음' }, { sleep: 8.5, exercise: 2, label: '높음' },
  { sleep: 6.5, exercise: 4, label: '높음' }, { sleep: 7, exercise: 3, label: '높음' },
  { sleep: 7.5, exercise: 4, label: '높음' }, { sleep: 8, exercise: 3, label: '높음' },
  { sleep: 5, exercise: 1, label: '낮음' }, { sleep: 4.5, exercise: 0, label: '낮음' },
  { sleep: 6, exercise: 1, label: '낮음' }, { sleep: 5.5, exercise: 2, label: '낮음' },
  { sleep: 5, exercise: 0, label: '낮음' }, { sleep: 4, exercise: 1, label: '낮음' },
  { sleep: 6, exercise: 0, label: '낮음' }, { sleep: 5.5, exercise: 1, label: '낮음' },
  { sleep: 6.5, exercise: 2, label: '?' }, { sleep: 7, exercise: 1, label: '?' },
  { sleep: 5, exercise: 3, label: '?' }, { sleep: 8, exercise: 0, label: '?' },
];

export default function Lesson8_2() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        <strong>분류(Classification)</strong>는 머신러닝에서 가장 기본적인 작업입니다.
        "이것은 A인가 B인가?"를 데이터에서 학습하여 새로운 데이터를 판별하는 것입니다.
      </p>

      <InfoBox type="key">
        <strong>분류</strong>: 데이터를 미리 정해진 카테고리 중 하나로 분류하는 작업
        <br />예시: 스팸/정상 메일 분류, 질병/정상 진단, 합격/불합격 예측
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-8">의사결정 트리란?</h2>
      <p>
        의사결정 트리는 <strong>"질문을 순서대로 던져서 분류하는"</strong> 방법입니다.
        스무고개와 비슷합니다!
      </p>

      <div className="my-4 p-4 bg-white rounded-xl border border-slate-200">
        <h4 className="font-bold text-sm text-slate-800 mb-3">🌳 의사결정 트리 예시: 과일 분류</h4>
        <div className="flex flex-col items-center text-sm">
          <div className="p-2 bg-primary-100 rounded-lg text-primary-800 font-medium">색깔이 빨간가?</div>
          <div className="flex gap-12 mt-2">
            <div className="flex flex-col items-center">
              <span className="text-accent-600 text-xs font-bold">예 ↙</span>
              <div className="p-2 bg-primary-50 rounded-lg text-primary-700 mt-1">크기가 작은가?</div>
              <div className="flex gap-6 mt-1">
                <div className="flex flex-col items-center">
                  <span className="text-accent-600 text-xs">예 ↙</span>
                  <div className="p-1.5 bg-red-100 rounded-lg text-red-700 text-xs mt-1">🍒 체리</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-red-500 text-xs">아니오 ↘</span>
                  <div className="p-1.5 bg-red-100 rounded-lg text-red-700 text-xs mt-1">🍎 사과</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-500 text-xs font-bold">아니오 ↘</span>
              <div className="p-2 bg-primary-50 rounded-lg text-primary-700 mt-1">색깔이 노란가?</div>
              <div className="flex gap-6 mt-1">
                <div className="flex flex-col items-center">
                  <span className="text-accent-600 text-xs">예 ↙</span>
                  <div className="p-1.5 bg-yellow-100 rounded-lg text-yellow-700 text-xs mt-1">🍌 바나나</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-red-500 text-xs">아니오 ↘</span>
                  <div className="p-1.5 bg-purple-100 rounded-lg text-purple-700 text-xs mt-1">🍇 포도</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mt-10">실전: 학생 성적만족도 분류</h2>
      <p>
        아래 데이터에서 <strong>수면 시간</strong>과 <strong>주당 운동일수</strong>를 기준으로
        성적 만족도가 "높음"인지 "낮음"인지 분류해봅시다.
      </p>

      <ClassificationPlayground data={studentData} />

      <ExerciseBlock title="실습: 나만의 분류 경계 만들기">
        <DecisionBoundaryBuilder data={studentData} />
      </ExerciseBlock>

      <InfoBox type="tip">
        의사결정 트리의 장점은 <strong>해석이 쉽다</strong>는 것입니다.
        "수면시간이 6.5시간 이상이면 성적만족도가 높을 확률이 높다"처럼
        규칙을 사람이 이해할 수 있습니다.
        <br />하지만 데이터가 복잡해지면 트리가 너무 커져서 <strong>과적합</strong>(외울 뿐 일반화 못 함)의 위험이 있습니다.
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 분류(Classification)의 개념</li>
          <li>✓ 의사결정 트리의 원리 (스무고개)</li>
          <li>✓ 산점도로 분류 경계 시각화</li>
          <li>✓ 분류 기준을 직접 정해보는 실습</li>
        </ul>
      </div>
    </div>
  );
}

function ClassificationPlayground({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const high = data.filter((d) => d.label === '높음');
    const low = data.filter((d) => d.label === '낮음');
    const unknown = data.filter((d) => d.label === '?');

    Plotly.newPlot(chartRef.current, [
      {
        x: high.map((d) => d.sleep), y: high.map((d) => d.exercise),
        mode: 'markers', name: '만족도 높음',
        marker: { color: '#22c55e', size: 12, symbol: 'circle' },
        type: 'scatter',
      },
      {
        x: low.map((d) => d.sleep), y: low.map((d) => d.exercise),
        mode: 'markers', name: '만족도 낮음',
        marker: { color: '#ef4444', size: 12, symbol: 'x' },
        type: 'scatter',
      },
      {
        x: unknown.map((d) => d.sleep), y: unknown.map((d) => d.exercise),
        mode: 'markers', name: '❓ 예측 대상',
        marker: { color: '#f59e0b', size: 14, symbol: 'diamond', line: { width: 2, color: '#000' } },
        type: 'scatter',
      },
    ], {
      margin: { t: 30, r: 20, b: 50, l: 50 }, height: 350,
      xaxis: { title: '수면 시간 (시간)', range: [3.5, 9.5] },
      yaxis: { title: '주당 운동일수', range: [-0.5, 6] },
      legend: { x: 0, y: 1.15, orientation: 'h' },
      font: { family: 'Noto Sans KR', size: 11 },
    }, { responsive: true, displayModeBar: false });
  }, [data]);

  return (
    <div className="my-4">
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />
      <p className="text-xs text-slate-500 mt-2">
        🟢 초록 원: 성적만족도 높음 | ❌ 빨간 X: 성적만족도 낮음 | 🔶 노란 다이아: 예측 대상
      </p>
    </div>
  );
}

function DecisionBoundaryBuilder({ data }) {
  const [sleepThreshold, setSleepThreshold] = useState(6.5);
  const chartRef = useRef(null);

  const known = data.filter((d) => d.label !== '?');
  const unknown = data.filter((d) => d.label === '?');

  const predictions = unknown.map((d) => ({
    ...d,
    predicted: d.sleep >= sleepThreshold ? '높음' : '낮음',
  }));

  // 정확도 계산 (known 데이터 기준)
  const correct = known.filter((d) =>
    (d.sleep >= sleepThreshold && d.label === '높음') ||
    (d.sleep < sleepThreshold && d.label === '낮음')
  ).length;
  const accuracy = ((correct / known.length) * 100).toFixed(0);

  useEffect(() => {
    if (!chartRef.current) return;
    const high = data.filter((d) => d.label === '높음');
    const low = data.filter((d) => d.label === '낮음');

    Plotly.newPlot(chartRef.current, [
      {
        x: high.map((d) => d.sleep), y: high.map((d) => d.exercise),
        mode: 'markers', name: '높음',
        marker: { color: '#22c55e', size: 10 }, type: 'scatter',
      },
      {
        x: low.map((d) => d.sleep), y: low.map((d) => d.exercise),
        mode: 'markers', name: '낮음',
        marker: { color: '#ef4444', size: 10, symbol: 'x' }, type: 'scatter',
      },
      ...predictions.map((p, i) => ({
        x: [p.sleep], y: [p.exercise],
        mode: 'markers', name: i === 0 ? '예측' : undefined, showlegend: i === 0,
        marker: { color: p.predicted === '높음' ? '#86efac' : '#fca5a5', size: 14, symbol: 'diamond', line: { width: 2, color: '#333' } },
        type: 'scatter',
      })),
      {
        x: [sleepThreshold, sleepThreshold], y: [-1, 6],
        mode: 'lines', name: '분류 경계',
        line: { color: '#6366f1', width: 3, dash: 'dash' }, type: 'scatter',
      },
    ], {
      margin: { t: 10, r: 20, b: 50, l: 50 }, height: 300,
      xaxis: { title: '수면 시간 (시간)', range: [3.5, 9.5] },
      yaxis: { title: '주당 운동일수', range: [-0.5, 6] },
      legend: { x: 0, y: 1.15, orientation: 'h' },
      font: { family: 'Noto Sans KR', size: 10 },
      shapes: [{
        type: 'rect', x0: sleepThreshold, x1: 10, y0: -1, y1: 6,
        fillcolor: 'rgba(34,197,94,0.05)', line: { width: 0 },
      }, {
        type: 'rect', x0: 3, x1: sleepThreshold, y0: -1, y1: 6,
        fillcolor: 'rgba(239,68,68,0.05)', line: { width: 0 },
      }],
    }, { responsive: true, displayModeBar: false });
  }, [sleepThreshold, data]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">
        수면 시간 기준으로 분류 경계선을 움직여보세요. 정확도가 어떻게 변하나요?
      </p>

      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-600 shrink-0">수면 시간 기준:</label>
        <input type="range" min={4} max={8} step={0.5} value={sleepThreshold}
          onChange={(e) => setSleepThreshold(Number(e.target.value))}
          className="flex-1" />
        <span className="text-sm font-mono font-bold text-primary-600 w-16">{sleepThreshold}시간</span>
      </div>

      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />

      <div className="grid grid-cols-2 gap-3">
        <div className={`p-3 rounded-lg text-center ${Number(accuracy) >= 80 ? 'bg-accent-50' : Number(accuracy) >= 60 ? 'bg-warm-50' : 'bg-red-50'}`}>
          <div className="text-2xl font-bold">{accuracy}%</div>
          <div className="text-xs text-slate-500">학습 데이터 정확도</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg">
          <div className="text-xs font-bold text-slate-600 mb-1">예측 결과</div>
          {predictions.map((p, i) => (
            <div key={i} className="text-xs text-slate-600">
              수면 {p.sleep}h, 운동 {p.exercise}일 → <span className={p.predicted === '높음' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{p.predicted}</span>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="note">
        경계를 {sleepThreshold}시간으로 설정하면, "{sleepThreshold}시간 이상 자는 학생은 만족도 높음"으로 분류합니다.
        {Number(accuracy) >= 80 ? ' 좋은 정확도입니다!' : Number(accuracy) >= 60 ? ' 괜찮지만 더 나은 기준이 있을 수 있어요.' : ' 정확도가 낮습니다. 기준을 조절해보세요.'}
      </InfoBox>
    </div>
  );
}
