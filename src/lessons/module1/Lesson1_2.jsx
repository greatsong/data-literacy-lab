import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import DragDropSort from '../../components/interactive/DragDropSort';

const sortItems = [
  { id: 'height', label: '키 (172cm)' },
  { id: 'blood', label: '혈액형 (A형)' },
  { id: 'temp', label: '기온 (25.3°C)' },
  { id: 'gender', label: '성별 (남/여)' },
  { id: 'score', label: '시험 점수 (87점)' },
  { id: 'fav_color', label: '좋아하는 색깔 (파랑)' },
  { id: 'grade', label: '학년 (2학년)' },
  { id: 'weight', label: '몸무게 (65kg)' },
  { id: 'satisfaction', label: '만족도 (매우 좋음)' },
  { id: 'region', label: '거주 지역 (서울)' },
];

const sortCorrect = {
  height: 'numeric',
  blood: 'categorical',
  temp: 'numeric',
  gender: 'categorical',
  score: 'numeric',
  fav_color: 'categorical',
  grade: 'categorical',
  weight: 'numeric',
  satisfaction: 'categorical',
  region: 'categorical',
};

const scaleItems = [
  { id: 'nominal1', label: '혈액형 (A, B, O, AB)' },
  { id: 'nominal2', label: '거주 지역 (서울, 부산, 대구)' },
  { id: 'ordinal1', label: '학년 (1학년, 2학년, 3학년)' },
  { id: 'ordinal2', label: '만족도 (매우불만~매우만족)' },
  { id: 'interval1', label: '기온 (25°C, 30°C)' },
  { id: 'ratio1', label: '키 (160cm, 172cm)' },
];

const scaleCorrect = {
  nominal1: 'nominal',
  nominal2: 'nominal',
  ordinal1: 'ordinal',
  ordinal2: 'ordinal',
  interval1: 'scale',
  ratio1: 'scale',
};

export default function Lesson1_2() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        데이터에는 여러 <strong>종류</strong>가 있습니다.
        종류에 따라 분석 방법이 달라지기 때문에, 데이터의 종류를 구분하는 것은 매우 중요합니다.
      </p>

      {/* 범주형 vs 수치형 */}
      <h2 className="text-xl font-bold text-slate-800 mt-8">두 가지 큰 분류: 범주형 vs 수치형</h2>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">📦 범주형 데이터</h3>
          <p className="text-sm text-slate-600 mb-3">
            이름이나 그룹으로 분류되는 데이터. 숫자로 계산(평균, 합계)할 수 없습니다.
          </p>
          <div className="space-y-1 text-xs text-slate-500">
            <div>• 혈액형: A, B, O, AB</div>
            <div>• 성별: 남, 여</div>
            <div>• 좋아하는 과목: 국어, 수학, 영어</div>
            <div>• 거주 지역: 서울, 부산, 인천</div>
          </div>
        </div>
        <div className="p-5 bg-green-50 rounded-xl border border-green-200">
          <h3 className="font-bold text-green-800 mb-2">🔢 수치형 데이터</h3>
          <p className="text-sm text-slate-600 mb-3">
            숫자로 표현되며, 계산(평균, 합계, 비교)이 가능한 데이터입니다.
          </p>
          <div className="space-y-1 text-xs text-slate-500">
            <div>• 키: 172cm, 165cm</div>
            <div>• 시험 점수: 87점, 92점</div>
            <div>• 기온: 25.3°C, -3°C</div>
            <div>• 몸무게: 65kg, 58kg</div>
          </div>
        </div>
      </div>

      <InfoBox type="warning">
        <strong>주의!</strong> 숫자가 포함되어 있다고 반드시 수치형은 아닙니다.
        <br />예를 들어 "학번 20250101"이나 "전화번호 010-1234-5678"은 숫자이지만
        평균이나 합계를 구하는 게 의미가 없으므로 <strong>범주형</strong>입니다.
        <br /><strong>핵심 질문: "이 숫자들의 평균을 구하면 의미가 있는가?"</strong>
      </InfoBox>

      {/* 실습 1: 분류 드래그앤드롭 */}
      <ExerciseBlock title="실습 1: 범주형 vs 수치형 분류하기">
        <DragDropSort
          items={sortItems}
          categories={[
            { id: 'categorical', title: '📦 범주형', color: 'blue' },
            { id: 'numeric', title: '🔢 수치형', color: 'green' },
          ]}
          correctMapping={sortCorrect}
          instruction="아래 데이터를 드래그하여 범주형 또는 수치형으로 분류하세요."
        />
      </ExerciseBlock>

      {/* 더 세밀한 분류 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">더 세밀한 분류: 측정 척도</h2>
      <p>
        데이터 분석에서는 더 세밀하게 <strong>명목, 순서, 등간/비율</strong> 척도로 나누기도 합니다.
      </p>

      <div className="grid sm:grid-cols-3 gap-3 my-6">
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="text-lg mb-1">🏷️</div>
          <h4 className="font-bold text-sm text-slate-800 mb-1">명목 척도</h4>
          <p className="text-xs text-slate-500">이름만 구분, 순서 없음</p>
          <p className="text-xs text-slate-400 mt-2 italic">혈액형, 성별, 지역</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="text-lg mb-1">📶</div>
          <h4 className="font-bold text-sm text-slate-800 mb-1">순서 척도</h4>
          <p className="text-xs text-slate-500">순서는 있지만, 간격이 균일하지 않음</p>
          <p className="text-xs text-slate-400 mt-2 italic">학년, 만족도(매우불만~매우만족)</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="text-lg mb-1">📏</div>
          <h4 className="font-bold text-sm text-slate-800 mb-1">등간/비율 척도</h4>
          <p className="text-xs text-slate-500">간격 균일, 사칙연산 가능</p>
          <p className="text-xs text-slate-400 mt-2 italic">기온, 키, 점수, 시간</p>
        </div>
      </div>

      <ExerciseBlock title="실습 2: 척도 분류하기">
        <DragDropSort
          items={scaleItems}
          categories={[
            { id: 'nominal', title: '🏷️ 명목', color: 'blue' },
            { id: 'ordinal', title: '📶 순서', color: 'yellow' },
            { id: 'scale', title: '📏 등간/비율', color: 'green' },
          ]}
          correctMapping={scaleCorrect}
          instruction="아래 데이터를 명목, 순서, 등간/비율 척도로 분류하세요."
        />
      </ExerciseBlock>

      <InfoBox type="tip">
        <strong>왜 데이터 종류가 중요할까요?</strong>
        <ul className="mt-1 space-y-1">
          <li>• 범주형 → 빈도, 비율, 막대 차트, 원형 차트</li>
          <li>• 수치형 → 평균, 표준편차, 히스토그램, 산점도</li>
          <li>• 잘못된 차트나 분석을 하면 틀린 결론에 도달할 수 있어요!</li>
        </ul>
      </InfoBox>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 범주형 데이터: 이름/그룹으로 분류, 평균 불가</li>
          <li>✓ 수치형 데이터: 숫자, 계산 가능</li>
          <li>✓ 숫자라고 다 수치형이 아님 (학번, 전화번호 등)</li>
          <li>✓ 측정 척도: 명목, 순서, 등간/비율</li>
          <li>✓ 데이터 종류에 따라 분석 방법이 달라짐</li>
        </ul>
      </div>
    </div>
  );
}
