import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';
import ChartQuiz from '../../components/interactive/ChartQuiz';

// ── 막대 차트 데이터 ──
const barChartData = [
  {
    x: ['국어', '수학', '영어', '과학', '사회'],
    y: [78, 85, 72, 88, 80],
    type: 'bar',
    marker: {
      color: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'],
    },
  },
];

const barChartLayout = {
  title: { text: '과목별 평균 점수', font: { size: 14 } },
  xaxis: { title: '과목' },
  yaxis: { title: '평균 점수', range: [0, 100] },
};

const barChartQuestions = [
  {
    question: '가장 평균 점수가 높은 과목은 무엇인가요?',
    options: ['국어', '수학', '영어', '과학', '사회'],
    answer: 3,
    explanation:
      '과학이 88점으로 가장 높습니다. 막대의 높이를 비교하면 쉽게 알 수 있죠!',
  },
  {
    question: '수학과 영어의 점수 차이는 몇 점인가요?',
    options: ['10점', '13점', '15점', '8점'],
    answer: 1,
    explanation: '수학 85점 - 영어 72점 = 13점 차이입니다.',
  },
  {
    question: '이 차트에서 Y축은 무엇을 나타내나요?',
    options: ['학생 수', '과목 수', '평균 점수', '학년'],
    answer: 2,
    explanation:
      'Y축(세로축)에 "평균 점수"라고 표시되어 있습니다. 차트를 읽을 때는 항상 축 제목을 먼저 확인하세요!',
  },
];

// ── 꺾은선 차트 데이터 ──
const lineChartData = [
  {
    x: ['3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
    y: [5.7, 13.2, 18.6, 23.5, 26.8, 27.1, 22.3, 15.1],
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: '#ef4444', width: 2 },
    marker: { size: 6 },
  },
];

const lineChartLayout = {
  title: { text: '2025년 서울 월별 평균 기온', font: { size: 14 } },
  xaxis: { title: '월' },
  yaxis: { title: '평균 기온(°C)' },
};

const lineChartQuestions = [
  {
    question: '기온이 가장 높은 달은 언제인가요?',
    options: ['6월', '7월', '8월', '9월'],
    answer: 2,
    explanation:
      '8월의 평균 기온이 27.1°C로 가장 높습니다. 꺾은선에서 가장 높은 점을 찾으면 됩니다.',
  },
  {
    question: '기온이 가장 크게 상승한 구간은 어디인가요?',
    options: ['3월→4월', '4월→5월', '5월→6월', '6월→7월'],
    answer: 0,
    explanation:
      '3월(5.7°C)→4월(13.2°C)로 7.5°C 상승했습니다. 선의 기울기가 가장 가파른 구간이죠.',
  },
  {
    question: '이 차트에서 알 수 있는 것은?',
    options: [
      '각 달의 강수량',
      '기온의 변화 추세',
      '학생 수의 변화',
      '지역별 기온 비교',
    ],
    answer: 1,
    explanation:
      '꺾은선 차트는 시간에 따른 변화 추세를 보여줍니다. 이 차트에서는 월별 기온의 오르내림을 한눈에 파악할 수 있습니다.',
  },
];

// ── 원형 차트 데이터 ──
const pieChartData = [
  {
    labels: ['도보', '버스', '지하철', '자가용', '자전거'],
    values: [45, 62, 38, 35, 20],
    type: 'pie',
    hole: 0.3,
    marker: {
      colors: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'],
    },
    textinfo: 'label+percent',
    textposition: 'outside',
  },
];

const pieChartLayout = {
  title: { text: '학생 200명의 등교 교통수단', font: { size: 14 } },
  showlegend: false,
};

const pieChartQuestions = [
  {
    question: '가장 많은 학생이 이용하는 교통수단은?',
    options: ['도보', '버스', '지하철', '자가용'],
    answer: 1,
    explanation:
      '버스가 62명(31%)으로 가장 많습니다. 원형 차트에서 가장 큰 조각을 찾으면 됩니다.',
  },
  {
    question: '도보와 자전거를 합치면 전체의 약 몇 %인가요?',
    options: ['약 22%', '약 33%', '약 40%', '약 50%'],
    answer: 1,
    explanation:
      '도보 45명 + 자전거 20명 = 65명. 전체 200명 중 65명은 약 32.5%, 즉 약 33%입니다.',
  },
  {
    question: '원형 차트가 보여주는 것은?',
    options: [
      '각 항목의 시간별 변화',
      '전체에서 각 항목이 차지하는 비율',
      '두 항목 사이의 관계',
      '항목별 순위',
    ],
    answer: 1,
    explanation:
      '원형 차트는 전체를 100%로 놓고, 각 부분이 차지하는 비율을 보여줍니다. "비율"과 "구성"을 볼 때 적합합니다.',
  },
];

