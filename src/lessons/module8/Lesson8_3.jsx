import { useState, useEffect, useRef, useCallback } from 'react';
import Plotly from 'plotly.js-dist-min';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const initialData = [
  { x: 4, y: 50 }, { x: 5, y: 55 }, { x: 5.5, y: 58 },
  { x: 6, y: 62 }, { x: 6.5, y: 68 }, { x: 7, y: 72 },
  { x: 7, y: 70 }, { x: 7.5, y: 75 }, { x: 8, y: 80 },
  { x: 8, y: 78 }, { x: 8.5, y: 82 }, { x: 9, y: 88 },
];

function linearRegression(data) {
  const n = data.length;
  if (n < 2) return { slope: 0, intercept: 0, r2: 0 };
  const sumX = data.reduce((s, d) => s + d.x, 0);
  const sumY = data.reduce((s, d) => s + d.y, 0);
  const sumXY = data.reduce((s, d) => s + d.x * d.y, 0);
  const sumX2 = data.reduce((s, d) => s + d.x * d.x, 0);
  const sumY2 = data.reduce((s, d) => s + d.y * d.y, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const ssRes = data.reduce((s, d) => s + (d.y - (slope * d.x + intercept)) ** 2, 0);
  const ssTot = data.reduce((s, d) => s + (d.y - sumY / n) ** 2, 0);
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot;

  return { slope, intercept, r2 };
}

export default function Lesson8_3() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        <strong>회귀(Regression)</strong>는 연속적인 수치를 예측하는 ML 기법입니다.
        분류가 "A인가 B인가?"라면, 회귀는 <strong>"얼마인가?"</strong>를 예측합니다.
      </p>

      <div className="my-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-xl mb-1">📁</div>
            <div className="font-bold text-purple-700">분류</div>
            <div className="text-sm text-slate-600">"합격 or 불합격"</div>
            <div className="text-xs text-slate-400">→ 범주(카테고리) 예측</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-xl mb-1">📈</div>
            <div className="font-bold text-blue-700">회귀</div>
            <div className="text-sm text-slate-600">"78점? 92점?"</div>
            <div className="text-xs text-slate-400">→ 숫자(연속값) 예측</div>
          </div>
        </div>
      </div>

      <InfoBox type="key">
        <strong>선형 회귀</strong>는 가장 기본적인 회귀 방법으로,
        데이터에 <strong>가장 잘 맞는 직선</strong>을 찾습니다.
        <br />이 직선의 공식: <code className="bg-slate-100 px-1 rounded">y = ax + b</code> (a=기울기, b=절편)
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-8">선형 회귀의 원리</h2>
      <p>
        선형 회귀는 모든 데이터 점과 직선 사이의 <strong>거리(오차)를 최소화</strong>하는 직선을 찾습니다.
        이것을 "최소제곱법"이라고 합니다.
      </p>

      <ExerciseBlock title="실습 1: 직선 피팅 놀이터">
        <p className="text-sm text-slate-500 mb-3">
          기울기와 절편을 조절하여 데이터에 가장 잘 맞는 직선을 찾아보세요.
          자동 피팅과 비교해보세요!
        </p>
        <ManualFitPlayground />
      </ExerciseBlock>

      <ExerciseBlock title="실습 2: 수면 시간으로 시험 점수 예측">
        <p className="text-sm text-slate-500 mb-3">
          수면 시간과 시험 점수 데이터로 회귀 모델을 만들어, 새로운 수면 시간에 대한 점수를 예측해보세요.
        </p>
        <PredictionPlayground />
      </ExerciseBlock>

      <InfoBox type="warning">
        <strong>회귀 모델의 한계</strong>
        <ul className="mt-1 space-y-0.5 text-sm">
          <li>• 데이터 범위 밖의 예측(외삽)은 위험합니다 (수면 12시간 → 점수 120점?)</li>
          <li>• 직선이 항상 맞는 것은 아닙니다 (비선형 관계도 존재)</li>
          <li>• 상관관계가 있다고 인과관계는 아닙니다</li>
          <li>• R² 값이 높다고 항상 좋은 모델은 아닙니다</li>
        </ul>
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 회귀의 개념: 연속적 수치 예측</li>
          <li>✓ 선형 회귀: 데이터에 가장 잘 맞는 직선 찾기</li>
          <li>✓ 기울기, 절편, R² 값의 의미</li>
          <li>✓ 회귀 모델의 한계와 주의점</li>
        </ul>
      </div>
    </div>
  );
}

