import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const soulSections = [
  { key: 'identity', emoji: '🎭', title: '역할 정의', desc: 'AI가 어떤 전문가 역할을 맡을지', placeholder: '너는 데이터 분석 전문가이다. 고등학생이 이해할 수 있는 수준으로 설명해야 한다.' },
  { key: 'context', emoji: '📋', title: '배경 정보', desc: '프로젝트의 맥락과 데이터 설명', placeholder: '200명 고등학생 설문조사 데이터(학년, 성별, 수면시간, 운동일수, 스마트폰사용, 성적만족도, 스트레스, 아침식사, 이동시간)를 분석한다.' },
  { key: 'task', emoji: '🎯', title: '분석 과제', desc: '단계별로 수행할 작업 목록', placeholder: '1단계: 데이터 개요 파악\n2단계: 주요 변수 간 상관관계 분석\n3단계: 그룹 비교 (성별, 학년별)\n4단계: 핵심 발견 3가지 도출' },
  { key: 'rules', emoji: '⚖️', title: '분석 원칙', desc: '반드시 지켜야 할 규칙', placeholder: '- 상관관계를 인과관계로 해석하지 않는다\n- 표본 크기와 한계를 항상 명시한다\n- 이상치를 제거할 때는 근거를 밝힌다' },
  { key: 'format', emoji: '📝', title: '결과물 형식', desc: '최종 산출물의 구조와 형태', placeholder: '결과는 다음 형식으로 제출:\n- 요약 (3줄 이내)\n- 시각화 (산점도, 막대그래프 각 1개)\n- 상세 분석\n- 한계점과 후속 연구 제안' },
];

const exampleSouls = [
  {
    title: '학교 급식 만족도 분석',
    sections: {
      identity: '학교 급식 개선 위원회의 데이터 분석 담당자',
      context: '전교생 800명 대상 급식 만족도 설문조사. 변수: 학년, 메뉴 만족도(5점), 양 만족도(5점), 대기시간 만족도(5점), 자유 의견',
      task: '1) 전반적 만족도 수준 파악\n2) 학년별 만족도 차이 분석\n3) 가장 불만인 영역 식별\n4) 개선 우선순위 제안',
      rules: '- 자유 의견은 키워드 빈도 분석\n- 불만족(1-2점) 비율 별도 계산\n- 학년별 차이는 실제로 유의미한지 판단',
      format: '보고서 형식: 요약 → 차트 3개 → 상세 분석 → 개선 제안 순',
    },
  },
  {
    title: 'SNS 사용과 정신건강',
    sections: {
      identity: '청소년 정신건강 연구팀의 주니어 분석가',
      context: '중학교 3학년 150명 설문. 변수: 일 SNS 사용시간, 자존감 점수(10점), 수면 시간, 대면 교류 시간, 불안 점수(10점)',
      task: '1) SNS 사용시간과 자존감/불안의 상관관계\n2) 수면시간을 통제한 후에도 상관이 유지되는지\n3) 대면 교류 시간의 보호 효과 분석',
      rules: '- SNS가 정신건강을 "악화시킨다"고 단정하지 않기\n- 역인과(불안한 학생이 SNS를 더 할 수 있음) 가능성 언급\n- 자기보고식 설문의 한계 명시',
      format: '산점도 2개 + 부분상관분석 결과표 + 결론 및 한계점',
    },
  },
];

