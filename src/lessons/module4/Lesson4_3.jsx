import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';
import ChartQuiz from '../../components/interactive/ChartQuiz';

export default function Lesson3_3() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      {/* 도입 */}
      <p className="text-lg">
        숫자 표만 보고 패턴을 찾는 것은 매우 어렵습니다.
        하지만 같은 데이터를 <strong>차트(그래프)</strong>로 그리면
        숨어 있던 패턴이 눈에 바로 보이기 시작합니다.
      </p>
      <p>
        이번 레슨에서는 학교 설문 데이터를 시각화한 차트를 보면서,
        <strong>추세(trend)</strong>, <strong>비교(comparison)</strong>,
        <strong>상관관계(correlation)</strong> 패턴을 찾는 연습을 합니다.
      </p>

      <InfoBox type="key">
        <strong>데이터에서 찾을 수 있는 3가지 패턴:</strong>
        <br />
        1. <strong>추세(Trend)</strong>: 시간이나 순서에 따른 변화 방향 (증가? 감소? 유지?)
        <br />
        2. <strong>비교(Comparison)</strong>: 그룹 간의 차이 (남 vs 여, 1학년 vs 3학년)
        <br />
        3. <strong>상관관계(Correlation)</strong>: 두 변수가 함께 변하는 경향 (A가 커지면 B도 커진다?)
      </InfoBox>

      {/* 패턴 1: 비교 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">패턴 1: 그룹 간 비교</h2>

      <p>
        먼저 가장 직관적인 패턴인 <strong>비교</strong>를 살펴봅시다.
        학년별로 스마트폰 사용 시간에 차이가 있을까요?
      </p>

      <ExerciseBlock title="실습 1: 학년별 스마트폰 사용 시간">
        <p className="text-sm text-slate-500 mb-4">
          아래 차트를 보고 질문에 답해보세요. 막대의 높이가 각 학년의 평균 사용 시간을 나타냅니다.
        </p>
        <ChartQuiz
          chartData={[
            {
              x: ['1학년', '2학년', '3학년'],
              y: [3.2, 3.8, 4.5],
              type: 'bar',
              marker: {
                color: ['#60a5fa', '#3b82f6', '#1d4ed8'],
              },
              text: ['3.2시간', '3.8시간', '4.5시간'],
              textposition: 'outside',
            },
          ]}
          chartLayout={{
            title: { text: '학년별 평균 스마트폰 사용 시간', font: { size: 14 } },
            yaxis: { title: '시간', range: [0, 6] },
            xaxis: { title: '학년' },
          }}
          questions={[
            {
              question: '어느 학년이 스마트폰을 가장 많이 사용하나요?',
              options: ['1학년', '2학년', '3학년'],
              answer: 2,
              explanation: '3학년이 평균 4.5시간으로 가장 많이 사용합니다. 학년이 올라갈수록 사용 시간이 증가하는 추세도 보입니다.',
            },
            {
              question: '1학년과 3학년의 차이는 약 몇 시간인가요?',
              options: ['약 0.5시간', '약 1.0시간', '약 1.3시간', '약 2.0시간'],
              answer: 2,
              explanation: '4.5 - 3.2 = 1.3시간 차이입니다. 학년 간 약 0.6~0.7시간씩 증가하는 패턴이 보입니다.',
            },
          ]}
        />
      </ExerciseBlock>

      <InfoBox type="think">
        "학년이 올라가면 스마트폰 사용이 늘어난다"고 단정 지을 수 있을까요?
        <br />
        주의하세요! 이것은 <strong>상관관계</strong>일 뿐, <strong>인과관계</strong>가 아닙니다.
        "학년이 높아서" 스마트폰을 더 많이 쓰는 것이 아니라,
        나이가 들면서 자율성이 높아지거나, 교우 관계가 복잡해지는 등
        다른 요인이 작용할 수 있습니다.
      </InfoBox>

      {/* 패턴 2: 분포 비교 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">패턴 2: 분포 비교</h2>

      <p>
        평균만 비교하면 놓치는 정보가 있습니다.
        <strong>분포</strong>를 함께 보면 훨씬 풍부한 이야기를 읽어낼 수 있습니다.
      </p>

      <ExerciseBlock title="실습 2: 성별 만족도 분포 비교">
        <p className="text-sm text-slate-500 mb-4">
          남녀 학생의 학교생활 만족도(1~10) 분포를 히스토그램으로 비교해보세요.
        </p>
        <ChartQuiz
          chartData={[
            {
              x: [4, 5, 6, 7, 8, 5, 6, 7, 7, 8, 3, 6, 7, 8, 9, 5, 6, 6, 7, 7, 4, 5, 8, 7, 6, 5, 7, 8, 6, 7],
              type: 'histogram',
              name: '남학생',
              opacity: 0.7,
              marker: { color: '#3b82f6' },
              nbinsx: 8,
            },
            {
              x: [5, 6, 7, 8, 8, 6, 7, 7, 8, 9, 5, 7, 8, 8, 9, 6, 7, 7, 8, 8, 5, 6, 9, 8, 7, 6, 8, 9, 7, 8],
              type: 'histogram',
              name: '여학생',
              opacity: 0.7,
              marker: { color: '#f472b6' },
              nbinsx: 8,
            },
          ]}
          chartLayout={{
            title: { text: '성별 학교생활 만족도 분포', font: { size: 14 } },
            barmode: 'overlay',
            xaxis: { title: '만족도 (1~10)' },
            yaxis: { title: '학생 수' },
            legend: { x: 0.02, y: 0.98 },
          }}
          questions={[
            {
              question: '전반적으로 어느 쪽의 만족도가 더 높아 보이나요?',
              options: ['남학생이 더 높다', '여학생이 더 높다', '비슷하다'],
              answer: 1,
              explanation: '여학생의 분포가 오른쪽(높은 점수)에 더 집중되어 있습니다. 남학생은 상대적으로 낮은 점수에도 분포가 퍼져 있습니다.',
            },
            {
              question: '남학생의 만족도 분포에서 가장 많은 학생이 응답한 구간은?',
              options: ['3~5점', '5~7점', '7~9점'],
              answer: 1,
              explanation: '남학생은 5~7점 구간에 가장 많이 분포하고 있습니다. 히스토그램에서 가장 높은 막대의 위치를 확인하세요.',
            },
          ]}
        />
      </ExerciseBlock>

      <InfoBox type="note">
        히스토그램의 <strong>봉우리(peak) 위치</strong>와 <strong>퍼짐 정도</strong>를 비교하면
        두 그룹의 차이를 더 잘 이해할 수 있습니다.
        <br />
        - 봉우리가 오른쪽에 있다 → 전반적으로 값이 높은 편
        <br />
        - 분포가 넓게 퍼져 있다 → 사람마다 편차가 큰 편
      </InfoBox>

      {/* 패턴 3: 상관관계 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">패턴 3: 상관관계</h2>

      <p>
        두 변수 사이에 <strong>"함께 변하는 경향"</strong>이 있는지를 살펴보는 것이
        상관관계 분석입니다. 산점도(scatter plot)가 이를 보여주는 가장 좋은 도구입니다.
      </p>

      <div className="my-6 grid gap-4 sm:grid-cols-3">
        <CorrelationCard
          type="양의 상관"
          desc="X가 커지면 Y도 커진다"
          emoji="↗️"
          example="키와 체중"
          color="bg-blue-50 border-blue-200"
        />
        <CorrelationCard
          type="음의 상관"
          desc="X가 커지면 Y는 작아진다"
          emoji="↘️"
          example="스마트폰과 수면"
          color="bg-red-50 border-red-200"
        />
        <CorrelationCard
          type="상관 없음"
          desc="X와 Y 사이에 패턴이 없다"
          emoji="🔀"
          example="신발 사이즈와 시험 점수"
          color="bg-slate-50 border-slate-200"
        />
      </div>

      <ExerciseBlock title="실습 3: 스마트폰 사용과 수면 시간의 관계">
        <p className="text-sm text-slate-500 mb-4">
          아래 산점도에서 점 하나가 학생 한 명을 나타냅니다.
          X축은 스마트폰 사용 시간, Y축은 수면 시간입니다.
        </p>
        <ChartQuiz
          chartData={[
            {
              x: [2, 3, 1.5, 4, 3.5, 2.5, 5, 3, 2, 4.5, 1, 3.5, 2.5, 4, 3, 5.5, 2, 3.5, 1.5, 4,
                  3, 2.5, 4.5, 3, 1, 5, 2, 4, 3.5, 6, 2.5, 3, 4.5, 2, 3.5, 5, 1.5, 3, 4, 2.5],
              y: [8, 7, 8.5, 6.5, 7, 7.5, 6, 7.5, 8, 6, 9, 7, 7.5, 6.5, 7.5, 5.5, 8, 7, 8.5, 6.5,
                  7.5, 8, 6, 7, 9, 5.5, 8, 6.5, 7, 5, 7.5, 7, 6.5, 8, 7, 6, 8, 7.5, 6, 7.5],
              mode: 'markers',
              type: 'scatter',
              marker: { color: '#3b82f6', size: 8, opacity: 0.7 },
              name: '학생',
            },
          ]}
          chartLayout={{
            title: { text: '스마트폰 사용 시간 vs 수면 시간', font: { size: 14 } },
            xaxis: { title: '스마트폰 사용 (시간/일)' },
            yaxis: { title: '수면 시간 (시간)' },
          }}
          questions={[
            {
              question: '점들의 전체적인 방향은?',
              options: ['왼쪽 아래에서 오른쪽 위로 (양의 상관)', '왼쪽 위에서 오른쪽 아래로 (음의 상관)', '특별한 패턴 없음'],
              answer: 1,
              explanation: '점들이 전반적으로 왼쪽 위에서 오른쪽 아래 방향입니다. 스마트폰 사용 시간이 길수록 수면 시간이 짧아지는 음의 상관관계가 보입니다.',
            },
            {
              question: '스마트폰을 1시간 미만 사용하는 학생들의 수면 시간은 대체로?',
              options: ['6시간 미만', '7~8시간', '8시간 이상'],
              answer: 2,
              explanation: 'X축 1 부근의 점들은 Y축 8.5~9시간 근처에 위치합니다. 스마트폰 사용이 적은 학생은 상대적으로 수면 시간이 긴 편입니다.',
            },
            {
              question: '이 데이터로 "스마트폰을 줄이면 잠을 더 잘 수 있다"고 결론 내릴 수 있을까요?',
              options: ['예, 확실히 그렇다', '아니요, 상관관계이지 인과관계가 아니다'],
              answer: 1,
              explanation: '상관관계는 인과관계가 아닙니다! 스마트폰 사용이 수면을 줄이는 것일 수도 있지만, 반대로 잠이 안 와서 스마트폰을 하는 것일 수도 있고, 제3의 요인(스트레스 등)이 둘 다에 영향을 줄 수도 있습니다.',
            },
          ]}
        />
      </ExerciseBlock>

      <InfoBox type="warning">
        <strong>"상관관계는 인과관계가 아니다"</strong> — 데이터 리터러시에서 가장 중요한 원칙 중 하나입니다.
        <br />
        아이스크림 판매량과 익사 사고 수는 강한 양의 상관을 보이지만,
        아이스크림이 익사를 유발하는 것은 아닙니다.
        여름이라는 공통 원인(교란 변수)이 둘 다 높이는 것이죠.
      </InfoBox>

      {/* 패턴 4: 복합 비교 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">패턴 4: 복합 비교</h2>

      <p>
        여러 변수를 함께 비교하면 더 깊은 통찰을 얻을 수 있습니다.
        학년별로 여러 활동의 시간 배분이 어떻게 다른지 비교해봅시다.
      </p>

      <ExerciseBlock title="실습 4: 학년별 생활 시간 비교">
        <p className="text-sm text-slate-500 mb-4">
          학년별 평균 스마트폰 사용, 공부, 운동 시간을 비교하는 차트입니다.
        </p>
        <ChartQuiz
          chartData={[
            {
              x: ['1학년', '2학년', '3학년'],
              y: [3.2, 3.8, 4.5],
              name: '스마트폰',
              type: 'bar',
              marker: { color: '#ef4444' },
            },
            {
              x: ['1학년', '2학년', '3학년'],
              y: [2.8, 3.2, 3.9],
              name: '공부',
              type: 'bar',
              marker: { color: '#3b82f6' },
            },
            {
              x: ['1학년', '2학년', '3학년'],
              y: [3.5, 3.0, 2.3],
              name: '운동(주간 일수)',
              type: 'bar',
              marker: { color: '#22c55e' },
            },
          ]}
          chartLayout={{
            title: { text: '학년별 평균 활동 시간', font: { size: 14 } },
            barmode: 'group',
            yaxis: { title: '시간(또는 일수)' },
            legend: { orientation: 'h', y: -0.2 },
          }}
          questions={[
            {
              question: '학년이 올라가면서 줄어드는 활동은?',
              options: ['스마트폰', '공부', '운동'],
              answer: 2,
              explanation: '운동 일수가 1학년 3.5일에서 2학년 3.0일, 3학년 2.3일로 감소합니다. 학년이 올라갈수록 운동할 시간이 줄어드는 것으로 보입니다.',
            },
            {
              question: '이 차트에서 가장 주목할 만한 패턴은?',
              options: [
                '스마트폰과 공부 시간이 함께 증가',
                '운동 시간만 감소하고 나머지는 증가',
                '모든 활동이 비슷하게 변화',
              ],
              answer: 1,
              explanation: '스마트폰과 공부 시간은 학년이 올라가면 증가하는 반면, 운동 일수는 오히려 감소합니다. 학년이 높아지면 학업 부담이 커지면서 운동 시간이 줄어드는 것일 수 있습니다.',
            },
          ]}
        />
      </ExerciseBlock>

      {/* 차트 읽기 팁 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">차트에서 패턴을 찾는 3단계</h2>

      <div className="my-6 space-y-3">
        <StepCard
          number={1}
          title="전체를 훑어보기"
          desc="축 제목, 범례, 단위를 먼저 확인합니다. '이 차트가 무엇을 보여주려는 건지' 파악하세요."
        />
        <StepCard
          number={2}
          title="눈에 띄는 점 찾기"
          desc="가장 높은/낮은 값, 갑자기 변하는 구간, 다른 것과 다른 점을 찾습니다."
        />
        <StepCard
          number={3}
          title="패턴을 문장으로 표현하기"
          desc="'~할수록 ~한다', '~보다 ~이 더 크다' 등 발견한 패턴을 말로 설명해보세요."
        />
      </div>

      <InfoBox type="tip">
        차트를 볼 때 항상 스스로에게 물어보세요:
        <br />
        1. <strong>"왜?"</strong> — 이런 패턴이 나타나는 이유는 무엇일까?
        <br />
        2. <strong>"정말?"</strong> — 다른 설명은 없을까? 데이터가 충분한가?
        <br />
        3. <strong>"그래서?"</strong> — 이 패턴이 의미하는 바는 무엇이고, 어떤 행동으로 이어질 수 있을까?
      </InfoBox>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 데이터에서 찾을 수 있는 3가지 패턴: 추세, 비교, 상관관계</li>
          <li>✓ 막대 차트를 활용한 그룹 간 비교</li>
          <li>✓ 히스토그램을 활용한 분포 비교</li>
          <li>✓ 산점도를 활용한 상관관계 파악</li>
          <li>✓ "상관관계는 인과관계가 아니다"라는 핵심 원칙</li>
          <li>✓ 차트에서 패턴을 찾는 3단계 방법</li>
        </ul>
      </div>
    </div>
  );
}

function CorrelationCard({ type, desc, emoji, example, color }) {
  return (
    <div className={`p-4 rounded-xl border ${color}`}>
      <div className="text-2xl mb-2">{emoji}</div>
      <h4 className="font-bold text-slate-800 mb-1">{type}</h4>
      <p className="text-sm text-slate-600 mb-1">{desc}</p>
      <p className="text-xs text-slate-400 italic">예) {example}</p>
    </div>
  );
}

function StepCard({ number, title, desc }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
      <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
        {number}
      </div>
      <div>
        <div className="font-semibold text-sm text-slate-800">{title}</div>
        <div className="text-sm text-slate-500 mt-0.5">{desc}</div>
      </div>
    </div>
  );
}
