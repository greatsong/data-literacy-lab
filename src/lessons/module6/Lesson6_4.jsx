import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const verifyScenarios = [
  {
    title: '"스마트폰 사용이 많을수록 성적이 떨어진다" (r=-0.82)',
    checks: {
      numbers: { ok: true, detail: '200명 데이터, 상관계수 -0.82' },
      visual: { ok: true, detail: '산점도에서 뚜렷한 음의 추세' },
      common: { ok: false, detail: '인과관계 주장은 위험. 성적 낮은 학생이 스마트폰에 더 의존할 수도 있음' },
      sensitivity: { ok: false, detail: '이상치 3명 제거 시 r이 -0.55로 크게 변함 → 불안정' },
      alternative: { ok: false, detail: '학습 시간을 통제하면 상관이 약해짐 → 교란변수 가능성' },
    },
    verdict: '주의 필요',
  },
  {
    title: '"주당 운동일수가 많을수록 생활 만족도가 높다" (r=0.45)',
    checks: {
      numbers: { ok: true, detail: '200명 데이터, 상관계수 0.45' },
      visual: { ok: true, detail: '산점도에서 완만한 양의 추세' },
      common: { ok: true, detail: '운동→체력→기분 개선은 상식적으로도 타당' },
      sensitivity: { ok: true, detail: '이상치 제거 후에도 r=0.42로 안정적' },
      alternative: { ok: true, detail: '성별/학년 나눠도 같은 경향. 여러 선행연구와 일치' },
    },
    verdict: '신뢰할 만함',
  },
];

const steps = [
  { num: 1, emoji: '🔢', title: '숫자 확인', question: '데이터 크기, 통계값이 맞는가?', detail: '표본 수, 평균, 상관계수 등 기본 숫자가 올바른지 확인' },
  { num: 2, emoji: '📊', title: '시각화 확인', question: '차트가 데이터를 정확히 반영하는가?', detail: '축 범위, 차트 유형, 레이블이 적절한지 확인' },
  { num: 3, emoji: '🧐', title: '상식 검증', question: '결과가 상식적으로 말이 되는가?', detail: '도메인 지식으로 결과의 합리성 판단' },
  { num: 4, emoji: '🔬', title: '민감도 분석', question: '조건을 바꿔도 결론이 유지되는가?', detail: '이상치 제거, 기간 변경 등으로 결과 안정성 확인' },
  { num: 5, emoji: '🔄', title: '대안 분석', question: '다른 방법으로도 같은 결론인가?', detail: '다른 분석 방법, 교란변수 통제 후에도 같은 결론인지 확인' },
];

export default function Lesson6_4() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        분석을 했으면 반드시 <strong>검증</strong>해야 합니다.
        "결과가 나왔으니 끝"이 아니라, "이 결과를 믿어도 되는가?"를 확인하는 것이 데이터 리터러시의 핵심입니다.
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8">검증 5단계</h2>
      <div className="space-y-3 my-6">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-lg shrink-0">
              {step.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary-500">Step {step.num}</span>
                <h4 className="font-bold text-sm text-slate-800">{step.title}</h4>
              </div>
              <p className="text-sm text-slate-600">{step.question}</p>
              <p className="text-xs text-slate-400 mt-1">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <InfoBox type="key">
        5단계를 모두 통과하면 <strong>신뢰할 만한 결과</strong>입니다.
        하나라도 실패하면 <strong>추가 조사나 주의</strong>가 필요합니다.
        <br />특히 3단계(상식 검증)와 5단계(대안 분석)가 중요합니다!
      </InfoBox>

      <ExerciseBlock title="실습: 분석 결과 검증하기">
        <p className="text-sm text-slate-500 mb-4">
          아래 분석 결과를 5단계 체크리스트로 검증해보세요.
        </p>
        <div className="space-y-6">
          {verifyScenarios.map((scenario, i) => (
            <VerifyCard key={i} scenario={scenario} />
          ))}
        </div>
      </ExerciseBlock>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 분석 결과 검증의 중요성</li>
          <li>✓ 5단계 검증법: 숫자→시각화→상식→민감도→대안</li>
          <li>✓ 실전 시나리오에 5단계 적용 연습</li>
        </ul>
      </div>
    </div>
  );
}

function VerifyCard({ scenario }) {
  const [checked, setChecked] = useState({});
  const [showResult, setShowResult] = useState(false);
  const stepKeys = ['numbers', 'visual', 'common', 'sensitivity', 'alternative'];
  const stepLabels = ['숫자 확인', '시각화 확인', '상식 검증', '민감도 분석', '대안 분석'];

  const toggleCheck = (key) => {
    setChecked((p) => ({ ...p, [key]: !p[key] }));
    setShowResult(false);
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <h4 className="font-semibold text-sm text-slate-800 mb-3">📋 {scenario.title}</h4>

      <div className="space-y-2 mb-3">
        {stepKeys.map((key, i) => (
          <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={!!checked[key]} onChange={() => toggleCheck(key)} className="w-4 h-4 rounded" />
            <span className={checked[key] ? 'text-slate-800' : 'text-slate-500'}>
              {steps[i].emoji} {stepLabels[i]}
            </span>
          </label>
        ))}
      </div>

      <button onClick={() => setShowResult(true)}
        className="px-3 py-1.5 bg-primary-100 hover:bg-primary-200 text-primary-700 text-xs rounded-lg cursor-pointer">
        검증 결과 확인
      </button>

      {showResult && (
        <div className="mt-3 space-y-2">
          {stepKeys.map((key, i) => (
            <div key={key} className={`p-2 rounded-lg text-xs ${scenario.checks[key].ok ? 'bg-accent-50 text-accent-800' : 'bg-red-50 text-red-800'}`}>
              {scenario.checks[key].ok ? '✅' : '⚠️'} <strong>{stepLabels[i]}:</strong> {scenario.checks[key].detail}
            </div>
          ))}
          <div className={`p-2 rounded-lg text-sm font-bold text-center ${scenario.verdict === '신뢰할 만함' ? 'bg-accent-100 text-accent-800' : 'bg-warm-100 text-warm-800'}`}>
            종합 판정: {scenario.verdict}
          </div>
        </div>
      )}
    </div>
  );
}
