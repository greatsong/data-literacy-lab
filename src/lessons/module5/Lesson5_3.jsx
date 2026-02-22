import { useState, useEffect, useRef, useCallback } from 'react';
import Plotly from 'plotly.js-dist-min';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';

// ── 학교 설문 데이터 (200명) ──
const surveyData = {
  학년: [...Array(67).fill('1학년'), ...Array(67).fill('2학년'), ...Array(66).fill('3학년')],
  교통수단: [
    '도보','버스','도보','지하철','자가용','버스','도보','자전거','버스','도보',
    '버스','지하철','도보','도보','버스','자가용','도보','버스','지하철','도보',
    '버스','도보','자전거','자가용','버스','도보','버스','지하철','도보','자가용',
    '도보','버스','도보','자전거','버스','도보','지하철','버스','도보','자가용',
    '도보','버스','도보','지하철','버스','도보','자전거','버스','도보','자가용',
    '버스','도보','지하철','도보','버스','자전거','도보','도보','버스','지하철',
    '도보','버스','도보','자가용','도보','버스','도보',
    '버스','지하철','버스','도보','자가용','버스','지하철','도보','버스','자전거',
    '버스','도보','지하철','버스','도보','자가용','버스','지하철','도보','버스',
    '자전거','버스','도보','버스','지하철','자가용','버스','도보','버스','지하철',
    '도보','버스','자전거','버스','지하철','도보','버스','자가용','도보','버스',
    '지하철','도보','버스','자전거','자가용','버스','도보','버스','지하철','도보',
    '버스','도보','자가용','버스','지하철','도보','버스','자전거','도보','버스',
    '지하철','도보','버스','자가용','도보','버스','도보',
    '도보','버스','지하철','자가용','버스','도보','자전거','버스','지하철','도보',
    '버스','도보','자가용','버스','지하철','도보','자전거','버스','도보','자가용',
    '버스','지하철','도보','버스','자전거','도보','버스','지하철','자가용','도보',
    '버스','도보','지하철','버스','자전거','도보','자가용','버스','도보','지하철',
    '도보','버스','자전거','자가용','도보','버스','지하철','도보','버스','자전거',
    '자가용','도보','버스','도보','지하철','버스','자전거','도보','버스','자가용',
    '도보','버스','지하철','도보','버스','자전거',
  ],
  수학점수: [
    72,85,68,91,77,83,65,79,88,74,90,69,82,76,87,71,84,78,93,67,81,73,86,70,89,75,92,66,80,77,
    83,71,88,64,79,86,73,90,68,82,75,87,70,84,78,91,67,83,76,89,74,86,69,81,77,85,72,88,65,80,
    73,87,71,84,76,90,68,
    78,92,70,85,74,89,67,83,76,88,72,86,69,81,77,90,73,84,68,82,75,87,71,83,79,91,66,85,74,88,
    70,82,76,84,73,89,67,86,78,91,72,80,75,87,69,83,77,90,74,81,68,85,72,88,65,79,76,84,71,86,
    73,89,67,82,78,90,70,
    75,88,71,84,79,86,68,82,77,91,73,85,70,89,74,83,67,80,76,87,72,90,69,81,78,86,73,88,65,84,
    77,82,71,85,74,89,68,83,76,90,72,87,70,84,79,81,67,86,73,88,75,82,69,77,85,71,83,74,80,88,
    66,79,76,84,72,87,
  ],
  급식만족도: [
    4,3,5,4,2,3,4,5,3,4,3,4,5,3,2,4,3,5,4,3,4,2,3,5,4,3,4,5,3,2,
    4,3,5,4,3,2,4,5,3,4,3,4,5,2,3,4,5,3,4,2,3,4,5,3,4,2,3,5,4,3,
    4,3,5,2,4,3,5,
    3,4,5,3,2,4,3,5,4,3,4,5,3,2,4,3,5,4,3,4,2,3,5,4,3,4,5,3,2,4,
    3,5,4,3,2,4,5,3,4,3,4,5,2,3,4,5,3,4,2,3,4,5,3,4,2,3,5,4,3,4,
    5,3,2,4,3,5,4,
    4,5,3,2,4,3,5,4,3,4,5,3,2,4,3,5,4,3,4,5,2,3,4,5,3,2,4,3,5,4,
    3,4,2,3,5,4,3,4,5,3,2,4,3,5,4,3,4,5,2,3,4,5,3,2,4,3,5,4,3,4,
    5,3,2,4,3,5,
  ],
  스크린타임: [
    3.5,4.2,2.8,5.1,3.9,4.5,2.3,3.7,4.8,3.1,5.0,2.6,4.3,3.4,4.9,2.9,4.1,3.6,5.3,2.5,
    3.8,3.2,4.6,2.7,5.2,3.3,4.4,2.4,3.9,3.5,4.0,2.8,4.7,2.2,3.6,4.3,3.0,5.1,2.6,4.2,
    3.3,4.8,2.7,4.1,3.5,5.0,2.4,4.3,3.2,4.9,3.1,4.5,2.5,3.8,3.4,4.4,2.9,4.7,2.3,3.7,
    3.0,4.6,2.8,4.2,3.3,5.1,2.6,
    3.8,5.2,2.7,4.4,3.1,4.9,2.4,4.1,3.3,4.7,2.9,4.5,2.5,3.9,3.4,5.0,3.0,4.2,2.6,4.6,
    3.2,4.3,3.6,5.1,2.3,4.4,3.1,4.8,2.7,4.0,3.3,4.2,3.0,4.9,2.4,4.5,3.5,5.1,2.9,3.8,
    3.2,4.6,2.5,4.1,3.4,5.0,3.1,3.9,2.6,4.4,2.9,4.7,2.3,3.6,3.3,4.2,2.8,4.5,3.0,4.9,
    2.4,3.7,3.5,5.0,2.7,
    3.2,4.8,2.8,4.2,3.6,4.5,2.4,4.0,3.4,5.1,3.0,4.4,2.7,4.9,3.1,4.1,2.5,3.7,3.3,4.6,
    2.9,5.0,2.5,3.9,3.5,4.5,3.0,4.8,2.3,4.2,3.4,4.0,2.8,4.4,3.1,4.9,2.6,4.1,3.3,5.0,
    2.9,4.6,2.7,4.2,3.6,3.9,2.4,4.5,3.0,4.8,3.2,4.0,2.5,3.4,4.4,2.8,4.1,3.1,3.7,4.7,
    2.3,3.6,3.3,4.2,2.9,4.6,
  ],
};

