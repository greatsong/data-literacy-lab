import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import QuestionBuilder from '../../components/interactive/QuestionBuilder';
import RevealAnswer from '../../components/common/RevealAnswer';

const transformExamples = [
  {
    vague: '요즘 학생들이 잠을 못 자는 것 같아',
    curious: '스마트폰 사용 시간이 수면 시간에 영향을 줄까?',
    data: '고등학생의 일일 스마트폰 사용 시간과 수면 시간 사이에 음의 상관관계가 있는가?',
  },
  {
    vague: '운동하면 기분이 좋아지는 것 같아',
    curious: '운동하는 학생이 그렇지 않은 학생보다 만족도가 높을까?',
    data: '주 3회 이상 운동하는 학생의 생활 만족도 평균이 운동하지 않는 학생보다 유의하게 높은가?',
  },
];

const badQuestions = [
  {
    question: '스마트폰은 나쁜가?',
    problem: '주관적 판단을 묻는 질문 (데이터로 답할 수 없음)',
    improved: '일일 스마트폰 사용 시간과 학업 성취도 사이에 관계가 있는가?',
  },
  {
    question: '왜 학생들은 공부를 안 할까?',
    problem: '"왜"를 묻는 인과 질문 (데이터만으로 원인 규명 어려움)',
    improved: '일일 공부 시간이 적은 학생(2시간 미만)은 어떤 특징이 있는가?',
  },
  {
    question: '날씨가 따뜻해지고 있나?',
    problem: '시간/장소/기준이 모호함',
    improved: '2015~2025년 서울의 연평균 기온이 상승 추세를 보이는가?',
  },
];

export default function Lesson2_1() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        데이터 분석의 시작은 <strong>좋은 질문</strong>입니다.
        막연한 궁금증을 데이터로 답할 수 있는 질문으로 바꾸는 연습을 해봅시다.
      </p>

      {/* 3단계 변환 */}
      <h2 className="text-xl font-bold text-slate-800 mt-8">질문의 3단계 변환</h2>

      <div className="my-6 flex flex-col items-center gap-2">
        <StepBadge step={1} emoji="💭" label="막연한 궁금증" desc="일상에서 느끼는 모호한 느낌" />
        <Arrow />
        <StepBadge step={2} emoji="🔎" label="구체적 호기심" desc="변수와 관계를 포함한 질문" />
        <Arrow />
        <StepBadge step={3} emoji="📊" label="데이터 질문" desc="측정 가능, 분석 가능한 질문" />
      </div>

      <InfoBox type="key">
        <strong>좋은 데이터 질문의 조건</strong>
        <ul className="mt-1 space-y-0.5">
          <li>1. <strong>측정 가능한 변수</strong>가 포함되어 있다 (스마트폰 사용 시간, 수면 시간)</li>
          <li>2. <strong>분석 대상</strong>이 명확하다 (고등학생, 서울 시민 등)</li>
          <li>3. <strong>데이터를 모으면 답할 수 있다</strong> (주관적 판단이 아닌 사실 확인)</li>
          <li>4. <strong>중립적</strong>이다 (결론을 미리 정하지 않음)</li>
        </ul>
      </InfoBox>

      {/* 예시 변환 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">변환 예시 살펴보기</h2>
      <div className="space-y-4 my-4">
        {transformExamples.map((ex, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-sm">
            <div className="flex gap-2"><span className="text-slate-400">💭</span> <span className="text-slate-600">{ex.vague}</span></div>
            <div className="text-center text-slate-300">↓</div>
            <div className="flex gap-2"><span className="text-slate-400">🔎</span> <span className="text-slate-600">{ex.curious}</span></div>
            <div className="text-center text-slate-300">↓</div>
            <div className="flex gap-2"><span className="text-primary-400">📊</span> <span className="font-medium text-primary-700">{ex.data}</span></div>
          </div>
        ))}
      </div>

      {/* 나쁜 질문 → 좋은 질문 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">나쁜 질문 vs 좋은 질문</h2>
      <div className="space-y-3 my-4">
        {badQuestions.map((bq, i) => (
          <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-red-400 text-sm mt-0.5">✗</span>
              <div>
                <p className="font-medium text-sm text-slate-800">"{bq.question}"</p>
                <p className="text-xs text-red-500 mt-1">{bq.problem}</p>
              </div>
            </div>
            <RevealAnswer label="개선된 질문 보기">
              <span className="text-accent-700">"{bq.improved}"</span>
            </RevealAnswer>
          </div>
        ))}
      </div>

      {/* 실습: 직접 질문 변환하기 */}
      <ExerciseBlock title="실습: 나만의 데이터 질문 만들기">
        <p className="text-sm text-slate-500 mb-4">
          일상의 궁금증을 3단계로 변환해보세요. 마지막에 품질 체크도 해보세요!
        </p>
        <QuestionBuilder examples={transformExamples} />
      </ExerciseBlock>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 질문의 3단계 변환: 막연한 궁금증 → 구체적 호기심 → 데이터 질문</li>
          <li>✓ 좋은 데이터 질문의 4가지 조건</li>
          <li>✓ 나쁜 질문을 좋은 질문으로 개선하는 방법</li>
        </ul>
      </div>
    </div>
  );
}

function StepBadge({ step, emoji, label, desc }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 w-full max-w-sm">
      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-lg shrink-0">
        {emoji}
      </div>
      <div>
        <div className="font-semibold text-sm text-slate-800">{label}</div>
        <div className="text-xs text-slate-400">{desc}</div>
      </div>
    </div>
  );
}

function Arrow() {
  return <div className="text-primary-300 text-xl">↓</div>;
}