// ── 차트 읽기 체크리스트 ──
const readingChecklist = [
  { step: '제목 확인', desc: '이 차트가 무엇에 대한 차트인지 파악합니다.' },
  { step: '축 확인', desc: 'X축(가로)과 Y축(세로)이 각각 무엇을 나타내는지 봅니다.' },
  { step: '단위 확인', desc: '점수? 온도? 명? 단위에 따라 해석이 달라집니다.' },
  { step: '패턴 파악', desc: '가장 큰 값, 가장 작은 값, 증가/감소 추세 등을 찾습니다.' },
  { step: '비교하기', desc: '항목들 사이의 차이나 관계를 비교합니다.' },
];

export default function Lesson4_1() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      {/* 도입 */}
      <p className="text-lg">
        데이터를 수집하고 정리한 다음, 가장 효과적으로 전달하는 방법은 무엇일까요?
        바로 <strong>차트(그래프)</strong>입니다. 차트는 숫자를 시각적으로
        표현하여, 한눈에 패턴과 의미를 파악할 수 있게 해줍니다.
      </p>
      <p>
        하지만 차트를 <strong>제대로 읽을 줄 알아야</strong> 합니다.
        그림만 보고 넘어가면, 차트가 담고 있는 중요한 정보를 놓치게 됩니다.
      </p>

      <InfoBox type="key">
        <strong>차트 리터러시(Chart Literacy)</strong>란 차트를 정확하게
        읽고, 해석하고, 비판적으로 평가하는 능력입니다.
        이번 레슨에서는 막대 차트, 꺾은선 차트, 원형 차트를 읽는 연습을 합니다.
      </InfoBox>

      {/* 차트 읽기 5단계 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">차트 읽기 5단계</h2>
      <p>어떤 차트든 다음 5단계를 따르면 정확하게 읽을 수 있습니다.</p>

      <div className="grid gap-3 my-6">
        {readingChecklist.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-sm shrink-0">
              {i + 1}
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm">{item.step}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 실습 1: 막대 차트 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">1. 막대 차트 읽기</h2>
      <p>
        <strong>막대 차트</strong>는 범주별 값의 크기를 비교할 때 사용합니다.
        막대의 <strong>높이(또는 길이)</strong>가 값의 크기를 나타냅니다.
      </p>

      <InfoBox type="note">
        막대 차트를 읽을 때는 <strong>각 막대의 높이를 비교</strong>하세요.
        어떤 항목이 가장 크고, 가장 작은지 한눈에 알 수 있습니다.
      </InfoBox>

      <ExerciseBlock title="실습 1: 과목별 평균 점수 막대 차트 읽기">
        <p className="text-sm text-slate-500 mb-4">아래 막대 차트를 관찰하고, 질문에 답해보세요.</p>
        <ChartQuiz chartData={barChartData} chartLayout={barChartLayout} questions={barChartQuestions} />
      </ExerciseBlock>

      {/* 실습 2: 꺾은선 차트 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">2. 꺾은선 차트 읽기</h2>
      <p>
        <strong>꺾은선 차트</strong>는 시간에 따른 변화를 보여줄 때 사용합니다.
        선이 올라가면 증가, 내려가면 감소입니다.
        <strong> 기울기</strong>가 클수록 변화가 급격합니다.
      </p>

      <InfoBox type="note">
        꺾은선 차트에서는 <strong>추세(트렌드)</strong>를 읽는 것이 핵심입니다.
        "전반적으로 올라가는가? 내려가는가? 일정한가?"를 먼저 파악하세요.
      </InfoBox>

      <ExerciseBlock title="실습 2: 서울 월별 기온 꺾은선 차트 읽기">
        <p className="text-sm text-slate-500 mb-4">아래 꺾은선 차트를 관찰하고, 질문에 답해보세요.</p>
        <ChartQuiz chartData={lineChartData} chartLayout={lineChartLayout} questions={lineChartQuestions} />
      </ExerciseBlock>

      {/* 실습 3: 원형 차트 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">3. 원형 차트 읽기</h2>
      <p>
        <strong>원형 차트(파이 차트)</strong>는 전체에서 각 부분이 차지하는
        <strong> 비율</strong>을 보여줍니다.
        전체를 100%로 놓고, 각 조각의 크기를 비교합니다.
      </p>

      <InfoBox type="warning">
        원형 차트는 항목이 <strong>5~6개 이하</strong>일 때 효과적입니다.
        항목이 너무 많으면 조각이 작아져서 비교가 어려워집니다.
      </InfoBox>

      <ExerciseBlock title="실습 3: 등교 교통수단 원형 차트 읽기">
        <p className="text-sm text-slate-500 mb-4">아래 원형 차트를 관찰하고, 질문에 답해보세요.</p>
        <ChartQuiz chartData={pieChartData} chartLayout={pieChartLayout} questions={pieChartQuestions} />
      </ExerciseBlock>

      {/* 세 차트 비교 정리 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">세 가지 차트 비교</h2>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-slate-200 px-4 py-2 text-left">차트 유형</th>
              <th className="border border-slate-200 px-4 py-2 text-left">적합한 상황</th>
              <th className="border border-slate-200 px-4 py-2 text-left">읽는 포인트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 px-4 py-2 font-medium">막대 차트</td>
              <td className="border border-slate-200 px-4 py-2">항목별 크기 비교</td>
              <td className="border border-slate-200 px-4 py-2">막대의 높이 비교</td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="border border-slate-200 px-4 py-2 font-medium">꺾은선 차트</td>
              <td className="border border-slate-200 px-4 py-2">시간에 따른 변화</td>
              <td className="border border-slate-200 px-4 py-2">선의 기울기와 추세</td>
            </tr>
            <tr>
              <td className="border border-slate-200 px-4 py-2 font-medium">원형 차트</td>
              <td className="border border-slate-200 px-4 py-2">비율/구성 표현</td>
              <td className="border border-slate-200 px-4 py-2">조각의 크기(비율)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InfoBox type="think">
        같은 데이터라도 차트 유형에 따라 강조되는 정보가 달라집니다.
        <br />
        예를 들어, 교통수단 데이터를 막대 차트로 그리면 <strong>"명 수 비교"</strong>가 강조되고,
        원형 차트로 그리면 <strong>"비율"</strong>이 강조됩니다.
        <br />
        어떤 이야기를 하고 싶은지에 따라 적절한 차트를 선택해야 합니다!
      </InfoBox>

      {/* 보너스 연습 */}
      <ExerciseBlock title="도전: 차트에서 이야기 만들기">
        <p className="text-sm text-slate-500 mb-4">
          위에서 본 세 가지 차트 중 하나를 골라, 차트가 말해주는 이야기를 2~3문장으로 적어보세요.
        </p>
        <div className="p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-600 mb-2">
            예시: "과목별 평균 점수를 보면, 과학이 88점으로 가장 높고 영어가
            72점으로 가장 낮습니다. 과학과 영어의 점수 차이가 16점으로 크기
            때문에, 영어 학습 지원이 필요할 수 있습니다."
          </p>
          <RevealAnswer label="좋은 답변의 포인트 보기">
            <ul className="space-y-1 text-sm">
              <li>1. <strong>구체적인 수치</strong>를 언급합니다 (88점, 72점 등)</li>
              <li>2. <strong>비교</strong>를 포함합니다 (가장 높은/낮은, 차이 등)</li>
              <li>3. 수치를 바탕으로 <strong>해석이나 시사점</strong>을 제시합니다</li>
              <li>4. 이것이 바로 <strong>"데이터 기반 스토리텔링"</strong>입니다!</li>
            </ul>
          </RevealAnswer>
        </div>
      </ExerciseBlock>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 차트 읽기 5단계: 제목 → 축 → 단위 → 패턴 → 비교</li>
          <li>✓ 막대 차트: 항목별 크기 비교에 적합, 막대 높이를 비교</li>
          <li>✓ 꺾은선 차트: 시간 변화에 적합, 기울기와 추세를 파악</li>
          <li>✓ 원형 차트: 비율 표현에 적합, 조각 크기를 비교</li>
          <li>✓ 차트에서 읽은 내용을 문장으로 표현하는 연습</li>
        </ul>
      </div>
    </div>
  );
}
