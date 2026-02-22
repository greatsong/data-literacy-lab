import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';
import DataExplorer from '../../components/interactive/DataExplorer';

export default function Lesson3_1() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      {/* 도입 */}
      <p className="text-lg">
        데이터 리터러시의 첫 번째 실전 능력은 <strong>데이터 테이블을 읽는 것</strong>입니다.
        스프레드시트, 통계 자료, 연구 보고서... 우리가 마주하는 데이터의 대부분은
        <strong>행(row)과 열(column)</strong>로 구성된 표 형태입니다.
      </p>
      <p>
        이번 레슨에서는 200명 학생의 설문 데이터를 직접 탐색하면서,
        데이터를 읽고 원하는 정보를 찾아내는 방법을 배워보겠습니다.
      </p>

      <InfoBox type="key">
        <strong>데이터 테이블(표)</strong>은 정보를 체계적으로 정리한 형태입니다.
        <br />
        - <strong>행(row)</strong>: 가로줄. 하나의 관측 대상(예: 학생 1명)에 대한 모든 정보.
        <br />
        - <strong>열(column)</strong>: 세로줄. 하나의 특성(예: 수면 시간)에 대한 모든 값.
        <br />
        - <strong>셀(cell)</strong>: 행과 열이 만나는 칸. 특정 대상의 특정 값(예: 학생 1번의 수면 시간 = 7.5시간).
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-10">데이터 테이블의 구조</h2>

      <p>
        아래에 200명 학생의 학교생활 설문 데이터가 있습니다.
        이 데이터에는 어떤 열(변수)들이 있을까요?
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="text-sm border-collapse w-full">
          <thead>
            <tr className="bg-primary-50">
              <th className="border border-slate-200 px-3 py-2 text-left">열 이름</th>
              <th className="border border-slate-200 px-3 py-2 text-left">의미</th>
              <th className="border border-slate-200 px-3 py-2 text-left">데이터 유형</th>
              <th className="border border-slate-200 px-3 py-2 text-left">예시</th>
            </tr>
          </thead>
          <tbody>
            <ColumnRow name="id" meaning="학생 고유 번호" type="식별자" example="1, 2, 3..." />
            <ColumnRow name="grade" meaning="학년" type="범주형(순서)" example="1, 2, 3" />
            <ColumnRow name="gender" meaning="성별" type="범주형" example="남, 여" />
            <ColumnRow name="smartphone_hours" meaning="하루 스마트폰 사용 시간" type="수치형(연속)" example="3.6" />
            <ColumnRow name="sleep_hours" meaning="하루 수면 시간" type="수치형(연속)" example="7.5" />
            <ColumnRow name="fatigue" meaning="피로도 (0: 낮음, 2: 높음)" type="수치형(순서)" example="0, 1, 2" />
            <ColumnRow name="satisfaction" meaning="학교생활 만족도 (1~10)" type="수치형(순서)" example="5" />
            <ColumnRow name="exercise_days" meaning="주간 운동 일수" type="수치형(이산)" example="4" />
            <ColumnRow name="study_hours" meaning="하루 공부 시간" type="수치형(연속)" example="3.2" />
          </tbody>
        </table>
      </div>

      <InfoBox type="tip">
        데이터 테이블을 처음 볼 때는 바로 숫자를 보지 말고, 먼저 <strong>열 이름(변수)</strong>을 확인하세요.
        "이 데이터에는 어떤 정보가 담겨 있는가?"를 파악하는 것이 첫 번째 단계입니다.
      </InfoBox>

      <ExerciseBlock title="실습 1: 데이터 탐색기 살펴보기">
        <p className="text-sm text-slate-500 mb-4">
          아래 데이터 탐색기를 직접 사용해보세요. 열 이름을 클릭하면 정렬할 수 있고,
          검색창에 텍스트를 입력하면 필터링됩니다.
        </p>
        <DataExplorer
          csvUrl="/data/school_survey_200.csv"
          title="학교생활 설문 데이터 (200명)"
          pageSize={10}
        />
        <div className="mt-4 space-y-3">
          <MiniQuestion
            question="이 데이터에는 총 몇 개의 열(변수)이 있나요?"
            answer="9개 열 (id, grade, gender, smartphone_hours, sleep_hours, fatigue, satisfaction, exercise_days, study_hours)"
          />
          <MiniQuestion
            question="1행(id=1)의 학생은 몇 학년이고, 하루에 스마트폰을 몇 시간 사용하나요?"
            answer="1학년, 하루 스마트폰 사용 시간 3.6시간"
          />
        </div>
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">정렬(Sort)로 데이터 탐색하기</h2>

      <p>
        정렬은 데이터를 <strong>특정 열의 값을 기준으로 순서대로 나열</strong>하는 것입니다.
        오름차순(작은 값 → 큰 값)과 내림차순(큰 값 → 작은 값)으로 정렬할 수 있습니다.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 my-6">
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="text-lg mb-2">🔼</div>
          <h4 className="font-bold text-slate-800 mb-1">오름차순 (Ascending)</h4>
          <p className="text-sm text-slate-600">작은 값에서 큰 값 순으로 정렬</p>
          <p className="text-xs text-slate-400 mt-1 italic">예) 수면 시간: 4.5 → 5.0 → 6.2 → ...</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="text-lg mb-2">🔽</div>
          <h4 className="font-bold text-slate-800 mb-1">내림차순 (Descending)</h4>
          <p className="text-sm text-slate-600">큰 값에서 작은 값 순으로 정렬</p>
          <p className="text-xs text-slate-400 mt-1 italic">예) 수면 시간: ... → 9.0 → 8.5 → 8.0</p>
        </div>
      </div>

      <InfoBox type="think">
        정렬은 단순하지만 매우 강력합니다. 정렬만으로도 이런 것들을 알 수 있습니다:
        <br />- 어떤 학생이 스마트폰을 가장 많이/적게 사용하는가?
        <br />- 만족도가 가장 높은/낮은 학생의 다른 특징은?
        <br />- 데이터에 비정상적으로 크거나 작은 값(이상치)이 있는가?
      </InfoBox>

      <ExerciseBlock title="실습 2: 정렬로 정보 찾기">
        <p className="text-sm text-slate-500 mb-4">
          위의 데이터 탐색기에서 열 이름을 클릭하여 정렬해보고, 아래 질문에 답해보세요.
          (열 이름을 한 번 클릭하면 오름차순, 한 번 더 클릭하면 내림차순입니다.)
        </p>
        <div className="space-y-3">
          <MiniQuestion
            question="스마트폰 사용 시간(smartphone_hours)이 가장 긴 학생의 사용 시간은?"
            answer="smartphone_hours 열을 내림차순 정렬하면 찾을 수 있습니다. 가장 긴 사용 시간은 약 8~9시간대입니다. (열 클릭 두 번으로 내림차순 정렬)"
          />
          <MiniQuestion
            question="수면 시간(sleep_hours)이 가장 짧은 학생은 하루에 몇 시간 자나요?"
            answer="sleep_hours 열을 오름차순 정렬(한 번 클릭)하면 최솟값이 맨 위에 옵니다. 가장 짧은 수면 시간을 확인해보세요."
          />
          <MiniQuestion
            question="만족도(satisfaction)가 10인 학생은 대략 몇 명인가요?"
            answer="satisfaction 열을 내림차순 정렬한 뒤 10인 행이 몇 개인지 세어보세요. 또는 검색창에 10을 입력해볼 수도 있습니다. (단, 검색은 다른 열에도 10이 포함될 수 있으니 정렬이 더 정확합니다.)"
          />
        </div>
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">필터링(Filter)으로 데이터 좁히기</h2>

      <p>
        필터링은 <strong>특정 조건에 맞는 데이터만 골라서 보는 것</strong>입니다.
        200명의 데이터를 한 번에 보기 어려울 때, 관심 있는 부분만 추려서 볼 수 있습니다.
      </p>

      <p>
        데이터 탐색기 상단의 <strong>검색창</strong>에 원하는 값을 입력하면 해당 값이 포함된 행만 표시됩니다.
        예를 들어, "여"를 입력하면 성별이 "여"인 학생만 보입니다.
      </p>

      <InfoBox type="note">
        전문적인 데이터 분석 도구(엑셀, 구글 스프레드시트, Python 등)에서는 더 정교한 필터링이 가능합니다.
        예: "스마트폰 사용 시간이 5시간 이상이면서 수면 시간이 6시간 미만인 학생"
        <br />
        지금은 기본적인 텍스트 검색 필터를 연습하고, 나중에 더 강력한 도구를 배우게 됩니다.
      </InfoBox>

      <ExerciseBlock title="실습 3: 필터링으로 탐색하기">
        <p className="text-sm text-slate-500 mb-4">
          데이터 탐색기의 검색창을 활용하여 아래 질문에 답해보세요.
        </p>
        <div className="space-y-3">
          <MiniQuestion
            question='검색창에 "남"을 입력하면 몇 명의 데이터가 표시되나요?'
            answer='성별이 "남"인 학생의 데이터가 표시됩니다. 탐색기 상단의 "행 x 열" 표시를 참고하거나, 페이지 수를 확인해보세요.'
          />
          <MiniQuestion
            question='검색창에 "3"을 입력하면 어떤 일이 생기나요? 이것이 의미하는 바는?'
            answer='"3"이 포함된 모든 행이 표시됩니다. 학년이 3인 학생뿐 아니라, smartphone_hours에 3이 들어간 행, study_hours에 3이 들어간 행 등도 모두 포함됩니다. 이처럼 단순 텍스트 검색은 의도하지 않은 결과를 포함할 수 있으므로, 결과를 항상 확인해야 합니다.'
          />
        </div>
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">열 통계로 전체 그림 파악하기</h2>

      <p>
        데이터를 한 행씩 보는 것만으로는 전체적인 흐름을 파악하기 어렵습니다.
        데이터 탐색기 하단의 <strong>열 버튼</strong>을 클릭하면 해당 열의 요약 통계를 볼 수 있습니다.
      </p>

      <div className="my-4 p-4 bg-slate-50 rounded-xl">
        <h4 className="font-bold text-sm text-slate-800 mb-2">수치형 열의 통계</h4>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <StatExplain term="개수(Count)" desc="결측값을 제외한 데이터의 수" />
          <StatExplain term="평균(Mean)" desc="모든 값의 합 / 개수" />
          <StatExplain term="중앙값(Median)" desc="값을 순서대로 나열했을 때 한가운데 값" />
          <StatExplain term="표준편차(Std)" desc="값들이 평균에서 얼마나 퍼져 있는지" />
          <StatExplain term="최솟값(Min)" desc="가장 작은 값" />
          <StatExplain term="최댓값(Max)" desc="가장 큰 값" />
        </div>
      </div>

      <InfoBox type="tip">
        범주형 열(예: gender)을 클릭하면 각 범주의 <strong>빈도(frequency)</strong>가 막대 그래프로 표시됩니다.
        "남학생이 몇 명, 여학생이 몇 명인가?"를 한눈에 볼 수 있습니다.
      </InfoBox>

      <ExerciseBlock title="실습 4: 열 통계 읽기">
        <p className="text-sm text-slate-500 mb-4">
          탐색기 하단의 열 버튼을 클릭해서 통계를 확인하고 아래 질문에 답해보세요.
        </p>
        <div className="space-y-3">
          <MiniQuestion
            question="sleep_hours(수면 시간) 열의 평균과 중앙값은 각각 얼마인가요? 둘의 차이는 큰가요?"
            answer="sleep_hours 버튼을 클릭하면 통계가 나옵니다. 평균과 중앙값이 비슷하다면 데이터가 비교적 대칭적으로 분포한다는 뜻입니다."
          />
          <MiniQuestion
            question="smartphone_hours의 표준편차는 얼마인가요? 이것이 의미하는 바는?"
            answer="표준편차가 크면 학생마다 스마트폰 사용 시간의 차이가 크다는 뜻이고, 작으면 비슷하다는 뜻입니다."
          />
          <MiniQuestion
            question="gender(성별) 열을 클릭하면 남녀 비율은 어떻게 되나요?"
            answer="gender 버튼을 클릭하면 남/여 각각의 빈도가 막대 그래프로 표시됩니다. 대략 절반씩인지, 한쪽이 더 많은지 확인해보세요."
          />
        </div>
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">데이터 읽기 체크리스트</h2>

      <p>
        새로운 데이터를 만났을 때, 다음 순서로 살펴보면 빠르게 이해할 수 있습니다:
      </p>

      <div className="my-6 space-y-3">
        <ChecklistItem number={1} title="크기 확인" desc="몇 행(관측 수) x 몇 열(변수 수)인가?" />
        <ChecklistItem number={2} title="열 이름 확인" desc="각 열이 무엇을 의미하는지 파악" />
        <ChecklistItem number={3} title="데이터 유형 확인" desc="수치형인가, 범주형인가?" />
        <ChecklistItem number={4} title="요약 통계 확인" desc="평균, 중앙값, 최솟값, 최댓값, 분포" />
        <ChecklistItem number={5} title="이상한 값 확인" desc="비정상적으로 크거나 작은 값, 빈 값은 없는지?" />
      </div>

      <InfoBox type="warning">
        데이터를 "읽는다"는 것은 단순히 눈으로 보는 것이 아닙니다.
        <strong>구조를 파악하고, 값의 범위를 확인하고, 이상한 점을 발견하는 것</strong>까지 포함합니다.
        이것이 데이터 리터러시의 기초입니다.
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 데이터 테이블의 구조: 행(관측), 열(변수), 셀(값)</li>
          <li>✓ 정렬을 활용한 최댓값/최솟값 찾기 및 데이터 탐색</li>
          <li>✓ 필터링으로 특정 조건의 데이터만 추출하기</li>
          <li>✓ 열 통계(평균, 중앙값, 표준편차)로 전체 분포 파악하기</li>
          <li>✓ 새 데이터를 만났을 때의 5단계 체크리스트</li>
        </ul>
      </div>
    </div>
  );
}