const columns = Object.keys(surveyData);

function getColumnType(colName) {
  const sample = surveyData[colName][0];
  return typeof sample === 'number' ? 'numeric' : 'categorical';
}

function aggregate(catCol, numCol, method) {
  const groups = {};
  surveyData[catCol].forEach((cat, i) => {
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(surveyData[numCol][i]);
  });
  const labels = Object.keys(groups);
  const values = labels.map((label) => {
    const arr = groups[label];
    if (method === '평균') return +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
    if (method === '합계') return arr.reduce((a, b) => a + b, 0);
    if (method === '개수') return arr.length;
    if (method === '최댓값') return Math.max(...arr);
    if (method === '최솟값') return Math.min(...arr);
    return arr.length;
  });
  return { labels, values };
}

function countCategories(colName) {
  const counts = {};
  surveyData[colName].forEach((val) => { counts[val] = (counts[val] || 0) + 1; });
  return { labels: Object.keys(counts), values: Object.values(counts) };
}

const chartTypes = [
  { value: 'bar', label: '막대 차트' },
  { value: 'hbar', label: '가로 막대 차트' },
  { value: 'line', label: '꺾은선 차트' },
  { value: 'pie', label: '원형 차트' },
  { value: 'scatter', label: '산점도' },
  { value: 'histogram', label: '히스토그램' },
];

const palette = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];
const aggMethods = ['평균', '합계', '개수', '최댓값', '최솟값'];

