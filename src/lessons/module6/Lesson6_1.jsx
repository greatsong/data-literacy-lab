import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import CorrelationPlayground from '../../components/interactive/CorrelationPlayground';

const rInterpretQuiz = [
  { r: '0.92', meaning: '매우 강한 양의 상관', correct: 0, options: ['매우 강한 양의 상관', '약한 양의 상관', '상관 없음'] },
  { r: '-0.15', meaning: '거의 상관 없음', correct: 2, options: ['강한 음의 상관', '보통 음의 상관', '거의 상관 없음'] },
  { r: '-0.78', meaning: '강한 음의 상관', correct: 0, options: ['강한 음의 상관', '약한 음의 상관', '강한 양의 상관'] },
  { r: '0.35', meaning: '약한 양의 상관', correct: 1, options: ['매우 강한 양의 상관', '약한~보통 양의 상관', '상관 없음'] },
];

export default function Lesson6_1() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        두 변수 사이에 <strong>관계</strong>가 있는지를 숫자로 나타내는 것이 <strong>상관계수(r)</strong>입니다.
        직접 점을 찍고, 지우면서 상관관계를 체험해봅시다.
      </p>

      <InfoBox type="key">
        <strong>상관계수(r)</strong>는 -1에서 +1 사이의 값입니다.
        <ul className="mt-1 space-y-0.5">
          <li>• <strong>r = +1</strong>: 완벽한 양의 상관 (X↑ → Y↑)</li>
          <li>• <strong>r = 0</strong>: 상관 없음</li>
          <li>• <strong>r = -1</strong>: 완벽한 음의 상관 (X↑ → Y↓)</li>
        </ul>
      </InfoBox>

      {/* r값 해석 기준 */}
      <div className="my-6 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-5 text-center text-xs">
          {[
            { range: '|r| > 0.7', label: '강한 상관', color: 'bg-blue-100 text-blue-800' },
            { range: '0.4 < |r| ≤ 0.7', label: '보통 상관', color: 'bg-blue-50 text-blue-600' },
            { range: '0.2 < |r| ≤ 0.4', label: '약한 상관', color: 'bg-slate-50 text-slate-600' },
            { range: '|r| ≤ 0.2', label: '거의 없음', color: 'bg-slate-100 text-slate-500' },
            { range: 'r = 0', label: '무상관', color: 'bg-slate-200 text-slate-600' },
          ].map((item, i) => (
            <div key={i} className={`p-2 ${item.color}`}>
              <div className="font-mono font-bold">{item.range}</div>
              <div className="mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <ExerciseBlock title="실습 1: 상관관계 놀이터">
        <p className="text-sm text-slate-500 mb-3">
          프리셋을 선택하거나 빈 캔버스에서 점을 찍어보세요. 점 배치에 따라 상관계수가 어떻게 변하는지 관찰하세요.
        </p>
        <CorrelationPlayground xLabel="스마트폰(시간)" yLabel="수면(시간)" initialPreset={0} />
      </ExerciseBlock>

      <InfoBox type="tip">
        <strong>시도해보세요:</strong>
        <ul className="mt-1 space-y-0.5">
          <li>• 양의 상관 프리셋에서 한 점을 크게 벗어나게 이동 → r이 얼마나 변하나요?</li>
          <li>• 빈 캔버스에서 수평선 형태로 점 찍기 → r ≈ 0이 되나요?</li>
          <li>• 완벽한 대각선으로 점 찍기 → r ≈ 1에 가까워지나요?</li>
        </ul>
      </InfoBox>

      <ExerciseBlock title="실습 2: 상관계수 해석 퀴즈">
        <RInterpretQuiz items={rInterpretQuiz} />
      </ExerciseBlock>

      <InfoBox type="warning">
        <strong>중요!</strong> 상관계수가 높다고 반드시 의미 있는 관계는 아닙니다.
        <br />상관관계와 인과관계는 다릅니다 — 이것은 다음 레슨에서 자세히 배웁니다.
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 상관계수(r)의 의미: -1 ~ +1</li>
          <li>✓ r값 크기에 따른 해석 기준</li>
          <li>✓ 데이터 분포가 상관계수에 미치는 영향</li>
        </ul>
      </div>
    </div>
  );
}

function RInterpretQuiz({ items }) {
  const [answers, setAnswers] = useState({});
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const answered = answers[i] !== undefined;
        const isCorrect = answers[i] === item.correct;
        return (
          <div key={i} className={`p-3 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <p className="text-sm font-medium mb-2">r = <span className="font-mono font-bold text-primary-600">{item.r}</span> 은 어떤 의미일까요?</p>
            <div className="flex flex-wrap gap-1.5">
              {item.options.map((opt, oi) => (
                <button key={oi} onClick={() => setAnswers((p) => ({ ...p, [i]: oi }))} disabled={answered}
                  className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${answered && oi === item.correct ? 'bg-accent-500 text-white' : answered && oi === answers[i] ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100'}`}>
                  {opt}
                </button>
              ))}
            </div>
            {answered && <p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ 정답!' : `❌ 정답: ${item.meaning}`}</p>}
          </div>
        );
      })}
    </div>
  );
}
