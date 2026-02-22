import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const badPrompts = [
  { bad: '데이터 분석해줘', good: '학교 설문조사 데이터(200명, 9개 변수)에서 수면 시간과 성적 만족도의 관계를 분석해줘. 산점도와 상관계수를 포함해줘.', issue: '어떤 데이터인지, 무엇을 분석할지, 결과 형식이 모두 빠져 있음' },
  { bad: '이 데이터에서 뭔가 재미있는 거 찾아줘', good: '이 판매 데이터에서 (1) 월별 매출 추세, (2) 가장 많이 팔린 상위 5개 품목, (3) 요일별 판매 패턴을 분석해줘.', issue: '"재미있는 것"은 주관적이고 모호함. 구체적 분석 목표가 필요' },
  { bad: '차트 만들어줘', good: '2024년 월별 기온 데이터로 꺾은선 그래프를 만들어줘. x축은 월, y축은 평균기온(°C), 제목은 "2024년 서울 월평균 기온"으로 해줘.', issue: '어떤 데이터로, 어떤 차트를, 어떤 형식으로 만들지 모두 빠져 있음' },
];

const promptParts = [
  { key: 'context', label: '배경/맥락', emoji: '📋', desc: '분석의 목적과 상황', example: '"고등학교 1학년 200명의 설문조사 데이터를 분석하려 합니다"' },
  { key: 'data', label: '데이터 설명', emoji: '📊', desc: '데이터의 구조와 변수', example: '"변수: 학년, 성별, 수면시간, 운동일수, 스마트폰사용, 성적만족도 등 9개"' },
  { key: 'task', label: '분석 과제', emoji: '🎯', desc: '구체적으로 무엇을 하라는 것인지', example: '"수면시간과 성적만족도의 관계를 분석해줘"' },
  { key: 'format', label: '결과 형식', emoji: '📝', desc: '결과를 어떤 형태로 원하는지', example: '"산점도 차트 + 상관계수 + 해석 3줄 요약"' },
  { key: 'constraints', label: '조건/제약', emoji: '⚙️', desc: '주의사항이나 제한조건', example: '"상관관계를 인과관계로 해석하지 말고, 제3변수 가능성도 언급해줘"' },
];

export default function Lesson7_1() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        AI에게 데이터 분석을 시키면 결과가 나오긴 합니다.
        하지만 <strong>"좋은 지시"를 해야 "좋은 결과"</strong>가 나옵니다.
        이번 레슨에서는 AI에게 효과적으로 분석을 지시하는 방법을 배웁니다.
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8">나쁜 지시 vs 좋은 지시</h2>
      <p>
        같은 AI라도 지시문(프롬프트)에 따라 결과 품질이 <strong>완전히 달라집니다</strong>.
        아래 Before/After를 비교해보세요.
      </p>

      <BeforeAfterDemo />

      <h2 className="text-xl font-bold text-slate-800 mt-10">좋은 지시문의 5가지 요소</h2>
      <div className="space-y-3 my-6">
        {promptParts.map((part) => (
          <div key={part.key} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-lg shrink-0">
              {part.emoji}
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800">{part.label}</h4>
              <p className="text-sm text-slate-600">{part.desc}</p>
              <p className="text-xs text-slate-400 mt-1 italic">{part.example}</p>
            </div>
          </div>
        ))}
      </div>

      <InfoBox type="key">
        5가지 요소가 모두 포함된 지시문은 AI가 <strong>정확한 분석, 적절한 시각화, 올바른 해석</strong>을 제공할 확률이 훨씬 높습니다.
        <br />특히 <strong>조건/제약</strong>을 명시하면 흔한 실수(인과관계 오해 등)를 예방할 수 있습니다.
      </InfoBox>

      <ExerciseBlock title="실습 1: 나쁜 지시문 → 좋은 지시문">
        <p className="text-sm text-slate-500 mb-4">
          아래 나쁜 지시문의 문제점을 파악하고, 좋은 지시문과 비교해보세요.
        </p>
        <BadPromptQuiz items={badPrompts} />
      </ExerciseBlock>

      <ExerciseBlock title="실습 2: 나만의 분석 지시문 만들기">
        <PromptBuilder parts={promptParts} />
      </ExerciseBlock>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 모호한 지시 vs 구체적 지시의 결과 차이</li>
          <li>✓ 좋은 지시문의 5가지 요소: 배경, 데이터, 과제, 형식, 조건</li>
          <li>✓ 나쁜 지시문을 개선하는 방법</li>
          <li>✓ 직접 분석 지시문 작성 연습</li>
        </ul>
      </div>
    </div>
  );
}

