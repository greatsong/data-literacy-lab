import { useState, useEffect, useRef, useMemo } from 'react';
import Plotly from 'plotly.js-dist-min';

/**
 * 기초 통계 체험 위젯
 * - 슬라이더로 데이터 값을 조절하며 평균/중앙값/표준편차 변화를 관찰
 * - 히스토그램 실시간 업데이트
 */
export default function StatsWidget({ initialData = [3, 5, 7, 8, 9, 6, 4, 7, 5, 6], label = '값' }) {
  const chartRef = useRef(null);
  const [data, setData] = useState([...initialData]);

  const stats = useMemo(() => {
    const n = data.length;
    const sorted = [...data].sort((a, b) => a - b);
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const median = n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];
    const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
    const std = Math.sqrt(variance);
    return { mean, median, std, min: sorted[0], max: sorted[n - 1] };
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;
    Plotly.react(chartRef.current, [
      {
        x: data,
        type: 'histogram',
        marker: { color: '#3b82f6', line: { color: '#1d4ed8', width: 1 } },
        nbinsx: 8,
      },
    ], {
      margin: { t: 10, r: 10, b: 30, l: 40 },
      height: 200,
      xaxis: { title: label },
      yaxis: { title: '빈도' },
      font: { family: 'Noto Sans KR', size: 10 },
      shapes: [
        { type: 'line', x0: stats.mean, x1: stats.mean, y0: 0, y1: 1, yref: 'paper', line: { color: '#ef4444', width: 2 } },
        { type: 'line', x0: stats.median, x1: stats.median, y0: 0, y1: 1, yref: 'paper', line: { color: '#22c55e', width: 2, dash: 'dash' } },
      ],
      annotations: [
        { x: stats.mean, y: 1, yref: 'paper', text: '평균', showarrow: false, font: { color: '#ef4444', size: 10 }, yshift: 10 },
        { x: stats.median, y: 0.9, yref: 'paper', text: '중앙값', showarrow: false, font: { color: '#22c55e', size: 10 }, yshift: 10 },
      ],
    }, { responsive: true, displayModeBar: false });
  }, [data, stats, label]);

  const handleSlider = (idx, value) => {
    setData((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const addRandom = () => {
    setData((prev) => [...prev, Math.round(Math.random() * 10)]);
  };

  const reset = () => setData([...initialData]);

  return (
    <div className="space-y-3">
      {/* 차트 */}
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />

      {/* 통계 수치 */}
      <div className="grid grid-cols-5 gap-2 text-center">
        <StatBox label="평균" value={stats.mean.toFixed(1)} color="text-red-600" />
        <StatBox label="중앙값" value={stats.median.toFixed(1)} color="text-green-600" />
        <StatBox label="표준편차" value={stats.std.toFixed(1)} color="text-blue-600" />
        <StatBox label="최솟값" value={stats.min} color="text-slate-600" />
        <StatBox label="최댓값" value={stats.max} color="text-slate-600" />
      </div>

      {/* 슬라이더들 */}
      <div className="p-3 bg-slate-50 rounded-xl">
        <div className="text-xs font-medium text-slate-500 mb-2">
          슬라이더를 움직여 값을 바꿔보세요 ({data.length}개 데이터)
        </div>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {data.map((val, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-slate-400 w-6 text-right">{i + 1}</span>
              <input
                type="range"
                min="0"
                max="15"
                value={val}
                onChange={(e) => handleSlider(i, parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs font-mono text-slate-600 w-6">{val}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <button onClick={addRandom} className="px-3 py-1 text-xs bg-primary-100 hover:bg-primary-200 rounded-lg cursor-pointer">
            + 랜덤 데이터 추가
          </button>
          <button onClick={reset} className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer">
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className="p-2 bg-white rounded-lg border border-slate-200">
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`text-sm font-bold ${color}`}>{value}</div>
    </div>
  );
}
