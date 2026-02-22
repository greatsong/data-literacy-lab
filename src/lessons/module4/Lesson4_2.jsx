import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';
import StatsWidget from '../../components/interactive/StatsWidget';

export default function Lesson3_2() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      {/* 도입 */}
      <p className="text-lg">
        200명의 데이터를 하나하나 다 읽을 수는 없습니다.
        그래서 우리는 <strong>기초 통계</strong>를 사용해 데이터를 요약합니다.
        "대표값"과 "퍼짐 정도"만 알면 전체 데이터의 특성을 빠르게 파악할 수 있습니다.
      </p>

      <InfoBox type="key">
        <strong>기초 통계량</strong>은 데이터의 특성을 하나의 숫자로 요약한 것입니다.
        <br />
        - <strong>대표값</strong>: 데이터의 중심을 나타내는 값 (평균, 중앙값)
        <br />
        - <strong>산포도</strong>: 데이터가 얼마나 흩어져 있는지 나타내는 값 (표준편차, 범위)
      </InfoBox>

      {/* 평균 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">평균 (Mean)</h2>

      <p>
        평균은 가장 익숙한 대표값입니다.
        <strong>모든 값을 더한 뒤 개수로 나눈 것</strong>이죠.
      </p>

      <div className="my-4 p-4 bg-primary-50 rounded-xl">
        <div className="text-center">
          <div className="text-sm text-slate-500 mb-1">평균 공식</div>
          <div className="text-lg font-mono font-bold text-primary-700">
            평균 = (모든 값의 합) / (데이터 개수)
          </div>
          <div className="text-sm text-slate-500 mt-2">
            예) 수면 시간 데이터: 7, 8, 6, 7, 9 → 평균 = (7+8+6+7+9)/5 = <strong>7.4시간</strong>
          </div>
        </div>
      </div>

      <InfoBox type="warning">
        <strong>평균의 함정:</strong> 평균은 극단적인 값(이상치)에 민감합니다.
        <br />
        예) 5명의 월급: 200만, 250만, 300만, 280만, <strong>5,000만</strong>원
        <br />
        → 평균: 1,206만원 (5명 중 4명보다 훨씬 큼!)
        <br />
        이런 경우 평균은 데이터를 잘 대표하지 못합니다.
      </InfoBox>

      {/* 중앙값 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">중앙값 (Median)</h2>

      <p>
        중앙값은 <strong>데이터를 크기순으로 나열했을 때 정확히 가운데에 오는 값</strong>입니다.
        극단적인 값에 영향을 받지 않는다는 큰 장점이 있습니다.
      </p>

      <div className="my-4 p-4 bg-accent-50 rounded-xl">
        <div className="text-sm">
          <div className="mb-2">
            <strong>홀수 개:</strong> 가운데 값
            <br />
            <span className="font-mono text-xs">3, 5, <span className="text-accent-600 font-bold text-base">7</span>, 9, 11 → 중앙값 = 7</span>
          </div>
          <div>
            <strong>짝수 개:</strong> 가운데 두 값의 평균
            <br />
            <span className="font-mono text-xs">3, 5, <span className="text-accent-600 font-bold text-base">7, 9</span>, 11, 13 → 중앙값 = (7+9)/2 = 8</span>
          </div>
        </div>
      </div>

      <p>
        아까 월급 예시에서 중앙값은 얼마일까요?
      </p>

      <RevealAnswer label="중앙값 확인하기">
        200만, 250만, <strong>280만</strong>, 300만, 5000만 → 중앙값 = <strong>280만원</strong>
        <br />
        평균(1,206만)보다 중앙값(280만)이 훨씬 현실적인 대표값입니다!
      </RevealAnswer>

      {/* 실습 1 */}
      <ExerciseBlock title="실습 1: 평균 vs 중앙값 직접 체험하기">
        <p className="text-sm text-slate-500 mb-4">
          아래 슬라이더를 움직여 데이터 값을 바꿔보세요.
          차트에서 <span className="text-red-500 font-semibold">빨간 선(평균)</span>과{' '}
          <span className="text-green-500 font-semibold">초록 점선(중앙값)</span>이 어떻게 변하는지 관찰해보세요.
        </p>
        <StatsWidget
          initialData={[4, 5, 6, 6, 7, 7, 7, 8, 8, 9]}
          label="점수"
        />
        <div className="mt-4 space-y-3">
          <MiniTask
            task="마지막 슬라이더(10번)의 값을 15로 올려보세요. 평균과 중앙값 중 어떤 것이 더 크게 변하나요?"
            answer="평균이 훨씬 크게 올라갑니다. 반면 중앙값은 거의 변하지 않습니다. 이것이 중앙값의 장점입니다 - 극단값에 강합니다(robust)."
          />
          <MiniTask
            task="모든 값을 비슷하게(예: 6~8 사이) 만들어보세요. 평균과 중앙값의 차이는?"
            answer="데이터가 대칭적으로 분포하면 평균과 중앙값은 거의 같아집니다. 두 값의 차이가 크다면 데이터가 한쪽으로 치우쳐 있다(비대칭)는 신호입니다."
          />
        </div>
      </ExerciseBlock>

      {/* 평균 vs 중앙값 선택 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">언제 평균? 언제 중앙값?</h2>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
          <div className="font-bold text-red-700 mb-2">평균이 적합한 경우</div>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>- 데이터가 대칭적으로 분포할 때</li>
            <li>- 극단값이 없을 때</li>
            <li>- 시험 점수, 키, 체중 등</li>
            <li>- "전체 합계"가 중요할 때</li>
          </ul>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="font-bold text-green-700 mb-2">중앙값이 적합한 경우</div>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>- 데이터가 한쪽으로 치우칠 때</li>
            <li>- 극단값(이상치)이 있을 때</li>
            <li>- 소득, 집값, 재산 등</li>
            <li>- "전형적인 값"이 중요할 때</li>
          </ul>
        </div>
      </div>

      <InfoBox type="think">
        뉴스에서 "한국인의 평균 연봉은 4,000만원"이라고 할 때와
        "한국인의 연봉 중앙값은 3,200만원"이라고 할 때,
        어떤 것이 더 "보통 사람"의 현실을 반영할까요?
        <br /><br />
        소득처럼 일부가 매우 높은 분포에서는 <strong>중앙값</strong>이 더 현실적인 대표값입니다.
      </InfoBox>

      {/* 표준편차 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">표준편차 (Standard Deviation)</h2>

      <p>
        대표값만으로는 데이터를 완전히 이해할 수 없습니다.
        예를 들어, 두 반의 시험 평균이 둘 다 75점이라고 해도 분포는 완전히 다를 수 있습니다:
      </p>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="font-bold text-blue-700 mb-1">A반: 표준편차 작음</div>
          <div className="font-mono text-xs text-slate-600">70, 73, 75, 76, 78, 74, 77</div>
          <div className="text-sm text-blue-600 mt-1">→ 대부분 비슷한 점수</div>
        </div>
        <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="font-bold text-orange-700 mb-1">B반: 표준편차 큼</div>
          <div className="font-mono text-xs text-slate-600">40, 55, 90, 95, 60, 85, 100</div>
          <div className="text-sm text-orange-600 mt-1">→ 점수 차이가 매우 큼</div>
        </div>
      </div>

      <InfoBox type="key">
        <strong>표준편차(Standard Deviation)</strong>는 각 데이터 값이 평균으로부터
        얼마나 떨어져 있는지를 나타내는 수치입니다.
        <br />
        - 표준편차가 <strong>작으면</strong>: 데이터가 평균 근처에 모여 있음 (일관적)
        <br />
        - 표준편차가 <strong>크면</strong>: 데이터가 평균에서 멀리 퍼져 있음 (변동 큼)
      </InfoBox>

      {/* 실습 2 */}
      <ExerciseBlock title="실습 2: 표준편차 체험하기">
        <p className="text-sm text-slate-500 mb-4">
          아래 위젯에서 슬라이더를 조작하면서 표준편차가 어떻게 변하는지 관찰해보세요.
        </p>
        <StatsWidget
          initialData={[5, 5, 5, 5, 5, 5, 5, 5]}
          label="값"
        />
        <div className="mt-4 space-y-3">
          <MiniTask
            task="처음에는 모든 값이 5로 같습니다. 표준편차는 얼마인가요?"
            answer="표준편차는 0.0입니다. 모든 값이 똑같으면 퍼짐이 전혀 없으므로 표준편차는 0입니다."
          />
          <MiniTask
            task="홀수 번째 슬라이더는 1로, 짝수 번째는 9로 바꿔보세요. 표준편차는?"
            answer="표준편차가 4.0이 됩니다. 값이 극단적으로 나뉘면서 평균(5.0)에서 멀리 퍼져 있기 때문입니다."
          />
          <MiniTask
            task="'+ 랜덤 데이터 추가' 버튼을 여러 번 눌러 데이터를 20개 이상으로 만들어보세요. 표준편차가 어떻게 변하나요?"
            answer="랜덤 데이터(0~15)가 추가되면서 다양한 값이 섞이고, 표준편차가 변동합니다. 데이터가 많아질수록 특정 값에 수렴하는 경향을 볼 수 있습니다."
          />
        </div>
      </ExerciseBlock>

      {/* 실전 해석 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">실전: 통계량 해석 연습</h2>

      <p>
        이제 실제 상황에서 통계량을 해석하는 연습을 해봅시다.
        아래 시나리오를 읽고 질문에 답해보세요.
      </p>

      <ScenarioQuiz
        scenario="한 학교의 1학년 학생 100명의 수학 시험 결과: 평균 72점, 중앙값 75점, 표준편차 15점"
        questions={[
          {
            q: '평균(72)이 중앙값(75)보다 낮습니다. 이것은 무엇을 의미할까요?',
            a: '일부 학생이 매우 낮은 점수를 받아 평균을 끌어내렸다는 뜻입니다. 데이터가 왼쪽(낮은 쪽)으로 꼬리가 긴 분포입니다. "보통 학생"은 75점 정도라고 보는 것이 더 정확합니다.',
          },
          {
            q: '표준편차 15점은 어떻게 해석할 수 있나요?',
            a: '대략적으로 대부분의 학생(약 68%)이 평균 ± 1 표준편차, 즉 57점~87점 사이에 분포한다는 뜻입니다. 점수 차이가 꽤 있는 편입니다.',
          },
        ]}
      />

      <ScenarioQuiz
        scenario={"A 카페와 B 카페의 커피 온도 측정 결과 (둘 다 주문 후 1분 시점):\nA 카페: 평균 82°C, 표준편차 1.5°C / B 카페: 평균 82°C, 표준편차 8°C"}
        questions={[
          {
            q: '두 카페의 평균 온도는 같습니다. 하지만 실제 커피 품질은 어디가 더 일관적일까요?',
            a: 'A 카페가 훨씬 일관적입니다. 표준편차 1.5°C는 거의 모든 커피가 80.5~83.5°C 사이로 균일하다는 뜻입니다. B 카페(표준편차 8°C)는 74°C에서 90°C까지 들쭉날쭉합니다.',
          },
        ]}
      />

      <InfoBox type="tip">
        통계량은 숫자일 뿐이지만, <strong>맥락 속에서 해석</strong>해야 의미가 생깁니다.
        <br />
        "평균 7시간"이라는 숫자 자체보다 "우리 학교 학생의 평균 수면 시간이 7시간이고,
        권장 수면 시간(8~10시간)보다 부족하다"라고 해석하는 것이 데이터 리터러시입니다.
      </InfoBox>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 평균: 전체 합을 개수로 나눈 대표값. 이상치에 민감</li>
          <li>✓ 중앙값: 데이터의 정가운데 값. 이상치에 강건(robust)</li>
          <li>✓ 평균 vs 중앙값: 데이터 분포에 따라 적합한 대표값이 다름</li>
          <li>✓ 표준편차: 데이터가 평균에서 얼마나 퍼져 있는지 나타내는 지표</li>
          <li>✓ 통계량은 맥락 속에서 해석해야 의미가 있음</li>
        </ul>
      </div>
    </div>
  );
}

function MiniTask({ task, answer }) {
  return (
    <div className="p-3 bg-slate-50 rounded-xl">
      <p className="text-sm font-medium text-slate-700 mb-2">{task}</p>
      <RevealAnswer label="해설 보기">
        <p>{answer}</p>
      </RevealAnswer>
    </div>
  );
}

function ScenarioQuiz({ scenario, questions }) {
  return (
    <div className="my-6 p-4 bg-white rounded-xl border border-slate-200">
      <div className="p-3 bg-slate-50 rounded-lg mb-4">
        <div className="text-xs font-semibold text-slate-400 mb-1">상황</div>
        <p className="text-sm text-slate-700 whitespace-pre-line">{scenario}</p>
      </div>
      <div className="space-y-3">
        {questions.map((item, i) => (
          <div key={i}>
            <p className="text-sm font-medium text-slate-700 mb-2">Q{i + 1}. {item.q}</p>
            <RevealAnswer label="해석 보기">
              <p>{item.a}</p>
            </RevealAnswer>
          </div>
        ))}
      </div>
    </div>
  );
}