export default function Lesson7_2() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        좋은 지시문의 5가지 요소를 배웠습니다. 이제 이것을 체계적으로 정리한
        <strong> "소울 문서"</strong>를 만들어봅시다.
        소울 문서는 AI에게 <strong>분석의 전체 맥락</strong>을 한 번에 전달하는 구조화된 지시서입니다.
      </p>

      <InfoBox type="key">
        <strong>소울 문서(Soul Document)</strong>란?
        <br />AI에게 분석 프로젝트의 목적, 데이터, 분석 방법, 원칙, 결과 형식을 체계적으로 전달하는 문서입니다.
        <br />일회성 질문이 아닌 <strong>프로젝트 단위</strong>의 깊은 분석에 특히 효과적입니다.
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-8">소울 문서의 5개 섹션</h2>
      <div className="space-y-3 my-6">
        {soulSections.map((section, i) => (
          <div key={section.key} className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
              <span className="text-lg">{section.emoji}</span>
              <h4 className="font-bold text-slate-800">{section.title}</h4>
            </div>
            <p className="text-sm text-slate-600 mb-2">{section.desc}</p>
            <div className="p-2 bg-slate-50 rounded-lg text-xs text-slate-500 whitespace-pre-line">{section.placeholder}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-slate-800 mt-10">예시: 완성된 소울 문서</h2>
      <ExampleSoulViewer examples={exampleSouls} />

      <InfoBox type="tip">
        소울 문서는 한 번 만들면 <strong>반복 사용</strong>할 수 있습니다.
        같은 데이터에 대해 여러 번 분석할 때, 소울 문서를 조금씩 수정하면서 AI와 대화하면
        일관성 있는 분석이 가능합니다.
      </InfoBox>

      <ExerciseBlock title="실습: 나만의 소울 문서 작성하기">
        <p className="text-sm text-slate-500 mb-4">
          관심 있는 주제를 하나 정하고, 소울 문서의 5개 섹션을 채워보세요.
        </p>
        <SoulDocBuilder sections={soulSections} />
      </ExerciseBlock>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 소울 문서의 개념과 필요성</li>
          <li>✓ 5개 섹션: 역할, 배경, 과제, 원칙, 형식</li>
          <li>✓ 실전 소울 문서 예시 분석</li>
          <li>✓ 직접 소울 문서 작성 연습</li>
        </ul>
      </div>
    </div>
  );
}

function ExampleSoulViewer({ examples }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const example = examples[activeIdx];

  return (
    <div className="my-4">
      <div className="flex gap-2 mb-3">
        {examples.map((ex, i) => (
          <button key={i} onClick={() => setActiveIdx(i)}
            className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors ${i === activeIdx ? 'bg-primary-500 text-white' : 'bg-slate-100 hover:bg-primary-100 text-slate-600'}`}>
            {ex.title}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
        {soulSections.map((section) => (
          <div key={section.key} className="p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span>{section.emoji}</span>
              <span className="font-bold text-sm text-slate-700">{section.title}</span>
            </div>
            <p className="text-sm text-slate-600 whitespace-pre-line">{example.sections[section.key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SoulDocBuilder({ sections }) {
  const [values, setValues] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const filledCount = sections.filter((s) => values[s.key]?.trim()).length;

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={section.key} className="p-3 bg-white rounded-xl border border-slate-200">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            {section.emoji} {section.title}
            <span className="text-xs text-slate-400">— {section.desc}</span>
          </label>
          <textarea
            rows={3}
            placeholder={section.placeholder}
            value={values[section.key] || ''}
            onChange={(e) => { setValues((p) => ({ ...p, [section.key]: e.target.value })); setShowPreview(false); }}
            className="mt-1.5 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
          />
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button onClick={() => setShowPreview(true)}
          disabled={filledCount < 3}
          className={`px-4 py-2 rounded-lg text-sm cursor-pointer ${filledCount >= 3 ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
          소울 문서 미리보기 ({filledCount}/5 작성)
        </button>
      </div>

      {showPreview && (
        <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
          <h4 className="font-bold text-primary-700 mb-3">📄 나의 소울 문서</h4>
          <div className="space-y-3 text-sm">
            {sections.map((section) => values[section.key]?.trim() && (
              <div key={section.key}>
                <div className="font-bold text-slate-700">{section.emoji} {section.title}</div>
                <p className="text-slate-600 whitespace-pre-line">{values[section.key]}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-white rounded-lg">
            <div className="flex gap-1.5 flex-wrap">
              {sections.map((s) => (
                <span key={s.key} className={`px-2 py-0.5 text-xs rounded-full ${values[s.key]?.trim() ? 'bg-accent-100 text-accent-700' : 'bg-red-100 text-red-500'}`}>
                  {values[s.key]?.trim() ? '✅' : '❌'} {s.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