function BeforeAfterDemo() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="my-6 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
          <div className="font-bold text-red-700 mb-2">❌ Before (나쁜 지시)</div>
          <div className="bg-white rounded-lg p-3 text-sm text-slate-700 border border-red-100">
            "이 데이터 분석해줘"
          </div>
          <div className="mt-3 text-xs text-slate-500 space-y-1">
            <p className="font-medium text-red-600">AI의 반응:</p>
            <p>"네, 데이터를 살펴보겠습니다. 기본적인 통계를 계산하면..."</p>
            <p className="italic text-red-400">→ 방향 없는 기본 통계만 나열</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${showAfter ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
          <div className="font-bold text-green-700 mb-2">✅ After (좋은 지시)</div>
          {showAfter ? (
            <>
              <div className="bg-white rounded-lg p-3 text-sm text-slate-700 border border-green-100">
                "고등학교 1학년 200명의 설문조사 데이터에서 <strong>수면시간과 성적만족도의 관계</strong>를 분석해줘.
                산점도를 그리고, 상관계수를 계산하고, 결과를 3줄로 요약해줘.
                단, 상관관계를 인과관계로 해석하지 말아줘."
              </div>
              <div className="mt-3 text-xs text-slate-500 space-y-1">
                <p className="font-medium text-green-600">AI의 반응:</p>
                <p>"산점도를 보면 약한 양의 상관(r=0.35)이 나타납니다. 수면시간이 긴 학생이 성적만족도가 약간 높은 경향이..."</p>
                <p className="italic text-green-500">→ 목표에 맞는 정확한 분석 + 시각화 + 해석</p>
              </div>
            </>
          ) : (
            <button onClick={() => setShowAfter(true)}
              className="w-full py-8 text-center text-slate-400 hover:text-primary-500 cursor-pointer transition-colors">
              클릭하여 좋은 지시 결과 보기 →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function BadPromptQuiz({ items }) {
  const [revealed, setRevealed] = useState({});

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="mb-3">
            <span className="text-xs font-bold text-red-500">나쁜 지시문</span>
            <p className="text-sm font-medium text-slate-800 mt-1">"{item.bad}"</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full">⚠️ {item.issue}</span>
          </div>
          {!revealed[i] ? (
            <button onClick={() => setRevealed((p) => ({ ...p, [i]: true }))}
              className="px-3 py-1.5 bg-primary-100 hover:bg-primary-200 text-primary-700 text-xs rounded-lg cursor-pointer">
              개선된 지시문 보기
            </button>
          ) : (
            <div className="p-3 bg-accent-50 rounded-lg">
              <span className="text-xs font-bold text-accent-600">✅ 좋은 지시문</span>
              <p className="text-sm text-accent-800 mt-1">"{item.good}"</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PromptBuilder({ parts }) {
  const [values, setValues] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const updateValue = (key, val) => {
    setValues((p) => ({ ...p, [key]: val }));
    setShowPreview(false);
  };

  const filledCount = parts.filter((p) => values[p.key]?.trim()).length;

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">아래 5가지 요소를 채워 분석 지시문을 완성해보세요.</p>
      {parts.map((part) => (
        <div key={part.key} className="p-3 bg-white rounded-xl border border-slate-200">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            {part.emoji} {part.label}
          </label>
          <input
            type="text"
            placeholder={part.example.replace(/"/g, '')}
            value={values[part.key] || ''}
            onChange={(e) => updateValue(part.key, e.target.value)}
            className="mt-1.5 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button onClick={() => setShowPreview(true)}
          disabled={filledCount < 3}
          className={`px-4 py-2 rounded-lg text-sm cursor-pointer ${filledCount >= 3 ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
          지시문 미리보기 ({filledCount}/5 작성)
        </button>
      </div>

      {showPreview && (
        <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
          <h4 className="font-bold text-sm text-primary-700 mb-2">완성된 지시문</h4>
          <p className="text-sm text-slate-700 leading-relaxed">
            {values.context && <>{values.context}. </>}
            {values.data && <>데이터 구성: {values.data}. </>}
            {values.task && <>{values.task}. </>}
            {values.format && <>결과는 {values.format} 형태로 제시해줘. </>}
            {values.constraints && <>주의사항: {values.constraints}</>}
          </p>
          <div className="mt-3 flex gap-2">
            {parts.map((p) => (
              <span key={p.key} className={`px-2 py-0.5 text-xs rounded-full ${values[p.key]?.trim() ? 'bg-accent-100 text-accent-700' : 'bg-red-100 text-red-500'}`}>
                {values[p.key]?.trim() ? '✅' : '❌'} {p.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
