import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';
import OutlierDetective from '../../components/interactive/OutlierDetective';

export default function Lesson3_4() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      {/* 도입 */}
      <p className="text-lg">
        데이터를 분석하다 보면, 다른 값들과 <strong>유독 동떨어진 값</strong>을 발견할 때가 있습니다.
        이것을 <strong>이상치(outlier)</strong>라고 합니다.
        이상치는 분석 결과를 왜곡할 수 있지만, 때로는 중요한 발견의 단서가 되기도 합니다.
      </p>

      <InfoBox type="key">
        <strong>이상치(Outlier)</strong>란 다른 데이터와 비교했을 때
        비정상적으로 크거나 작은 값을 말합니다.
        <br />
        이상치는 <strong>오류</strong>일 수도 있고, <strong>진짜 특이한 사례</strong>일 수도 있습니다.
        중요한 것은 이상치를 <strong>발견하고, 원인을 파악하고, 적절히 처리</strong>하는 것입니다.
      </InfoBox>

      {/* 이상치의 예시 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">이상치란 무엇인가?</h2>

      <p>
        쉽게 말하면 "뭔가 이상한 값"입니다. 구체적인 예를 볼까요?
      </p>

      <div className="my-6 space-y-3">
        <OutlierExample
          scenario="학생 200명의 스마트폰 사용 시간"
          normal="대부분 2~5시간"
          outlier="한 학생이 12시간"
          reason="입력 오류? 아니면 정말로 12시간 사용하는 학생?"
        />
        <OutlierExample
          scenario="반 학생 30명의 수학 점수"
          normal="대부분 60~90점"
          outlier="한 학생이 5점"
          reason="시험을 거의 안 본 것? 답안지 마킹 오류?"
        />
        <OutlierExample
          scenario="직장인 50명의 월급"
          normal="대부분 200~400만원"
          outlier="한 명이 5,000만원"
          reason="임원? 데이터가 섞인 것? → 확인 필요"
        />
      </div>

      <InfoBox type="think">
        이상치를 발견했을 때, 바로 삭제하면 안 됩니다!
        <br />
        먼저 <strong>"이 값이 왜 이상한지"</strong>를 확인해야 합니다.
        <br />
        - 입력 오류라면 → 수정하거나 제거
        <br />
        - 실제 값이라면 → 분석에 포함할지 별도 분석할지 결정
      </InfoBox>

      {/* IQR 방법 설명 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">이상치를 찾는 방법: IQR 방법</h2>

      <p>
        "이상하다"는 감으로 판단하면 사람마다 기준이 다릅니다.
        그래서 통계학에서는 <strong>수학적으로 이상치를 판별하는 기준</strong>을 만들었습니다.
        가장 널리 쓰이는 방법이 <strong>IQR(사분위 범위) 방법</strong>입니다.
      </p>

      <div className="my-6 p-5 bg-white rounded-2xl border border-slate-200 space-y-4">
        <h4 className="font-bold text-slate-800">IQR 방법 단계별 이해</h4>

        <div className="space-y-3">
          <IQRStep
            step={1}
            title="데이터를 크기순으로 정렬"
            example="1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15"
          />
          <IQRStep
            step={2}
            title="Q1(제1사분위수)과 Q3(제3사분위수)를 구한다"
            example="Q1 = 하위 25% 위치 값, Q3 = 상위 25% 위치 값"
          />
          <IQRStep
            step={3}
            title="IQR = Q3 - Q1 (사분위 범위)"
            example="IQR = 데이터의 가운데 50%가 차지하는 범위"
          />
          <IQRStep
            step={4}
            title="이상치 경계를 계산한다"
            example="하한 = Q1 - 1.5 x IQR, 상한 = Q3 + 1.5 x IQR"
          />
          <IQRStep
            step={5}
            title="경계 밖의 값 = 이상치!"
            example="하한보다 작거나, 상한보다 큰 값이 이상치"
          />
        </div>
      </div>

      <InfoBox type="note">
        <strong>왜 1.5배인가요?</strong>
        <br />
        통계학자 존 튜키(John Tukey)가 제안한 기준으로,
        정규분포에서 약 0.7%의 데이터가 이 범위 밖에 놓이게 됩니다.
        "드물지만 있을 수 있는" 수준의 기준이죠.
        <br />
        3배를 쓰면 더 극단적인 이상치만 잡히고(극단 이상치),
        1배를 쓰면 더 많은 값이 이상치로 판별됩니다.
      </InfoBox>

      {/* 실습 1: 이상치 탐정 체험 */}
      <ExerciseBlock title="실습 1: 이상치 탐정 체험">
        <p className="text-sm text-slate-500 mb-4">
          아래는 학생들의 스마트폰 사용 시간(X축)과 수면 시간(Y축)을 나타낸 산점도입니다.
          IQR 배수 슬라이더를 조절하면서, 이상치 판정 기준이 어떻게 바뀌는지 관찰해보세요.
          <br />
          <strong>빨간 X 표시</strong>가 이상치로 판정된 데이터이고,
          <strong>빨간 점선</strong>이 이상치 경계선입니다.
        </p>
        <OutlierDetective />
        <div className="mt-4 space-y-3">
          <MiniTask
            task="기본값(1.5배)에서 이상치는 몇 개인가요? 어떤 점이 이상치인가요?"
            answer="기본 1.5배 기준에서 스마트폰 사용 시간이 8시간인 점이 이상치로 판정됩니다. 다른 학생들(대부분 1~5시간)에 비해 확연히 높은 값입니다."
          />
          <MiniTask
            task="슬라이더를 0.5(엄격)로 바꿔보세요. 이상치가 몇 개로 늘어나나요?"
            answer="기준을 엄격하게 하면 더 많은 점이 이상치로 판정됩니다. 5시간 이상 사용하는 학생들도 이상치에 포함될 수 있습니다."
          />
          <MiniTask
            task="슬라이더를 3.0(관대)으로 바꿔보세요. 이상치가 남아 있나요?"
            answer="관대한 기준에서는 이상치가 사라지거나 매우 극단적인 값만 남습니다. 기준에 따라 판정 결과가 달라지므로, 분석 목적에 맞는 기준을 선택해야 합니다."
          />
        </div>
      </ExerciseBlock>

      {/* 이상치의 영향 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">이상치가 분석에 미치는 영향</h2>

      <p>
        이상치가 있으면 분석 결과가 어떻게 달라지는지 구체적으로 살펴봅시다.
      </p>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <ImpactCard
          title="평균에 미치는 영향"
          icon="📊"
          desc="이상치는 평균을 크게 왜곡합니다."
          example="9명 평균 수면 7.5시간인데, 한 명이 2시간 자면 → 전체 평균이 6.95시간으로 뚝 떨어짐"
        />
        <ImpactCard
          title="상관계수에 미치는 영향"
          icon="📈"
          desc="이상치 하나가 상관관계를 만들거나 없앨 수 있습니다."
          example="위 탐정 도구에서 '전체 상관계수'와 '이상치 제외 상관계수'를 비교해보세요!"
        />
        <ImpactCard
          title="표준편차에 미치는 영향"
          icon="📏"
          desc="이상치는 표준편차를 부풀립니다."
          example="데이터 퍼짐이 실제보다 크게 측정되어 '학생들의 차이가 크다'는 잘못된 결론 가능"
        />
        <ImpactCard
          title="시각화에 미치는 영향"
          icon="📉"
          desc="차트의 스케일을 왜곡합니다."
          example="Y축이 이상치에 맞춰 늘어나면 나머지 데이터가 뭉개져서 패턴을 못 볼 수 있음"
        />
      </div>

      <ExerciseBlock title="실습 2: 이상치의 영향 직접 확인하기">
        <p className="text-sm text-slate-500 mb-4">
          위의 이상치 탐정 도구에서 "전체 데이터 상관계수"와 "이상치 제외 상관계수"를 비교해보세요.
        </p>
        <div className="space-y-3">
          <MiniTask
            task="IQR 배수를 1.5로 설정했을 때, 전체 상관계수와 이상치 제외 상관계수의 차이는 얼마인가요?"
            answer="이상치를 포함하면 상관계수의 절대값이 달라집니다. 이상치가 있는 방향에 따라 상관관계가 더 강하게 보이거나 약하게 보일 수 있습니다. 이상치 하나가 전체 분석 결론에 영향을 미칠 수 있다는 것을 확인해보세요."
          />
          <MiniTask
            task="이상치가 분석 결과에 큰 영향을 주는 상황에서, 어떻게 해야 할까요?"
            answer="(1) 이상치의 원인 확인 (입력 오류? 특수 사례?) → (2) 이상치 포함/제외 두 가지 모두 분석 → (3) 결과를 투명하게 보고 ('이상치를 제외하면 ~ , 포함하면 ~'). 이상치를 무조건 삭제하면 안 됩니다!"
          />
        </div>
      </ExerciseBlock>

      {/* 이상치 처리 가이드 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">이상치 처리 의사결정 가이드</h2>

      <p>
        이상치를 발견했을 때 따라야 할 의사결정 과정입니다:
      </p>

      <div className="my-6 p-5 bg-white rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <DecisionNode
            question="1. 이상치의 원인을 알 수 있는가?"
            yes="원인이 밝혀지면 2번으로"
            no="보수적 접근: 포함/제외 모두 분석해서 비교"
          />
          <DecisionNode
            question="2. 입력 오류나 측정 오류인가?"
            yes="원래 값으로 수정하거나, 수정 불가하면 제거"
            no="3번으로"
          />
          <DecisionNode
            question="3. 분석 대상에 포함되어야 하는 사례인가?"
            yes="제거하지 말고, 중앙값 등 강건한 통계를 사용"
            no="별도 분석 또는 제거 후 이유를 명시적으로 기록"
          />
        </div>
      </div>

      <InfoBox type="warning">
        <strong>가장 나쁜 이상치 처리:</strong> 아무 이유 없이 삭제하는 것
        <br />
        <strong>가장 좋은 이상치 처리:</strong> 원인을 파악하고, 포함/제외 모두 분석하고, 그 과정을 투명하게 기록하는 것
      </InfoBox>

      {/* 실전 시나리오 */}
      <ExerciseBlock title="실습 3: 이상치 처리 판단 연습">
        <p className="text-sm text-slate-500 mb-4">
          아래 시나리오를 읽고, 이상치를 어떻게 처리할지 판단해보세요.
        </p>
        <div className="space-y-4">
          <ScenarioCard
            scenario="학생 설문에서 수면 시간을 '25시간'으로 응답한 학생이 있습니다."
            answer="하루는 24시간이므로 25시간은 불가능한 값입니다. 이것은 명백한 입력 오류이므로 제거하거나, 가능하다면 해당 학생에게 재확인합니다."
          />
          <ScenarioCard
            scenario="학생 200명 중 한 명이 스마트폰 사용 시간 0시간이라고 응답했습니다."
            answer="실제로 스마트폰이 없는 학생일 수 있습니다. 이상치지만 유효한 데이터일 가능성이 높으므로, 제거하기보다 분석에 포함하되 특이 사례로 주목합니다."
          />
          <ScenarioCard
            scenario="카페 매출 분석에서, 크리스마스 당일 매출이 평소의 5배입니다."
            answer="시즌 효과로 인한 자연스러운 현상입니다. '평소 매출'을 분석할 때는 제외할 수 있지만, '연간 매출'을 분석할 때는 반드시 포함해야 합니다. 분석 목적에 따라 처리가 달라집니다."
          />
        </div>
      </ExerciseBlock>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 이상치(outlier)의 정의: 다른 데이터와 동떨어진 비정상적 값</li>
          <li>✓ IQR 방법: Q1, Q3, IQR을 이용한 수학적 이상치 판별</li>
          <li>✓ IQR 배수(1.5가 표준)에 따라 판정 기준이 달라짐</li>
          <li>✓ 이상치가 평균, 상관계수, 표준편차, 시각화에 미치는 영향</li>
          <li>✓ 이상치 처리 원칙: 원인 파악 → 포함/제외 모두 분석 → 투명하게 기록</li>
        </ul>
      </div>
    </div>
  );
}

