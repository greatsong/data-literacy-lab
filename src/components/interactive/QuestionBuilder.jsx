import { useState } from 'react';

const steps = [
  {
    title: '1단계: 막연한 궁금증',
    placeholder: '예) 요즘 학생들이 잠을 잘 못 자는 것 같아',
    hint: '일상에서 느끼는 궁금증이나 불만을 자유롭게 적어보세요.',
    emoji: '💭',
  },
  {
    title: '2단계: 구체적 호기심',
    placeholder: '예) 스마트폰 사용 시간이 수면 시간에 영향을 줄까?',
    hint: '"왜?", "얼마나?", "무엇이 영향을 줄까?" 같은 구체적 질문으로 바꿔보세요.',
    emoji: '🔎',
  },
  {
    title: '3단계: 데이터 질문',
    placeholder: '예) 고등학생의 일일 스마트폰 사용 시간과 수면 시간 사이에 음의 상관관계가 있는가?',
    hint: '데이터로 답할 수 있는 질문으로 다듬어보세요. 측정 가능한 변수를 포함해야 합니다.',
    emoji: '📊',
  },
];

const qualityChecks = [
  { id: 'measurable', label: '측정 가능한 변수가 포함되어 있나요?', key: '변수' },
  { id: 'specific', label: '분석 대상(누구? 어디서?)이 명확한가요?', key: '대상' },
  { id: 'answerable', label: '데이터를 모으면 답할 수 있는 질문인가요?', key: '답변가능' },
  { id: 'neutral', label: '편향 없이 중립적인 질문인가요?', key: '중립성' },
];

export default function QuestionBuilder({ examples = [] }) {
  const [inputs, setInputs] = useState(['', '', '']);
  const [checks, setChecks] = useState({});
  const [showEval, setShowEval] = useState(false);

  const handleInput = (idx, value) => {
    setInputs((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
    setShowEval(false);
  };

  const toggleCheck = (id) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* 3단계 입력 */}
      {steps.map((step, idx) => (
        <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{step.emoji}</span>
            <h4 className="font-semibold text-sm text-slate-800">{step.title}</h4>
          </div>
          <p className="text-xs text-slate-400 mb-2">{step.hint}</p>
          <textarea
            value={inputs[idx]}
            onChange={(e) => handleInput(idx, e.target.value)}
            placeholder={step.placeholder}
            rows={2}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200"
          />
          {/* 화살표 */}
          {idx < steps.length - 1 && (
            <div className="text-center text-slate-300 text-xl mt-2">↓</div>
          )}
        </div>
      ))}

      {/* 품질 체크리스트 */}
      {inputs[2].trim() && (
        <div className="p-4 bg-primary-50 rounded-xl">
          <button
            onClick={() => setShowEval(!showEval)}
            className="font-semibold text-sm text-primary-700 cursor-pointer"
          >
            📋 내 질문 품질 체크하기 {showEval ? '▲' : '▼'}
          </button>

          {showEval && (
            <div className="mt-3 space-y-2">
              {qualityChecks.map((check) => (
                <label
                  key={check.id}
                  className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!!checks[check.id]}
                    onChange={() => toggleCheck(check.id)}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  {check.label}
                </label>
              ))}
              <div className="mt-2 text-sm font-medium">
                {passedChecks === qualityChecks.length
                  ? '🎉 훌륭한 데이터 질문이에요!'
                  : passedChecks >= 3
                    ? '👍 좋은 질문이에요! 조금 더 다듬어볼까요?'
                    : '💪 더 구체적으로 다듬어보세요!'}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 예시 */}
      {examples.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-400 mb-2">변환 예시</p>
          {examples.map((ex, i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-lg mb-2 text-xs text-slate-600 space-y-1">
              <div>💭 {ex.vague}</div>
              <div className="text-slate-300 text-center">↓</div>
              <div>🔎 {ex.curious}</div>
              <div className="text-slate-300 text-center">↓</div>
              <div>📊 {ex.data}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
