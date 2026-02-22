import { useState, useEffect, useRef, useMemo } from 'react';
import Plotly from 'plotly.js-dist-min';

/**
 * 이상치 탐정 컴포넌트
 * 슬라이더로 이상치 판정 기준을 조절하면 통계와 상관계수가 어떻게 변하는지 보여줌
 */

// 기본 데이터: 스마트폰 사용 vs 수면 (이상치 포함)
const defaultData = {
  x: [2, 3, 1.5, 4, 3.5, 2.5, 5, 3, 2, 4.5, 1, 3.5, 2.5, 4, 3, 8, 2, 3.5, 1.5, 4],
  y: [8, 7, 8.5, 6.5, 7, 7.5, 6, 7.5, 8, 6, 9, 7, 7.5, 6.5, 7.5, 9, 8, 7, 8.5, 6.5],
  xLabel: '스마트폰 사용(시간)',
  yLabel: '수면 시간(시간)',
};

function calcStats(vals) {
  const n = vals.length;
  if (n === 0) return { mean: 0, std: 0, q1: 0, q3: 0, iqr: 0 };
  const sorted = [...vals].sort((a, b) => a - b);
  const mean = vals.reduce((a, b) => a + b, 0) / n;
  const std = Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / n);
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  return { mean, std, q1, q3, iqr: q3 - q1 };
}

function calcR(x, y) {
  const n = x.length;
  if (n < 2) return null;
  const mx = x.reduce((a, b) => a + b, 0) / n;
  const my = y.reduce((a, b) => a + b, 0) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) {
    num += (x[i] - mx) * (y[i] - my);
    dx += (x[i] - mx) ** 2;
    dy += (y[i] - my) ** 2;
  }
  const d = Math.sqrt(dx * dy);
  return d === 0 ? 0 : num / d;
}

export default function OutlierDetective({ data = defaultData }) {
  const chartRef = useRef(null);
  const [threshold, setThreshold] = useState(1.5); // IQR 배수

  const stats = useMemo(() => calcStats(data.x), [data.x]);
  const lowerBound = stats.q1 - threshold * stats.iqr;
  const upperBound = stats.q3 + threshold * stats.iqr;

  const isOutlier = (val) => val < lowerBound || val > upperBound;

  const normalIdx = data.x.map((v, i) => i).filter((i) => !isOutlier(data.x[i]));
  const outlierIdx = data.x.map((v, i) => i).filter((i) => isOutlier(data.x[i]));

  const rAll = useMemo(() => calcR(data.x, data.y), [data]);
  const rFiltered = useMemo(
    () => calcR(normalIdx.map((i) => data.x[i]), normalIdx.map((i) => data.y[i])),
    [normalIdx, data]
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const traces = [
      {
        x: normalIdx.map((i) => data.x[i]),
        y: normalIdx.map((i) => data.y[i]),
        mode: 'markers',
        name: '정상',
        marker: { color: '#3b82f6', size: 9 },
        type: 'scatter',
      },
      {
        x: outlierIdx.map((i) => data.x[i]),
        y: outlierIdx.map((i) => data.y[i]),
        mode: 'markers',
        name: '이상치',
        marker: { color: '#ef4444', size: 12, symbol: 'x', line: { width: 2 } },
        type: 'scatter',
      },
    ];

    Plotly.react(chartRef.current, traces, {
      margin: { t: 10, r: 20, b: 50, l: 50 },
      height: 300,
      xaxis: { title: data.xLabel },
      yaxis: { title: data.yLabel },
      font: { family: 'Noto Sans KR', size: 11 },
      legend: { x: 0, y: 1.15, orientation: 'h' },
      shapes: [
        { type: 'line', x0: upperBound, x1: upperBound, y0: 0, y1: 1, yref: 'paper', line: { color: '#ef4444', dash: 'dot', width: 1 } },
        { type: 'line', x0: lowerBound, x1: lowerBound, y0: 0, y1: 1, yref: 'paper', line: { color: '#ef4444', dash: 'dot', width: 1 } },
      ],
    }, { responsive: true, displayModeBar: false });
  }, [data, threshold, normalIdx, outlierIdx, lowerBound, upperBound]);

  return (
    <div className="space-y-4">
      {/* 차트 */}
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />

      {/* 슬라이더 */}
      <div className="p-4 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">이상치 판정 기준 (IQR 배수)</span>
          <span className="text-sm font-bold text-primary-600">{threshold.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>엄격 (0.5)</span>
          <span>보통 (1.5)</span>
          <span>관대 (3.0)</span>
        </div>
      </div>

      {/* 결과 비교 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-slate-50 rounded-xl text-center">
          <div className="text-xs text-slate-400 mb-1">전체 데이터 상관계수</div>
          <div className="text-xl font-bold text-slate-700">{rAll?.toFixed(3) ?? '-'}</div>
          <div className="text-xs text-slate-400">{data.x.length}개 데이터</div>
        </div>
        <div className="p-3 bg-primary-50 rounded-xl text-center">
          <div className="text-xs text-primary-500 mb-1">이상치 제외 상관계수</div>
          <div className="text-xl font-bold text-primary-700">{rFiltered?.toFixed(3) ?? '-'}</div>
          <div className="text-xs text-primary-400">{normalIdx.length}개 데이터 (이상치 {outlierIdx.length}개 제외)</div>
        </div>
      </div>

      {/* 범위 정보 */}
      <div className="text-xs text-slate-500 p-2 bg-slate-50 rounded-lg">
        IQR = Q3({stats.q3.toFixed(1)}) - Q1({stats.q1.toFixed(1)}) = {stats.iqr.toFixed(1)}
        <br />
        정상 범위: {lowerBound.toFixed(1)} ~ {upperBound.toFixed(1)}
        <br />
        이 범위를 벗어나면 이상치로 판정
      </div>
    </div>
  );
}