function ColumnRow({ name, meaning, type, example }) {
  return (
    <tr className="hover:bg-slate-50">
      <td className="border border-slate-200 px-3 py-1.5 font-mono text-primary-600 text-xs">{name}</td>
      <td className="border border-slate-200 px-3 py-1.5">{meaning}</td>
      <td className="border border-slate-200 px-3 py-1.5 text-xs text-slate-500">{type}</td>
      <td className="border border-slate-200 px-3 py-1.5 text-xs text-slate-400">{example}</td>
    </tr>
  );
}

function MiniQuestion({ question, answer }) {
  return (
    <div className="p-3 bg-slate-50 rounded-xl">
      <p className="text-sm font-medium text-slate-700 mb-2">{question}</p>
      <RevealAnswer label="힌트/정답 보기">
        <p>{answer}</p>
      </RevealAnswer>
    </div>
  );
}

function StatExplain({ term, desc }) {
  return (
    <div className="p-2 bg-white rounded-lg border border-slate-200">
      <div className="font-semibold text-xs text-slate-700">{term}</div>
      <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
    </div>
  );
}

function ChecklistItem({ number, title, desc }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
      <div className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
        {number}
      </div>
      <div>
        <div className="font-semibold text-sm text-slate-800">{title}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
    </div>
  );
}