export default function Lesson4_3() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        지금까지 차트를 읽고, 올바른 차트를 선택하는 방법을 배웠습니다.
        이번에는 <strong>직접 나만의 차트를 만들어봅니다!</strong>
      </p>
      <p>
        코드를 작성할 필요는 없습니다. 아래 도구에서
        <strong> 데이터 열, 차트 유형, 집계 방법</strong>을 선택하면 자동으로 차트가 생성됩니다.
      </p>

      <InfoBox type="key">
        이 레슨에서는 <strong>200명 학생의 학교 설문 데이터</strong>를 사용합니다.
        포함된 항목: 학년, 교통수단, 수학점수, 급식만족도(1~5), 스크린타임(시간)
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-10">데이터 미리보기</h2>
      <p>차트를 만들기 전에, 어떤 데이터가 있는지 살펴봅시다.</p>

      <div className="overflow-x-auto my-4">
        <table className="text-sm border-collapse w-full">
          <thead>
            <tr className="bg-slate-50">
              {columns.map((col) => (
                <th key={col} className="border border-slate-200 px-3 py-2 text-left">
                  {col}
                  <span className="block text-xs text-slate-400 font-normal">
                    {getColumnType(col) === 'numeric' ? '수치형' : '범주형'}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4].map((rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? '' : 'bg-slate-50/50'}>
                {columns.map((col) => (
                  <td key={col} className="border border-slate-200 px-3 py-1.5">{surveyData[col][rowIdx]}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td colSpan={columns.length} className="border border-slate-200 px-3 py-1.5 text-center text-slate-400 text-xs">
                ... 총 {surveyData[columns[0]].length}명
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExerciseBlock title="실습: 나만의 차트 만들기">
        <p className="text-sm text-slate-500 mb-4">아래 옵션을 선택하면 차트가 자동으로 생성됩니다. 다양한 조합을 시도해보세요!</p>
        <ChartBuilder />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">차트 만들기 미션</h2>
      <p>아래 미션을 따라 직접 차트를 만들어보세요. 위의 차트 빌더에서 옵션을 조정하면 됩니다!</p>

      <div className="space-y-4 my-6">
        <MissionCard number={1} title="학년별 평균 수학 점수 비교" hint="차트 유형: 막대 차트, X축: 학년, Y축: 수학점수, 집계: 평균" answer="1학년, 2학년, 3학년의 평균 수학 점수를 비교할 수 있습니다. 어느 학년이 가장 높은지 확인해보세요!" />
        <MissionCard number={2} title="교통수단별 학생 수 비율" hint="차트 유형: 원형 차트, 데이터 열: 교통수단" answer="버스를 이용하는 학생이 가장 많고, 자전거가 가장 적습니다. 비율을 통해 구성을 한눈에 볼 수 있죠!" />
        <MissionCard number={3} title="수학 점수 분포 확인" hint="차트 유형: 히스토그램, 데이터 열: 수학점수" answer="수학 점수가 어떤 범위에 가장 많이 분포하는지 확인할 수 있습니다. 정규분포에 가까운 모양인가요?" />
        <MissionCard number={4} title="스크린타임과 수학 점수의 관계" hint="차트 유형: 산점도, X축: 스크린타임, Y축: 수학점수" answer="스크린타임이 길수록 수학 점수가 어떤 경향을 보이는지 살펴보세요. 관계가 보이나요?" />
      </div>

      <InfoBox type="think">
        같은 데이터로도 차트 유형을 바꾸면 전혀 다른 이야기를 할 수 있습니다.
        <br />예를 들어, 교통수단 데이터를 막대 차트로 그리면 "명 수 비교"가 강조되고, 원형 차트로 그리면 "비율"이 강조됩니다.
        <br /><strong>어떤 이야기를 하고 싶은지에 따라 차트를 선택하세요!</strong>
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 데이터 열과 차트 유형을 선택하여 직접 차트 만들기</li>
          <li>✓ 집계 방법(평균, 합계, 개수 등)에 따라 차트가 달라지는 것 확인</li>
          <li>✓ 같은 데이터를 다양한 차트로 표현해보는 경험</li>
          <li>✓ 데이터 특성에 맞는 차트 유형 직접 탐색</li>
        </ul>
      </div>
    </div>
  );
}

// ── 인라인 ChartBuilder 컴포넌트 ──
function ChartBuilder() {
  const [chartType, setChartType] = useState('bar');
  const [xCol, setXCol] = useState('학년');
  const [yCol, setYCol] = useState('수학점수');
  const [aggMethod, setAggMethod] = useState('평균');
  const [chartTitle, setChartTitle] = useState('');
  const chartRef = useRef(null);

  const xType = getColumnType(xCol);
  const yType = getColumnType(yCol);
  const isSingleCol = chartType === 'histogram' || chartType === 'pie';
  const isScatter = chartType === 'scatter';
  const needsAgg = !isSingleCol && !isScatter && xType === 'categorical' && yType === 'numeric';

  const buildChart = useCallback(() => {
    if (!chartRef.current) return;
    let data = [];
    let layout = {
      margin: { t: 40, r: 20, b: 50, l: 50 },
      height: 350,
      font: { family: 'Noto Sans KR', size: 12 },
      title: { text: chartTitle || undefined, font: { size: 14 } },
    };

    try {
      if (chartType === 'histogram') {
        const col = yType === 'numeric' ? yCol : xCol;
        data = [{ x: surveyData[col], type: 'histogram', marker: { color: palette[0] }, nbinsx: 15 }];
        layout.xaxis = { title: col };
        layout.yaxis = { title: '빈도' };
      } else if (chartType === 'pie') {
        const col = xType === 'categorical' ? xCol : yCol;
        const { labels, values } = countCategories(col);
        data = [{ labels, values, type: 'pie', hole: 0.3, marker: { colors: palette }, textinfo: 'label+percent', textposition: 'outside' }];
      } else if (chartType === 'scatter') {
        data = [{ x: surveyData[xCol], y: surveyData[yCol], mode: 'markers', type: 'scatter', marker: { color: palette[0], size: 6, opacity: 0.6 } }];
        layout.xaxis = { title: xCol };
        layout.yaxis = { title: yCol };
      } else if (needsAgg) {
        const { labels, values } = aggregate(xCol, yCol, aggMethod);
        if (chartType === 'bar') {
          data = [{ x: labels, y: values, type: 'bar', marker: { color: labels.map((_, i) => palette[i % palette.length]) } }];
        } else if (chartType === 'hbar') {
          data = [{ y: labels, x: values, type: 'bar', orientation: 'h', marker: { color: labels.map((_, i) => palette[i % palette.length]) } }];
        } else if (chartType === 'line') {
          data = [{ x: labels, y: values, type: 'scatter', mode: 'lines+markers', line: { color: palette[0], width: 2 }, marker: { size: 8 } }];
        }
        layout.xaxis = { title: xCol };
        layout.yaxis = { title: `${yCol} (${aggMethod})` };
      } else if (xType === 'categorical' && yType === 'categorical') {
        const { labels, values } = countCategories(xCol);
        data = [{ x: labels, y: values, type: 'bar', marker: { color: labels.map((_, i) => palette[i % palette.length]) } }];
        layout.xaxis = { title: xCol };
        layout.yaxis = { title: '빈도(명)' };
      } else {
        data = [{ x: surveyData[xCol], y: surveyData[yCol], type: chartType === 'line' ? 'scatter' : 'bar', mode: chartType === 'line' ? 'lines+markers' : undefined, marker: { color: palette[0] } }];
        layout.xaxis = { title: xCol };
        layout.yaxis = { title: yCol };
      }
      Plotly.react(chartRef.current, data, layout, { responsive: true, displayModeBar: false });
    } catch (err) { console.error('차트 생성 오류:', err); }
  }, [chartType, xCol, yCol, aggMethod, chartTitle, xType, yType, needsAgg]);

  useEffect(() => { buildChart(); }, [buildChart]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 p-4 bg-slate-50 rounded-xl">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">차트 유형</label>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300">
            {chartTypes.map((ct) => (<option key={ct.value} value={ct.value}>{ct.label}</option>))}
          </select>
        </div>
        {!isSingleCol && (
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">{isScatter ? 'X축 (수치형)' : 'X축 (범주형)'}</label>
            <select value={xCol} onChange={(e) => setXCol(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300">
              {columns.map((col) => (<option key={col} value={col}>{col} ({getColumnType(col) === 'numeric' ? '수치' : '범주'})</option>))}
            </select>
          </div>
        )}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">{isSingleCol ? '데이터 열' : 'Y축'}</label>
          <select value={yCol} onChange={(e) => setYCol(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300">
            {columns.map((col) => (<option key={col} value={col}>{col} ({getColumnType(col) === 'numeric' ? '수치' : '범주'})</option>))}
          </select>
        </div>
        {needsAgg && (
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">집계 방법</label>
            <select value={aggMethod} onChange={(e) => setAggMethod(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300">
              {aggMethods.map((m) => (<option key={m} value={m}>{m}</option>))}
            </select>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold text-slate-600 shrink-0">차트 제목 (선택):</label>
        <input type="text" value={chartTitle} onChange={(e) => setChartTitle(e.target.value)} placeholder="예: 학년별 평균 수학 점수" className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
      </div>
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200 bg-white" />
      <div className="text-xs text-slate-400 p-2 bg-slate-50 rounded-lg">
        현재 설정: {chartTypes.find((t) => t.value === chartType)?.label}
        {!isSingleCol && ` | X축: ${xCol}`}
        {` | ${isSingleCol ? '열' : 'Y축'}: ${yCol}`}
        {needsAgg && ` | 집계: ${aggMethod}`}
      </div>
    </div>
  );
}

function MissionCard({ number, title, hint, answer }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm shrink-0">{number}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-800">{title}</h4>
          <p className="text-xs text-slate-400 mt-1">힌트: {hint}</p>
          <RevealAnswer label="결과 해설 보기">
            <p className="text-sm">{answer}</p>
          </RevealAnswer>
        </div>
      </div>
    </div>
  );
}