function ManualFitPlayground() {
  const chartRef = useRef(null);
  const [slope, setSlope] = useState(5);
  const [intercept, setIntercept] = useState(30);
  const [showAuto, setShowAuto] = useState(false);

  const auto = linearRegression(initialData);

  // 수동 오차 계산
  const manualError = initialData.reduce((s, d) => s + (d.y - (slope * d.x + intercept)) ** 2, 0);
  const autoError = initialData.reduce((s, d) => s + (d.y - (auto.slope * d.x + auto.intercept)) ** 2, 0);

  const updateChart = useCallback(() => {
    if (!chartRef.current) return;
    const traces = [
      {
        x: initialData.map((d) => d.x), y: initialData.map((d) => d.y),
        mode: 'markers', name: '데이터', marker: { color: '#3b82f6', size: 10 }, type: 'scatter',
      },
      {
        x: [3.5, 9.5], y: [slope * 3.5 + intercept, slope * 9.5 + intercept],
        mode: 'lines', name: '나의 직선',
        line: { color: '#f59e0b', width: 3 }, type: 'scatter',
      },
    ];
    if (showAuto) {
      traces.push({
        x: [3.5, 9.5], y: [auto.slope * 3.5 + auto.intercept, auto.slope * 9.5 + auto.intercept],
        mode: 'lines', name: '자동 피팅',
        line: { color: '#22c55e', width: 3, dash: 'dash' }, type: 'scatter',
      });
    }
    Plotly.newPlot(chartRef.current, traces, {
      margin: { t: 10, r: 20, b: 50, l: 50 }, height: 300,
      xaxis: { title: '수면 시간', range: [3.5, 9.5] },
      yaxis: { title: '시험 점수', range: [35, 100] },
      legend: { x: 0, y: 1.15, orientation: 'h' },
      font: { family: 'Noto Sans KR', size: 10 },
    }, { responsive: true, displayModeBar: false });
  }, [slope, intercept, showAuto, auto]);

  useEffect(() => { updateChart(); }, [updateChart]);

  return (
    <div className="space-y-3">
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-500">기울기 (a): {slope.toFixed(1)}</label>
          <input type="range" min={-5} max={15} step={0.5} value={slope}
            onChange={(e) => setSlope(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="text-xs text-slate-500">절편 (b): {intercept.toFixed(0)}</label>
          <input type="range" min={0} max={60} step={1} value={intercept}
            onChange={(e) => setIntercept(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        <div className={`p-2 rounded-lg ${manualError <= autoError * 1.1 ? 'bg-accent-50' : 'bg-warm-50'}`}>
          <div className="text-xs text-slate-500">나의 오차</div>
          <div className="font-bold text-lg">{manualError.toFixed(0)}</div>
          <div className="text-xs text-slate-400">y = {slope.toFixed(1)}x + {intercept.toFixed(0)}</div>
        </div>
        <div className="p-2 bg-green-50 rounded-lg">
          <div className="text-xs text-slate-500">자동 피팅 오차</div>
          <div className="font-bold text-lg">{autoError.toFixed(0)}</div>
          <div className="text-xs text-slate-400">y = {auto.slope.toFixed(1)}x + {auto.intercept.toFixed(0)}</div>
        </div>
      </div>

      <button onClick={() => setShowAuto(!showAuto)}
        className={`px-3 py-1.5 rounded-lg text-xs cursor-pointer ${showAuto ? 'bg-accent-500 text-white' : 'bg-slate-100 hover:bg-primary-100 text-slate-600'}`}>
        {showAuto ? '자동 피팅 숨기기' : '자동 피팅 보기'}
      </button>

      {manualError <= autoError * 1.05 && (
        <div className="p-2 bg-accent-50 rounded-lg text-sm text-accent-700 text-center">
          🎉 자동 피팅과 거의 비슷한 직선을 찾았습니다!
        </div>
      )}
    </div>
  );
}

function PredictionPlayground() {
  const chartRef = useRef(null);
  const [predictX, setPredictX] = useState(6.5);
  const reg = linearRegression(initialData);
  const predictY = reg.slope * predictX + reg.intercept;

  useEffect(() => {
    if (!chartRef.current) return;
    Plotly.newPlot(chartRef.current, [
      {
        x: initialData.map((d) => d.x), y: initialData.map((d) => d.y),
        mode: 'markers', name: '학습 데이터',
        marker: { color: '#3b82f6', size: 10 }, type: 'scatter',
      },
      {
        x: [3.5, 9.5], y: [reg.slope * 3.5 + reg.intercept, reg.slope * 9.5 + reg.intercept],
        mode: 'lines', name: '회귀선',
        line: { color: '#22c55e', width: 3 }, type: 'scatter',
      },
      {
        x: [predictX], y: [predictY],
        mode: 'markers', name: '예측값',
        marker: { color: '#f59e0b', size: 16, symbol: 'star', line: { width: 2, color: '#000' } },
        type: 'scatter',
      },
      {
        x: [predictX, predictX], y: [35, predictY],
        mode: 'lines', showlegend: false,
        line: { color: '#f59e0b', width: 1, dash: 'dot' }, type: 'scatter',
      },
    ], {
      margin: { t: 10, r: 20, b: 50, l: 50 }, height: 300,
      xaxis: { title: '수면 시간', range: [3.5, 9.5] },
      yaxis: { title: '시험 점수', range: [35, 100] },
      legend: { x: 0, y: 1.15, orientation: 'h' },
      font: { family: 'Noto Sans KR', size: 10 },
    }, { responsive: true, displayModeBar: false });
  }, [predictX, reg, predictY]);

  return (
    <div className="space-y-3">
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />

      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-600 shrink-0">수면 시간:</label>
        <input type="range" min={4} max={9} step={0.5} value={predictX}
          onChange={(e) => setPredictX(Number(e.target.value))} className="flex-1" />
        <span className="text-sm font-mono font-bold text-primary-600 w-16">{predictX}시간</span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="text-xs text-slate-500">회귀 공식</div>
          <div className="text-sm font-mono font-bold">y = {reg.slope.toFixed(1)}x + {reg.intercept.toFixed(0)}</div>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="text-xs text-slate-500">예측 점수</div>
          <div className="text-xl font-bold text-yellow-700">{predictY.toFixed(1)}점</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="text-xs text-slate-500">R² (설명력)</div>
          <div className="text-xl font-bold text-green-700">{(reg.r2 * 100).toFixed(0)}%</div>
        </div>
      </div>

      <InfoBox type="note">
        R² = {(reg.r2 * 100).toFixed(0)}%는 수면 시간이 시험 점수 변동의 약 {(reg.r2 * 100).toFixed(0)}%를 설명한다는 뜻입니다.
        나머지 {(100 - reg.r2 * 100).toFixed(0)}%는 다른 요인(공부 시간, 집중력 등)에 의해 결정됩니다.
      </InfoBox>
    </div>
  );
}
