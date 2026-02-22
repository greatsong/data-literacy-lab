import { useState, useEffect, useRef, useMemo } from 'react';
import Plotly from 'plotly.js-dist-min';

/**
 * 상관관계 인터랙티브 플레이그라운드
 * - 산점도에 점 클릭 추가/제거
 * - 상관계수 실시간 계산
 * - 프리셋 데이터 제공
 */

const presets = [
  {
    name: '양의 상관',
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [2.1, 3.8, 4.2, 5.5, 6.8, 7.1, 8.5, 9.2, 10.1, 11.3],
  },
  {
    name: '음의 상관',
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [10.5, 9.2, 8.8, 7.1, 6.5, 5.2, 4.8, 3.1, 2.5, 1.2],
  },
  {
    name: '상관 없음',
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [5.2, 3.1, 7.8, 4.5, 8.2, 2.9, 6.5, 5.8, 3.4, 7.1],
  },
  {
    name: '빈 캔버스',
    x: [],
    y: [],
  },
];

function calcCorrelation(x, y) {
  const n = x.length;
  if (n < 2) return null;
  const mx = x.reduce((a, b) => a + b, 0) / n;
  const my = y.reduce((a, b) => a + b, 0) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) {
    const xi = x[i] - mx, yi = y[i] - my;
    num += xi * yi;
    dx += xi * xi;
    dy += yi * yi;
  }
  const denom = Math.sqrt(dx * dy);
  return denom === 0 ? 0 : num / denom;
}

export default function CorrelationPlayground({
  xLabel = 'X',
  yLabel = 'Y',
  initialPreset = 0,
}) {
  const chartRef = useRef(null);
  const [points, setPoints] = useState({
    x: [...presets[initialPreset].x],
    y: [...presets[initialPreset].y],
  });

  const r = useMemo(() => calcCorrelation(points.x, points.y), [points]);

  const rColor = r === null ? 'slate' : r > 0.5 ? 'blue' : r < -0.5 ? 'red' : 'gray';
  const rLabel = r === null ? '-' : r.toFixed(3);
  const rStrength = r === null
    ? '데이터 부족'
    : Math.abs(r) > 0.7 ? '강한 상관' : Math.abs(r) > 0.3 ? '보통 상관' : '약한/무상관';

  useEffect(() => {
    if (!chartRef.current) return;

    const data = [
      {
        x: points.x,
        y: points.y,
        mode: 'markers',
        type: 'scatter',
        marker: { color: '#3b82f6', size: 10, line: { color: '#1d4ed8', width: 1 } },
        hovertemplate: `${xLabel}: %{x}<br>${yLabel}: %{y}<extra></extra>`,
      },
    ];

    // 추세선 (2개 이상 점이 있을 때)
    if (points.x.length >= 2) {
      const n = points.x.length;
      const mx = points.x.reduce((a, b) => a + b, 0) / n;
      const my = points.y.reduce((a, b) => a + b, 0) / n;
      let num = 0, den = 0;
      for (let i = 0; i < n; i++) {
        num += (points.x[i] - mx) * (points.y[i] - my);
        den += (points.x[i] - mx) ** 2;
      }
      const slope = den === 0 ? 0 : num / den;
      const intercept = my - slope * mx;
      const xMin = Math.min(...points.x) - 1;
      const xMax = Math.max(...points.x) + 1;
      data.push({
        x: [xMin, xMax],
        y: [slope * xMin + intercept, slope * xMax + intercept],
        mode: 'lines',
        line: { color: '#f59e0b', width: 2, dash: 'dash' },
        hoverinfo: 'skip',
      });
    }

    Plotly.react(chartRef.current, data, {
      margin: { t: 10, r: 20, b: 50, l: 50 },
      height: 350,
      xaxis: { title: xLabel, zeroline: false },
      yaxis: { title: yLabel, zeroline: false },
      font: { family: 'Noto Sans KR' },
      showlegend: false,
    }, {
      responsive: true,
      displayModeBar: false,
    });

    // 클릭으로 점 추가
    const handleClick = (event) => {
      if (event.points && event.points.length > 0) {
        // 기존 점 클릭 → 삭제
        const pi = event.points[0].pointIndex;
        setPoints((prev) => ({
          x: prev.x.filter((_, i) => i !== pi),
          y: prev.y.filter((_, i) => i !== pi),
        }));
      } else if (event.event) {
        // 빈 영역 클릭 → 추가
        const bb = chartRef.current.querySelector('.plotly .nsewdrag');
        if (!bb) return;
        const rect = bb.getBoundingClientRect();
        const layout = chartRef.current.layout || {};
        const xRange = layout.xaxis?.range || [0, 12];
        const yRange = layout.yaxis?.range || [0, 12];
        const px = (event.event.clientX - rect.left) / rect.width;
        const py = 1 - (event.event.clientY - rect.top) / rect.height;
        const newX = xRange[0] + px * (xRange[1] - xRange[0]);
        const newY = yRange[0] + py * (yRange[1] - yRange[0]);
        setPoints((prev) => ({
          x: [...prev.x, Math.round(newX * 10) / 10],
          y: [...prev.y, Math.round(newY * 10) / 10],
        }));
      }
    };

    chartRef.current.on('plotly_click', handleClick);
    return () => {
      if (chartRef.current) chartRef.current.removeAllListeners('plotly_click');
    };
  }, [points, xLabel, yLabel]);

  const loadPreset = (idx) => {
    setPoints({ x: [...presets[idx].x], y: [...presets[idx].y] });
  };

  return (
    <div className="space-y-3">
      {/* 프리셋 버튼 */}
      <div className="flex flex-wrap gap-2">
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => loadPreset(i)}
            className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-primary-100 rounded-lg transition-colors cursor-pointer"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 차트 */}
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />
      <p className="text-xs text-slate-400 text-center">빈 영역 클릭 = 점 추가, 점 클릭 = 점 삭제</p>

      {/* 상관계수 표시 */}
      <div className="flex items-center justify-center gap-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="text-center">
          <div className="text-xs text-slate-400">상관계수 (r)</div>
          <div className={`text-3xl font-bold ${r !== null && r > 0 ? 'text-blue-600' : r !== null && r < 0 ? 'text-red-600' : 'text-slate-400'}`}>
            {rLabel}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-400">해석</div>
          <div className="text-sm font-medium text-slate-700">{rStrength}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-400">데이터 점 수</div>
          <div className="text-sm font-medium text-slate-700">{points.x.length}개</div>
        </div>
      </div>
    </div>
  );
}