// --- 하위 컴포넌트 ---

function OutlierExample({ scenario, normal, outlier, reason }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="text-sm font-semibold text-slate-800 mb-2">{scenario}</div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="p-2 bg-blue-50 rounded-lg">
          <span className="text-xs text-blue-500 font-medium">정상 범위</span>
          <div className="text-slate-700">{normal}</div>
        </div>
        <div className="p-2 bg-red-50 rounded-lg">
          <span className="text-xs text-red-500 font-medium">이상치</span>
          <div className="text-slate-700 font-bold">{outlier}</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-slate-500 italic">{reason}</div>
    </div>
  );
}

function IQRStep({ step, title, example }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
        {step}
      </div>
      <div>
        <div className="font-semibold text-sm text-slate-800">{title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{example}</div>
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

function ImpactCard({ title, icon, desc, example }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="font-bold text-sm text-slate-800">{title}</span>
      </div>
      <p className="text-sm text-slate-600 mb-1">{desc}</p>
      <p className="text-xs text-slate-400 italic">{example}</p>
    </div>
  );
}

function DecisionNode({ question, yes, no }) {
  return (
    <div className="p-3 bg-slate-50 rounded-xl">
      <p className="font-semibold text-sm text-slate-800 mb-2">{question}</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-green-50 rounded-lg border border-green-200">
          <span className="font-medium text-green-600">Yes →</span>
          <span className="text-slate-600 ml-1">{yes}</span>
        </div>
        <div className="p-2 bg-red-50 rounded-lg border border-red-200">
          <span className="font-medium text-red-600">No →</span>
          <span className="text-slate-600 ml-1">{no}</span>
        </div>
      </div>
    </div>
  );
}

function ScenarioCard({ scenario, answer }) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl">
      <p className="text-sm font-medium text-slate-700 mb-2">{scenario}</p>
      <RevealAnswer label="처리 방법 보기">
        <p>{answer}</p>
      </RevealAnswer>
    </div>
  );
}
